'use strict'
var response;
var response2;
var infowindow;
var contentString;

var markers
var markersArray = [];
var cityCircle;
var cityCircle2;
var map;
var i;
var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
var ajaxRequest = {
    type: 'GET',
    async: false,
    datatype: 'json',
    url: '/Perf-master/model/api-orase.php',
    success: function(data)
    {
        response = data;
    }
};

$.ajax(ajaxRequest);

var obj = JSON.parse(response);

var ajaxRequest = {
    type: 'GET',
    async: false,
    datatype: 'json',
    url: '/Perf-master/model/api-apartamente.php',
    success: function(data)
    {
        response2 = data;
    }
};

$.ajax(ajaxRequest);

var obj2 = JSON.parse(response2);

//	Initializes the map with a marker

function initMap() {

    var California = {lat: 37,lng: -120};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: California
	});
        
search();

for (var city in obj)
	{
        var center = {
         lat: parseFloat(obj[city].lat),
          lng: parseFloat(obj[city].log)
        };
     layer1(center,20);
     layer2(center,30);
     layer3(center,40);
     layer4(center,50);
}
    for (var ap in obj2)
	{
        var center = {
         lat: parseFloat(obj2[ap].lat),
          lng: parseFloat(obj2[ap].lng)
        };
        var content = obj2[ap].address+obj2[ap].pret+obj2[ap].tip;
    console.log(obj2[ap].address);
          addMarker(center,obj2[ap].address,obj2[ap].pret,obj2[ap].tip);

}

}
function search(){
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
}

// Adds a marker to the map and push to the array.
function addMarker(location,info1,info2,info3) {
    var index = markersArray.length;
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});
	markersArray.push(marker);
	marker.addListener('click', function() {
		clickMarkerEvent(index,info1,info2,info3);
	});
}



//listeners
function clickMarkerEvent(index,info1,info2,info3) {

	if (markersArray[index].getAnimation() !== null) {
		markersArray[index].setAnimation(null);
	}
	else {
		markersArray[index].setAnimation(google.maps.Animation.BOUNCE);
	}
	
	contentString = '<div id="content">' +
	'<div id="siteNotice">' +
	'</div>' +
	'<h1 id="firstHeading" class="firstHeading">Apartaments Info</h1>' +
	'<div id="bodyContent">' +
	'<b>Location:</b> <p>' + markersArray[index].getPosition() + '</p>' + 
    '<b>Title:</b><p>' + info3+'</p>'+
    '<b>Adresa:</b><p>' + info1+'</p>'+
    '<b>Pret:</b><p>' +info2+'</p>'+
	'</div>';
	
	if(infowindow !== null && typeof infowindow !== 'undefined')
		infowindow.close();
	
	infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 200
	});
	infowindow.open(map, markersArray[index]);
}
function layer1(location,size)
{
    var cityCircle = new google.maps.Circle({
strokeColor: '#FFF',
strokeOpacity: 0.1,
strokeWeight: 1,
fillColor: '#FF0000',
fillOpacity: 0.1,
map: map,
center: location,
radius: Math.sqrt(20) * 2500
});
}
function layer2(location,size)
{
var cityCircle2 = new google.maps.Circle({
    strokeColor: '#0000e6',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: '#0000e6',
    fillOpacity: 0.1,
    map: map,
    center: location,
    radius: Math.sqrt(size) * 3500
    });
}
function layer3(location,size)
{
var cityCircle2 = new google.maps.Circle({
    strokeColor: '#0000e6',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: '#FFF',
    fillOpacity: 0.1,
    map: map,
    center: location,
    radius: Math.sqrt(size) * 1200
    });
}
function layer4(location,size)
{
var cityCircle2 = new google.maps.Circle({
    strokeColor: '#0000e6',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: '#006400',
    fillOpacity: 0.1,
    map: map,
    center: location,
    radius: Math.sqrt(size) * 1000
    });
}