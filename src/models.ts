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

export class Ok<T> extends JsonResponse<T> {
    constructor(value: T) {
        super(StatusCode.Ok, value);
    }
}

export class Created<T> extends JsonResponse<T> {
    constructor(value: T) {
        super(StatusCode.Created, value);
    }
}

export class NoContent<T> extends JsonResponse<T> {
    constructor(value: T) {
        super(StatusCode.NoContent, value);
    }
}

export class BadRequest<T> extends JsonResponse<T> {
    constructor(value: T) {
        super(StatusCode.BadRequest, value);
    }
}

export class NotFound<T> extends JsonResponse<T> {
    constructor(value: T) {
        super(StatusCode.NotFound, value);
    }
}
