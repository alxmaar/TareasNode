import { Tarea } from "./tarea.js";
import colors from "colors";
class Tareas {
    listado = {};

    get listadoArr() {
        const listado2 = [];
        Object.keys(this.listado).forEach((key) => {
            const tarea = this.listado[key];
            listado2.push(tarea);
        });
        return listado2;
    }

    constructor() {
    this.listado = {};
    }

    borrarTarea(id = "") {
        if (this.listado[id]) {
            delete this.listado[id];
        }
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this.listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => {
            this.listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const id = `${i + 1}`.green;
            const { desc, completadaEn } = tarea;
            const estado = completadaEn ? "Completada".green : "Pendiente".red;
            console.log(`${id} ${desc} :: ${estado}`);
        });
    }

    listarCompletadas(completadas = true) {
        let contador = 1;
        this.listadoArr.forEach((tarea, i) => {
            const listatareas = tarea.completadaEn;
            if (completadas && listatareas) {
                const id = `${contador}.-`.green;
                console.log(`${id} ${tarea.desc} ${tarea.completadaEn.green}`);
                contador++;
            } 
            else if (!completadas && !listatareas) {
                const id = `${contador}.-`.green;
                console.log(`${id} ${tarea.desc}`);
                contador++;
            }
        });
    }

    toggleCompletadas(ids=[])
    {
        ids.forEach(id=>{
            
            const tarea = this.listado[id];
            if(!tarea.completadaEn)
            {
                tarea.completadaEn = new Date().toISOString();
            }
        })
        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id))
            {
                this.listado[tarea.id].completadaEn = null;
            }
        });
    }


}

export { Tareas };
