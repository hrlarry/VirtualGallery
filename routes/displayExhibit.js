//var profiles = require('../fakeDatabase.json');

var models = require('../models');

exports.exhibitInfo = function(req, res) {
	var exhibitID = req.params.id;
	var username = req.params.username;
	console.log(exhibitID);
/*
	if (exhibitID == "random") {
		exhibitID = Math.floor(Math.random() * profiles[0].exhibits.length) + 1;
	} else {
		exhibitID = parseInt(exhibitID);
	}

	//console.log("from displayExhibit: "+users[0]);
  	var exhibitToShow = profiles[0].exhibits[exhibitID-1]; // of by one, our first project has index 0
  	res.json(exhibitToShow);
*/
	//get exhibits for the current user - right now, user 0
	models.User
		.find()
		.exec(showExhibit)

	function showExhibit(err, users) {
		//console.log(users);
		if (exhibitID == "random") {
			exhibitID = Math.floor(Math.random() * users[0].exhibits.length) + 1;
		} else {
			exhibitID = parseInt(exhibitID);
		}

		console.log("number of users is " + users.length);
		for (var i = 0; i < users.length; i++){
			console.log('checking user ' + users[i].username);
			if (users[i].username == username){
				console.log("found appropriate user");
				//display this user's exhibit
				res.json(users[i].exhibits[exhibitID-1]);
				break;
				
			}
		}

		//console.log("from displayExhibit: "+users[0]);
	}


	// if (exhibitID == "random") {
	// 	exhibitID = Math.floor(Math.random() * profiles.users[0].exhibits.length) + 1;
	// } else {
	// 	exhibitID = parseInt(exhibitID);
	// }

	// //console.log("from displayExhibit: "+users[0]);
 //  	var exhibitToShow = profiles.users[0].exhibits[exhibitID-1]; // of by one, our first project has index 0
 //  	res.json(exhibitToShow);
}