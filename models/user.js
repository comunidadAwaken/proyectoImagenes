var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//conexion con la base de datos
mongoose.connect("mongodb://localhost/fotos");

var user_schema = new Schema({
	name: String,
	last_name: String,
	username: String,
	password: String,
	age: Number,
	email: String,
	date_of_birth: Date
	});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});
// en la base de datos se se guarda con users
var User = mongoose.model("User", user_schema); // es el constructor que genera los modelos

/*Tipos de datos que podemos guardar en mongodb
	*String
	*Number
	*Date
	*Buffer
	*Boolean
	*Mixed
	*Objectid
	*Array
*/

module.exports.User = User;