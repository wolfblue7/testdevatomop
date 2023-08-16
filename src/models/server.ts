import express, { Application } from 'express';
import taskRoutes  from '../routes/task';
import cors from 'cors';



class Server {

    public app: Application;
    private port: string;
    private apiPaths = {
        tasks: '/api/tasks'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        
        //Metodos iniciales
        this.middlewares();

        //Definir mi ruta
        this.routes();
    }

  
    middlewares(){
        //Cors
        this.app.use( cors() );

        //Lectura del body
        this.app.use( express.json() );

       
    }


    routes(){
        this.app.use( this.apiPaths.tasks, taskRoutes);
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}

export default Server;