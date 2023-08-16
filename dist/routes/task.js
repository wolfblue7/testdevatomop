"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const task_1 = require("../controller/task");
const validator_1 = require("../middlewares/validator");
const db_validator_1 = require("../helpers/db-validator");
const validate_task_1 = require("../helpers/validate-task");
const router = (0, express_1.Router)();
router.get('/', task_1.getTasks);
router.get('/:id', [(0, express_validator_1.check)('id', 'Enviar el id').not().isEmpty(),
    (0, express_validator_1.check)('id').custom(db_validator_1.existTaskId),
    validator_1.validarIdBD], task_1.getTask);
router.post('/', [(0, express_validator_1.check)('titulo', 'No se obtuvo el titulo').not().isEmpty(),
    (0, express_validator_1.check)('descripcion', 'No se obtuvo la descripcion').not().isEmpty(),
    validator_1.validarCampos], task_1.postTask);
router.put('/:id', [(0, express_validator_1.check)('id', 'Enviar el id').not().isEmpty(),
    (0, express_validator_1.check)('id').custom(db_validator_1.existTaskId),
    validator_1.validarIdBD,
    (0, express_validator_1.check)('titulo', 'No se obtuvo el titulo').not().isEmpty(),
    (0, express_validator_1.check)('descripcion', 'No se obtuvo la descripcion').not().isEmpty(),
    (0, express_validator_1.check)('estado').custom(validate_task_1.validateStatus),
    validator_1.validarCampos
], task_1.putTask);
router.delete('/:id', [(0, express_validator_1.check)('id', 'Send id').not().isEmpty(),
    (0, express_validator_1.check)('id').custom(db_validator_1.existTaskId),
    validator_1.validarIdBD], task_1.deleteTask);
exports.default = router;
