import { EndpointMeta, getEndpointMeta, getOrCreateRouteAccess, RouteDefinition, HttpMethod } from '../meta';

export const Endpoint = (path: string, prefix: string | string[] = 'api') => {
    return (target: Function) => {
        // if prefix is of type array, join the value, otherwise it should be of type string 
        const finalPrefix: string = prefix instanceof Array ? prefix.join('/') : prefix;
        const endpointMeta: EndpointMeta = getEndpointMeta(target);
        endpointMeta.path = `/${finalPrefix}/${path}`;
    }
}

const route = (method: HttpMethod, path: string, target: Object, methodName: string) => {
    const endpointMeta: EndpointMeta = getEndpointMeta(target.constructor);
    const route: RouteDefinition = getOrCreateRouteAccess(endpointMeta, methodName);

    route.path = path;
    route.method = method;
}

export const Get = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        route('get', path, target, key as string);
    };
}

export const Post = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        route('post', path, target, key as string);
    };
}

export const Put = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        route('put', path, target, key as string);
    };
}

export const Delete = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        route('delete', path, target, key as string)
    };
}
