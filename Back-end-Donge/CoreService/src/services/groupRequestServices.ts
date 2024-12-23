import { inject, injectable } from "tsyringe";
import { GroupRequestRepository } from "../repositories/groupRequestRepository";
import { GroupMemberRepository } from "../repositories/groupMemberRepository";
import { GroupMemberServices } from "./groupMemberServices";

@injectable()
export class GroupRequestServices {
    constructor(
        @inject('GroupRequestRepository') private groupRequestRepository: GroupRequestRepository,
        @inject('GroupMemberServices') private groupMemberServices: GroupMemberServices,
    ) {}

    async createGroupRequest(groupId: number, senderId: number, recieverPhone: string) {
        return await this.groupRequestRepository.createGroupRequest(groupId, senderId, recieverPhone);
    }

    async getGroupRequests(userId: number) {
        return await this.groupRequestRepository.getGroupRequests(userId);
    }

    async acceptGroupRequest(userId: number, requestId: number, isAccepted: boolean) {
        const result = await this.groupRequestRepository.updateGroupRequest(requestId, isAccepted, userId);
        if (!result.success)
            return result;

        const addMember = await this.groupMemberServices.addMember(result.groupReq.groupId, userId);
        if (!addMember.success)
            return addMember;

        return addMember;
    }

    async deleteGroupRequest(userId: number, requestId: number) {
        return await this.groupRequestRepository.deleteGroupRequest(requestId, userId);
    }
}