'use strict'
var response;

var infowindow;
var contentString;

var markers
var markersArray = [];
var cityCircle;
var cityCircle2;
var map;
var i;

var ajaxRequest = {
    type: 'POST',
    async: false,
    datatype: 'json',
    url: '/Perf-master1234/model/api-orase-temperatura.php',
    success: function(data)
    {
        response = data;
    }
};

$.ajax(ajaxRequest);

var obj = JSON.parse(response);
console.log(obj);
//	Initializes the map with a marker

function initMap() {

    var Oklahoma = {lat: 35.543976,lng: -97.533046};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: Oklahoma
	});

	// This event listener calls addMarker() when the map is clicked.

    for (var city in obj)
	{
        var center = {
         lat: parseFloat(obj[city].lat),
          lng: parseFloat(obj[city].log)
        };
          addMarker(center,obj[city].name,obj[city].tip,obj[city].pret);
     colorare(center,200);
    }

// addMarker()
}

// Adds a marker to the map and push to the array.
function addMarker(location,nume,tip,pret) {
    var index = markersArray.length;
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});
	markersArray.push(marker);
	marker.addListener('click', function() {
		clickMarkerEvent(index,nume,tip,pret);
	});
}



//listeners
function clickMarkerEvent(index,nume,tip,pret) {

	if (markersArray[index].getAnimation() !== null) {
		markersArray[index].setAnimation(null);
	}
	else {
		markersArray[index].setAnimation(google.maps.Animation.BOUNCE);
	}
	
	contentString = '<div id="content">' +
	'<div id="siteNotice">' +
	'</div>' +
	'<h1 id="firstHeading" class="firstHeading">Marker Info</h1>' +
	'<div id="bodyContent">' +
	'<b>Location:</b> <p>' + markersArray[index].getPosition() + '</p>' +
    '<b>Title:</b><p>' + nume +'</p>'+
	'<b>Tip:</b><p>' + tip +'</p>'+
	'<b>Pret:</b><p>' + pret +'$</p>'+
	'</div>';
	
	if(infowindow !== null && typeof infowindow !== 'undefined')
		infowindow.close();
	
	infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 200
	});
	infowindow.open(map, markersArray[index]);
}
function colorare(location,size)
{
    var cityCircle = new google.maps.Circle({
strokeColor: '#FF0000',
strokeOpacity: 0.8,
strokeWeight: 2,
fillColor: '#FF0000',
fillOpacity: 0.35,
map: map,
center: location,
radius: Math.sqrt(size) * 2500
});
var cityCircle2 = new google.maps.Circle({
    strokeColor: '#0000e6',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#0000e6',
    fillOpacity: 0.35,
    map: map,
    center: location,
    radius: Math.sqrt(size) * 3500
    });
}