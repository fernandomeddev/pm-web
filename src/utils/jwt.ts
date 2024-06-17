import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/app.config";
import { UserDto } from "../dtos/UserDto";
const secret = JWT_SECRET

export function generateToken(payload: UserDto): string {
    return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export function verifyToken(token: string): UserDto {
    return jwt.verify(token, secret) as UserDto;
};
