import colors from "colors";
import { guardarDb, leerDb } from "./helpers/guardarArchivo.js";
import {
  inquirerMenu,
  pausa,
  leerInput,
  listadoBorrar,
  confirmar,
  listadoCompletar,
} from "./helpers/inquirer.js";
import { Tarea } from "./models/tarea.js";
import { Tareas } from "./models/tareas.js";
// import { pausa } from "./helpers/mensajes.js";

const main = async () => {
  const tareas = new Tareas();
  let opt = "";
  const tareasDB = leerDb();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  do {
    //Imprime Menu
    opt = await inquirerMenu();
    //Opciones
    switch (opt) {
      case "1":
        //Crear Tarea
        const desc = await leerInput("Ingrese la descripcion de la tarea");
        console.log(desc);
        tareas.crearTarea(desc);
        break;
      case "2":
        //Ver Tareas
        tareas.listadoCompleto();
        break;
      case "3":
        //Ver tareas completadas
        tareas.listarCompletadas();
        break;
      case "4":
        //Ver Tareas Pendientes
        tareas.listarCompletadas(false);
        break;
      case "5":
      //Completar Tarea
        const ids= await listadoCompletar(tareas.listadoArr)
        tareas.toggleCompletadas(ids);
        break;
        case "6":
        //Borrar Tarea
        const id = await listadoBorrar(tareas.listadoArr);
        if(id!=='0'){
          const ok = await confirmar("Esta seguro de borrar la tarea?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada".red);
          }
        }
        break;
    }
    guardarDb(tareas.listadoArr);
    if (opt !== "0") await pausa();
  } while (opt !== "0");
};
main();
