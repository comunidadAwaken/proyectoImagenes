var express = require("express");
var Imagen = require("./models/imagenes");
var router = express.Router();//administra las rutas


router.get("/", function(solicitud, respuesta){
	/*Busca al usuario*/
	respuesta.render("app/home");
});

/* REST */

//muestra formulario para agregar
router.get("/imagenes/new", function(solicitud,respuesta){
	respuesta.render("app/imagenes/new");

});

// muestra formulario para editar
router.get("/imagenes/:id/edit", function(solicitud,respuesta){

});


router.route("/imagenes/:id")
	//mostrar o tomar
	.get(function(solicitud, respuesta){
		Imagen.findById(solicitud.params.id,function(error,imagen){
			respuesta.render("app/imagenes/show",{imagen:imagen});
		})
		
	})
	//actualizar 
	.put(function(solicitud, respuesta){

	})
	//eliminar foto
	.delete(function(solicitud,respuesta){

	});

router.route("/imagenes")
	//mostrar o tomar
	.get(function(solicitud, respuesta){
		Imagen.find({},function(error, imagenes){
			if (error){respuesta.render("/app");return;}
			respuesta.render("app/imagenes/index", {imagenes:imagenes});
		});
	})
	//crear una nueva imagen 
	.post(function(solicitud, respuesta){
		var data = {
			title: solicitud.body.title// identificados por name			
		}

		var imagen = new Imagen(data); // es un objeto de traido de imagenes.js 

		imagen.save(function(error){
			if(!error)
				respuesta.redirect("/app/imagenes/"+imagen._id);
			else
				respuesta.render(error);
		});
		
	})
	



module.exports = router;