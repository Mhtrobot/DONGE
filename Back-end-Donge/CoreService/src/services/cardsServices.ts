import { inject, injectable } from "tsyringe";
import { CardsRepository } from "../repositories/cardsRepository";

@injectable()
export class CardsServices {
    constructor (
        @inject('CardsRepository') private cardsRepository: CardsRepository
    ) {}

    async addNewCard(userId: number, cardName: string, cardPan: string) {
        return await this.cardsRepository.createCard(userId, cardName, cardPan);
    }

    async deleteCard(cardId: number, userId: number) {
        return await this.cardsRepository.deleteCard(userId, cardId);
    }

    async getCards(userId: number) {
        return await this.cardsRepository.getCards(userId);
    }

    async getCard(cardId: number, userId: number) {
        return await this.cardsRepository.getCard(userId, cardId);
    }
}