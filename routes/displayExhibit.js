var projects = require('../fakeDatabase.json');

exports.exhibitInfo = function(req, res) { 
	var projectID = req.params.id;
	if (projectID == "random") {
		projectID = Math.floor(Math.random() * users[0].exhibits.length) + 1;
	} else {
		projectID = parseInt(projectID);
	}

  	var project = projects[projectID-1]; // of by one, our first project has index 0
  	res.json(project);
}