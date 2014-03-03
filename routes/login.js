//login
var models = require("../models");

exports.displayPage = function(req, res){
	res.render('login');
}

exports.executeLogin = function(req, res){
	//verify the login here
	var enteredUsername = req.params.username;  //NEED TO CHECK THAT THIS IS ACTUALLY A USERNAME FROM THE DATABASE
	console.log("enteredUsername = " + enteredUsername);

	models.User
		.find()
		.exec(tryToLogin);

	function tryToLogin(err, users){
		for (var i = 0; i < users.length; i++) {
			console.log("checking " + users[i].username);
			if(users[i].username == enteredUsername){
				//execute the login
				console.log("logging in " + enteredUsername);
				req.session.username = enteredUsername;
				console.log(req.session.username);
				res.redirect('home');
				return;
			}
		}
		//if we get here, it was an invalid username
		console.log("invalid username: " + enteredUsername);
		res.render('/');
	}
}

exports.executeLogout = function(req, res){
	//clear the login cookie
	console.log("logging out now");
	req.session = null;
	res.send();

	res.redirect('/');
}