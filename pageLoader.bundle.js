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
  }).catch(err => {
    console.log(err); // APIErrorContainer.innerText = 'City not found';
  }); // fetch five day forecast

  fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(cityQuery, "&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e"), {
    mode: 'cors'
  }).then(response => response.json()).then(response => {
    console.log(response); // eslint-disable-next-line no-plusplus

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
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFBakM7RUFDQU4sb0JBQW9CLENBQUNRLFdBQXJCLENBQWlDdkMsaUJBQWpDO0VBQ0ErQixvQkFBb0IsQ0FBQ1EsV0FBckIsQ0FBaUN6QyxRQUFqQyxFQXZDNkIsQ0F3QzdCO0VBQ0E7O0VBRUEsT0FBT2lDLG9CQUFQO0FBQ0QsQ0E1Q0Q7O0FBOENlLFNBQVNTLHNCQUFULEdBQWtDO0VBQy9DO0VBQ0EsTUFBTUMsaUJBQWlCLEdBQUdqRCxRQUFRLENBQUN3QyxhQUFULENBQXVCLEtBQXZCLENBQTFCO0VBQ0FTLGlCQUFpQixDQUFDUixTQUFsQixDQUE0QkMsR0FBNUIsQ0FBZ0Msa0JBQWhDLEVBSCtDLENBSy9DOztFQUNBTyxpQkFBaUIsQ0FBQ0YsV0FBbEIsQ0FBOEJULGdCQUFnQixFQUE5QztFQUVBLE9BQU9XLGlCQUFQO0FBQ0QsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcGFnZUxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImRvY3VtZW50LmNvb2tpZSA9ICdTYW1lU2l0ZT1MYXgnO1xuXG5mdW5jdGlvbiB0b0RpcmVjdGlvbihkZWdyZWUpIHtcbiAgaWYoZGVncmVlPjMzNy41KSByZXR1cm4gJ05vcnRoJztcbiAgaWYoZGVncmVlPjI5Mi41KSByZXR1cm4gJ05vcnRoIFdlc3QnO1xuICBpZihkZWdyZWU+MjQ3LjUpIHJldHVybiAnV2VzdCc7XG4gIGlmKGRlZ3JlZT4yMDIuNSkgcmV0dXJuICdTb3V0aCBXZXN0JztcbiAgaWYoZGVncmVlPjE1Ny41KSByZXR1cm4gJ1NvdXRoJztcbiAgaWYoZGVncmVlPjEyMi41KSByZXR1cm4gJ1NvdXRoIEVhc3QnO1xuICBpZihkZWdyZWU+NjcuNSkgcmV0dXJuICdFYXN0JztcbiAgaWYoZGVncmVlPjIyLjUpIHJldHVybiAnTm9ydGggRWFzdCc7XG4gIHJldHVybiAnTm9ydGgnO1xufVxuXG5jb25zdCBmZXRjaFdlYXRoZXIgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUltYWdlJyk7XG4gIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJyk7XG5cbiAgLy8gZmV0Y2ggY3VycmVudCB3ZWF0aGVyXG4gIGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsIHsgbW9kZTogJ2NvcnMnIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICBjb25zb2xlLmxvZygnV2VhdGhlciBjb25kaXRpb246ICcsIHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbik7XG4gICAgICBjb25zb2xlLmxvZygnV2VhdGhlciBkZXNjcmlwdGlvbjogJywgcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbik7XG4gICAgICBjb25zb2xlLmxvZygnSHVtaWRpdHk6ICcsIHJlc3BvbnNlLm1haW4uaHVtaWRpdHkpO1xuICAgICAgY29uc29sZS5sb2coJ1dpbmQgZGVncmVlOiAnLCByZXNwb25zZS53aW5kLmRlZyk7XG4gICAgICBjb25zb2xlLmxvZygnV2luZCBkaXJlY3Rpb246ICcsIHRvRGlyZWN0aW9uKHJlc3BvbnNlLndpbmQuZGVnKSk7XG4gICAgICBjb25zb2xlLmxvZygnV2luZCBTcGVlZDogJywgcmVzcG9uc2Uud2luZC5zcGVlZCk7XG4gICAgICBjb25zb2xlLmxvZygnQ3VycmVudCB0ZW1wZXJhdHVyZTogJywgcmVzcG9uc2UubWFpbi50ZW1wKTtcbiAgICAgIGNvbnNvbGUubG9nKCdMb3cgdGVtcGVyYXR1cmU6ICcsIHJlc3BvbnNlLm1haW4udGVtcF9taW4pO1xuICAgICAgY29uc29sZS5sb2coJ0hpZ2ggdGVtcGVyYXR1cmU6ICcsIHJlc3BvbnNlLm1haW4udGVtcF9tYXgpO1xuICAgICAgQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7cmVzcG9uc2Uud2VhdGhlclswXS5pY29ufUAyeC5wbmdgO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAvLyBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnO1xuICAgIH0pO1xuXG4gIC8vIGZldGNoIGZpdmUgZGF5IGZvcmVjYXN0XG4gIGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UubGlzdFtpXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0KTtcbiAgICAgICAgY29uc29sZS5sb2coJ1dlYXRoZXIgY29uZGl0aW9uOiAnLCByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0ubWFpbik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdXZWF0aGVyIGRlc2NyaXB0aW9uOiAnLCByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uZGVzY3JpcHRpb24pO1xuICAgICAgICBjb25zb2xlLmxvZygnSHVtaWRpdHk6ICcsIHJlc3BvbnNlLmxpc3RbaV0ubWFpbi5odW1pZGl0eSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdXaW5kIGRlZ3JlZTogJywgcmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdXaW5kIGRpcmVjdGlvbjogJywgdG9EaXJlY3Rpb24ocmVzcG9uc2UubGlzdFtpXS5tYWluLnRlbXApKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1dpbmQgU3BlZWQ6ICcsIHJlc3BvbnNlLmxpc3RbaV0ud2luZC5zcGVlZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdXaW5kIEd1c3Q6ICcsIHJlc3BvbnNlLmxpc3RbaV0ud2luZC5ndXN0KTtcbiAgICAgICAgY29uc29sZS5sb2coJ1RlbXBlcmF0dXJlOiAnLCByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCk7XG4gICAgICAgIC8vIC5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uaWNvbn0ucG5nYFxuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnO1xuICAgIH0pO1xufTtcblxuY29uc3QgQVBJQ2l0eVNlYXJjaCA9ICgpID0+IHtcbiAgLy8gZ3JhYiBkb20gZWxlbWVudHNcbiAgY29uc3QgQVBJU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJU2VhcmNoSW5wdXQnKTtcbiAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKTtcbiAgLy8gcmVzZXQgZXJyb3JcbiAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJyc7XG4gIC8vIGNoZWNrIGZvciBzZWFyY2ggdGVybVxuICBpZiAoQVBJU2VhcmNoSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ1doaWNoIGNpdHk/JztcbiAgfSBlbHNlIHtcbiAgICBmZXRjaFdlYXRoZXIoQVBJU2VhcmNoSW5wdXQudmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBjcmVhdGVXZWF0aGVyQVBJID0gKCkgPT4ge1xuICAvLyBjcmVhdGUgV2VhdGhlciBBUEkgY29udGFpbmVyXG4gIGNvbnN0IFdlYXRoZXJBUElDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmNsYXNzTGlzdC5hZGQoJ1dlYXRoZXJBUElDb250YWludGVyJywgJ2NvbnRlbnQnKTtcbiAgLy8gV2VhdGhlckFQSUNvbnRhaW50ZXIuaWQgPSAnJztcblxuICAvLyBjcmVhdGUgQVBJIHRpdGxlXG4gIGNvbnN0IEFQSVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgQVBJVGl0bGUuaW5uZXJUZXh0ID0gJ0FQSSB3ZWF0aGVyIHNlYXJjaCc7XG5cbiAgLy8gY3JlYXRlIEFQSSBpbWFnZSBjb250YWluZXJcbiAgLy8gY29uc3QgQVBJSW1hZ2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgLy8gQVBJSW1hZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2VDb250YWluZXInKTtcblxuICAvLyBjcmVhdGUgQVBJIGltZ1xuICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBBUElJbWFnZS5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZScpO1xuXG4gIC8vIHNlYXJjaCBpbnB1dFxuICBjb25zdCBBUElTZWFyY2hJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIEFQSVNlYXJjaElucHV0LmNsYXNzTGlzdC5hZGQoJ0FQSVNlYXJjaElucHV0Jyk7XG4gIEFQSVNlYXJjaElucHV0LnBsYWNlaG9sZGVyID0gJ1NlYXR0bGUnO1xuXG4gIC8vIHNlYXJjaCBidXR0b25cbiAgY29uc3QgQVBJU2VhcmNoQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIEFQSVNlYXJjaEJ0bi5jbGFzc0xpc3QuYWRkKCdBUElTZWFyY2hCdG4nKTtcbiAgQVBJU2VhcmNoQnRuLmlubmVyVGV4dCA9ICdTZWFyY2gnO1xuICBBUElTZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBBUElDaXR5U2VhcmNoKTtcblxuICAvLyBlcnJvciBjb250YWluZXJcbiAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgQVBJRXJyb3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnQVBJRXJyb3JDb250YWluZXInKTtcblxuICAvLyBBcHBlbmRcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJVGl0bGUpO1xuICAvLyBBUElJbWFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChBUElJbWFnZSk7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVNlYXJjaElucHV0KTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJU2VhcmNoQnRuKTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJRXJyb3JDb250YWluZXIpO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElJbWFnZSk7XG4gIC8vIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlQ29udGFpbmVyKTtcbiAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKFdlYXRoZXJBUElDb250YWludGVyKTtcblxuICByZXR1cm4gV2VhdGhlckFQSUNvbnRhaW50ZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb250ZW50Q29udGFpbmVyKCkge1xuICAvLyBjcmVhdGUgY29udGVudCBjb250YWluZXJcbiAgY29uc3QgY29udGVudENvbnRhaW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGVudENvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnY29udGVudENvbnRhaW5lcicpO1xuICBcbiAgLy8gY3JlYXRlIHdlYXRoZXIgYXBwIFxuICBjb250ZW50Q29udGFpbnRlci5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQVBJKCkpO1xuXG4gIHJldHVybiBjb250ZW50Q29udGFpbnRlcjtcbn1cbiJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImNvb2tpZSIsInRvRGlyZWN0aW9uIiwiZGVncmVlIiwiZmV0Y2hXZWF0aGVyIiwiY2l0eVF1ZXJ5IiwiQVBJSW1hZ2UiLCJxdWVyeVNlbGVjdG9yIiwiQVBJRXJyb3JDb250YWluZXIiLCJmZXRjaCIsIm1vZGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY29uc29sZSIsImxvZyIsIndlYXRoZXIiLCJtYWluIiwiZGVzY3JpcHRpb24iLCJodW1pZGl0eSIsIndpbmQiLCJkZWciLCJzcGVlZCIsInRlbXAiLCJ0ZW1wX21pbiIsInRlbXBfbWF4Iiwic3JjIiwiaWNvbiIsImNhdGNoIiwiZXJyIiwiaSIsImxpc3QiLCJkdF90eHQiLCJndXN0IiwiaW5uZXJUZXh0IiwiQVBJQ2l0eVNlYXJjaCIsIkFQSVNlYXJjaElucHV0IiwidmFsdWUiLCJjcmVhdGVXZWF0aGVyQVBJIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiQVBJVGl0bGUiLCJwbGFjZWhvbGRlciIsIkFQSVNlYXJjaEJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUNvbnRlbnRDb250YWluZXIiLCJjb250ZW50Q29udGFpbnRlciJdLCJzb3VyY2VSb290IjoiIn0=