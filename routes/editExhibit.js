//var data = require("../categories.json");
var models = require('../models');
//var fs = require('fs');
var imgData = require("../imageUpload.json");
var editID;

exports.displayPage = function(req, res) {    
    //var name = req.query.name;
    /*var description = req.query.description;
    var newFriend = {
        "name": name,
        "description": description,
        "imageURL": "http://lorempixel.com/400/400/people"          
    };
    
    data["friends"].push(newFriend);

    console.log(newFriend);*/
    //initializePage();
    editID = req.params.id;
    var username = req.session.username;
    console.log("Edit ID: " + editID);
    models.User
        .find({"username": username})
        .exec(populateEditPage);

    function populateEditPage(err, users){
        if(err) {console.log(err); res.send(500);}
        console.log(users[0].exhibits[editID-1]);
        var toPass = users[0].exhibits[editID-1];
        //toPass.newVersion = 'false';
        //console.log(toPass.newVersion);
        toPass.images = imgData.images;
        //console.log(imgData.images);
        //console.log(toPass);
        res.render('editExhibit', toPass);
    }

/*exports.displayPageNew = function(req, res) {
=======
    
 }

exports.displayPageNew = function(req, res) {    
>>>>>>> 132db9a8675bb3ccc150640100817b138bac8c19
    editID = req.params.id;
    var username = req.session.username;
    console.log("Edit ID: " + editID);
    models.User
        .find({"username": username})
        .exec(populateEditPage);

    function populateEditPage(err, users){
        if(err) {console.log(err); res.send(500);}
        console.log(users[0].exhibits[editID-1]);
        var toPass = users[0].exhibits[editID-1];
        toPass.newVersion = 'true';

        console.log(imgData.images);
        console.log(toPass);
        res.render('editExhibit', {toPassIn: toPass, imgData2: imgData});
    }
<<<<<<< HEAD
}*/


    
 }

exports.editExhibit = function(req, res) {
  var form_data = req.body;
  var username = req.session.username;
  

    //update user exhibit
    models.User
        .find({ "username": username })
        .exec(updateExhibitForUser)

    function updateExhibitForUser(err, users) {
        var userToUpdate = users[0];
        console.log("Old exhibit =====================");
        console.log(userToUpdate['exhibits'][editID - 1]);

        if (form_text.newImage) {
            userToUpdate['exhibits'][editID - 1]['imageURL'] = form_text.newImage;
        }

        //check if image has changed before carrying out updating of image
        /*console.log("bytesWritten = " + form_image.ws.bytesWritten);
        if (form_image.ws.bytesWritten == 0) {
            console.log("no new image");
        } else {    //parsing file name of image
            userToUpdate['exhibits'][editID - 1]['imageURL'] = "http://lorempixel.com/640/480/cats/";
            // currently doesn't work because images are stored only termporarily :(
            var imageName = form_image.name;
            var imagePath = form_image.path;
            var n = imagePath.lastIndexOf("/");
            var fileName = imagePath.substring(n + 1);
            var image_url = "/uploads/" + fileName;

            userToUpdate['exhibits'][editID - 1]['imageURL'] = image_url;

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

        userToUpdate['exhibits'][editID - 1]['description'] = form_text.newDescription;
        //userToUpdate['exhibits'][editID - 1]['keywords'] = form_text.newKeywords;

        console.log("updated exhibit: " + userToUpdate['exhibits'][editID-1]);
        
        userToUpdate.save(afterSaving);

        function afterSaving(err){
          if (err) {console.log(err); res.send(500);}
          res.send();
        }
/*
  var replacingExhibit = new models.Exhibit(form_data);
  replacingExhibit.id = editID;
  //replacingExhibit.save(afterSaving);
    console.log("here comes the exhibit we're editing for " + username + ": ");
    console.log("ID: " + replacingExhibit.id);
    console.log(replacingExhibit);

  //get the user to update
  models.User
      .find({"username": username})*/
      /*.update({
        "imageURL": replacingExhibit.imageURL,
        "description": replacingExhibit.description,
        "keywords": replacingExhibit.schema
      })*/
      //.exec(updateExhibitForUser);
/*
  function updateExhibitForUser(err, users){
    var userToUpdate = users[0];
*/
/*
    var newExhibit = new models.Exhibit(form_data);
    //newExhibit.id = users[0].exhibits.length + 1;
    newExhibit.id = req.params.id;
    newExhibit.save(afterSaving);*/
/*   
    console.log("exhibits: " + userToUpdate['exhibits']);
    console.log("exhibit to update: " + userToUpdate['exhibits'][editID]);


    //subtract one from indices because our id's are 1-indexed and the array of exhibits is 0-indexed    
    //userToUpdate['exhibits'][editID-1]['imageURL'] = replacingExhibit['imageURL'];  //THIS SEEMS TO BE DELETING IMAGES
    userToUpdate['exhibits'][editID-1]['description'] = replacingExhibit['description'];
    userToUpdate['exhibits'][editID-1]['keywords'] = replacingExhibit['keywords'];
    
    userToUpdate.save(afterSaving);

    //console.log("Current user: " + userToUpdate);

    //userToUpdate.exhibits.push(newExhibit);

    userToUpdate.save(afterSaving);

    function afterSaving(err){
      if (err) {console.log(err); res.send(500);}
      res.send();

    }*/
  }
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
