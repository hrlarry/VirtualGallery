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
	var enteredValues = req.body;
	console.log("the entered values are: " + req.body);

	models.User
		.find() //this will eventually find the current user
		.exec(updateValues);

	function updateValues(err, users){
		var userToUpdate = users[0];
		console.log("before update: " + userToUpdate);
		if (enteredValues.email != "") userToUpdate.email = enteredValues.email;
		if (enteredValues.phone != "") userToUpdate.phone = enteredValues.phone;

		
		userToUpdate.save(afterSaving);

  		function afterSaving(err){
      		if (err) {console.log(err); res.send(500);}
      		console.log("after update: " + userToUpdate);
      		res.send();
  		}
	}

}