import { injectable } from "tsyringe";
import logger from "../core/logger";
import db from "../utils/db";

@injectable()
export class GroupRequestRepository {
    async getGroupReqsByGroupId(groupId: number) {
        try {
            const groupRequests = await db.groupRequest.findMany({
                where: {
                    groupId,
                }
            });

            return {
                success: true,
                groupRequests,
            };
        } catch (error) {
            logger.error(error, {
                section: "groupRequestRepository->getGroupReqsByGroupId"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم درخواست های گروه رو بیاریم ❌😔",
            }
        }
    }
    
    async createGroupRequest(groupId: number, senderId: number, recieverPhone: string) {
        try {
            const reciever = await db.users.findFirst({
                where: {
                    phone: recieverPhone
                }
            });
            if (!reciever) {
                return {
                    success: false,
                    message: "کاربری با این شماره پیدا نشد ❌"
                }
            }

            const sender = await db.users.findFirst({
                where: {
                    id: senderId
                }
            });
            if (!sender) {
                return {
                    success: false,
                    message: "کاربری با این شناسه پیدا نشد ❌"
                }
            }

            const group = await db.groups.findFirst({
                where: {
                    id: groupId,
                }
            });
            if (!group) {
                return {
                    success: false,
                    message: "گروهی با این شناسه پیدا نشد ❌"
                }
            } else if (group.userId !== senderId) {
                return {
                    success: false,
                    message: "شما اجازه ارسال درخواست را ندارید ❌"
                }
            } else if (senderId === reciever.id) {
                return {
                    success: false,
                    message: "شما نمیتوانید به خودتان درخواست ارسال کنید ❌"
                }
            }

            const isMember = await db.groupMembers.findFirst({
                where: {
                    groupId,
                    userId: reciever.id,
                }
            });
            if (isMember) {
                return {
                    success: false,
                    message: "کاربر مورد نظر عضو گروه است ❌"
                }
            }

            const isRequested = await db.groupRequest.findFirst({
                where: {
                    groupId,
                    senderId,
                    userId: reciever.id
                }
            });
            if (isRequested) {
                return {
                    success: false,
                    message: "شما قبلا برای این کاربر درخواست ارسال کرده اید ❌"
                }
            }

            const groupRequest = await db.groupRequest.create({
                data: {
                    groupId,
                    senderId,
                    userId: reciever.id
                }
            });

            return {
                success: true,
                message: "درخواست گروه با موفقیت ارسال شد ✅😎\nمنتظر بمون تا دوستت درخواستت رو قبول کنه👌",
                groupRequest,
            };
            
        } catch (error) {
            logger.error(error, {
                section: "groupRequestRepository->createGroupRequest"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم درخواست گروهتو بسازیم ❌😔",
            }
        }
    }

    async getGroupRequests(userId: number) {
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

            const recievedRequests = await db.groupRequest.findMany({
                where: {
                    userId: userId,
                },
            });
            const recievedRequestsData = [];
            for (const recievedRequest of recievedRequests) {
                const group = await db.groups.findFirst({
                    where: {
                        id: recievedRequest.groupId,
                    },
                    select: {
                        name: true,
                        description: true,
                    }
                });

                const sender = await db.users.findFirst({
                    where: {
                        id: recievedRequest.senderId,
                    },
                    select: {
                        name: true,
                        phone: true,
                    }
                });
                
                if (group && sender) {
                    recievedRequestsData.push({
                        group,
                        sender,
                        recievedRequest
                    });
                }
            }

            const sentRequests = await db.groupRequest.findMany({
                where: {
                    senderId: userId,
                },
            });
            const sentRequestsData = [];
            for (const sentRequest of sentRequests) {
                const group = await db.groups.findFirst({
                    where: {
                        id: sentRequest.groupId,
                    },
                    select: {
                        name: true,
                        description: true,
                    }
                });

                const reciever = await db.users.findFirst({
                    where: {
                        id: sentRequest.userId,
                    },
                    select: {
                        name: true,
                        phone: true,
                    }
                });
                
                if (group && reciever) {
                    sentRequestsData.push({
                        group,
                        reciever,
                        sentRequest
                    });
                }
            }

            return {
                success: true,
                recievedRequests: recievedRequestsData,
                sentRequests: sentRequestsData,
            };
        } catch (error) {
            logger.error(error, {
                section: "groupRequestRepository->getAllGroupRequests"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم درخواست هاتون رو بیاریم ❌😔",
            }
        }
    }

    async updateGroupRequest(requestId: number, isAccepted: boolean, userId: number) {
        try {
            const user = await db.groupRequest.findFirst({
                where: {
                    id: requestId
                }
            });
            if (!user) {
                return {
                    success: false,
                    message: "درخواستی با این شناسه پیدا نشد ❌"
                }
            }

            const groupReq = await db.groupRequest.update({
                where: {
                    id: requestId,
                    userId,
                },
                data: {
                    isAccepted,
                }
            });

            return {
                success: true,
                message: "درخواست با موفقیت بروز رسانی شد ✅",
                groupReq,
            };
        } catch (error) {
            logger.error(error, {
                section: "groupRequestRepository->updateGroupRequest"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم درخواست رو بروز کنیم ❌😔",
            }
        }
    }

    async deleteGroupRequest(requestId: number) {
        try {
            const req = await db.groupRequest.findFirst({
                where: {
                    id: requestId
                }
            });
            if (!req) {
                return {
                    success: false,
                    message: "درخواستی با این شناسه پیدا نشد ❌"
                }
            }

            await db.groupRequest.delete({
                where: {
                    id: requestId,
                }
            });

            return {
                success: true,
                message: "درخواست با موفقیت حذف شد ✅",
            };
        } catch (error) {
            logger.error(error, {
                section: "groupRequestRepository->deleteGroupRequest"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم درخواست رو حذف کنیم ❌😔",
            }
        }
    }
}