import express, { Router } from 'express';
import { serverController } from '../controllers/server/serverController';
import publicRoutes from './public';
import gatewayRoutes from './geteway';
// import errorHandler from '../middlewares/errorHandler';

const app = express()
const router = Router()

router.get('/server_status', serverController);

app.use('/gateway', gatewayRoutes)
app.use('/public', publicRoutes)
app.use('/', router)

export default app
