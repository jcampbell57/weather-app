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
/* harmony export */   "hideForm": () => (/* binding */ hideForm),
/* harmony export */   "showForm": () => (/* binding */ showForm),
/* harmony export */   "submitLocation": () => (/* binding */ submitLocation),
/* harmony export */   "validateSearch": () => (/* binding */ validateSearch)
/* harmony export */ });
/* harmony import */ var _assets_plus_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/plus.svg */ "./src/assets/plus.svg");
/* harmony import */ var _assets_delete_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/delete.svg */ "./src/assets/delete.svg");
/* harmony import */ var _assets_menuIcon_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/menuIcon.svg */ "./src/assets/menuIcon.svg");



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
    location.classList.add('selected'); // selectLocation(location)
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
  const storageWatchlist = JSON.parse(localStorage.getItem('storageWatchlist')); // console.log(storageWatchlist)

  storageWatchlist.forEach(location => {
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

const displayWeather = newWeatherCard => {
  // display content title
  const contentTitle = document.querySelector('.contentTitle');
  contentTitle.textContent = "".concat(newWeatherCard.city, ", ").concat(newWeatherCard.country); // display weather icon

  const APIImage = document.querySelector('.APIImage');
  APIImage.src = "http://openweathermap.org/img/wn/".concat(newWeatherCard.weatherIcon, "@2x.png"); // display description

  const weatherDescription = document.querySelector('.weatherDescription');
  weatherDescription.innerText = newWeatherCard.weatherDescription; // display current temperature

  const tempContainer = document.querySelector('.tempContainer');
  tempContainer.innerText = "".concat(Math.round(newWeatherCard.tempCurrent), "\xB0"); // display high/low temperatures

  const lowTempContainer = document.querySelector('.lowTempContainer');
  lowTempContainer.innerText = "Low: ".concat(Math.round(newWeatherCard.tempLow), "\xB0");
  const highTempContainer = document.querySelector('.highTempContainer');
  highTempContainer.innerText = "High: ".concat(Math.round(newWeatherCard.tempHigh), "\xB0"); // diplay current time

  const timeContainer = document.querySelector('.timeContainer');
  timeContainer.innerText = "Local time: ".concat(newWeatherCard.localDate.getHours(), ":").concat(newWeatherCard.localDate.getMinutes()); // display sunrise/sunset times

  const sunriseContainer = document.querySelector('.sunriseContainer');
  sunriseContainer.innerText = "Sunrise: ".concat(newWeatherCard.sunrise.getHours(), ":").concat(newWeatherCard.sunrise.getMinutes());
  const sunsetContainer = document.querySelector('.sunsetContainer');
  sunsetContainer.innerText = "Sunset: ".concat(newWeatherCard.sunset.getHours(), ":").concat(newWeatherCard.sunset.getMinutes()); // display wind

  const windContainer = document.querySelector('.windContainer');
  windContainer.innerText = "Wind: ".concat(Math.round(newWeatherCard.windSpeed), "mph, ").concat(newWeatherCard.windDirection, " (").concat(newWeatherCard.windDegree, "\xB0)"); // display humidity

  const humidityContainer = document.querySelector('.humidityContainer');
  humidityContainer.innerText = "Humidity: ".concat(newWeatherCard.humidity, "%");
};

const selectLocation = li => {
  // set content title
  // const contentTitle = document.querySelector('.contentTitle')
  // contentTitle.textContent = li.innerText
  // Fetch current weather
  APICitySearch(li.innerText); // grab locations array from storage

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
};

const showForm = () => {
  const addLocationBtn = document.querySelector('.addLocationBtn');
  const addLocationForm = document.querySelector('.addLocationForm');
  addLocationBtn.setAttribute('id', 'hidden');
  addLocationForm.setAttribute('id', 'showBlock');
};

const hideForm = () => {
  const addLocationBtn = document.querySelector('.addLocationBtn');
  const addLocationForm = document.querySelector('.addLocationForm');
  addLocationBtn.setAttribute('id', 'showBlock');
  addLocationForm.setAttribute('id', 'hidden');
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
  // const APIImage = document.querySelector('.APIImage')
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
      weatherIcon: response.weather[0].icon,
      windDegree: response.wind.deg,
      windDirection: toDirection(response.wind.deg),
      windSpeed: response.wind.speed,
      windGust: response.wind.gust
    }; // APIImage.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`

    console.log(newWeatherCard);
    displayWeather(newWeatherCard);
    return newWeatherCard;
  }).catch(err => {
    console.log(err);
    newProjErrorContainer.innerText = 'City not found';
  });
};

const APICitySearch = input => {
  fetchCurrentWeather(input);
  fetchHourlyForecast(input);
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
    hideForm();
    newLocationInput.value = '';
  }
};



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

const createWeatherCard = () => {
  // create Weather API container
  const WeatherAPIContainter = document.createElement('div');
  WeatherAPIContainter.classList.add('WeatherAPIContainter', 'content'); // create API title

  const APITitle = document.createElement('h3');
  APITitle.classList.add('contentTitle');
  APITitle.innerText = 'Weatherserve'; // create API img

  const APIImage = document.createElement('img');
  APIImage.classList.add('APIImage'); // create description container

  const descriptionContainer = document.createElement('span');
  descriptionContainer.classList.add('weatherDescription'); // create current temp container

  const tempContainer = document.createElement('span');
  tempContainer.classList.add('tempContainer'); // create high/low temp container

  const highLowContainer = document.createElement('div');
  highLowContainer.classList.add('highLowContainer');
  const lowTempContainer = document.createElement('span');
  lowTempContainer.classList.add('lowTempContainer');
  highLowContainer.appendChild(lowTempContainer);
  const highTempContainer = document.createElement('span');
  highTempContainer.classList.add('highTempContainer');
  highLowContainer.appendChild(highTempContainer); // create current time container

  const timeContainer = document.createElement('span');
  timeContainer.classList.add('timeContainer'); // create sunrise/sunset container

  const sunriseSunsetContainer = document.createElement('div');
  sunriseSunsetContainer.classList.add('sunriseSunsetContainer');
  const sunriseContainer = document.createElement('span');
  sunriseContainer.classList.add('sunriseContainer');
  sunriseSunsetContainer.appendChild(sunriseContainer);
  const sunsetContainer = document.createElement('span');
  sunsetContainer.classList.add('sunsetContainer');
  sunriseSunsetContainer.appendChild(sunsetContainer); // create wind container

  const windContainer = document.createElement('span');
  windContainer.classList.add('windContainer'); // create humidity container

  const humidityContainer = document.createElement('span');
  humidityContainer.classList.add('humidityContainer'); // create forecast container

  const forecastContainer = document.createElement('div');
  forecastContainer.classList.add('forecastContainer');
  const forecastTitle = document.createElement('span');
  forecastTitle.classList.add('forecastTitle');
  forecastTitle.innerText = 'Five day, three hour forecast:';
  forecastContainer.appendChild(forecastTitle);
  const forecastTable = document.createElement('table');
  forecastTable.classList.add('forecastTable');
  forecastContainer.appendChild(forecastTable); // Append

  WeatherAPIContainter.appendChild(APITitle);
  WeatherAPIContainter.appendChild(APIImage);
  WeatherAPIContainter.appendChild(descriptionContainer);
  WeatherAPIContainter.appendChild(tempContainer);
  WeatherAPIContainter.appendChild(highLowContainer);
  WeatherAPIContainter.appendChild(timeContainer);
  WeatherAPIContainter.appendChild(sunriseSunsetContainer);
  WeatherAPIContainter.appendChild(windContainer);
  WeatherAPIContainter.appendChild(humidityContainer);
  WeatherAPIContainter.appendChild(forecastContainer);
  return WeatherAPIContainter;
};

