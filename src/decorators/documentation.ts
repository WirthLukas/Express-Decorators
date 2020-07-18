import { getEndpointMeta, EndpointMeta, getOrCreateRouteAccess, RouteDefinition } from '../meta';

/**
 * Creates a description for the given route
 * @param text the description text
 */
export const RouteDescription = (text: string): MethodDecorator => {
    return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
        const endpointMeta: EndpointMeta = getEndpointMeta(target.constructor);
        const route: RouteDefinition = getOrCreateRouteAccess(endpointMeta, key as string);
        route.description = text;
    };
}

/**
 * Creates a description for the given endpoint
 * @param text the description text
 */
export const EndpointDescription = (text: string): ClassDecorator => {
    return (target: Function) => {
        const endpointMeta: EndpointMeta = getEndpointMeta(target);
        endpointMeta.description = text;
    }
}
