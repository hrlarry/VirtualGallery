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
    //check if image has changed before carrying out updating of image
    /*console.log("bytesWritten = " + form_image.ws.bytesWritten);
    if (form_image.ws.bytesWritten == 0) {
      console.log("no new image");
    } else {    //parsing file name of image
      newExhibit.imageURL = "http://lorempixel.com/640/480/cats/";

      // currently doesn't work because images are only temporarily stored :(
      var imageName = form_image.name;
      var imagePath = form_image.path;
      var n = imagePath.lastIndexOf("/");
      var fileName = imagePath.substring(n + 1);
      var image_url = "/uploads/" + fileName;

      newExhibit.imageURL = image_url;
      console.log("newExhibit's imageURL = " + newExhibit.imageURL);

      fs.readFile(imagePath, function (err, data) {
          console.log("image name = " + imageName);
          if (!imageName) {
              console.log("error: image name invalid in editExhibit.js");
              res.redirect('/');
              res.end();
          } else {
              newPath = __dirname + "/uploads/" + imageName;
              console.log(newPath);
              fs.writeFile(newPath, data, function(err) {
                  //res.redirect("/uploads/" + imageName);
                  console.log("image successfully uploaded");
              });
          }
      });
    }*/


    //newExhibit.id = users[0].exhibits.length + 1;
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

/*
 * Function that is called when the document is ready.
 */
/*function initializePage() {

	$('#btn-add').click(function(){
        $('#select-from option:selected').each( function() {
        	$('#chosenTags').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
        	var chosenTagsList = document.getElementsByName("chosenTags")[0];
        	var toMove = $(this);
        	var foundDuplicate = false;
			console.log(toMove.text());
        	for(var i=0; i < chosenTagsList.length; i++){
        		console.log("test4");
        		if(chosenTagsList.options[i].text == toMove.text()){
        			console.log("test2");
        			foundDuplicate = true;
        			break;
        		}
        	}
        	if(foundDuplicate == false){
        		console.log("test3");
            	$('#select-to').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
            }
            //$(this).remove();
        });
    });
    $('#btn-remove').click(function(){
        $('#select-to option:selected').each( function() {
            //$('#select-from').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
            $(this).remove();
        });
    });

    $('#submitExhibit').click(submitExhibit)
}

function submitExhibit(e){
	e.preventDefault();
	console.log("Submit Exhibit");

	var chosenTagsList = document.getElementsByName("chosenTags")[0];
	console.log(chosenTagsList.options);
}*/