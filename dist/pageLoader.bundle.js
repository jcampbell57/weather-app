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





const selectLocation = li => {
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
}; // Add single location to watchlist (called below)


const createListing = (Proj, i) => {
  const watchlist = document.querySelector('#watchlist');
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

    selectLocation(location);
  });
  createMenuIcon(location);
  const locationText = document.createElement('span');
  locationText.textContent = Proj.name;
  location.appendChild(locationText);
  createDeleteIcon(location, i);
  watchlist.appendChild(location);
}; // Display entire array of locations to watchlist


const displayWatchlist = () => {
  // Grab watchlist
  const watchlist = document.querySelector('#watchlist'); // Clear location listings

  const oldListingCount = watchlist.childElementCount; // eslint-disable-next-line no-plusplus

  for (let i = 0; i < oldListingCount; i++) {
    watchlist.firstChild.remove();
  } // Append all locations to watchlist


  let i = 0;
  const storageWatchlist = JSON.parse(localStorage.getItem('storageWatchlist'));
  storageWatchlist.forEach(location => {
    createListing(location, i); // eslint-disable-next-line no-plusplus

    i++;
  });
};

const createAddButton = container => {
  const addBtn = document.createElement('button');
  addBtn.classList.add('addBtn');
  addBtn.innerText = 'search';
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
  // row one: assign input
  const formRow1 = document.createElement('div');
  formRow1.setAttribute('class', 'formRow');
  const newLocationInput = document.createElement('input');
  newLocationInput.classList.add('newLocationInput');
  newLocationInput.placeholder = 'Florence';
  newLocationInput.name = 'newLocationInput';
  formRow1.appendChild(newLocationInput); // row two: submit and cancel buttons

  const formRow2 = document.createElement('div');
  formRow2.setAttribute('class', 'formRow');
  formRow2.setAttribute('id', 'formButtons');
  createAddButton(formRow2, form);
  createCancelButton(formRow2, form); // row three: assign error class and text

  const formRow3 = document.createElement('div'); // formRow3.setAttribute('id', 'hidden')

  formRow3.setAttribute('class', 'newProjErrorContainer'); // formRow3.innerText = 'Which city?'

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


const submitLocation = input => {
  // create location object
  const newLocation = {
    name: input,
    selected: true
  }; // grab array from storage

  const storageWatchlist = JSON.parse(localStorage.getItem('storageWatchlist')); // deselect previously selected location

  storageWatchlist.forEach(location => {
    if (location.selected === true) {
      location.selected = false;
    }
  }); // push location to array

  storageWatchlist.push(newLocation); // console.log(storageWatchlist)
  // set array back into storage

  localStorage.setItem('storageWatchlist', JSON.stringify(storageWatchlist)); // refresh watchlist
};

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

    submitLocation(response.name);
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
// APICitySearch('Florence')


const validateSearch = e => {
  e.preventDefault(); // grab dom elements

  const newLocationInput = document.querySelector('.newLocationInput');
  const newProjErrorContainer = document.querySelector('.newProjErrorContainer'); // reset error

  newProjErrorContainer.innerText = ''; // check for search term

  if (newLocationInput.value === '') {
    newProjErrorContainer.innerText = 'Which city?';
  } else {
    APICitySearch(newLocationInput.value);
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
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.js");
/* harmony import */ var _assets_GitHub_light_32px_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/GitHub-light-32px.png */ "./src/assets/GitHub-light-32px.png");
/* harmony import */ var _assets_logoIcon_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/logoIcon.svg */ "./src/assets/logoIcon.svg");




const createHeader = () => {
  const header = document.createElement('header'); // display logo

  const logo = document.createElement('img');
  logo.src = _assets_logoIcon_svg__WEBPACK_IMPORTED_MODULE_2__;
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
  (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.createAdditionIcon)(addLocation);
  const addLocationText = document.createElement('span');
  addLocationText.innerText = 'Add Location';
  addLocation.appendChild(addLocationText);
  addLocationContainer.appendChild(addLocation); // Generate and hide new location form

  const addLocationForm = document.createElement('form');
  addLocationForm.setAttribute('class', 'addLocationForm');
  addLocationForm.setAttribute('id', 'hidden');
  addLocationForm.method = 'get';
  (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.createForm)(addLocationForm);
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
  APIImage.classList.add('APIImage'); // Append

  WeatherAPIContainter.appendChild(APITitle); // APIImageContainer.appendChild(APIImage);

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
  newGithubIcon.src = _assets_GitHub_light_32px_png__WEBPACK_IMPORTED_MODULE_1__;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF1QixLQUF2QixDQUF0QjtFQUNBMkksYUFBYSxDQUFDMUksR0FBZCxHQUFvQmlILDBEQUFwQjtFQUNBeUIsYUFBYSxDQUFDekksWUFBZCxDQUEyQixPQUEzQixFQUFvQyxRQUFwQztFQUVBdUksVUFBVSxDQUFDdEksV0FBWCxDQUF1QndJLGFBQXZCO0VBQ0FMLE1BQU0sQ0FBQ25JLFdBQVAsQ0FBbUJvSSxTQUFuQjtFQUNBRCxNQUFNLENBQUNuSSxXQUFQLENBQW1Cc0ksVUFBbkI7RUFFQSxPQUFPSCxNQUFQO0FBQ0gsQ0FuQkQ7O0FBcUJlLFNBQVNNLFVBQVQsR0FBc0I7RUFDakMvSixRQUFRLENBQUNnSyxJQUFULENBQWMxSSxXQUFkLENBQTBCaUgsWUFBWSxFQUF0QztFQUNBdkksUUFBUSxDQUFDZ0ssSUFBVCxDQUFjMUksV0FBZCxDQUEwQnFILFVBQVUsRUFBcEM7RUFDQTNJLFFBQVEsQ0FBQ2dLLElBQVQsQ0FBYzFJLFdBQWQsQ0FBMEJnSSxhQUFhLEVBQXZDO0VBQ0F0SixRQUFRLENBQUNnSyxJQUFULENBQWMxSSxXQUFkLENBQTBCa0ksWUFBWSxFQUF0QztBQUNILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlckFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcGFnZUxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWRkaXRpb25JY29uIGZyb20gJy4vYXNzZXRzL3BsdXMuc3ZnJ1xuaW1wb3J0IHZhbGlkYXRlU2VhcmNoIGZyb20gJy4vd2VhdGhlckFQSSdcbmltcG9ydCBkZWxldGVJY29uIGZyb20gJy4vYXNzZXRzL2RlbGV0ZS5zdmcnXG5pbXBvcnQgbWVudUljb24gZnJvbSAnLi9hc3NldHMvbWVudUljb24uc3ZnJ1xuXG5jb25zdCBzZWxlY3RMb2NhdGlvbiA9IChsaSkgPT4ge1xuICAgIC8vIHNldCBjb250ZW50IHRpdGxlIChmaWx0ZXIpXG4gICAgY29uc3QgY29udGVudFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRUaXRsZScpXG4gICAgY29udGVudFRpdGxlLnRleHRDb250ZW50ID0gbGkuaW5uZXJUZXh0XG5cbiAgICAvLyBncmFiIGxvY2F0aW9ucyBhcnJheSBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIGRlc2VsZWN0IGFsbCBsb2NhdGlvbnNcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9ICdmYWxzZSdcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBTZWxlY3QgbG9jYXRpb24gaWYgb25lIGlzIGNob3NlbiAobWFpbiBtZW51IHNlbGVjdGlvbiBpcyBoYW5kbGVkIGluIGV2ZW50IGxpc3RlbmVyKVxuICAgIGlmIChsaS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdsb2NhdGlvbicpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMb2NhdGlvbklkID0gbGkuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgICAgIHN0b3JhZ2VXYXRjaGxpc3Rbc2VsZWN0ZWRMb2NhdGlvbklkXS5zZWxlY3RlZCA9ICd0cnVlJ1xuICAgIH1cblxuICAgIC8vIHNldCBsb2NhdGlvbnMgYXJyYXkgYmFjayBpbnRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyByZWZyZXNoXG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IGNyZWF0ZU1lbnVJY29uID0gKGxpKSA9PiB7XG4gICAgY29uc3QgY2hlY2tsaXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgY2hlY2tsaXN0SWNvbi5zcmMgPSBtZW51SWNvblxuICAgIGNoZWNrbGlzdEljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChjaGVja2xpc3RJY29uKVxufVxuXG4vLyBBZGQgc2luZ2xlIGxvY2F0aW9uIHRvIHdhdGNobGlzdCAoY2FsbGVkIGJlbG93KVxuY29uc3QgY3JlYXRlTGlzdGluZyA9IChQcm9qLCBpKSA9PiB7XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKGBsb2NhdGlvbmApXG4gICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICAvLyBhc3NpZ24gY2xhc3MgdG8gc2VsZWN0ZWQgbG9jYXRpb24gbGlzdGluZ1xuICAgIGlmIChQcm9qLnNlbGVjdGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIH1cblxuICAgIC8vIGV2ZW50IGxpc3RlbmVyIHRvIGRpc3BsYXkgc2VsZWN0ZWQgbG9jYXRpb24ncyB3ZWF0aGVyXG4gICAgbG9jYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBpZiBkZWxldGluZyBsaXN0aW5nLCBkbyBub3QgZGlzcGxheSB3ZWF0aGVyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZUl0ZW0nKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0TG9jYXRpb24obG9jYXRpb24pXG4gICAgfSlcblxuICAgIGNyZWF0ZU1lbnVJY29uKGxvY2F0aW9uKVxuICAgIGNvbnN0IGxvY2F0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGxvY2F0aW9uVGV4dC50ZXh0Q29udGVudCA9IFByb2oubmFtZVxuICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKGxvY2F0aW9uVGV4dClcbiAgICBjcmVhdGVEZWxldGVJY29uKGxvY2F0aW9uLCBpKVxuICAgIHdhdGNobGlzdC5hcHBlbmRDaGlsZChsb2NhdGlvbilcbn1cblxuLy8gRGlzcGxheSBlbnRpcmUgYXJyYXkgb2YgbG9jYXRpb25zIHRvIHdhdGNobGlzdFxuY29uc3QgZGlzcGxheVdhdGNobGlzdCA9ICgpID0+IHtcbiAgICAvLyBHcmFiIHdhdGNobGlzdFxuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3YXRjaGxpc3QnKVxuXG4gICAgLy8gQ2xlYXIgbG9jYXRpb24gbGlzdGluZ3NcbiAgICBjb25zdCBvbGRMaXN0aW5nQ291bnQgPSB3YXRjaGxpc3QuY2hpbGRFbGVtZW50Q291bnRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZExpc3RpbmdDb3VudDsgaSsrKSB7XG4gICAgICAgIHdhdGNobGlzdC5maXJzdENoaWxkLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgLy8gQXBwZW5kIGFsbCBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG4gICAgbGV0IGkgPSAwXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBjcmVhdGVMaXN0aW5nKGxvY2F0aW9uLCBpKVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgaSsrXG4gICAgfSlcbn1cblxuY29uc3QgY3JlYXRlQWRkQnV0dG9uID0gKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoJ2FkZEJ0bicpXG4gICAgYWRkQnRuLmlubmVyVGV4dCA9ICdzZWFyY2gnXG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHZhbGlkYXRlU2VhcmNoKGUpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRCdG4pXG59XG5cbmNvbnN0IGNyZWF0ZUNhbmNlbEJ1dHRvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdjYW5jZWxCdG4nKVxuICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuICAgIGNhbmNlbEJ0bi5pbm5lclRleHQgPSAnY2FuY2VsJ1xuICAgIC8vIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgLy8gICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vICAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbiAgICAvLyB9KVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pXG59XG5cbi8vIGNyZWF0ZUZvcm1cbmNvbnN0IGNyZWF0ZUZvcm0gPSAoZm9ybSkgPT4ge1xuICAgIC8vIHJvdyBvbmU6IGFzc2lnbiBpbnB1dFxuICAgIGNvbnN0IGZvcm1Sb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93MS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgbmV3TG9jYXRpb25JbnB1dC5jbGFzc0xpc3QuYWRkKCduZXdMb2NhdGlvbklucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LnBsYWNlaG9sZGVyID0gJ0Zsb3JlbmNlJ1xuICAgIG5ld0xvY2F0aW9uSW5wdXQubmFtZSA9ICduZXdMb2NhdGlvbklucHV0J1xuICAgIGZvcm1Sb3cxLmFwcGVuZENoaWxkKG5ld0xvY2F0aW9uSW5wdXQpXG5cbiAgICAvLyByb3cgdHdvOiBzdWJtaXQgYW5kIGNhbmNlbCBidXR0b25zXG4gICAgY29uc3QgZm9ybVJvdzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdpZCcsICdmb3JtQnV0dG9ucycpXG4gICAgY3JlYXRlQWRkQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuICAgIGNyZWF0ZUNhbmNlbEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcblxuICAgIC8vIHJvdyB0aHJlZTogYXNzaWduIGVycm9yIGNsYXNzIGFuZCB0ZXh0XG4gICAgY29uc3QgZm9ybVJvdzMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIC8vIGZvcm1Sb3czLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBmb3JtUm93My5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ25ld1Byb2pFcnJvckNvbnRhaW5lcicpXG4gICAgLy8gZm9ybVJvdzMuaW5uZXJUZXh0ID0gJ1doaWNoIGNpdHk/J1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MSlcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cyKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzMpXG59XG5cbi8vIERlbGV0ZSB3YXRjaGxpc3QgZW50cnlcbmNvbnN0IGRlbGV0ZVdhdGNobGlzdEVudHJ5ID0gKGUpID0+IHtcbiAgICAvLyBncmFiIGFycmF5cyBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIElkZW50aWZ5IGVudHJ5IHRvIGRlbGV0ZVxuICAgIGNvbnN0IGRvb21lZEluZGV4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgLy8gY29uc3QgZG9vbWVkTmFtZSA9IHN0b3JhZ2VXYXRjaGxpc3RbZG9vbWVkSW5kZXhdLm5hbWU7XG5cbiAgICAvLyBkZWxldGUgZW50cnlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnNwbGljZShkb29tZWRJbmRleCwgMSlcblxuICAgIC8vIHNldCBjaGFuZ2VzIHRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyBJZiBkb29tZWQgZW50cnkgd2FzIHNlbGVjdGVkLCBjbGVhciBjb250ZW50IGRpc3BsYXlcbiAgICAvLyBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJyk7XG4gICAgLy8gY29uc3QgYWxsVGFza3NDbGFzc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsVGFza3MnKS5jbGFzc0xpc3RcbiAgICAvLyBpZiAoY29udGVudFRpdGxlLnRleHRDb250ZW50ID09PSBkb29tZWROYW1lKSB7XG4gICAgLy8gICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9ICdBbGwgdGFza3MnXG4gICAgLy8gICAgIGFsbFRhc2tzQ2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIC8vIH1cblxuICAgIC8vIHJlZnJlc2ggd2F0Y2hpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlRGVsZXRlSWNvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICAvLyBjcmVhdGUgaW1hZ2UgYW5kIGFzc2lnbiBhdHRyaWJ1dGVzXG4gICAgY29uc3QgbmV3RGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3RGVsZXRlSWNvbi5zcmMgPSBkZWxldGVJY29uXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24gZGVsZXRlSXRlbScpXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuXG4gICAgLy8gQUREIEVWRU5UIExJU1RFTkVSXG4gICAgaWYgKFxuICAgICAgICBjb250YWluZXIuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAncHJvamVjdCcgfHxcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdCcpXG4gICAgKSB7XG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyIHRvIGRlbGV0ZSBwcm9qZWN0XG4gICAgICAgIG5ld0RlbGV0ZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeWAsXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YCxcbiAgICAgICAgICAgIGBoaWRkZW5gXG4gICAgICAgIClcbiAgICAgICAgbmV3RGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PlxuICAgICAgICAgICAgZGVsZXRlV2F0Y2hsaXN0RW50cnkoZSwgaSlcbiAgICAgICAgKVxuICAgICAgICAvLyBkaXNwbGF5IHRyYXNoIGljb24gb24gaG92ZXJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGhpZGUgdHJhc2ggaWNvblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBzdHJhbmdlJylcbiAgICB9XG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdEZWxldGVJY29uKVxufVxuXG5jb25zdCBjcmVhdGVBZGRpdGlvbkljb24gPSAobGkpID0+IHtcbiAgICBjb25zdCBuZXdBZGRpdGlvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0FkZGl0aW9uSWNvbi5zcmMgPSBhZGRpdGlvbkljb25cbiAgICBuZXdBZGRpdGlvbkljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChuZXdBZGRpdGlvbkljb24pXG59XG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlQWRkaXRpb25JY29uLFxuICAgIGNyZWF0ZURlbGV0ZUljb24sXG4gICAgY3JlYXRlRm9ybSxcbiAgICBjcmVhdGVNZW51SWNvbixcbiAgICBkaXNwbGF5V2F0Y2hsaXN0LFxufVxuIiwiZG9jdW1lbnQuY29va2llID0gJ1NhbWVTaXRlPUxheCdcblxuZnVuY3Rpb24gdG9EaXJlY3Rpb24oZGVncmVlKSB7XG4gICAgaWYgKGRlZ3JlZSA+IDMzNy41KSByZXR1cm4gJ05vcnRoJ1xuICAgIGlmIChkZWdyZWUgPiAyOTIuNSkgcmV0dXJuICdOb3J0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyNDcuNSkgcmV0dXJuICdXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMDIuNSkgcmV0dXJuICdTb3V0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAxNTcuNSkgcmV0dXJuICdTb3V0aCdcbiAgICBpZiAoZGVncmVlID4gMTIyLjUpIHJldHVybiAnU291dGggRWFzdCdcbiAgICBpZiAoZGVncmVlID4gNjcuNSkgcmV0dXJuICdFYXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMi41KSByZXR1cm4gJ05vcnRoIEVhc3QnXG4gICAgcmV0dXJuICdOb3J0aCdcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjIzNzYxMTUvaG93LXRvLW9idGFpbi1vcGVuLXdlYXRoZXItYXBpLWRhdGUtdGltZS1mcm9tLWNpdHktYmVpbmctZmV0Y2hlZFxuY29uc3QgY2FsY0N1cnJlbnRUaW1lID0gKHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbFRpbWUgPSBkLmdldFRpbWUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSBsb2NhbFRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuY29uc3QgY2FsY1N1blRpbWUgPSAodGltZSwgdGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSB0aW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbi8vIGNvbnN0IGZldGNoRGFpbHlGb3JlY2FzdCA9IChsYXQsIGxvbikgPT4ge1xuLy8gICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElFcnJvckNvbnRhaW5lcicpO1xuLy8gICBjb25zb2xlLmxvZyhsYXQpO1xuLy8gICBjb25zb2xlLmxvZyhsb24pO1xuLy8gICAvLyBmZXRjaCBzZXZlbiBkYXkgZm9yZWNhc3Rcbi8vICAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZleGNsdWRlPW1pbnV0ZWx5LGhvdXJseSxhbGVydHMmdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuLy8gICAgIH0pXG4vLyAgICAgLmNhdGNoKChlcnIpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuY29uc3Qgc3VibWl0TG9jYXRpb24gPSAoaW5wdXQpID0+IHtcbiAgICAvLyBjcmVhdGUgbG9jYXRpb24gb2JqZWN0XG4gICAgY29uc3QgbmV3TG9jYXRpb24gPSB7XG4gICAgICAgIG5hbWU6IGlucHV0LFxuICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICB9XG5cbiAgICAvLyBncmFiIGFycmF5IGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gZGVzZWxlY3QgcHJldmlvdXNseSBzZWxlY3RlZCBsb2NhdGlvblxuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gcHVzaCBsb2NhdGlvbiB0byBhcnJheVxuICAgIHN0b3JhZ2VXYXRjaGxpc3QucHVzaChuZXdMb2NhdGlvbilcbiAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlV2F0Y2hsaXN0KVxuXG4gICAgLy8gc2V0IGFycmF5IGJhY2sgaW50byBzdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIHJlZnJlc2ggd2F0Y2hsaXN0XG59XG5cbmNvbnN0IGZldGNoSG91cmx5Rm9yZWNhc3QgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKVxuICAgIC8vIGZldGNoIGZpdmUgZGF5L3RocmVlIGhvdXIgZm9yZWNhc3RcbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3RBcnJheSA9IFtdXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIC5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uaWNvbn0ucG5nYFxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShyZXNwb25zZS5saXN0W2ldLmR0X3R4dCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUZXh0OiByZXNwb25zZS5saXN0W2ldLmR0X3R4dCxcbiAgICAgICAgICAgICAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICAgICAgcmFpbkNoYW5jZTogcmVzcG9uc2UubGlzdFtpXS5wb3AgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS5saXN0W2ldLndpbmQuZGVnLFxuICAgICAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS5saXN0W2ldLndpbmQuZGVnKSxcbiAgICAgICAgICAgICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5ndXN0LFxuICAgICAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5zcGVlZCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheS5wdXNoKG5ld0hvdXJseUZvcmVjYXN0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3SG91cmx5Rm9yZWNhc3RBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBuZXdIb3VybHlGb3JlY2FzdEFycmF5XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IGZldGNoQ3VycmVudFdlYXRoZXIgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKVxuICAgIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJylcblxuICAgIGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIC8vIGNvbnN0IHtsYXR9ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAgICAgICAvLyBjb25zdCB7bG9ufSA9IHJlc3BvbnNlLmNvb3JkO1xuICAgICAgICAgICAgLy8gZmV0Y2hEYWlseUZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgICAgICAgICAgIHN1Ym1pdExvY2F0aW9uKHJlc3BvbnNlLm5hbWUpXG4gICAgICAgICAgICBjb25zdCBuZXdXZWF0aGVyQ2FyZCA9IHtcbiAgICAgICAgICAgICAgICBjaXR5OiByZXNwb25zZS5uYW1lLFxuICAgICAgICAgICAgICAgIGNvdW50cnk6IHJlc3BvbnNlLnN5cy5jb3VudHJ5LFxuICAgICAgICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgIGxvY2FsRGF0ZTogY2FsY0N1cnJlbnRUaW1lKHJlc3BvbnNlLnRpbWV6b25lKSxcbiAgICAgICAgICAgICAgICBzdW5yaXNlOiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnJpc2UgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgc3Vuc2V0OiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnNldCAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnRpbWV6b25lXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0ZW1wQ3VycmVudDogcmVzcG9uc2UubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgIHRlbXBIaWdoOiByZXNwb25zZS5tYWluLnRlbXBfbWF4LFxuICAgICAgICAgICAgICAgIHRlbXBMb3c6IHJlc3BvbnNlLm1haW4udGVtcF9taW4sXG4gICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS53aW5kLmd1c3QsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBBUElJbWFnZS5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2BcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgICAgICAgcmV0dXJuIG5ld1dlYXRoZXJDYXJkXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IEFQSUNpdHlTZWFyY2ggPSAoaW5wdXQpID0+IHtcbiAgICBmZXRjaEN1cnJlbnRXZWF0aGVyKGlucHV0KVxuICAgIGZldGNoSG91cmx5Rm9yZWNhc3QoaW5wdXQpXG59XG5cbi8vIFBsYWNlaG9sZGVyIENvbnRlbnRcbi8vIEFQSUNpdHlTZWFyY2goJ0Zsb3JlbmNlJylcblxuY29uc3QgdmFsaWRhdGVTZWFyY2ggPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdMb2NhdGlvbklucHV0JylcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG4gICAgLy8gcmVzZXQgZXJyb3JcbiAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJydcbiAgICAvLyBjaGVjayBmb3Igc2VhcmNoIHRlcm1cbiAgICBpZiAobmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcbiAgICB9IGVsc2Uge1xuICAgICAgICBBUElDaXR5U2VhcmNoKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZVNlYXJjaFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHtcbiAgICBjcmVhdGVBZGRpdGlvbkljb24sXG4gICAgY3JlYXRlRm9ybSxcbiAgICAvLyBkaXNwbGF5V2F0Y2hsaXN0LFxufSBmcm9tICcuL2hlbHBlckZ1bmN0aW9ucydcbmltcG9ydCBnaXRodWJJY29uIGZyb20gJy4vYXNzZXRzL0dpdEh1Yi1saWdodC0zMnB4LnBuZydcbmltcG9ydCBsb2dvSWNvbiBmcm9tICcuL2Fzc2V0cy9sb2dvSWNvbi5zdmcnXG5cbmNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKVxuXG4gICAgLy8gZGlzcGxheSBsb2dvXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbG9nby5zcmMgPSBsb2dvSWNvblxuICAgIGxvZ28udGFyZ2V0ID0gJ19ibGFuaydcbiAgICBsb2dvLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbG9nbycpXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGxvZ28pXG5cbiAgICAvLyBkaXNwbGF5IHRpdGxlXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnV2VhdGhlcnNlcnZlJ1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSlcblxuICAgIHJldHVybiBoZWFkZXJcbn1cblxuY29uc3QgY3JlYXRlTWVudSA9ICgpID0+IHtcbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBtZW51LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWVudScpXG5cbiAgICAvLyBjcmVhdGUgd2F0Y2hsaXN0IGhlYWRlclxuICAgIGNvbnN0IHdhdGNobGlzdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIHdhdGNobGlzdEhlYWRlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdEhlYWRlcicpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnRleHRDb250ZW50ID0gJ1dhdGNobGlzdCdcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgbWVudVxuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICB3YXRjaGxpc3Quc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3QnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dhdGNobGlzdCcpXG5cbiAgICAvLyBkaXNwbGF5V2F0Y2hsaXN0KClcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBjb250YWluZXJcbiAgICBjb25zdCBhZGRMb2NhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG5cbiAgICAvLyBHZW5lcmF0ZSBhZGQgbG9jYXRpb24gYnV0dG9uXG4gICAgY29uc3QgYWRkTG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgYWRkTG9jYXRpb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkJ0bicpXG4gICAgY3JlYXRlQWRkaXRpb25JY29uKGFkZExvY2F0aW9uKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGFkZExvY2F0aW9uVGV4dC5pbm5lclRleHQgPSAnQWRkIExvY2F0aW9uJ1xuICAgIGFkZExvY2F0aW9uLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uVGV4dClcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbilcblxuICAgIC8vIEdlbmVyYXRlIGFuZCBoaWRlIG5ldyBsb2NhdGlvbiBmb3JtXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkTG9jYXRpb25Gb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5tZXRob2QgPSAnZ2V0J1xuICAgIGNyZWF0ZUZvcm0oYWRkTG9jYXRpb25Gb3JtKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uRm9ybSlcblxuICAgIG1lbnUuYXBwZW5kQ2hpbGQod2F0Y2hsaXN0SGVhZGVyKVxuICAgIG1lbnUuYXBwZW5kQ2hpbGQod2F0Y2hsaXN0KVxuICAgIG1lbnUuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Db250YWluZXIpXG5cbiAgICByZXR1cm4gbWVudVxufVxuXG5jb25zdCBjcmVhdGVXZWF0aGVyQVBJID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBXZWF0aGVyIEFQSSBjb250YWluZXJcbiAgICBjb25zdCBXZWF0aGVyQVBJQ29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnV2VhdGhlckFQSUNvbnRhaW50ZXInLCAnY29udGVudCcpXG4gICAgLy8gV2VhdGhlckFQSUNvbnRhaW50ZXIuaWQgPSAnJztcblxuICAgIC8vIGNyZWF0ZSBBUEkgdGl0bGVcbiAgICBjb25zdCBBUElUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICBBUElUaXRsZS5jbGFzc0xpc3QuYWRkKCdjb250ZW50VGl0bGUnKVxuICAgIEFQSVRpdGxlLmlubmVyVGV4dCA9ICdXZWF0aGVyc2VydmUnXG5cbiAgICAvLyBjcmVhdGUgQVBJIGltYWdlIGNvbnRhaW5lclxuICAgIC8vIGNvbnN0IEFQSUltYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgLy8gQVBJSW1hZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2VDb250YWluZXInKTtcblxuICAgIC8vIGNyZWF0ZSBBUEkgaW1nXG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIEFQSUltYWdlLmNsYXNzTGlzdC5hZGQoJ0FQSUltYWdlJylcblxuICAgIC8vIEFwcGVuZFxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVRpdGxlKVxuICAgIC8vIEFQSUltYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKEFQSUltYWdlKTtcblxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlKVxuICAgIC8vIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlQ29udGFpbmVyKTtcbiAgICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoV2VhdGhlckFQSUNvbnRhaW50ZXIpO1xuXG4gICAgcmV0dXJuIFdlYXRoZXJBUElDb250YWludGVyXG59XG5cbmNvbnN0IGNyZWF0ZUNvbnRlbnQgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIGNvbnRlbnQgY29udGFpbmVyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250ZW50JylcblxuICAgIC8vIGNyZWF0ZSB3ZWF0aGVyIGFwcFxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY3JlYXRlV2VhdGhlckFQSSgpKVxuXG4gICAgcmV0dXJuIGNvbnRlbnRcbn1cblxuY29uc3QgY3JlYXRlRm9vdGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpXG5cbiAgICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBjb3B5cmlnaHQudGV4dENvbnRlbnQgPSBgQ29weXJpZ2h0IMKpICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBqY2FtcGJlbGw1N2BcblxuICAgIGNvbnN0IGdpdGh1YkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBnaXRodWJMaW5rLmhyZWYgPSAnaHR0cHM6Ly9naXRodWIuY29tL2pjYW1wYmVsbDU3J1xuICAgIGdpdGh1YkxpbmsudGFyZ2V0ID0gJ19ibGFuaydcblxuICAgIGNvbnN0IG5ld0dpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0dpdGh1Ykljb24uc3JjID0gZ2l0aHViSWNvblxuICAgIG5ld0dpdGh1Ykljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdnaXRodWInKVxuXG4gICAgZ2l0aHViTGluay5hcHBlbmRDaGlsZChuZXdHaXRodWJJY29uKVxuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChjb3B5cmlnaHQpXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGdpdGh1YkxpbmspXG5cbiAgICByZXR1cm4gZm9vdGVyXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZU1lbnUoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUNvbnRlbnQoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUZvb3RlcigpKVxufVxuIl0sIm5hbWVzIjpbImFkZGl0aW9uSWNvbiIsInZhbGlkYXRlU2VhcmNoIiwiZGVsZXRlSWNvbiIsIm1lbnVJY29uIiwic2VsZWN0TG9jYXRpb24iLCJsaSIsImNvbnRlbnRUaXRsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50IiwiaW5uZXJUZXh0Iiwic3RvcmFnZVdhdGNobGlzdCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJmb3JFYWNoIiwibG9jYXRpb24iLCJzZWxlY3RlZCIsImdldEF0dHJpYnV0ZSIsInNlbGVjdGVkTG9jYXRpb25JZCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJkaXNwbGF5V2F0Y2hsaXN0IiwiY3JlYXRlTWVudUljb24iLCJjaGVja2xpc3RJY29uIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlTGlzdGluZyIsIlByb2oiLCJpIiwid2F0Y2hsaXN0IiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImxvY2F0aW9uVGV4dCIsIm5hbWUiLCJjcmVhdGVEZWxldGVJY29uIiwib2xkTGlzdGluZ0NvdW50IiwiY2hpbGRFbGVtZW50Q291bnQiLCJmaXJzdENoaWxkIiwicmVtb3ZlIiwiY3JlYXRlQWRkQnV0dG9uIiwiY29udGFpbmVyIiwiYWRkQnRuIiwiY3JlYXRlQ2FuY2VsQnV0dG9uIiwiY2FuY2VsQnRuIiwiY3JlYXRlRm9ybSIsImZvcm0iLCJmb3JtUm93MSIsIm5ld0xvY2F0aW9uSW5wdXQiLCJwbGFjZWhvbGRlciIsImZvcm1Sb3cyIiwiZm9ybVJvdzMiLCJkZWxldGVXYXRjaGxpc3RFbnRyeSIsImRvb21lZEluZGV4Iiwic3BsaWNlIiwibmV3RGVsZXRlSWNvbiIsInRyYXNoSWNvbiIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVBZGRpdGlvbkljb24iLCJuZXdBZGRpdGlvbkljb24iLCJjb29raWUiLCJ0b0RpcmVjdGlvbiIsImRlZ3JlZSIsImNhbGNDdXJyZW50VGltZSIsInRpbWV6b25lIiwiZCIsIkRhdGUiLCJsb2NhbFRpbWUiLCJnZXRUaW1lIiwibG9jYWxPZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsInV0YyIsIm5ld0NpdHkiLCJjYWxjU3VuVGltZSIsInRpbWUiLCJzdWJtaXRMb2NhdGlvbiIsImlucHV0IiwibmV3TG9jYXRpb24iLCJwdXNoIiwiZmV0Y2hIb3VybHlGb3JlY2FzdCIsImNpdHlRdWVyeSIsIkFQSUVycm9yQ29udGFpbmVyIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm5ld0hvdXJseUZvcmVjYXN0QXJyYXkiLCJuZXdIb3VybHlGb3JlY2FzdCIsImRhdGUiLCJsaXN0IiwiZHRfdHh0IiwiZGF0ZVRleHQiLCJodW1pZGl0eSIsIm1haW4iLCJyYWluQ2hhbmNlIiwicG9wIiwidGVtcGVyYXR1cmUiLCJ0ZW1wIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXIiLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJkZXNjcmlwdGlvbiIsIndpbmREZWdyZWUiLCJ3aW5kIiwiZGVnIiwid2luZERpcmVjdGlvbiIsIndpbmRHdXN0IiwiZ3VzdCIsIndpbmRTcGVlZCIsInNwZWVkIiwiY2F0Y2giLCJlcnIiLCJmZXRjaEN1cnJlbnRXZWF0aGVyIiwiQVBJSW1hZ2UiLCJuZXdXZWF0aGVyQ2FyZCIsImNpdHkiLCJjb3VudHJ5Iiwic3lzIiwibG9jYWxEYXRlIiwic3VucmlzZSIsInN1bnNldCIsInRlbXBDdXJyZW50IiwidGVtcEhpZ2giLCJ0ZW1wX21heCIsInRlbXBMb3ciLCJ0ZW1wX21pbiIsImljb24iLCJBUElDaXR5U2VhcmNoIiwicHJldmVudERlZmF1bHQiLCJuZXdQcm9qRXJyb3JDb250YWluZXIiLCJ2YWx1ZSIsImdpdGh1Ykljb24iLCJsb2dvSWNvbiIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImxvZ28iLCJ0aXRsZSIsImNyZWF0ZU1lbnUiLCJtZW51Iiwid2F0Y2hsaXN0SGVhZGVyIiwiYWRkTG9jYXRpb25Db250YWluZXIiLCJhZGRMb2NhdGlvbiIsImFkZExvY2F0aW9uVGV4dCIsImFkZExvY2F0aW9uRm9ybSIsIm1ldGhvZCIsImNyZWF0ZVdlYXRoZXJBUEkiLCJXZWF0aGVyQVBJQ29udGFpbnRlciIsIkFQSVRpdGxlIiwiY3JlYXRlQ29udGVudCIsImNvbnRlbnQiLCJjcmVhdGVGb290ZXIiLCJmb290ZXIiLCJjb3B5cmlnaHQiLCJnZXRGdWxsWWVhciIsImdpdGh1YkxpbmsiLCJocmVmIiwibmV3R2l0aHViSWNvbiIsImluaXRpYWxpemUiLCJib2R5Il0sInNvdXJjZVJvb3QiOiIifQ==