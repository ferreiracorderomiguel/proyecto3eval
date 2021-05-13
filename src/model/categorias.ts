import {Schema, model} from 'mongoose'

const categoriaSchema = new Schema({
    id_categoria: Number,
    nombre_categoria: String,
})

export interface Categoria {
          id: number;
          name: string;
          salary: number;
}

export const Categorias = model('categorias', categoriaSchema)