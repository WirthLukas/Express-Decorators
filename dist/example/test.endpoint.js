"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEndpoint = void 0;
const express_validator_1 = require("express-validator");
const decorators_1 = require("../decorators");
const models_1 = require("../models");
let TestEndpoint = class TestEndpoint {
    constructor() {
        this.text = "Hello";
    }
    getAll() {
        console.log(this.text);
        return models_1.Ok(this.text);
    }
    getSpec() {
        console.log('spec');
        return models_1.Ok('specific');
    }
    getLimited(limit) {
        const result = [];
        limit = parseInt(limit);
        for (let i = 0; i < limit; i++)
            result.push(Math.random() * 1000);
        return models_1.Ok({ result: result });
    }
    returner(header) {
        return models_1.Ok(header);
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // throw new Error('oh no, an exception');
            console.log(id);
            return models_1.Ok("The id " + id);
        });
    }
    add(req, res) {
        res.setHeader('test-value', 'it works');
        return models_1.Ok(req.body);
    }
};
__decorate([
    decorators_1.InjectRouter()
], TestEndpoint.prototype, "router", void 0);
__decorate([
    decorators_1.Get('/'),
    decorators_1.Middleware((req, res, next) => {
        console.log('hey ho, a new middleware arived :D');
        next();
    }),
    decorators_1.RouteDescription('Simple get route')
], TestEndpoint.prototype, "getAll", null);
__decorate([
    decorators_1.Get('/spec'),
    decorators_1.Get('/two'),
    decorators_1.Middleware((req, res, next) => {
        console.log('hey ho, a new middleware arived :D');
        next();
    })
], TestEndpoint.prototype, "getSpec", null);
__decorate([
    decorators_1.Get('/limited'),
    decorators_1.Validate(express_validator_1.query('limit', 'no limit defined').isNumeric()),
    decorators_1.Validate(express_validator_1.query('pos', 'need a position').isNumeric()),
    __param(0, decorators_1.Query('limit'))
], TestEndpoint.prototype, "getLimited", null);
__decorate([
    decorators_1.Get('/return'),
    __param(0, decorators_1.Headers())
], TestEndpoint.prototype, "returner", null);
__decorate([
    decorators_1.Get('/:id'),
    __param(0, decorators_1.Params('id'))
], TestEndpoint.prototype, "getById", null);
__decorate([
    decorators_1.Post('/')
], TestEndpoint.prototype, "add", null);
TestEndpoint = __decorate([
    decorators_1.Endpoint('test'),
    decorators_1.EndpointDescription('just for testing')
], TestEndpoint);
exports.TestEndpoint = TestEndpoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5lbmRwb2ludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlL3Rlc3QuZW5kcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseURBQTBDO0FBQzFDLDhDQUF1SjtBQUN2SixzQ0FBK0I7QUFJL0IsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUF6QjtRQUtXLFNBQUksR0FBVyxPQUFPLENBQUM7SUFzRGxDLENBQUM7SUE5Q0csTUFBTTtRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sV0FBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBUUQsT0FBTztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsT0FBTyxXQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUtELFVBQVUsQ0FBa0IsS0FBVTtRQUNsQyxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDNUIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRTtZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUV0QyxPQUFPLFdBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFHRCxRQUFRLENBQVksTUFBVztRQUMzQixPQUFPLFdBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBR0ssT0FBTyxDQUFnQixFQUFVOztZQUNuQywwQ0FBMEM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQixPQUFPLFdBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDOUIsQ0FBQztLQUFBO0lBR0QsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhO1FBQzNCLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sV0FBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBQ0osQ0FBQTtBQXhERztJQURDLHlCQUFZLEVBQUU7NENBQ21CO0FBVWxDO0lBTkMsZ0JBQUcsQ0FBQyxHQUFHLENBQUM7SUFDUix1QkFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUM7SUFDRCw2QkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQzswQ0FJcEM7QUFRRDtJQU5DLGdCQUFHLENBQUMsT0FBTyxDQUFDO0lBQ1osZ0JBQUcsQ0FBQyxNQUFNLENBQUM7SUFDWCx1QkFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUM7MkNBSUQ7QUFLRDtJQUhDLGdCQUFHLENBQUMsVUFBVSxDQUFDO0lBQ2YscUJBQVEsQ0FBQyx5QkFBSyxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3hELHFCQUFRLENBQUMseUJBQUssQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN6QyxXQUFBLGtCQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7OENBUTFCO0FBR0Q7SUFEQyxnQkFBRyxDQUFDLFNBQVMsQ0FBQztJQUNMLFdBQUEsb0JBQU8sRUFBRSxDQUFBOzRDQUVsQjtBQUdEO0lBREMsZ0JBQUcsQ0FBQyxNQUFNLENBQUM7SUFDSSxXQUFBLG1CQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7MkNBSTNCO0FBR0Q7SUFEQyxpQkFBSSxDQUFDLEdBQUcsQ0FBQzt1Q0FJVDtBQTFEUSxZQUFZO0lBRnhCLHFCQUFRLENBQUMsTUFBTSxDQUFDO0lBQ2hCLGdDQUFtQixDQUFDLGtCQUFrQixDQUFDO0dBQzNCLFlBQVksQ0EyRHhCO0FBM0RZLG9DQUFZIn0=