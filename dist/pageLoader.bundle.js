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

const fetchCurrentWeather = cityQuery => {
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
    submitLocation("".concat(newWeatherCard.city, ", ").concat(newWeatherCard.country));
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

  const APITitle = document.createElement('h2');
  APITitle.classList.add('contentTitle'); // create current temp container

  const tempContainer = document.createElement('h1');
  tempContainer.classList.add('tempContainer'); // create API img

  const APIImage = document.createElement('img');
  APIImage.classList.add('APIImage'); // create description container

  const descriptionContainer = document.createElement('span');
  descriptionContainer.classList.add('weatherDescription'); // create low temp container

  const lowTempContainer = document.createElement('span');
  lowTempContainer.classList.add('lowTempContainer'); // create high temp container

  const highTempContainer = document.createElement('span');
  highTempContainer.classList.add('highTempContainer'); // create current time container

  const timeContainer = document.createElement('span');
  timeContainer.classList.add('timeContainer'); // create sunrise container

  const sunriseContainer = document.createElement('span');
  sunriseContainer.classList.add('sunriseContainer'); // create sunset container

  const sunsetContainer = document.createElement('span');
  sunsetContainer.classList.add('sunsetContainer'); // create wind container

  const windContainer = document.createElement('span');
  windContainer.classList.add('windContainer'); // create humidity container

  const humidityContainer = document.createElement('span');
  humidityContainer.classList.add('humidityContainer'); // create forecast container

  const forecastContainer = document.createElement('div');
  forecastContainer.classList.add('forecastContainer');
  const forecastTitle = document.createElement('h2');
  forecastTitle.classList.add('forecastTitle');
  forecastTitle.innerText = 'Five day, three hour forecast:';
  const forecastTable = document.createElement('table');
  forecastTable.classList.add('forecastTable');
  forecastContainer.appendChild(forecastTable);
  const forecastRow = document.createElement('tr');
  forecastRow.classList.add('forecastRow');
  forecastTable.appendChild(forecastRow); // make scrollwheel functional with horizontal scrolling

  forecastRow.addEventListener('wheel', e => {
    e.preventDefault();
    forecastRow.scrollLeft += e.deltaY;
  }); // Append

  WeatherAPIContainter.appendChild(APITitle);
  WeatherAPIContainter.appendChild(APIImage);
  WeatherAPIContainter.appendChild(tempContainer);
  WeatherAPIContainter.appendChild(document.createElement('br'));
  WeatherAPIContainter.appendChild(descriptionContainer);
  WeatherAPIContainter.appendChild(lowTempContainer);
  WeatherAPIContainter.appendChild(highTempContainer);
  WeatherAPIContainter.appendChild(document.createElement('br'));
  WeatherAPIContainter.appendChild(timeContainer);
  WeatherAPIContainter.appendChild(sunriseContainer);
  WeatherAPIContainter.appendChild(sunsetContainer);
  WeatherAPIContainter.appendChild(document.createElement('br'));
  WeatherAPIContainter.appendChild(windContainer);
  WeatherAPIContainter.appendChild(humidityContainer);
  WeatherAPIContainter.appendChild(forecastTitle);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0VBRUEsTUFBTTRMLFNBQVMsR0FBR2pNLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixHQUF2QixDQUFsQjtFQUNBNEwsU0FBUyxDQUFDekssV0FBViw0QkFBdUMsSUFBSXFHLElBQUosR0FBV3FFLFdBQVgsRUFBdkM7RUFFQSxNQUFNQyxVQUFVLEdBQUduTSxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBbkI7RUFDQThMLFVBQVUsQ0FBQ0MsSUFBWCxHQUFrQixnQ0FBbEI7RUFDQUQsVUFBVSxDQUFDL0ssTUFBWCxHQUFvQixRQUFwQjtFQUVBLE1BQU1pTCxhQUFhLEdBQUdyTSxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdEI7RUFDQWdNLGFBQWEsQ0FBQy9MLEdBQWQsR0FBb0JpSywwREFBcEI7RUFDQThCLGFBQWEsQ0FBQzlMLFlBQWQsQ0FBMkIsT0FBM0IsRUFBb0MsUUFBcEM7RUFFQTRMLFVBQVUsQ0FBQzNMLFdBQVgsQ0FBdUI2TCxhQUF2QjtFQUNBTCxNQUFNLENBQUN4TCxXQUFQLENBQW1CeUwsU0FBbkI7RUFDQUQsTUFBTSxDQUFDeEwsV0FBUCxDQUFtQjJMLFVBQW5CO0VBRUEsT0FBT0gsTUFBUDtBQUNILENBbkJEOztBQXFCZSxTQUFTTSxVQUFULEdBQXNCO0VBQ2pDdE0sUUFBUSxDQUFDdU0sSUFBVCxDQUFjL0wsV0FBZCxDQUEwQmlLLFlBQVksRUFBdEM7RUFDQXpLLFFBQVEsQ0FBQ3VNLElBQVQsQ0FBYy9MLFdBQWQsQ0FBMEJxSyxVQUFVLEVBQXBDO0VBQ0E3SyxRQUFRLENBQUN1TSxJQUFULENBQWMvTCxXQUFkLENBQTBCcUwsYUFBYSxFQUF2QztFQUNBN0wsUUFBUSxDQUFDdU0sSUFBVCxDQUFjL0wsV0FBZCxDQUEwQnVMLFlBQVksRUFBdEM7QUFDSCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaGVscGVyRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9wYWdlTG9hZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhZGRpdGlvbkljb24gZnJvbSAnLi9hc3NldHMvcGx1cy5zdmcnXG5pbXBvcnQgZGVsZXRlSWNvbiBmcm9tICcuL2Fzc2V0cy9kZWxldGUuc3ZnJ1xuaW1wb3J0IG1lbnVJY29uIGZyb20gJy4vYXNzZXRzL21lbnVJY29uLnN2ZydcblxuZG9jdW1lbnQuY29va2llID0gJ1NhbWVTaXRlPUxheCdcblxuY29uc3QgY3JlYXRlTWVudUljb24gPSAobGkpID0+IHtcbiAgICBjb25zdCBjaGVja2xpc3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBjaGVja2xpc3RJY29uLnNyYyA9IG1lbnVJY29uXG4gICAgY2hlY2tsaXN0SWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24nKVxuICAgIGxpLmFwcGVuZENoaWxkKGNoZWNrbGlzdEljb24pXG59XG5cbi8vIEFkZCBzaW5nbGUgbG9jYXRpb24gdG8gd2F0Y2hsaXN0IChjYWxsZWQgYmVsb3cpXG5jb25zdCBjcmVhdGVMaXN0aW5nID0gKGxvY2F0aW9uTmFtZSwgaSkgPT4ge1xuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3YXRjaGxpc3QnKVxuXG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZChgbG9jYXRpb25gKVxuICAgIGxvY2F0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG4gICAgLy8gYXNzaWduIGNsYXNzIHRvIHNlbGVjdGVkIGxvY2F0aW9uIGxpc3RpbmdcbiAgICBpZiAobG9jYXRpb25OYW1lLnNlbGVjdGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICAvLyBzZWxlY3RMb2NhdGlvbihsb2NhdGlvbilcbiAgICB9XG5cbiAgICAvLyBldmVudCBsaXN0ZW5lciB0byBkaXNwbGF5IHNlbGVjdGVkIGxvY2F0aW9uJ3Mgd2VhdGhlclxuICAgIGxvY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gaWYgZGVsZXRpbmcgbGlzdGluZywgZG8gbm90IGRpc3BsYXkgd2VhdGhlclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGVJdGVtJykpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKVxuICAgIH0pXG5cbiAgICBjcmVhdGVNZW51SWNvbihsb2NhdGlvbilcbiAgICBjb25zdCBsb2NhdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBsb2NhdGlvblRleHQudGV4dENvbnRlbnQgPSBsb2NhdGlvbk5hbWUubmFtZVxuICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKGxvY2F0aW9uVGV4dClcbiAgICBjcmVhdGVEZWxldGVJY29uKGxvY2F0aW9uLCBpKVxuICAgIHdhdGNobGlzdC5hcHBlbmRDaGlsZChsb2NhdGlvbilcbn1cblxuLy8gRGlzcGxheSBlbnRpcmUgYXJyYXkgb2YgbG9jYXRpb25zIHRvIHdhdGNobGlzdFxuY29uc3QgZGlzcGxheVdhdGNobGlzdCA9ICgpID0+IHtcbiAgICAvLyBHcmFiIHdhdGNobGlzdFxuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3YXRjaGxpc3QnKVxuXG4gICAgLy8gQ2xlYXIgbG9jYXRpb24gbGlzdGluZ3NcbiAgICBjb25zdCBvbGRMaXN0aW5nQ291bnQgPSB3YXRjaGxpc3QuY2hpbGRFbGVtZW50Q291bnRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZExpc3RpbmdDb3VudDsgaSsrKSB7XG4gICAgICAgIHdhdGNobGlzdC5maXJzdENoaWxkLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgLy8gQXBwZW5kIGFsbCBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG4gICAgbGV0IGkgPSAwXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG4gICAgLy8gY29uc29sZS5sb2coc3RvcmFnZVdhdGNobGlzdClcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGNyZWF0ZUxpc3RpbmcobG9jYXRpb24sIGkpXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgICBpKytcbiAgICB9KVxufVxuXG5jb25zdCBzdWJtaXRMb2NhdGlvbiA9IChpbnB1dCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBsb2NhdGlvbiBvYmplY3RcbiAgICBjb25zdCBuZXdMb2NhdGlvbiA9IHtcbiAgICAgICAgbmFtZTogaW5wdXQsXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgIH1cblxuICAgIC8vIGdyYWIgYXJyYXkgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBkZXNlbGVjdCBwcmV2aW91c2x5IHNlbGVjdGVkIGxvY2F0aW9uXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBwdXNoIGxvY2F0aW9uIHRvIGFycmF5XG4gICAgc3RvcmFnZVdhdGNobGlzdC5wdXNoKG5ld0xvY2F0aW9uKVxuICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2VXYXRjaGxpc3QpXG5cbiAgICAvLyBzZXQgYXJyYXkgYmFjayBpbnRvIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gcmVmcmVzaCB3YXRjaGxpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgZGlzcGxheVdlYXRoZXIgPSAobmV3V2VhdGhlckNhcmQpID0+IHtcbiAgICAvLyBkaXNwbGF5IGNvbnRlbnQgdGl0bGVcbiAgICBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJylcbiAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSBgJHtuZXdXZWF0aGVyQ2FyZC5jaXR5fSwgJHtuZXdXZWF0aGVyQ2FyZC5jb3VudHJ5fWBcblxuICAgIC8vIGRpc3BsYXkgd2VhdGhlciBpY29uXG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKVxuICAgIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25ld1dlYXRoZXJDYXJkLndlYXRoZXJJY29ufUAyeC5wbmdgXG5cbiAgICAvLyBkaXNwbGF5IGRlc2NyaXB0aW9uXG4gICAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJEZXNjcmlwdGlvbicpXG4gICAgd2VhdGhlckRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IGBXZWF0aGVyOiAke25ld1dlYXRoZXJDYXJkLndlYXRoZXJEZXNjcmlwdGlvbn1gXG5cbiAgICAvLyBkaXNwbGF5IGN1cnJlbnQgdGVtcGVyYXR1cmVcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBDb250YWluZXInKVxuICAgIHRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZChuZXdXZWF0aGVyQ2FyZC50ZW1wQ3VycmVudCl9XFx1MDBCMGBcblxuICAgIC8vIGRpc3BsYXkgaGlnaC9sb3cgdGVtcGVyYXR1cmVzXG4gICAgY29uc3QgbG93VGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb3dUZW1wQ29udGFpbmVyJylcbiAgICBsb3dUZW1wQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb3cgdGVtcGVyYXR1cmU6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcExvd1xuICAgICl9XFx1MDBCMGBcbiAgICBjb25zdCBoaWdoVGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWdoVGVtcENvbnRhaW5lcicpXG4gICAgaGlnaFRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYEhpZ2ggdGVtcGVyYXR1cmU6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcEhpZ2hcbiAgICApfVxcdTAwQjBgXG5cbiAgICAvLyBkaXBsYXkgY3VycmVudCB0aW1lXG4gICAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lQ29udGFpbmVyJylcbiAgICB0aW1lQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb2NhbCB0aW1lOiAke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSBzdW5yaXNlL3N1bnNldCB0aW1lc1xuICAgIGNvbnN0IHN1bnJpc2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VucmlzZUNvbnRhaW5lcicpXG4gICAgc3VucmlzZUNvbnRhaW5lci5pbm5lclRleHQgPSBgU3VucmlzZTogJHtuZXdXZWF0aGVyQ2FyZC5zdW5yaXNlLmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQuc3VucmlzZS5nZXRNaW51dGVzKCl9YFxuICAgIGNvbnN0IHN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdW5zZXRDb250YWluZXInKVxuICAgIHN1bnNldENvbnRhaW5lci5pbm5lclRleHQgPSBgU3Vuc2V0OiAke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSB3aW5kXG4gICAgY29uc3Qgd2luZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kQ29udGFpbmVyJylcbiAgICB3aW5kQ29udGFpbmVyLmlubmVyVGV4dCA9IGBXaW5kOiAke01hdGgucm91bmQoXG4gICAgICAgIG5ld1dlYXRoZXJDYXJkLndpbmRTcGVlZFxuICAgICl9bXBoLCAke25ld1dlYXRoZXJDYXJkLndpbmREaXJlY3Rpb259ICgke25ld1dlYXRoZXJDYXJkLndpbmREZWdyZWV9XFx1MDBCMClgXG5cbiAgICAvLyBkaXNwbGF5IGh1bWlkaXR5XG4gICAgY29uc3QgaHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHlDb250YWluZXInKVxuICAgIGh1bWlkaXR5Q29udGFpbmVyLmlubmVyVGV4dCA9IGBIdW1pZGl0eTogJHtuZXdXZWF0aGVyQ2FyZC5odW1pZGl0eX0lYFxufVxuXG5jb25zdCBkaXNwbGF5Rm9yZWNhc3QgPSAobmV3SG91cmx5Rm9yZWNhc3RBcnJheSkgPT4ge1xuICAgIGNvbnN0IGZvcmVjYXN0Um93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcmVjYXN0Um93JylcblxuICAgIC8vIHJlbW92ZSBhbnkgZm9yZWNhc3QgY2VsbHNcbiAgICBjb25zdCBvbGRGb3JlY2FzdCA9IGZvcmVjYXN0Um93LmNoaWxkRWxlbWVudENvdW50XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRGb3JlY2FzdDsgaSsrKSB7XG4gICAgICAgIGZvcmVjYXN0Um93LmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvLyBBZGQgbmV3IGZvcmVjYXN0IGNlbGxzXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdIb3VybHlGb3JlY2FzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgZm9yZWNhc3RDZWxsLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Q2VsbCcpXG5cbiAgICAgICAgLy8gZGlzcGxheSBkYXRlXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdERhdGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3REYXRlJylcbiAgICAgICAgZm9yZWNhc3REYXRlLmlubmVyVGV4dCA9IGAke1xuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS5kYXRlLmdldE1vbnRoKCkgKyAxXG4gICAgICAgIH0vJHtuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLmRhdGUuZ2V0RGF0ZSgpfWBcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0RGF0ZSlcblxuICAgICAgICAvLyBkaXNwbGF5IHRpbWVcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0VGltZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRpbWUnKVxuICAgICAgICBmb3JlY2FzdFRpbWUuaW5uZXJUZXh0ID1cbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0uZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoKVxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaW1lKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgd2VhdGhlciBpY29uXG4gICAgICAgIGNvbnN0IHdlYXRoZXJGb3JlY2FzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgICAgICB3ZWF0aGVyRm9yZWNhc3RJY29uLmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXJGb3JlY2FzdEljb24nKVxuICAgICAgICB3ZWF0aGVyRm9yZWNhc3RJY29uLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0ud2VhdGhlckljb259LnBuZ2BcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKHdlYXRoZXJGb3JlY2FzdEljb24pXG5cbiAgICAgICAgLy8gZGlzcGxheSB3ZWF0aGVyIGRlc2NyaXB0aW9uXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICAgICAgZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24uaW5uZXJUZXh0ID1cbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0ud2VhdGhlckRlc2NyaXB0aW9uXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5hcHBlbmRDaGlsZChmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbilcblxuICAgICAgICAvLyBkaXNwbGF5IGZvcmVjYXN0IHRlbXBlcmF0dXJlXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUZW1wJylcbiAgICAgICAgZm9yZWNhc3RUZW1wLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQoXG4gICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLnRlbXBlcmF0dXJlXG4gICAgICAgICl9XFx1MDBCMGBcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcClcblxuICAgICAgICBmb3JlY2FzdFJvdy5hcHBlbmRDaGlsZChmb3JlY2FzdENlbGwpXG4gICAgfVxufVxuXG5jb25zdCBzZWxlY3RMb2NhdGlvbiA9IChsaSkgPT4ge1xuICAgIC8vIEZldGNoIGN1cnJlbnQgd2VhdGhlclxuICAgIEFQSUNpdHlTZWFyY2gobGkuaW5uZXJUZXh0KVxuXG4gICAgLy8gZ3JhYiBsb2NhdGlvbnMgYXJyYXkgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBkZXNlbGVjdCBhbGwgbG9jYXRpb25zXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc2VsZWN0ZWQgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VsZWN0ZWQgPSAnZmFsc2UnXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gU2VsZWN0IGxvY2F0aW9uIGlmIG9uZSBpcyBjaG9zZW4gKG1haW4gbWVudSBzZWxlY3Rpb24gaXMgaGFuZGxlZCBpbiBldmVudCBsaXN0ZW5lcilcbiAgICBpZiAobGkuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAnbG9jYXRpb24nKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTG9jYXRpb25JZCA9IGxpLmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgICBzdG9yYWdlV2F0Y2hsaXN0W3NlbGVjdGVkTG9jYXRpb25JZF0uc2VsZWN0ZWQgPSAndHJ1ZSdcbiAgICB9XG5cbiAgICAvLyBzZXQgbG9jYXRpb25zIGFycmF5IGJhY2sgaW50byBsb2NhbFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gcmVmcmVzaFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBjcmVhdGVBZGRCdXR0b24gPSAoY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnYWRkQnRuJylcbiAgICBhZGRCdG4uaW5uZXJUZXh0ID0gJ3NlYXJjaCdcbiAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdmFsaWRhdGVTZWFyY2goZSkpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZEJ0bilcbn1cblxuY29uc3QgY3JlYXRlQ2FuY2VsQnV0dG9uID0gKGNvbnRhaW5lciwgaSkgPT4ge1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ2NhbmNlbEJ0bicpXG4gICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG4gICAgY2FuY2VsQnRuLmlubmVyVGV4dCA9ICdjYW5jZWwnXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmNlbEJ0bilcbn1cblxuLy8gY3JlYXRlRm9ybVxuY29uc3QgY3JlYXRlRm9ybSA9IChmb3JtKSA9PiB7XG4gICAgLy8gcm93IG9uZTogYXNzaWduIGlucHV0XG4gICAgY29uc3QgZm9ybVJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LmNsYXNzTGlzdC5hZGQoJ25ld0xvY2F0aW9uSW5wdXQnKVxuICAgIG5ld0xvY2F0aW9uSW5wdXQucGxhY2Vob2xkZXIgPSAnRmxvcmVuY2UnXG4gICAgbmV3TG9jYXRpb25JbnB1dC5uYW1lID0gJ25ld0xvY2F0aW9uSW5wdXQnXG4gICAgZm9ybVJvdzEuYXBwZW5kQ2hpbGQobmV3TG9jYXRpb25JbnB1dClcblxuICAgIC8vIHJvdyB0d286IHN1Ym1pdCBhbmQgY2FuY2VsIGJ1dHRvbnNcbiAgICBjb25zdCBmb3JtUm93MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmb3JtUm93JylcbiAgICBmb3JtUm93Mi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zvcm1CdXR0b25zJylcbiAgICBjcmVhdGVBZGRCdXR0b24oZm9ybVJvdzIsIGZvcm0pXG4gICAgY3JlYXRlQ2FuY2VsQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuXG4gICAgLy8gcm93IHRocmVlOiBhc3NpZ24gZXJyb3IgY2xhc3MgYW5kIHRleHRcbiAgICBjb25zdCBmb3JtUm93MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgLy8gZm9ybVJvdzMuc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxuICAgIGZvcm1Sb3czLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbmV3UHJvakVycm9yQ29udGFpbmVyJylcbiAgICAvLyBmb3JtUm93My5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nXG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cxKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzIpXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93Mylcbn1cblxuY29uc3Qgc2hvd0Zvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkTG9jYXRpb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25CdG4nKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkZvcm0nKVxuXG4gICAgYWRkTG9jYXRpb25CdG4uc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Nob3dCbG9jaycpXG59XG5cbmNvbnN0IGhpZGVGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZExvY2F0aW9uQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uQnRuJylcbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25Gb3JtJylcblxuICAgIGFkZExvY2F0aW9uQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2hvd0Jsb2NrJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxufVxuXG4vLyBEZWxldGUgd2F0Y2hsaXN0IGVudHJ5XG5jb25zdCBkZWxldGVXYXRjaGxpc3RFbnRyeSA9IChlKSA9PiB7XG4gICAgLy8gZ3JhYiBhcnJheXMgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBJZGVudGlmeSBlbnRyeSB0byBkZWxldGVcbiAgICBjb25zdCBkb29tZWRJbmRleCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgIC8vIGNvbnN0IGRvb21lZE5hbWUgPSBzdG9yYWdlV2F0Y2hsaXN0W2Rvb21lZEluZGV4XS5uYW1lO1xuXG4gICAgLy8gZGVsZXRlIGVudHJ5XG4gICAgc3RvcmFnZVdhdGNobGlzdC5zcGxpY2UoZG9vbWVkSW5kZXgsIDEpXG5cbiAgICAvLyBzZXQgY2hhbmdlcyB0byBsb2NhbFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gSWYgZG9vbWVkIGVudHJ5IHdhcyBzZWxlY3RlZCwgY2xlYXIgY29udGVudCBkaXNwbGF5XG4gICAgLy8gY29uc3QgY29udGVudFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRUaXRsZScpO1xuICAgIC8vIGNvbnN0IGFsbFRhc2tzQ2xhc3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbFRhc2tzJykuY2xhc3NMaXN0XG4gICAgLy8gaWYgKGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9PT0gZG9vbWVkTmFtZSkge1xuICAgIC8vICAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSAnQWxsIHRhc2tzJ1xuICAgIC8vICAgICBhbGxUYXNrc0NsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAvLyB9XG5cbiAgICAvLyByZWZyZXNoIHdhdGNoaXN0XG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IGNyZWF0ZURlbGV0ZUljb24gPSAoY29udGFpbmVyLCBpKSA9PiB7XG4gICAgLy8gY3JlYXRlIGltYWdlIGFuZCBhc3NpZ24gYXR0cmlidXRlc1xuICAgIGNvbnN0IG5ld0RlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0RlbGV0ZUljb24uc3JjID0gZGVsZXRlSWNvblxuICAgIG5ld0RlbGV0ZUljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uIGRlbGV0ZUl0ZW0nKVxuICAgIG5ld0RlbGV0ZUljb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcblxuICAgIC8vIEFERCBFVkVOVCBMSVNURU5FUlxuICAgIGlmIChcbiAgICAgICAgY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSA9PT0gJ2xvY2F0aW9uJyB8fFxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NhdGlvbicpXG4gICAgKSB7XG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyIHRvIGRlbGV0ZSBsb2NhdGlvblxuICAgICAgICBuZXdEZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnlgLFxuICAgICAgICAgICAgYGRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWAsXG4gICAgICAgICAgICBgaGlkZGVuYFxuICAgICAgICApXG4gICAgICAgIG5ld0RlbGV0ZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT5cbiAgICAgICAgICAgIGRlbGV0ZVdhdGNobGlzdEVudHJ5KGUsIGkpXG4gICAgICAgIClcbiAgICAgICAgLy8gZGlzcGxheSB0cmFzaCBpY29uIG9uIGhvdmVyXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICBgLmRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB9KVxuICAgICAgICAvLyBoaWRlIHRyYXNoIGljb25cbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgc3RyYW5nZScpXG4gICAgfVxuICAgIC8vIGFwcGVuZCB0byBjb250YWluZXJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmV3RGVsZXRlSWNvbilcbn1cblxuY29uc3QgY3JlYXRlQWRkaXRpb25JY29uID0gKGxpKSA9PiB7XG4gICAgY29uc3QgbmV3QWRkaXRpb25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdBZGRpdGlvbkljb24uc3JjID0gYWRkaXRpb25JY29uXG4gICAgbmV3QWRkaXRpb25JY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQobmV3QWRkaXRpb25JY29uKVxufVxuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyBPcGVud2VhdGhlciBBUEkgRnVuY3Rpb25zXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmZ1bmN0aW9uIHRvRGlyZWN0aW9uKGRlZ3JlZSkge1xuICAgIGlmIChkZWdyZWUgPiAzMzcuNSkgcmV0dXJuICdOb3J0aCdcbiAgICBpZiAoZGVncmVlID4gMjkyLjUpIHJldHVybiAnTm9ydGggV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMjQ3LjUpIHJldHVybiAnV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMjAyLjUpIHJldHVybiAnU291dGggV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMTU3LjUpIHJldHVybiAnU291dGgnXG4gICAgaWYgKGRlZ3JlZSA+IDEyMi41KSByZXR1cm4gJ1NvdXRoIEVhc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDY3LjUpIHJldHVybiAnRWFzdCdcbiAgICBpZiAoZGVncmVlID4gMjIuNSkgcmV0dXJuICdOb3J0aCBFYXN0J1xuICAgIHJldHVybiAnTm9ydGgnXG59XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYyMzc2MTE1L2hvdy10by1vYnRhaW4tb3Blbi13ZWF0aGVyLWFwaS1kYXRlLXRpbWUtZnJvbS1jaXR5LWJlaW5nLWZldGNoZWRcbmNvbnN0IGNhbGNDdXJyZW50VGltZSA9ICh0aW1lem9uZSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3QgbG9jYWxUaW1lID0gZC5nZXRUaW1lKClcbiAgICBjb25zdCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwXG4gICAgY29uc3QgdXRjID0gbG9jYWxUaW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbmNvbnN0IGNhbGNTdW5UaW1lID0gKHRpbWUsIHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwXG4gICAgY29uc3QgdXRjID0gdGltZSArIGxvY2FsT2Zmc2V0XG4gICAgY29uc3QgbmV3Q2l0eSA9IHV0YyArIDEwMDAgKiB0aW1lem9uZVxuICAgIHJldHVybiBuZXcgRGF0ZShuZXdDaXR5KVxufVxuXG4vLyBjb25zdCBmZXRjaERhaWx5Rm9yZWNhc3QgPSAobGF0LCBsb24pID0+IHtcbi8vICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld1Byb2pFcnJvckNvbnRhaW5lcicpO1xuLy8gICBjb25zb2xlLmxvZyhsYXQpO1xuLy8gICBjb25zb2xlLmxvZyhsb24pO1xuLy8gICAvLyBmZXRjaCBzZXZlbiBkYXkgZm9yZWNhc3Rcbi8vICAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZleGNsdWRlPW1pbnV0ZWx5LGhvdXJseSxhbGVydHMmdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuLy8gICAgIH0pXG4vLyAgICAgLmNhdGNoKChlcnIpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJztcbi8vICAgICB9KTtcbi8vIH07XG5cbmNvbnN0IGZldGNoSG91cmx5Rm9yZWNhc3QgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuICAgIC8vIGZldGNoIGZpdmUgZGF5L3RocmVlIGhvdXIgZm9yZWNhc3RcbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3RBcnJheSA9IFtdXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShyZXNwb25zZS5saXN0W2ldLmR0X3R4dCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUZXh0OiByZXNwb25zZS5saXN0W2ldLmR0X3R4dCxcbiAgICAgICAgICAgICAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICAgICAgcmFpbkNoYW5jZTogcmVzcG9uc2UubGlzdFtpXS5wb3AgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVySWNvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmljb24sXG4gICAgICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcsXG4gICAgICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcpLFxuICAgICAgICAgICAgICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2UubGlzdFtpXS53aW5kLmd1c3QsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2UubGlzdFtpXS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5LnB1c2gobmV3SG91cmx5Rm9yZWNhc3QpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdIb3VybHlGb3JlY2FzdEFycmF5KVxuICAgICAgICAgICAgZGlzcGxheUZvcmVjYXN0KG5ld0hvdXJseUZvcmVjYXN0QXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gbmV3SG91cmx5Rm9yZWNhc3RBcnJheVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgZmV0Y2hDdXJyZW50V2VhdGhlciA9IChjaXR5UXVlcnkpID0+IHtcbiAgICAvLyBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuXG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgLy8gY29uc3Qge2xhdH0gPSByZXNwb25zZS5jb29yZDtcbiAgICAgICAgICAgIC8vIGNvbnN0IHtsb259ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAgICAgICAvLyBmZXRjaERhaWx5Rm9yZWNhc3QobGF0LCBsb24pO1xuICAgICAgICAgICAgY29uc3QgbmV3V2VhdGhlckNhcmQgPSB7XG4gICAgICAgICAgICAgICAgY2l0eTogcmVzcG9uc2UubmFtZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXNwb25zZS5zeXMuY291bnRyeSxcbiAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICBsb2NhbERhdGU6IGNhbGNDdXJyZW50VGltZShyZXNwb25zZS50aW1lem9uZSksXG4gICAgICAgICAgICAgICAgc3VucmlzZTogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5yaXNlICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHN1bnNldDogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5zZXQgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGVtcEN1cnJlbnQ6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICB0ZW1wSGlnaDogcmVzcG9uc2UubWFpbi50ZW1wX21heCxcbiAgICAgICAgICAgICAgICB0ZW1wTG93OiByZXNwb25zZS5tYWluLnRlbXBfbWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgd2VhdGhlckljb246IHJlc3BvbnNlLndlYXRoZXJbMF0uaWNvbixcbiAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS53aW5kLmd1c3QsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBUElJbWFnZS5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2BcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgICAgICAgc3VibWl0TG9jYXRpb24oYCR7bmV3V2VhdGhlckNhcmQuY2l0eX0sICR7bmV3V2VhdGhlckNhcmQuY291bnRyeX1gKVxuICAgICAgICAgICAgZGlzcGxheVdlYXRoZXIobmV3V2VhdGhlckNhcmQpXG4gICAgICAgICAgICByZXR1cm4gbmV3V2VhdGhlckNhcmRcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IEFQSUNpdHlTZWFyY2ggPSAoaW5wdXQpID0+IHtcbiAgICBmZXRjaEN1cnJlbnRXZWF0aGVyKGlucHV0KVxuICAgIGZldGNoSG91cmx5Rm9yZWNhc3QoaW5wdXQpXG59XG5cbmNvbnN0IHZhbGlkYXRlU2VhcmNoID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAvLyBncmFiIGRvbSBlbGVtZW50c1xuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3TG9jYXRpb25JbnB1dCcpXG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuICAgIC8vIHJlc2V0IGVycm9yXG4gICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICcnXG4gICAgLy8gY2hlY2sgZm9yIHNlYXJjaCB0ZXJtXG4gICAgaWYgKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nXG4gICAgfSBlbHNlIHtcbiAgICAgICAgQVBJQ2l0eVNlYXJjaChuZXdMb2NhdGlvbklucHV0LnZhbHVlKVxuICAgICAgICBoaWRlRm9ybSgpXG4gICAgICAgIG5ld0xvY2F0aW9uSW5wdXQudmFsdWUgPSAnJ1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVBZGRpdGlvbkljb24sXG4gICAgY3JlYXRlRGVsZXRlSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIGNyZWF0ZU1lbnVJY29uLFxuICAgIGRpc3BsYXlXYXRjaGxpc3QsXG4gICAgaGlkZUZvcm0sXG4gICAgc2hvd0Zvcm0sXG4gICAgc3VibWl0TG9jYXRpb24sXG4gICAgdmFsaWRhdGVTZWFyY2gsXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQge1xuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QsXG59IGZyb20gJy4vaGVscGVyRnVuY3Rpb25zJ1xuaW1wb3J0IGdpdGh1Ykljb24gZnJvbSAnLi9hc3NldHMvR2l0SHViLWxpZ2h0LTMycHgucG5nJ1xuaW1wb3J0IGxvZ29JY29uIGZyb20gJy4vYXNzZXRzL2xvZ29JY29uLnN2ZydcblxuY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpXG5cbiAgICAvLyBkaXNwbGF5IGxvZ29cbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBsb2dvLnNyYyA9IGxvZ29JY29uXG4gICAgbG9nby50YXJnZXQgPSAnX2JsYW5rJ1xuICAgIGxvZ28uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsb2dvJylcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbylcblxuICAgIC8vIGRpc3BsYXkgdGl0bGVcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdXZWF0aGVyc2VydmUnXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKVxuXG4gICAgcmV0dXJuIGhlYWRlclxufVxuXG5jb25zdCBjcmVhdGVNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1lbnUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtZW51JylcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgaGVhZGVyXG4gICAgY29uc3Qgd2F0Y2hsaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0SGVhZGVyJylcbiAgICB3YXRjaGxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSAnV2F0Y2hsaXN0J1xuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBtZW51XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QoKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGFkZExvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBidXR0b25cbiAgICBjb25zdCBhZGRMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBhZGRMb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uQnRuJylcbiAgICBjcmVhdGVBZGRpdGlvbkljb24oYWRkTG9jYXRpb24pXG4gICAgY29uc3QgYWRkTG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgYWRkTG9jYXRpb25UZXh0LmlubmVyVGV4dCA9ICdBZGQgTG9jYXRpb24nXG4gICAgYWRkTG9jYXRpb24uYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25UZXh0KVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uKVxuXG4gICAgLy8gR2VuZXJhdGUgYW5kIGhpZGUgbmV3IGxvY2F0aW9uIGZvcm1cbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkZvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLm1ldGhvZCA9ICdnZXQnXG4gICAgY3JlYXRlRm9ybShhZGRMb2NhdGlvbkZvcm0pXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Gb3JtKVxuXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3RIZWFkZXIpXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3QpXG4gICAgbWVudS5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkNvbnRhaW5lcilcblxuICAgIHJldHVybiBtZW51XG59XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJDYXJkID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBXZWF0aGVyIEFQSSBjb250YWluZXJcbiAgICBjb25zdCBXZWF0aGVyQVBJQ29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnV2VhdGhlckFQSUNvbnRhaW50ZXInLCAnY29udGVudCcpXG5cbiAgICAvLyBjcmVhdGUgQVBJIHRpdGxlXG4gICAgY29uc3QgQVBJVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXG4gICAgQVBJVGl0bGUuY2xhc3NMaXN0LmFkZCgnY29udGVudFRpdGxlJylcblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IHRlbXAgY29udGFpbmVyXG4gICAgY29uc3QgdGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0ZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RlbXBDb250YWluZXInKVxuXG4gICAgLy8gY3JlYXRlIEFQSSBpbWdcbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgQVBJSW1hZ2UuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2UnKVxuXG4gICAgLy8gY3JlYXRlIGRlc2NyaXB0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgZGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnd2VhdGhlckRlc2NyaXB0aW9uJylcblxuICAgIC8vIGNyZWF0ZSBsb3cgdGVtcCBjb250YWluZXJcbiAgICBjb25zdCBsb3dUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgbG93VGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsb3dUZW1wQ29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBoaWdoIHRlbXAgY29udGFpbmVyXG4gICAgY29uc3QgaGlnaFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBoaWdoVGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWdoVGVtcENvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgY3VycmVudCB0aW1lIGNvbnRhaW5lclxuICAgIGNvbnN0IHRpbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICB0aW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RpbWVDb250YWluZXInKVxuXG4gICAgLy8gY3JlYXRlIHN1bnJpc2UgY29udGFpbmVyXG4gICAgY29uc3Qgc3VucmlzZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHN1bnJpc2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3VucmlzZUNvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgc3Vuc2V0IGNvbnRhaW5lclxuICAgIGNvbnN0IHN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHN1bnNldENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdW5zZXRDb250YWluZXInKVxuXG4gICAgLy8gY3JlYXRlIHdpbmQgY29udGFpbmVyXG4gICAgY29uc3Qgd2luZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHdpbmRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnd2luZENvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgaHVtaWRpdHkgY29udGFpbmVyXG4gICAgY29uc3QgaHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBodW1pZGl0eUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdodW1pZGl0eUNvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgZm9yZWNhc3QgY29udGFpbmVyXG4gICAgY29uc3QgZm9yZWNhc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcmVjYXN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Q29udGFpbmVyJylcblxuICAgIGNvbnN0IGZvcmVjYXN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXG4gICAgZm9yZWNhc3RUaXRsZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRpdGxlJylcbiAgICBmb3JlY2FzdFRpdGxlLmlubmVyVGV4dCA9ICdGaXZlIGRheSwgdGhyZWUgaG91ciBmb3JlY2FzdDonXG5cbiAgICBjb25zdCBmb3JlY2FzdFRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKVxuICAgIGZvcmVjYXN0VGFibGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUYWJsZScpXG4gICAgZm9yZWNhc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUYWJsZSlcblxuICAgIGNvbnN0IGZvcmVjYXN0Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuICAgIGZvcmVjYXN0Um93LmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Um93JylcbiAgICBmb3JlY2FzdFRhYmxlLmFwcGVuZENoaWxkKGZvcmVjYXN0Um93KVxuXG4gICAgLy8gbWFrZSBzY3JvbGx3aGVlbCBmdW5jdGlvbmFsIHdpdGggaG9yaXpvbnRhbCBzY3JvbGxpbmdcbiAgICBmb3JlY2FzdFJvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBmb3JlY2FzdFJvdy5zY3JvbGxMZWZ0ICs9IGUuZGVsdGFZXG4gICAgfSlcblxuICAgIC8vIEFwcGVuZFxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVRpdGxlKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHRlbXBDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkNvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChsb3dUZW1wQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGhpZ2hUZW1wQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQodGltZUNvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChzdW5yaXNlQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHN1bnNldENvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHdpbmRDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoaHVtaWRpdHlDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaXRsZSlcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChmb3JlY2FzdENvbnRhaW5lcilcblxuICAgIHJldHVybiBXZWF0aGVyQVBJQ29udGFpbnRlclxufVxuXG5jb25zdCBjcmVhdGVDb250ZW50ID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBjb250ZW50IGNvbnRhaW5lclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29udGVudCcpXG5cbiAgICAvLyBkaXNwbGF5IHdlYXRoZXIgY2FyZFxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY3JlYXRlV2VhdGhlckNhcmQoKSlcblxuICAgIHJldHVybiBjb250ZW50XG59XG5cbmNvbnN0IGNyZWF0ZUZvb3RlciA9ICgpID0+IHtcbiAgICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb290ZXInKVxuXG4gICAgY29uc3QgY29weXJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgY29weXJpZ2h0LnRleHRDb250ZW50ID0gYENvcHlyaWdodCDCqSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gamNhbXBiZWxsNTdgXG5cbiAgICBjb25zdCBnaXRodWJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgZ2l0aHViTGluay5ocmVmID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9qY2FtcGJlbGw1NydcbiAgICBnaXRodWJMaW5rLnRhcmdldCA9ICdfYmxhbmsnXG5cbiAgICBjb25zdCBuZXdHaXRodWJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdHaXRodWJJY29uLnNyYyA9IGdpdGh1Ykljb25cbiAgICBuZXdHaXRodWJJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZ2l0aHViJylcblxuICAgIGdpdGh1YkxpbmsuYXBwZW5kQ2hpbGQobmV3R2l0aHViSWNvbilcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoY29weXJpZ2h0KVxuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChnaXRodWJMaW5rKVxuXG4gICAgcmV0dXJuIGZvb3RlclxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlSGVhZGVyKCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVNZW51KCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVDb250ZW50KCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVGb290ZXIoKSlcbn1cbiJdLCJuYW1lcyI6WyJhZGRpdGlvbkljb24iLCJkZWxldGVJY29uIiwibWVudUljb24iLCJkb2N1bWVudCIsImNvb2tpZSIsImNyZWF0ZU1lbnVJY29uIiwibGkiLCJjaGVja2xpc3RJY29uIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlTGlzdGluZyIsImxvY2F0aW9uTmFtZSIsImkiLCJ3YXRjaGxpc3QiLCJxdWVyeVNlbGVjdG9yIiwibG9jYXRpb24iLCJjbGFzc0xpc3QiLCJhZGQiLCJzZWxlY3RlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJzZWxlY3RMb2NhdGlvbiIsImxvY2F0aW9uVGV4dCIsInRleHRDb250ZW50IiwibmFtZSIsImNyZWF0ZURlbGV0ZUljb24iLCJkaXNwbGF5V2F0Y2hsaXN0Iiwib2xkTGlzdGluZ0NvdW50IiwiY2hpbGRFbGVtZW50Q291bnQiLCJmaXJzdENoaWxkIiwicmVtb3ZlIiwic3RvcmFnZVdhdGNobGlzdCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJmb3JFYWNoIiwic3VibWl0TG9jYXRpb24iLCJpbnB1dCIsIm5ld0xvY2F0aW9uIiwicHVzaCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJkaXNwbGF5V2VhdGhlciIsIm5ld1dlYXRoZXJDYXJkIiwiY29udGVudFRpdGxlIiwiY2l0eSIsImNvdW50cnkiLCJBUElJbWFnZSIsIndlYXRoZXJJY29uIiwid2VhdGhlckRlc2NyaXB0aW9uIiwiaW5uZXJUZXh0IiwidGVtcENvbnRhaW5lciIsIk1hdGgiLCJyb3VuZCIsInRlbXBDdXJyZW50IiwibG93VGVtcENvbnRhaW5lciIsInRlbXBMb3ciLCJoaWdoVGVtcENvbnRhaW5lciIsInRlbXBIaWdoIiwidGltZUNvbnRhaW5lciIsImxvY2FsRGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsInN1bnJpc2VDb250YWluZXIiLCJzdW5yaXNlIiwic3Vuc2V0Q29udGFpbmVyIiwic3Vuc2V0Iiwid2luZENvbnRhaW5lciIsIndpbmRTcGVlZCIsIndpbmREaXJlY3Rpb24iLCJ3aW5kRGVncmVlIiwiaHVtaWRpdHlDb250YWluZXIiLCJodW1pZGl0eSIsImRpc3BsYXlGb3JlY2FzdCIsIm5ld0hvdXJseUZvcmVjYXN0QXJyYXkiLCJmb3JlY2FzdFJvdyIsIm9sZEZvcmVjYXN0IiwibGVuZ3RoIiwiZm9yZWNhc3RDZWxsIiwiZm9yZWNhc3REYXRlIiwiZGF0ZSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImZvcmVjYXN0VGltZSIsInRvTG9jYWxlVGltZVN0cmluZyIsIndlYXRoZXJGb3JlY2FzdEljb24iLCJmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbiIsImZvcmVjYXN0VGVtcCIsInRlbXBlcmF0dXJlIiwiQVBJQ2l0eVNlYXJjaCIsImdldEF0dHJpYnV0ZSIsInNlbGVjdGVkTG9jYXRpb25JZCIsImNyZWF0ZUFkZEJ1dHRvbiIsImNvbnRhaW5lciIsImFkZEJ0biIsInZhbGlkYXRlU2VhcmNoIiwiY3JlYXRlQ2FuY2VsQnV0dG9uIiwiY2FuY2VsQnRuIiwiY3JlYXRlRm9ybSIsImZvcm0iLCJmb3JtUm93MSIsIm5ld0xvY2F0aW9uSW5wdXQiLCJwbGFjZWhvbGRlciIsImZvcm1Sb3cyIiwiZm9ybVJvdzMiLCJzaG93Rm9ybSIsImFkZExvY2F0aW9uQnRuIiwiYWRkTG9jYXRpb25Gb3JtIiwiaGlkZUZvcm0iLCJkZWxldGVXYXRjaGxpc3RFbnRyeSIsImRvb21lZEluZGV4Iiwic3BsaWNlIiwibmV3RGVsZXRlSWNvbiIsInRyYXNoSWNvbiIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVBZGRpdGlvbkljb24iLCJuZXdBZGRpdGlvbkljb24iLCJ0b0RpcmVjdGlvbiIsImRlZ3JlZSIsImNhbGNDdXJyZW50VGltZSIsInRpbWV6b25lIiwiZCIsIkRhdGUiLCJsb2NhbFRpbWUiLCJnZXRUaW1lIiwibG9jYWxPZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsInV0YyIsIm5ld0NpdHkiLCJjYWxjU3VuVGltZSIsInRpbWUiLCJmZXRjaEhvdXJseUZvcmVjYXN0IiwiY2l0eVF1ZXJ5IiwibmV3UHJvakVycm9yQ29udGFpbmVyIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm5ld0hvdXJseUZvcmVjYXN0IiwibGlzdCIsImR0X3R4dCIsImRhdGVUZXh0IiwibWFpbiIsInJhaW5DaGFuY2UiLCJwb3AiLCJ0ZW1wIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXIiLCJkZXNjcmlwdGlvbiIsImljb24iLCJ3aW5kIiwiZGVnIiwid2luZEd1c3QiLCJndXN0Iiwic3BlZWQiLCJjYXRjaCIsImVyciIsImZldGNoQ3VycmVudFdlYXRoZXIiLCJzeXMiLCJ0ZW1wX21heCIsInRlbXBfbWluIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsImdpdGh1Ykljb24iLCJsb2dvSWNvbiIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImxvZ28iLCJ0aXRsZSIsImNyZWF0ZU1lbnUiLCJtZW51Iiwid2F0Y2hsaXN0SGVhZGVyIiwiYWRkTG9jYXRpb25Db250YWluZXIiLCJhZGRMb2NhdGlvbiIsImFkZExvY2F0aW9uVGV4dCIsIm1ldGhvZCIsImNyZWF0ZVdlYXRoZXJDYXJkIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJBUElUaXRsZSIsImRlc2NyaXB0aW9uQ29udGFpbmVyIiwiZm9yZWNhc3RDb250YWluZXIiLCJmb3JlY2FzdFRpdGxlIiwiZm9yZWNhc3RUYWJsZSIsInNjcm9sbExlZnQiLCJkZWx0YVkiLCJjcmVhdGVDb250ZW50IiwiY29udGVudCIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNvcHlyaWdodCIsImdldEZ1bGxZZWFyIiwiZ2l0aHViTGluayIsImhyZWYiLCJuZXdHaXRodWJJY29uIiwiaW5pdGlhbGl6ZSIsImJvZHkiXSwic291cmNlUm9vdCI6IiJ9