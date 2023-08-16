# Aplicacion de tareas RestApi

Se crearon 5 endpoint:

1- Get /tasks para obtener todas las tareas

2- Get /tasks/{id} para obtener una tarea

3- Post /tasks para insertar una tarea

4- Put /tasks/{id} para actualizar una tarea, en este punto se evalua si el id existe y si lleva los campos titulo, descripcion y estado al momento de enviar la peticion y antes de guardarse.

5- Delete /tasks para eliminar una tarea, igualmente se evalua si el id existe antes de elimnarse.

## Tecnologias usadas
Typescript

Express

Firebase firestore

Jest

### Notas 
El modelo escogido es un modelo MVC, lo escogi por ser un modelo donde he tenido mas experiencia y al ser uno de los mas utilizados para realizar proyectos escalables.