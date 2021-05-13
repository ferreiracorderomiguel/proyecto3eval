"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marcas = void 0;
const mongoose_1 = require("mongoose");
const marcaSchema = new mongoose_1.Schema({
    id_marca: Number,
    nombre_marca: String,
    fecha_fundacion: Date,
    pais: String,
    id_competicion: [Number],
    competiciones_ganadas: {
        "24 Horas de Le Mans": Number,
        "Formula E": Number,
        "WTCR": Number,
        "WRC": Number,
        "F1": Number
    },
});
exports.Marcas = mongoose_1.model('marcas', marcaSchema);
