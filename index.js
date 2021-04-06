mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtaGhzIiwiYSI6ImNrbWtqaXYxbTExcTcyd3E0MXZ1OGo5OGUifQ.8ETamLmQFeh7xm93DrwEKA';
var i = 0;
var units = 'metric';
var locations = [
    {
        place: 'Cape Canaveral ', 
        lat: 28.474009,
        lon: -80.577171
    },
     {
        place: 'Kennedy Space Center', 
        lat: 28.608389,
        lon: -80.604333
    },
     {
        place: 'Vandenberg Space ', 
        lat: 34.633,
        lon: -120.613
    },
     {
        place: 'Ronald Reagan Ballistic Missile ', 
        lat:  8.716667,
        lon: 167.733333
    },
    {
        place: 'Spaceport America', 
        lat:  32.990278,
        lon: -106.969722
    },
];

var globalMap = getAPIdata();
getWeatherData(i);
printAll();

function getAPIdata() {
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [locations[i].lon,locations[i].lat],
    zoom: 11
    });
    return map;
}



function getWeatherData(LocationWeather){
    i = LocationWeather;
    console.log(locations[i].place);
    var request = 'https://api.openweathermap.org/data/2.5/weather?lat='+locations[i].lat+'&lon='+locations[i].lon+'&appid=f07d064e82b0836d1d53f2e47c812e50&units='+units;
    fetch(request)  
   
    .then(function(response) {
        return response.json();
    })
    
    .then(function(response) {
        var degC = Math.floor(response.main.temp);
        var icon = response.weather[0].icon;
        var windSpeed = response.wind.speed;
        var weatherBox = document.getElementById('weather');
        var weatherDescr = document.getElementById('description');
        var weatherIcon = document.getElementById('icon');
        var weateherWindSpeed = document.getElementById('windspeed');
        var launchCondition = document.getElementById('launchCondition');
        if(windspeed > 15.2){
        weateherWindSpeed.style.color = "red";
        }else{
          weateherWindSpeed.style.color = "Green";  
        }

        weateherWindSpeed.innerHTML = "Windspeed: "+windSpeed+" m/s";
        weatherIcon.src = "http://openweathermap.org/img/w/"+icon+".png";
        weatherDescr.innerHTML = response.weather[0].description;
        weatherBox.innerHTML = degC + '&#176;C <br>';

        console.log(response);
    });
}

function printAll(){
    for(var i = 0; i<locations.length;i++){
        generateMarker(i);
        generateRow(i);
    }
}

function goToLocation(clicked_value){
    var clicked_value = clicked_value;
    if(clicked_value < locations.length){
        flyToLocation(clicked_value);
        getWeatherData(clicked_value);
    } 
}

function flyToLocation(location){
    location = location;
    globalMap.flyTo({
    center: [locations[location].lon,locations[location].lat],
    zoom:11,
    essential: true
    });
}

// function addLocation(){
//     newPlace = document.getElementById('place').value;
//     newLat = document.getElementById('lat').value;
//     newLon = document.getElementById('lon').value;

//     if(newPlace !== "" && newLon !== "" && newLat !== "" ){
//         x = locations.length;
//         locations[x] = {
//             place: newPlace,
//             lat: newLat,
//             lon: newLon
//         };
//         generateNewBtn(x);
//         generateMarker(x);
//         generateRow(x);
//         flyToLocation(x);
//     }
// }

function generateRow(rowNumber){
    var rowNumber = rowNumber;
    var table = document.getElementById('locationTable');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var buttonTd = document.createElement('td');
    var button = generateNewBtn(rowNumber);

    buttonTd.appendChild(button);

    td.appendChild(document.createTextNode(locations[rowNumber].place));
    tr.appendChild(td);
    tr.appendChild(buttonTd);
    table.appendChild(tr);
}

function generateNewBtn(n){
    var button = document.createElement('button');
    var buttonText = document.createTextNode("Go to location");

    button.className = 'locationTest';
    button.value=n;
    button.appendChild(buttonText);
    button.addEventListener('click', function () {
        goToLocation(this.value);
    });
    return button;
}

function generateMarker(x){
    x = x;
    var tempTemp = getWeatherData(x);
    var marker = new mapboxgl.Marker()
    .setLngLat([locations[x].lon, locations[x].lat])
    .setPopup(new mapboxgl.Popup().setText("location "+locations[x].place)) //+" lat "+locations[x].lat + " lon " + locations[x].lon
    .addTo(globalMap);
}