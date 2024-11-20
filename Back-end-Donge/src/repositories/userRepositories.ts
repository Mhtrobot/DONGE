import db from "../utils/db";
import logger from "../core/logger";
import {injectable} from "tsyringe";

@injectable()
export class UserRepository {
    async getUserData(userId: number) {
        try {
            const user = await db.users.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                return {
                    success: false,
                    message: "کاربر یافت نشد ❌",
                }
            }

            return {
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    owes: user.owes.toString(),
                    debts: user.debts.toString(),
                    createdAt: user.createdAt,
                }
            }
        } catch (error) {
            logger.error(error, "error in getting user data", {
                section: "userRepository->getUserData",
            });

            return {
                success: false,
                message: "خطایی در دریافت اطلاعات کاربر رخ داد ❌",
            }
        }
    }

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
                    user: newUser,
                    exists: false,
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
                user: user,
                exists: true,
            };
        } catch (error) {
            logger.error(error, "signUserByVerificationCode");
            return {
                success: false,
                message: "خطا در دریافت اطلاعات کاربر❌"
            }
        }
    }

    async setNameUser(userId: number, name: string) {
        try {
            const user = await db.users.findFirst({
                where: {
                    id: userId,
                }
            });
            if (!user) {
                return {
                    success: false,
                    message: 'کاربر یافت نشد❌',
                }
            }

            await db.users.update({
                where: {
                    id: userId,
                },
                data: {
                    name,
                }
            });

            return {
                success: true,
                message: 'اسمت باموفقیت ثبت شد😎🎉\nازین ببعد دوستات تورو با این اسم توی دنگ میبینن😁',
            }
        } catch (error) {
            logger.error(error, "error in setting Name for User", {
                section: "setNameUser",
            });

            return {
                success: false,
                message: "خطایی در اعمال تغییرات رخ داد❌",
            }
        }
    }

    async setHashedPassword(userId: number, hashedPassword: string) {
        try {
            const user = await db.users.findFirst({
                where: {
                    id: userId,
                }
            });
            if (!user) {
                return {
                    success: false,
                    message: 'کاربر وجود ندارد ❌',
                }
            }

            await db.users.update({
                where: {
                    id: userId,
                },
                data: {
                    password: hashedPassword,
                }
            });

            return {
                success: true,
                message: 'پسورد باموفقیت ذخیره شد✅',
            }
        } catch (error) {
            logger.error(error, "error in setting HashedPassword", {
                section: "setHashedPassword",
            });

            return {
                success: false,
                message: 'خطا در ثبت اطلاعات کاربر ❌',
            }
        }
    }

    async getHashedPassword(phone: string) {
        try {
            const user = await db.users.findFirst({
                where: {
                    phone: phone,
                },
            });
            if (!user) {
                return {
                    success: false,
                    message: "کاربر یافت نشد ❌",
                }
            }

            return {
                success: true,
                userId: user.id,
                hashedPassword: user.password,
            }
        } catch (error) {
            logger.error(error, "error in getting user's HashedPassword", {
                section: "userRepository->getHashedPassword",
            });

            return {
                success: false,
                message: "خطا در دریافت اطلاعات کاربر ❌",
            }
        }
    }
}