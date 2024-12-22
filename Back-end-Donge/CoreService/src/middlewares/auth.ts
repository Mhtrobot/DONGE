// src/middlewares/auth.ts
import {validateJWT} from "../core/JWT";
import {UserAuthenticatedReq} from "../../../IAMservice/src/interfaces/AuthenticatedRequest";

export const protectUser = async (req: UserAuthenticatedReq, res, next) => {
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