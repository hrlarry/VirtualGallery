/* This is the javascript file for the login page
*/

//stolen from add.js:
// var data = require("../data.json");

// exports.addFriend = function(req, res) {  
// 	var newFriend = {
// 		"name": req.query.name,
// 		"description": req.query.description,
// 		"imageURL": 'http://lorempixel.com/400/400/people'
// 	}; 
// 	console.log(newFriend);
// 	data["friends"].push(newFriend);
// 	res.render('add',data);
//  }


//stolen from index.js:
// Get all of our friend data
//var data = require('../data.json');

exports.view = function(req, res){
	//console.log(data);
	res.render('login');
};