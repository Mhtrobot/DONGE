import { Request } from "express";
export interface UserAuthenticatedReq extends Request {
    user?: {
        id: number;
    };
}