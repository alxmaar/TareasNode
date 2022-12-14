import colors from "colors";
import inquirer from "inquirer";
const menuOpts = [
  {
    type: "list",
    name: "opt",
    message: "Seleccione una opcion",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear una tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Ver listas`,
      },
      {
        value: "3",
        name: `${"3.".green} Ver tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Ver tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar Tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.log("======================".green);
  console.log(" Seleccione una opcion");
  console.log("======================\n".green);
  const { opt } = await inquirer.prompt(menuOpts);
  return opt;
};

const pausa = async () => {
  console.log("\n");
  await inquirer.prompt([
    {
      type: "input",
      name: "pausa",
      message: "Presione enter para continuar",
    },
  ]);
};

const leerInput = async (message) => {
  const question = {
    type: "input",
    name: "desc",
    message,
    validate(value) {
      if (value.length === 0) {
        return "Porfavor ingrese un valor";
      }
      return true;
    },
  };
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} - ${tarea.desc}`,
    };
  });
  choices.unshift({
    value: "0",
    name: "Cancelar",
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Seleccione una tarea para borrar",
      choices: choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};
const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const listadoCompletar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} - ${tarea.desc}`,
      checked:(tarea.completadaEn)?true:false
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccionar una tarea para completar",
      choices: choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};

export { inquirerMenu, pausa, leerInput, listadoBorrar, confirmar, listadoCompletar };
