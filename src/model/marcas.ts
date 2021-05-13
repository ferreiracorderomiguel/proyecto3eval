import {Schema, model } from 'mongoose'

const marcaSchema = new Schema({
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
})


export interface Marca {
    id_marca: number,
    nombre_marca: string,
    fecha_fundacion: Date,
    pais: string,
    id_competicion: [number],
    competiciones_ganadas: {
      "24 Horas de Le Mans": number,
      "Formula E": number,
      "WTCR": number,
      "WRC": number,
      "F1": number
    },
}

export const Marcas = model('marcas', marcaSchema)