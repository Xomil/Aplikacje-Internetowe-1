

document.getElementById("check").addEventListener("click", function() {
    let city = document.getElementById("city").value;


    request(city);


    fApi(city);

})

function fApi(city){
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=7ded80d91f2b280ec979100cc8bbba94`;
    let weather5 = document.getElementById("weather5Days");
    weather5.innerHTML = "";

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("fetchAPI");
        console.log(data)

        let key = data.list
        for (let i = 0; i < key.length; i+=8) {
            let newDiv = document.createElement("div");
            newDiv.id = "weatherEachDay";
            newDiv.innerHTML = "<h2>" + `${key[i].dt_txt.split(" ")[0]}` + "</h2>";
            let imgurl = `https://openweathermap.org/img/wn/${key[i].weather[0].icon}@2x.png`;
            newDiv.innerHTML +=
                `<img src="${imgurl}" alt="Weather icon">` + // Użycie zmiennej imgurl
                `<p style='text-transform: capitalize'>${key[i].weather[0].description}</p>` +
                `<p>Perceived temp: ${key[i].main.feels_like}℃</p>` +
                `<p>Temperature: ${key[i].main.temp}℃</p>` +
                `<p>Min temperature: ${key[i].main.temp_min}℃</p>` +
                `<p>Max temperature: ${key[i].main.temp_max}℃</p>`;
            weather5.appendChild(newDiv);
        }
    })
}

function request(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7ded80d91f2b280ec979100cc8bbba94`

    let req = new XMLHttpRequest();
    req.open("GET", url, true);

    req.addEventListener("load", function(event) {

        let weather = JSON.parse(req.responseText);
        console.log("XMLHttpRequest");
        console.log(weather);

        let type = `${weather.weather[0].main}`
        let imgurl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        var data = "<h2>Today\'s weather</h2>" +
            `<img src="${imgurl}" alt="Weather icon">` +
            "<p style='text-transform: capitalize' >" + weather.weather[0].description + "</p>" +
            "<p>Perceived temp: " + weather.main.feels_like + "℃</p>" +
            "<p>Temperature: " + weather.main.temp + "℃</p>" +
            "<p>Min temperature: " + weather.main.temp_min + "℃</p>" +
            "<p>Max temperature: " + weather.main.temp_max + "℃</p>";

        background(type)

        document.getElementById("weatherToday").innerHTML = data;

    });
    req.send(null);
}

function background(weather){
    let imagePath = ""
    if(weather == "Clear"){
        imagePath = "background/clear.gif";
    }else if(weather == "Clouds" || weather == "Atmosphere" || weather == "Mist" || weather == "Fog"){
        imagePath = "background/cloudy.gif";
    }else{
        imagePath = "background/rain.gif";
    }
    document.body.style.backgroundImage = "url('" + imagePath + "')";
}




