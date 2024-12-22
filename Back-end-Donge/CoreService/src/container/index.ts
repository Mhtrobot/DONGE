import 'reflect-metadata';
import { container } from 'tsyringe';
import { CardsRepository } from '../repositories/cardsRepository';
import { CardsServices } from '../services/cardsServices';
import { GroupRepository } from '../repositories/groupRepository';
import { GroupServices } from '../services/groupServices';

container.registerSingleton<CardsRepository>('CardsRepository', CardsRepository);
container.registerSingleton<CardsServices>('CardsServices', CardsServices);

container.registerSingleton<GroupRepository>('GroupRepository', GroupRepository);
container.registerSingleton<GroupServices>('GroupServices', GroupServices);