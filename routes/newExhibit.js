//var data = require("../categories.json");
var models = require('../models');
var fs = require('fs');
var imgData = require("../imageUpload.json");

exports.displayPage = function(req, res) {
    models.Categories
        .find()
        .exec(populateKeywords);

    function populateKeywords(err, categories){
        if(err) {console.log(err); res.send(500);}
       
        res.render('newExhibit', {'data': categories, 'newVersion': false});
    }
}

exports.displayPageNew = function(req, res){ //this is the one for the new test case
  models.Categories
    .find()
    .exec(populateKeywords);

  function populateKeywords(err, categories){
    if(err) {console.log(err); res.send(500);}
    res.render('newExhibit', imgData);
  }
}

exports.getLabels = function(req, res) {
  var category = req.params.category;
  console.log("Category: "+category);
  // query for the specific project and
  // call the following callback

  models.Categories
    .find({"Category":category})
    .exec(afterQuery);


  function afterQuery(err, projects) {
    if(err) console.log(err);
    console.log(projects);
    res.json(projects[0]['Labels']);
  }
}

exports.addExhibit = function(req, res) {
  var form_text = req.body;
  var username = req.session.username;

  console.log("current user: " + username);
  console.log("adding exhibit; form_text is: ");
  console.log(form_text);
  //var form_image = req.files.newImage;

  //get the user to update
  models.User
    .find({"username": username})
    .exec(addExhibitForUser);

  function addExhibitForUser(err, users) {
    console.log("adding exhibit for " + username);
    var userToUpdate = users[0];
    console.log(userToUpdate);

    //var newExhibit = new models.Exhibit(form_data);
    var newExhibit = new models.Exhibit({
      "id": users[0].exhibits.length + 1,
      "description": form_text.newDescription
      //"keywords": new models.Keyword(form_data.keywords)
    });

    if (form_text.newImage) {
      newExhibit.imageURL = form_text.newImage;
    }

    newExhibit.save(afterSaving);

    //console.log("here comes the exhibit we're going to create for " + username + ": ");
    //console.log(newExhibit);
    //console.log(users[0].exhibits.length + " vs. " + users[0]['exhibits'].length);
    console.log("exhibit is:");
    console.log(newExhibit);

    userToUpdate.exhibits.push(newExhibit);

    userToUpdate.save(afterSaving);

    function afterSaving(err){
      if (err) {console.log("error in addExhibit afterSaving: " + err); res.send(500);}
      res.send();
    }
  }
  res.redirect("/viewGallery");
}