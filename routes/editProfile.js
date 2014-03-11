var models = require('../models');

exports.displayPage = function(req, res){
	var username = req.session.username;
	models.User
		.find({"username": username})
		.exec(afterQuery);

	function afterQuery(err, users){ //render page using information from current user
		if (err) console.log(err);
		var firstUser = users[0];
		res.render('editProfile', firstUser);
	}
}

exports.updateProfileInfo = function(req, res){
	var form_data = req.body;
	var username = req.session.username;
	console.log(form_data);
	//res.redirect("/home");
	models.User
		.find({"username": username}) //this will eventually find the current user
		.exec(updateValues);

	function updateValues(err, users){
		var userToUpdate = users[0];
		console.log("before update: " + userToUpdate);
		if (form_data.newEmail) userToUpdate.email = form_data.newEmail;
		if (form_data.newPhone) userToUpdate.phone = form_data.newPhone;

		console.log(userToUpdate);
		userToUpdate.save(afterSaving);

  		function afterSaving(err){
      		if (err) {console.log(err); res.send(500);}
      		console.log("after update: " + userToUpdate);
      		res.redirect("/home");
  		}
	}
}