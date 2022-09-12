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
  humidityContainer.classList.add('humidityContainer'); // Append

  WeatherAPIContainter.appendChild(APITitle);
  WeatherAPIContainter.appendChild(APIImage);
  WeatherAPIContainter.appendChild(descriptionContainer);
  WeatherAPIContainter.appendChild(tempContainer);
  WeatherAPIContainter.appendChild(highLowContainer);
  WeatherAPIContainter.appendChild(timeContainer);
  WeatherAPIContainter.appendChild(sunriseSunsetContainer);
  WeatherAPIContainter.appendChild(windContainer);
  WeatherAPIContainter.appendChild(humidityContainer);
  return WeatherAPIContainter;
};

const createContent = () => {
  // create content container
  const content = document.createElement('div');
  content.classList.add('content'); // create weather app

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVEsQ0FBQ0ssYUFBVCxDQUF1QixRQUF2QixDQUFmO0VBRUEsTUFBTTRLLFNBQVMsR0FBR2pMLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixHQUF2QixDQUFsQjtFQUNBNEssU0FBUyxDQUFDekosV0FBViw0QkFBdUMsSUFBSXFGLElBQUosR0FBV3FFLFdBQVgsRUFBdkM7RUFFQSxNQUFNQyxVQUFVLEdBQUduTCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBbkI7RUFDQThLLFVBQVUsQ0FBQ0MsSUFBWCxHQUFrQixnQ0FBbEI7RUFDQUQsVUFBVSxDQUFDL0osTUFBWCxHQUFvQixRQUFwQjtFQUVBLE1BQU1pSyxhQUFhLEdBQUdyTCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdEI7RUFDQWdMLGFBQWEsQ0FBQy9LLEdBQWQsR0FBb0JvSiwwREFBcEI7RUFDQTJCLGFBQWEsQ0FBQzlLLFlBQWQsQ0FBMkIsT0FBM0IsRUFBb0MsUUFBcEM7RUFFQTRLLFVBQVUsQ0FBQzNLLFdBQVgsQ0FBdUI2SyxhQUF2QjtFQUNBTCxNQUFNLENBQUN4SyxXQUFQLENBQW1CeUssU0FBbkI7RUFDQUQsTUFBTSxDQUFDeEssV0FBUCxDQUFtQjJLLFVBQW5CO0VBRUEsT0FBT0gsTUFBUDtBQUNILENBbkJEOztBQXFCZSxTQUFTTSxVQUFULEdBQXNCO0VBQ2pDdEwsUUFBUSxDQUFDdUwsSUFBVCxDQUFjL0ssV0FBZCxDQUEwQm9KLFlBQVksRUFBdEM7RUFDQTVKLFFBQVEsQ0FBQ3VMLElBQVQsQ0FBYy9LLFdBQWQsQ0FBMEJ3SixVQUFVLEVBQXBDO0VBQ0FoSyxRQUFRLENBQUN1TCxJQUFULENBQWMvSyxXQUFkLENBQTBCcUssYUFBYSxFQUF2QztFQUNBN0ssUUFBUSxDQUFDdUwsSUFBVCxDQUFjL0ssV0FBZCxDQUEwQnVLLFlBQVksRUFBdEM7QUFDSCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaGVscGVyRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9wYWdlTG9hZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhZGRpdGlvbkljb24gZnJvbSAnLi9hc3NldHMvcGx1cy5zdmcnXG5pbXBvcnQgZGVsZXRlSWNvbiBmcm9tICcuL2Fzc2V0cy9kZWxldGUuc3ZnJ1xuaW1wb3J0IG1lbnVJY29uIGZyb20gJy4vYXNzZXRzL21lbnVJY29uLnN2ZydcblxuZG9jdW1lbnQuY29va2llID0gJ1NhbWVTaXRlPUxheCdcblxuY29uc3QgY3JlYXRlTWVudUljb24gPSAobGkpID0+IHtcbiAgICBjb25zdCBjaGVja2xpc3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBjaGVja2xpc3RJY29uLnNyYyA9IG1lbnVJY29uXG4gICAgY2hlY2tsaXN0SWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24nKVxuICAgIGxpLmFwcGVuZENoaWxkKGNoZWNrbGlzdEljb24pXG59XG5cbi8vIEFkZCBzaW5nbGUgbG9jYXRpb24gdG8gd2F0Y2hsaXN0IChjYWxsZWQgYmVsb3cpXG5jb25zdCBjcmVhdGVMaXN0aW5nID0gKGxvY2F0aW9uTmFtZSwgaSkgPT4ge1xuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3YXRjaGxpc3QnKVxuXG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZChgbG9jYXRpb25gKVxuICAgIGxvY2F0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG4gICAgLy8gYXNzaWduIGNsYXNzIHRvIHNlbGVjdGVkIGxvY2F0aW9uIGxpc3RpbmdcbiAgICBpZiAobG9jYXRpb25OYW1lLnNlbGVjdGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICAvLyBzZWxlY3RMb2NhdGlvbihsb2NhdGlvbilcbiAgICB9XG5cbiAgICAvLyBldmVudCBsaXN0ZW5lciB0byBkaXNwbGF5IHNlbGVjdGVkIGxvY2F0aW9uJ3Mgd2VhdGhlclxuICAgIGxvY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gaWYgZGVsZXRpbmcgbGlzdGluZywgZG8gbm90IGRpc3BsYXkgd2VhdGhlclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGVJdGVtJykpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKVxuICAgIH0pXG5cbiAgICBjcmVhdGVNZW51SWNvbihsb2NhdGlvbilcbiAgICBjb25zdCBsb2NhdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBsb2NhdGlvblRleHQudGV4dENvbnRlbnQgPSBsb2NhdGlvbk5hbWUubmFtZVxuICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKGxvY2F0aW9uVGV4dClcbiAgICBjcmVhdGVEZWxldGVJY29uKGxvY2F0aW9uLCBpKVxuICAgIHdhdGNobGlzdC5hcHBlbmRDaGlsZChsb2NhdGlvbilcbn1cblxuLy8gRGlzcGxheSBlbnRpcmUgYXJyYXkgb2YgbG9jYXRpb25zIHRvIHdhdGNobGlzdFxuY29uc3QgZGlzcGxheVdhdGNobGlzdCA9ICgpID0+IHtcbiAgICAvLyBHcmFiIHdhdGNobGlzdFxuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3YXRjaGxpc3QnKVxuXG4gICAgLy8gQ2xlYXIgbG9jYXRpb24gbGlzdGluZ3NcbiAgICBjb25zdCBvbGRMaXN0aW5nQ291bnQgPSB3YXRjaGxpc3QuY2hpbGRFbGVtZW50Q291bnRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZExpc3RpbmdDb3VudDsgaSsrKSB7XG4gICAgICAgIHdhdGNobGlzdC5maXJzdENoaWxkLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgLy8gQXBwZW5kIGFsbCBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG4gICAgbGV0IGkgPSAwXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG4gICAgLy8gY29uc29sZS5sb2coc3RvcmFnZVdhdGNobGlzdClcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGNyZWF0ZUxpc3RpbmcobG9jYXRpb24sIGkpXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgICBpKytcbiAgICB9KVxufVxuXG5jb25zdCBzdWJtaXRMb2NhdGlvbiA9IChpbnB1dCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBsb2NhdGlvbiBvYmplY3RcbiAgICBjb25zdCBuZXdMb2NhdGlvbiA9IHtcbiAgICAgICAgbmFtZTogaW5wdXQsXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgIH1cblxuICAgIC8vIGdyYWIgYXJyYXkgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBkZXNlbGVjdCBwcmV2aW91c2x5IHNlbGVjdGVkIGxvY2F0aW9uXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBwdXNoIGxvY2F0aW9uIHRvIGFycmF5XG4gICAgc3RvcmFnZVdhdGNobGlzdC5wdXNoKG5ld0xvY2F0aW9uKVxuICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2VXYXRjaGxpc3QpXG5cbiAgICAvLyBzZXQgYXJyYXkgYmFjayBpbnRvIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gcmVmcmVzaCB3YXRjaGxpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgZGlzcGxheVdlYXRoZXIgPSAobmV3V2VhdGhlckNhcmQpID0+IHtcbiAgICAvLyBkaXNwbGF5IGNvbnRlbnQgdGl0bGVcbiAgICBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJylcbiAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSBgJHtuZXdXZWF0aGVyQ2FyZC5jaXR5fSwgJHtuZXdXZWF0aGVyQ2FyZC5jb3VudHJ5fWBcblxuICAgIC8vIGRpc3BsYXkgd2VhdGhlciBpY29uXG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKVxuICAgIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25ld1dlYXRoZXJDYXJkLndlYXRoZXJJY29ufUAyeC5wbmdgXG5cbiAgICAvLyBkaXNwbGF5IGRlc2NyaXB0aW9uXG4gICAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJEZXNjcmlwdGlvbicpXG4gICAgd2VhdGhlckRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IG5ld1dlYXRoZXJDYXJkLndlYXRoZXJEZXNjcmlwdGlvblxuXG4gICAgLy8gZGlzcGxheSBjdXJyZW50IHRlbXBlcmF0dXJlXG4gICAgY29uc3QgdGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wQ29udGFpbmVyJylcbiAgICB0ZW1wQ29udGFpbmVyLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQobmV3V2VhdGhlckNhcmQudGVtcEN1cnJlbnQpfVxcdTAwQjBgXG5cbiAgICAvLyBkaXNwbGF5IGhpZ2gvbG93IHRlbXBlcmF0dXJlc1xuICAgIGNvbnN0IGxvd1RlbXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG93VGVtcENvbnRhaW5lcicpXG4gICAgbG93VGVtcENvbnRhaW5lci5pbm5lclRleHQgPSBgTG93OiAke01hdGgucm91bmQoXG4gICAgICAgIG5ld1dlYXRoZXJDYXJkLnRlbXBMb3dcbiAgICApfVxcdTAwQjBgXG4gICAgY29uc3QgaGlnaFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlnaFRlbXBDb250YWluZXInKVxuICAgIGhpZ2hUZW1wQ29udGFpbmVyLmlubmVyVGV4dCA9IGBIaWdoOiAke01hdGgucm91bmQoXG4gICAgICAgIG5ld1dlYXRoZXJDYXJkLnRlbXBIaWdoXG4gICAgKX1cXHUwMEIwYFxuXG4gICAgLy8gZGlwbGF5IGN1cnJlbnQgdGltZVxuICAgIGNvbnN0IHRpbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZUNvbnRhaW5lcicpXG4gICAgdGltZUNvbnRhaW5lci5pbm5lclRleHQgPSBgTG9jYWwgdGltZTogJHtuZXdXZWF0aGVyQ2FyZC5sb2NhbERhdGUuZ2V0SG91cnMoKX06JHtuZXdXZWF0aGVyQ2FyZC5sb2NhbERhdGUuZ2V0TWludXRlcygpfWBcblxuICAgIC8vIGRpc3BsYXkgc3VucmlzZS9zdW5zZXQgdGltZXNcbiAgICBjb25zdCBzdW5yaXNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1bnJpc2VDb250YWluZXInKVxuICAgIHN1bnJpc2VDb250YWluZXIuaW5uZXJUZXh0ID0gYFN1bnJpc2U6ICR7bmV3V2VhdGhlckNhcmQuc3VucmlzZS5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLnN1bnJpc2UuZ2V0TWludXRlcygpfWBcbiAgICBjb25zdCBzdW5zZXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3Vuc2V0Q29udGFpbmVyJylcbiAgICBzdW5zZXRDb250YWluZXIuaW5uZXJUZXh0ID0gYFN1bnNldDogJHtuZXdXZWF0aGVyQ2FyZC5zdW5zZXQuZ2V0SG91cnMoKX06JHtuZXdXZWF0aGVyQ2FyZC5zdW5zZXQuZ2V0TWludXRlcygpfWBcblxuICAgIC8vIGRpc3BsYXkgd2luZFxuICAgIGNvbnN0IHdpbmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2luZENvbnRhaW5lcicpXG4gICAgd2luZENvbnRhaW5lci5pbm5lclRleHQgPSBgV2luZDogJHtNYXRoLnJvdW5kKFxuICAgICAgICBuZXdXZWF0aGVyQ2FyZC53aW5kU3BlZWRcbiAgICApfW1waCwgJHtuZXdXZWF0aGVyQ2FyZC53aW5kRGlyZWN0aW9ufSAoJHtuZXdXZWF0aGVyQ2FyZC53aW5kRGVncmVlfVxcdTAwQjApYFxuXG4gICAgLy8gZGlzcGxheSBodW1pZGl0eVxuICAgIGNvbnN0IGh1bWlkaXR5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWlkaXR5Q29udGFpbmVyJylcbiAgICBodW1pZGl0eUNvbnRhaW5lci5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICR7bmV3V2VhdGhlckNhcmQuaHVtaWRpdHl9JWBcbn1cblxuY29uc3Qgc2VsZWN0TG9jYXRpb24gPSAobGkpID0+IHtcbiAgICAvLyBzZXQgY29udGVudCB0aXRsZVxuICAgIC8vIGNvbnN0IGNvbnRlbnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50VGl0bGUnKVxuICAgIC8vIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9IGxpLmlubmVyVGV4dFxuXG4gICAgLy8gRmV0Y2ggY3VycmVudCB3ZWF0aGVyXG4gICAgQVBJQ2l0eVNlYXJjaChsaS5pbm5lclRleHQpXG5cbiAgICAvLyBncmFiIGxvY2F0aW9ucyBhcnJheSBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIGRlc2VsZWN0IGFsbCBsb2NhdGlvbnNcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9ICdmYWxzZSdcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBTZWxlY3QgbG9jYXRpb24gaWYgb25lIGlzIGNob3NlbiAobWFpbiBtZW51IHNlbGVjdGlvbiBpcyBoYW5kbGVkIGluIGV2ZW50IGxpc3RlbmVyKVxuICAgIGlmIChsaS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdsb2NhdGlvbicpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMb2NhdGlvbklkID0gbGkuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgICAgIHN0b3JhZ2VXYXRjaGxpc3Rbc2VsZWN0ZWRMb2NhdGlvbklkXS5zZWxlY3RlZCA9ICd0cnVlJ1xuICAgIH1cblxuICAgIC8vIHNldCBsb2NhdGlvbnMgYXJyYXkgYmFjayBpbnRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyByZWZyZXNoXG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IGNyZWF0ZUFkZEJ1dHRvbiA9IChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdhZGRCdG4nKVxuICAgIGFkZEJ0bi5pbm5lclRleHQgPSAnc2VhcmNoJ1xuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB2YWxpZGF0ZVNlYXJjaChlKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkQnRuKVxufVxuXG5jb25zdCBjcmVhdGVDYW5jZWxCdXR0b24gPSAoY29udGFpbmVyLCBpKSA9PiB7XG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZCgnY2FuY2VsQnRuJylcbiAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICBjYW5jZWxCdG4uaW5uZXJUZXh0ID0gJ2NhbmNlbCdcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKVxufVxuXG4vLyBjcmVhdGVGb3JtXG5jb25zdCBjcmVhdGVGb3JtID0gKGZvcm0pID0+IHtcbiAgICAvLyByb3cgb25lOiBhc3NpZ24gaW5wdXRcbiAgICBjb25zdCBmb3JtUm93MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9ybVJvdzEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmb3JtUm93JylcbiAgICBjb25zdCBuZXdMb2NhdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIG5ld0xvY2F0aW9uSW5wdXQuY2xhc3NMaXN0LmFkZCgnbmV3TG9jYXRpb25JbnB1dCcpXG4gICAgbmV3TG9jYXRpb25JbnB1dC5wbGFjZWhvbGRlciA9ICdGbG9yZW5jZSdcbiAgICBuZXdMb2NhdGlvbklucHV0Lm5hbWUgPSAnbmV3TG9jYXRpb25JbnB1dCdcbiAgICBmb3JtUm93MS5hcHBlbmRDaGlsZChuZXdMb2NhdGlvbklucHV0KVxuXG4gICAgLy8gcm93IHR3bzogc3VibWl0IGFuZCBjYW5jZWwgYnV0dG9uc1xuICAgIGNvbnN0IGZvcm1Sb3cyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93Mi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZm9ybUJ1dHRvbnMnKVxuICAgIGNyZWF0ZUFkZEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcbiAgICBjcmVhdGVDYW5jZWxCdXR0b24oZm9ybVJvdzIsIGZvcm0pXG5cbiAgICAvLyByb3cgdGhyZWU6IGFzc2lnbiBlcnJvciBjbGFzcyBhbmQgdGV4dFxuICAgIGNvbnN0IGZvcm1Sb3czID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAvLyBmb3JtUm93My5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgZm9ybVJvdzMuc2V0QXR0cmlidXRlKCdjbGFzcycsICduZXdQcm9qRXJyb3JDb250YWluZXInKVxuICAgIC8vIGZvcm1Sb3czLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzEpXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MilcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3czKVxufVxuXG5jb25zdCBzaG93Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRMb2NhdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkJ0bicpXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uRm9ybScpXG5cbiAgICBhZGRMb2NhdGlvbkJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2hvd0Jsb2NrJylcbn1cblxuY29uc3QgaGlkZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkTG9jYXRpb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25CdG4nKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkZvcm0nKVxuXG4gICAgYWRkTG9jYXRpb25CdG4uc2V0QXR0cmlidXRlKCdpZCcsICdzaG93QmxvY2snKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG59XG5cbi8vIERlbGV0ZSB3YXRjaGxpc3QgZW50cnlcbmNvbnN0IGRlbGV0ZVdhdGNobGlzdEVudHJ5ID0gKGUpID0+IHtcbiAgICAvLyBncmFiIGFycmF5cyBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIElkZW50aWZ5IGVudHJ5IHRvIGRlbGV0ZVxuICAgIGNvbnN0IGRvb21lZEluZGV4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgLy8gY29uc3QgZG9vbWVkTmFtZSA9IHN0b3JhZ2VXYXRjaGxpc3RbZG9vbWVkSW5kZXhdLm5hbWU7XG5cbiAgICAvLyBkZWxldGUgZW50cnlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnNwbGljZShkb29tZWRJbmRleCwgMSlcblxuICAgIC8vIHNldCBjaGFuZ2VzIHRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyBJZiBkb29tZWQgZW50cnkgd2FzIHNlbGVjdGVkLCBjbGVhciBjb250ZW50IGRpc3BsYXlcbiAgICAvLyBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJyk7XG4gICAgLy8gY29uc3QgYWxsVGFza3NDbGFzc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsVGFza3MnKS5jbGFzc0xpc3RcbiAgICAvLyBpZiAoY29udGVudFRpdGxlLnRleHRDb250ZW50ID09PSBkb29tZWROYW1lKSB7XG4gICAgLy8gICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9ICdBbGwgdGFza3MnXG4gICAgLy8gICAgIGFsbFRhc2tzQ2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIC8vIH1cblxuICAgIC8vIHJlZnJlc2ggd2F0Y2hpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlRGVsZXRlSWNvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICAvLyBjcmVhdGUgaW1hZ2UgYW5kIGFzc2lnbiBhdHRyaWJ1dGVzXG4gICAgY29uc3QgbmV3RGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3RGVsZXRlSWNvbi5zcmMgPSBkZWxldGVJY29uXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24gZGVsZXRlSXRlbScpXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuXG4gICAgLy8gQUREIEVWRU5UIExJU1RFTkVSXG4gICAgaWYgKFxuICAgICAgICBjb250YWluZXIuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAnbG9jYXRpb24nIHx8XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2xvY2F0aW9uJylcbiAgICApIHtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXIgdG8gZGVsZXRlIGxvY2F0aW9uXG4gICAgICAgIG5ld0RlbGV0ZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeWAsXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YCxcbiAgICAgICAgICAgIGBoaWRkZW5gXG4gICAgICAgIClcbiAgICAgICAgbmV3RGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PlxuICAgICAgICAgICAgZGVsZXRlV2F0Y2hsaXN0RW50cnkoZSwgaSlcbiAgICAgICAgKVxuICAgICAgICAvLyBkaXNwbGF5IHRyYXNoIGljb24gb24gaG92ZXJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGhpZGUgdHJhc2ggaWNvblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBzdHJhbmdlJylcbiAgICB9XG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdEZWxldGVJY29uKVxufVxuXG5jb25zdCBjcmVhdGVBZGRpdGlvbkljb24gPSAobGkpID0+IHtcbiAgICBjb25zdCBuZXdBZGRpdGlvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0FkZGl0aW9uSWNvbi5zcmMgPSBhZGRpdGlvbkljb25cbiAgICBuZXdBZGRpdGlvbkljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChuZXdBZGRpdGlvbkljb24pXG59XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vIE9wZW53ZWF0aGVyIEFQSSBGdW5jdGlvbnNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZnVuY3Rpb24gdG9EaXJlY3Rpb24oZGVncmVlKSB7XG4gICAgaWYgKGRlZ3JlZSA+IDMzNy41KSByZXR1cm4gJ05vcnRoJ1xuICAgIGlmIChkZWdyZWUgPiAyOTIuNSkgcmV0dXJuICdOb3J0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyNDcuNSkgcmV0dXJuICdXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMDIuNSkgcmV0dXJuICdTb3V0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAxNTcuNSkgcmV0dXJuICdTb3V0aCdcbiAgICBpZiAoZGVncmVlID4gMTIyLjUpIHJldHVybiAnU291dGggRWFzdCdcbiAgICBpZiAoZGVncmVlID4gNjcuNSkgcmV0dXJuICdFYXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMi41KSByZXR1cm4gJ05vcnRoIEVhc3QnXG4gICAgcmV0dXJuICdOb3J0aCdcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjIzNzYxMTUvaG93LXRvLW9idGFpbi1vcGVuLXdlYXRoZXItYXBpLWRhdGUtdGltZS1mcm9tLWNpdHktYmVpbmctZmV0Y2hlZFxuY29uc3QgY2FsY0N1cnJlbnRUaW1lID0gKHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbFRpbWUgPSBkLmdldFRpbWUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSBsb2NhbFRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuY29uc3QgY2FsY1N1blRpbWUgPSAodGltZSwgdGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSB0aW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbi8vIGNvbnN0IGZldGNoRGFpbHlGb3JlY2FzdCA9IChsYXQsIGxvbikgPT4ge1xuLy8gICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3UHJvakVycm9yQ29udGFpbmVyJyk7XG4vLyAgIGNvbnNvbGUubG9nKGxhdCk7XG4vLyAgIGNvbnNvbGUubG9nKGxvbik7XG4vLyAgIC8vIGZldGNoIHNldmVuIGRheSBmb3JlY2FzdFxuLy8gICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PSR7bGF0fSZsb249JHtsb259JmV4Y2x1ZGU9bWludXRlbHksaG91cmx5LGFsZXJ0cyZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsIHsgbW9kZTogJ2NvcnMnIH0pXG4vLyAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4vLyAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4vLyAgICAgfSlcbi8vICAgICAuY2F0Y2goKGVycikgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coZXJyKTtcbi8vICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuY29uc3QgZmV0Y2hIb3VybHlGb3JlY2FzdCA9IChjaXR5UXVlcnkpID0+IHtcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG4gICAgLy8gZmV0Y2ggZml2ZSBkYXkvdGhyZWUgaG91ciBmb3JlY2FzdFxuICAgIGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCxcbiAgICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdEFycmF5ID0gW11cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLmxpc3RbaV0ud2VhdGhlclswXS5pY29ufS5wbmdgXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0KSxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRleHQ6IHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0LFxuICAgICAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubGlzdFtpXS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgICAgICByYWluQ2hhbmNlOiByZXNwb25zZS5saXN0W2ldLnBvcCAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcsXG4gICAgICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcpLFxuICAgICAgICAgICAgICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2UubGlzdFtpXS53aW5kLmd1c3QsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2UubGlzdFtpXS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5LnB1c2gobmV3SG91cmx5Rm9yZWNhc3QpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdIb3VybHlGb3JlY2FzdEFycmF5KVxuICAgICAgICAgICAgcmV0dXJuIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IGZldGNoQ3VycmVudFdlYXRoZXIgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gICAgLy8gY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKVxuICAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcubmV3UHJvakVycm9yQ29udGFpbmVyJ1xuICAgIClcblxuICAgIGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlRdWVyeX0mdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIC8vIGNvbnN0IHtsYXR9ID0gcmVzcG9uc2UuY29vcmQ7XG4gICAgICAgICAgICAvLyBjb25zdCB7bG9ufSA9IHJlc3BvbnNlLmNvb3JkO1xuICAgICAgICAgICAgLy8gZmV0Y2hEYWlseUZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgICAgICAgICAgIHN1Ym1pdExvY2F0aW9uKHJlc3BvbnNlLm5hbWUpXG4gICAgICAgICAgICBjb25zdCBuZXdXZWF0aGVyQ2FyZCA9IHtcbiAgICAgICAgICAgICAgICBjaXR5OiByZXNwb25zZS5uYW1lLFxuICAgICAgICAgICAgICAgIGNvdW50cnk6IHJlc3BvbnNlLnN5cy5jb3VudHJ5LFxuICAgICAgICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgIGxvY2FsRGF0ZTogY2FsY0N1cnJlbnRUaW1lKHJlc3BvbnNlLnRpbWV6b25lKSxcbiAgICAgICAgICAgICAgICBzdW5yaXNlOiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnJpc2UgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgc3Vuc2V0OiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnNldCAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnRpbWV6b25lXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0ZW1wQ3VycmVudDogcmVzcG9uc2UubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgIHRlbXBIaWdoOiByZXNwb25zZS5tYWluLnRlbXBfbWF4LFxuICAgICAgICAgICAgICAgIHRlbXBMb3c6IHJlc3BvbnNlLm1haW4udGVtcF9taW4sXG4gICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVySWNvbjogcmVzcG9uc2Uud2VhdGhlclswXS5pY29uLFxuICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLndpbmQuZGVnLFxuICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLndpbmQuZGVnKSxcbiAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLndpbmQuZ3VzdCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYFxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3V2VhdGhlckNhcmQpXG4gICAgICAgICAgICBkaXNwbGF5V2VhdGhlcihuZXdXZWF0aGVyQ2FyZClcbiAgICAgICAgICAgIHJldHVybiBuZXdXZWF0aGVyQ2FyZFxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgQVBJQ2l0eVNlYXJjaCA9IChpbnB1dCkgPT4ge1xuICAgIGZldGNoQ3VycmVudFdlYXRoZXIoaW5wdXQpXG4gICAgZmV0Y2hIb3VybHlGb3JlY2FzdChpbnB1dClcbn1cblxuY29uc3QgdmFsaWRhdGVTZWFyY2ggPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdMb2NhdGlvbklucHV0JylcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG4gICAgLy8gcmVzZXQgZXJyb3JcbiAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJydcbiAgICAvLyBjaGVjayBmb3Igc2VhcmNoIHRlcm1cbiAgICBpZiAobmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcbiAgICB9IGVsc2Uge1xuICAgICAgICBBUElDaXR5U2VhcmNoKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUpXG4gICAgICAgIGhpZGVGb3JtKClcbiAgICAgICAgbmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9ICcnXG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVEZWxldGVJY29uLFxuICAgIGNyZWF0ZUZvcm0sXG4gICAgY3JlYXRlTWVudUljb24sXG4gICAgZGlzcGxheVdhdGNobGlzdCxcbiAgICBoaWRlRm9ybSxcbiAgICBzaG93Rm9ybSxcbiAgICBzdWJtaXRMb2NhdGlvbixcbiAgICB2YWxpZGF0ZVNlYXJjaCxcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7XG4gICAgY3JlYXRlQWRkaXRpb25JY29uLFxuICAgIGNyZWF0ZUZvcm0sXG4gICAgLy8gZGlzcGxheVdhdGNobGlzdCxcbn0gZnJvbSAnLi9oZWxwZXJGdW5jdGlvbnMnXG5pbXBvcnQgZ2l0aHViSWNvbiBmcm9tICcuL2Fzc2V0cy9HaXRIdWItbGlnaHQtMzJweC5wbmcnXG5pbXBvcnQgbG9nb0ljb24gZnJvbSAnLi9hc3NldHMvbG9nb0ljb24uc3ZnJ1xuXG5jb25zdCBjcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJylcblxuICAgIC8vIGRpc3BsYXkgbG9nb1xuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGxvZ28uc3JjID0gbG9nb0ljb25cbiAgICBsb2dvLnRhcmdldCA9ICdfYmxhbmsnXG4gICAgbG9nby5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xvZ28nKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChsb2dvKVxuXG4gICAgLy8gZGlzcGxheSB0aXRsZVxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKVxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1dlYXRoZXJzZXJ2ZSdcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpXG5cbiAgICByZXR1cm4gaGVhZGVyXG59XG5cbmNvbnN0IGNyZWF0ZU1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbWVudS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21lbnUnKVxuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBoZWFkZXJcbiAgICBjb25zdCB3YXRjaGxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICB3YXRjaGxpc3RIZWFkZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3RIZWFkZXInKVxuICAgIHdhdGNobGlzdEhlYWRlci50ZXh0Q29udGVudCA9ICdXYXRjaGxpc3QnXG5cbiAgICAvLyBjcmVhdGUgd2F0Y2hsaXN0IG1lbnVcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcbiAgICB3YXRjaGxpc3Quc2V0QXR0cmlidXRlKCdpZCcsICd3YXRjaGxpc3QnKVxuXG4gICAgLy8gZGlzcGxheVdhdGNobGlzdCgpXG5cbiAgICAvLyBHZW5lcmF0ZSBhZGQgbG9jYXRpb24gY29udGFpbmVyXG4gICAgY29uc3QgYWRkTG9jYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3QnKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGJ1dHRvblxuICAgIGNvbnN0IGFkZExvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGFkZExvY2F0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkTG9jYXRpb25CdG4nKVxuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbihhZGRMb2NhdGlvbilcbiAgICBjb25zdCBhZGRMb2NhdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBhZGRMb2NhdGlvblRleHQuaW5uZXJUZXh0ID0gJ0FkZCBMb2NhdGlvbidcbiAgICBhZGRMb2NhdGlvbi5hcHBlbmRDaGlsZChhZGRMb2NhdGlvblRleHQpXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb24pXG5cbiAgICAvLyBHZW5lcmF0ZSBhbmQgaGlkZSBuZXcgbG9jYXRpb24gZm9ybVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uRm9ybScpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBhZGRMb2NhdGlvbkZvcm0ubWV0aG9kID0gJ2dldCdcbiAgICBjcmVhdGVGb3JtKGFkZExvY2F0aW9uRm9ybSlcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkZvcm0pXG5cbiAgICBtZW51LmFwcGVuZENoaWxkKHdhdGNobGlzdEhlYWRlcilcbiAgICBtZW51LmFwcGVuZENoaWxkKHdhdGNobGlzdClcbiAgICBtZW51LmFwcGVuZENoaWxkKGFkZExvY2F0aW9uQ29udGFpbmVyKVxuXG4gICAgcmV0dXJuIG1lbnVcbn1cblxuY29uc3QgY3JlYXRlV2VhdGhlckNhcmQgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICAgIGNvbnN0IFdlYXRoZXJBUElDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50JylcblxuICAgIC8vIGNyZWF0ZSBBUEkgdGl0bGVcbiAgICBjb25zdCBBUElUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICBBUElUaXRsZS5jbGFzc0xpc3QuYWRkKCdjb250ZW50VGl0bGUnKVxuICAgIEFQSVRpdGxlLmlubmVyVGV4dCA9ICdXZWF0aGVyc2VydmUnXG5cbiAgICAvLyBjcmVhdGUgQVBJIGltZ1xuICAgIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBBUElJbWFnZS5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZScpXG5cbiAgICAvLyBjcmVhdGUgZGVzY3JpcHRpb24gY29udGFpbmVyXG4gICAgY29uc3QgZGVzY3JpcHRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBkZXNjcmlwdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd3ZWF0aGVyRGVzY3JpcHRpb24nKVxuXG4gICAgLy8gY3JlYXRlIGN1cnJlbnQgdGVtcCBjb250YWluZXJcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgdGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0ZW1wQ29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBoaWdoL2xvdyB0ZW1wIGNvbnRhaW5lclxuICAgIGNvbnN0IGhpZ2hMb3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGhpZ2hMb3dDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlnaExvd0NvbnRhaW5lcicpXG5cbiAgICBjb25zdCBsb3dUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgbG93VGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsb3dUZW1wQ29udGFpbmVyJylcbiAgICBoaWdoTG93Q29udGFpbmVyLmFwcGVuZENoaWxkKGxvd1RlbXBDb250YWluZXIpXG5cbiAgICBjb25zdCBoaWdoVGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGhpZ2hUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZ2hUZW1wQ29udGFpbmVyJylcbiAgICBoaWdoTG93Q29udGFpbmVyLmFwcGVuZENoaWxkKGhpZ2hUZW1wQ29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIGN1cnJlbnQgdGltZSBjb250YWluZXJcbiAgICBjb25zdCB0aW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgdGltZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0aW1lQ29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBzdW5yaXNlL3N1bnNldCBjb250YWluZXJcbiAgICBjb25zdCBzdW5yaXNlU3Vuc2V0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzdW5yaXNlU3Vuc2V0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1bnJpc2VTdW5zZXRDb250YWluZXInKVxuXG4gICAgY29uc3Qgc3VucmlzZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHN1bnJpc2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3VucmlzZUNvbnRhaW5lcicpXG4gICAgc3VucmlzZVN1bnNldENvbnRhaW5lci5hcHBlbmRDaGlsZChzdW5yaXNlQ29udGFpbmVyKVxuXG4gICAgY29uc3Qgc3Vuc2V0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgc3Vuc2V0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1bnNldENvbnRhaW5lcicpXG4gICAgc3VucmlzZVN1bnNldENvbnRhaW5lci5hcHBlbmRDaGlsZChzdW5zZXRDb250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgd2luZCBjb250YWluZXJcbiAgICBjb25zdCB3aW5kQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgd2luZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd3aW5kQ29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBodW1pZGl0eSBjb250YWluZXJcbiAgICBjb25zdCBodW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGh1bWlkaXR5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2h1bWlkaXR5Q29udGFpbmVyJylcblxuICAgIC8vIEFwcGVuZFxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVRpdGxlKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHRlbXBDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoaGlnaExvd0NvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZCh0aW1lQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHN1bnJpc2VTdW5zZXRDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQod2luZENvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChodW1pZGl0eUNvbnRhaW5lcilcblxuICAgIHJldHVybiBXZWF0aGVyQVBJQ29udGFpbnRlclxufVxuXG5jb25zdCBjcmVhdGVDb250ZW50ID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBjb250ZW50IGNvbnRhaW5lclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29udGVudCcpXG5cbiAgICAvLyBjcmVhdGUgd2VhdGhlciBhcHBcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNyZWF0ZVdlYXRoZXJDYXJkKCkpXG5cbiAgICByZXR1cm4gY29udGVudFxufVxuXG5jb25zdCBjcmVhdGVGb290ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJylcblxuICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGNvcHlyaWdodC50ZXh0Q29udGVudCA9IGBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IGpjYW1wYmVsbDU3YFxuXG4gICAgY29uc3QgZ2l0aHViTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGdpdGh1YkxpbmsuaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vamNhbXBiZWxsNTcnXG4gICAgZ2l0aHViTGluay50YXJnZXQgPSAnX2JsYW5rJ1xuXG4gICAgY29uc3QgbmV3R2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3R2l0aHViSWNvbi5zcmMgPSBnaXRodWJJY29uXG4gICAgbmV3R2l0aHViSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2dpdGh1YicpXG5cbiAgICBnaXRodWJMaW5rLmFwcGVuZENoaWxkKG5ld0dpdGh1Ykljb24pXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGNvcHlyaWdodClcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZ2l0aHViTGluaylcblxuICAgIHJldHVybiBmb290ZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUhlYWRlcigpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlTWVudSgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlQ29udGVudCgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRm9vdGVyKCkpXG59XG4iXSwibmFtZXMiOlsiYWRkaXRpb25JY29uIiwiZGVsZXRlSWNvbiIsIm1lbnVJY29uIiwiZG9jdW1lbnQiLCJjb29raWUiLCJjcmVhdGVNZW51SWNvbiIsImxpIiwiY2hlY2tsaXN0SWNvbiIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUxpc3RpbmciLCJsb2NhdGlvbk5hbWUiLCJpIiwid2F0Y2hsaXN0IiwicXVlcnlTZWxlY3RvciIsImxvY2F0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIiwic2VsZWN0ZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsImNvbnRhaW5zIiwic2VsZWN0TG9jYXRpb24iLCJsb2NhdGlvblRleHQiLCJ0ZXh0Q29udGVudCIsIm5hbWUiLCJjcmVhdGVEZWxldGVJY29uIiwiZGlzcGxheVdhdGNobGlzdCIsIm9sZExpc3RpbmdDb3VudCIsImNoaWxkRWxlbWVudENvdW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsInN0b3JhZ2VXYXRjaGxpc3QiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZm9yRWFjaCIsInN1Ym1pdExvY2F0aW9uIiwiaW5wdXQiLCJuZXdMb2NhdGlvbiIsInB1c2giLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGlzcGxheVdlYXRoZXIiLCJuZXdXZWF0aGVyQ2FyZCIsImNvbnRlbnRUaXRsZSIsImNpdHkiLCJjb3VudHJ5IiwiQVBJSW1hZ2UiLCJ3ZWF0aGVySWNvbiIsIndlYXRoZXJEZXNjcmlwdGlvbiIsImlubmVyVGV4dCIsInRlbXBDb250YWluZXIiLCJNYXRoIiwicm91bmQiLCJ0ZW1wQ3VycmVudCIsImxvd1RlbXBDb250YWluZXIiLCJ0ZW1wTG93IiwiaGlnaFRlbXBDb250YWluZXIiLCJ0ZW1wSGlnaCIsInRpbWVDb250YWluZXIiLCJsb2NhbERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJzdW5yaXNlQ29udGFpbmVyIiwic3VucmlzZSIsInN1bnNldENvbnRhaW5lciIsInN1bnNldCIsIndpbmRDb250YWluZXIiLCJ3aW5kU3BlZWQiLCJ3aW5kRGlyZWN0aW9uIiwid2luZERlZ3JlZSIsImh1bWlkaXR5Q29udGFpbmVyIiwiaHVtaWRpdHkiLCJBUElDaXR5U2VhcmNoIiwiZ2V0QXR0cmlidXRlIiwic2VsZWN0ZWRMb2NhdGlvbklkIiwiY3JlYXRlQWRkQnV0dG9uIiwiY29udGFpbmVyIiwiYWRkQnRuIiwidmFsaWRhdGVTZWFyY2giLCJjcmVhdGVDYW5jZWxCdXR0b24iLCJjYW5jZWxCdG4iLCJjcmVhdGVGb3JtIiwiZm9ybSIsImZvcm1Sb3cxIiwibmV3TG9jYXRpb25JbnB1dCIsInBsYWNlaG9sZGVyIiwiZm9ybVJvdzIiLCJmb3JtUm93MyIsInNob3dGb3JtIiwiYWRkTG9jYXRpb25CdG4iLCJhZGRMb2NhdGlvbkZvcm0iLCJoaWRlRm9ybSIsImRlbGV0ZVdhdGNobGlzdEVudHJ5IiwiZG9vbWVkSW5kZXgiLCJzcGxpY2UiLCJuZXdEZWxldGVJY29uIiwidHJhc2hJY29uIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZUFkZGl0aW9uSWNvbiIsIm5ld0FkZGl0aW9uSWNvbiIsInRvRGlyZWN0aW9uIiwiZGVncmVlIiwiY2FsY0N1cnJlbnRUaW1lIiwidGltZXpvbmUiLCJkIiwiRGF0ZSIsImxvY2FsVGltZSIsImdldFRpbWUiLCJsb2NhbE9mZnNldCIsImdldFRpbWV6b25lT2Zmc2V0IiwidXRjIiwibmV3Q2l0eSIsImNhbGNTdW5UaW1lIiwidGltZSIsImZldGNoSG91cmx5Rm9yZWNhc3QiLCJjaXR5UXVlcnkiLCJuZXdQcm9qRXJyb3JDb250YWluZXIiLCJmZXRjaCIsIm1vZGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwibmV3SG91cmx5Rm9yZWNhc3RBcnJheSIsIm5ld0hvdXJseUZvcmVjYXN0IiwiZGF0ZSIsImxpc3QiLCJkdF90eHQiLCJkYXRlVGV4dCIsIm1haW4iLCJyYWluQ2hhbmNlIiwicG9wIiwidGVtcGVyYXR1cmUiLCJ0ZW1wIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXIiLCJkZXNjcmlwdGlvbiIsIndpbmQiLCJkZWciLCJ3aW5kR3VzdCIsImd1c3QiLCJzcGVlZCIsImNhdGNoIiwiZXJyIiwiZmV0Y2hDdXJyZW50V2VhdGhlciIsInN5cyIsInRlbXBfbWF4IiwidGVtcF9taW4iLCJpY29uIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsImdpdGh1Ykljb24iLCJsb2dvSWNvbiIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImxvZ28iLCJ0aXRsZSIsImNyZWF0ZU1lbnUiLCJtZW51Iiwid2F0Y2hsaXN0SGVhZGVyIiwiYWRkTG9jYXRpb25Db250YWluZXIiLCJhZGRMb2NhdGlvbiIsImFkZExvY2F0aW9uVGV4dCIsIm1ldGhvZCIsImNyZWF0ZVdlYXRoZXJDYXJkIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJBUElUaXRsZSIsImRlc2NyaXB0aW9uQ29udGFpbmVyIiwiaGlnaExvd0NvbnRhaW5lciIsInN1bnJpc2VTdW5zZXRDb250YWluZXIiLCJjcmVhdGVDb250ZW50IiwiY29udGVudCIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNvcHlyaWdodCIsImdldEZ1bGxZZWFyIiwiZ2l0aHViTGluayIsImhyZWYiLCJuZXdHaXRodWJJY29uIiwiaW5pdGlhbGl6ZSIsImJvZHkiXSwic291cmNlUm9vdCI6IiJ9