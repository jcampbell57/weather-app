/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helperFunctions.js":
/*!********************************!*\
  !*** ./src/helperFunctions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAdditionIcon": () => (/* binding */ createAdditionIcon),
/* harmony export */   "createDeleteIcon": () => (/* binding */ createDeleteIcon),
/* harmony export */   "createForm": () => (/* binding */ createForm),
/* harmony export */   "createMenuIcon": () => (/* binding */ createMenuIcon),
/* harmony export */   "displayWatchlist": () => (/* binding */ displayWatchlist)
/* harmony export */ });
/* harmony import */ var _assets_plus_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/plus.svg */ "./src/assets/plus.svg");
/* harmony import */ var _weatherAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherAPI */ "./src/weatherAPI.js");
/* harmony import */ var _assets_delete_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/delete.svg */ "./src/assets/delete.svg");
/* harmony import */ var _assets_menuIcon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/menuIcon.svg */ "./src/assets/menuIcon.svg");





const setTaskFilter = li => {
  // set content title (filter)
  const contentTitle = document.querySelector('.contentTitle');
  contentTitle.textContent = li.innerText; // grab locations array from storage

  const storageWatchlist = JSON.parse(localStorage.getItem('storageWatchlist')); // deselect all locations

  storageWatchlist.forEach(location => {
    if (location.selected === 'true') {
      location.selected = 'false';
    }
  }); // Select location if one is chosen (main menu selection is handled in event listener)

  if (li.getAttribute('class') === 'location') {
    const selectedLocationId = li.getAttribute('id');
    storageWatchlist[selectedLocationId].selected = 'true';
  } // set locations array back into localStorage


  localStorage.setItem('storageWatchlist', JSON.stringify(storageWatchlist)); // refresh

  displayWatchlist();
};

const createMenuIcon = li => {
  const checklistIcon = document.createElement('img');
  checklistIcon.src = _assets_menuIcon_svg__WEBPACK_IMPORTED_MODULE_3__;
  checklistIcon.setAttribute('class', 'icon');
  li.appendChild(checklistIcon);
}; // Display entire array of locations to watchlist


const displayWatchlist = () => {
  // Grab projects menu
  const watchlist = document.querySelector('#watchlist'); // Clear location listings

  const oldListingCount = watchlist.childElementCount; // eslint-disable-next-line no-plusplus

  for (let i = 0; i < oldListingCount; i++) {
    watchlist.firstChild.remove();
  } // Add single location to watchlist (called below)


  const createListing = (Proj, i) => {
    const location = document.createElement('li');
    location.classList.add("location");
    location.setAttribute('id', "".concat(i)); // assign class to selected location listing

    if (Proj.selected === 'true') {
      location.classList.add('selected');
    } // event listener to display selected location's weather


    location.addEventListener('click', e => {
      // if deleting listing, do not display weather
      if (e.target.classList.contains('deleteItem')) {
        return;
      }

      setTaskFilter(location);
    });
    createMenuIcon(location);
    const locationText = document.createElement('span');
    locationText.textContent = Proj.name;
    location.appendChild(locationText);
    createDeleteIcon(location, i);
    watchlist.appendChild(location);
  }; // Append all locations to watchlist


  let i = 0;
  const storageWatchlist = JSON.parse(localStorage.getItem('storageWatchlist'));
  storageWatchlist.forEach(project => {
    createListing(project, i); // eslint-disable-next-line no-plusplus

    i++;
  });
};

const createAddButton = container => {
  const addBtn = document.createElement('button');
  addBtn.setAttribute('class', 'addBtn');
  addBtn.innerText = 'search';
  addBtn.classList.add('locationAddBtn');
  addBtn.addEventListener('click', e => (0,_weatherAPI__WEBPACK_IMPORTED_MODULE_1__["default"])(e));
  container.appendChild(addBtn);
};

const createCancelButton = (container, i) => {
  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('cancelBtn');
  cancelBtn.setAttribute('id', "".concat(i));
  cancelBtn.innerText = 'cancel'; // cancelBtn.addEventListener('click', (e) => {
  //     e.preventDefault()
  //     displayWatchlist()
  // })

  container.appendChild(cancelBtn);
}; // createForm


const createForm = form => {
  const formRow1 = document.createElement('div');
  formRow1.setAttribute('class', 'formRow');
  const formRow2 = document.createElement('div');
  formRow2.setAttribute('class', 'formRow');
  formRow2.setAttribute('id', 'formButtons');
  const formRow3 = document.createElement('div');
  formRow3.setAttribute('id', 'hidden'); // row one: assign input

  const newLocationInput = document.createElement('input');
  newLocationInput.classList.add('newLocationInput');
  newLocationInput.placeholder = 'Florence';
  newLocationInput.name = 'newLocationInput';
  formRow1.appendChild(newLocationInput); // row three: assign error class and text

  formRow3.setAttribute('class', 'newProjErrorContainer');
  formRow3.innerText = 'Which city?'; // row two: submit and cancel buttons

  createAddButton(formRow2, form);
  createCancelButton(formRow2, form);
  form.appendChild(formRow1);
  form.appendChild(formRow2);
  form.appendChild(formRow3);
}; // Delete watchlist entry


