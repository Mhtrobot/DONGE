import db from "../utils/db";
import logger from "../core/logger";
import {injectable} from "tsyringe";

@injectable()
export class UserRepository {
    async signInByVerificationCode(phone: string) {
        try {
            const user = await db.users.findFirst({
                where: {
                    phone,
                },
            });
            if (!user) {
                logger.info(`User with phone: ${phone} does not exist and is trying to sign in.`, {
                    section: "signInByVerificationCode",
                });

                const newUser = await db.users.create({
                    data: {
                        phone,
                        isVerified: true,
                    }
                });

                return {
                    success: true,
                    user: newUser
                };
            }

            await db.users.update({
                where: {
                    id: user.id,
                },
                data: {
                    isVerified: true,
                }
            });

            return {
                success: true,
                user: user
            };
        } catch (error) {
            logger.error(error, "signUserByVerificationCode");
            return {
                success: false,
                message: "خطا در دریافت اطلاعات کاربر❌"
            }
        }
    }
}