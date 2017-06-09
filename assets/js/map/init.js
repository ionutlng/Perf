function initMap() 
    { 
    mapCenter = {lat: 40.730610, lng: -73.935242};
    LosAngeles = {lat: 33.969594,lng: -117.473914};
    Atlanta = {lat: 33.753273,lng: -84.392765};
    Miami = {lat: 25.850550,lng: -80.247038};
    Oklahoma = {lat: 35.543976,lng: -97.533046};
    var marker = new google.maps.Marker({
                position: mapCenter,
                map: map
            });
    var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: mapCenter
            });
                var marker = new google.maps.Marker({
                position: mapCenter,
                map: map
            });
    var marker2 = new google.maps.Marker({
                position: LosAngeles,
                map: map
            });
    var marker3 = new google.maps.Marker({
                position: Atlanta,
                map: map
            });
    var marker4 = new google.maps.Marker({
                position: Miami,
                map: map
            });
    var marker5 = new google.maps.Marker({
                position: Oklahoma,
                map: map
            });
    var infoContent = "<p><b>Inchiriere | 700 ron</b></p> <p>45 Railroad Ave, Long Island City, NY 11101</p>";
    var infoContent2 = "<p><b>Inchiriere | 1000 ron</b></p> <p>South Los Angeles, Los Angeles, California</p>";
    var infoContent3 = "<p><b>Vanzare | 200,000 ron</b></p> <p>207 Mitchell St SW, Atlanta, GA 30303</p>";
    var infoContent4 = "<p><b>Vanzare | 350,000 ron</b></p> <p>110 NW 67th St, Miami, FL 33150</p>";
    var infoContent5 = "<p><b>Inchiriere | 500 ron</b></p> <p>1411 NW 6th St, Oklahoma City, OK 73106</p>";
    var infoWindow = new google.maps.InfoWindow();
    marker.addListener('click', function () {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
        content: infoContent
            });
    infoWindow.open(map, marker);  
        });
    
    marker2.addListener('click', function () {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
        content: infoContent2
            });
    infoWindow.open(map, marker2);
        });
    
    marker3.addListener('click', function () {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
        content: infoContent3
            });
    infoWindow.open(map, marker3);
        });
    
    marker4.addListener('click', function () {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
        content: infoContent4
            });
    infoWindow.open(map, marker4);
        });
    
    marker5.addListener('click', function () {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
        content: infoContent5
            });
    infoWindow.open(map, marker5);
        });  

var markers={
        NewYork : {
            center : {lat: 40.730610, lng: -73.935242},
            size : 200,
            content :"<p><b>Inchiriere | 700 ron</b></p> <p>45 Railroad Ave, Long Island City, NY 11101</p>"
        },
        
        LosAngeles : {
            center : {lat: 33.969594,lng: -117.473914},
            size : 200,
            content:"<p><b>Inchiriere | 1000 ron</b></p> <p>South Los Angeles, Los Angeles, California</p>"
        },
        Atlanta : {
            center :{lat: 33.753273,lng: -84.392765},
            size : 300,
            content:"<p><b>Vanzare | 200,000 ron</b></p> <p>207 Mitchell St SW, Atlanta, GA 30303</p>"
        },
        iasi : {
            center : {lat: 47.158, lng: 27.60},
            size : 250,
            content:"<p>Not</p>"
        },
Miami : {
        center :{lat: 25.850550,lng: -80.247038},
        size : 400,
            content:"<p><b>Vanzare | 350,000 ron</b></p> <p>110 NW 67th St, Miami, FL 33150</p>"
        },
        Oklahoma : {
            center : {lat: 35.543976,lng: -97.533046},
            size : 1000,
            content:"<p><b>Inchiriere | 500 ron</b></p> <p>1411 NW 6th St, Oklahoma City, OK 73106</p>"
        }
    };
    for(city in markers)
{
var cityCircle = new google.maps.Circle({
strokeColor: '#FF0000',
strokeOpacity: 0.8,
strokeWeight: 2,
fillColor: '#FF0000',
fillOpacity: 0.35,
map: map,
center: markers[city].center,
radius: Math.sqrt(markers[city].size) * 2500
});
var cityCircle2 = new google.maps.Circle({
    strokeColor: '#0000e6',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#0000e6',
    fillOpacity: 0.35,
    map: map,
    center: markers[city].center,
    radius: Math.sqrt(markers[city].size) * 3500
    });
}
}