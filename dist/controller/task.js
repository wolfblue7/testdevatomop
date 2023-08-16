"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.putTask = exports.postTask = exports.getTask = exports.getTasks = void 0;
const task_1 = __importDefault(require("../models/task"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = new task_1.default();
    const allTask = yield tasks.getTasks();
    if ((allTask).length === 0) {
        res.status(404).json({
            msg: 'No se encontraron registros'
        });
    }
    res.status(200).json({
        data: allTask
    });
});
exports.getTasks = getTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tasks = new task_1.default();
    const oneTask = yield tasks.oneTask(id);
    res.status(200).json({
        data: oneTask
    });
});
exports.getTask = getTask;
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descripcion } = req.body;
    const newRegistry = new task_1.default(titulo, descripcion);
    newRegistry.newTask();
    res.status(201).json({
        msg: 'Se ha registrado exitosamente'
    });
});
exports.postTask = postTask;
const putTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descripcion, estado } = req.body;
    const { id } = req.params;
    const update = new task_1.default(titulo, descripcion, estado);
    update.uptadeTask(id);
    res.status(200).json({
        msg: 'Registro actualizado',
        data: {
            titulo,
            descripcion,
            estado
        }
    });
});
exports.putTask = putTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const del = new task_1.default();
    del.deleteTask(id);
    res.status(200).json({
        msg: 'Registro eliminado'
    });
});
exports.deleteTask = deleteTask;
