"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categorias = void 0;
const mongoose_1 = require("mongoose");
const categoriaSchema = new mongoose_1.Schema({
    id_categoria: Number,
    nombre_categoria: String,
});
exports.Categorias = mongoose_1.model('categorias', categoriaSchema);
