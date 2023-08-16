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
const connection_1 = __importDefault(require("../db/connection"));
class GenerateTask {
    constructor(titulo = "", descripcion = "", estado) {
        this.active = true;
        this.titulo = "";
        this.descripcion = "";
        this.estado = "Pendiente" /* StatusTask.Pending */;
        this.created = new Date();
        this.updated = new Date();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado || "Pendiente" /* StatusTask.Pending */;
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connection_1.default.collection("task").get();
                const allTask = result.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
                return allTask;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al guardar la tarea");
            }
        });
    }
    oneTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield connection_1.default.collection("task").doc(id).get();
                const oneTask = Object.assign({ id: result.id }, result.data());
                return oneTask;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al guardar la tarea");
            }
        });
    }
    newTask() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.collection("task").add({
                    active: true,
                    titulo: this.titulo,
                    descripcion: this.descripcion,
                    estado: this.estado,
                    created: Date(),
                    updated: Date(),
                });
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al guardar la tarea");
            }
        });
    }
    uptadeTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.collection("task").doc(id).update({
                    titulo: this.titulo,
                    descripcion: this.descripcion,
                    estado: this.estado,
                    updated: Date(),
                });
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al actualizar los datos");
            }
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.collection("task").doc(id).delete();
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al actualizar los datos");
            }
        });
    }
}
exports.default = GenerateTask;
