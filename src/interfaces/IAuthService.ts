import { UserDto } from "../dtos/UserDto";
import { IResult } from "./IResult";

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IAuthService {
    signin(user: IUser): Promise<IResult<string>>;
    signup(user: IUser): Promise<IResult<string>>;
    
    // Opções de implementação de melhorias futuras
    // refreshToken(token: string): Promise<UserDto>;
    // forgotPassword(email: string): Promise<void>;
    // resetPassword(token: string, password: string): Promise<void>;
    // changePassword(user: IUser, password: string): Promise<void>;
    // changeEmail(user: IUser, email: string): Promise<void>;
    // changeName(user: IUser, name: string): Promise<void>;
}