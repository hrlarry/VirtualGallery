//var profiles = require('../fakeDatabase.json');

var models = require('../models');

exports.exhibitInfo = function(req, res) { 
	var exhibitID = req.params.id;
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
		.exec(showExhibit);

	function showExhibit(err, users) {
		if (exhibitID == "random") {
			exhibitID = Math.floor(Math.random() * users[0].exhibits.length) + 1;
		} else {
			exhibitID = parseInt(exhibitID);
		}

		//console.log("from displayExhibit: "+users[0]);
  		var exhibitToShow = users[0].exhibits[exhibitID-1]; // of by one, our first project has index 0
  		res.json(exhibitToShow);
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