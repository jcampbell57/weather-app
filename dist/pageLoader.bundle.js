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
  submitLocation('San Francisco, US'); // submitLocation('Seattle')
  // submitLocation('Honolulu')
  // submitLocation('Florence')
  // submitLocation('Amsterdam')
  // submitLocation('Paris')
  // submitLocation('Tokyo')
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

  const APITitle = document.createElement('h2');
  APITitle.classList.add('contentTitle');
  WeatherAPIContainter.appendChild(APITitle); // create API img

  const APIImage = document.createElement('img');
  APIImage.classList.add('APIImage');
  WeatherAPIContainter.appendChild(APIImage); // create current temp container

  const tempContainer = document.createElement('h1');
  tempContainer.classList.add('tempContainer');
  WeatherAPIContainter.appendChild(tempContainer);
  WeatherAPIContainter.appendChild(document.createElement('br')); // create description container

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTBCbUssWUFBWSxFQUF0QztFQUNBM0ssUUFBUSxDQUFDeU0sSUFBVCxDQUFjak0sV0FBZCxDQUEwQnVLLFVBQVUsRUFBcEM7RUFDQS9LLFFBQVEsQ0FBQ3lNLElBQVQsQ0FBY2pNLFdBQWQsQ0FBMEJ1TCxhQUFhLEVBQXZDO0VBQ0EvTCxRQUFRLENBQUN5TSxJQUFULENBQWNqTSxXQUFkLENBQTBCeUwsWUFBWSxFQUF0QztBQUNILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZGl0aW9uSWNvbiBmcm9tICcuL2Fzc2V0cy9wbHVzLnN2ZydcbmltcG9ydCBkZWxldGVJY29uIGZyb20gJy4vYXNzZXRzL2RlbGV0ZS5zdmcnXG5pbXBvcnQgbWVudUljb24gZnJvbSAnLi9hc3NldHMvbWVudUljb24uc3ZnJ1xuXG5kb2N1bWVudC5jb29raWUgPSAnU2FtZVNpdGU9TGF4J1xuXG5jb25zdCBjcmVhdGVNZW51SWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrbGlzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGNoZWNrbGlzdEljb24uc3JjID0gbWVudUljb25cbiAgICBjaGVja2xpc3RJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tsaXN0SWNvbilcbn1cblxuLy8gQWRkIHNpbmdsZSBsb2NhdGlvbiB0byB3YXRjaGxpc3QgKGNhbGxlZCBiZWxvdylcbmNvbnN0IGNyZWF0ZUxpc3RpbmcgPSAobG9jYXRpb25OYW1lLCBpKSA9PiB7XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKGBsb2NhdGlvbmApXG4gICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICAvLyBhc3NpZ24gY2xhc3MgdG8gc2VsZWN0ZWQgbG9jYXRpb24gbGlzdGluZ1xuICAgIGlmIChsb2NhdGlvbk5hbWUuc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICAvLyBzZWxlY3RMb2NhdGlvbihsb2NhdGlvbilcbiAgICB9XG5cbiAgICAvLyBldmVudCBsaXN0ZW5lciB0byBkaXNwbGF5IHNlbGVjdGVkIGxvY2F0aW9uJ3Mgd2VhdGhlclxuICAgIGxvY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gaWYgZGVsZXRpbmcgbGlzdGluZywgZG8gbm90IGRpc3BsYXkgd2VhdGhlclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGVJdGVtJykpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKVxuICAgIH0pXG5cbiAgICBjcmVhdGVNZW51SWNvbihsb2NhdGlvbilcbiAgICBjb25zdCBsb2NhdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBsb2NhdGlvblRleHQudGV4dENvbnRlbnQgPSBsb2NhdGlvbk5hbWUubmFtZVxuICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKGxvY2F0aW9uVGV4dClcbiAgICBjcmVhdGVEZWxldGVJY29uKGxvY2F0aW9uLCBpKVxuICAgIHdhdGNobGlzdC5hcHBlbmRDaGlsZChsb2NhdGlvbilcbn1cblxuLy8gRGlzcGxheSBlbnRpcmUgYXJyYXkgb2YgbG9jYXRpb25zIHRvIHdhdGNobGlzdFxuY29uc3QgZGlzcGxheVdhdGNobGlzdCA9ICgpID0+IHtcbiAgICAvLyBHcmFiIHdhdGNobGlzdFxuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3YXRjaGxpc3QnKVxuXG4gICAgLy8gQ2xlYXIgbG9jYXRpb24gbGlzdGluZ3NcbiAgICBjb25zdCBvbGRMaXN0aW5nQ291bnQgPSB3YXRjaGxpc3QuY2hpbGRFbGVtZW50Q291bnRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZExpc3RpbmdDb3VudDsgaSsrKSB7XG4gICAgICAgIHdhdGNobGlzdC5maXJzdENoaWxkLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgLy8gQXBwZW5kIGFsbCBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG4gICAgbGV0IGkgPSAwXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG4gICAgLy8gY29uc29sZS5sb2coc3RvcmFnZVdhdGNobGlzdClcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGNyZWF0ZUxpc3RpbmcobG9jYXRpb24sIGkpXG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgQVBJQ2l0eVNlYXJjaChsb2NhdGlvbi5uYW1lKVxuICAgICAgICB9XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgICBpKytcbiAgICB9KVxufVxuXG5jb25zdCBzdWJtaXRMb2NhdGlvbiA9IChpbnB1dCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBsb2NhdGlvbiBvYmplY3RcbiAgICBjb25zdCBuZXdMb2NhdGlvbiA9IHtcbiAgICAgICAgbmFtZTogaW5wdXQsXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgIH1cblxuICAgIC8vIGdyYWIgYXJyYXkgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBkZXNlbGVjdCBwcmV2aW91c2x5IHNlbGVjdGVkIGxvY2F0aW9uXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBwdXNoIGxvY2F0aW9uIHRvIGFycmF5XG4gICAgc3RvcmFnZVdhdGNobGlzdC5wdXNoKG5ld0xvY2F0aW9uKVxuICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2VXYXRjaGxpc3QpXG5cbiAgICAvLyBzZXQgYXJyYXkgYmFjayBpbnRvIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gcmVmcmVzaCB3YXRjaGxpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgZGlzcGxheVdlYXRoZXIgPSAobmV3V2VhdGhlckNhcmQpID0+IHtcbiAgICAvLyBkaXNwbGF5IGNvbnRlbnQgdGl0bGVcbiAgICBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJylcbiAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSBgJHtuZXdXZWF0aGVyQ2FyZC5jaXR5fSwgJHtuZXdXZWF0aGVyQ2FyZC5jb3VudHJ5fWBcblxuICAgIC8vIGRpc3BsYXkgd2VhdGhlciBpY29uXG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKVxuICAgIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25ld1dlYXRoZXJDYXJkLndlYXRoZXJJY29ufUAyeC5wbmdgXG5cbiAgICAvLyBkaXNwbGF5IGRlc2NyaXB0aW9uXG4gICAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJEZXNjcmlwdGlvbicpXG4gICAgd2VhdGhlckRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IGBXZWF0aGVyOiAke25ld1dlYXRoZXJDYXJkLndlYXRoZXJEZXNjcmlwdGlvbn1gXG5cbiAgICAvLyBkaXNwbGF5IGN1cnJlbnQgdGVtcGVyYXR1cmVcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBDb250YWluZXInKVxuICAgIHRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZChuZXdXZWF0aGVyQ2FyZC50ZW1wQ3VycmVudCl9XFx1MDBCMGBcblxuICAgIC8vIGRpc3BsYXkgaGlnaC9sb3cgdGVtcGVyYXR1cmVzXG4gICAgY29uc3QgbG93VGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb3dUZW1wQ29udGFpbmVyJylcbiAgICBsb3dUZW1wQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb3cgdGVtcGVyYXR1cmU6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcExvd1xuICAgICl9XFx1MDBCMGBcbiAgICBjb25zdCBoaWdoVGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWdoVGVtcENvbnRhaW5lcicpXG4gICAgaGlnaFRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYEhpZ2ggdGVtcGVyYXR1cmU6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcEhpZ2hcbiAgICApfVxcdTAwQjBgXG5cbiAgICAvLyBkaXBsYXkgY3VycmVudCB0aW1lXG4gICAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lQ29udGFpbmVyJylcbiAgICB0aW1lQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb2NhbCB0aW1lOiAke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSBzdW5yaXNlL3N1bnNldCB0aW1lc1xuICAgIGNvbnN0IHN1bnJpc2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VucmlzZUNvbnRhaW5lcicpXG4gICAgc3VucmlzZUNvbnRhaW5lci5pbm5lclRleHQgPSBgU3VucmlzZTogJHtuZXdXZWF0aGVyQ2FyZC5zdW5yaXNlLmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQuc3VucmlzZS5nZXRNaW51dGVzKCl9YFxuICAgIGNvbnN0IHN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdW5zZXRDb250YWluZXInKVxuICAgIHN1bnNldENvbnRhaW5lci5pbm5lclRleHQgPSBgU3Vuc2V0OiAke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSB3aW5kXG4gICAgY29uc3Qgd2luZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kQ29udGFpbmVyJylcbiAgICB3aW5kQ29udGFpbmVyLmlubmVyVGV4dCA9IGBXaW5kOiAke01hdGgucm91bmQoXG4gICAgICAgIG5ld1dlYXRoZXJDYXJkLndpbmRTcGVlZFxuICAgICl9bXBoLCAke25ld1dlYXRoZXJDYXJkLndpbmREaXJlY3Rpb259ICgke25ld1dlYXRoZXJDYXJkLndpbmREZWdyZWV9XFx1MDBCMClgXG5cbiAgICAvLyBkaXNwbGF5IGh1bWlkaXR5XG4gICAgY29uc3QgaHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHlDb250YWluZXInKVxuICAgIGh1bWlkaXR5Q29udGFpbmVyLmlubmVyVGV4dCA9IGBIdW1pZGl0eTogJHtuZXdXZWF0aGVyQ2FyZC5odW1pZGl0eX0lYFxufVxuXG5jb25zdCBkaXNwbGF5Rm9yZWNhc3QgPSAobmV3SG91cmx5Rm9yZWNhc3RBcnJheSkgPT4ge1xuICAgIGNvbnN0IGZvcmVjYXN0Um93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcmVjYXN0Um93JylcblxuICAgIC8vIHJlbW92ZSBhbnkgZm9yZWNhc3QgY2VsbHNcbiAgICBjb25zdCBvbGRGb3JlY2FzdCA9IGZvcmVjYXN0Um93LmNoaWxkRWxlbWVudENvdW50XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRGb3JlY2FzdDsgaSsrKSB7XG4gICAgICAgIGZvcmVjYXN0Um93LmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvLyBBZGQgbmV3IGZvcmVjYXN0IGNlbGxzXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdIb3VybHlGb3JlY2FzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgZm9yZWNhc3RDZWxsLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Q2VsbCcpXG5cbiAgICAgICAgLy8gZGlzcGxheSBkYXRlXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdERhdGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3REYXRlJylcbiAgICAgICAgZm9yZWNhc3REYXRlLmlubmVyVGV4dCA9IGAke1xuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS5kYXRlLmdldE1vbnRoKCkgKyAxXG4gICAgICAgIH0vJHtuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLmRhdGUuZ2V0RGF0ZSgpfWBcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0RGF0ZSlcblxuICAgICAgICAvLyBkaXNwbGF5IHRpbWVcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0VGltZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRpbWUnKVxuICAgICAgICBmb3JlY2FzdFRpbWUuaW5uZXJUZXh0ID1cbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0uZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoKVxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaW1lKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgd2VhdGhlciBpY29uXG4gICAgICAgIGNvbnN0IHdlYXRoZXJGb3JlY2FzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgICAgICB3ZWF0aGVyRm9yZWNhc3RJY29uLmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXJGb3JlY2FzdEljb24nKVxuICAgICAgICB3ZWF0aGVyRm9yZWNhc3RJY29uLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0ud2VhdGhlckljb259LnBuZ2BcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKHdlYXRoZXJGb3JlY2FzdEljb24pXG5cbiAgICAgICAgLy8gZGlzcGxheSB3ZWF0aGVyIGRlc2NyaXB0aW9uXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICAgICAgZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24uaW5uZXJUZXh0ID1cbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0ud2VhdGhlckRlc2NyaXB0aW9uXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5hcHBlbmRDaGlsZChmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbilcblxuICAgICAgICAvLyBkaXNwbGF5IGZvcmVjYXN0IHRlbXBlcmF0dXJlXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUZW1wJylcbiAgICAgICAgZm9yZWNhc3RUZW1wLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQoXG4gICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLnRlbXBlcmF0dXJlXG4gICAgICAgICl9XFx1MDBCMGBcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcClcblxuICAgICAgICBmb3JlY2FzdFJvdy5hcHBlbmRDaGlsZChmb3JlY2FzdENlbGwpXG4gICAgfVxufVxuXG5jb25zdCBzZWxlY3RMb2NhdGlvbiA9IChsaSkgPT4ge1xuICAgIC8vIGdyYWIgbG9jYXRpb25zIGFycmF5IGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gZGVzZWxlY3QgYWxsIGxvY2F0aW9uc1xuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gU2VsZWN0IGxvY2F0aW9uIGlmIG9uZSBpcyBjaG9zZW4gKG1haW4gbWVudSBzZWxlY3Rpb24gaXMgaGFuZGxlZCBpbiBldmVudCBsaXN0ZW5lcilcbiAgICBpZiAobGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NhdGlvbicpKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTG9jYXRpb25JZCA9IGxpLmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgICBzdG9yYWdlV2F0Y2hsaXN0W3NlbGVjdGVkTG9jYXRpb25JZF0uc2VsZWN0ZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgLy8gc2V0IGxvY2F0aW9ucyBhcnJheSBiYWNrIGludG8gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIHJlZnJlc2hcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlQWRkQnV0dG9uID0gKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoJ2FkZEJ0bicpXG4gICAgYWRkQnRuLmlubmVyVGV4dCA9ICdzZWFyY2gnXG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHZhbGlkYXRlU2VhcmNoKGUpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRCdG4pXG59XG5cbmNvbnN0IGNyZWF0ZUNhbmNlbEJ1dHRvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdjYW5jZWxCdG4nKVxuICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuICAgIGNhbmNlbEJ0bi5pbm5lclRleHQgPSAnY2FuY2VsJ1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pXG59XG5cbi8vIGNyZWF0ZUZvcm1cbmNvbnN0IGNyZWF0ZUZvcm0gPSAoZm9ybSkgPT4ge1xuICAgIC8vIHJvdyBvbmU6IGFzc2lnbiBpbnB1dFxuICAgIGNvbnN0IGZvcm1Sb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93MS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgbmV3TG9jYXRpb25JbnB1dC5jbGFzc0xpc3QuYWRkKCduZXdMb2NhdGlvbklucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LnBsYWNlaG9sZGVyID0gJ0Zsb3JlbmNlJ1xuICAgIG5ld0xvY2F0aW9uSW5wdXQubmFtZSA9ICduZXdMb2NhdGlvbklucHV0J1xuICAgIGZvcm1Sb3cxLmFwcGVuZENoaWxkKG5ld0xvY2F0aW9uSW5wdXQpXG5cbiAgICAvLyByb3cgdHdvOiBzdWJtaXQgYW5kIGNhbmNlbCBidXR0b25zXG4gICAgY29uc3QgZm9ybVJvdzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdpZCcsICdmb3JtQnV0dG9ucycpXG4gICAgY3JlYXRlQWRkQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuICAgIGNyZWF0ZUNhbmNlbEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcblxuICAgIC8vIHJvdyB0aHJlZTogYXNzaWduIGVycm9yIGNsYXNzIGFuZCB0ZXh0XG4gICAgY29uc3QgZm9ybVJvdzMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIC8vIGZvcm1Sb3czLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBmb3JtUm93My5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ25ld1Byb2pFcnJvckNvbnRhaW5lcicpXG4gICAgLy8gZm9ybVJvdzMuaW5uZXJUZXh0ID0gJ1doaWNoIGNpdHk/J1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MSlcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cyKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzMpXG59XG5cbmNvbnN0IHNob3dGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZExvY2F0aW9uQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uQnRuJylcbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25Gb3JtJylcblxuICAgIGFkZExvY2F0aW9uQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdzaG93QmxvY2snKVxufVxuXG5jb25zdCBoaWRlRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRMb2NhdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkJ0bicpXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uRm9ybScpXG5cbiAgICBhZGRMb2NhdGlvbkJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Nob3dCbG9jaycpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbn1cblxuLy8gRGVsZXRlIHdhdGNobGlzdCBlbnRyeVxuY29uc3QgZGVsZXRlV2F0Y2hsaXN0RW50cnkgPSAoZSkgPT4ge1xuICAgIC8vIGdyYWIgYXJyYXlzIGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gSWRlbnRpZnkgZW50cnkgdG8gZGVsZXRlXG4gICAgY29uc3QgZG9vbWVkSW5kZXggPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJylcbiAgICAvLyBjb25zdCBkb29tZWROYW1lID0gc3RvcmFnZVdhdGNobGlzdFtkb29tZWRJbmRleF0ubmFtZTtcblxuICAgIC8vIGRlbGV0ZSBlbnRyeVxuICAgIHN0b3JhZ2VXYXRjaGxpc3Quc3BsaWNlKGRvb21lZEluZGV4LCAxKVxuXG4gICAgLy8gc2V0IGNoYW5nZXMgdG8gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIElmIGRvb21lZCBlbnRyeSB3YXMgc2VsZWN0ZWQsIGNsZWFyIGNvbnRlbnQgZGlzcGxheVxuICAgIC8vIGNvbnN0IGNvbnRlbnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50VGl0bGUnKTtcbiAgICAvLyBjb25zdCBhbGxUYXNrc0NsYXNzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGxUYXNrcycpLmNsYXNzTGlzdFxuICAgIC8vIGlmIChjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPT09IGRvb21lZE5hbWUpIHtcbiAgICAvLyAgICAgY29udGVudFRpdGxlLnRleHRDb250ZW50ID0gJ0FsbCB0YXNrcydcbiAgICAvLyAgICAgYWxsVGFza3NDbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgLy8gfVxuXG4gICAgLy8gcmVmcmVzaCB3YXRjaGlzdFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBjcmVhdGVEZWxldGVJY29uID0gKGNvbnRhaW5lciwgaSkgPT4ge1xuICAgIC8vIGNyZWF0ZSBpbWFnZSBhbmQgYXNzaWduIGF0dHJpYnV0ZXNcbiAgICBjb25zdCBuZXdEZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdEZWxldGVJY29uLnNyYyA9IGRlbGV0ZUljb25cbiAgICBuZXdEZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbiBkZWxldGVJdGVtJylcbiAgICBuZXdEZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG5cbiAgICAvLyBBREQgRVZFTlQgTElTVEVORVJcbiAgICBpZiAoXG4gICAgICAgIGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdsb2NhdGlvbicgfHxcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnbG9jYXRpb24nKVxuICAgICkge1xuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lciB0byBkZWxldGUgbG9jYXRpb25cbiAgICAgICAgbmV3RGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgYGRlbGV0ZVdhdGNobGlzdEVudHJ5YCxcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gLFxuICAgICAgICAgICAgYGhpZGRlbmBcbiAgICAgICAgKVxuICAgICAgICBuZXdEZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+XG4gICAgICAgICAgICBkZWxldGVXYXRjaGxpc3RFbnRyeShlLCBpKVxuICAgICAgICApXG4gICAgICAgIC8vIGRpc3BsYXkgdHJhc2ggaWNvbiBvbiBob3ZlclxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICAgICAgLy8gaGlkZSB0cmFzaCBpY29uXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICBgLmRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHN0cmFuZ2UnKVxuICAgIH1cbiAgICAvLyBhcHBlbmQgdG8gY29udGFpbmVyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0RlbGV0ZUljb24pXG59XG5cbmNvbnN0IGNyZWF0ZUFkZGl0aW9uSWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IG5ld0FkZGl0aW9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3QWRkaXRpb25JY29uLnNyYyA9IGFkZGl0aW9uSWNvblxuICAgIG5ld0FkZGl0aW9uSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24nKVxuICAgIGxpLmFwcGVuZENoaWxkKG5ld0FkZGl0aW9uSWNvbilcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gT3BlbndlYXRoZXIgQVBJIEZ1bmN0aW9uc1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiB0b0RpcmVjdGlvbihkZWdyZWUpIHtcbiAgICBpZiAoZGVncmVlID4gMzM3LjUpIHJldHVybiAnTm9ydGgnXG4gICAgaWYgKGRlZ3JlZSA+IDI5Mi41KSByZXR1cm4gJ05vcnRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDI0Ny41KSByZXR1cm4gJ1dlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIwMi41KSByZXR1cm4gJ1NvdXRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDE1Ny41KSByZXR1cm4gJ1NvdXRoJ1xuICAgIGlmIChkZWdyZWUgPiAxMjIuNSkgcmV0dXJuICdTb3V0aCBFYXN0J1xuICAgIGlmIChkZWdyZWUgPiA2Ny41KSByZXR1cm4gJ0Vhc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIyLjUpIHJldHVybiAnTm9ydGggRWFzdCdcbiAgICByZXR1cm4gJ05vcnRoJ1xufVxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MjM3NjExNS9ob3ctdG8tb2J0YWluLW9wZW4td2VhdGhlci1hcGktZGF0ZS10aW1lLWZyb20tY2l0eS1iZWluZy1mZXRjaGVkXG5jb25zdCBjYWxjQ3VycmVudFRpbWUgPSAodGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsVGltZSA9IGQuZ2V0VGltZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IGxvY2FsVGltZSArIGxvY2FsT2Zmc2V0XG4gICAgY29uc3QgbmV3Q2l0eSA9IHV0YyArIDEwMDAgKiB0aW1lem9uZVxuICAgIHJldHVybiBuZXcgRGF0ZShuZXdDaXR5KVxufVxuXG5jb25zdCBjYWxjU3VuVGltZSA9ICh0aW1lLCB0aW1lem9uZSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IHRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuLy8gY29uc3QgZmV0Y2hEYWlseUZvcmVjYXN0ID0gKGxhdCwgbG9uKSA9PiB7XG4vLyAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdQcm9qRXJyb3JDb250YWluZXInKTtcbi8vICAgY29uc29sZS5sb2cobGF0KTtcbi8vICAgY29uc29sZS5sb2cobG9uKTtcbi8vICAgLy8gZmV0Y2ggc2V2ZW4gZGF5IGZvcmVjYXN0XG4vLyAgIGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mZXhjbHVkZT1taW51dGVseSxob3VybHksYWxlcnRzJnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCwgeyBtb2RlOiAnY29ycycgfSlcbi8vICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbi8vICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCc7XG4vLyAgICAgfSk7XG4vLyB9O1xuXG5jb25zdCBmZXRjaEhvdXJseUZvcmVjYXN0ID0gKGNpdHlRdWVyeSkgPT4ge1xuICAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcubmV3UHJvakVycm9yQ29udGFpbmVyJ1xuICAgIClcbiAgICAvLyBmZXRjaCBmaXZlIGRheS90aHJlZSBob3VyIGZvcmVjYXN0XG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0QXJyYXkgPSBbXVxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUocmVzcG9uc2UubGlzdFtpXS5kdF90eHQpLFxuICAgICAgICAgICAgICAgICAgICBkYXRlVGV4dDogcmVzcG9uc2UubGlzdFtpXS5kdF90eHQsXG4gICAgICAgICAgICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5saXN0W2ldLm1haW4uaHVtaWRpdHksXG4gICAgICAgICAgICAgICAgICAgIHJhaW5DaGFuY2U6IHJlc3BvbnNlLmxpc3RbaV0ucG9wICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZTogcmVzcG9uc2UubGlzdFtpXS5tYWluLnRlbXAsXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckljb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5pY29uLFxuICAgICAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS5saXN0W2ldLndpbmQuZGVnLFxuICAgICAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS5saXN0W2ldLndpbmQuZGVnKSxcbiAgICAgICAgICAgICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5ndXN0LFxuICAgICAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5zcGVlZCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheS5wdXNoKG5ld0hvdXJseUZvcmVjYXN0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3SG91cmx5Rm9yZWNhc3RBcnJheSlcbiAgICAgICAgICAgIGRpc3BsYXlGb3JlY2FzdChuZXdIb3VybHlGb3JlY2FzdEFycmF5KVxuICAgICAgICAgICAgcmV0dXJuIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IGZldGNoQ3VycmVudFdlYXRoZXIgPSAoY2l0eVF1ZXJ5LCBlKSA9PiB7XG4gICAgLy8gY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKVxuICAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcubmV3UHJvakVycm9yQ29udGFpbmVyJ1xuICAgIClcblxuICAgIGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIC8vIGNvbnN0IHtsYXR9ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAgICAgICAvLyBjb25zdCB7bG9ufSA9IHJlc3BvbnNlLmNvb3JkO1xuICAgICAgICAgICAgLy8gZmV0Y2hEYWlseUZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1dlYXRoZXJDYXJkID0ge1xuICAgICAgICAgICAgICAgIGNpdHk6IHJlc3BvbnNlLm5hbWUsXG4gICAgICAgICAgICAgICAgY291bnRyeTogcmVzcG9uc2Uuc3lzLmNvdW50cnksXG4gICAgICAgICAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLm1haW4uaHVtaWRpdHksXG4gICAgICAgICAgICAgICAgbG9jYWxEYXRlOiBjYWxjQ3VycmVudFRpbWUocmVzcG9uc2UudGltZXpvbmUpLFxuICAgICAgICAgICAgICAgIHN1bnJpc2U6IGNhbGNTdW5UaW1lKFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zeXMuc3VucmlzZSAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnRpbWV6b25lXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBzdW5zZXQ6IGNhbGNTdW5UaW1lKFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zeXMuc3Vuc2V0ICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRlbXBDdXJyZW50OiByZXNwb25zZS5tYWluLnRlbXAsXG4gICAgICAgICAgICAgICAgdGVtcEhpZ2g6IHJlc3BvbnNlLm1haW4udGVtcF9tYXgsXG4gICAgICAgICAgICAgICAgdGVtcExvdzogcmVzcG9uc2UubWFpbi50ZW1wX21pbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJJY29uOiByZXNwb25zZS53ZWF0aGVyWzBdLmljb24sXG4gICAgICAgICAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2Uud2luZC5kZWcsXG4gICAgICAgICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2Uud2luZC5kZWcpLFxuICAgICAgICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2Uud2luZC5zcGVlZCxcbiAgICAgICAgICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2Uud2luZC5ndXN0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7cmVzcG9uc2Uud2VhdGhlclswXS5pY29ufUAyeC5wbmdgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdXZWF0aGVyQ2FyZClcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZEJ0bicpID09PSB0cnVlXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzdWJtaXRMb2NhdGlvbihcbiAgICAgICAgICAgICAgICAgICAgYCR7bmV3V2VhdGhlckNhcmQuY2l0eX0sICR7bmV3V2VhdGhlckNhcmQuY291bnRyeX1gXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzcGxheVdlYXRoZXIobmV3V2VhdGhlckNhcmQpXG4gICAgICAgICAgICByZXR1cm4gbmV3V2VhdGhlckNhcmRcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IEFQSUNpdHlTZWFyY2ggPSAoaW5wdXQsIGUpID0+IHtcbiAgICBmZXRjaEN1cnJlbnRXZWF0aGVyKGlucHV0LCBlKVxuICAgIGZldGNoSG91cmx5Rm9yZWNhc3QoaW5wdXQpXG59XG5cbmNvbnN0IGFkZERlZmF1bHRDb250ZW50ID0gKCkgPT4ge1xuICAgIHN1Ym1pdExvY2F0aW9uKCdTYW4gRnJhbmNpc2NvLCBVUycpXG4gICAgLy8gc3VibWl0TG9jYXRpb24oJ1NlYXR0bGUnKVxuICAgIC8vIHN1Ym1pdExvY2F0aW9uKCdIb25vbHVsdScpXG4gICAgLy8gc3VibWl0TG9jYXRpb24oJ0Zsb3JlbmNlJylcbiAgICAvLyBzdWJtaXRMb2NhdGlvbignQW1zdGVyZGFtJylcbiAgICAvLyBzdWJtaXRMb2NhdGlvbignUGFyaXMnKVxuICAgIC8vIHN1Ym1pdExvY2F0aW9uKCdUb2t5bycpXG59XG5cbmNvbnN0IHZhbGlkYXRlU2VhcmNoID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAvLyBncmFiIGRvbSBlbGVtZW50c1xuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3TG9jYXRpb25JbnB1dCcpXG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuICAgIC8vIHJlc2V0IGVycm9yXG4gICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICcnXG4gICAgLy8gY2hlY2sgZm9yIHNlYXJjaCB0ZXJtXG4gICAgaWYgKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nXG4gICAgfSBlbHNlIHtcbiAgICAgICAgQVBJQ2l0eVNlYXJjaChuZXdMb2NhdGlvbklucHV0LnZhbHVlLCBlKVxuICAgICAgICBoaWRlRm9ybSgpXG4gICAgICAgIG5ld0xvY2F0aW9uSW5wdXQudmFsdWUgPSAnJ1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBhZGREZWZhdWx0Q29udGVudCxcbiAgICBjcmVhdGVBZGRpdGlvbkljb24sXG4gICAgY3JlYXRlRGVsZXRlSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIGNyZWF0ZU1lbnVJY29uLFxuICAgIGRpc3BsYXlXYXRjaGxpc3QsXG4gICAgaGlkZUZvcm0sXG4gICAgc2hvd0Zvcm0sXG4gICAgc3VibWl0TG9jYXRpb24sXG4gICAgdmFsaWRhdGVTZWFyY2gsXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQge1xuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QsXG59IGZyb20gJy4vaGVscGVyRnVuY3Rpb25zJ1xuaW1wb3J0IGdpdGh1Ykljb24gZnJvbSAnLi9hc3NldHMvR2l0SHViLWxpZ2h0LTMycHgucG5nJ1xuaW1wb3J0IGxvZ29JY29uIGZyb20gJy4vYXNzZXRzL2xvZ29JY29uLnN2ZydcblxuY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpXG5cbiAgICAvLyBkaXNwbGF5IGxvZ29cbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBsb2dvLnNyYyA9IGxvZ29JY29uXG4gICAgbG9nby50YXJnZXQgPSAnX2JsYW5rJ1xuICAgIGxvZ28uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsb2dvJylcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbylcblxuICAgIC8vIGRpc3BsYXkgdGl0bGVcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdXZWF0aGVyc2VydmUnXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKVxuXG4gICAgcmV0dXJuIGhlYWRlclxufVxuXG5jb25zdCBjcmVhdGVNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1lbnUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtZW51JylcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgaGVhZGVyXG4gICAgY29uc3Qgd2F0Y2hsaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0SGVhZGVyJylcbiAgICB3YXRjaGxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSAnV2F0Y2hsaXN0J1xuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBtZW51XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QoKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGFkZExvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBidXR0b25cbiAgICBjb25zdCBhZGRMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBhZGRMb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uQnRuJylcbiAgICBjcmVhdGVBZGRpdGlvbkljb24oYWRkTG9jYXRpb24pXG4gICAgY29uc3QgYWRkTG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgYWRkTG9jYXRpb25UZXh0LmlubmVyVGV4dCA9ICdBZGQgTG9jYXRpb24nXG4gICAgYWRkTG9jYXRpb24uYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25UZXh0KVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uKVxuXG4gICAgLy8gR2VuZXJhdGUgYW5kIGhpZGUgbmV3IGxvY2F0aW9uIGZvcm1cbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkZvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLm1ldGhvZCA9ICdnZXQnXG4gICAgY3JlYXRlRm9ybShhZGRMb2NhdGlvbkZvcm0pXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Gb3JtKVxuXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3RIZWFkZXIpXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3QpXG4gICAgbWVudS5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkNvbnRhaW5lcilcblxuICAgIHJldHVybiBtZW51XG59XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJDYXJkID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBXZWF0aGVyIEFQSSBjb250YWluZXJcbiAgICBjb25zdCBXZWF0aGVyQVBJQ29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnV2VhdGhlckFQSUNvbnRhaW50ZXInLCAnY29udGVudCcpXG5cbiAgICAvLyBjcmVhdGUgQVBJIHRpdGxlXG4gICAgY29uc3QgQVBJVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXG4gICAgQVBJVGl0bGUuY2xhc3NMaXN0LmFkZCgnY29udGVudFRpdGxlJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElUaXRsZSlcblxuICAgIC8vIGNyZWF0ZSBBUEkgaW1nXG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIEFQSUltYWdlLmNsYXNzTGlzdC5hZGQoJ0FQSUltYWdlJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElJbWFnZSlcblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IHRlbXAgY29udGFpbmVyXG4gICAgY29uc3QgdGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0ZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RlbXBDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHRlbXBDb250YWluZXIpXG5cbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKVxuXG4gICAgLy8gY3JlYXRlIGRlc2NyaXB0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgZGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnd2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkNvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBsb3cgdGVtcCBjb250YWluZXJcbiAgICBjb25zdCBsb3dUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgbG93VGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsb3dUZW1wQ29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChsb3dUZW1wQ29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIGhpZ2ggdGVtcCBjb250YWluZXJcbiAgICBjb25zdCBoaWdoVGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGhpZ2hUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZ2hUZW1wQ29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChoaWdoVGVtcENvbnRhaW5lcilcblxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpXG5cbiAgICAvLyBjcmVhdGUgY3VycmVudCB0aW1lIGNvbnRhaW5lclxuICAgIGNvbnN0IHRpbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICB0aW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RpbWVDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHRpbWVDb250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgc3VucmlzZSBjb250YWluZXJcbiAgICBjb25zdCBzdW5yaXNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgc3VucmlzZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdW5yaXNlQ29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChzdW5yaXNlQ29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIHN1bnNldCBjb250YWluZXJcbiAgICBjb25zdCBzdW5zZXRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBzdW5zZXRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3Vuc2V0Q29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChzdW5zZXRDb250YWluZXIpXG5cbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKVxuXG4gICAgLy8gY3JlYXRlIHdpbmQgY29udGFpbmVyXG4gICAgY29uc3Qgd2luZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHdpbmRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnd2luZENvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQod2luZENvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBodW1pZGl0eSBjb250YWluZXJcbiAgICBjb25zdCBodW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGh1bWlkaXR5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2h1bWlkaXR5Q29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChodW1pZGl0eUNvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBmb3JlY2FzdCBjb250YWluZXJcbiAgICBjb25zdCBmb3JlY2FzdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKVxuICAgIGZvcmVjYXN0VGl0bGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUaXRsZScpXG4gICAgZm9yZWNhc3RUaXRsZS5pbm5lclRleHQgPSAnRml2ZSBkYXksIHRocmVlIGhvdXIgZm9yZWNhc3Q6J1xuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGZvcmVjYXN0VGl0bGUpXG5cbiAgICBjb25zdCBmb3JlY2FzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9yZWNhc3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGZvcmVjYXN0Q29udGFpbmVyKVxuXG4gICAgY29uc3QgZm9yZWNhc3RUYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJylcbiAgICBmb3JlY2FzdFRhYmxlLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0VGFibGUnKVxuICAgIGZvcmVjYXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGZvcmVjYXN0VGFibGUpXG5cbiAgICBjb25zdCBmb3JlY2FzdFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcbiAgICBmb3JlY2FzdFJvdy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFJvdycpXG4gICAgZm9yZWNhc3RUYWJsZS5hcHBlbmRDaGlsZChmb3JlY2FzdFJvdylcblxuICAgIC8vIG1ha2Ugc2Nyb2xsd2hlZWwgZnVuY3Rpb25hbCB3aXRoIGhvcml6b250YWwgc2Nyb2xsaW5nXG4gICAgZm9yZWNhc3RSb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZm9yZWNhc3RSb3cuc2Nyb2xsTGVmdCArPSBlLmRlbHRhWVxuICAgIH0pXG5cbiAgICByZXR1cm4gV2VhdGhlckFQSUNvbnRhaW50ZXJcbn1cblxuY29uc3QgY3JlYXRlQ29udGVudCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgY29udGVudCBjb250YWluZXJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQnKVxuXG4gICAgLy8gZGlzcGxheSB3ZWF0aGVyIGNhcmRcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNyZWF0ZVdlYXRoZXJDYXJkKCkpXG5cbiAgICByZXR1cm4gY29udGVudFxufVxuXG5jb25zdCBjcmVhdGVGb290ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJylcblxuICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGNvcHlyaWdodC50ZXh0Q29udGVudCA9IGBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IGpjYW1wYmVsbDU3YFxuXG4gICAgY29uc3QgZ2l0aHViTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGdpdGh1YkxpbmsuaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vamNhbXBiZWxsNTcnXG4gICAgZ2l0aHViTGluay50YXJnZXQgPSAnX2JsYW5rJ1xuXG4gICAgY29uc3QgbmV3R2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3R2l0aHViSWNvbi5zcmMgPSBnaXRodWJJY29uXG4gICAgbmV3R2l0aHViSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2dpdGh1YicpXG5cbiAgICBnaXRodWJMaW5rLmFwcGVuZENoaWxkKG5ld0dpdGh1Ykljb24pXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGNvcHlyaWdodClcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZ2l0aHViTGluaylcblxuICAgIHJldHVybiBmb290ZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUhlYWRlcigpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlTWVudSgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlQ29udGVudCgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRm9vdGVyKCkpXG59XG4iXSwibmFtZXMiOlsiYWRkaXRpb25JY29uIiwiZGVsZXRlSWNvbiIsIm1lbnVJY29uIiwiZG9jdW1lbnQiLCJjb29raWUiLCJjcmVhdGVNZW51SWNvbiIsImxpIiwiY2hlY2tsaXN0SWNvbiIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUxpc3RpbmciLCJsb2NhdGlvbk5hbWUiLCJpIiwid2F0Y2hsaXN0IiwicXVlcnlTZWxlY3RvciIsImxvY2F0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIiwic2VsZWN0ZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsImNvbnRhaW5zIiwic2VsZWN0TG9jYXRpb24iLCJsb2NhdGlvblRleHQiLCJ0ZXh0Q29udGVudCIsIm5hbWUiLCJjcmVhdGVEZWxldGVJY29uIiwiZGlzcGxheVdhdGNobGlzdCIsIm9sZExpc3RpbmdDb3VudCIsImNoaWxkRWxlbWVudENvdW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsInN0b3JhZ2VXYXRjaGxpc3QiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZm9yRWFjaCIsIkFQSUNpdHlTZWFyY2giLCJzdWJtaXRMb2NhdGlvbiIsImlucHV0IiwibmV3TG9jYXRpb24iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImRpc3BsYXlXZWF0aGVyIiwibmV3V2VhdGhlckNhcmQiLCJjb250ZW50VGl0bGUiLCJjaXR5IiwiY291bnRyeSIsIkFQSUltYWdlIiwid2VhdGhlckljb24iLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJpbm5lclRleHQiLCJ0ZW1wQ29udGFpbmVyIiwiTWF0aCIsInJvdW5kIiwidGVtcEN1cnJlbnQiLCJsb3dUZW1wQ29udGFpbmVyIiwidGVtcExvdyIsImhpZ2hUZW1wQ29udGFpbmVyIiwidGVtcEhpZ2giLCJ0aW1lQ29udGFpbmVyIiwibG9jYWxEYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwic3VucmlzZUNvbnRhaW5lciIsInN1bnJpc2UiLCJzdW5zZXRDb250YWluZXIiLCJzdW5zZXQiLCJ3aW5kQ29udGFpbmVyIiwid2luZFNwZWVkIiwid2luZERpcmVjdGlvbiIsIndpbmREZWdyZWUiLCJodW1pZGl0eUNvbnRhaW5lciIsImh1bWlkaXR5IiwiZGlzcGxheUZvcmVjYXN0IiwibmV3SG91cmx5Rm9yZWNhc3RBcnJheSIsImZvcmVjYXN0Um93Iiwib2xkRm9yZWNhc3QiLCJsZW5ndGgiLCJmb3JlY2FzdENlbGwiLCJmb3JlY2FzdERhdGUiLCJkYXRlIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZm9yZWNhc3RUaW1lIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwid2VhdGhlckZvcmVjYXN0SWNvbiIsImZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uIiwiZm9yZWNhc3RUZW1wIiwidGVtcGVyYXR1cmUiLCJzZWxlY3RlZExvY2F0aW9uSWQiLCJnZXRBdHRyaWJ1dGUiLCJjcmVhdGVBZGRCdXR0b24iLCJjb250YWluZXIiLCJhZGRCdG4iLCJ2YWxpZGF0ZVNlYXJjaCIsImNyZWF0ZUNhbmNlbEJ1dHRvbiIsImNhbmNlbEJ0biIsImNyZWF0ZUZvcm0iLCJmb3JtIiwiZm9ybVJvdzEiLCJuZXdMb2NhdGlvbklucHV0IiwicGxhY2Vob2xkZXIiLCJmb3JtUm93MiIsImZvcm1Sb3czIiwic2hvd0Zvcm0iLCJhZGRMb2NhdGlvbkJ0biIsImFkZExvY2F0aW9uRm9ybSIsImhpZGVGb3JtIiwiZGVsZXRlV2F0Y2hsaXN0RW50cnkiLCJkb29tZWRJbmRleCIsInNwbGljZSIsIm5ld0RlbGV0ZUljb24iLCJ0cmFzaEljb24iLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlQWRkaXRpb25JY29uIiwibmV3QWRkaXRpb25JY29uIiwidG9EaXJlY3Rpb24iLCJkZWdyZWUiLCJjYWxjQ3VycmVudFRpbWUiLCJ0aW1lem9uZSIsImQiLCJEYXRlIiwibG9jYWxUaW1lIiwiZ2V0VGltZSIsImxvY2FsT2Zmc2V0IiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJ1dGMiLCJuZXdDaXR5IiwiY2FsY1N1blRpbWUiLCJ0aW1lIiwiZmV0Y2hIb3VybHlGb3JlY2FzdCIsImNpdHlRdWVyeSIsIm5ld1Byb2pFcnJvckNvbnRhaW5lciIsImZldGNoIiwibW9kZSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJuZXdIb3VybHlGb3JlY2FzdCIsImxpc3QiLCJkdF90eHQiLCJkYXRlVGV4dCIsIm1haW4iLCJyYWluQ2hhbmNlIiwicG9wIiwidGVtcCIsIndlYXRoZXJDb25kaXRpb24iLCJ3ZWF0aGVyIiwiZGVzY3JpcHRpb24iLCJpY29uIiwid2luZCIsImRlZyIsIndpbmRHdXN0IiwiZ3VzdCIsInNwZWVkIiwiY2F0Y2giLCJlcnIiLCJmZXRjaEN1cnJlbnRXZWF0aGVyIiwic3lzIiwidGVtcF9tYXgiLCJ0ZW1wX21pbiIsInVuZGVmaW5lZCIsImFkZERlZmF1bHRDb250ZW50IiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsImdpdGh1Ykljb24iLCJsb2dvSWNvbiIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImxvZ28iLCJ0aXRsZSIsImNyZWF0ZU1lbnUiLCJtZW51Iiwid2F0Y2hsaXN0SGVhZGVyIiwiYWRkTG9jYXRpb25Db250YWluZXIiLCJhZGRMb2NhdGlvbiIsImFkZExvY2F0aW9uVGV4dCIsIm1ldGhvZCIsImNyZWF0ZVdlYXRoZXJDYXJkIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJBUElUaXRsZSIsImRlc2NyaXB0aW9uQ29udGFpbmVyIiwiZm9yZWNhc3RUaXRsZSIsImZvcmVjYXN0Q29udGFpbmVyIiwiZm9yZWNhc3RUYWJsZSIsInNjcm9sbExlZnQiLCJkZWx0YVkiLCJjcmVhdGVDb250ZW50IiwiY29udGVudCIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNvcHlyaWdodCIsImdldEZ1bGxZZWFyIiwiZ2l0aHViTGluayIsImhyZWYiLCJuZXdHaXRodWJJY29uIiwiaW5pdGlhbGl6ZSIsImJvZHkiXSwic291cmNlUm9vdCI6IiJ9