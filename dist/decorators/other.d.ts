import { RequestHandler } from "express";
import { ValidationChain } from "express-validator";
export declare const injectRouterKey: unique symbol;
/**
 * Defines a middleware for the given method
 * @param middleware
 */
export declare const Middleware: (middleware: RequestHandler) => MethodDecorator;
/**
 * The Router Object of the endpoint will be assigned to this property
 */
export declare const InjectRouter: () => PropertyDecorator;
/**
 * Defines a validation chain for the given route
 * @param validation
 */
export declare const Validate: (validation: ValidationChain | ValidationChain[]) => MethodDecorator;
