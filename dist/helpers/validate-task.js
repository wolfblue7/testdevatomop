"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStatus = void 0;
const validateStatus = (status = '') => {
    const typeStatus = ['Completado', 'Pendiente'];
    if (!status) {
        throw new Error(`No envio el estado`);
    }
    else if (!typeStatus.includes(status)) {
        throw new Error(`Estado incorrecto`);
    }
    return true;
};
exports.validateStatus = validateStatus;
