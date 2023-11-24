// var WeatherAPIKey = "5e862054b41dab9c4995797f82a4b8ca";
// var city;
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + WeatherAPIKey;


// fetch(queryURL)


function getInfo() {
    const newName = document.getElementById('cityInput')
    const cityName = document.getElementById('cityName')
    cityName.innerHTML = "--" + newName.value + "--"


    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + newName.value + "&appid=5e862054b41dab9c4995797f82a4b8ca&units=imperial")
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
             alert('error',err)
            console.log(err)
            })
}

function defaultScreen() {
    document.getElementById('cityInput').defaultValue = "Denver";
    getInfo();
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


function getCurrentInfo() {
    const newName = document.getElementById('cityInput')
    const cityName = document.getElementById('cityName')
    cityName.innerHTML = "--" + newName.value + "--"


    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + newName.value + "&appid=5e862054b41dab9c4995797f82a4b8ca")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (let i = 1; i < 6; i++) {
                let max = "day" + i + "max"
                let min = "day" + i + 'min'
                console.log(document.getElementById(max))
                document.getElementById(min).innerText = "Low of:" + Number(data.list[i].main.temp_min - 264.52) + '°';
            // }
            // for (i = 0; i < 5; i++) {
                document.getElementById(max).innerText = "High of:" + Number(data.list[i].main.temp_max - 264.52) + '°';
            }
            // for (i = 0; i < 5; i++) {
            //     document.getElementById('img' + (i + 1)).src = " https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + '.png';
            // }
        })

        .catch(err =>{
             alert('error',err)
            console.log(err)
            })
}