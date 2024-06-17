import express from 'express';
import userPublicRoutes from './login/loginRoutes'

const app = express();
app.use('/auth', userPublicRoutes );

export default app;