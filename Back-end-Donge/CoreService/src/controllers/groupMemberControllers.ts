import { container } from 'tsyringe';
import { GroupMemberServices } from '../services/groupMemberServices';
import { UserAuthenticatedReq } from '../../../IAMservice/src/interfaces/AuthenticatedRequest';
import { validationResult } from 'express-validator';

const groupMemberServices = container.resolve(GroupMemberServices);

// export const addMember = async (req, res) => {
//     const {groupId, userId} = req.body;
//     const result = await groupMemberServices.addMember(groupId, userId);
//     if (!result.success)
//         return res.status(400).json(result);

//     return res.json(result);
// }

export const getMembers = async (req, res) => {
    const groupId = parseInt(req.params.groupId);
    const result = await groupMemberServices.getMembers(groupId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const removeMember = async (req: UserAuthenticatedReq, res) => {
    const groupId = parseInt(req.params.groupId);
    const targetUserId = parseInt(req.params.targetUserId);
    const userId = req.user.id;

    const result = await groupMemberServices.removeMember(groupId, targetUserId, userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const updateAdminStatus = async (req: UserAuthenticatedReq, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({success: false, message: error.array()});
    
    const groupId = parseInt(req.params.groupId);
    const targetUserId = parseInt(req.params.targetUserId);
    const userId = req.user.id;
    const isAdmin = req.body.isAdmin;

    const result = await groupMemberServices.updateAdminStatus(groupId, targetUserId, userId, isAdmin);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const leaveGroup = async (req: UserAuthenticatedReq, res) => {
    const groupId = parseInt(req.params.groupId);
    const userId = req.user.id;

    const result = await groupMemberServices.leaveGroup(groupId, userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}
