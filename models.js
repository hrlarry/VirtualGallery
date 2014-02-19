//this is going to be models.js for VirtualBulletin


var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
  "username": String,
  "password": String,
  "email": String,
  "phone": String,
  "exhibits": [Schema.Types.ObjectId] //is this the right way to have an array of exhibit objects?

});

var ExhibitSchema = new Mongoose.Schema({
	"id": Number,
	"imageURL": String,
	"description": String,
	"keywords": [String]
})

exports.User = Mongoose.model('User', UserSchema);
exports.Exhibit = Mongoose.model('Exhibit', ExhibitSchema);

