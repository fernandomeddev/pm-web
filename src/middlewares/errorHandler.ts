import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: any, request: Request, response:Response, next: NextFunction) => {
    // Handle the error here
    console.error(err);

    // Set the status code and error message
    response.status(500).json({ error: 'Internal Server Error' });
};