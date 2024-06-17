import { IAuthService, IUser } from "../../interfaces/IAuthService";
import UserRepository from "../../repository/userRepository";
import { Singleton } from "typescript-singleton";
import { UserDto } from "../../dtos/UserDto";
import { compare, hash } from "bcryptjs";
import { generateToken } from "../../utils/jwt";
import { IResult } from "../../interfaces/IResult";

export default class AuthService implements IAuthService {
    public static instance() {
        const instance = Singleton.getInstance('AuthService', AuthService);
        return instance;
    }
    private userRepository: UserRepository = UserRepository.instanse();

    async signin(user: IUser): Promise<IResult<string>> {
      const userInfo: UserDto | undefined = await this.userRepository.findByEmail(user.email);
        if (!userInfo || !userInfo.hashedPassword) {
            return {success: false, messages: ['User not found']};
        }
        const isPasswordMatch = compare(await hash(user.password, 10), userInfo.hashedPassword);
        if (!isPasswordMatch) {
            return {success: false, messages: ['Invalid password'] };
        }
        const token = generateToken(userInfo);
        return {success: true, data: token, messages: ['User authenticated']};
    }

    async signup(user: IUser): Promise<IResult<string>> {
        const userInfo: UserDto | undefined = await this.userRepository.findByEmail(user.email);
        if (userInfo) {
            return { success: false, messages: ['User already exists']};
        }

        const hashedPassword = await hash(user.password, 10);
        const newUser: UserDto = {
            name: user.name,
            email: user.email,
            hashedPassword: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const response = await this.userRepository.save(newUser);
        if (!response) {
            return {success: false, messages: ['Error creating user']};
        }
        newUser.id = response.id;
        const token = generateToken(newUser);
        return {success: true, data: token, messages: ['User created']};
    }
}