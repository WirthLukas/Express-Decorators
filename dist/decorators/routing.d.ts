/**
 * Defines an endpoint at the given path, with the given prefix
 *
 * An endpoint defines methods, which can be accessed by a specifed path,
 * based on the endpoint path.
 *
 * @param path the route path of the endpoint
 * @param prefix the path between the main url and the endpoint path
 */
export declare const Endpoint: (path: string, prefix?: string | string[]) => (target: Function) => void;
/**
 * Registers get route
 * @param path path to that route
 */
export declare const Get: (path: string) => MethodDecorator;
/**
 * Registers post route
 * @param path path to that route
 */
export declare const Post: (path: string) => MethodDecorator;
/**
 * Registers put route
 * @param path path to that route
 */
export declare const Put: (path: string) => MethodDecorator;
/**
 * Registers delete route
 * @param path path to that route
 */
export declare const Delete: (path: string) => MethodDecorator;
