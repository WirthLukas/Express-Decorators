import { ValidationChain } from "express-validator";
import { RequestHandler } from "express";

const routeKey = Symbol('routeKey');
const validationsKey = Symbol('validationsKey');
const middlewareKey = Symbol('middlewareKey');

type Middleware = RequestHandler;

export interface RouteDefinition {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    methodName: string;
}

export const getRouteMetadata = (target: Object): RouteDefinition[] => {
    if (!Reflect.hasMetadata(routeKey, target)) {
        Reflect.defineMetadata(routeKey, [], target);
    }

    return Reflect.getMetadata(routeKey, target) as RouteDefinition[];
}

export const addRouteDefinition = (def: RouteDefinition, target: Object) => {
    const routes: RouteDefinition[] = getRouteMetadata(target);

    routes.push(def);
    // routes is a refernece on a RouteDefinition array, so all changes will also affect the are stored in the metadata
    // of the target. So we don't need the line below
    // Reflect.defineMetadata(routeKey, routes, target);
}

export const getValidationMetadata = (target: Object, methodName: string): ValidationChain[] => {
    if (!Reflect.hasMetadata(validationsKey, target, methodName)) {
        Reflect.defineMetadata(validationsKey, [], target, methodName);
    }

    return Reflect.getMetadata(validationsKey, target, methodName) as ValidationChain[];
}

export const addValidationsFor = (methodName: string, target: Object, validations: ValidationChain[]) => {
    const metaValidations: ValidationChain[] = getValidationMetadata(target, methodName);
    validations.forEach(validation => metaValidations.push(validation));
}

export const getMiddlewareMetadata = (target: Object, methodName: string): Middleware[] => {
    if (!Reflect.hasMetadata(middlewareKey, target, methodName)) {
        Reflect.defineMetadata(middlewareKey, [], target, methodName);
    }

    return Reflect.getMetadata(middlewareKey, target, methodName) as ValidationChain[];
}

export const addMiddlewareFor = (methodName: string, target: Object, middleware: Middleware) => {
    const middlewares = getMiddlewareMetadata(target, methodName);
    middlewares.push(middleware);
}