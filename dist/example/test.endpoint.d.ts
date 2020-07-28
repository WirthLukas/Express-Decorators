import { Router, Request, Response } from "express";
export declare class TestEndpoint {
    router: Router | undefined;
    text: string;
    getAll(): import("../models").JsonResponse<string>;
    getSpec(): import("../models").JsonResponse<string>;
    getLimited(limit: any): import("../models").JsonResponse<{
        result: number[];
    }>;
    returner(header: any): import("../models").JsonResponse<any>;
    getById(id: string): Promise<import("../models").JsonResponse<string>>;
    add(req: Request, res: Response): import("../models").JsonResponse<any>;
}
