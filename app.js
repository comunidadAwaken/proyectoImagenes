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

app.get("/signup", function(solicitud,respuesta){	
	User.find(function(error, documento){
		console.log(documento);
	});
	respuesta.render("signup");
});

app.get("/login", function(solicitud,respuesta){		
	respuesta.render("login");
});

app.post("/users", function(solicitud, respuesta){
	
	var user = new User({
							email:solicitud.body.email, 
							password:solicitud.body.pass, 
							password_confirmation:solicitud.body.password_confirmation,
							username:solicitud.body.username
						});
	/*user.save(function(error){
		if (error) {
			console.log(String(error));
		}
		respuesta.send("Guardamos tus datos");
	});*/
	//promises lo que se usa hoy en dia 
	user.save().then(function(usuarios){
		respuesta.send("Guardamos tus datos");
	}, function(error){
		console.log(String(error));
		respuesta.send("No pudimos guardar la información");
	});
	

});

app.post("/sessions", function(solicitud, respuesta){
	
		User.findOne({email:solicitud.body.email , password:solicitud.body.pass },"username email", function(error, documento){
			console.log(documento);
			respuesta.send("Listos Hola Mundo");
	});
});

app.listen(8080);