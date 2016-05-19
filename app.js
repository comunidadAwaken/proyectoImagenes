var express = require("express");
var bodyParser = require("body-parser");
var app = express(); // tomamos el objeto



//middlewares
app.use("/estatico",express.static('public'));//archivos staticos css
app.use(bodyParser.json());// para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));// parsear tambien arreglos
app.use(express.static('assets'));//middlewares

app.set("view engine", "jade");//implementa jade

app.get("/", function(solicitud, respuesta){
	respuesta.render("index");
});

app.get("/login", function(solicitud,respuesta){	
	respuesta.render("login");
});

app.post("/users", function(solicitud, respuesta){
	console.log("Contraseña: "+solicitud.body.pass);
	console.log("Email: "+solicitud.body.email);
	respuesta.send("Recibimos login");
});

app.listen(8080);