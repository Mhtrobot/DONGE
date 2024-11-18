import {NextFunction} from "express";
import {UserAuthenticatedReq} from "../interfaces/AuthenticatedRequest";
import {validateJWT} from "../core/JWT";

export const protectUser = async (req: UserAuthenticatedReq, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res.status(401).json({
            message: "NOT AUTHORIZED❌"
        });
    }

    const [, token] = bearer.split(' ');
    if (!token) {
        return res.status(401).json({
            message: "NOT AUTHORIZED❌",
        });
    }

    try {
        const user = validateJWT(token);

        if (!user) {
            return res.status(401).json({
                message: "INVALID TOKEN❌"
            });
        }

        req.user = {
            id: user.id,
        }
    } catch (error) {
        return res.status(401).json({
            message: "INVALID TOKEN ❌",
        });
    }

    next();
};