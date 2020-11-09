var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var button= document.querySelector('.submit');
var uv=document.querySelector('.uv');
var uvI=document.querySelector('.uvI');

button.addEventListener('click', function(){
var city = input.value;
currentWeather(city);
input.value ="";
})

function currentWeather(city){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=ebcc3fd8dd47c4d2aaf75afc3bb3381b&units=imperial')
.then(response => response.json())
.then(data => {
    console.log(data)
    uvIndex(data.coord.lat,data.coord.lon)
    forecast(city)
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];
  var windValue = data['wind']['speed'];
  var humidityValue = data['main']['humidity'];

    main.innerHTML = nameValue;
    desc.innerHTML = "Conditions - "+descValue;
    temp.innerHTML = "Temperature - "+tempValue;
     wind.innerHTML = "Wind Speed - "+windValue;
    humidity.innerHTML = "Humidity - " +humidityValue;
})
}

function uvIndex(lat,lon){
    fetch('https://api.openweathermap.org/data/2.5/uvi?lat='+lat+'&lon='+lon+'&appid=ebcc3fd8dd47c4d2aaf75afc3bb3381b&units=imperial')
.then(response => response.json())
.then(data => {
    console.log(data)
    uv.innerHTML ="UV Index - "+data.value;
    if (data.value<3){
        uv.setAttribute("class","green")
    }
    uvI.textContent=data.value;
})
}

// function uvIndex(lat,lon){
//     fetch('https://api.openweathermap.org/data/2.5/uvi?lat='+lat+'&lon='+lon+'&appid=ebcc3fd8dd47c4d2aaf75afc3bb3381b&units=imperial')
// .then(response => response.json())
// .then(data => {
//     console.log(data)
//     uv.innerHTML ="UV Index - "+data.value;
//     if (data.value>3){
//         uv.setAttribute("class","green")
//     }
//     uvI.textContent=data.value;
// })
// }

function forecast(city){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+ city +'&appid=ebcc3fd8dd47c4d2aaf75afc3bb3381b&units=imperial')
.then(response => response.json())
.then(data => {
    console.log(data)
    const dailyData = data.list.filter(reading => {   
        return reading.dt_txt.includes("18:00:00")
        }
      )
      console.log(dailyData)
})
}