const deleteWatchlistEntry = e => {
  // grab arrays from storage
  const storageWatchlist = JSON.parse(localStorage.getItem('storageWatchlist')); // Identify entry to delete

  const doomedIndex = e.target.getAttribute('id'); // const doomedName = storageWatchlist[doomedIndex].name;
  // delete entry

  storageWatchlist.splice(doomedIndex, 1); // set changes to localStorage

  localStorage.setItem('storageWatchlist', JSON.stringify(storageWatchlist)); // If doomed entry was selected, clear content display
  // const contentTitle = document.querySelector('.contentTitle');
  // const allTasksClassList = document.querySelector('.allTasks').classList
  // if (contentTitle.textContent === doomedName) {
  //     contentTitle.textContent = 'All tasks'
  //     allTasksClassList.add('selected')
  // }
  // refresh watchist

  displayWatchlist();
};

const createDeleteIcon = (container, i) => {
  // create image and assign attributes
  const newDeleteIcon = document.createElement('img');
  newDeleteIcon.src = _assets_delete_svg__WEBPACK_IMPORTED_MODULE_2__;
  newDeleteIcon.setAttribute('class', 'icon deleteItem');
  newDeleteIcon.setAttribute('id', "".concat(i)); // ADD EVENT LISTENER

  if (container.getAttribute('class') === 'project' || container.classList.contains('project')) {
    // Event listener to delete project
    newDeleteIcon.classList.add("deleteWatchlistEntry", "deleteWatchlistEntry".concat(i), "hidden");
    newDeleteIcon.addEventListener('click', e => deleteWatchlistEntry(e, i)); // display trash icon on hover

    container.addEventListener('mouseenter', () => {
      const trashIcon = document.querySelector(".deleteWatchlistEntry".concat(i));
      trashIcon.classList.remove('hidden');
    }); // hide trash icon

    container.addEventListener('mouseleave', () => {
      const trashIcon = document.querySelector(".deleteWatchlistEntry".concat(i));
      trashIcon.classList.add('hidden');
    });
  } else {
    console.log('this is strange');
  } // append to container


  container.appendChild(newDeleteIcon);
};

const createAdditionIcon = li => {
  const newAdditionIcon = document.createElement('img');
  newAdditionIcon.src = _assets_plus_svg__WEBPACK_IMPORTED_MODULE_0__;
  newAdditionIcon.setAttribute('class', 'icon');
  li.appendChild(newAdditionIcon);
};



/***/ }),

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

const APICitySearch = input => {
  fetchCurrentWeather(input);
  fetchHourlyForecast(input);
}; // Placeholder Content


APICitySearch('Florence');

const validateSearch = () => {
  // grab dom elements
  const APISearchInput = document.querySelector('.APISearchInput');
  const APIErrorContainer = document.querySelector('.APIErrorContainer'); // reset error

  APIErrorContainer.innerText = ''; // check for search term

  if (APISearchInput.value === '') {
    APIErrorContainer.innerText = 'Which city?';
  } else {
    APICitySearch(APISearchInput.value);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateSearch);

/***/ }),

/***/ "./src/assets/GitHub-light-32px.png":
/*!******************************************!*\
  !*** ./src/assets/GitHub-light-32px.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "266ca63177bca6f330a7.png";

/***/ }),

/***/ "./src/assets/delete.svg":
/*!*******************************!*\
  !*** ./src/assets/delete.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bcf8d6ff346603c8a51a.svg";

/***/ }),

/***/ "./src/assets/logoIcon.svg":
/*!*********************************!*\
  !*** ./src/assets/logoIcon.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0f7071ee409c5ab2c6e5.svg";

/***/ }),

/***/ "./src/assets/menuIcon.svg":
/*!*********************************!*\
  !*** ./src/assets/menuIcon.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0a51d6a7c3cc4dbfcf0a.svg";

/***/ }),

/***/ "./src/assets/plus.svg":
/*!*****************************!*\
  !*** ./src/assets/plus.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3cffe9a515498593b872.svg";

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
/* harmony import */ var _weatherAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherAPI */ "./src/weatherAPI.js");
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.js");
/* harmony import */ var _assets_GitHub_light_32px_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/GitHub-light-32px.png */ "./src/assets/GitHub-light-32px.png");
/* harmony import */ var _assets_logoIcon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/logoIcon.svg */ "./src/assets/logoIcon.svg");





const createHeader = () => {
  const header = document.createElement('header'); // display logo

  const logo = document.createElement('img');
  logo.src = _assets_logoIcon_svg__WEBPACK_IMPORTED_MODULE_3__;
  logo.target = '_blank';
  logo.setAttribute('class', 'logo');
  header.appendChild(logo); // display title

  const title = document.createElement('h1');
  title.textContent = 'Weatherserve';
  header.appendChild(title);
  return header;
};

const createMenu = () => {
  const menu = document.createElement('div');
  menu.setAttribute('class', 'menu'); // create watchlist header

  const watchlistHeader = document.createElement('p');
  watchlistHeader.setAttribute('class', 'watchlistHeader');
  watchlistHeader.textContent = 'Watchlist'; // create watchlist menu

  const watchlist = document.createElement('ul');
  watchlist.setAttribute('class', 'watchlist');
  watchlist.setAttribute('id', 'watchlist'); // displayWatchlist()
  // Generate add location container

  const addLocationContainer = document.createElement('ul');
  addLocationContainer.setAttribute('class', 'watchlist'); // Generate add location button

  const addLocation = document.createElement('li');
  addLocation.setAttribute('class', 'addLocationBtn');
  (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_1__.createAdditionIcon)(addLocation);
  const addLocationText = document.createElement('span');
  addLocationText.innerText = 'Add Location';
  addLocation.appendChild(addLocationText);
  addLocationContainer.appendChild(addLocation); // Generate and hide new location form

  const addLocationForm = document.createElement('form');
  addLocationForm.setAttribute('class', 'addLocationForm');
  addLocationForm.setAttribute('id', 'hidden');
  addLocationForm.method = 'get';
  (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_1__.createForm)(addLocationForm);
  addLocationContainer.appendChild(addLocationForm);
  menu.appendChild(watchlistHeader);
  menu.appendChild(watchlist);
  menu.appendChild(addLocationContainer);
  return menu;
};

