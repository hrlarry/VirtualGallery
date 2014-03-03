//this is going to be models.js for VirtualGallery

var Mongoose = require('mongoose');

var KeywordSchema = new Mongoose.Schema({
  "Category": String,
  "Labels": [String]
});

var ExhibitSchema = new Mongoose.Schema({
	"id": Number,
	"imageURL": String,
	"description": String,
	"keywords": [KeywordSchema]
});


var UserSchema = new Mongoose.Schema({
  "username": String,
  "email": String,
  "phone": String,
  "exhibits": [ExhibitSchema], 
  "priorities": [String]

});


exports.User = Mongoose.model('User', UserSchema);
exports.Exhibit = Mongoose.model('Exhibit', ExhibitSchema);
exports.Keyword = Mongoose.model('Keyword', KeywordSchema);


//Categories schemas

exports.Categories = Mongoose.model('Categories', KeywordSchema);