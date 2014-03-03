//var data = require("../categories.json");
var models = require('../models');

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
       
        res.render('newExhibit', {'data': categories, 'newVersion': true});
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
  var form_data = req.body;
  var username = req.session.username;

  console.log("current user: " + username);

  //get the user to update
  models.User
      .find({"username": username})
      .exec(addExhibitForUser);


  function addExhibitForUser(err, users){
    console.log(users);
    var userToUpdate = users[0];
    console.log(userToUpdate);

    var newExhibit = new models.Exhibit(form_data);
    newExhibit.id = users[0].exhibits.length + 1;
    newExhibit.save(afterSaving);

    //console.log("here comes the exhibit we're going to create for " + username + ": ");
    //console.log(newExhibit);
    //console.log(users[0].exhibits.length + " vs. " + users[0]['exhibits'].length);

    userToUpdate.exhibits.push(newExhibit);

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