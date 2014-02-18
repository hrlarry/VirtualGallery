var profiles = require('../fakeDatabase.json');

exports.exhibitInfo = function(req, res) { 
	var exhibitID = req.params.id;
	if (exhibitID == "random") {
		exhibitID = Math.floor(Math.random() * profiles.users[0].exhibits.length) + 1;
	} else {
		exhibitID = parseInt(exhibitID);
	}

	//console.log("from displayExhibit: "+users[0]);
  	var exhibitToShow = profiles.users[0].exhibits[exhibitID-1]; // of by one, our first project has index 0
  	res.json(exhibitToShow);
}