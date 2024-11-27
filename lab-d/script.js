let req = new XMLHttpRequest();
req.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=Szczecin&units=metric&appid=7ded80d91f2b280ec979100cc8bbba94", true);

req.addEventListener("load", function(event) {
    let weather = JSON.parse(req.responseText);
    var data = "<p>Weather: " + weather.weather[0].main + "</p>" +
        "<p>Perceived temp: " + weather.main.feels_like + "℃</p>" +
        "<p>Temperature: " + weather.main.temp + "℃</p>" +
        "<p>Min temperature: " + weather.main.temp_min + "℃</p>" +
        "<p>Max temperature: " + weather.main.temp_max + "℃</p>";
    console.log(data);

    document.getElementById("weather").innerHTML = data;

});
req.send(null);

