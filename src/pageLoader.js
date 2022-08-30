const fetchWeather = (cityQuery) => {
  // const APIPractice = document.querySelector('.APIPractice');
  const APIErrorContainer = document.querySelector('.APIErrorContainer');

  // fetch current weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e`, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      console.log('Weather condition: ', response.weather[0].main);
      console.log('Current temperature: ', response.main.temp);
      console.log('Low temperature: ', response.main.temp_min);
      console.log('High temperature: ', response.main.temp_max);
      console.log(response);
      // APIPractice.src = response.data.images.original.url;
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
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 40; i++) {
        // console.log(response.list[i]);
        console.log(response.list[i].dt_txt);
        console.log('current temp: ', response.list[i].main.temp);
      }
      // console.log('Weather condition: ', response.list.weather.main);
      // console.log('Main temperature: ', response.list.main.temp);
      // console.log('Low temperature: ', response.list.main.temp_min);
      // console.log('High temperature: ', response.list.main.temp_max);
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
  WeatherAPIContainter.id = 'APIPractice';

  // create API title
  const APITitle = document.createElement('h3');
  APITitle.innerText = 'API weather search';

  // create API image container
  // const APIImageContainer = document.createElement('div');
  // APIImageContainer.classList.add('APIImageContainer');

  // create API img
  // const APIPractice = document.createElement('img');
  // APIPractice.classList.add('APIPractice');

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
  // APIImageContainer.appendChild(APIPractice);
  WeatherAPIContainter.appendChild(APISearchInput);
  WeatherAPIContainter.appendChild(APISearchBtn);
  WeatherAPIContainter.appendChild(APIErrorContainer);
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
