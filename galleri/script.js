
/* Script for the image gallery page */ 
/*========================================================================== *
*	TODO list                                                                * 
*                                                                            *
*   [x] add functionality for adding more categories                         *
*	[x] Fix the front page (remove it                                        *
*	[x] Put category under image in remove page                              *
*	[x] Fix 'safe' password                                                  * 
*	[x] Fix remove                                                           * 
*	[x] Fix bug upload same image twice                                      *
*	[x] make images able to pop out                                          * 
*	[x] cache images into memory when page is loaded                         *
*	[x] Add functionality for updating text fields                           * 
*	[x] Fix bug with description not corresponding to correct image          * 
*   [x] meta keyword tags                                                    *
*   [x] fix last changepix properly                                          *
*	[x] Add error checking for file and user input                           * 
*	[x] Display error messages indead of Location("header...                 *
*   [x] Fix screenheight                                                     *	
*   [ ] test add and remove for different types of images                    *
*   [ ] check on ipad, iphone                                                *
*   [ ] Check on different monitors                                          *
* 	[ ] check for all browsers                                               * 
*          [ ] Internet Explorer                                             *
*          [ ] Google chrome                                                 *
*          [ ] Safari                                                        *
*   [x] fix so it's possible to upload to right category                     *
*   [x] make the categories always sorted under remove picture               *
/*===========================================================================*/ 

/* To inform about. 
 * It is possible to tchange Pictures and text. */

// global variables
var index = 0;
var imageCount = 0;
var exhibition;

var image_json, category_json;

var nameIDs = {};

/*	Dynamic array holding the image captions */
var descList = [];

/*	The object that is to be loaded with server data*/
var imageData = {
	"exhibitions"   : [],
	"paths"         : [],
	"descs"         : [],
	"widths"        : [],
	"heights"       : []
};

var categoryData = {
		"names" : []
};
	
/*	Main script
 *
 *	Loads data from server and handles user interaction */ 

$(document).ready(function() {
            
	$.ajax({
		"type" : "get",
		"url" : "../data/imagedata.json",
		datatype: "json",
		async: false,
		"success" : function(data) {
			image_json = data;

			$.ajax({
				"type" : "get",
				"url" : "../data/categories.json",
				datatype: "json",
				async: false,
				"success" : function(data) {
					category_json = data;
					render();
					// Handle IO events
					$('.clickable').on('click', function(e) { 
						handleclick($(this), e)
					});
					$(document).on("keydown", function(e) { handleKeyPress(e) });
				},
				"error" : function() { 
					alert("Error: (c) Content could not be loaded "); 
				}
			});
		},
		"error" : function() { alert("Error: (i)Content could not be loaded"); }
	});
	return false;	
});

/*
 *	Render the content
 */

function render() {
	$("#exhlist").empty();
	loadCategoryData();
	addCategories();
	renderImages();
}

function renderImages() {
	index = 0;
	$("#crossfade").empty();
	descList = [];
	loadImageData();
	addImages();
	showImage();
}

/*	
 *	load the category Json data 
 */

function loadCategoryData() {
	categoryData = {
		"names" : []
	};
	for (var i = 0; i < category_json.length; i++) {
		categoryData["names"].push(category_json[i].name);
	}
}

//function addCategories() {
    //var len = categoryData["names"].length;
    //var categories = categoryData["names"].sort().reverse;
	//for (i = len - 1; i >= 0 ; i--) {
		//var categoryTag = '<li id="exh' 
			//+ i + '" class="clickable category">' 
			//+ categoryData["names"][i] + '</li>';
		//nameIDs["exh" + i] = categoryData["names"][i];
		//$("#exhlist").append(categoryTag);
	//}
	////default
	//$("#exh" + (len - 1)).addClass("focused");
	//exhibition = nameIDs["exh" + (len - 1)];

//}


//sorted version
function addCategories() {
    var len = categoryData["names"].length;
    var categories = categoryData["names"].sort().reverse();
    for (i = 0; i < categories.length; i++) {
        var categoryTag = '<li id="exh' 
            + i + '" class="clickable category">' 
            + categories[i] + '</li>';
        nameIDs["exh" + i] = categories[i];
        $("#exhlist").append(categoryTag);
    }
    //default
    $("#exh0").addClass("focused");
    exhibition = nameIDs["exh0"];
}

/*	
 *	load the image Json data 
 */

