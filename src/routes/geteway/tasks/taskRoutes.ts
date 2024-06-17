import { Router } from "express";
import { removeTaskController } from "../../../controllers/task/removeTaskController";
import { updateTaskController } from "../../../controllers/task/updateTaskController";
import { auth } from "../../../middlewares/authMiddleware";

const router = Router()
router.put('/:id', auth, updateTaskController);
router.delete('/:id',auth, removeTaskController);


export default router