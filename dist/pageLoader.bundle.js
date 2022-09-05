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
  addBtn.innerText = 'submit';
  addBtn.classList.add('locationAddBtn');
  addBtn.addEventListener('click', e => (0,_weatherAPI__WEBPACK_IMPORTED_MODULE_1__["default"])(e));
  container.appendChild(addBtn);
};

const createCancelButton = (container, i) => {
  const cancelBtn = document.createElement('button');
  cancelBtn.setAttribute('class', 'cancelBtn');
  cancelBtn.setAttribute('id', "".concat(i));
  cancelBtn.innerText = 'cancel';
  cancelBtn.addEventListener('click', e => {
    e.preventDefault();
    displayWatchlist();
  });
  container.appendChild(cancelBtn);
}; // createForm


const createForm = form => {
  const formRow1 = document.createElement('div');
  formRow1.setAttribute('class', 'formRow');
  const formRow2 = document.createElement('div');
  formRow2.setAttribute('class', 'formRow');
  formRow2.setAttribute('id', 'formButtons');
  const formRow3 = document.createElement('div');
  formRow3.setAttribute('id', 'hidden'); // row one: assign input according to class of form
  // row three: assign error class and text according to class of form

  formRow1.innerHTML = "<input type='text' id='newProjectInput' name='newProjectInput'></input>";
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

const createMenuIcon = li => {
  const checklistIcon = document.createElement('img');
  checklistIcon.src = _assets_menuIcon_svg__WEBPACK_IMPORTED_MODULE_3__;
  checklistIcon.setAttribute('class', 'icon');
  li.appendChild(checklistIcon);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TCxNQUFNLENBQUNuSCxXQUFQLENBQW1Cb0gsU0FBbkI7RUFDQUQsTUFBTSxDQUFDbkgsV0FBUCxDQUFtQnNILFVBQW5CO0VBRUEsT0FBT0gsTUFBUDtBQUNILENBbkJEOztBQXFCZSxTQUFTTSxVQUFULEdBQXNCO0VBQ2pDN0osUUFBUSxDQUFDOEosSUFBVCxDQUFjMUgsV0FBZCxDQUEwQitGLFlBQVksRUFBdEM7RUFDQW5JLFFBQVEsQ0FBQzhKLElBQVQsQ0FBYzFILFdBQWQsQ0FBMEJtRyxVQUFVLEVBQXBDO0VBQ0F2SSxRQUFRLENBQUM4SixJQUFULENBQWMxSCxXQUFkLENBQTBCZ0gsYUFBYSxFQUF2QztFQUNBcEosUUFBUSxDQUFDOEosSUFBVCxDQUFjMUgsV0FBZCxDQUEwQmtILFlBQVksRUFBdEM7QUFDSCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaGVscGVyRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3dlYXRoZXJBUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZGl0aW9uSWNvbiBmcm9tICcuL2Fzc2V0cy9wbHVzLnN2ZydcbmltcG9ydCBBUElDaXR5U2VhcmNoIGZyb20gJy4vd2VhdGhlckFQSSdcbmltcG9ydCBkZWxldGVJY29uIGZyb20gJy4vYXNzZXRzL2RlbGV0ZS5zdmcnXG5pbXBvcnQgbWVudUljb24gZnJvbSAnLi9hc3NldHMvbWVudUljb24uc3ZnJ1xuXG5jb25zdCBzZXRUYXNrRmlsdGVyID0gKGxpKSA9PiB7XG4gICAgLy8gc2V0IGNvbnRlbnQgdGl0bGUgKGZpbHRlcilcbiAgICBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJylcbiAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSBsaS5pbm5lclRleHRcblxuICAgIC8vIGdyYWIgbG9jYXRpb25zIGFycmF5IGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gZGVzZWxlY3QgYWxsIGxvY2F0aW9uc1xuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlbGVjdGVkID0gJ2ZhbHNlJ1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIFNlbGVjdCBsb2NhdGlvbiBpZiBvbmUgaXMgY2hvc2VuIChtYWluIG1lbnUgc2VsZWN0aW9uIGlzIGhhbmRsZWQgaW4gZXZlbnQgbGlzdGVuZXIpXG4gICAgaWYgKGxpLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSA9PT0gJ2xvY2F0aW9uJykge1xuICAgICAgICBjb25zdCBzZWxlY3RlZExvY2F0aW9uSWQgPSBsaS5nZXRBdHRyaWJ1dGUoJ2lkJylcbiAgICAgICAgc3RvcmFnZVdhdGNobGlzdFtzZWxlY3RlZExvY2F0aW9uSWRdLnNlbGVjdGVkID0gJ3RydWUnXG4gICAgfVxuXG4gICAgLy8gc2V0IGxvY2F0aW9ucyBhcnJheSBiYWNrIGludG8gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIHJlZnJlc2hcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuLy8gRGlzcGxheSBlbnRpcmUgYXJyYXkgb2YgbG9jYXRpb25zIHRvIHdhdGNobGlzdFxuY29uc3QgZGlzcGxheVdhdGNobGlzdCA9ICgpID0+IHtcbiAgICAvLyBHcmFiIHByb2plY3RzIG1lbnVcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2F0Y2hsaXN0JylcblxuICAgIC8vIENsZWFyIGxvY2F0aW9uIGxpc3RpbmdzXG4gICAgY29uc3Qgb2xkTGlzdGluZ0NvdW50ID0gd2F0Y2hsaXN0LmNoaWxkRWxlbWVudENvdW50XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRMaXN0aW5nQ291bnQ7IGkrKykge1xuICAgICAgICB3YXRjaGxpc3QuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgIH1cblxuICAgIC8vIEFkZCBzaW5nbGUgbG9jYXRpb24gdG8gd2F0Y2hsaXN0IChjYWxsZWQgYmVsb3cpXG4gICAgY29uc3QgY3JlYXRlTGlzdGluZyA9IChQcm9qLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKGBsb2NhdGlvbmApXG4gICAgICAgIGxvY2F0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG4gICAgICAgIC8vIGFzc2lnbiBjbGFzcyB0byBzZWxlY3RlZCBsb2NhdGlvbiBsaXN0aW5nXG4gICAgICAgIGlmIChQcm9qLnNlbGVjdGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV2ZW50IGxpc3RlbmVyIHRvIGRpc3BsYXkgc2VsZWN0ZWQgbG9jYXRpb24ncyB3ZWF0aGVyXG4gICAgICAgIGxvY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIC8vIGlmIGRlbGV0aW5nIGxpc3RpbmcsIGRvIG5vdCBkaXNwbGF5IHdlYXRoZXJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZUl0ZW0nKSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0VGFza0ZpbHRlcihsb2NhdGlvbilcbiAgICAgICAgfSlcblxuICAgICAgICBjcmVhdGVNZW51SWNvbihsb2NhdGlvbilcbiAgICAgICAgY29uc3QgbG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGxvY2F0aW9uVGV4dC50ZXh0Q29udGVudCA9IFByb2oubmFtZVxuICAgICAgICBsb2NhdGlvbi5hcHBlbmRDaGlsZChsb2NhdGlvblRleHQpXG4gICAgICAgIGNyZWF0ZURlbGV0ZUljb24obG9jYXRpb24sIGkpXG4gICAgICAgIHdhdGNobGlzdC5hcHBlbmRDaGlsZChsb2NhdGlvbilcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgYWxsIGxvY2F0aW9ucyB0byB3YXRjaGxpc3RcbiAgICBsZXQgaSA9IDBcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgY3JlYXRlTGlzdGluZyhwcm9qZWN0LCBpKVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgaSsrXG4gICAgfSlcbn1cblxuY29uc3QgY3JlYXRlQWRkQnV0dG9uID0gKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgYWRkQnRuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkQnRuJylcbiAgICBhZGRCdG4uaW5uZXJUZXh0ID0gJ3N1Ym1pdCdcbiAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnbG9jYXRpb25BZGRCdG4nKVxuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiBBUElDaXR5U2VhcmNoKGUpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRCdG4pXG59XG5cbmNvbnN0IGNyZWF0ZUNhbmNlbEJ1dHRvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NhbmNlbEJ0bicpXG4gICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG4gICAgY2FuY2VsQnRuLmlubmVyVGV4dCA9ICdjYW5jZWwnXG4gICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxuICAgIH0pXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmNlbEJ0bilcbn1cblxuLy8gY3JlYXRlRm9ybVxuY29uc3QgY3JlYXRlRm9ybSA9IChmb3JtKSA9PiB7XG4gICAgY29uc3QgZm9ybVJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG5cbiAgICBjb25zdCBmb3JtUm93MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmb3JtUm93JylcbiAgICBmb3JtUm93Mi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zvcm1CdXR0b25zJylcblxuICAgIGNvbnN0IGZvcm1Sb3czID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93My5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG5cbiAgICAvLyByb3cgb25lOiBhc3NpZ24gaW5wdXQgYWNjb3JkaW5nIHRvIGNsYXNzIG9mIGZvcm1cbiAgICAvLyByb3cgdGhyZWU6IGFzc2lnbiBlcnJvciBjbGFzcyBhbmQgdGV4dCBhY2NvcmRpbmcgdG8gY2xhc3Mgb2YgZm9ybVxuICAgIGZvcm1Sb3cxLmlubmVySFRNTCA9XG4gICAgICAgIFwiPGlucHV0IHR5cGU9J3RleHQnIGlkPSduZXdQcm9qZWN0SW5wdXQnIG5hbWU9J25ld1Byb2plY3RJbnB1dCc+PC9pbnB1dD5cIlxuICAgIGZvcm1Sb3czLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbmV3UHJvakVycm9yQ29udGFpbmVyJylcbiAgICBmb3JtUm93My5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nXG5cbiAgICAvLyByb3cgdHdvOiBzdWJtaXQgYW5kIGNhbmNlbCBidXR0b25zXG4gICAgY3JlYXRlQWRkQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuICAgIGNyZWF0ZUNhbmNlbEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzEpXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MilcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3czKVxufVxuXG4vLyBEZWxldGUgd2F0Y2hsaXN0IGVudHJ5XG5jb25zdCBkZWxldGVXYXRjaGxpc3RFbnRyeSA9IChlKSA9PiB7XG4gICAgLy8gZ3JhYiBhcnJheXMgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBJZGVudGlmeSBlbnRyeSB0byBkZWxldGVcbiAgICBjb25zdCBkb29tZWRJbmRleCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgIC8vIGNvbnN0IGRvb21lZE5hbWUgPSBzdG9yYWdlV2F0Y2hsaXN0W2Rvb21lZEluZGV4XS5uYW1lO1xuXG4gICAgLy8gZGVsZXRlIGVudHJ5XG4gICAgc3RvcmFnZVdhdGNobGlzdC5zcGxpY2UoZG9vbWVkSW5kZXgsIDEpXG5cbiAgICAvLyBzZXQgY2hhbmdlcyB0byBsb2NhbFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gSWYgZG9vbWVkIGVudHJ5IHdhcyBzZWxlY3RlZCwgY2xlYXIgY29udGVudCBkaXNwbGF5XG4gICAgLy8gY29uc3QgY29udGVudFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRUaXRsZScpO1xuICAgIC8vIGNvbnN0IGFsbFRhc2tzQ2xhc3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbFRhc2tzJykuY2xhc3NMaXN0XG4gICAgLy8gaWYgKGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9PT0gZG9vbWVkTmFtZSkge1xuICAgIC8vICAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSAnQWxsIHRhc2tzJ1xuICAgIC8vICAgICBhbGxUYXNrc0NsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAvLyB9XG5cbiAgICAvLyByZWZyZXNoIHdhdGNoaXN0XG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IGNyZWF0ZU1lbnVJY29uID0gKGxpKSA9PiB7XG4gICAgY29uc3QgY2hlY2tsaXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgY2hlY2tsaXN0SWNvbi5zcmMgPSBtZW51SWNvblxuICAgIGNoZWNrbGlzdEljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChjaGVja2xpc3RJY29uKVxufVxuXG5jb25zdCBjcmVhdGVEZWxldGVJY29uID0gKGNvbnRhaW5lciwgaSkgPT4ge1xuICAgIC8vIGNyZWF0ZSBpbWFnZSBhbmQgYXNzaWduIGF0dHJpYnV0ZXNcbiAgICBjb25zdCBuZXdEZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdEZWxldGVJY29uLnNyYyA9IGRlbGV0ZUljb25cbiAgICBuZXdEZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbiBkZWxldGVJdGVtJylcbiAgICBuZXdEZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG5cbiAgICAvLyBBREQgRVZFTlQgTElTVEVORVJcbiAgICBpZiAoXG4gICAgICAgIGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdwcm9qZWN0JyB8fFxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0JylcbiAgICApIHtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXIgdG8gZGVsZXRlIHByb2plY3RcbiAgICAgICAgbmV3RGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgYGRlbGV0ZVdhdGNobGlzdEVudHJ5YCxcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gLFxuICAgICAgICAgICAgYGhpZGRlbmBcbiAgICAgICAgKVxuICAgICAgICBuZXdEZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+XG4gICAgICAgICAgICBkZWxldGVXYXRjaGxpc3RFbnRyeShlLCBpKVxuICAgICAgICApXG4gICAgICAgIC8vIGRpc3BsYXkgdHJhc2ggaWNvbiBvbiBob3ZlclxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICAgICAgLy8gaGlkZSB0cmFzaCBpY29uXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICBgLmRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHN0cmFuZ2UnKVxuICAgIH1cbiAgICAvLyBhcHBlbmQgdG8gY29udGFpbmVyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0RlbGV0ZUljb24pXG59XG5cbmNvbnN0IGNyZWF0ZUFkZGl0aW9uSWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IG5ld0FkZGl0aW9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3QWRkaXRpb25JY29uLnNyYyA9IGFkZGl0aW9uSWNvblxuICAgIG5ld0FkZGl0aW9uSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24nKVxuICAgIGxpLmFwcGVuZENoaWxkKG5ld0FkZGl0aW9uSWNvbilcbn1cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVBZGRpdGlvbkljb24sXG4gICAgY3JlYXRlRGVsZXRlSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIGNyZWF0ZU1lbnVJY29uLFxuICAgIGRpc3BsYXlXYXRjaGxpc3QsXG59XG4iLCJkb2N1bWVudC5jb29raWUgPSAnU2FtZVNpdGU9TGF4J1xuXG5mdW5jdGlvbiB0b0RpcmVjdGlvbihkZWdyZWUpIHtcbiAgICBpZiAoZGVncmVlID4gMzM3LjUpIHJldHVybiAnTm9ydGgnXG4gICAgaWYgKGRlZ3JlZSA+IDI5Mi41KSByZXR1cm4gJ05vcnRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDI0Ny41KSByZXR1cm4gJ1dlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIwMi41KSByZXR1cm4gJ1NvdXRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDE1Ny41KSByZXR1cm4gJ1NvdXRoJ1xuICAgIGlmIChkZWdyZWUgPiAxMjIuNSkgcmV0dXJuICdTb3V0aCBFYXN0J1xuICAgIGlmIChkZWdyZWUgPiA2Ny41KSByZXR1cm4gJ0Vhc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIyLjUpIHJldHVybiAnTm9ydGggRWFzdCdcbiAgICByZXR1cm4gJ05vcnRoJ1xufVxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MjM3NjExNS9ob3ctdG8tb2J0YWluLW9wZW4td2VhdGhlci1hcGktZGF0ZS10aW1lLWZyb20tY2l0eS1iZWluZy1mZXRjaGVkXG5jb25zdCBjYWxjQ3VycmVudFRpbWUgPSAodGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsVGltZSA9IGQuZ2V0VGltZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IGxvY2FsVGltZSArIGxvY2FsT2Zmc2V0XG4gICAgY29uc3QgbmV3Q2l0eSA9IHV0YyArIDEwMDAgKiB0aW1lem9uZVxuICAgIHJldHVybiBuZXcgRGF0ZShuZXdDaXR5KVxufVxuXG5jb25zdCBjYWxjU3VuVGltZSA9ICh0aW1lLCB0aW1lem9uZSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IHRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuLy8gY29uc3QgZmV0Y2hEYWlseUZvcmVjYXN0ID0gKGxhdCwgbG9uKSA9PiB7XG4vLyAgIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJyk7XG4vLyAgIGNvbnNvbGUubG9nKGxhdCk7XG4vLyAgIGNvbnNvbGUubG9nKGxvbik7XG4vLyAgIC8vIGZldGNoIHNldmVuIGRheSBmb3JlY2FzdFxuLy8gICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PSR7bGF0fSZsb249JHtsb259JmV4Y2x1ZGU9bWludXRlbHksaG91cmx5LGFsZXJ0cyZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsIHsgbW9kZTogJ2NvcnMnIH0pXG4vLyAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4vLyAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4vLyAgICAgfSlcbi8vICAgICAuY2F0Y2goKGVycikgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coZXJyKTtcbi8vICAgICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCc7XG4vLyAgICAgfSk7XG4vLyB9O1xuXG5jb25zdCBmZXRjaEhvdXJseUZvcmVjYXN0ID0gKGNpdHlRdWVyeSkgPT4ge1xuICAgIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJylcbiAgICAvLyBmZXRjaCBmaXZlIGRheS90aHJlZSBob3VyIGZvcmVjYXN0XG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0QXJyYXkgPSBbXVxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyAuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7cmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmljb259LnBuZ2BcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUocmVzcG9uc2UubGlzdFtpXS5kdF90eHQpLFxuICAgICAgICAgICAgICAgICAgICBkYXRlVGV4dDogcmVzcG9uc2UubGlzdFtpXS5kdF90eHQsXG4gICAgICAgICAgICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5saXN0W2ldLm1haW4uaHVtaWRpdHksXG4gICAgICAgICAgICAgICAgICAgIHJhaW5DaGFuY2U6IHJlc3BvbnNlLmxpc3RbaV0ucG9wICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZTogcmVzcG9uc2UubGlzdFtpXS5tYWluLnRlbXAsXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS5saXN0W2ldLndpbmQuZ3VzdCxcbiAgICAgICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS5saXN0W2ldLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXkucHVzaChuZXdIb3VybHlGb3JlY2FzdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0hvdXJseUZvcmVjYXN0QXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gbmV3SG91cmx5Rm9yZWNhc3RBcnJheVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJ1xuICAgICAgICB9KVxufVxuXG5jb25zdCBmZXRjaEN1cnJlbnRXZWF0aGVyID0gKGNpdHlRdWVyeSkgPT4ge1xuICAgIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUltYWdlJylcbiAgICBjb25zdCBBUElFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElFcnJvckNvbnRhaW5lcicpXG5cbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCxcbiAgICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAvLyBjb25zdCB7bGF0fSA9IHJlc3BvbnNlLmNvb3JkO1xuICAgICAgICAgICAgLy8gY29uc3Qge2xvbn0gPSByZXNwb25zZS5jb29yZDtcbiAgICAgICAgICAgIC8vIGZldGNoRGFpbHlGb3JlY2FzdChsYXQsIGxvbik7XG4gICAgICAgICAgICBjb25zdCBuZXdXZWF0aGVyQ2FyZCA9IHtcbiAgICAgICAgICAgICAgICBjaXR5OiByZXNwb25zZS5uYW1lLFxuICAgICAgICAgICAgICAgIGNvdW50cnk6IHJlc3BvbnNlLnN5cy5jb3VudHJ5LFxuICAgICAgICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgIGxvY2FsRGF0ZTogY2FsY0N1cnJlbnRUaW1lKHJlc3BvbnNlLnRpbWV6b25lKSxcbiAgICAgICAgICAgICAgICBzdW5yaXNlOiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnJpc2UgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgc3Vuc2V0OiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnNldCAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnRpbWV6b25lXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0ZW1wQ3VycmVudDogcmVzcG9uc2UubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgIHRlbXBIaWdoOiByZXNwb25zZS5tYWluLnRlbXBfbWF4LFxuICAgICAgICAgICAgICAgIHRlbXBMb3c6IHJlc3BvbnNlLm1haW4udGVtcF9taW4sXG4gICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS53aW5kLmd1c3QsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBBUElJbWFnZS5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2BcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgICAgICAgcmV0dXJuIG5ld1dlYXRoZXJDYXJkXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IEFQSUNpdHlTZWFyY2ggPSAoKSA9PiB7XG4gICAgLy8gZ3JhYiBkb20gZWxlbWVudHNcbiAgICBjb25zdCBBUElTZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElTZWFyY2hJbnB1dCcpXG4gICAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKVxuICAgIC8vIHJlc2V0IGVycm9yXG4gICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJydcbiAgICAvLyBjaGVjayBmb3Igc2VhcmNoIHRlcm1cbiAgICBpZiAoQVBJU2VhcmNoSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcbiAgICB9IGVsc2Uge1xuICAgICAgICBmZXRjaEN1cnJlbnRXZWF0aGVyKEFQSVNlYXJjaElucHV0LnZhbHVlKVxuICAgICAgICBmZXRjaEhvdXJseUZvcmVjYXN0KEFQSVNlYXJjaElucHV0LnZhbHVlKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQVBJQ2l0eVNlYXJjaFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IEFQSUNpdHlTZWFyY2ggZnJvbSAnLi93ZWF0aGVyQVBJJ1xuaW1wb3J0IHtcbiAgICBjcmVhdGVBZGRpdGlvbkljb24sXG4gICAgY3JlYXRlRm9ybSxcbiAgICAvLyBkaXNwbGF5V2F0Y2hsaXN0LFxufSBmcm9tICcuL2hlbHBlckZ1bmN0aW9ucydcbmltcG9ydCBnaXRodWJJY29uIGZyb20gJy4vYXNzZXRzL0dpdEh1Yi1saWdodC0zMnB4LnBuZydcbmltcG9ydCBsb2dvSWNvbiBmcm9tICcuL2Fzc2V0cy9sb2dvSWNvbi5zdmcnXG5cbmNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKVxuXG4gICAgLy8gZGlzcGxheSBsb2dvXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbG9nby5zcmMgPSBsb2dvSWNvblxuICAgIGxvZ28udGFyZ2V0ID0gJ19ibGFuaydcbiAgICBsb2dvLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbG9nbycpXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGxvZ28pXG5cbiAgICAvLyBkaXNwbGF5IHRpdGxlXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnV2VhdGhlcnNlcnZlJ1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSlcblxuICAgIHJldHVybiBoZWFkZXJcbn1cblxuY29uc3QgY3JlYXRlTWVudSA9ICgpID0+IHtcbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBtZW51LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWVudScpXG5cbiAgICAvLyBjcmVhdGUgd2F0Y2hsaXN0IGhlYWRlclxuICAgIGNvbnN0IHdhdGNobGlzdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIHdhdGNobGlzdEhlYWRlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdEhlYWRlcicpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnRleHRDb250ZW50ID0gJ1dhdGNobGlzdCdcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgbWVudVxuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICB3YXRjaGxpc3Quc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3QnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dhdGNobGlzdCcpXG5cbiAgICAvLyBkaXNwbGF5V2F0Y2hsaXN0KClcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBjb250YWluZXJcbiAgICBjb25zdCBhZGRMb2NhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG5cbiAgICAvLyBHZW5lcmF0ZSBhZGQgbG9jYXRpb24gYnV0dG9uXG4gICAgY29uc3QgYWRkTG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgYWRkTG9jYXRpb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkJ0bicpXG4gICAgY3JlYXRlQWRkaXRpb25JY29uKGFkZExvY2F0aW9uKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGFkZExvY2F0aW9uVGV4dC5pbm5lclRleHQgPSAnQWRkIExvY2F0aW9uJ1xuICAgIGFkZExvY2F0aW9uLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uVGV4dClcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbilcblxuICAgIC8vIEdlbmVyYXRlIGFuZCBoaWRlIG5ldyBsb2NhdGlvbiBmb3JtXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkTG9jYXRpb25Gb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5tZXRob2QgPSAnZ2V0J1xuICAgIGNyZWF0ZUZvcm0oYWRkTG9jYXRpb25Gb3JtKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uRm9ybSlcblxuICAgIG1lbnUuYXBwZW5kQ2hpbGQod2F0Y2hsaXN0SGVhZGVyKVxuICAgIG1lbnUuYXBwZW5kQ2hpbGQod2F0Y2hsaXN0KVxuICAgIG1lbnUuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Db250YWluZXIpXG5cbiAgICByZXR1cm4gbWVudVxufVxuXG5jb25zdCBjcmVhdGVXZWF0aGVyQVBJID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBXZWF0aGVyIEFQSSBjb250YWluZXJcbiAgICBjb25zdCBXZWF0aGVyQVBJQ29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnV2VhdGhlckFQSUNvbnRhaW50ZXInLCAnY29udGVudCcpXG4gICAgLy8gV2VhdGhlckFQSUNvbnRhaW50ZXIuaWQgPSAnJztcblxuICAgIC8vIGNyZWF0ZSBBUEkgdGl0bGVcbiAgICBjb25zdCBBUElUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICBBUElUaXRsZS5jbGFzc0xpc3QuYWRkKCdjb250ZW50VGl0bGUnKVxuICAgIEFQSVRpdGxlLmlubmVyVGV4dCA9ICdXZWF0aGVyc2VydmUnXG5cbiAgICAvLyBjcmVhdGUgQVBJIGltYWdlIGNvbnRhaW5lclxuICAgIC8vIGNvbnN0IEFQSUltYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgLy8gQVBJSW1hZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2VDb250YWluZXInKTtcblxuICAgIC8vIGNyZWF0ZSBBUEkgaW1nXG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIEFQSUltYWdlLmNsYXNzTGlzdC5hZGQoJ0FQSUltYWdlJylcblxuICAgIC8vIHNlYXJjaCBpbnB1dFxuICAgIGNvbnN0IEFQSVNlYXJjaElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIEFQSVNlYXJjaElucHV0LmNsYXNzTGlzdC5hZGQoJ0FQSVNlYXJjaElucHV0JylcbiAgICBBUElTZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9ICdTZWF0dGxlJ1xuXG4gICAgLy8gc2VhcmNoIGJ1dHRvblxuICAgIGNvbnN0IEFQSVNlYXJjaEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgQVBJU2VhcmNoQnRuLmNsYXNzTGlzdC5hZGQoJ0FQSVNlYXJjaEJ0bicpXG4gICAgQVBJU2VhcmNoQnRuLmlubmVyVGV4dCA9ICdTZWFyY2gnXG4gICAgQVBJU2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgQVBJQ2l0eVNlYXJjaClcblxuICAgIC8vIGVycm9yIGNvbnRhaW5lclxuICAgIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBBUElFcnJvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdBUElFcnJvckNvbnRhaW5lcicpXG5cbiAgICAvLyBBcHBlbmRcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElUaXRsZSlcbiAgICAvLyBBUElJbWFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChBUElJbWFnZSk7XG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJU2VhcmNoSW5wdXQpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJU2VhcmNoQnRuKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUVycm9yQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlKVxuICAgIC8vIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlQ29udGFpbmVyKTtcbiAgICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoV2VhdGhlckFQSUNvbnRhaW50ZXIpO1xuXG4gICAgcmV0dXJuIFdlYXRoZXJBUElDb250YWludGVyXG59XG5cbmNvbnN0IGNyZWF0ZUNvbnRlbnQgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIGNvbnRlbnQgY29udGFpbmVyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250ZW50JylcblxuICAgIC8vIGNyZWF0ZSB3ZWF0aGVyIGFwcFxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY3JlYXRlV2VhdGhlckFQSSgpKVxuXG4gICAgcmV0dXJuIGNvbnRlbnRcbn1cblxuY29uc3QgY3JlYXRlRm9vdGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpXG5cbiAgICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBjb3B5cmlnaHQudGV4dENvbnRlbnQgPSBgQ29weXJpZ2h0IMKpICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBqY2FtcGJlbGw1N2BcblxuICAgIGNvbnN0IGdpdGh1YkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBnaXRodWJMaW5rLmhyZWYgPSAnaHR0cHM6Ly9naXRodWIuY29tL2pjYW1wYmVsbDU3J1xuICAgIGdpdGh1YkxpbmsudGFyZ2V0ID0gJ19ibGFuaydcblxuICAgIGNvbnN0IG5ld0dpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0dpdGh1Ykljb24uc3JjID0gZ2l0aHViSWNvblxuICAgIG5ld0dpdGh1Ykljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdnaXRodWInKVxuXG4gICAgZ2l0aHViTGluay5hcHBlbmRDaGlsZChuZXdHaXRodWJJY29uKVxuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChjb3B5cmlnaHQpXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGdpdGh1YkxpbmspXG5cbiAgICByZXR1cm4gZm9vdGVyXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZU1lbnUoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUNvbnRlbnQoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUZvb3RlcigpKVxufVxuIl0sIm5hbWVzIjpbImFkZGl0aW9uSWNvbiIsIkFQSUNpdHlTZWFyY2giLCJkZWxldGVJY29uIiwibWVudUljb24iLCJzZXRUYXNrRmlsdGVyIiwibGkiLCJjb250ZW50VGl0bGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsImlubmVyVGV4dCIsInN0b3JhZ2VXYXRjaGxpc3QiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZm9yRWFjaCIsImxvY2F0aW9uIiwic2VsZWN0ZWQiLCJnZXRBdHRyaWJ1dGUiLCJzZWxlY3RlZExvY2F0aW9uSWQiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGlzcGxheVdhdGNobGlzdCIsIndhdGNobGlzdCIsIm9sZExpc3RpbmdDb3VudCIsImNoaWxkRWxlbWVudENvdW50IiwiaSIsImZpcnN0Q2hpbGQiLCJyZW1vdmUiLCJjcmVhdGVMaXN0aW5nIiwiUHJvaiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsImNvbnRhaW5zIiwiY3JlYXRlTWVudUljb24iLCJsb2NhdGlvblRleHQiLCJuYW1lIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVEZWxldGVJY29uIiwicHJvamVjdCIsImNyZWF0ZUFkZEJ1dHRvbiIsImNvbnRhaW5lciIsImFkZEJ0biIsImNyZWF0ZUNhbmNlbEJ1dHRvbiIsImNhbmNlbEJ0biIsInByZXZlbnREZWZhdWx0IiwiY3JlYXRlRm9ybSIsImZvcm0iLCJmb3JtUm93MSIsImZvcm1Sb3cyIiwiZm9ybVJvdzMiLCJpbm5lckhUTUwiLCJkZWxldGVXYXRjaGxpc3RFbnRyeSIsImRvb21lZEluZGV4Iiwic3BsaWNlIiwiY2hlY2tsaXN0SWNvbiIsInNyYyIsIm5ld0RlbGV0ZUljb24iLCJ0cmFzaEljb24iLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlQWRkaXRpb25JY29uIiwibmV3QWRkaXRpb25JY29uIiwiY29va2llIiwidG9EaXJlY3Rpb24iLCJkZWdyZWUiLCJjYWxjQ3VycmVudFRpbWUiLCJ0aW1lem9uZSIsImQiLCJEYXRlIiwibG9jYWxUaW1lIiwiZ2V0VGltZSIsImxvY2FsT2Zmc2V0IiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJ1dGMiLCJuZXdDaXR5IiwiY2FsY1N1blRpbWUiLCJ0aW1lIiwiZmV0Y2hIb3VybHlGb3JlY2FzdCIsImNpdHlRdWVyeSIsIkFQSUVycm9yQ29udGFpbmVyIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm5ld0hvdXJseUZvcmVjYXN0QXJyYXkiLCJuZXdIb3VybHlGb3JlY2FzdCIsImRhdGUiLCJsaXN0IiwiZHRfdHh0IiwiZGF0ZVRleHQiLCJodW1pZGl0eSIsIm1haW4iLCJyYWluQ2hhbmNlIiwicG9wIiwidGVtcGVyYXR1cmUiLCJ0ZW1wIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXIiLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJkZXNjcmlwdGlvbiIsIndpbmREZWdyZWUiLCJ3aW5kIiwiZGVnIiwid2luZERpcmVjdGlvbiIsIndpbmRHdXN0IiwiZ3VzdCIsIndpbmRTcGVlZCIsInNwZWVkIiwicHVzaCIsImNhdGNoIiwiZXJyIiwiZmV0Y2hDdXJyZW50V2VhdGhlciIsIkFQSUltYWdlIiwibmV3V2VhdGhlckNhcmQiLCJjaXR5IiwiY291bnRyeSIsInN5cyIsImxvY2FsRGF0ZSIsInN1bnJpc2UiLCJzdW5zZXQiLCJ0ZW1wQ3VycmVudCIsInRlbXBIaWdoIiwidGVtcF9tYXgiLCJ0ZW1wTG93IiwidGVtcF9taW4iLCJpY29uIiwiQVBJU2VhcmNoSW5wdXQiLCJ2YWx1ZSIsImdpdGh1Ykljb24iLCJsb2dvSWNvbiIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImxvZ28iLCJ0aXRsZSIsImNyZWF0ZU1lbnUiLCJtZW51Iiwid2F0Y2hsaXN0SGVhZGVyIiwiYWRkTG9jYXRpb25Db250YWluZXIiLCJhZGRMb2NhdGlvbiIsImFkZExvY2F0aW9uVGV4dCIsImFkZExvY2F0aW9uRm9ybSIsIm1ldGhvZCIsImNyZWF0ZVdlYXRoZXJBUEkiLCJXZWF0aGVyQVBJQ29udGFpbnRlciIsIkFQSVRpdGxlIiwicGxhY2Vob2xkZXIiLCJBUElTZWFyY2hCdG4iLCJjcmVhdGVDb250ZW50IiwiY29udGVudCIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNvcHlyaWdodCIsImdldEZ1bGxZZWFyIiwiZ2l0aHViTGluayIsImhyZWYiLCJuZXdHaXRodWJJY29uIiwiaW5pdGlhbGl6ZSIsImJvZHkiXSwic291cmNlUm9vdCI6IiJ9