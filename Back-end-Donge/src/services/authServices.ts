import {inject, injectable} from "tsyringe";
import {UserRepository} from "../repositories/userRepositories";
import {RedisClient} from "../utils/redisClient";
import logger from "../core/logger";
import bcrypt from 'bcryptjs';

@injectable()
export class AuthServices {
    constructor(
        @inject('UserRepository') private userRepository: UserRepository,
        @inject(RedisClient) private redisClient: RedisClient
    ) {}

    async generateVerificationCode(phone: string) {
        logger.info(`generating verification code for user: ${phone}`, {
            section: 'generateVerificationCode',
        });
        const code: string = Math.floor(10000 + Math.random() * 90000).toString();
        const seconds = 2*60;

        if (await this.redisClient.exists(phone)) {
            return {
                success: true,
                message: "کد قبلی هنوز منقضی نشده⚠",
            }
        }
        await this.redisClient.setEx(phone, seconds, code);
        console.log(code)
        return {
            success: true,
            message: "کد باموفقیت برای شما ارسال گردید✅",
        };
    }

    async verifyCode(phone: string, code: string) {
        const storedCode = await this.redisClient.get(phone);
        if (!storedCode) {
            return {
                success: false,
                message: 'کد منقضی شده است⚠',
            }
        }

        if (storedCode === code) {
            return {
                success: true,
                message: "کاربر تایید شد✔",
            }
        }

        return {
            success: false,
            message: "کد نادرست است❌"
        }
    }

    async hashPassword(userId: number, password: string) {
        const hashedPassword = await bcrypt.hash(password, 12);
        return await this.userRepository.setHashedPassword(userId, hashedPassword);
    }

    async checkPassword(phone: string, password: string) {
        const dbResult = await this.userRepository.getHashedPassword(phone);
        if (!dbResult.success)
            return dbResult;

        const checkHashedPassword = await bcrypt.compare(password, dbResult.hashedPassword);
        if (!checkHashedPassword) {
            return {
                success: false,
                message: "رمز وارد شده نادرست است ❌",
            }
        }

        return {
            success: true,
            message: "رمز کاربر تایید شد ✅",
            userId: dbResult.userId,
        }
    }
}