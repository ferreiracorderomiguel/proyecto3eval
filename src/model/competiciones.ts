import {Schema, model } from 'mongoose'

const competicionSchema = new Schema({
    id_competicion: Number,
    nombre_competicion: String,
})


export interface Competicion {
    id_competicion: number,
    nombre_competicion: string,
}

export const Competiciones = model('competiciones', competicionSchema)