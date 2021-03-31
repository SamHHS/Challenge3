mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtaGhzIiwiYSI6ImNrbWtqaXYxbTExcTcyd3E0MXZ1OGo5OGUifQ.8ETamLmQFeh7xm93DrwEKA';
var i = 0;
var locations = [
    {
        lat: 50,
        lon: 50
    },
     {
        lat: 50,
        lon: 60
    },
     {
        lat: 50,
        lon: 70
    },

];
var globalMap = getAPIdata();
printMarkers();
printAllBtn();


function getAPIdata() {
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [locations[i].lat,locations[i].lon],
    zoom: 9
    });
    return map;
}

function nextLaunchPad(){
    var test = (i>=locations.length) ? i=0 : i++;
    flyToLocation(i);
}

function addLocation(){
    x = locations.length;
    newLat = document.getElementById('lat').value;
    newLon = document.getElementById('lon').value;

    locations[x] = {
        lat: newLat,
        lon: newLon
    };
    printNewBtn(x);
    generateMarker(x);
}

function goToLocation(clicked_value){
    clicked_value = clicked_value;
    console.log(clicked_value);
    if(clicked_value < locations.length){
        flyToLocation(clicked_value);
    } 
}

function flyToLocation(location){
    location = location;
    globalMap.flyTo({
    center: [locations[location].lat, locations[location].lon],
    essential: true
    });
}

function printAllBtn() {
    for (var i = 0; i < locations.length; i++) {
       printNewBtn(i);
    }
    document.getElementById('fly').addEventListener('click', function () {
        nextLaunchPad();
    });
}

function printNewBtn(n){
    n = n;
    var myDiv = document.getElementById('allBtn');
    var btn = document.createElement("button");
    var t = document.createTextNode("loacation"+(n+1));
    btn.appendChild(t);
    btn.className = 'locationTest';
    btn.value=n;
    btn.addEventListener('click', function () {
        goToLocation(this.value);
    });
    myDiv.appendChild(btn);
}

function generateMarker(x){
    x = x;
    var marker = new mapboxgl.Marker()
    .setLngLat([locations[x].lat, locations[x].lon])
    .setPopup(new mapboxgl.Popup().setText(locations[x]))
    .addTo(globalMap);
}

function printMarkers(){
    for(var i = 0; i<locations.length;i++){
        generateMarker(i);
    }
}