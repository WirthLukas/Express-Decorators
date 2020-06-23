import { Router, Application, Request, Response } from "express";
import { getRouteMetadata, getValidationMetadata, getMiddlewareMetadata } from "./decorators/reflect-helper";
import { Result, ValidationError, validationResult } from "express-validator";
import { StatusCode, JsonResponse } from "./models";
import { endpointPathKey } from "./decorators/routing";
import { injectRouterKey } from "./decorators/other";

export const createEndpoint = (instance: any, app: Application) => {
    const router = Router();

    initRoutes(instance, router);
    addRouterToApplication(app, instance, router);
    injectRouterIfNeccessary(router, instance);
}

const initRoutes = (instance: any, router: Router) => {
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
}

const addRouterToApplication = (app: Application, instance: any, router: Router) => {
    const path = Reflect.getMetadata(endpointPathKey, instance.constructor) as string;
    app.use(path, router);
}

const injectRouterIfNeccessary = (router: Router, instance: any) => {
    if (Reflect.hasMetadata(injectRouterKey, instance.constructor)) {
        const injectRouterProperty = Reflect.getMetadata(injectRouterKey, instance.constructor);
        instance[injectRouterProperty] = router;
    }
}