import { EndpointService } from './services';
import { ValidationChain } from 'express-validator';

export const Endpoint = (path: string, prefix: string | string[] = 'api') => {
    return (target: Function) => {
        // if prefix is of type array, join the value, otherwise it should be of type string 
        let finalPrefix: string = prefix instanceof Array ? prefix.join('/') : prefix;
        EndpointService.for(target.name).endpointPath = `/${finalPrefix}/${path}`;
    }
}

export const Get = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        EndpointService.for(target.constructor.name).addRouteDefinition({
            method: 'get',
            path: path,
            methodName: key as string
        });
    };
}

export const Post = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        EndpointService.for(target.constructor.name).addRouteDefinition({
            method: 'post',
            path: path,
            methodName: key as string
        });
    };
}

export const Put = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        EndpointService.for(target.constructor.name).addRouteDefinition({
            method: 'put',
            path: path,
            methodName: key as string
        });
    };
}

export const Delete = (path: string): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        EndpointService.for(target.constructor.name).addRouteDefinition({
            method: 'delete',
            path: path,
            methodName: key as string
        });
    };
}

export const InjectRouter = (): PropertyDecorator => {
    return (target: Object, key: string | symbol) => {
        EndpointService.for(target.constructor.name).routeInjectorProperty = key as string;
    };
}

export const Validate = (validation: ValidationChain): MethodDecorator => {
    return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
        EndpointService.for(target.constructor.name).addValidationFor(key as string, validation);
    };
}