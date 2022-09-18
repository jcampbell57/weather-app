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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0sQ0FBQzFMLFdBQVAsQ0FBbUI2TCxVQUFuQjtFQUVBLE9BQU9ILE1BQVA7QUFDSCxDQW5CRDs7QUFxQmUsU0FBU00sVUFBVCxHQUFzQjtFQUNqQ3hNLFFBQVEsQ0FBQ3lNLElBQVQsQ0FBY2pNLFdBQWQsQ0FBMEJtSyxZQUFZLEVBQXRDO0VBQ0EzSyxRQUFRLENBQUN5TSxJQUFULENBQWNqTSxXQUFkLENBQTBCdUssVUFBVSxFQUFwQztFQUNBL0ssUUFBUSxDQUFDeU0sSUFBVCxDQUFjak0sV0FBZCxDQUEwQnVMLGFBQWEsRUFBdkM7RUFDQS9MLFFBQVEsQ0FBQ3lNLElBQVQsQ0FBY2pNLFdBQWQsQ0FBMEJ5TCxZQUFZLEVBQXRDO0FBQ0gsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2hlbHBlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcGFnZUxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWRkaXRpb25JY29uIGZyb20gJy4vYXNzZXRzL3BsdXMuc3ZnJ1xuaW1wb3J0IGRlbGV0ZUljb24gZnJvbSAnLi9hc3NldHMvZGVsZXRlLnN2ZydcbmltcG9ydCBtZW51SWNvbiBmcm9tICcuL2Fzc2V0cy9tZW51SWNvbi5zdmcnXG5cbmRvY3VtZW50LmNvb2tpZSA9ICdTYW1lU2l0ZT1MYXgnXG5cbmNvbnN0IGNyZWF0ZU1lbnVJY29uID0gKGxpKSA9PiB7XG4gICAgY29uc3QgY2hlY2tsaXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgY2hlY2tsaXN0SWNvbi5zcmMgPSBtZW51SWNvblxuICAgIGNoZWNrbGlzdEljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChjaGVja2xpc3RJY29uKVxufVxuXG4vLyBBZGQgc2luZ2xlIGxvY2F0aW9uIHRvIHdhdGNobGlzdCAoY2FsbGVkIGJlbG93KVxuY29uc3QgY3JlYXRlTGlzdGluZyA9IChsb2NhdGlvbk5hbWUsIGkpID0+IHtcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2F0Y2hsaXN0JylcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGxvY2F0aW9uLmNsYXNzTGlzdC5hZGQoYGxvY2F0aW9uYClcbiAgICBsb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuICAgIC8vIGFzc2lnbiBjbGFzcyB0byBzZWxlY3RlZCBsb2NhdGlvbiBsaXN0aW5nXG4gICAgaWYgKGxvY2F0aW9uTmFtZS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgICAgIC8vIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKVxuICAgIH1cblxuICAgIC8vIGV2ZW50IGxpc3RlbmVyIHRvIGRpc3BsYXkgc2VsZWN0ZWQgbG9jYXRpb24ncyB3ZWF0aGVyXG4gICAgbG9jYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBpZiBkZWxldGluZyBsaXN0aW5nLCBkbyBub3QgZGlzcGxheSB3ZWF0aGVyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZUl0ZW0nKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0TG9jYXRpb24obG9jYXRpb24pXG4gICAgfSlcblxuICAgIGNyZWF0ZU1lbnVJY29uKGxvY2F0aW9uKVxuICAgIGNvbnN0IGxvY2F0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGxvY2F0aW9uVGV4dC50ZXh0Q29udGVudCA9IGxvY2F0aW9uTmFtZS5uYW1lXG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQobG9jYXRpb25UZXh0KVxuICAgIGNyZWF0ZURlbGV0ZUljb24obG9jYXRpb24sIGkpXG4gICAgd2F0Y2hsaXN0LmFwcGVuZENoaWxkKGxvY2F0aW9uKVxufVxuXG4vLyBEaXNwbGF5IGVudGlyZSBhcnJheSBvZiBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG5jb25zdCBkaXNwbGF5V2F0Y2hsaXN0ID0gKCkgPT4ge1xuICAgIC8vIEdyYWIgd2F0Y2hsaXN0XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICAvLyBDbGVhciBsb2NhdGlvbiBsaXN0aW5nc1xuICAgIGNvbnN0IG9sZExpc3RpbmdDb3VudCA9IHdhdGNobGlzdC5jaGlsZEVsZW1lbnRDb3VudFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkTGlzdGluZ0NvdW50OyBpKyspIHtcbiAgICAgICAgd2F0Y2hsaXN0LmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgYWxsIGxvY2F0aW9ucyB0byB3YXRjaGxpc3RcbiAgICBsZXQgaSA9IDBcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcbiAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlV2F0Y2hsaXN0KVxuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgY3JlYXRlTGlzdGluZyhsb2NhdGlvbiwgaSlcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBBUElDaXR5U2VhcmNoKGxvY2F0aW9uLm5hbWUpXG4gICAgICAgIH1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgIGkrK1xuICAgIH0pXG59XG5cbmNvbnN0IHN1Ym1pdExvY2F0aW9uID0gKGlucHV0KSA9PiB7XG4gICAgLy8gY3JlYXRlIGxvY2F0aW9uIG9iamVjdFxuICAgIGNvbnN0IG5ld0xvY2F0aW9uID0ge1xuICAgICAgICBuYW1lOiBpbnB1dCxcbiAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgfVxuXG4gICAgLy8gZ3JhYiBhcnJheSBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIGRlc2VsZWN0IHByZXZpb3VzbHkgc2VsZWN0ZWQgbG9jYXRpb25cbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIHB1c2ggbG9jYXRpb24gdG8gYXJyYXlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnB1c2gobmV3TG9jYXRpb24pXG4gICAgLy8gY29uc29sZS5sb2coc3RvcmFnZVdhdGNobGlzdClcblxuICAgIC8vIHNldCBhcnJheSBiYWNrIGludG8gc3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyByZWZyZXNoIHdhdGNobGlzdFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBkaXNwbGF5V2VhdGhlciA9IChuZXdXZWF0aGVyQ2FyZCkgPT4ge1xuICAgIC8vIGRpc3BsYXkgY29udGVudCB0aXRsZVxuICAgIGNvbnN0IGNvbnRlbnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50VGl0bGUnKVxuICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9IGAke25ld1dlYXRoZXJDYXJkLmNpdHl9LCAke25ld1dlYXRoZXJDYXJkLmNvdW50cnl9YFxuXG4gICAgLy8gZGlzcGxheSB3ZWF0aGVyIGljb25cbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7bmV3V2VhdGhlckNhcmQud2VhdGhlckljb259QDJ4LnBuZ2BcblxuICAgIC8vIGRpc3BsYXkgZGVzY3JpcHRpb25cbiAgICBjb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gYFdlYXRoZXI6ICR7bmV3V2VhdGhlckNhcmQud2VhdGhlckRlc2NyaXB0aW9ufWBcblxuICAgIC8vIGRpc3BsYXkgY3VycmVudCB0ZW1wZXJhdHVyZVxuICAgIGNvbnN0IHRlbXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcENvbnRhaW5lcicpXG4gICAgdGVtcENvbnRhaW5lci5pbm5lclRleHQgPSBgJHtNYXRoLnJvdW5kKG5ld1dlYXRoZXJDYXJkLnRlbXBDdXJyZW50KX1cXHUwMEIwYFxuXG4gICAgLy8gZGlzcGxheSBoaWdoL2xvdyB0ZW1wZXJhdHVyZXNcbiAgICBjb25zdCBsb3dUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvd1RlbXBDb250YWluZXInKVxuICAgIGxvd1RlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYExvdyB0ZW1wZXJhdHVyZTogJHtNYXRoLnJvdW5kKFxuICAgICAgICBuZXdXZWF0aGVyQ2FyZC50ZW1wTG93XG4gICAgKX1cXHUwMEIwYFxuICAgIGNvbnN0IGhpZ2hUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZ2hUZW1wQ29udGFpbmVyJylcbiAgICBoaWdoVGVtcENvbnRhaW5lci5pbm5lclRleHQgPSBgSGlnaCB0ZW1wZXJhdHVyZTogJHtNYXRoLnJvdW5kKFxuICAgICAgICBuZXdXZWF0aGVyQ2FyZC50ZW1wSGlnaFxuICAgICl9XFx1MDBCMGBcblxuICAgIC8vIGRpcGxheSBjdXJyZW50IHRpbWVcbiAgICBjb25zdCB0aW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVDb250YWluZXInKVxuICAgIHRpbWVDb250YWluZXIuaW5uZXJUZXh0ID0gYExvY2FsIHRpbWU6ICR7bmV3V2VhdGhlckNhcmQubG9jYWxEYXRlLmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQubG9jYWxEYXRlLmdldE1pbnV0ZXMoKX1gXG5cbiAgICAvLyBkaXNwbGF5IHN1bnJpc2Uvc3Vuc2V0IHRpbWVzXG4gICAgY29uc3Qgc3VucmlzZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdW5yaXNlQ29udGFpbmVyJylcbiAgICBzdW5yaXNlQ29udGFpbmVyLmlubmVyVGV4dCA9IGBTdW5yaXNlOiAke25ld1dlYXRoZXJDYXJkLnN1bnJpc2UuZ2V0SG91cnMoKX06JHtuZXdXZWF0aGVyQ2FyZC5zdW5yaXNlLmdldE1pbnV0ZXMoKX1gXG4gICAgY29uc3Qgc3Vuc2V0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1bnNldENvbnRhaW5lcicpXG4gICAgc3Vuc2V0Q29udGFpbmVyLmlubmVyVGV4dCA9IGBTdW5zZXQ6ICR7bmV3V2VhdGhlckNhcmQuc3Vuc2V0LmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQuc3Vuc2V0LmdldE1pbnV0ZXMoKX1gXG5cbiAgICAvLyBkaXNwbGF5IHdpbmRcbiAgICBjb25zdCB3aW5kQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmRDb250YWluZXInKVxuICAgIHdpbmRDb250YWluZXIuaW5uZXJUZXh0ID0gYFdpbmQ6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQud2luZFNwZWVkXG4gICAgKX1tcGgsICR7bmV3V2VhdGhlckNhcmQud2luZERpcmVjdGlvbn0gKCR7bmV3V2VhdGhlckNhcmQud2luZERlZ3JlZX1cXHUwMEIwKWBcblxuICAgIC8vIGRpc3BsYXkgaHVtaWRpdHlcbiAgICBjb25zdCBodW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eUNvbnRhaW5lcicpXG4gICAgaHVtaWRpdHlDb250YWluZXIuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAke25ld1dlYXRoZXJDYXJkLmh1bWlkaXR5fSVgXG59XG5cbmNvbnN0IGRpc3BsYXlGb3JlY2FzdCA9IChuZXdIb3VybHlGb3JlY2FzdEFycmF5KSA9PiB7XG4gICAgY29uc3QgZm9yZWNhc3RSb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9yZWNhc3RSb3cnKVxuXG4gICAgLy8gcmVtb3ZlIGFueSBmb3JlY2FzdCBjZWxsc1xuICAgIGNvbnN0IG9sZEZvcmVjYXN0ID0gZm9yZWNhc3RSb3cuY2hpbGRFbGVtZW50Q291bnRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZEZvcmVjYXN0OyBpKyspIHtcbiAgICAgICAgZm9yZWNhc3RSb3cuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgIH1cblxuICAgIC8vIEFkZCBuZXcgZm9yZWNhc3QgY2VsbHNcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0hvdXJseUZvcmVjYXN0QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgICAgICBmb3JlY2FzdENlbGwuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RDZWxsJylcblxuICAgICAgICAvLyBkaXNwbGF5IGRhdGVcbiAgICAgICAgY29uc3QgZm9yZWNhc3REYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0RGF0ZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdERhdGUnKVxuICAgICAgICBmb3JlY2FzdERhdGUuaW5uZXJUZXh0ID0gYCR7XG4gICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLmRhdGUuZ2V0TW9udGgoKSArIDFcbiAgICAgICAgfS8ke25ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0uZGF0ZS5nZXREYXRlKCl9YFxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3REYXRlKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgdGltZVxuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgZm9yZWNhc3RUaW1lLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0VGltZScpXG4gICAgICAgIGZvcmVjYXN0VGltZS5pbm5lclRleHQgPVxuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZygpXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbWUpXG5cbiAgICAgICAgLy8gZGlzcGxheSB3ZWF0aGVyIGljb25cbiAgICAgICAgY29uc3Qgd2VhdGhlckZvcmVjYXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgIHdlYXRoZXJGb3JlY2FzdEljb24uY2xhc3NMaXN0LmFkZCgnd2VhdGhlckZvcmVjYXN0SWNvbicpXG4gICAgICAgIHdlYXRoZXJGb3JlY2FzdEljb24uc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7bmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS53ZWF0aGVySWNvbn0ucG5nYFxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQod2VhdGhlckZvcmVjYXN0SWNvbilcblxuICAgICAgICAvLyBkaXNwbGF5IHdlYXRoZXIgZGVzY3JpcHRpb25cbiAgICAgICAgY29uc3QgZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24nKVxuICAgICAgICBmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbi5pbm5lclRleHQgPVxuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS53ZWF0aGVyRGVzY3JpcHRpb25cbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgZm9yZWNhc3QgdGVtcGVyYXR1cmVcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRlbXAnKVxuICAgICAgICBmb3JlY2FzdFRlbXAuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZChcbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0udGVtcGVyYXR1cmVcbiAgICAgICAgKX1cXHUwMEIwYFxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZW1wKVxuXG4gICAgICAgIGZvcmVjYXN0Um93LmFwcGVuZENoaWxkKGZvcmVjYXN0Q2VsbClcbiAgICB9XG59XG5cbmNvbnN0IHNlbGVjdExvY2F0aW9uID0gKGxpKSA9PiB7XG4gICAgLy8gZ3JhYiBsb2NhdGlvbnMgYXJyYXkgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBkZXNlbGVjdCBhbGwgbG9jYXRpb25zXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBTZWxlY3QgbG9jYXRpb24gaWYgb25lIGlzIGNob3NlbiAobWFpbiBtZW51IHNlbGVjdGlvbiBpcyBoYW5kbGVkIGluIGV2ZW50IGxpc3RlbmVyKVxuICAgIGlmIChsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2xvY2F0aW9uJykpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMb2NhdGlvbklkID0gbGkuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgICAgIHN0b3JhZ2VXYXRjaGxpc3Rbc2VsZWN0ZWRMb2NhdGlvbklkXS5zZWxlY3RlZCA9IHRydWVcbiAgICB9XG5cbiAgICAvLyBzZXQgbG9jYXRpb25zIGFycmF5IGJhY2sgaW50byBsb2NhbFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gcmVmcmVzaFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBjcmVhdGVBZGRCdXR0b24gPSAoY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnYWRkQnRuJylcbiAgICBhZGRCdG4uaW5uZXJUZXh0ID0gJ3NlYXJjaCdcbiAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdmFsaWRhdGVTZWFyY2goZSkpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZEJ0bilcbn1cblxuY29uc3QgY3JlYXRlQ2FuY2VsQnV0dG9uID0gKGNvbnRhaW5lciwgaSkgPT4ge1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ2NhbmNlbEJ0bicpXG4gICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG4gICAgY2FuY2VsQnRuLmlubmVyVGV4dCA9ICdjYW5jZWwnXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmNlbEJ0bilcbn1cblxuLy8gY3JlYXRlRm9ybVxuY29uc3QgY3JlYXRlRm9ybSA9IChmb3JtKSA9PiB7XG4gICAgLy8gcm93IG9uZTogYXNzaWduIGlucHV0XG4gICAgY29uc3QgZm9ybVJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LmNsYXNzTGlzdC5hZGQoJ25ld0xvY2F0aW9uSW5wdXQnKVxuICAgIG5ld0xvY2F0aW9uSW5wdXQucGxhY2Vob2xkZXIgPSAnRmxvcmVuY2UnXG4gICAgbmV3TG9jYXRpb25JbnB1dC5uYW1lID0gJ25ld0xvY2F0aW9uSW5wdXQnXG4gICAgZm9ybVJvdzEuYXBwZW5kQ2hpbGQobmV3TG9jYXRpb25JbnB1dClcblxuICAgIC8vIHJvdyB0d286IHN1Ym1pdCBhbmQgY2FuY2VsIGJ1dHRvbnNcbiAgICBjb25zdCBmb3JtUm93MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmb3JtUm93JylcbiAgICBmb3JtUm93Mi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zvcm1CdXR0b25zJylcbiAgICBjcmVhdGVBZGRCdXR0b24oZm9ybVJvdzIsIGZvcm0pXG4gICAgY3JlYXRlQ2FuY2VsQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuXG4gICAgLy8gcm93IHRocmVlOiBhc3NpZ24gZXJyb3IgY2xhc3MgYW5kIHRleHRcbiAgICBjb25zdCBmb3JtUm93MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgLy8gZm9ybVJvdzMuc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxuICAgIGZvcm1Sb3czLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbmV3UHJvakVycm9yQ29udGFpbmVyJylcbiAgICAvLyBmb3JtUm93My5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nXG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cxKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzIpXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93Mylcbn1cblxuY29uc3Qgc2hvd0Zvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkTG9jYXRpb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25CdG4nKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkZvcm0nKVxuXG4gICAgYWRkTG9jYXRpb25CdG4uc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Nob3dCbG9jaycpXG59XG5cbmNvbnN0IGhpZGVGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZExvY2F0aW9uQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uQnRuJylcbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25Gb3JtJylcblxuICAgIGFkZExvY2F0aW9uQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2hvd0Jsb2NrJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxufVxuXG4vLyBEZWxldGUgd2F0Y2hsaXN0IGVudHJ5XG5jb25zdCBkZWxldGVXYXRjaGxpc3RFbnRyeSA9IChlKSA9PiB7XG4gICAgLy8gZ3JhYiBhcnJheXMgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBJZGVudGlmeSBlbnRyeSB0byBkZWxldGVcbiAgICBjb25zdCBkb29tZWRJbmRleCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgIC8vIGNvbnN0IGRvb21lZE5hbWUgPSBzdG9yYWdlV2F0Y2hsaXN0W2Rvb21lZEluZGV4XS5uYW1lO1xuXG4gICAgLy8gZGVsZXRlIGVudHJ5XG4gICAgc3RvcmFnZVdhdGNobGlzdC5zcGxpY2UoZG9vbWVkSW5kZXgsIDEpXG5cbiAgICAvLyBzZXQgY2hhbmdlcyB0byBsb2NhbFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gSWYgZG9vbWVkIGVudHJ5IHdhcyBzZWxlY3RlZCwgY2xlYXIgY29udGVudCBkaXNwbGF5XG4gICAgLy8gY29uc3QgY29udGVudFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRUaXRsZScpO1xuICAgIC8vIGNvbnN0IGFsbFRhc2tzQ2xhc3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbFRhc2tzJykuY2xhc3NMaXN0XG4gICAgLy8gaWYgKGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9PT0gZG9vbWVkTmFtZSkge1xuICAgIC8vICAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSAnQWxsIHRhc2tzJ1xuICAgIC8vICAgICBhbGxUYXNrc0NsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAvLyB9XG5cbiAgICAvLyByZWZyZXNoIHdhdGNoaXN0XG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IGNyZWF0ZURlbGV0ZUljb24gPSAoY29udGFpbmVyLCBpKSA9PiB7XG4gICAgLy8gY3JlYXRlIGltYWdlIGFuZCBhc3NpZ24gYXR0cmlidXRlc1xuICAgIGNvbnN0IG5ld0RlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0RlbGV0ZUljb24uc3JjID0gZGVsZXRlSWNvblxuICAgIG5ld0RlbGV0ZUljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uIGRlbGV0ZUl0ZW0nKVxuICAgIG5ld0RlbGV0ZUljb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcblxuICAgIC8vIEFERCBFVkVOVCBMSVNURU5FUlxuICAgIGlmIChcbiAgICAgICAgY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSA9PT0gJ2xvY2F0aW9uJyB8fFxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NhdGlvbicpXG4gICAgKSB7XG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyIHRvIGRlbGV0ZSBsb2NhdGlvblxuICAgICAgICBuZXdEZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnlgLFxuICAgICAgICAgICAgYGRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWAsXG4gICAgICAgICAgICBgaGlkZGVuYFxuICAgICAgICApXG4gICAgICAgIG5ld0RlbGV0ZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT5cbiAgICAgICAgICAgIGRlbGV0ZVdhdGNobGlzdEVudHJ5KGUsIGkpXG4gICAgICAgIClcbiAgICAgICAgLy8gZGlzcGxheSB0cmFzaCBpY29uIG9uIGhvdmVyXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICBgLmRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB9KVxuICAgICAgICAvLyBoaWRlIHRyYXNoIGljb25cbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgc3RyYW5nZScpXG4gICAgfVxuICAgIC8vIGFwcGVuZCB0byBjb250YWluZXJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmV3RGVsZXRlSWNvbilcbn1cblxuY29uc3QgY3JlYXRlQWRkaXRpb25JY29uID0gKGxpKSA9PiB7XG4gICAgY29uc3QgbmV3QWRkaXRpb25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdBZGRpdGlvbkljb24uc3JjID0gYWRkaXRpb25JY29uXG4gICAgbmV3QWRkaXRpb25JY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQobmV3QWRkaXRpb25JY29uKVxufVxuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyBPcGVud2VhdGhlciBBUEkgRnVuY3Rpb25zXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmZ1bmN0aW9uIHRvRGlyZWN0aW9uKGRlZ3JlZSkge1xuICAgIGlmIChkZWdyZWUgPiAzMzcuNSkgcmV0dXJuICdOb3J0aCdcbiAgICBpZiAoZGVncmVlID4gMjkyLjUpIHJldHVybiAnTm9ydGggV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMjQ3LjUpIHJldHVybiAnV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMjAyLjUpIHJldHVybiAnU291dGggV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMTU3LjUpIHJldHVybiAnU291dGgnXG4gICAgaWYgKGRlZ3JlZSA+IDEyMi41KSByZXR1cm4gJ1NvdXRoIEVhc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDY3LjUpIHJldHVybiAnRWFzdCdcbiAgICBpZiAoZGVncmVlID4gMjIuNSkgcmV0dXJuICdOb3J0aCBFYXN0J1xuICAgIHJldHVybiAnTm9ydGgnXG59XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYyMzc2MTE1L2hvdy10by1vYnRhaW4tb3Blbi13ZWF0aGVyLWFwaS1kYXRlLXRpbWUtZnJvbS1jaXR5LWJlaW5nLWZldGNoZWRcbmNvbnN0IGNhbGNDdXJyZW50VGltZSA9ICh0aW1lem9uZSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3QgbG9jYWxUaW1lID0gZC5nZXRUaW1lKClcbiAgICBjb25zdCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwXG4gICAgY29uc3QgdXRjID0gbG9jYWxUaW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbmNvbnN0IGNhbGNTdW5UaW1lID0gKHRpbWUsIHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwXG4gICAgY29uc3QgdXRjID0gdGltZSArIGxvY2FsT2Zmc2V0XG4gICAgY29uc3QgbmV3Q2l0eSA9IHV0YyArIDEwMDAgKiB0aW1lem9uZVxuICAgIHJldHVybiBuZXcgRGF0ZShuZXdDaXR5KVxufVxuXG4vLyBjb25zdCBmZXRjaERhaWx5Rm9yZWNhc3QgPSAobGF0LCBsb24pID0+IHtcbi8vICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld1Byb2pFcnJvckNvbnRhaW5lcicpO1xuLy8gICBjb25zb2xlLmxvZyhsYXQpO1xuLy8gICBjb25zb2xlLmxvZyhsb24pO1xuLy8gICAvLyBmZXRjaCBzZXZlbiBkYXkgZm9yZWNhc3Rcbi8vICAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZleGNsdWRlPW1pbnV0ZWx5LGhvdXJseSxhbGVydHMmdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuLy8gICAgIH0pXG4vLyAgICAgLmNhdGNoKChlcnIpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJztcbi8vICAgICB9KTtcbi8vIH07XG5cbmNvbnN0IGZldGNoSG91cmx5Rm9yZWNhc3QgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuICAgIC8vIGZldGNoIGZpdmUgZGF5L3RocmVlIGhvdXIgZm9yZWNhc3RcbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3RBcnJheSA9IFtdXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShyZXNwb25zZS5saXN0W2ldLmR0X3R4dCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUZXh0OiByZXNwb25zZS5saXN0W2ldLmR0X3R4dCxcbiAgICAgICAgICAgICAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICAgICAgcmFpbkNoYW5jZTogcmVzcG9uc2UubGlzdFtpXS5wb3AgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVySWNvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmljb24sXG4gICAgICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcsXG4gICAgICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcpLFxuICAgICAgICAgICAgICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2UubGlzdFtpXS53aW5kLmd1c3QsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2UubGlzdFtpXS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5LnB1c2gobmV3SG91cmx5Rm9yZWNhc3QpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdIb3VybHlGb3JlY2FzdEFycmF5KVxuICAgICAgICAgICAgZGlzcGxheUZvcmVjYXN0KG5ld0hvdXJseUZvcmVjYXN0QXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gbmV3SG91cmx5Rm9yZWNhc3RBcnJheVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgZmV0Y2hDdXJyZW50V2VhdGhlciA9IChjaXR5UXVlcnksIGUpID0+IHtcbiAgICAvLyBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuXG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgLy8gY29uc3Qge2xhdH0gPSByZXNwb25zZS5jb29yZDtcbiAgICAgICAgICAgIC8vIGNvbnN0IHtsb259ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAgICAgICAvLyBmZXRjaERhaWx5Rm9yZWNhc3QobGF0LCBsb24pO1xuICAgICAgICAgICAgY29uc3QgbmV3V2VhdGhlckNhcmQgPSB7XG4gICAgICAgICAgICAgICAgY2l0eTogcmVzcG9uc2UubmFtZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXNwb25zZS5zeXMuY291bnRyeSxcbiAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICBsb2NhbERhdGU6IGNhbGNDdXJyZW50VGltZShyZXNwb25zZS50aW1lem9uZSksXG4gICAgICAgICAgICAgICAgc3VucmlzZTogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5yaXNlICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHN1bnNldDogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5zZXQgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGVtcEN1cnJlbnQ6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICB0ZW1wSGlnaDogcmVzcG9uc2UubWFpbi50ZW1wX21heCxcbiAgICAgICAgICAgICAgICB0ZW1wTG93OiByZXNwb25zZS5tYWluLnRlbXBfbWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgd2VhdGhlckljb246IHJlc3BvbnNlLndlYXRoZXJbMF0uaWNvbixcbiAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS53aW5kLmd1c3QsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBUElJbWFnZS5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2BcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkQnRuJykgPT09IHRydWVcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN1Ym1pdExvY2F0aW9uKFxuICAgICAgICAgICAgICAgICAgICBgJHtuZXdXZWF0aGVyQ2FyZC5jaXR5fSwgJHtuZXdXZWF0aGVyQ2FyZC5jb3VudHJ5fWBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNwbGF5V2VhdGhlcihuZXdXZWF0aGVyQ2FyZClcbiAgICAgICAgICAgIHJldHVybiBuZXdXZWF0aGVyQ2FyZFxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgQVBJQ2l0eVNlYXJjaCA9IChpbnB1dCwgZSkgPT4ge1xuICAgIGZldGNoQ3VycmVudFdlYXRoZXIoaW5wdXQsIGUpXG4gICAgZmV0Y2hIb3VybHlGb3JlY2FzdChpbnB1dClcbn1cblxuY29uc3QgYWRkRGVmYXVsdENvbnRlbnQgPSAoKSA9PiB7XG4gICAgc3VibWl0TG9jYXRpb24oJ1NhbiBGcmFuY2lzY28sIFVTJylcbiAgICBzdWJtaXRMb2NhdGlvbignU2VhdHRsZSwgVVMnKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdIb25vbHVsdSwgVVMnKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdGbG9yZW5jZSwgSVQnKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdBbXN0ZXJkYW0sIE5MJylcbiAgICBzdWJtaXRMb2NhdGlvbignUGFyaXMsIEZSJylcbiAgICBzdWJtaXRMb2NhdGlvbignVG9reW8sIEpQJylcbn1cblxuY29uc3QgdmFsaWRhdGVTZWFyY2ggPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdMb2NhdGlvbklucHV0JylcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG4gICAgLy8gcmVzZXQgZXJyb3JcbiAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJydcbiAgICAvLyBjaGVjayBmb3Igc2VhcmNoIHRlcm1cbiAgICBpZiAobmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcbiAgICB9IGVsc2Uge1xuICAgICAgICBBUElDaXR5U2VhcmNoKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUsIGUpXG4gICAgICAgIGhpZGVGb3JtKClcbiAgICAgICAgbmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9ICcnXG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIGFkZERlZmF1bHRDb250ZW50LFxuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVEZWxldGVJY29uLFxuICAgIGNyZWF0ZUZvcm0sXG4gICAgY3JlYXRlTWVudUljb24sXG4gICAgZGlzcGxheVdhdGNobGlzdCxcbiAgICBoaWRlRm9ybSxcbiAgICBzaG93Rm9ybSxcbiAgICBzdWJtaXRMb2NhdGlvbixcbiAgICB2YWxpZGF0ZVNlYXJjaCxcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7XG4gICAgY3JlYXRlQWRkaXRpb25JY29uLFxuICAgIGNyZWF0ZUZvcm0sXG4gICAgLy8gZGlzcGxheVdhdGNobGlzdCxcbn0gZnJvbSAnLi9oZWxwZXJGdW5jdGlvbnMnXG5pbXBvcnQgZ2l0aHViSWNvbiBmcm9tICcuL2Fzc2V0cy9HaXRIdWItbGlnaHQtMzJweC5wbmcnXG5pbXBvcnQgbG9nb0ljb24gZnJvbSAnLi9hc3NldHMvbG9nb0ljb24uc3ZnJ1xuXG5jb25zdCBjcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJylcblxuICAgIC8vIGRpc3BsYXkgbG9nb1xuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGxvZ28uc3JjID0gbG9nb0ljb25cbiAgICBsb2dvLnRhcmdldCA9ICdfYmxhbmsnXG4gICAgbG9nby5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xvZ28nKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChsb2dvKVxuXG4gICAgLy8gZGlzcGxheSB0aXRsZVxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKVxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1dlYXRoZXJzZXJ2ZSdcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpXG5cbiAgICByZXR1cm4gaGVhZGVyXG59XG5cbmNvbnN0IGNyZWF0ZU1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbWVudS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21lbnUnKVxuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBoZWFkZXJcbiAgICBjb25zdCB3YXRjaGxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICB3YXRjaGxpc3RIZWFkZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3RIZWFkZXInKVxuICAgIHdhdGNobGlzdEhlYWRlci50ZXh0Q29udGVudCA9ICdXYXRjaGxpc3QnXG5cbiAgICAvLyBjcmVhdGUgd2F0Y2hsaXN0IG1lbnVcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcbiAgICB3YXRjaGxpc3Quc2V0QXR0cmlidXRlKCdpZCcsICd3YXRjaGxpc3QnKVxuXG4gICAgLy8gZGlzcGxheVdhdGNobGlzdCgpXG5cbiAgICAvLyBHZW5lcmF0ZSBhZGQgbG9jYXRpb24gY29udGFpbmVyXG4gICAgY29uc3QgYWRkTG9jYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3QnKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGJ1dHRvblxuICAgIGNvbnN0IGFkZExvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGFkZExvY2F0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkTG9jYXRpb25CdG4nKVxuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbihhZGRMb2NhdGlvbilcbiAgICBjb25zdCBhZGRMb2NhdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBhZGRMb2NhdGlvblRleHQuaW5uZXJUZXh0ID0gJ0FkZCBMb2NhdGlvbidcbiAgICBhZGRMb2NhdGlvbi5hcHBlbmRDaGlsZChhZGRMb2NhdGlvblRleHQpXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb24pXG5cbiAgICAvLyBHZW5lcmF0ZSBhbmQgaGlkZSBuZXcgbG9jYXRpb24gZm9ybVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uRm9ybScpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBhZGRMb2NhdGlvbkZvcm0ubWV0aG9kID0gJ2dldCdcbiAgICBjcmVhdGVGb3JtKGFkZExvY2F0aW9uRm9ybSlcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkZvcm0pXG5cbiAgICBtZW51LmFwcGVuZENoaWxkKHdhdGNobGlzdEhlYWRlcilcbiAgICBtZW51LmFwcGVuZENoaWxkKHdhdGNobGlzdClcbiAgICBtZW51LmFwcGVuZENoaWxkKGFkZExvY2F0aW9uQ29udGFpbmVyKVxuXG4gICAgcmV0dXJuIG1lbnVcbn1cblxuY29uc3QgY3JlYXRlV2VhdGhlckNhcmQgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICAgIGNvbnN0IFdlYXRoZXJBUElDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50JylcblxuICAgIC8vIGNyZWF0ZSBBUEkgdGl0bGVcbiAgICBjb25zdCBBUElUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcbiAgICBBUElUaXRsZS5jbGFzc0xpc3QuYWRkKCdjb250ZW50VGl0bGUnKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVRpdGxlKVxuXG4gICAgLy8gY3JlYXRlIEFQSSBpbWdcbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgQVBJSW1hZ2UuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2UnKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlKVxuXG4gICAgLy8gY3JlYXRlIGN1cnJlbnQgdGVtcCBjb250YWluZXJcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKVxuICAgIHRlbXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGVtcENvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQodGVtcENvbnRhaW5lcilcblxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpXG5cbiAgICAvLyBjcmVhdGUgZGVzY3JpcHRpb24gY29udGFpbmVyXG4gICAgY29uc3QgZGVzY3JpcHRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBkZXNjcmlwdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd3ZWF0aGVyRGVzY3JpcHRpb24nKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uQ29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIGxvdyB0ZW1wIGNvbnRhaW5lclxuICAgIGNvbnN0IGxvd1RlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBsb3dUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2xvd1RlbXBDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGxvd1RlbXBDb250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgaGlnaCB0ZW1wIGNvbnRhaW5lclxuICAgIGNvbnN0IGhpZ2hUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgaGlnaFRlbXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlnaFRlbXBDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGhpZ2hUZW1wQ29udGFpbmVyKVxuXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IHRpbWUgY29udGFpbmVyXG4gICAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHRpbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGltZUNvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQodGltZUNvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBzdW5yaXNlIGNvbnRhaW5lclxuICAgIGNvbnN0IHN1bnJpc2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBzdW5yaXNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1bnJpc2VDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHN1bnJpc2VDb250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgc3Vuc2V0IGNvbnRhaW5lclxuICAgIGNvbnN0IHN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHN1bnNldENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdW5zZXRDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHN1bnNldENvbnRhaW5lcilcblxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpXG5cbiAgICAvLyBjcmVhdGUgd2luZCBjb250YWluZXJcbiAgICBjb25zdCB3aW5kQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgd2luZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd3aW5kQ29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZCh3aW5kQ29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIGh1bWlkaXR5IGNvbnRhaW5lclxuICAgIGNvbnN0IGh1bWlkaXR5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgaHVtaWRpdHlDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaHVtaWRpdHlDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGh1bWlkaXR5Q29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIGZvcmVjYXN0IGNvbnRhaW5lclxuICAgIGNvbnN0IGZvcmVjYXN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXG4gICAgZm9yZWNhc3RUaXRsZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRpdGxlJylcbiAgICBmb3JlY2FzdFRpdGxlLmlubmVyVGV4dCA9ICdGaXZlIGRheSwgdGhyZWUgaG91ciBmb3JlY2FzdDonXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaXRsZSlcblxuICAgIGNvbnN0IGZvcmVjYXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JlY2FzdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdENvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RDb250YWluZXIpXG5cbiAgICBjb25zdCBmb3JlY2FzdFRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKVxuICAgIGZvcmVjYXN0VGFibGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUYWJsZScpXG4gICAgZm9yZWNhc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUYWJsZSlcblxuICAgIGNvbnN0IGZvcmVjYXN0Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuICAgIGZvcmVjYXN0Um93LmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Um93JylcbiAgICBmb3JlY2FzdFRhYmxlLmFwcGVuZENoaWxkKGZvcmVjYXN0Um93KVxuXG4gICAgLy8gbWFrZSBzY3JvbGx3aGVlbCBmdW5jdGlvbmFsIHdpdGggaG9yaXpvbnRhbCBzY3JvbGxpbmdcbiAgICBmb3JlY2FzdFJvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBmb3JlY2FzdFJvdy5zY3JvbGxMZWZ0ICs9IGUuZGVsdGFZXG4gICAgfSlcblxuICAgIHJldHVybiBXZWF0aGVyQVBJQ29udGFpbnRlclxufVxuXG5jb25zdCBjcmVhdGVDb250ZW50ID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBjb250ZW50IGNvbnRhaW5lclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29udGVudCcpXG5cbiAgICAvLyBkaXNwbGF5IHdlYXRoZXIgY2FyZFxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY3JlYXRlV2VhdGhlckNhcmQoKSlcblxuICAgIHJldHVybiBjb250ZW50XG59XG5cbmNvbnN0IGNyZWF0ZUZvb3RlciA9ICgpID0+IHtcbiAgICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb290ZXInKVxuXG4gICAgY29uc3QgY29weXJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgY29weXJpZ2h0LnRleHRDb250ZW50ID0gYENvcHlyaWdodCDCqSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gamNhbXBiZWxsNTdgXG5cbiAgICBjb25zdCBnaXRodWJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgZ2l0aHViTGluay5ocmVmID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9qY2FtcGJlbGw1NydcbiAgICBnaXRodWJMaW5rLnRhcmdldCA9ICdfYmxhbmsnXG5cbiAgICBjb25zdCBuZXdHaXRodWJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdHaXRodWJJY29uLnNyYyA9IGdpdGh1Ykljb25cbiAgICBuZXdHaXRodWJJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZ2l0aHViJylcblxuICAgIGdpdGh1YkxpbmsuYXBwZW5kQ2hpbGQobmV3R2l0aHViSWNvbilcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoY29weXJpZ2h0KVxuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChnaXRodWJMaW5rKVxuXG4gICAgcmV0dXJuIGZvb3RlclxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlSGVhZGVyKCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVNZW51KCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVDb250ZW50KCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVGb290ZXIoKSlcbn1cbiJdLCJuYW1lcyI6WyJhZGRpdGlvbkljb24iLCJkZWxldGVJY29uIiwibWVudUljb24iLCJkb2N1bWVudCIsImNvb2tpZSIsImNyZWF0ZU1lbnVJY29uIiwibGkiLCJjaGVja2xpc3RJY29uIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlTGlzdGluZyIsImxvY2F0aW9uTmFtZSIsImkiLCJ3YXRjaGxpc3QiLCJxdWVyeVNlbGVjdG9yIiwibG9jYXRpb24iLCJjbGFzc0xpc3QiLCJhZGQiLCJzZWxlY3RlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJzZWxlY3RMb2NhdGlvbiIsImxvY2F0aW9uVGV4dCIsInRleHRDb250ZW50IiwibmFtZSIsImNyZWF0ZURlbGV0ZUljb24iLCJkaXNwbGF5V2F0Y2hsaXN0Iiwib2xkTGlzdGluZ0NvdW50IiwiY2hpbGRFbGVtZW50Q291bnQiLCJmaXJzdENoaWxkIiwicmVtb3ZlIiwic3RvcmFnZVdhdGNobGlzdCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJmb3JFYWNoIiwiQVBJQ2l0eVNlYXJjaCIsInN1Ym1pdExvY2F0aW9uIiwiaW5wdXQiLCJuZXdMb2NhdGlvbiIsInB1c2giLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGlzcGxheVdlYXRoZXIiLCJuZXdXZWF0aGVyQ2FyZCIsImNvbnRlbnRUaXRsZSIsImNpdHkiLCJjb3VudHJ5IiwiQVBJSW1hZ2UiLCJ3ZWF0aGVySWNvbiIsIndlYXRoZXJEZXNjcmlwdGlvbiIsImlubmVyVGV4dCIsInRlbXBDb250YWluZXIiLCJNYXRoIiwicm91bmQiLCJ0ZW1wQ3VycmVudCIsImxvd1RlbXBDb250YWluZXIiLCJ0ZW1wTG93IiwiaGlnaFRlbXBDb250YWluZXIiLCJ0ZW1wSGlnaCIsInRpbWVDb250YWluZXIiLCJsb2NhbERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJzdW5yaXNlQ29udGFpbmVyIiwic3VucmlzZSIsInN1bnNldENvbnRhaW5lciIsInN1bnNldCIsIndpbmRDb250YWluZXIiLCJ3aW5kU3BlZWQiLCJ3aW5kRGlyZWN0aW9uIiwid2luZERlZ3JlZSIsImh1bWlkaXR5Q29udGFpbmVyIiwiaHVtaWRpdHkiLCJkaXNwbGF5Rm9yZWNhc3QiLCJuZXdIb3VybHlGb3JlY2FzdEFycmF5IiwiZm9yZWNhc3RSb3ciLCJvbGRGb3JlY2FzdCIsImxlbmd0aCIsImZvcmVjYXN0Q2VsbCIsImZvcmVjYXN0RGF0ZSIsImRhdGUiLCJnZXRNb250aCIsImdldERhdGUiLCJmb3JlY2FzdFRpbWUiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJ3ZWF0aGVyRm9yZWNhc3RJY29uIiwiZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24iLCJmb3JlY2FzdFRlbXAiLCJ0ZW1wZXJhdHVyZSIsInNlbGVjdGVkTG9jYXRpb25JZCIsImdldEF0dHJpYnV0ZSIsImNyZWF0ZUFkZEJ1dHRvbiIsImNvbnRhaW5lciIsImFkZEJ0biIsInZhbGlkYXRlU2VhcmNoIiwiY3JlYXRlQ2FuY2VsQnV0dG9uIiwiY2FuY2VsQnRuIiwiY3JlYXRlRm9ybSIsImZvcm0iLCJmb3JtUm93MSIsIm5ld0xvY2F0aW9uSW5wdXQiLCJwbGFjZWhvbGRlciIsImZvcm1Sb3cyIiwiZm9ybVJvdzMiLCJzaG93Rm9ybSIsImFkZExvY2F0aW9uQnRuIiwiYWRkTG9jYXRpb25Gb3JtIiwiaGlkZUZvcm0iLCJkZWxldGVXYXRjaGxpc3RFbnRyeSIsImRvb21lZEluZGV4Iiwic3BsaWNlIiwibmV3RGVsZXRlSWNvbiIsInRyYXNoSWNvbiIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVBZGRpdGlvbkljb24iLCJuZXdBZGRpdGlvbkljb24iLCJ0b0RpcmVjdGlvbiIsImRlZ3JlZSIsImNhbGNDdXJyZW50VGltZSIsInRpbWV6b25lIiwiZCIsIkRhdGUiLCJsb2NhbFRpbWUiLCJnZXRUaW1lIiwibG9jYWxPZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsInV0YyIsIm5ld0NpdHkiLCJjYWxjU3VuVGltZSIsInRpbWUiLCJmZXRjaEhvdXJseUZvcmVjYXN0IiwiY2l0eVF1ZXJ5IiwibmV3UHJvakVycm9yQ29udGFpbmVyIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm5ld0hvdXJseUZvcmVjYXN0IiwibGlzdCIsImR0X3R4dCIsImRhdGVUZXh0IiwibWFpbiIsInJhaW5DaGFuY2UiLCJwb3AiLCJ0ZW1wIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXIiLCJkZXNjcmlwdGlvbiIsImljb24iLCJ3aW5kIiwiZGVnIiwid2luZEd1c3QiLCJndXN0Iiwic3BlZWQiLCJjYXRjaCIsImVyciIsImZldGNoQ3VycmVudFdlYXRoZXIiLCJzeXMiLCJ0ZW1wX21heCIsInRlbXBfbWluIiwidW5kZWZpbmVkIiwiYWRkRGVmYXVsdENvbnRlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwiZ2l0aHViSWNvbiIsImxvZ29JY29uIiwiY3JlYXRlSGVhZGVyIiwiaGVhZGVyIiwibG9nbyIsInRpdGxlIiwiY3JlYXRlTWVudSIsIm1lbnUiLCJ3YXRjaGxpc3RIZWFkZXIiLCJhZGRMb2NhdGlvbkNvbnRhaW5lciIsImFkZExvY2F0aW9uIiwiYWRkTG9jYXRpb25UZXh0IiwibWV0aG9kIiwiY3JlYXRlV2VhdGhlckNhcmQiLCJXZWF0aGVyQVBJQ29udGFpbnRlciIsIkFQSVRpdGxlIiwiZGVzY3JpcHRpb25Db250YWluZXIiLCJmb3JlY2FzdFRpdGxlIiwiZm9yZWNhc3RDb250YWluZXIiLCJmb3JlY2FzdFRhYmxlIiwic2Nyb2xsTGVmdCIsImRlbHRhWSIsImNyZWF0ZUNvbnRlbnQiLCJjb250ZW50IiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiY29weXJpZ2h0IiwiZ2V0RnVsbFllYXIiLCJnaXRodWJMaW5rIiwiaHJlZiIsIm5ld0dpdGh1Ykljb24iLCJpbml0aWFsaXplIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=