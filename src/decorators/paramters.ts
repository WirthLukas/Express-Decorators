import { getEndpointMeta, ParameterType, ParameterConfig } from '../meta';

const getOrCreateParameterConfigs = (target: Object, methodName: string): ParameterConfig[] => {
    const endpointMeta = getEndpointMeta(target.constructor);

    // if (!endpointMeta.params[methodName]) {
    //     endpointMeta.params[methodName] = [];
    // }

    // return endpointMeta.params[methodName];

    return endpointMeta.params[methodName] ?? (endpointMeta.params[methodName] = []);
}

/**
 * Express req.body object or single body param, if body param name was specified
 * @param name 
 */
export const Body = (name?: string): ParameterDecorator => {
    return (target: Object, key: string | symbol, index: number) => {
        const config: ParameterConfig[] = getOrCreateParameterConfigs(target, key as string);
        config.push({ index, type: ParameterType.Body, name });
    }
}

/**
 * Express req.query object or single query param, if query param name was specified
 * @param name 
 */
export const Query = (name?: string): ParameterDecorator => {
    return (target: Object, key: string | symbol, index: number) => {
        const config: ParameterConfig[] = getOrCreateParameterConfigs(target, key as string);
        config.push({ index, type: ParameterType.Query, name });
    }
}

/**
 * Express req.params object or single param, if param name was specified
 * @param name 
 */
export const Params = (name?: string): ParameterDecorator => {
    return (target: Object, key: string | symbol, index: number) => {
        const config: ParameterConfig[] = getOrCreateParameterConfigs(target, key as string);
        config.push({ index, type: ParameterType.Params, name });
    }
}

/**
 * Express req.headers object or single headers param, if headers param name was specified
 * @param name 
 */
export const Headers = (name?: string): ParameterDecorator => {
    return (target: Object, key: string | symbol, index: number) => {
        const config: ParameterConfig[] = getOrCreateParameterConfigs(target, key as string);
        config.push({ index, type: ParameterType.Headers, name });
    }
}

/**
 * Express req.cookies object or single cookies param, if cookies param name was specified
 * @param name 
 */
export const Cookies = (name?: string): ParameterDecorator => {
    return (target: Object, key: string | symbol, index: number) => {
        const config: ParameterConfig[] = getOrCreateParameterConfigs(target, key as string);
        config.push({ index, type: ParameterType.Cookies, name });
    }
}
