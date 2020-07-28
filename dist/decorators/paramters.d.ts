/**
 * Express req.body object or single body param, if body param name was specified
 * @param name
 */
export declare const Body: (name?: string | undefined) => ParameterDecorator;
/**
 * Express req.query object or single query param, if query param name was specified
 * @param name
 */
export declare const Query: (name?: string | undefined) => ParameterDecorator;
/**
 * Express req.params object or single param, if param name was specified
 * @param name
 */
export declare const Params: (name?: string | undefined) => ParameterDecorator;
/**
 * Express req.headers object or single headers param, if headers param name was specified
 * @param name
 */
export declare const Headers: (name?: string | undefined) => ParameterDecorator;
/**
 * Express req.cookies object or single cookies param, if cookies param name was specified
 * @param name
 */
export declare const Cookies: (name?: string | undefined) => ParameterDecorator;
