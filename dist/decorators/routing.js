"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = exports.Endpoint = void 0;
const meta_1 = require("../meta");
/**
 * Defines an endpoint at the given path, with the given prefix
 *
 * An endpoint defines methods, which can be accessed by a specifed path,
 * based on the endpoint path.
 *
 * @param path the route path of the endpoint
 * @param prefix the path between the main url and the endpoint path
 */
exports.Endpoint = (path, prefix = 'api') => {
    return (target) => {
        // if prefix is of type array, join the value, otherwise it should be of type string 
        const finalPrefix = prefix instanceof Array ? prefix.join('/') : prefix;
        const endpointMeta = meta_1.getEndpointMeta(target);
        endpointMeta.path = `/${finalPrefix}/${path}`;
        endpointMeta.definitionFinished = true;
    };
};
const route = (method, path, target, methodName) => {
    const endpointMeta = meta_1.getEndpointMeta(target.constructor);
    const route = meta_1.getOrCreateRouteAccess(endpointMeta, methodName);
    route.path = path;
    route.method = method;
};
/**
 * Registers get route
 * @param path path to that route
 */
exports.Get = (path) => {
    return (target, key, descriptor) => {
        route('get', path, target, key);
    };
};
/**
 * Registers post route
 * @param path path to that route
 */
exports.Post = (path) => {
    return (target, key, descriptor) => {
        route('post', path, target, key);
    };
};
/**
 * Registers put route
 * @param path path to that route
 */
exports.Put = (path) => {
    return (target, key, descriptor) => {
        route('put', path, target, key);
    };
};
/**
 * Registers delete route
 * @param path path to that route
 */
exports.Delete = (path) => {
    return (target, key, descriptor) => {
        route('delete', path, target, key);
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL3JvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBQTZHO0FBRTdHOzs7Ozs7OztHQVFHO0FBQ1UsUUFBQSxRQUFRLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBNEIsS0FBSyxFQUFFLEVBQUU7SUFDeEUsT0FBTyxDQUFDLE1BQWdCLEVBQUUsRUFBRTtRQUN4QixxRkFBcUY7UUFDckYsTUFBTSxXQUFXLEdBQVcsTUFBTSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2hGLE1BQU0sWUFBWSxHQUFpQixzQkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNELFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFLENBQUM7UUFDOUMsWUFBWSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztJQUMzQyxDQUFDLENBQUE7QUFDTCxDQUFDLENBQUE7QUFFRCxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQWtCLEVBQUUsSUFBWSxFQUFFLE1BQWMsRUFBRSxVQUFrQixFQUFFLEVBQUU7SUFDbkYsTUFBTSxZQUFZLEdBQWlCLHNCQUFlLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sS0FBSyxHQUFvQiw2QkFBc0IsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFaEYsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDMUIsQ0FBQyxDQUFBO0FBRUQ7OztHQUdHO0FBQ1UsUUFBQSxHQUFHLEdBQUcsQ0FBQyxJQUFZLEVBQW1CLEVBQUU7SUFDakQsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLFVBQThCLEVBQUUsRUFBRTtRQUM1RSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBYSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFBO0FBRUQ7OztHQUdHO0FBQ1UsUUFBQSxJQUFJLEdBQUcsQ0FBQyxJQUFZLEVBQW1CLEVBQUU7SUFDbEQsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLFVBQThCLEVBQUUsRUFBRTtRQUM1RSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBYSxDQUFDLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFBO0FBRUQ7OztHQUdHO0FBQ1UsUUFBQSxHQUFHLEdBQUcsQ0FBQyxJQUFZLEVBQW1CLEVBQUU7SUFDakQsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLFVBQThCLEVBQUUsRUFBRTtRQUM1RSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBYSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFBO0FBRUQ7OztHQUdHO0FBQ1UsUUFBQSxNQUFNLEdBQUcsQ0FBQyxJQUFZLEVBQW1CLEVBQUU7SUFDcEQsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLFVBQThCLEVBQUUsRUFBRTtRQUM1RSxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBYSxDQUFDLENBQUE7SUFDaEQsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFBIn0=