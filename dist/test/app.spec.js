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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const taskInfo = {
    titulo: "Esto es otra tarea",
    descripcion: 'Esto es otra descripcion'
};
const taskInfoEdit = {
    titulo: "Esto es otra edicion",
    descripcion: 'Esto es otra descripcion editada',
    estado: "Completado"
};
const taskId = '9Tsq8mPyDIuGsTV3jUBc';
describe('Post api/tasks', () => {
    describe('When title and description is sent', () => {
        it("Return 200 and exit message", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default.app).post('/api/tasks').send(taskInfo);
            expect(response.statusCode).toEqual(201);
            expect(response.body).toHaveProperty('msg', 'Se ha registrado exitosamente');
        }));
    });
    describe('When the wrong title and description is sent', () => {
        it("Return 404", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default.app).post('/api/tasks').send({
                tituloErroneo: "Esto es un nuevo titulo",
                descripcion: 'Esto es una descripcion'
            });
            expect(response.statusCode).toEqual(400);
        }));
    });
});
describe('Get all api/tasks', () => {
    it("If there are records in the db it should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default.app).get('/api/tasks');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
    }));
});
describe('Put api/tasks', () => {
    describe('If the record exists and all data is sent', () => {
        it("Return 200 and the data that was updated", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default.app).put(`/api/tasks/${taskId}`).send(taskInfoEdit);
            expect(response.statusCode).toEqual(200);
            expect(response.body).toHaveProperty('msg', 'Registro actualizado');
            expect(response.body).toHaveProperty('data.titulo');
            expect(response.body).toHaveProperty('data.descripcion');
            expect(response.body).toHaveProperty('data.estado');
        }));
    });
    describe('If any information is wrong', () => {
        it("If the ID is wrong return 404", () => __awaiter(void 0, void 0, void 0, function* () {
            const idTaskNot = 'abc123456789';
            const response = yield (0, supertest_1.default)(app_1.default.app).put(`/api/tasks/${idTaskNot}`).send(taskInfoEdit);
            expect(response.statusCode).toEqual(404);
            expect(response.body).toHaveProperty('errors');
        }));
        it("If any field is not sent, it returns 400 and an errors property.", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default.app).put(`/api/tasks/${taskId}`).send({
                titulo: "Esto es otra edicion",
                descripcion: 'Esto es otra descripcion editada'
            });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toHaveProperty('errors');
        }));
        it("If the statuses are not Completed or Pending", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default.app).put(`/api/tasks/${taskId}`).send({
                titulo: "Esto es otra edicion",
                descripcion: 'Esto es otra descripcion editada',
                estado: "Otro"
            });
            expect(response.statusCode).toEqual(400);
            expect(response.body).toHaveProperty('errors');
        }));
    });
});
describe('Delete api/tasks', () => {
    describe('If the register exit', () => {
        const idDelete = 'kOvABM4JXQpsjxaLg4CQ';
        it("Returns 200 and a success message", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default.app).delete(`/api/tasks/${idDelete}`);
            expect(response.statusCode).toEqual(200);
        }));
    });
    describe('If the record no exists', () => {
        it("Returns 404 and an errors property", () => __awaiter(void 0, void 0, void 0, function* () {
            const idTaskNot = 'abc123456789';
            const response = yield (0, supertest_1.default)(app_1.default.app).delete(`/api/tasks/${idTaskNot}`);
            expect(response.statusCode).toEqual(404);
            expect(response.body).toHaveProperty('errors');
        }));
    });
});
