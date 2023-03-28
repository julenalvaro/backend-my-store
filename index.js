const express = require("express");
const cors = require("cors"); // Importa el middleware cors
const routerApi = require("./routes"); //index es el archivo por defecto
const { logErrors, boomErrorHandler, errorHandler } = require("./middlewares/error.handler");
const { checkApiKey } = require("../middlewares/auth.handler");

const app = express();
const port = process.env.PORT || 3003;

//middleware para poder leer los datos que nos envian en el body
app.use(express.json());

// Agregar el middleware cors
app.use(cors(
  // {origin: ["http://localhost:3003","http://127.0.0.1:5500"]}
));

app.get("/", (req, res) =>{
  res.send("Hola mi server en express");
});

app.get("/nueva-ruta",
  checkApiKey(),
  (req, res) =>{
  res.send("Hola soy una nueva ruta");
});


routerApi(app);

//middlewares de error
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
  console.log("My port: " + port);
});
