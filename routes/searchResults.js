//var data = require("../categories.json");
//var userData = require("../fakeDatabase.json");
var models = require('../models');

exports.displayPage = function(req, res){
	models.User
		.find()
		.exec(renderUsers);

	function renderUsers(err, users){
		res.render('searchResults', {'users': users });
	}
	//res.render('searchResults', userData);
}



/*
 * GET home page.
 */

// exports.view = function(req, res){

// 	models.Project
// 		.find()
// 		.sort('date')
// 		.exec(renderProjects);

// 	function renderProjects(err, projects) {
// 		res.render('index', { 'projects': projects });
// 	}

// };
// $(document).ready(function() {
// 	initializePage();
// })


//  * Function that is called when the document is ready.
 
// function initializePage() {
// 	//initialize here
// }