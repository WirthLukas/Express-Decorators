import { ValidationChain, Result, ValidationError, validationResult } from 'express-validator';
import 'reflect-metadata';
import { Application, Router, Request, Response, RequestHandler } from 'express';
import { JsonResponse, StatusCode } from '../models';
import { addRouteDefinition, getRouteMetadata, getValidationMetadata, addValidationFor, RouteDefinition, addMiddlewareFor, getMiddlewareMetadata } from './reflect-helper';

const endpointPathKey = Symbol('endpointPathKey');

export const Endpoint = (path: string, prefix: string | string[] = 'api') => {
    return (target: Function) => {
        // if prefix is of type array, join the value, otherwise it should be of type string 
        let finalPrefix: string = prefix instanceof Array ? prefix.join('/') : prefix;
        Reflect.defineMetadata(endpointPathKey, `/${finalPrefix}/${path}`, target);
    }
}

export const Get = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addRouteDefinition({
            method: 'get',
            path: path,
            methodName: key as string
        }, target.constructor);
    };
}

export const Post = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addRouteDefinition({
            method: 'post',
            path: path,
            methodName: key as string
        }, target.constructor);
    };
}

export const Put = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addRouteDefinition({
            method: 'put',
            path: path,
            methodName: key as string
        }, target.constructor);
    };
}

export const Delete = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addRouteDefinition({
            method: 'delete',
            path: path,
            methodName: key as string
        }, target.constructor);
    };
}

export const Middleware = (middleware: RequestHandler): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addMiddlewareFor(key as string, target.constructor, middleware);
    };
}

const injectRouterKey = Symbol('injectRouterKey');

export const InjectRouter = (): PropertyDecorator => {
    return (target: Object, key: string | symbol) => {
        Reflect.defineMetadata(injectRouterKey, key, target.constructor);
    };
}

export const Validate = (validation: ValidationChain): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addValidationFor(key as string, target.constructor, validation);
    };
}

export const createEndpoint = (instance: any, app: Application) => {
    const router = Router();

    // initRoutes(instance, router);
    getRouteMetadata(instance.constructor).forEach(def => {
        let validationChains = getValidationMetadata(instance.constructor, def.methodName);
        let middlewares = getMiddlewareMetadata(instance.constructor, def.methodName);

        router[def.method](def.path, validationChains, middlewares, (req: Request, res: Response) => {
            const error: Result<ValidationError> = validationResult(req);

            if (!error.isEmpty())
                return res.status(StatusCode.BadRequest).json({ errors: error.array() });

            Promise.resolve(instance[def.methodName](req, res))
                .then(result => {
                    if (result instanceof JsonResponse) {
                        res.status(result.statusCode).send(result.value);
                    }
                })
                .catch(err => {
                    res.status(500).send({ msg: `something went wrong!`, err: err.toString() });
                });
        });
    });

    const path = Reflect.getMetadata(endpointPathKey, instance.constructor) as string;
    app.use(path, router);

    if (Reflect.hasMetadata(injectRouterKey, instance.constructor)) {
        const injectRouterProperty = Reflect.getMetadata(injectRouterKey, instance.constructor);
        instance[injectRouterProperty] = router;
    }
}

const initRoutes = (instance: any, router: Router) => {
    getRouteMetadata(instance.constructor).forEach(def => {
        let validationChains = getValidationMetadata(instance.constructor, def.methodName)
        
        router[def.method](def.path, validationChains, async (req: Request, res: Response) => {
            const error: Result<ValidationError> = validationResult(req);

            if (!error.isEmpty())
                return res.status(StatusCode.BadRequest).json({ errors: error.array() });

            try {
                let result: any;
                let type = Reflect.getMetadata('design:returntype', instance, def.methodName);

                if (type instanceof Promise) {
                // if (type.name === Promise.name) {
                    result = await instance[def.methodName](req, res);
                } else {
                    result = instance[def.methodName](req, res);
                }

                // if (result === undefined)
                //     res.status(200).send({ value: 'ok' });

                if (result instanceof JsonResponse) {
                    res.status(result.statusCode).send(result.value);
                }
            } catch (err) {
                res.status(500).send({ msg: `something went wrong!`, err });
            }
        });
    });
}