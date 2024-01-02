import express from "express";
//1 importatmos socket
import { Server } from "socket.io";
//5.a importamos handlebars
import handlebars from "express-handlebars";
//16.a
import viewsRouters from "./routes/views.routes.js";

const PORT = 8080;
const app = express();
// 3.a hacer la clasicas configraciones y luego creamos nuestra carpeta public
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// 5 vamos aconfigurar y definir las vistas
app.engine("handlebars", handlebars.engine());
// 6 setear vistas
app.set("views", "src/views");
// 8 cual es el motor que estamos usando
app.set("view engine", "handlebars");

//2 vamos a guardar esto en una variable
const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//17 vamos a decir cual es la raiz de nuestro proyecto y las view routers (a este punto podemos levantar el servidor)
app.use("/", viewsRouters);

//3 vamos a instanciar el socket (configurarlo)

const io = new Server(httpServer);

// 4 luego vamos a configurar las vistas con la carpeta view

// 10 vamos a crear una ruta para renderizar en nuestra vista

//16 vamos a importar views.routes (lo hacemos arriba)

//29 creamos un array donde vamos a guardar todo lo que viene desde el lado del cliente
const messages = [];
//27.a
io.on("connect", (socket) => {
  console.log("Nuevo Cliente Conectado");
  //28 ahora vamos a escuchar cuando llega un nuevo message, recordando que tiene que coincidir con el mismo message, y en la cual recibamos una data, para ello vamos acrear un array
  socket.on("message", (data) => {
    messages.push(data);
    //29 vamos a emitir a todos el messages (luego de hacer push que actualiza la varibale messages)
    io.emit("messageLogs", messages);
  });

  //32.a vamosa escuchar algun mensaje que nos haya enviado el cliente, luego vamos a emitir a todos que un nuevo usuario se ha conectado

  socket.on("newUser", (user) => {
    io.emit("newConnection", "un nuevo usuaario se conecto");
    //34 cuando se autentica otro usuario emitir otro mensaje para que lo escuchen todos menos el actual, recuerda que se debe escuchar del otro lado es decir del lado del cliente
    socket.broadcast.emit("notification", user);
  });
});

// **** vamos hacer deploy en glitch
