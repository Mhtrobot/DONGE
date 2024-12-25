import { inject, injectable } from "tsyringe";
import { GroupRepository } from "../repositories/groupRepository";

@injectable()
export class GroupServices {
    constructor (
        @inject('GroupRepository') private groupRepository: GroupRepository
    ) {}

    async getGroupById(groupId: number) {
        return await this.groupRepository.getGroupById(groupId);
    }

    async addNewGroup(name: string, description: string, userId: number) {
        return await this.groupRepository.createGroup(name, description, userId);
    }

    async getOwnedGroups(userId: number) {
        return await this.groupRepository.getGroups(userId);
    }

    async getOwnedGroup(userId: number, groupId: number) {
        return await this.groupRepository.getGroup(groupId, userId);
    }

    async updateGroup(userId: number, groupId: number, name: string, description: string) {
        return await this.groupRepository.updateGroup(userId, groupId, name, description);
    }

    async deleteGroup(userId: number, groupId: number) {
        return await this.groupRepository.deleteGroup(userId, groupId);
    }
}