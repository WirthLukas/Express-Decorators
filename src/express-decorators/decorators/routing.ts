import { addRouteDefinition } from './reflect-helper';

export const endpointPathKey = Symbol('endpointPathKey');

export const Endpoint = (path: string, prefix: string | string[] = 'api') => {
    return (target: Function) => {
        // if prefix is of type array, join the value, otherwise it should be of type string 
        let finalPrefix: string = prefix instanceof Array ? prefix.join('/') : prefix;
        Reflect.defineMetadata(endpointPathKey, `/${finalPrefix}/${path}`, target);
    }
}

export const Get = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addRouteDefinition({
            method: 'get',
            path: path,
            methodName: key as string
        }, target.constructor);
    };
}

export const Post = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addRouteDefinition({
            method: 'post',
            path: path,
            methodName: key as string
        }, target.constructor);
    };
}

export const Put = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addRouteDefinition({
            method: 'put',
            path: path,
            methodName: key as string
        }, target.constructor);
    };
}

export const Delete = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        addRouteDefinition({
            method: 'delete',
            path: path,
            methodName: key as string
        }, target.constructor);
    };
}
