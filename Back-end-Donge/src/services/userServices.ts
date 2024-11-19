import {inject, injectable} from "tsyringe";
import {UserRepository} from "../repositories/userRepositories";

@injectable()
export class UserServices {
    constructor (@inject('UserRepository') private readonly userRepository: UserRepository) {}
}