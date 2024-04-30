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

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.js");
 // Initiate storage arrays if localStorage is empty

const initiateStorage = () => {
  const storageWatchlistArray = [];

  if (localStorage.storageWatchlist === undefined) {
    localStorage.setItem('storageWatchlist', JSON.stringify(storageWatchlistArray));
    (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.addDefaultContent)();
  } else {
    // insert content from local storage if there is any
    (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.displayWatchlist)();
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initiateStorage);

/***/ }),

/***/ "./src/pageLoader.js":
/*!***************************!*\
  !*** ./src/pageLoader.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/reset.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/reset.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}", "",{"version":3,"sources":["webpack://./src/reset.css"],"names":[],"mappings":"AAAA;;;CAGC;;AAED;;;;;;;;;;;;;CAaC,SAAS;CACT,UAAU;CACV,SAAS;CACT,eAAe;CACf,aAAa;CACb,wBAAwB;AACzB;AACA,gDAAgD;AAChD;;CAEC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,gBAAgB;AACjB;AACA;CACC,YAAY;AACb;AACA;;CAEC,WAAW;CACX,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,iBAAiB;AAClB","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Page styling */\n\n:root {\n    --panel: rgba(255, 255, 255, 0.65);\n    --accent: royalblue;\n    --background: rgb(0, 10, 39);\n    --white-ish: whitesmoke;\n    --error: darkred;\n}\n\nbody {\n    /* system font stack */\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;\n    background-color: var(--background);\n    display: grid;\n    grid-template-columns: 250px calc(100vw - 250px);\n    grid-template-rows: 110px calc(100vh - 110px - 62px) 62px;\n    margin: 0;\n    box-sizing: border-box;\n    max-width: 100vw;\n    max-height: 100vh;\n}\n\n/* Scrollbar styling */\n\n::-webkit-scrollbar {\n    width: 12px;\n    height: 12px;\n}\n\n::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    -webkit-border-radius: 6px;\n    border-radius: 6px;\n}\n\n::-webkit-scrollbar-track:hover {\n    border: 1px solid rgb(20, 20, 20, 0.2);\n}\n\n::-webkit-scrollbar-thumb {\n    /* background: var(--menu-color);  */\n    background: rgb(20, 20, 20, 0.25);\n    -webkit-border-radius: 6px;\n    border-radius: 6px;\n    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4);\n    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4);\n}\n\n::-webkit-scrollbar-thumb:hover {\n    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.6);\n    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.6);\n}\n\n::-webkit-scrollbar-thumb:active {\n    border: 1px solid rgb(20, 20, 20, 0.2);\n}\n\n/* General styling */\n\nh1 {\n    font-size: 2em;\n    font-weight: bolder;\n}\n\nh2 {\n    font-size: 1.15em;\n    font-weight: 500;\n    margin-top: 0.83em;\n    margin-bottom: 0.83em;\n}\n\n.hidden {\n    display: none;\n}\n\n#hidden {\n    display: none;\n}\n\n#showBlock {\n    display: block;\n}\n\n/* Header styling */\n\n.logo {\n    max-height: 90%;\n    margin-right: 8px;\n    /* whitesmoke color */\n    filter: invert(100%) sepia(0%) saturate(7480%) hue-rotate(201deg)\n        brightness(107%) contrast(92%);\n}\n\nheader {\n    grid-column: 1 / -1;\n    color: var(--white-ish);\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    box-sizing: border-box;\n}\n\n/* Menu styling */\n\n.menu {\n    background-color: var(--panel);\n    border-radius: 1rem;\n    margin-left: 0.5rem;\n}\n\n.menu > ul.watchlist {\n    margin-top: 20px;\n}\n\n.icon {\n    height: 1.2rem;\n}\n\n.watchlist {\n    list-style: none;\n    padding: 0;\n}\n\n.watchlist > li {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.watchlistHeader {\n    font-weight: 700;\n    font-size: 1.3rem;\n}\n\n.watchlist li,\n.watchlistHeader,\n.addLocationBtn,\n.addLocationForm {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n#watchlist {\n    max-height: 80%;\n    overflow: auto;\n}\n\n.watchlist li:hover,\n.addLocationBtn:hover {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.watchlist li:active,\n.addLocationBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\nli.selected {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n}\n\n.deleteItem {\n    margin-left: auto;\n}\n\n.deleteItem:hover {\n    filter: invert(7%) sepia(51%) saturate(5951%) hue-rotate(350deg)\n        brightness(140%) contrast(136%);\n}\n\n/* Form styling */\n\n.addLocationForm {\n    padding: 0;\n}\n\n.formRow {\n    display: flex;\n    justify-content: space-around;\n    gap: 8px;\n}\n\n#formButtons {\n    margin-top: 8px;\n}\n\n.newLocationInput {\n    padding: 6px;\n    font-size: 1.2rem;\n    width: 100%;\n    border: none;\n    border-radius: 8px;\n    box-sizing: border-box;\n}\n\n.addBtn,\n.cancelBtn {\n    padding: 8px;\n    width: 50%;\n    border-radius: 8px;\n    font-size: 1.1rem;\n    color: var(--white-ish);\n    font-weight: 550;\n}\n\n.addBtn {\n    background-color: var(--accent);\n    border: 2px solid hsl(225, 73%, 30%);\n}\n\n.cancelBtn {\n    background-color: mediumvioletred;\n    border: 2px solid hsl(322, 81%, 30%);\n}\n\n.addBtn:hover,\n.cancelBtn:hover {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.addBtn:active,\n.cancelBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\n.newProjErrorContainer {\n    color: var(--error);\n    font-size: 1.1rem;\n    text-align: center;\n    padding: 8px;\n}\n\n/* Content styling */\n\n.content {\n    margin: 0 0.5rem;\n    font-size: 1.2rem;\n    max-width: 1000px;\n    box-sizing: border-box;\n    overflow: auto;\n}\n\n.WeatherAPIContainter {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0rem;\n    background-color: var(--panel);\n    border-radius: 1rem;\n    height: 100%;\n}\n\n.forecastContainer {\n    max-width: 95%;\n}\n\n.forecastTable {\n    display: flex;\n}\n\n.forecastRow {\n    display: flex;\n    gap: 0.5rem;\n    /* overflow-y: hidden; */\n    min-height: 170px;\n    /* enable horizontal scroll */\n    overflow-x: scroll;\n}\n\n/* hide scrollbar, retain function */\n/* .forecastRow::-webkit-scrollbar { */\n/* display: none; */\n/* } */\n\n.forecastCell {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.25rem;\n    min-width: 150px;\n    height: 100%;\n    /* min-width: max-content; */\n}\n\n/* Footer styling */\n\nfooter {\n    grid-column: 1 / -1;\n    /* background-color: var(--background-color); */\n    color: var(--white-ish);\n    font-size: 1.2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    box-sizing: border-box;\n}\n\nfooter > a {\n    display: flex;\n}\n\n.github {\n    height: 24px;\n    transition: transform 0.3s ease-in-out;\n}\n\n.github:hover {\n    transform: rotate(-360deg) scale(1.2);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["/* Page styling */\n\n:root {\n    --panel: rgba(255, 255, 255, 0.65);\n    --accent: royalblue;\n    --background: rgb(0, 10, 39);\n    --white-ish: whitesmoke;\n    --error: darkred;\n}\n\nbody {\n    /* system font stack */\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;\n    background-color: var(--background);\n    display: grid;\n    grid-template-columns: 250px calc(100vw - 250px);\n    grid-template-rows: 110px calc(100vh - 110px - 62px) 62px;\n    margin: 0;\n    box-sizing: border-box;\n    max-width: 100vw;\n    max-height: 100vh;\n}\n\n/* Scrollbar styling */\n\n::-webkit-scrollbar {\n    width: 12px;\n    height: 12px;\n}\n\n::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    -webkit-border-radius: 6px;\n    border-radius: 6px;\n}\n\n::-webkit-scrollbar-track:hover {\n    border: 1px solid rgb(20, 20, 20, 0.2);\n}\n\n::-webkit-scrollbar-thumb {\n    /* background: var(--menu-color);  */\n    background: rgb(20, 20, 20, 0.25);\n    -webkit-border-radius: 6px;\n    border-radius: 6px;\n    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4);\n    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4);\n}\n\n::-webkit-scrollbar-thumb:hover {\n    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.6);\n    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.6);\n}\n\n::-webkit-scrollbar-thumb:active {\n    border: 1px solid rgb(20, 20, 20, 0.2);\n}\n\n/* General styling */\n\nh1 {\n    font-size: 2em;\n    font-weight: bolder;\n}\n\nh2 {\n    font-size: 1.15em;\n    font-weight: 500;\n    margin-top: 0.83em;\n    margin-bottom: 0.83em;\n}\n\n.hidden {\n    display: none;\n}\n\n#hidden {\n    display: none;\n}\n\n#showBlock {\n    display: block;\n}\n\n/* Header styling */\n\n.logo {\n    max-height: 90%;\n    margin-right: 8px;\n    /* whitesmoke color */\n    filter: invert(100%) sepia(0%) saturate(7480%) hue-rotate(201deg)\n        brightness(107%) contrast(92%);\n}\n\nheader {\n    grid-column: 1 / -1;\n    color: var(--white-ish);\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    box-sizing: border-box;\n}\n\n/* Menu styling */\n\n.menu {\n    background-color: var(--panel);\n    border-radius: 1rem;\n    margin-left: 0.5rem;\n}\n\n.menu > ul.watchlist {\n    margin-top: 20px;\n}\n\n.icon {\n    height: 1.2rem;\n}\n\n.watchlist {\n    list-style: none;\n    padding: 0;\n}\n\n.watchlist > li {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.watchlistHeader {\n    font-weight: 700;\n    font-size: 1.3rem;\n}\n\n.watchlist li,\n.watchlistHeader,\n.addLocationBtn,\n.addLocationForm {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n#watchlist {\n    max-height: 80%;\n    overflow: auto;\n}\n\n.watchlist li:hover,\n.addLocationBtn:hover {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.watchlist li:active,\n.addLocationBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\nli.selected {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n}\n\n.deleteItem {\n    margin-left: auto;\n}\n\n.deleteItem:hover {\n    filter: invert(7%) sepia(51%) saturate(5951%) hue-rotate(350deg)\n        brightness(140%) contrast(136%);\n}\n\n/* Form styling */\n\n.addLocationForm {\n    padding: 0;\n}\n\n.formRow {\n    display: flex;\n    justify-content: space-around;\n    gap: 8px;\n}\n\n#formButtons {\n    margin-top: 8px;\n}\n\n.newLocationInput {\n    padding: 6px;\n    font-size: 1.2rem;\n    width: 100%;\n    border: none;\n    border-radius: 8px;\n    box-sizing: border-box;\n}\n\n.addBtn,\n.cancelBtn {\n    padding: 8px;\n    width: 50%;\n    border-radius: 8px;\n    font-size: 1.1rem;\n    color: var(--white-ish);\n    font-weight: 550;\n}\n\n.addBtn {\n    background-color: var(--accent);\n    border: 2px solid hsl(225, 73%, 30%);\n}\n\n.cancelBtn {\n    background-color: mediumvioletred;\n    border: 2px solid hsl(322, 81%, 30%);\n}\n\n.addBtn:hover,\n.cancelBtn:hover {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.addBtn:active,\n.cancelBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\n.newProjErrorContainer {\n    color: var(--error);\n    font-size: 1.1rem;\n    text-align: center;\n    padding: 8px;\n}\n\n/* Content styling */\n\n.content {\n    margin: 0 0.5rem;\n    font-size: 1.2rem;\n    max-width: 1000px;\n    box-sizing: border-box;\n    overflow: auto;\n}\n\n.WeatherAPIContainter {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0rem;\n    background-color: var(--panel);\n    border-radius: 1rem;\n    height: 100%;\n}\n\n.forecastContainer {\n    max-width: 95%;\n}\n\n.forecastTable {\n    display: flex;\n}\n\n.forecastRow {\n    display: flex;\n    gap: 0.5rem;\n    /* overflow-y: hidden; */\n    min-height: 170px;\n    /* enable horizontal scroll */\n    overflow-x: scroll;\n}\n\n/* hide scrollbar, retain function */\n/* .forecastRow::-webkit-scrollbar { */\n/* display: none; */\n/* } */\n\n.forecastCell {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.25rem;\n    min-width: 150px;\n    height: 100%;\n    /* min-width: max-content; */\n}\n\n/* Footer styling */\n\nfooter {\n    grid-column: 1 / -1;\n    /* background-color: var(--background-color); */\n    color: var(--white-ish);\n    font-size: 1.2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    box-sizing: border-box;\n}\n\nfooter > a {\n    display: flex;\n}\n\n.github {\n    height: 24px;\n    transition: transform 0.3s ease-in-out;\n}\n\n.github:hover {\n    transform: rotate(-360deg) scale(1.2);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/reset.css":
