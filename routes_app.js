var express = require("express");
var Imagen = require("./models/imagenes");
var router = express.Router();//administra las rutas

var image_finder_middleware = require("./middlewares/find_image");


router.get("/", function(solicitud, respuesta){
	/*Busca al usuario*/
	respuesta.render("app/home");
});

/* REST */

//muestra formulario para agregar
router.get("/imagenes/new", function(solicitud,respuesta){
	respuesta.render("app/imagenes/new");

});

router.all("/imagenes/:id*", image_finder_middleware);

// muestra formulario para editar
router.get("/imagenes/:id/edit", function(solicitud,respuesta){
	respuesta.render("app/imagenes/edit");
});


router.route("/imagenes/:id")
	//mostrar o tomar
	.get(function(solicitud, respuesta){
		respuesta.render("app/imagenes/show");		
	})
	//actualizar 
	.put(function(solicitud, respuesta){
		respuesta.locals.imagen.title = solicitud.body.title;
			respuesta.locals.imagen.save(function(error){
				if(!error){
					respuesta.render("app/imagenes/show");
				}else{
					respuesta.render("app/imagenes/"+solicitud.params.id+"/edit");
				}
			});
			respuesta.render("app/imagenes/show");
		
	})
	//eliminar foto
	.delete(function(solicitud,respuesta){

		Imagen.findOneAndRemove({_id: solicitud.params.id}, function(error){
				if (!error) {
					respuesta.redirect("/app/imagenes");
				}else{
					console.log(error);
					respuesta.redirect("/app/imagenes"+solicitud.params.id);
				}
		});
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