const express = require("express");
const cors = require("cors"); // Importa el middleware cors
const routerApi = require("./routes"); //index es el archivo por defecto
const { logErrors, boomErrorHandler, errorHandler, sequelizeErrorHandler } = require("./middlewares/error.handler");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

//middleware para poder leer los datos que nos envian en el body
app.use(express.json());

// Agregar el middleware cors
app.use(cors(
  // {origin: ["http://localhost:3003","http://127.0.0.1:5500"]}
));

app.get("/", (req, res) =>{
  res.send("Hola mi server en express");
});

routerApi(app);

//middlewares de error
app.use(logErrors);
app.use(sequelizeErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
  console.log("Servidor en el puerto: " + port);
});
