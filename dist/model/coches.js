"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coches = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const cocheSchema = new mongoose_1.Schema({
    id_coche: Number,
    id_marca: Number,
    id_categoria: [Number],
    nombre_coche: String,
    precio: Number,
    fecha_estreno: Date,
    especificaciones: {
        Cilindros: Number, HP: Number, Asientos: Number, Puertas: Number, Color: String
    },
    tipo_motor: {
        coche_electrico: Boolean, coche_hibrido: Boolean
    },
});
exports.Coches = mongoose_1.model('coches', cocheSchema);
