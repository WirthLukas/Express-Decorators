import { EndpointMeta, getEndpointMeta, getOrCreateRouteAccess, RouteDefinition, HttpMethod } from '../meta';

/**
 * Defines an endpoint at the given path, with the given prefix
 * 
 * An endpoint defines methods, which can be accessed by a specifed path,
 * based on the endpoint path.
 * 
 * @param path the route path of the endpoint
 * @param prefix the path between the main url and the endpoint path
 */
export const Endpoint = (path: string, prefix: string | string[] = 'api') => {
    return (target: Function) => {
        // if prefix is of type array, join the value, otherwise it should be of type string 
        const finalPrefix: string = prefix instanceof Array ? prefix.join('/') : prefix;
        const endpointMeta: EndpointMeta = getEndpointMeta(target);
        endpointMeta.path = `/${finalPrefix}/${path}`;
        endpointMeta.definitionFinished = true;
    }
}

const route = (method: HttpMethod, path: string, target: Object, methodName: string) => {
    const endpointMeta: EndpointMeta = getEndpointMeta(target.constructor);
    const route: RouteDefinition = getOrCreateRouteAccess(endpointMeta, methodName);

    route.path = path;
    route.method = method;
}

/**
 * Registers get route
 * @param path path to that route
 */
export const Get = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        route('get', path, target, key as string);
    };
}

/**
 * Registers post route
 * @param path path to that route
 */
export const Post = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        route('post', path, target, key as string);
    };
}

/**
 * Registers put route
 * @param path path to that route
 */
export const Put = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        route('put', path, target, key as string);
    };
}

/**
 * Registers delete route
 * @param path path to that route
 */
export const Delete = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        route('delete', path, target, key as string)
    };
}
