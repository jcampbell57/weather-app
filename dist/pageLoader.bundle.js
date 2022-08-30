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
const fetchWeather = cityQuery => {
  // const APIPractice = document.querySelector('.APIPractice');
  const APIErrorContainer = document.querySelector('.APIErrorContainer'); // fetch current weather

  fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(cityQuery, "&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e"), {
    mode: 'cors'
  }).then(response => response.json()).then(response => {
    console.log(response);
    console.log('Weather condition: ', response.weather[0].main);
    console.log('Current temperature: ', response.main.temp);
    console.log('Low temperature: ', response.main.temp_min);
    console.log('High temperature: ', response.main.temp_max);
    console.log(response); // APIPractice.src = response.data.images.original.url;
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
      console.log('current temp: ', response.list[i].main.temp);
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
  WeatherAPIContainter.classList.add('WeatherAPIContainter', 'content');
  WeatherAPIContainter.id = 'APIPractice'; // create API title

  const APITitle = document.createElement('h3');
  APITitle.innerText = 'API weather search'; // create API image container
  // const APIImageContainer = document.createElement('div');
  // APIImageContainer.classList.add('APIImageContainer');
  // create API img
  // const APIPractice = document.createElement('img');
  // APIPractice.classList.add('APIPractice');
  // search input

  const APISearchInput = document.createElement('input');
  APISearchInput.classList.add('APISearchInput');
  APISearchInput.placeholder = 'Seattle'; // search button

  const APISearchBtn = document.createElement('div');
  APISearchBtn.classList.add('APISearchBtn');
  APISearchBtn.innerText = 'Search';
  APISearchBtn.addEventListener('click', APICitySearch); // error container

  const APIErrorContainer = document.createElement('div');
  APIErrorContainer.classList.add('APIErrorContainer'); // Append

  WeatherAPIContainter.appendChild(APITitle); // APIImageContainer.appendChild(APIPractice);

  WeatherAPIContainter.appendChild(APISearchInput);
  WeatherAPIContainter.appendChild(APISearchBtn);
  WeatherAPIContainter.appendChild(APIErrorContainer); // WeatherAPIContainter.appendChild(APIImageContainer);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NUIsQ0FBZ0MsbUJBQWhDLEVBL0I2QixDQWlDN0I7O0VBQ0FILG9CQUFvQixDQUFDUyxXQUFyQixDQUFpQ0osUUFBakMsRUFsQzZCLENBbUM3Qjs7RUFDQUwsb0JBQW9CLENBQUNTLFdBQXJCLENBQWlDWixjQUFqQztFQUNBRyxvQkFBb0IsQ0FBQ1MsV0FBckIsQ0FBaUNGLFlBQWpDO0VBQ0FQLG9CQUFvQixDQUFDUyxXQUFyQixDQUFpQ2xDLGlCQUFqQyxFQXRDNkIsQ0F1QzdCO0VBQ0E7O0VBRUEsT0FBT3lCLG9CQUFQO0FBQ0QsQ0EzQ0Q7O0FBOENlLFNBQVNVLHNCQUFULEdBQWtDO0VBQy9DO0VBQ0EsTUFBTUMsaUJBQWlCLEdBQUduQyxRQUFRLENBQUN5QixhQUFULENBQXVCLEtBQXZCLENBQTFCO0VBQ0FVLGlCQUFpQixDQUFDVCxTQUFsQixDQUE0QkMsR0FBNUIsQ0FBZ0Msa0JBQWhDLEVBSCtDLENBSy9DOztFQUNBUSxpQkFBaUIsQ0FBQ0YsV0FBbEIsQ0FBOEJWLGdCQUFnQixFQUE5QztFQUVBLE9BQU9ZLGlCQUFQO0FBQ0QsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcGFnZUxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IGZldGNoV2VhdGhlciA9IChjaXR5UXVlcnkpID0+IHtcbiAgLy8gY29uc3QgQVBJUHJhY3RpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJUHJhY3RpY2UnKTtcbiAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKTtcblxuICAvLyBmZXRjaCBjdXJyZW50IHdlYXRoZXJcbiAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCwgeyBtb2RlOiAnY29ycycgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgIGNvbnNvbGUubG9nKCdXZWF0aGVyIGNvbmRpdGlvbjogJywgcmVzcG9uc2Uud2VhdGhlclswXS5tYWluKTtcbiAgICAgIGNvbnNvbGUubG9nKCdDdXJyZW50IHRlbXBlcmF0dXJlOiAnLCByZXNwb25zZS5tYWluLnRlbXApO1xuICAgICAgY29uc29sZS5sb2coJ0xvdyB0ZW1wZXJhdHVyZTogJywgcmVzcG9uc2UubWFpbi50ZW1wX21pbik7XG4gICAgICBjb25zb2xlLmxvZygnSGlnaCB0ZW1wZXJhdHVyZTogJywgcmVzcG9uc2UubWFpbi50ZW1wX21heCk7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAvLyBBUElQcmFjdGljZS5zcmMgPSByZXNwb25zZS5kYXRhLmltYWdlcy5vcmlnaW5hbC51cmw7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIC8vIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCc7XG4gICAgfSk7XG5cbiAgLy8gZmV0Y2ggZml2ZSBkYXkgZm9yZWNhc3RcbiAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsIHsgbW9kZTogJ2NvcnMnIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5saXN0W2ldKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UubGlzdFtpXS5kdF90eHQpO1xuICAgICAgICBjb25zb2xlLmxvZygnY3VycmVudCB0ZW1wOiAnLCByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCk7XG4gICAgICB9XG4gICAgICAvLyBjb25zb2xlLmxvZygnV2VhdGhlciBjb25kaXRpb246ICcsIHJlc3BvbnNlLmxpc3Qud2VhdGhlci5tYWluKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdNYWluIHRlbXBlcmF0dXJlOiAnLCByZXNwb25zZS5saXN0Lm1haW4udGVtcCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnTG93IHRlbXBlcmF0dXJlOiAnLCByZXNwb25zZS5saXN0Lm1haW4udGVtcF9taW4pO1xuICAgICAgLy8gY29uc29sZS5sb2coJ0hpZ2ggdGVtcGVyYXR1cmU6ICcsIHJlc3BvbnNlLmxpc3QubWFpbi50ZW1wX21heCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCc7XG4gICAgfSk7XG59O1xuXG5jb25zdCBBUElDaXR5U2VhcmNoID0gKCkgPT4ge1xuICAvLyBncmFiIGRvbSBlbGVtZW50c1xuICBjb25zdCBBUElTZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElTZWFyY2hJbnB1dCcpO1xuICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElFcnJvckNvbnRhaW5lcicpO1xuICAvLyByZXNldCBlcnJvclxuICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnJztcbiAgLy8gY2hlY2sgZm9yIHNlYXJjaCB0ZXJtXG4gIGlmIChBUElTZWFyY2hJbnB1dC52YWx1ZSA9PT0gJycpIHtcbiAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nO1xuICB9IGVsc2Uge1xuICAgIGZldGNoV2VhdGhlcihBUElTZWFyY2hJbnB1dC52YWx1ZSk7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJBUEkgPSAoKSA9PiB7XG4gIC8vIGNyZWF0ZSBXZWF0aGVyIEFQSSBjb250YWluZXJcbiAgY29uc3QgV2VhdGhlckFQSUNvbnRhaW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgV2VhdGhlckFQSUNvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnV2VhdGhlckFQSUNvbnRhaW50ZXInLCAnY29udGVudCcpO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5pZCA9ICdBUElQcmFjdGljZSc7XG5cbiAgLy8gY3JlYXRlIEFQSSB0aXRsZVxuICBjb25zdCBBUElUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gIEFQSVRpdGxlLmlubmVyVGV4dCA9ICdBUEkgd2VhdGhlciBzZWFyY2gnO1xuXG4gIC8vIGNyZWF0ZSBBUEkgaW1hZ2UgY29udGFpbmVyXG4gIC8vIGNvbnN0IEFQSUltYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIC8vIEFQSUltYWdlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ0FQSUltYWdlQ29udGFpbmVyJyk7XG5cbiAgLy8gY3JlYXRlIEFQSSBpbWdcbiAgLy8gY29uc3QgQVBJUHJhY3RpY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgLy8gQVBJUHJhY3RpY2UuY2xhc3NMaXN0LmFkZCgnQVBJUHJhY3RpY2UnKTtcblxuICAvLyBzZWFyY2ggaW5wdXRcbiAgY29uc3QgQVBJU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBBUElTZWFyY2hJbnB1dC5jbGFzc0xpc3QuYWRkKCdBUElTZWFyY2hJbnB1dCcpO1xuICBBUElTZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9ICdTZWF0dGxlJztcblxuICAvLyBzZWFyY2ggYnV0dG9uXG4gIGNvbnN0IEFQSVNlYXJjaEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBBUElTZWFyY2hCdG4uY2xhc3NMaXN0LmFkZCgnQVBJU2VhcmNoQnRuJyk7XG4gIEFQSVNlYXJjaEJ0bi5pbm5lclRleHQgPSAnU2VhcmNoJztcbiAgQVBJU2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgQVBJQ2l0eVNlYXJjaCk7XG5cbiAgLy8gZXJyb3IgY29udGFpbmVyXG4gIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIEFQSUVycm9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ0FQSUVycm9yQ29udGFpbmVyJyk7XG5cbiAgLy8gQXBwZW5kXG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVRpdGxlKTtcbiAgLy8gQVBJSW1hZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoQVBJUHJhY3RpY2UpO1xuICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElTZWFyY2hJbnB1dCk7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVNlYXJjaEJ0bik7XG4gIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUVycm9yQ29udGFpbmVyKTtcbiAgLy8gV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2VDb250YWluZXIpO1xuICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoV2VhdGhlckFQSUNvbnRhaW50ZXIpO1xuXG4gIHJldHVybiBXZWF0aGVyQVBJQ29udGFpbnRlcjtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29udGVudENvbnRhaW5lcigpIHtcbiAgLy8gY3JlYXRlIGNvbnRlbnQgY29udGFpbmVyXG4gIGNvbnN0IGNvbnRlbnRDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRlbnRDb250YWludGVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnRDb250YWluZXInKTtcbiAgXG4gIC8vIGNyZWF0ZSB3ZWF0aGVyIGFwcCBcbiAgY29udGVudENvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoY3JlYXRlV2VhdGhlckFQSSgpKTtcblxuICByZXR1cm4gY29udGVudENvbnRhaW50ZXI7XG59XG4iXSwibmFtZXMiOlsiZmV0Y2hXZWF0aGVyIiwiY2l0eVF1ZXJ5IiwiQVBJRXJyb3JDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJmZXRjaCIsIm1vZGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY29uc29sZSIsImxvZyIsIndlYXRoZXIiLCJtYWluIiwidGVtcCIsInRlbXBfbWluIiwidGVtcF9tYXgiLCJjYXRjaCIsImVyciIsImkiLCJsaXN0IiwiZHRfdHh0IiwiaW5uZXJUZXh0IiwiQVBJQ2l0eVNlYXJjaCIsIkFQSVNlYXJjaElucHV0IiwidmFsdWUiLCJjcmVhdGVXZWF0aGVyQVBJIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaWQiLCJBUElUaXRsZSIsInBsYWNlaG9sZGVyIiwiQVBJU2VhcmNoQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFwcGVuZENoaWxkIiwiY3JlYXRlQ29udGVudENvbnRhaW5lciIsImNvbnRlbnRDb250YWludGVyIl0sInNvdXJjZVJvb3QiOiIifQ==