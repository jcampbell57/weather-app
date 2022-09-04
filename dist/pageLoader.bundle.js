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
    fetchCurrentWeather(APISearchInput.value);
    fetchHourlyForecast(APISearchInput.value);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (APICitySearch);

/***/ }),

/***/ "./src/assets/logoIcon.svg":
/*!*********************************!*\
  !*** ./src/assets/logoIcon.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0f7071ee409c5ab2c6e5.svg";

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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
/* harmony export */   "default": () => (/* binding */ initialize)
/* harmony export */ });
/* harmony import */ var _assets_logoIcon_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/logoIcon.svg */ "./src/assets/logoIcon.svg");
/* harmony import */ var _weatherAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherAPI */ "./src/weatherAPI.js");



const createHeader = () => {
  const header = document.createElement('header'); // display logo

  const logo = document.createElement('img');
  logo.src = _assets_logoIcon_svg__WEBPACK_IMPORTED_MODULE_0__;
  logo.target = '_blank';
  logo.setAttribute('class', 'logo');
  header.appendChild(logo); // display title

  const title = document.createElement('h1');
  title.textContent = 'Weatherserve';
  header.appendChild(title);
  return header;
};

const createMenu = () => {};

const createWeatherAPI = () => {
  // create Weather API container
  const WeatherAPIContainter = document.createElement('div');
  WeatherAPIContainter.classList.add('WeatherAPIContainter', 'content'); // WeatherAPIContainter.id = '';
  // create API image container
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
  APISearchBtn.addEventListener('click', _weatherAPI__WEBPACK_IMPORTED_MODULE_1__["default"]); // error container

  const APIErrorContainer = document.createElement('div');
  APIErrorContainer.classList.add('APIErrorContainer'); // Append
  // APIImageContainer.appendChild(APIImage);

  WeatherAPIContainter.appendChild(APISearchInput);
  WeatherAPIContainter.appendChild(APISearchBtn);
  WeatherAPIContainter.appendChild(APIErrorContainer);
  WeatherAPIContainter.appendChild(APIImage); // WeatherAPIContainter.appendChild(APIImageContainer);
  // container.appendChild(WeatherAPIContainter);

  return WeatherAPIContainter;
};

const createContent = () => {
  // create content container
  const contentContainter = document.createElement('div');
  contentContainter.classList.add('contentContainer'); // create weather app

  contentContainter.appendChild(createWeatherAPI());
  return contentContainter;
};

const createFooter = () => {};

