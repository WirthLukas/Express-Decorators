export declare const enum StatusCode {
    Ok = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500,
    NotImplemented = 501
}
export declare class JsonResponse<T> {
    statusCode: number;
    value: T;
    constructor(statusCode: number, value: T);
}
export declare const Ok: <T>(value: T) => JsonResponse<T>;
export declare const Created: <T>(value: T) => JsonResponse<T>;
export declare const NoContent: <T>(value: T) => JsonResponse<T>;
export declare const BadRequest: <T>(value: T) => JsonResponse<T>;
export declare const NotFound: <T>(value: T) => JsonResponse<T>;
export declare const InternalServerError: <T>(value: T) => JsonResponse<T>;
export declare const NotImplemented: <T>(value: T) => JsonResponse<T>;
