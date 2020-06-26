export const enum StatusCode {
    Ok = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    NotFound = 404
}

export class JsonResponse<T> {
    constructor(
        public statusCode: number,
        public value: T) {       
    }
}

export const Ok = <T>(value: T) => new JsonResponse(StatusCode.Ok, value);
export const Created = <T>(value: T) => new JsonResponse(StatusCode.Created, value);
export const NoContent = <T>(value: T) => new JsonResponse(StatusCode.NoContent, value);
export const BadRequest = <T>(value: T) => new JsonResponse(StatusCode.BadRequest, value);
export const NotFound = <T>(value: T) => new JsonResponse(StatusCode.NotFound, value);
export const Failed = <T>(value: T) => new JsonResponse(500, value);
