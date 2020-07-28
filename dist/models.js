"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplemented = exports.InternalServerError = exports.NotFound = exports.BadRequest = exports.NoContent = exports.Created = exports.Ok = exports.JsonResponse = void 0;
class JsonResponse {
    constructor(statusCode, value) {
        this.statusCode = statusCode;
        this.value = value;
    }
}
exports.JsonResponse = JsonResponse;
exports.Ok = (value) => new JsonResponse(200 /* Ok */, value);
exports.Created = (value) => new JsonResponse(201 /* Created */, value);
exports.NoContent = (value) => new JsonResponse(204 /* NoContent */, value);
exports.BadRequest = (value) => new JsonResponse(400 /* BadRequest */, value);
exports.NotFound = (value) => new JsonResponse(404 /* NotFound */, value);
exports.InternalServerError = (value) => new JsonResponse(500 /* InternalServerError */, value);
exports.NotImplemented = (value) => new JsonResponse(501 /* NotImplemented */, value);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFVQSxNQUFhLFlBQVk7SUFDckIsWUFDVyxVQUFrQixFQUNsQixLQUFRO1FBRFIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFHO0lBQ25CLENBQUM7Q0FDSjtBQUxELG9DQUtDO0FBRVksUUFBQSxFQUFFLEdBQUcsQ0FBSSxLQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksWUFBWSxlQUFnQixLQUFLLENBQUMsQ0FBQztBQUM3RCxRQUFBLE9BQU8sR0FBRyxDQUFJLEtBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxZQUFZLG9CQUFxQixLQUFLLENBQUMsQ0FBQztBQUN2RSxRQUFBLFNBQVMsR0FBRyxDQUFJLEtBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxZQUFZLHNCQUF1QixLQUFLLENBQUMsQ0FBQztBQUMzRSxRQUFBLFVBQVUsR0FBRyxDQUFJLEtBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxZQUFZLHVCQUF3QixLQUFLLENBQUMsQ0FBQztBQUM3RSxRQUFBLFFBQVEsR0FBRyxDQUFJLEtBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxZQUFZLHFCQUFzQixLQUFLLENBQUMsQ0FBQztBQUN6RSxRQUFBLG1CQUFtQixHQUFHLENBQUksS0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLFlBQVksZ0NBQWlDLEtBQUssQ0FBQyxDQUFDO0FBQy9GLFFBQUEsY0FBYyxHQUFHLENBQUksS0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLFlBQVksMkJBQTRCLEtBQUssQ0FBQyxDQUFDIn0=