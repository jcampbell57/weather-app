import APICitySearch from "./weatherAPI";

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
