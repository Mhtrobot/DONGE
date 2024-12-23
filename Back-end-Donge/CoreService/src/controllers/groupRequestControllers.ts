import { container } from "tsyringe";
import { GroupRequestServices } from "../services/groupRequestServices";
import { UserAuthenticatedReq } from "../../../IAMservice/src/interfaces/AuthenticatedRequest";
import { validationResult } from "express-validator";

const groupRequestServices = container.resolve(GroupRequestServices);

export const createGroupRequest = async (req: UserAuthenticatedReq, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({success: false, message: errors.array()});

    let {groupId, recieverPhone} = req.body;
    const senderId = req.user.id;

    recieverPhone = recieverPhone.replace("+98", "0");
    if ((recieverPhone as string).startsWith("98")) {
        recieverPhone = recieverPhone.replace("98", "0");
    }

    const result = await groupRequestServices.createGroupRequest(groupId, senderId, recieverPhone);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const getGroupRequests = async (req: UserAuthenticatedReq, res) => {
    const userId = req.user.id;

    const result = await groupRequestServices.getGroupRequests(userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const acceptGroupRequest = async (req: UserAuthenticatedReq, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({success: false, message: errors.array()});

    const userId = req.user.id;
    const requestId = parseInt(req.params.requestId);
    const isAccepted = req.body.isAccepted;

    const result = await groupRequestServices.acceptGroupRequest(userId, requestId, isAccepted);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const deleteGroupRequest = async (req: UserAuthenticatedReq, res) => {
    const userId = req.user.id;
    const requestId = parseInt(req.params.requestId);

    const result = await groupRequestServices.deleteGroupRequest(userId, requestId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}