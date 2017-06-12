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
    url: '/Perf-master/model/api-orase-temperatura.php',
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

    var Oklahoma = {lat: 34.054376,lng: -118.2430};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 6,
		center: Oklahoma
	});

	//SEARCH BAR

	 var card = document.getElementById('pac-card');
        var input = document.getElementById('pac-input');
        var types = document.getElementById('type-selector');
        var strictBounds = document.getElementById('strict-bounds-selector');

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

        var autocomplete = new google.maps.places.Autocomplete(input);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
          var radioButton = document.getElementById(id);
          radioButton.addEventListener('click', function() {
            autocomplete.setTypes(types);
          });
        }

        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-establishment', ['establishment']);
        setupClickListener('changetype-geocode', ['geocode']);

        document.getElementById('use-strict-bounds')
            .addEventListener('click', function() {
              console.log('Checkbox clicked! New state=' + this.checked);
              autocomplete.setOptions({strictBounds: this.checked});
            });


	// This event listener calls addMarker() when the map is clicked.

    for (var city in obj)
	{
        var center = {
         lat: parseFloat(obj[city].lat),
          lng: parseFloat(obj[city].log)
        };
          addMarker(center,obj[city].name);
     colorare(center,200);
    }

// addMarker()
}

// Adds a marker to the map and push to the array.
function addMarker(location,content) {
    var index = markersArray.length;
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});
	markersArray.push(marker);
	marker.addListener('click', function() {
		clickMarkerEvent(index,content);
	});
}



//listeners
function clickMarkerEvent(index,info) {

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
	'<b>Title: </b> <p>' + markersArray[index].getTitle() + '</p>' + 
    '<b>Title:</b><p>' + info+'</p>'+
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