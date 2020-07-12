import { getEndpointMeta, EndpointMeta, getOrCreateRouteAccess, RouteDefinition } from '../meta';
export const rDescriptionKey = Symbol('routeDescriptionKey');
export const eDescriptionKey = Symbol('endpointDescriptionKey');

export const RouteDescription = (text: string): MethodDecorator => {
    return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
        const endpointMeta: EndpointMeta = getEndpointMeta(target.constructor);
        const route: RouteDefinition = getOrCreateRouteAccess(endpointMeta, key as string);
        route.description = text;
    };
}

export const EndpointDescription = (text: string): ClassDecorator => {
    return (target: Function) => {
        const endpointMeta: EndpointMeta = getEndpointMeta(target);
        endpointMeta.description = text;
    }
}
