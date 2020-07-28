"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateRouteAccess = exports.getEndpointMeta = void 0;
const endpointKey = Symbol('endpointKey');
exports.getEndpointMeta = (target) => {
    if (!Reflect.hasMetadata(endpointKey, target)) {
        const endpointMeta = {
            path: '',
            routes: {},
            params: {},
            definitionFinished: false
        };
        Reflect.defineMetadata(endpointKey, endpointMeta, target);
    }
    return Reflect.getMetadata(endpointKey, target);
};
// export const getOrCreateRouteAccess = (meta: EndpointMeta, methodName: string): RouteDefinition => {
//     if (!meta.routes[methodName]) {
//         meta.routes[methodName] = {
//             path: '',
//             method: 'get'
//         };
//     }
//     return meta.routes[methodName];
// }
exports.getOrCreateRouteAccess = (meta, methodName) => {
    var _a;
    return (_a = meta.routes[methodName]) !== null && _a !== void 0 ? _a : (meta.routes[methodName] = {
        path: '',
        method: 'get'
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQTRDQSxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFN0IsUUFBQSxlQUFlLEdBQUcsQ0FBQyxNQUFXLEVBQWdCLEVBQUU7SUFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQzNDLE1BQU0sWUFBWSxHQUFpQjtZQUMvQixJQUFJLEVBQUUsRUFBRTtZQUNSLE1BQU0sRUFBRSxFQUFFO1lBQ1YsTUFBTSxFQUFFLEVBQUU7WUFDVixrQkFBa0IsRUFBRSxLQUFLO1NBQzVCLENBQUE7UUFFRCxPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDN0Q7SUFFRCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBaUIsQ0FBQztBQUNwRSxDQUFDLENBQUE7QUFFRCx1R0FBdUc7QUFDdkcsc0NBQXNDO0FBQ3RDLHNDQUFzQztBQUN0Qyx3QkFBd0I7QUFDeEIsNEJBQTRCO0FBQzVCLGFBQWE7QUFDYixRQUFRO0FBRVIsc0NBQXNDO0FBQ3RDLElBQUk7QUFFUyxRQUFBLHNCQUFzQixHQUFHLENBQUMsSUFBa0IsRUFBRSxVQUFrQixFQUFtQixFQUFFOztJQUM5RixhQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLG1DQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRztRQUN6RCxJQUFJLEVBQUUsRUFBRTtRQUNSLE1BQU0sRUFBRSxLQUFLO0tBQ2hCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSJ9