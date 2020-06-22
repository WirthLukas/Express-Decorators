import { Router, Application, Request, Response } from 'express';
import { ValidationChain, Result, ValidationError, validationResult } from "express-validator";

export interface RouteDefinition {
    path: string;
    method: 'get';
    methodName: string;
}

export class EndpointDef {
    public endpointPath: string | undefined;
    public routeInjectorProperty: string | undefined;

    private readonly routeDefinitions: RouteDefinition[] = [];
    private readonly validationChains: Map<string, ValidationChain[]> = new Map();

    constructor(public readonly className: string) {
    }

    public addRouteDefinition(def: RouteDefinition) {
        this.routeDefinitions.push(def);
    }

    public createEndpoint(instance: any, app: Application) {
        const path = this.endpointPath;

        if (path === undefined)
            throw new Error(`Class ${this.className} is not decorated with Endpoint`);

        const router: Router = Router();

        this.routeDefinitions.forEach(def => {
            let validationChains = this.validationChains.get(def.methodName);

            if (validationChains === undefined)
                validationChains = [];

            router[def.method](def.path, validationChains, (req: Request, res: Response) => {
                const error: Result<ValidationError> = validationResult(req);

                if (!error.isEmpty()) {
                    // 400 -> BadRequest
                    return res.status(400).json({ errors: error.array() });
                }

                instance[def.methodName](req, res);
            });
        });

        app.use(path, router);

        const key = this.routeInjectorProperty;

        if (key !== undefined) {
            instance[key] = router;
        }
    }

    public addValidationFor(methodName: string, validation: ValidationChain) {
        const chain = this.validationChains.get(methodName);

        if (chain === undefined) {
            this.validationChains.set(methodName, [ validation ]);
        } else {
            chain.push(validation);
        }
    }
}


export class EndpointService {

    private static readonly definitions: Map<string, EndpointDef> = new Map();

    static for(className: string): EndpointDef {
        let def: EndpointDef | undefined = this.definitions.get(className);

        if (def === undefined) {
            def = new EndpointDef(className);
            this.definitions.set(className, def);
        }

        return def;
    }

}