import { Request, Response } from "express";
import GenerateTask from '../models/task';


export const getTasks = async( req:Request, res: Response) => {

    const tasks = new GenerateTask();
    const allTask = await tasks.getTasks();        

        if((allTask).length === 0){
            res.status(404).json({
                msg : 'No se encontraron registros'
            });
        } 

        res.status(200).json(allTask);

     
}

export const getTask = async( req: Request, res: Response) => {
    const { id } = req.params;

    const tasks = new GenerateTask();
    const oneTask = await tasks.oneTask(id);

    res.send(oneTask);
 
}

export const postTask = async( req: Request, res: Response) => {
    const { titulo, descripcion } = req.body;
    const newRegistry = new GenerateTask(titulo, descripcion);
    
    newRegistry.newTask();
    
    res.status(201).json({
        msg : 'Se ha registrado exitosamente'
    });
        
   
}

export const putTask = async( req: Request, res: Response) => {
    const { titulo, descripcion, estado } = req.body;
    const { id } = req.params;

    const update = new GenerateTask(titulo, descripcion, estado);
    update.uptadeTask(id);

    res.status(201).json(
        {
        msg: 'Registro actualizado'
        });
        
    
}

export const deleteTask = async( req: Request, res: Response) => {
    const { id } = req.params;

    const del = new GenerateTask();
    del.deleteTask(id);
    
        
    res.status(200).json('Registro eliminado');
}