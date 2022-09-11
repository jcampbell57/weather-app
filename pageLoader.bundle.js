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
/* harmony export */   "displayWatchlist": () => (/* binding */ displayWatchlist),
/* harmony export */   "submitLocation": () => (/* binding */ submitLocation),
/* harmony export */   "validateSearch": () => (/* binding */ validateSearch)
/* harmony export */ });
/* harmony import */ var _assets_plus_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/plus.svg */ "./src/assets/plus.svg");
/* harmony import */ var _assets_delete_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/delete.svg */ "./src/assets/delete.svg");
/* harmony import */ var _assets_menuIcon_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/menuIcon.svg */ "./src/assets/menuIcon.svg");
 // import APICitySearch from './weatherAPI'



document.cookie = 'SameSite=Lax';

const createMenuIcon = li => {
  const checklistIcon = document.createElement('img');
  checklistIcon.src = _assets_menuIcon_svg__WEBPACK_IMPORTED_MODULE_2__;
  checklistIcon.setAttribute('class', 'icon');
  li.appendChild(checklistIcon);
}; // Add single location to watchlist (called below)


const createListing = (locationName, i) => {
  const watchlist = document.querySelector('#watchlist');
  const location = document.createElement('li');
  location.classList.add("location");
  location.setAttribute('id', "".concat(i)); // assign class to selected location listing

  if (locationName.selected === 'true') {
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
  locationText.textContent = locationName.name;
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
  console.log(storageWatchlist);
  storageWatchlist.forEach(location => {
    console.log(location.name);
    createListing(location, i); // eslint-disable-next-line no-plusplus

    i++;
  });
};

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

  displayWatchlist();
};

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

const createAddButton = container => {
  const addBtn = document.createElement('button');
  addBtn.classList.add('addBtn');
  addBtn.innerText = 'search';
  addBtn.addEventListener('click', e => validateSearch(e));
  container.appendChild(addBtn);
};

const createCancelButton = (container, i) => {
  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('cancelBtn');
  cancelBtn.setAttribute('id', "".concat(i));
  cancelBtn.innerText = 'cancel';
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
  newDeleteIcon.src = _assets_delete_svg__WEBPACK_IMPORTED_MODULE_1__;
  newDeleteIcon.setAttribute('class', 'icon deleteItem');
  newDeleteIcon.setAttribute('id', "".concat(i)); // ADD EVENT LISTENER

  if (container.getAttribute('class') === 'location' || container.classList.contains('location')) {
    // Event listener to delete location
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
}; // #########################
// Openweather API Functions
// #########################


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
//   const newProjErrorContainer = document.querySelector('.newProjErrorContainer');
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
//       newProjErrorContainer.innerText = 'City not found';
//     });
// };


const fetchHourlyForecast = cityQuery => {
  const newProjErrorContainer = document.querySelector('.newProjErrorContainer'); // fetch five day/three hour forecast

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
    newProjErrorContainer.innerText = 'City not found';
  });
};

const fetchCurrentWeather = cityQuery => {
  const APIImage = document.querySelector('.APIImage');
  const newProjErrorContainer = document.querySelector('.newProjErrorContainer');
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
    newProjErrorContainer.innerText = 'City not found';
  });
};

