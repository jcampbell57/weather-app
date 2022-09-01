/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/pageLoader.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createContentContainer)
/* harmony export */ });
document.cookie = 'SameSite=Lax';

function toDirection(degree) {
  if (degree > 337.5) return 'North';
  if (degree > 292.5) return 'North West';
  if (degree > 247.5) return 'West';
  if (degree > 202.5) return 'South West';
  if (degree > 157.5) return 'South';
  if (degree > 122.5) return 'South East';
  if (degree > 67.5) return 'East';
  if (degree > 22.5) return 'North East';
  return 'North';
}

const fetchWeather = cityQuery => {
  const APIImage = document.querySelector('.APIImage');
  const APIErrorContainer = document.querySelector('.APIErrorContainer'); // fetch current weather

  fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(cityQuery, "&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e"), {
    mode: 'cors'
  }).then(response => response.json()).then(response => {
    console.log(response);
    console.log('Weather condition: ', response.weather[0].main);
    console.log('Weather description: ', response.weather[0].description);
    console.log('Humidity: ', response.main.humidity);
    console.log('Wind degree: ', response.wind.deg);
    console.log('Wind direction: ', toDirection(response.wind.deg));
    console.log('Wind Speed: ', response.wind.speed);
    console.log('Current temperature: ', response.main.temp);
    console.log('Low temperature: ', response.main.temp_min);
    console.log('High temperature: ', response.main.temp_max);
    APIImage.src = "http://openweathermap.org/img/wn/".concat(response.weather[0].icon, "@2x.png");
    const newWeatherCard = {
      weatherCondition: response.weather[0].main,
      weatherDescription: response.weather[0].description,
      humidity: response.main.humidity,
      windDegree: response.wind.deg,
      windDirection: toDirection(response.wind.deg),
      windSpeed: response.wind.speed,
      currentTemp: response.main.temp,
      lowTemp: response.main.temp_min,
      highTemp: response.main.temp_max
    };
    console.log(newWeatherCard);
    return newWeatherCard;
  }).catch(err => {
    console.log(err); // APIErrorContainer.innerText = 'City not found';
  }); // fetch five day forecast

  fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(cityQuery, "&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e"), {
    mode: 'cors'
  }).then(response => response.json()).then(response => {
    console.log(response);
    const newWeatherForecastArray = []; // eslint-disable-next-line no-plusplus

    for (let i = 0; i < 40; i++) {
      // console.log(response.list[i]);
      console.log(response.list[i].dt_txt);
      console.log('Weather condition: ', response.list[i].weather[0].main);
      console.log('Weather description: ', response.list[i].weather[0].description);
      console.log('Humidity: ', response.list[i].main.humidity);
      console.log('Wind degree: ', response.list[i].wind.deg);
      console.log('Wind direction: ', toDirection(response.list[i].main.temp));
      console.log('Wind Speed: ', response.list[i].wind.speed);
      console.log('Wind Gust: ', response.list[i].wind.gust);
      console.log('Temperature: ', response.list[i].main.temp); // .src = `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}.png`

      const newWeatherForecast = {
        weatherCondition: response.list[i].weather[0].main,
        weatherDescription: response.list[i].weather[0].description,
        humidity: response.list[i].main.humidity,
        windDegree: response.list[i].wind.deg,
        windDirection: toDirection(response.list[i].wind.deg),
        windSpeed: response.list[i].wind.speed,
        windGust: response.list[i].wind.gust,
        temperature: response.list[i].main.temp
      };
      console.log(newWeatherForecast);
      newWeatherForecastArray.push(newWeatherForecast);
    }

    console.log(newWeatherForecastArray);
    return newWeatherForecastArray;
  }).catch(err => {
    console.log(err);
    APIErrorContainer.innerText = 'City not found';
  });
};

const APICitySearch = () => {
  // grab dom elements
  const APISearchInput = document.querySelector('.APISearchInput');
  const APIErrorContainer = document.querySelector('.APIErrorContainer'); // reset error

  APIErrorContainer.innerText = ''; // check for search term

  if (APISearchInput.value === '') {
    APIErrorContainer.innerText = 'Which city?';
  } else {
    fetchWeather(APISearchInput.value);
  }
};

