import {Categorias} from './model/categorias'
import {Coche, Coches} from './model/coches'
import {Competiciones} from './model/competiciones'
import {Marca, Marcas} from './model/marcas'
import { db } from './database/database'
import {Request, Response} from 'express'
import express from 'express'
const app = express()
const port = 3000

const inicio = async (req: Request, res: Response) => {
   res.send("BASE DE DATOS DE COCHES - MIGUEL FERREIRA.")
}

/*Me haga un find a la colección coches pero solo me muestre los datos de un modelo en específico*/
const fun1 = async (req: Request, res: Response) => {
  const nom = req.params.nombre
  await db.conectarBD()
  .then(
    async (mensaje) => {
      const query: any = await Coches.findOne({ "nombre_coche": { $eq: nom } })
      console.log(query)
      
      res.send(query)
    })
  .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })    
  db.desconectarBD()
}


/* Me da el valor en euros de todos los coches de la base de datos*/
const fun2 = async (req: Request, res: Response) => {
    await db.conectarBD()
    .then( 
        async (mensaje) => {
          let arrayCoches: Array<Coche>
          const query: any = await Coches.find(
          {}, {_id: 0, id_coche: 1, id_marca: 1, id_categoria: 1, nombre_coche: 1, precio: 1})

          console.log(query)
          arrayCoches = query
          console.log(arrayCoches)

          let valorTotal: number = 0
          let coche: Coche

          for (coche of arrayCoches){
            console.log(coche.precio)
            valorTotal += coche.precio
          }

          res.json("Valor total de la suma del coste de todos los coches: " + valorTotal+"€." )
    })
    .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })
    db.desconectarBD()
  }


/*Buscador de coches en el que se introduce la categoría de este y su marca.*/
const fun3 = async (req: Request, res: Response) => {
  const categoriaCoche : string = req.params.categoria
  const marcaCoche : string = req.params.marca
    await db.conectarBD()
    .then( 
        async (mensaje) => {
          console.log(mensaje)
          const query: any = await Coches.aggregate([
            {
              $lookup:{
                from: "categorias",
                localField: "id_categoria",
                foreignField: "id_categoria",
                as: "categoria"
              }
            },
            {
              $lookup:{
                from: "marcas",
                localField: "id_marca",
                foreignField: "id_marca",
                as: "marca"
              }
            },
            {
              $match:{
                    $and:[
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
              $project:{
                id_coche: "$id_coche",
                nombre_coche: "$nombre_coche",
                id_categoria: "$categoria.id_categoria",
                nombre_categoria: "$categoria.nombre_categoria",
                precio: "$precio",
                fecha_estreno: "$fecha_estreno",
              }
            },
            {
              $project:{
                _id:0,
                id_coche: 1,
                nombre_coche: 1,
                id_categoria: 1,
                nombre_categoria: 1,
                precio: 1,
                fecha_estreno: 1
              }
            }
          ])
          console.log(query)
          res.json(query)
    })
    .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })
    db.desconectarBD()
  }


/*Se introduce el nombre de una marca y se devuelve el número de coches que tiene en la BD.*/
const fun4 = async (req: Request, res: Response) => {
  let coche: Coche
  let arrayCoches: Array<Coche>
  const marcaCoche = req.params.marcaCoche
  await db.conectarBD()
  .then(
    async (mensaje) => {
        let num_coches: number = 0
        console.log(mensaje)
        const query: any = await Marcas.aggregate([
      {
        $lookup:
        {
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
        $match:{"nombre_marca": marcaCoche}
      }
    ])

    arrayCoches = query
    console.log(query)

    for (coche of arrayCoches){
      num_coches += 1
    }

    res.json(`La marca de coches ${marcaCoche} tiene un total de ${num_coches} coches en la base de datos.`)
    })

  .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })    
  db.desconectarBD()
}


/*Se introduce el nombre de una marca o su id y devuelve la suma del precio de todos su coches en la base de datos.*/
//Hacer otra interfaz mezclando ambas.
const fun5 = async (req: Request, res: Response) => {
  const nombre_marca_entrada : string = req.params.nombre_marca_entrada
  const id_marca_entrada : number = parseInt(req.params.id_marca_entrada)
    await db.conectarBD()
    .then( 
        async (mensaje) => {
          console.log(mensaje)
          let arrayCoches: Array<Coche>
          let arrayMarcas: Array<Marca>
          const query: any = await Coches.aggregate([
            {
              $lookup:{
                from: "marcas",
                localField: "id_marca",
                foreignField: "id_marca",
                as: "marca"
              }
            },
            {
              $project:{
                nombre_marca: "$marca.nombre_marca",
                precio: "$precio",
                id_marca: "$marca.id_marca"
              }
            },
            {
              $match:{
                $or:[
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
              $project:{
                _id:0,
                id_coche:1,
                id_marca:1,
                id_categoria: 1,
                nombre_coche: 1,
                nombre_marca: 1,
                precio: 1
              }
            }
          ])

          console.log(query)
          arrayCoches = query
          arrayMarcas = query
          console.log(arrayCoches)

          let valorTotal: number = 0
          let nombre_de_la_marca: string = ""
          let coche: Coche
          let marca: Marca
          let impuesto1: number = 0.1
          let impuesto2: number = 0.15
          let impuesto3: number = 0.21
          let impuestoFinal: number = 0

          interface respuesta{
            nombre_marca: string,
            valor_marca: number,
            impuesto_a_pagar: number
          }
          let resultado: Array<respuesta> = []

          for (coche of arrayCoches){
            console.log(coche.precio)
            valorTotal += coche.precio
          } 

          for (marca of arrayMarcas){
            nombre_de_la_marca = marca.nombre_marca
          }

          if(valorTotal < 250000){
            impuestoFinal = valorTotal*impuesto1
          } else if(valorTotal >= 250000 && valorTotal <= 500000){
            impuestoFinal = valorTotal*impuesto2
          } else if(valorTotal > 500000){
            impuestoFinal = valorTotal*impuesto3
          }

          impuestoFinal = Math.round(impuestoFinal)

          console.log(`Valor total: ${valorTotal}`)
          resultado.push({
            nombre_marca: nombre_de_la_marca,
            valor_marca: valorTotal,
            impuesto_a_pagar: impuestoFinal
          })
          res.json(resultado)
    })
    .catch(
      (mensaje) => {
        res.send(mensaje)
        console.log(mensaje)
    })
    db.desconectarBD()
  }


app.get('/', inicio)
app.get('/coches/:nombre', fun1)
app.get('/valorTotal', fun2)
app.get('/buscador/:categoria/:marca', fun3)
app.get('/coches/num_coches_marca/:marcaCoche', fun4)
app.get('/valor/:nombre_marca_entrada/:id_marca_entrada', fun5)

app.listen(process.env.PORT || port, () => {
  console.log(`Listening...`)
})