"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = exports.InjectRouter = exports.Middleware = exports.injectRouterKey = void 0;
const meta_1 = require("../meta");
exports.injectRouterKey = Symbol('injectRouterKey');
/**
 * Defines a middleware for the given method
 * @param middleware
 */
exports.Middleware = (middleware) => {
    return (target, key, descriptor) => {
        var _a;
        const endpointMeta = meta_1.getEndpointMeta(target.constructor);
        const route = meta_1.getOrCreateRouteAccess(endpointMeta, key);
        if (!route.middleware) {
            route.middleware = [middleware];
        }
        else {
            (_a = route.middleware) === null || _a === void 0 ? void 0 : _a.push(middleware);
        }
    };
};
/**
 * The Router Object of the endpoint will be assigned to this property
 */
exports.InjectRouter = () => {
    return (target, key) => {
        Reflect.defineMetadata(exports.injectRouterKey, key, target.constructor);
    };
};
/**
 * Defines a validation chain for the given route
 * @param validation
 */
exports.Validate = (validation) => {
    return (target, key, descriptor) => {
        const toStore = validation instanceof Array
            ? validation
            : [validation];
        const endpointMeta = meta_1.getEndpointMeta(target.constructor);
        const route = meta_1.getOrCreateRouteAccess(endpointMeta, key);
        if (!route.validations) {
            route.validations = toStore;
        }
        else {
            toStore.forEach(validation => { var _a; return (_a = route.validations) === null || _a === void 0 ? void 0 : _a.push(validation); });
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVjb3JhdG9ycy9vdGhlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxrQ0FBZ0Y7QUFFbkUsUUFBQSxlQUFlLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFekQ7OztHQUdHO0FBQ1UsUUFBQSxVQUFVLEdBQUcsQ0FBQyxVQUEwQixFQUFtQixFQUFFO0lBQ3RFLE9BQU8sQ0FBQyxNQUFjLEVBQUUsR0FBb0IsRUFBRSxVQUE4QixFQUFFLEVBQUU7O1FBQzVFLE1BQU0sWUFBWSxHQUFpQixzQkFBZSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RSxNQUFNLEtBQUssR0FBRyw2QkFBc0IsQ0FBQyxZQUFZLEVBQUUsR0FBYSxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFDbkIsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFFLFVBQVUsQ0FBRSxDQUFDO1NBQ3JDO2FBQU07WUFDSCxNQUFBLEtBQUssQ0FBQyxVQUFVLDBDQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7U0FDdEM7SUFDTCxDQUFDLENBQUM7QUFDTixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNVLFFBQUEsWUFBWSxHQUFHLEdBQXNCLEVBQUU7SUFDaEQsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLEVBQUU7UUFDNUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyx1QkFBZSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckUsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFBO0FBRUQ7OztHQUdHO0FBQ1UsUUFBQSxRQUFRLEdBQUcsQ0FBQyxVQUErQyxFQUFtQixFQUFFO0lBQ3pGLE9BQU8sQ0FBQyxNQUFjLEVBQUUsR0FBb0IsRUFBRSxVQUE4QixFQUFFLEVBQUU7UUFDNUUsTUFBTSxPQUFPLEdBQUcsVUFBVSxZQUFZLEtBQUs7WUFDdkMsQ0FBQyxDQUFDLFVBQVU7WUFDWixDQUFDLENBQUMsQ0FBRSxVQUFVLENBQUUsQ0FBQztRQUVyQixNQUFNLFlBQVksR0FBaUIsc0JBQWUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkUsTUFBTSxLQUFLLEdBQUcsNkJBQXNCLENBQUMsWUFBWSxFQUFFLEdBQWEsQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQ3BCLEtBQUssQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1NBQy9CO2FBQU07WUFDSCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLHdCQUFDLEtBQUssQ0FBQyxXQUFXLDBDQUFFLElBQUksQ0FBQyxVQUFVLElBQUMsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFBIn0=