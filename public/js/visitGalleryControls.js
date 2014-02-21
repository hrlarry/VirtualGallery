'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$(".imgLiquidFill").imgLiquid({
        fill: true,
        horizontalAlign: "center",
        verticalAlign: "center"
    });

    $('#nextBtn').click(changeExhibit);
    $('#prevBtn').click(changeExhibit);
    $('#exhibitDescription').click(descriptionClicked);
    drawExhibit();
    $(window).resize(drawExhibit);
}

function descriptionClicked() {
	$('#exhibitDescription').popover('toggle');
}

function drawExhibit() {
	var backgroundSplashImage = document.getElementById("backgroundSplash");
	var position = $("#backgroundSplash").offset();
	
	$("#exhibitImage").css({
		//top: position.top + 55,
		//left: position.left + backgroundSplashImage.clientWidth/4,
		maxWidth: backgroundSplashImage.clientWidth/2,
		maxHeight: backgroundSplashImage.clientHeight*3/5,
		//height: backgroundSplashImage.clientHeight/2,
	});

	var exhibitImage = document.getElementById("exhibitImage");

	$("#exhibitCanvas").css({
		top: position.top + 50,
		left: position.left + backgroundSplashImage.clientWidth/2 - exhibitImage.clientWidth/2 - 10,
		width: exhibitImage.clientWidth + 20,
		height: exhibitImage.clientHeight + 20,
		maxHeight: backgroundSplashImage.clientHeight*3/5 + 10,
		maxWidth: backgroundSplashImage.clientWidth/2 + 20
	});

	var canvasRegion = document.getElementById("exhibitCanvas");

	$("#exhibitDescription").css({
		top: position.top + 50 + canvasRegion.clientHeight - 100,
		left: position.left + backgroundSplashImage.clientWidth/2 - exhibitImage.clientWidth/2 + canvasRegion.clientWidth + 10
	});

	console.log(exhibitImage.clientHeight + 10);
	console.log(backgroundSplashImage.clientHeight*3/5);
	console.log(exhibitImage.clientHeight + 10);

}


/*
 * Make an AJAX call to retrieve project details and add it in
 */

function changeExhibit(e) {
	// Prevent following the link
	e.preventDefault();

	// determines if button clicked was 'prevBtn' or 'nextBtn'
	var btn = $(this).attr('id');

	// Get the div ID, e.g., "project3"
	var currExhibitID = $('.exhibit').attr('id');
	var currUsername = $('.usernameInfo').attr('id');
	// idNumber gets ID number of next project
	if (btn == "nextBtn") {
		var idNumber = parseInt(currExhibitID.substr('exhibit'.length)) + 1;
		$.get("/displayExhibit/" + currUsername + "/" + idNumber, changeToNext);
	} else {
		var idNumber = parseInt(currExhibitID.substr('exhibit'.length)) - 1;
		$.get("/displayExhibit/" + currUsername + "/" + idNumber, changeToPrev);
	}
}

function changeToPrev(result) {
	var prevID = result.id + 1;
	displayNewExhibit(prevID, result);
}

function changeToNext(result) {
	var prevID = result.id - 1;
	displayNewExhibit(prevID, result);
}

function displayNewExhibit(oldID, result) {
	$("#exhibit" + oldID).attr('id', "exhibit" + result.id);
	$("#exhibit" + result.id).html('<img src="'+result['imageURL']+'" id="exhibitImage" class="exhibitImage"></img>');
	$('#exhibitDescription').popover('hide');
	$("#exhibitDescription").attr('data-content', result['description']);
	
	window.setTimeout(drawExhibit,5);
	//console.log("URL: "+$("#exhibit"+result.id));
}