

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
    addMascota(nuevaMascota){
        this.mascotas.push(nuevaMascota);
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(titulo, autor){
        this.libros.push({ titulo: titulo, autor: autor }) 
}
    getBookNames(){
    return this.libros.forEach(x => console.log(x.titulo))
    }
}

let manolo = new Usuario ('Manolo','El del Puerto', [{titulo:'harry potter', autor:'jkrowling'}, {titulo:'el señor de los anillos', autor:'tolkien'}], ['perro','gato','cobra','oso panda'] );



console.log(manolo.getFullName())
console.log(manolo)
manolo.addMascota("conejo al escabeche")
console.log(manolo.mascotas)
console.log(manolo.countMascotas())
manolo.addBook("El arte de la guerra", "Sun Tzu")
console.log(manolo.libros)
manolo.getBookNames();