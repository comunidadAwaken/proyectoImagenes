var express = require("express");

var router = express.Router();//administra las rutas

router.get("/", function(solicitud, respuesta){
	respuesta.render("app/home");
});

module.exports = router;