const createWeatherAPI = () => {
  // create Weather API container
  const WeatherAPIContainter = document.createElement('div');
  WeatherAPIContainter.classList.add('WeatherAPIContainter', 'content'); // WeatherAPIContainter.id = '';
  // create API title

  const APITitle = document.createElement('h3');
  APITitle.innerText = 'API weather search'; // create API image container
  // const APIImageContainer = document.createElement('div');
  // APIImageContainer.classList.add('APIImageContainer');
  // create API img

  const APIImage = document.createElement('img');
  APIImage.classList.add('APIImage'); // search input

  const APISearchInput = document.createElement('input');
  APISearchInput.classList.add('APISearchInput');
  APISearchInput.placeholder = 'Seattle'; // search button

  const APISearchBtn = document.createElement('div');
  APISearchBtn.classList.add('APISearchBtn');
  APISearchBtn.innerText = 'Search';
  APISearchBtn.addEventListener('click', APICitySearch); // error container

  const APIErrorContainer = document.createElement('div');
  APIErrorContainer.classList.add('APIErrorContainer'); // Append

  WeatherAPIContainter.appendChild(APITitle); // APIImageContainer.appendChild(APIImage);

  WeatherAPIContainter.appendChild(APISearchInput);
  WeatherAPIContainter.appendChild(APISearchBtn);
  WeatherAPIContainter.appendChild(APIErrorContainer);
  WeatherAPIContainter.appendChild(APIImage); // WeatherAPIContainter.appendChild(APIImageContainer);
  // container.appendChild(WeatherAPIContainter);

  return WeatherAPIContainter;
};

