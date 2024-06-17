import { Request, Response } from 'express';

export async function serverController(request: Request, response: Response ) {
    try {
        return response.status(200).send('service is running')
    } catch (error) {
        console.log(`server error on route get url/ :: ${error}`)
        return response.status(500).send('internal server error')
    }
}