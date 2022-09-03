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
  const APIErrorContainer = document.querySelector('.APIErrorContainer'); // https://stackoverflow.com/questions/62376115/how-to-obtain-open-weather-api-date-time-from-city-being-fetched

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
  }; // fetch current weather


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFyQixDQUFpQ0YsWUFBakM7RUFDQU4sb0JBQW9CLENBQUNRLFdBQXJCLENBQWlDMUUsaUJBQWpDO0VBQ0FrRSxvQkFBb0IsQ0FBQ1EsV0FBckIsQ0FBaUM1RSxRQUFqQyxFQXZDNkIsQ0F3QzdCO0VBQ0E7O0VBRUEsT0FBT29FLG9CQUFQO0FBQ0QsQ0E1Q0Q7O0FBOENlLFNBQVNTLHNCQUFULEdBQWtDO0VBQy9DO0VBQ0EsTUFBTUMsaUJBQWlCLEdBQUdwRixRQUFRLENBQUMyRSxhQUFULENBQXVCLEtBQXZCLENBQTFCO0VBQ0FTLGlCQUFpQixDQUFDUixTQUFsQixDQUE0QkMsR0FBNUIsQ0FBZ0Msa0JBQWhDLEVBSCtDLENBSy9DOztFQUNBTyxpQkFBaUIsQ0FBQ0YsV0FBbEIsQ0FBOEJULGdCQUFnQixFQUE5QztFQUVBLE9BQU9XLGlCQUFQO0FBQ0QsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcGFnZUxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImRvY3VtZW50LmNvb2tpZSA9ICdTYW1lU2l0ZT1MYXgnO1xuXG5mdW5jdGlvbiB0b0RpcmVjdGlvbihkZWdyZWUpIHtcbiAgaWYoZGVncmVlPjMzNy41KSByZXR1cm4gJ05vcnRoJztcbiAgaWYoZGVncmVlPjI5Mi41KSByZXR1cm4gJ05vcnRoIFdlc3QnO1xuICBpZihkZWdyZWU+MjQ3LjUpIHJldHVybiAnV2VzdCc7XG4gIGlmKGRlZ3JlZT4yMDIuNSkgcmV0dXJuICdTb3V0aCBXZXN0JztcbiAgaWYoZGVncmVlPjE1Ny41KSByZXR1cm4gJ1NvdXRoJztcbiAgaWYoZGVncmVlPjEyMi41KSByZXR1cm4gJ1NvdXRoIEVhc3QnO1xuICBpZihkZWdyZWU+NjcuNSkgcmV0dXJuICdFYXN0JztcbiAgaWYoZGVncmVlPjIyLjUpIHJldHVybiAnTm9ydGggRWFzdCc7XG4gIHJldHVybiAnTm9ydGgnO1xufVxuXG5jb25zdCBmZXRjaFdlYXRoZXIgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUltYWdlJyk7XG4gIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJyk7XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYyMzc2MTE1L2hvdy10by1vYnRhaW4tb3Blbi13ZWF0aGVyLWFwaS1kYXRlLXRpbWUtZnJvbS1jaXR5LWJlaW5nLWZldGNoZWRcbmNvbnN0IGNhbGNDdXJyZW50VGltZSA9ICh0aW1lem9uZSkgPT4ge1xuICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgY29uc3QgbG9jYWxUaW1lID0gZC5nZXRUaW1lKCk7XG4gIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDA7XG4gIGNvbnN0IHV0YyA9IGxvY2FsVGltZSArIGxvY2FsT2Zmc2V0O1xuICBjb25zdCBuZXdDaXR5ID0gdXRjICsgKDEwMDAgKiB0aW1lem9uZSlcbiAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpO1xufVxuXG5jb25zdCBjYWxjU3VuVGltZSA9ICh0aW1lLCB0aW1lem9uZSkgPT4ge1xuICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMDtcbiAgY29uc3QgdXRjID0gdGltZSArIGxvY2FsT2Zmc2V0O1xuICBjb25zdCBuZXdDaXR5ID0gdXRjICsgKDEwMDAgKiB0aW1lem9uZSlcbiAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpO1xufVxuXG4gIC8vIGZldGNoIGN1cnJlbnQgd2VhdGhlclxuICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7cmVzcG9uc2Uud2VhdGhlclswXS5pY29ufUAyeC5wbmdgO1xuICAgICAgY29uc3QgbmV3V2VhdGhlckNhcmQgPSB7XG4gICAgICAgIGNpdHk6IHJlc3BvbnNlLm5hbWUsXG4gICAgICAgIGNvdW50cnk6IHJlc3BvbnNlLnN5cy5jb3VudHJ5LFxuICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgICAgbG9jYWxEYXRlOiBjYWxjQ3VycmVudFRpbWUocmVzcG9uc2UudGltZXpvbmUpLFxuICAgICAgICBzdW5yaXNlOiBjYWxjU3VuVGltZShyZXNwb25zZS5zeXMuc3VucmlzZSAqIDEwMDAsIHJlc3BvbnNlLnRpbWV6b25lKSxcbiAgICAgICAgc3Vuc2V0OiBjYWxjU3VuVGltZShyZXNwb25zZS5zeXMuc3Vuc2V0ICogMTAwMCwgcmVzcG9uc2UudGltZXpvbmUpLCBcbiAgICAgICAgdGVtcEN1cnJlbnQ6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgICAgdGVtcEhpZ2g6IHJlc3BvbnNlLm1haW4udGVtcF9tYXgsXG4gICAgICAgIHRlbXBMb3c6IHJlc3BvbnNlLm1haW4udGVtcF9taW4sXG4gICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS53aW5kLmRlZyxcbiAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2Uud2luZC5kZWcpLFxuICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLndpbmQuc3BlZWQsXG4gICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS53aW5kLmd1c3RcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgcmV0dXJuIG5ld1dlYXRoZXJDYXJkXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIC8vIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCc7XG4gICAgfSk7XG5cbiAgLy8gZmV0Y2ggZml2ZSBkYXkgZm9yZWNhc3RcbiAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsIHsgbW9kZTogJ2NvcnMnIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICBjb25zdCBuZXdXZWF0aGVyRm9yZWNhc3RBcnJheSA9IFtdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHtcbiAgICAgICAgLy8gLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5pY29ufS5wbmdgXG4gICAgICAgIGNvbnN0IG5ld1dlYXRoZXJGb3JlY2FzdCA9IHtcbiAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShyZXNwb25zZS5saXN0W2ldLmR0X3R4dCksXG4gICAgICAgICAgZGF0ZVRleHQ6IHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0LFxuICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5saXN0W2ldLm1haW4uaHVtaWRpdHksXG4gICAgICAgICAgdGVtcGVyYXR1cmU6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi50ZW1wLFxuICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcsXG4gICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyksXG4gICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5ndXN0LFxuICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2UubGlzdFtpXS53aW5kLnNwZWVkLFxuICAgICAgICB9XG4gICAgICAgIG5ld1dlYXRoZXJGb3JlY2FzdEFycmF5LnB1c2gobmV3V2VhdGhlckZvcmVjYXN0KVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2cobmV3V2VhdGhlckZvcmVjYXN0QXJyYXkpXG4gICAgICByZXR1cm4gbmV3V2VhdGhlckZvcmVjYXN0QXJyYXlcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJztcbiAgICB9KTtcbn07XG5cbmNvbnN0IEFQSUNpdHlTZWFyY2ggPSAoKSA9PiB7XG4gIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gIGNvbnN0IEFQSVNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSVNlYXJjaElucHV0Jyk7XG4gIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJyk7XG4gIC8vIHJlc2V0IGVycm9yXG4gIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICcnO1xuICAvLyBjaGVjayBmb3Igc2VhcmNoIHRlcm1cbiAgaWYgKEFQSVNlYXJjaElucHV0LnZhbHVlID09PSAnJykge1xuICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5Pyc7XG4gIH0gZWxzZSB7XG4gICAgZmV0Y2hXZWF0aGVyKEFQSVNlYXJjaElucHV0LnZhbHVlKTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlV2VhdGhlckFQSSA9ICgpID0+IHtcbiAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICBjb25zdCBXZWF0aGVyQVBJQ29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50Jyk7XG4gIC8vIFdlYXRoZXJBUElDb250YWludGVyLmlkID0gJyc7XG5cbiAgLy8gY3JlYXRlIEFQSSB0aXRsZVxuICBjb25zdCBBUElUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gIEFQSVRpdGxlLmlubmVyVGV4dCA9ICdXZWF0aGVyc2VydmUnO1xuXG4gIC8vIGNyZWF0ZSBBUEkgaW1hZ2UgY29udGFpbmVyXG4gIC8vIGNvbnN0IEFQSUltYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIC8vIEFQSUltYWdlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ0FQSUltYWdlQ29udGFpbmVyJyk7XG5cbiAgLy8gY3JlYXRlIEFQSSBpbWdcbiAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgQVBJSW1hZ2UuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2UnKTtcblxuICAvLyBzZWFyY2ggaW5wdXRcbiAgY29uc3QgQVBJU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBBUElTZWFyY2hJbnB1dC5jbGFzc0xpc3QuYWRkKCdBUElTZWFyY2hJbnB1dCcpO1xuICBBUElTZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9ICdTZWF0dGxlJztcblxuICAvLyBzZWFyY2ggYnV0dG9uXG4gIGNvbnN0IEFQSVNlYXJjaEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBBUElTZWFyY2hCdG4uY2xhc3NMaXN0LmFkZCgnQVBJU2VhcmNoQnRuJyk7XG4gIEFQSVNlYXJjaEJ0bi5pbm5lclRleHQgPSAnU2VhcmNoJztcbiAgQVBJU2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgQVBJQ2l0eVNlYXJjaCk7XG5cbiAgLy8gZXJyb3IgY29udGFpbmVyXG4gIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIEFQSUVycm9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ0FQSUVycm9yQ29udGFpbmVyJyk7XG5cbiAgLy8gQXBwZW5kXG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVRpdGxlKTtcbiAgLy8gQVBJSW1hZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElTZWFyY2hJbnB1dCk7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVNlYXJjaEJ0bik7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUVycm9yQ29udGFpbmVyKTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpO1xuICAvLyBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElJbWFnZUNvbnRhaW5lcik7XG4gIC8vIGNvbnRhaW5lci5hcHBlbmRDaGlsZChXZWF0aGVyQVBJQ29udGFpbnRlcik7XG5cbiAgcmV0dXJuIFdlYXRoZXJBUElDb250YWludGVyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29udGVudENvbnRhaW5lcigpIHtcbiAgLy8gY3JlYXRlIGNvbnRlbnQgY29udGFpbmVyXG4gIGNvbnN0IGNvbnRlbnRDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRlbnRDb250YWludGVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnRDb250YWluZXInKTtcbiAgXG4gIC8vIGNyZWF0ZSB3ZWF0aGVyIGFwcCBcbiAgY29udGVudENvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoY3JlYXRlV2VhdGhlckFQSSgpKTtcblxuICByZXR1cm4gY29udGVudENvbnRhaW50ZXI7XG59XG4iXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJjb29raWUiLCJ0b0RpcmVjdGlvbiIsImRlZ3JlZSIsImZldGNoV2VhdGhlciIsImNpdHlRdWVyeSIsIkFQSUltYWdlIiwicXVlcnlTZWxlY3RvciIsIkFQSUVycm9yQ29udGFpbmVyIiwiY2FsY0N1cnJlbnRUaW1lIiwidGltZXpvbmUiLCJkIiwiRGF0ZSIsImxvY2FsVGltZSIsImdldFRpbWUiLCJsb2NhbE9mZnNldCIsImdldFRpbWV6b25lT2Zmc2V0IiwidXRjIiwibmV3Q2l0eSIsImNhbGNTdW5UaW1lIiwidGltZSIsImZldGNoIiwibW9kZSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwic3JjIiwid2VhdGhlciIsImljb24iLCJuZXdXZWF0aGVyQ2FyZCIsImNpdHkiLCJuYW1lIiwiY291bnRyeSIsInN5cyIsImh1bWlkaXR5IiwibWFpbiIsImxvY2FsRGF0ZSIsInN1bnJpc2UiLCJzdW5zZXQiLCJ0ZW1wQ3VycmVudCIsInRlbXAiLCJ0ZW1wSGlnaCIsInRlbXBfbWF4IiwidGVtcExvdyIsInRlbXBfbWluIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXJEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwid2luZERlZ3JlZSIsIndpbmQiLCJkZWciLCJ3aW5kRGlyZWN0aW9uIiwid2luZFNwZWVkIiwic3BlZWQiLCJ3aW5kR3VzdCIsImd1c3QiLCJjYXRjaCIsImVyciIsIm5ld1dlYXRoZXJGb3JlY2FzdEFycmF5IiwiaSIsIm5ld1dlYXRoZXJGb3JlY2FzdCIsImRhdGUiLCJsaXN0IiwiZHRfdHh0IiwiZGF0ZVRleHQiLCJ0ZW1wZXJhdHVyZSIsInB1c2giLCJpbm5lclRleHQiLCJBUElDaXR5U2VhcmNoIiwiQVBJU2VhcmNoSW5wdXQiLCJ2YWx1ZSIsImNyZWF0ZVdlYXRoZXJBUEkiLCJXZWF0aGVyQVBJQ29udGFpbnRlciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJBUElUaXRsZSIsInBsYWNlaG9sZGVyIiwiQVBJU2VhcmNoQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFwcGVuZENoaWxkIiwiY3JlYXRlQ29udGVudENvbnRhaW5lciIsImNvbnRlbnRDb250YWludGVyIl0sInNvdXJjZVJvb3QiOiIifQ==