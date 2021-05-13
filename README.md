# Aplicación con acceso a base de datos  
Acceso a base de datos en la nube a través del lenguaje Node.js y TypeScript.

## Explicación 🚀
Esta base de datos cuenta con **4 colecciones**. Los `coches` son de una `categoría` específica, estos pertenecen a una `marca`, y esta hace varias `competiciones`.

Se realizarán varias consultas con find y aggregate a través de Mongo Atlas.


### Índice:
* /coches/:nombre = Muestre los datos de un coche en específico según su nombre. Hay que reemplazar el ":nombre" por el modelo deseado.
* /valorTotal = Con un bucle for recorre todos los coches de la base de datos y devuelve el precio de la suma de todos.
* /buscador/:categoria/:marca = Buscador de coches en el que se introduce la categoría de este y su marca.
* /coches/num_coches_marca/:marcaCoche = Se introduce una marca y se devuleve el número de coches que tiene registrados en la BD.
* /valor/:nombre_marca_entrada/:id_marca_entrada = Se introduce el nombre de una marca o su id y devuelve la suma del precio de todos su coches en la base de datos.

- - -
*Realizado por Miguel Ferreira*