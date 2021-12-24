

class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        return `El nombre es ${this.nombre} ${this.apellido}` 
    }
}

let manolo = new Usuario ('Manolo','El del Puerto', [{nombre:'harry potter', autor:'jkrowling'}, {nombre:'el señor de los anillos', autor:'tolkien'}], ['perro','gato','cobra','oso panda'] );
console.log(manolo.getFullName())
console.log(manolo)
