
const fs = require("fs");

class Contenedor {
  constructor(file) {
    this.path = "./pokedex/";
    this._file = `${file}.txt`;
  }


   ///Guarda el txt de la pokedex
  async save(object) {
    try {
      let res = await fs.promises.readFile(
        `${this.path}${this._file}`,
        "utf-8"
      );
      let pokemones = JSON.parse(res);
      const pokemon = {
        id: pokemones[pokemones.length - 1].id + 1,
        nombre: object.nombre,
        numero: object.numero,
        entrada: object.entrada,
      };
      pokemones.push(pokemon);
      try {
        await fs.promises.writeFile(
          `${this.path}${this._file}`,
          JSON.stringify(pokemones, null, 2)
        );
        return {
          status: "Success",
          message: "Pokemon atrapado con éxito.",
          id: pokemon.id,
        };
      } catch (err) {
        return {
          status: "Error",
          message: "el Pokemon se ha escapado!.",
          error: err,
        };
      }
    } catch (err) {
      const pokemon = {
        id: 1,
        nombre: object.nombre,
        numero: object.numero,
        entrada: object.entrada,
      };
      try {
        await fs.promises.writeFile(
          `${this.path}${this._file}`,
          JSON.stringify([pokemon], null, 2)
        );
        return {
          status: "Success",
          message: "Pokedex ha cargado el Pokemon con éxito.",
          id: pokemon.id,
        };
      } catch (err) {
        return {
          status: "Error",
          message: "Error al cargar la Pokedex.",
          error: err,
        };
      }
    }
  }


 ///Busca por ID generado (orden de captura)
  async getById(id) {
    try {
      let res = await fs.promises.readFile(
        `${this.path}${this._file}`,
        "utf-8"
      );
      let pokemones = JSON.parse(res);
      let pokemon = pokemones.find((el) => el.id === id);
      if (!pokemon) {
        throw new Error();
      }
      return { status: "Success", data: pokemon };
    } catch (err) {
      return {
        status: "Error",
        message: "No se encuetra el Pokemon dentro de la Pokedex.",
        error: err,
        data: null,
      };
    }
  }




//Muestra todo lo atrapado
  async getAll() {
    try {
      let res = await fs.promises.readFile(
        `${this.path}${this._file}`,
        "utf-8"
      );
      let pokemones = JSON.parse(res);
      return { status: "Success", data: pokemones };
    } catch (err) {
      return {
        status: "Error",
        message: "No se encuentran los pokemones.",
      };
    }
  }


  ///Elimina por ID generado (orden de captura)
  async deleteById(id) {
    try {
      let res = await fs.promises.readFile(
        `${this.path}${this._file}`,
        "utf-8"
      );
      let pokemones = JSON.parse(res);
      let siExiste = pokemones.find((el) => el.id === id);
      if (!siExiste) {
        throw new Error();
      }
      let pokemonesActualizados = pokemones.filter((el) => el.id !== id);
      try {
        await fs.promises.writeFile(
          `${this.path}${this._file}`,
          JSON.stringify(pokemonesActualizados, null, 2)
        );
        return { status: "Success", message: "Pokemon liberado satisfactoriamente." };
      } catch (err) {
        return {
          status: "Error",
          message: "No se pudo liberar el pokemon(te quiere mucho y no quiere irse =) ).",
        };
      }
    } catch (err) {
      return {
        status: "Error",
        message: "No se encuentra el pokemon solicitado.",
      };
    }
  }


   /// Limpia el contenido de la Pokedex
  async deleteAll() {
    try {
      await fs.promises.unlink(`${this.path}${this._file}`);
      return {
        status: "Success",
        message: "Se ha vaciado la Pokedex.",
      };
    } catch (err) {
      return {
        status: "Error",
        message: "Hubo un error al intentar vaciar la Pokedex.",
        error: err,
      };
    }
  }





 ///Busca por numero de Pokedex > nota si existe
 async getByNum(numero) {
    try {
      let res = await fs.promises.readFile(
        `${this.path}${this._file}`,
        "utf-8"
      );
      let pokemones = JSON.parse(res);
      let pokemon = pokemones.filter( (el) => el.numero === numero);
      if (pokemon.length == 0) {
       throw new Error();
      }
      return { status: "Success", data: pokemon };
    } catch (err) {
      return {
        status: "Error",
        message: "No se encuetra el Pokemon dentro de la Pokedex.",
        error: err,
        data: null,
      };
    }
  }


 ///Elimina por numero de Pokedex
 async deleteByNum(numero) {
    try {
      let res = await fs.promises.readFile(
        `${this.path}${this._file}`,
        "utf-8"
      );
      let pokemones = JSON.parse(res);
      let siExiste = pokemones.filter((el) => el.numero === numero);
      if (siExiste.length == 0) {
        throw new Error();
      }
      let pokemonesActualizados = pokemones.filter((el) => el.numero !== numero);
      try {
        await fs.promises.writeFile(
          `${this.path}${this._file}`,
          JSON.stringify(pokemonesActualizados, null, 2)
        );
        return { status: "Success", message: "Pokemon liberado satisfactoriamente." };
      } catch (err) {
        return {
          status: "Error",
          message: "No se pudo liberar el pokemon(te quiere mucho y no quiere irse =) ).",
        };
      }
    } catch (err) {
      return {
        status: "Error",
        message: "No se encuentra el pokemon solicitado.",
      };
    }
  }

}












//Lugar donde se "atrapan" los pokemmones

const pokebola = new Contenedor("pokemones");
let checkeo = "./pokedex/pokemones.txt"
if (fs.existsSync(checkeo) == 0){
// pokemon 1
pokebola
  .save({
    nombre: "Scorbunny",
    numero: 813,
    entrada:
      "https://www.pokemon.com/us/pokedex/scorbunny",
  })
  .then(() =>
    // pokemon 2
    pokebola
      .save({
        nombre: "Floatzel",
        numero: 419,
        entrada:
          "https://www.pokemon.com/us/pokedex/floatzel",
      })
      .then(() =>
        // pokemon 3
        pokebola.save({
          nombre: "Smeargle",
          numero: 235,
          entrada:
            "https://www.pokemon.com/us/pokedex/smeargle",
        })
      )
  );
}else{console.log("Pokedex ya creada, utilize los comandos para borrarla o modificarla")}





// Busqueda en por id (orden de atrapado)
//pokebola.getById(3).then((data) => console.log(data));
//pokebola.getById(152).then((data) => console.log(data));

// Borrar en base al ID
//pokebola.deleteById(1).then((data) => console.log(data));
//pokebola.deleteById(152).then((data) => console.log(data));

// Buscar todos los pokemones
//pokebola.getAll().then((data) => console.log(data));

// Borrar todos los pokemones  
//pokebola.deleteAll().then((data) => console.log(data));

// Buscar por numero de pokemon
//pokebola.getByNum(235).then((data) => console.log(data));
//pokebola.getByNum(815).then((data) => console.log(data));
//pokebola.getByNum(1).then((data) => console.log(data));


// Borrar en base al Numero de pokemon
//pokebola.deleteByNum(235).then((data) => console.log(data));
//pokebola.deleteByNum(152).then((data) => console.log(data));