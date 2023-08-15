import db from "../db/connection";


export const existTaskId = async (id = '') =>{

    const searchTask = db.collection('task').doc(id);
    const doc = await searchTask.get();

    if (!doc.exists) {
        throw new Error(`Id ${id} not found`);
    }
}