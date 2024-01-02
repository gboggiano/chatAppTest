// 11 aqui vamos a tener todas las vistas
//12 vamos a importar esas vistas
import { Router } from "express";

//13// hacer una variable

const viewsRouters = Router();

// 14 con esto podemos decir que nuestra pagina principal y que vamos a renderizar

viewsRouters.get("/", (req, res) => {
  res.render("index");
});

// 15 vamos a exportarla

export default viewsRouters;
