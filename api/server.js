// const express = require("express")
// const morgan = require("morgan");
// const {red} = require("chalk")
// const db = require("./db")
// const routes = require('./routes')

// const app = express()

// // Configs
// app.use(morgan("dev"))
// app.use(express.json()) //Para los GET no hace falta pero para los POST sí :)
// app.use(express.urlencoded({ extended: false })); //Para que funcionen los formularios del front


// //Routes
// app.use("/api", routes)

// // Error Middleware
// app.use((error, req, res, next) =>{
//   console.log(red("Ha ocurrido un error y entré al error middleware:"))
//   console.log(error)
//   res.sendStatus(500)
// })

// //TODO Preguntar si esta forma de levantar el server con async/await está bien
// const deployServer = async () =>{
//   try{
//     await db.sync({force: false})
//     const port = 3001
//     app.listen(port, () =>{
//       console.log(`Server running on http://localhost/${port}`)
//     })  
//   }catch(error){
//     console.log(red(error))
//   }
// }

// deployServer()

/** @format */

const express = require("express");
const morgan = require("morgan");

const db = require("./db");
const routes = require("./routes");

const app = express();

// LOGGUER
app.use(morgan("dev"));

// PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api", routes);

// RUTA PRUEBA // ! SE PUEDE SACAR
app.use("/", (req, res, nex) => {
  res.send("ESTAS EN '/'");
});

app.use("/", (err, req, res, next) => {
  console.log(err);
  console.error("ERROR", err.stack);
  res.status(500).json(err);
});

const PORT = 3001;
const url = "http://localhost:";

db.sync({ force: false })
  .then(() => {
    console.log(`Conexion a base de datos completa`);
    app.listen(PORT, () => {
      console.log(`Estamos conectados y escuchando en ${url + PORT}`);
    });
  })
  .catch((err) => console.log(err));
