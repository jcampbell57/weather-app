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

const fetchWeather = cityQuery => {
  const APIImage = document.querySelector('.APIImage');
  const APIErrorContainer = document.querySelector('.APIErrorContainer'); // fetch current weather

  fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(cityQuery, "&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e"), {
    mode: 'cors'
  }).then(response => response.json()).then(response => {
    console.log(response);
    console.log('Weather condition: ', response.weather[0].main);
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
      console.log('Temperature: ', response.list[i].main.temp);
    } // console.log('Weather condition: ', response.list.weather.main);
    // console.log('Main temperature: ', response.list.main.temp);
    // console.log('Low temperature: ', response.list.main.temp_min);
    // console.log('High temperature: ', response.list.main.temp_max);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVksQ0FBQ1gsU0FBYixHQUF5QixRQUF6QjtFQUNBVyxZQUFZLENBQUNDLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDWCxhQUF2QyxFQTNCNkIsQ0E2QjdCOztFQUNBLE1BQU1yQixpQkFBaUIsR0FBR04sUUFBUSxDQUFDZ0MsYUFBVCxDQUF1QixLQUF2QixDQUExQjtFQUNBMUIsaUJBQWlCLENBQUMyQixTQUFsQixDQUE0QkMsR0FBNUIsQ0FBZ0MsbUJBQWhDLEVBL0I2QixDQWlDN0I7O0VBQ0FILG9CQUFvQixDQUFDUSxXQUFyQixDQUFpQ0osUUFBakMsRUFsQzZCLENBbUM3Qjs7RUFDQUosb0JBQW9CLENBQUNRLFdBQXJCLENBQWlDWCxjQUFqQztFQUNBRyxvQkFBb0IsQ0FBQ1EsV0FBckIsQ0FBaUNGLFlBQWpDO0VBQ0FOLG9CQUFvQixDQUFDUSxXQUFyQixDQUFpQ2pDLGlCQUFqQztFQUNBeUIsb0JBQW9CLENBQUNRLFdBQXJCLENBQWlDbkMsUUFBakMsRUF2QzZCLENBd0M3QjtFQUNBOztFQUVBLE9BQU8yQixvQkFBUDtBQUNELENBNUNEOztBQThDZSxTQUFTUyxzQkFBVCxHQUFrQztFQUMvQztFQUNBLE1BQU1DLGlCQUFpQixHQUFHekMsUUFBUSxDQUFDZ0MsYUFBVCxDQUF1QixLQUF2QixDQUExQjtFQUNBUyxpQkFBaUIsQ0FBQ1IsU0FBbEIsQ0FBNEJDLEdBQTVCLENBQWdDLGtCQUFoQyxFQUgrQyxDQUsvQzs7RUFDQU8saUJBQWlCLENBQUNGLFdBQWxCLENBQThCVCxnQkFBZ0IsRUFBOUM7RUFFQSxPQUFPVyxpQkFBUDtBQUNELEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJkb2N1bWVudC5jb29raWUgPSAnU2FtZVNpdGU9TGF4JztcblxuY29uc3QgZmV0Y2hXZWF0aGVyID0gKGNpdHlRdWVyeSkgPT4ge1xuICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpO1xuICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElFcnJvckNvbnRhaW5lcicpO1xuXG4gIC8vIGZldGNoIGN1cnJlbnQgd2VhdGhlclxuICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgY29uc29sZS5sb2coJ1dlYXRoZXIgY29uZGl0aW9uOiAnLCByZXNwb25zZS53ZWF0aGVyWzBdLm1haW4pO1xuICAgICAgY29uc29sZS5sb2coJ0N1cnJlbnQgdGVtcGVyYXR1cmU6ICcsIHJlc3BvbnNlLm1haW4udGVtcCk7XG4gICAgICBjb25zb2xlLmxvZygnTG93IHRlbXBlcmF0dXJlOiAnLCByZXNwb25zZS5tYWluLnRlbXBfbWluKTtcbiAgICAgIGNvbnNvbGUubG9nKCdIaWdoIHRlbXBlcmF0dXJlOiAnLCByZXNwb25zZS5tYWluLnRlbXBfbWF4KTtcbiAgICAgIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYDtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgLy8gQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJztcbiAgICB9KTtcblxuICAvLyBmZXRjaCBmaXZlIGRheSBmb3JlY2FzdFxuICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCwgeyBtb2RlOiAnY29ycycgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLmxpc3RbaV0pO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5saXN0W2ldLmR0X3R4dCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUZW1wZXJhdHVyZTogJywgcmVzcG9uc2UubGlzdFtpXS5tYWluLnRlbXApO1xuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2coJ1dlYXRoZXIgY29uZGl0aW9uOiAnLCByZXNwb25zZS5saXN0LndlYXRoZXIubWFpbik7XG4gICAgICAvLyBjb25zb2xlLmxvZygnTWFpbiB0ZW1wZXJhdHVyZTogJywgcmVzcG9uc2UubGlzdC5tYWluLnRlbXApO1xuICAgICAgLy8gY29uc29sZS5sb2coJ0xvdyB0ZW1wZXJhdHVyZTogJywgcmVzcG9uc2UubGlzdC5tYWluLnRlbXBfbWluKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdIaWdoIHRlbXBlcmF0dXJlOiAnLCByZXNwb25zZS5saXN0Lm1haW4udGVtcF9tYXgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnO1xuICAgIH0pO1xufTtcblxuY29uc3QgQVBJQ2l0eVNlYXJjaCA9ICgpID0+IHtcbiAgLy8gZ3JhYiBkb20gZWxlbWVudHNcbiAgY29uc3QgQVBJU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJU2VhcmNoSW5wdXQnKTtcbiAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKTtcbiAgLy8gcmVzZXQgZXJyb3JcbiAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJyc7XG4gIC8vIGNoZWNrIGZvciBzZWFyY2ggdGVybVxuICBpZiAoQVBJU2VhcmNoSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ1doaWNoIGNpdHk/JztcbiAgfSBlbHNlIHtcbiAgICBmZXRjaFdlYXRoZXIoQVBJU2VhcmNoSW5wdXQudmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBjcmVhdGVXZWF0aGVyQVBJID0gKCkgPT4ge1xuICAvLyBjcmVhdGUgV2VhdGhlciBBUEkgY29udGFpbmVyXG4gIGNvbnN0IFdlYXRoZXJBUElDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmNsYXNzTGlzdC5hZGQoJ1dlYXRoZXJBUElDb250YWludGVyJywgJ2NvbnRlbnQnKTtcbiAgLy8gV2VhdGhlckFQSUNvbnRhaW50ZXIuaWQgPSAnJztcblxuICAvLyBjcmVhdGUgQVBJIHRpdGxlXG4gIGNvbnN0IEFQSVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgQVBJVGl0bGUuaW5uZXJUZXh0ID0gJ0FQSSB3ZWF0aGVyIHNlYXJjaCc7XG5cbiAgLy8gY3JlYXRlIEFQSSBpbWFnZSBjb250YWluZXJcbiAgLy8gY29uc3QgQVBJSW1hZ2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgLy8gQVBJSW1hZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2VDb250YWluZXInKTtcblxuICAvLyBjcmVhdGUgQVBJIGltZ1xuICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBBUElJbWFnZS5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZScpO1xuXG4gIC8vIHNlYXJjaCBpbnB1dFxuICBjb25zdCBBUElTZWFyY2hJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIEFQSVNlYXJjaElucHV0LmNsYXNzTGlzdC5hZGQoJ0FQSVNlYXJjaElucHV0Jyk7XG4gIEFQSVNlYXJjaElucHV0LnBsYWNlaG9sZGVyID0gJ1NlYXR0bGUnO1xuXG4gIC8vIHNlYXJjaCBidXR0b25cbiAgY29uc3QgQVBJU2VhcmNoQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIEFQSVNlYXJjaEJ0bi5jbGFzc0xpc3QuYWRkKCdBUElTZWFyY2hCdG4nKTtcbiAgQVBJU2VhcmNoQnRuLmlubmVyVGV4dCA9ICdTZWFyY2gnO1xuICBBUElTZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBBUElDaXR5U2VhcmNoKTtcblxuICAvLyBlcnJvciBjb250YWluZXJcbiAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgQVBJRXJyb3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnQVBJRXJyb3JDb250YWluZXInKTtcblxuICAvLyBBcHBlbmRcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJVGl0bGUpO1xuICAvLyBBUElJbWFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChBUElJbWFnZSk7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVNlYXJjaElucHV0KTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJU2VhcmNoQnRuKTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJRXJyb3JDb250YWluZXIpO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElJbWFnZSk7XG4gIC8vIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlQ29udGFpbmVyKTtcbiAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKFdlYXRoZXJBUElDb250YWludGVyKTtcblxuICByZXR1cm4gV2VhdGhlckFQSUNvbnRhaW50ZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb250ZW50Q29udGFpbmVyKCkge1xuICAvLyBjcmVhdGUgY29udGVudCBjb250YWluZXJcbiAgY29uc3QgY29udGVudENvbnRhaW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGVudENvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnY29udGVudENvbnRhaW5lcicpO1xuICBcbiAgLy8gY3JlYXRlIHdlYXRoZXIgYXBwIFxuICBjb250ZW50Q29udGFpbnRlci5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQVBJKCkpO1xuXG4gIHJldHVybiBjb250ZW50Q29udGFpbnRlcjtcbn1cbiJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImNvb2tpZSIsImZldGNoV2VhdGhlciIsImNpdHlRdWVyeSIsIkFQSUltYWdlIiwicXVlcnlTZWxlY3RvciIsIkFQSUVycm9yQ29udGFpbmVyIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJ3ZWF0aGVyIiwibWFpbiIsInRlbXAiLCJ0ZW1wX21pbiIsInRlbXBfbWF4Iiwic3JjIiwiaWNvbiIsImNhdGNoIiwiZXJyIiwiaSIsImxpc3QiLCJkdF90eHQiLCJpbm5lclRleHQiLCJBUElDaXR5U2VhcmNoIiwiQVBJU2VhcmNoSW5wdXQiLCJ2YWx1ZSIsImNyZWF0ZVdlYXRoZXJBUEkiLCJXZWF0aGVyQVBJQ29udGFpbnRlciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJBUElUaXRsZSIsInBsYWNlaG9sZGVyIiwiQVBJU2VhcmNoQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFwcGVuZENoaWxkIiwiY3JlYXRlQ29udGVudENvbnRhaW5lciIsImNvbnRlbnRDb250YWludGVyIl0sInNvdXJjZVJvb3QiOiIifQ==