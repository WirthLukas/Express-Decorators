import { EndpointService } from './services';
import { ValidationChain, Result, ValidationError, validationResult } from 'express-validator';
import 'reflect-metadata';
import { Application, Router, Request, Response } from 'express';
import { JsonResponse } from '../../models';

const routeKey = Symbol('routeKey');
const endpointPathKey = Symbol('endpointPathKey');
const validationsKey = Symbol('validationsKey');

export interface RouteDefinition {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    methodName: string;
}

export const Endpoint = (path: string, prefix: string | string[] = 'api') => {
    return (target: Function) => {
        // if prefix is of type array, join the value, otherwise it should be of type string 
        let finalPrefix: string = prefix instanceof Array ? prefix.join('/') : prefix;
        Reflect.defineMetadata(endpointPathKey, `/${finalPrefix}/${path}`, target);
    }
}

const getRouteMetadata = (target: Object): RouteDefinition[] => {
    if (!Reflect.hasMetadata(routeKey, target)) {
        Reflect.defineMetadata(routeKey, [], target);
    }

    return Reflect.getMetadata(routeKey, target) as RouteDefinition[];
}

const addRouteDefinition = (def: RouteDefinition, target: Object) => {
    const routes: RouteDefinition[] = getRouteMetadata(target);

    routes.push(def);
    // routes is a refernece on a RouteDefinition array, so all changes will also affect the are stored in the metadata
    // of the target. So we don't need the line below
    // Reflect.defineMetadata(routeKey, routes, target);
}

const getValidationMetadata = (target: Object, methodName: string): ValidationChain[] => {
    if (!Reflect.hasMetadata(validationsKey, target, methodName)) {
        Reflect.defineMetadata(validationsKey, [], target, methodName);
    }

    return Reflect.getMetadata(validationsKey, target, methodName) as ValidationChain[];
}

const addValidationFor = (methodName: string, target: Object, validation: ValidationChain) => {
    const validations: ValidationChain[] = getValidationMetadata(target, methodName);
    validations.push(validation);
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

export const createEndpoint = (instance: any, app: Application) => {
    const router = Router();

    getRouteMetadata(instance.constructor).forEach(def => {
        let validationChains = getValidationMetadata(instance.constructor, def.methodName)
        
        router[def.method](def.path, validationChains, async (req: Request, res: Response) => {
            const error: Result<ValidationError> = validationResult(req);

            if (!error.isEmpty()) {
                // 400 -> BadRequest
                return res.status(400).json({ errors: error.array() });
            }

            try {
                let result: any;
                let type = Reflect.getMetadata('design:returntype', instance, def.methodName);

                if (type.name === Promise.name) {
                    result = await instance[def.methodName](req, res);
                } else {
                    result = instance[def.methodName](req, res);
                }

                if (result === undefined)
                    res.status(200).send({ value: 'ok' });

                if (result instanceof JsonResponse) {
                    res.status(result.statusCode).send(result.value);
                }
            } catch (err) {
                res.status(500).send({ msg: 'something went wrong' });
            }
        });
    });

    const path = Reflect.getMetadata(endpointPathKey, instance.constructor) as string;
    app.use(path, router);
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

export const InjectRouter = (): PropertyDecorator => {
    return (target: Object, key: string | symbol) => {
        EndpointService.for(target.constructor.name).routeInjectorProperty = key as string;
    };
}

export const Validate = (validation: ValidationChain): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addValidationFor(key as string, target.constructor, validation);
    };
}