var express = require("express");

var router = express.Router();//administra las rutas

router.get("/", function(solicitud, respuesta){
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

	})
	//crear una nueva imagen 
	.post(function(solicitud, respuesta){

	})
	



module.exports = router;