const createWeatherAPI = () => {
  // create Weather API container
  const WeatherAPIContainter = document.createElement('div');
  WeatherAPIContainter.classList.add('WeatherAPIContainter', 'content'); // WeatherAPIContainter.id = '';
  // create API title

  const APITitle = document.createElement('h3');
  APITitle.classList.add('contentTitle');
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

const createContent = () => {
  // create content container
  const content = document.createElement('div');
  content.classList.add('content'); // create weather app

  content.appendChild(createWeatherAPI());
  return content;
};

const createFooter = () => {
  const footer = document.createElement('footer');
  const copyright = document.createElement('p');
  copyright.textContent = "Copyright \xA9 ".concat(new Date().getFullYear(), " jcampbell57");
  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/jcampbell57';
  githubLink.target = '_blank';
  const newGithubIcon = document.createElement('img');
  newGithubIcon.src = _assets_GitHub_light_32px_png__WEBPACK_IMPORTED_MODULE_2__;
  newGithubIcon.setAttribute('class', 'github');
  githubLink.appendChild(newGithubIcon);
  footer.appendChild(copyright);
  footer.appendChild(githubLink);
  return footer;
};

function initialize() {
  document.body.appendChild(createHeader());
  document.body.appendChild(createMenu());
  document.body.appendChild(createContent());
  document.body.appendChild(createFooter());
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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a0IsZ0NBQWxCO0VBQ0FELFVBQVUsQ0FBQ3hILE1BQVgsR0FBb0IsUUFBcEI7RUFFQSxNQUFNMEgsYUFBYSxHQUFHN0osUUFBUSxDQUFDbUIsYUFBVCxDQUF1QixLQUF2QixDQUF0QjtFQUNBMEksYUFBYSxDQUFDekksR0FBZCxHQUFvQitHLDBEQUFwQjtFQUNBMEIsYUFBYSxDQUFDeEksWUFBZCxDQUEyQixPQUEzQixFQUFvQyxRQUFwQztFQUVBc0ksVUFBVSxDQUFDckksV0FBWCxDQUF1QnVJLGFBQXZCO0VBQ0FMLE1BQU0sQ0FBQ2xJLFdBQVAsQ0FBbUJtSSxTQUFuQjtFQUNBRCxNQUFNLENBQUNsSSxXQUFQLENBQW1CcUksVUFBbkI7RUFFQSxPQUFPSCxNQUFQO0FBQ0gsQ0FuQkQ7O0FBcUJlLFNBQVNNLFVBQVQsR0FBc0I7RUFDakM5SixRQUFRLENBQUMrSixJQUFULENBQWN6SSxXQUFkLENBQTBCK0csWUFBWSxFQUF0QztFQUNBckksUUFBUSxDQUFDK0osSUFBVCxDQUFjekksV0FBZCxDQUEwQm1ILFVBQVUsRUFBcEM7RUFDQXpJLFFBQVEsQ0FBQytKLElBQVQsQ0FBY3pJLFdBQWQsQ0FBMEIrSCxhQUFhLEVBQXZDO0VBQ0FySixRQUFRLENBQUMrSixJQUFULENBQWN6SSxXQUFkLENBQTBCaUksWUFBWSxFQUF0QztBQUNILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlckFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcGFnZUxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWRkaXRpb25JY29uIGZyb20gJy4vYXNzZXRzL3BsdXMuc3ZnJ1xuaW1wb3J0IEFQSUNpdHlTZWFyY2ggZnJvbSAnLi93ZWF0aGVyQVBJJ1xuaW1wb3J0IGRlbGV0ZUljb24gZnJvbSAnLi9hc3NldHMvZGVsZXRlLnN2ZydcbmltcG9ydCBtZW51SWNvbiBmcm9tICcuL2Fzc2V0cy9tZW51SWNvbi5zdmcnXG5cbmNvbnN0IHNldFRhc2tGaWx0ZXIgPSAobGkpID0+IHtcbiAgICAvLyBzZXQgY29udGVudCB0aXRsZSAoZmlsdGVyKVxuICAgIGNvbnN0IGNvbnRlbnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50VGl0bGUnKVxuICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9IGxpLmlubmVyVGV4dFxuXG4gICAgLy8gZ3JhYiBsb2NhdGlvbnMgYXJyYXkgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBkZXNlbGVjdCBhbGwgbG9jYXRpb25zXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc2VsZWN0ZWQgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VsZWN0ZWQgPSAnZmFsc2UnXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gU2VsZWN0IGxvY2F0aW9uIGlmIG9uZSBpcyBjaG9zZW4gKG1haW4gbWVudSBzZWxlY3Rpb24gaXMgaGFuZGxlZCBpbiBldmVudCBsaXN0ZW5lcilcbiAgICBpZiAobGkuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAnbG9jYXRpb24nKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTG9jYXRpb25JZCA9IGxpLmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgICBzdG9yYWdlV2F0Y2hsaXN0W3NlbGVjdGVkTG9jYXRpb25JZF0uc2VsZWN0ZWQgPSAndHJ1ZSdcbiAgICB9XG5cbiAgICAvLyBzZXQgbG9jYXRpb25zIGFycmF5IGJhY2sgaW50byBsb2NhbFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gcmVmcmVzaFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBjcmVhdGVNZW51SWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrbGlzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGNoZWNrbGlzdEljb24uc3JjID0gbWVudUljb25cbiAgICBjaGVja2xpc3RJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tsaXN0SWNvbilcbn1cblxuLy8gRGlzcGxheSBlbnRpcmUgYXJyYXkgb2YgbG9jYXRpb25zIHRvIHdhdGNobGlzdFxuY29uc3QgZGlzcGxheVdhdGNobGlzdCA9ICgpID0+IHtcbiAgICAvLyBHcmFiIHByb2plY3RzIG1lbnVcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2F0Y2hsaXN0JylcblxuICAgIC8vIENsZWFyIGxvY2F0aW9uIGxpc3RpbmdzXG4gICAgY29uc3Qgb2xkTGlzdGluZ0NvdW50ID0gd2F0Y2hsaXN0LmNoaWxkRWxlbWVudENvdW50XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRMaXN0aW5nQ291bnQ7IGkrKykge1xuICAgICAgICB3YXRjaGxpc3QuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgIH1cblxuICAgIC8vIEFkZCBzaW5nbGUgbG9jYXRpb24gdG8gd2F0Y2hsaXN0IChjYWxsZWQgYmVsb3cpXG4gICAgY29uc3QgY3JlYXRlTGlzdGluZyA9IChQcm9qLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKGBsb2NhdGlvbmApXG4gICAgICAgIGxvY2F0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG4gICAgICAgIC8vIGFzc2lnbiBjbGFzcyB0byBzZWxlY3RlZCBsb2NhdGlvbiBsaXN0aW5nXG4gICAgICAgIGlmIChQcm9qLnNlbGVjdGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV2ZW50IGxpc3RlbmVyIHRvIGRpc3BsYXkgc2VsZWN0ZWQgbG9jYXRpb24ncyB3ZWF0aGVyXG4gICAgICAgIGxvY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIC8vIGlmIGRlbGV0aW5nIGxpc3RpbmcsIGRvIG5vdCBkaXNwbGF5IHdlYXRoZXJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZUl0ZW0nKSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0VGFza0ZpbHRlcihsb2NhdGlvbilcbiAgICAgICAgfSlcblxuICAgICAgICBjcmVhdGVNZW51SWNvbihsb2NhdGlvbilcbiAgICAgICAgY29uc3QgbG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGxvY2F0aW9uVGV4dC50ZXh0Q29udGVudCA9IFByb2oubmFtZVxuICAgICAgICBsb2NhdGlvbi5hcHBlbmRDaGlsZChsb2NhdGlvblRleHQpXG4gICAgICAgIGNyZWF0ZURlbGV0ZUljb24obG9jYXRpb24sIGkpXG4gICAgICAgIHdhdGNobGlzdC5hcHBlbmRDaGlsZChsb2NhdGlvbilcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgYWxsIGxvY2F0aW9ucyB0byB3YXRjaGxpc3RcbiAgICBsZXQgaSA9IDBcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgY3JlYXRlTGlzdGluZyhwcm9qZWN0LCBpKVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgaSsrXG4gICAgfSlcbn1cblxuY29uc3QgY3JlYXRlQWRkQnV0dG9uID0gKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgYWRkQnRuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkQnRuJylcbiAgICBhZGRCdG4uaW5uZXJUZXh0ID0gJ3NlYXJjaCdcbiAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnbG9jYXRpb25BZGRCdG4nKVxuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiBBUElDaXR5U2VhcmNoKGUpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRCdG4pXG59XG5cbmNvbnN0IGNyZWF0ZUNhbmNlbEJ1dHRvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdjYW5jZWxCdG4nKVxuICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuICAgIGNhbmNlbEJ0bi5pbm5lclRleHQgPSAnY2FuY2VsJ1xuICAgIC8vIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgLy8gICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vICAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbiAgICAvLyB9KVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pXG59XG5cbi8vIGNyZWF0ZUZvcm1cbmNvbnN0IGNyZWF0ZUZvcm0gPSAoZm9ybSkgPT4ge1xuICAgIGNvbnN0IGZvcm1Sb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93MS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuXG4gICAgY29uc3QgZm9ybVJvdzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdpZCcsICdmb3JtQnV0dG9ucycpXG5cbiAgICBjb25zdCBmb3JtUm93MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9ybVJvdzMuc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxuXG4gICAgLy8gcm93IG9uZTogYXNzaWduIGlucHV0XG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LmNsYXNzTGlzdC5hZGQoJ25ld0xvY2F0aW9uSW5wdXQnKVxuICAgIG5ld0xvY2F0aW9uSW5wdXQucGxhY2Vob2xkZXIgPSAnRmxvcmVuY2UnXG4gICAgbmV3TG9jYXRpb25JbnB1dC5uYW1lID0gJ25ld0xvY2F0aW9uSW5wdXQnXG4gICAgZm9ybVJvdzEuYXBwZW5kQ2hpbGQobmV3TG9jYXRpb25JbnB1dClcblxuICAgIC8vIHJvdyB0aHJlZTogYXNzaWduIGVycm9yIGNsYXNzIGFuZCB0ZXh0XG4gICAgZm9ybVJvdzMuc2V0QXR0cmlidXRlKCdjbGFzcycsICduZXdQcm9qRXJyb3JDb250YWluZXInKVxuICAgIGZvcm1Sb3czLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcblxuICAgIC8vIHJvdyB0d286IHN1Ym1pdCBhbmQgY2FuY2VsIGJ1dHRvbnNcbiAgICBjcmVhdGVBZGRCdXR0b24oZm9ybVJvdzIsIGZvcm0pXG4gICAgY3JlYXRlQ2FuY2VsQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MSlcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cyKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzMpXG59XG5cbi8vIERlbGV0ZSB3YXRjaGxpc3QgZW50cnlcbmNvbnN0IGRlbGV0ZVdhdGNobGlzdEVudHJ5ID0gKGUpID0+IHtcbiAgICAvLyBncmFiIGFycmF5cyBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIElkZW50aWZ5IGVudHJ5IHRvIGRlbGV0ZVxuICAgIGNvbnN0IGRvb21lZEluZGV4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgLy8gY29uc3QgZG9vbWVkTmFtZSA9IHN0b3JhZ2VXYXRjaGxpc3RbZG9vbWVkSW5kZXhdLm5hbWU7XG5cbiAgICAvLyBkZWxldGUgZW50cnlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnNwbGljZShkb29tZWRJbmRleCwgMSlcblxuICAgIC8vIHNldCBjaGFuZ2VzIHRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyBJZiBkb29tZWQgZW50cnkgd2FzIHNlbGVjdGVkLCBjbGVhciBjb250ZW50IGRpc3BsYXlcbiAgICAvLyBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJyk7XG4gICAgLy8gY29uc3QgYWxsVGFza3NDbGFzc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsVGFza3MnKS5jbGFzc0xpc3RcbiAgICAvLyBpZiAoY29udGVudFRpdGxlLnRleHRDb250ZW50ID09PSBkb29tZWROYW1lKSB7XG4gICAgLy8gICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9ICdBbGwgdGFza3MnXG4gICAgLy8gICAgIGFsbFRhc2tzQ2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIC8vIH1cblxuICAgIC8vIHJlZnJlc2ggd2F0Y2hpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlRGVsZXRlSWNvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICAvLyBjcmVhdGUgaW1hZ2UgYW5kIGFzc2lnbiBhdHRyaWJ1dGVzXG4gICAgY29uc3QgbmV3RGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3RGVsZXRlSWNvbi5zcmMgPSBkZWxldGVJY29uXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24gZGVsZXRlSXRlbScpXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuXG4gICAgLy8gQUREIEVWRU5UIExJU1RFTkVSXG4gICAgaWYgKFxuICAgICAgICBjb250YWluZXIuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAncHJvamVjdCcgfHxcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdCcpXG4gICAgKSB7XG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyIHRvIGRlbGV0ZSBwcm9qZWN0XG4gICAgICAgIG5ld0RlbGV0ZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeWAsXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YCxcbiAgICAgICAgICAgIGBoaWRkZW5gXG4gICAgICAgIClcbiAgICAgICAgbmV3RGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PlxuICAgICAgICAgICAgZGVsZXRlV2F0Y2hsaXN0RW50cnkoZSwgaSlcbiAgICAgICAgKVxuICAgICAgICAvLyBkaXNwbGF5IHRyYXNoIGljb24gb24gaG92ZXJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGhpZGUgdHJhc2ggaWNvblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBzdHJhbmdlJylcbiAgICB9XG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdEZWxldGVJY29uKVxufVxuXG5jb25zdCBjcmVhdGVBZGRpdGlvbkljb24gPSAobGkpID0+IHtcbiAgICBjb25zdCBuZXdBZGRpdGlvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0FkZGl0aW9uSWNvbi5zcmMgPSBhZGRpdGlvbkljb25cbiAgICBuZXdBZGRpdGlvbkljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChuZXdBZGRpdGlvbkljb24pXG59XG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlQWRkaXRpb25JY29uLFxuICAgIGNyZWF0ZURlbGV0ZUljb24sXG4gICAgY3JlYXRlRm9ybSxcbiAgICBjcmVhdGVNZW51SWNvbixcbiAgICBkaXNwbGF5V2F0Y2hsaXN0LFxufVxuIiwiZG9jdW1lbnQuY29va2llID0gJ1NhbWVTaXRlPUxheCdcblxuZnVuY3Rpb24gdG9EaXJlY3Rpb24oZGVncmVlKSB7XG4gICAgaWYgKGRlZ3JlZSA+IDMzNy41KSByZXR1cm4gJ05vcnRoJ1xuICAgIGlmIChkZWdyZWUgPiAyOTIuNSkgcmV0dXJuICdOb3J0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyNDcuNSkgcmV0dXJuICdXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMDIuNSkgcmV0dXJuICdTb3V0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAxNTcuNSkgcmV0dXJuICdTb3V0aCdcbiAgICBpZiAoZGVncmVlID4gMTIyLjUpIHJldHVybiAnU291dGggRWFzdCdcbiAgICBpZiAoZGVncmVlID4gNjcuNSkgcmV0dXJuICdFYXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMi41KSByZXR1cm4gJ05vcnRoIEVhc3QnXG4gICAgcmV0dXJuICdOb3J0aCdcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjIzNzYxMTUvaG93LXRvLW9idGFpbi1vcGVuLXdlYXRoZXItYXBpLWRhdGUtdGltZS1mcm9tLWNpdHktYmVpbmctZmV0Y2hlZFxuY29uc3QgY2FsY0N1cnJlbnRUaW1lID0gKHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbFRpbWUgPSBkLmdldFRpbWUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSBsb2NhbFRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuY29uc3QgY2FsY1N1blRpbWUgPSAodGltZSwgdGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSB0aW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbi8vIGNvbnN0IGZldGNoRGFpbHlGb3JlY2FzdCA9IChsYXQsIGxvbikgPT4ge1xuLy8gICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElFcnJvckNvbnRhaW5lcicpO1xuLy8gICBjb25zb2xlLmxvZyhsYXQpO1xuLy8gICBjb25zb2xlLmxvZyhsb24pO1xuLy8gICAvLyBmZXRjaCBzZXZlbiBkYXkgZm9yZWNhc3Rcbi8vICAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZleGNsdWRlPW1pbnV0ZWx5LGhvdXJseSxhbGVydHMmdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuLy8gICAgIH0pXG4vLyAgICAgLmNhdGNoKChlcnIpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuY29uc3QgZmV0Y2hIb3VybHlGb3JlY2FzdCA9IChjaXR5UXVlcnkpID0+IHtcbiAgICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElFcnJvckNvbnRhaW5lcicpXG4gICAgLy8gZmV0Y2ggZml2ZSBkYXkvdGhyZWUgaG91ciBmb3JlY2FzdFxuICAgIGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCxcbiAgICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdEFycmF5ID0gW11cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5pY29ufS5wbmdgXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0KSxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRleHQ6IHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0LFxuICAgICAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubGlzdFtpXS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgICAgICByYWluQ2hhbmNlOiByZXNwb25zZS5saXN0W2ldLnBvcCAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcsXG4gICAgICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcpLFxuICAgICAgICAgICAgICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2UubGlzdFtpXS53aW5kLmd1c3QsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2UubGlzdFtpXS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5LnB1c2gobmV3SG91cmx5Rm9yZWNhc3QpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdIb3VybHlGb3JlY2FzdEFycmF5KVxuICAgICAgICAgICAgcmV0dXJuIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgZmV0Y2hDdXJyZW50V2VhdGhlciA9IChjaXR5UXVlcnkpID0+IHtcbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKVxuXG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgLy8gY29uc3Qge2xhdH0gPSByZXNwb25zZS5jb29yZDtcbiAgICAgICAgICAgIC8vIGNvbnN0IHtsb259ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAgICAgICAvLyBmZXRjaERhaWx5Rm9yZWNhc3QobGF0LCBsb24pO1xuICAgICAgICAgICAgY29uc3QgbmV3V2VhdGhlckNhcmQgPSB7XG4gICAgICAgICAgICAgICAgY2l0eTogcmVzcG9uc2UubmFtZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXNwb25zZS5zeXMuY291bnRyeSxcbiAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICBsb2NhbERhdGU6IGNhbGNDdXJyZW50VGltZShyZXNwb25zZS50aW1lem9uZSksXG4gICAgICAgICAgICAgICAgc3VucmlzZTogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5yaXNlICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHN1bnNldDogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5zZXQgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGVtcEN1cnJlbnQ6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICB0ZW1wSGlnaDogcmVzcG9uc2UubWFpbi50ZW1wX21heCxcbiAgICAgICAgICAgICAgICB0ZW1wTG93OiByZXNwb25zZS5tYWluLnRlbXBfbWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2Uud2luZC5kZWcsXG4gICAgICAgICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2Uud2luZC5kZWcpLFxuICAgICAgICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2Uud2luZC5zcGVlZCxcbiAgICAgICAgICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2Uud2luZC5ndXN0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7cmVzcG9uc2Uud2VhdGhlclswXS5pY29ufUAyeC5wbmdgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdXZWF0aGVyQ2FyZClcbiAgICAgICAgICAgIHJldHVybiBuZXdXZWF0aGVyQ2FyZFxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJ1xuICAgICAgICB9KVxufVxuXG5jb25zdCBBUElDaXR5U2VhcmNoID0gKGlucHV0KSA9PiB7XG4gICAgZmV0Y2hDdXJyZW50V2VhdGhlcihpbnB1dClcbiAgICBmZXRjaEhvdXJseUZvcmVjYXN0KGlucHV0KVxufVxuXG4vLyBQbGFjZWhvbGRlciBDb250ZW50XG5BUElDaXR5U2VhcmNoKCdGbG9yZW5jZScpXG5cbmNvbnN0IHZhbGlkYXRlU2VhcmNoID0gKCkgPT4ge1xuICAgIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gICAgY29uc3QgQVBJU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJU2VhcmNoSW5wdXQnKVxuICAgIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJylcbiAgICAvLyByZXNldCBlcnJvclxuICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICcnXG4gICAgLy8gY2hlY2sgZm9yIHNlYXJjaCB0ZXJtXG4gICAgaWYgKEFQSVNlYXJjaElucHV0LnZhbHVlID09PSAnJykge1xuICAgICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nXG4gICAgfSBlbHNlIHtcbiAgICAgICAgQVBJQ2l0eVNlYXJjaChBUElTZWFyY2hJbnB1dC52YWx1ZSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlU2VhcmNoXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgQVBJQ2l0eVNlYXJjaCBmcm9tICcuL3dlYXRoZXJBUEknXG5pbXBvcnQge1xuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QsXG59IGZyb20gJy4vaGVscGVyRnVuY3Rpb25zJ1xuaW1wb3J0IGdpdGh1Ykljb24gZnJvbSAnLi9hc3NldHMvR2l0SHViLWxpZ2h0LTMycHgucG5nJ1xuaW1wb3J0IGxvZ29JY29uIGZyb20gJy4vYXNzZXRzL2xvZ29JY29uLnN2ZydcblxuY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpXG5cbiAgICAvLyBkaXNwbGF5IGxvZ29cbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBsb2dvLnNyYyA9IGxvZ29JY29uXG4gICAgbG9nby50YXJnZXQgPSAnX2JsYW5rJ1xuICAgIGxvZ28uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsb2dvJylcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbylcblxuICAgIC8vIGRpc3BsYXkgdGl0bGVcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdXZWF0aGVyc2VydmUnXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKVxuXG4gICAgcmV0dXJuIGhlYWRlclxufVxuXG5jb25zdCBjcmVhdGVNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1lbnUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtZW51JylcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgaGVhZGVyXG4gICAgY29uc3Qgd2F0Y2hsaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0SGVhZGVyJylcbiAgICB3YXRjaGxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSAnV2F0Y2hsaXN0J1xuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBtZW51XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QoKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGFkZExvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBidXR0b25cbiAgICBjb25zdCBhZGRMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBhZGRMb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uQnRuJylcbiAgICBjcmVhdGVBZGRpdGlvbkljb24oYWRkTG9jYXRpb24pXG4gICAgY29uc3QgYWRkTG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgYWRkTG9jYXRpb25UZXh0LmlubmVyVGV4dCA9ICdBZGQgTG9jYXRpb24nXG4gICAgYWRkTG9jYXRpb24uYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25UZXh0KVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uKVxuXG4gICAgLy8gR2VuZXJhdGUgYW5kIGhpZGUgbmV3IGxvY2F0aW9uIGZvcm1cbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkZvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLm1ldGhvZCA9ICdnZXQnXG4gICAgY3JlYXRlRm9ybShhZGRMb2NhdGlvbkZvcm0pXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Gb3JtKVxuXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3RIZWFkZXIpXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3QpXG4gICAgbWVudS5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkNvbnRhaW5lcilcblxuICAgIHJldHVybiBtZW51XG59XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJBUEkgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICAgIGNvbnN0IFdlYXRoZXJBUElDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50JylcbiAgICAvLyBXZWF0aGVyQVBJQ29udGFpbnRlci5pZCA9ICcnO1xuXG4gICAgLy8gY3JlYXRlIEFQSSB0aXRsZVxuICAgIGNvbnN0IEFQSVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKVxuICAgIEFQSVRpdGxlLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnRUaXRsZScpXG4gICAgQVBJVGl0bGUuaW5uZXJUZXh0ID0gJ1dlYXRoZXJzZXJ2ZSdcblxuICAgIC8vIGNyZWF0ZSBBUEkgaW1hZ2UgY29udGFpbmVyXG4gICAgLy8gY29uc3QgQVBJSW1hZ2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyBBUElJbWFnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZUNvbnRhaW5lcicpO1xuXG4gICAgLy8gY3JlYXRlIEFQSSBpbWdcbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgQVBJSW1hZ2UuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2UnKVxuXG4gICAgLy8gc2VhcmNoIGlucHV0XG4gICAgY29uc3QgQVBJU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgQVBJU2VhcmNoSW5wdXQuY2xhc3NMaXN0LmFkZCgnQVBJU2VhcmNoSW5wdXQnKVxuICAgIEFQSVNlYXJjaElucHV0LnBsYWNlaG9sZGVyID0gJ1NlYXR0bGUnXG5cbiAgICAvLyBzZWFyY2ggYnV0dG9uXG4gICAgY29uc3QgQVBJU2VhcmNoQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBBUElTZWFyY2hCdG4uY2xhc3NMaXN0LmFkZCgnQVBJU2VhcmNoQnRuJylcbiAgICBBUElTZWFyY2hCdG4uaW5uZXJUZXh0ID0gJ1NlYXJjaCdcbiAgICBBUElTZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBBUElDaXR5U2VhcmNoKVxuXG4gICAgLy8gZXJyb3IgY29udGFpbmVyXG4gICAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIEFQSUVycm9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ0FQSUVycm9yQ29udGFpbmVyJylcblxuICAgIC8vIEFwcGVuZFxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVRpdGxlKVxuICAgIC8vIEFQSUltYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKEFQSUltYWdlKTtcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElTZWFyY2hJbnB1dClcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElTZWFyY2hCdG4pXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJRXJyb3JDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpXG4gICAgLy8gV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2VDb250YWluZXIpO1xuICAgIC8vIGNvbnRhaW5lci5hcHBlbmRDaGlsZChXZWF0aGVyQVBJQ29udGFpbnRlcik7XG5cbiAgICByZXR1cm4gV2VhdGhlckFQSUNvbnRhaW50ZXJcbn1cblxuY29uc3QgY3JlYXRlQ29udGVudCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgY29udGVudCBjb250YWluZXJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQnKVxuXG4gICAgLy8gY3JlYXRlIHdlYXRoZXIgYXBwXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQVBJKCkpXG5cbiAgICByZXR1cm4gY29udGVudFxufVxuXG5jb25zdCBjcmVhdGVGb290ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJylcblxuICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGNvcHlyaWdodC50ZXh0Q29udGVudCA9IGBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IGpjYW1wYmVsbDU3YFxuXG4gICAgY29uc3QgZ2l0aHViTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGdpdGh1YkxpbmsuaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vamNhbXBiZWxsNTcnXG4gICAgZ2l0aHViTGluay50YXJnZXQgPSAnX2JsYW5rJ1xuXG4gICAgY29uc3QgbmV3R2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3R2l0aHViSWNvbi5zcmMgPSBnaXRodWJJY29uXG4gICAgbmV3R2l0aHViSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2dpdGh1YicpXG5cbiAgICBnaXRodWJMaW5rLmFwcGVuZENoaWxkKG5ld0dpdGh1Ykljb24pXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGNvcHlyaWdodClcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZ2l0aHViTGluaylcblxuICAgIHJldHVybiBmb290ZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUhlYWRlcigpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlTWVudSgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlQ29udGVudCgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRm9vdGVyKCkpXG59XG4iXSwibmFtZXMiOlsiYWRkaXRpb25JY29uIiwiQVBJQ2l0eVNlYXJjaCIsImRlbGV0ZUljb24iLCJtZW51SWNvbiIsInNldFRhc2tGaWx0ZXIiLCJsaSIsImNvbnRlbnRUaXRsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50IiwiaW5uZXJUZXh0Iiwic3RvcmFnZVdhdGNobGlzdCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJmb3JFYWNoIiwibG9jYXRpb24iLCJzZWxlY3RlZCIsImdldEF0dHJpYnV0ZSIsInNlbGVjdGVkTG9jYXRpb25JZCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJkaXNwbGF5V2F0Y2hsaXN0IiwiY3JlYXRlTWVudUljb24iLCJjaGVja2xpc3RJY29uIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwid2F0Y2hsaXN0Iiwib2xkTGlzdGluZ0NvdW50IiwiY2hpbGRFbGVtZW50Q291bnQiLCJpIiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsImNyZWF0ZUxpc3RpbmciLCJQcm9qIiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImxvY2F0aW9uVGV4dCIsIm5hbWUiLCJjcmVhdGVEZWxldGVJY29uIiwicHJvamVjdCIsImNyZWF0ZUFkZEJ1dHRvbiIsImNvbnRhaW5lciIsImFkZEJ0biIsImNyZWF0ZUNhbmNlbEJ1dHRvbiIsImNhbmNlbEJ0biIsImNyZWF0ZUZvcm0iLCJmb3JtIiwiZm9ybVJvdzEiLCJmb3JtUm93MiIsImZvcm1Sb3czIiwibmV3TG9jYXRpb25JbnB1dCIsInBsYWNlaG9sZGVyIiwiZGVsZXRlV2F0Y2hsaXN0RW50cnkiLCJkb29tZWRJbmRleCIsInNwbGljZSIsIm5ld0RlbGV0ZUljb24iLCJ0cmFzaEljb24iLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlQWRkaXRpb25JY29uIiwibmV3QWRkaXRpb25JY29uIiwiY29va2llIiwidG9EaXJlY3Rpb24iLCJkZWdyZWUiLCJjYWxjQ3VycmVudFRpbWUiLCJ0aW1lem9uZSIsImQiLCJEYXRlIiwibG9jYWxUaW1lIiwiZ2V0VGltZSIsImxvY2FsT2Zmc2V0IiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJ1dGMiLCJuZXdDaXR5IiwiY2FsY1N1blRpbWUiLCJ0aW1lIiwiZmV0Y2hIb3VybHlGb3JlY2FzdCIsImNpdHlRdWVyeSIsIkFQSUVycm9yQ29udGFpbmVyIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm5ld0hvdXJseUZvcmVjYXN0QXJyYXkiLCJuZXdIb3VybHlGb3JlY2FzdCIsImRhdGUiLCJsaXN0IiwiZHRfdHh0IiwiZGF0ZVRleHQiLCJodW1pZGl0eSIsIm1haW4iLCJyYWluQ2hhbmNlIiwicG9wIiwidGVtcGVyYXR1cmUiLCJ0ZW1wIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXIiLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJkZXNjcmlwdGlvbiIsIndpbmREZWdyZWUiLCJ3aW5kIiwiZGVnIiwid2luZERpcmVjdGlvbiIsIndpbmRHdXN0IiwiZ3VzdCIsIndpbmRTcGVlZCIsInNwZWVkIiwicHVzaCIsImNhdGNoIiwiZXJyIiwiZmV0Y2hDdXJyZW50V2VhdGhlciIsIkFQSUltYWdlIiwibmV3V2VhdGhlckNhcmQiLCJjaXR5IiwiY291bnRyeSIsInN5cyIsImxvY2FsRGF0ZSIsInN1bnJpc2UiLCJzdW5zZXQiLCJ0ZW1wQ3VycmVudCIsInRlbXBIaWdoIiwidGVtcF9tYXgiLCJ0ZW1wTG93IiwidGVtcF9taW4iLCJpY29uIiwiaW5wdXQiLCJ2YWxpZGF0ZVNlYXJjaCIsIkFQSVNlYXJjaElucHV0IiwidmFsdWUiLCJnaXRodWJJY29uIiwibG9nb0ljb24iLCJjcmVhdGVIZWFkZXIiLCJoZWFkZXIiLCJsb2dvIiwidGl0bGUiLCJjcmVhdGVNZW51IiwibWVudSIsIndhdGNobGlzdEhlYWRlciIsImFkZExvY2F0aW9uQ29udGFpbmVyIiwiYWRkTG9jYXRpb24iLCJhZGRMb2NhdGlvblRleHQiLCJhZGRMb2NhdGlvbkZvcm0iLCJtZXRob2QiLCJjcmVhdGVXZWF0aGVyQVBJIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJBUElUaXRsZSIsIkFQSVNlYXJjaEJ0biIsImNyZWF0ZUNvbnRlbnQiLCJjb250ZW50IiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiY29weXJpZ2h0IiwiZ2V0RnVsbFllYXIiLCJnaXRodWJMaW5rIiwiaHJlZiIsIm5ld0dpdGh1Ykljb24iLCJpbml0aWFsaXplIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=