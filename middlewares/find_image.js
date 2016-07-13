var Imagen = require("../models/imagenes");

module.exports = function(solicitud, respuesta, next){
	Imagen.findById(solicitud.params.id,function(error,imagen){
		if (imagen != null) {
			console.log("Encontre la imagen "+ imagen.title);
			respuesta.locals.imagen = imagen;
			next();
		}else{
			/*Render 404*/
			respuesta.redirect("/app");		
		}
	});
}