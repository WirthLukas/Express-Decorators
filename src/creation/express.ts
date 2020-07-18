import { Router, Application, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { StatusCode, JsonResponse } from "../models";
import { injectRouterKey } from "../decorators";
import { EndpointMeta, getEndpointMeta, RouteAccess, RouteDefinition, ParameterConfig, ParameterType } from '../meta';

export const createEndpoint = (instance: any, app: Application) => {
    const router = Router();

    initRoutes(instance, router);
    addRouterToApplication(app, instance, router);
    injectRouterIfNeccessary(router, instance);
}

const initRoutes = (instance: any, router: Router) => {
    const endpointMeta: EndpointMeta = getEndpointMeta(instance.constructor);

    if (!endpointMeta.definitionFinished)
        throw new Error('Endpoint definition not finished! Maybe you forgot tho decorate the class with the @Endpoint decorator?');

    const routes: RouteAccess = endpointMeta.routes;
    
    Object.keys(endpointMeta.routes).forEach(methodName => {
        const route: RouteDefinition = routes[methodName];
        const validations = route.validations ?? [];    // if route.validations is null or undefined, the value will be []
        const middleware = route.middleware ?? [];
        const params: ParameterConfig[] = endpointMeta.params[methodName];

        router[route.method](route.path, validations, middleware, (req: Request, res: Response) => {
            const error: Result<ValidationError> = validationResult(req);

            if (!error.isEmpty())
                return res.status(StatusCode.BadRequest).json({ errors: error.array() });

            const args = extractParameters(req, params);
            args.push(req, res);

            Promise.resolve(instance[methodName].apply(instance, args))
                .then(result => {
                    if (result instanceof JsonResponse) {
                        res.status(result.statusCode).send(result.value);
                    } else {
                        console.warn(`Can not handle return value of Method ${methodName} in ${instance.constructor.name}`);
                    }
                })
                .catch(err => {
                    res.status(StatusCode.InternalServerError).send({ msg: `something went wrong!`, err: err.toString() });
                });
        });
    });
}

const extractParameters = (req: Request, params: ParameterConfig[]): any[] => {
    if (!params || !params.length) {
        return [];
    }

    const args = [];

    for (const { index, type, name } of params) {
        switch (type) {
            case ParameterType.Body:
                args[index] = name ? req.body[name] : req.body;
                break;
            case ParameterType.Params:
                args[index] = name ? req.params[name] : req.params;
                break;
            case ParameterType.Query:
                args[index] = name ? req.query[name] : req.query;
                break;
            case ParameterType.Headers:
                args[index] = name ? req.headers[name] : req.headers;
                break;
            case ParameterType.Cookies:
                args[index] = name ? req.cookies[name] : req.cookies;
                break;
            default:
                throw new Error('Not supported Param Type');
        }
    }

    return args;
}

const addRouterToApplication = (app: Application, instance: any, router: Router) => {
    const endpointMeta: EndpointMeta = getEndpointMeta(instance.constructor);
    app.use(endpointMeta.path, router);
}

const injectRouterIfNeccessary = (router: Router, instance: any) => {
    if (Reflect.hasMetadata(injectRouterKey, instance.constructor)) {
        const injectRouterProperty = Reflect.getMetadata(injectRouterKey, instance.constructor);
        instance[injectRouterProperty] = router;
    }
}