function createContentContainer() {
  // create content container
  const contentContainter = document.createElement('div');
  contentContainter.classList.add('contentContainer'); // create weather app 

  contentContainter.appendChild(createWeatherAPI());
  return contentContainter;
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcGFnZUxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImRvY3VtZW50LmNvb2tpZSA9ICdTYW1lU2l0ZT1MYXgnO1xuXG5mdW5jdGlvbiB0b0RpcmVjdGlvbihkZWdyZWUpIHtcbiAgaWYoZGVncmVlPjMzNy41KSByZXR1cm4gJ05vcnRoJztcbiAgaWYoZGVncmVlPjI5Mi41KSByZXR1cm4gJ05vcnRoIFdlc3QnO1xuICBpZihkZWdyZWU+MjQ3LjUpIHJldHVybiAnV2VzdCc7XG4gIGlmKGRlZ3JlZT4yMDIuNSkgcmV0dXJuICdTb3V0aCBXZXN0JztcbiAgaWYoZGVncmVlPjE1Ny41KSByZXR1cm4gJ1NvdXRoJztcbiAgaWYoZGVncmVlPjEyMi41KSByZXR1cm4gJ1NvdXRoIEVhc3QnO1xuICBpZihkZWdyZWU+NjcuNSkgcmV0dXJuICdFYXN0JztcbiAgaWYoZGVncmVlPjIyLjUpIHJldHVybiAnTm9ydGggRWFzdCc7XG4gIHJldHVybiAnTm9ydGgnO1xufVxuXG5jb25zdCBmZXRjaFdlYXRoZXIgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUltYWdlJyk7XG4gIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJyk7XG5cbiAgLy8gZmV0Y2ggY3VycmVudCB3ZWF0aGVyXG4gIGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsIHsgbW9kZTogJ2NvcnMnIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICBjb25zb2xlLmxvZygnV2VhdGhlciBjb25kaXRpb246ICcsIHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbik7XG4gICAgICBjb25zb2xlLmxvZygnV2VhdGhlciBkZXNjcmlwdGlvbjogJywgcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbik7XG4gICAgICBjb25zb2xlLmxvZygnSHVtaWRpdHk6ICcsIHJlc3BvbnNlLm1haW4uaHVtaWRpdHkpO1xuICAgICAgY29uc29sZS5sb2coJ1dpbmQgZGVncmVlOiAnLCByZXNwb25zZS53aW5kLmRlZyk7XG4gICAgICBjb25zb2xlLmxvZygnV2luZCBkaXJlY3Rpb246ICcsIHRvRGlyZWN0aW9uKHJlc3BvbnNlLndpbmQuZGVnKSk7XG4gICAgICBjb25zb2xlLmxvZygnV2luZCBTcGVlZDogJywgcmVzcG9uc2Uud2luZC5zcGVlZCk7XG4gICAgICBjb25zb2xlLmxvZygnQ3VycmVudCB0ZW1wZXJhdHVyZTogJywgcmVzcG9uc2UubWFpbi50ZW1wKTtcbiAgICAgIGNvbnNvbGUubG9nKCdMb3cgdGVtcGVyYXR1cmU6ICcsIHJlc3BvbnNlLm1haW4udGVtcF9taW4pO1xuICAgICAgY29uc29sZS5sb2coJ0hpZ2ggdGVtcGVyYXR1cmU6ICcsIHJlc3BvbnNlLm1haW4udGVtcF9tYXgpO1xuICAgICAgQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7cmVzcG9uc2Uud2VhdGhlclswXS5pY29ufUAyeC5wbmdgO1xuICAgICAgY29uc3QgbmV3V2VhdGhlckNhcmQgPSB7XG4gICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2Uud2luZC5kZWcsXG4gICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLndpbmQuZGVnKSxcbiAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkLFxuICAgICAgICBjdXJyZW50VGVtcDogcmVzcG9uc2UubWFpbi50ZW1wLFxuICAgICAgICBsb3dUZW1wOiByZXNwb25zZS5tYWluLnRlbXBfbWluLFxuICAgICAgICBoaWdoVGVtcDogcmVzcG9uc2UubWFpbi50ZW1wX21heFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2cobmV3V2VhdGhlckNhcmQpXG4gICAgICByZXR1cm4gbmV3V2VhdGhlckNhcmRcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgLy8gQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJztcbiAgICB9KTtcblxuICAvLyBmZXRjaCBmaXZlIGRheSBmb3JlY2FzdFxuICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCwgeyBtb2RlOiAnY29ycycgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgIGNvbnN0IG5ld1dlYXRoZXJGb3JlY2FzdEFycmF5ID0gW107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5saXN0W2ldKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UubGlzdFtpXS5kdF90eHQpO1xuICAgICAgICBjb25zb2xlLmxvZygnV2VhdGhlciBjb25kaXRpb246ICcsIHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5tYWluKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1dlYXRoZXIgZGVzY3JpcHRpb246ICcsIHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdIdW1pZGl0eTogJywgcmVzcG9uc2UubGlzdFtpXS5tYWluLmh1bWlkaXR5KTtcbiAgICAgICAgY29uc29sZS5sb2coJ1dpbmQgZGVncmVlOiAnLCByZXNwb25zZS5saXN0W2ldLndpbmQuZGVnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1dpbmQgZGlyZWN0aW9uOiAnLCB0b0RpcmVjdGlvbihyZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCkpO1xuICAgICAgICBjb25zb2xlLmxvZygnV2luZCBTcGVlZDogJywgcmVzcG9uc2UubGlzdFtpXS53aW5kLnNwZWVkKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1dpbmQgR3VzdDogJywgcmVzcG9uc2UubGlzdFtpXS53aW5kLmd1c3QpO1xuICAgICAgICBjb25zb2xlLmxvZygnVGVtcGVyYXR1cmU6ICcsIHJlc3BvbnNlLmxpc3RbaV0ubWFpbi50ZW1wKTtcbiAgICAgICAgLy8gLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5pY29ufS5wbmdgXG4gICAgICAgIGNvbnN0IG5ld1dlYXRoZXJGb3JlY2FzdCA9IHtcbiAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubGlzdFtpXS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcsXG4gICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyksXG4gICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS5saXN0W2ldLndpbmQuc3BlZWQsXG4gICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5ndXN0LFxuICAgICAgICAgIHRlbXBlcmF0dXJlOiByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCxcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhuZXdXZWF0aGVyRm9yZWNhc3QpXG4gICAgICAgIG5ld1dlYXRoZXJGb3JlY2FzdEFycmF5LnB1c2gobmV3V2VhdGhlckZvcmVjYXN0KVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2cobmV3V2VhdGhlckZvcmVjYXN0QXJyYXkpXG4gICAgICByZXR1cm4gbmV3V2VhdGhlckZvcmVjYXN0QXJyYXlcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJztcbiAgICB9KTtcbn07XG5cbmNvbnN0IEFQSUNpdHlTZWFyY2ggPSAoKSA9PiB7XG4gIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gIGNvbnN0IEFQSVNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSVNlYXJjaElucHV0Jyk7XG4gIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJyk7XG4gIC8vIHJlc2V0IGVycm9yXG4gIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICcnO1xuICAvLyBjaGVjayBmb3Igc2VhcmNoIHRlcm1cbiAgaWYgKEFQSVNlYXJjaElucHV0LnZhbHVlID09PSAnJykge1xuICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5Pyc7XG4gIH0gZWxzZSB7XG4gICAgZmV0Y2hXZWF0aGVyKEFQSVNlYXJjaElucHV0LnZhbHVlKTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlV2VhdGhlckFQSSA9ICgpID0+IHtcbiAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICBjb25zdCBXZWF0aGVyQVBJQ29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50Jyk7XG4gIC8vIFdlYXRoZXJBUElDb250YWludGVyLmlkID0gJyc7XG5cbiAgLy8gY3JlYXRlIEFQSSB0aXRsZVxuICBjb25zdCBBUElUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gIEFQSVRpdGxlLmlubmVyVGV4dCA9ICdBUEkgd2VhdGhlciBzZWFyY2gnO1xuXG4gIC8vIGNyZWF0ZSBBUEkgaW1hZ2UgY29udGFpbmVyXG4gIC8vIGNvbnN0IEFQSUltYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIC8vIEFQSUltYWdlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ0FQSUltYWdlQ29udGFpbmVyJyk7XG5cbiAgLy8gY3JlYXRlIEFQSSBpbWdcbiAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgQVBJSW1hZ2UuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2UnKTtcblxuICAvLyBzZWFyY2ggaW5wdXRcbiAgY29uc3QgQVBJU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBBUElTZWFyY2hJbnB1dC5jbGFzc0xpc3QuYWRkKCdBUElTZWFyY2hJbnB1dCcpO1xuICBBUElTZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9ICdTZWF0dGxlJztcblxuICAvLyBzZWFyY2ggYnV0dG9uXG4gIGNvbnN0IEFQSVNlYXJjaEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBBUElTZWFyY2hCdG4uY2xhc3NMaXN0LmFkZCgnQVBJU2VhcmNoQnRuJyk7XG4gIEFQSVNlYXJjaEJ0bi5pbm5lclRleHQgPSAnU2VhcmNoJztcbiAgQVBJU2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgQVBJQ2l0eVNlYXJjaCk7XG5cbiAgLy8gZXJyb3IgY29udGFpbmVyXG4gIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIEFQSUVycm9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ0FQSUVycm9yQ29udGFpbmVyJyk7XG5cbiAgLy8gQXBwZW5kXG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVRpdGxlKTtcbiAgLy8gQVBJSW1hZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElTZWFyY2hJbnB1dCk7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVNlYXJjaEJ0bik7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUVycm9yQ29udGFpbmVyKTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpO1xuICAvLyBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElJbWFnZUNvbnRhaW5lcik7XG4gIC8vIGNvbnRhaW5lci5hcHBlbmRDaGlsZChXZWF0aGVyQVBJQ29udGFpbnRlcik7XG5cbiAgcmV0dXJuIFdlYXRoZXJBUElDb250YWludGVyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29udGVudENvbnRhaW5lcigpIHtcbiAgLy8gY3JlYXRlIGNvbnRlbnQgY29udGFpbmVyXG4gIGNvbnN0IGNvbnRlbnRDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRlbnRDb250YWludGVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnRDb250YWluZXInKTtcbiAgXG4gIC8vIGNyZWF0ZSB3ZWF0aGVyIGFwcCBcbiAgY29udGVudENvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoY3JlYXRlV2VhdGhlckFQSSgpKTtcblxuICByZXR1cm4gY29udGVudENvbnRhaW50ZXI7XG59XG4iXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJjb29raWUiLCJ0b0RpcmVjdGlvbiIsImRlZ3JlZSIsImZldGNoV2VhdGhlciIsImNpdHlRdWVyeSIsIkFQSUltYWdlIiwicXVlcnlTZWxlY3RvciIsIkFQSUVycm9yQ29udGFpbmVyIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJ3ZWF0aGVyIiwibWFpbiIsImRlc2NyaXB0aW9uIiwiaHVtaWRpdHkiLCJ3aW5kIiwiZGVnIiwic3BlZWQiLCJ0ZW1wIiwidGVtcF9taW4iLCJ0ZW1wX21heCIsInNyYyIsImljb24iLCJuZXdXZWF0aGVyQ2FyZCIsIndlYXRoZXJDb25kaXRpb24iLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJ3aW5kRGVncmVlIiwid2luZERpcmVjdGlvbiIsIndpbmRTcGVlZCIsImN1cnJlbnRUZW1wIiwibG93VGVtcCIsImhpZ2hUZW1wIiwiY2F0Y2giLCJlcnIiLCJuZXdXZWF0aGVyRm9yZWNhc3RBcnJheSIsImkiLCJsaXN0IiwiZHRfdHh0IiwiZ3VzdCIsIm5ld1dlYXRoZXJGb3JlY2FzdCIsIndpbmRHdXN0IiwidGVtcGVyYXR1cmUiLCJwdXNoIiwiaW5uZXJUZXh0IiwiQVBJQ2l0eVNlYXJjaCIsIkFQSVNlYXJjaElucHV0IiwidmFsdWUiLCJjcmVhdGVXZWF0aGVyQVBJIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiQVBJVGl0bGUiLCJwbGFjZWhvbGRlciIsIkFQSVNlYXJjaEJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUNvbnRlbnRDb250YWluZXIiLCJjb250ZW50Q29udGFpbnRlciJdLCJzb3VyY2VSb290IjoiIn0=