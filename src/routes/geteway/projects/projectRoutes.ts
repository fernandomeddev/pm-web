import { Router } from 'express';
import { createProjectController } from '../../../controllers/project/createProjectController';
import { listProjectController } from '../../../controllers/project/listProjectsController';
import { updateProjectController } from '../../../controllers/project/updateProjectController';
import { removeProjectController } from '../../../controllers/project/removeProjectController';
import { listTaskController } from '../../../controllers/task/listTaskController';
import { createTaskController } from '../../../controllers/task/createTaskController';

const router = Router()

router.get('/list', listProjectController);
router.post('/new', createProjectController);
router.put('/update/:projectId', updateProjectController);
router.delete('/remove/:projectId', removeProjectController);

router.get('/:projectId/tasks', listTaskController);
router.post('/:projectId/task', createTaskController);

export default router