import { RequestHandler } from 'express';
import { ValidationChain } from 'express-validator';

export type Middleware = RequestHandler;
export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface RouteDefinition {
    path: string;
    method: HttpMethod;
    middleware?: Middleware[];
    validations?: ValidationChain[];
    description?: string;
}

export type RouteAccess = {
    [method: string]: RouteDefinition; 
};

export const enum ParameterType {
    Params,
    Query,
    Body,
    Headers,
    Cookies
}

export interface ParameterConfig {
    index: number;
    type: ParameterType;
    name?: string;
}

export type ParameterAccess = {
    [methodName: string]: ParameterConfig[];
}

export interface EndpointMeta {
    path: string;
    routes: RouteAccess;
    params: ParameterAccess;
    description?: string;
    definitionFinished: boolean;
}

const endpointKey = Symbol('endpointKey');

export const getEndpointMeta = (target: any): EndpointMeta => {
    if (!Reflect.hasMetadata(endpointKey, target)) {
        const endpointMeta: EndpointMeta = {
            path: '',
            routes: {},
            params: {},
            definitionFinished: false
        }

        Reflect.defineMetadata(endpointKey, endpointMeta, target);
    }

    return Reflect.getMetadata(endpointKey, target) as EndpointMeta;
}

// export const getOrCreateRouteAccess = (meta: EndpointMeta, methodName: string): RouteDefinition => {
//     if (!meta.routes[methodName]) {
//         meta.routes[methodName] = {
//             path: '',
//             method: 'get'
//         };
//     }

//     return meta.routes[methodName];
// }

export const getOrCreateRouteAccess = (meta: EndpointMeta, methodName: string): RouteDefinition => {
    return meta.routes[methodName] ?? (meta.routes[methodName] = {
        path: '',
        method: 'get'
    });
}
