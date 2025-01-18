import { container } from "tsyringe";
import { GroupServices } from "../services/groupServices";
import { UserAuthenticatedReq } from "../interfaces/AuthenticatedRequest.ts";
import { validationResult } from "express-validator";

const groupServices = container.resolve(GroupServices);

export const addGroup = async (req: UserAuthenticatedReq, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({message: error.array()});

    const {name, description} = req.body;
    const userId = req.user.id;

    const result = await groupServices.addNewGroup(name, description, userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
};

export const getOwenedGroups = async (req: UserAuthenticatedReq, res) => {
    const userId = req.user.id;

    const result = await groupServices.getOwnedGroups(userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
};

export const getOwenedGroup = async (req: UserAuthenticatedReq, res) => {
    const userId = req.user.id;
    const groupId = parseInt(req.params.groupId);

    const result = await groupServices.getOwnedGroup(userId, groupId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
};

export const updateGroup = async (req: UserAuthenticatedReq, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({message: error.array()});  
    
    const userId = req.user.id;
    const groupId = parseInt(req.params.groupId);
    const {name, description} = req.body;

    const result = await groupServices.updateGroup(userId, groupId, name, description);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
};

export const deleteGroup = async (req: UserAuthenticatedReq, res) => {
    const userId = req.user.id;
    const groupId = parseInt(req.params.groupId);

    const result = await groupServices.deleteGroup(userId, groupId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
};