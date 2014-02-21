var models = require('../models');

exports.displayPage = function(req, res){
	res.render('createProfile');
}

exports.addProfile = function(req, res){
  var form_data = req.body;
  console.log("here comes the user we're going to create: ");
  console.log(form_data);

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();

  var newUser = new models.User(form_data);

  newUser.save(afterSaving);

  function afterSaving(err){
      if (err) {console.log(err); res.send(500);}
      res.send();
  }
}