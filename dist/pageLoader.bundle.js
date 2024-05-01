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
/* harmony export */   "addDefaultContent": () => (/* binding */ addDefaultContent),
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

  if (locationName.selected === true) {
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
  const storageWatchlist = JSON.parse(localStorage.getItem('storageWatchlist')); // console.log(storageWatchlist)

  storageWatchlist.forEach(location => {
    createListing(location, i);

    if (location.selected === true) {
      APICitySearch(location.name);
    } // eslint-disable-next-line no-plusplus


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

  storageWatchlist.push(newLocation); // set array back into storage

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
  weatherDescription.innerText = "Weather: ".concat(newWeatherCard.weatherDescription); // display current temperature

  const tempContainer = document.querySelector('.tempContainer');
  tempContainer.innerText = "".concat(Math.round(newWeatherCard.tempCurrent), "\xB0"); // display high/low temperatures

  const lowTempContainer = document.querySelector('.lowTempContainer');
  lowTempContainer.innerText = "Low temperature: ".concat(Math.round(newWeatherCard.tempLow), "\xB0");
  const highTempContainer = document.querySelector('.highTempContainer');
  highTempContainer.innerText = "High temperature: ".concat(Math.round(newWeatherCard.tempHigh), "\xB0"); // diplay current time

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

const displayForecast = newHourlyForecastArray => {
  const forecastRow = document.querySelector('.forecastRow'); // remove any forecast cells

  const oldForecast = forecastRow.childElementCount; // eslint-disable-next-line no-plusplus

  for (let i = 0; i < oldForecast; i++) {
    forecastRow.firstChild.remove();
  } // Add new forecast cells
  // eslint-disable-next-line no-plusplus


  for (let i = 0; i < newHourlyForecastArray.length; i++) {
    const forecastCell = document.createElement('td');
    forecastCell.classList.add('forecastCell'); // display date

    const forecastDate = document.createElement('span');
    forecastDate.classList.add('forecastDate');
    forecastDate.innerText = "".concat(newHourlyForecastArray[i].date.getMonth() + 1, "/").concat(newHourlyForecastArray[i].date.getDate());
    forecastCell.appendChild(forecastDate); // display time

    const forecastTime = document.createElement('span');
    forecastTime.classList.add('forecastTime');
    forecastTime.innerText = newHourlyForecastArray[i].date.toLocaleTimeString();
    forecastCell.appendChild(forecastTime); // display weather icon

    const weatherForecastIcon = document.createElement('img');
    weatherForecastIcon.classList.add('weatherForecastIcon');
    weatherForecastIcon.src = "http://openweathermap.org/img/wn/".concat(newHourlyForecastArray[i].weatherIcon, ".png");
    forecastCell.appendChild(weatherForecastIcon); // display weather description

    const forecastWeatherDescription = document.createElement('span');
    forecastWeatherDescription.classList.add('forecastWeatherDescription');
    forecastWeatherDescription.innerText = newHourlyForecastArray[i].weatherDescription;
    forecastCell.appendChild(forecastWeatherDescription); // display forecast temperature

    const forecastTemp = document.createElement('span');
    forecastTemp.classList.add('forecastTemp');
    forecastTemp.innerText = "".concat(Math.round(newHourlyForecastArray[i].temperature), "\xB0");
    forecastCell.appendChild(forecastTemp);
    forecastRow.appendChild(forecastCell);
  }
};

const selectLocation = li => {
  // grab locations array from storage
  const storageWatchlist = JSON.parse(localStorage.getItem('storageWatchlist')); // deselect all locations

  storageWatchlist.forEach(location => {
    if (location.selected === true) {
      location.selected = false;
    }
  }); // Select location if one is chosen (main menu selection is handled in event listener)

  if (li.classList.contains('location')) {
    const selectedLocationId = li.getAttribute('id');
    storageWatchlist[selectedLocationId].selected = true;
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

  const formRow3 = document.createElement('div');
  formRow3.setAttribute('class', 'newProjErrorContainer');
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

  const doomedIndex = e.target.getAttribute('id'); // delete entry

  storageWatchlist.splice(doomedIndex, 1); // set changes to localStorage

  localStorage.setItem('storageWatchlist', JSON.stringify(storageWatchlist)); // If doomed entry was selected, clear content display
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
};

const fetchHourlyForecast = cityQuery => {
  const newProjErrorContainer = document.querySelector('.newProjErrorContainer'); // fetch five day/three hour forecast

  fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(cityQuery, "&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e"), {
    mode: 'cors'
  }).then(response => response.json()).then(response => {
    console.log(response);
    const newHourlyForecastArray = []; // eslint-disable-next-line no-plusplus

    for (let i = 0; i < 40; i++) {
      const newHourlyForecast = {
        date: new Date(response.list[i].dt_txt),
        dateText: response.list[i].dt_txt,
        humidity: response.list[i].main.humidity,
        rainChance: response.list[i].pop * 100,
        temperature: response.list[i].main.temp,
        weatherCondition: response.list[i].weather[0].main,
        weatherDescription: response.list[i].weather[0].description,
        weatherIcon: response.list[i].weather[0].icon,
        windDegree: response.list[i].wind.deg,
        windDirection: toDirection(response.list[i].wind.deg),
        windGust: response.list[i].wind.gust,
        windSpeed: response.list[i].wind.speed
      };
      newHourlyForecastArray.push(newHourlyForecast);
    }

    console.log(newHourlyForecastArray);
    displayForecast(newHourlyForecastArray);
    return newHourlyForecastArray;
  }).catch(err => {
    console.log(err);
    newProjErrorContainer.innerText = 'City not found';
  });
};

const fetchCurrentWeather = (cityQuery, e) => {
  // const APIImage = document.querySelector('.APIImage')
  const newProjErrorContainer = document.querySelector('.newProjErrorContainer');
  fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(cityQuery, "&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e"), {
    mode: 'cors'
  }).then(response => response.json()).then(response => {
    console.log(response);
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

    if (e !== undefined && e.target.classList.contains('addBtn') === true) {
      submitLocation("".concat(newWeatherCard.city, ", ").concat(newWeatherCard.country));
    }

    displayWeather(newWeatherCard);
    return newWeatherCard;
  }).catch(err => {
    console.log(err);
    newProjErrorContainer.innerText = 'City not found';
  });
};

const APICitySearch = (input, e) => {
  fetchCurrentWeather(input, e);
  fetchHourlyForecast(input);
};

const addDefaultContent = () => {
  submitLocation('San Francisco, US');
  submitLocation('Seattle, US');
  submitLocation('Honolulu, US');
  submitLocation('Florence, IT');
  submitLocation('Amsterdam, NL');
  submitLocation('Paris, FR');
  submitLocation('Tokyo, JP');
};

const validateSearch = e => {
  e.preventDefault(); // grab dom elements

  const newLocationInput = document.querySelector('.newLocationInput');
  const newProjErrorContainer = document.querySelector('.newProjErrorContainer'); // reset error

  newProjErrorContainer.innerText = ''; // check for search term

  if (newLocationInput.value === '') {
    newProjErrorContainer.innerText = 'Which city?';
  } else {
    APICitySearch(newLocationInput.value, e);
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
  watchlist.setAttribute('id', 'watchlist'); // Generate add location container

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

  const APITitle = document.createElement('h2');
  APITitle.classList.add('contentTitle');
  WeatherAPIContainter.appendChild(APITitle); // create API img

  const APIImage = document.createElement('img');
  APIImage.classList.add('APIImage');
  WeatherAPIContainter.appendChild(APIImage); // create current temp container

  const tempContainer = document.createElement('h1');
  tempContainer.classList.add('tempContainer');
  WeatherAPIContainter.appendChild(tempContainer); // WeatherAPIContainter.appendChild(document.createElement('br'))
  // create description container

  const descriptionContainer = document.createElement('span');
  descriptionContainer.classList.add('weatherDescription');
  WeatherAPIContainter.appendChild(descriptionContainer); // create low temp container

  const lowTempContainer = document.createElement('span');
  lowTempContainer.classList.add('lowTempContainer');
  WeatherAPIContainter.appendChild(lowTempContainer); // create high temp container

  const highTempContainer = document.createElement('span');
  highTempContainer.classList.add('highTempContainer');
  WeatherAPIContainter.appendChild(highTempContainer);
  WeatherAPIContainter.appendChild(document.createElement('br')); // create current time container

  const timeContainer = document.createElement('span');
  timeContainer.classList.add('timeContainer');
  WeatherAPIContainter.appendChild(timeContainer); // create sunrise container

  const sunriseContainer = document.createElement('span');
  sunriseContainer.classList.add('sunriseContainer');
  WeatherAPIContainter.appendChild(sunriseContainer); // create sunset container

  const sunsetContainer = document.createElement('span');
  sunsetContainer.classList.add('sunsetContainer');
  WeatherAPIContainter.appendChild(sunsetContainer);
  WeatherAPIContainter.appendChild(document.createElement('br')); // create wind container

  const windContainer = document.createElement('span');
  windContainer.classList.add('windContainer');
  WeatherAPIContainter.appendChild(windContainer); // create humidity container

  const humidityContainer = document.createElement('span');
  humidityContainer.classList.add('humidityContainer');
  WeatherAPIContainter.appendChild(humidityContainer); // create forecast container

  const forecastTitle = document.createElement('h2');
  forecastTitle.classList.add('forecastTitle');
  forecastTitle.innerText = 'Five day, three hour forecast:';
  WeatherAPIContainter.appendChild(forecastTitle);
  const forecastContainer = document.createElement('div');
  forecastContainer.classList.add('forecastContainer');
  WeatherAPIContainter.appendChild(forecastContainer);
  const forecastTable = document.createElement('table');
  forecastTable.classList.add('forecastTable');
  forecastContainer.appendChild(forecastTable);
  const forecastRow = document.createElement('tr');
  forecastRow.classList.add('forecastRow');
  forecastTable.appendChild(forecastRow); // make scrollwheel functional with horizontal scrolling

  forecastRow.addEventListener('wheel', e => {
    e.preventDefault();
    forecastRow.scrollLeft += e.deltaY;
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TCxRQUFRLENBQUN5TSxJQUFULENBQWNqTSxXQUFkLENBQTBCeUwsWUFBWSxFQUF0QztBQUNILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZGl0aW9uSWNvbiBmcm9tICcuL2Fzc2V0cy9wbHVzLnN2ZydcbmltcG9ydCBkZWxldGVJY29uIGZyb20gJy4vYXNzZXRzL2RlbGV0ZS5zdmcnXG5pbXBvcnQgbWVudUljb24gZnJvbSAnLi9hc3NldHMvbWVudUljb24uc3ZnJ1xuXG5kb2N1bWVudC5jb29raWUgPSAnU2FtZVNpdGU9TGF4J1xuXG5jb25zdCBjcmVhdGVNZW51SWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrbGlzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGNoZWNrbGlzdEljb24uc3JjID0gbWVudUljb25cbiAgICBjaGVja2xpc3RJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tsaXN0SWNvbilcbn1cblxuLy8gQWRkIHNpbmdsZSBsb2NhdGlvbiB0byB3YXRjaGxpc3QgKGNhbGxlZCBiZWxvdylcbmNvbnN0IGNyZWF0ZUxpc3RpbmcgPSAobG9jYXRpb25OYW1lLCBpKSA9PiB7XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKGBsb2NhdGlvbmApXG4gICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICAvLyBhc3NpZ24gY2xhc3MgdG8gc2VsZWN0ZWQgbG9jYXRpb24gbGlzdGluZ1xuICAgIGlmIChsb2NhdGlvbk5hbWUuc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIH1cblxuICAgIC8vIGV2ZW50IGxpc3RlbmVyIHRvIGRpc3BsYXkgc2VsZWN0ZWQgbG9jYXRpb24ncyB3ZWF0aGVyXG4gICAgbG9jYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBpZiBkZWxldGluZyBsaXN0aW5nLCBkbyBub3QgZGlzcGxheSB3ZWF0aGVyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZUl0ZW0nKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0TG9jYXRpb24obG9jYXRpb24pXG4gICAgfSlcblxuICAgIGNyZWF0ZU1lbnVJY29uKGxvY2F0aW9uKVxuICAgIGNvbnN0IGxvY2F0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGxvY2F0aW9uVGV4dC50ZXh0Q29udGVudCA9IGxvY2F0aW9uTmFtZS5uYW1lXG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQobG9jYXRpb25UZXh0KVxuICAgIGNyZWF0ZURlbGV0ZUljb24obG9jYXRpb24sIGkpXG4gICAgd2F0Y2hsaXN0LmFwcGVuZENoaWxkKGxvY2F0aW9uKVxufVxuXG4vLyBEaXNwbGF5IGVudGlyZSBhcnJheSBvZiBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG5jb25zdCBkaXNwbGF5V2F0Y2hsaXN0ID0gKCkgPT4ge1xuICAgIC8vIEdyYWIgd2F0Y2hsaXN0XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICAvLyBDbGVhciBsb2NhdGlvbiBsaXN0aW5nc1xuICAgIGNvbnN0IG9sZExpc3RpbmdDb3VudCA9IHdhdGNobGlzdC5jaGlsZEVsZW1lbnRDb3VudFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkTGlzdGluZ0NvdW50OyBpKyspIHtcbiAgICAgICAgd2F0Y2hsaXN0LmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgYWxsIGxvY2F0aW9ucyB0byB3YXRjaGxpc3RcbiAgICBsZXQgaSA9IDBcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcbiAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlV2F0Y2hsaXN0KVxuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgY3JlYXRlTGlzdGluZyhsb2NhdGlvbiwgaSlcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBBUElDaXR5U2VhcmNoKGxvY2F0aW9uLm5hbWUpXG4gICAgICAgIH1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgIGkrK1xuICAgIH0pXG59XG5cbmNvbnN0IHN1Ym1pdExvY2F0aW9uID0gKGlucHV0KSA9PiB7XG4gICAgLy8gY3JlYXRlIGxvY2F0aW9uIG9iamVjdFxuICAgIGNvbnN0IG5ld0xvY2F0aW9uID0ge1xuICAgICAgICBuYW1lOiBpbnB1dCxcbiAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgfVxuXG4gICAgLy8gZ3JhYiBhcnJheSBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIGRlc2VsZWN0IHByZXZpb3VzbHkgc2VsZWN0ZWQgbG9jYXRpb25cbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIHB1c2ggbG9jYXRpb24gdG8gYXJyYXlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnB1c2gobmV3TG9jYXRpb24pXG5cbiAgICAvLyBzZXQgYXJyYXkgYmFjayBpbnRvIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gcmVmcmVzaCB3YXRjaGxpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgZGlzcGxheVdlYXRoZXIgPSAobmV3V2VhdGhlckNhcmQpID0+IHtcbiAgICAvLyBkaXNwbGF5IGNvbnRlbnQgdGl0bGVcbiAgICBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJylcbiAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSBgJHtuZXdXZWF0aGVyQ2FyZC5jaXR5fSwgJHtuZXdXZWF0aGVyQ2FyZC5jb3VudHJ5fWBcblxuICAgIC8vIGRpc3BsYXkgd2VhdGhlciBpY29uXG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKVxuICAgIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25ld1dlYXRoZXJDYXJkLndlYXRoZXJJY29ufUAyeC5wbmdgXG5cbiAgICAvLyBkaXNwbGF5IGRlc2NyaXB0aW9uXG4gICAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJEZXNjcmlwdGlvbicpXG4gICAgd2VhdGhlckRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IGBXZWF0aGVyOiAke25ld1dlYXRoZXJDYXJkLndlYXRoZXJEZXNjcmlwdGlvbn1gXG5cbiAgICAvLyBkaXNwbGF5IGN1cnJlbnQgdGVtcGVyYXR1cmVcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBDb250YWluZXInKVxuICAgIHRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZChuZXdXZWF0aGVyQ2FyZC50ZW1wQ3VycmVudCl9XFx1MDBCMGBcblxuICAgIC8vIGRpc3BsYXkgaGlnaC9sb3cgdGVtcGVyYXR1cmVzXG4gICAgY29uc3QgbG93VGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb3dUZW1wQ29udGFpbmVyJylcbiAgICBsb3dUZW1wQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb3cgdGVtcGVyYXR1cmU6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcExvd1xuICAgICl9XFx1MDBCMGBcbiAgICBjb25zdCBoaWdoVGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWdoVGVtcENvbnRhaW5lcicpXG4gICAgaGlnaFRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYEhpZ2ggdGVtcGVyYXR1cmU6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcEhpZ2hcbiAgICApfVxcdTAwQjBgXG5cbiAgICAvLyBkaXBsYXkgY3VycmVudCB0aW1lXG4gICAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lQ29udGFpbmVyJylcbiAgICB0aW1lQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb2NhbCB0aW1lOiAke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSBzdW5yaXNlL3N1bnNldCB0aW1lc1xuICAgIGNvbnN0IHN1bnJpc2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VucmlzZUNvbnRhaW5lcicpXG4gICAgc3VucmlzZUNvbnRhaW5lci5pbm5lclRleHQgPSBgU3VucmlzZTogJHtuZXdXZWF0aGVyQ2FyZC5zdW5yaXNlLmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQuc3VucmlzZS5nZXRNaW51dGVzKCl9YFxuICAgIGNvbnN0IHN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdW5zZXRDb250YWluZXInKVxuICAgIHN1bnNldENvbnRhaW5lci5pbm5lclRleHQgPSBgU3Vuc2V0OiAke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSB3aW5kXG4gICAgY29uc3Qgd2luZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kQ29udGFpbmVyJylcbiAgICB3aW5kQ29udGFpbmVyLmlubmVyVGV4dCA9IGBXaW5kOiAke01hdGgucm91bmQoXG4gICAgICAgIG5ld1dlYXRoZXJDYXJkLndpbmRTcGVlZFxuICAgICl9bXBoLCAke25ld1dlYXRoZXJDYXJkLndpbmREaXJlY3Rpb259ICgke25ld1dlYXRoZXJDYXJkLndpbmREZWdyZWV9XFx1MDBCMClgXG5cbiAgICAvLyBkaXNwbGF5IGh1bWlkaXR5XG4gICAgY29uc3QgaHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHlDb250YWluZXInKVxuICAgIGh1bWlkaXR5Q29udGFpbmVyLmlubmVyVGV4dCA9IGBIdW1pZGl0eTogJHtuZXdXZWF0aGVyQ2FyZC5odW1pZGl0eX0lYFxufVxuXG5jb25zdCBkaXNwbGF5Rm9yZWNhc3QgPSAobmV3SG91cmx5Rm9yZWNhc3RBcnJheSkgPT4ge1xuICAgIGNvbnN0IGZvcmVjYXN0Um93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcmVjYXN0Um93JylcblxuICAgIC8vIHJlbW92ZSBhbnkgZm9yZWNhc3QgY2VsbHNcbiAgICBjb25zdCBvbGRGb3JlY2FzdCA9IGZvcmVjYXN0Um93LmNoaWxkRWxlbWVudENvdW50XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRGb3JlY2FzdDsgaSsrKSB7XG4gICAgICAgIGZvcmVjYXN0Um93LmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvLyBBZGQgbmV3IGZvcmVjYXN0IGNlbGxzXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdIb3VybHlGb3JlY2FzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgZm9yZWNhc3RDZWxsLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Q2VsbCcpXG5cbiAgICAgICAgLy8gZGlzcGxheSBkYXRlXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdERhdGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3REYXRlJylcbiAgICAgICAgZm9yZWNhc3REYXRlLmlubmVyVGV4dCA9IGAke1xuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS5kYXRlLmdldE1vbnRoKCkgKyAxXG4gICAgICAgIH0vJHtuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLmRhdGUuZ2V0RGF0ZSgpfWBcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0RGF0ZSlcblxuICAgICAgICAvLyBkaXNwbGF5IHRpbWVcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0VGltZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRpbWUnKVxuICAgICAgICBmb3JlY2FzdFRpbWUuaW5uZXJUZXh0ID1cbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0uZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoKVxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaW1lKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgd2VhdGhlciBpY29uXG4gICAgICAgIGNvbnN0IHdlYXRoZXJGb3JlY2FzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgICAgICB3ZWF0aGVyRm9yZWNhc3RJY29uLmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXJGb3JlY2FzdEljb24nKVxuICAgICAgICB3ZWF0aGVyRm9yZWNhc3RJY29uLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0ud2VhdGhlckljb259LnBuZ2BcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKHdlYXRoZXJGb3JlY2FzdEljb24pXG5cbiAgICAgICAgLy8gZGlzcGxheSB3ZWF0aGVyIGRlc2NyaXB0aW9uXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICAgICAgZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24uaW5uZXJUZXh0ID1cbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0ud2VhdGhlckRlc2NyaXB0aW9uXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5hcHBlbmRDaGlsZChmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbilcblxuICAgICAgICAvLyBkaXNwbGF5IGZvcmVjYXN0IHRlbXBlcmF0dXJlXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUZW1wJylcbiAgICAgICAgZm9yZWNhc3RUZW1wLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQoXG4gICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLnRlbXBlcmF0dXJlXG4gICAgICAgICl9XFx1MDBCMGBcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcClcblxuICAgICAgICBmb3JlY2FzdFJvdy5hcHBlbmRDaGlsZChmb3JlY2FzdENlbGwpXG4gICAgfVxufVxuXG5jb25zdCBzZWxlY3RMb2NhdGlvbiA9IChsaSkgPT4ge1xuICAgIC8vIGdyYWIgbG9jYXRpb25zIGFycmF5IGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gZGVzZWxlY3QgYWxsIGxvY2F0aW9uc1xuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gU2VsZWN0IGxvY2F0aW9uIGlmIG9uZSBpcyBjaG9zZW4gKG1haW4gbWVudSBzZWxlY3Rpb24gaXMgaGFuZGxlZCBpbiBldmVudCBsaXN0ZW5lcilcbiAgICBpZiAobGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NhdGlvbicpKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTG9jYXRpb25JZCA9IGxpLmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgICBzdG9yYWdlV2F0Y2hsaXN0W3NlbGVjdGVkTG9jYXRpb25JZF0uc2VsZWN0ZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgLy8gc2V0IGxvY2F0aW9ucyBhcnJheSBiYWNrIGludG8gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIHJlZnJlc2hcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlQWRkQnV0dG9uID0gKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoJ2FkZEJ0bicpXG4gICAgYWRkQnRuLmlubmVyVGV4dCA9ICdzZWFyY2gnXG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHZhbGlkYXRlU2VhcmNoKGUpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRCdG4pXG59XG5cbmNvbnN0IGNyZWF0ZUNhbmNlbEJ1dHRvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdjYW5jZWxCdG4nKVxuICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuICAgIGNhbmNlbEJ0bi5pbm5lclRleHQgPSAnY2FuY2VsJ1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pXG59XG5cbi8vIGNyZWF0ZUZvcm1cbmNvbnN0IGNyZWF0ZUZvcm0gPSAoZm9ybSkgPT4ge1xuICAgIC8vIHJvdyBvbmU6IGFzc2lnbiBpbnB1dFxuICAgIGNvbnN0IGZvcm1Sb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93MS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgbmV3TG9jYXRpb25JbnB1dC5jbGFzc0xpc3QuYWRkKCduZXdMb2NhdGlvbklucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LnBsYWNlaG9sZGVyID0gJ0Zsb3JlbmNlJ1xuICAgIG5ld0xvY2F0aW9uSW5wdXQubmFtZSA9ICduZXdMb2NhdGlvbklucHV0J1xuICAgIGZvcm1Sb3cxLmFwcGVuZENoaWxkKG5ld0xvY2F0aW9uSW5wdXQpXG5cbiAgICAvLyByb3cgdHdvOiBzdWJtaXQgYW5kIGNhbmNlbCBidXR0b25zXG4gICAgY29uc3QgZm9ybVJvdzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdpZCcsICdmb3JtQnV0dG9ucycpXG4gICAgY3JlYXRlQWRkQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuICAgIGNyZWF0ZUNhbmNlbEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcblxuICAgIC8vIHJvdyB0aHJlZTogYXNzaWduIGVycm9yIGNsYXNzIGFuZCB0ZXh0XG4gICAgY29uc3QgZm9ybVJvdzMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3czLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbmV3UHJvakVycm9yQ29udGFpbmVyJylcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzEpXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MilcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3czKVxufVxuXG5jb25zdCBzaG93Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRMb2NhdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkJ0bicpXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uRm9ybScpXG5cbiAgICBhZGRMb2NhdGlvbkJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2hvd0Jsb2NrJylcbn1cblxuY29uc3QgaGlkZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkTG9jYXRpb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25CdG4nKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkZvcm0nKVxuXG4gICAgYWRkTG9jYXRpb25CdG4uc2V0QXR0cmlidXRlKCdpZCcsICdzaG93QmxvY2snKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG59XG5cbi8vIERlbGV0ZSB3YXRjaGxpc3QgZW50cnlcbmNvbnN0IGRlbGV0ZVdhdGNobGlzdEVudHJ5ID0gKGUpID0+IHtcbiAgICAvLyBncmFiIGFycmF5cyBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIElkZW50aWZ5IGVudHJ5IHRvIGRlbGV0ZVxuICAgIGNvbnN0IGRvb21lZEluZGV4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpXG5cbiAgICAvLyBkZWxldGUgZW50cnlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnNwbGljZShkb29tZWRJbmRleCwgMSlcblxuICAgIC8vIHNldCBjaGFuZ2VzIHRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyBJZiBkb29tZWQgZW50cnkgd2FzIHNlbGVjdGVkLCBjbGVhciBjb250ZW50IGRpc3BsYXlcblxuICAgIC8vIHJlZnJlc2ggd2F0Y2hpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlRGVsZXRlSWNvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICAvLyBjcmVhdGUgaW1hZ2UgYW5kIGFzc2lnbiBhdHRyaWJ1dGVzXG4gICAgY29uc3QgbmV3RGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3RGVsZXRlSWNvbi5zcmMgPSBkZWxldGVJY29uXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24gZGVsZXRlSXRlbScpXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuXG4gICAgLy8gQUREIEVWRU5UIExJU1RFTkVSXG4gICAgaWYgKFxuICAgICAgICBjb250YWluZXIuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAnbG9jYXRpb24nIHx8XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2xvY2F0aW9uJylcbiAgICApIHtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXIgdG8gZGVsZXRlIGxvY2F0aW9uXG4gICAgICAgIG5ld0RlbGV0ZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeWAsXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YCxcbiAgICAgICAgICAgIGBoaWRkZW5gXG4gICAgICAgIClcbiAgICAgICAgbmV3RGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PlxuICAgICAgICAgICAgZGVsZXRlV2F0Y2hsaXN0RW50cnkoZSwgaSlcbiAgICAgICAgKVxuICAgICAgICAvLyBkaXNwbGF5IHRyYXNoIGljb24gb24gaG92ZXJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGhpZGUgdHJhc2ggaWNvblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBzdHJhbmdlJylcbiAgICB9XG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdEZWxldGVJY29uKVxufVxuXG5jb25zdCBjcmVhdGVBZGRpdGlvbkljb24gPSAobGkpID0+IHtcbiAgICBjb25zdCBuZXdBZGRpdGlvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0FkZGl0aW9uSWNvbi5zcmMgPSBhZGRpdGlvbkljb25cbiAgICBuZXdBZGRpdGlvbkljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChuZXdBZGRpdGlvbkljb24pXG59XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vIE9wZW53ZWF0aGVyIEFQSSBGdW5jdGlvbnNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZnVuY3Rpb24gdG9EaXJlY3Rpb24oZGVncmVlKSB7XG4gICAgaWYgKGRlZ3JlZSA+IDMzNy41KSByZXR1cm4gJ05vcnRoJ1xuICAgIGlmIChkZWdyZWUgPiAyOTIuNSkgcmV0dXJuICdOb3J0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyNDcuNSkgcmV0dXJuICdXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMDIuNSkgcmV0dXJuICdTb3V0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAxNTcuNSkgcmV0dXJuICdTb3V0aCdcbiAgICBpZiAoZGVncmVlID4gMTIyLjUpIHJldHVybiAnU291dGggRWFzdCdcbiAgICBpZiAoZGVncmVlID4gNjcuNSkgcmV0dXJuICdFYXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMi41KSByZXR1cm4gJ05vcnRoIEVhc3QnXG4gICAgcmV0dXJuICdOb3J0aCdcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjIzNzYxMTUvaG93LXRvLW9idGFpbi1vcGVuLXdlYXRoZXItYXBpLWRhdGUtdGltZS1mcm9tLWNpdHktYmVpbmctZmV0Y2hlZFxuY29uc3QgY2FsY0N1cnJlbnRUaW1lID0gKHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbFRpbWUgPSBkLmdldFRpbWUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSBsb2NhbFRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuY29uc3QgY2FsY1N1blRpbWUgPSAodGltZSwgdGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSB0aW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbmNvbnN0IGZldGNoSG91cmx5Rm9yZWNhc3QgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuICAgIC8vIGZldGNoIGZpdmUgZGF5L3RocmVlIGhvdXIgZm9yZWNhc3RcbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3RBcnJheSA9IFtdXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShyZXNwb25zZS5saXN0W2ldLmR0X3R4dCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUZXh0OiByZXNwb25zZS5saXN0W2ldLmR0X3R4dCxcbiAgICAgICAgICAgICAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICAgICAgcmFpbkNoYW5jZTogcmVzcG9uc2UubGlzdFtpXS5wb3AgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVySWNvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmljb24sXG4gICAgICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcsXG4gICAgICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcpLFxuICAgICAgICAgICAgICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2UubGlzdFtpXS53aW5kLmd1c3QsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2UubGlzdFtpXS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5LnB1c2gobmV3SG91cmx5Rm9yZWNhc3QpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdIb3VybHlGb3JlY2FzdEFycmF5KVxuICAgICAgICAgICAgZGlzcGxheUZvcmVjYXN0KG5ld0hvdXJseUZvcmVjYXN0QXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gbmV3SG91cmx5Rm9yZWNhc3RBcnJheVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgZmV0Y2hDdXJyZW50V2VhdGhlciA9IChjaXR5UXVlcnksIGUpID0+IHtcbiAgICAvLyBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuXG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgY29uc3QgbmV3V2VhdGhlckNhcmQgPSB7XG4gICAgICAgICAgICAgICAgY2l0eTogcmVzcG9uc2UubmFtZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXNwb25zZS5zeXMuY291bnRyeSxcbiAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICBsb2NhbERhdGU6IGNhbGNDdXJyZW50VGltZShyZXNwb25zZS50aW1lem9uZSksXG4gICAgICAgICAgICAgICAgc3VucmlzZTogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5yaXNlICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHN1bnNldDogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5zZXQgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGVtcEN1cnJlbnQ6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICB0ZW1wSGlnaDogcmVzcG9uc2UubWFpbi50ZW1wX21heCxcbiAgICAgICAgICAgICAgICB0ZW1wTG93OiByZXNwb25zZS5tYWluLnRlbXBfbWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgd2VhdGhlckljb246IHJlc3BvbnNlLndlYXRoZXJbMF0uaWNvbixcbiAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS53aW5kLmd1c3QsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBUElJbWFnZS5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2BcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkQnRuJykgPT09IHRydWVcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN1Ym1pdExvY2F0aW9uKFxuICAgICAgICAgICAgICAgICAgICBgJHtuZXdXZWF0aGVyQ2FyZC5jaXR5fSwgJHtuZXdXZWF0aGVyQ2FyZC5jb3VudHJ5fWBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNwbGF5V2VhdGhlcihuZXdXZWF0aGVyQ2FyZClcbiAgICAgICAgICAgIHJldHVybiBuZXdXZWF0aGVyQ2FyZFxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgQVBJQ2l0eVNlYXJjaCA9IChpbnB1dCwgZSkgPT4ge1xuICAgIGZldGNoQ3VycmVudFdlYXRoZXIoaW5wdXQsIGUpXG4gICAgZmV0Y2hIb3VybHlGb3JlY2FzdChpbnB1dClcbn1cblxuY29uc3QgYWRkRGVmYXVsdENvbnRlbnQgPSAoKSA9PiB7XG4gICAgc3VibWl0TG9jYXRpb24oJ1NhbiBGcmFuY2lzY28sIFVTJylcbiAgICBzdWJtaXRMb2NhdGlvbignU2VhdHRsZSwgVVMnKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdIb25vbHVsdSwgVVMnKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdGbG9yZW5jZSwgSVQnKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdBbXN0ZXJkYW0sIE5MJylcbiAgICBzdWJtaXRMb2NhdGlvbignUGFyaXMsIEZSJylcbiAgICBzdWJtaXRMb2NhdGlvbignVG9reW8sIEpQJylcbn1cblxuY29uc3QgdmFsaWRhdGVTZWFyY2ggPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdMb2NhdGlvbklucHV0JylcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG4gICAgLy8gcmVzZXQgZXJyb3JcbiAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJydcbiAgICAvLyBjaGVjayBmb3Igc2VhcmNoIHRlcm1cbiAgICBpZiAobmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcbiAgICB9IGVsc2Uge1xuICAgICAgICBBUElDaXR5U2VhcmNoKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUsIGUpXG4gICAgICAgIGhpZGVGb3JtKClcbiAgICAgICAgbmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9ICcnXG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIGFkZERlZmF1bHRDb250ZW50LFxuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVEZWxldGVJY29uLFxuICAgIGNyZWF0ZUZvcm0sXG4gICAgY3JlYXRlTWVudUljb24sXG4gICAgZGlzcGxheVdhdGNobGlzdCxcbiAgICBoaWRlRm9ybSxcbiAgICBzaG93Rm9ybSxcbiAgICBzdWJtaXRMb2NhdGlvbixcbiAgICB2YWxpZGF0ZVNlYXJjaCxcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IGNyZWF0ZUFkZGl0aW9uSWNvbiwgY3JlYXRlRm9ybSB9IGZyb20gJy4vaGVscGVyRnVuY3Rpb25zJ1xuaW1wb3J0IGdpdGh1Ykljb24gZnJvbSAnLi9hc3NldHMvR2l0SHViLWxpZ2h0LTMycHgucG5nJ1xuaW1wb3J0IGxvZ29JY29uIGZyb20gJy4vYXNzZXRzL2xvZ29JY29uLnN2ZydcblxuY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpXG5cbiAgICAvLyBkaXNwbGF5IGxvZ29cbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBsb2dvLnNyYyA9IGxvZ29JY29uXG4gICAgbG9nby50YXJnZXQgPSAnX2JsYW5rJ1xuICAgIGxvZ28uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsb2dvJylcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbylcblxuICAgIC8vIGRpc3BsYXkgdGl0bGVcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdXZWF0aGVyc2VydmUnXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKVxuXG4gICAgcmV0dXJuIGhlYWRlclxufVxuXG5jb25zdCBjcmVhdGVNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1lbnUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtZW51JylcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgaGVhZGVyXG4gICAgY29uc3Qgd2F0Y2hsaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0SGVhZGVyJylcbiAgICB3YXRjaGxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSAnV2F0Y2hsaXN0J1xuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBtZW51XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBjb250YWluZXJcbiAgICBjb25zdCBhZGRMb2NhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG5cbiAgICAvLyBHZW5lcmF0ZSBhZGQgbG9jYXRpb24gYnV0dG9uXG4gICAgY29uc3QgYWRkTG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgYWRkTG9jYXRpb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkJ0bicpXG4gICAgY3JlYXRlQWRkaXRpb25JY29uKGFkZExvY2F0aW9uKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGFkZExvY2F0aW9uVGV4dC5pbm5lclRleHQgPSAnQWRkIExvY2F0aW9uJ1xuICAgIGFkZExvY2F0aW9uLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uVGV4dClcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbilcblxuICAgIC8vIEdlbmVyYXRlIGFuZCBoaWRlIG5ldyBsb2NhdGlvbiBmb3JtXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkTG9jYXRpb25Gb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5tZXRob2QgPSAnZ2V0J1xuICAgIGNyZWF0ZUZvcm0oYWRkTG9jYXRpb25Gb3JtKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uRm9ybSlcblxuICAgIG1lbnUuYXBwZW5kQ2hpbGQod2F0Y2hsaXN0SGVhZGVyKVxuICAgIG1lbnUuYXBwZW5kQ2hpbGQod2F0Y2hsaXN0KVxuICAgIG1lbnUuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Db250YWluZXIpXG5cbiAgICByZXR1cm4gbWVudVxufVxuXG5jb25zdCBjcmVhdGVXZWF0aGVyQ2FyZCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgV2VhdGhlciBBUEkgY29udGFpbmVyXG4gICAgY29uc3QgV2VhdGhlckFQSUNvbnRhaW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmNsYXNzTGlzdC5hZGQoJ1dlYXRoZXJBUElDb250YWludGVyJywgJ2NvbnRlbnQnKVxuXG4gICAgLy8gY3JlYXRlIEFQSSB0aXRsZVxuICAgIGNvbnN0IEFQSVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKVxuICAgIEFQSVRpdGxlLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnRUaXRsZScpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJVGl0bGUpXG5cbiAgICAvLyBjcmVhdGUgQVBJIGltZ1xuICAgIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBBUElJbWFnZS5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZScpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpXG5cbiAgICAvLyBjcmVhdGUgY3VycmVudCB0ZW1wIGNvbnRhaW5lclxuICAgIGNvbnN0IHRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpXG4gICAgdGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0ZW1wQ29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZCh0ZW1wQ29udGFpbmVyKVxuXG4gICAgLy8gV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcblxuICAgIC8vIGNyZWF0ZSBkZXNjcmlwdGlvbiBjb250YWluZXJcbiAgICBjb25zdCBkZXNjcmlwdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGRlc2NyaXB0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXJEZXNjcmlwdGlvbicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25Db250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgbG93IHRlbXAgY29udGFpbmVyXG4gICAgY29uc3QgbG93VGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGxvd1RlbXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbG93VGVtcENvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQobG93VGVtcENvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBoaWdoIHRlbXAgY29udGFpbmVyXG4gICAgY29uc3QgaGlnaFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBoaWdoVGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWdoVGVtcENvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoaGlnaFRlbXBDb250YWluZXIpXG5cbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKVxuXG4gICAgLy8gY3JlYXRlIGN1cnJlbnQgdGltZSBjb250YWluZXJcbiAgICBjb25zdCB0aW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgdGltZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0aW1lQ29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZCh0aW1lQ29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIHN1bnJpc2UgY29udGFpbmVyXG4gICAgY29uc3Qgc3VucmlzZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHN1bnJpc2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3VucmlzZUNvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoc3VucmlzZUNvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBzdW5zZXQgY29udGFpbmVyXG4gICAgY29uc3Qgc3Vuc2V0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgc3Vuc2V0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1bnNldENvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoc3Vuc2V0Q29udGFpbmVyKVxuXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcblxuICAgIC8vIGNyZWF0ZSB3aW5kIGNvbnRhaW5lclxuICAgIGNvbnN0IHdpbmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICB3aW5kQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3dpbmRDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHdpbmRDb250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgaHVtaWRpdHkgY29udGFpbmVyXG4gICAgY29uc3QgaHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBodW1pZGl0eUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdodW1pZGl0eUNvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoaHVtaWRpdHlDb250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgZm9yZWNhc3QgY29udGFpbmVyXG4gICAgY29uc3QgZm9yZWNhc3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcbiAgICBmb3JlY2FzdFRpdGxlLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0VGl0bGUnKVxuICAgIGZvcmVjYXN0VGl0bGUuaW5uZXJUZXh0ID0gJ0ZpdmUgZGF5LCB0aHJlZSBob3VyIGZvcmVjYXN0OidcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChmb3JlY2FzdFRpdGxlKVxuXG4gICAgY29uc3QgZm9yZWNhc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcmVjYXN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Q29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChmb3JlY2FzdENvbnRhaW5lcilcblxuICAgIGNvbnN0IGZvcmVjYXN0VGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXG4gICAgZm9yZWNhc3RUYWJsZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRhYmxlJylcbiAgICBmb3JlY2FzdENvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JlY2FzdFRhYmxlKVxuXG4gICAgY29uc3QgZm9yZWNhc3RSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG4gICAgZm9yZWNhc3RSb3cuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RSb3cnKVxuICAgIGZvcmVjYXN0VGFibGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3RSb3cpXG5cbiAgICAvLyBtYWtlIHNjcm9sbHdoZWVsIGZ1bmN0aW9uYWwgd2l0aCBob3Jpem9udGFsIHNjcm9sbGluZ1xuICAgIGZvcmVjYXN0Um93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGZvcmVjYXN0Um93LnNjcm9sbExlZnQgKz0gZS5kZWx0YVlcbiAgICB9KVxuXG4gICAgcmV0dXJuIFdlYXRoZXJBUElDb250YWludGVyXG59XG5cbmNvbnN0IGNyZWF0ZUNvbnRlbnQgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIGNvbnRlbnQgY29udGFpbmVyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250ZW50JylcblxuICAgIC8vIGRpc3BsYXkgd2VhdGhlciBjYXJkXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQ2FyZCgpKVxuXG4gICAgcmV0dXJuIGNvbnRlbnRcbn1cblxuY29uc3QgY3JlYXRlRm9vdGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpXG5cbiAgICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBjb3B5cmlnaHQudGV4dENvbnRlbnQgPSBgQ29weXJpZ2h0IMKpICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBqY2FtcGJlbGw1N2BcblxuICAgIGNvbnN0IGdpdGh1YkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBnaXRodWJMaW5rLmhyZWYgPSAnaHR0cHM6Ly9naXRodWIuY29tL2pjYW1wYmVsbDU3J1xuICAgIGdpdGh1YkxpbmsudGFyZ2V0ID0gJ19ibGFuaydcblxuICAgIGNvbnN0IG5ld0dpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0dpdGh1Ykljb24uc3JjID0gZ2l0aHViSWNvblxuICAgIG5ld0dpdGh1Ykljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdnaXRodWInKVxuXG4gICAgZ2l0aHViTGluay5hcHBlbmRDaGlsZChuZXdHaXRodWJJY29uKVxuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChjb3B5cmlnaHQpXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGdpdGh1YkxpbmspXG5cbiAgICByZXR1cm4gZm9vdGVyXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZU1lbnUoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUNvbnRlbnQoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUZvb3RlcigpKVxufVxuIl0sIm5hbWVzIjpbImFkZGl0aW9uSWNvbiIsImRlbGV0ZUljb24iLCJtZW51SWNvbiIsImRvY3VtZW50IiwiY29va2llIiwiY3JlYXRlTWVudUljb24iLCJsaSIsImNoZWNrbGlzdEljb24iLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVMaXN0aW5nIiwibG9jYXRpb25OYW1lIiwiaSIsIndhdGNobGlzdCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2NhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsInNlbGVjdGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsInNlbGVjdExvY2F0aW9uIiwibG9jYXRpb25UZXh0IiwidGV4dENvbnRlbnQiLCJuYW1lIiwiY3JlYXRlRGVsZXRlSWNvbiIsImRpc3BsYXlXYXRjaGxpc3QiLCJvbGRMaXN0aW5nQ291bnQiLCJjaGlsZEVsZW1lbnRDb3VudCIsImZpcnN0Q2hpbGQiLCJyZW1vdmUiLCJzdG9yYWdlV2F0Y2hsaXN0IiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImZvckVhY2giLCJBUElDaXR5U2VhcmNoIiwic3VibWl0TG9jYXRpb24iLCJpbnB1dCIsIm5ld0xvY2F0aW9uIiwicHVzaCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJkaXNwbGF5V2VhdGhlciIsIm5ld1dlYXRoZXJDYXJkIiwiY29udGVudFRpdGxlIiwiY2l0eSIsImNvdW50cnkiLCJBUElJbWFnZSIsIndlYXRoZXJJY29uIiwid2VhdGhlckRlc2NyaXB0aW9uIiwiaW5uZXJUZXh0IiwidGVtcENvbnRhaW5lciIsIk1hdGgiLCJyb3VuZCIsInRlbXBDdXJyZW50IiwibG93VGVtcENvbnRhaW5lciIsInRlbXBMb3ciLCJoaWdoVGVtcENvbnRhaW5lciIsInRlbXBIaWdoIiwidGltZUNvbnRhaW5lciIsImxvY2FsRGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsInN1bnJpc2VDb250YWluZXIiLCJzdW5yaXNlIiwic3Vuc2V0Q29udGFpbmVyIiwic3Vuc2V0Iiwid2luZENvbnRhaW5lciIsIndpbmRTcGVlZCIsIndpbmREaXJlY3Rpb24iLCJ3aW5kRGVncmVlIiwiaHVtaWRpdHlDb250YWluZXIiLCJodW1pZGl0eSIsImRpc3BsYXlGb3JlY2FzdCIsIm5ld0hvdXJseUZvcmVjYXN0QXJyYXkiLCJmb3JlY2FzdFJvdyIsIm9sZEZvcmVjYXN0IiwibGVuZ3RoIiwiZm9yZWNhc3RDZWxsIiwiZm9yZWNhc3REYXRlIiwiZGF0ZSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImZvcmVjYXN0VGltZSIsInRvTG9jYWxlVGltZVN0cmluZyIsIndlYXRoZXJGb3JlY2FzdEljb24iLCJmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbiIsImZvcmVjYXN0VGVtcCIsInRlbXBlcmF0dXJlIiwic2VsZWN0ZWRMb2NhdGlvbklkIiwiZ2V0QXR0cmlidXRlIiwiY3JlYXRlQWRkQnV0dG9uIiwiY29udGFpbmVyIiwiYWRkQnRuIiwidmFsaWRhdGVTZWFyY2giLCJjcmVhdGVDYW5jZWxCdXR0b24iLCJjYW5jZWxCdG4iLCJjcmVhdGVGb3JtIiwiZm9ybSIsImZvcm1Sb3cxIiwibmV3TG9jYXRpb25JbnB1dCIsInBsYWNlaG9sZGVyIiwiZm9ybVJvdzIiLCJmb3JtUm93MyIsInNob3dGb3JtIiwiYWRkTG9jYXRpb25CdG4iLCJhZGRMb2NhdGlvbkZvcm0iLCJoaWRlRm9ybSIsImRlbGV0ZVdhdGNobGlzdEVudHJ5IiwiZG9vbWVkSW5kZXgiLCJzcGxpY2UiLCJuZXdEZWxldGVJY29uIiwidHJhc2hJY29uIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZUFkZGl0aW9uSWNvbiIsIm5ld0FkZGl0aW9uSWNvbiIsInRvRGlyZWN0aW9uIiwiZGVncmVlIiwiY2FsY0N1cnJlbnRUaW1lIiwidGltZXpvbmUiLCJkIiwiRGF0ZSIsImxvY2FsVGltZSIsImdldFRpbWUiLCJsb2NhbE9mZnNldCIsImdldFRpbWV6b25lT2Zmc2V0IiwidXRjIiwibmV3Q2l0eSIsImNhbGNTdW5UaW1lIiwidGltZSIsImZldGNoSG91cmx5Rm9yZWNhc3QiLCJjaXR5UXVlcnkiLCJuZXdQcm9qRXJyb3JDb250YWluZXIiLCJmZXRjaCIsIm1vZGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwibmV3SG91cmx5Rm9yZWNhc3QiLCJsaXN0IiwiZHRfdHh0IiwiZGF0ZVRleHQiLCJtYWluIiwicmFpbkNoYW5jZSIsInBvcCIsInRlbXAiLCJ3ZWF0aGVyQ29uZGl0aW9uIiwid2VhdGhlciIsImRlc2NyaXB0aW9uIiwiaWNvbiIsIndpbmQiLCJkZWciLCJ3aW5kR3VzdCIsImd1c3QiLCJzcGVlZCIsImNhdGNoIiwiZXJyIiwiZmV0Y2hDdXJyZW50V2VhdGhlciIsInN5cyIsInRlbXBfbWF4IiwidGVtcF9taW4iLCJ1bmRlZmluZWQiLCJhZGREZWZhdWx0Q29udGVudCIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJnaXRodWJJY29uIiwibG9nb0ljb24iLCJjcmVhdGVIZWFkZXIiLCJoZWFkZXIiLCJsb2dvIiwidGl0bGUiLCJjcmVhdGVNZW51IiwibWVudSIsIndhdGNobGlzdEhlYWRlciIsImFkZExvY2F0aW9uQ29udGFpbmVyIiwiYWRkTG9jYXRpb24iLCJhZGRMb2NhdGlvblRleHQiLCJtZXRob2QiLCJjcmVhdGVXZWF0aGVyQ2FyZCIsIldlYXRoZXJBUElDb250YWludGVyIiwiQVBJVGl0bGUiLCJkZXNjcmlwdGlvbkNvbnRhaW5lciIsImZvcmVjYXN0VGl0bGUiLCJmb3JlY2FzdENvbnRhaW5lciIsImZvcmVjYXN0VGFibGUiLCJzY3JvbGxMZWZ0IiwiZGVsdGFZIiwiY3JlYXRlQ29udGVudCIsImNvbnRlbnQiLCJjcmVhdGVGb290ZXIiLCJmb290ZXIiLCJjb3B5cmlnaHQiLCJnZXRGdWxsWWVhciIsImdpdGh1YkxpbmsiLCJocmVmIiwibmV3R2l0aHViSWNvbiIsImluaXRpYWxpemUiLCJib2R5Il0sInNvdXJjZVJvb3QiOiIifQ==