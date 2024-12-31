import { injectable } from "tsyringe";
import logger from "../core/logger";
import db from "../utils/db";

@injectable()
export class GroupMemberRepository {
    async addMember(groupId: number, userId: number) {
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

            const group = await db.groups.findFirst({
                where: {
                    id: groupId
                }
            });
            if (!group) {
                return {
                    success: false,
                    message: "گروهی با این شناسه پیدا نشد ❌"
                }
            }

            await db.groupMembers.create({
                data: {
                    groupId,
                    userId
                }
            });

            return {
                success: true,
                message: "کاربر با موفقیت به گروه اضافه شد ✅"
            }
        } catch (error) {
            logger.error(error, {
                section: "groupMemberRepository->addMember",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌"
            }
        }
    }

    async removeMember(groupId: number, targetUserId: number) {
        try {
            const targetUser = await db.users.findFirst({
                where: {
                    id: targetUserId
                }
            });
            if (!targetUser) {
                return {
                    success: false,
                    message: "کاربری با این شناسه پیدا نشد ❌"
                }
            }

            await db.groupMembers.deleteMany({
                where: {
                    groupId,
                    userId: targetUserId,
                }
            });

            return {
                success: true,
                message: "کاربر با موفقیت از گروه حذف شد ✅"
            }
        } catch (error) {
            logger.error(error, {
                section: "groupMemberRepository->removeMember",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌"
            }
        }
    }

    async getMembers(groupId: number) {
        try {
            const group = await db.groups.findFirst({
                where: {
                    id: groupId
                }
            });
            if (!group) {
                return {
                    success: false,
                    message: "گروهی با این شناسه پیدا نشد ❌"
                }
            }

            const members = await db.groupMembers.findMany({
                where: {
                    groupId
                },
            });
            const data = [];
            const user = await db.users.findFirst({
                where: {
                    id: group.userId
                }
            });
            data.push({
                id: user.id,
                name: user.name,
                phone: user.phone,
                isAdmin: true,
            });
                

            for (const member of members) {
                const user = await db.users.findFirst({
                    where: {
                        id: member.userId
                    }
                });

                data.push({
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    isAdmin: member.isAdmin
                });
            }

            return {
                success: true,
                data
            }
        } catch (error) {
            logger.error(error, {
                section: "groupMemberRepository->getMembers",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌"
            }
        }
    }

    async setAdminStatus(groupId: number, targetUserId: number, isAdmin: boolean) {
        try {
            await db.groupMembers.updateMany({
                where: {
                    groupId,
                    userId: targetUserId
                },
                data: {
                    isAdmin
                }
            });

            return {
                success: true,
                message: "وضعیت ادمین کاربر با موفقیت تغییر یافت ✅"
            }
        } catch (error) {
            logger.error(error, {
                section: "groupMemberRepository->setAdmin",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌"
            }
        }
    }

    async getMember(groupId: number, userId: number) {
        try {
            const group = await db.groups.findFirst({
                where: {
                    id: groupId
                }
            });
            if (!group) {
                return {
                    success: false,
                    message: "گروهی با این شناسه پیدا نشد ❌"
                }
            }

            const member = await db.groupMembers.findFirst({
                where: {
                    groupId,
                    userId
                }
            });
            if (!member) {
                return {
                    success: false,
                    message: "کاربر مورد نظر عضو گروه نیست ❌"
                }
            }

            const user = await db.users.findFirst({
                where: {
                    id: userId
                }
            });

            return {
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    isAdmin: member.isAdmin
                }
            }
        } catch (error) {
            logger.error(error, {
                section: "groupMemberRepository->getMember",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌"
            }
        }
    }

    async leaveGroup(groupId: number, userId: number) {
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

            await db.groupMembers.deleteMany({
                where: {
                    groupId,
                    userId
                }
            });

            return {
                success: true,
                message: "شما با موفقیت گروه را ترک کردید ✅"
            }
        } catch (error) {
            logger.error(error, {
                section: "groupMemberRepository->leaveGroup",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌"
            }
        }
    }

    async getJoinedGroups(userId: number) {
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
            
            const groups = await db.groupMembers.findMany({
                where: {
                    userId
                }
            });

            const data = [];
            for (const group of groups) {
                const gp = await db.groups.findFirst({
                    where: {
                        id: group.groupId
                    }
                });
                if (!gp) {
                    continue;
                }

                data.push({
                    id: gp.id,
                    name: gp.name,
                    description: gp.description,
                    creator: gp.userId,
                    createdAt: gp.createdAt
                });
            }

            return {
                success: true,
                data
            }
        } catch (error) {
            logger.error(error, {
                section: "groupMemberRepository->getJoinedGroups",
            });

            return {
                success: false,
                message: "خطایی رخ داده است، لطفا دوباره تلاش کنید ❌"
            }
        }
    }
}