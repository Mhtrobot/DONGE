import 'reflect-metadata';
import { container } from 'tsyringe';
import { CardsRepository } from '../repositories/cardsRepository';
import { CardsServices } from '../services/cardsServices';

container.registerSingleton<CardsRepository>('CardsRepository', CardsRepository);
container.registerSingleton<CardsServices>('CardsServices', CardsServices);