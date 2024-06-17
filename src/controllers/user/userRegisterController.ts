import { Request, Response } from 'express';
import { validationSchema } from '../../validationSchemas/userRegiser.schema';
import { hash } from 'bcryptjs';
import AuthService from '../../services/auth/AuthService';
import { IUser } from '../../interfaces/IAuthService';

export async function userRegisterController(request: Request, response: Response ) {
    try {
        const validate = validationSchema.safeParse(request.body);
        if (validate.error) return response.status(400).send({errors: validate.error?.errors});
        const hashedPassword = await hash(request.body.password, 10);
        const user:IUser = {
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword
        }
        const authService = AuthService.instance();
        const responseService = await authService.signup(user);

        if (!responseService.success || !responseService.data) {
            return response.status(400).send(responseService.messages);
        }

        return response.status(200).send(responseService);
    
    } catch (error) {
        console.log(`server error on route post user/register :: ${error}`)
        return response.status(500).send('internal server error')
    }
}