function initialize() {
  document.body.appendChild(createHeader());
  document.body.appendChild(createContent());
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE0QkMsR0FBNUIsQ0FBZ0MsbUJBQWhDLEVBM0IyQixDQTZCM0I7RUFDQTs7RUFDQUYsb0JBQW9CLENBQUNMLFdBQXJCLENBQWlDVCxjQUFqQztFQUNBYyxvQkFBb0IsQ0FBQ0wsV0FBckIsQ0FBaUNTLFlBQWpDO0VBQ0FKLG9CQUFvQixDQUFDTCxXQUFyQixDQUFpQ2pFLGlCQUFqQztFQUNBc0Usb0JBQW9CLENBQUNMLFdBQXJCLENBQWlDMUIsUUFBakMsRUFsQzJCLENBbUMzQjtFQUNBOztFQUVBLE9BQU8rQixvQkFBUDtBQUNILENBdkNEOztBQXlDQSxNQUFNTSxhQUFhLEdBQUcsTUFBTTtFQUN4QjtFQUNBLE1BQU1DLGlCQUFpQixHQUFHL0YsUUFBUSxDQUFDK0UsYUFBVCxDQUF1QixLQUF2QixDQUExQjtFQUNBZ0IsaUJBQWlCLENBQUNOLFNBQWxCLENBQTRCQyxHQUE1QixDQUFnQyxrQkFBaEMsRUFId0IsQ0FLeEI7O0VBQ0FLLGlCQUFpQixDQUFDWixXQUFsQixDQUE4QkksZ0JBQWdCLEVBQTlDO0VBRUEsT0FBT1EsaUJBQVA7QUFDSCxDQVREOztBQVdBLE1BQU1DLFlBQVksR0FBRyxNQUFNLENBQUUsQ0FBN0I7O0FBRWUsU0FBU0MsVUFBVCxHQUFzQjtFQUNqQ2pHLFFBQVEsQ0FBQ2tHLElBQVQsQ0FBY2YsV0FBZCxDQUEwQk4sWUFBWSxFQUF0QztFQUNBN0UsUUFBUSxDQUFDa0csSUFBVCxDQUFjZixXQUFkLENBQTBCVyxhQUFhLEVBQXZDO0FBQ0gsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3dlYXRoZXJBUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuY29va2llID0gJ1NhbWVTaXRlPUxheCdcblxuZnVuY3Rpb24gdG9EaXJlY3Rpb24oZGVncmVlKSB7XG4gICAgaWYgKGRlZ3JlZSA+IDMzNy41KSByZXR1cm4gJ05vcnRoJ1xuICAgIGlmIChkZWdyZWUgPiAyOTIuNSkgcmV0dXJuICdOb3J0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyNDcuNSkgcmV0dXJuICdXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMDIuNSkgcmV0dXJuICdTb3V0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAxNTcuNSkgcmV0dXJuICdTb3V0aCdcbiAgICBpZiAoZGVncmVlID4gMTIyLjUpIHJldHVybiAnU291dGggRWFzdCdcbiAgICBpZiAoZGVncmVlID4gNjcuNSkgcmV0dXJuICdFYXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMi41KSByZXR1cm4gJ05vcnRoIEVhc3QnXG4gICAgcmV0dXJuICdOb3J0aCdcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjIzNzYxMTUvaG93LXRvLW9idGFpbi1vcGVuLXdlYXRoZXItYXBpLWRhdGUtdGltZS1mcm9tLWNpdHktYmVpbmctZmV0Y2hlZFxuY29uc3QgY2FsY0N1cnJlbnRUaW1lID0gKHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbFRpbWUgPSBkLmdldFRpbWUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSBsb2NhbFRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuY29uc3QgY2FsY1N1blRpbWUgPSAodGltZSwgdGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSB0aW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbi8vIGNvbnN0IGZldGNoRGFpbHlGb3JlY2FzdCA9IChsYXQsIGxvbikgPT4ge1xuLy8gICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElFcnJvckNvbnRhaW5lcicpO1xuLy8gICBjb25zb2xlLmxvZyhsYXQpO1xuLy8gICBjb25zb2xlLmxvZyhsb24pO1xuLy8gICAvLyBmZXRjaCBzZXZlbiBkYXkgZm9yZWNhc3Rcbi8vICAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZleGNsdWRlPW1pbnV0ZWx5LGhvdXJseSxhbGVydHMmdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuLy8gICAgIH0pXG4vLyAgICAgLmNhdGNoKChlcnIpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuY29uc3QgZmV0Y2hIb3VybHlGb3JlY2FzdCA9IChjaXR5UXVlcnkpID0+IHtcbiAgICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElFcnJvckNvbnRhaW5lcicpXG4gICAgLy8gZmV0Y2ggZml2ZSBkYXkvdGhyZWUgaG91ciBmb3JlY2FzdFxuICAgIGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCxcbiAgICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdEFycmF5ID0gW11cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5pY29ufS5wbmdgXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0KSxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRleHQ6IHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0LFxuICAgICAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubGlzdFtpXS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgICAgICByYWluQ2hhbmNlOiByZXNwb25zZS5saXN0W2ldLnBvcCAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcsXG4gICAgICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcpLFxuICAgICAgICAgICAgICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2UubGlzdFtpXS53aW5kLmd1c3QsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2UubGlzdFtpXS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5LnB1c2gobmV3SG91cmx5Rm9yZWNhc3QpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdIb3VybHlGb3JlY2FzdEFycmF5KVxuICAgICAgICAgICAgcmV0dXJuIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgZmV0Y2hDdXJyZW50V2VhdGhlciA9IChjaXR5UXVlcnkpID0+IHtcbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKVxuXG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgLy8gY29uc3Qge2xhdH0gPSByZXNwb25zZS5jb29yZDtcbiAgICAgICAgICAgIC8vIGNvbnN0IHtsb259ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAgICAgICAvLyBmZXRjaERhaWx5Rm9yZWNhc3QobGF0LCBsb24pO1xuICAgICAgICAgICAgY29uc3QgbmV3V2VhdGhlckNhcmQgPSB7XG4gICAgICAgICAgICAgICAgY2l0eTogcmVzcG9uc2UubmFtZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXNwb25zZS5zeXMuY291bnRyeSxcbiAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICBsb2NhbERhdGU6IGNhbGNDdXJyZW50VGltZShyZXNwb25zZS50aW1lem9uZSksXG4gICAgICAgICAgICAgICAgc3VucmlzZTogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5yaXNlICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHN1bnNldDogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5zZXQgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGVtcEN1cnJlbnQ6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICB0ZW1wSGlnaDogcmVzcG9uc2UubWFpbi50ZW1wX21heCxcbiAgICAgICAgICAgICAgICB0ZW1wTG93OiByZXNwb25zZS5tYWluLnRlbXBfbWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2Uud2luZC5kZWcsXG4gICAgICAgICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2Uud2luZC5kZWcpLFxuICAgICAgICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2Uud2luZC5zcGVlZCxcbiAgICAgICAgICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2Uud2luZC5ndXN0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7cmVzcG9uc2Uud2VhdGhlclswXS5pY29ufUAyeC5wbmdgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdXZWF0aGVyQ2FyZClcbiAgICAgICAgICAgIHJldHVybiBuZXdXZWF0aGVyQ2FyZFxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJ1xuICAgICAgICB9KVxufVxuXG5jb25zdCBBUElDaXR5U2VhcmNoID0gKCkgPT4ge1xuICAgIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gICAgY29uc3QgQVBJU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJU2VhcmNoSW5wdXQnKVxuICAgIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJylcbiAgICAvLyByZXNldCBlcnJvclxuICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICcnXG4gICAgLy8gY2hlY2sgZm9yIHNlYXJjaCB0ZXJtXG4gICAgaWYgKEFQSVNlYXJjaElucHV0LnZhbHVlID09PSAnJykge1xuICAgICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZmV0Y2hDdXJyZW50V2VhdGhlcihBUElTZWFyY2hJbnB1dC52YWx1ZSlcbiAgICAgICAgZmV0Y2hIb3VybHlGb3JlY2FzdChBUElTZWFyY2hJbnB1dC52YWx1ZSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFQSUNpdHlTZWFyY2hcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCBsb2dvSWNvbiBmcm9tICcuL2Fzc2V0cy9sb2dvSWNvbi5zdmcnXG5pbXBvcnQgQVBJQ2l0eVNlYXJjaCBmcm9tICcuL3dlYXRoZXJBUEknXG5cbmNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKVxuXG4gICAgLy8gZGlzcGxheSBsb2dvXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbG9nby5zcmMgPSBsb2dvSWNvblxuICAgIGxvZ28udGFyZ2V0ID0gJ19ibGFuaydcbiAgICBsb2dvLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbG9nbycpXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGxvZ28pXG5cbiAgICAvLyBkaXNwbGF5IHRpdGxlXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnV2VhdGhlcnNlcnZlJ1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSlcblxuICAgIHJldHVybiBoZWFkZXJcbn1cblxuY29uc3QgY3JlYXRlTWVudSA9ICgpID0+IHt9XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJBUEkgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICAgIGNvbnN0IFdlYXRoZXJBUElDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50JylcbiAgICAvLyBXZWF0aGVyQVBJQ29udGFpbnRlci5pZCA9ICcnO1xuXG4gICAgLy8gY3JlYXRlIEFQSSBpbWFnZSBjb250YWluZXJcbiAgICAvLyBjb25zdCBBUElJbWFnZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIC8vIEFQSUltYWdlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ0FQSUltYWdlQ29udGFpbmVyJyk7XG5cbiAgICAvLyBjcmVhdGUgQVBJIGltZ1xuICAgIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBBUElJbWFnZS5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZScpXG5cbiAgICAvLyBzZWFyY2ggaW5wdXRcbiAgICBjb25zdCBBUElTZWFyY2hJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBBUElTZWFyY2hJbnB1dC5jbGFzc0xpc3QuYWRkKCdBUElTZWFyY2hJbnB1dCcpXG4gICAgQVBJU2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSAnU2VhdHRsZSdcblxuICAgIC8vIHNlYXJjaCBidXR0b25cbiAgICBjb25zdCBBUElTZWFyY2hCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIEFQSVNlYXJjaEJ0bi5jbGFzc0xpc3QuYWRkKCdBUElTZWFyY2hCdG4nKVxuICAgIEFQSVNlYXJjaEJ0bi5pbm5lclRleHQgPSAnU2VhcmNoJ1xuICAgIEFQSVNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEFQSUNpdHlTZWFyY2gpXG5cbiAgICAvLyBlcnJvciBjb250YWluZXJcbiAgICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgQVBJRXJyb3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnQVBJRXJyb3JDb250YWluZXInKVxuXG4gICAgLy8gQXBwZW5kXG4gICAgLy8gQVBJSW1hZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpO1xuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVNlYXJjaElucHV0KVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVNlYXJjaEJ0bilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElFcnJvckNvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElJbWFnZSlcbiAgICAvLyBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElJbWFnZUNvbnRhaW5lcik7XG4gICAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKFdlYXRoZXJBUElDb250YWludGVyKTtcblxuICAgIHJldHVybiBXZWF0aGVyQVBJQ29udGFpbnRlclxufVxuXG5jb25zdCBjcmVhdGVDb250ZW50ID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBjb250ZW50IGNvbnRhaW5lclxuICAgIGNvbnN0IGNvbnRlbnRDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50Q29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdjb250ZW50Q29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSB3ZWF0aGVyIGFwcFxuICAgIGNvbnRlbnRDb250YWludGVyLmFwcGVuZENoaWxkKGNyZWF0ZVdlYXRoZXJBUEkoKSlcblxuICAgIHJldHVybiBjb250ZW50Q29udGFpbnRlclxufVxuXG5jb25zdCBjcmVhdGVGb290ZXIgPSAoKSA9PiB7fVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlSGVhZGVyKCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVDb250ZW50KCkpXG59XG4iXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJjb29raWUiLCJ0b0RpcmVjdGlvbiIsImRlZ3JlZSIsImNhbGNDdXJyZW50VGltZSIsInRpbWV6b25lIiwiZCIsIkRhdGUiLCJsb2NhbFRpbWUiLCJnZXRUaW1lIiwibG9jYWxPZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsInV0YyIsIm5ld0NpdHkiLCJjYWxjU3VuVGltZSIsInRpbWUiLCJmZXRjaEhvdXJseUZvcmVjYXN0IiwiY2l0eVF1ZXJ5IiwiQVBJRXJyb3JDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJuZXdIb3VybHlGb3JlY2FzdEFycmF5IiwiaSIsIm5ld0hvdXJseUZvcmVjYXN0IiwiZGF0ZSIsImxpc3QiLCJkdF90eHQiLCJkYXRlVGV4dCIsImh1bWlkaXR5IiwibWFpbiIsInJhaW5DaGFuY2UiLCJwb3AiLCJ0ZW1wZXJhdHVyZSIsInRlbXAiLCJ3ZWF0aGVyQ29uZGl0aW9uIiwid2VhdGhlciIsIndlYXRoZXJEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwid2luZERlZ3JlZSIsIndpbmQiLCJkZWciLCJ3aW5kRGlyZWN0aW9uIiwid2luZEd1c3QiLCJndXN0Iiwid2luZFNwZWVkIiwic3BlZWQiLCJwdXNoIiwiY2F0Y2giLCJlcnIiLCJpbm5lclRleHQiLCJmZXRjaEN1cnJlbnRXZWF0aGVyIiwiQVBJSW1hZ2UiLCJuZXdXZWF0aGVyQ2FyZCIsImNpdHkiLCJuYW1lIiwiY291bnRyeSIsInN5cyIsImxvY2FsRGF0ZSIsInN1bnJpc2UiLCJzdW5zZXQiLCJ0ZW1wQ3VycmVudCIsInRlbXBIaWdoIiwidGVtcF9tYXgiLCJ0ZW1wTG93IiwidGVtcF9taW4iLCJzcmMiLCJpY29uIiwiQVBJQ2l0eVNlYXJjaCIsIkFQSVNlYXJjaElucHV0IiwidmFsdWUiLCJsb2dvSWNvbiIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImNyZWF0ZUVsZW1lbnQiLCJsb2dvIiwidGFyZ2V0Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJ0aXRsZSIsInRleHRDb250ZW50IiwiY3JlYXRlTWVudSIsImNyZWF0ZVdlYXRoZXJBUEkiLCJXZWF0aGVyQVBJQ29udGFpbnRlciIsImNsYXNzTGlzdCIsImFkZCIsInBsYWNlaG9sZGVyIiwiQVBJU2VhcmNoQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNyZWF0ZUNvbnRlbnQiLCJjb250ZW50Q29udGFpbnRlciIsImNyZWF0ZUZvb3RlciIsImluaXRpYWxpemUiLCJib2R5Il0sInNvdXJjZVJvb3QiOiIifQ==