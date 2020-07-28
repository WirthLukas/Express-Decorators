import { RequestHandler } from 'express';
import { ValidationChain } from 'express-validator';
export declare type Middleware = RequestHandler;
export declare type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export interface RouteDefinition {
    path: string;
    method: HttpMethod;
    middleware?: Middleware[];
    validations?: ValidationChain[];
    description?: string;
}
export declare type RouteAccess = {
    [method: string]: RouteDefinition;
};
export declare const enum ParameterType {
    Params = 0,
    Query = 1,
    Body = 2,
    Headers = 3,
    Cookies = 4
}
export interface ParameterConfig {
    index: number;
    type: ParameterType;
    name?: string;
}
export declare type ParameterAccess = {
    [methodName: string]: ParameterConfig[];
};
export interface EndpointMeta {
    path: string;
    routes: RouteAccess;
    params: ParameterAccess;
    description?: string;
    definitionFinished: boolean;
}
export declare const getEndpointMeta: (target: any) => EndpointMeta;
export declare const getOrCreateRouteAccess: (meta: EndpointMeta, methodName: string) => RouteDefinition;
