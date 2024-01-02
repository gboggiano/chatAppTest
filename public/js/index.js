// 19 creamos nuestro index.js que es este y lo vamos a importat dentro de index.handlebars
//20 para verificar que esto este funcionando hacemos un consolelog
console.log("Hi from front");

//21 para esta clase desde el lado del cliente vamos a iniciar nuestro socket

const socket = io(); // ** la funcion io() sale de la libreria que esta dentro del script dentro de "/socket.io/socket.io.js contenida en index.handlebars, por eso es importante el orden en que se coloquen las etiquetas scripts

// 22 vamos a instalar sweetalert lo vamos hacer por cdn  en index.handlebars y aqui el codigo :

// Swal.fire({
//   title: "Good job!",
//   text: "You clicked the button!",
//   icon: "success",
// });

//23 vamos hacer una vista de autentificacion con sweet alert

let userName;

Swal.fire({
  title: "ingrese su nombre",
  input: "text",
  inputValidator: (value) => {
    if (!value) {
      return "tienes que ingresar tu nombre ";
    }
  },
}).then((data) => {
  userName = data.value;
  console.log(userName);
  //32 VAMOS HACER UNA VALIDACION EMITIMOS CUANDO SE CONECTE UN USUARIO, esto es lo que vamosa enviar, vamos al lado del servidor, recuerda que debemos escucharlo socket.on , mas abajo
  socket.emit("newUser", userName);
});

//25 aqui es donde vamos a llamar esos datos desde el lado del servidor

const inputData = document.getElementById("inputData");
const outPutData = document.getElementById("outputData");

//26 agregamos un addeventlistener, el cual :
// verificamos si se apreto una tecla y se levanto el dedo "keyup"
// va a recibir un evento (event) y veremos si es igual a Enter, es decir la tecla enter
// luego si el input data sin los espacios de iz y der , si es mayor a 0 emitimos el mensaje
//emitimos nuestro message (este va a coincidir con el del back), con lo que esta dentro de inputData, pero necesitamos saber cual es el usuario que emite el mensaje y que es lo que escribio, por ello vamos a mandar un objeto donde se contiene el userName y tambien la data que sera el inputData

//27 ahora falta desde ele lado del servidor. nos vamos a app.js

inputData.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (inputData.value.trim().length > 0) {
      socket.emit("message", { user: userName, data: inputData.value });
    }
  }
});

//30 vamos a escuhar via socket, el messageLogs que es lo que emitimos desde el servidor y vamos a recibir una data
socket.on("messageLogs", (data) => {
  let messages = "";
  data.forEach((message) => {
    messages += `${message.user} dice ${message.data} <br />`;
  });
  //31 luego podemos agarrar ese outPutData
  outPutData.innerHTML = messages;
});

//33 vamos a escuchar lo que se emite
socket.on("newConnection", (data) => {
  console.log(data);
});

//34.a, vamosa escuchar el notification del server, usamos toast lo que hace que no se cierre
socket.on("notification", (user) => {
  Swal.fire({
    text: `${user} se conecto`,
    toast: true,
    position: "top-right",
  });
});
