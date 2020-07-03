export const descriptionKey = Symbol('descriptionKey');

export const Description = (text: string): MethodDecorator => {
    return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(descriptionKey, text, target.constructor, key);
    };
}

export const getDescriptionMetadata = (target: any, key: string |symbol): string => {
    if (!Reflect.hasMetadata(descriptionKey, target, key)) {
        return 'No description';
    }

    return Reflect.getMetadata(descriptionKey, target, key) as string;
}