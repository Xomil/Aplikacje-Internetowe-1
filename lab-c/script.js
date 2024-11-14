function Locate(){
    if(!navigator.geolocation){
        alert("Geolocation is not supported by this browser.");
        
    }
    navigator.geolocation.getCurrentPosition(showPosition);
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var latlon = lat + "," + lon;
    
    
    
}