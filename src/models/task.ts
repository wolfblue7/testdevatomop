import db from "../db/connection";
import { GenTask, StatusTask } from "../helpers/helpers";

class GenerateTask implements GenTask {
  active: boolean = true;
  titulo: string = "";
  descripcion: string = "";
  estado: StatusTask = StatusTask.Pending;
  created: Date = new Date();
  updated: Date = new Date();

  constructor(
    titulo: string = "",
    descripcion: string = "",
    estado?: StatusTask
  ) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado || StatusTask.Pending;
  }

  async getTasks() {
    try {
      const result = await db.collection("task").get();
      const allTask = result.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return allTask;
    } catch (error) {
      console.log(error);
      throw new Error("Error al guardar la tarea");
    }
  }

  async oneTask(id: string) {
    try {
      const result = await db.collection("task").doc(id).get();

      const oneTask = {
        id: result.id,
        ...result.data(),
      };

      return oneTask;
    } catch (error) {
      console.log(error);
      throw new Error("Error al guardar la tarea");
    }
  }

  async newTask() {
    try {
      await db.collection("task").add({
        active: true,
        titulo: this.titulo,
        descripcion: this.descripcion,
        estado: this.estado,
        created: Date(),
        updated: Date(),
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error al guardar la tarea");
    }
  }

  async uptadeTask(id: string) {
    try {
      await db.collection("task").doc(id).update({
        titulo: this.titulo,
        descripcion: this.descripcion,
        estado: this.estado,
        updated: Date(),
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar los datos");
    }
  }

  async deleteTask(id: string) {
    try {
      await db.collection("task").doc(id).delete();
    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar los datos");
    }
  }
}

export default GenerateTask;
