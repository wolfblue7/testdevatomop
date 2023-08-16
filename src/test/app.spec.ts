import request from 'supertest';
import server from '../app';

 const taskInfo = {
    titulo: "Esto es otra tarea",
    descripcion: 'Esto es otra descripcion'
 }

 const taskInfoEdit = {
    titulo: "Esto es otra edicion",
    descripcion: 'Esto es otra descripcion editada'
 }

 const taskId = 'w1avBvLrM8tH1XWHjWQv';

describe('Task', () => {
    it("Si hay registros en la bd debe retornar 200", async () => {
        
        
        const response = await request(server.app).get('/api/tasks');
        expect(response.statusCode).toEqual(200);
    });

    it("Si no se envia o esta mal escrito el titulo o descripcion deberia retornar 404", async () => {
        
        
        const response = await request(server.app).post('/api/tasks').send({
            tituloErroneo: "Esto es un nuevo titulo",
            descripcion: 'Esto es una descripcion'
        });
        expect(response.statusCode).toEqual(400)
    
    });

    it("Si se enviar los datos correcto deberia enviar 201 y el mensaje exitoso", async () => {
        
        
        const response = await request(server.app).post('/api/tasks').send(taskInfo);
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('msg', 'Se ha registrado exitosamente');
    
    });

    it("Si se encuentra el id deberia devolver 200", async () => {
        
        
        const response = await request(server.app).post(`/api/tasks/${taskId}`).send(taskInfoEdit);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('msg', 'Se ha registrado exitosamente');
    
    });




});