/*!***********************!*\
  !*** ./src/reset.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./reset.css */ "./node_modules/css-loader/dist/cjs.js!./src/reset.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reset.css */ "./src/reset.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _pageLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pageLoader */ "./src/pageLoader.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./localStorage */ "./src/localStorage.js");
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.js");





(0,_pageLoader__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_localStorage__WEBPACK_IMPORTED_MODULE_3__["default"])(); // Grab DOM elements

const addLocationBtn = document.querySelector('.addLocationBtn');
const cancelBtn = document.querySelector('.cancelBtn'); // Event listeners

addLocationBtn.addEventListener('click', _helperFunctions__WEBPACK_IMPORTED_MODULE_4__.showForm);
cancelBtn.addEventListener('click', e => {
  e.preventDefault();
  (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_4__.hideForm)();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQU8sdURBQVU7QUFDVmpDLHlEQUFlLElBRWY7O0FBQ0EsTUFBTTdELGNBQWMsR0FBRzVHLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixpQkFBdkIsQ0FBdkI7QUFDQSxNQUFNc0YsU0FBUyxHQUFHbkcsUUFBUSxDQUFDYSxhQUFULENBQXVCLFlBQXZCLENBQWxCLEVBRUE7O0FBQ0ErRixjQUFjLENBQUMxRixnQkFBZixDQUFnQyxPQUFoQyxFQUF5Q3lGLHNEQUF6QztBQUVBUixTQUFTLENBQUNqRixnQkFBVixDQUEyQixPQUEzQixFQUFxQ0MsQ0FBRCxJQUFPO0VBQ3ZDQSxDQUFDLENBQUNvSixjQUFGO0VBQ0F6RCwwREFBUTtBQUNYLENBSEQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2hlbHBlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9sb2NhbFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9yZXNldC5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3Jlc2V0LmNzcz9lZGUwIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWRkaXRpb25JY29uIGZyb20gJy4vYXNzZXRzL3BsdXMuc3ZnJ1xuaW1wb3J0IGRlbGV0ZUljb24gZnJvbSAnLi9hc3NldHMvZGVsZXRlLnN2ZydcbmltcG9ydCBtZW51SWNvbiBmcm9tICcuL2Fzc2V0cy9tZW51SWNvbi5zdmcnXG5cbmRvY3VtZW50LmNvb2tpZSA9ICdTYW1lU2l0ZT1MYXgnXG5cbmNvbnN0IGNyZWF0ZU1lbnVJY29uID0gKGxpKSA9PiB7XG4gICAgY29uc3QgY2hlY2tsaXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgY2hlY2tsaXN0SWNvbi5zcmMgPSBtZW51SWNvblxuICAgIGNoZWNrbGlzdEljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChjaGVja2xpc3RJY29uKVxufVxuXG4vLyBBZGQgc2luZ2xlIGxvY2F0aW9uIHRvIHdhdGNobGlzdCAoY2FsbGVkIGJlbG93KVxuY29uc3QgY3JlYXRlTGlzdGluZyA9IChsb2NhdGlvbk5hbWUsIGkpID0+IHtcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2F0Y2hsaXN0JylcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGxvY2F0aW9uLmNsYXNzTGlzdC5hZGQoYGxvY2F0aW9uYClcbiAgICBsb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuICAgIC8vIGFzc2lnbiBjbGFzcyB0byBzZWxlY3RlZCBsb2NhdGlvbiBsaXN0aW5nXG4gICAgaWYgKGxvY2F0aW9uTmFtZS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgfVxuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXIgdG8gZGlzcGxheSBzZWxlY3RlZCBsb2NhdGlvbidzIHdlYXRoZXJcbiAgICBsb2NhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIGlmIGRlbGV0aW5nIGxpc3RpbmcsIGRvIG5vdCBkaXNwbGF5IHdlYXRoZXJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlSXRlbScpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RMb2NhdGlvbihsb2NhdGlvbilcbiAgICB9KVxuXG4gICAgY3JlYXRlTWVudUljb24obG9jYXRpb24pXG4gICAgY29uc3QgbG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgbG9jYXRpb25UZXh0LnRleHRDb250ZW50ID0gbG9jYXRpb25OYW1lLm5hbWVcbiAgICBsb2NhdGlvbi5hcHBlbmRDaGlsZChsb2NhdGlvblRleHQpXG4gICAgY3JlYXRlRGVsZXRlSWNvbihsb2NhdGlvbiwgaSlcbiAgICB3YXRjaGxpc3QuYXBwZW5kQ2hpbGQobG9jYXRpb24pXG59XG5cbi8vIERpc3BsYXkgZW50aXJlIGFycmF5IG9mIGxvY2F0aW9ucyB0byB3YXRjaGxpc3RcbmNvbnN0IGRpc3BsYXlXYXRjaGxpc3QgPSAoKSA9PiB7XG4gICAgLy8gR3JhYiB3YXRjaGxpc3RcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2F0Y2hsaXN0JylcblxuICAgIC8vIENsZWFyIGxvY2F0aW9uIGxpc3RpbmdzXG4gICAgY29uc3Qgb2xkTGlzdGluZ0NvdW50ID0gd2F0Y2hsaXN0LmNoaWxkRWxlbWVudENvdW50XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRMaXN0aW5nQ291bnQ7IGkrKykge1xuICAgICAgICB3YXRjaGxpc3QuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgIH1cblxuICAgIC8vIEFwcGVuZCBhbGwgbG9jYXRpb25zIHRvIHdhdGNobGlzdFxuICAgIGxldCBpID0gMFxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2VXYXRjaGxpc3QpXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBjcmVhdGVMaXN0aW5nKGxvY2F0aW9uLCBpKVxuICAgICAgICBpZiAobG9jYXRpb24uc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIEFQSUNpdHlTZWFyY2gobG9jYXRpb24ubmFtZSlcbiAgICAgICAgfVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgaSsrXG4gICAgfSlcbn1cblxuY29uc3Qgc3VibWl0TG9jYXRpb24gPSAoaW5wdXQpID0+IHtcbiAgICAvLyBjcmVhdGUgbG9jYXRpb24gb2JqZWN0XG4gICAgY29uc3QgbmV3TG9jYXRpb24gPSB7XG4gICAgICAgIG5hbWU6IGlucHV0LFxuICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICB9XG5cbiAgICAvLyBncmFiIGFycmF5IGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gZGVzZWxlY3QgcHJldmlvdXNseSBzZWxlY3RlZCBsb2NhdGlvblxuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gcHVzaCBsb2NhdGlvbiB0byBhcnJheVxuICAgIHN0b3JhZ2VXYXRjaGxpc3QucHVzaChuZXdMb2NhdGlvbilcblxuICAgIC8vIHNldCBhcnJheSBiYWNrIGludG8gc3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyByZWZyZXNoIHdhdGNobGlzdFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBkaXNwbGF5V2VhdGhlciA9IChuZXdXZWF0aGVyQ2FyZCkgPT4ge1xuICAgIC8vIGRpc3BsYXkgY29udGVudCB0aXRsZVxuICAgIGNvbnN0IGNvbnRlbnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50VGl0bGUnKVxuICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9IGAke25ld1dlYXRoZXJDYXJkLmNpdHl9LCAke25ld1dlYXRoZXJDYXJkLmNvdW50cnl9YFxuXG4gICAgLy8gZGlzcGxheSB3ZWF0aGVyIGljb25cbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7bmV3V2VhdGhlckNhcmQud2VhdGhlckljb259QDJ4LnBuZ2BcblxuICAgIC8vIGRpc3BsYXkgZGVzY3JpcHRpb25cbiAgICBjb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gYFdlYXRoZXI6ICR7bmV3V2VhdGhlckNhcmQud2VhdGhlckRlc2NyaXB0aW9ufWBcblxuICAgIC8vIGRpc3BsYXkgY3VycmVudCB0ZW1wZXJhdHVyZVxuICAgIGNvbnN0IHRlbXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcENvbnRhaW5lcicpXG4gICAgdGVtcENvbnRhaW5lci5pbm5lclRleHQgPSBgJHtNYXRoLnJvdW5kKG5ld1dlYXRoZXJDYXJkLnRlbXBDdXJyZW50KX1cXHUwMEIwYFxuXG4gICAgLy8gZGlzcGxheSBoaWdoL2xvdyB0ZW1wZXJhdHVyZXNcbiAgICBjb25zdCBsb3dUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvd1RlbXBDb250YWluZXInKVxuICAgIGxvd1RlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYExvdyB0ZW1wZXJhdHVyZTogJHtNYXRoLnJvdW5kKFxuICAgICAgICBuZXdXZWF0aGVyQ2FyZC50ZW1wTG93XG4gICAgKX1cXHUwMEIwYFxuICAgIGNvbnN0IGhpZ2hUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZ2hUZW1wQ29udGFpbmVyJylcbiAgICBoaWdoVGVtcENvbnRhaW5lci5pbm5lclRleHQgPSBgSGlnaCB0ZW1wZXJhdHVyZTogJHtNYXRoLnJvdW5kKFxuICAgICAgICBuZXdXZWF0aGVyQ2FyZC50ZW1wSGlnaFxuICAgICl9XFx1MDBCMGBcblxuICAgIC8vIGRpcGxheSBjdXJyZW50IHRpbWVcbiAgICBjb25zdCB0aW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVDb250YWluZXInKVxuICAgIHRpbWVDb250YWluZXIuaW5uZXJUZXh0ID0gYExvY2FsIHRpbWU6ICR7bmV3V2VhdGhlckNhcmQubG9jYWxEYXRlLmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQubG9jYWxEYXRlLmdldE1pbnV0ZXMoKX1gXG5cbiAgICAvLyBkaXNwbGF5IHN1bnJpc2Uvc3Vuc2V0IHRpbWVzXG4gICAgY29uc3Qgc3VucmlzZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdW5yaXNlQ29udGFpbmVyJylcbiAgICBzdW5yaXNlQ29udGFpbmVyLmlubmVyVGV4dCA9IGBTdW5yaXNlOiAke25ld1dlYXRoZXJDYXJkLnN1bnJpc2UuZ2V0SG91cnMoKX06JHtuZXdXZWF0aGVyQ2FyZC5zdW5yaXNlLmdldE1pbnV0ZXMoKX1gXG4gICAgY29uc3Qgc3Vuc2V0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1bnNldENvbnRhaW5lcicpXG4gICAgc3Vuc2V0Q29udGFpbmVyLmlubmVyVGV4dCA9IGBTdW5zZXQ6ICR7bmV3V2VhdGhlckNhcmQuc3Vuc2V0LmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQuc3Vuc2V0LmdldE1pbnV0ZXMoKX1gXG5cbiAgICAvLyBkaXNwbGF5IHdpbmRcbiAgICBjb25zdCB3aW5kQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmRDb250YWluZXInKVxuICAgIHdpbmRDb250YWluZXIuaW5uZXJUZXh0ID0gYFdpbmQ6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQud2luZFNwZWVkXG4gICAgKX1tcGgsICR7bmV3V2VhdGhlckNhcmQud2luZERpcmVjdGlvbn0gKCR7bmV3V2VhdGhlckNhcmQud2luZERlZ3JlZX1cXHUwMEIwKWBcblxuICAgIC8vIGRpc3BsYXkgaHVtaWRpdHlcbiAgICBjb25zdCBodW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eUNvbnRhaW5lcicpXG4gICAgaHVtaWRpdHlDb250YWluZXIuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAke25ld1dlYXRoZXJDYXJkLmh1bWlkaXR5fSVgXG59XG5cbmNvbnN0IGRpc3BsYXlGb3JlY2FzdCA9IChuZXdIb3VybHlGb3JlY2FzdEFycmF5KSA9PiB7XG4gICAgY29uc3QgZm9yZWNhc3RSb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9yZWNhc3RSb3cnKVxuXG4gICAgLy8gcmVtb3ZlIGFueSBmb3JlY2FzdCBjZWxsc1xuICAgIGNvbnN0IG9sZEZvcmVjYXN0ID0gZm9yZWNhc3RSb3cuY2hpbGRFbGVtZW50Q291bnRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZEZvcmVjYXN0OyBpKyspIHtcbiAgICAgICAgZm9yZWNhc3RSb3cuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgIH1cblxuICAgIC8vIEFkZCBuZXcgZm9yZWNhc3QgY2VsbHNcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0hvdXJseUZvcmVjYXN0QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgICAgICBmb3JlY2FzdENlbGwuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RDZWxsJylcblxuICAgICAgICAvLyBkaXNwbGF5IGRhdGVcbiAgICAgICAgY29uc3QgZm9yZWNhc3REYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0RGF0ZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdERhdGUnKVxuICAgICAgICBmb3JlY2FzdERhdGUuaW5uZXJUZXh0ID0gYCR7XG4gICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLmRhdGUuZ2V0TW9udGgoKSArIDFcbiAgICAgICAgfS8ke25ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0uZGF0ZS5nZXREYXRlKCl9YFxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3REYXRlKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgdGltZVxuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgZm9yZWNhc3RUaW1lLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0VGltZScpXG4gICAgICAgIGZvcmVjYXN0VGltZS5pbm5lclRleHQgPVxuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZygpXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbWUpXG5cbiAgICAgICAgLy8gZGlzcGxheSB3ZWF0aGVyIGljb25cbiAgICAgICAgY29uc3Qgd2VhdGhlckZvcmVjYXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgIHdlYXRoZXJGb3JlY2FzdEljb24uY2xhc3NMaXN0LmFkZCgnd2VhdGhlckZvcmVjYXN0SWNvbicpXG4gICAgICAgIHdlYXRoZXJGb3JlY2FzdEljb24uc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7bmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS53ZWF0aGVySWNvbn0ucG5nYFxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQod2VhdGhlckZvcmVjYXN0SWNvbilcblxuICAgICAgICAvLyBkaXNwbGF5IHdlYXRoZXIgZGVzY3JpcHRpb25cbiAgICAgICAgY29uc3QgZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24nKVxuICAgICAgICBmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbi5pbm5lclRleHQgPVxuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS53ZWF0aGVyRGVzY3JpcHRpb25cbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgZm9yZWNhc3QgdGVtcGVyYXR1cmVcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRlbXAnKVxuICAgICAgICBmb3JlY2FzdFRlbXAuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZChcbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0udGVtcGVyYXR1cmVcbiAgICAgICAgKX1cXHUwMEIwYFxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZW1wKVxuXG4gICAgICAgIGZvcmVjYXN0Um93LmFwcGVuZENoaWxkKGZvcmVjYXN0Q2VsbClcbiAgICB9XG59XG5cbmNvbnN0IHNlbGVjdExvY2F0aW9uID0gKGxpKSA9PiB7XG4gICAgLy8gZ3JhYiBsb2NhdGlvbnMgYXJyYXkgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBkZXNlbGVjdCBhbGwgbG9jYXRpb25zXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBTZWxlY3QgbG9jYXRpb24gaWYgb25lIGlzIGNob3NlbiAobWFpbiBtZW51IHNlbGVjdGlvbiBpcyBoYW5kbGVkIGluIGV2ZW50IGxpc3RlbmVyKVxuICAgIGlmIChsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2xvY2F0aW9uJykpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMb2NhdGlvbklkID0gbGkuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgICAgIHN0b3JhZ2VXYXRjaGxpc3Rbc2VsZWN0ZWRMb2NhdGlvbklkXS5zZWxlY3RlZCA9IHRydWVcbiAgICB9XG5cbiAgICAvLyBzZXQgbG9jYXRpb25zIGFycmF5IGJhY2sgaW50byBsb2NhbFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gcmVmcmVzaFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBjcmVhdGVBZGRCdXR0b24gPSAoY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnYWRkQnRuJylcbiAgICBhZGRCdG4uaW5uZXJUZXh0ID0gJ3NlYXJjaCdcbiAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdmFsaWRhdGVTZWFyY2goZSkpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZEJ0bilcbn1cblxuY29uc3QgY3JlYXRlQ2FuY2VsQnV0dG9uID0gKGNvbnRhaW5lciwgaSkgPT4ge1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ2NhbmNlbEJ0bicpXG4gICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG4gICAgY2FuY2VsQnRuLmlubmVyVGV4dCA9ICdjYW5jZWwnXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmNlbEJ0bilcbn1cblxuLy8gY3JlYXRlRm9ybVxuY29uc3QgY3JlYXRlRm9ybSA9IChmb3JtKSA9PiB7XG4gICAgLy8gcm93IG9uZTogYXNzaWduIGlucHV0XG4gICAgY29uc3QgZm9ybVJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LmNsYXNzTGlzdC5hZGQoJ25ld0xvY2F0aW9uSW5wdXQnKVxuICAgIG5ld0xvY2F0aW9uSW5wdXQucGxhY2Vob2xkZXIgPSAnRmxvcmVuY2UnXG4gICAgbmV3TG9jYXRpb25JbnB1dC5uYW1lID0gJ25ld0xvY2F0aW9uSW5wdXQnXG4gICAgZm9ybVJvdzEuYXBwZW5kQ2hpbGQobmV3TG9jYXRpb25JbnB1dClcblxuICAgIC8vIHJvdyB0d286IHN1Ym1pdCBhbmQgY2FuY2VsIGJ1dHRvbnNcbiAgICBjb25zdCBmb3JtUm93MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmb3JtUm93JylcbiAgICBmb3JtUm93Mi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zvcm1CdXR0b25zJylcbiAgICBjcmVhdGVBZGRCdXR0b24oZm9ybVJvdzIsIGZvcm0pXG4gICAgY3JlYXRlQ2FuY2VsQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuXG4gICAgLy8gcm93IHRocmVlOiBhc3NpZ24gZXJyb3IgY2xhc3MgYW5kIHRleHRcbiAgICBjb25zdCBmb3JtUm93MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9ybVJvdzMuc2V0QXR0cmlidXRlKCdjbGFzcycsICduZXdQcm9qRXJyb3JDb250YWluZXInKVxuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MSlcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cyKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzMpXG59XG5cbmNvbnN0IHNob3dGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZExvY2F0aW9uQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uQnRuJylcbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25Gb3JtJylcblxuICAgIGFkZExvY2F0aW9uQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdzaG93QmxvY2snKVxufVxuXG5jb25zdCBoaWRlRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRMb2NhdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkJ0bicpXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uRm9ybScpXG5cbiAgICBhZGRMb2NhdGlvbkJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Nob3dCbG9jaycpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbn1cblxuLy8gRGVsZXRlIHdhdGNobGlzdCBlbnRyeVxuY29uc3QgZGVsZXRlV2F0Y2hsaXN0RW50cnkgPSAoZSkgPT4ge1xuICAgIC8vIGdyYWIgYXJyYXlzIGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gSWRlbnRpZnkgZW50cnkgdG8gZGVsZXRlXG4gICAgY29uc3QgZG9vbWVkSW5kZXggPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJylcblxuICAgIC8vIGRlbGV0ZSBlbnRyeVxuICAgIHN0b3JhZ2VXYXRjaGxpc3Quc3BsaWNlKGRvb21lZEluZGV4LCAxKVxuXG4gICAgLy8gc2V0IGNoYW5nZXMgdG8gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIElmIGRvb21lZCBlbnRyeSB3YXMgc2VsZWN0ZWQsIGNsZWFyIGNvbnRlbnQgZGlzcGxheVxuXG4gICAgLy8gcmVmcmVzaCB3YXRjaGlzdFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBjcmVhdGVEZWxldGVJY29uID0gKGNvbnRhaW5lciwgaSkgPT4ge1xuICAgIC8vIGNyZWF0ZSBpbWFnZSBhbmQgYXNzaWduIGF0dHJpYnV0ZXNcbiAgICBjb25zdCBuZXdEZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdEZWxldGVJY29uLnNyYyA9IGRlbGV0ZUljb25cbiAgICBuZXdEZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbiBkZWxldGVJdGVtJylcbiAgICBuZXdEZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG5cbiAgICAvLyBBREQgRVZFTlQgTElTVEVORVJcbiAgICBpZiAoXG4gICAgICAgIGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdsb2NhdGlvbicgfHxcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnbG9jYXRpb24nKVxuICAgICkge1xuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lciB0byBkZWxldGUgbG9jYXRpb25cbiAgICAgICAgbmV3RGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgYGRlbGV0ZVdhdGNobGlzdEVudHJ5YCxcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gLFxuICAgICAgICAgICAgYGhpZGRlbmBcbiAgICAgICAgKVxuICAgICAgICBuZXdEZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+XG4gICAgICAgICAgICBkZWxldGVXYXRjaGxpc3RFbnRyeShlLCBpKVxuICAgICAgICApXG4gICAgICAgIC8vIGRpc3BsYXkgdHJhc2ggaWNvbiBvbiBob3ZlclxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICAgICAgLy8gaGlkZSB0cmFzaCBpY29uXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICBgLmRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHN0cmFuZ2UnKVxuICAgIH1cbiAgICAvLyBhcHBlbmQgdG8gY29udGFpbmVyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0RlbGV0ZUljb24pXG59XG5cbmNvbnN0IGNyZWF0ZUFkZGl0aW9uSWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IG5ld0FkZGl0aW9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3QWRkaXRpb25JY29uLnNyYyA9IGFkZGl0aW9uSWNvblxuICAgIG5ld0FkZGl0aW9uSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24nKVxuICAgIGxpLmFwcGVuZENoaWxkKG5ld0FkZGl0aW9uSWNvbilcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gT3BlbndlYXRoZXIgQVBJIEZ1bmN0aW9uc1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiB0b0RpcmVjdGlvbihkZWdyZWUpIHtcbiAgICBpZiAoZGVncmVlID4gMzM3LjUpIHJldHVybiAnTm9ydGgnXG4gICAgaWYgKGRlZ3JlZSA+IDI5Mi41KSByZXR1cm4gJ05vcnRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDI0Ny41KSByZXR1cm4gJ1dlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIwMi41KSByZXR1cm4gJ1NvdXRoIFdlc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDE1Ny41KSByZXR1cm4gJ1NvdXRoJ1xuICAgIGlmIChkZWdyZWUgPiAxMjIuNSkgcmV0dXJuICdTb3V0aCBFYXN0J1xuICAgIGlmIChkZWdyZWUgPiA2Ny41KSByZXR1cm4gJ0Vhc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDIyLjUpIHJldHVybiAnTm9ydGggRWFzdCdcbiAgICByZXR1cm4gJ05vcnRoJ1xufVxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MjM3NjExNS9ob3ctdG8tb2J0YWluLW9wZW4td2VhdGhlci1hcGktZGF0ZS10aW1lLWZyb20tY2l0eS1iZWluZy1mZXRjaGVkXG5jb25zdCBjYWxjQ3VycmVudFRpbWUgPSAodGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsVGltZSA9IGQuZ2V0VGltZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IGxvY2FsVGltZSArIGxvY2FsT2Zmc2V0XG4gICAgY29uc3QgbmV3Q2l0eSA9IHV0YyArIDEwMDAgKiB0aW1lem9uZVxuICAgIHJldHVybiBuZXcgRGF0ZShuZXdDaXR5KVxufVxuXG5jb25zdCBjYWxjU3VuVGltZSA9ICh0aW1lLCB0aW1lem9uZSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3QgbG9jYWxPZmZzZXQgPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMFxuICAgIGNvbnN0IHV0YyA9IHRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuY29uc3QgZmV0Y2hIb3VybHlGb3JlY2FzdCA9IChjaXR5UXVlcnkpID0+IHtcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG4gICAgLy8gZmV0Y2ggZml2ZSBkYXkvdGhyZWUgaG91ciBmb3JlY2FzdFxuICAgIGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCxcbiAgICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdEFycmF5ID0gW11cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0KSxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRleHQ6IHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0LFxuICAgICAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubGlzdFtpXS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgICAgICByYWluQ2hhbmNlOiByZXNwb25zZS5saXN0W2ldLnBvcCAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJJY29uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uaWNvbixcbiAgICAgICAgICAgICAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS5saXN0W2ldLndpbmQuZ3VzdCxcbiAgICAgICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS5saXN0W2ldLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXkucHVzaChuZXdIb3VybHlGb3JlY2FzdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0hvdXJseUZvcmVjYXN0QXJyYXkpXG4gICAgICAgICAgICBkaXNwbGF5Rm9yZWNhc3QobmV3SG91cmx5Rm9yZWNhc3RBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBuZXdIb3VybHlGb3JlY2FzdEFycmF5XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJ1xuICAgICAgICB9KVxufVxuXG5jb25zdCBmZXRjaEN1cnJlbnRXZWF0aGVyID0gKGNpdHlRdWVyeSwgZSkgPT4ge1xuICAgIC8vIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUltYWdlJylcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG5cbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCxcbiAgICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICBjb25zdCBuZXdXZWF0aGVyQ2FyZCA9IHtcbiAgICAgICAgICAgICAgICBjaXR5OiByZXNwb25zZS5uYW1lLFxuICAgICAgICAgICAgICAgIGNvdW50cnk6IHJlc3BvbnNlLnN5cy5jb3VudHJ5LFxuICAgICAgICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgIGxvY2FsRGF0ZTogY2FsY0N1cnJlbnRUaW1lKHJlc3BvbnNlLnRpbWV6b25lKSxcbiAgICAgICAgICAgICAgICBzdW5yaXNlOiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnJpc2UgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgc3Vuc2V0OiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnNldCAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnRpbWV6b25lXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0ZW1wQ3VycmVudDogcmVzcG9uc2UubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgIHRlbXBIaWdoOiByZXNwb25zZS5tYWluLnRlbXBfbWF4LFxuICAgICAgICAgICAgICAgIHRlbXBMb3c6IHJlc3BvbnNlLm1haW4udGVtcF9taW4sXG4gICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVySWNvbjogcmVzcG9uc2Uud2VhdGhlclswXS5pY29uLFxuICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLndpbmQuZGVnLFxuICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLndpbmQuZGVnKSxcbiAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLndpbmQuZ3VzdCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYFxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3V2VhdGhlckNhcmQpXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGRCdG4nKSA9PT0gdHJ1ZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3VibWl0TG9jYXRpb24oXG4gICAgICAgICAgICAgICAgICAgIGAke25ld1dlYXRoZXJDYXJkLmNpdHl9LCAke25ld1dlYXRoZXJDYXJkLmNvdW50cnl9YFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpc3BsYXlXZWF0aGVyKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgICAgICAgcmV0dXJuIG5ld1dlYXRoZXJDYXJkXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJ1xuICAgICAgICB9KVxufVxuXG5jb25zdCBBUElDaXR5U2VhcmNoID0gKGlucHV0LCBlKSA9PiB7XG4gICAgZmV0Y2hDdXJyZW50V2VhdGhlcihpbnB1dCwgZSlcbiAgICBmZXRjaEhvdXJseUZvcmVjYXN0KGlucHV0KVxufVxuXG5jb25zdCBhZGREZWZhdWx0Q29udGVudCA9ICgpID0+IHtcbiAgICBzdWJtaXRMb2NhdGlvbignU2FuIEZyYW5jaXNjbywgVVMnKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdTZWF0dGxlLCBVUycpXG4gICAgc3VibWl0TG9jYXRpb24oJ0hvbm9sdWx1LCBVUycpXG4gICAgc3VibWl0TG9jYXRpb24oJ0Zsb3JlbmNlLCBJVCcpXG4gICAgc3VibWl0TG9jYXRpb24oJ0Ftc3RlcmRhbSwgTkwnKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdQYXJpcywgRlInKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdUb2t5bywgSlAnKVxufVxuXG5jb25zdCB2YWxpZGF0ZVNlYXJjaCA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgLy8gZ3JhYiBkb20gZWxlbWVudHNcbiAgICBjb25zdCBuZXdMb2NhdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld0xvY2F0aW9uSW5wdXQnKVxuICAgIGNvbnN0IG5ld1Byb2pFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcubmV3UHJvakVycm9yQ29udGFpbmVyJ1xuICAgIClcbiAgICAvLyByZXNldCBlcnJvclxuICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnJ1xuICAgIC8vIGNoZWNrIGZvciBzZWFyY2ggdGVybVxuICAgIGlmIChuZXdMb2NhdGlvbklucHV0LnZhbHVlID09PSAnJykge1xuICAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ1doaWNoIGNpdHk/J1xuICAgIH0gZWxzZSB7XG4gICAgICAgIEFQSUNpdHlTZWFyY2gobmV3TG9jYXRpb25JbnB1dC52YWx1ZSwgZSlcbiAgICAgICAgaGlkZUZvcm0oKVxuICAgICAgICBuZXdMb2NhdGlvbklucHV0LnZhbHVlID0gJydcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgYWRkRGVmYXVsdENvbnRlbnQsXG4gICAgY3JlYXRlQWRkaXRpb25JY29uLFxuICAgIGNyZWF0ZURlbGV0ZUljb24sXG4gICAgY3JlYXRlRm9ybSxcbiAgICBjcmVhdGVNZW51SWNvbixcbiAgICBkaXNwbGF5V2F0Y2hsaXN0LFxuICAgIGhpZGVGb3JtLFxuICAgIHNob3dGb3JtLFxuICAgIHN1Ym1pdExvY2F0aW9uLFxuICAgIHZhbGlkYXRlU2VhcmNoLFxufVxuIiwiaW1wb3J0IHsgYWRkRGVmYXVsdENvbnRlbnQsIGRpc3BsYXlXYXRjaGxpc3QgfSBmcm9tICcuL2hlbHBlckZ1bmN0aW9ucydcblxuLy8gSW5pdGlhdGUgc3RvcmFnZSBhcnJheXMgaWYgbG9jYWxTdG9yYWdlIGlzIGVtcHR5XG5jb25zdCBpbml0aWF0ZVN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdEFycmF5ID0gW11cblxuICAgIGlmIChsb2NhbFN0b3JhZ2Uuc3RvcmFnZVdhdGNobGlzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgJ3N0b3JhZ2VXYXRjaGxpc3QnLFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdEFycmF5KVxuICAgICAgICApXG4gICAgICAgIGFkZERlZmF1bHRDb250ZW50KClcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpbnNlcnQgY29udGVudCBmcm9tIGxvY2FsIHN0b3JhZ2UgaWYgdGhlcmUgaXMgYW55XG4gICAgICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdGlhdGVTdG9yYWdlXG4iLCJpbXBvcnQgeyBjcmVhdGVBZGRpdGlvbkljb24sIGNyZWF0ZUZvcm0gfSBmcm9tICcuL2hlbHBlckZ1bmN0aW9ucydcbmltcG9ydCBnaXRodWJJY29uIGZyb20gJy4vYXNzZXRzL0dpdEh1Yi1saWdodC0zMnB4LnBuZydcbmltcG9ydCBsb2dvSWNvbiBmcm9tICcuL2Fzc2V0cy9sb2dvSWNvbi5zdmcnXG5cbmNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKVxuXG4gICAgLy8gZGlzcGxheSBsb2dvXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbG9nby5zcmMgPSBsb2dvSWNvblxuICAgIGxvZ28udGFyZ2V0ID0gJ19ibGFuaydcbiAgICBsb2dvLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbG9nbycpXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGxvZ28pXG5cbiAgICAvLyBkaXNwbGF5IHRpdGxlXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnV2VhdGhlcnNlcnZlJ1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSlcblxuICAgIHJldHVybiBoZWFkZXJcbn1cblxuY29uc3QgY3JlYXRlTWVudSA9ICgpID0+IHtcbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBtZW51LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWVudScpXG5cbiAgICAvLyBjcmVhdGUgd2F0Y2hsaXN0IGhlYWRlclxuICAgIGNvbnN0IHdhdGNobGlzdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIHdhdGNobGlzdEhlYWRlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdEhlYWRlcicpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnRleHRDb250ZW50ID0gJ1dhdGNobGlzdCdcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgbWVudVxuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICB3YXRjaGxpc3Quc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3QnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dhdGNobGlzdCcpXG5cbiAgICAvLyBHZW5lcmF0ZSBhZGQgbG9jYXRpb24gY29udGFpbmVyXG4gICAgY29uc3QgYWRkTG9jYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3QnKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGJ1dHRvblxuICAgIGNvbnN0IGFkZExvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGFkZExvY2F0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkTG9jYXRpb25CdG4nKVxuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbihhZGRMb2NhdGlvbilcbiAgICBjb25zdCBhZGRMb2NhdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBhZGRMb2NhdGlvblRleHQuaW5uZXJUZXh0ID0gJ0FkZCBMb2NhdGlvbidcbiAgICBhZGRMb2NhdGlvbi5hcHBlbmRDaGlsZChhZGRMb2NhdGlvblRleHQpXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb24pXG5cbiAgICAvLyBHZW5lcmF0ZSBhbmQgaGlkZSBuZXcgbG9jYXRpb24gZm9ybVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uRm9ybScpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBhZGRMb2NhdGlvbkZvcm0ubWV0aG9kID0gJ2dldCdcbiAgICBjcmVhdGVGb3JtKGFkZExvY2F0aW9uRm9ybSlcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkZvcm0pXG5cbiAgICBtZW51LmFwcGVuZENoaWxkKHdhdGNobGlzdEhlYWRlcilcbiAgICBtZW51LmFwcGVuZENoaWxkKHdhdGNobGlzdClcbiAgICBtZW51LmFwcGVuZENoaWxkKGFkZExvY2F0aW9uQ29udGFpbmVyKVxuXG4gICAgcmV0dXJuIG1lbnVcbn1cblxuY29uc3QgY3JlYXRlV2VhdGhlckNhcmQgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICAgIGNvbnN0IFdlYXRoZXJBUElDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50JylcblxuICAgIC8vIGNyZWF0ZSBBUEkgdGl0bGVcbiAgICBjb25zdCBBUElUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcbiAgICBBUElUaXRsZS5jbGFzc0xpc3QuYWRkKCdjb250ZW50VGl0bGUnKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSVRpdGxlKVxuXG4gICAgLy8gY3JlYXRlIEFQSSBpbWdcbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgQVBJSW1hZ2UuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2UnKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKEFQSUltYWdlKVxuXG4gICAgLy8gY3JlYXRlIGN1cnJlbnQgdGVtcCBjb250YWluZXJcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKVxuICAgIHRlbXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGVtcENvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQodGVtcENvbnRhaW5lcilcblxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpXG5cbiAgICAvLyBjcmVhdGUgZGVzY3JpcHRpb24gY29udGFpbmVyXG4gICAgY29uc3QgZGVzY3JpcHRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBkZXNjcmlwdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd3ZWF0aGVyRGVzY3JpcHRpb24nKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uQ29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIGxvdyB0ZW1wIGNvbnRhaW5lclxuICAgIGNvbnN0IGxvd1RlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBsb3dUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2xvd1RlbXBDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGxvd1RlbXBDb250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgaGlnaCB0ZW1wIGNvbnRhaW5lclxuICAgIGNvbnN0IGhpZ2hUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgaGlnaFRlbXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlnaFRlbXBDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGhpZ2hUZW1wQ29udGFpbmVyKVxuXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IHRpbWUgY29udGFpbmVyXG4gICAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHRpbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGltZUNvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQodGltZUNvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBzdW5yaXNlIGNvbnRhaW5lclxuICAgIGNvbnN0IHN1bnJpc2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBzdW5yaXNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1bnJpc2VDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHN1bnJpc2VDb250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgc3Vuc2V0IGNvbnRhaW5lclxuICAgIGNvbnN0IHN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHN1bnNldENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdW5zZXRDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHN1bnNldENvbnRhaW5lcilcblxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpXG5cbiAgICAvLyBjcmVhdGUgd2luZCBjb250YWluZXJcbiAgICBjb25zdCB3aW5kQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgd2luZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd3aW5kQ29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZCh3aW5kQ29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIGh1bWlkaXR5IGNvbnRhaW5lclxuICAgIGNvbnN0IGh1bWlkaXR5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgaHVtaWRpdHlDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaHVtaWRpdHlDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGh1bWlkaXR5Q29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIGZvcmVjYXN0IGNvbnRhaW5lclxuICAgIGNvbnN0IGZvcmVjYXN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXG4gICAgZm9yZWNhc3RUaXRsZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRpdGxlJylcbiAgICBmb3JlY2FzdFRpdGxlLmlubmVyVGV4dCA9ICdGaXZlIGRheSwgdGhyZWUgaG91ciBmb3JlY2FzdDonXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaXRsZSlcblxuICAgIGNvbnN0IGZvcmVjYXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JlY2FzdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdENvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RDb250YWluZXIpXG5cbiAgICBjb25zdCBmb3JlY2FzdFRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKVxuICAgIGZvcmVjYXN0VGFibGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUYWJsZScpXG4gICAgZm9yZWNhc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUYWJsZSlcblxuICAgIGNvbnN0IGZvcmVjYXN0Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuICAgIGZvcmVjYXN0Um93LmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Um93JylcbiAgICBmb3JlY2FzdFRhYmxlLmFwcGVuZENoaWxkKGZvcmVjYXN0Um93KVxuXG4gICAgLy8gbWFrZSBzY3JvbGx3aGVlbCBmdW5jdGlvbmFsIHdpdGggaG9yaXpvbnRhbCBzY3JvbGxpbmdcbiAgICBmb3JlY2FzdFJvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBmb3JlY2FzdFJvdy5zY3JvbGxMZWZ0ICs9IGUuZGVsdGFZXG4gICAgfSlcblxuICAgIHJldHVybiBXZWF0aGVyQVBJQ29udGFpbnRlclxufVxuXG5jb25zdCBjcmVhdGVDb250ZW50ID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBjb250ZW50IGNvbnRhaW5lclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29udGVudCcpXG5cbiAgICAvLyBkaXNwbGF5IHdlYXRoZXIgY2FyZFxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY3JlYXRlV2VhdGhlckNhcmQoKSlcblxuICAgIHJldHVybiBjb250ZW50XG59XG5cbmNvbnN0IGNyZWF0ZUZvb3RlciA9ICgpID0+IHtcbiAgICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb290ZXInKVxuXG4gICAgY29uc3QgY29weXJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgY29weXJpZ2h0LnRleHRDb250ZW50ID0gYENvcHlyaWdodCDCqSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gamNhbXBiZWxsNTdgXG5cbiAgICBjb25zdCBnaXRodWJMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgZ2l0aHViTGluay5ocmVmID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9qY2FtcGJlbGw1NydcbiAgICBnaXRodWJMaW5rLnRhcmdldCA9ICdfYmxhbmsnXG5cbiAgICBjb25zdCBuZXdHaXRodWJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdHaXRodWJJY29uLnNyYyA9IGdpdGh1Ykljb25cbiAgICBuZXdHaXRodWJJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZ2l0aHViJylcblxuICAgIGdpdGh1YkxpbmsuYXBwZW5kQ2hpbGQobmV3R2l0aHViSWNvbilcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoY29weXJpZ2h0KVxuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChnaXRodWJMaW5rKVxuXG4gICAgcmV0dXJuIGZvb3RlclxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlSGVhZGVyKCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVNZW51KCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVDb250ZW50KCkpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVGb290ZXIoKSlcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvcmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBQYWdlIHN0eWxpbmcgKi9cXG5cXG46cm9vdCB7XFxuICAgIC0tcGFuZWw6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42NSk7XFxuICAgIC0tYWNjZW50OiByb3lhbGJsdWU7XFxuICAgIC0tYmFja2dyb3VuZDogcmdiKDAsIDEwLCAzOSk7XFxuICAgIC0td2hpdGUtaXNoOiB3aGl0ZXNtb2tlO1xcbiAgICAtLWVycm9yOiBkYXJrcmVkO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgLyogc3lzdGVtIGZvbnQgc3RhY2sgKi9cXG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLFxcbiAgICAgICAgT3h5Z2VuLVNhbnMsIFVidW50dSwgQ2FudGFyZWxsLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kKTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAyNTBweCBjYWxjKDEwMHZ3IC0gMjUwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDExMHB4IGNhbGMoMTAwdmggLSAxMTBweCAtIDYycHgpIDYycHg7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgbWF4LXdpZHRoOiAxMDB2dztcXG4gICAgbWF4LWhlaWdodDogMTAwdmg7XFxufVxcblxcbi8qIFNjcm9sbGJhciBzdHlsaW5nICovXFxuXFxuOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICAgIHdpZHRoOiAxMnB4O1xcbiAgICBoZWlnaHQ6IDEycHg7XFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjazpob3ZlciB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyMCwgMjAsIDIwLCAwLjIpO1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXG4gICAgLyogYmFja2dyb3VuZDogdmFyKC0tbWVudS1jb2xvcik7ICAqL1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjAsIDIwLCAyMCwgMC4yNSk7XFxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNCk7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNik7XFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6YWN0aXZlIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDIwLCAyMCwgMjAsIDAuMik7XFxufVxcblxcbi8qIEdlbmVyYWwgc3R5bGluZyAqL1xcblxcbmgxIHtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbmgyIHtcXG4gICAgZm9udC1zaXplOiAxLjE1ZW07XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgIG1hcmdpbi10b3A6IDAuODNlbTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMC44M2VtO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI2hpZGRlbiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNzaG93QmxvY2sge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyogSGVhZGVyIHN0eWxpbmcgKi9cXG5cXG4ubG9nbyB7XFxuICAgIG1heC1oZWlnaHQ6IDkwJTtcXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XFxuICAgIC8qIHdoaXRlc21va2UgY29sb3IgKi9cXG4gICAgZmlsdGVyOiBpbnZlcnQoMTAwJSkgc2VwaWEoMCUpIHNhdHVyYXRlKDc0ODAlKSBodWUtcm90YXRlKDIwMWRlZylcXG4gICAgICAgIGJyaWdodG5lc3MoMTA3JSkgY29udHJhc3QoOTIlKTtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgY29sb3I6IHZhcigtLXdoaXRlLWlzaCk7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi8qIE1lbnUgc3R5bGluZyAqL1xcblxcbi5tZW51IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGFuZWwpO1xcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbn1cXG5cXG4ubWVudSA+IHVsLndhdGNobGlzdCB7XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbi5pY29uIHtcXG4gICAgaGVpZ2h0OiAxLjJyZW07XFxufVxcblxcbi53YXRjaGxpc3Qge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4ud2F0Y2hsaXN0ID4gbGkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDhweDtcXG59XFxuXFxuLndhdGNobGlzdEhlYWRlciB7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIGZvbnQtc2l6ZTogMS4zcmVtO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpLFxcbi53YXRjaGxpc3RIZWFkZXIsXFxuLmFkZExvY2F0aW9uQnRuLFxcbi5hZGRMb2NhdGlvbkZvcm0ge1xcbiAgICBtYXJnaW46IDEwcHggMXJlbTtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbiN3YXRjaGxpc3Qge1xcbiAgICBtYXgtaGVpZ2h0OiA4MCU7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpOmhvdmVyLFxcbi5hZGRMb2NhdGlvbkJ0bjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDI0NSwgMjQ1LCAwLjMpO1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpOmFjdGl2ZSxcXG4uYWRkTG9jYXRpb25CdG46YWN0aXZlIHtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbmxpLnNlbGVjdGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUsIDAuMyk7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjIpO1xcbn1cXG5cXG4uZGVsZXRlSXRlbSB7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cXG5cXG4uZGVsZXRlSXRlbTpob3ZlciB7XFxuICAgIGZpbHRlcjogaW52ZXJ0KDclKSBzZXBpYSg1MSUpIHNhdHVyYXRlKDU5NTElKSBodWUtcm90YXRlKDM1MGRlZylcXG4gICAgICAgIGJyaWdodG5lc3MoMTQwJSkgY29udHJhc3QoMTM2JSk7XFxufVxcblxcbi8qIEZvcm0gc3R5bGluZyAqL1xcblxcbi5hZGRMb2NhdGlvbkZvcm0ge1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4uZm9ybVJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBnYXA6IDhweDtcXG59XFxuXFxuI2Zvcm1CdXR0b25zIHtcXG4gICAgbWFyZ2luLXRvcDogOHB4O1xcbn1cXG5cXG4ubmV3TG9jYXRpb25JbnB1dCB7XFxuICAgIHBhZGRpbmc6IDZweDtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLmFkZEJ0bixcXG4uY2FuY2VsQnRuIHtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgZm9udC13ZWlnaHQ6IDU1MDtcXG59XFxuXFxuLmFkZEJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudCk7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGhzbCgyMjUsIDczJSwgMzAlKTtcXG59XFxuXFxuLmNhbmNlbEJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IG1lZGl1bXZpb2xldHJlZDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgaHNsKDMyMiwgODElLCAzMCUpO1xcbn1cXG5cXG4uYWRkQnRuOmhvdmVyLFxcbi5jYW5jZWxCdG46aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYWRkQnRuOmFjdGl2ZSxcXG4uY2FuY2VsQnRuOmFjdGl2ZSB7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4ubmV3UHJvakVycm9yQ29udGFpbmVyIHtcXG4gICAgY29sb3I6IHZhcigtLWVycm9yKTtcXG4gICAgZm9udC1zaXplOiAxLjFyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogOHB4O1xcbn1cXG5cXG4vKiBDb250ZW50IHN0eWxpbmcgKi9cXG5cXG4uY29udGVudCB7XFxuICAgIG1hcmdpbjogMCAwLjVyZW07XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICBtYXgtd2lkdGg6IDEwMDBweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi5XZWF0aGVyQVBJQ29udGFpbnRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMC41cmVtO1xcbiAgICBtYXJnaW46IDByZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBhbmVsKTtcXG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uZm9yZWNhc3RDb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDk1JTtcXG59XFxuXFxuLmZvcmVjYXN0VGFibGUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZm9yZWNhc3RSb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDAuNXJlbTtcXG4gICAgLyogb3ZlcmZsb3cteTogaGlkZGVuOyAqL1xcbiAgICBtaW4taGVpZ2h0OiAxNzBweDtcXG4gICAgLyogZW5hYmxlIGhvcml6b250YWwgc2Nyb2xsICovXFxuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcXG59XFxuXFxuLyogaGlkZSBzY3JvbGxiYXIsIHJldGFpbiBmdW5jdGlvbiAqL1xcbi8qIC5mb3JlY2FzdFJvdzo6LXdlYmtpdC1zY3JvbGxiYXIgeyAqL1xcbi8qIGRpc3BsYXk6IG5vbmU7ICovXFxuLyogfSAqL1xcblxcbi5mb3JlY2FzdENlbGwge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDAuMjVyZW07XFxuICAgIG1pbi13aWR0aDogMTUwcHg7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgLyogbWluLXdpZHRoOiBtYXgtY29udGVudDsgKi9cXG59XFxuXFxuLyogRm9vdGVyIHN0eWxpbmcgKi9cXG5cXG5mb290ZXIge1xcbiAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTsgKi9cXG4gICAgY29sb3I6IHZhcigtLXdoaXRlLWlzaCk7XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5mb290ZXIgPiBhIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmdpdGh1YiB7XFxuICAgIGhlaWdodDogMjRweDtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5naXRodWI6aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKSBzY2FsZSgxLjIpO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGlCQUFpQjs7QUFFakI7SUFDSSxrQ0FBa0M7SUFDbEMsbUJBQW1CO0lBQ25CLDRCQUE0QjtJQUM1Qix1QkFBdUI7SUFDdkIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCO29FQUNnRTtJQUNoRSxtQ0FBbUM7SUFDbkMsYUFBYTtJQUNiLGdEQUFnRDtJQUNoRCx5REFBeUQ7SUFDekQsU0FBUztJQUNULHNCQUFzQjtJQUN0QixnQkFBZ0I7SUFDaEIsaUJBQWlC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QWE7SUFDYixXQUFXO0lBQ1gsd0JBQXdCO0lBQ3hCLGlCQUFpQjtJQUNqQiw2QkFBNkI7SUFDN0Isa0JBQWtCO0FBQ3RCOztBQUVBLG9DQUFvQztBQUNwQyxzQ0FBc0M7QUFDdEMsbUJBQW1CO0FBQ25CLE1BQU07O0FBRU47SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWiw0QkFBNEI7QUFDaEM7O0FBRUEsbUJBQW1COztBQUVuQjtJQUNJLG1CQUFtQjtJQUNuQiwrQ0FBK0M7SUFDL0MsdUJBQXVCO0lBQ3ZCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixTQUFTO0lBQ1Qsc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixzQ0FBc0M7QUFDMUM7O0FBRUE7SUFDSSxxQ0FBcUM7QUFDekNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogUGFnZSBzdHlsaW5nICovXFxuXFxuOnJvb3Qge1xcbiAgICAtLXBhbmVsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNjUpO1xcbiAgICAtLWFjY2VudDogcm95YWxibHVlO1xcbiAgICAtLWJhY2tncm91bmQ6IHJnYigwLCAxMCwgMzkpO1xcbiAgICAtLXdoaXRlLWlzaDogd2hpdGVzbW9rZTtcXG4gICAgLS1lcnJvcjogZGFya3JlZDtcXG59XFxuXFxuYm9keSB7XFxuICAgIC8qIHN5c3RlbSBmb250IHN0YWNrICovXFxuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90byxcXG4gICAgICAgIE94eWdlbi1TYW5zLCBVYnVudHUsIENhbnRhcmVsbCwgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZCk7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjUwcHggY2FsYygxMDB2dyAtIDI1MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMTBweCBjYWxjKDEwMHZoIC0gMTEwcHggLSA2MnB4KSA2MnB4O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG1heC13aWR0aDogMTAwdnc7XFxuICAgIG1heC1oZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4vKiBTY3JvbGxiYXIgc3R5bGluZyAqL1xcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgICB3aWR0aDogMTJweDtcXG4gICAgaGVpZ2h0OiAxMnB4O1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2s6aG92ZXIge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjAsIDIwLCAyMCwgMC4yKTtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XFxuICAgIC8qIGJhY2tncm91bmQ6IHZhcigtLW1lbnUtY29sb3IpOyAgKi9cXG4gICAgYmFja2dyb3VuZDogcmdiKDIwLCAyMCwgMjAsIDAuMjUpO1xcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDZweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNik7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmFjdGl2ZSB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyMCwgMjAsIDIwLCAwLjIpO1xcbn1cXG5cXG4vKiBHZW5lcmFsIHN0eWxpbmcgKi9cXG5cXG5oMSB7XFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG5oMiB7XFxuICAgIGZvbnQtc2l6ZTogMS4xNWVtO1xcbiAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICBtYXJnaW4tdG9wOiAwLjgzZW07XFxuICAgIG1hcmdpbi1ib3R0b206IDAuODNlbTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNoaWRkZW4ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jc2hvd0Jsb2NrIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qIEhlYWRlciBzdHlsaW5nICovXFxuXFxuLmxvZ28ge1xcbiAgICBtYXgtaGVpZ2h0OiA5MCU7XFxuICAgIG1hcmdpbi1yaWdodDogOHB4O1xcbiAgICAvKiB3aGl0ZXNtb2tlIGNvbG9yICovXFxuICAgIGZpbHRlcjogaW52ZXJ0KDEwMCUpIHNlcGlhKDAlKSBzYXR1cmF0ZSg3NDgwJSkgaHVlLXJvdGF0ZSgyMDFkZWcpXFxuICAgICAgICBicmlnaHRuZXNzKDEwNyUpIGNvbnRyYXN0KDkyJSk7XFxufVxcblxcbmhlYWRlciB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZS1pc2gpO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4vKiBNZW51IHN0eWxpbmcgKi9cXG5cXG4ubWVudSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBhbmVsKTtcXG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG59XFxuXFxuLm1lbnUgPiB1bC53YXRjaGxpc3Qge1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG4uaWNvbiB7XFxuICAgIGhlaWdodDogMS4ycmVtO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuLndhdGNobGlzdCA+IGxpIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA4cHg7XFxufVxcblxcbi53YXRjaGxpc3RIZWFkZXIge1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICBmb250LXNpemU6IDEuM3JlbTtcXG59XFxuXFxuLndhdGNobGlzdCBsaSxcXG4ud2F0Y2hsaXN0SGVhZGVyLFxcbi5hZGRMb2NhdGlvbkJ0bixcXG4uYWRkTG9jYXRpb25Gb3JtIHtcXG4gICAgbWFyZ2luOiAxMHB4IDFyZW07XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbn1cXG5cXG4jd2F0Y2hsaXN0IHtcXG4gICAgbWF4LWhlaWdodDogODAlO1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLndhdGNobGlzdCBsaTpob3ZlcixcXG4uYWRkTG9jYXRpb25CdG46aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAyNDUsIDI0NSwgMC4zKTtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuMik7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLndhdGNobGlzdCBsaTphY3RpdmUsXFxuLmFkZExvY2F0aW9uQnRuOmFjdGl2ZSB7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG5saS5zZWxlY3RlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDI0NSwgMjQ1LCAwLjMpO1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG59XFxuXFxuLmRlbGV0ZUl0ZW0ge1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG59XFxuXFxuLmRlbGV0ZUl0ZW06aG92ZXIge1xcbiAgICBmaWx0ZXI6IGludmVydCg3JSkgc2VwaWEoNTElKSBzYXR1cmF0ZSg1OTUxJSkgaHVlLXJvdGF0ZSgzNTBkZWcpXFxuICAgICAgICBicmlnaHRuZXNzKDE0MCUpIGNvbnRyYXN0KDEzNiUpO1xcbn1cXG5cXG4vKiBGb3JtIHN0eWxpbmcgKi9cXG5cXG4uYWRkTG9jYXRpb25Gb3JtIHtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuLmZvcm1Sb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgZ2FwOiA4cHg7XFxufVxcblxcbiNmb3JtQnV0dG9ucyB7XFxuICAgIG1hcmdpbi10b3A6IDhweDtcXG59XFxuXFxuLm5ld0xvY2F0aW9uSW5wdXQge1xcbiAgICBwYWRkaW5nOiA2cHg7XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi5hZGRCdG4sXFxuLmNhbmNlbEJ0biB7XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICBmb250LXNpemU6IDEuMXJlbTtcXG4gICAgY29sb3I6IHZhcigtLXdoaXRlLWlzaCk7XFxuICAgIGZvbnQtd2VpZ2h0OiA1NTA7XFxufVxcblxcbi5hZGRCdG4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQpO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBoc2woMjI1LCA3MyUsIDMwJSk7XFxufVxcblxcbi5jYW5jZWxCdG4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtZWRpdW12aW9sZXRyZWQ7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGhzbCgzMjIsIDgxJSwgMzAlKTtcXG59XFxuXFxuLmFkZEJ0bjpob3ZlcixcXG4uY2FuY2VsQnRuOmhvdmVyIHtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuMik7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmFkZEJ0bjphY3RpdmUsXFxuLmNhbmNlbEJ0bjphY3RpdmUge1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxuLm5ld1Byb2pFcnJvckNvbnRhaW5lciB7XFxuICAgIGNvbG9yOiB2YXIoLS1lcnJvcik7XFxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDhweDtcXG59XFxuXFxuLyogQ29udGVudCBzdHlsaW5nICovXFxuXFxuLmNvbnRlbnQge1xcbiAgICBtYXJnaW46IDAgMC41cmVtO1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgbWF4LXdpZHRoOiAxMDAwcHg7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4uV2VhdGhlckFQSUNvbnRhaW50ZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDAuNXJlbTtcXG4gICAgbWFyZ2luOiAwcmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wYW5lbCk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLmZvcmVjYXN0Q29udGFpbmVyIHtcXG4gICAgbWF4LXdpZHRoOiA5NSU7XFxufVxcblxcbi5mb3JlY2FzdFRhYmxlIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmZvcmVjYXN0Um93IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiAwLjVyZW07XFxuICAgIC8qIG92ZXJmbG93LXk6IGhpZGRlbjsgKi9cXG4gICAgbWluLWhlaWdodDogMTcwcHg7XFxuICAgIC8qIGVuYWJsZSBob3Jpem9udGFsIHNjcm9sbCAqL1xcbiAgICBvdmVyZmxvdy14OiBzY3JvbGw7XFxufVxcblxcbi8qIGhpZGUgc2Nyb2xsYmFyLCByZXRhaW4gZnVuY3Rpb24gKi9cXG4vKiAuZm9yZWNhc3RSb3c6Oi13ZWJraXQtc2Nyb2xsYmFyIHsgKi9cXG4vKiBkaXNwbGF5OiBub25lOyAqL1xcbi8qIH0gKi9cXG5cXG4uZm9yZWNhc3RDZWxsIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAwLjI1cmVtO1xcbiAgICBtaW4td2lkdGg6IDE1MHB4O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIC8qIG1pbi13aWR0aDogbWF4LWNvbnRlbnQ7ICovXFxufVxcblxcbi8qIEZvb3RlciBzdHlsaW5nICovXFxuXFxuZm9vdGVyIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7ICovXFxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZS1pc2gpO1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMTBweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuZm9vdGVyID4gYSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5naXRodWIge1xcbiAgICBoZWlnaHQ6IDI0cHg7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4uZ2l0aHViOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZykgc2NhbGUoMS4yKTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yZXNldC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Jlc2V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3Jlc2V0LmNzcydcbmltcG9ydCAnLi9zdHlsZS5jc3MnXG5pbXBvcnQgaW5pdGlhbGl6ZSBmcm9tICcuL3BhZ2VMb2FkZXInXG5pbXBvcnQgaW5pdGlhdGVTdG9yYWdlIGZyb20gJy4vbG9jYWxTdG9yYWdlJ1xuaW1wb3J0IHsgc2hvd0Zvcm0sIGhpZGVGb3JtIH0gZnJvbSAnLi9oZWxwZXJGdW5jdGlvbnMnXG5cbmluaXRpYWxpemUoKVxuaW5pdGlhdGVTdG9yYWdlKClcblxuLy8gR3JhYiBET00gZWxlbWVudHNcbmNvbnN0IGFkZExvY2F0aW9uQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uQnRuJylcbmNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWxCdG4nKVxuXG4vLyBFdmVudCBsaXN0ZW5lcnNcbmFkZExvY2F0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0Zvcm0pXG5cbmNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaGlkZUZvcm0oKVxufSlcbiJdLCJuYW1lcyI6WyJhZGRpdGlvbkljb24iLCJkZWxldGVJY29uIiwibWVudUljb24iLCJkb2N1bWVudCIsImNvb2tpZSIsImNyZWF0ZU1lbnVJY29uIiwibGkiLCJjaGVja2xpc3RJY29uIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlTGlzdGluZyIsImxvY2F0aW9uTmFtZSIsImkiLCJ3YXRjaGxpc3QiLCJxdWVyeVNlbGVjdG9yIiwibG9jYXRpb24iLCJjbGFzc0xpc3QiLCJhZGQiLCJzZWxlY3RlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJzZWxlY3RMb2NhdGlvbiIsImxvY2F0aW9uVGV4dCIsInRleHRDb250ZW50IiwibmFtZSIsImNyZWF0ZURlbGV0ZUljb24iLCJkaXNwbGF5V2F0Y2hsaXN0Iiwib2xkTGlzdGluZ0NvdW50IiwiY2hpbGRFbGVtZW50Q291bnQiLCJmaXJzdENoaWxkIiwicmVtb3ZlIiwic3RvcmFnZVdhdGNobGlzdCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJmb3JFYWNoIiwiQVBJQ2l0eVNlYXJjaCIsInN1Ym1pdExvY2F0aW9uIiwiaW5wdXQiLCJuZXdMb2NhdGlvbiIsInB1c2giLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGlzcGxheVdlYXRoZXIiLCJuZXdXZWF0aGVyQ2FyZCIsImNvbnRlbnRUaXRsZSIsImNpdHkiLCJjb3VudHJ5IiwiQVBJSW1hZ2UiLCJ3ZWF0aGVySWNvbiIsIndlYXRoZXJEZXNjcmlwdGlvbiIsImlubmVyVGV4dCIsInRlbXBDb250YWluZXIiLCJNYXRoIiwicm91bmQiLCJ0ZW1wQ3VycmVudCIsImxvd1RlbXBDb250YWluZXIiLCJ0ZW1wTG93IiwiaGlnaFRlbXBDb250YWluZXIiLCJ0ZW1wSGlnaCIsInRpbWVDb250YWluZXIiLCJsb2NhbERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJzdW5yaXNlQ29udGFpbmVyIiwic3VucmlzZSIsInN1bnNldENvbnRhaW5lciIsInN1bnNldCIsIndpbmRDb250YWluZXIiLCJ3aW5kU3BlZWQiLCJ3aW5kRGlyZWN0aW9uIiwid2luZERlZ3JlZSIsImh1bWlkaXR5Q29udGFpbmVyIiwiaHVtaWRpdHkiLCJkaXNwbGF5Rm9yZWNhc3QiLCJuZXdIb3VybHlGb3JlY2FzdEFycmF5IiwiZm9yZWNhc3RSb3ciLCJvbGRGb3JlY2FzdCIsImxlbmd0aCIsImZvcmVjYXN0Q2VsbCIsImZvcmVjYXN0RGF0ZSIsImRhdGUiLCJnZXRNb250aCIsImdldERhdGUiLCJmb3JlY2FzdFRpbWUiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJ3ZWF0aGVyRm9yZWNhc3RJY29uIiwiZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24iLCJmb3JlY2FzdFRlbXAiLCJ0ZW1wZXJhdHVyZSIsInNlbGVjdGVkTG9jYXRpb25JZCIsImdldEF0dHJpYnV0ZSIsImNyZWF0ZUFkZEJ1dHRvbiIsImNvbnRhaW5lciIsImFkZEJ0biIsInZhbGlkYXRlU2VhcmNoIiwiY3JlYXRlQ2FuY2VsQnV0dG9uIiwiY2FuY2VsQnRuIiwiY3JlYXRlRm9ybSIsImZvcm0iLCJmb3JtUm93MSIsIm5ld0xvY2F0aW9uSW5wdXQiLCJwbGFjZWhvbGRlciIsImZvcm1Sb3cyIiwiZm9ybVJvdzMiLCJzaG93Rm9ybSIsImFkZExvY2F0aW9uQnRuIiwiYWRkTG9jYXRpb25Gb3JtIiwiaGlkZUZvcm0iLCJkZWxldGVXYXRjaGxpc3RFbnRyeSIsImRvb21lZEluZGV4Iiwic3BsaWNlIiwibmV3RGVsZXRlSWNvbiIsInRyYXNoSWNvbiIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVBZGRpdGlvbkljb24iLCJuZXdBZGRpdGlvbkljb24iLCJ0b0RpcmVjdGlvbiIsImRlZ3JlZSIsImNhbGNDdXJyZW50VGltZSIsInRpbWV6b25lIiwiZCIsIkRhdGUiLCJsb2NhbFRpbWUiLCJnZXRUaW1lIiwibG9jYWxPZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsInV0YyIsIm5ld0NpdHkiLCJjYWxjU3VuVGltZSIsInRpbWUiLCJmZXRjaEhvdXJseUZvcmVjYXN0IiwiY2l0eVF1ZXJ5IiwibmV3UHJvakVycm9yQ29udGFpbmVyIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm5ld0hvdXJseUZvcmVjYXN0IiwibGlzdCIsImR0X3R4dCIsImRhdGVUZXh0IiwibWFpbiIsInJhaW5DaGFuY2UiLCJwb3AiLCJ0ZW1wIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXIiLCJkZXNjcmlwdGlvbiIsImljb24iLCJ3aW5kIiwiZGVnIiwid2luZEd1c3QiLCJndXN0Iiwic3BlZWQiLCJjYXRjaCIsImVyciIsImZldGNoQ3VycmVudFdlYXRoZXIiLCJzeXMiLCJ0ZW1wX21heCIsInRlbXBfbWluIiwidW5kZWZpbmVkIiwiYWRkRGVmYXVsdENvbnRlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwiaW5pdGlhdGVTdG9yYWdlIiwic3RvcmFnZVdhdGNobGlzdEFycmF5IiwiZ2l0aHViSWNvbiIsImxvZ29JY29uIiwiY3JlYXRlSGVhZGVyIiwiaGVhZGVyIiwibG9nbyIsInRpdGxlIiwiY3JlYXRlTWVudSIsIm1lbnUiLCJ3YXRjaGxpc3RIZWFkZXIiLCJhZGRMb2NhdGlvbkNvbnRhaW5lciIsImFkZExvY2F0aW9uIiwiYWRkTG9jYXRpb25UZXh0IiwibWV0aG9kIiwiY3JlYXRlV2VhdGhlckNhcmQiLCJXZWF0aGVyQVBJQ29udGFpbnRlciIsIkFQSVRpdGxlIiwiZGVzY3JpcHRpb25Db250YWluZXIiLCJmb3JlY2FzdFRpdGxlIiwiZm9yZWNhc3RDb250YWluZXIiLCJmb3JlY2FzdFRhYmxlIiwic2Nyb2xsTGVmdCIsImRlbHRhWSIsImNyZWF0ZUNvbnRlbnQiLCJjb250ZW50IiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiY29weXJpZ2h0IiwiZ2V0RnVsbFllYXIiLCJnaXRodWJMaW5rIiwiaHJlZiIsIm5ld0dpdGh1Ykljb24iLCJpbml0aWFsaXplIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=