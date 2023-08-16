import request from 'supertest';
import server from '../app';

 const taskInfo = {
    titulo: "Esto es otra tarea",
    descripcion: 'Esto es otra descripcion'
 }

 const taskInfoEdit = {
    titulo: "Esto es otra edicion",
    descripcion: 'Esto es otra descripcion editada',
    estado: "Completado"
 }


 const taskId = '9Tsq8mPyDIuGsTV3jUBc';

describe('Post api/tasks', () => {

    describe('When title and description is sent', () => {
        it("Return 200 and exit message", async () => {
        
        
            const response = await request(server.app).post('/api/tasks').send(taskInfo);
            expect(response.statusCode).toEqual(201);
            expect(response.body).toHaveProperty('msg', 'Se ha registrado exitosamente');
        
        });
    });

    describe('When the wrong title and description is sent', () => {
        it("Return 404", async () => {
        
        
            const response = await request(server.app).post('/api/tasks').send({
                tituloErroneo: "Esto es un nuevo titulo",
                descripcion: 'Esto es una descripcion'
            });
            expect(response.statusCode).toEqual(400)
        
        });
    });


});


describe('Get all api/tasks', () => {

     
    it("If there are records in the db it should return 200", async () => {
        
        
        const response = await request(server.app).get('/api/tasks');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
    });



});



describe('Put api/tasks', () => {


    describe('If the record exists and all data is sent', () => {
        
         it("Return 200 and the data that was updated", async () => {
    
    
        const response = await request(server.app).put(`/api/tasks/${taskId}`).send(taskInfoEdit);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('msg', 'Registro actualizado');
        expect(response.body).toHaveProperty('data.titulo');
        expect(response.body).toHaveProperty('data.descripcion');
        expect(response.body).toHaveProperty('data.estado');
    
    });
        });


        describe('If any information is wrong', () => {
        
            it("If the ID is wrong return 404", async () => {
                
            const idTaskNot = 'abc123456789'

           const response = await request(server.app).put(`/api/tasks/${idTaskNot}`).send(taskInfoEdit);
           expect(response.statusCode).toEqual(404);
           expect(response.body).toHaveProperty('errors');
           
       
       });



       it("If any field is not sent, it returns 400 and an errors property.", async () => {
                

       const response = await request(server.app).put(`/api/tasks/${taskId}`).send({
        titulo: "Esto es otra edicion",
        descripcion: 'Esto es otra descripcion editada'
        
       });
       expect(response.statusCode).toEqual(400);
       expect(response.body).toHaveProperty('errors');
       
   
   });


   it("If the statuses are not Completed or Pending", async () => {
                

   const response = await request(server.app).put(`/api/tasks/${taskId}`).send({
    titulo: "Esto es otra edicion",
    descripcion: 'Esto es otra descripcion editada',
    estado:"Otro"
   });
   expect(response.statusCode).toEqual(400);
   expect(response.body).toHaveProperty('errors');
   

});



           });
    

});


describe('Delete api/tasks', () => {


    describe('If the register exit', () => {
        const idDelete = 'kOvABM4JXQpsjxaLg4CQ'

         it("Returns 200 and a success message", async () => {
    
    
        const response = await request(server.app).delete(`/api/tasks/${idDelete}`);
        expect(response.statusCode).toEqual(200);
    
    });
        });


        describe('If the record no exists', () => {
        
            it("Returns 404 and an errors property", async () => {
                
            const idTaskNot = 'abc123456789'

           const response = await request(server.app).delete(`/api/tasks/${idTaskNot}`);
           expect(response.statusCode).toEqual(404);
           expect(response.body).toHaveProperty('errors');
           
       
       });
           });
    

});









