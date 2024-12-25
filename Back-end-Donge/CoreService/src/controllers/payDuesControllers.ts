import { container } from "tsyringe";
import { PayDuesServices } from "../services/payDuesServices";
import { UserAuthenticatedReq } from "../../../IAMservice/src/interfaces/AuthenticatedRequest";
import { validationResult } from "express-validator";

const payDuesServices = container.resolve(PayDuesServices);

export const createPayDues = async (req: UserAuthenticatedReq, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({success: false, message: error.array()});
    
    const {creditorId, debtorId, groupId, cardId, amount, currency, description} = req.body;
    const userId = req.user.id;
    if (userId !== creditorId || userId !== debtorId)
        return res.status(400).json({success: false, message: "شناسه کاربری شما با شناسه بدهکار یا بستانکار یکسان نیست ❌"});
    
    const result = await payDuesServices.createPayDues(creditorId, debtorId, groupId, cardId, amount, currency, description);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const getPayDuesByUserId = async (req: UserAuthenticatedReq, res) => {
    const userId = req.user.id;
    const result = await payDuesServices.getPayDuesByUserId(userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const getPayDuesByGroupId = async (req: UserAuthenticatedReq, res) => {
    const userId = req.user.id;
    const groupId = parseInt(req.params.groupId);
    const result = await payDuesServices.getPayDuesByGroupId(groupId, userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const updatePayDuesStatus = async (req: UserAuthenticatedReq, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({success: false, message: error.array()});
    
    const payDuesId = parseInt(req.params.payDuesId);
    const status = req.body.status;
    const result = await payDuesServices.updatePayDuesStatus(payDuesId, status);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const deletePayDues = async (req: UserAuthenticatedReq, res) => {
    const payDuesId = parseInt(req.params.payDuesId);
    const userId = req.user.id;
    const result = await payDuesServices.deletePayDues(payDuesId, userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}