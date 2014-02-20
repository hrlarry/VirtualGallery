//var profiles = require('../fakeDatabase.json');
var models = require('../models');

exports.displayPage = function(req, res){
	//want to display a specific user's gallery
	var username = req.params.username;

		models.User
		.find()
		.exec(renderProjects);

	function renderProjects(err, users) {
		for (var i = 0; i < users.length; i++){
			if (users[i].username == username){
				//display this one
				res.render('visitGallery', users[i].exhibits[0]);
				break;
			}
		}
		//THIS SHOULD IDEALLY GO TO AN ERROR PAGE - DIDN'T FIND THE USER IN QUESTION
		console.log("didn't find user " + username + " - displaying the first one in the database");
		res.render('visitGallery', users[0].exhibits[0]);
	}
  //res.render('visitGallery', profiles.users[0].exhibits[0]);
}