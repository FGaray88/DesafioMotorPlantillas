const fs = require("fs")

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
    }

    async save(object) {
        try {
            let objAddId;
            const data = await leerArchivo(this.archivo);
            const mapeo = await data.map((product) => product.id);
            const mayorId = Math.max(...mapeo);
            const nuevoID = mayorId + 1;
            nuevoID === -Infinity ? objAddId = 1 : objAddId = nuevoID;
            const objAddedId = { ...object, id: objAddId };
            data.push(objAddedId);
            escribirArchivo(this.archivo, JSON.stringify(data))
            const idNum = "el numero de ID asignado es: " + objAddId;
            return idNum;
        }
        catch (error) {
            console.log(error)
        }
    }

    async getById(Number) {
        const data = await leerArchivo(this.archivo)
        const found = data.find(p => p.id === Number);

        if (found === undefined) {
            const text = "Producto no encontrado";
            return text;
        } else {
            const filtro = data.filter(product => product.id === Number);
            return filtro;
        }
    }

    async updateById(Number, newProduct) {
        const data = await leerArchivo(this.archivo)
        const found = data.findIndex(p => p.id === +(Number));
        if (found == -1) {
            const text = "Producto no encontrado";
            return text;
        } else {
            data.splice(found, 1, newProduct);
            escribirArchivo(this.archivo, JSON.stringify(data))
            return "archivo actualizado correctamente";
        }
    }

    async getAll() {
        const data = await leerArchivo(this.archivo);
        return data;
    }

    async deleteById(Number) {
        const data = await leerArchivo(this.archivo)
        const found = data.find(p => p.id === Number);
        if (found === undefined) {
            console.log("no se ha encontrado el item")
        } else {
            const filtro = data.filter(product => product.id !== Number);
            console.log("producto eliminado con exito")
            console.log(filtro)
            escribirArchivo(this.archivo, JSON.stringify(filtro))
        }
    }

    async deleteAll() {
        const nuevoArray = []
        console.log("productos eliminados con exito")
        await escribirArchivo(this.archivo, JSON.stringify(nuevoArray))
    }
}



leerArchivo = async (archivo) => {
    try {
        const data = await fs.promises.readFile(archivo, "utf-8")
        const dataParse = JSON.parse(data)
        return dataParse
    }
    catch (error) {
        console.log("error")
        console.log(error.message)
    }
}

escribirArchivo = async (archivo, data) => {
    try {
        await fs.promises.writeFile(archivo, data)
        console.log("archivo actualizado con exito")
    }
    catch (error) {
        console.log("error")
        console.log(error.message)
    }
}

const cont1 = new Contenedor("./products.json")

const producto1 = { title: "buzo", price: 7000, thumbnail: "urlBuzo" };
const producto2 = { title: "camisa", price: 9000, thumbnail: "urlCamisa" };
const producto3 = { title: "pantalon", price: 6000, thumbnail: "urlPantalon" };
const producto4 = { title: "campera", price: 14000, thumbnail: "urlCampera" };
const producto5 = { title: "remera", price: 4000, thumbnail: "urlremera" };


// llamados
// cont1.getById(3)
// cont1.deleteById(1)
// cont1.deleteAll() 
// cont1.getAll()
// cont1.save(producto1)

module.exports = Contenedor
