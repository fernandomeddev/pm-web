import { Request, Response } from "express";
import { validationSchema } from "../../validationSchemas/userSignin.schema";
import AuthService from "../../services/auth/AuthService";
import { IUser } from "../../interfaces/IAuthService";

export async function userSigninController(request: Request, response: Response) {
    try {
        const validate = validationSchema.safeParse(request.body);
        if (validate.error) return response.status(400).send({errors: validate.error?.errors});
        
        const data: IUser = request.body;
        const authService = AuthService.instance();
        const responseService = await authService.signin(data);
        if (!responseService) {
            return response.status(400).send(responseService);
        }
        return response.status(200).send(responseService);
    } catch (error) {
        console.log(`server error on route post user/signin :: ${error}`)
        return response.status(500).send('internal server error')
    }
}