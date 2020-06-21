import { EndpointService, RouterService } from './services';

export const Endpoint = (path: string, prefix: string | string[] = 'api') => {
    return (target: Function) => {
        // if prefix is of type array, join the value, otherwise it should be of type string 
        let finalPrefix: string = prefix instanceof Array ? prefix.join('/') : prefix;
        EndpointService.addEndpointDefinition(target.name, `/${finalPrefix}/${path}`);
    }
}

export const Get = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        EndpointService.addRouteDefinition(target.constructor.name, {
            method: 'get',
            path: path,
            methodName: key as string
        });
    };
}

export const InjectRouter = (): PropertyDecorator => {
    return (target: Object, key: string | symbol) => {
        EndpointService.addRouterInjector(target.constructor.name, key as string);
    };
}