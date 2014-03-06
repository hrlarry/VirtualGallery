//var data = require("../categories.json");
var models = require('../models');
var fs = require('fs');
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
        toPass.newVersion = 'false';
        res.render('editExhibit', toPass);
    }
}

exports.displayPageNew = function(req, res) {
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

        //check if image has changed before carrying out updating of image
        console.log("bytesWritten = " + form_image.ws.bytesWritten);
        if (form_image.ws.bytesWritten == 0) {
            console.log("no new image");
        } else {    //parsing file name of image
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