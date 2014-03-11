var models = require('../models');

exports.displayPage = function(req, res){
	res.render('createProfile');
}

exports.addProfile = function(req, res){
  var form_data = req.body;
  console.log("here comes the user we're going to create: ");
  console.log(form_data);


  var newUser = new models.User(form_data);

  newUser.save(afterSaving);

  function afterSaving(err){
      if (err) {console.log(err); res.send(500);}
      res.send();
  }

  //log in the newly created user
  console.log("logging in " + form_data.username);
  req.session.username = form_data.username;
  res.redirect('home'); //go to homepage.
}