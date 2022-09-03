document.cookie = 'SameSite=Lax';

function toDirection(degree) {
  if(degree>337.5) return 'North';
  if(degree>292.5) return 'North West';
  if(degree>247.5) return 'West';
  if(degree>202.5) return 'South West';
  if(degree>157.5) return 'South';
  if(degree>122.5) return 'South East';
  if(degree>67.5) return 'East';
  if(degree>22.5) return 'North East';
  return 'North';
}

// https://stackoverflow.com/questions/62376115/how-to-obtain-open-weather-api-date-time-from-city-being-fetched
const calcCurrentTime = (timezone) => {
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const newCity = utc + (1000 * timezone)
  return new Date(newCity);
}

const calcSunTime = (time, timezone) => {
  const d = new Date();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = time + localOffset;
  const newCity = utc + (1000 * timezone)
  return new Date(newCity);
}

const fetchWeather = (cityQuery) => {
  const APIImage = document.querySelector('.APIImage');
  const APIErrorContainer = document.querySelector('.APIErrorContainer');

  // fetch current weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e`, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      APIImage.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
      const newWeatherCard = {
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        localDate: calcCurrentTime(response.timezone),
        sunrise: calcSunTime(response.sys.sunrise * 1000, response.timezone),
        sunset: calcSunTime(response.sys.sunset * 1000, response.timezone), 
        tempCurrent: response.main.temp,
        tempHigh: response.main.temp_max,
        tempLow: response.main.temp_min,
        weatherCondition: response.weather[0].main,
        weatherDescription: response.weather[0].description,
        windDegree: response.wind.deg,
        windDirection: toDirection(response.wind.deg),
        windSpeed: response.wind.speed,
        windGust: response.wind.gust
      }
      console.log(newWeatherCard)
      return newWeatherCard
    })
    .catch((err) => {
      console.log(err);
      // APIErrorContainer.innerText = 'City not found';
    });

  // fetch five day forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e`, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const newWeatherForecastArray = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 40; i++) {
        // .src = `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}.png`
        const newWeatherForecast = {
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
        newWeatherForecastArray.push(newWeatherForecast)
      }
      console.log(newWeatherForecastArray)
      return newWeatherForecastArray
    })
    .catch((err) => {
      console.log(err);
      APIErrorContainer.innerText = 'City not found';
    });
};

const APICitySearch = () => {
  // grab dom elements
  const APISearchInput = document.querySelector('.APISearchInput');
  const APIErrorContainer = document.querySelector('.APIErrorContainer');
  // reset error
  APIErrorContainer.innerText = '';
  // check for search term
  if (APISearchInput.value === '') {
    APIErrorContainer.innerText = 'Which city?';
  } else {
    fetchWeather(APISearchInput.value);
  }
};

const createWeatherAPI = () => {
  // create Weather API container
  const WeatherAPIContainter = document.createElement('div');
  WeatherAPIContainter.classList.add('WeatherAPIContainter', 'content');
  // WeatherAPIContainter.id = '';

  // create API title
  const APITitle = document.createElement('h3');
  APITitle.innerText = 'Weatherserve';

  // create API image container
  // const APIImageContainer = document.createElement('div');
  // APIImageContainer.classList.add('APIImageContainer');

  // create API img
  const APIImage = document.createElement('img');
  APIImage.classList.add('APIImage');

  // search input
  const APISearchInput = document.createElement('input');
  APISearchInput.classList.add('APISearchInput');
  APISearchInput.placeholder = 'Seattle';

  // search button
  const APISearchBtn = document.createElement('div');
  APISearchBtn.classList.add('APISearchBtn');
  APISearchBtn.innerText = 'Search';
  APISearchBtn.addEventListener('click', APICitySearch);

  // error container
  const APIErrorContainer = document.createElement('div');
  APIErrorContainer.classList.add('APIErrorContainer');

  // Append
  WeatherAPIContainter.appendChild(APITitle);
  // APIImageContainer.appendChild(APIImage);
  WeatherAPIContainter.appendChild(APISearchInput);
  WeatherAPIContainter.appendChild(APISearchBtn);
  WeatherAPIContainter.appendChild(APIErrorContainer);
  WeatherAPIContainter.appendChild(APIImage);
  // WeatherAPIContainter.appendChild(APIImageContainer);
  // container.appendChild(WeatherAPIContainter);

  return WeatherAPIContainter;
};

export default function createContentContainer() {
  // create content container
  const contentContainter = document.createElement('div');
  contentContainter.classList.add('contentContainer');
  
  // create weather app 
  contentContainter.appendChild(createWeatherAPI());

  return contentContainter;
}
