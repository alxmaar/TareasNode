require('colors');

const MostrarMenu = () => {

    return new Promise(resolve => {
    let opt='';
    console.clear();
    console.log("======================".green);
    console.log(" Seleccione una opcion".green);
    console.log("======================\n".green);

    console.log(`${'1.'.green}Crear una tarea`);
    console.log(`${'2.'.green}Ver tareas `);
    console.log(`${'3.'.green}er tareas completadas`);
    console.log(`${'4.'.green}Ver tareas pendientes`);
    console.log(`${'5.'.green}Completar tarea(s)`);
    console.log(`${'6.'.green}Borrar Tarea`);
    console.log(`${'0.'.green} Salir \n`);

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.question('Seleccione una opcion: ',(opt)=>{
        resolve(opt);
        readline.close();
    })
})
}

const pausa = () => {
    return new Promise(resolve => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline.question(`Presione ${'ENTER'.green} para continuar...`,(opt)=> {
        readline.close();
        resolve();
    });

    })
}

module.exports = {
    MostrarMenu,
    pausa,
}