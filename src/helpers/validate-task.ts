

export const validateStatus = (status:string='') =>{
    const typeStatus: string[] = ['Completado', 'Pendiente'];

    if(!status){
        throw new Error(`No envio el estado`);
    }
    
    else if (!typeStatus.includes(status)){
        throw new Error(`Estado incorrecto`);
        
    }
    return true;
}



