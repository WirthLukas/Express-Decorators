import { RequestHandler } from "express";
import { addMiddlewareFor, addValidationFor } from "./reflect-helper";
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

export const Validate = (validation: ValidationChain): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addValidationFor(key as string, target.constructor, validation);
    };
}