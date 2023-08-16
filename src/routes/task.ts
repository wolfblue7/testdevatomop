import { Router } from "express";
import { check } from 'express-validator';
import { getTasks, getTask, postTask, putTask, deleteTask } from '../controller/task';
import { validarCampos, validarIdBD } from '../middlewares/validator';
import { existTaskId } from "../helpers/db-validator";
import { validateStatus } from "../helpers/validate-task";



const router = Router();


router.get('/', getTasks);

router.get('/:id', [check('id', 'Enviar el id').not().isEmpty(), 
check('id').custom(existTaskId), 
validarIdBD], getTask);

router.post('/', [check('titulo', 'No se obtuvo el titulo').not().isEmpty(), 
check('descripcion', 'No se obtuvo la descripcion').not().isEmpty(),
validarCampos], postTask);

router.put('/:id',[check('id', 'Enviar el id').not().isEmpty(), 
check('id').custom(existTaskId),
validarIdBD,
check('titulo', 'No se obtuvo el titulo').not().isEmpty(), 
check('descripcion', 'No se obtuvo la descripcion').not().isEmpty(),
check('estado').custom(validateStatus), 
validarCampos
], putTask);

router.delete('/:id', [check('id', 'Send id').not().isEmpty(), 
check('id').custom(existTaskId), 
validarIdBD], deleteTask);



export default router;