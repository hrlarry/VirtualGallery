//var profiles = require('../fakeDatabase.json');
var models = require('../models');

exports.displayPage = function(req, res){

		models.User
		.find()
		.exec(renderProjects);

	function renderProjects(err, users) {
		res.render('visitGallery', users[0].exhibits[0]);
	}
  //res.render('visitGallery', profiles.users[0].exhibits[0]);
}