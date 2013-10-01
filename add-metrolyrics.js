$(function() {
	$('#searchform').submit(function() {
		var searchterms = $("#searchterms").val();
		// call our search twitter function
		getResultsFromMetroLyrics(searchterms);
		return false;
	});
});

function getResultsFromMetroLyrics (searchterms) {
	// call ML api using jquery ajax
	// build a url to make the request
	//$('#results').append("<li>" + item + "</li>");
	$('#results').load('http://www.metrolyrics.com/savior-lyrics-rise-against.html #lyrics-body');
	
	/*var key = "Xwf/srg8ZfKTxclkdeGJIy4rdLBLo8/jh6OeB7bqvO8=";
	var url = "http://api.bing.net/json.aspx?AppId=" + key + "&Version=2.2&Query=" + searchterms + "&Sources=web+spell&Web.Count=1&JsonType=raw&JsonCallback=UserCallback";
	console.log(url);
	// use jquery ajax shortcut function
	$.getJSON(url, function(jsondata){
		console.log("printing...");
		updateResultsList(jsondata);
		console.log("printed!");
	});*/
}

function addItemToList (item) {
	// adds a single item to result list
	$('#results').append("<li>" + item + "</li>");
}

function updateResultsList (jsondata) {
	for (var i=0; i < jsondata.items.length; i++) {
		addItemToList(jsondata.items[i].url);
	};
}

function printJSON (jsondata) {
	// prints the JSON data as a large string
	normal = JSON.stringify(jsondata);
	$("#resultsbox").html("<pre>"+normal+"</pre>")
}

function prettyprintJSON (jsondata) {
	// prints a human readable form of JSON
	pretty = JSON.stringify(jsondata, null, 4);
	$("#resultsbox").html("<pre>"+pretty+"</pre>")
}
