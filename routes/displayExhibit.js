//var profiles = require('../fakeDatabase.json');

var models = require('../models');

exports.exhibitInfo = function(req, res) {
	var exhibitID = req.params.id;
	var username = req.params.username;
	console.log(exhibitID);

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
				var exhibitToShow = users[i].exhibits[exhibitID-1].toObject();
				
				if(users[i].exhibits.length == exhibitID){
					//exhibitToShow.set('last', 'true');
					exhibitToShow['last'] = "true";
					console.log(exhibitToShow);
				} else {
					//exhibitToShow.set('last', 'false');
					exhibitToShow['last'] = "false";
				}
				console.log(exhibitToShow);
				//res.json(users[i].exhibits[exhibitID-1]);
				res.json(exhibitToShow);
				break;
				
			}
		}
	}
}