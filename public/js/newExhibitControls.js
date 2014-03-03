//var data = require("../categories.json");
//var models = require('../models');
/*
exports.displayPage = function(req, res){
    initializePage();
    res.render('newExhibit');
}
*/

$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    //$('.selectpicker').selectpicker();

    //$('#category1').prop('selectedIndex', -1)
    $(".categorySelector").on("change", populateCategories);

	$('#btn-add').click(function(){
        $('#select-from option:selected').each( function() {
        	$('#chosenTags').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
        	var chosenTagsList = document.getElementsByName("chosenTags")[0];
        	var toMove = $(this);
        	var foundDuplicate = false;
			//console.log($(this).parent().attr('label'));
        	for(var i=0; i < chosenTagsList.length; i++){
        		//console.log("test4: "+ chosenTagsList.options[i].text);
        		if(chosenTagsList.options[i].text == toMove.text()){
        			//console.log("test2");
        			foundDuplicate = true;
        			break;
        		}
        	}

        	if(foundDuplicate == false){
        		//console.log("test3");
                //console.log($('#select-to')
                    //.find("optgroup"));

                if($('#select-to optgroup[label='+$(this).parent().attr("label")+']').html() == null){
                    $('#select-to').append('<optgroup label='+$(this).parent().attr("label")+'></optgroup>');
                    $('#select-to optgroup[label='+$(this).parent().attr("label")+']').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
                } else {
                    $('#select-to optgroup[label='+$(this).parent().attr("label")+']').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
                }

            }
            else {
                console.log("You've already added this tag!");
            }
            //$(this).remove();
        });
    });
    $('#btn-remove').click(function(){
        $('#select-to option:selected').each( function() {
            //$('#select-from').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
            var parent = $(this).parent();
            $(this).remove();
            //var otherOptions = 
            //console.log($('#select-to optgroup[label='+parent.attr("label")+'] option').html());
            if($('#select-to optgroup[label='+parent.attr("label")+'] option').html() == null)
            {
                parent.remove();
            }
        });
    });

    $('#addCategories').click(addMoreCategories);

    $('#submitExhibit').click(submitExhibit);

    $('#makeProfileBtn').click(makeNewProfile);

    $('#editProfileSaveBtn').click(editProfileInfo);

    $('#loginBtn').click(userLogin);

    $('#logoutBtn').click(userLogout);
}

function addMoreCategories(e){
    e.preventDefault();

    var nextSeriesNum = $('#keywordsDiv').find('.categorySelector').length + 1;
    //console.log($('#keywordsDiv').html());

    $('#keywordsDiv').append(
        '</br>'+
        '<select class="categorySelector" id="category'+nextSeriesNum+'" dir="ltr">'+
        '<option selected style="display:none;">Pick a category</option>'+
    /*
    
    for(var categories = 0; categories < numCategories; categories++){
        $('#keywordsDiv').append(
            '<option>'+$('#category1').options[0].text+'</option>'
            );
    }*/
    
        '</select>'+
        '<select multiple style="width:200px" id="labels'+nextSeriesNum+'">'+
        '</select>'
        );
    /*
    var numCategories = $('#category1').options.length;
    for(var count=0; count < numCategories; count++){
        $('#category'+nextSeriesNum).append(
            '<option>test'+count+'</option>'
            );
    }*/

    $("#category1 option").each(function(){
        console.log($(this).text());
        if($(this).text()!="Pick a category"){
            $("#category"+nextSeriesNum).append(
                '<option>'+$(this).text()+'</option>'
                );
        }

    });

    $(".categorySelector").on("change", populateCategories);
}

function populateCategories(){
    console.log($(this).find(":selected").text());

    var currID = $(this).attr('id');

    var url_call = '/categories/' + $(this).find(":selected").text();

        function populateLabels(allLabels){
            console.log(currID.substr("category".length));
            for(var count = 0; count < allLabels.length; count ++){
                $("#labels"+currID.substr("category".length)).append('<option value ='+count+'>'+allLabels[count]+'</option>');
            }

        }

    $.get(url_call, populateLabels);
}

function submitExhibit(e){
	e.preventDefault();
	console.log("Submit Exhibit");

    //make the new exhibit 
    
    var id = 1; //will be changed in newExhibit.add
    var image_url = "http://upload.wikimedia.org/wikipedia/commons/6/63/French_horn_front.png" //placeholder for now
    var description = $('#exhibitDescription').val();
    var keywords = []; //DON'T KNOW HOW TO ACCESS THE KEYWORDS
    var exhibitJson = {
        'id': id,
        'imageURL': image_url,
        'description':  description,
        'keywords': keywords
    };
    $.post('/newExhibit/add', exhibitJson, function() {
        window.location.href = '/viewGallery'; // go to the viewGallery page
    });
    /*
	var chosenTagsList = document.getElementsByName("chosenTags")[0];
	console.log(chosenTagsList.options);*/
}

//THIS ACTUALLY GOES WITH CREATEPROFILE, NOT NEWEXHIBIT.
function makeNewProfile(e){
    e.preventDefault();
    //get the stuff to send to createProfile.addProfile
    console.log("making a new profile");

        var username = $('#makeProfileForm #username').val();
        var email = $('#makeProfileForm #email').val();
        var phone = $('#makeProfileForm #phone').val();
        var exhibits = [];
        var priorities = [];

        var userJson = {
            'username': username,
            'email': email,
            'phone': phone,
            'exhibits': exhibits,
            'priorities': priorities
        };
        $.post('/createProfile/addProfile', userJson, function() {
            window.location.href = '/home'; // go to the viewGallery page
        });
}

//SIMILARLY, THIS GOES WITH EDITPROFILE, NOT NEWEXHIBIT.  JUST CONSOLIDATING THE NUMBER OF JS FILES
function editProfileInfo(e){
    e.preventDefault();
    //get the stuff to send to createProfile.addProfile
    console.log("updating profile");

        var email = $('#newEmail').val();
        var phone = $('#newPhone').val();

        var userJson = {
            'email': email,
            'phone': phone
        };
        $.post('/editProfile/updateProfileInfo', userJson, function() {
            window.location.href = '/home'; // go to the homepage
        });
}

//THIS IS FOR THE LOGIN PAGE
function userLogin(e){
    e.preventDefault();

    console.log("logging in");
    var enteredUsername = $('#usernameField').val();
    $.post('/login/executeLogin/' + enteredUsername, function() {
        //need to determine if login was successful or not
        console.log(window.location.href);
        window.location.href = '/home'; //go to homepage after logging in
    });
}

//THIS IS FROM THE HOMEPAGE - LOGGING OUT A USER
function userLogout(e){
    e.preventDefault();

    console.log("logging out");
    $.post('/login/executeLogout', function() {
        window.location.href = '/'; //go back to index after logging out
    });
}
/*
exports.displayPage = function(req, res) {    
	// Your code goes here
	//var name = req.query.name;
	var description = req.query.description;
	var newFriend = {
		"name": name,
		"description": description,
		"imageURL": "http://lorempixel.com/400/400/people"			
	};
	
	data["friends"].push(newFriend);

	console.log(newFriend);

	res.render('add', newFriend);
 }*/