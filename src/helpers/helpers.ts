export const enum StatusTask { Completed ='Completado', Pending = 'Pendiente' }

export interface GenTask {
    active: boolean
    titulo: string,
    descripcion: string
    estado: StatusTask
    created: Date
    updated: Date
}