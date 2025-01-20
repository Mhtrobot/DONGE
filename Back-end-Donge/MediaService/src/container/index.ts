import 'reflect-metadata';
import { container } from "tsyringe";
import { MediaRepository } from "../repositories/mediaRepository";
import { MediaServices } from "../services/mediaServices";

container.registerSingleton<MediaRepository>('MediaRepository', MediaRepository);
container.registerSingleton<MediaServices>('MediaServices', MediaServices);

export { container };
