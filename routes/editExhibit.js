//var data = require("../categories.json");
var models = require('../models');
var editID;

exports.displayPage = function(req, res) {    
    // Your code goes here
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
        res.render('editExhibit', users[0].exhibits[editID-1]);
    }

    
 }

exports.editExhibit = function(req, res) {
  var form_data = req.body;
  var username = req.session.username;
  

  var replacingExhibit = new models.Exhibit(form_data);
  replacingExhibit.id = editID;
  //replacingExhibit.save(afterSaving);
    console.log("here comes the exhibit we're editing for " + username + ": ");
    console.log("ID: " + replacingExhibit.id);
    console.log(replacingExhibit);

  //get the user to update
  models.User
      .find({"username": username})
      /*.update({
        "imageURL": replacingExhibit.imageURL,
        "description": replacingExhibit.description,
        "keywords": replacingExhibit.schema
      })*/
      .exec(updateExhibitForUser);

  function updateExhibitForUser(err, users){
    var userToUpdate = users[0];

/*
    var newExhibit = new models.Exhibit(form_data);
    //newExhibit.id = users[0].exhibits.length + 1;
    newExhibit.id = req.params.id;
    newExhibit.save(afterSaving);
    */
    
    userToUpdate['exhibits'][editID-1]['imageURL'] = replacingExhibit['imageURL'];
    userToUpdate['exhibits'][editID-1]['description'] = replacingExhibit['description'];
    userToUpdate['exhibits'][editID-1]['keywords'] = replacingExhibit['keywords'];
    
    userToUpdate.save(afterSaving);

    //console.log("Current user: " + userToUpdate);

    //userToUpdate.exhibits.push(newExhibit);

    userToUpdate.save(afterSaving);

    function afterSaving(err){
      if (err) {console.log(err); res.send(500);}
      res.send();
    }
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
