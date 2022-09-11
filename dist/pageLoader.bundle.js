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

    setTaskFilter(location);
  });
  createMenuIcon(location);
  const locationText = document.createElement('span');
  locationText.textContent = Proj.name;
  location.appendChild(locationText);
  createDeleteIcon(location, i);
  watchlist.appendChild(location);
}; // Display entire array of locations to watchlist


const displayWatchlist = () => {
  // Grab projects menu
  const watchlist = document.querySelector('#watchlist'); // Clear location listings

  const oldListingCount = watchlist.childElementCount; // eslint-disable-next-line no-plusplus

  for (let i = 0; i < oldListingCount; i++) {
    watchlist.firstChild.remove();
  } // Append all locations to watchlist


  let i = 0;
  const storageWatchlist = JSON.parse(localStorage.getItem('storageWatchlist'));
  storageWatchlist.forEach(project => {
    createListing(project, i); // eslint-disable-next-line no-plusplus

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFBUSxDQUFDbUIsYUFBVCxDQUF1QixRQUF2QixDQUFmO0VBRUEsTUFBTXNJLFNBQVMsR0FBR3pKLFFBQVEsQ0FBQ21CLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBbEI7RUFDQXNJLFNBQVMsQ0FBQ3ZKLFdBQVYsNEJBQXVDLElBQUlrRSxJQUFKLEdBQVdzRixXQUFYLEVBQXZDO0VBRUEsTUFBTUMsVUFBVSxHQUFHM0osUUFBUSxDQUFDbUIsYUFBVCxDQUF1QixHQUF2QixDQUFuQjtFQUNBd0ksVUFBVSxDQUFDQyxJQUFYLEdBQWtCLGdDQUFsQjtFQUNBRCxVQUFVLENBQUM1SCxNQUFYLEdBQW9CLFFBQXBCO0VBRUEsTUFBTThILGFBQWEsR0FBRzdKLFFBQVEsQ0FBQ21CLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdEI7RUFDQTBJLGFBQWEsQ0FBQ3pJLEdBQWQsR0FBb0JnSCwwREFBcEI7RUFDQXlCLGFBQWEsQ0FBQ3hJLFlBQWQsQ0FBMkIsT0FBM0IsRUFBb0MsUUFBcEM7RUFFQXNJLFVBQVUsQ0FBQ3JJLFdBQVgsQ0FBdUJ1SSxhQUF2QjtFQUNBTCxNQUFNLENBQUNsSSxXQUFQLENBQW1CbUksU0FBbkI7RUFDQUQsTUFBTSxDQUFDbEksV0FBUCxDQUFtQnFJLFVBQW5CO0VBRUEsT0FBT0gsTUFBUDtBQUNILENBbkJEOztBQXFCZSxTQUFTTSxVQUFULEdBQXNCO0VBQ2pDOUosUUFBUSxDQUFDK0osSUFBVCxDQUFjekksV0FBZCxDQUEwQmdILFlBQVksRUFBdEM7RUFDQXRJLFFBQVEsQ0FBQytKLElBQVQsQ0FBY3pJLFdBQWQsQ0FBMEJvSCxVQUFVLEVBQXBDO0VBQ0ExSSxRQUFRLENBQUMrSixJQUFULENBQWN6SSxXQUFkLENBQTBCK0gsYUFBYSxFQUF2QztFQUNBckosUUFBUSxDQUFDK0osSUFBVCxDQUFjekksV0FBZCxDQUEwQmlJLFlBQVksRUFBdEM7QUFDSCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaGVscGVyRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3dlYXRoZXJBUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZGl0aW9uSWNvbiBmcm9tICcuL2Fzc2V0cy9wbHVzLnN2ZydcbmltcG9ydCB2YWxpZGF0ZVNlYXJjaCBmcm9tICcuL3dlYXRoZXJBUEknXG5pbXBvcnQgZGVsZXRlSWNvbiBmcm9tICcuL2Fzc2V0cy9kZWxldGUuc3ZnJ1xuaW1wb3J0IG1lbnVJY29uIGZyb20gJy4vYXNzZXRzL21lbnVJY29uLnN2ZydcblxuY29uc3Qgc2V0VGFza0ZpbHRlciA9IChsaSkgPT4ge1xuICAgIC8vIHNldCBjb250ZW50IHRpdGxlIChmaWx0ZXIpXG4gICAgY29uc3QgY29udGVudFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRUaXRsZScpXG4gICAgY29udGVudFRpdGxlLnRleHRDb250ZW50ID0gbGkuaW5uZXJUZXh0XG5cbiAgICAvLyBncmFiIGxvY2F0aW9ucyBhcnJheSBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIGRlc2VsZWN0IGFsbCBsb2NhdGlvbnNcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9ICdmYWxzZSdcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBTZWxlY3QgbG9jYXRpb24gaWYgb25lIGlzIGNob3NlbiAobWFpbiBtZW51IHNlbGVjdGlvbiBpcyBoYW5kbGVkIGluIGV2ZW50IGxpc3RlbmVyKVxuICAgIGlmIChsaS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdsb2NhdGlvbicpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMb2NhdGlvbklkID0gbGkuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgICAgIHN0b3JhZ2VXYXRjaGxpc3Rbc2VsZWN0ZWRMb2NhdGlvbklkXS5zZWxlY3RlZCA9ICd0cnVlJ1xuICAgIH1cblxuICAgIC8vIHNldCBsb2NhdGlvbnMgYXJyYXkgYmFjayBpbnRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyByZWZyZXNoXG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IGNyZWF0ZU1lbnVJY29uID0gKGxpKSA9PiB7XG4gICAgY29uc3QgY2hlY2tsaXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgY2hlY2tsaXN0SWNvbi5zcmMgPSBtZW51SWNvblxuICAgIGNoZWNrbGlzdEljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChjaGVja2xpc3RJY29uKVxufVxuXG4vLyBBZGQgc2luZ2xlIGxvY2F0aW9uIHRvIHdhdGNobGlzdCAoY2FsbGVkIGJlbG93KVxuY29uc3QgY3JlYXRlTGlzdGluZyA9IChQcm9qLCBpKSA9PiB7XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKGBsb2NhdGlvbmApXG4gICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICAvLyBhc3NpZ24gY2xhc3MgdG8gc2VsZWN0ZWQgbG9jYXRpb24gbGlzdGluZ1xuICAgIGlmIChQcm9qLnNlbGVjdGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIH1cblxuICAgIC8vIGV2ZW50IGxpc3RlbmVyIHRvIGRpc3BsYXkgc2VsZWN0ZWQgbG9jYXRpb24ncyB3ZWF0aGVyXG4gICAgbG9jYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBpZiBkZWxldGluZyBsaXN0aW5nLCBkbyBub3QgZGlzcGxheSB3ZWF0aGVyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZUl0ZW0nKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgc2V0VGFza0ZpbHRlcihsb2NhdGlvbilcbiAgICB9KVxuXG4gICAgY3JlYXRlTWVudUljb24obG9jYXRpb24pXG4gICAgY29uc3QgbG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgbG9jYXRpb25UZXh0LnRleHRDb250ZW50ID0gUHJvai5uYW1lXG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQobG9jYXRpb25UZXh0KVxuICAgIGNyZWF0ZURlbGV0ZUljb24obG9jYXRpb24sIGkpXG4gICAgd2F0Y2hsaXN0LmFwcGVuZENoaWxkKGxvY2F0aW9uKVxufVxuXG4vLyBEaXNwbGF5IGVudGlyZSBhcnJheSBvZiBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG5jb25zdCBkaXNwbGF5V2F0Y2hsaXN0ID0gKCkgPT4ge1xuICAgIC8vIEdyYWIgcHJvamVjdHMgbWVudVxuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3YXRjaGxpc3QnKVxuXG4gICAgLy8gQ2xlYXIgbG9jYXRpb24gbGlzdGluZ3NcbiAgICBjb25zdCBvbGRMaXN0aW5nQ291bnQgPSB3YXRjaGxpc3QuY2hpbGRFbGVtZW50Q291bnRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZExpc3RpbmdDb3VudDsgaSsrKSB7XG4gICAgICAgIHdhdGNobGlzdC5maXJzdENoaWxkLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgLy8gQXBwZW5kIGFsbCBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG4gICAgbGV0IGkgPSAwXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNyZWF0ZUxpc3RpbmcocHJvamVjdCwgaSlcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgIGkrK1xuICAgIH0pXG59XG5cbmNvbnN0IGNyZWF0ZUFkZEJ1dHRvbiA9IChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdhZGRCdG4nKVxuICAgIGFkZEJ0bi5pbm5lclRleHQgPSAnc2VhcmNoJ1xuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB2YWxpZGF0ZVNlYXJjaChlKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkQnRuKVxufVxuXG5jb25zdCBjcmVhdGVDYW5jZWxCdXR0b24gPSAoY29udGFpbmVyLCBpKSA9PiB7XG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZCgnY2FuY2VsQnRuJylcbiAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICBjYW5jZWxCdG4uaW5uZXJUZXh0ID0gJ2NhbmNlbCdcbiAgICAvLyBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIC8vICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAvLyAgICAgZGlzcGxheVdhdGNobGlzdCgpXG4gICAgLy8gfSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKVxufVxuXG4vLyBjcmVhdGVGb3JtXG5jb25zdCBjcmVhdGVGb3JtID0gKGZvcm0pID0+IHtcbiAgICAvLyByb3cgb25lOiBhc3NpZ24gaW5wdXRcbiAgICBjb25zdCBmb3JtUm93MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9ybVJvdzEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmb3JtUm93JylcbiAgICBjb25zdCBuZXdMb2NhdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIG5ld0xvY2F0aW9uSW5wdXQuY2xhc3NMaXN0LmFkZCgnbmV3TG9jYXRpb25JbnB1dCcpXG4gICAgbmV3TG9jYXRpb25JbnB1dC5wbGFjZWhvbGRlciA9ICdGbG9yZW5jZSdcbiAgICBuZXdMb2NhdGlvbklucHV0Lm5hbWUgPSAnbmV3TG9jYXRpb25JbnB1dCdcbiAgICBmb3JtUm93MS5hcHBlbmRDaGlsZChuZXdMb2NhdGlvbklucHV0KVxuXG4gICAgLy8gcm93IHR3bzogc3VibWl0IGFuZCBjYW5jZWwgYnV0dG9uc1xuICAgIGNvbnN0IGZvcm1Sb3cyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93Mi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZm9ybUJ1dHRvbnMnKVxuICAgIGNyZWF0ZUFkZEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcbiAgICBjcmVhdGVDYW5jZWxCdXR0b24oZm9ybVJvdzIsIGZvcm0pXG5cbiAgICAvLyByb3cgdGhyZWU6IGFzc2lnbiBlcnJvciBjbGFzcyBhbmQgdGV4dFxuICAgIGNvbnN0IGZvcm1Sb3czID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAvLyBmb3JtUm93My5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgZm9ybVJvdzMuc2V0QXR0cmlidXRlKCdjbGFzcycsICduZXdQcm9qRXJyb3JDb250YWluZXInKVxuICAgIC8vIGZvcm1Sb3czLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzEpXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MilcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3czKVxufVxuXG4vLyBEZWxldGUgd2F0Y2hsaXN0IGVudHJ5XG5jb25zdCBkZWxldGVXYXRjaGxpc3RFbnRyeSA9IChlKSA9PiB7XG4gICAgLy8gZ3JhYiBhcnJheXMgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBJZGVudGlmeSBlbnRyeSB0byBkZWxldGVcbiAgICBjb25zdCBkb29tZWRJbmRleCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgIC8vIGNvbnN0IGRvb21lZE5hbWUgPSBzdG9yYWdlV2F0Y2hsaXN0W2Rvb21lZEluZGV4XS5uYW1lO1xuXG4gICAgLy8gZGVsZXRlIGVudHJ5XG4gICAgc3RvcmFnZVdhdGNobGlzdC5zcGxpY2UoZG9vbWVkSW5kZXgsIDEpXG5cbiAgICAvLyBzZXQgY2hhbmdlcyB0byBsb2NhbFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gSWYgZG9vbWVkIGVudHJ5IHdhcyBzZWxlY3RlZCwgY2xlYXIgY29udGVudCBkaXNwbGF5XG4gICAgLy8gY29uc3QgY29udGVudFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRUaXRsZScpO1xuICAgIC8vIGNvbnN0IGFsbFRhc2tzQ2xhc3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbFRhc2tzJykuY2xhc3NMaXN0XG4gICAgLy8gaWYgKGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9PT0gZG9vbWVkTmFtZSkge1xuICAgIC8vICAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSAnQWxsIHRhc2tzJ1xuICAgIC8vICAgICBhbGxUYXNrc0NsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAvLyB9XG5cbiAgICAvLyByZWZyZXNoIHdhdGNoaXN0XG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IGNyZWF0ZURlbGV0ZUljb24gPSAoY29udGFpbmVyLCBpKSA9PiB7XG4gICAgLy8gY3JlYXRlIGltYWdlIGFuZCBhc3NpZ24gYXR0cmlidXRlc1xuICAgIGNvbnN0IG5ld0RlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0RlbGV0ZUljb24uc3JjID0gZGVsZXRlSWNvblxuICAgIG5ld0RlbGV0ZUljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uIGRlbGV0ZUl0ZW0nKVxuICAgIG5ld0RlbGV0ZUljb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcblxuICAgIC8vIEFERCBFVkVOVCBMSVNURU5FUlxuICAgIGlmIChcbiAgICAgICAgY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSA9PT0gJ3Byb2plY3QnIHx8XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QnKVxuICAgICkge1xuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lciB0byBkZWxldGUgcHJvamVjdFxuICAgICAgICBuZXdEZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnlgLFxuICAgICAgICAgICAgYGRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWAsXG4gICAgICAgICAgICBgaGlkZGVuYFxuICAgICAgICApXG4gICAgICAgIG5ld0RlbGV0ZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT5cbiAgICAgICAgICAgIGRlbGV0ZVdhdGNobGlzdEVudHJ5KGUsIGkpXG4gICAgICAgIClcbiAgICAgICAgLy8gZGlzcGxheSB0cmFzaCBpY29uIG9uIGhvdmVyXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICBgLmRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB9KVxuICAgICAgICAvLyBoaWRlIHRyYXNoIGljb25cbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgc3RyYW5nZScpXG4gICAgfVxuICAgIC8vIGFwcGVuZCB0byBjb250YWluZXJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmV3RGVsZXRlSWNvbilcbn1cblxuY29uc3QgY3JlYXRlQWRkaXRpb25JY29uID0gKGxpKSA9PiB7XG4gICAgY29uc3QgbmV3QWRkaXRpb25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdBZGRpdGlvbkljb24uc3JjID0gYWRkaXRpb25JY29uXG4gICAgbmV3QWRkaXRpb25JY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQobmV3QWRkaXRpb25JY29uKVxufVxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVEZWxldGVJY29uLFxuICAgIGNyZWF0ZUZvcm0sXG4gICAgY3JlYXRlTWVudUljb24sXG4gICAgZGlzcGxheVdhdGNobGlzdCxcbn1cbiIsImRvY3VtZW50LmNvb2tpZSA9ICdTYW1lU2l0ZT1MYXgnXG5cbmZ1bmN0aW9uIHRvRGlyZWN0aW9uKGRlZ3JlZSkge1xuICAgIGlmIChkZWdyZWUgPiAzMzcuNSkgcmV0dXJuICdOb3J0aCdcbiAgICBpZiAoZGVncmVlID4gMjkyLjUpIHJldHVybiAnTm9ydGggV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMjQ3LjUpIHJldHVybiAnV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMjAyLjUpIHJldHVybiAnU291dGggV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMTU3LjUpIHJldHVybiAnU291dGgnXG4gICAgaWYgKGRlZ3JlZSA+IDEyMi41KSByZXR1cm4gJ1NvdXRoIEVhc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDY3LjUpIHJldHVybiAnRWFzdCdcbiAgICBpZiAoZGVncmVlID4gMjIuNSkgcmV0dXJuICdOb3J0aCBFYXN0J1xuICAgIHJldHVybiAnTm9ydGgnXG59XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYyMzc2MTE1L2hvdy10by1vYnRhaW4tb3Blbi13ZWF0aGVyLWFwaS1kYXRlLXRpbWUtZnJvbS1jaXR5LWJlaW5nLWZldGNoZWRcbmNvbnN0IGNhbGNDdXJyZW50VGltZSA9ICh0aW1lem9uZSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3QgbG9jYWxUaW1lID0gZC5nZXRUaW1lKClcbiAgICBjb25zdCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwXG4gICAgY29uc3QgdXRjID0gbG9jYWxUaW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbmNvbnN0IGNhbGNTdW5UaW1lID0gKHRpbWUsIHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwXG4gICAgY29uc3QgdXRjID0gdGltZSArIGxvY2FsT2Zmc2V0XG4gICAgY29uc3QgbmV3Q2l0eSA9IHV0YyArIDEwMDAgKiB0aW1lem9uZVxuICAgIHJldHVybiBuZXcgRGF0ZShuZXdDaXR5KVxufVxuXG4vLyBjb25zdCBmZXRjaERhaWx5Rm9yZWNhc3QgPSAobGF0LCBsb24pID0+IHtcbi8vICAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKTtcbi8vICAgY29uc29sZS5sb2cobGF0KTtcbi8vICAgY29uc29sZS5sb2cobG9uKTtcbi8vICAgLy8gZmV0Y2ggc2V2ZW4gZGF5IGZvcmVjYXN0XG4vLyAgIGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mZXhjbHVkZT1taW51dGVseSxob3VybHksYWxlcnRzJnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCwgeyBtb2RlOiAnY29ycycgfSlcbi8vICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbi8vICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgQVBJRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJztcbi8vICAgICB9KTtcbi8vIH07XG5cbmNvbnN0IGZldGNoSG91cmx5Rm9yZWNhc3QgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgQVBJRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJRXJyb3JDb250YWluZXInKVxuICAgIC8vIGZldGNoIGZpdmUgZGF5L3RocmVlIGhvdXIgZm9yZWNhc3RcbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3RBcnJheSA9IFtdXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIC5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uaWNvbn0ucG5nYFxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShyZXNwb25zZS5saXN0W2ldLmR0X3R4dCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUZXh0OiByZXNwb25zZS5saXN0W2ldLmR0X3R4dCxcbiAgICAgICAgICAgICAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICAgICAgcmFpbkNoYW5jZTogcmVzcG9uc2UubGlzdFtpXS5wb3AgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS5saXN0W2ldLndpbmQuZGVnLFxuICAgICAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS5saXN0W2ldLndpbmQuZGVnKSxcbiAgICAgICAgICAgICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5ndXN0LFxuICAgICAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5zcGVlZCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheS5wdXNoKG5ld0hvdXJseUZvcmVjYXN0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3SG91cmx5Rm9yZWNhc3RBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBuZXdIb3VybHlGb3JlY2FzdEFycmF5XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBBUElFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IGZldGNoQ3VycmVudFdlYXRoZXIgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKVxuICAgIGNvbnN0IEFQSUVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUVycm9yQ29udGFpbmVyJylcblxuICAgIGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIC8vIGNvbnN0IHtsYXR9ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAgICAgICAvLyBjb25zdCB7bG9ufSA9IHJlc3BvbnNlLmNvb3JkO1xuICAgICAgICAgICAgLy8gZmV0Y2hEYWlseUZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1dlYXRoZXJDYXJkID0ge1xuICAgICAgICAgICAgICAgIGNpdHk6IHJlc3BvbnNlLm5hbWUsXG4gICAgICAgICAgICAgICAgY291bnRyeTogcmVzcG9uc2Uuc3lzLmNvdW50cnksXG4gICAgICAgICAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLm1haW4uaHVtaWRpdHksXG4gICAgICAgICAgICAgICAgbG9jYWxEYXRlOiBjYWxjQ3VycmVudFRpbWUocmVzcG9uc2UudGltZXpvbmUpLFxuICAgICAgICAgICAgICAgIHN1bnJpc2U6IGNhbGNTdW5UaW1lKFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zeXMuc3VucmlzZSAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnRpbWV6b25lXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBzdW5zZXQ6IGNhbGNTdW5UaW1lKFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zeXMuc3Vuc2V0ICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRlbXBDdXJyZW50OiByZXNwb25zZS5tYWluLnRlbXAsXG4gICAgICAgICAgICAgICAgdGVtcEhpZ2g6IHJlc3BvbnNlLm1haW4udGVtcF9tYXgsXG4gICAgICAgICAgICAgICAgdGVtcExvdzogcmVzcG9uc2UubWFpbi50ZW1wX21pbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLndpbmQuZGVnLFxuICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLndpbmQuZGVnKSxcbiAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLndpbmQuZ3VzdCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYFxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3V2VhdGhlckNhcmQpXG4gICAgICAgICAgICByZXR1cm4gbmV3V2VhdGhlckNhcmRcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIEFQSUVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgQVBJQ2l0eVNlYXJjaCA9IChpbnB1dCkgPT4ge1xuICAgIGZldGNoQ3VycmVudFdlYXRoZXIoaW5wdXQpXG4gICAgZmV0Y2hIb3VybHlGb3JlY2FzdChpbnB1dClcbn1cblxuLy8gUGxhY2Vob2xkZXIgQ29udGVudFxuLy8gQVBJQ2l0eVNlYXJjaCgnRmxvcmVuY2UnKVxuXG5jb25zdCB2YWxpZGF0ZVNlYXJjaCA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgLy8gZ3JhYiBkb20gZWxlbWVudHNcbiAgICBjb25zdCBuZXdMb2NhdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld0xvY2F0aW9uSW5wdXQnKVxuICAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcubmV3UHJvakVycm9yQ29udGFpbmVyJ1xuICAgIClcbiAgICAvLyByZXNldCBlcnJvclxuICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnJ1xuICAgIC8vIGNoZWNrIGZvciBzZWFyY2ggdGVybVxuICAgIGlmIChuZXdMb2NhdGlvbklucHV0LnZhbHVlID09PSAnJykge1xuICAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ1doaWNoIGNpdHk/J1xuICAgIH0gZWxzZSB7XG4gICAgICAgIEFQSUNpdHlTZWFyY2gobmV3TG9jYXRpb25JbnB1dC52YWx1ZSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlU2VhcmNoXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQge1xuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QsXG59IGZyb20gJy4vaGVscGVyRnVuY3Rpb25zJ1xuaW1wb3J0IGdpdGh1Ykljb24gZnJvbSAnLi9hc3NldHMvR2l0SHViLWxpZ2h0LTMycHgucG5nJ1xuaW1wb3J0IGxvZ29JY29uIGZyb20gJy4vYXNzZXRzL2xvZ29JY29uLnN2ZydcblxuY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpXG5cbiAgICAvLyBkaXNwbGF5IGxvZ29cbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBsb2dvLnNyYyA9IGxvZ29JY29uXG4gICAgbG9nby50YXJnZXQgPSAnX2JsYW5rJ1xuICAgIGxvZ28uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsb2dvJylcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbylcblxuICAgIC8vIGRpc3BsYXkgdGl0bGVcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdXZWF0aGVyc2VydmUnXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKVxuXG4gICAgcmV0dXJuIGhlYWRlclxufVxuXG5jb25zdCBjcmVhdGVNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1lbnUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtZW51JylcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgaGVhZGVyXG4gICAgY29uc3Qgd2F0Y2hsaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0SGVhZGVyJylcbiAgICB3YXRjaGxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSAnV2F0Y2hsaXN0J1xuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBtZW51XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QoKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGFkZExvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBidXR0b25cbiAgICBjb25zdCBhZGRMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBhZGRMb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uQnRuJylcbiAgICBjcmVhdGVBZGRpdGlvbkljb24oYWRkTG9jYXRpb24pXG4gICAgY29uc3QgYWRkTG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgYWRkTG9jYXRpb25UZXh0LmlubmVyVGV4dCA9ICdBZGQgTG9jYXRpb24nXG4gICAgYWRkTG9jYXRpb24uYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25UZXh0KVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uKVxuXG4gICAgLy8gR2VuZXJhdGUgYW5kIGhpZGUgbmV3IGxvY2F0aW9uIGZvcm1cbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkZvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLm1ldGhvZCA9ICdnZXQnXG4gICAgY3JlYXRlRm9ybShhZGRMb2NhdGlvbkZvcm0pXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Gb3JtKVxuXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3RIZWFkZXIpXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3QpXG4gICAgbWVudS5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkNvbnRhaW5lcilcblxuICAgIHJldHVybiBtZW51XG59XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJBUEkgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICAgIGNvbnN0IFdlYXRoZXJBUElDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50JylcbiAgICAvLyBXZWF0aGVyQVBJQ29udGFpbnRlci5pZCA9ICcnO1xuXG4gICAgLy8gY3JlYXRlIEFQSSB0aXRsZVxuICAgIGNvbnN0IEFQSVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKVxuICAgIEFQSVRpdGxlLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnRUaXRsZScpXG4gICAgQVBJVGl0bGUuaW5uZXJUZXh0ID0gJ1dlYXRoZXJzZXJ2ZSdcblxuICAgIC8vIGNyZWF0ZSBBUEkgaW1hZ2UgY29udGFpbmVyXG4gICAgLy8gY29uc3QgQVBJSW1hZ2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyBBUElJbWFnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZUNvbnRhaW5lcicpO1xuXG4gICAgLy8gY3JlYXRlIEFQSSBpbWdcbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgQVBJSW1hZ2UuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2UnKVxuXG4gICAgLy8gQXBwZW5kXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJVGl0bGUpXG4gICAgLy8gQVBJSW1hZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpO1xuXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpXG4gICAgLy8gV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2VDb250YWluZXIpO1xuICAgIC8vIGNvbnRhaW5lci5hcHBlbmRDaGlsZChXZWF0aGVyQVBJQ29udGFpbnRlcik7XG5cbiAgICByZXR1cm4gV2VhdGhlckFQSUNvbnRhaW50ZXJcbn1cblxuY29uc3QgY3JlYXRlQ29udGVudCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgY29udGVudCBjb250YWluZXJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQnKVxuXG4gICAgLy8gY3JlYXRlIHdlYXRoZXIgYXBwXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQVBJKCkpXG5cbiAgICByZXR1cm4gY29udGVudFxufVxuXG5jb25zdCBjcmVhdGVGb290ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJylcblxuICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGNvcHlyaWdodC50ZXh0Q29udGVudCA9IGBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IGpjYW1wYmVsbDU3YFxuXG4gICAgY29uc3QgZ2l0aHViTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGdpdGh1YkxpbmsuaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vamNhbXBiZWxsNTcnXG4gICAgZ2l0aHViTGluay50YXJnZXQgPSAnX2JsYW5rJ1xuXG4gICAgY29uc3QgbmV3R2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3R2l0aHViSWNvbi5zcmMgPSBnaXRodWJJY29uXG4gICAgbmV3R2l0aHViSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2dpdGh1YicpXG5cbiAgICBnaXRodWJMaW5rLmFwcGVuZENoaWxkKG5ld0dpdGh1Ykljb24pXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGNvcHlyaWdodClcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZ2l0aHViTGluaylcblxuICAgIHJldHVybiBmb290ZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUhlYWRlcigpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlTWVudSgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlQ29udGVudCgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRm9vdGVyKCkpXG59XG4iXSwibmFtZXMiOlsiYWRkaXRpb25JY29uIiwidmFsaWRhdGVTZWFyY2giLCJkZWxldGVJY29uIiwibWVudUljb24iLCJzZXRUYXNrRmlsdGVyIiwibGkiLCJjb250ZW50VGl0bGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsImlubmVyVGV4dCIsInN0b3JhZ2VXYXRjaGxpc3QiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZm9yRWFjaCIsImxvY2F0aW9uIiwic2VsZWN0ZWQiLCJnZXRBdHRyaWJ1dGUiLCJzZWxlY3RlZExvY2F0aW9uSWQiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGlzcGxheVdhdGNobGlzdCIsImNyZWF0ZU1lbnVJY29uIiwiY2hlY2tsaXN0SWNvbiIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUxpc3RpbmciLCJQcm9qIiwiaSIsIndhdGNobGlzdCIsImNsYXNzTGlzdCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJsb2NhdGlvblRleHQiLCJuYW1lIiwiY3JlYXRlRGVsZXRlSWNvbiIsIm9sZExpc3RpbmdDb3VudCIsImNoaWxkRWxlbWVudENvdW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsInByb2plY3QiLCJjcmVhdGVBZGRCdXR0b24iLCJjb250YWluZXIiLCJhZGRCdG4iLCJjcmVhdGVDYW5jZWxCdXR0b24iLCJjYW5jZWxCdG4iLCJjcmVhdGVGb3JtIiwiZm9ybSIsImZvcm1Sb3cxIiwibmV3TG9jYXRpb25JbnB1dCIsInBsYWNlaG9sZGVyIiwiZm9ybVJvdzIiLCJmb3JtUm93MyIsImRlbGV0ZVdhdGNobGlzdEVudHJ5IiwiZG9vbWVkSW5kZXgiLCJzcGxpY2UiLCJuZXdEZWxldGVJY29uIiwidHJhc2hJY29uIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZUFkZGl0aW9uSWNvbiIsIm5ld0FkZGl0aW9uSWNvbiIsImNvb2tpZSIsInRvRGlyZWN0aW9uIiwiZGVncmVlIiwiY2FsY0N1cnJlbnRUaW1lIiwidGltZXpvbmUiLCJkIiwiRGF0ZSIsImxvY2FsVGltZSIsImdldFRpbWUiLCJsb2NhbE9mZnNldCIsImdldFRpbWV6b25lT2Zmc2V0IiwidXRjIiwibmV3Q2l0eSIsImNhbGNTdW5UaW1lIiwidGltZSIsImZldGNoSG91cmx5Rm9yZWNhc3QiLCJjaXR5UXVlcnkiLCJBUElFcnJvckNvbnRhaW5lciIsImZldGNoIiwibW9kZSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJuZXdIb3VybHlGb3JlY2FzdEFycmF5IiwibmV3SG91cmx5Rm9yZWNhc3QiLCJkYXRlIiwibGlzdCIsImR0X3R4dCIsImRhdGVUZXh0IiwiaHVtaWRpdHkiLCJtYWluIiwicmFpbkNoYW5jZSIsInBvcCIsInRlbXBlcmF0dXJlIiwidGVtcCIsIndlYXRoZXJDb25kaXRpb24iLCJ3ZWF0aGVyIiwid2VhdGhlckRlc2NyaXB0aW9uIiwiZGVzY3JpcHRpb24iLCJ3aW5kRGVncmVlIiwid2luZCIsImRlZyIsIndpbmREaXJlY3Rpb24iLCJ3aW5kR3VzdCIsImd1c3QiLCJ3aW5kU3BlZWQiLCJzcGVlZCIsInB1c2giLCJjYXRjaCIsImVyciIsImZldGNoQ3VycmVudFdlYXRoZXIiLCJBUElJbWFnZSIsIm5ld1dlYXRoZXJDYXJkIiwiY2l0eSIsImNvdW50cnkiLCJzeXMiLCJsb2NhbERhdGUiLCJzdW5yaXNlIiwic3Vuc2V0IiwidGVtcEN1cnJlbnQiLCJ0ZW1wSGlnaCIsInRlbXBfbWF4IiwidGVtcExvdyIsInRlbXBfbWluIiwiaWNvbiIsIkFQSUNpdHlTZWFyY2giLCJpbnB1dCIsInByZXZlbnREZWZhdWx0IiwibmV3UHJvakVycm9yQ29udGFpbmVyIiwidmFsdWUiLCJnaXRodWJJY29uIiwibG9nb0ljb24iLCJjcmVhdGVIZWFkZXIiLCJoZWFkZXIiLCJsb2dvIiwidGl0bGUiLCJjcmVhdGVNZW51IiwibWVudSIsIndhdGNobGlzdEhlYWRlciIsImFkZExvY2F0aW9uQ29udGFpbmVyIiwiYWRkTG9jYXRpb24iLCJhZGRMb2NhdGlvblRleHQiLCJhZGRMb2NhdGlvbkZvcm0iLCJtZXRob2QiLCJjcmVhdGVXZWF0aGVyQVBJIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJBUElUaXRsZSIsImNyZWF0ZUNvbnRlbnQiLCJjb250ZW50IiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiY29weXJpZ2h0IiwiZ2V0RnVsbFllYXIiLCJnaXRodWJMaW5rIiwiaHJlZiIsIm5ld0dpdGh1Ykljb24iLCJpbml0aWFsaXplIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=