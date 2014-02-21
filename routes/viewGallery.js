//var profiles = require("../fakeDatabase.json");

var models = require('../models');


exports.displayPage = function(req, res) {    
	// Your code goes here
	//var name = req.query.name;
	/*var description = req.query.description;
	var newFriend = {
		"name": name,
		"description": description,
		"imageURL": "http://lorempixel.com/400/400/people"			
	};
	
	data["friends"].push(newFriend);

	console.log(newFriend);*/
    
    //initializePage();

    models.User
        .find()
        .exec(renderProjects);

    function renderProjects(err, users) {
        res.render('viewGallery', users[0]);
    }
	//res.render('viewGallery', profiles.users[0]);

 }