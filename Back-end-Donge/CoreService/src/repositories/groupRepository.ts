import { injectable } from "tsyringe";
import db from "../utils/db";
import logger from "../core/logger";

@injectable()
export class GroupRepository {
    async createGroup(name: string, description: string, userId: number) {
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

            const group = await db.groups.create({
                data: {
                    name,
                    description,
                    userId
                }
            });
            
            return {
                success: true,
                message: "گروه با موفقیت ساخته شد ✅😎",
                group,
            };
        } catch (error) {
            logger.error(error, {
                section: "groupRepository->createGroup"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم گروهتو بسازیم ❌😔",
            }
        }
    }

    async getGroups(userId: number) {
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

            const groups = await db.groups.findMany({
                where: {
                    userId
                }
            });
            if (!groups || groups.length === 0) {
                return {
                    success: true,
                    message: "هیچ گروهی نداری 💔",
                }
            }

            return {
                success: true,
                message: "گروه های شما",
                groups,
            };
        } catch (error) {
            logger.error(error, {
                section: "groupRepository->getGroups"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم گروه های شما رو بیاریم ❌😔",
            }
        }
    }

    async getGroup(groupId: number, userId: number) {
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
                    id: groupId,
                    userId
                }
            });
            if (!group) {
                return {
                    success: false,
                    message: "گروهی با این شناسه پیدا نشد ❌"
                }
            }

            return {
                success: true,
                group,
            };
        } catch (error) {
            logger.error(error, {
                section: "groupRepository->getGroup"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم گروه شما رو بیاریم ❌😔",
            }
        }
    }

    async getGroupById(groupId: number) {
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

            return {
                success: true,
                group,
            };
        } catch (error) {
            logger.error(error, {
                section: "groupRepository->getGroupById"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم گروه رو بیاریم ❌😔",
            }
        }
    }

    async updateGroup(groupId: number, userId: number, name: string, description: string) {
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
                    id: groupId,
                    userId
                }
            });
            if (!group) {
                return {
                    success: false,
                    message: "گروهی با این شناسه پیدا نشد ❌"
                }
            }

            await db.groups.update({
                where: {
                    id: groupId
                },
                data: {
                    name,
                    description
                }
            });

            return {
                success: true,
                message: "گروه با موفقیت ویرایش شد ✅",
            };
        } catch (error) {
            logger.error(error, {
                section: "groupRepository->updateGroup"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم گروهتو ویرایش کنیم ❌😔",
            }
        }
    }

    async deleteGroup(groupId: number, userId: number) {
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
                    id: groupId,
                    userId
                }
            });
            if (!group) {
                return {
                    success: false,
                    message: "گروهی با این شناسه پیدا نشد ❌"
                }
            }

            await db.groups.delete({
                where: {
                    id: groupId
                }
            });

            return {
                success: true,
                message: "گروه با موفقیت حذف شد ✅",
            };
        } catch (error) {
            logger.error(error, {
                section: "groupRepository->deleteGroup"
            });

            return {
                success: false,
                message: "متاسفانه نتونستیم گروهتو حذف کنیم ❌😔",
            }
        }
    }
}