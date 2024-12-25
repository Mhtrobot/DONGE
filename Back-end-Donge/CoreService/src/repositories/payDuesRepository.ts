import { inject, injectable } from "tsyringe";
import logger from "../core/logger";
import db from "../utils/db";
import { GroupServices } from "../services/groupServices";
import { group } from "console";

@injectable()
export class PayDuesRepository {
    constructor(
        @inject('GroupServices') private groupServices: GroupServices,
    ) {}
    async createPayDues(creditorId: number, debtorId: number, groupId:number, cardId: number, amount: string, currency: string, description: string) {
        try {
            const creditor = await db.users.findFirst({
                where: {
                    id: creditorId
                }
            });
            if (!creditor) {
                return {
                    success: false,
                    message: "کاربری با این شناسه پیدا نشد ❌"
                }
            }

            const debtor = await db.users.findFirst({
                where: {
                    id: debtorId
                }
            });
            if (!debtor) {
                return {
                    success: false,
                    message: "کاربری با این شناسه پیدا نشد ❌"
                }
            }

            const payDues = await db.payDues.create({
                data: {
                    creditorId,
                    debtorId,
                    groupId,
                    cardId,
                    amount,
                    currency,
                    description
                }
            });

            return {
                success: true,
                message: "درخواست با موفقیت ثبت شد ✅"
            }
        } catch (error) {
            logger.error(error, {
                section: "payDuesRepository->createPayDues",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌"
            }
        }
    }

    async getPayDues(userId: number) {
        try {
            const payDues = await db.payDues.findMany({
                where: {
                    OR: [
                        {
                            creditorId: userId
                        },
                        {
                            debtorId: userId
                        }
                    ]
                }
            });

            const payDuesWithUsersAndCardPans = await Promise.all(payDues.map(async (payDue) => {
                const gp = await this.groupServices.getGroupById(payDue.groupId);
                const group = {
                    id: gp.group.id,
                    name: gp.group.name,
                }

                const card = await db.cards.findFirst({
                    where: {
                        id: payDue.cardId
                    },
                    select: {
                        cardPan: true,
                        cardName: true,
                    }
                });

                if (userId === payDue.debtorId) {
                    const creditor = await db.users.findFirst({
                        where: {
                            id: payDue.creditorId
                        },
                        select: {
                            name: true,
                            phone: true,
                        }
                    });

                    return {
                        ...payDue,
                        creditor,
                        card,
                        group
                    }
                } else {
                    const debtor = await db.users.findFirst({
                        where: {
                            id: payDue.debtorId
                        },
                        select: {
                            name: true,
                            phone: true,
                        }
                    });

                    return {
                        ...payDue,
                        debtor,
                        card,
                        group
                    }
                }
            }));

            return {
                success: true,
                payDues: payDuesWithUsersAndCardPans
            }
        } catch (error) {
            logger.error(error, {
                section: "payDuesRepository->getPayDues",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌"
            }
        }
    }

    async getPayDuesByGroupId(groupId: number) {
        try {
            const payDues = await db.payDues.findMany({
                where: {
                    groupId
                }
            });

            const payDuesWithUsersAndCardPans = await Promise.all(payDues.map(async (payDue) => {
                const creditor = await db.users.findFirst({
                    where: {
                        id: payDue.creditorId
                    },
                    select: {
                        name: true,
                        phone: true,
                    }
                });

                const debtor = await db.users.findFirst({
                    where: {
                        id: payDue.debtorId
                    },
                    select: {
                        name: true,
                        phone: true,
                    }
                });

                const card = await db.cards.findFirst({
                    where: {
                        id: payDue.cardId
                    },
                    select: {
                        cardPan: true,
                        cardName: true,
                    }
                });

                return {
                    ...payDue,
                    creditor,
                    debtor,
                    card
                }
            }));

            return {
                success: true,
                payDuesWithUsersAndCardPans,
            }
        } catch (error) {
            logger.error(error, {
                section: "payDuesRepository->getPayDuesByGroupId",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌"
            }
        }
    }

    async updatePayDuesStatus(payDueId: number, status: boolean) {
        try {
            const payDue = await db.payDues.findFirst({
                where: {
                    id: payDueId
                }
            });
            if (!payDue) {
                return {
                    success: false,
                    message: "درخواستی با این شناسه پیدا نشد ❌"
                }
            }

            await db.payDues.update({
                where: {
                    id: payDueId
                },
                data: {
                    isPaid: status
                }
            });

            return {
                success: true,
                message: "درخواست با موفقیت بروزرسانی شد ✅"
            }
        } catch (error) {
            logger.error(error, {
                section: "payDuesRepository->updatePayDuesStatus",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌",
            }
        }
    }

    async deletePayDues(payDueId: number, userId: number) {
        try {
            const payDue = await db.payDues.findFirst({
                where: {
                    id: payDueId
                }
            });
            if (!payDue) {
                return {
                    success: false,
                    message: "درخواستی با این شناسه پیدا نشد ❌"
                }
            }

            if (payDue.debtorId === userId) {
                return {
                    success: false,
                    message: "شما اجازه حذف این درخواست را ندارید ❌"
                }
            }

            await db.payDues.delete({
                where: {
                    id: payDueId
                }
            });

            return {
                success: true,
                message: "درخواست با موفقیت حذف شد ✅"
            }
        } catch (error) {
            logger.error(error, {
                section: "payDuesRepository->deletePayDues",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌",
            }
        }
    }
}