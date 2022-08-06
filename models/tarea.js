import {v4 as uuid} from 'uuid';

class Tarea {
    id='';
    desc='';
    completadaEn=null;

    constructor(desc, completadaEn){
        this.id=uuid();
        this.desc=desc;
        this.completadaEn=null;
    }
}

export {Tarea};