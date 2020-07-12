import { getEndpointMeta, ParameterType, ParameterConfig } from '../meta';

const getOrCreateParameterConfigs = (target: Object, methodName: string): ParameterConfig[] => {
    const endpointMeta = getEndpointMeta(target.constructor);

    if (!endpointMeta.params[methodName]) {
        endpointMeta.params[methodName] = [];
    }

    return endpointMeta.params[methodName];
}

export const Body = (name?: string): ParameterDecorator => {
    return (target: Object, key: string | symbol, index: number) => {
        const config: ParameterConfig[] = getOrCreateParameterConfigs(target, key as string);
        config.push({ index, type: ParameterType.Body, name });
    }
}

export const Query = (name?: string): ParameterDecorator => {
    return (target: Object, key: string | symbol, index: number) => {
        const config: ParameterConfig[] = getOrCreateParameterConfigs(target, key as string);
        config.push({ index, type: ParameterType.Query, name });
    }
}

export const Params = (name?: string): ParameterDecorator => {
    return (target: Object, key: string | symbol, index: number) => {
        const config: ParameterConfig[] = getOrCreateParameterConfigs(target, key as string);
        config.push({ index, type: ParameterType.Params, name });
    }
}

export const Headers = (name?: string): ParameterDecorator => {
    return (target: Object, key: string | symbol, index: number) => {
        const config: ParameterConfig[] = getOrCreateParameterConfigs(target, key as string);
        config.push({ index, type: ParameterType.Headers, name });
    }
}