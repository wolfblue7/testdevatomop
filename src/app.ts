import dotenv from 'dotenv'
import Server from './models/server';

//Configurar dotenv
dotenv.config();

const server = new Server();
const NODE_ENV = process.env.NODE_ENV || 'development';

if(NODE_ENV !== 'test'){
server.listen();
}

export default server;