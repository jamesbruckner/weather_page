var WeatherAPIKey = "5e862054b41dab9c4995797f82a4b8ca";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + WeatherAPIKey;


fetch(queryURL)


function getInfo() {
    const newName = document.getElementById('cityInput')
    const cityName = document.getElementById('cityName')
    // cityName.innerText = "--" + newName.value + "--"
     let previousSearch = JSON.parse(localStorage.getItem("weathersearch")) || []
     previousSearch.push(newName.value)
     localStorage.setItem("weathersearch",JSON.stringify(previousSearch))
     displayPreviousSearch()
    getCurrentInfo(newName.value)
    getFiveDayInfo(newName.value)
}

function getFiveDayInfo(city){
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=5e862054b41dab9c4995797f82a4b8ca&units=imperial")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (let i = 1; i < 6; i++) {
                let max = "day" + i + "max"
                let min = "day" + i + 'min'
                console.log(document.getElementById(max))
                document.getElementById(min).innerText = "Low of:" + Number(data.list[i].main.temp_min) + '°';
            
                document.getElementById(max).innerText = "High of:" + Number(data.list[i].main.temp_max) + '°';
          
                document.getElementById('img' + i).setAttribute("src", " https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + '.png');
            }
        })

        .catch(err =>{
            console.log(err)
            })
}

displayPreviousSearch()
function displayPreviousSearch() {
    let previousSearch = JSON.parse(localStorage.getItem("weathersearch")) || []
    let buttonsHTML = ""
    for(let i=0;i<previousSearch.length;i++){
        buttonsHTML += `<button class="search">${previousSearch[i]}</button>`
    }
    document.getElementById('weather').innerHTML= buttonsHTML
    var preSearch = document.querySelectorAll(".search")
    preSearch.forEach(element => element.addEventListener("click",getPreviousSearch))
}

function defaultScreen() {
    document.getElementById('cityInput').defaultValue = "Denver";
    getInfo();
}

function getPreviousSearch(event){
  var city = event.target.innerText
  getCurrentInfo(city)
  getFiveDayInfo(city)
}

function checkDay(day) {
    const date = new Date();
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (day + date.getDay() > 6) {
        return day + date.getDay() - 7;
    }
    else {
        return day + date.getday();
    }
    for (i = 0; i < 5; i++) {
        document.getElementById('day' + (i + 1)).innerHTML = weekday[checkDay(i)];
    }
}


function getCurrentInfo(city) {
   


    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5e862054b41dab9c4995797f82a4b8ca")
        .then(response => response.json())
        .then(data => {
            console.log(data)
          
                document.getElementById("currentForecast").innerHTML = `
                <h3>${city}</h3>
                <p>Min temp:${data.main.temp_min} °
                <img src ="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" /></p>
                <p>Max temp:${data.main.temp_max} °</p>
                <p>Humidity:${data.main.humidity} %</p>
                <p>Wind Speed:${data.wind.speed} mph</p>

          `
        })

        .catch(err =>{
            console.log(err)
            })
}