const APICitySearch = input => {
  fetchCurrentWeather(input);
  fetchHourlyForecast(input);
}; // Placeholder Content
// APICitySearch('Florence')




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZUxvYWRlci5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FDQTs7QUFDQTtBQUNBO0FBRUFHLFFBQVEsQ0FBQ0MsTUFBVCxHQUFrQixjQUFsQjs7QUFFQSxNQUFNQyxjQUFjLEdBQUlDLEVBQUQsSUFBUTtFQUMzQixNQUFNQyxhQUFhLEdBQUdKLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUF0QjtFQUNBRCxhQUFhLENBQUNFLEdBQWQsR0FBb0JQLGlEQUFwQjtFQUNBSyxhQUFhLENBQUNHLFlBQWQsQ0FBMkIsT0FBM0IsRUFBb0MsTUFBcEM7RUFDQUosRUFBRSxDQUFDSyxXQUFILENBQWVKLGFBQWY7QUFDSCxDQUxELEVBT0E7OztBQUNBLE1BQU1LLGFBQWEsR0FBRyxDQUFDQyxZQUFELEVBQWVDLENBQWYsS0FBcUI7RUFDdkMsTUFBTUMsU0FBUyxHQUFHWixRQUFRLENBQUNhLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBbEI7RUFFQSxNQUFNQyxRQUFRLEdBQUdkLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixJQUF2QixDQUFqQjtFQUNBUyxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLEdBQW5CO0VBQ0FGLFFBQVEsQ0FBQ1AsWUFBVCxDQUFzQixJQUF0QixZQUErQkksQ0FBL0IsR0FMdUMsQ0FNdkM7O0VBQ0EsSUFBSUQsWUFBWSxDQUFDTyxRQUFiLEtBQTBCLE1BQTlCLEVBQXNDO0lBQ2xDSCxRQUFRLENBQUNDLFNBQVQsQ0FBbUJDLEdBQW5CLENBQXVCLFVBQXZCO0VBQ0gsQ0FUc0MsQ0FXdkM7OztFQUNBRixRQUFRLENBQUNJLGdCQUFULENBQTBCLE9BQTFCLEVBQW9DQyxDQUFELElBQU87SUFDdEM7SUFDQSxJQUFJQSxDQUFDLENBQUNDLE1BQUYsQ0FBU0wsU0FBVCxDQUFtQk0sUUFBbkIsQ0FBNEIsWUFBNUIsQ0FBSixFQUErQztNQUMzQztJQUNIOztJQUNEQyxjQUFjLENBQUNSLFFBQUQsQ0FBZDtFQUNILENBTkQ7RUFRQVosY0FBYyxDQUFDWSxRQUFELENBQWQ7RUFDQSxNQUFNUyxZQUFZLEdBQUd2QixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBckI7RUFDQWtCLFlBQVksQ0FBQ0MsV0FBYixHQUEyQmQsWUFBWSxDQUFDZSxJQUF4QztFQUNBWCxRQUFRLENBQUNOLFdBQVQsQ0FBcUJlLFlBQXJCO0VBQ0FHLGdCQUFnQixDQUFDWixRQUFELEVBQVdILENBQVgsQ0FBaEI7RUFDQUMsU0FBUyxDQUFDSixXQUFWLENBQXNCTSxRQUF0QjtBQUNILENBMUJELEVBNEJBOzs7QUFDQSxNQUFNYSxnQkFBZ0IsR0FBRyxNQUFNO0VBQzNCO0VBQ0EsTUFBTWYsU0FBUyxHQUFHWixRQUFRLENBQUNhLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBbEIsQ0FGMkIsQ0FJM0I7O0VBQ0EsTUFBTWUsZUFBZSxHQUFHaEIsU0FBUyxDQUFDaUIsaUJBQWxDLENBTDJCLENBTTNCOztFQUNBLEtBQUssSUFBSWxCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdpQixlQUFwQixFQUFxQ2pCLENBQUMsRUFBdEMsRUFBMEM7SUFDdENDLFNBQVMsQ0FBQ2tCLFVBQVYsQ0FBcUJDLE1BQXJCO0VBQ0gsQ0FUMEIsQ0FXM0I7OztFQUNBLElBQUlwQixDQUFDLEdBQUcsQ0FBUjtFQUNBLE1BQU1xQixnQkFBZ0IsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQ3JCQyxZQUFZLENBQUNDLE9BQWIsQ0FBcUIsa0JBQXJCLENBRHFCLENBQXpCO0VBR0FDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTixnQkFBWjtFQUNBQSxnQkFBZ0IsQ0FBQ08sT0FBakIsQ0FBMEJ6QixRQUFELElBQWM7SUFDbkN1QixPQUFPLENBQUNDLEdBQVIsQ0FBWXhCLFFBQVEsQ0FBQ1csSUFBckI7SUFDQWhCLGFBQWEsQ0FBQ0ssUUFBRCxFQUFXSCxDQUFYLENBQWIsQ0FGbUMsQ0FHbkM7O0lBQ0FBLENBQUM7RUFDSixDQUxEO0FBTUgsQ0F2QkQ7O0FBeUJBLE1BQU02QixjQUFjLEdBQUlDLEtBQUQsSUFBVztFQUM5QjtFQUNBLE1BQU1DLFdBQVcsR0FBRztJQUNoQmpCLElBQUksRUFBRWdCLEtBRFU7SUFFaEJ4QixRQUFRLEVBQUU7RUFGTSxDQUFwQixDQUY4QixDQU85Qjs7RUFDQSxNQUFNZSxnQkFBZ0IsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQ3JCQyxZQUFZLENBQUNDLE9BQWIsQ0FBcUIsa0JBQXJCLENBRHFCLENBQXpCLENBUjhCLENBWTlCOztFQUNBSixnQkFBZ0IsQ0FBQ08sT0FBakIsQ0FBMEJ6QixRQUFELElBQWM7SUFDbkMsSUFBSUEsUUFBUSxDQUFDRyxRQUFULEtBQXNCLElBQTFCLEVBQWdDO01BQzVCSCxRQUFRLENBQUNHLFFBQVQsR0FBb0IsS0FBcEI7SUFDSDtFQUNKLENBSkQsRUFiOEIsQ0FtQjlCOztFQUNBZSxnQkFBZ0IsQ0FBQ1csSUFBakIsQ0FBc0JELFdBQXRCLEVBcEI4QixDQXFCOUI7RUFFQTs7RUFDQVAsWUFBWSxDQUFDUyxPQUFiLENBQXFCLGtCQUFyQixFQUF5Q1gsSUFBSSxDQUFDWSxTQUFMLENBQWViLGdCQUFmLENBQXpDLEVBeEI4QixDQTBCOUI7O0VBQ0FMLGdCQUFnQjtBQUNuQixDQTVCRDs7QUE4QkEsTUFBTUwsY0FBYyxHQUFJbkIsRUFBRCxJQUFRO0VBQzNCO0VBQ0EsTUFBTTJDLFlBQVksR0FBRzlDLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixlQUF2QixDQUFyQjtFQUNBaUMsWUFBWSxDQUFDdEIsV0FBYixHQUEyQnJCLEVBQUUsQ0FBQzRDLFNBQTlCLENBSDJCLENBSzNCOztFQUNBLE1BQU1mLGdCQUFnQixHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FDckJDLFlBQVksQ0FBQ0MsT0FBYixDQUFxQixrQkFBckIsQ0FEcUIsQ0FBekIsQ0FOMkIsQ0FVM0I7O0VBQ0FKLGdCQUFnQixDQUFDTyxPQUFqQixDQUEwQnpCLFFBQUQsSUFBYztJQUNuQyxJQUFJQSxRQUFRLENBQUNHLFFBQVQsS0FBc0IsTUFBMUIsRUFBa0M7TUFDOUJILFFBQVEsQ0FBQ0csUUFBVCxHQUFvQixPQUFwQjtJQUNIO0VBQ0osQ0FKRCxFQVgyQixDQWlCM0I7O0VBQ0EsSUFBSWQsRUFBRSxDQUFDNkMsWUFBSCxDQUFnQixPQUFoQixNQUE2QixVQUFqQyxFQUE2QztJQUN6QyxNQUFNQyxrQkFBa0IsR0FBRzlDLEVBQUUsQ0FBQzZDLFlBQUgsQ0FBZ0IsSUFBaEIsQ0FBM0I7SUFDQWhCLGdCQUFnQixDQUFDaUIsa0JBQUQsQ0FBaEIsQ0FBcUNoQyxRQUFyQyxHQUFnRCxNQUFoRDtFQUNILENBckIwQixDQXVCM0I7OztFQUNBa0IsWUFBWSxDQUFDUyxPQUFiLENBQXFCLGtCQUFyQixFQUF5Q1gsSUFBSSxDQUFDWSxTQUFMLENBQWViLGdCQUFmLENBQXpDLEVBeEIyQixDQTBCM0I7O0VBQ0FMLGdCQUFnQjtBQUNuQixDQTVCRDs7QUE4QkEsTUFBTXVCLGVBQWUsR0FBSUMsU0FBRCxJQUFlO0VBQ25DLE1BQU1DLE1BQU0sR0FBR3BELFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixRQUF2QixDQUFmO0VBQ0ErQyxNQUFNLENBQUNyQyxTQUFQLENBQWlCQyxHQUFqQixDQUFxQixRQUFyQjtFQUNBb0MsTUFBTSxDQUFDTCxTQUFQLEdBQW1CLFFBQW5CO0VBQ0FLLE1BQU0sQ0FBQ2xDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWtDQyxDQUFELElBQU9rQyxjQUFjLENBQUNsQyxDQUFELENBQXREO0VBQ0FnQyxTQUFTLENBQUMzQyxXQUFWLENBQXNCNEMsTUFBdEI7QUFDSCxDQU5EOztBQVFBLE1BQU1FLGtCQUFrQixHQUFHLENBQUNILFNBQUQsRUFBWXhDLENBQVosS0FBa0I7RUFDekMsTUFBTTRDLFNBQVMsR0FBR3ZELFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixRQUF2QixDQUFsQjtFQUNBa0QsU0FBUyxDQUFDeEMsU0FBVixDQUFvQkMsR0FBcEIsQ0FBd0IsV0FBeEI7RUFDQXVDLFNBQVMsQ0FBQ2hELFlBQVYsQ0FBdUIsSUFBdkIsWUFBZ0NJLENBQWhDO0VBQ0E0QyxTQUFTLENBQUNSLFNBQVYsR0FBc0IsUUFBdEI7RUFDQUksU0FBUyxDQUFDM0MsV0FBVixDQUFzQitDLFNBQXRCO0FBQ0gsQ0FORCxFQVFBOzs7QUFDQSxNQUFNQyxVQUFVLEdBQUlDLElBQUQsSUFBVTtFQUN6QjtFQUNBLE1BQU1DLFFBQVEsR0FBRzFELFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFqQjtFQUNBcUQsUUFBUSxDQUFDbkQsWUFBVCxDQUFzQixPQUF0QixFQUErQixTQUEvQjtFQUNBLE1BQU1vRCxnQkFBZ0IsR0FBRzNELFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixPQUF2QixDQUF6QjtFQUNBc0QsZ0JBQWdCLENBQUM1QyxTQUFqQixDQUEyQkMsR0FBM0IsQ0FBK0Isa0JBQS9CO0VBQ0EyQyxnQkFBZ0IsQ0FBQ0MsV0FBakIsR0FBK0IsVUFBL0I7RUFDQUQsZ0JBQWdCLENBQUNsQyxJQUFqQixHQUF3QixrQkFBeEI7RUFDQWlDLFFBQVEsQ0FBQ2xELFdBQVQsQ0FBcUJtRCxnQkFBckIsRUFSeUIsQ0FVekI7O0VBQ0EsTUFBTUUsUUFBUSxHQUFHN0QsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0VBQ0F3RCxRQUFRLENBQUN0RCxZQUFULENBQXNCLE9BQXRCLEVBQStCLFNBQS9CO0VBQ0FzRCxRQUFRLENBQUN0RCxZQUFULENBQXNCLElBQXRCLEVBQTRCLGFBQTVCO0VBQ0EyQyxlQUFlLENBQUNXLFFBQUQsRUFBV0osSUFBWCxDQUFmO0VBQ0FILGtCQUFrQixDQUFDTyxRQUFELEVBQVdKLElBQVgsQ0FBbEIsQ0FmeUIsQ0FpQnpCOztFQUNBLE1BQU1LLFFBQVEsR0FBRzlELFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFqQixDQWxCeUIsQ0FtQnpCOztFQUNBeUQsUUFBUSxDQUFDdkQsWUFBVCxDQUFzQixPQUF0QixFQUErQix1QkFBL0IsRUFwQnlCLENBcUJ6Qjs7RUFFQWtELElBQUksQ0FBQ2pELFdBQUwsQ0FBaUJrRCxRQUFqQjtFQUNBRCxJQUFJLENBQUNqRCxXQUFMLENBQWlCcUQsUUFBakI7RUFDQUosSUFBSSxDQUFDakQsV0FBTCxDQUFpQnNELFFBQWpCO0FBQ0gsQ0ExQkQsRUE0QkE7OztBQUNBLE1BQU1DLG9CQUFvQixHQUFJNUMsQ0FBRCxJQUFPO0VBQ2hDO0VBQ0EsTUFBTWEsZ0JBQWdCLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUNyQkMsWUFBWSxDQUFDQyxPQUFiLENBQXFCLGtCQUFyQixDQURxQixDQUF6QixDQUZnQyxDQU1oQzs7RUFDQSxNQUFNNEIsV0FBVyxHQUFHN0MsQ0FBQyxDQUFDQyxNQUFGLENBQVM0QixZQUFULENBQXNCLElBQXRCLENBQXBCLENBUGdDLENBUWhDO0VBRUE7O0VBQ0FoQixnQkFBZ0IsQ0FBQ2lDLE1BQWpCLENBQXdCRCxXQUF4QixFQUFxQyxDQUFyQyxFQVhnQyxDQWFoQzs7RUFDQTdCLFlBQVksQ0FBQ1MsT0FBYixDQUFxQixrQkFBckIsRUFBeUNYLElBQUksQ0FBQ1ksU0FBTCxDQUFlYixnQkFBZixDQUF6QyxFQWRnQyxDQWdCaEM7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFFQTs7RUFDQUwsZ0JBQWdCO0FBQ25CLENBMUJEOztBQTRCQSxNQUFNRCxnQkFBZ0IsR0FBRyxDQUFDeUIsU0FBRCxFQUFZeEMsQ0FBWixLQUFrQjtFQUN2QztFQUNBLE1BQU11RCxhQUFhLEdBQUdsRSxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdEI7RUFDQTZELGFBQWEsQ0FBQzVELEdBQWQsR0FBb0JSLCtDQUFwQjtFQUNBb0UsYUFBYSxDQUFDM0QsWUFBZCxDQUEyQixPQUEzQixFQUFvQyxpQkFBcEM7RUFDQTJELGFBQWEsQ0FBQzNELFlBQWQsQ0FBMkIsSUFBM0IsWUFBb0NJLENBQXBDLEdBTHVDLENBT3ZDOztFQUNBLElBQ0l3QyxTQUFTLENBQUNILFlBQVYsQ0FBdUIsT0FBdkIsTUFBb0MsVUFBcEMsSUFDQUcsU0FBUyxDQUFDcEMsU0FBVixDQUFvQk0sUUFBcEIsQ0FBNkIsVUFBN0IsQ0FGSixFQUdFO0lBQ0U7SUFDQTZDLGFBQWEsQ0FBQ25ELFNBQWQsQ0FBd0JDLEdBQXhCLHVEQUUyQkwsQ0FGM0I7SUFLQXVELGFBQWEsQ0FBQ2hELGdCQUFkLENBQStCLE9BQS9CLEVBQXlDQyxDQUFELElBQ3BDNEMsb0JBQW9CLENBQUM1QyxDQUFELEVBQUlSLENBQUosQ0FEeEIsRUFQRixDQVVFOztJQUNBd0MsU0FBUyxDQUFDakMsZ0JBQVYsQ0FBMkIsWUFBM0IsRUFBeUMsTUFBTTtNQUMzQyxNQUFNaUQsU0FBUyxHQUFHbkUsUUFBUSxDQUFDYSxhQUFULGdDQUNVRixDQURWLEVBQWxCO01BR0F3RCxTQUFTLENBQUNwRCxTQUFWLENBQW9CZ0IsTUFBcEIsQ0FBMkIsUUFBM0I7SUFDSCxDQUxELEVBWEYsQ0FpQkU7O0lBQ0FvQixTQUFTLENBQUNqQyxnQkFBVixDQUEyQixZQUEzQixFQUF5QyxNQUFNO01BQzNDLE1BQU1pRCxTQUFTLEdBQUduRSxRQUFRLENBQUNhLGFBQVQsZ0NBQ1VGLENBRFYsRUFBbEI7TUFHQXdELFNBQVMsQ0FBQ3BELFNBQVYsQ0FBb0JDLEdBQXBCLENBQXdCLFFBQXhCO0lBQ0gsQ0FMRDtFQU1ILENBM0JELE1BMkJPO0lBQ0hxQixPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtFQUNILENBckNzQyxDQXNDdkM7OztFQUNBYSxTQUFTLENBQUMzQyxXQUFWLENBQXNCMEQsYUFBdEI7QUFDSCxDQXhDRDs7QUEwQ0EsTUFBTUUsa0JBQWtCLEdBQUlqRSxFQUFELElBQVE7RUFDL0IsTUFBTWtFLGVBQWUsR0FBR3JFLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUF4QjtFQUNBZ0UsZUFBZSxDQUFDL0QsR0FBaEIsR0FBc0JULDZDQUF0QjtFQUNBd0UsZUFBZSxDQUFDOUQsWUFBaEIsQ0FBNkIsT0FBN0IsRUFBc0MsTUFBdEM7RUFDQUosRUFBRSxDQUFDSyxXQUFILENBQWU2RCxlQUFmO0FBQ0gsQ0FMRDs7QUFPQSxNQUFNaEIsY0FBYyxHQUFJbEMsQ0FBRCxJQUFPO0VBQzFCQSxDQUFDLENBQUNtRCxjQUFGLEdBRDBCLENBRTFCOztFQUNBLE1BQU1YLGdCQUFnQixHQUFHM0QsUUFBUSxDQUFDYSxhQUFULENBQXVCLG1CQUF2QixDQUF6QjtFQUNBLE1BQU0wRCxxQkFBcUIsR0FBR3ZFLFFBQVEsQ0FBQ2EsYUFBVCxDQUMxQix3QkFEMEIsQ0FBOUIsQ0FKMEIsQ0FPMUI7O0VBQ0EwRCxxQkFBcUIsQ0FBQ3hCLFNBQXRCLEdBQWtDLEVBQWxDLENBUjBCLENBUzFCOztFQUNBLElBQUlZLGdCQUFnQixDQUFDYSxLQUFqQixLQUEyQixFQUEvQixFQUFtQztJQUMvQkQscUJBQXFCLENBQUN4QixTQUF0QixHQUFrQyxhQUFsQztFQUNILENBRkQsTUFFTztJQUNIMEIsYUFBYSxDQUFDZCxnQkFBZ0IsQ0FBQ2EsS0FBbEIsQ0FBYjtFQUNIO0FBQ0osQ0FmRCxFQWlCQTtBQUNBO0FBQ0E7OztBQUVBLFNBQVNFLFdBQVQsQ0FBcUJDLE1BQXJCLEVBQTZCO0VBQ3pCLElBQUlBLE1BQU0sR0FBRyxLQUFiLEVBQW9CLE9BQU8sT0FBUDtFQUNwQixJQUFJQSxNQUFNLEdBQUcsS0FBYixFQUFvQixPQUFPLFlBQVA7RUFDcEIsSUFBSUEsTUFBTSxHQUFHLEtBQWIsRUFBb0IsT0FBTyxNQUFQO0VBQ3BCLElBQUlBLE1BQU0sR0FBRyxLQUFiLEVBQW9CLE9BQU8sWUFBUDtFQUNwQixJQUFJQSxNQUFNLEdBQUcsS0FBYixFQUFvQixPQUFPLE9BQVA7RUFDcEIsSUFBSUEsTUFBTSxHQUFHLEtBQWIsRUFBb0IsT0FBTyxZQUFQO0VBQ3BCLElBQUlBLE1BQU0sR0FBRyxJQUFiLEVBQW1CLE9BQU8sTUFBUDtFQUNuQixJQUFJQSxNQUFNLEdBQUcsSUFBYixFQUFtQixPQUFPLFlBQVA7RUFDbkIsT0FBTyxPQUFQO0FBQ0gsRUFFRDs7O0FBQ0EsTUFBTUMsZUFBZSxHQUFJQyxRQUFELElBQWM7RUFDbEMsTUFBTUMsQ0FBQyxHQUFHLElBQUlDLElBQUosRUFBVjtFQUNBLE1BQU1DLFNBQVMsR0FBR0YsQ0FBQyxDQUFDRyxPQUFGLEVBQWxCO0VBQ0EsTUFBTUMsV0FBVyxHQUFHSixDQUFDLENBQUNLLGlCQUFGLEtBQXdCLEtBQTVDO0VBQ0EsTUFBTUMsR0FBRyxHQUFHSixTQUFTLEdBQUdFLFdBQXhCO0VBQ0EsTUFBTUcsT0FBTyxHQUFHRCxHQUFHLEdBQUcsT0FBT1AsUUFBN0I7RUFDQSxPQUFPLElBQUlFLElBQUosQ0FBU00sT0FBVCxDQUFQO0FBQ0gsQ0FQRDs7QUFTQSxNQUFNQyxXQUFXLEdBQUcsQ0FBQ0MsSUFBRCxFQUFPVixRQUFQLEtBQW9CO0VBQ3BDLE1BQU1DLENBQUMsR0FBRyxJQUFJQyxJQUFKLEVBQVY7RUFDQSxNQUFNRyxXQUFXLEdBQUdKLENBQUMsQ0FBQ0ssaUJBQUYsS0FBd0IsS0FBNUM7RUFDQSxNQUFNQyxHQUFHLEdBQUdHLElBQUksR0FBR0wsV0FBbkI7RUFDQSxNQUFNRyxPQUFPLEdBQUdELEdBQUcsR0FBRyxPQUFPUCxRQUE3QjtFQUNBLE9BQU8sSUFBSUUsSUFBSixDQUFTTSxPQUFULENBQVA7QUFDSCxDQU5ELEVBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxNQUFNRyxtQkFBbUIsR0FBSUMsU0FBRCxJQUFlO0VBQ3ZDLE1BQU1sQixxQkFBcUIsR0FBR3ZFLFFBQVEsQ0FBQ2EsYUFBVCxDQUMxQix3QkFEMEIsQ0FBOUIsQ0FEdUMsQ0FJdkM7O0VBQ0E2RSxLQUFLLDhEQUNxREQsU0FEckQsNkRBRUQ7SUFBRUUsSUFBSSxFQUFFO0VBQVIsQ0FGQyxDQUFMLENBSUtDLElBSkwsQ0FJV0MsUUFBRCxJQUFjQSxRQUFRLENBQUNDLElBQVQsRUFKeEIsRUFLS0YsSUFMTCxDQUtXQyxRQUFELElBQWM7SUFDaEJ4RCxPQUFPLENBQUNDLEdBQVIsQ0FBWXVELFFBQVo7SUFDQSxNQUFNRSxzQkFBc0IsR0FBRyxFQUEvQixDQUZnQixDQUdoQjs7SUFDQSxLQUFLLElBQUlwRixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO01BQ3pCO01BQ0EsTUFBTXFGLGlCQUFpQixHQUFHO1FBQ3RCQyxJQUFJLEVBQUUsSUFBSWxCLElBQUosQ0FBU2MsUUFBUSxDQUFDSyxJQUFULENBQWN2RixDQUFkLEVBQWlCd0YsTUFBMUIsQ0FEZ0I7UUFFdEJDLFFBQVEsRUFBRVAsUUFBUSxDQUFDSyxJQUFULENBQWN2RixDQUFkLEVBQWlCd0YsTUFGTDtRQUd0QkUsUUFBUSxFQUFFUixRQUFRLENBQUNLLElBQVQsQ0FBY3ZGLENBQWQsRUFBaUIyRixJQUFqQixDQUFzQkQsUUFIVjtRQUl0QkUsVUFBVSxFQUFFVixRQUFRLENBQUNLLElBQVQsQ0FBY3ZGLENBQWQsRUFBaUI2RixHQUFqQixHQUF1QixHQUpiO1FBS3RCQyxXQUFXLEVBQUVaLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjdkYsQ0FBZCxFQUFpQjJGLElBQWpCLENBQXNCSSxJQUxiO1FBTXRCQyxnQkFBZ0IsRUFBRWQsUUFBUSxDQUFDSyxJQUFULENBQWN2RixDQUFkLEVBQWlCaUcsT0FBakIsQ0FBeUIsQ0FBekIsRUFBNEJOLElBTnhCO1FBT3RCTyxrQkFBa0IsRUFBRWhCLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjdkYsQ0FBZCxFQUFpQmlHLE9BQWpCLENBQXlCLENBQXpCLEVBQTRCRSxXQVAxQjtRQVF0QkMsVUFBVSxFQUFFbEIsUUFBUSxDQUFDSyxJQUFULENBQWN2RixDQUFkLEVBQWlCcUcsSUFBakIsQ0FBc0JDLEdBUlo7UUFTdEJDLGFBQWEsRUFBRXhDLFdBQVcsQ0FBQ21CLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjdkYsQ0FBZCxFQUFpQnFHLElBQWpCLENBQXNCQyxHQUF2QixDQVRKO1FBVXRCRSxRQUFRLEVBQUV0QixRQUFRLENBQUNLLElBQVQsQ0FBY3ZGLENBQWQsRUFBaUJxRyxJQUFqQixDQUFzQkksSUFWVjtRQVd0QkMsU0FBUyxFQUFFeEIsUUFBUSxDQUFDSyxJQUFULENBQWN2RixDQUFkLEVBQWlCcUcsSUFBakIsQ0FBc0JNO01BWFgsQ0FBMUI7TUFhQXZCLHNCQUFzQixDQUFDcEQsSUFBdkIsQ0FBNEJxRCxpQkFBNUI7SUFDSDs7SUFDRDNELE9BQU8sQ0FBQ0MsR0FBUixDQUFZeUQsc0JBQVo7SUFDQSxPQUFPQSxzQkFBUDtFQUNILENBNUJMLEVBNkJLd0IsS0E3QkwsQ0E2QllDLEdBQUQsSUFBUztJQUNabkYsT0FBTyxDQUFDQyxHQUFSLENBQVlrRixHQUFaO0lBQ0FqRCxxQkFBcUIsQ0FBQ3hCLFNBQXRCLEdBQWtDLGdCQUFsQztFQUNILENBaENMO0FBaUNILENBdENEOztBQXdDQSxNQUFNMEUsbUJBQW1CLEdBQUloQyxTQUFELElBQWU7RUFDdkMsTUFBTWlDLFFBQVEsR0FBRzFILFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixXQUF2QixDQUFqQjtFQUNBLE1BQU0wRCxxQkFBcUIsR0FBR3ZFLFFBQVEsQ0FBQ2EsYUFBVCxDQUMxQix3QkFEMEIsQ0FBOUI7RUFJQTZFLEtBQUssNkRBQ29ERCxTQURwRCw2REFFRDtJQUFFRSxJQUFJLEVBQUU7RUFBUixDQUZDLENBQUwsQ0FJS0MsSUFKTCxDQUlXQyxRQUFELElBQWNBLFFBQVEsQ0FBQ0MsSUFBVCxFQUp4QixFQUtLRixJQUxMLENBS1dDLFFBQUQsSUFBYztJQUNoQnhELE9BQU8sQ0FBQ0MsR0FBUixDQUFZdUQsUUFBWixFQURnQixDQUVoQjtJQUNBO0lBQ0E7O0lBQ0FyRCxjQUFjLENBQUNxRCxRQUFRLENBQUNwRSxJQUFWLENBQWQ7SUFDQSxNQUFNa0csY0FBYyxHQUFHO01BQ25CQyxJQUFJLEVBQUUvQixRQUFRLENBQUNwRSxJQURJO01BRW5Cb0csT0FBTyxFQUFFaEMsUUFBUSxDQUFDaUMsR0FBVCxDQUFhRCxPQUZIO01BR25CeEIsUUFBUSxFQUFFUixRQUFRLENBQUNTLElBQVQsQ0FBY0QsUUFITDtNQUluQjBCLFNBQVMsRUFBRW5ELGVBQWUsQ0FBQ2lCLFFBQVEsQ0FBQ2hCLFFBQVYsQ0FKUDtNQUtuQm1ELE9BQU8sRUFBRTFDLFdBQVcsQ0FDaEJPLFFBQVEsQ0FBQ2lDLEdBQVQsQ0FBYUUsT0FBYixHQUF1QixJQURQLEVBRWhCbkMsUUFBUSxDQUFDaEIsUUFGTyxDQUxEO01BU25Cb0QsTUFBTSxFQUFFM0MsV0FBVyxDQUNmTyxRQUFRLENBQUNpQyxHQUFULENBQWFHLE1BQWIsR0FBc0IsSUFEUCxFQUVmcEMsUUFBUSxDQUFDaEIsUUFGTSxDQVRBO01BYW5CcUQsV0FBVyxFQUFFckMsUUFBUSxDQUFDUyxJQUFULENBQWNJLElBYlI7TUFjbkJ5QixRQUFRLEVBQUV0QyxRQUFRLENBQUNTLElBQVQsQ0FBYzhCLFFBZEw7TUFlbkJDLE9BQU8sRUFBRXhDLFFBQVEsQ0FBQ1MsSUFBVCxDQUFjZ0MsUUFmSjtNQWdCbkIzQixnQkFBZ0IsRUFBRWQsUUFBUSxDQUFDZSxPQUFULENBQWlCLENBQWpCLEVBQW9CTixJQWhCbkI7TUFpQm5CTyxrQkFBa0IsRUFBRWhCLFFBQVEsQ0FBQ2UsT0FBVCxDQUFpQixDQUFqQixFQUFvQkUsV0FqQnJCO01Ba0JuQkMsVUFBVSxFQUFFbEIsUUFBUSxDQUFDbUIsSUFBVCxDQUFjQyxHQWxCUDtNQW1CbkJDLGFBQWEsRUFBRXhDLFdBQVcsQ0FBQ21CLFFBQVEsQ0FBQ21CLElBQVQsQ0FBY0MsR0FBZixDQW5CUDtNQW9CbkJJLFNBQVMsRUFBRXhCLFFBQVEsQ0FBQ21CLElBQVQsQ0FBY00sS0FwQk47TUFxQm5CSCxRQUFRLEVBQUV0QixRQUFRLENBQUNtQixJQUFULENBQWNJO0lBckJMLENBQXZCO0lBdUJBTSxRQUFRLENBQUNwSCxHQUFULDhDQUFtRHVGLFFBQVEsQ0FBQ2UsT0FBVCxDQUFpQixDQUFqQixFQUFvQjJCLElBQXZFO0lBQ0FsRyxPQUFPLENBQUNDLEdBQVIsQ0FBWXFGLGNBQVo7SUFDQSxPQUFPQSxjQUFQO0VBQ0gsQ0FyQ0wsRUFzQ0tKLEtBdENMLENBc0NZQyxHQUFELElBQVM7SUFDWm5GLE9BQU8sQ0FBQ0MsR0FBUixDQUFZa0YsR0FBWjtJQUNBakQscUJBQXFCLENBQUN4QixTQUF0QixHQUFrQyxnQkFBbEM7RUFDSCxDQXpDTDtBQTBDSCxDQWhERDs7QUFrREEsTUFBTTBCLGFBQWEsR0FBSWhDLEtBQUQsSUFBVztFQUM3QmdGLG1CQUFtQixDQUFDaEYsS0FBRCxDQUFuQjtFQUNBK0MsbUJBQW1CLENBQUMvQyxLQUFELENBQW5CO0FBQ0gsQ0FIRCxFQUtBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDL1pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBS0E7QUFDQTs7QUFFQSxNQUFNaUcsWUFBWSxHQUFHLE1BQU07RUFDdkIsTUFBTUMsTUFBTSxHQUFHM0ksUUFBUSxDQUFDSyxhQUFULENBQXVCLFFBQXZCLENBQWYsQ0FEdUIsQ0FHdkI7O0VBQ0EsTUFBTXVJLElBQUksR0FBRzVJLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFiO0VBQ0F1SSxJQUFJLENBQUN0SSxHQUFMLEdBQVdtSSxpREFBWDtFQUNBRyxJQUFJLENBQUN4SCxNQUFMLEdBQWMsUUFBZDtFQUNBd0gsSUFBSSxDQUFDckksWUFBTCxDQUFrQixPQUFsQixFQUEyQixNQUEzQjtFQUNBb0ksTUFBTSxDQUFDbkksV0FBUCxDQUFtQm9JLElBQW5CLEVBUnVCLENBVXZCOztFQUNBLE1BQU1DLEtBQUssR0FBRzdJLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixJQUF2QixDQUFkO0VBQ0F3SSxLQUFLLENBQUNySCxXQUFOLEdBQW9CLGNBQXBCO0VBQ0FtSCxNQUFNLENBQUNuSSxXQUFQLENBQW1CcUksS0FBbkI7RUFFQSxPQUFPRixNQUFQO0FBQ0gsQ0FoQkQ7O0FBa0JBLE1BQU1HLFVBQVUsR0FBRyxNQUFNO0VBQ3JCLE1BQU1DLElBQUksR0FBRy9JLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFiO0VBQ0EwSSxJQUFJLENBQUN4SSxZQUFMLENBQWtCLE9BQWxCLEVBQTJCLE1BQTNCLEVBRnFCLENBSXJCOztFQUNBLE1BQU15SSxlQUFlLEdBQUdoSixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBeEI7RUFDQTJJLGVBQWUsQ0FBQ3pJLFlBQWhCLENBQTZCLE9BQTdCLEVBQXNDLGlCQUF0QztFQUNBeUksZUFBZSxDQUFDeEgsV0FBaEIsR0FBOEIsV0FBOUIsQ0FQcUIsQ0FTckI7O0VBQ0EsTUFBTVosU0FBUyxHQUFHWixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBbEI7RUFDQU8sU0FBUyxDQUFDTCxZQUFWLENBQXVCLE9BQXZCLEVBQWdDLFdBQWhDO0VBQ0FLLFNBQVMsQ0FBQ0wsWUFBVixDQUF1QixJQUF2QixFQUE2QixXQUE3QixFQVpxQixDQWNyQjtFQUVBOztFQUNBLE1BQU0wSSxvQkFBb0IsR0FBR2pKLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixJQUF2QixDQUE3QjtFQUNBNEksb0JBQW9CLENBQUMxSSxZQUFyQixDQUFrQyxPQUFsQyxFQUEyQyxXQUEzQyxFQWxCcUIsQ0FvQnJCOztFQUNBLE1BQU0ySSxXQUFXLEdBQUdsSixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBcEI7RUFDQTZJLFdBQVcsQ0FBQzNJLFlBQVosQ0FBeUIsT0FBekIsRUFBa0MsZ0JBQWxDO0VBQ0E2RCxvRUFBa0IsQ0FBQzhFLFdBQUQsQ0FBbEI7RUFDQSxNQUFNQyxlQUFlLEdBQUduSixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBeEI7RUFDQThJLGVBQWUsQ0FBQ3BHLFNBQWhCLEdBQTRCLGNBQTVCO0VBQ0FtRyxXQUFXLENBQUMxSSxXQUFaLENBQXdCMkksZUFBeEI7RUFDQUYsb0JBQW9CLENBQUN6SSxXQUFyQixDQUFpQzBJLFdBQWpDLEVBM0JxQixDQTZCckI7O0VBQ0EsTUFBTUUsZUFBZSxHQUFHcEosUUFBUSxDQUFDSyxhQUFULENBQXVCLE1BQXZCLENBQXhCO0VBQ0ErSSxlQUFlLENBQUM3SSxZQUFoQixDQUE2QixPQUE3QixFQUFzQyxpQkFBdEM7RUFDQTZJLGVBQWUsQ0FBQzdJLFlBQWhCLENBQTZCLElBQTdCLEVBQW1DLFFBQW5DO0VBQ0E2SSxlQUFlLENBQUNDLE1BQWhCLEdBQXlCLEtBQXpCO0VBQ0E3Riw0REFBVSxDQUFDNEYsZUFBRCxDQUFWO0VBQ0FILG9CQUFvQixDQUFDekksV0FBckIsQ0FBaUM0SSxlQUFqQztFQUVBTCxJQUFJLENBQUN2SSxXQUFMLENBQWlCd0ksZUFBakI7RUFDQUQsSUFBSSxDQUFDdkksV0FBTCxDQUFpQkksU0FBakI7RUFDQW1JLElBQUksQ0FBQ3ZJLFdBQUwsQ0FBaUJ5SSxvQkFBakI7RUFFQSxPQUFPRixJQUFQO0FBQ0gsQ0ExQ0Q7O0FBNENBLE1BQU1PLGdCQUFnQixHQUFHLE1BQU07RUFDM0I7RUFDQSxNQUFNQyxvQkFBb0IsR0FBR3ZKLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUE3QjtFQUNBa0osb0JBQW9CLENBQUN4SSxTQUFyQixDQUErQkMsR0FBL0IsQ0FBbUMsc0JBQW5DLEVBQTJELFNBQTNELEVBSDJCLENBSTNCO0VBRUE7O0VBQ0EsTUFBTXdJLFFBQVEsR0FBR3hKLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixJQUF2QixDQUFqQjtFQUNBbUosUUFBUSxDQUFDekksU0FBVCxDQUFtQkMsR0FBbkIsQ0FBdUIsY0FBdkI7RUFDQXdJLFFBQVEsQ0FBQ3pHLFNBQVQsR0FBcUIsY0FBckIsQ0FUMkIsQ0FXM0I7RUFDQTtFQUNBO0VBRUE7O0VBQ0EsTUFBTTJFLFFBQVEsR0FBRzFILFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFqQjtFQUNBcUgsUUFBUSxDQUFDM0csU0FBVCxDQUFtQkMsR0FBbkIsQ0FBdUIsVUFBdkIsRUFqQjJCLENBbUIzQjs7RUFDQXVJLG9CQUFvQixDQUFDL0ksV0FBckIsQ0FBaUNnSixRQUFqQyxFQXBCMkIsQ0FxQjNCOztFQUVBRCxvQkFBb0IsQ0FBQy9JLFdBQXJCLENBQWlDa0gsUUFBakMsRUF2QjJCLENBd0IzQjtFQUNBOztFQUVBLE9BQU82QixvQkFBUDtBQUNILENBNUJEOztBQThCQSxNQUFNRSxhQUFhLEdBQUcsTUFBTTtFQUN4QjtFQUNBLE1BQU1DLE9BQU8sR0FBRzFKLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFoQjtFQUNBcUosT0FBTyxDQUFDM0ksU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0IsU0FBdEIsRUFId0IsQ0FLeEI7O0VBQ0EwSSxPQUFPLENBQUNsSixXQUFSLENBQW9COEksZ0JBQWdCLEVBQXBDO0VBRUEsT0FBT0ksT0FBUDtBQUNILENBVEQ7O0FBV0EsTUFBTUMsWUFBWSxHQUFHLE1BQU07RUFDdkIsTUFBTUMsTUFBTSxHQUFHNUosUUFBUSxDQUFDSyxhQUFULENBQXVCLFFBQXZCLENBQWY7RUFFQSxNQUFNd0osU0FBUyxHQUFHN0osUUFBUSxDQUFDSyxhQUFULENBQXVCLEdBQXZCLENBQWxCO0VBQ0F3SixTQUFTLENBQUNySSxXQUFWLDRCQUF1QyxJQUFJdUQsSUFBSixHQUFXK0UsV0FBWCxFQUF2QztFQUVBLE1BQU1DLFVBQVUsR0FBRy9KLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixHQUF2QixDQUFuQjtFQUNBMEosVUFBVSxDQUFDQyxJQUFYLEdBQWtCLGdDQUFsQjtFQUNBRCxVQUFVLENBQUMzSSxNQUFYLEdBQW9CLFFBQXBCO0VBRUEsTUFBTTZJLGFBQWEsR0FBR2pLLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUF0QjtFQUNBNEosYUFBYSxDQUFDM0osR0FBZCxHQUFvQmtJLDBEQUFwQjtFQUNBeUIsYUFBYSxDQUFDMUosWUFBZCxDQUEyQixPQUEzQixFQUFvQyxRQUFwQztFQUVBd0osVUFBVSxDQUFDdkosV0FBWCxDQUF1QnlKLGFBQXZCO0VBQ0FMLE1BQU0sQ0FBQ3BKLFdBQVAsQ0FBbUJxSixTQUFuQjtFQUNBRCxNQUFNLENBQUNwSixXQUFQLENBQW1CdUosVUFBbkI7RUFFQSxPQUFPSCxNQUFQO0FBQ0gsQ0FuQkQ7O0FBcUJlLFNBQVNNLFVBQVQsR0FBc0I7RUFDakNsSyxRQUFRLENBQUNtSyxJQUFULENBQWMzSixXQUFkLENBQTBCa0ksWUFBWSxFQUF0QztFQUNBMUksUUFBUSxDQUFDbUssSUFBVCxDQUFjM0osV0FBZCxDQUEwQnNJLFVBQVUsRUFBcEM7RUFDQTlJLFFBQVEsQ0FBQ21LLElBQVQsQ0FBYzNKLFdBQWQsQ0FBMEJpSixhQUFhLEVBQXZDO0VBQ0F6SixRQUFRLENBQUNtSyxJQUFULENBQWMzSixXQUFkLENBQTBCbUosWUFBWSxFQUF0QztBQUNILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZGl0aW9uSWNvbiBmcm9tICcuL2Fzc2V0cy9wbHVzLnN2Zydcbi8vIGltcG9ydCBBUElDaXR5U2VhcmNoIGZyb20gJy4vd2VhdGhlckFQSSdcbmltcG9ydCBkZWxldGVJY29uIGZyb20gJy4vYXNzZXRzL2RlbGV0ZS5zdmcnXG5pbXBvcnQgbWVudUljb24gZnJvbSAnLi9hc3NldHMvbWVudUljb24uc3ZnJ1xuXG5kb2N1bWVudC5jb29raWUgPSAnU2FtZVNpdGU9TGF4J1xuXG5jb25zdCBjcmVhdGVNZW51SWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrbGlzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGNoZWNrbGlzdEljb24uc3JjID0gbWVudUljb25cbiAgICBjaGVja2xpc3RJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tsaXN0SWNvbilcbn1cblxuLy8gQWRkIHNpbmdsZSBsb2NhdGlvbiB0byB3YXRjaGxpc3QgKGNhbGxlZCBiZWxvdylcbmNvbnN0IGNyZWF0ZUxpc3RpbmcgPSAobG9jYXRpb25OYW1lLCBpKSA9PiB7XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKGBsb2NhdGlvbmApXG4gICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICAvLyBhc3NpZ24gY2xhc3MgdG8gc2VsZWN0ZWQgbG9jYXRpb24gbGlzdGluZ1xuICAgIGlmIChsb2NhdGlvbk5hbWUuc2VsZWN0ZWQgPT09ICd0cnVlJykge1xuICAgICAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgfVxuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXIgdG8gZGlzcGxheSBzZWxlY3RlZCBsb2NhdGlvbidzIHdlYXRoZXJcbiAgICBsb2NhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIGlmIGRlbGV0aW5nIGxpc3RpbmcsIGRvIG5vdCBkaXNwbGF5IHdlYXRoZXJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlSXRlbScpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RMb2NhdGlvbihsb2NhdGlvbilcbiAgICB9KVxuXG4gICAgY3JlYXRlTWVudUljb24obG9jYXRpb24pXG4gICAgY29uc3QgbG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgbG9jYXRpb25UZXh0LnRleHRDb250ZW50ID0gbG9jYXRpb25OYW1lLm5hbWVcbiAgICBsb2NhdGlvbi5hcHBlbmRDaGlsZChsb2NhdGlvblRleHQpXG4gICAgY3JlYXRlRGVsZXRlSWNvbihsb2NhdGlvbiwgaSlcbiAgICB3YXRjaGxpc3QuYXBwZW5kQ2hpbGQobG9jYXRpb24pXG59XG5cbi8vIERpc3BsYXkgZW50aXJlIGFycmF5IG9mIGxvY2F0aW9ucyB0byB3YXRjaGxpc3RcbmNvbnN0IGRpc3BsYXlXYXRjaGxpc3QgPSAoKSA9PiB7XG4gICAgLy8gR3JhYiB3YXRjaGxpc3RcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2F0Y2hsaXN0JylcblxuICAgIC8vIENsZWFyIGxvY2F0aW9uIGxpc3RpbmdzXG4gICAgY29uc3Qgb2xkTGlzdGluZ0NvdW50ID0gd2F0Y2hsaXN0LmNoaWxkRWxlbWVudENvdW50XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRMaXN0aW5nQ291bnQ7IGkrKykge1xuICAgICAgICB3YXRjaGxpc3QuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgIH1cblxuICAgIC8vIEFwcGVuZCBhbGwgbG9jYXRpb25zIHRvIHdhdGNobGlzdFxuICAgIGxldCBpID0gMFxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuICAgIGNvbnNvbGUubG9nKHN0b3JhZ2VXYXRjaGxpc3QpXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhsb2NhdGlvbi5uYW1lKVxuICAgICAgICBjcmVhdGVMaXN0aW5nKGxvY2F0aW9uLCBpKVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgaSsrXG4gICAgfSlcbn1cblxuY29uc3Qgc3VibWl0TG9jYXRpb24gPSAoaW5wdXQpID0+IHtcbiAgICAvLyBjcmVhdGUgbG9jYXRpb24gb2JqZWN0XG4gICAgY29uc3QgbmV3TG9jYXRpb24gPSB7XG4gICAgICAgIG5hbWU6IGlucHV0LFxuICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICB9XG5cbiAgICAvLyBncmFiIGFycmF5IGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gZGVzZWxlY3QgcHJldmlvdXNseSBzZWxlY3RlZCBsb2NhdGlvblxuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gcHVzaCBsb2NhdGlvbiB0byBhcnJheVxuICAgIHN0b3JhZ2VXYXRjaGxpc3QucHVzaChuZXdMb2NhdGlvbilcbiAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlV2F0Y2hsaXN0KVxuXG4gICAgLy8gc2V0IGFycmF5IGJhY2sgaW50byBzdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIHJlZnJlc2ggd2F0Y2hsaXN0XG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IHNlbGVjdExvY2F0aW9uID0gKGxpKSA9PiB7XG4gICAgLy8gc2V0IGNvbnRlbnQgdGl0bGUgKGZpbHRlcilcbiAgICBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJylcbiAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSBsaS5pbm5lclRleHRcblxuICAgIC8vIGdyYWIgbG9jYXRpb25zIGFycmF5IGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gZGVzZWxlY3QgYWxsIGxvY2F0aW9uc1xuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlbGVjdGVkID0gJ2ZhbHNlJ1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIFNlbGVjdCBsb2NhdGlvbiBpZiBvbmUgaXMgY2hvc2VuIChtYWluIG1lbnUgc2VsZWN0aW9uIGlzIGhhbmRsZWQgaW4gZXZlbnQgbGlzdGVuZXIpXG4gICAgaWYgKGxpLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSA9PT0gJ2xvY2F0aW9uJykge1xuICAgICAgICBjb25zdCBzZWxlY3RlZExvY2F0aW9uSWQgPSBsaS5nZXRBdHRyaWJ1dGUoJ2lkJylcbiAgICAgICAgc3RvcmFnZVdhdGNobGlzdFtzZWxlY3RlZExvY2F0aW9uSWRdLnNlbGVjdGVkID0gJ3RydWUnXG4gICAgfVxuXG4gICAgLy8gc2V0IGxvY2F0aW9ucyBhcnJheSBiYWNrIGludG8gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIHJlZnJlc2hcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlQWRkQnV0dG9uID0gKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoJ2FkZEJ0bicpXG4gICAgYWRkQnRuLmlubmVyVGV4dCA9ICdzZWFyY2gnXG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHZhbGlkYXRlU2VhcmNoKGUpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRCdG4pXG59XG5cbmNvbnN0IGNyZWF0ZUNhbmNlbEJ1dHRvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdjYW5jZWxCdG4nKVxuICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuICAgIGNhbmNlbEJ0bi5pbm5lclRleHQgPSAnY2FuY2VsJ1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pXG59XG5cbi8vIGNyZWF0ZUZvcm1cbmNvbnN0IGNyZWF0ZUZvcm0gPSAoZm9ybSkgPT4ge1xuICAgIC8vIHJvdyBvbmU6IGFzc2lnbiBpbnB1dFxuICAgIGNvbnN0IGZvcm1Sb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93MS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgbmV3TG9jYXRpb25JbnB1dC5jbGFzc0xpc3QuYWRkKCduZXdMb2NhdGlvbklucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LnBsYWNlaG9sZGVyID0gJ0Zsb3JlbmNlJ1xuICAgIG5ld0xvY2F0aW9uSW5wdXQubmFtZSA9ICduZXdMb2NhdGlvbklucHV0J1xuICAgIGZvcm1Sb3cxLmFwcGVuZENoaWxkKG5ld0xvY2F0aW9uSW5wdXQpXG5cbiAgICAvLyByb3cgdHdvOiBzdWJtaXQgYW5kIGNhbmNlbCBidXR0b25zXG4gICAgY29uc3QgZm9ybVJvdzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdpZCcsICdmb3JtQnV0dG9ucycpXG4gICAgY3JlYXRlQWRkQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuICAgIGNyZWF0ZUNhbmNlbEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcblxuICAgIC8vIHJvdyB0aHJlZTogYXNzaWduIGVycm9yIGNsYXNzIGFuZCB0ZXh0XG4gICAgY29uc3QgZm9ybVJvdzMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIC8vIGZvcm1Sb3czLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBmb3JtUm93My5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ25ld1Byb2pFcnJvckNvbnRhaW5lcicpXG4gICAgLy8gZm9ybVJvdzMuaW5uZXJUZXh0ID0gJ1doaWNoIGNpdHk/J1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MSlcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cyKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzMpXG59XG5cbi8vIERlbGV0ZSB3YXRjaGxpc3QgZW50cnlcbmNvbnN0IGRlbGV0ZVdhdGNobGlzdEVudHJ5ID0gKGUpID0+IHtcbiAgICAvLyBncmFiIGFycmF5cyBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIElkZW50aWZ5IGVudHJ5IHRvIGRlbGV0ZVxuICAgIGNvbnN0IGRvb21lZEluZGV4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgLy8gY29uc3QgZG9vbWVkTmFtZSA9IHN0b3JhZ2VXYXRjaGxpc3RbZG9vbWVkSW5kZXhdLm5hbWU7XG5cbiAgICAvLyBkZWxldGUgZW50cnlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnNwbGljZShkb29tZWRJbmRleCwgMSlcblxuICAgIC8vIHNldCBjaGFuZ2VzIHRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyBJZiBkb29tZWQgZW50cnkgd2FzIHNlbGVjdGVkLCBjbGVhciBjb250ZW50IGRpc3BsYXlcbiAgICAvLyBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJyk7XG4gICAgLy8gY29uc3QgYWxsVGFza3NDbGFzc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsVGFza3MnKS5jbGFzc0xpc3RcbiAgICAvLyBpZiAoY29udGVudFRpdGxlLnRleHRDb250ZW50ID09PSBkb29tZWROYW1lKSB7XG4gICAgLy8gICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9ICdBbGwgdGFza3MnXG4gICAgLy8gICAgIGFsbFRhc2tzQ2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIC8vIH1cblxuICAgIC8vIHJlZnJlc2ggd2F0Y2hpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlRGVsZXRlSWNvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICAvLyBjcmVhdGUgaW1hZ2UgYW5kIGFzc2lnbiBhdHRyaWJ1dGVzXG4gICAgY29uc3QgbmV3RGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3RGVsZXRlSWNvbi5zcmMgPSBkZWxldGVJY29uXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24gZGVsZXRlSXRlbScpXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuXG4gICAgLy8gQUREIEVWRU5UIExJU1RFTkVSXG4gICAgaWYgKFxuICAgICAgICBjb250YWluZXIuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAnbG9jYXRpb24nIHx8XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2xvY2F0aW9uJylcbiAgICApIHtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXIgdG8gZGVsZXRlIGxvY2F0aW9uXG4gICAgICAgIG5ld0RlbGV0ZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeWAsXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YCxcbiAgICAgICAgICAgIGBoaWRkZW5gXG4gICAgICAgIClcbiAgICAgICAgbmV3RGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PlxuICAgICAgICAgICAgZGVsZXRlV2F0Y2hsaXN0RW50cnkoZSwgaSlcbiAgICAgICAgKVxuICAgICAgICAvLyBkaXNwbGF5IHRyYXNoIGljb24gb24gaG92ZXJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGhpZGUgdHJhc2ggaWNvblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBzdHJhbmdlJylcbiAgICB9XG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdEZWxldGVJY29uKVxufVxuXG5jb25zdCBjcmVhdGVBZGRpdGlvbkljb24gPSAobGkpID0+IHtcbiAgICBjb25zdCBuZXdBZGRpdGlvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0FkZGl0aW9uSWNvbi5zcmMgPSBhZGRpdGlvbkljb25cbiAgICBuZXdBZGRpdGlvbkljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChuZXdBZGRpdGlvbkljb24pXG59XG5cbmNvbnN0IHZhbGlkYXRlU2VhcmNoID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAvLyBncmFiIGRvbSBlbGVtZW50c1xuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3TG9jYXRpb25JbnB1dCcpXG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuICAgIC8vIHJlc2V0IGVycm9yXG4gICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICcnXG4gICAgLy8gY2hlY2sgZm9yIHNlYXJjaCB0ZXJtXG4gICAgaWYgKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nXG4gICAgfSBlbHNlIHtcbiAgICAgICAgQVBJQ2l0eVNlYXJjaChuZXdMb2NhdGlvbklucHV0LnZhbHVlKVxuICAgIH1cbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gT3BlbndlYXRoZXIgQVBJIEZ1bmN0aW9uc1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiB0b0RpcmVjdGlvbihkZWdyZWUpIHtcbiAgICBpZiAoZGVncmVlID4gMzM3LjUpIHJldHVybiAnTm9ydGgnXG4gICAgaWYgKGRlZ3JlZSA+IDI5Mi41KSByZXR1cm4gJ05vcnRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDI0Ny41KSByZXR1cm4gJ1dlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIwMi41KSByZXR1cm4gJ1NvdXRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDE1Ny41KSByZXR1cm4gJ1NvdXRoJ1xuICAgIGlmIChkZWdyZWUgPiAxMjIuNSkgcmV0dXJuICdTb3V0aCBFYXN0J1xuICAgIGlmIChkZWdyZWUgPiA2Ny41KSByZXR1cm4gJ0Vhc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIyLjUpIHJldHVybiAnTm9ydGggRWFzdCdcbiAgICByZXR1cm4gJ05vcnRoJ1xufVxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MjM3NjExNS9ob3ctdG8tb2J0YWluLW9wZW4td2VhdGhlci1hcGktZGF0ZS10aW1lLWZyb20tY2l0eS1iZWluZy1mZXRjaGVkXG5jb25zdCBjYWxjQ3VycmVudFRpbWUgPSAodGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsVGltZSA9IGQuZ2V0VGltZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IGxvY2FsVGltZSArIGxvY2FsT2Zmc2V0XG4gICAgY29uc3QgbmV3Q2l0eSA9IHV0YyArIDEwMDAgKiB0aW1lem9uZVxuICAgIHJldHVybiBuZXcgRGF0ZShuZXdDaXR5KVxufVxuXG5jb25zdCBjYWxjU3VuVGltZSA9ICh0aW1lLCB0aW1lem9uZSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IHRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuLy8gY29uc3QgZmV0Y2hEYWlseUZvcmVjYXN0ID0gKGxhdCwgbG9uKSA9PiB7XG4vLyAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdQcm9qRXJyb3JDb250YWluZXInKTtcbi8vICAgY29uc29sZS5sb2cobGF0KTtcbi8vICAgY29uc29sZS5sb2cobG9uKTtcbi8vICAgLy8gZmV0Y2ggc2V2ZW4gZGF5IGZvcmVjYXN0XG4vLyAgIGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mZXhjbHVkZT1taW51dGVseSxob3VybHksYWxlcnRzJnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCwgeyBtb2RlOiAnY29ycycgfSlcbi8vICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbi8vICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCc7XG4vLyAgICAgfSk7XG4vLyB9O1xuXG5jb25zdCBmZXRjaEhvdXJseUZvcmVjYXN0ID0gKGNpdHlRdWVyeSkgPT4ge1xuICAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcubmV3UHJvakVycm9yQ29udGFpbmVyJ1xuICAgIClcbiAgICAvLyBmZXRjaCBmaXZlIGRheS90aHJlZSBob3VyIGZvcmVjYXN0XG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0QXJyYXkgPSBbXVxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyAuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7cmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmljb259LnBuZ2BcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUocmVzcG9uc2UubGlzdFtpXS5kdF90eHQpLFxuICAgICAgICAgICAgICAgICAgICBkYXRlVGV4dDogcmVzcG9uc2UubGlzdFtpXS5kdF90eHQsXG4gICAgICAgICAgICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5saXN0W2ldLm1haW4uaHVtaWRpdHksXG4gICAgICAgICAgICAgICAgICAgIHJhaW5DaGFuY2U6IHJlc3BvbnNlLmxpc3RbaV0ucG9wICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZTogcmVzcG9uc2UubGlzdFtpXS5tYWluLnRlbXAsXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS5saXN0W2ldLndpbmQuZ3VzdCxcbiAgICAgICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS5saXN0W2ldLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXkucHVzaChuZXdIb3VybHlGb3JlY2FzdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0hvdXJseUZvcmVjYXN0QXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gbmV3SG91cmx5Rm9yZWNhc3RBcnJheVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgZmV0Y2hDdXJyZW50V2VhdGhlciA9IChjaXR5UXVlcnkpID0+IHtcbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuXG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgLy8gY29uc3Qge2xhdH0gPSByZXNwb25zZS5jb29yZDtcbiAgICAgICAgICAgIC8vIGNvbnN0IHtsb259ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAgICAgICAvLyBmZXRjaERhaWx5Rm9yZWNhc3QobGF0LCBsb24pO1xuICAgICAgICAgICAgc3VibWl0TG9jYXRpb24ocmVzcG9uc2UubmFtZSlcbiAgICAgICAgICAgIGNvbnN0IG5ld1dlYXRoZXJDYXJkID0ge1xuICAgICAgICAgICAgICAgIGNpdHk6IHJlc3BvbnNlLm5hbWUsXG4gICAgICAgICAgICAgICAgY291bnRyeTogcmVzcG9uc2Uuc3lzLmNvdW50cnksXG4gICAgICAgICAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLm1haW4uaHVtaWRpdHksXG4gICAgICAgICAgICAgICAgbG9jYWxEYXRlOiBjYWxjQ3VycmVudFRpbWUocmVzcG9uc2UudGltZXpvbmUpLFxuICAgICAgICAgICAgICAgIHN1bnJpc2U6IGNhbGNTdW5UaW1lKFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zeXMuc3VucmlzZSAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnRpbWV6b25lXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBzdW5zZXQ6IGNhbGNTdW5UaW1lKFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zeXMuc3Vuc2V0ICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRlbXBDdXJyZW50OiByZXNwb25zZS5tYWluLnRlbXAsXG4gICAgICAgICAgICAgICAgdGVtcEhpZ2g6IHJlc3BvbnNlLm1haW4udGVtcF9tYXgsXG4gICAgICAgICAgICAgICAgdGVtcExvdzogcmVzcG9uc2UubWFpbi50ZW1wX21pbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLndpbmQuZGVnLFxuICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLndpbmQuZGVnKSxcbiAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLndpbmQuZ3VzdCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYFxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3V2VhdGhlckNhcmQpXG4gICAgICAgICAgICByZXR1cm4gbmV3V2VhdGhlckNhcmRcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IEFQSUNpdHlTZWFyY2ggPSAoaW5wdXQpID0+IHtcbiAgICBmZXRjaEN1cnJlbnRXZWF0aGVyKGlucHV0KVxuICAgIGZldGNoSG91cmx5Rm9yZWNhc3QoaW5wdXQpXG59XG5cbi8vIFBsYWNlaG9sZGVyIENvbnRlbnRcbi8vIEFQSUNpdHlTZWFyY2goJ0Zsb3JlbmNlJylcblxuZXhwb3J0IHtcbiAgICBjcmVhdGVBZGRpdGlvbkljb24sXG4gICAgY3JlYXRlRGVsZXRlSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIGNyZWF0ZU1lbnVJY29uLFxuICAgIGRpc3BsYXlXYXRjaGxpc3QsXG4gICAgc3VibWl0TG9jYXRpb24sXG4gICAgdmFsaWRhdGVTZWFyY2gsXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQge1xuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QsXG59IGZyb20gJy4vaGVscGVyRnVuY3Rpb25zJ1xuaW1wb3J0IGdpdGh1Ykljb24gZnJvbSAnLi9hc3NldHMvR2l0SHViLWxpZ2h0LTMycHgucG5nJ1xuaW1wb3J0IGxvZ29JY29uIGZyb20gJy4vYXNzZXRzL2xvZ29JY29uLnN2ZydcblxuY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpXG5cbiAgICAvLyBkaXNwbGF5IGxvZ29cbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBsb2dvLnNyYyA9IGxvZ29JY29uXG4gICAgbG9nby50YXJnZXQgPSAnX2JsYW5rJ1xuICAgIGxvZ28uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsb2dvJylcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbylcblxuICAgIC8vIGRpc3BsYXkgdGl0bGVcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdXZWF0aGVyc2VydmUnXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKVxuXG4gICAgcmV0dXJuIGhlYWRlclxufVxuXG5jb25zdCBjcmVhdGVNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1lbnUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtZW51JylcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgaGVhZGVyXG4gICAgY29uc3Qgd2F0Y2hsaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0SGVhZGVyJylcbiAgICB3YXRjaGxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSAnV2F0Y2hsaXN0J1xuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBtZW51XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QoKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGFkZExvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBidXR0b25cbiAgICBjb25zdCBhZGRMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBhZGRMb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uQnRuJylcbiAgICBjcmVhdGVBZGRpdGlvbkljb24oYWRkTG9jYXRpb24pXG4gICAgY29uc3QgYWRkTG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgYWRkTG9jYXRpb25UZXh0LmlubmVyVGV4dCA9ICdBZGQgTG9jYXRpb24nXG4gICAgYWRkTG9jYXRpb24uYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25UZXh0KVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uKVxuXG4gICAgLy8gR2VuZXJhdGUgYW5kIGhpZGUgbmV3IGxvY2F0aW9uIGZvcm1cbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkZvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLm1ldGhvZCA9ICdnZXQnXG4gICAgY3JlYXRlRm9ybShhZGRMb2NhdGlvbkZvcm0pXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Gb3JtKVxuXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3RIZWFkZXIpXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3QpXG4gICAgbWVudS5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkNvbnRhaW5lcilcblxuICAgIHJldHVybiBtZW51XG59XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJBUEkgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICAgIGNvbnN0IFdlYXRoZXJBUElDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50JylcbiAgICAvLyBXZWF0aGVyQVBJQ29udGFpbnRlci5pZCA9ICcnO1xuXG4gICAgLy8gY3JlYXRlIEFQSSB0aXRsZVxuICAgIGNvbnN0IEFQSVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKVxuICAgIEFQSVRpdGxlLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnRUaXRsZScpXG4gICAgQVBJVGl0bGUuaW5uZXJUZXh0ID0gJ1dlYXRoZXJzZXJ2ZSdcblxuICAgIC8vIGNyZWF0ZSBBUEkgaW1hZ2UgY29udGFpbmVyXG4gICAgLy8gY29uc3QgQVBJSW1hZ2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyBBUElJbWFnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZUNvbnRhaW5lcicpO1xuXG4gICAgLy8gY3JlYXRlIEFQSSBpbWdcbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgQVBJSW1hZ2UuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2UnKVxuXG4gICAgLy8gQXBwZW5kXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJVGl0bGUpXG4gICAgLy8gQVBJSW1hZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpO1xuXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpXG4gICAgLy8gV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2VDb250YWluZXIpO1xuICAgIC8vIGNvbnRhaW5lci5hcHBlbmRDaGlsZChXZWF0aGVyQVBJQ29udGFpbnRlcik7XG5cbiAgICByZXR1cm4gV2VhdGhlckFQSUNvbnRhaW50ZXJcbn1cblxuY29uc3QgY3JlYXRlQ29udGVudCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgY29udGVudCBjb250YWluZXJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQnKVxuXG4gICAgLy8gY3JlYXRlIHdlYXRoZXIgYXBwXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQVBJKCkpXG5cbiAgICByZXR1cm4gY29udGVudFxufVxuXG5jb25zdCBjcmVhdGVGb290ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJylcblxuICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGNvcHlyaWdodC50ZXh0Q29udGVudCA9IGBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IGpjYW1wYmVsbDU3YFxuXG4gICAgY29uc3QgZ2l0aHViTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGdpdGh1YkxpbmsuaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vamNhbXBiZWxsNTcnXG4gICAgZ2l0aHViTGluay50YXJnZXQgPSAnX2JsYW5rJ1xuXG4gICAgY29uc3QgbmV3R2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3R2l0aHViSWNvbi5zcmMgPSBnaXRodWJJY29uXG4gICAgbmV3R2l0aHViSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2dpdGh1YicpXG5cbiAgICBnaXRodWJMaW5rLmFwcGVuZENoaWxkKG5ld0dpdGh1Ykljb24pXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGNvcHlyaWdodClcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZ2l0aHViTGluaylcblxuICAgIHJldHVybiBmb290ZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUhlYWRlcigpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlTWVudSgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlQ29udGVudCgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRm9vdGVyKCkpXG59XG4iXSwibmFtZXMiOlsiYWRkaXRpb25JY29uIiwiZGVsZXRlSWNvbiIsIm1lbnVJY29uIiwiZG9jdW1lbnQiLCJjb29raWUiLCJjcmVhdGVNZW51SWNvbiIsImxpIiwiY2hlY2tsaXN0SWNvbiIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUxpc3RpbmciLCJsb2NhdGlvbk5hbWUiLCJpIiwid2F0Y2hsaXN0IiwicXVlcnlTZWxlY3RvciIsImxvY2F0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIiwic2VsZWN0ZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsImNvbnRhaW5zIiwic2VsZWN0TG9jYXRpb24iLCJsb2NhdGlvblRleHQiLCJ0ZXh0Q29udGVudCIsIm5hbWUiLCJjcmVhdGVEZWxldGVJY29uIiwiZGlzcGxheVdhdGNobGlzdCIsIm9sZExpc3RpbmdDb3VudCIsImNoaWxkRWxlbWVudENvdW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsInN0b3JhZ2VXYXRjaGxpc3QiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29uc29sZSIsImxvZyIsImZvckVhY2giLCJzdWJtaXRMb2NhdGlvbiIsImlucHV0IiwibmV3TG9jYXRpb24iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImNvbnRlbnRUaXRsZSIsImlubmVyVGV4dCIsImdldEF0dHJpYnV0ZSIsInNlbGVjdGVkTG9jYXRpb25JZCIsImNyZWF0ZUFkZEJ1dHRvbiIsImNvbnRhaW5lciIsImFkZEJ0biIsInZhbGlkYXRlU2VhcmNoIiwiY3JlYXRlQ2FuY2VsQnV0dG9uIiwiY2FuY2VsQnRuIiwiY3JlYXRlRm9ybSIsImZvcm0iLCJmb3JtUm93MSIsIm5ld0xvY2F0aW9uSW5wdXQiLCJwbGFjZWhvbGRlciIsImZvcm1Sb3cyIiwiZm9ybVJvdzMiLCJkZWxldGVXYXRjaGxpc3RFbnRyeSIsImRvb21lZEluZGV4Iiwic3BsaWNlIiwibmV3RGVsZXRlSWNvbiIsInRyYXNoSWNvbiIsImNyZWF0ZUFkZGl0aW9uSWNvbiIsIm5ld0FkZGl0aW9uSWNvbiIsInByZXZlbnREZWZhdWx0IiwibmV3UHJvakVycm9yQ29udGFpbmVyIiwidmFsdWUiLCJBUElDaXR5U2VhcmNoIiwidG9EaXJlY3Rpb24iLCJkZWdyZWUiLCJjYWxjQ3VycmVudFRpbWUiLCJ0aW1lem9uZSIsImQiLCJEYXRlIiwibG9jYWxUaW1lIiwiZ2V0VGltZSIsImxvY2FsT2Zmc2V0IiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJ1dGMiLCJuZXdDaXR5IiwiY2FsY1N1blRpbWUiLCJ0aW1lIiwiZmV0Y2hIb3VybHlGb3JlY2FzdCIsImNpdHlRdWVyeSIsImZldGNoIiwibW9kZSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJuZXdIb3VybHlGb3JlY2FzdEFycmF5IiwibmV3SG91cmx5Rm9yZWNhc3QiLCJkYXRlIiwibGlzdCIsImR0X3R4dCIsImRhdGVUZXh0IiwiaHVtaWRpdHkiLCJtYWluIiwicmFpbkNoYW5jZSIsInBvcCIsInRlbXBlcmF0dXJlIiwidGVtcCIsIndlYXRoZXJDb25kaXRpb24iLCJ3ZWF0aGVyIiwid2VhdGhlckRlc2NyaXB0aW9uIiwiZGVzY3JpcHRpb24iLCJ3aW5kRGVncmVlIiwid2luZCIsImRlZyIsIndpbmREaXJlY3Rpb24iLCJ3aW5kR3VzdCIsImd1c3QiLCJ3aW5kU3BlZWQiLCJzcGVlZCIsImNhdGNoIiwiZXJyIiwiZmV0Y2hDdXJyZW50V2VhdGhlciIsIkFQSUltYWdlIiwibmV3V2VhdGhlckNhcmQiLCJjaXR5IiwiY291bnRyeSIsInN5cyIsImxvY2FsRGF0ZSIsInN1bnJpc2UiLCJzdW5zZXQiLCJ0ZW1wQ3VycmVudCIsInRlbXBIaWdoIiwidGVtcF9tYXgiLCJ0ZW1wTG93IiwidGVtcF9taW4iLCJpY29uIiwiZ2l0aHViSWNvbiIsImxvZ29JY29uIiwiY3JlYXRlSGVhZGVyIiwiaGVhZGVyIiwibG9nbyIsInRpdGxlIiwiY3JlYXRlTWVudSIsIm1lbnUiLCJ3YXRjaGxpc3RIZWFkZXIiLCJhZGRMb2NhdGlvbkNvbnRhaW5lciIsImFkZExvY2F0aW9uIiwiYWRkTG9jYXRpb25UZXh0IiwiYWRkTG9jYXRpb25Gb3JtIiwibWV0aG9kIiwiY3JlYXRlV2VhdGhlckFQSSIsIldlYXRoZXJBUElDb250YWludGVyIiwiQVBJVGl0bGUiLCJjcmVhdGVDb250ZW50IiwiY29udGVudCIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNvcHlyaWdodCIsImdldEZ1bGxZZWFyIiwiZ2l0aHViTGluayIsImhyZWYiLCJuZXdHaXRodWJJY29uIiwiaW5pdGlhbGl6ZSIsImJvZHkiXSwic291cmNlUm9vdCI6IiJ9