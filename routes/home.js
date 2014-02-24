exports.displayPage = function(req, res){
	var username = req.session.username;
	console.log("in home.js, username is " + username);
	res.render('home', {"username": username});
}