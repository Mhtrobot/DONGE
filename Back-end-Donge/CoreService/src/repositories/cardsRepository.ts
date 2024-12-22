import { injectable } from "tsyringe";
import db from "../utils/db";
import logger from "../core/logger";

@injectable()
export class CardsRepository {
    async createCard(userId: number, cardName: string, cardPan: string) {
        try {
            const user = await db.users.findFirst({
                where: {
                    id: userId
                }
            });
            if (!user) {
                return {
                    success: false,
                    message: "کاربری با این شناسه پیدا نشد ❌"
                }
            }

            const isCardExist = await db.cards.findFirst({
                where: {
                    cardPan
                }
            });
            if (isCardExist) {
                return {
                    success: false,
                    message: "این شماره کارت قبلا ثبت شده است ❌"
                }
            }

            const card = await db.cards.create({
                data: {
                    userId,
                    cardName,
                    cardPan
                }
            });
            
            return {
                success: true,
                message: "شماره کارتت با موفقیت ثبت شد ✅😎\nازین ببعد میتونی به دوستات بگی دنگشونو با دنگ بدن😁",
                card,
            };
        } catch (error) {
            logger.error(error, {
                section: "cardsRepository->createCard"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم شماره کارتتو داشته باشیم ❌😔",
            }
        }
    }

    async getCards(userId: number) {
        try {
            const user = await db.users.findFirst({
                where: {
                    id: userId
                }
            });
            if (!user) {
                return {
                    success: false,
                    message: "کاربری با این شناسه پیدا نشد ❌"
                }
            }

            const cards = await db.cards.findMany({
                where: {
                    userId
                },
                select: {
                    id: true,
                    cardName: true,
                    cardPan: true,
                }
            });
            if (!cards || cards.length === 0) {
                return {
                    success: true,
                    message: "هیچ کارتی ثبت نکردی 💔",
                }
            }
    
            return {
                success: true,
                cards,
            };
        } catch (error) {
            logger.error(error, {
                section: "cardsRepository->getCards"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم کارت های شما رو براتون بیاریم ❌😔",
            }
        }
    }   

    async deleteCard(userId: number, cardId: number) {
        try {
            const user = await db.users.findFirst({
                where: {
                    id: userId
                }
            });
            if (!user) {
                return {
                    success: false,
                    message: "کاربری با این شناسه پیدا نشد ❌"
                }
            }

            const card = await db.cards.findFirst({
                where: {
                    id: cardId
                }
            });
            if (!card) {
                return {
                    success: false,
                    message: "کارتی با این شناسه پیدا نشد ❌"
                }
            }

            await db.cards.delete({
                where: {
                    id: cardId
                }
            });

            return {
                success: true,
                message: "کارت مورد نظر با موفقیت حذف شد ✅",
            };
        } catch (error) {
            logger.error(error, {
                section: "cardsRepository->deleteCard"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم کارت مورد نظر رو حذف کنیم ❌😔",
            }
        }
    }

    async getCard(userId: number, cardId: number) {
        try {
            const user = await db.users.findFirst({
                where: {
                    id: userId
                }
            });
            if (!user) {
                return {
                    success: false,
                    message: "کاربری با این شناسه پیدا نشد ❌"
                }
            }

            const card = await db.cards.findFirst({
                where: {
                    id: cardId
                }
            });
            if (!card) {
                return {
                    success: false,
                    message: "کارتی با این شناسه پیدا نشد ❌"
                }
            }

            return {
                success: true,
                message: "اطلاعات کارت مورد نظر",
                card,
            };
        } catch (error) {
            logger.error(error, {
                section: "cardsRepository->getCard"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم اطلاعات کارت مورد نظر رو براتون بیاریم ❌😔",
            }
        }
    }
}