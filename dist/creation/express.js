"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEndpoint = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const decorators_1 = require("../decorators");
const meta_1 = require("../meta");
exports.createEndpoint = (instance, app) => {
    const router = express_1.Router();
    initRoutes(instance, router);
    addRouterToApplication(app, instance, router);
    injectRouterIfNeccessary(router, instance);
};
const initRoutes = (instance, router) => {
    const endpointMeta = meta_1.getEndpointMeta(instance.constructor);
    if (!endpointMeta.definitionFinished)
        throw new Error('Endpoint definition not finished! Maybe you forgot tho decorate the class with the @Endpoint decorator?');
    const routes = endpointMeta.routes;
    Object.keys(endpointMeta.routes).forEach(methodName => {
        var _a, _b;
        const route = routes[methodName];
        const validations = (_a = route.validations) !== null && _a !== void 0 ? _a : []; // if route.validations is null or undefined, the value will be []
        const middleware = (_b = route.middleware) !== null && _b !== void 0 ? _b : [];
        const params = endpointMeta.params[methodName];
        router[route.method](route.path, validations, middleware, (req, res) => {
            const error = express_validator_1.validationResult(req);
            if (!error.isEmpty())
                return res.status(400 /* BadRequest */).json({ errors: error.array() });
            const args = extractParameters(req, params);
            args.push(req, res);
            Promise.resolve(instance[methodName].apply(instance, args))
                .then(result => {
                if (result instanceof models_1.JsonResponse) {
                    res.status(result.statusCode).send(result.value);
                }
                else {
                    console.warn(`Can not handle return value of Method ${methodName} in ${instance.constructor.name}`);
                }
            })
                .catch(err => {
                res.status(500 /* InternalServerError */).send({ msg: `something went wrong!`, err: err.toString() });
            });
        });
    });
};
const extractParameters = (req, params) => {
    if (!params || !params.length) {
        return [];
    }
    const args = [];
    for (const { index, type, name } of params) {
        switch (type) {
            case 2 /* Body */:
                args[index] = name ? req.body[name] : req.body;
                break;
            case 0 /* Params */:
                args[index] = name ? req.params[name] : req.params;
                break;
            case 1 /* Query */:
                args[index] = name ? req.query[name] : req.query;
                break;
            case 3 /* Headers */:
                args[index] = name ? req.headers[name] : req.headers;
                break;
            case 4 /* Cookies */:
                args[index] = name ? req.cookies[name] : req.cookies;
                break;
            default:
                throw new Error('Not supported Param Type');
        }
    }
    return args;
};
const addRouterToApplication = (app, instance, router) => {
    const endpointMeta = meta_1.getEndpointMeta(instance.constructor);
    app.use(endpointMeta.path, router);
};
const injectRouterIfNeccessary = (router, instance) => {
    if (Reflect.hasMetadata(decorators_1.injectRouterKey, instance.constructor)) {
        const injectRouterProperty = Reflect.getMetadata(decorators_1.injectRouterKey, instance.constructor);
        instance[injectRouterProperty] = router;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcmVhdGlvbi9leHByZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFpRTtBQUNqRSx5REFBOEU7QUFDOUUsc0NBQXFEO0FBQ3JELDhDQUFnRDtBQUNoRCxrQ0FBc0g7QUFFekcsUUFBQSxjQUFjLEdBQUcsQ0FBQyxRQUFhLEVBQUUsR0FBZ0IsRUFBRSxFQUFFO0lBQzlELE1BQU0sTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztJQUV4QixVQUFVLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQTtBQUVELE1BQU0sVUFBVSxHQUFHLENBQUMsUUFBYSxFQUFFLE1BQWMsRUFBRSxFQUFFO0lBQ2pELE1BQU0sWUFBWSxHQUFpQixzQkFBZSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV6RSxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQjtRQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLHlHQUF5RyxDQUFDLENBQUM7SUFFL0gsTUFBTSxNQUFNLEdBQWdCLFlBQVksQ0FBQyxNQUFNLENBQUM7SUFFaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztRQUNsRCxNQUFNLEtBQUssR0FBb0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sV0FBVyxTQUFHLEtBQUssQ0FBQyxXQUFXLG1DQUFJLEVBQUUsQ0FBQyxDQUFJLGtFQUFrRTtRQUNsSCxNQUFNLFVBQVUsU0FBRyxLQUFLLENBQUMsVUFBVSxtQ0FBSSxFQUFFLENBQUM7UUFDMUMsTUFBTSxNQUFNLEdBQXNCLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7WUFDdEYsTUFBTSxLQUFLLEdBQTRCLG9DQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTdELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNoQixPQUFPLEdBQUcsQ0FBQyxNQUFNLHNCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTdFLE1BQU0sSUFBSSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVwQixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxNQUFNLFlBQVkscUJBQVksRUFBRTtvQkFDaEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDcEQ7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsVUFBVSxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDdkc7WUFDTCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNULEdBQUcsQ0FBQyxNQUFNLCtCQUFnQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSx1QkFBdUIsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRyxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUFFRCxNQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBWSxFQUFFLE1BQXlCLEVBQVMsRUFBRTtJQUN6RSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUMzQixPQUFPLEVBQUUsQ0FBQztLQUNiO0lBRUQsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBRWhCLEtBQUssTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksTUFBTSxFQUFFO1FBQ3hDLFFBQVEsSUFBSSxFQUFFO1lBQ1Y7Z0JBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDL0MsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ25ELE1BQU07WUFDVjtnQkFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNqRCxNQUFNO1lBQ1Y7Z0JBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztnQkFDckQsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JELE1BQU07WUFDVjtnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDbkQ7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQTtBQUVELE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxHQUFnQixFQUFFLFFBQWEsRUFBRSxNQUFjLEVBQUUsRUFBRTtJQUMvRSxNQUFNLFlBQVksR0FBaUIsc0JBQWUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQTtBQUVELE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxNQUFjLEVBQUUsUUFBYSxFQUFFLEVBQUU7SUFDL0QsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLDRCQUFlLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzVELE1BQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyw0QkFBZSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RixRQUFRLENBQUMsb0JBQW9CLENBQUMsR0FBRyxNQUFNLENBQUM7S0FDM0M7QUFDTCxDQUFDLENBQUEifQ==