import {Schema, model } from 'mongoose'
// Definimos el Schema
const cocheSchema = new Schema({
    id_coche: Number,
    id_marca: Number,
    id_categoria: [Number],
    nombre_coche: String,
    precio: Number,
    fecha_estreno: Date,
    especificaciones: {
      Cilindros: Number, HP: Number , Asientos: Number , Puertas: Number , Color: String
    },
    tipo_motor: {
      coche_electrico: Boolean, coche_hibrido: Boolean
    },
})


export interface Coche {
    id_coche: number,
    id_marca: number,
    id_categoria: [number],
    nombre_coche: string,
    precio: number,
    fecha_estreno: Date,
    especificaciones: {
      cilindros: number, hp: number , asientos: number , puertas: number , color: string
      },
    tipo_motor: {
      coche_electrico: boolean, coche_hibrido: boolean
      },
}

export const Coches = model('coches', cocheSchema)