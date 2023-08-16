"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarIdBD = exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validarCampos = validarCampos;
const validarIdBD = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(404).json(errors);
    }
    next();
};
exports.validarIdBD = validarIdBD;
