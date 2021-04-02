mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtaGhzIiwiYSI6ImNrbWtqaXYxbTExcTcyd3E0MXZ1OGo5OGUifQ.8ETamLmQFeh7xm93DrwEKA';
var i = 0;
var locations = [
    {
        place: 'SpaceX Launchpad', 
        lat: 50,
        lon: 50
    },
     {
        place: 'NASA Launchpad', 
        lat: 50,
        lon: 60
    },
     {
        place: 'Ruski Launchpad', 
        lat: 50,
        lon: 70
    },

];
var units = 'metric';
var globalMap = getAPIdata();
var globalWeather = getWeatherData(i);
printMarkers();
printAllBtn();


function getAPIdata() {
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [locations[i].lat,locations[i].lon],
    zoom: 11
    });
    return map;
}

function getWeatherData(LocationWeather){
    i = LocationWeather;
    console.log(locations[i].place);
    var request = 'https://api.openweathermap.org/data/2.5/weather?lat='+locations[i].lon+'&lon='+locations[i].lon+'&appid=f07d064e82b0836d1d53f2e47c812e50&units='+units;
    fetch(request)  
    
   
    .then(function(response) {
        return response.json();
    })
    
   
    .then(function(response) {
    

        var degC = Math.floor(response.main.temp);
        console.log(degC);
        var weatherBox = document.getElementById('weather');
        weatherBox.innerHTML = degC + '&#176;C <br>';

    });
}

function nextLaunchPad(){
    var test = (i>=locations.length) ? i=0 : i++;
    flyToLocation(i);
    getWeatherData(i);
}

function addLocation(){
    if(document.getElementById('place').value != "" || document.getElementById('place').value){
        x = locations.length;
        newPlace = document.getElementById('place').value;
        newLat = document.getElementById('lat').value;
        newLon = document.getElementById('lon').value;

        console.log('place'+newPlace);

        locations[x] = {
            place: newPlace,
            lat: newLat,
            lon: newLon
        };
        generateNewBtn(x);
        generateMarker(x);
    }
 
}

function goToLocation(clicked_value){
    clicked_value = clicked_value;
    console.log(clicked_value);
    if(clicked_value < locations.length){
        flyToLocation(clicked_value);
        getWeatherData(clicked_value);
    } 
}

function flyToLocation(location){
    location = location;
    globalMap.flyTo({
    center: [locations[location].lat, locations[location].lon],
    zoom:11,
    essential: true
    });
}

function generateNewBtn(n){
    var n = n;
    var myDiv = document.getElementById('allBtn');
    var tekst = locations[n].place;
    var btn = document.createElement("button");
    var span = document.createElement("span");
    var t = document.createTextNode("location "+(n+1));
    var linebreak = document.createElement("br");
    var test = document.createTextNode(locations[n].place+" ");
    
    btn.appendChild(t);
    btn.className = 'locationTest';
    btn.value=n;
    btn.addEventListener('click', function () {
        goToLocation(this.value);
    });

    span.appendChild(test);
    span.classList.add("testStyle");
   
    myDiv.appendChild(span);
    myDiv.appendChild(btn);
    myDiv.appendChild(linebreak);
}

function printAllBtn() {
    document.getElementById('fly').addEventListener('click', function () {
        nextLaunchPad();
    });
    for (var i = 0; i < locations.length; i++) {
       generateNewBtn(i);
    }
}

function generateMarker(x){
    x = x;
    var marker = new mapboxgl.Marker()
    .setLngLat([locations[x].lat, locations[x].lon])
    .setPopup(new mapboxgl.Popup().setText("location "+locations[x].place+" lat "+locations[x].lat + " lon " + locations[x].lon))
    .addTo(globalMap);
}

function printMarkers(){
    for(var i = 0; i<locations.length;i++){
        generateMarker(i);
    }
}