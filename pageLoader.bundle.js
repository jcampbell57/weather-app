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
    console.log(APISearchInput.value);
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


function createContentContainer() {
  // create content container
  const contentContainter = document.createElement('div');
  contentContainter.classList.add('contentContainer');
  
  // create weather app 
  contentContainter.appendChild(createWeatherAPI());

  return contentContainter;
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZUxvYWRlci5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2REFBNkQsVUFBVSwyREFBMkQsY0FBYztBQUNoSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhEQUE4RCxVQUFVLDJEQUEyRCxjQUFjO0FBQ2pKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9wYWdlTG9hZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgZmV0Y2hXZWF0aGVyID0gKGNpdHlRdWVyeSkgPT4ge1xuICAvLyBjb25zdCBBUElQcmFjdGljZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElQcmFjdGljZScpO1xuICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElFcnJvckNvbnRhaW5lcicpO1xuXG4gIC8vIGZldGNoIGN1cnJlbnQgd2VhdGhlclxuICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgY29uc29sZS5sb2coJ1dlYXRoZXIgY29uZGl0aW9uOiAnLCByZXNwb25zZS53ZWF0aGVyWzBdLm1haW4pO1xuICAgICAgY29uc29sZS5sb2coJ0N1cnJlbnQgdGVtcGVyYXR1cmU6ICcsIHJlc3BvbnNlLm1haW4udGVtcCk7XG4gICAgICBjb25zb2xlLmxvZygnTG93IHRlbXBlcmF0dXJlOiAnLCByZXNwb25zZS5tYWluLnRlbXBfbWluKTtcbiAgICAgIGNvbnNvbGUubG9nKCdIaWdoIHRlbXBlcmF0dXJlOiAnLCByZXNwb25zZS5tYWluLnRlbXBfbWF4KTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgIC8vIEFQSVByYWN0aWNlLnNyYyA9IHJlc3BvbnNlLmRhdGEuaW1hZ2VzLm9yaWdpbmFsLnVybDtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgLy8gQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJztcbiAgICB9KTtcblxuICAvLyBmZXRjaCBmaXZlIGRheSBmb3JlY2FzdFxuICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCwgeyBtb2RlOiAnY29ycycgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdXZWF0aGVyIGNvbmRpdGlvbjogJywgcmVzcG9uc2UubGlzdC53ZWF0aGVyLm1haW4pO1xuICAgICAgLy8gY29uc29sZS5sb2coJ01haW4gdGVtcGVyYXR1cmU6ICcsIHJlc3BvbnNlLmxpc3QubWFpbi50ZW1wKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdMb3cgdGVtcGVyYXR1cmU6ICcsIHJlc3BvbnNlLmxpc3QubWFpbi50ZW1wX21pbik7XG4gICAgICAvLyBjb25zb2xlLmxvZygnSGlnaCB0ZW1wZXJhdHVyZTogJywgcmVzcG9uc2UubGlzdC5tYWluLnRlbXBfbWF4KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJztcbiAgICB9KTtcblxufTtcblxuY29uc3QgQVBJQ2l0eVNlYXJjaCA9ICgpID0+IHtcbiAgLy8gZ3JhYiBkb20gZWxlbWVudHNcbiAgY29uc3QgQVBJU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJU2VhcmNoSW5wdXQnKTtcbiAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKTtcbiAgLy8gcmVzZXQgZXJyb3JcbiAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJyc7XG4gIC8vIGNoZWNrIGZvciBzZWFyY2ggdGVybVxuICBpZiAoQVBJU2VhcmNoSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ1doaWNoIGNpdHk/JztcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhBUElTZWFyY2hJbnB1dC52YWx1ZSk7XG4gICAgZmV0Y2hXZWF0aGVyKEFQSVNlYXJjaElucHV0LnZhbHVlKTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlV2VhdGhlckFQSSA9ICgpID0+IHtcbiAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICBjb25zdCBXZWF0aGVyQVBJQ29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50Jyk7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmlkID0gJ0FQSVByYWN0aWNlJztcblxuICAvLyBjcmVhdGUgQVBJIHRpdGxlXG4gIGNvbnN0IEFQSVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgQVBJVGl0bGUuaW5uZXJUZXh0ID0gJ0FQSSB3ZWF0aGVyIHNlYXJjaCc7XG5cbiAgLy8gY3JlYXRlIEFQSSBpbWFnZSBjb250YWluZXJcbiAgLy8gY29uc3QgQVBJSW1hZ2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgLy8gQVBJSW1hZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2VDb250YWluZXInKTtcblxuICAvLyBjcmVhdGUgQVBJIGltZ1xuICAvLyBjb25zdCBBUElQcmFjdGljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAvLyBBUElQcmFjdGljZS5jbGFzc0xpc3QuYWRkKCdBUElQcmFjdGljZScpO1xuXG4gIC8vIHNlYXJjaCBpbnB1dFxuICBjb25zdCBBUElTZWFyY2hJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIEFQSVNlYXJjaElucHV0LmNsYXNzTGlzdC5hZGQoJ0FQSVNlYXJjaElucHV0Jyk7XG4gIEFQSVNlYXJjaElucHV0LnBsYWNlaG9sZGVyID0gJ1NlYXR0bGUnO1xuXG4gIC8vIHNlYXJjaCBidXR0b25cbiAgY29uc3QgQVBJU2VhcmNoQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIEFQSVNlYXJjaEJ0bi5jbGFzc0xpc3QuYWRkKCdBUElTZWFyY2hCdG4nKTtcbiAgQVBJU2VhcmNoQnRuLmlubmVyVGV4dCA9ICdTZWFyY2gnO1xuICBBUElTZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBBUElDaXR5U2VhcmNoKTtcblxuICAvLyBlcnJvciBjb250YWluZXJcbiAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgQVBJRXJyb3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnQVBJRXJyb3JDb250YWluZXInKTtcblxuICAvLyBBcHBlbmRcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJVGl0bGUpO1xuICAvLyBBUElJbWFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChBUElQcmFjdGljZSk7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVNlYXJjaElucHV0KTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJU2VhcmNoQnRuKTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJRXJyb3JDb250YWluZXIpO1xuICAvLyBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElJbWFnZUNvbnRhaW5lcik7XG4gIC8vIGNvbnRhaW5lci5hcHBlbmRDaGlsZChXZWF0aGVyQVBJQ29udGFpbnRlcik7XG5cbiAgcmV0dXJuIFdlYXRoZXJBUElDb250YWludGVyO1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb250ZW50Q29udGFpbmVyKCkge1xuICAvLyBjcmVhdGUgY29udGVudCBjb250YWluZXJcbiAgY29uc3QgY29udGVudENvbnRhaW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGVudENvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnY29udGVudENvbnRhaW5lcicpO1xuICBcbiAgLy8gY3JlYXRlIHdlYXRoZXIgYXBwIFxuICBjb250ZW50Q29udGFpbnRlci5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQVBJKCkpO1xuXG4gIHJldHVybiBjb250ZW50Q29udGFpbnRlcjtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==