"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreetingEndpoint = void 0;
const decorators_1 = require("../decorators");
const models_1 = require("../models");
let GreetingEndpoint = class GreetingEndpoint {
    get() {
        return models_1.Ok('Hello my friend :D');
    }
};
__decorate([
    decorators_1.Get('/'),
    decorators_1.RouteDescription('Returns a polite greeting')
], GreetingEndpoint.prototype, "get", null);
GreetingEndpoint = __decorate([
    decorators_1.Endpoint('greet')
], GreetingEndpoint);
exports.GreetingEndpoint = GreetingEndpoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JlZXRpbmcuZW5kcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXhhbXBsZS9ncmVldGluZy5lbmRwb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw4Q0FBZ0U7QUFDaEUsc0NBQStCO0FBRy9CLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBSXpCLEdBQUc7UUFDQyxPQUFPLFdBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FFSixDQUFBO0FBSkc7SUFGQyxnQkFBRyxDQUFDLEdBQUcsQ0FBQztJQUNSLDZCQUFnQixDQUFDLDJCQUEyQixDQUFDOzJDQUc3QztBQU5RLGdCQUFnQjtJQUQ1QixxQkFBUSxDQUFDLE9BQU8sQ0FBQztHQUNMLGdCQUFnQixDQVE1QjtBQVJZLDRDQUFnQiJ9