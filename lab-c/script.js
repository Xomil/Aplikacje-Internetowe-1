function Locate(){
    if(!navigator.geolocation){
        alert("Geolocation is not supported by this browser.");
        
    }
    navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude
        document.getElementById("lat").innerText = lat;
        document.getElementById("lon").innerText = lon;
        map.setView([lat, lon], 25);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    }, (positionError) => {
        console.error(positionError);
    });
    
    
    
}

var map = L.map("map").setView([53.44717632281161, 14.4919321], 25);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);