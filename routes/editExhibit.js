//var data = require("../categories.json");
var models = require('../models');
var fs = require('fs');
var imgData = require("../imageUpload.json");
var editID;

exports.displayPage = function(req, res) { 
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
        toPass.images = imgData.images;
        //console.log(imgData.images);
        //console.log(toPass);
        res.render('editExhibit', toPass);
    }
}


//this updates the exhibit after user clicks "Save Changes"
exports.editExhibit = function(req, res) {
    var form_text = req.body;
    //console.log(form_data);
    var form_image = req.files.newImage;
    console.log(req.files);
    var username = req.session.username;
    //console.log("editID = " + editID);

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


        userToUpdate['exhibits'][editID - 1]['description'] = form_text.newDescription;
        //userToUpdate['exhibits'][editID - 1]['keywords'] = form_text.newKeywords;

        console.log("updated exhibit: " + userToUpdate['exhibits'][editID-1]);
        
        userToUpdate.save(afterSaving);

        function afterSaving(err){
          if (err) {console.log(err); res.send(500);}
          res.send();
        }
    }

    res.redirect("/viewGallery");
}