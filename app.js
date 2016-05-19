var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./models/user").User;
var app = express(); // tomamos el objeto


//middlewares
app.use("/public",express.static('public'));//archivos staticos css
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
	
	var user = new User({email:solicitud.body.email, password:solicitud.body.pass });
	user.save(function(){
		respuesta.send("Guardamos tus datos");
	});
	

});

app.listen(8080);