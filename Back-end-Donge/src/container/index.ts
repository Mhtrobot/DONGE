import 'reflect-metadata';
import {container} from "tsyringe";
import {UserRepository} from "../repositories/userRepositories";
import {AuthServices} from "../services/authServices";

container.registerSingleton<UserRepository>('UserRepository', UserRepository);
container.registerSingleton<AuthServices>('AuthServices', AuthServices);