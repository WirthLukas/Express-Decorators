import { RequestHandler } from "express";
import { ValidationChain } from "express-validator";
import { EndpointMeta, getEndpointMeta, getOrCreateRouteAccess } from '../meta';

export const injectRouterKey = Symbol('injectRouterKey');

/**
 * Defines a middleware for the given method
 * @param middleware 
 */
export const Middleware = (middleware: RequestHandler): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        const endpointMeta: EndpointMeta = getEndpointMeta(target.constructor);
        const route = getOrCreateRouteAccess(endpointMeta, key as string);

        if (!route.middleware) {
            route.middleware = [ middleware ];
        } else {
            route.middleware?.push(middleware);
        }
    };
}

/**
 * The Router Object of the endpoint will be assigned to this property
 */
export const InjectRouter = (): PropertyDecorator => {
    return (target: Object, key: string | symbol) => {
        Reflect.defineMetadata(injectRouterKey, key, target.constructor);
    };
}

/**
 * Defines a validation chain for the given route
 * @param validation 
 */
export const Validate = (validation: ValidationChain | ValidationChain[]): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        const toStore = validation instanceof Array
            ? validation
            : [ validation ];
        
        const endpointMeta: EndpointMeta = getEndpointMeta(target.constructor);
        const route = getOrCreateRouteAccess(endpointMeta, key as string);

        if (!route.validations) {
            route.validations = toStore;
        } else {
            toStore.forEach(validation => route.validations?.push(validation));
        }
    };
}
