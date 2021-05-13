"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coches_1 = require("./model/coches");
const marcas_1 = require("./model/marcas");
const database_1 = require("./database/database");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
const inicio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("BASE DE DATOS DE COCHES - MIGUEL FERREIRA.");
});
/*Me haga un find a la colección coches pero solo me muestre los datos de un modelo en específico*/
const fun1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nom = req.params.nombre;
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        const query = yield coches_1.Coches.findOne({ "nombre_coche": { $eq: nom } });
        console.log(query);
        res.send(query);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
/* Me da el valor en euros de todos los coches de la base de datos*/
const fun2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        let arrayCoches;
        const query = yield coches_1.Coches.find({}, { _id: 0, id_coche: 1, id_marca: 1, id_categoria: 1, nombre_coche: 1, precio: 1 });
        console.log(query);
        arrayCoches = query;
        console.log(arrayCoches);
        let valorTotal = 0;
        let coche;
        for (coche of arrayCoches) {
            console.log(coche.precio);
            valorTotal += coche.precio;
        }
        res.json("Valor total de la suma del coste de todos los coches: " + valorTotal + "€.");
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
/*Buscador de coches en el que se introduce la categoría de este y su marca.*/
const fun3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoriaCoche = req.params.categoria;
    const marcaCoche = req.params.marca;
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(mensaje);
        const query = yield coches_1.Coches.aggregate([
            {
                $lookup: {
                    from: "categorias",
                    localField: "id_categoria",
                    foreignField: "id_categoria",
                    as: "categoria"
                }
            },
            {
                $lookup: {
                    from: "marcas",
                    localField: "id_marca",
                    foreignField: "id_marca",
                    as: "marca"
                }
            },
            {
                $match: {
                    $and: [
                        {
                            "categoria.nombre_categoria": categoriaCoche,
                        },
                        {
                            "marca.nombre_marca": marcaCoche
                        }
                    ]
                }
            },
            {
                $project: {
                    id_coche: "$id_coche",
                    nombre_coche: "$nombre_coche",
                    id_categoria: "$categoria.id_categoria",
                    nombre_categoria: "$categoria.nombre_categoria",
                    precio: "$precio",
                    fecha_estreno: "$fecha_estreno",
                }
            },
            {
                $project: {
                    _id: 0,
                    id_coche: 1,
                    nombre_coche: 1,
                    id_categoria: 1,
                    nombre_categoria: 1,
                    precio: 1,
                    fecha_estreno: 1
                }
            }
        ]);
        console.log(query);
        res.json(query);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
/*Se introduce el nombre de una marca y se devuelve el número de coches que tiene en la BD.*/
const fun4 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let coche;
    let arrayCoches;
    const marcaCoche = req.params.marcaCoche;
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        let num_coches = 0;
        console.log(mensaje);
        const query = yield marcas_1.Marcas.aggregate([
            {
                $lookup: {
                    from: "coches",
                    localField: "id_marca",
                    foreignField: "id_marca",
                    as: "coche"
                }
            },
            {
                $unwind: "$coche"
            },
            {
                $match: { "nombre_marca": marcaCoche }
            }
        ]);
        arrayCoches = query;
        console.log(query);
        for (coche of arrayCoches) {
            num_coches += 1;
        }
        res.json(`La marca de coches ${marcaCoche} tiene un total de ${num_coches} coches en la base de datos.`);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
/*Se introduce el nombre de una marca o su id y devuelve la suma del precio de todos su coches en la base de datos.*/
//Hacer otra interfaz mezclando ambas.
const fun5 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre_marca_entrada = req.params.nombre_marca_entrada;
    const id_marca_entrada = parseInt(req.params.id_marca_entrada);
    yield database_1.db.conectarBD()
        .then((mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(mensaje);
        let arrayCoches;
        let arrayMarcas;
        const query = yield coches_1.Coches.aggregate([
            {
                $lookup: {
                    from: "marcas",
                    localField: "id_marca",
                    foreignField: "id_marca",
                    as: "marca"
                }
            },
            {
                $project: {
                    nombre_marca: "$marca.nombre_marca",
                    precio: "$precio",
                    id_marca: "$marca.id_marca"
                }
            },
            {
                $match: {
                    $or: [
                        {
                            "nombre_marca": nombre_marca_entrada
                        },
                        {
                            "id_marca": id_marca_entrada
                        }
                    ]
                }
            },
            {
                $project: {
                    _id: 0,
                    id_coche: 1,
                    id_marca: 1,
                    id_categoria: 1,
                    nombre_coche: 1,
                    nombre_marca: 1,
                    precio: 1
                }
            }
        ]);
        console.log(query);
        arrayCoches = query;
        arrayMarcas = query;
        console.log(arrayCoches);
        let valorTotal = 0;
        let nombre_de_la_marca = "";
        let coche;
        let marca;
        let impuesto1 = 0.1;
        let impuesto2 = 0.15;
        let impuesto3 = 0.21;
        let impuestoFinal = 0;
        let resultado = [];
        for (coche of arrayCoches) {
            console.log(coche.precio);
            valorTotal += coche.precio;
        }
        for (marca of arrayMarcas) {
            nombre_de_la_marca = marca.nombre_marca;
        }
        if (valorTotal < 250000) {
            impuestoFinal = valorTotal * impuesto1;
        }
        else if (valorTotal >= 250000 && valorTotal <= 500000) {
            impuestoFinal = valorTotal * impuesto2;
        }
        else if (valorTotal > 500000) {
            impuestoFinal = valorTotal * impuesto3;
        }
        impuestoFinal = Math.round(impuestoFinal);
        console.log(`Valor total: ${valorTotal}`);
        resultado.push({
            nombre_marca: nombre_de_la_marca,
            valor_marca: valorTotal,
            impuesto_a_pagar: impuestoFinal
        });
        res.json(resultado);
    }))
        .catch((mensaje) => {
        res.send(mensaje);
        console.log(mensaje);
    });
    database_1.db.desconectarBD();
});
app.get('/', inicio);
app.get('/coches/:nombre', fun1);
app.get('/valorTotal', fun2);
app.get('/buscador/:categoria/:marca', fun3);
app.get('/coches/num_coches_marca/:marcaCoche', fun4);
app.get('/valor/:nombre_marca_entrada/:id_marca_entrada', fun5);
app.listen(process.env.PORT || port, () => {
    console.log(`Listening...`);
});
