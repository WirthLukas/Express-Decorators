"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookies = exports.Headers = exports.Params = exports.Query = exports.Body = void 0;
const meta_1 = require("../meta");
const getOrCreateParameterConfigs = (target, methodName) => {
    var _a;
    const endpointMeta = meta_1.getEndpointMeta(target.constructor);
    // if (!endpointMeta.params[methodName]) {
    //     endpointMeta.params[methodName] = [];
    // }
    // return endpointMeta.params[methodName];
    return (_a = endpointMeta.params[methodName]) !== null && _a !== void 0 ? _a : (endpointMeta.params[methodName] = []);
};
/**
 * Express req.body object or single body param, if body param name was specified
 * @param name
 */
exports.Body = (name) => {
    return (target, key, index) => {
        const config = getOrCreateParameterConfigs(target, key);
        config.push({ index, type: 2 /* Body */, name });
    };
};
/**
 * Express req.query object or single query param, if query param name was specified
 * @param name
 */
exports.Query = (name) => {
    return (target, key, index) => {
        const config = getOrCreateParameterConfigs(target, key);
        config.push({ index, type: 1 /* Query */, name });
    };
};
/**
 * Express req.params object or single param, if param name was specified
 * @param name
 */
exports.Params = (name) => {
    return (target, key, index) => {
        const config = getOrCreateParameterConfigs(target, key);
        config.push({ index, type: 0 /* Params */, name });
    };
};
/**
 * Express req.headers object or single headers param, if headers param name was specified
 * @param name
 */
exports.Headers = (name) => {
    return (target, key, index) => {
        const config = getOrCreateParameterConfigs(target, key);
        config.push({ index, type: 3 /* Headers */, name });
    };
};
/**
 * Express req.cookies object or single cookies param, if cookies param name was specified
 * @param name
 */
exports.Cookies = (name) => {
    return (target, key, index) => {
        const config = getOrCreateParameterConfigs(target, key);
        config.push({ index, type: 4 /* Cookies */, name });
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW10ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlY29yYXRvcnMvcGFyYW10ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtDQUEwRTtBQUUxRSxNQUFNLDJCQUEyQixHQUFHLENBQUMsTUFBYyxFQUFFLFVBQWtCLEVBQXFCLEVBQUU7O0lBQzFGLE1BQU0sWUFBWSxHQUFHLHNCQUFlLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXpELDBDQUEwQztJQUMxQyw0Q0FBNEM7SUFDNUMsSUFBSTtJQUVKLDBDQUEwQztJQUUxQyxhQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLG1DQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNyRixDQUFDLENBQUE7QUFFRDs7O0dBR0c7QUFDVSxRQUFBLElBQUksR0FBRyxDQUFDLElBQWEsRUFBc0IsRUFBRTtJQUN0RCxPQUFPLENBQUMsTUFBYyxFQUFFLEdBQW9CLEVBQUUsS0FBYSxFQUFFLEVBQUU7UUFDM0QsTUFBTSxNQUFNLEdBQXNCLDJCQUEyQixDQUFDLE1BQU0sRUFBRSxHQUFhLENBQUMsQ0FBQztRQUNyRixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksY0FBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQTtBQUVEOzs7R0FHRztBQUNVLFFBQUEsS0FBSyxHQUFHLENBQUMsSUFBYSxFQUFzQixFQUFFO0lBQ3ZELE9BQU8sQ0FBQyxNQUFjLEVBQUUsR0FBb0IsRUFBRSxLQUFhLEVBQUUsRUFBRTtRQUMzRCxNQUFNLE1BQU0sR0FBc0IsMkJBQTJCLENBQUMsTUFBTSxFQUFFLEdBQWEsQ0FBQyxDQUFDO1FBQ3JGLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxlQUFxQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBRUQ7OztHQUdHO0FBQ1UsUUFBQSxNQUFNLEdBQUcsQ0FBQyxJQUFhLEVBQXNCLEVBQUU7SUFDeEQsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLEtBQWEsRUFBRSxFQUFFO1FBQzNELE1BQU0sTUFBTSxHQUFzQiwyQkFBMkIsQ0FBQyxNQUFNLEVBQUUsR0FBYSxDQUFDLENBQUM7UUFDckYsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLGdCQUFzQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBRUQ7OztHQUdHO0FBQ1UsUUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFhLEVBQXNCLEVBQUU7SUFDekQsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLEtBQWEsRUFBRSxFQUFFO1FBQzNELE1BQU0sTUFBTSxHQUFzQiwyQkFBMkIsQ0FBQyxNQUFNLEVBQUUsR0FBYSxDQUFDLENBQUM7UUFDckYsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLGlCQUF1QixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBRUQ7OztHQUdHO0FBQ1UsUUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUFhLEVBQXNCLEVBQUU7SUFDekQsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLEtBQWEsRUFBRSxFQUFFO1FBQzNELE1BQU0sTUFBTSxHQUFzQiwyQkFBMkIsQ0FBQyxNQUFNLEVBQUUsR0FBYSxDQUFDLENBQUM7UUFDckYsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLGlCQUF1QixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBIn0=