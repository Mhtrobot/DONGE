import { inject, injectable } from "tsyringe";
import { GroupMemberRepository } from "../repositories/groupMemberRepository";
import { GroupServices } from "./groupServices";

@injectable()
export class GroupMemberServices {
    constructor(
        @inject('GroupMemberRepository') private groupMemberRepository: GroupMemberRepository,
        @inject('GroupServices') private groupServices: GroupServices
    ) {}

    async joinedGroups(userId: number) {
        const owenedGp = await this.groupServices.getOwnedGroups(userId);
        if (!owenedGp.success) {
            return owenedGp;
        }

        const joinedGp = await this.groupMemberRepository.getJoinedGroups(userId);
        if (!joinedGp.success) {
            return joinedGp;
        }

        return {
            success: true,
            data: {
                owenedGroups: owenedGp.groups,
                joinedGroups: joinedGp.data
            }
        }
    }

    async addMember(groupId: number, userId: number) {
        const isUserMember = await this.groupMemberRepository.getMember(groupId, userId);
        if (isUserMember.success) {
            return {
                success: false,
                message: "شما عضو این گروه هستید ❌"
            }
        }

        return await this.groupMemberRepository.addMember(groupId, userId);
    }

    async removeMember(groupId: number, targetUserId: number, userId: number) {
        const gp = await this.groupServices.getOwnedGroup(groupId, userId);
        const isUserAdmin = await this.groupMemberRepository.getMember(groupId, userId);
        if (!gp.success || !isUserAdmin.success || !isUserAdmin.data.isAdmin) {
            return {
                success: false,
                message: "شما ادمین این گروه نیستید ❌"
            }
        }

        const isTargetMember = await this.groupMemberRepository.getMember(groupId, targetUserId);
        if (!isTargetMember.success) {
            return {
                success: false,
                message: "کاربر مورد نظر عضو گروه نیست ❌"
            }
        }

        return await this.groupMemberRepository.removeMember(groupId, targetUserId);
    }

    async getMembers(groupId: number, userId: number) {
        const gp = await this.groupServices.getOwnedGroup(groupId, userId);

        const isUserMember = await this.groupMemberRepository.getMember(groupId, userId);
        if (!isUserMember.success || gp.group.userId !== userId) {
            return isUserMember;
        }
        
        return await this.groupMemberRepository.getMembers(groupId);
    }

    async getMember(groupId: number, userId: number) {
        return await this.groupMemberRepository.getMember(groupId, userId);
    }

    async updateAdminStatus(groupId: number, targetUserId: number, userId: number, isAdmin: boolean) {
        const gp = await this.groupServices.getOwnedGroup(groupId, userId);
        if (!gp.success) {
            return {
                success: false,
                message: "شما سازنده این گروه نیستید ❌"
            }
        }

        const isTargetMember = await this.groupMemberRepository.getMember(groupId, targetUserId);
        if (!isTargetMember.success) {
            return {
                success: false,
                message: "کاربر مورد نظر عضو گروه نیست ❌"
            }
        }

        return await this.groupMemberRepository.setAdminStatus(groupId, targetUserId, isAdmin);
    }

    async leaveGroup(groupId: number, userId: number) {
        const isUserMember = await this.groupMemberRepository.getMember(groupId, userId);
        if (!isUserMember.success) 
            return isUserMember;

        const gp = await this.groupServices.getOwnedGroup(groupId, userId);
        if (gp.success) {
            return {
                success: false,
                message: "شما سازنده این گروه هستید، برای خروج از گروه باید گروه را حذف کنید ❌"
            }
        }

        return await this.groupMemberRepository.removeMember(groupId, userId);
    }
}