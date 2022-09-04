/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/weatherAPI.js":
/*!***************************!*\
  !*** ./src/weatherAPI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
}; // const fetchDailyForecast = (lat, lon) => {
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


const fetchHourlyForecast = cityQuery => {
  const APIErrorContainer = document.querySelector('.APIErrorContainer'); // fetch five day/three hour forecast

  fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(cityQuery, "&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e"), {
    mode: 'cors'
  }).then(response => response.json()).then(response => {
    console.log(response);
    const newHourlyForecastArray = []; // eslint-disable-next-line no-plusplus

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
        windSpeed: response.list[i].wind.speed
      };
      newHourlyForecastArray.push(newHourlyForecast);
    }

    console.log(newHourlyForecastArray);
    return newHourlyForecastArray;
  }).catch(err => {
    console.log(err);
    APIErrorContainer.innerText = 'City not found';
  });
};

const fetchCurrentWeather = cityQuery => {
  const APIImage = document.querySelector('.APIImage');
  const APIErrorContainer = document.querySelector('.APIErrorContainer');
  fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(cityQuery, "&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e"), {
    mode: 'cors'
  }).then(response => response.json()).then(response => {
    console.log(response); // const {lat} = response.coord;
    // const {lon} = response.coord;
    // fetchDailyForecast(lat, lon);

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
    APIImage.src = "http://openweathermap.org/img/wn/".concat(response.weather[0].icon, "@2x.png");
    console.log(newWeatherCard);
    return newWeatherCard;
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
    const currentWeather = fetchCurrentWeather(APISearchInput.value);
    const hourlyForecast = fetchHourlyForecast(APISearchInput.value);
    Promise.all([currentWeather, hourlyForecast]).then(values => {
      console.log(values);
    }); // console.log(currentWeather)
    // console.log(hourlyForecast)
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (APICitySearch);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/pageLoader.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createContentContainer)
/* harmony export */ });
/* harmony import */ var _weatherAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherAPI */ "./src/weatherAPI.js");


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
  APISearchBtn.addEventListener('click', _weatherAPI__WEBPACK_IMPORTED_MODULE_0__["default"]); // error container

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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF2QixDQUExQjtFQUNBUyxpQkFBaUIsQ0FBQ1IsU0FBbEIsQ0FBNEJDLEdBQTVCLENBQWdDLGtCQUFoQyxFQUgrQyxDQUsvQzs7RUFDQU8saUJBQWlCLENBQUNGLFdBQWxCLENBQThCVCxnQkFBZ0IsRUFBOUM7RUFFQSxPQUFPVyxpQkFBUDtBQUNELEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWF0aGVyQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcGFnZUxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5jb29raWUgPSAnU2FtZVNpdGU9TGF4JztcblxuZnVuY3Rpb24gdG9EaXJlY3Rpb24oZGVncmVlKSB7XG4gIGlmKGRlZ3JlZT4zMzcuNSkgcmV0dXJuICdOb3J0aCc7XG4gIGlmKGRlZ3JlZT4yOTIuNSkgcmV0dXJuICdOb3J0aCBXZXN0JztcbiAgaWYoZGVncmVlPjI0Ny41KSByZXR1cm4gJ1dlc3QnO1xuICBpZihkZWdyZWU+MjAyLjUpIHJldHVybiAnU291dGggV2VzdCc7XG4gIGlmKGRlZ3JlZT4xNTcuNSkgcmV0dXJuICdTb3V0aCc7XG4gIGlmKGRlZ3JlZT4xMjIuNSkgcmV0dXJuICdTb3V0aCBFYXN0JztcbiAgaWYoZGVncmVlPjY3LjUpIHJldHVybiAnRWFzdCc7XG4gIGlmKGRlZ3JlZT4yMi41KSByZXR1cm4gJ05vcnRoIEVhc3QnO1xuICByZXR1cm4gJ05vcnRoJztcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjIzNzYxMTUvaG93LXRvLW9idGFpbi1vcGVuLXdlYXRoZXItYXBpLWRhdGUtdGltZS1mcm9tLWNpdHktYmVpbmctZmV0Y2hlZFxuY29uc3QgY2FsY0N1cnJlbnRUaW1lID0gKHRpbWV6b25lKSA9PiB7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBsb2NhbFRpbWUgPSBkLmdldFRpbWUoKTtcbiAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDtcbiAgY29uc3QgdXRjID0gbG9jYWxUaW1lICsgbG9jYWxPZmZzZXQ7XG4gIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAoMTAwMCAqIHRpbWV6b25lKVxuICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSk7XG59XG5cbmNvbnN0IGNhbGNTdW5UaW1lID0gKHRpbWUsIHRpbWV6b25lKSA9PiB7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xuICBjb25zdCB1dGMgPSB0aW1lICsgbG9jYWxPZmZzZXQ7XG4gIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAoMTAwMCAqIHRpbWV6b25lKVxuICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSk7XG59XG5cbi8vIGNvbnN0IGZldGNoRGFpbHlGb3JlY2FzdCA9IChsYXQsIGxvbikgPT4ge1xuLy8gICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElFcnJvckNvbnRhaW5lcicpO1xuLy8gICBjb25zb2xlLmxvZyhsYXQpO1xuLy8gICBjb25zb2xlLmxvZyhsb24pO1xuLy8gICAvLyBmZXRjaCBzZXZlbiBkYXkgZm9yZWNhc3Rcbi8vICAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZleGNsdWRlPW1pbnV0ZWx5LGhvdXJseSxhbGVydHMmdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuLy8gICAgIH0pXG4vLyAgICAgLmNhdGNoKChlcnIpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnO1xuLy8gICAgIH0pOyAgICBcbi8vIH07XG5cbmNvbnN0IGZldGNoSG91cmx5Rm9yZWNhc3QgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJyk7XG4gIC8vIGZldGNoIGZpdmUgZGF5L3RocmVlIGhvdXIgZm9yZWNhc3RcbiAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsIHsgbW9kZTogJ2NvcnMnIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdEFycmF5ID0gW107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuICAgICAgICAvLyAuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7cmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmljb259LnBuZ2BcbiAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3QgPSB7XG4gICAgICAgICAgZGF0ZTogbmV3IERhdGUocmVzcG9uc2UubGlzdFtpXS5kdF90eHQpLFxuICAgICAgICAgIGRhdGVUZXh0OiByZXNwb25zZS5saXN0W2ldLmR0X3R4dCxcbiAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubGlzdFtpXS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgIHJhaW5DaGFuY2U6IHJlc3BvbnNlLmxpc3RbaV0ucG9wICogMTAwLFxuICAgICAgICAgIHRlbXBlcmF0dXJlOiByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCxcbiAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS5saXN0W2ldLndpbmQuZGVnLFxuICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcpLFxuICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS5saXN0W2ldLndpbmQuZ3VzdCxcbiAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5zcGVlZCxcbiAgICAgICAgfVxuICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5LnB1c2gobmV3SG91cmx5Rm9yZWNhc3QpXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhuZXdIb3VybHlGb3JlY2FzdEFycmF5KVxuICAgICAgcmV0dXJuIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJztcbiAgICB9KTtcbn1cblxuY29uc3QgZmV0Y2hDdXJyZW50V2VhdGhlciA9IChjaXR5UXVlcnkpID0+IHtcbiAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKTtcbiAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKTtcblxuICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgLy8gY29uc3Qge2xhdH0gPSByZXNwb25zZS5jb29yZDtcbiAgICAgIC8vIGNvbnN0IHtsb259ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAvLyBmZXRjaERhaWx5Rm9yZWNhc3QobGF0LCBsb24pO1xuICAgICAgY29uc3QgbmV3V2VhdGhlckNhcmQgPSB7XG4gICAgICAgIGNpdHk6IHJlc3BvbnNlLm5hbWUsXG4gICAgICAgIGNvdW50cnk6IHJlc3BvbnNlLnN5cy5jb3VudHJ5LFxuICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgICAgbG9jYWxEYXRlOiBjYWxjQ3VycmVudFRpbWUocmVzcG9uc2UudGltZXpvbmUpLFxuICAgICAgICBzdW5yaXNlOiBjYWxjU3VuVGltZShyZXNwb25zZS5zeXMuc3VucmlzZSAqIDEwMDAsIHJlc3BvbnNlLnRpbWV6b25lKSxcbiAgICAgICAgc3Vuc2V0OiBjYWxjU3VuVGltZShyZXNwb25zZS5zeXMuc3Vuc2V0ICogMTAwMCwgcmVzcG9uc2UudGltZXpvbmUpLCBcbiAgICAgICAgdGVtcEN1cnJlbnQ6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgICAgdGVtcEhpZ2g6IHJlc3BvbnNlLm1haW4udGVtcF9tYXgsXG4gICAgICAgIHRlbXBMb3c6IHJlc3BvbnNlLm1haW4udGVtcF9taW4sXG4gICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS53aW5kLmRlZyxcbiAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2Uud2luZC5kZWcpLFxuICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLndpbmQuc3BlZWQsXG4gICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS53aW5kLmd1c3RcbiAgICAgIH1cbiAgICAgIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYDtcbiAgICAgIGNvbnNvbGUubG9nKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgcmV0dXJuIG5ld1dlYXRoZXJDYXJkXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCc7XG4gICAgfSk7XG59XG5cbmNvbnN0IEFQSUNpdHlTZWFyY2ggPSAoKSA9PiB7XG4gIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gIGNvbnN0IEFQSVNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSVNlYXJjaElucHV0Jyk7XG4gIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJyk7XG4gIC8vIHJlc2V0IGVycm9yXG4gIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICcnO1xuICAvLyBjaGVjayBmb3Igc2VhcmNoIHRlcm1cbiAgaWYgKEFQSVNlYXJjaElucHV0LnZhbHVlID09PSAnJykge1xuICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5Pyc7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY3VycmVudFdlYXRoZXIgPSBmZXRjaEN1cnJlbnRXZWF0aGVyKEFQSVNlYXJjaElucHV0LnZhbHVlKTtcbiAgICBjb25zdCBob3VybHlGb3JlY2FzdCA9IGZldGNoSG91cmx5Rm9yZWNhc3QoQVBJU2VhcmNoSW5wdXQudmFsdWUpO1xuICAgIFByb21pc2UuYWxsKFtjdXJyZW50V2VhdGhlciwgaG91cmx5Rm9yZWNhc3RdKVxuICAgICAgLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgfSlcbiAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudFdlYXRoZXIpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGhvdXJseUZvcmVjYXN0KVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBUElDaXR5U2VhcmNoIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgQVBJQ2l0eVNlYXJjaCBmcm9tIFwiLi93ZWF0aGVyQVBJXCI7XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJBUEkgPSAoKSA9PiB7XG4gIC8vIGNyZWF0ZSBXZWF0aGVyIEFQSSBjb250YWluZXJcbiAgY29uc3QgV2VhdGhlckFQSUNvbnRhaW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnV2VhdGhlckFQSUNvbnRhaW50ZXInLCAnY29udGVudCcpO1xuICAvLyBXZWF0aGVyQVBJQ29udGFpbnRlci5pZCA9ICcnO1xuXG4gIC8vIGNyZWF0ZSBBUEkgdGl0bGVcbiAgY29uc3QgQVBJVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICBBUElUaXRsZS5pbm5lclRleHQgPSAnV2VhdGhlcnNlcnZlJztcblxuICAvLyBjcmVhdGUgQVBJIGltYWdlIGNvbnRhaW5lclxuICAvLyBjb25zdCBBUElJbWFnZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAvLyBBUElJbWFnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZUNvbnRhaW5lcicpO1xuXG4gIC8vIGNyZWF0ZSBBUEkgaW1nXG4gIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIEFQSUltYWdlLmNsYXNzTGlzdC5hZGQoJ0FQSUltYWdlJyk7XG5cbiAgLy8gc2VhcmNoIGlucHV0XG4gIGNvbnN0IEFQSVNlYXJjaElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgQVBJU2VhcmNoSW5wdXQuY2xhc3NMaXN0LmFkZCgnQVBJU2VhcmNoSW5wdXQnKTtcbiAgQVBJU2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSAnU2VhdHRsZSc7XG5cbiAgLy8gc2VhcmNoIGJ1dHRvblxuICBjb25zdCBBUElTZWFyY2hCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgQVBJU2VhcmNoQnRuLmNsYXNzTGlzdC5hZGQoJ0FQSVNlYXJjaEJ0bicpO1xuICBBUElTZWFyY2hCdG4uaW5uZXJUZXh0ID0gJ1NlYXJjaCc7XG4gIEFQSVNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEFQSUNpdHlTZWFyY2gpO1xuXG4gIC8vIGVycm9yIGNvbnRhaW5lclxuICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBBUElFcnJvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdBUElFcnJvckNvbnRhaW5lcicpO1xuXG4gIC8vIEFwcGVuZFxuICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElUaXRsZSk7XG4gIC8vIEFQSUltYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKEFQSUltYWdlKTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJU2VhcmNoSW5wdXQpO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElTZWFyY2hCdG4pO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElFcnJvckNvbnRhaW5lcik7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlKTtcbiAgLy8gV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2VDb250YWluZXIpO1xuICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoV2VhdGhlckFQSUNvbnRhaW50ZXIpO1xuXG4gIHJldHVybiBXZWF0aGVyQVBJQ29udGFpbnRlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRlbnRDb250YWluZXIoKSB7XG4gIC8vIGNyZWF0ZSBjb250ZW50IGNvbnRhaW5lclxuICBjb25zdCBjb250ZW50Q29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250ZW50Q29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdjb250ZW50Q29udGFpbmVyJyk7XG4gIFxuICAvLyBjcmVhdGUgd2VhdGhlciBhcHAgXG4gIGNvbnRlbnRDb250YWludGVyLmFwcGVuZENoaWxkKGNyZWF0ZVdlYXRoZXJBUEkoKSk7XG5cbiAgcmV0dXJuIGNvbnRlbnRDb250YWludGVyO1xufVxuIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiY29va2llIiwidG9EaXJlY3Rpb24iLCJkZWdyZWUiLCJjYWxjQ3VycmVudFRpbWUiLCJ0aW1lem9uZSIsImQiLCJEYXRlIiwibG9jYWxUaW1lIiwiZ2V0VGltZSIsImxvY2FsT2Zmc2V0IiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJ1dGMiLCJuZXdDaXR5IiwiY2FsY1N1blRpbWUiLCJ0aW1lIiwiZmV0Y2hIb3VybHlGb3JlY2FzdCIsImNpdHlRdWVyeSIsIkFQSUVycm9yQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImZldGNoIiwibW9kZSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwibmV3SG91cmx5Rm9yZWNhc3RBcnJheSIsImkiLCJuZXdIb3VybHlGb3JlY2FzdCIsImRhdGUiLCJsaXN0IiwiZHRfdHh0IiwiZGF0ZVRleHQiLCJodW1pZGl0eSIsIm1haW4iLCJyYWluQ2hhbmNlIiwicG9wIiwidGVtcGVyYXR1cmUiLCJ0ZW1wIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXIiLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJkZXNjcmlwdGlvbiIsIndpbmREZWdyZWUiLCJ3aW5kIiwiZGVnIiwid2luZERpcmVjdGlvbiIsIndpbmRHdXN0IiwiZ3VzdCIsIndpbmRTcGVlZCIsInNwZWVkIiwicHVzaCIsImNhdGNoIiwiZXJyIiwiaW5uZXJUZXh0IiwiZmV0Y2hDdXJyZW50V2VhdGhlciIsIkFQSUltYWdlIiwibmV3V2VhdGhlckNhcmQiLCJjaXR5IiwibmFtZSIsImNvdW50cnkiLCJzeXMiLCJsb2NhbERhdGUiLCJzdW5yaXNlIiwic3Vuc2V0IiwidGVtcEN1cnJlbnQiLCJ0ZW1wSGlnaCIsInRlbXBfbWF4IiwidGVtcExvdyIsInRlbXBfbWluIiwic3JjIiwiaWNvbiIsIkFQSUNpdHlTZWFyY2giLCJBUElTZWFyY2hJbnB1dCIsInZhbHVlIiwiY3VycmVudFdlYXRoZXIiLCJob3VybHlGb3JlY2FzdCIsIlByb21pc2UiLCJhbGwiLCJ2YWx1ZXMiLCJjcmVhdGVXZWF0aGVyQVBJIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiQVBJVGl0bGUiLCJwbGFjZWhvbGRlciIsIkFQSVNlYXJjaEJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUNvbnRlbnRDb250YWluZXIiLCJjb250ZW50Q29udGFpbnRlciJdLCJzb3VyY2VSb290IjoiIn0=