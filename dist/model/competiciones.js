"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Competiciones = void 0;
const mongoose_1 = require("mongoose");
const competicionSchema = new mongoose_1.Schema({
    id_competicion: Number,
    nombre_competicion: String,
});
exports.Competiciones = mongoose_1.model('competiciones', competicionSchema);
