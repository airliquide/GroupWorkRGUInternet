/*$(function()
 {
	$('#searchform').submit(function() {
		var searchterms = $("#searchBarField").val();
		// call our search twitter function
		getResultsFromYouTube(searchterms);
		return false;
	});
	
	
});*/

function getResultsFromYouTube (searchterms) {
	// call you tube api using jquery ajax
	// build a url to make the request
	var url = "https://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&q="+searchterms+"&category=music&max-results=10&callback=?";
	// use jquery ajax shortcut function
	$.getJSON(url, function(jsondata){
		// handle the results
		updateList(jsondata,'#resultBody');
	});
}

function prettyprintJSON (jsondata) {
	// prints a human readable form of JSON
	pretty = JSON.stringify(jsondata, null, 4);
	$("#resultsbox").html("<pre>"+pretty+"</pre>")
}

function addItemToList (item,thumbnail,id,DOMPlace) {
	// adds a single item to result list
	//add html item pref here
	if(DOMPlace=='#resultBody'){
	$('#resultBody').fadeIn();
	$('#pageBody').fadeOut();
	}
	// clean string title for later manipulation
	var videoTitleClean = item.split('\'').join(' ');
	videoTitleClean = videoTitleClean.split('"').join(' ');
	$(DOMPlace).append("<a href=# onClick=\"itemClick('"+id+"','"+videoTitleClean+"'); return false;\" > <div class=\"item\"> <img class=\"video-image\" src=\""+thumbnail + "\" alt=\"Youtube tubnails\" > <div class=\"video-title\">  " + videoTitleClean + "</div> </div> </a><br/>");
}

function itemClick(videoID,videoTitle){
	$('#pageBody').fadeIn();
	$('embed').each(function(){
                $(this).attr('src',"http://www.youtube.com/v/"+videoID);
            });
	loadRelatedVideo(videoTitle);
	loadSimilarVideo(videoID);
	$('#resultBody').fadeOut();
	getResultsFromLyrics(videoTitle);
}

function loadRelatedVideo(videoTitle){
	var videoTitleClean = videoTitle.replace('\'', ' ');
	videoTitleClean = videoTitleClean.replace('"',' ');
	
	var url = "https://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&q="+videoTitleClean+"&category=music&max-results=3&callback=?";
	// use jquery ajax shortcut function
	$.getJSON(url, function(jsondata){
		// handle the results
		updateList(jsondata,'#alternativeResults');
	});
	
	}

function loadSimilarVideo(videoID){
	
	var url = "http://gdata.youtube.com/feeds/api/videos/"+videoID+"/related?v=2&alt=jsonc&max-results=3&callback=?"
	$.getJSON(url, function(jsondata){
		// handle the results
		updateList(jsondata,'#recommendedResults');
	});
	
	
	}

function updateList (jsondata,DOMPlace) {
	// iterate over twitter data and update results list
	// remember, jsondata is an object
	// we can use '.property' or ["property"] to access various properties
	// we want the list of results 
	// jsondata = {..., results: [r1, r2, ..., rn], ...};
	// results = jsondata.results -- returns a list of results
	// result1 = jsondata.results[0] -- returns the 1st result of that list
	// text = jsondata.results[0].text -- returns the text of the 1st result
	$(DOMPlace).empty();
	for (var i=0; i < jsondata.data.items.length; i++) {
		//add datas here 
		addItemToList(jsondata.data.items[i].title,jsondata.data.items[i].thumbnail.sqDefault,jsondata.data.items[i].id,DOMPlace);	
	};
}