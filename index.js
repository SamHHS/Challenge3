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



function getAPIdata() {
    // Set api token
    // Initialate map

    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [locations[i].lat,locations[i].lon],
    zoom: 9
    });

    document.getElementById('fly').addEventListener('click', function () {
        nextLaunchPad(map);
    });

    
    fetch(request)
    
    .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
    })
    
    .then(function(response) {
        onAPISucces(response);  
    })
    
    .catch(function (error) {
        onAPIError(error);
    });
}


function onAPISucces(response) {

    // var catFactBox = document.getElementById('catFact');
}

function onAPIError(error) {
    console.error('Request failed', error);
    var map = document.getElementById('map');
    map.className = 'hidden'; 
}

function nextLaunchPad(test){
    map = test;
    if(i >= locations.length-1){
        i=0;
    }else{
        i++;
    }
       map.flyTo({
        center: [locations[i].lat, locations[i].lon],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
}

getAPIdata();





