import { Router, Application } from "express";

export class RouterService {
    /* key is the class name */
    private static routers: Map<string, Router> = new Map();

    static getRouter(key: string): Router {
        let router: Router | undefined = this.routers.get(key);

        if (router === undefined) 
            router = this.generateRouter(key);
            
        return router;
    }

    private static generateRouter(key: string): Router {
        const router = Router();
        this.routers.set(key, router);
        return router;
    }
}

export class EndpointService {
    private static readonly routeDefinitions: Map<string, RouteDefinition[]> = new Map();
    // first parameter is the classname, second one is the path to the endpoint
    private static readonly endpointDefinitions: Map<string, string> = new Map();
    private static readonly routerInjectors: Map<string, string> = new Map();

    public static addRouteDefinition(className: string, definition: RouteDefinition) {
        const definitions: RouteDefinition[] | undefined = this.routeDefinitions.get(className);

        if (definitions === undefined)
            this.routeDefinitions.set(className, [ definition ]);
        else
            definitions.push(definition);
    }

    public static getRouteDefinitionsOfEndpoint(className: string): RouteDefinition[] {
        const result: RouteDefinition[] | undefined = this.routeDefinitions.get(className);
        return result === undefined ? [] : result;
    }

    public static addEndpointDefinition(className: string, path: string) {
        const def: string | undefined = this.endpointDefinitions.get(className);

        if (def === undefined) 
            this.endpointDefinitions.set(className, path);
        else 
            throw new Error('There is already an Endpoint for that class defined');
    }

    public static getEndpointDefinition(className: string): string {
        const def: string | undefined = this.endpointDefinitions.get(className);

        if (def === undefined)
            throw new Error(`Class ${className} is not decorated with Endpoint`);

        return def;
    }

    public static createEndpoint(instance: any, className: string, app: Application) {
        // const router: Router = RouterService.getRouter(className);
        const router: Router = Router();

        this.getRouteDefinitionsOfEndpoint(className).forEach(def => {
            router[def.method](def.path, (req, res) => {
                instance[def.methodName](req, res);
            });
        });

        const pathToEndpoint: string = this.getEndpointDefinition(className);
        app.use(pathToEndpoint, router);

        const key: string | undefined = this.routerInjectors.get(className);

        if (key !== undefined) {
            instance[key] = router;
        }

        // clearRouter
    }

    public static addRouterInjector(className: string, key: string) {
        const def: string | undefined = this.routerInjectors.get(className);

        if (def === undefined) 
            this.routerInjectors.set(className, key);
        else 
            throw new Error('There is already a Router for that class defined');
    }
}

export interface RouteDefinition {
    path: string;
    method: 'get';
    methodName: string;
}