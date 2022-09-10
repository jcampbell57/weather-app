document.cookie = 'SameSite=Lax'

function toDirection(degree) {
    if (degree > 337.5) return 'North'
    if (degree > 292.5) return 'North West'
    if (degree > 247.5) return 'West'
    if (degree > 202.5) return 'South West'
    if (degree > 157.5) return 'South'
    if (degree > 122.5) return 'South East'
    if (degree > 67.5) return 'East'
    if (degree > 22.5) return 'North East'
    return 'North'
}

// https://stackoverflow.com/questions/62376115/how-to-obtain-open-weather-api-date-time-from-city-being-fetched
const calcCurrentTime = (timezone) => {
    const d = new Date()
    const localTime = d.getTime()
    const localOffset = d.getTimezoneOffset() * 60000
    const utc = localTime + localOffset
    const newCity = utc + 1000 * timezone
    return new Date(newCity)
}

const calcSunTime = (time, timezone) => {
    const d = new Date()
    const localOffset = d.getTimezoneOffset() * 60000
    const utc = time + localOffset
    const newCity = utc + 1000 * timezone
    return new Date(newCity)
}

// const fetchDailyForecast = (lat, lon) => {
//   const APIErrorContainer = document.querySelector('.APIErrorContainer');
//   console.log(lat);
//   console.log(lon);
//   // fetch seven day forecast
//   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e`, { mode: 'cors' })
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//       APIErrorContainer.innerText = 'City not found';
//     });
// };

const fetchHourlyForecast = (cityQuery) => {
    const APIErrorContainer = document.querySelector('.APIErrorContainer')
    // fetch five day/three hour forecast
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e`,
        { mode: 'cors' }
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            const newHourlyForecastArray = []
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < 40; i++) {
                // .src = `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}.png`
                const newHourlyForecast = {
                    date: new Date(response.list[i].dt_txt),
                    dateText: response.list[i].dt_txt,
                    humidity: response.list[i].main.humidity,
                    rainChance: response.list[i].pop * 100,
                    temperature: response.list[i].main.temp,
                    weatherCondition: response.list[i].weather[0].main,
                    weatherDescription: response.list[i].weather[0].description,
                    windDegree: response.list[i].wind.deg,
                    windDirection: toDirection(response.list[i].wind.deg),
                    windGust: response.list[i].wind.gust,
                    windSpeed: response.list[i].wind.speed,
                }
                newHourlyForecastArray.push(newHourlyForecast)
            }
            console.log(newHourlyForecastArray)
            return newHourlyForecastArray
        })
        .catch((err) => {
            console.log(err)
            APIErrorContainer.innerText = 'City not found'
        })
}

const fetchCurrentWeather = (cityQuery) => {
    const APIImage = document.querySelector('.APIImage')
    const APIErrorContainer = document.querySelector('.APIErrorContainer')

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e`,
        { mode: 'cors' }
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            // const {lat} = response.coord;
            // const {lon} = response.coord;
            // fetchDailyForecast(lat, lon);
            const newWeatherCard = {
                city: response.name,
                country: response.sys.country,
                humidity: response.main.humidity,
                localDate: calcCurrentTime(response.timezone),
                sunrise: calcSunTime(
                    response.sys.sunrise * 1000,
                    response.timezone
                ),
                sunset: calcSunTime(
                    response.sys.sunset * 1000,
                    response.timezone
                ),
                tempCurrent: response.main.temp,
                tempHigh: response.main.temp_max,
                tempLow: response.main.temp_min,
                weatherCondition: response.weather[0].main,
                weatherDescription: response.weather[0].description,
                windDegree: response.wind.deg,
                windDirection: toDirection(response.wind.deg),
                windSpeed: response.wind.speed,
                windGust: response.wind.gust,
            }
            APIImage.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
            console.log(newWeatherCard)
            return newWeatherCard
        })
        .catch((err) => {
            console.log(err)
            APIErrorContainer.innerText = 'City not found'
        })
}

const APICitySearch = (input) => {
    fetchCurrentWeather(input)
    fetchHourlyForecast(input)
}

// Placeholder Content
APICitySearch('Florence')

const validateSearch = (e) => {
    e.preventDefault()
    // grab dom elements
    const newLocationInput = document.querySelector('.newLocationInput')
    const newProjErrorContainer = document.querySelector(
        '.newProjErrorContainer'
    )
    // reset error
    newProjErrorContainer.innerText = ''
    // check for search term
    if (newLocationInput.value === '') {
        newProjErrorContainer.innerText = 'Which city?'
    } else {
        APICitySearch(newLocationInput.value)
    }
}

export default validateSearch
