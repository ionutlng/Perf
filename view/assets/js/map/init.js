'use strict'
var response;
var response2;
var infowindow;
var contentString;


var markers
var markersArray = [];

var cityCircle;
var circles = [];

var minvalue = 0;
var maxvalue;

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
$('#button1').click(function(){ clickbutton1();})
$('#button2').click(function(){ clickbutton2();})
$('#button3').click(function(){ clickbutton3();})
$('#button4').click(function(){ clickbutton4();})
$('#button5').click(function(){ clickbutton5();})


$('#buttonmin1').click(function(){ minvalue=1000;console.log(minvalue);})
$('#buttonmin2').click(function(){ minvalue=50000;})
$('#buttonmin3').click(function(){ minvalue=100000;})


$('#buttonmax1').click(function(){ maxvalue=10000;console.log(maxvalue);filtermap(minvalue,maxvalue);})
$('#buttonmax2').click(function(){ maxvalue=100000;filtermap(minvalue,maxvalue);})
$('#buttonmax3').click(function(){ maxvalue=850000;filtermap(minvalue,maxvalue);})

console.log(minvalue);

console.log(maxvalue);

    for (var ap in obj2)
	{
        var center = {
         lat: parseFloat(obj2[ap].lat),
          lng: parseFloat(obj2[ap].lng)
        };
        var content = obj2[ap].address+obj2[ap].pret+obj2[ap].tip;
          addMarker(center,obj2[ap].address,obj2[ap].pret,obj2[ap].tip);

}
if(minvalue!=null && maxvalue!=null)
    filtermap(minvalue,maxvalue);

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
function removeAllcircles() {
  for(var i in circles) {
    circles[i].setMap(null);
  }
  circles = [];
}
function layer1(location,size)
{
    var cityCircle = new google.maps.Circle({
strokeColor: '#FFF',
strokeOpacity: 0.1,
strokeWeight: 1,
fillColor: '#FF0000',
fillOpacity:  (Math.floor(Math.random() * (70 - size + 1) ) + size)/350,
map: map,
center: location,
radius: (Math.floor(Math.random() * (100 - size + 1) ) + size) * 250
});
circles.push(cityCircle);
}
function layer2(location,size)
{
	var cityCircle2 = new google.maps.Circle({
    strokeColor: '#FFF',
    strokeOpacity: 0.1,
    strokeWeight: 1,
    fillColor: '#1a1aff',
    fillOpacity: (Math.floor(Math.random() * (100 - size + 1) ) + size)/350,
    map: map,
    center: location,
    radius: (Math.floor(Math.random() * (100 - size + 1) ) + size) * 250
});
circles.push(cityCircle2);
}
function layer3(location,size)
{
var cityCircle3 = new google.maps.Circle({
    strokeColor: '#FFF',
    strokeOpacity: 0.1,
    strokeWeight: 1,
    fillColor: '#009933',
    fillOpacity: (Math.floor(Math.random() * (100 - size + 1) ) + size)/350,
    map: map,
    center: location,
    radius: (Math.floor(Math.random() * (100 - size + 1) ) + size) * 250
});
circles.push(cityCircle3);
}
function layer4(location,size)
{
var cityCircle4 = new google.maps.Circle({
    strokeColor: '#FFF',
    strokeOpacity: 0.1,
    strokeWeight: 1,
    fillColor: '#ffa64d',
    fillOpacity: (Math.floor(Math.random() * (100 - size + 1) ) + size)/350,
    map: map,
    center: location,
    radius: (Math.floor(Math.random() * (100 - size + 1) ) + size) * 250
});
circles.push(cityCircle4);
}
function clickbutton1()
{
    removeAllcircles()
for (var city in obj)
	{
        var center = {
         lat: parseFloat(obj[city].lat),
          lng: parseFloat(obj[city].log)
        };
     layer1(center,10);

}
}
function clickbutton2()
{
    removeAllcircles()
for (var city in obj)
	{
        var center = {
         lat: parseFloat(obj[city].lat),
          lng: parseFloat(obj[city].log)
        };
     layer2(center,20);

}
}
function clickbutton3()
{
    removeAllcircles()
for (var city in obj)
	{
        var center = {
         lat: parseFloat(obj[city].lat),
          lng: parseFloat(obj[city].log)
        };
     layer3(center,30);

}
}
function clickbutton4()
{
    removeAllcircles()
for (var city in obj)
	{
        var center = {
         lat: parseFloat(obj[city].lat),
          lng: parseFloat(obj[city].log)
        };
     layer4(center,40);

}
}
function clickbutton5()
{
    removeAllcircles()
}
function removeAllMarkers() {
  for(var i in markersArray) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}
function filtermap(min,max)
{removeAllMarkers();
 for (var ap in obj2)
	{
        if(obj2[ap].pret>=min && obj2[ap].pret<=max)
        {
        var center = {
         lat: parseFloat(obj2[ap].lat),
          lng: parseFloat(obj2[ap].lng)
        };
        var content = obj2[ap].address+obj2[ap].pret+obj2[ap].tip;
          addMarker(center,obj2[ap].address,obj2[ap].pret,obj2[ap].tip);
        }

}
}
