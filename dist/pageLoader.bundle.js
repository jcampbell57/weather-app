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
  WeatherAPIContainter.appendChild(descriptionContainer);
  WeatherAPIContainter.appendChild(tempContainer);
  WeatherAPIContainter.appendChild(highLowContainer);
  WeatherAPIContainter.appendChild(timeContainer);
  WeatherAPIContainter.appendChild(sunriseSunsetContainer);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZUxvYWRlci5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBRyxRQUFRLENBQUNDLE1BQVQsR0FBa0IsY0FBbEI7O0FBRUEsTUFBTUMsY0FBYyxHQUFJQyxFQUFELElBQVE7RUFDM0IsTUFBTUMsYUFBYSxHQUFHSixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdEI7RUFDQUQsYUFBYSxDQUFDRSxHQUFkLEdBQW9CUCxpREFBcEI7RUFDQUssYUFBYSxDQUFDRyxZQUFkLENBQTJCLE9BQTNCLEVBQW9DLE1BQXBDO0VBQ0FKLEVBQUUsQ0FBQ0ssV0FBSCxDQUFlSixhQUFmO0FBQ0gsQ0FMRCxFQU9BOzs7QUFDQSxNQUFNSyxhQUFhLEdBQUcsQ0FBQ0MsWUFBRCxFQUFlQyxDQUFmLEtBQXFCO0VBQ3ZDLE1BQU1DLFNBQVMsR0FBR1osUUFBUSxDQUFDYSxhQUFULENBQXVCLFlBQXZCLENBQWxCO0VBRUEsTUFBTUMsUUFBUSxHQUFHZCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBakI7RUFDQVMsUUFBUSxDQUFDQyxTQUFULENBQW1CQyxHQUFuQjtFQUNBRixRQUFRLENBQUNQLFlBQVQsQ0FBc0IsSUFBdEIsWUFBK0JJLENBQS9CLEdBTHVDLENBTXZDOztFQUNBLElBQUlELFlBQVksQ0FBQ08sUUFBYixLQUEwQixNQUE5QixFQUFzQztJQUNsQ0gsUUFBUSxDQUFDQyxTQUFULENBQW1CQyxHQUFuQixDQUF1QixVQUF2QixFQURrQyxDQUVsQztFQUNILENBVnNDLENBWXZDOzs7RUFDQUYsUUFBUSxDQUFDSSxnQkFBVCxDQUEwQixPQUExQixFQUFvQ0MsQ0FBRCxJQUFPO0lBQ3RDO0lBQ0EsSUFBSUEsQ0FBQyxDQUFDQyxNQUFGLENBQVNMLFNBQVQsQ0FBbUJNLFFBQW5CLENBQTRCLFlBQTVCLENBQUosRUFBK0M7TUFDM0M7SUFDSDs7SUFDREMsY0FBYyxDQUFDUixRQUFELENBQWQ7RUFDSCxDQU5EO0VBUUFaLGNBQWMsQ0FBQ1ksUUFBRCxDQUFkO0VBQ0EsTUFBTVMsWUFBWSxHQUFHdkIsUUFBUSxDQUFDSyxhQUFULENBQXVCLE1BQXZCLENBQXJCO0VBQ0FrQixZQUFZLENBQUNDLFdBQWIsR0FBMkJkLFlBQVksQ0FBQ2UsSUFBeEM7RUFDQVgsUUFBUSxDQUFDTixXQUFULENBQXFCZSxZQUFyQjtFQUNBRyxnQkFBZ0IsQ0FBQ1osUUFBRCxFQUFXSCxDQUFYLENBQWhCO0VBQ0FDLFNBQVMsQ0FBQ0osV0FBVixDQUFzQk0sUUFBdEI7QUFDSCxDQTNCRCxFQTZCQTs7O0FBQ0EsTUFBTWEsZ0JBQWdCLEdBQUcsTUFBTTtFQUMzQjtFQUNBLE1BQU1mLFNBQVMsR0FBR1osUUFBUSxDQUFDYSxhQUFULENBQXVCLFlBQXZCLENBQWxCLENBRjJCLENBSTNCOztFQUNBLE1BQU1lLGVBQWUsR0FBR2hCLFNBQVMsQ0FBQ2lCLGlCQUFsQyxDQUwyQixDQU0zQjs7RUFDQSxLQUFLLElBQUlsQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHaUIsZUFBcEIsRUFBcUNqQixDQUFDLEVBQXRDLEVBQTBDO0lBQ3RDQyxTQUFTLENBQUNrQixVQUFWLENBQXFCQyxNQUFyQjtFQUNILENBVDBCLENBVzNCOzs7RUFDQSxJQUFJcEIsQ0FBQyxHQUFHLENBQVI7RUFDQSxNQUFNcUIsZ0JBQWdCLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUNyQkMsWUFBWSxDQUFDQyxPQUFiLENBQXFCLGtCQUFyQixDQURxQixDQUF6QixDQWIyQixDQWdCM0I7O0VBQ0FKLGdCQUFnQixDQUFDSyxPQUFqQixDQUEwQnZCLFFBQUQsSUFBYztJQUNuQ0wsYUFBYSxDQUFDSyxRQUFELEVBQVdILENBQVgsQ0FBYixDQURtQyxDQUVuQzs7SUFDQUEsQ0FBQztFQUNKLENBSkQ7QUFLSCxDQXRCRDs7QUF3QkEsTUFBTTJCLGNBQWMsR0FBSUMsS0FBRCxJQUFXO0VBQzlCO0VBQ0EsTUFBTUMsV0FBVyxHQUFHO0lBQ2hCZixJQUFJLEVBQUVjLEtBRFU7SUFFaEJ0QixRQUFRLEVBQUU7RUFGTSxDQUFwQixDQUY4QixDQU85Qjs7RUFDQSxNQUFNZSxnQkFBZ0IsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQ3JCQyxZQUFZLENBQUNDLE9BQWIsQ0FBcUIsa0JBQXJCLENBRHFCLENBQXpCLENBUjhCLENBWTlCOztFQUNBSixnQkFBZ0IsQ0FBQ0ssT0FBakIsQ0FBMEJ2QixRQUFELElBQWM7SUFDbkMsSUFBSUEsUUFBUSxDQUFDRyxRQUFULEtBQXNCLElBQTFCLEVBQWdDO01BQzVCSCxRQUFRLENBQUNHLFFBQVQsR0FBb0IsS0FBcEI7SUFDSDtFQUNKLENBSkQsRUFiOEIsQ0FtQjlCOztFQUNBZSxnQkFBZ0IsQ0FBQ1MsSUFBakIsQ0FBc0JELFdBQXRCLEVBcEI4QixDQXFCOUI7RUFFQTs7RUFDQUwsWUFBWSxDQUFDTyxPQUFiLENBQXFCLGtCQUFyQixFQUF5Q1QsSUFBSSxDQUFDVSxTQUFMLENBQWVYLGdCQUFmLENBQXpDLEVBeEI4QixDQTBCOUI7O0VBQ0FMLGdCQUFnQjtBQUNuQixDQTVCRDs7QUE4QkEsTUFBTWlCLGNBQWMsR0FBSUMsY0FBRCxJQUFvQjtFQUN2QztFQUNBLE1BQU1DLFlBQVksR0FBRzlDLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixlQUF2QixDQUFyQjtFQUNBaUMsWUFBWSxDQUFDdEIsV0FBYixhQUE4QnFCLGNBQWMsQ0FBQ0UsSUFBN0MsZUFBc0RGLGNBQWMsQ0FBQ0csT0FBckUsRUFIdUMsQ0FLdkM7O0VBQ0EsTUFBTUMsUUFBUSxHQUFHakQsUUFBUSxDQUFDYSxhQUFULENBQXVCLFdBQXZCLENBQWpCO0VBQ0FvQyxRQUFRLENBQUMzQyxHQUFULDhDQUFtRHVDLGNBQWMsQ0FBQ0ssV0FBbEUsYUFQdUMsQ0FTdkM7O0VBQ0EsTUFBTUMsa0JBQWtCLEdBQUduRCxRQUFRLENBQUNhLGFBQVQsQ0FBdUIscUJBQXZCLENBQTNCO0VBQ0FzQyxrQkFBa0IsQ0FBQ0MsU0FBbkIsR0FBK0JQLGNBQWMsQ0FBQ00sa0JBQTlDLENBWHVDLENBYXZDOztFQUNBLE1BQU1FLGFBQWEsR0FBR3JELFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixnQkFBdkIsQ0FBdEI7RUFDQXdDLGFBQWEsQ0FBQ0QsU0FBZCxhQUE2QkUsSUFBSSxDQUFDQyxLQUFMLENBQVdWLGNBQWMsQ0FBQ1csV0FBMUIsQ0FBN0IsVUFmdUMsQ0FpQnZDOztFQUNBLE1BQU1DLGdCQUFnQixHQUFHekQsUUFBUSxDQUFDYSxhQUFULENBQXVCLG1CQUF2QixDQUF6QjtFQUNBNEMsZ0JBQWdCLENBQUNMLFNBQWpCLGtCQUFxQ0UsSUFBSSxDQUFDQyxLQUFMLENBQ2pDVixjQUFjLENBQUNhLE9BRGtCLENBQXJDO0VBR0EsTUFBTUMsaUJBQWlCLEdBQUczRCxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsb0JBQXZCLENBQTFCO0VBQ0E4QyxpQkFBaUIsQ0FBQ1AsU0FBbEIsbUJBQXVDRSxJQUFJLENBQUNDLEtBQUwsQ0FDbkNWLGNBQWMsQ0FBQ2UsUUFEb0IsQ0FBdkMsVUF2QnVDLENBMkJ2Qzs7RUFDQSxNQUFNQyxhQUFhLEdBQUc3RCxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXRCO0VBQ0FnRCxhQUFhLENBQUNULFNBQWQseUJBQXlDUCxjQUFjLENBQUNpQixTQUFmLENBQXlCQyxRQUF6QixFQUF6QyxjQUFnRmxCLGNBQWMsQ0FBQ2lCLFNBQWYsQ0FBeUJFLFVBQXpCLEVBQWhGLEVBN0J1QyxDQStCdkM7O0VBQ0EsTUFBTUMsZ0JBQWdCLEdBQUdqRSxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsbUJBQXZCLENBQXpCO0VBQ0FvRCxnQkFBZ0IsQ0FBQ2IsU0FBakIsc0JBQXlDUCxjQUFjLENBQUNxQixPQUFmLENBQXVCSCxRQUF2QixFQUF6QyxjQUE4RWxCLGNBQWMsQ0FBQ3FCLE9BQWYsQ0FBdUJGLFVBQXZCLEVBQTlFO0VBQ0EsTUFBTUcsZUFBZSxHQUFHbkUsUUFBUSxDQUFDYSxhQUFULENBQXVCLGtCQUF2QixDQUF4QjtFQUNBc0QsZUFBZSxDQUFDZixTQUFoQixxQkFBdUNQLGNBQWMsQ0FBQ3VCLE1BQWYsQ0FBc0JMLFFBQXRCLEVBQXZDLGNBQTJFbEIsY0FBYyxDQUFDdUIsTUFBZixDQUFzQkosVUFBdEIsRUFBM0UsRUFuQ3VDLENBcUN2Qzs7RUFDQSxNQUFNSyxhQUFhLEdBQUdyRSxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXRCO0VBQ0F3RCxhQUFhLENBQUNqQixTQUFkLG1CQUFtQ0UsSUFBSSxDQUFDQyxLQUFMLENBQy9CVixjQUFjLENBQUN5QixTQURnQixDQUFuQyxrQkFFU3pCLGNBQWMsQ0FBQzBCLGFBRnhCLGVBRTBDMUIsY0FBYyxDQUFDMkIsVUFGekQsV0F2Q3VDLENBMkN2Qzs7RUFDQSxNQUFNQyxpQkFBaUIsR0FBR3pFLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixvQkFBdkIsQ0FBMUI7RUFDQTRELGlCQUFpQixDQUFDckIsU0FBbEIsdUJBQTJDUCxjQUFjLENBQUM2QixRQUExRDtBQUNILENBOUNEOztBQWdEQSxNQUFNQyxlQUFlLEdBQUlDLHNCQUFELElBQTRCO0VBQ2hELE1BQU1DLFdBQVcsR0FBRzdFLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixjQUF2QixDQUFwQixDQURnRCxDQUdoRDs7RUFDQSxNQUFNaUUsV0FBVyxHQUFHRCxXQUFXLENBQUNoRCxpQkFBaEMsQ0FKZ0QsQ0FLaEQ7O0VBQ0EsS0FBSyxJQUFJbEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR21FLFdBQXBCLEVBQWlDbkUsQ0FBQyxFQUFsQyxFQUFzQztJQUNsQ2tFLFdBQVcsQ0FBQy9DLFVBQVosQ0FBdUJDLE1BQXZCO0VBQ0gsQ0FSK0MsQ0FVaEQ7RUFDQTs7O0VBQ0EsS0FBSyxJQUFJcEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2lFLHNCQUFzQixDQUFDRyxNQUEzQyxFQUFtRHBFLENBQUMsRUFBcEQsRUFBd0Q7SUFDcEQsTUFBTXFFLFlBQVksR0FBR2hGLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixJQUF2QixDQUFyQjtJQUNBMkUsWUFBWSxDQUFDakUsU0FBYixDQUF1QkMsR0FBdkIsQ0FBMkIsY0FBM0IsRUFGb0QsQ0FJcEQ7O0lBQ0EsTUFBTWlFLFlBQVksR0FBR2pGLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUFyQjtJQUNBNEUsWUFBWSxDQUFDbEUsU0FBYixDQUF1QkMsR0FBdkIsQ0FBMkIsY0FBM0I7SUFDQWlFLFlBQVksQ0FBQzdCLFNBQWIsYUFDSXdCLHNCQUFzQixDQUFDakUsQ0FBRCxDQUF0QixDQUEwQnVFLElBQTFCLENBQStCQyxRQUEvQixLQUE0QyxDQURoRCxjQUVJUCxzQkFBc0IsQ0FBQ2pFLENBQUQsQ0FBdEIsQ0FBMEJ1RSxJQUExQixDQUErQkUsT0FBL0IsRUFGSjtJQUdBSixZQUFZLENBQUN4RSxXQUFiLENBQXlCeUUsWUFBekIsRUFWb0QsQ0FZcEQ7O0lBQ0EsTUFBTUksWUFBWSxHQUFHckYsUUFBUSxDQUFDSyxhQUFULENBQXVCLE1BQXZCLENBQXJCO0lBQ0FnRixZQUFZLENBQUN0RSxTQUFiLENBQXVCQyxHQUF2QixDQUEyQixjQUEzQjtJQUNBcUUsWUFBWSxDQUFDakMsU0FBYixHQUNJd0Isc0JBQXNCLENBQUNqRSxDQUFELENBQXRCLENBQTBCdUUsSUFBMUIsQ0FBK0JJLGtCQUEvQixFQURKO0lBRUFOLFlBQVksQ0FBQ3hFLFdBQWIsQ0FBeUI2RSxZQUF6QixFQWpCb0QsQ0FtQnBEOztJQUNBLE1BQU1FLG1CQUFtQixHQUFHdkYsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQTVCO0lBQ0FrRixtQkFBbUIsQ0FBQ3hFLFNBQXBCLENBQThCQyxHQUE5QixDQUFrQyxxQkFBbEM7SUFDQXVFLG1CQUFtQixDQUFDakYsR0FBcEIsOENBQThEc0Usc0JBQXNCLENBQUNqRSxDQUFELENBQXRCLENBQTBCdUMsV0FBeEY7SUFDQThCLFlBQVksQ0FBQ3hFLFdBQWIsQ0FBeUIrRSxtQkFBekIsRUF2Qm9ELENBeUJwRDs7SUFDQSxNQUFNQywwQkFBMEIsR0FBR3hGLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUFuQztJQUNBbUYsMEJBQTBCLENBQUN6RSxTQUEzQixDQUFxQ0MsR0FBckMsQ0FBeUMsNEJBQXpDO0lBQ0F3RSwwQkFBMEIsQ0FBQ3BDLFNBQTNCLEdBQ0l3QixzQkFBc0IsQ0FBQ2pFLENBQUQsQ0FBdEIsQ0FBMEJ3QyxrQkFEOUI7SUFFQTZCLFlBQVksQ0FBQ3hFLFdBQWIsQ0FBeUJnRiwwQkFBekIsRUE5Qm9ELENBZ0NwRDs7SUFDQSxNQUFNQyxZQUFZLEdBQUd6RixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBckI7SUFDQW9GLFlBQVksQ0FBQzFFLFNBQWIsQ0FBdUJDLEdBQXZCLENBQTJCLGNBQTNCO0lBQ0F5RSxZQUFZLENBQUNyQyxTQUFiLGFBQTRCRSxJQUFJLENBQUNDLEtBQUwsQ0FDeEJxQixzQkFBc0IsQ0FBQ2pFLENBQUQsQ0FBdEIsQ0FBMEIrRSxXQURGLENBQTVCO0lBR0FWLFlBQVksQ0FBQ3hFLFdBQWIsQ0FBeUJpRixZQUF6QjtJQUVBWixXQUFXLENBQUNyRSxXQUFaLENBQXdCd0UsWUFBeEI7RUFDSDtBQUNKLENBdEREOztBQXdEQSxNQUFNMUQsY0FBYyxHQUFJbkIsRUFBRCxJQUFRO0VBQzNCO0VBQ0E7RUFDQTtFQUVBO0VBQ0F3RixhQUFhLENBQUN4RixFQUFFLENBQUNpRCxTQUFKLENBQWIsQ0FOMkIsQ0FRM0I7O0VBQ0EsTUFBTXBCLGdCQUFnQixHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FDckJDLFlBQVksQ0FBQ0MsT0FBYixDQUFxQixrQkFBckIsQ0FEcUIsQ0FBekIsQ0FUMkIsQ0FhM0I7O0VBQ0FKLGdCQUFnQixDQUFDSyxPQUFqQixDQUEwQnZCLFFBQUQsSUFBYztJQUNuQyxJQUFJQSxRQUFRLENBQUNHLFFBQVQsS0FBc0IsTUFBMUIsRUFBa0M7TUFDOUJILFFBQVEsQ0FBQ0csUUFBVCxHQUFvQixPQUFwQjtJQUNIO0VBQ0osQ0FKRCxFQWQyQixDQW9CM0I7O0VBQ0EsSUFBSWQsRUFBRSxDQUFDeUYsWUFBSCxDQUFnQixPQUFoQixNQUE2QixVQUFqQyxFQUE2QztJQUN6QyxNQUFNQyxrQkFBa0IsR0FBRzFGLEVBQUUsQ0FBQ3lGLFlBQUgsQ0FBZ0IsSUFBaEIsQ0FBM0I7SUFDQTVELGdCQUFnQixDQUFDNkQsa0JBQUQsQ0FBaEIsQ0FBcUM1RSxRQUFyQyxHQUFnRCxNQUFoRDtFQUNILENBeEIwQixDQTBCM0I7OztFQUNBa0IsWUFBWSxDQUFDTyxPQUFiLENBQXFCLGtCQUFyQixFQUF5Q1QsSUFBSSxDQUFDVSxTQUFMLENBQWVYLGdCQUFmLENBQXpDLEVBM0IyQixDQTZCM0I7O0VBQ0FMLGdCQUFnQjtBQUNuQixDQS9CRDs7QUFpQ0EsTUFBTW1FLGVBQWUsR0FBSUMsU0FBRCxJQUFlO0VBQ25DLE1BQU1DLE1BQU0sR0FBR2hHLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixRQUF2QixDQUFmO0VBQ0EyRixNQUFNLENBQUNqRixTQUFQLENBQWlCQyxHQUFqQixDQUFxQixRQUFyQjtFQUNBZ0YsTUFBTSxDQUFDNUMsU0FBUCxHQUFtQixRQUFuQjtFQUNBNEMsTUFBTSxDQUFDOUUsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBa0NDLENBQUQsSUFBTzhFLGNBQWMsQ0FBQzlFLENBQUQsQ0FBdEQ7RUFDQTRFLFNBQVMsQ0FBQ3ZGLFdBQVYsQ0FBc0J3RixNQUF0QjtBQUNILENBTkQ7O0FBUUEsTUFBTUUsa0JBQWtCLEdBQUcsQ0FBQ0gsU0FBRCxFQUFZcEYsQ0FBWixLQUFrQjtFQUN6QyxNQUFNd0YsU0FBUyxHQUFHbkcsUUFBUSxDQUFDSyxhQUFULENBQXVCLFFBQXZCLENBQWxCO0VBQ0E4RixTQUFTLENBQUNwRixTQUFWLENBQW9CQyxHQUFwQixDQUF3QixXQUF4QjtFQUNBbUYsU0FBUyxDQUFDNUYsWUFBVixDQUF1QixJQUF2QixZQUFnQ0ksQ0FBaEM7RUFDQXdGLFNBQVMsQ0FBQy9DLFNBQVYsR0FBc0IsUUFBdEI7RUFDQTJDLFNBQVMsQ0FBQ3ZGLFdBQVYsQ0FBc0IyRixTQUF0QjtBQUNILENBTkQsRUFRQTs7O0FBQ0EsTUFBTUMsVUFBVSxHQUFJQyxJQUFELElBQVU7RUFDekI7RUFDQSxNQUFNQyxRQUFRLEdBQUd0RyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakI7RUFDQWlHLFFBQVEsQ0FBQy9GLFlBQVQsQ0FBc0IsT0FBdEIsRUFBK0IsU0FBL0I7RUFDQSxNQUFNZ0csZ0JBQWdCLEdBQUd2RyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBekI7RUFDQWtHLGdCQUFnQixDQUFDeEYsU0FBakIsQ0FBMkJDLEdBQTNCLENBQStCLGtCQUEvQjtFQUNBdUYsZ0JBQWdCLENBQUNDLFdBQWpCLEdBQStCLFVBQS9CO0VBQ0FELGdCQUFnQixDQUFDOUUsSUFBakIsR0FBd0Isa0JBQXhCO0VBQ0E2RSxRQUFRLENBQUM5RixXQUFULENBQXFCK0YsZ0JBQXJCLEVBUnlCLENBVXpCOztFQUNBLE1BQU1FLFFBQVEsR0FBR3pHLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFqQjtFQUNBb0csUUFBUSxDQUFDbEcsWUFBVCxDQUFzQixPQUF0QixFQUErQixTQUEvQjtFQUNBa0csUUFBUSxDQUFDbEcsWUFBVCxDQUFzQixJQUF0QixFQUE0QixhQUE1QjtFQUNBdUYsZUFBZSxDQUFDVyxRQUFELEVBQVdKLElBQVgsQ0FBZjtFQUNBSCxrQkFBa0IsQ0FBQ08sUUFBRCxFQUFXSixJQUFYLENBQWxCLENBZnlCLENBaUJ6Qjs7RUFDQSxNQUFNSyxRQUFRLEdBQUcxRyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakIsQ0FsQnlCLENBbUJ6Qjs7RUFDQXFHLFFBQVEsQ0FBQ25HLFlBQVQsQ0FBc0IsT0FBdEIsRUFBK0IsdUJBQS9CLEVBcEJ5QixDQXFCekI7O0VBRUE4RixJQUFJLENBQUM3RixXQUFMLENBQWlCOEYsUUFBakI7RUFDQUQsSUFBSSxDQUFDN0YsV0FBTCxDQUFpQmlHLFFBQWpCO0VBQ0FKLElBQUksQ0FBQzdGLFdBQUwsQ0FBaUJrRyxRQUFqQjtBQUNILENBMUJEOztBQTRCQSxNQUFNQyxRQUFRLEdBQUcsTUFBTTtFQUNuQixNQUFNQyxjQUFjLEdBQUc1RyxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsaUJBQXZCLENBQXZCO0VBQ0EsTUFBTWdHLGVBQWUsR0FBRzdHLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixrQkFBdkIsQ0FBeEI7RUFFQStGLGNBQWMsQ0FBQ3JHLFlBQWYsQ0FBNEIsSUFBNUIsRUFBa0MsUUFBbEM7RUFDQXNHLGVBQWUsQ0FBQ3RHLFlBQWhCLENBQTZCLElBQTdCLEVBQW1DLFdBQW5DO0FBQ0gsQ0FORDs7QUFRQSxNQUFNdUcsUUFBUSxHQUFHLE1BQU07RUFDbkIsTUFBTUYsY0FBYyxHQUFHNUcsUUFBUSxDQUFDYSxhQUFULENBQXVCLGlCQUF2QixDQUF2QjtFQUNBLE1BQU1nRyxlQUFlLEdBQUc3RyxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsa0JBQXZCLENBQXhCO0VBRUErRixjQUFjLENBQUNyRyxZQUFmLENBQTRCLElBQTVCLEVBQWtDLFdBQWxDO0VBQ0FzRyxlQUFlLENBQUN0RyxZQUFoQixDQUE2QixJQUE3QixFQUFtQyxRQUFuQztBQUNILENBTkQsRUFRQTs7O0FBQ0EsTUFBTXdHLG9CQUFvQixHQUFJNUYsQ0FBRCxJQUFPO0VBQ2hDO0VBQ0EsTUFBTWEsZ0JBQWdCLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUNyQkMsWUFBWSxDQUFDQyxPQUFiLENBQXFCLGtCQUFyQixDQURxQixDQUF6QixDQUZnQyxDQU1oQzs7RUFDQSxNQUFNNEUsV0FBVyxHQUFHN0YsQ0FBQyxDQUFDQyxNQUFGLENBQVN3RSxZQUFULENBQXNCLElBQXRCLENBQXBCLENBUGdDLENBUWhDO0VBRUE7O0VBQ0E1RCxnQkFBZ0IsQ0FBQ2lGLE1BQWpCLENBQXdCRCxXQUF4QixFQUFxQyxDQUFyQyxFQVhnQyxDQWFoQzs7RUFDQTdFLFlBQVksQ0FBQ08sT0FBYixDQUFxQixrQkFBckIsRUFBeUNULElBQUksQ0FBQ1UsU0FBTCxDQUFlWCxnQkFBZixDQUF6QyxFQWRnQyxDQWdCaEM7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFFQTs7RUFDQUwsZ0JBQWdCO0FBQ25CLENBMUJEOztBQTRCQSxNQUFNRCxnQkFBZ0IsR0FBRyxDQUFDcUUsU0FBRCxFQUFZcEYsQ0FBWixLQUFrQjtFQUN2QztFQUNBLE1BQU11RyxhQUFhLEdBQUdsSCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdEI7RUFDQTZHLGFBQWEsQ0FBQzVHLEdBQWQsR0FBb0JSLCtDQUFwQjtFQUNBb0gsYUFBYSxDQUFDM0csWUFBZCxDQUEyQixPQUEzQixFQUFvQyxpQkFBcEM7RUFDQTJHLGFBQWEsQ0FBQzNHLFlBQWQsQ0FBMkIsSUFBM0IsWUFBb0NJLENBQXBDLEdBTHVDLENBT3ZDOztFQUNBLElBQ0lvRixTQUFTLENBQUNILFlBQVYsQ0FBdUIsT0FBdkIsTUFBb0MsVUFBcEMsSUFDQUcsU0FBUyxDQUFDaEYsU0FBVixDQUFvQk0sUUFBcEIsQ0FBNkIsVUFBN0IsQ0FGSixFQUdFO0lBQ0U7SUFDQTZGLGFBQWEsQ0FBQ25HLFNBQWQsQ0FBd0JDLEdBQXhCLHVEQUUyQkwsQ0FGM0I7SUFLQXVHLGFBQWEsQ0FBQ2hHLGdCQUFkLENBQStCLE9BQS9CLEVBQXlDQyxDQUFELElBQ3BDNEYsb0JBQW9CLENBQUM1RixDQUFELEVBQUlSLENBQUosQ0FEeEIsRUFQRixDQVVFOztJQUNBb0YsU0FBUyxDQUFDN0UsZ0JBQVYsQ0FBMkIsWUFBM0IsRUFBeUMsTUFBTTtNQUMzQyxNQUFNaUcsU0FBUyxHQUFHbkgsUUFBUSxDQUFDYSxhQUFULGdDQUNVRixDQURWLEVBQWxCO01BR0F3RyxTQUFTLENBQUNwRyxTQUFWLENBQW9CZ0IsTUFBcEIsQ0FBMkIsUUFBM0I7SUFDSCxDQUxELEVBWEYsQ0FpQkU7O0lBQ0FnRSxTQUFTLENBQUM3RSxnQkFBVixDQUEyQixZQUEzQixFQUF5QyxNQUFNO01BQzNDLE1BQU1pRyxTQUFTLEdBQUduSCxRQUFRLENBQUNhLGFBQVQsZ0NBQ1VGLENBRFYsRUFBbEI7TUFHQXdHLFNBQVMsQ0FBQ3BHLFNBQVYsQ0FBb0JDLEdBQXBCLENBQXdCLFFBQXhCO0lBQ0gsQ0FMRDtFQU1ILENBM0JELE1BMkJPO0lBQ0hvRyxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtFQUNILENBckNzQyxDQXNDdkM7OztFQUNBdEIsU0FBUyxDQUFDdkYsV0FBVixDQUFzQjBHLGFBQXRCO0FBQ0gsQ0F4Q0Q7O0FBMENBLE1BQU1JLGtCQUFrQixHQUFJbkgsRUFBRCxJQUFRO0VBQy9CLE1BQU1vSCxlQUFlLEdBQUd2SCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBeEI7RUFDQWtILGVBQWUsQ0FBQ2pILEdBQWhCLEdBQXNCVCw2Q0FBdEI7RUFDQTBILGVBQWUsQ0FBQ2hILFlBQWhCLENBQTZCLE9BQTdCLEVBQXNDLE1BQXRDO0VBQ0FKLEVBQUUsQ0FBQ0ssV0FBSCxDQUFlK0csZUFBZjtBQUNILENBTEQsRUFPQTtBQUNBO0FBQ0E7OztBQUVBLFNBQVNDLFdBQVQsQ0FBcUJDLE1BQXJCLEVBQTZCO0VBQ3pCLElBQUlBLE1BQU0sR0FBRyxLQUFiLEVBQW9CLE9BQU8sT0FBUDtFQUNwQixJQUFJQSxNQUFNLEdBQUcsS0FBYixFQUFvQixPQUFPLFlBQVA7RUFDcEIsSUFBSUEsTUFBTSxHQUFHLEtBQWIsRUFBb0IsT0FBTyxNQUFQO0VBQ3BCLElBQUlBLE1BQU0sR0FBRyxLQUFiLEVBQW9CLE9BQU8sWUFBUDtFQUNwQixJQUFJQSxNQUFNLEdBQUcsS0FBYixFQUFvQixPQUFPLE9BQVA7RUFDcEIsSUFBSUEsTUFBTSxHQUFHLEtBQWIsRUFBb0IsT0FBTyxZQUFQO0VBQ3BCLElBQUlBLE1BQU0sR0FBRyxJQUFiLEVBQW1CLE9BQU8sTUFBUDtFQUNuQixJQUFJQSxNQUFNLEdBQUcsSUFBYixFQUFtQixPQUFPLFlBQVA7RUFDbkIsT0FBTyxPQUFQO0FBQ0gsRUFFRDs7O0FBQ0EsTUFBTUMsZUFBZSxHQUFJQyxRQUFELElBQWM7RUFDbEMsTUFBTUMsQ0FBQyxHQUFHLElBQUlDLElBQUosRUFBVjtFQUNBLE1BQU1DLFNBQVMsR0FBR0YsQ0FBQyxDQUFDRyxPQUFGLEVBQWxCO0VBQ0EsTUFBTUMsV0FBVyxHQUFHSixDQUFDLENBQUNLLGlCQUFGLEtBQXdCLEtBQTVDO0VBQ0EsTUFBTUMsR0FBRyxHQUFHSixTQUFTLEdBQUdFLFdBQXhCO0VBQ0EsTUFBTUcsT0FBTyxHQUFHRCxHQUFHLEdBQUcsT0FBT1AsUUFBN0I7RUFDQSxPQUFPLElBQUlFLElBQUosQ0FBU00sT0FBVCxDQUFQO0FBQ0gsQ0FQRDs7QUFTQSxNQUFNQyxXQUFXLEdBQUcsQ0FBQ0MsSUFBRCxFQUFPVixRQUFQLEtBQW9CO0VBQ3BDLE1BQU1DLENBQUMsR0FBRyxJQUFJQyxJQUFKLEVBQVY7RUFDQSxNQUFNRyxXQUFXLEdBQUdKLENBQUMsQ0FBQ0ssaUJBQUYsS0FBd0IsS0FBNUM7RUFDQSxNQUFNQyxHQUFHLEdBQUdHLElBQUksR0FBR0wsV0FBbkI7RUFDQSxNQUFNRyxPQUFPLEdBQUdELEdBQUcsR0FBRyxPQUFPUCxRQUE3QjtFQUNBLE9BQU8sSUFBSUUsSUFBSixDQUFTTSxPQUFULENBQVA7QUFDSCxDQU5ELEVBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxNQUFNRyxtQkFBbUIsR0FBSUMsU0FBRCxJQUFlO0VBQ3ZDLE1BQU1DLHFCQUFxQixHQUFHeEksUUFBUSxDQUFDYSxhQUFULENBQzFCLHdCQUQwQixDQUE5QixDQUR1QyxDQUl2Qzs7RUFDQTRILEtBQUssOERBQ3FERixTQURyRCw2REFFRDtJQUFFRyxJQUFJLEVBQUU7RUFBUixDQUZDLENBQUwsQ0FJS0MsSUFKTCxDQUlXQyxRQUFELElBQWNBLFFBQVEsQ0FBQ0MsSUFBVCxFQUp4QixFQUtLRixJQUxMLENBS1dDLFFBQUQsSUFBYztJQUNoQnhCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZdUIsUUFBWjtJQUNBLE1BQU1oRSxzQkFBc0IsR0FBRyxFQUEvQixDQUZnQixDQUdoQjs7SUFDQSxLQUFLLElBQUlqRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO01BQ3pCLE1BQU1tSSxpQkFBaUIsR0FBRztRQUN0QjVELElBQUksRUFBRSxJQUFJMkMsSUFBSixDQUFTZSxRQUFRLENBQUNHLElBQVQsQ0FBY3BJLENBQWQsRUFBaUJxSSxNQUExQixDQURnQjtRQUV0QkMsUUFBUSxFQUFFTCxRQUFRLENBQUNHLElBQVQsQ0FBY3BJLENBQWQsRUFBaUJxSSxNQUZMO1FBR3RCdEUsUUFBUSxFQUFFa0UsUUFBUSxDQUFDRyxJQUFULENBQWNwSSxDQUFkLEVBQWlCdUksSUFBakIsQ0FBc0J4RSxRQUhWO1FBSXRCeUUsVUFBVSxFQUFFUCxRQUFRLENBQUNHLElBQVQsQ0FBY3BJLENBQWQsRUFBaUJ5SSxHQUFqQixHQUF1QixHQUpiO1FBS3RCMUQsV0FBVyxFQUFFa0QsUUFBUSxDQUFDRyxJQUFULENBQWNwSSxDQUFkLEVBQWlCdUksSUFBakIsQ0FBc0JHLElBTGI7UUFNdEJDLGdCQUFnQixFQUFFVixRQUFRLENBQUNHLElBQVQsQ0FBY3BJLENBQWQsRUFBaUI0SSxPQUFqQixDQUF5QixDQUF6QixFQUE0QkwsSUFOeEI7UUFPdEIvRixrQkFBa0IsRUFBRXlGLFFBQVEsQ0FBQ0csSUFBVCxDQUFjcEksQ0FBZCxFQUFpQjRJLE9BQWpCLENBQXlCLENBQXpCLEVBQTRCQyxXQVAxQjtRQVF0QnRHLFdBQVcsRUFBRTBGLFFBQVEsQ0FBQ0csSUFBVCxDQUFjcEksQ0FBZCxFQUFpQjRJLE9BQWpCLENBQXlCLENBQXpCLEVBQTRCRSxJQVJuQjtRQVN0QmpGLFVBQVUsRUFBRW9FLFFBQVEsQ0FBQ0csSUFBVCxDQUFjcEksQ0FBZCxFQUFpQitJLElBQWpCLENBQXNCQyxHQVRaO1FBVXRCcEYsYUFBYSxFQUFFaUQsV0FBVyxDQUFDb0IsUUFBUSxDQUFDRyxJQUFULENBQWNwSSxDQUFkLEVBQWlCK0ksSUFBakIsQ0FBc0JDLEdBQXZCLENBVko7UUFXdEJDLFFBQVEsRUFBRWhCLFFBQVEsQ0FBQ0csSUFBVCxDQUFjcEksQ0FBZCxFQUFpQitJLElBQWpCLENBQXNCRyxJQVhWO1FBWXRCdkYsU0FBUyxFQUFFc0UsUUFBUSxDQUFDRyxJQUFULENBQWNwSSxDQUFkLEVBQWlCK0ksSUFBakIsQ0FBc0JJO01BWlgsQ0FBMUI7TUFjQWxGLHNCQUFzQixDQUFDbkMsSUFBdkIsQ0FBNEJxRyxpQkFBNUI7SUFDSDs7SUFDRDFCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZekMsc0JBQVo7SUFDQUQsZUFBZSxDQUFDQyxzQkFBRCxDQUFmO0lBQ0EsT0FBT0Esc0JBQVA7RUFDSCxDQTdCTCxFQThCS21GLEtBOUJMLENBOEJZQyxHQUFELElBQVM7SUFDWjVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMkMsR0FBWjtJQUNBeEIscUJBQXFCLENBQUNwRixTQUF0QixHQUFrQyxnQkFBbEM7RUFDSCxDQWpDTDtBQWtDSCxDQXZDRDs7QUF5Q0EsTUFBTTZHLG1CQUFtQixHQUFJMUIsU0FBRCxJQUFlO0VBQ3ZDO0VBQ0EsTUFBTUMscUJBQXFCLEdBQUd4SSxRQUFRLENBQUNhLGFBQVQsQ0FDMUIsd0JBRDBCLENBQTlCO0VBSUE0SCxLQUFLLDZEQUNvREYsU0FEcEQsNkRBRUQ7SUFBRUcsSUFBSSxFQUFFO0VBQVIsQ0FGQyxDQUFMLENBSUtDLElBSkwsQ0FJV0MsUUFBRCxJQUFjQSxRQUFRLENBQUNDLElBQVQsRUFKeEIsRUFLS0YsSUFMTCxDQUtXQyxRQUFELElBQWM7SUFDaEJ4QixPQUFPLENBQUNDLEdBQVIsQ0FBWXVCLFFBQVosRUFEZ0IsQ0FFaEI7SUFDQTtJQUNBOztJQUNBdEcsY0FBYyxDQUFDc0csUUFBUSxDQUFDbkgsSUFBVixDQUFkO0lBQ0EsTUFBTW9CLGNBQWMsR0FBRztNQUNuQkUsSUFBSSxFQUFFNkYsUUFBUSxDQUFDbkgsSUFESTtNQUVuQnVCLE9BQU8sRUFBRTRGLFFBQVEsQ0FBQ3NCLEdBQVQsQ0FBYWxILE9BRkg7TUFHbkIwQixRQUFRLEVBQUVrRSxRQUFRLENBQUNNLElBQVQsQ0FBY3hFLFFBSEw7TUFJbkJaLFNBQVMsRUFBRTRELGVBQWUsQ0FBQ2tCLFFBQVEsQ0FBQ2pCLFFBQVYsQ0FKUDtNQUtuQnpELE9BQU8sRUFBRWtFLFdBQVcsQ0FDaEJRLFFBQVEsQ0FBQ3NCLEdBQVQsQ0FBYWhHLE9BQWIsR0FBdUIsSUFEUCxFQUVoQjBFLFFBQVEsQ0FBQ2pCLFFBRk8sQ0FMRDtNQVNuQnZELE1BQU0sRUFBRWdFLFdBQVcsQ0FDZlEsUUFBUSxDQUFDc0IsR0FBVCxDQUFhOUYsTUFBYixHQUFzQixJQURQLEVBRWZ3RSxRQUFRLENBQUNqQixRQUZNLENBVEE7TUFhbkJuRSxXQUFXLEVBQUVvRixRQUFRLENBQUNNLElBQVQsQ0FBY0csSUFiUjtNQWNuQnpGLFFBQVEsRUFBRWdGLFFBQVEsQ0FBQ00sSUFBVCxDQUFjaUIsUUFkTDtNQWVuQnpHLE9BQU8sRUFBRWtGLFFBQVEsQ0FBQ00sSUFBVCxDQUFja0IsUUFmSjtNQWdCbkJkLGdCQUFnQixFQUFFVixRQUFRLENBQUNXLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0JMLElBaEJuQjtNQWlCbkIvRixrQkFBa0IsRUFBRXlGLFFBQVEsQ0FBQ1csT0FBVCxDQUFpQixDQUFqQixFQUFvQkMsV0FqQnJCO01Ba0JuQnRHLFdBQVcsRUFBRTBGLFFBQVEsQ0FBQ1csT0FBVCxDQUFpQixDQUFqQixFQUFvQkUsSUFsQmQ7TUFtQm5CakYsVUFBVSxFQUFFb0UsUUFBUSxDQUFDYyxJQUFULENBQWNDLEdBbkJQO01Bb0JuQnBGLGFBQWEsRUFBRWlELFdBQVcsQ0FBQ29CLFFBQVEsQ0FBQ2MsSUFBVCxDQUFjQyxHQUFmLENBcEJQO01BcUJuQnJGLFNBQVMsRUFBRXNFLFFBQVEsQ0FBQ2MsSUFBVCxDQUFjSSxLQXJCTjtNQXNCbkJGLFFBQVEsRUFBRWhCLFFBQVEsQ0FBQ2MsSUFBVCxDQUFjRztJQXRCTCxDQUF2QixDQU5nQixDQThCaEI7O0lBQ0F6QyxPQUFPLENBQUNDLEdBQVIsQ0FBWXhFLGNBQVo7SUFDQUQsY0FBYyxDQUFDQyxjQUFELENBQWQ7SUFDQSxPQUFPQSxjQUFQO0VBQ0gsQ0F2Q0wsRUF3Q0trSCxLQXhDTCxDQXdDWUMsR0FBRCxJQUFTO0lBQ1o1QyxPQUFPLENBQUNDLEdBQVIsQ0FBWTJDLEdBQVo7SUFDQXhCLHFCQUFxQixDQUFDcEYsU0FBdEIsR0FBa0MsZ0JBQWxDO0VBQ0gsQ0EzQ0w7QUE0Q0gsQ0FsREQ7O0FBb0RBLE1BQU11QyxhQUFhLEdBQUlwRCxLQUFELElBQVc7RUFDN0IwSCxtQkFBbUIsQ0FBQzFILEtBQUQsQ0FBbkI7RUFDQStGLG1CQUFtQixDQUFDL0YsS0FBRCxDQUFuQjtBQUNILENBSEQ7O0FBS0EsTUFBTTBELGNBQWMsR0FBSTlFLENBQUQsSUFBTztFQUMxQkEsQ0FBQyxDQUFDa0osY0FBRixHQUQwQixDQUUxQjs7RUFDQSxNQUFNOUQsZ0JBQWdCLEdBQUd2RyxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsbUJBQXZCLENBQXpCO0VBQ0EsTUFBTTJILHFCQUFxQixHQUFHeEksUUFBUSxDQUFDYSxhQUFULENBQzFCLHdCQUQwQixDQUE5QixDQUowQixDQU8xQjs7RUFDQTJILHFCQUFxQixDQUFDcEYsU0FBdEIsR0FBa0MsRUFBbEMsQ0FSMEIsQ0FTMUI7O0VBQ0EsSUFBSW1ELGdCQUFnQixDQUFDK0QsS0FBakIsS0FBMkIsRUFBL0IsRUFBbUM7SUFDL0I5QixxQkFBcUIsQ0FBQ3BGLFNBQXRCLEdBQWtDLGFBQWxDO0VBQ0gsQ0FGRCxNQUVPO0lBQ0h1QyxhQUFhLENBQUNZLGdCQUFnQixDQUFDK0QsS0FBbEIsQ0FBYjtJQUNBeEQsUUFBUTtJQUNSUCxnQkFBZ0IsQ0FBQytELEtBQWpCLEdBQXlCLEVBQXpCO0VBQ0g7QUFDSixDQWpCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzFnQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZkE7QUFLQTtBQUNBOztBQUVBLE1BQU1HLFlBQVksR0FBRyxNQUFNO0VBQ3ZCLE1BQU1DLE1BQU0sR0FBRzFLLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixRQUF2QixDQUFmLENBRHVCLENBR3ZCOztFQUNBLE1BQU1zSyxJQUFJLEdBQUczSyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtFQUNBc0ssSUFBSSxDQUFDckssR0FBTCxHQUFXa0ssaURBQVg7RUFDQUcsSUFBSSxDQUFDdkosTUFBTCxHQUFjLFFBQWQ7RUFDQXVKLElBQUksQ0FBQ3BLLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkIsTUFBM0I7RUFDQW1LLE1BQU0sQ0FBQ2xLLFdBQVAsQ0FBbUJtSyxJQUFuQixFQVJ1QixDQVV2Qjs7RUFDQSxNQUFNQyxLQUFLLEdBQUc1SyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBZDtFQUNBdUssS0FBSyxDQUFDcEosV0FBTixHQUFvQixjQUFwQjtFQUNBa0osTUFBTSxDQUFDbEssV0FBUCxDQUFtQm9LLEtBQW5CO0VBRUEsT0FBT0YsTUFBUDtBQUNILENBaEJEOztBQWtCQSxNQUFNRyxVQUFVLEdBQUcsTUFBTTtFQUNyQixNQUFNQyxJQUFJLEdBQUc5SyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtFQUNBeUssSUFBSSxDQUFDdkssWUFBTCxDQUFrQixPQUFsQixFQUEyQixNQUEzQixFQUZxQixDQUlyQjs7RUFDQSxNQUFNd0ssZUFBZSxHQUFHL0ssUUFBUSxDQUFDSyxhQUFULENBQXVCLEdBQXZCLENBQXhCO0VBQ0EwSyxlQUFlLENBQUN4SyxZQUFoQixDQUE2QixPQUE3QixFQUFzQyxpQkFBdEM7RUFDQXdLLGVBQWUsQ0FBQ3ZKLFdBQWhCLEdBQThCLFdBQTlCLENBUHFCLENBU3JCOztFQUNBLE1BQU1aLFNBQVMsR0FBR1osUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQWxCO0VBQ0FPLFNBQVMsQ0FBQ0wsWUFBVixDQUF1QixPQUF2QixFQUFnQyxXQUFoQztFQUNBSyxTQUFTLENBQUNMLFlBQVYsQ0FBdUIsSUFBdkIsRUFBNkIsV0FBN0IsRUFacUIsQ0FjckI7RUFFQTs7RUFDQSxNQUFNeUssb0JBQW9CLEdBQUdoTCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBN0I7RUFDQTJLLG9CQUFvQixDQUFDekssWUFBckIsQ0FBa0MsT0FBbEMsRUFBMkMsV0FBM0MsRUFsQnFCLENBb0JyQjs7RUFDQSxNQUFNMEssV0FBVyxHQUFHakwsUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQXBCO0VBQ0E0SyxXQUFXLENBQUMxSyxZQUFaLENBQXlCLE9BQXpCLEVBQWtDLGdCQUFsQztFQUNBK0csb0VBQWtCLENBQUMyRCxXQUFELENBQWxCO0VBQ0EsTUFBTUMsZUFBZSxHQUFHbEwsUUFBUSxDQUFDSyxhQUFULENBQXVCLE1BQXZCLENBQXhCO0VBQ0E2SyxlQUFlLENBQUM5SCxTQUFoQixHQUE0QixjQUE1QjtFQUNBNkgsV0FBVyxDQUFDekssV0FBWixDQUF3QjBLLGVBQXhCO0VBQ0FGLG9CQUFvQixDQUFDeEssV0FBckIsQ0FBaUN5SyxXQUFqQyxFQTNCcUIsQ0E2QnJCOztFQUNBLE1BQU1wRSxlQUFlLEdBQUc3RyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBeEI7RUFDQXdHLGVBQWUsQ0FBQ3RHLFlBQWhCLENBQTZCLE9BQTdCLEVBQXNDLGlCQUF0QztFQUNBc0csZUFBZSxDQUFDdEcsWUFBaEIsQ0FBNkIsSUFBN0IsRUFBbUMsUUFBbkM7RUFDQXNHLGVBQWUsQ0FBQ3NFLE1BQWhCLEdBQXlCLEtBQXpCO0VBQ0EvRSw0REFBVSxDQUFDUyxlQUFELENBQVY7RUFDQW1FLG9CQUFvQixDQUFDeEssV0FBckIsQ0FBaUNxRyxlQUFqQztFQUVBaUUsSUFBSSxDQUFDdEssV0FBTCxDQUFpQnVLLGVBQWpCO0VBQ0FELElBQUksQ0FBQ3RLLFdBQUwsQ0FBaUJJLFNBQWpCO0VBQ0FrSyxJQUFJLENBQUN0SyxXQUFMLENBQWlCd0ssb0JBQWpCO0VBRUEsT0FBT0YsSUFBUDtBQUNILENBMUNEOztBQTRDQSxNQUFNTSxpQkFBaUIsR0FBRyxNQUFNO0VBQzVCO0VBQ0EsTUFBTUMsb0JBQW9CLEdBQUdyTCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBN0I7RUFDQWdMLG9CQUFvQixDQUFDdEssU0FBckIsQ0FBK0JDLEdBQS9CLENBQW1DLHNCQUFuQyxFQUEyRCxTQUEzRCxFQUg0QixDQUs1Qjs7RUFDQSxNQUFNc0ssUUFBUSxHQUFHdEwsUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQWpCO0VBQ0FpTCxRQUFRLENBQUN2SyxTQUFULENBQW1CQyxHQUFuQixDQUF1QixjQUF2QjtFQUNBc0ssUUFBUSxDQUFDbEksU0FBVCxHQUFxQixjQUFyQixDQVI0QixDQVU1Qjs7RUFDQSxNQUFNSCxRQUFRLEdBQUdqRCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakI7RUFDQTRDLFFBQVEsQ0FBQ2xDLFNBQVQsQ0FBbUJDLEdBQW5CLENBQXVCLFVBQXZCLEVBWjRCLENBYzVCOztFQUNBLE1BQU11SyxvQkFBb0IsR0FBR3ZMLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUE3QjtFQUNBa0wsb0JBQW9CLENBQUN4SyxTQUFyQixDQUErQkMsR0FBL0IsQ0FBbUMsb0JBQW5DLEVBaEI0QixDQWtCNUI7O0VBQ0EsTUFBTXFDLGFBQWEsR0FBR3JELFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUF0QjtFQUNBZ0QsYUFBYSxDQUFDdEMsU0FBZCxDQUF3QkMsR0FBeEIsQ0FBNEIsZUFBNUIsRUFwQjRCLENBc0I1Qjs7RUFDQSxNQUFNd0ssZ0JBQWdCLEdBQUd4TCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBekI7RUFDQW1MLGdCQUFnQixDQUFDekssU0FBakIsQ0FBMkJDLEdBQTNCLENBQStCLGtCQUEvQjtFQUVBLE1BQU15QyxnQkFBZ0IsR0FBR3pELFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUF6QjtFQUNBb0QsZ0JBQWdCLENBQUMxQyxTQUFqQixDQUEyQkMsR0FBM0IsQ0FBK0Isa0JBQS9CO0VBQ0F3SyxnQkFBZ0IsQ0FBQ2hMLFdBQWpCLENBQTZCaUQsZ0JBQTdCO0VBRUEsTUFBTUUsaUJBQWlCLEdBQUczRCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBMUI7RUFDQXNELGlCQUFpQixDQUFDNUMsU0FBbEIsQ0FBNEJDLEdBQTVCLENBQWdDLG1CQUFoQztFQUNBd0ssZ0JBQWdCLENBQUNoTCxXQUFqQixDQUE2Qm1ELGlCQUE3QixFQWhDNEIsQ0FrQzVCOztFQUNBLE1BQU1FLGFBQWEsR0FBRzdELFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUF0QjtFQUNBd0QsYUFBYSxDQUFDOUMsU0FBZCxDQUF3QkMsR0FBeEIsQ0FBNEIsZUFBNUIsRUFwQzRCLENBc0M1Qjs7RUFDQSxNQUFNeUssc0JBQXNCLEdBQUd6TCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBL0I7RUFDQW9MLHNCQUFzQixDQUFDMUssU0FBdkIsQ0FBaUNDLEdBQWpDLENBQXFDLHdCQUFyQztFQUVBLE1BQU1pRCxnQkFBZ0IsR0FBR2pFLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUF6QjtFQUNBNEQsZ0JBQWdCLENBQUNsRCxTQUFqQixDQUEyQkMsR0FBM0IsQ0FBK0Isa0JBQS9CO0VBQ0F5SyxzQkFBc0IsQ0FBQ2pMLFdBQXZCLENBQW1DeUQsZ0JBQW5DO0VBRUEsTUFBTUUsZUFBZSxHQUFHbkUsUUFBUSxDQUFDSyxhQUFULENBQXVCLE1BQXZCLENBQXhCO0VBQ0E4RCxlQUFlLENBQUNwRCxTQUFoQixDQUEwQkMsR0FBMUIsQ0FBOEIsaUJBQTlCO0VBQ0F5SyxzQkFBc0IsQ0FBQ2pMLFdBQXZCLENBQW1DMkQsZUFBbkMsRUFoRDRCLENBa0Q1Qjs7RUFDQSxNQUFNRSxhQUFhLEdBQUdyRSxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBdEI7RUFDQWdFLGFBQWEsQ0FBQ3RELFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLGVBQTVCLEVBcEQ0QixDQXNENUI7O0VBQ0EsTUFBTXlELGlCQUFpQixHQUFHekUsUUFBUSxDQUFDSyxhQUFULENBQXVCLE1BQXZCLENBQTFCO0VBQ0FvRSxpQkFBaUIsQ0FBQzFELFNBQWxCLENBQTRCQyxHQUE1QixDQUFnQyxtQkFBaEMsRUF4RDRCLENBMEQ1Qjs7RUFDQSxNQUFNMEssaUJBQWlCLEdBQUcxTCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBMUI7RUFDQXFMLGlCQUFpQixDQUFDM0ssU0FBbEIsQ0FBNEJDLEdBQTVCLENBQWdDLG1CQUFoQztFQUVBLE1BQU0ySyxhQUFhLEdBQUczTCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBdEI7RUFDQXNMLGFBQWEsQ0FBQzVLLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLGVBQTVCO0VBQ0EySyxhQUFhLENBQUN2SSxTQUFkLEdBQTBCLGdDQUExQjtFQUVBLE1BQU13SSxhQUFhLEdBQUc1TCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBdEI7RUFDQXVMLGFBQWEsQ0FBQzdLLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLGVBQTVCO0VBQ0EwSyxpQkFBaUIsQ0FBQ2xMLFdBQWxCLENBQThCb0wsYUFBOUI7RUFFQSxNQUFNL0csV0FBVyxHQUFHN0UsUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQXBCO0VBQ0F3RSxXQUFXLENBQUM5RCxTQUFaLENBQXNCQyxHQUF0QixDQUEwQixhQUExQjtFQUNBNEssYUFBYSxDQUFDcEwsV0FBZCxDQUEwQnFFLFdBQTFCLEVBeEU0QixDQTBFNUI7O0VBQ0FBLFdBQVcsQ0FBQzNELGdCQUFaLENBQTZCLE9BQTdCLEVBQXVDQyxDQUFELElBQU87SUFDekNBLENBQUMsQ0FBQ2tKLGNBQUY7SUFDQXhGLFdBQVcsQ0FBQ2dILFVBQVosSUFBMEIxSyxDQUFDLENBQUMySyxNQUE1QjtFQUNILENBSEQsRUEzRTRCLENBZ0Y1Qjs7RUFDQVQsb0JBQW9CLENBQUM3SyxXQUFyQixDQUFpQzhLLFFBQWpDO0VBQ0FELG9CQUFvQixDQUFDN0ssV0FBckIsQ0FBaUN5QyxRQUFqQztFQUNBb0ksb0JBQW9CLENBQUM3SyxXQUFyQixDQUFpQytLLG9CQUFqQztFQUNBRixvQkFBb0IsQ0FBQzdLLFdBQXJCLENBQWlDNkMsYUFBakM7RUFDQWdJLG9CQUFvQixDQUFDN0ssV0FBckIsQ0FBaUNnTCxnQkFBakM7RUFDQUgsb0JBQW9CLENBQUM3SyxXQUFyQixDQUFpQ3FELGFBQWpDO0VBQ0F3SCxvQkFBb0IsQ0FBQzdLLFdBQXJCLENBQWlDaUwsc0JBQWpDO0VBQ0FKLG9CQUFvQixDQUFDN0ssV0FBckIsQ0FBaUM2RCxhQUFqQztFQUNBZ0gsb0JBQW9CLENBQUM3SyxXQUFyQixDQUFpQ2lFLGlCQUFqQztFQUNBNEcsb0JBQW9CLENBQUM3SyxXQUFyQixDQUFpQ21MLGFBQWpDO0VBQ0FOLG9CQUFvQixDQUFDN0ssV0FBckIsQ0FBaUNrTCxpQkFBakM7RUFFQSxPQUFPTCxvQkFBUDtBQUNILENBOUZEOztBQWdHQSxNQUFNVSxhQUFhLEdBQUcsTUFBTTtFQUN4QjtFQUNBLE1BQU1DLE9BQU8sR0FBR2hNLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFoQjtFQUNBMkwsT0FBTyxDQUFDakwsU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0IsU0FBdEIsRUFId0IsQ0FLeEI7O0VBQ0FnTCxPQUFPLENBQUN4TCxXQUFSLENBQW9CNEssaUJBQWlCLEVBQXJDO0VBRUEsT0FBT1ksT0FBUDtBQUNILENBVEQ7O0FBV0EsTUFBTUMsWUFBWSxHQUFHLE1BQU07RUFDdkIsTUFBTUMsTUFBTSxHQUFHbE0sUUFBUSxDQUFDSyxhQUFULENBQXVCLFFBQXZCLENBQWY7RUFFQSxNQUFNOEwsU0FBUyxHQUFHbk0sUUFBUSxDQUFDSyxhQUFULENBQXVCLEdBQXZCLENBQWxCO0VBQ0E4TCxTQUFTLENBQUMzSyxXQUFWLDRCQUF1QyxJQUFJcUcsSUFBSixHQUFXdUUsV0FBWCxFQUF2QztFQUVBLE1BQU1DLFVBQVUsR0FBR3JNLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixHQUF2QixDQUFuQjtFQUNBZ00sVUFBVSxDQUFDQyxJQUFYLEdBQWtCLGdDQUFsQjtFQUNBRCxVQUFVLENBQUNqTCxNQUFYLEdBQW9CLFFBQXBCO0VBRUEsTUFBTW1MLGFBQWEsR0FBR3ZNLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUF0QjtFQUNBa00sYUFBYSxDQUFDak0sR0FBZCxHQUFvQmlLLDBEQUFwQjtFQUNBZ0MsYUFBYSxDQUFDaE0sWUFBZCxDQUEyQixPQUEzQixFQUFvQyxRQUFwQztFQUVBOEwsVUFBVSxDQUFDN0wsV0FBWCxDQUF1QitMLGFBQXZCO0VBQ0FMLE1BQU0sQ0FBQzFMLFdBQVAsQ0FBbUIyTCxTQUFuQjtFQUNBRCxNQUFNLENBQUMxTCxXQUFQLENBQW1CNkwsVUFBbkI7RUFFQSxPQUFPSCxNQUFQO0FBQ0gsQ0FuQkQ7O0FBcUJlLFNBQVNNLFVBQVQsR0FBc0I7RUFDakN4TSxRQUFRLENBQUN5TSxJQUFULENBQWNqTSxXQUFkLENBQTBCaUssWUFBWSxFQUF0QztFQUNBekssUUFBUSxDQUFDeU0sSUFBVCxDQUFjak0sV0FBZCxDQUEwQnFLLFVBQVUsRUFBcEM7RUFDQTdLLFFBQVEsQ0FBQ3lNLElBQVQsQ0FBY2pNLFdBQWQsQ0FBMEJ1TCxhQUFhLEVBQXZDO0VBQ0EvTCxRQUFRLENBQUN5TSxJQUFULENBQWNqTSxXQUFkLENBQTBCeUwsWUFBWSxFQUF0QztBQUNILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZGl0aW9uSWNvbiBmcm9tICcuL2Fzc2V0cy9wbHVzLnN2ZydcbmltcG9ydCBkZWxldGVJY29uIGZyb20gJy4vYXNzZXRzL2RlbGV0ZS5zdmcnXG5pbXBvcnQgbWVudUljb24gZnJvbSAnLi9hc3NldHMvbWVudUljb24uc3ZnJ1xuXG5kb2N1bWVudC5jb29raWUgPSAnU2FtZVNpdGU9TGF4J1xuXG5jb25zdCBjcmVhdGVNZW51SWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrbGlzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGNoZWNrbGlzdEljb24uc3JjID0gbWVudUljb25cbiAgICBjaGVja2xpc3RJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tsaXN0SWNvbilcbn1cblxuLy8gQWRkIHNpbmdsZSBsb2NhdGlvbiB0byB3YXRjaGxpc3QgKGNhbGxlZCBiZWxvdylcbmNvbnN0IGNyZWF0ZUxpc3RpbmcgPSAobG9jYXRpb25OYW1lLCBpKSA9PiB7XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKGBsb2NhdGlvbmApXG4gICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICAvLyBhc3NpZ24gY2xhc3MgdG8gc2VsZWN0ZWQgbG9jYXRpb24gbGlzdGluZ1xuICAgIGlmIChsb2NhdGlvbk5hbWUuc2VsZWN0ZWQgPT09ICd0cnVlJykge1xuICAgICAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgICAgIC8vIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKVxuICAgIH1cblxuICAgIC8vIGV2ZW50IGxpc3RlbmVyIHRvIGRpc3BsYXkgc2VsZWN0ZWQgbG9jYXRpb24ncyB3ZWF0aGVyXG4gICAgbG9jYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBpZiBkZWxldGluZyBsaXN0aW5nLCBkbyBub3QgZGlzcGxheSB3ZWF0aGVyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZUl0ZW0nKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0TG9jYXRpb24obG9jYXRpb24pXG4gICAgfSlcblxuICAgIGNyZWF0ZU1lbnVJY29uKGxvY2F0aW9uKVxuICAgIGNvbnN0IGxvY2F0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGxvY2F0aW9uVGV4dC50ZXh0Q29udGVudCA9IGxvY2F0aW9uTmFtZS5uYW1lXG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQobG9jYXRpb25UZXh0KVxuICAgIGNyZWF0ZURlbGV0ZUljb24obG9jYXRpb24sIGkpXG4gICAgd2F0Y2hsaXN0LmFwcGVuZENoaWxkKGxvY2F0aW9uKVxufVxuXG4vLyBEaXNwbGF5IGVudGlyZSBhcnJheSBvZiBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG5jb25zdCBkaXNwbGF5V2F0Y2hsaXN0ID0gKCkgPT4ge1xuICAgIC8vIEdyYWIgd2F0Y2hsaXN0XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICAvLyBDbGVhciBsb2NhdGlvbiBsaXN0aW5nc1xuICAgIGNvbnN0IG9sZExpc3RpbmdDb3VudCA9IHdhdGNobGlzdC5jaGlsZEVsZW1lbnRDb3VudFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkTGlzdGluZ0NvdW50OyBpKyspIHtcbiAgICAgICAgd2F0Y2hsaXN0LmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgYWxsIGxvY2F0aW9ucyB0byB3YXRjaGxpc3RcbiAgICBsZXQgaSA9IDBcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcbiAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlV2F0Y2hsaXN0KVxuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgY3JlYXRlTGlzdGluZyhsb2NhdGlvbiwgaSlcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgIGkrK1xuICAgIH0pXG59XG5cbmNvbnN0IHN1Ym1pdExvY2F0aW9uID0gKGlucHV0KSA9PiB7XG4gICAgLy8gY3JlYXRlIGxvY2F0aW9uIG9iamVjdFxuICAgIGNvbnN0IG5ld0xvY2F0aW9uID0ge1xuICAgICAgICBuYW1lOiBpbnB1dCxcbiAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgfVxuXG4gICAgLy8gZ3JhYiBhcnJheSBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIGRlc2VsZWN0IHByZXZpb3VzbHkgc2VsZWN0ZWQgbG9jYXRpb25cbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIHB1c2ggbG9jYXRpb24gdG8gYXJyYXlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnB1c2gobmV3TG9jYXRpb24pXG4gICAgLy8gY29uc29sZS5sb2coc3RvcmFnZVdhdGNobGlzdClcblxuICAgIC8vIHNldCBhcnJheSBiYWNrIGludG8gc3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyByZWZyZXNoIHdhdGNobGlzdFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBkaXNwbGF5V2VhdGhlciA9IChuZXdXZWF0aGVyQ2FyZCkgPT4ge1xuICAgIC8vIGRpc3BsYXkgY29udGVudCB0aXRsZVxuICAgIGNvbnN0IGNvbnRlbnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50VGl0bGUnKVxuICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9IGAke25ld1dlYXRoZXJDYXJkLmNpdHl9LCAke25ld1dlYXRoZXJDYXJkLmNvdW50cnl9YFxuXG4gICAgLy8gZGlzcGxheSB3ZWF0aGVyIGljb25cbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7bmV3V2VhdGhlckNhcmQud2VhdGhlckljb259QDJ4LnBuZ2BcblxuICAgIC8vIGRpc3BsYXkgZGVzY3JpcHRpb25cbiAgICBjb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gbmV3V2VhdGhlckNhcmQud2VhdGhlckRlc2NyaXB0aW9uXG5cbiAgICAvLyBkaXNwbGF5IGN1cnJlbnQgdGVtcGVyYXR1cmVcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBDb250YWluZXInKVxuICAgIHRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZChuZXdXZWF0aGVyQ2FyZC50ZW1wQ3VycmVudCl9XFx1MDBCMGBcblxuICAgIC8vIGRpc3BsYXkgaGlnaC9sb3cgdGVtcGVyYXR1cmVzXG4gICAgY29uc3QgbG93VGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb3dUZW1wQ29udGFpbmVyJylcbiAgICBsb3dUZW1wQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb3c6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcExvd1xuICAgICl9XFx1MDBCMGBcbiAgICBjb25zdCBoaWdoVGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWdoVGVtcENvbnRhaW5lcicpXG4gICAgaGlnaFRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYEhpZ2g6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcEhpZ2hcbiAgICApfVxcdTAwQjBgXG5cbiAgICAvLyBkaXBsYXkgY3VycmVudCB0aW1lXG4gICAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lQ29udGFpbmVyJylcbiAgICB0aW1lQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb2NhbCB0aW1lOiAke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSBzdW5yaXNlL3N1bnNldCB0aW1lc1xuICAgIGNvbnN0IHN1bnJpc2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VucmlzZUNvbnRhaW5lcicpXG4gICAgc3VucmlzZUNvbnRhaW5lci5pbm5lclRleHQgPSBgU3VucmlzZTogJHtuZXdXZWF0aGVyQ2FyZC5zdW5yaXNlLmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQuc3VucmlzZS5nZXRNaW51dGVzKCl9YFxuICAgIGNvbnN0IHN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdW5zZXRDb250YWluZXInKVxuICAgIHN1bnNldENvbnRhaW5lci5pbm5lclRleHQgPSBgU3Vuc2V0OiAke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSB3aW5kXG4gICAgY29uc3Qgd2luZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kQ29udGFpbmVyJylcbiAgICB3aW5kQ29udGFpbmVyLmlubmVyVGV4dCA9IGBXaW5kOiAke01hdGgucm91bmQoXG4gICAgICAgIG5ld1dlYXRoZXJDYXJkLndpbmRTcGVlZFxuICAgICl9bXBoLCAke25ld1dlYXRoZXJDYXJkLndpbmREaXJlY3Rpb259ICgke25ld1dlYXRoZXJDYXJkLndpbmREZWdyZWV9XFx1MDBCMClgXG5cbiAgICAvLyBkaXNwbGF5IGh1bWlkaXR5XG4gICAgY29uc3QgaHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHlDb250YWluZXInKVxuICAgIGh1bWlkaXR5Q29udGFpbmVyLmlubmVyVGV4dCA9IGBIdW1pZGl0eTogJHtuZXdXZWF0aGVyQ2FyZC5odW1pZGl0eX0lYFxufVxuXG5jb25zdCBkaXNwbGF5Rm9yZWNhc3QgPSAobmV3SG91cmx5Rm9yZWNhc3RBcnJheSkgPT4ge1xuICAgIGNvbnN0IGZvcmVjYXN0Um93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcmVjYXN0Um93JylcblxuICAgIC8vIHJlbW92ZSBhbnkgZm9yZWNhc3QgY2VsbHNcbiAgICBjb25zdCBvbGRGb3JlY2FzdCA9IGZvcmVjYXN0Um93LmNoaWxkRWxlbWVudENvdW50XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRGb3JlY2FzdDsgaSsrKSB7XG4gICAgICAgIGZvcmVjYXN0Um93LmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvLyBBZGQgbmV3IGZvcmVjYXN0IGNlbGxzXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdIb3VybHlGb3JlY2FzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgZm9yZWNhc3RDZWxsLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Q2VsbCcpXG5cbiAgICAgICAgLy8gZGlzcGxheSBkYXRlXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdERhdGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3REYXRlJylcbiAgICAgICAgZm9yZWNhc3REYXRlLmlubmVyVGV4dCA9IGAke1xuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS5kYXRlLmdldE1vbnRoKCkgKyAxXG4gICAgICAgIH0vJHtuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLmRhdGUuZ2V0RGF0ZSgpfWBcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0RGF0ZSlcblxuICAgICAgICAvLyBkaXNwbGF5IHRpbWVcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0VGltZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRpbWUnKVxuICAgICAgICBmb3JlY2FzdFRpbWUuaW5uZXJUZXh0ID1cbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0uZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoKVxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaW1lKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgd2VhdGhlciBpY29uXG4gICAgICAgIGNvbnN0IHdlYXRoZXJGb3JlY2FzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgICAgICB3ZWF0aGVyRm9yZWNhc3RJY29uLmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXJGb3JlY2FzdEljb24nKVxuICAgICAgICB3ZWF0aGVyRm9yZWNhc3RJY29uLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0ud2VhdGhlckljb259LnBuZ2BcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKHdlYXRoZXJGb3JlY2FzdEljb24pXG5cbiAgICAgICAgLy8gZGlzcGxheSB3ZWF0aGVyIGRlc2NyaXB0aW9uXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICAgICAgZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24uaW5uZXJUZXh0ID1cbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0ud2VhdGhlckRlc2NyaXB0aW9uXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5hcHBlbmRDaGlsZChmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbilcblxuICAgICAgICAvLyBkaXNwbGF5IGZvcmVjYXN0IHRlbXBlcmF0dXJlXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUZW1wJylcbiAgICAgICAgZm9yZWNhc3RUZW1wLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQoXG4gICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLnRlbXBlcmF0dXJlXG4gICAgICAgICl9XFx1MDBCMGBcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcClcblxuICAgICAgICBmb3JlY2FzdFJvdy5hcHBlbmRDaGlsZChmb3JlY2FzdENlbGwpXG4gICAgfVxufVxuXG5jb25zdCBzZWxlY3RMb2NhdGlvbiA9IChsaSkgPT4ge1xuICAgIC8vIHNldCBjb250ZW50IHRpdGxlXG4gICAgLy8gY29uc3QgY29udGVudFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRUaXRsZScpXG4gICAgLy8gY29udGVudFRpdGxlLnRleHRDb250ZW50ID0gbGkuaW5uZXJUZXh0XG5cbiAgICAvLyBGZXRjaCBjdXJyZW50IHdlYXRoZXJcbiAgICBBUElDaXR5U2VhcmNoKGxpLmlubmVyVGV4dClcblxuICAgIC8vIGdyYWIgbG9jYXRpb25zIGFycmF5IGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gZGVzZWxlY3QgYWxsIGxvY2F0aW9uc1xuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlbGVjdGVkID0gJ2ZhbHNlJ1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIFNlbGVjdCBsb2NhdGlvbiBpZiBvbmUgaXMgY2hvc2VuIChtYWluIG1lbnUgc2VsZWN0aW9uIGlzIGhhbmRsZWQgaW4gZXZlbnQgbGlzdGVuZXIpXG4gICAgaWYgKGxpLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSA9PT0gJ2xvY2F0aW9uJykge1xuICAgICAgICBjb25zdCBzZWxlY3RlZExvY2F0aW9uSWQgPSBsaS5nZXRBdHRyaWJ1dGUoJ2lkJylcbiAgICAgICAgc3RvcmFnZVdhdGNobGlzdFtzZWxlY3RlZExvY2F0aW9uSWRdLnNlbGVjdGVkID0gJ3RydWUnXG4gICAgfVxuXG4gICAgLy8gc2V0IGxvY2F0aW9ucyBhcnJheSBiYWNrIGludG8gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIHJlZnJlc2hcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlQWRkQnV0dG9uID0gKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoJ2FkZEJ0bicpXG4gICAgYWRkQnRuLmlubmVyVGV4dCA9ICdzZWFyY2gnXG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHZhbGlkYXRlU2VhcmNoKGUpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRCdG4pXG59XG5cbmNvbnN0IGNyZWF0ZUNhbmNlbEJ1dHRvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdjYW5jZWxCdG4nKVxuICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuICAgIGNhbmNlbEJ0bi5pbm5lclRleHQgPSAnY2FuY2VsJ1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pXG59XG5cbi8vIGNyZWF0ZUZvcm1cbmNvbnN0IGNyZWF0ZUZvcm0gPSAoZm9ybSkgPT4ge1xuICAgIC8vIHJvdyBvbmU6IGFzc2lnbiBpbnB1dFxuICAgIGNvbnN0IGZvcm1Sb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93MS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgbmV3TG9jYXRpb25JbnB1dC5jbGFzc0xpc3QuYWRkKCduZXdMb2NhdGlvbklucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LnBsYWNlaG9sZGVyID0gJ0Zsb3JlbmNlJ1xuICAgIG5ld0xvY2F0aW9uSW5wdXQubmFtZSA9ICduZXdMb2NhdGlvbklucHV0J1xuICAgIGZvcm1Sb3cxLmFwcGVuZENoaWxkKG5ld0xvY2F0aW9uSW5wdXQpXG5cbiAgICAvLyByb3cgdHdvOiBzdWJtaXQgYW5kIGNhbmNlbCBidXR0b25zXG4gICAgY29uc3QgZm9ybVJvdzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdpZCcsICdmb3JtQnV0dG9ucycpXG4gICAgY3JlYXRlQWRkQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuICAgIGNyZWF0ZUNhbmNlbEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcblxuICAgIC8vIHJvdyB0aHJlZTogYXNzaWduIGVycm9yIGNsYXNzIGFuZCB0ZXh0XG4gICAgY29uc3QgZm9ybVJvdzMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIC8vIGZvcm1Sb3czLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBmb3JtUm93My5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ25ld1Byb2pFcnJvckNvbnRhaW5lcicpXG4gICAgLy8gZm9ybVJvdzMuaW5uZXJUZXh0ID0gJ1doaWNoIGNpdHk/J1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MSlcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cyKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzMpXG59XG5cbmNvbnN0IHNob3dGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZExvY2F0aW9uQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uQnRuJylcbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25Gb3JtJylcblxuICAgIGFkZExvY2F0aW9uQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdzaG93QmxvY2snKVxufVxuXG5jb25zdCBoaWRlRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRMb2NhdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkJ0bicpXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uRm9ybScpXG5cbiAgICBhZGRMb2NhdGlvbkJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Nob3dCbG9jaycpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbn1cblxuLy8gRGVsZXRlIHdhdGNobGlzdCBlbnRyeVxuY29uc3QgZGVsZXRlV2F0Y2hsaXN0RW50cnkgPSAoZSkgPT4ge1xuICAgIC8vIGdyYWIgYXJyYXlzIGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gSWRlbnRpZnkgZW50cnkgdG8gZGVsZXRlXG4gICAgY29uc3QgZG9vbWVkSW5kZXggPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJylcbiAgICAvLyBjb25zdCBkb29tZWROYW1lID0gc3RvcmFnZVdhdGNobGlzdFtkb29tZWRJbmRleF0ubmFtZTtcblxuICAgIC8vIGRlbGV0ZSBlbnRyeVxuICAgIHN0b3JhZ2VXYXRjaGxpc3Quc3BsaWNlKGRvb21lZEluZGV4LCAxKVxuXG4gICAgLy8gc2V0IGNoYW5nZXMgdG8gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIElmIGRvb21lZCBlbnRyeSB3YXMgc2VsZWN0ZWQsIGNsZWFyIGNvbnRlbnQgZGlzcGxheVxuICAgIC8vIGNvbnN0IGNvbnRlbnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50VGl0bGUnKTtcbiAgICAvLyBjb25zdCBhbGxUYXNrc0NsYXNzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGxUYXNrcycpLmNsYXNzTGlzdFxuICAgIC8vIGlmIChjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPT09IGRvb21lZE5hbWUpIHtcbiAgICAvLyAgICAgY29udGVudFRpdGxlLnRleHRDb250ZW50ID0gJ0FsbCB0YXNrcydcbiAgICAvLyAgICAgYWxsVGFza3NDbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgLy8gfVxuXG4gICAgLy8gcmVmcmVzaCB3YXRjaGlzdFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBjcmVhdGVEZWxldGVJY29uID0gKGNvbnRhaW5lciwgaSkgPT4ge1xuICAgIC8vIGNyZWF0ZSBpbWFnZSBhbmQgYXNzaWduIGF0dHJpYnV0ZXNcbiAgICBjb25zdCBuZXdEZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdEZWxldGVJY29uLnNyYyA9IGRlbGV0ZUljb25cbiAgICBuZXdEZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbiBkZWxldGVJdGVtJylcbiAgICBuZXdEZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG5cbiAgICAvLyBBREQgRVZFTlQgTElTVEVORVJcbiAgICBpZiAoXG4gICAgICAgIGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdsb2NhdGlvbicgfHxcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnbG9jYXRpb24nKVxuICAgICkge1xuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lciB0byBkZWxldGUgbG9jYXRpb25cbiAgICAgICAgbmV3RGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgYGRlbGV0ZVdhdGNobGlzdEVudHJ5YCxcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gLFxuICAgICAgICAgICAgYGhpZGRlbmBcbiAgICAgICAgKVxuICAgICAgICBuZXdEZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+XG4gICAgICAgICAgICBkZWxldGVXYXRjaGxpc3RFbnRyeShlLCBpKVxuICAgICAgICApXG4gICAgICAgIC8vIGRpc3BsYXkgdHJhc2ggaWNvbiBvbiBob3ZlclxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICAgICAgLy8gaGlkZSB0cmFzaCBpY29uXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICBgLmRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHN0cmFuZ2UnKVxuICAgIH1cbiAgICAvLyBhcHBlbmQgdG8gY29udGFpbmVyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0RlbGV0ZUljb24pXG59XG5cbmNvbnN0IGNyZWF0ZUFkZGl0aW9uSWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IG5ld0FkZGl0aW9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3QWRkaXRpb25JY29uLnNyYyA9IGFkZGl0aW9uSWNvblxuICAgIG5ld0FkZGl0aW9uSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24nKVxuICAgIGxpLmFwcGVuZENoaWxkKG5ld0FkZGl0aW9uSWNvbilcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gT3BlbndlYXRoZXIgQVBJIEZ1bmN0aW9uc1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiB0b0RpcmVjdGlvbihkZWdyZWUpIHtcbiAgICBpZiAoZGVncmVlID4gMzM3LjUpIHJldHVybiAnTm9ydGgnXG4gICAgaWYgKGRlZ3JlZSA+IDI5Mi41KSByZXR1cm4gJ05vcnRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDI0Ny41KSByZXR1cm4gJ1dlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIwMi41KSByZXR1cm4gJ1NvdXRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDE1Ny41KSByZXR1cm4gJ1NvdXRoJ1xuICAgIGlmIChkZWdyZWUgPiAxMjIuNSkgcmV0dXJuICdTb3V0aCBFYXN0J1xuICAgIGlmIChkZWdyZWUgPiA2Ny41KSByZXR1cm4gJ0Vhc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIyLjUpIHJldHVybiAnTm9ydGggRWFzdCdcbiAgICByZXR1cm4gJ05vcnRoJ1xufVxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MjM3NjExNS9ob3ctdG8tb2J0YWluLW9wZW4td2VhdGhlci1hcGktZGF0ZS10aW1lLWZyb20tY2l0eS1iZWluZy1mZXRjaGVkXG5jb25zdCBjYWxjQ3VycmVudFRpbWUgPSAodGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsVGltZSA9IGQuZ2V0VGltZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IGxvY2FsVGltZSArIGxvY2FsT2Zmc2V0XG4gICAgY29uc3QgbmV3Q2l0eSA9IHV0YyArIDEwMDAgKiB0aW1lem9uZVxuICAgIHJldHVybiBuZXcgRGF0ZShuZXdDaXR5KVxufVxuXG5jb25zdCBjYWxjU3VuVGltZSA9ICh0aW1lLCB0aW1lem9uZSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IHRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuLy8gY29uc3QgZmV0Y2hEYWlseUZvcmVjYXN0ID0gKGxhdCwgbG9uKSA9PiB7XG4vLyAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdQcm9qRXJyb3JDb250YWluZXInKTtcbi8vICAgY29uc29sZS5sb2cobGF0KTtcbi8vICAgY29uc29sZS5sb2cobG9uKTtcbi8vICAgLy8gZmV0Y2ggc2V2ZW4gZGF5IGZvcmVjYXN0XG4vLyAgIGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mZXhjbHVkZT1taW51dGVseSxob3VybHksYWxlcnRzJnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCwgeyBtb2RlOiAnY29ycycgfSlcbi8vICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbi8vICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuLy8gICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCc7XG4vLyAgICAgfSk7XG4vLyB9O1xuXG5jb25zdCBmZXRjaEhvdXJseUZvcmVjYXN0ID0gKGNpdHlRdWVyeSkgPT4ge1xuICAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcubmV3UHJvakVycm9yQ29udGFpbmVyJ1xuICAgIClcbiAgICAvLyBmZXRjaCBmaXZlIGRheS90aHJlZSBob3VyIGZvcmVjYXN0XG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0QXJyYXkgPSBbXVxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUocmVzcG9uc2UubGlzdFtpXS5kdF90eHQpLFxuICAgICAgICAgICAgICAgICAgICBkYXRlVGV4dDogcmVzcG9uc2UubGlzdFtpXS5kdF90eHQsXG4gICAgICAgICAgICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5saXN0W2ldLm1haW4uaHVtaWRpdHksXG4gICAgICAgICAgICAgICAgICAgIHJhaW5DaGFuY2U6IHJlc3BvbnNlLmxpc3RbaV0ucG9wICogMTAwLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZTogcmVzcG9uc2UubGlzdFtpXS5tYWluLnRlbXAsXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckljb246IHJlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5pY29uLFxuICAgICAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS5saXN0W2ldLndpbmQuZGVnLFxuICAgICAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS5saXN0W2ldLndpbmQuZGVnKSxcbiAgICAgICAgICAgICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5ndXN0LFxuICAgICAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5zcGVlZCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheS5wdXNoKG5ld0hvdXJseUZvcmVjYXN0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3SG91cmx5Rm9yZWNhc3RBcnJheSlcbiAgICAgICAgICAgIGRpc3BsYXlGb3JlY2FzdChuZXdIb3VybHlGb3JlY2FzdEFycmF5KVxuICAgICAgICAgICAgcmV0dXJuIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IGZldGNoQ3VycmVudFdlYXRoZXIgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gICAgLy8gY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKVxuICAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcubmV3UHJvakVycm9yQ29udGFpbmVyJ1xuICAgIClcblxuICAgIGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIC8vIGNvbnN0IHtsYXR9ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAgICAgICAvLyBjb25zdCB7bG9ufSA9IHJlc3BvbnNlLmNvb3JkO1xuICAgICAgICAgICAgLy8gZmV0Y2hEYWlseUZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgICAgICAgICAgIHN1Ym1pdExvY2F0aW9uKHJlc3BvbnNlLm5hbWUpXG4gICAgICAgICAgICBjb25zdCBuZXdXZWF0aGVyQ2FyZCA9IHtcbiAgICAgICAgICAgICAgICBjaXR5OiByZXNwb25zZS5uYW1lLFxuICAgICAgICAgICAgICAgIGNvdW50cnk6IHJlc3BvbnNlLnN5cy5jb3VudHJ5LFxuICAgICAgICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgIGxvY2FsRGF0ZTogY2FsY0N1cnJlbnRUaW1lKHJlc3BvbnNlLnRpbWV6b25lKSxcbiAgICAgICAgICAgICAgICBzdW5yaXNlOiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnJpc2UgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgc3Vuc2V0OiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnNldCAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnRpbWV6b25lXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0ZW1wQ3VycmVudDogcmVzcG9uc2UubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgIHRlbXBIaWdoOiByZXNwb25zZS5tYWluLnRlbXBfbWF4LFxuICAgICAgICAgICAgICAgIHRlbXBMb3c6IHJlc3BvbnNlLm1haW4udGVtcF9taW4sXG4gICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVySWNvbjogcmVzcG9uc2Uud2VhdGhlclswXS5pY29uLFxuICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLndpbmQuZGVnLFxuICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLndpbmQuZGVnKSxcbiAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLndpbmQuZ3VzdCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYFxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3V2VhdGhlckNhcmQpXG4gICAgICAgICAgICBkaXNwbGF5V2VhdGhlcihuZXdXZWF0aGVyQ2FyZClcbiAgICAgICAgICAgIHJldHVybiBuZXdXZWF0aGVyQ2FyZFxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgQVBJQ2l0eVNlYXJjaCA9IChpbnB1dCkgPT4ge1xuICAgIGZldGNoQ3VycmVudFdlYXRoZXIoaW5wdXQpXG4gICAgZmV0Y2hIb3VybHlGb3JlY2FzdChpbnB1dClcbn1cblxuY29uc3QgdmFsaWRhdGVTZWFyY2ggPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdMb2NhdGlvbklucHV0JylcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG4gICAgLy8gcmVzZXQgZXJyb3JcbiAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJydcbiAgICAvLyBjaGVjayBmb3Igc2VhcmNoIHRlcm1cbiAgICBpZiAobmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcbiAgICB9IGVsc2Uge1xuICAgICAgICBBUElDaXR5U2VhcmNoKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUpXG4gICAgICAgIGhpZGVGb3JtKClcbiAgICAgICAgbmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9ICcnXG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVEZWxldGVJY29uLFxuICAgIGNyZWF0ZUZvcm0sXG4gICAgY3JlYXRlTWVudUljb24sXG4gICAgZGlzcGxheVdhdGNobGlzdCxcbiAgICBoaWRlRm9ybSxcbiAgICBzaG93Rm9ybSxcbiAgICBzdWJtaXRMb2NhdGlvbixcbiAgICB2YWxpZGF0ZVNlYXJjaCxcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7XG4gICAgY3JlYXRlQWRkaXRpb25JY29uLFxuICAgIGNyZWF0ZUZvcm0sXG4gICAgLy8gZGlzcGxheVdhdGNobGlzdCxcbn0gZnJvbSAnLi9oZWxwZXJGdW5jdGlvbnMnXG5pbXBvcnQgZ2l0aHViSWNvbiBmcm9tICcuL2Fzc2V0cy9HaXRIdWItbGlnaHQtMzJweC5wbmcnXG5pbXBvcnQgbG9nb0ljb24gZnJvbSAnLi9hc3NldHMvbG9nb0ljb24uc3ZnJ1xuXG5jb25zdCBjcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJylcblxuICAgIC8vIGRpc3BsYXkgbG9nb1xuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGxvZ28uc3JjID0gbG9nb0ljb25cbiAgICBsb2dvLnRhcmdldCA9ICdfYmxhbmsnXG4gICAgbG9nby5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xvZ28nKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChsb2dvKVxuXG4gICAgLy8gZGlzcGxheSB0aXRsZVxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKVxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1dlYXRoZXJzZXJ2ZSdcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpXG5cbiAgICByZXR1cm4gaGVhZGVyXG59XG5cbmNvbnN0IGNyZWF0ZU1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbWVudS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21lbnUnKVxuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBoZWFkZXJcbiAgICBjb25zdCB3YXRjaGxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICB3YXRjaGxpc3RIZWFkZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3RIZWFkZXInKVxuICAgIHdhdGNobGlzdEhlYWRlci50ZXh0Q29udGVudCA9ICdXYXRjaGxpc3QnXG5cbiAgICAvLyBjcmVhdGUgd2F0Y2hsaXN0IG1lbnVcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcbiAgICB3YXRjaGxpc3Quc2V0QXR0cmlidXRlKCdpZCcsICd3YXRjaGxpc3QnKVxuXG4gICAgLy8gZGlzcGxheVdhdGNobGlzdCgpXG5cbiAgICAvLyBHZW5lcmF0ZSBhZGQgbG9jYXRpb24gY29udGFpbmVyXG4gICAgY29uc3QgYWRkTG9jYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3QnKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGJ1dHRvblxuICAgIGNvbnN0IGFkZExvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGFkZExvY2F0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkTG9jYXRpb25CdG4nKVxuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbihhZGRMb2NhdGlvbilcbiAgICBjb25zdCBhZGRMb2NhdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBhZGRMb2NhdGlvblRleHQuaW5uZXJUZXh0ID0gJ0FkZCBMb2NhdGlvbidcbiAgICBhZGRMb2NhdGlvbi5hcHBlbmRDaGlsZChhZGRMb2NhdGlvblRleHQpXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb24pXG5cbiAgICAvLyBHZW5lcmF0ZSBhbmQgaGlkZSBuZXcgbG9jYXRpb24gZm9ybVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uRm9ybScpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBhZGRMb2NhdGlvbkZvcm0ubWV0aG9kID0gJ2dldCdcbiAgICBjcmVhdGVGb3JtKGFkZExvY2F0aW9uRm9ybSlcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkZvcm0pXG5cbiAgICBtZW51LmFwcGVuZENoaWxkKHdhdGNobGlzdEhlYWRlcilcbiAgICBtZW51LmFwcGVuZENoaWxkKHdhdGNobGlzdClcbiAgICBtZW51LmFwcGVuZENoaWxkKGFkZExvY2F0aW9uQ29udGFpbmVyKVxuXG4gICAgcmV0dXJuIG1lbnVcbn1cblxuY29uc3QgY3JlYXRlV2VhdGhlckNhcmQgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICAgIGNvbnN0IFdlYXRoZXJBUElDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50JylcblxuICAgIC8vIGNyZWF0ZSBBUEkgdGl0bGVcbiAgICBjb25zdCBBUElUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICBBUElUaXRsZS5jbGFzc0xpc3QuYWRkKCdjb250ZW50VGl0bGUnKVxuICAgIEFQSVRpdGxlLmlubmVyVGV4dCA9ICdXZWF0aGVyc2VydmUnXG5cbiAgICAvLyBjcmVhdGUgQVBJIGltZ1xuICAgIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBBUElJbWFnZS5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZScpXG5cbiAgICAvLyBjcmVhdGUgZGVzY3JpcHRpb24gY29udGFpbmVyXG4gICAgY29uc3QgZGVzY3JpcHRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBkZXNjcmlwdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd3ZWF0aGVyRGVzY3JpcHRpb24nKVxuXG4gICAgLy8gY3JlYXRlIGN1cnJlbnQgdGVtcCBjb250YWluZXJcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgdGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0ZW1wQ29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBoaWdoL2xvdyB0ZW1wIGNvbnRhaW5lclxuICAgIGNvbnN0IGhpZ2hMb3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGhpZ2hMb3dDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlnaExvd0NvbnRhaW5lcicpXG5cbiAgICBjb25zdCBsb3dUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgbG93VGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsb3dUZW1wQ29udGFpbmVyJylcbiAgICBoaWdoTG93Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvd1RlbXBDb250YWluZXIpXG5cbiAgICBjb25zdCBoaWdoVGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGhpZ2hUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZ2hUZW1wQ29udGFpbmVyJylcbiAgICBoaWdoTG93Q29udGFpbmVyLmFwcGVuZENoaWxkKGhpZ2hUZW1wQ29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIGN1cnJlbnQgdGltZSBjb250YWluZXJcbiAgICBjb25zdCB0aW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgdGltZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0aW1lQ29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBzdW5yaXNlL3N1bnNldCBjb250YWluZXJcbiAgICBjb25zdCBzdW5yaXNlU3Vuc2V0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzdW5yaXNlU3Vuc2V0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1bnJpc2VTdW5zZXRDb250YWluZXInKVxuXG4gICAgY29uc3Qgc3VucmlzZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHN1bnJpc2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3VucmlzZUNvbnRhaW5lcicpXG4gICAgc3VucmlzZVN1bnNldENvbnRhaW5lci5hcHBlbmRDaGlsZChzdW5yaXNlQ29udGFpbmVyKVxuXG4gICAgY29uc3Qgc3Vuc2V0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgc3Vuc2V0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1bnNldENvbnRhaW5lcicpXG4gICAgc3VucmlzZVN1bnNldENvbnRhaW5lci5hcHBlbmRDaGlsZChzdW5zZXRDb250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgd2luZCBjb250YWluZXJcbiAgICBjb25zdCB3aW5kQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgd2luZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd3aW5kQ29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBodW1pZGl0eSBjb250YWluZXJcbiAgICBjb25zdCBodW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGh1bWlkaXR5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2h1bWlkaXR5Q29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBmb3JlY2FzdCBjb250YWluZXJcbiAgICBjb25zdCBmb3JlY2FzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9yZWNhc3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RDb250YWluZXInKVxuXG4gICAgY29uc3QgZm9yZWNhc3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGZvcmVjYXN0VGl0bGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUaXRsZScpXG4gICAgZm9yZWNhc3RUaXRsZS5pbm5lclRleHQgPSAnRml2ZSBkYXksIHRocmVlIGhvdXIgZm9yZWNhc3Q6J1xuXG4gICAgY29uc3QgZm9yZWNhc3RUYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJylcbiAgICBmb3JlY2FzdFRhYmxlLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0VGFibGUnKVxuICAgIGZvcmVjYXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGZvcmVjYXN0VGFibGUpXG5cbiAgICBjb25zdCBmb3JlY2FzdFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcbiAgICBmb3JlY2FzdFJvdy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFJvdycpXG4gICAgZm9yZWNhc3RUYWJsZS5hcHBlbmRDaGlsZChmb3JlY2FzdFJvdylcblxuICAgIC8vIG1ha2Ugc2Nyb2xsd2hlZWwgZnVuY3Rpb25hbCB3aXRoIGhvcml6b250YWwgc2Nyb2xsaW5nXG4gICAgZm9yZWNhc3RSb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZm9yZWNhc3RSb3cuc2Nyb2xsTGVmdCArPSBlLmRlbHRhWVxuICAgIH0pXG5cbiAgICAvLyBBcHBlbmRcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElUaXRsZSlcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElJbWFnZSlcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkNvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZCh0ZW1wQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGhpZ2hMb3dDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQodGltZUNvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChzdW5yaXNlU3Vuc2V0Q29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHdpbmRDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoaHVtaWRpdHlDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaXRsZSlcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChmb3JlY2FzdENvbnRhaW5lcilcblxuICAgIHJldHVybiBXZWF0aGVyQVBJQ29udGFpbnRlclxufVxuXG5jb25zdCBjcmVhdGVDb250ZW50ID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBjb250ZW50IGNvbnRhaW5lclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29udGVudCcpXG5cbiAgICAvLyBkaXNwbGF5IHdlYXRoZXIgY2FyZFxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY3JlYXRlV2VhdGhlckNhcmQoKSlcblxuICAgIHJldHVybiBjb250ZW50XG59XG5cbmNvbnN0IGNyZWF0ZUZvb3RlciA9ICgpID0+IHtcbiAgICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb290ZXInKVxuXG4gICAgY29uc3QgY29weXJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgY29weXJpZ2h0LnRleHRDb250ZW50ID0gYENvcHlyaWdodCDCqSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gamNhbXBiZWxsNTdgXG5cbiAgICBjb25zdCBnaXRodWJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgZ2l0aHViTGluay5ocmVmID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9qY2FtcGJlbGw1NydcbiAgICBnaXRodWJMaW5rLnRhcmdldCA9ICdfYmxhbmsnXG5cbiAgICBjb25zdCBuZXdHaXRodWJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdHaXRodWJJY29uLnNyYyA9IGdpdGh1Ykljb25cbiAgICBuZXdHaXRodWJJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZ2l0aHViJylcblxuICAgIGdpdGh1YkxpbmsuYXBwZW5kQ2hpbGQobmV3R2l0aHViSWNvbilcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoY29weXJpZ2h0KVxuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChnaXRodWJMaW5rKVxuXG4gICAgcmV0dXJuIGZvb3RlclxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlSGVhZGVyKCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVNZW51KCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVDb250ZW50KCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVGb290ZXIoKSlcbn1cbiJdLCJuYW1lcyI6WyJhZGRpdGlvbkljb24iLCJkZWxldGVJY29uIiwibWVudUljb24iLCJkb2N1bWVudCIsImNvb2tpZSIsImNyZWF0ZU1lbnVJY29uIiwibGkiLCJjaGVja2xpc3RJY29uIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlTGlzdGluZyIsImxvY2F0aW9uTmFtZSIsImkiLCJ3YXRjaGxpc3QiLCJxdWVyeVNlbGVjdG9yIiwibG9jYXRpb24iLCJjbGFzc0xpc3QiLCJhZGQiLCJzZWxlY3RlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJzZWxlY3RMb2NhdGlvbiIsImxvY2F0aW9uVGV4dCIsInRleHRDb250ZW50IiwibmFtZSIsImNyZWF0ZURlbGV0ZUljb24iLCJkaXNwbGF5V2F0Y2hsaXN0Iiwib2xkTGlzdGluZ0NvdW50IiwiY2hpbGRFbGVtZW50Q291bnQiLCJmaXJzdENoaWxkIiwicmVtb3ZlIiwic3RvcmFnZVdhdGNobGlzdCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJmb3JFYWNoIiwic3VibWl0TG9jYXRpb24iLCJpbnB1dCIsIm5ld0xvY2F0aW9uIiwicHVzaCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJkaXNwbGF5V2VhdGhlciIsIm5ld1dlYXRoZXJDYXJkIiwiY29udGVudFRpdGxlIiwiY2l0eSIsImNvdW50cnkiLCJBUElJbWFnZSIsIndlYXRoZXJJY29uIiwid2VhdGhlckRlc2NyaXB0aW9uIiwiaW5uZXJUZXh0IiwidGVtcENvbnRhaW5lciIsIk1hdGgiLCJyb3VuZCIsInRlbXBDdXJyZW50IiwibG93VGVtcENvbnRhaW5lciIsInRlbXBMb3ciLCJoaWdoVGVtcENvbnRhaW5lciIsInRlbXBIaWdoIiwidGltZUNvbnRhaW5lciIsImxvY2FsRGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsInN1bnJpc2VDb250YWluZXIiLCJzdW5yaXNlIiwic3Vuc2V0Q29udGFpbmVyIiwic3Vuc2V0Iiwid2luZENvbnRhaW5lciIsIndpbmRTcGVlZCIsIndpbmREaXJlY3Rpb24iLCJ3aW5kRGVncmVlIiwiaHVtaWRpdHlDb250YWluZXIiLCJodW1pZGl0eSIsImRpc3BsYXlGb3JlY2FzdCIsIm5ld0hvdXJseUZvcmVjYXN0QXJyYXkiLCJmb3JlY2FzdFJvdyIsIm9sZEZvcmVjYXN0IiwibGVuZ3RoIiwiZm9yZWNhc3RDZWxsIiwiZm9yZWNhc3REYXRlIiwiZGF0ZSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImZvcmVjYXN0VGltZSIsInRvTG9jYWxlVGltZVN0cmluZyIsIndlYXRoZXJGb3JlY2FzdEljb24iLCJmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbiIsImZvcmVjYXN0VGVtcCIsInRlbXBlcmF0dXJlIiwiQVBJQ2l0eVNlYXJjaCIsImdldEF0dHJpYnV0ZSIsInNlbGVjdGVkTG9jYXRpb25JZCIsImNyZWF0ZUFkZEJ1dHRvbiIsImNvbnRhaW5lciIsImFkZEJ0biIsInZhbGlkYXRlU2VhcmNoIiwiY3JlYXRlQ2FuY2VsQnV0dG9uIiwiY2FuY2VsQnRuIiwiY3JlYXRlRm9ybSIsImZvcm0iLCJmb3JtUm93MSIsIm5ld0xvY2F0aW9uSW5wdXQiLCJwbGFjZWhvbGRlciIsImZvcm1Sb3cyIiwiZm9ybVJvdzMiLCJzaG93Rm9ybSIsImFkZExvY2F0aW9uQnRuIiwiYWRkTG9jYXRpb25Gb3JtIiwiaGlkZUZvcm0iLCJkZWxldGVXYXRjaGxpc3RFbnRyeSIsImRvb21lZEluZGV4Iiwic3BsaWNlIiwibmV3RGVsZXRlSWNvbiIsInRyYXNoSWNvbiIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVBZGRpdGlvbkljb24iLCJuZXdBZGRpdGlvbkljb24iLCJ0b0RpcmVjdGlvbiIsImRlZ3JlZSIsImNhbGNDdXJyZW50VGltZSIsInRpbWV6b25lIiwiZCIsIkRhdGUiLCJsb2NhbFRpbWUiLCJnZXRUaW1lIiwibG9jYWxPZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsInV0YyIsIm5ld0NpdHkiLCJjYWxjU3VuVGltZSIsInRpbWUiLCJmZXRjaEhvdXJseUZvcmVjYXN0IiwiY2l0eVF1ZXJ5IiwibmV3UHJvakVycm9yQ29udGFpbmVyIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm5ld0hvdXJseUZvcmVjYXN0IiwibGlzdCIsImR0X3R4dCIsImRhdGVUZXh0IiwibWFpbiIsInJhaW5DaGFuY2UiLCJwb3AiLCJ0ZW1wIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXIiLCJkZXNjcmlwdGlvbiIsImljb24iLCJ3aW5kIiwiZGVnIiwid2luZEd1c3QiLCJndXN0Iiwic3BlZWQiLCJjYXRjaCIsImVyciIsImZldGNoQ3VycmVudFdlYXRoZXIiLCJzeXMiLCJ0ZW1wX21heCIsInRlbXBfbWluIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsImdpdGh1Ykljb24iLCJsb2dvSWNvbiIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImxvZ28iLCJ0aXRsZSIsImNyZWF0ZU1lbnUiLCJtZW51Iiwid2F0Y2hsaXN0SGVhZGVyIiwiYWRkTG9jYXRpb25Db250YWluZXIiLCJhZGRMb2NhdGlvbiIsImFkZExvY2F0aW9uVGV4dCIsIm1ldGhvZCIsImNyZWF0ZVdlYXRoZXJDYXJkIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJBUElUaXRsZSIsImRlc2NyaXB0aW9uQ29udGFpbmVyIiwiaGlnaExvd0NvbnRhaW5lciIsInN1bnJpc2VTdW5zZXRDb250YWluZXIiLCJmb3JlY2FzdENvbnRhaW5lciIsImZvcmVjYXN0VGl0bGUiLCJmb3JlY2FzdFRhYmxlIiwic2Nyb2xsTGVmdCIsImRlbHRhWSIsImNyZWF0ZUNvbnRlbnQiLCJjb250ZW50IiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiY29weXJpZ2h0IiwiZ2V0RnVsbFllYXIiLCJnaXRodWJMaW5rIiwiaHJlZiIsIm5ld0dpdGh1Ykljb24iLCJpbml0aWFsaXplIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=