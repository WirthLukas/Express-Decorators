"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointDescription = exports.RouteDescription = void 0;
const meta_1 = require("../meta");
/**
 * Creates a description for the given route
 * @param text the description text
 */
exports.RouteDescription = (text) => {
    return (target, key, descriptor) => {
        const endpointMeta = meta_1.getEndpointMeta(target.constructor);
        const route = meta_1.getOrCreateRouteAccess(endpointMeta, key);
        route.description = text;
    };
};
/**
 * Creates a description for the given endpoint
 * @param text the description text
 */
exports.EndpointDescription = (text) => {
    return (target) => {
        const endpointMeta = meta_1.getEndpointMeta(target);
        endpointMeta.description = text;
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2RvY3VtZW50YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBQWlHO0FBRWpHOzs7R0FHRztBQUNVLFFBQUEsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFZLEVBQW1CLEVBQUU7SUFDOUQsT0FBTyxDQUFDLE1BQVcsRUFBRSxHQUFvQixFQUFFLFVBQThCLEVBQUUsRUFBRTtRQUN6RSxNQUFNLFlBQVksR0FBaUIsc0JBQWUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkUsTUFBTSxLQUFLLEdBQW9CLDZCQUFzQixDQUFDLFlBQVksRUFBRSxHQUFhLENBQUMsQ0FBQztRQUNuRixLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDLENBQUM7QUFDTixDQUFDLENBQUE7QUFFRDs7O0dBR0c7QUFDVSxRQUFBLG1CQUFtQixHQUFHLENBQUMsSUFBWSxFQUFrQixFQUFFO0lBQ2hFLE9BQU8sQ0FBQyxNQUFnQixFQUFFLEVBQUU7UUFDeEIsTUFBTSxZQUFZLEdBQWlCLHNCQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFBIn0=