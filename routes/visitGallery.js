//var profiles = require('../fakeDatabase.json');
var models = require('../models');

exports.displayPage = function(req, res){
	//want to display a specific user's gallery
	var username = req.params.username;

  //res.render('visitGallery', profiles[0].exhibits[0]);
	models.User
		.find()
		.exec(renderProjects)

	function renderProjects(err, users) {
		if (err) console.log(err);
		//console.log(users);
		for (var i = 0; i < users.length; i++){
			if (users[i].username == username){
				//display this one
				var thingToRender = {
					"username": username,
					"imageURL": users[i].exhibits[0].imageURL,
					"description": users[i].exhibits[0].description
				};
				res.render('visitGallery', thingToRender);
				break;
			}
		}
		//THIS SHOULD IDEALLY GO TO AN ERROR PAGE - DIDN'T FIND THE USER IN QUESTION
		console.log("didn't find user " + username);
	}
  //res.render('visitGallery', profiles.users[0].exhibits[0]);
}