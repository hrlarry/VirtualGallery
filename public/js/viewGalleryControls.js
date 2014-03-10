$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
 
function initializePage() {
    $(".imgLiquidFill").imgLiquid({
        fill: false,
        horizontalAlign: "center",
        verticalAlign: "center"
    });

    $(".list-group-item").click(setActive);

    $(".editExhibitBtn").click(editExhibitFn);

    $(".deleteExhibitBtn").click(deleteExhibitFn);

}

function editExhibitFn(e) {
    e.preventDefault();
    console.log('edit btn clicked');
    
    //get the id of the project to remove 
    var buttonID = $(this).attr('id');
    var idNumber = buttonID.substr('editExhibit'.length);
    window.location.href = '/editExhibit/'+idNumber; // reload the page
}

function deleteExhibitFn(e) {
    e.preventDefault();
    console.log('delete btn clicked');
    //get the id of the project to remove 
   var buttonID = $(this).attr('id');
   var idNumber = buttonID.substr('deleteExhibit'.length);
    $.post('/viewGallery/' + idNumber + '/delete', function() {
        window.location.href = '/viewGallery'; // reload the page
    });
}

function setActive(e){
    e.preventDefault();
    
    //Deactivates previous selection
    var previouslyActive = $(this).parent().children(".active");
    previouslyActive.removeClass("active");

    /*
    if(previouslyActive != $(this)){
       $(".in").removeClass("in");
    }
    console.log(previouslyActive);
    console.log($(this));
*/

    //Activates new selection
    $(this).addClass("active");
    //$(this).append("<button>Test</button>")

}