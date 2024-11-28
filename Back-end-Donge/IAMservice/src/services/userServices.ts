import {inject, injectable} from "tsyringe";
import {UserRepository} from "../repositories/userRepositories";
import {AuthServices} from "./authServices";

@injectable()
export class UserServices {
    constructor (
        @inject('UserRepository') private readonly userRepository: UserRepository,
        @inject('AuthServices') private readonly authServices: AuthServices
    ) {}

    async changeUserPhone(userId: number, password: string, newPhone: string) {
        const getUser = await this.userRepository.getUserData(userId);
        if (!getUser.success)
            return getUser;

        const result = await this.authServices.checkPassword(getUser.data.phone, password);
        if (!result.success)
            return result;

        const result2 = await this.userRepository.changePhoneNumber(userId, newPhone);
        if (!result.success)
            return result2;

        return result2;
    }
}