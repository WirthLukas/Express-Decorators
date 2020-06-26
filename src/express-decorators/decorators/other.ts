import { RequestHandler } from "express";
import { addMiddlewareFor, addValidationsFor } from "./reflect-helper";
import { ValidationChain } from "express-validator";

export const injectRouterKey = Symbol('injectRouterKey');

export const Middleware = (middleware: RequestHandler): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addMiddlewareFor(key as string, target.constructor, middleware);
    };
}

export const InjectRouter = (): PropertyDecorator => {
    return (target: Object, key: string | symbol) => {
        Reflect.defineMetadata(injectRouterKey, key, target.constructor);
    };
}

export const Validate = (validation: ValidationChain | ValidationChain[]): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        const toStore = validation instanceof Array
            ? validation
            : [ validation ];
        
        addValidationsFor(key as string, target.constructor, toStore);
    };
}