import { Router } from 'express';
import controller from './todo.controllers';
import { todoValidation } from '../../utils/validation';

const router = Router();

// /api/todo
router
  .route('/')
  .get(controller.getMany)
  .post(todoValidation, controller.createOne);

// /api/todo/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(todoValidation, controller.updateOne)
  .delete(controller.removeOne);

export default router;
