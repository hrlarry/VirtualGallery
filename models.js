//this is going to be models.js for VirtualBulletin


var Mongoose = require('mongoose');

var ExhibitSchema = new Mongoose.Schema({
	"id": Number,
	"imageURL": String,
	"description": String,
	"keywords": [String]
});


var UserSchema = new Mongoose.Schema({
  "username": String,
  "password": String,
  "email": String,
  "phone": String,
  "exhibits": [ExhibitSchema], //is this the right way to have an array of exhibit objects?
  "priorities": [String]

});


exports.User = Mongoose.model('User', UserSchema);
exports.Exhibit = Mongoose.model('Exhibit', ExhibitSchema);