function loadImageData() {

	imageData = {
		"exhibitions"   : [],
		"paths"         : [],
		"descs"         : [],
		"widths"        : [],
		"heights"       : []
	};
	for (var i = 0; i < image_json.length; i++) {
		if (image_json[i].exh == exhibition) {
			imageData["exhibitions"].push(image_json[i].exh);
			imageData["paths"].push(image_json[i].src);
			imageData["descs"].push(image_json[i].desc);
			imageData["widths"].push(image_json[i].width);
			imageData["heights"].push(image_json[i].height);
		}
	}
}

/*
 *	Appends images
 */

function addImages() {
    
	imageCount  = 0;
	for (i = 0; i < imageData["paths"].length; i++) {
		var imagetag = '<img data-lightbox="image1" src="' + 
						imageData["paths"][i] + '" />';
		var imageLink = '<a href="' + imageData["paths"][i] + 
						'" data-lightbox="image1">' + imagetag + '</a>';
		imageCount++;
		$("#crossfade").append(imageLink);
		descList.push(imageData["descs"][i]);
	}
	$("#crossfade a:first-child").addClass("opaque");
    var img = $("#crossfade");
    img.find($("img")).each(function(i) {
        var imagewidth = imageData["widths"][i];
        var scaleRatio = 600 / imagewidth;
        var scaledHeight = imageData["heights"][i] * scaleRatio;
        var diff = $(window).height() - scaledHeight;
        //console.log(diff);
        //console.log(scaledHeight);
        //console.log("document " + $(document).height());
        //console.log("window: " + $(window).height());
        $(this).css("width","600px");
        if (diff < 0) {
            var wScaleRatio = (scaledHeight + (diff - 50)) / scaledHeight;
            var scaledWidth = 600 * wScaleRatio;
            $(this).css("width",  + scaledWidth + "px");
        }
        else {
            $(this).css("width", "600px");
        }
    });
}

/*
 *	Display an image
 */

function showImage() {
	$("#crossfade a").removeClass("opaque");
	$("#crossfade a").css('z-index', 0);
	var newImage = $("#crossfade a:nth-child(" + (index + 1) + ")");
	newImage.css('z-index', 1);
	newImage.addClass("opaque");
	updateImageInfo();
}

/* 
 * 	Update content to match the current image
 */

function updateImageInfo() {
	var imagewidth = imageData["widths"][index];
	var scaleRatio = 600 / imagewidth;
	var scaledHeight = imageData["heights"][index] * scaleRatio;
    var diff = $(window).height() - scaledHeight;

	$("#description").empty();
	$("#description").append(descList[index]);
	if (scaledHeight > 700) {
		$("#container").css("height", 1500);
	}
	else {
		$("#container").css("height", 1225);
	}
    if (diff < 0) {
        console.log("yes");
        var wScaleRatio = (scaledHeight + (diff - 50)) / scaledHeight;
        $("#description").css("top", scaledHeight + (diff));
    }
    else {
        $("#description").css("top", scaledHeight + 50);
    }
	$("#whichimage").empty();
	if (imageCount > 0) {
		$("#whichimage").append("Bild " + (index + 1) + " av " + imageCount);
	} 
	else {
		$("#whichimage").append("Inga bilder");
	}
}


/*
 *    Handles the event when an element is clicked 
 */

function handleclick(caller, e) {
	if (imageCount > 0) {
		if (caller.hasClass('octicon-chevron-left')) {
			index--;
			if (index < 0) {
				index = imageCount - 1;
			}
			showImage();
		}
		else if (caller.hasClass('octicon-chevron-right')) {
			index++;
			if (index == imageCount) {
				index = 0;
			}
			showImage();
		}
	}
	if (caller.hasClass("category")) {
		$("#exhlist li").each(function() {
			$(this).removeClass("focused");
		});
		$("#" + caller.attr("id")).addClass("focused");
		exhibition = nameIDs[caller.attr("id")];
		renderImages();
	}
	else {
		//something else
	}
}

/*
 *    Handles the event when a key is pressed
 */

function handleKeyPress(e) {
	if (e.which == 37) {
		index--;
		if (index < 0) {
			index = imageCount - 1;
		}
		showImage();
	}
	else if (e.which == 39) {
		index++;
		if (index == imageCount) {
			index = 0;
		}
		showImage();
	}
}

