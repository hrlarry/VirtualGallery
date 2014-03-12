//var profiles = require('../fakeDatabase.json');
var models = require('../models');

exports.displayPage = function(req, res){
	//want to display a specific user's gallery
	var username = req.params.username;

	models.User
		.find()
		.exec(renderProjects)

	function renderProjects(err, users) {
		if (err) console.log(err);
		//console.log(users);
		var found = false; 
		for (var i = 0; i < users.length; i++) {
			if (users[i].username == username) {
				//display this one
				console.log("user found!");
				found = true;
				var thingToRender = {
					"username": username,
					"imageURL": users[i].exhibits[0].imageURL,
					"description": users[i].exhibits[0].description
				};
				res.render('visitGallery', thingToRender);
			}
			if (found) break;
		}

		if (!found) {
			console.log("user " + username + "was not found");
			res.redirect("404");
		}
	}
}