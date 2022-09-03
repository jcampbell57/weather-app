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
} // https://stackoverflow.com/questions/62376115/how-to-obtain-open-weather-api-date-time-from-city-being-fetched


const calcCurrentTime = timezone => {
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const newCity = utc + 1000 * timezone;
  return new Date(newCity);
};

const calcSunTime = (time, timezone) => {
  const d = new Date();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = time + localOffset;
  const newCity = utc + 1000 * timezone;
  return new Date(newCity);
};

const fetchWeather = cityQuery => {
  const APIImage = document.querySelector('.APIImage');
  const APIErrorContainer = document.querySelector('.APIErrorContainer'); // fetch current weather

  fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(cityQuery, "&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e"), {
    mode: 'cors'
  }).then(response => response.json()).then(response => {
    console.log(response);
    APIImage.src = "http://openweathermap.org/img/wn/".concat(response.weather[0].icon, "@2x.png");
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
        windSpeed: response.list[i].wind.speed
      };
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
  APITitle.innerText = 'Weatherserve'; // create API image container
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzZCLENBbUM3Qjs7RUFDQUosb0JBQW9CLENBQUNRLFdBQXJCLENBQWlDWCxjQUFqQztFQUNBRyxvQkFBb0IsQ0FBQ1EsV0FBckIsQ0FBaUNGLFlBQWpDO0VBQ0FOLG9CQUFvQixDQUFDUSxXQUFyQixDQUFpQ2hFLGlCQUFqQztFQUNBd0Qsb0JBQW9CLENBQUNRLFdBQXJCLENBQWlDbEUsUUFBakMsRUF2QzZCLENBd0M3QjtFQUNBOztFQUVBLE9BQU8wRCxvQkFBUDtBQUNELENBNUNEOztBQThDZSxTQUFTUyxzQkFBVCxHQUFrQztFQUMvQztFQUNBLE1BQU1DLGlCQUFpQixHQUFHdEYsUUFBUSxDQUFDNkUsYUFBVCxDQUF1QixLQUF2QixDQUExQjtFQUNBUyxpQkFBaUIsQ0FBQ1IsU0FBbEIsQ0FBNEJDLEdBQTVCLENBQWdDLGtCQUFoQyxFQUgrQyxDQUsvQzs7RUFDQU8saUJBQWlCLENBQUNGLFdBQWxCLENBQThCVCxnQkFBZ0IsRUFBOUM7RUFFQSxPQUFPVyxpQkFBUDtBQUNELEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJkb2N1bWVudC5jb29raWUgPSAnU2FtZVNpdGU9TGF4JztcblxuZnVuY3Rpb24gdG9EaXJlY3Rpb24oZGVncmVlKSB7XG4gIGlmKGRlZ3JlZT4zMzcuNSkgcmV0dXJuICdOb3J0aCc7XG4gIGlmKGRlZ3JlZT4yOTIuNSkgcmV0dXJuICdOb3J0aCBXZXN0JztcbiAgaWYoZGVncmVlPjI0Ny41KSByZXR1cm4gJ1dlc3QnO1xuICBpZihkZWdyZWU+MjAyLjUpIHJldHVybiAnU291dGggV2VzdCc7XG4gIGlmKGRlZ3JlZT4xNTcuNSkgcmV0dXJuICdTb3V0aCc7XG4gIGlmKGRlZ3JlZT4xMjIuNSkgcmV0dXJuICdTb3V0aCBFYXN0JztcbiAgaWYoZGVncmVlPjY3LjUpIHJldHVybiAnRWFzdCc7XG4gIGlmKGRlZ3JlZT4yMi41KSByZXR1cm4gJ05vcnRoIEVhc3QnO1xuICByZXR1cm4gJ05vcnRoJztcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjIzNzYxMTUvaG93LXRvLW9idGFpbi1vcGVuLXdlYXRoZXItYXBpLWRhdGUtdGltZS1mcm9tLWNpdHktYmVpbmctZmV0Y2hlZFxuY29uc3QgY2FsY0N1cnJlbnRUaW1lID0gKHRpbWV6b25lKSA9PiB7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBsb2NhbFRpbWUgPSBkLmdldFRpbWUoKTtcbiAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDtcbiAgY29uc3QgdXRjID0gbG9jYWxUaW1lICsgbG9jYWxPZmZzZXQ7XG4gIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAoMTAwMCAqIHRpbWV6b25lKVxuICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSk7XG59XG5cbmNvbnN0IGNhbGNTdW5UaW1lID0gKHRpbWUsIHRpbWV6b25lKSA9PiB7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xuICBjb25zdCB1dGMgPSB0aW1lICsgbG9jYWxPZmZzZXQ7XG4gIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAoMTAwMCAqIHRpbWV6b25lKVxuICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSk7XG59XG5cbmNvbnN0IGZldGNoV2VhdGhlciA9IChjaXR5UXVlcnkpID0+IHtcbiAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKTtcbiAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKTtcblxuICAvLyBmZXRjaCBjdXJyZW50IHdlYXRoZXJcbiAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCwgeyBtb2RlOiAnY29ycycgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYDtcbiAgICAgIGNvbnN0IG5ld1dlYXRoZXJDYXJkID0ge1xuICAgICAgICBjaXR5OiByZXNwb25zZS5uYW1lLFxuICAgICAgICBjb3VudHJ5OiByZXNwb25zZS5zeXMuY291bnRyeSxcbiAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLm1haW4uaHVtaWRpdHksXG4gICAgICAgIGxvY2FsRGF0ZTogY2FsY0N1cnJlbnRUaW1lKHJlc3BvbnNlLnRpbWV6b25lKSxcbiAgICAgICAgc3VucmlzZTogY2FsY1N1blRpbWUocmVzcG9uc2Uuc3lzLnN1bnJpc2UgKiAxMDAwLCByZXNwb25zZS50aW1lem9uZSksXG4gICAgICAgIHN1bnNldDogY2FsY1N1blRpbWUocmVzcG9uc2Uuc3lzLnN1bnNldCAqIDEwMDAsIHJlc3BvbnNlLnRpbWV6b25lKSwgXG4gICAgICAgIHRlbXBDdXJyZW50OiByZXNwb25zZS5tYWluLnRlbXAsXG4gICAgICAgIHRlbXBIaWdoOiByZXNwb25zZS5tYWluLnRlbXBfbWF4LFxuICAgICAgICB0ZW1wTG93OiByZXNwb25zZS5tYWluLnRlbXBfbWluLFxuICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2Uud2luZC5kZWcsXG4gICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLndpbmQuZGVnKSxcbiAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkLFxuICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2Uud2luZC5ndXN0XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhuZXdXZWF0aGVyQ2FyZClcbiAgICAgIHJldHVybiBuZXdXZWF0aGVyQ2FyZFxuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAvLyBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnO1xuICAgIH0pO1xuXG4gIC8vIGZldGNoIGZpdmUgZGF5IGZvcmVjYXN0XG4gIGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgY29uc3QgbmV3V2VhdGhlckZvcmVjYXN0QXJyYXkgPSBbXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG4gICAgICAgIC8vIC5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uaWNvbn0ucG5nYFxuICAgICAgICBjb25zdCBuZXdXZWF0aGVyRm9yZWNhc3QgPSB7XG4gICAgICAgICAgZGF0ZTogbmV3IERhdGUocmVzcG9uc2UubGlzdFtpXS5kdF90eHQpLFxuICAgICAgICAgIGRhdGVUZXh0OiByZXNwb25zZS5saXN0W2ldLmR0X3R4dCxcbiAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubGlzdFtpXS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgIHJhaW5DaGFuY2U6IHJlc3BvbnNlLmxpc3RbaV0ucG9wICogMTAwLFxuICAgICAgICAgIHRlbXBlcmF0dXJlOiByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCxcbiAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS5saXN0W2ldLndpbmQuZGVnLFxuICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcpLFxuICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS5saXN0W2ldLndpbmQuZ3VzdCxcbiAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5zcGVlZCxcbiAgICAgICAgfVxuICAgICAgICBuZXdXZWF0aGVyRm9yZWNhc3RBcnJheS5wdXNoKG5ld1dlYXRoZXJGb3JlY2FzdClcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKG5ld1dlYXRoZXJGb3JlY2FzdEFycmF5KVxuICAgICAgcmV0dXJuIG5ld1dlYXRoZXJGb3JlY2FzdEFycmF5XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCc7XG4gICAgfSk7XG59O1xuXG5jb25zdCBBUElDaXR5U2VhcmNoID0gKCkgPT4ge1xuICAvLyBncmFiIGRvbSBlbGVtZW50c1xuICBjb25zdCBBUElTZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElTZWFyY2hJbnB1dCcpO1xuICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElFcnJvckNvbnRhaW5lcicpO1xuICAvLyByZXNldCBlcnJvclxuICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnJztcbiAgLy8gY2hlY2sgZm9yIHNlYXJjaCB0ZXJtXG4gIGlmIChBUElTZWFyY2hJbnB1dC52YWx1ZSA9PT0gJycpIHtcbiAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nO1xuICB9IGVsc2Uge1xuICAgIGZldGNoV2VhdGhlcihBUElTZWFyY2hJbnB1dC52YWx1ZSk7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJBUEkgPSAoKSA9PiB7XG4gIC8vIGNyZWF0ZSBXZWF0aGVyIEFQSSBjb250YWluZXJcbiAgY29uc3QgV2VhdGhlckFQSUNvbnRhaW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnV2VhdGhlckFQSUNvbnRhaW50ZXInLCAnY29udGVudCcpO1xuICAvLyBXZWF0aGVyQVBJQ29udGFpbnRlci5pZCA9ICcnO1xuXG4gIC8vIGNyZWF0ZSBBUEkgdGl0bGVcbiAgY29uc3QgQVBJVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICBBUElUaXRsZS5pbm5lclRleHQgPSAnV2VhdGhlcnNlcnZlJztcblxuICAvLyBjcmVhdGUgQVBJIGltYWdlIGNvbnRhaW5lclxuICAvLyBjb25zdCBBUElJbWFnZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAvLyBBUElJbWFnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZUNvbnRhaW5lcicpO1xuXG4gIC8vIGNyZWF0ZSBBUEkgaW1nXG4gIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIEFQSUltYWdlLmNsYXNzTGlzdC5hZGQoJ0FQSUltYWdlJyk7XG5cbiAgLy8gc2VhcmNoIGlucHV0XG4gIGNvbnN0IEFQSVNlYXJjaElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgQVBJU2VhcmNoSW5wdXQuY2xhc3NMaXN0LmFkZCgnQVBJU2VhcmNoSW5wdXQnKTtcbiAgQVBJU2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSAnU2VhdHRsZSc7XG5cbiAgLy8gc2VhcmNoIGJ1dHRvblxuICBjb25zdCBBUElTZWFyY2hCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgQVBJU2VhcmNoQnRuLmNsYXNzTGlzdC5hZGQoJ0FQSVNlYXJjaEJ0bicpO1xuICBBUElTZWFyY2hCdG4uaW5uZXJUZXh0ID0gJ1NlYXJjaCc7XG4gIEFQSVNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEFQSUNpdHlTZWFyY2gpO1xuXG4gIC8vIGVycm9yIGNvbnRhaW5lclxuICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBBUElFcnJvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdBUElFcnJvckNvbnRhaW5lcicpO1xuXG4gIC8vIEFwcGVuZFxuICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElUaXRsZSk7XG4gIC8vIEFQSUltYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKEFQSUltYWdlKTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJU2VhcmNoSW5wdXQpO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElTZWFyY2hCdG4pO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElFcnJvckNvbnRhaW5lcik7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlKTtcbiAgLy8gV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2VDb250YWluZXIpO1xuICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoV2VhdGhlckFQSUNvbnRhaW50ZXIpO1xuXG4gIHJldHVybiBXZWF0aGVyQVBJQ29udGFpbnRlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRlbnRDb250YWluZXIoKSB7XG4gIC8vIGNyZWF0ZSBjb250ZW50IGNvbnRhaW5lclxuICBjb25zdCBjb250ZW50Q29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250ZW50Q29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdjb250ZW50Q29udGFpbmVyJyk7XG4gIFxuICAvLyBjcmVhdGUgd2VhdGhlciBhcHAgXG4gIGNvbnRlbnRDb250YWludGVyLmFwcGVuZENoaWxkKGNyZWF0ZVdlYXRoZXJBUEkoKSk7XG5cbiAgcmV0dXJuIGNvbnRlbnRDb250YWludGVyO1xufVxuIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiY29va2llIiwidG9EaXJlY3Rpb24iLCJkZWdyZWUiLCJjYWxjQ3VycmVudFRpbWUiLCJ0aW1lem9uZSIsImQiLCJEYXRlIiwibG9jYWxUaW1lIiwiZ2V0VGltZSIsImxvY2FsT2Zmc2V0IiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJ1dGMiLCJuZXdDaXR5IiwiY2FsY1N1blRpbWUiLCJ0aW1lIiwiZmV0Y2hXZWF0aGVyIiwiY2l0eVF1ZXJ5IiwiQVBJSW1hZ2UiLCJxdWVyeVNlbGVjdG9yIiwiQVBJRXJyb3JDb250YWluZXIiLCJmZXRjaCIsIm1vZGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY29uc29sZSIsImxvZyIsInNyYyIsIndlYXRoZXIiLCJpY29uIiwibmV3V2VhdGhlckNhcmQiLCJjaXR5IiwibmFtZSIsImNvdW50cnkiLCJzeXMiLCJodW1pZGl0eSIsIm1haW4iLCJsb2NhbERhdGUiLCJzdW5yaXNlIiwic3Vuc2V0IiwidGVtcEN1cnJlbnQiLCJ0ZW1wIiwidGVtcEhpZ2giLCJ0ZW1wX21heCIsInRlbXBMb3ciLCJ0ZW1wX21pbiIsIndlYXRoZXJDb25kaXRpb24iLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJkZXNjcmlwdGlvbiIsIndpbmREZWdyZWUiLCJ3aW5kIiwiZGVnIiwid2luZERpcmVjdGlvbiIsIndpbmRTcGVlZCIsInNwZWVkIiwid2luZEd1c3QiLCJndXN0IiwiY2F0Y2giLCJlcnIiLCJuZXdXZWF0aGVyRm9yZWNhc3RBcnJheSIsImkiLCJuZXdXZWF0aGVyRm9yZWNhc3QiLCJkYXRlIiwibGlzdCIsImR0X3R4dCIsImRhdGVUZXh0IiwicmFpbkNoYW5jZSIsInBvcCIsInRlbXBlcmF0dXJlIiwicHVzaCIsImlubmVyVGV4dCIsIkFQSUNpdHlTZWFyY2giLCJBUElTZWFyY2hJbnB1dCIsInZhbHVlIiwiY3JlYXRlV2VhdGhlckFQSSIsIldlYXRoZXJBUElDb250YWludGVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsIkFQSVRpdGxlIiwicGxhY2Vob2xkZXIiLCJBUElTZWFyY2hCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVDb250ZW50Q29udGFpbmVyIiwiY29udGVudENvbnRhaW50ZXIiXSwic291cmNlUm9vdCI6IiJ9