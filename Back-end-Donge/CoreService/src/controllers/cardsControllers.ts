import { container } from "tsyringe";
import { CardsServices } from "../services/cardsServices";
import { UserAuthenticatedReq } from "../interfaces/AuthenticatedRequest.ts";
import { validationResult } from "express-validator";

const cardsServices = container.resolve(CardsServices);

export const addCard = async (req: UserAuthenticatedReq, res) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({error: error.array()});

    const userId = req.user.id;
    const {cardName, cardPan} = req.body;

    if (isNaN(Number(cardPan)) || cardPan.length !== 16) {
        return res.status(400).json({
            success: false,
            message: "شماره کارت نامعتبر است❌"
        });
    }

    const result = await cardsServices.addNewCard(userId, cardName, cardPan);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
};

export const deleteCard = async (req: UserAuthenticatedReq, res) => {
    const userId = req.user.id;
    const cardId = parseInt(req.params.cardId);

    const result = await cardsServices.deleteCard(cardId, userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
};

export const getCards = async (req: UserAuthenticatedReq, res) => {
    const userId = req.user.id;

    const result = await cardsServices.getCards(userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
};

export const getCard = async (req: UserAuthenticatedReq, res) => {
    const userId = req.user.id;
    const cardId = parseInt(req.params.cardId);

    const result = await cardsServices.getCard(cardId, userId);
    if (!result.success)
        return res.status(400).json(result);

    return res.json(result);
};