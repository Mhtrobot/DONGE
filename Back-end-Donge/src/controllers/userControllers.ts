import 'reflect-metadata';
import {container} from "tsyringe";
import {UserRepository} from "../repositories/userRepositories";
import {UserAuthenticatedReq} from "../interfaces/AuthenticatedRequest";
import {validationResult} from "express-validator";
import {AuthServices} from "../services/authServices";


const userRepository = container.resolve(UserRepository);
const authServices = container.resolve(AuthServices);

export const getUser = async (req: UserAuthenticatedReq, res) => {
    const userId = req.user.id;

    const result = await userRepository.getUserData(userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const setPassword = async (req: UserAuthenticatedReq, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({ error: error.array()});

    const userId = req.user.id;
    const password = req.body.password;

    const result = await authServices.hashPassword(userId, password);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}

export const setName = async (req: UserAuthenticatedReq, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({error: error.array()});

    const userId = req.user.id;
    const name = req.body.name;

    const result = await userRepository.setNameUser(userId, name);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
}