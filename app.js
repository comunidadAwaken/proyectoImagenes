var express = require("express");


var app = express(); // tomamos el objeto

//archivos staticos css
app.use("/estatico",express.static('public'));//middlewares
app.use(express.static('assets'));//middlewares




app.set("view engine", "jade");//implementa jade

app.get("/", function(solicitud, respuesta){
	respuesta.render("index");
});

app.get("/login", function(solicitud,respuesta){
	respuesta.render("login");
})

app.listen(8080);