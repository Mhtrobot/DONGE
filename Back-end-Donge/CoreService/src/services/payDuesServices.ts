import { inject, injectable } from "tsyringe";
import { PayDuesRepository } from "../repositories/payDuesRepository";
import { GroupServices } from "./groupServices";
import { CardsServices } from "./cardsServices";
import { GroupMemberServices } from "./groupMemberServices";

@injectable()
export class PayDuesServices {
    constructor (
        @inject('PayDuesRepository') private payDuesRepository: PayDuesRepository,
        @inject('GroupServices') private groupServices: GroupServices,
        @inject('CardsServices') private cardsServices: CardsServices,
        @inject('GroupMemberServices') private groupMemberServices: GroupMemberServices,
    ) {}

    async createPayDues(creditorId: number, debtorId: number, groupId:number, cardId: number, amount: string, currency: string, description: string) {
        const gp = await this.groupServices.getGroupById(groupId);
        if (!gp.success) 
            return gp;

        if (gp.group.userId !== creditorId) {
            const isCreditorInGroup = await this.groupMemberServices.getMember(groupId, creditorId);
            if (!isCreditorInGroup.success) {
                return {
                    success: false,
                    message: "کاربری با این شناسه در گروه شما نیست ❌"
                }
            }
        } else if (gp.group.userId !== debtorId) {
            const isDebtorInGroup = await this.groupMemberServices.getMember(groupId, debtorId);
            if (!isDebtorInGroup.success) {
                return {
                    success: false,
                    message: "کاربری با این شناسه در گروه شما نیست ❌"
                }
            }
        }
        
        const card = await this.cardsServices.getCard(cardId, creditorId);
        if (!card.success)
            return card;

        return await this.payDuesRepository.createPayDues(creditorId, debtorId, groupId, cardId, amount, currency, description);
    }

    async getPayDuesByUserId(userId: number) {
        return await this.payDuesRepository.getPayDues(userId);
    }

    async getPayDuesByGroupId(groupId: number, userId: number) {
        const gp = await this.groupServices.getGroupById(groupId);
        if (!gp.success)
            return gp;

        const isUserInGroup = await this.groupMemberServices.getMember(groupId, userId);
        if (!isUserInGroup.success) {
            return {
                success: false,
                message: "شما در این گروه عضو نیستید ❌"
            }
        }

        return await this.payDuesRepository.getPayDuesByGroupId(groupId);
    }

    async updatePayDuesStatus(payDuesId: number, status: boolean) {
        return await this.payDuesRepository.updatePayDuesStatus(payDuesId, status);
    }

    //alert user that he/she has a due to pay
    //alert user that he/she received the money

    async deletePayDues(payDuesId: number, userId: number) {
        return await this.payDuesRepository.deletePayDues(payDuesId, userId);
    }
}