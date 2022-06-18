
let moon = document.querySelector('.moon')
let sun = document.querySelector('.sun')
let sunset = document.querySelector('.sunset')
let navInfo = document.querySelector('.more-info')
let containerCity = document.querySelector('.container-city')

let hora = new Date().getHours();

let bgStyles = {
    morning: {
        gradient: 'linear-gradient(-150deg, #58b7cb 20%, #e7e5c6 80%)',
        filter: 'saturate(190%)'
    },
    afternoon: {
        gradient: 'linear-gradient(180deg, #a37c97 14%, #e29bab 100%)', 
        filter: 'saturate(1000%)'
    }, 
    night: {
        gradient: 'linear-gradient(180deg, rgba(27,8,51,1) 14%, rgba(50,48,101,1) 100%)',
        filter: 'saturate(60%)'
    }
}


function getBg(time){

    if (time >= 7 && time <= 12) {
        document.body.style.background = bgStyles.morning.gradient
        mountain.style.filter = bgStyles.morning.filter
        sun.style.display = "block"
   
    } else if (time >= 13 && time <= 19){
        document.body.style.background = bgStyles.afternoon.gradient
        mountain.style.filter = bgStyles.afternoon.filter
        sunset.style.display = "block"
    } else { 
        document.body.style.background = bgStyles.night.gradient
        mountain.style.filter = bgStyles.night.filter
        moon.style.display = "block"
    }

}
window.addEventListener('load', () => { 

    let lon; 
    let lat; 

    let cityName = document.getElementById('city')
    let cityTemp = document.getElementById('temp')
    let status = document.getElementById('status')
    let cityFeels = document.getElementById('feels-like')
    let cityHumidity = document.getElementById('humidity')
    let cityWind = document.getElementById('wind')
    let cityClouds = document.getElementById('clouds')

    getBg(hora)

    // obtenemos localización del dispositivo
    if (navigator.geolocation){ 

        navigator.geolocation.getCurrentPosition(pos => { 

            lon = pos.coords.longitude
            lat = pos.coords.latitude
   
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e85e42780da6fd4bf8e9a7f979909bc6&lang=es`
            // console.log(url)

            fetch(url) 
                .then( response => {return response.json()} )
                .then( data => {
                    temp = Math.round(data.main.temp - 273.15)
                    sensacion = Math.round(data.main.feels_like - 273.15)
                    rafaga = Math.round(data.wind.gust * 1.609)

                    cityTemp.textContent =  `${temp}°` // de K a Celsius
                    cityName.textContent = data.name
                    status.textContent = data.weather[0].description
                    cityFeels.textContent = `${sensacion}°`
                    cityHumidity.textContent = `${data.main.humidity}%`
                    cityWind.textContent = `${rafaga} km/h`
                    cityClouds.textContent = `${data.clouds.all}%`

                    moon.style.marginTop = "0px"
                    sun.style.marginTop = "0px"
                    sunset.style.marginTop = "0px"
                    navInfo.style.bottom = "30px"
                    containerCity.style.marginTop = "0px"
                })
                .catch( error => { 
                    console.log(error)
                })
        });

    }

}); 