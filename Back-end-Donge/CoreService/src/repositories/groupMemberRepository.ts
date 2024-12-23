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

    async removeMember(groupId: number, userId: number) {
        // Remove member from group
    }

    async getMembers(groupId: number) {
        // Get members of a group
    }

    async getMember(groupId: number, userId: number) {
        // Get a member of a group
    }
}