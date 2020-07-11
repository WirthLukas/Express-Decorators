export const rDescriptionKey = Symbol('routeDescriptionKey');
export const eDescriptionKey = Symbol('endpointDescriptionKey');

export const RouteDescription = (text: string): MethodDecorator => {
    return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(rDescriptionKey, text, target.constructor, key);
    };
}

export const EndpointDescription = (text: string): ClassDecorator => {
    return (target: Function) => {
        Reflect.defineMetadata(eDescriptionKey, text, target);
    }
}

export const getRouteDescriptionMetadata = (target: any, key: string |symbol): string => {
    if (!Reflect.hasMetadata(rDescriptionKey, target, key)) {
        return 'No description';
    }

    return Reflect.getMetadata(rDescriptionKey, target, key) as string;
}

export const getEndpointDescriptionMetadata = (target: any): string => {
    if (!Reflect.hasMetadata(eDescriptionKey, target)) {
        return 'No descritpion';
    }

    return Reflect.getMetadata(eDescriptionKey, target) as string;
}