const createContent = () => {
  // create content container
  const content = document.createElement('div');
  content.classList.add('content'); // display weather card

  content.appendChild(createWeatherCard());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUEyQixPQUEzQixFQUFvQyxRQUFwQztFQUVBK0ssVUFBVSxDQUFDOUssV0FBWCxDQUF1QmdMLGFBQXZCO0VBQ0FMLE1BQU0sQ0FBQzNLLFdBQVAsQ0FBbUI0SyxTQUFuQjtFQUNBRCxNQUFNLENBQUMzSyxXQUFQLENBQW1COEssVUFBbkI7RUFFQSxPQUFPSCxNQUFQO0FBQ0gsQ0FuQkQ7O0FBcUJlLFNBQVNNLFVBQVQsR0FBc0I7RUFDakN6TCxRQUFRLENBQUMwTCxJQUFULENBQWNsTCxXQUFkLENBQTBCb0osWUFBWSxFQUF0QztFQUNBNUosUUFBUSxDQUFDMEwsSUFBVCxDQUFjbEwsV0FBZCxDQUEwQndKLFVBQVUsRUFBcEM7RUFDQWhLLFFBQVEsQ0FBQzBMLElBQVQsQ0FBY2xMLFdBQWQsQ0FBMEJ3SyxhQUFhLEVBQXZDO0VBQ0FoTCxRQUFRLENBQUMwTCxJQUFULENBQWNsTCxXQUFkLENBQTBCMEssWUFBWSxFQUF0QztBQUNILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZGl0aW9uSWNvbiBmcm9tICcuL2Fzc2V0cy9wbHVzLnN2ZydcbmltcG9ydCBkZWxldGVJY29uIGZyb20gJy4vYXNzZXRzL2RlbGV0ZS5zdmcnXG5pbXBvcnQgbWVudUljb24gZnJvbSAnLi9hc3NldHMvbWVudUljb24uc3ZnJ1xuXG5kb2N1bWVudC5jb29raWUgPSAnU2FtZVNpdGU9TGF4J1xuXG5jb25zdCBjcmVhdGVNZW51SWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrbGlzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGNoZWNrbGlzdEljb24uc3JjID0gbWVudUljb25cbiAgICBjaGVja2xpc3RJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tsaXN0SWNvbilcbn1cblxuLy8gQWRkIHNpbmdsZSBsb2NhdGlvbiB0byB3YXRjaGxpc3QgKGNhbGxlZCBiZWxvdylcbmNvbnN0IGNyZWF0ZUxpc3RpbmcgPSAobG9jYXRpb25OYW1lLCBpKSA9PiB7XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKGBsb2NhdGlvbmApXG4gICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICAvLyBhc3NpZ24gY2xhc3MgdG8gc2VsZWN0ZWQgbG9jYXRpb24gbGlzdGluZ1xuICAgIGlmIChsb2NhdGlvbk5hbWUuc2VsZWN0ZWQgPT09ICd0cnVlJykge1xuICAgICAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgICAgIC8vIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKVxuICAgIH1cblxuICAgIC8vIGV2ZW50IGxpc3RlbmVyIHRvIGRpc3BsYXkgc2VsZWN0ZWQgbG9jYXRpb24ncyB3ZWF0aGVyXG4gICAgbG9jYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBpZiBkZWxldGluZyBsaXN0aW5nLCBkbyBub3QgZGlzcGxheSB3ZWF0aGVyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZUl0ZW0nKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0TG9jYXRpb24obG9jYXRpb24pXG4gICAgfSlcblxuICAgIGNyZWF0ZU1lbnVJY29uKGxvY2F0aW9uKVxuICAgIGNvbnN0IGxvY2F0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGxvY2F0aW9uVGV4dC50ZXh0Q29udGVudCA9IGxvY2F0aW9uTmFtZS5uYW1lXG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQobG9jYXRpb25UZXh0KVxuICAgIGNyZWF0ZURlbGV0ZUljb24obG9jYXRpb24sIGkpXG4gICAgd2F0Y2hsaXN0LmFwcGVuZENoaWxkKGxvY2F0aW9uKVxufVxuXG4vLyBEaXNwbGF5IGVudGlyZSBhcnJheSBvZiBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG5jb25zdCBkaXNwbGF5V2F0Y2hsaXN0ID0gKCkgPT4ge1xuICAgIC8vIEdyYWIgd2F0Y2hsaXN0XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICAvLyBDbGVhciBsb2NhdGlvbiBsaXN0aW5nc1xuICAgIGNvbnN0IG9sZExpc3RpbmdDb3VudCA9IHdhdGNobGlzdC5jaGlsZEVsZW1lbnRDb3VudFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkTGlzdGluZ0NvdW50OyBpKyspIHtcbiAgICAgICAgd2F0Y2hsaXN0LmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgYWxsIGxvY2F0aW9ucyB0byB3YXRjaGxpc3RcbiAgICBsZXQgaSA9IDBcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcbiAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlV2F0Y2hsaXN0KVxuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgY3JlYXRlTGlzdGluZyhsb2NhdGlvbiwgaSlcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgIGkrK1xuICAgIH0pXG59XG5cbmNvbnN0IHN1Ym1pdExvY2F0aW9uID0gKGlucHV0KSA9PiB7XG4gICAgLy8gY3JlYXRlIGxvY2F0aW9uIG9iamVjdFxuICAgIGNvbnN0IG5ld0xvY2F0aW9uID0ge1xuICAgICAgICBuYW1lOiBpbnB1dCxcbiAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgfVxuXG4gICAgLy8gZ3JhYiBhcnJheSBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIGRlc2VsZWN0IHByZXZpb3VzbHkgc2VsZWN0ZWQgbG9jYXRpb25cbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIHB1c2ggbG9jYXRpb24gdG8gYXJyYXlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnB1c2gobmV3TG9jYXRpb24pXG4gICAgLy8gY29uc29sZS5sb2coc3RvcmFnZVdhdGNobGlzdClcblxuICAgIC8vIHNldCBhcnJheSBiYWNrIGludG8gc3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyByZWZyZXNoIHdhdGNobGlzdFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBkaXNwbGF5V2VhdGhlciA9IChuZXdXZWF0aGVyQ2FyZCkgPT4ge1xuICAgIC8vIGRpc3BsYXkgY29udGVudCB0aXRsZVxuICAgIGNvbnN0IGNvbnRlbnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50VGl0bGUnKVxuICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9IGAke25ld1dlYXRoZXJDYXJkLmNpdHl9LCAke25ld1dlYXRoZXJDYXJkLmNvdW50cnl9YFxuXG4gICAgLy8gZGlzcGxheSB3ZWF0aGVyIGljb25cbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7bmV3V2VhdGhlckNhcmQud2VhdGhlckljb259QDJ4LnBuZ2BcblxuICAgIC8vIGRpc3BsYXkgZGVzY3JpcHRpb25cbiAgICBjb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gbmV3V2VhdGhlckNhcmQud2VhdGhlckRlc2NyaXB0aW9uXG5cbiAgICAvLyBkaXNwbGF5IGN1cnJlbnQgdGVtcGVyYXR1cmVcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBDb250YWluZXInKVxuICAgIHRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZChuZXdXZWF0aGVyQ2FyZC50ZW1wQ3VycmVudCl9XFx1MDBCMGBcblxuICAgIC8vIGRpc3BsYXkgaGlnaC9sb3cgdGVtcGVyYXR1cmVzXG4gICAgY29uc3QgbG93VGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb3dUZW1wQ29udGFpbmVyJylcbiAgICBsb3dUZW1wQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb3c6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcExvd1xuICAgICl9XFx1MDBCMGBcbiAgICBjb25zdCBoaWdoVGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWdoVGVtcENvbnRhaW5lcicpXG4gICAgaGlnaFRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYEhpZ2g6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcEhpZ2hcbiAgICApfVxcdTAwQjBgXG5cbiAgICAvLyBkaXBsYXkgY3VycmVudCB0aW1lXG4gICAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lQ29udGFpbmVyJylcbiAgICB0aW1lQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb2NhbCB0aW1lOiAke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSBzdW5yaXNlL3N1bnNldCB0aW1lc1xuICAgIGNvbnN0IHN1bnJpc2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VucmlzZUNvbnRhaW5lcicpXG4gICAgc3VucmlzZUNvbnRhaW5lci5pbm5lclRleHQgPSBgU3VucmlzZTogJHtuZXdXZWF0aGVyQ2FyZC5zdW5yaXNlLmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQuc3VucmlzZS5nZXRNaW51dGVzKCl9YFxuICAgIGNvbnN0IHN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdW5zZXRDb250YWluZXInKVxuICAgIHN1bnNldENvbnRhaW5lci5pbm5lclRleHQgPSBgU3Vuc2V0OiAke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSB3aW5kXG4gICAgY29uc3Qgd2luZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kQ29udGFpbmVyJylcbiAgICB3aW5kQ29udGFpbmVyLmlubmVyVGV4dCA9IGBXaW5kOiAke01hdGgucm91bmQoXG4gICAgICAgIG5ld1dlYXRoZXJDYXJkLndpbmRTcGVlZFxuICAgICl9bXBoLCAke25ld1dlYXRoZXJDYXJkLndpbmREaXJlY3Rpb259ICgke25ld1dlYXRoZXJDYXJkLndpbmREZWdyZWV9XFx1MDBCMClgXG5cbiAgICAvLyBkaXNwbGF5IGh1bWlkaXR5XG4gICAgY29uc3QgaHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHlDb250YWluZXInKVxuICAgIGh1bWlkaXR5Q29udGFpbmVyLmlubmVyVGV4dCA9IGBIdW1pZGl0eTogJHtuZXdXZWF0aGVyQ2FyZC5odW1pZGl0eX0lYFxufVxuXG5jb25zdCBzZWxlY3RMb2NhdGlvbiA9IChsaSkgPT4ge1xuICAgIC8vIHNldCBjb250ZW50IHRpdGxlXG4gICAgLy8gY29uc3QgY29udGVudFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRUaXRsZScpXG4gICAgLy8gY29udGVudFRpdGxlLnRleHRDb250ZW50ID0gbGkuaW5uZXJUZXh0XG5cbiAgICAvLyBGZXRjaCBjdXJyZW50IHdlYXRoZXJcbiAgICBBUElDaXR5U2VhcmNoKGxpLmlubmVyVGV4dClcblxuICAgIC8vIGdyYWIgbG9jYXRpb25zIGFycmF5IGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gZGVzZWxlY3QgYWxsIGxvY2F0aW9uc1xuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlbGVjdGVkID0gJ2ZhbHNlJ1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIFNlbGVjdCBsb2NhdGlvbiBpZiBvbmUgaXMgY2hvc2VuIChtYWluIG1lbnUgc2VsZWN0aW9uIGlzIGhhbmRsZWQgaW4gZXZlbnQgbGlzdGVuZXIpXG4gICAgaWYgKGxpLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSA9PT0gJ2xvY2F0aW9uJykge1xuICAgICAgICBjb25zdCBzZWxlY3RlZExvY2F0aW9uSWQgPSBsaS5nZXRBdHRyaWJ1dGUoJ2lkJylcbiAgICAgICAgc3RvcmFnZVdhdGNobGlzdFtzZWxlY3RlZExvY2F0aW9uSWRdLnNlbGVjdGVkID0gJ3RydWUnXG4gICAgfVxuXG4gICAgLy8gc2V0IGxvY2F0aW9ucyBhcnJheSBiYWNrIGludG8gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIHJlZnJlc2hcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlQWRkQnV0dG9uID0gKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoJ2FkZEJ0bicpXG4gICAgYWRkQnRuLmlubmVyVGV4dCA9ICdzZWFyY2gnXG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHZhbGlkYXRlU2VhcmNoKGUpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRCdG4pXG59XG5cbmNvbnN0IGNyZWF0ZUNhbmNlbEJ1dHRvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdjYW5jZWxCdG4nKVxuICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuICAgIGNhbmNlbEJ0bi5pbm5lclRleHQgPSAnY2FuY2VsJ1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pXG59XG5cbi8vIGNyZWF0ZUZvcm1cbmNvbnN0IGNyZWF0ZUZvcm0gPSAoZm9ybSkgPT4ge1xuICAgIC8vIHJvdyBvbmU6IGFzc2lnbiBpbnB1dFxuICAgIGNvbnN0IGZvcm1Sb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93MS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgbmV3TG9jYXRpb25JbnB1dC5jbGFzc0xpc3QuYWRkKCduZXdMb2NhdGlvbklucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LnBsYWNlaG9sZGVyID0gJ0Zsb3JlbmNlJ1xuICAgIG5ld0xvY2F0aW9uSW5wdXQubmFtZSA9ICduZXdMb2NhdGlvbklucHV0J1xuICAgIGZvcm1Sb3cxLmFwcGVuZENoaWxkKG5ld0xvY2F0aW9uSW5wdXQpXG5cbiAgICAvLyByb3cgdHdvOiBzdWJtaXQgYW5kIGNhbmNlbCBidXR0b25zXG4gICAgY29uc3QgZm9ybVJvdzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdpZCcsICdmb3JtQnV0dG9ucycpXG4gICAgY3JlYXRlQWRkQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuICAgIGNyZWF0ZUNhbmNlbEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcblxuICAgIC8vIHJvdyB0aHJlZTogYXNzaWduIGVycm9yIGNsYXNzIGFuZCB0ZXh0XG4gICAgY29uc3QgZm9ybVJvdzMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIC8vIGZvcm1Sb3czLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBmb3JtUm93My5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ25ld1Byb2pFcnJvckNvbnRhaW5lcicpXG4gICAgLy8gZm9ybVJvdzMuaW5uZXJUZXh0ID0gJ1doaWNoIGNpdHk/J1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MSlcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cyKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzMpXG59XG5cbmNvbnN0IHNob3dGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZExvY2F0aW9uQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uQnRuJylcbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25Gb3JtJylcblxuICAgIGFkZExvY2F0aW9uQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdzaG93QmxvY2snKVxufVxuXG5jb25zdCBoaWRlRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRMb2NhdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkJ0bicpXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uRm9ybScpXG5cbiAgICBhZGRMb2NhdGlvbkJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Nob3dCbG9jaycpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbn1cblxuLy8gRGVsZXRlIHdhdGNobGlzdCBlbnRyeVxuY29uc3QgZGVsZXRlV2F0Y2hsaXN0RW50cnkgPSAoZSkgPT4ge1xuICAgIC8vIGdyYWIgYXJyYXlzIGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gSWRlbnRpZnkgZW50cnkgdG8gZGVsZXRlXG4gICAgY29uc3QgZG9vbWVkSW5kZXggPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJylcbiAgICAvLyBjb25zdCBkb29tZWROYW1lID0gc3RvcmFnZVdhdGNobGlzdFtkb29tZWRJbmRleF0ubmFtZTtcblxuICAgIC8vIGRlbGV0ZSBlbnRyeVxuICAgIHN0b3JhZ2VXYXRjaGxpc3Quc3BsaWNlKGRvb21lZEluZGV4LCAxKVxuXG4gICAgLy8gc2V0IGNoYW5nZXMgdG8gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIElmIGRvb21lZCBlbnRyeSB3YXMgc2VsZWN0ZWQsIGNsZWFyIGNvbnRlbnQgZGlzcGxheVxuICAgIC8vIGNvbnN0IGNvbnRlbnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50VGl0bGUnKTtcbiAgICAvLyBjb25zdCBhbGxUYXNrc0NsYXNzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGxUYXNrcycpLmNsYXNzTGlzdFxuICAgIC8vIGlmIChjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPT09IGRvb21lZE5hbWUpIHtcbiAgICAvLyAgICAgY29udGVudFRpdGxlLnRleHRDb250ZW50ID0gJ0FsbCB0YXNrcydcbiAgICAvLyAgICAgYWxsVGFza3NDbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgLy8gfVxuXG4gICAgLy8gcmVmcmVzaCB3YXRjaGlzdFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBjcmVhdGVEZWxldGVJY29uID0gKGNvbnRhaW5lciwgaSkgPT4ge1xuICAgIC8vIGNyZWF0ZSBpbWFnZSBhbmQgYXNzaWduIGF0dHJpYnV0ZXNcbiAgICBjb25zdCBuZXdEZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdEZWxldGVJY29uLnNyYyA9IGRlbGV0ZUljb25cbiAgICBuZXdEZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbiBkZWxldGVJdGVtJylcbiAgICBuZXdEZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG5cbiAgICAvLyBBREQgRVZFTlQgTElTVEVORVJcbiAgICBpZiAoXG4gICAgICAgIGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdsb2NhdGlvbicgfHxcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnbG9jYXRpb24nKVxuICAgICkge1xuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lciB0byBkZWxldGUgbG9jYXRpb25cbiAgICAgICAgbmV3RGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgYGRlbGV0ZVdhdGNobGlzdEVudHJ5YCxcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gLFxuICAgICAgICAgICAgYGhpZGRlbmBcbiAgICAgICAgKVxuICAgICAgICBuZXdEZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+XG4gICAgICAgICAgICBkZWxldGVXYXRjaGxpc3RFbnRyeShlLCBpKVxuICAgICAgICApXG4gICAgICAgIC8vIGRpc3BsYXkgdHJhc2ggaWNvbiBvbiBob3ZlclxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICAgICAgLy8gaGlkZSB0cmFzaCBpY29uXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICBgLmRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHN0cmFuZ2UnKVxuICAgIH1cbiAgICAvLyBhcHBlbmQgdG8gY29udGFpbmVyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0RlbGV0ZUljb24pXG59XG5cbmNvbnN0IGNyZWF0ZUFkZGl0aW9uSWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IG5ld0FkZGl0aW9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3QWRkaXRpb25JY29uLnNyYyA9IGFkZGl0aW9uSWNvblxuICAgIG5ld0FkZGl0aW9uSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24nKVxuICAgIGxpLmFwcGVuZENoaWxkKG5ld0FkZGl0aW9uSWNvbilcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gT3BlbndlYXRoZXIgQVBJIEZ1bmN0aW9uc1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiB0b0RpcmVjdGlvbihkZWdyZWUpIHtcbiAgICBpZiAoZGVncmVlID4gMzM3LjUpIHJldHVybiAnTm9ydGgnXG4gICAgaWYgKGRlZ3JlZSA+IDI5Mi41KSByZXR1cm4gJ05vcnRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDI0Ny41KSByZXR1cm4gJ1dlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIwMi41KSByZXR1cm4gJ1NvdXRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDE1Ny41KSByZXR1cm4gJ1NvdXRoJ1xuICAgIGlmIChkZWdyZWUgPiAxMjIuNSkgcmV0dXJuICdTb3V0aCBFYXN0J1xuICAgIGlmIChkZWdyZWUgPiA2Ny41KSByZXR1cm4gJ0Vhc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIyLjUpIHJldHVybiAnTm9ydGggRWFzdCdcbiAgICByZXR1cm4gJ05vcnRoJ1xufVxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MjM3NjExNS9ob3ctdG8tb2J0YWluLW9wZW4td2VhdGhlci1hcGktZGF0ZS10aW1lLWZyb20tY2l0eS1iZWluZy1mZXRjaGVkXG5jb25zdCBjYWxjQ3VycmVudFRpbWUgPSAodGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsVGltZSA9IGQuZ2V0VGltZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IGxvY2FsVGltZSArIGxvY2FsT2Zmc2V0XG4gICAgY29uc3QgbmV3Q2l0eSA9IHV0YyArIDEwMDAgKiB0aW1lem9uZVxuICAgIHJldHVybiBuZXcgRGF0ZShuZXdDaXR5KVxufVxuXG5jb25zdCBjYWxjU3VuVGltZSA9ICh0aW1lLCB0aW1lem9uZSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IHRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuLy8gY29uc3QgZmV0Y2hEYWlseUZvcmVjYXN0ID0gKGxhdCwgbG9uKSA9PiB7XG4vLyAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdQcm9qRXJyb3JDb250YWluZXInKTtcbi8vICAgY29uc29sZS5sb2cobGF0KTtcbi8vICAgY29uc29sZS5sb2cobG9uKTtcbi8vICAgLy8gZmV0Y2ggc2V2ZW4gZGF5IGZvcmVjYXN0XG4vLyAgIGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mZXhjbHVkZT1taW51dGVseSxob3VybHksYWxlcnRzJnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCwgeyBtb2RlOiAnY29ycycgfSlcbi8vICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbi8vICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCc7XG4vLyAgICAgfSk7XG4vLyB9O1xuXG5jb25zdCBmZXRjaEhvdXJseUZvcmVjYXN0ID0gKGNpdHlRdWVyeSkgPT4ge1xuICAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcubmV3UHJvakVycm9yQ29udGFpbmVyJ1xuICAgIClcbiAgICAvLyBmZXRjaCBmaXZlIGRheS90aHJlZSBob3VyIGZvcmVjYXN0XG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0QXJyYXkgPSBbXVxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyAuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7cmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmljb259LnBuZ2BcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUocmVzcG9uc2UubGlzdFtpXS5kdF90eHQpLFxuICAgICAgICAgICAgICAgICAgICBkYXRlVGV4dDogcmVzcG9uc2UubGlzdFtpXS5kdF90eHQsXG4gICAgICAgICAgICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5saXN0W2ldLm1haW4uaHVtaWRpdHksXG4gICAgICAgICAgICAgICAgICAgIHJhaW5DaGFuY2U6IHJlc3BvbnNlLmxpc3RbaV0ucG9wICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZTogcmVzcG9uc2UubGlzdFtpXS5tYWluLnRlbXAsXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS5saXN0W2ldLndpbmQuZ3VzdCxcbiAgICAgICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS5saXN0W2ldLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXkucHVzaChuZXdIb3VybHlGb3JlY2FzdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0hvdXJseUZvcmVjYXN0QXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gbmV3SG91cmx5Rm9yZWNhc3RBcnJheVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgZmV0Y2hDdXJyZW50V2VhdGhlciA9IChjaXR5UXVlcnkpID0+IHtcbiAgICAvLyBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuXG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgLy8gY29uc3Qge2xhdH0gPSByZXNwb25zZS5jb29yZDtcbiAgICAgICAgICAgIC8vIGNvbnN0IHtsb259ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAgICAgICAvLyBmZXRjaERhaWx5Rm9yZWNhc3QobGF0LCBsb24pO1xuICAgICAgICAgICAgc3VibWl0TG9jYXRpb24ocmVzcG9uc2UubmFtZSlcbiAgICAgICAgICAgIGNvbnN0IG5ld1dlYXRoZXJDYXJkID0ge1xuICAgICAgICAgICAgICAgIGNpdHk6IHJlc3BvbnNlLm5hbWUsXG4gICAgICAgICAgICAgICAgY291bnRyeTogcmVzcG9uc2Uuc3lzLmNvdW50cnksXG4gICAgICAgICAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLm1haW4uaHVtaWRpdHksXG4gICAgICAgICAgICAgICAgbG9jYWxEYXRlOiBjYWxjQ3VycmVudFRpbWUocmVzcG9uc2UudGltZXpvbmUpLFxuICAgICAgICAgICAgICAgIHN1bnJpc2U6IGNhbGNTdW5UaW1lKFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zeXMuc3VucmlzZSAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnRpbWV6b25lXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBzdW5zZXQ6IGNhbGNTdW5UaW1lKFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zeXMuc3Vuc2V0ICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRlbXBDdXJyZW50OiByZXNwb25zZS5tYWluLnRlbXAsXG4gICAgICAgICAgICAgICAgdGVtcEhpZ2g6IHJlc3BvbnNlLm1haW4udGVtcF9tYXgsXG4gICAgICAgICAgICAgICAgdGVtcExvdzogcmVzcG9uc2UubWFpbi50ZW1wX21pbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJJY29uOiByZXNwb25zZS53ZWF0aGVyWzBdLmljb24sXG4gICAgICAgICAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2Uud2luZC5kZWcsXG4gICAgICAgICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2Uud2luZC5kZWcpLFxuICAgICAgICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2Uud2luZC5zcGVlZCxcbiAgICAgICAgICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2Uud2luZC5ndXN0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7cmVzcG9uc2Uud2VhdGhlclswXS5pY29ufUAyeC5wbmdgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdXZWF0aGVyQ2FyZClcbiAgICAgICAgICAgIGRpc3BsYXlXZWF0aGVyKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgICAgICAgcmV0dXJuIG5ld1dlYXRoZXJDYXJkXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJ1xuICAgICAgICB9KVxufVxuXG5jb25zdCBBUElDaXR5U2VhcmNoID0gKGlucHV0KSA9PiB7XG4gICAgZmV0Y2hDdXJyZW50V2VhdGhlcihpbnB1dClcbiAgICBmZXRjaEhvdXJseUZvcmVjYXN0KGlucHV0KVxufVxuXG5jb25zdCB2YWxpZGF0ZVNlYXJjaCA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgLy8gZ3JhYiBkb20gZWxlbWVudHNcbiAgICBjb25zdCBuZXdMb2NhdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld0xvY2F0aW9uSW5wdXQnKVxuICAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcubmV3UHJvakVycm9yQ29udGFpbmVyJ1xuICAgIClcbiAgICAvLyByZXNldCBlcnJvclxuICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnJ1xuICAgIC8vIGNoZWNrIGZvciBzZWFyY2ggdGVybVxuICAgIGlmIChuZXdMb2NhdGlvbklucHV0LnZhbHVlID09PSAnJykge1xuICAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ1doaWNoIGNpdHk/J1xuICAgIH0gZWxzZSB7XG4gICAgICAgIEFQSUNpdHlTZWFyY2gobmV3TG9jYXRpb25JbnB1dC52YWx1ZSlcbiAgICAgICAgaGlkZUZvcm0oKVxuICAgICAgICBuZXdMb2NhdGlvbklucHV0LnZhbHVlID0gJydcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlQWRkaXRpb25JY29uLFxuICAgIGNyZWF0ZURlbGV0ZUljb24sXG4gICAgY3JlYXRlRm9ybSxcbiAgICBjcmVhdGVNZW51SWNvbixcbiAgICBkaXNwbGF5V2F0Y2hsaXN0LFxuICAgIGhpZGVGb3JtLFxuICAgIHNob3dGb3JtLFxuICAgIHN1Ym1pdExvY2F0aW9uLFxuICAgIHZhbGlkYXRlU2VhcmNoLFxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHtcbiAgICBjcmVhdGVBZGRpdGlvbkljb24sXG4gICAgY3JlYXRlRm9ybSxcbiAgICAvLyBkaXNwbGF5V2F0Y2hsaXN0LFxufSBmcm9tICcuL2hlbHBlckZ1bmN0aW9ucydcbmltcG9ydCBnaXRodWJJY29uIGZyb20gJy4vYXNzZXRzL0dpdEh1Yi1saWdodC0zMnB4LnBuZydcbmltcG9ydCBsb2dvSWNvbiBmcm9tICcuL2Fzc2V0cy9sb2dvSWNvbi5zdmcnXG5cbmNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKVxuXG4gICAgLy8gZGlzcGxheSBsb2dvXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbG9nby5zcmMgPSBsb2dvSWNvblxuICAgIGxvZ28udGFyZ2V0ID0gJ19ibGFuaydcbiAgICBsb2dvLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbG9nbycpXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGxvZ28pXG5cbiAgICAvLyBkaXNwbGF5IHRpdGxlXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnV2VhdGhlcnNlcnZlJ1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSlcblxuICAgIHJldHVybiBoZWFkZXJcbn1cblxuY29uc3QgY3JlYXRlTWVudSA9ICgpID0+IHtcbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBtZW51LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWVudScpXG5cbiAgICAvLyBjcmVhdGUgd2F0Y2hsaXN0IGhlYWRlclxuICAgIGNvbnN0IHdhdGNobGlzdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIHdhdGNobGlzdEhlYWRlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdEhlYWRlcicpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnRleHRDb250ZW50ID0gJ1dhdGNobGlzdCdcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgbWVudVxuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICB3YXRjaGxpc3Quc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3QnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dhdGNobGlzdCcpXG5cbiAgICAvLyBkaXNwbGF5V2F0Y2hsaXN0KClcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBjb250YWluZXJcbiAgICBjb25zdCBhZGRMb2NhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG5cbiAgICAvLyBHZW5lcmF0ZSBhZGQgbG9jYXRpb24gYnV0dG9uXG4gICAgY29uc3QgYWRkTG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgYWRkTG9jYXRpb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkJ0bicpXG4gICAgY3JlYXRlQWRkaXRpb25JY29uKGFkZExvY2F0aW9uKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGFkZExvY2F0aW9uVGV4dC5pbm5lclRleHQgPSAnQWRkIExvY2F0aW9uJ1xuICAgIGFkZExvY2F0aW9uLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uVGV4dClcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbilcblxuICAgIC8vIEdlbmVyYXRlIGFuZCBoaWRlIG5ldyBsb2NhdGlvbiBmb3JtXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkTG9jYXRpb25Gb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5tZXRob2QgPSAnZ2V0J1xuICAgIGNyZWF0ZUZvcm0oYWRkTG9jYXRpb25Gb3JtKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uRm9ybSlcblxuICAgIG1lbnUuYXBwZW5kQ2hpbGQod2F0Y2hsaXN0SGVhZGVyKVxuICAgIG1lbnUuYXBwZW5kQ2hpbGQod2F0Y2hsaXN0KVxuICAgIG1lbnUuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Db250YWluZXIpXG5cbiAgICByZXR1cm4gbWVudVxufVxuXG5jb25zdCBjcmVhdGVXZWF0aGVyQ2FyZCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgV2VhdGhlciBBUEkgY29udGFpbmVyXG4gICAgY29uc3QgV2VhdGhlckFQSUNvbnRhaW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmNsYXNzTGlzdC5hZGQoJ1dlYXRoZXJBUElDb250YWludGVyJywgJ2NvbnRlbnQnKVxuXG4gICAgLy8gY3JlYXRlIEFQSSB0aXRsZVxuICAgIGNvbnN0IEFQSVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKVxuICAgIEFQSVRpdGxlLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnRUaXRsZScpXG4gICAgQVBJVGl0bGUuaW5uZXJUZXh0ID0gJ1dlYXRoZXJzZXJ2ZSdcblxuICAgIC8vIGNyZWF0ZSBBUEkgaW1nXG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIEFQSUltYWdlLmNsYXNzTGlzdC5hZGQoJ0FQSUltYWdlJylcblxuICAgIC8vIGNyZWF0ZSBkZXNjcmlwdGlvbiBjb250YWluZXJcbiAgICBjb25zdCBkZXNjcmlwdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGRlc2NyaXB0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXJEZXNjcmlwdGlvbicpXG5cbiAgICAvLyBjcmVhdGUgY3VycmVudCB0ZW1wIGNvbnRhaW5lclxuICAgIGNvbnN0IHRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICB0ZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RlbXBDb250YWluZXInKVxuXG4gICAgLy8gY3JlYXRlIGhpZ2gvbG93IHRlbXAgY29udGFpbmVyXG4gICAgY29uc3QgaGlnaExvd0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaGlnaExvd0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWdoTG93Q29udGFpbmVyJylcblxuICAgIGNvbnN0IGxvd1RlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBsb3dUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2xvd1RlbXBDb250YWluZXInKVxuICAgIGhpZ2hMb3dDb250YWluZXIuYXBwZW5kQ2hpbGQobG93VGVtcENvbnRhaW5lcilcblxuICAgIGNvbnN0IGhpZ2hUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgaGlnaFRlbXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlnaFRlbXBDb250YWluZXInKVxuICAgIGhpZ2hMb3dDb250YWluZXIuYXBwZW5kQ2hpbGQoaGlnaFRlbXBDb250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgY3VycmVudCB0aW1lIGNvbnRhaW5lclxuICAgIGNvbnN0IHRpbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICB0aW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RpbWVDb250YWluZXInKVxuXG4gICAgLy8gY3JlYXRlIHN1bnJpc2Uvc3Vuc2V0IGNvbnRhaW5lclxuICAgIGNvbnN0IHN1bnJpc2VTdW5zZXRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHN1bnJpc2VTdW5zZXRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3VucmlzZVN1bnNldENvbnRhaW5lcicpXG5cbiAgICBjb25zdCBzdW5yaXNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgc3VucmlzZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdW5yaXNlQ29udGFpbmVyJylcbiAgICBzdW5yaXNlU3Vuc2V0Q29udGFpbmVyLmFwcGVuZENoaWxkKHN1bnJpc2VDb250YWluZXIpXG5cbiAgICBjb25zdCBzdW5zZXRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBzdW5zZXRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3Vuc2V0Q29udGFpbmVyJylcbiAgICBzdW5yaXNlU3Vuc2V0Q29udGFpbmVyLmFwcGVuZENoaWxkKHN1bnNldENvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSB3aW5kIGNvbnRhaW5lclxuICAgIGNvbnN0IHdpbmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICB3aW5kQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3dpbmRDb250YWluZXInKVxuXG4gICAgLy8gY3JlYXRlIGh1bWlkaXR5IGNvbnRhaW5lclxuICAgIGNvbnN0IGh1bWlkaXR5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgaHVtaWRpdHlDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaHVtaWRpdHlDb250YWluZXInKVxuXG4gICAgLy8gY3JlYXRlIGZvcmVjYXN0IGNvbnRhaW5lclxuICAgIGNvbnN0IGZvcmVjYXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JlY2FzdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdENvbnRhaW5lcicpXG5cbiAgICBjb25zdCBmb3JlY2FzdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgZm9yZWNhc3RUaXRsZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRpdGxlJylcbiAgICBmb3JlY2FzdFRpdGxlLmlubmVyVGV4dCA9ICdGaXZlIGRheSwgdGhyZWUgaG91ciBmb3JlY2FzdDonXG4gICAgZm9yZWNhc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaXRsZSlcblxuICAgIGNvbnN0IGZvcmVjYXN0VGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXG4gICAgZm9yZWNhc3RUYWJsZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRhYmxlJylcbiAgICBmb3JlY2FzdENvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JlY2FzdFRhYmxlKVxuXG4gICAgLy8gQXBwZW5kXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJVGl0bGUpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25Db250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQodGVtcENvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChoaWdoTG93Q29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHRpbWVDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoc3VucmlzZVN1bnNldENvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZCh3aW5kQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGh1bWlkaXR5Q29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGZvcmVjYXN0Q29udGFpbmVyKVxuXG4gICAgcmV0dXJuIFdlYXRoZXJBUElDb250YWludGVyXG59XG5cbmNvbnN0IGNyZWF0ZUNvbnRlbnQgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIGNvbnRlbnQgY29udGFpbmVyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250ZW50JylcblxuICAgIC8vIGRpc3BsYXkgd2VhdGhlciBjYXJkXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQ2FyZCgpKVxuXG4gICAgcmV0dXJuIGNvbnRlbnRcbn1cblxuY29uc3QgY3JlYXRlRm9vdGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpXG5cbiAgICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBjb3B5cmlnaHQudGV4dENvbnRlbnQgPSBgQ29weXJpZ2h0IMKpICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBqY2FtcGJlbGw1N2BcblxuICAgIGNvbnN0IGdpdGh1YkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBnaXRodWJMaW5rLmhyZWYgPSAnaHR0cHM6Ly9naXRodWIuY29tL2pjYW1wYmVsbDU3J1xuICAgIGdpdGh1YkxpbmsudGFyZ2V0ID0gJ19ibGFuaydcblxuICAgIGNvbnN0IG5ld0dpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0dpdGh1Ykljb24uc3JjID0gZ2l0aHViSWNvblxuICAgIG5ld0dpdGh1Ykljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdnaXRodWInKVxuXG4gICAgZ2l0aHViTGluay5hcHBlbmRDaGlsZChuZXdHaXRodWJJY29uKVxuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChjb3B5cmlnaHQpXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGdpdGh1YkxpbmspXG5cbiAgICByZXR1cm4gZm9vdGVyXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZU1lbnUoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUNvbnRlbnQoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUZvb3RlcigpKVxufVxuIl0sIm5hbWVzIjpbImFkZGl0aW9uSWNvbiIsImRlbGV0ZUljb24iLCJtZW51SWNvbiIsImRvY3VtZW50IiwiY29va2llIiwiY3JlYXRlTWVudUljb24iLCJsaSIsImNoZWNrbGlzdEljb24iLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVMaXN0aW5nIiwibG9jYXRpb25OYW1lIiwiaSIsIndhdGNobGlzdCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2NhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsInNlbGVjdGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsInNlbGVjdExvY2F0aW9uIiwibG9jYXRpb25UZXh0IiwidGV4dENvbnRlbnQiLCJuYW1lIiwiY3JlYXRlRGVsZXRlSWNvbiIsImRpc3BsYXlXYXRjaGxpc3QiLCJvbGRMaXN0aW5nQ291bnQiLCJjaGlsZEVsZW1lbnRDb3VudCIsImZpcnN0Q2hpbGQiLCJyZW1vdmUiLCJzdG9yYWdlV2F0Y2hsaXN0IiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImZvckVhY2giLCJzdWJtaXRMb2NhdGlvbiIsImlucHV0IiwibmV3TG9jYXRpb24iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImRpc3BsYXlXZWF0aGVyIiwibmV3V2VhdGhlckNhcmQiLCJjb250ZW50VGl0bGUiLCJjaXR5IiwiY291bnRyeSIsIkFQSUltYWdlIiwid2VhdGhlckljb24iLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJpbm5lclRleHQiLCJ0ZW1wQ29udGFpbmVyIiwiTWF0aCIsInJvdW5kIiwidGVtcEN1cnJlbnQiLCJsb3dUZW1wQ29udGFpbmVyIiwidGVtcExvdyIsImhpZ2hUZW1wQ29udGFpbmVyIiwidGVtcEhpZ2giLCJ0aW1lQ29udGFpbmVyIiwibG9jYWxEYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwic3VucmlzZUNvbnRhaW5lciIsInN1bnJpc2UiLCJzdW5zZXRDb250YWluZXIiLCJzdW5zZXQiLCJ3aW5kQ29udGFpbmVyIiwid2luZFNwZWVkIiwid2luZERpcmVjdGlvbiIsIndpbmREZWdyZWUiLCJodW1pZGl0eUNvbnRhaW5lciIsImh1bWlkaXR5IiwiQVBJQ2l0eVNlYXJjaCIsImdldEF0dHJpYnV0ZSIsInNlbGVjdGVkTG9jYXRpb25JZCIsImNyZWF0ZUFkZEJ1dHRvbiIsImNvbnRhaW5lciIsImFkZEJ0biIsInZhbGlkYXRlU2VhcmNoIiwiY3JlYXRlQ2FuY2VsQnV0dG9uIiwiY2FuY2VsQnRuIiwiY3JlYXRlRm9ybSIsImZvcm0iLCJmb3JtUm93MSIsIm5ld0xvY2F0aW9uSW5wdXQiLCJwbGFjZWhvbGRlciIsImZvcm1Sb3cyIiwiZm9ybVJvdzMiLCJzaG93Rm9ybSIsImFkZExvY2F0aW9uQnRuIiwiYWRkTG9jYXRpb25Gb3JtIiwiaGlkZUZvcm0iLCJkZWxldGVXYXRjaGxpc3RFbnRyeSIsImRvb21lZEluZGV4Iiwic3BsaWNlIiwibmV3RGVsZXRlSWNvbiIsInRyYXNoSWNvbiIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVBZGRpdGlvbkljb24iLCJuZXdBZGRpdGlvbkljb24iLCJ0b0RpcmVjdGlvbiIsImRlZ3JlZSIsImNhbGNDdXJyZW50VGltZSIsInRpbWV6b25lIiwiZCIsIkRhdGUiLCJsb2NhbFRpbWUiLCJnZXRUaW1lIiwibG9jYWxPZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsInV0YyIsIm5ld0NpdHkiLCJjYWxjU3VuVGltZSIsInRpbWUiLCJmZXRjaEhvdXJseUZvcmVjYXN0IiwiY2l0eVF1ZXJ5IiwibmV3UHJvakVycm9yQ29udGFpbmVyIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm5ld0hvdXJseUZvcmVjYXN0QXJyYXkiLCJuZXdIb3VybHlGb3JlY2FzdCIsImRhdGUiLCJsaXN0IiwiZHRfdHh0IiwiZGF0ZVRleHQiLCJtYWluIiwicmFpbkNoYW5jZSIsInBvcCIsInRlbXBlcmF0dXJlIiwidGVtcCIsIndlYXRoZXJDb25kaXRpb24iLCJ3ZWF0aGVyIiwiZGVzY3JpcHRpb24iLCJ3aW5kIiwiZGVnIiwid2luZEd1c3QiLCJndXN0Iiwic3BlZWQiLCJjYXRjaCIsImVyciIsImZldGNoQ3VycmVudFdlYXRoZXIiLCJzeXMiLCJ0ZW1wX21heCIsInRlbXBfbWluIiwiaWNvbiIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJnaXRodWJJY29uIiwibG9nb0ljb24iLCJjcmVhdGVIZWFkZXIiLCJoZWFkZXIiLCJsb2dvIiwidGl0bGUiLCJjcmVhdGVNZW51IiwibWVudSIsIndhdGNobGlzdEhlYWRlciIsImFkZExvY2F0aW9uQ29udGFpbmVyIiwiYWRkTG9jYXRpb24iLCJhZGRMb2NhdGlvblRleHQiLCJtZXRob2QiLCJjcmVhdGVXZWF0aGVyQ2FyZCIsIldlYXRoZXJBUElDb250YWludGVyIiwiQVBJVGl0bGUiLCJkZXNjcmlwdGlvbkNvbnRhaW5lciIsImhpZ2hMb3dDb250YWluZXIiLCJzdW5yaXNlU3Vuc2V0Q29udGFpbmVyIiwiZm9yZWNhc3RDb250YWluZXIiLCJmb3JlY2FzdFRpdGxlIiwiZm9yZWNhc3RUYWJsZSIsImNyZWF0ZUNvbnRlbnQiLCJjb250ZW50IiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiY29weXJpZ2h0IiwiZ2V0RnVsbFllYXIiLCJnaXRodWJMaW5rIiwiaHJlZiIsIm5ld0dpdGh1Ykljb24iLCJpbml0aWFsaXplIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=