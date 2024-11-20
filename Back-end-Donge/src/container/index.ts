import 'reflect-metadata';
import {container} from "tsyringe";
import {UserRepository} from "../repositories/userRepositories";
import {AuthServices} from "../services/authServices";
import {UserServices} from "../services/userServices";

container.registerSingleton<UserRepository>('UserRepository', UserRepository);
container.registerSingleton<AuthServices>('AuthServices', AuthServices);
container.registerSingleton<UserServices>('UserServices', UserServices);