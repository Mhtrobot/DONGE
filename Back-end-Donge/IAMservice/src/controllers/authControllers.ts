import 'reflect-metadata';
import {container} from "tsyringe";
import {AuthServices} from "../services/authServices";
import {validationResult} from "express-validator";
import logger from "../core/logger";
import {generateJWT} from "../core/JWT";
import {UserRepository} from "../repositories/userRepositories";
import {UserAuthenticatedReq} from "../interfaces/AuthenticatedRequest";

const authServices = container.resolve(AuthServices);
const userRepository = container.resolve(UserRepository);

export const sendOTP = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({ error: error.array() });

    let phone = req.body.phone;

    phone = phone.replace("+98", "0");
    if ((phone as string).startsWith("98")) {
        phone = phone.replace("98", "0");
    }

    logger.info(`User with phone: ${phone} is trying to sign in, sending verification code`, {
        section: "sendOTP",
    });

    const result = await authServices.generateVerificationCode(phone);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
};

export const verifyOTP = async (req, res) => {
    let phone: string = req.body.phone;
    phone = phone.replace("+98", "0");
    if (phone.startsWith("98"))
        phone = phone.replace("98", "0");

    const code = req.body.code;

    const result = await authServices.verifyCode(phone, code);
    if (!result.success) {
        return res.status(400).json(result)
    }

    const dbResult = await userRepository.signInByVerificationCode(phone);
    if (!dbResult)
        return res.status(400).json(dbResult);

    const token = generateJWT(dbResult.user.id);

    return res.json({
        success: true,
        message: `صحت سنجی شماره ${phone} با موفقیت انجام شد✔`,
        token,
        token_type: "Bearer",
        exists: dbResult.exists,
    });
};

export const validate = async (req: UserAuthenticatedReq, res) => {
    return res.json({
        id: req.user.id
    })
}

export const loginWithPassword = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({ error: error.array() });

    const data = {
        phone: req.body.phone,
        password: req.body.password,
    }

    data.phone = data.phone.replace("+98", "0");
    if ((data.phone as string).startsWith("98")) {
        data.phone = data.phone.replace("98", "0");
    }

    const result = await authServices.checkPassword(data.phone, data.password);
    if (!result.success)
        return res.status(400).json(result);

    const token = generateJWT(result.userId);

    return res.json({
        success: true,
        message: `صحت سنجی شماره ${data.phone} با موفقیت انجام شد✔`,
        token,
        token_type: "Bearer",
    });
}