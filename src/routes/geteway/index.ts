import express from 'express';
import projectRoutes from './projects/projectRoutes'
import taskRoutes from './tasks/taskRoutes'
import { auth } from '../../middlewares/authMiddleware';

const app = express();
app.use('/project', auth, projectRoutes );
app.use('/task', taskRoutes );

export default app;