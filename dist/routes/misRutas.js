"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categorias = require("../model/categorias");
const coches = require("../model/coches");
const competiciones = require("../model/competiciones");
const marcas = require("../model/marcas");

class MisRutas {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield heroes_1.Heroes.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.fun2 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send("Hola Mundo desde dato.");
        });
        this.fun1 = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send("Hola Mundo.");
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/categorias', this.get);
        this._router.get('/coches', this.get);
        this._router.get('/competiciones', this.get);
        this._router.get('/marcas', this.get);
        this._router.get('/', this.fun1);
    }
}
const obj = new MisRutas();
obj.misRutas();
exports.rutas = obj.router;
