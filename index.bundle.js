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
___CSS_LOADER_EXPORT___.push([module.id, "/* Page styling */\n\n:root {\n    --panel: rgba(255, 255, 255, 0.65);\n    --accent: royalblue;\n    --background: rgb(0, 10, 39);\n    --white-ish: whitesmoke;\n    --error: darkred;\n}\n\nbody {\n    /* system font stack */\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;\n    background-color: var(--background);\n    display: grid;\n    grid-template-columns: 250px calc(100vw - 250px);\n    grid-template-rows: 110px calc(100vh - 110px - 62px) 62px;\n    margin: 0;\n    box-sizing: border-box;\n    max-width: 100vw;\n    max-height: 100vh;\n}\n\n/* Scrollbar styling */\n\n::-webkit-scrollbar {\n    width: 12px;\n    height: 12px;\n}\n\n::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    -webkit-border-radius: 6px;\n    border-radius: 6px;\n}\n\n::-webkit-scrollbar-track:hover {\n    border: 1px solid rgb(20, 20, 20, 0.2);\n}\n\n::-webkit-scrollbar-thumb {\n    /* background: var(--menu-color);  */\n    background: rgb(20, 20, 20, 0.25);\n    -webkit-border-radius: 6px;\n    border-radius: 6px;\n    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4);\n    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4);\n}\n\n::-webkit-scrollbar-thumb:hover {\n    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.6);\n    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.6);\n}\n\n::-webkit-scrollbar-thumb:active {\n    border: 1px solid rgb(20, 20, 20, 0.2);\n}\n\n/* General styling */\n\nh1 {\n    font-size: 2em;\n    font-weight: bolder;\n}\n\nh2 {\n    font-size: 1.15em;\n    font-weight: 500;\n    margin-top: 0.83em;\n    margin-bottom: 0.83em;\n}\n\n.hidden {\n    display: none;\n}\n\n#hidden {\n    display: none;\n}\n\n#showBlock {\n    display: block;\n}\n\n/* Header styling */\n\n.logo {\n    max-height: 90%;\n    margin-right: 8px;\n    /* whitesmoke color */\n    filter: invert(100%) sepia(0%) saturate(7480%) hue-rotate(201deg)\n        brightness(107%) contrast(92%);\n}\n\nheader {\n    grid-column: 1 / -1;\n    color: var(--white-ish);\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    box-sizing: border-box;\n}\n\n/* Menu styling */\n\n.menu {\n    background-color: var(--panel);\n    border-radius: 1rem;\n    margin-left: 0.5rem;\n}\n\n.menu > ul.watchlist {\n    margin-top: 20px;\n}\n\n.icon {\n    height: 1.2rem;\n}\n\n.watchlist {\n    list-style: none;\n    padding: 0;\n}\n\n.watchlist > li {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.watchlistHeader {\n    font-weight: 700;\n    font-size: 1.3rem;\n}\n\n.watchlist li,\n.watchlistHeader,\n.addLocationBtn,\n.addLocationForm {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n#watchlist {\n    max-height: 80%;\n    overflow: auto;\n}\n\n.watchlist li:hover,\n.addLocationBtn:hover {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.watchlist li:active,\n.addLocationBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\nli.selected {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n}\n\n.deleteItem {\n    margin-left: auto;\n}\n\n.deleteItem:hover {\n    filter: invert(7%) sepia(51%) saturate(5951%) hue-rotate(350deg)\n        brightness(140%) contrast(136%);\n}\n\n/* Form styling */\n\n.addLocationForm {\n    padding: 0;\n}\n\n.formRow {\n    display: flex;\n    justify-content: space-around;\n    gap: 8px;\n}\n\n#formButtons {\n    margin-top: 8px;\n}\n\n.newLocationInput {\n    padding: 6px;\n    font-size: 1.2rem;\n    width: 100%;\n    border: none;\n    border-radius: 8px;\n    box-sizing: border-box;\n}\n\n.addBtn,\n.cancelBtn {\n    padding: 8px;\n    width: 50%;\n    border-radius: 8px;\n    font-size: 1.1rem;\n    color: var(--white-ish);\n    font-weight: 550;\n}\n\n.addBtn {\n    background-color: var(--accent);\n    border: 2px solid hsl(225, 73%, 30%);\n}\n\n.cancelBtn {\n    background-color: mediumvioletred;\n    border: 2px solid hsl(322, 81%, 30%);\n}\n\n.addBtn:hover,\n.cancelBtn:hover {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.addBtn:active,\n.cancelBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\n.newProjErrorContainer {\n    color: var(--error);\n    font-size: 1.1rem;\n    text-align: center;\n    padding: 8px;\n}\n\n/* Content styling */\n\n.content {\n    margin: 0 0.5rem;\n    font-size: 1.2rem;\n    max-width: 1000px;\n    box-sizing: border-box;\n    overflow: auto;\n}\n\n.WeatherAPIContainter {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.4rem;\n    margin: 0rem;\n    background-color: var(--panel);\n    border-radius: 1rem;\n    height: 100%;\n}\n\n.contentTitle {\n    margin-bottom: unset;\n}\n\n.tempContainer {\n    margin-bottom: 1rem;\n}\n\n.forecastContainer {\n    max-width: 95%;\n}\n\n.forecastTable {\n    display: flex;\n}\n\n.forecastRow {\n    display: flex;\n    gap: 0.5rem;\n    overflow-y: hidden !important;\n    min-height: 170px;\n    /* enable horizontal scroll */\n    overflow-x: scroll;\n}\n\n/* hide scrollbar, retain function */\n/* .forecastRow::-webkit-scrollbar { */\n/* display: none; */\n/* } */\n\n.forecastCell {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.25rem;\n    min-width: 150px;\n    height: 100%;\n    /* min-width: max-content; */\n}\n\n/* Footer styling */\n\nfooter {\n    grid-column: 1 / -1;\n    /* background-color: var(--background-color); */\n    color: var(--white-ish);\n    font-size: 1.2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    box-sizing: border-box;\n}\n\nfooter > a {\n    display: flex;\n}\n\n.github {\n    height: 24px;\n    transition: transform 0.3s ease-in-out;\n}\n\n.github:hover {\n    transform: rotate(-360deg) scale(1.2);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["/* Page styling */\n\n:root {\n    --panel: rgba(255, 255, 255, 0.65);\n    --accent: royalblue;\n    --background: rgb(0, 10, 39);\n    --white-ish: whitesmoke;\n    --error: darkred;\n}\n\nbody {\n    /* system font stack */\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;\n    background-color: var(--background);\n    display: grid;\n    grid-template-columns: 250px calc(100vw - 250px);\n    grid-template-rows: 110px calc(100vh - 110px - 62px) 62px;\n    margin: 0;\n    box-sizing: border-box;\n    max-width: 100vw;\n    max-height: 100vh;\n}\n\n/* Scrollbar styling */\n\n::-webkit-scrollbar {\n    width: 12px;\n    height: 12px;\n}\n\n::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    -webkit-border-radius: 6px;\n    border-radius: 6px;\n}\n\n::-webkit-scrollbar-track:hover {\n    border: 1px solid rgb(20, 20, 20, 0.2);\n}\n\n::-webkit-scrollbar-thumb {\n    /* background: var(--menu-color);  */\n    background: rgb(20, 20, 20, 0.25);\n    -webkit-border-radius: 6px;\n    border-radius: 6px;\n    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4);\n    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4);\n}\n\n::-webkit-scrollbar-thumb:hover {\n    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.6);\n    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.6);\n}\n\n::-webkit-scrollbar-thumb:active {\n    border: 1px solid rgb(20, 20, 20, 0.2);\n}\n\n/* General styling */\n\nh1 {\n    font-size: 2em;\n    font-weight: bolder;\n}\n\nh2 {\n    font-size: 1.15em;\n    font-weight: 500;\n    margin-top: 0.83em;\n    margin-bottom: 0.83em;\n}\n\n.hidden {\n    display: none;\n}\n\n#hidden {\n    display: none;\n}\n\n#showBlock {\n    display: block;\n}\n\n/* Header styling */\n\n.logo {\n    max-height: 90%;\n    margin-right: 8px;\n    /* whitesmoke color */\n    filter: invert(100%) sepia(0%) saturate(7480%) hue-rotate(201deg)\n        brightness(107%) contrast(92%);\n}\n\nheader {\n    grid-column: 1 / -1;\n    color: var(--white-ish);\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    box-sizing: border-box;\n}\n\n/* Menu styling */\n\n.menu {\n    background-color: var(--panel);\n    border-radius: 1rem;\n    margin-left: 0.5rem;\n}\n\n.menu > ul.watchlist {\n    margin-top: 20px;\n}\n\n.icon {\n    height: 1.2rem;\n}\n\n.watchlist {\n    list-style: none;\n    padding: 0;\n}\n\n.watchlist > li {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.watchlistHeader {\n    font-weight: 700;\n    font-size: 1.3rem;\n}\n\n.watchlist li,\n.watchlistHeader,\n.addLocationBtn,\n.addLocationForm {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n#watchlist {\n    max-height: 80%;\n    overflow: auto;\n}\n\n.watchlist li:hover,\n.addLocationBtn:hover {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.watchlist li:active,\n.addLocationBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\nli.selected {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n}\n\n.deleteItem {\n    margin-left: auto;\n}\n\n.deleteItem:hover {\n    filter: invert(7%) sepia(51%) saturate(5951%) hue-rotate(350deg)\n        brightness(140%) contrast(136%);\n}\n\n/* Form styling */\n\n.addLocationForm {\n    padding: 0;\n}\n\n.formRow {\n    display: flex;\n    justify-content: space-around;\n    gap: 8px;\n}\n\n#formButtons {\n    margin-top: 8px;\n}\n\n.newLocationInput {\n    padding: 6px;\n    font-size: 1.2rem;\n    width: 100%;\n    border: none;\n    border-radius: 8px;\n    box-sizing: border-box;\n}\n\n.addBtn,\n.cancelBtn {\n    padding: 8px;\n    width: 50%;\n    border-radius: 8px;\n    font-size: 1.1rem;\n    color: var(--white-ish);\n    font-weight: 550;\n}\n\n.addBtn {\n    background-color: var(--accent);\n    border: 2px solid hsl(225, 73%, 30%);\n}\n\n.cancelBtn {\n    background-color: mediumvioletred;\n    border: 2px solid hsl(322, 81%, 30%);\n}\n\n.addBtn:hover,\n.cancelBtn:hover {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.addBtn:active,\n.cancelBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\n.newProjErrorContainer {\n    color: var(--error);\n    font-size: 1.1rem;\n    text-align: center;\n    padding: 8px;\n}\n\n/* Content styling */\n\n.content {\n    margin: 0 0.5rem;\n    font-size: 1.2rem;\n    max-width: 1000px;\n    box-sizing: border-box;\n    overflow: auto;\n}\n\n.WeatherAPIContainter {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.4rem;\n    margin: 0rem;\n    background-color: var(--panel);\n    border-radius: 1rem;\n    height: 100%;\n}\n\n.contentTitle {\n    margin-bottom: unset;\n}\n\n.tempContainer {\n    margin-bottom: 1rem;\n}\n\n.forecastContainer {\n    max-width: 95%;\n}\n\n.forecastTable {\n    display: flex;\n}\n\n.forecastRow {\n    display: flex;\n    gap: 0.5rem;\n    overflow-y: hidden !important;\n    min-height: 170px;\n    /* enable horizontal scroll */\n    overflow-x: scroll;\n}\n\n/* hide scrollbar, retain function */\n/* .forecastRow::-webkit-scrollbar { */\n/* display: none; */\n/* } */\n\n.forecastCell {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.25rem;\n    min-width: 150px;\n    height: 100%;\n    /* min-width: max-content; */\n}\n\n/* Footer styling */\n\nfooter {\n    grid-column: 1 / -1;\n    /* background-color: var(--background-color); */\n    color: var(--white-ish);\n    font-size: 1.2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    box-sizing: border-box;\n}\n\nfooter > a {\n    display: flex;\n}\n\n.github {\n    height: 24px;\n    transition: transform 0.3s ease-in-out;\n}\n\n.github:hover {\n    transform: rotate(-360deg) scale(1.2);\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFPLHVEQUFVO0FBQ1ZqQyx5REFBZSxJQUVmOztBQUNBLE1BQU03RCxjQUFjLEdBQUc1RyxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsaUJBQXZCLENBQXZCO0FBQ0EsTUFBTXNGLFNBQVMsR0FBR25HLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixZQUF2QixDQUFsQixFQUVBOztBQUNBK0YsY0FBYyxDQUFDMUYsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUN5RixzREFBekM7QUFFQVIsU0FBUyxDQUFDakYsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBcUNDLENBQUQsSUFBTztFQUN2Q0EsQ0FBQyxDQUFDb0osY0FBRjtFQUNBekQsMERBQVE7QUFDWCxDQUhELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcmVzZXQuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9yZXNldC5jc3M/ZWRlMCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZGl0aW9uSWNvbiBmcm9tICcuL2Fzc2V0cy9wbHVzLnN2ZydcbmltcG9ydCBkZWxldGVJY29uIGZyb20gJy4vYXNzZXRzL2RlbGV0ZS5zdmcnXG5pbXBvcnQgbWVudUljb24gZnJvbSAnLi9hc3NldHMvbWVudUljb24uc3ZnJ1xuXG5kb2N1bWVudC5jb29raWUgPSAnU2FtZVNpdGU9TGF4J1xuXG5jb25zdCBjcmVhdGVNZW51SWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrbGlzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGNoZWNrbGlzdEljb24uc3JjID0gbWVudUljb25cbiAgICBjaGVja2xpc3RJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tsaXN0SWNvbilcbn1cblxuLy8gQWRkIHNpbmdsZSBsb2NhdGlvbiB0byB3YXRjaGxpc3QgKGNhbGxlZCBiZWxvdylcbmNvbnN0IGNyZWF0ZUxpc3RpbmcgPSAobG9jYXRpb25OYW1lLCBpKSA9PiB7XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKGBsb2NhdGlvbmApXG4gICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICAvLyBhc3NpZ24gY2xhc3MgdG8gc2VsZWN0ZWQgbG9jYXRpb24gbGlzdGluZ1xuICAgIGlmIChsb2NhdGlvbk5hbWUuc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIH1cblxuICAgIC8vIGV2ZW50IGxpc3RlbmVyIHRvIGRpc3BsYXkgc2VsZWN0ZWQgbG9jYXRpb24ncyB3ZWF0aGVyXG4gICAgbG9jYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBpZiBkZWxldGluZyBsaXN0aW5nLCBkbyBub3QgZGlzcGxheSB3ZWF0aGVyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZUl0ZW0nKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0TG9jYXRpb24obG9jYXRpb24pXG4gICAgfSlcblxuICAgIGNyZWF0ZU1lbnVJY29uKGxvY2F0aW9uKVxuICAgIGNvbnN0IGxvY2F0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGxvY2F0aW9uVGV4dC50ZXh0Q29udGVudCA9IGxvY2F0aW9uTmFtZS5uYW1lXG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQobG9jYXRpb25UZXh0KVxuICAgIGNyZWF0ZURlbGV0ZUljb24obG9jYXRpb24sIGkpXG4gICAgd2F0Y2hsaXN0LmFwcGVuZENoaWxkKGxvY2F0aW9uKVxufVxuXG4vLyBEaXNwbGF5IGVudGlyZSBhcnJheSBvZiBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG5jb25zdCBkaXNwbGF5V2F0Y2hsaXN0ID0gKCkgPT4ge1xuICAgIC8vIEdyYWIgd2F0Y2hsaXN0XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICAvLyBDbGVhciBsb2NhdGlvbiBsaXN0aW5nc1xuICAgIGNvbnN0IG9sZExpc3RpbmdDb3VudCA9IHdhdGNobGlzdC5jaGlsZEVsZW1lbnRDb3VudFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkTGlzdGluZ0NvdW50OyBpKyspIHtcbiAgICAgICAgd2F0Y2hsaXN0LmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgYWxsIGxvY2F0aW9ucyB0byB3YXRjaGxpc3RcbiAgICBsZXQgaSA9IDBcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcbiAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlV2F0Y2hsaXN0KVxuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgY3JlYXRlTGlzdGluZyhsb2NhdGlvbiwgaSlcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBBUElDaXR5U2VhcmNoKGxvY2F0aW9uLm5hbWUpXG4gICAgICAgIH1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgIGkrK1xuICAgIH0pXG59XG5cbmNvbnN0IHN1Ym1pdExvY2F0aW9uID0gKGlucHV0KSA9PiB7XG4gICAgLy8gY3JlYXRlIGxvY2F0aW9uIG9iamVjdFxuICAgIGNvbnN0IG5ld0xvY2F0aW9uID0ge1xuICAgICAgICBuYW1lOiBpbnB1dCxcbiAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgfVxuXG4gICAgLy8gZ3JhYiBhcnJheSBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIGRlc2VsZWN0IHByZXZpb3VzbHkgc2VsZWN0ZWQgbG9jYXRpb25cbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIHB1c2ggbG9jYXRpb24gdG8gYXJyYXlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnB1c2gobmV3TG9jYXRpb24pXG5cbiAgICAvLyBzZXQgYXJyYXkgYmFjayBpbnRvIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gcmVmcmVzaCB3YXRjaGxpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgZGlzcGxheVdlYXRoZXIgPSAobmV3V2VhdGhlckNhcmQpID0+IHtcbiAgICAvLyBkaXNwbGF5IGNvbnRlbnQgdGl0bGVcbiAgICBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJylcbiAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSBgJHtuZXdXZWF0aGVyQ2FyZC5jaXR5fSwgJHtuZXdXZWF0aGVyQ2FyZC5jb3VudHJ5fWBcblxuICAgIC8vIGRpc3BsYXkgd2VhdGhlciBpY29uXG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKVxuICAgIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25ld1dlYXRoZXJDYXJkLndlYXRoZXJJY29ufUAyeC5wbmdgXG5cbiAgICAvLyBkaXNwbGF5IGRlc2NyaXB0aW9uXG4gICAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJEZXNjcmlwdGlvbicpXG4gICAgd2VhdGhlckRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IGBXZWF0aGVyOiAke25ld1dlYXRoZXJDYXJkLndlYXRoZXJEZXNjcmlwdGlvbn1gXG5cbiAgICAvLyBkaXNwbGF5IGN1cnJlbnQgdGVtcGVyYXR1cmVcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBDb250YWluZXInKVxuICAgIHRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZChuZXdXZWF0aGVyQ2FyZC50ZW1wQ3VycmVudCl9XFx1MDBCMGBcblxuICAgIC8vIGRpc3BsYXkgaGlnaC9sb3cgdGVtcGVyYXR1cmVzXG4gICAgY29uc3QgbG93VGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb3dUZW1wQ29udGFpbmVyJylcbiAgICBsb3dUZW1wQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb3cgdGVtcGVyYXR1cmU6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcExvd1xuICAgICl9XFx1MDBCMGBcbiAgICBjb25zdCBoaWdoVGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWdoVGVtcENvbnRhaW5lcicpXG4gICAgaGlnaFRlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYEhpZ2ggdGVtcGVyYXR1cmU6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQudGVtcEhpZ2hcbiAgICApfVxcdTAwQjBgXG5cbiAgICAvLyBkaXBsYXkgY3VycmVudCB0aW1lXG4gICAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lQ29udGFpbmVyJylcbiAgICB0aW1lQ29udGFpbmVyLmlubmVyVGV4dCA9IGBMb2NhbCB0aW1lOiAke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLmxvY2FsRGF0ZS5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSBzdW5yaXNlL3N1bnNldCB0aW1lc1xuICAgIGNvbnN0IHN1bnJpc2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VucmlzZUNvbnRhaW5lcicpXG4gICAgc3VucmlzZUNvbnRhaW5lci5pbm5lclRleHQgPSBgU3VucmlzZTogJHtuZXdXZWF0aGVyQ2FyZC5zdW5yaXNlLmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQuc3VucmlzZS5nZXRNaW51dGVzKCl9YFxuICAgIGNvbnN0IHN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdW5zZXRDb250YWluZXInKVxuICAgIHN1bnNldENvbnRhaW5lci5pbm5lclRleHQgPSBgU3Vuc2V0OiAke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLnN1bnNldC5nZXRNaW51dGVzKCl9YFxuXG4gICAgLy8gZGlzcGxheSB3aW5kXG4gICAgY29uc3Qgd2luZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kQ29udGFpbmVyJylcbiAgICB3aW5kQ29udGFpbmVyLmlubmVyVGV4dCA9IGBXaW5kOiAke01hdGgucm91bmQoXG4gICAgICAgIG5ld1dlYXRoZXJDYXJkLndpbmRTcGVlZFxuICAgICl9bXBoLCAke25ld1dlYXRoZXJDYXJkLndpbmREaXJlY3Rpb259ICgke25ld1dlYXRoZXJDYXJkLndpbmREZWdyZWV9XFx1MDBCMClgXG5cbiAgICAvLyBkaXNwbGF5IGh1bWlkaXR5XG4gICAgY29uc3QgaHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHlDb250YWluZXInKVxuICAgIGh1bWlkaXR5Q29udGFpbmVyLmlubmVyVGV4dCA9IGBIdW1pZGl0eTogJHtuZXdXZWF0aGVyQ2FyZC5odW1pZGl0eX0lYFxufVxuXG5jb25zdCBkaXNwbGF5Rm9yZWNhc3QgPSAobmV3SG91cmx5Rm9yZWNhc3RBcnJheSkgPT4ge1xuICAgIGNvbnN0IGZvcmVjYXN0Um93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcmVjYXN0Um93JylcblxuICAgIC8vIHJlbW92ZSBhbnkgZm9yZWNhc3QgY2VsbHNcbiAgICBjb25zdCBvbGRGb3JlY2FzdCA9IGZvcmVjYXN0Um93LmNoaWxkRWxlbWVudENvdW50XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRGb3JlY2FzdDsgaSsrKSB7XG4gICAgICAgIGZvcmVjYXN0Um93LmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvLyBBZGQgbmV3IGZvcmVjYXN0IGNlbGxzXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdIb3VybHlGb3JlY2FzdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICAgICAgZm9yZWNhc3RDZWxsLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Q2VsbCcpXG5cbiAgICAgICAgLy8gZGlzcGxheSBkYXRlXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdERhdGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3REYXRlJylcbiAgICAgICAgZm9yZWNhc3REYXRlLmlubmVyVGV4dCA9IGAke1xuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS5kYXRlLmdldE1vbnRoKCkgKyAxXG4gICAgICAgIH0vJHtuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLmRhdGUuZ2V0RGF0ZSgpfWBcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0RGF0ZSlcblxuICAgICAgICAvLyBkaXNwbGF5IHRpbWVcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0VGltZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRpbWUnKVxuICAgICAgICBmb3JlY2FzdFRpbWUuaW5uZXJUZXh0ID1cbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0uZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoKVxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaW1lKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgd2VhdGhlciBpY29uXG4gICAgICAgIGNvbnN0IHdlYXRoZXJGb3JlY2FzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgICAgICB3ZWF0aGVyRm9yZWNhc3RJY29uLmNsYXNzTGlzdC5hZGQoJ3dlYXRoZXJGb3JlY2FzdEljb24nKVxuICAgICAgICB3ZWF0aGVyRm9yZWNhc3RJY29uLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0ud2VhdGhlckljb259LnBuZ2BcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKHdlYXRoZXJGb3JlY2FzdEljb24pXG5cbiAgICAgICAgLy8gZGlzcGxheSB3ZWF0aGVyIGRlc2NyaXB0aW9uXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICAgICAgZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24uaW5uZXJUZXh0ID1cbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0ud2VhdGhlckRlc2NyaXB0aW9uXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5hcHBlbmRDaGlsZChmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbilcblxuICAgICAgICAvLyBkaXNwbGF5IGZvcmVjYXN0IHRlbXBlcmF0dXJlXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdFRlbXAuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUZW1wJylcbiAgICAgICAgZm9yZWNhc3RUZW1wLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQoXG4gICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLnRlbXBlcmF0dXJlXG4gICAgICAgICl9XFx1MDBCMGBcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcClcblxuICAgICAgICBmb3JlY2FzdFJvdy5hcHBlbmRDaGlsZChmb3JlY2FzdENlbGwpXG4gICAgfVxufVxuXG5jb25zdCBzZWxlY3RMb2NhdGlvbiA9IChsaSkgPT4ge1xuICAgIC8vIGdyYWIgbG9jYXRpb25zIGFycmF5IGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gZGVzZWxlY3QgYWxsIGxvY2F0aW9uc1xuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gU2VsZWN0IGxvY2F0aW9uIGlmIG9uZSBpcyBjaG9zZW4gKG1haW4gbWVudSBzZWxlY3Rpb24gaXMgaGFuZGxlZCBpbiBldmVudCBsaXN0ZW5lcilcbiAgICBpZiAobGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NhdGlvbicpKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTG9jYXRpb25JZCA9IGxpLmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgICBzdG9yYWdlV2F0Y2hsaXN0W3NlbGVjdGVkTG9jYXRpb25JZF0uc2VsZWN0ZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgLy8gc2V0IGxvY2F0aW9ucyBhcnJheSBiYWNrIGludG8gbG9jYWxTdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIHJlZnJlc2hcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlQWRkQnV0dG9uID0gKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoJ2FkZEJ0bicpXG4gICAgYWRkQnRuLmlubmVyVGV4dCA9ICdzZWFyY2gnXG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHZhbGlkYXRlU2VhcmNoKGUpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRCdG4pXG59XG5cbmNvbnN0IGNyZWF0ZUNhbmNlbEJ1dHRvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdjYW5jZWxCdG4nKVxuICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuICAgIGNhbmNlbEJ0bi5pbm5lclRleHQgPSAnY2FuY2VsJ1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pXG59XG5cbi8vIGNyZWF0ZUZvcm1cbmNvbnN0IGNyZWF0ZUZvcm0gPSAoZm9ybSkgPT4ge1xuICAgIC8vIHJvdyBvbmU6IGFzc2lnbiBpbnB1dFxuICAgIGNvbnN0IGZvcm1Sb3cxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93MS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgbmV3TG9jYXRpb25JbnB1dC5jbGFzc0xpc3QuYWRkKCduZXdMb2NhdGlvbklucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LnBsYWNlaG9sZGVyID0gJ0Zsb3JlbmNlJ1xuICAgIG5ld0xvY2F0aW9uSW5wdXQubmFtZSA9ICduZXdMb2NhdGlvbklucHV0J1xuICAgIGZvcm1Sb3cxLmFwcGVuZENoaWxkKG5ld0xvY2F0aW9uSW5wdXQpXG5cbiAgICAvLyByb3cgdHdvOiBzdWJtaXQgYW5kIGNhbmNlbCBidXR0b25zXG4gICAgY29uc3QgZm9ybVJvdzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdpZCcsICdmb3JtQnV0dG9ucycpXG4gICAgY3JlYXRlQWRkQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuICAgIGNyZWF0ZUNhbmNlbEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcblxuICAgIC8vIHJvdyB0aHJlZTogYXNzaWduIGVycm9yIGNsYXNzIGFuZCB0ZXh0XG4gICAgY29uc3QgZm9ybVJvdzMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3czLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbmV3UHJvakVycm9yQ29udGFpbmVyJylcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzEpXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MilcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3czKVxufVxuXG5jb25zdCBzaG93Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRMb2NhdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkJ0bicpXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uRm9ybScpXG5cbiAgICBhZGRMb2NhdGlvbkJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2hvd0Jsb2NrJylcbn1cblxuY29uc3QgaGlkZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkTG9jYXRpb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25CdG4nKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkZvcm0nKVxuXG4gICAgYWRkTG9jYXRpb25CdG4uc2V0QXR0cmlidXRlKCdpZCcsICdzaG93QmxvY2snKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG59XG5cbi8vIERlbGV0ZSB3YXRjaGxpc3QgZW50cnlcbmNvbnN0IGRlbGV0ZVdhdGNobGlzdEVudHJ5ID0gKGUpID0+IHtcbiAgICAvLyBncmFiIGFycmF5cyBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIElkZW50aWZ5IGVudHJ5IHRvIGRlbGV0ZVxuICAgIGNvbnN0IGRvb21lZEluZGV4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpXG5cbiAgICAvLyBkZWxldGUgZW50cnlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnNwbGljZShkb29tZWRJbmRleCwgMSlcblxuICAgIC8vIHNldCBjaGFuZ2VzIHRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyBJZiBkb29tZWQgZW50cnkgd2FzIHNlbGVjdGVkLCBjbGVhciBjb250ZW50IGRpc3BsYXlcblxuICAgIC8vIHJlZnJlc2ggd2F0Y2hpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlRGVsZXRlSWNvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICAvLyBjcmVhdGUgaW1hZ2UgYW5kIGFzc2lnbiBhdHRyaWJ1dGVzXG4gICAgY29uc3QgbmV3RGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3RGVsZXRlSWNvbi5zcmMgPSBkZWxldGVJY29uXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24gZGVsZXRlSXRlbScpXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuXG4gICAgLy8gQUREIEVWRU5UIExJU1RFTkVSXG4gICAgaWYgKFxuICAgICAgICBjb250YWluZXIuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAnbG9jYXRpb24nIHx8XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2xvY2F0aW9uJylcbiAgICApIHtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXIgdG8gZGVsZXRlIGxvY2F0aW9uXG4gICAgICAgIG5ld0RlbGV0ZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeWAsXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YCxcbiAgICAgICAgICAgIGBoaWRkZW5gXG4gICAgICAgIClcbiAgICAgICAgbmV3RGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PlxuICAgICAgICAgICAgZGVsZXRlV2F0Y2hsaXN0RW50cnkoZSwgaSlcbiAgICAgICAgKVxuICAgICAgICAvLyBkaXNwbGF5IHRyYXNoIGljb24gb24gaG92ZXJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGhpZGUgdHJhc2ggaWNvblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBzdHJhbmdlJylcbiAgICB9XG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdEZWxldGVJY29uKVxufVxuXG5jb25zdCBjcmVhdGVBZGRpdGlvbkljb24gPSAobGkpID0+IHtcbiAgICBjb25zdCBuZXdBZGRpdGlvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0FkZGl0aW9uSWNvbi5zcmMgPSBhZGRpdGlvbkljb25cbiAgICBuZXdBZGRpdGlvbkljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChuZXdBZGRpdGlvbkljb24pXG59XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vIE9wZW53ZWF0aGVyIEFQSSBGdW5jdGlvbnNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZnVuY3Rpb24gdG9EaXJlY3Rpb24oZGVncmVlKSB7XG4gICAgaWYgKGRlZ3JlZSA+IDMzNy41KSByZXR1cm4gJ05vcnRoJ1xuICAgIGlmIChkZWdyZWUgPiAyOTIuNSkgcmV0dXJuICdOb3J0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyNDcuNSkgcmV0dXJuICdXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMDIuNSkgcmV0dXJuICdTb3V0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAxNTcuNSkgcmV0dXJuICdTb3V0aCdcbiAgICBpZiAoZGVncmVlID4gMTIyLjUpIHJldHVybiAnU291dGggRWFzdCdcbiAgICBpZiAoZGVncmVlID4gNjcuNSkgcmV0dXJuICdFYXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMi41KSByZXR1cm4gJ05vcnRoIEVhc3QnXG4gICAgcmV0dXJuICdOb3J0aCdcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjIzNzYxMTUvaG93LXRvLW9idGFpbi1vcGVuLXdlYXRoZXItYXBpLWRhdGUtdGltZS1mcm9tLWNpdHktYmVpbmctZmV0Y2hlZFxuY29uc3QgY2FsY0N1cnJlbnRUaW1lID0gKHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbFRpbWUgPSBkLmdldFRpbWUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSBsb2NhbFRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuY29uc3QgY2FsY1N1blRpbWUgPSAodGltZSwgdGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSB0aW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbmNvbnN0IGZldGNoSG91cmx5Rm9yZWNhc3QgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuICAgIC8vIGZldGNoIGZpdmUgZGF5L3RocmVlIGhvdXIgZm9yZWNhc3RcbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3RBcnJheSA9IFtdXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShyZXNwb25zZS5saXN0W2ldLmR0X3R4dCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUZXh0OiByZXNwb25zZS5saXN0W2ldLmR0X3R4dCxcbiAgICAgICAgICAgICAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICAgICAgcmFpbkNoYW5jZTogcmVzcG9uc2UubGlzdFtpXS5wb3AgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVySWNvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmljb24sXG4gICAgICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcsXG4gICAgICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLmxpc3RbaV0ud2luZC5kZWcpLFxuICAgICAgICAgICAgICAgICAgICB3aW5kR3VzdDogcmVzcG9uc2UubGlzdFtpXS53aW5kLmd1c3QsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRTcGVlZDogcmVzcG9uc2UubGlzdFtpXS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5LnB1c2gobmV3SG91cmx5Rm9yZWNhc3QpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdIb3VybHlGb3JlY2FzdEFycmF5KVxuICAgICAgICAgICAgZGlzcGxheUZvcmVjYXN0KG5ld0hvdXJseUZvcmVjYXN0QXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gbmV3SG91cmx5Rm9yZWNhc3RBcnJheVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgZmV0Y2hDdXJyZW50V2VhdGhlciA9IChjaXR5UXVlcnksIGUpID0+IHtcbiAgICAvLyBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuXG4gICAgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgY29uc3QgbmV3V2VhdGhlckNhcmQgPSB7XG4gICAgICAgICAgICAgICAgY2l0eTogcmVzcG9uc2UubmFtZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXNwb25zZS5zeXMuY291bnRyeSxcbiAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICBsb2NhbERhdGU6IGNhbGNDdXJyZW50VGltZShyZXNwb25zZS50aW1lem9uZSksXG4gICAgICAgICAgICAgICAgc3VucmlzZTogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5yaXNlICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHN1bnNldDogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5zZXQgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGVtcEN1cnJlbnQ6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICB0ZW1wSGlnaDogcmVzcG9uc2UubWFpbi50ZW1wX21heCxcbiAgICAgICAgICAgICAgICB0ZW1wTG93OiByZXNwb25zZS5tYWluLnRlbXBfbWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgd2VhdGhlckljb246IHJlc3BvbnNlLndlYXRoZXJbMF0uaWNvbixcbiAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS53aW5kLmd1c3QsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBUElJbWFnZS5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2BcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkQnRuJykgPT09IHRydWVcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN1Ym1pdExvY2F0aW9uKFxuICAgICAgICAgICAgICAgICAgICBgJHtuZXdXZWF0aGVyQ2FyZC5jaXR5fSwgJHtuZXdXZWF0aGVyQ2FyZC5jb3VudHJ5fWBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNwbGF5V2VhdGhlcihuZXdXZWF0aGVyQ2FyZClcbiAgICAgICAgICAgIHJldHVybiBuZXdXZWF0aGVyQ2FyZFxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgQVBJQ2l0eVNlYXJjaCA9IChpbnB1dCwgZSkgPT4ge1xuICAgIGZldGNoQ3VycmVudFdlYXRoZXIoaW5wdXQsIGUpXG4gICAgZmV0Y2hIb3VybHlGb3JlY2FzdChpbnB1dClcbn1cblxuY29uc3QgYWRkRGVmYXVsdENvbnRlbnQgPSAoKSA9PiB7XG4gICAgc3VibWl0TG9jYXRpb24oJ1NhbiBGcmFuY2lzY28sIFVTJylcbiAgICBzdWJtaXRMb2NhdGlvbignU2VhdHRsZSwgVVMnKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdIb25vbHVsdSwgVVMnKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdGbG9yZW5jZSwgSVQnKVxuICAgIHN1Ym1pdExvY2F0aW9uKCdBbXN0ZXJkYW0sIE5MJylcbiAgICBzdWJtaXRMb2NhdGlvbignUGFyaXMsIEZSJylcbiAgICBzdWJtaXRMb2NhdGlvbignVG9reW8sIEpQJylcbn1cblxuY29uc3QgdmFsaWRhdGVTZWFyY2ggPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdMb2NhdGlvbklucHV0JylcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG4gICAgLy8gcmVzZXQgZXJyb3JcbiAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJydcbiAgICAvLyBjaGVjayBmb3Igc2VhcmNoIHRlcm1cbiAgICBpZiAobmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcbiAgICB9IGVsc2Uge1xuICAgICAgICBBUElDaXR5U2VhcmNoKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUsIGUpXG4gICAgICAgIGhpZGVGb3JtKClcbiAgICAgICAgbmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9ICcnXG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIGFkZERlZmF1bHRDb250ZW50LFxuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVEZWxldGVJY29uLFxuICAgIGNyZWF0ZUZvcm0sXG4gICAgY3JlYXRlTWVudUljb24sXG4gICAgZGlzcGxheVdhdGNobGlzdCxcbiAgICBoaWRlRm9ybSxcbiAgICBzaG93Rm9ybSxcbiAgICBzdWJtaXRMb2NhdGlvbixcbiAgICB2YWxpZGF0ZVNlYXJjaCxcbn1cbiIsImltcG9ydCB7IGFkZERlZmF1bHRDb250ZW50LCBkaXNwbGF5V2F0Y2hsaXN0IH0gZnJvbSAnLi9oZWxwZXJGdW5jdGlvbnMnXG5cbi8vIEluaXRpYXRlIHN0b3JhZ2UgYXJyYXlzIGlmIGxvY2FsU3RvcmFnZSBpcyBlbXB0eVxuY29uc3QgaW5pdGlhdGVTdG9yYWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3RBcnJheSA9IFtdXG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLnN0b3JhZ2VXYXRjaGxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgICdzdG9yYWdlV2F0Y2hsaXN0JyxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3RBcnJheSlcbiAgICAgICAgKVxuICAgICAgICBhZGREZWZhdWx0Q29udGVudCgpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaW5zZXJ0IGNvbnRlbnQgZnJvbSBsb2NhbCBzdG9yYWdlIGlmIHRoZXJlIGlzIGFueVxuICAgICAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYXRlU3RvcmFnZVxuIiwiaW1wb3J0IHsgY3JlYXRlQWRkaXRpb25JY29uLCBjcmVhdGVGb3JtIH0gZnJvbSAnLi9oZWxwZXJGdW5jdGlvbnMnXG5pbXBvcnQgZ2l0aHViSWNvbiBmcm9tICcuL2Fzc2V0cy9HaXRIdWItbGlnaHQtMzJweC5wbmcnXG5pbXBvcnQgbG9nb0ljb24gZnJvbSAnLi9hc3NldHMvbG9nb0ljb24uc3ZnJ1xuXG5jb25zdCBjcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJylcblxuICAgIC8vIGRpc3BsYXkgbG9nb1xuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGxvZ28uc3JjID0gbG9nb0ljb25cbiAgICBsb2dvLnRhcmdldCA9ICdfYmxhbmsnXG4gICAgbG9nby5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xvZ28nKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChsb2dvKVxuXG4gICAgLy8gZGlzcGxheSB0aXRsZVxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKVxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1dlYXRoZXJzZXJ2ZSdcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpXG5cbiAgICByZXR1cm4gaGVhZGVyXG59XG5cbmNvbnN0IGNyZWF0ZU1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbWVudS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21lbnUnKVxuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBoZWFkZXJcbiAgICBjb25zdCB3YXRjaGxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICB3YXRjaGxpc3RIZWFkZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3RIZWFkZXInKVxuICAgIHdhdGNobGlzdEhlYWRlci50ZXh0Q29udGVudCA9ICdXYXRjaGxpc3QnXG5cbiAgICAvLyBjcmVhdGUgd2F0Y2hsaXN0IG1lbnVcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcbiAgICB3YXRjaGxpc3Quc2V0QXR0cmlidXRlKCdpZCcsICd3YXRjaGxpc3QnKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGFkZExvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBidXR0b25cbiAgICBjb25zdCBhZGRMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBhZGRMb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uQnRuJylcbiAgICBjcmVhdGVBZGRpdGlvbkljb24oYWRkTG9jYXRpb24pXG4gICAgY29uc3QgYWRkTG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgYWRkTG9jYXRpb25UZXh0LmlubmVyVGV4dCA9ICdBZGQgTG9jYXRpb24nXG4gICAgYWRkTG9jYXRpb24uYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25UZXh0KVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uKVxuXG4gICAgLy8gR2VuZXJhdGUgYW5kIGhpZGUgbmV3IGxvY2F0aW9uIGZvcm1cbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkZvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLm1ldGhvZCA9ICdnZXQnXG4gICAgY3JlYXRlRm9ybShhZGRMb2NhdGlvbkZvcm0pXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Gb3JtKVxuXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3RIZWFkZXIpXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3QpXG4gICAgbWVudS5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkNvbnRhaW5lcilcblxuICAgIHJldHVybiBtZW51XG59XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJDYXJkID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBXZWF0aGVyIEFQSSBjb250YWluZXJcbiAgICBjb25zdCBXZWF0aGVyQVBJQ29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnV2VhdGhlckFQSUNvbnRhaW50ZXInLCAnY29udGVudCcpXG5cbiAgICAvLyBjcmVhdGUgQVBJIHRpdGxlXG4gICAgY29uc3QgQVBJVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXG4gICAgQVBJVGl0bGUuY2xhc3NMaXN0LmFkZCgnY29udGVudFRpdGxlJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElUaXRsZSlcblxuICAgIC8vIGNyZWF0ZSBBUEkgaW1nXG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIEFQSUltYWdlLmNsYXNzTGlzdC5hZGQoJ0FQSUltYWdlJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElJbWFnZSlcblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IHRlbXAgY29udGFpbmVyXG4gICAgY29uc3QgdGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0ZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RlbXBDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHRlbXBDb250YWluZXIpXG5cbiAgICAvLyBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKVxuXG4gICAgLy8gY3JlYXRlIGRlc2NyaXB0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgZGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnd2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkNvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBsb3cgdGVtcCBjb250YWluZXJcbiAgICBjb25zdCBsb3dUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgbG93VGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsb3dUZW1wQ29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChsb3dUZW1wQ29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIGhpZ2ggdGVtcCBjb250YWluZXJcbiAgICBjb25zdCBoaWdoVGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGhpZ2hUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZ2hUZW1wQ29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChoaWdoVGVtcENvbnRhaW5lcilcblxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpXG5cbiAgICAvLyBjcmVhdGUgY3VycmVudCB0aW1lIGNvbnRhaW5lclxuICAgIGNvbnN0IHRpbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICB0aW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RpbWVDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHRpbWVDb250YWluZXIpXG5cbiAgICAvLyBjcmVhdGUgc3VucmlzZSBjb250YWluZXJcbiAgICBjb25zdCBzdW5yaXNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgc3VucmlzZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdW5yaXNlQ29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChzdW5yaXNlQ29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIHN1bnNldCBjb250YWluZXJcbiAgICBjb25zdCBzdW5zZXRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBzdW5zZXRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3Vuc2V0Q29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChzdW5zZXRDb250YWluZXIpXG5cbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKVxuXG4gICAgLy8gY3JlYXRlIHdpbmQgY29udGFpbmVyXG4gICAgY29uc3Qgd2luZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHdpbmRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnd2luZENvbnRhaW5lcicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQod2luZENvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBodW1pZGl0eSBjb250YWluZXJcbiAgICBjb25zdCBodW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGh1bWlkaXR5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2h1bWlkaXR5Q29udGFpbmVyJylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChodW1pZGl0eUNvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBmb3JlY2FzdCBjb250YWluZXJcbiAgICBjb25zdCBmb3JlY2FzdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKVxuICAgIGZvcmVjYXN0VGl0bGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUaXRsZScpXG4gICAgZm9yZWNhc3RUaXRsZS5pbm5lclRleHQgPSAnRml2ZSBkYXksIHRocmVlIGhvdXIgZm9yZWNhc3Q6J1xuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGZvcmVjYXN0VGl0bGUpXG5cbiAgICBjb25zdCBmb3JlY2FzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9yZWNhc3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RDb250YWluZXInKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGZvcmVjYXN0Q29udGFpbmVyKVxuXG4gICAgY29uc3QgZm9yZWNhc3RUYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJylcbiAgICBmb3JlY2FzdFRhYmxlLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0VGFibGUnKVxuICAgIGZvcmVjYXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGZvcmVjYXN0VGFibGUpXG5cbiAgICBjb25zdCBmb3JlY2FzdFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcbiAgICBmb3JlY2FzdFJvdy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFJvdycpXG4gICAgZm9yZWNhc3RUYWJsZS5hcHBlbmRDaGlsZChmb3JlY2FzdFJvdylcblxuICAgIC8vIG1ha2Ugc2Nyb2xsd2hlZWwgZnVuY3Rpb25hbCB3aXRoIGhvcml6b250YWwgc2Nyb2xsaW5nXG4gICAgZm9yZWNhc3RSb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZm9yZWNhc3RSb3cuc2Nyb2xsTGVmdCArPSBlLmRlbHRhWVxuICAgIH0pXG5cbiAgICByZXR1cm4gV2VhdGhlckFQSUNvbnRhaW50ZXJcbn1cblxuY29uc3QgY3JlYXRlQ29udGVudCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgY29udGVudCBjb250YWluZXJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQnKVxuXG4gICAgLy8gZGlzcGxheSB3ZWF0aGVyIGNhcmRcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNyZWF0ZVdlYXRoZXJDYXJkKCkpXG5cbiAgICByZXR1cm4gY29udGVudFxufVxuXG5jb25zdCBjcmVhdGVGb290ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJylcblxuICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGNvcHlyaWdodC50ZXh0Q29udGVudCA9IGBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IGpjYW1wYmVsbDU3YFxuXG4gICAgY29uc3QgZ2l0aHViTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGdpdGh1YkxpbmsuaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vamNhbXBiZWxsNTcnXG4gICAgZ2l0aHViTGluay50YXJnZXQgPSAnX2JsYW5rJ1xuXG4gICAgY29uc3QgbmV3R2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3R2l0aHViSWNvbi5zcmMgPSBnaXRodWJJY29uXG4gICAgbmV3R2l0aHViSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2dpdGh1YicpXG5cbiAgICBnaXRodWJMaW5rLmFwcGVuZENoaWxkKG5ld0dpdGh1Ykljb24pXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGNvcHlyaWdodClcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZ2l0aHViTGluaylcblxuICAgIHJldHVybiBmb290ZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUhlYWRlcigpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlTWVudSgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlQ29udGVudCgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRm9vdGVyKCkpXG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3Jlc2V0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Q0FhQyxTQUFTO0NBQ1QsVUFBVTtDQUNWLFNBQVM7Q0FDVCxlQUFlO0NBQ2YsYUFBYTtDQUNiLHdCQUF3QjtBQUN6QjtBQUNBLGdEQUFnRDtBQUNoRDs7Q0FFQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsZ0JBQWdCO0FBQ2pCO0FBQ0E7Q0FDQyxZQUFZO0FBQ2I7QUFDQTs7Q0FFQyxXQUFXO0NBQ1gsYUFBYTtBQUNkO0FBQ0E7Q0FDQyx5QkFBeUI7Q0FDekIsaUJBQWlCO0FBQ2xCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogUGFnZSBzdHlsaW5nICovXFxuXFxuOnJvb3Qge1xcbiAgICAtLXBhbmVsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNjUpO1xcbiAgICAtLWFjY2VudDogcm95YWxibHVlO1xcbiAgICAtLWJhY2tncm91bmQ6IHJnYigwLCAxMCwgMzkpO1xcbiAgICAtLXdoaXRlLWlzaDogd2hpdGVzbW9rZTtcXG4gICAgLS1lcnJvcjogZGFya3JlZDtcXG59XFxuXFxuYm9keSB7XFxuICAgIC8qIHN5c3RlbSBmb250IHN0YWNrICovXFxuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90byxcXG4gICAgICAgIE94eWdlbi1TYW5zLCBVYnVudHUsIENhbnRhcmVsbCwgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZCk7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjUwcHggY2FsYygxMDB2dyAtIDI1MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMTBweCBjYWxjKDEwMHZoIC0gMTEwcHggLSA2MnB4KSA2MnB4O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG1heC13aWR0aDogMTAwdnc7XFxuICAgIG1heC1oZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4vKiBTY3JvbGxiYXIgc3R5bGluZyAqL1xcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgICB3aWR0aDogMTJweDtcXG4gICAgaGVpZ2h0OiAxMnB4O1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2s6aG92ZXIge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjAsIDIwLCAyMCwgMC4yKTtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XFxuICAgIC8qIGJhY2tncm91bmQ6IHZhcigtLW1lbnUtY29sb3IpOyAgKi9cXG4gICAgYmFja2dyb3VuZDogcmdiKDIwLCAyMCwgMjAsIDAuMjUpO1xcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDZweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlciB7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNik7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmFjdGl2ZSB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyMCwgMjAsIDIwLCAwLjIpO1xcbn1cXG5cXG4vKiBHZW5lcmFsIHN0eWxpbmcgKi9cXG5cXG5oMSB7XFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG5oMiB7XFxuICAgIGZvbnQtc2l6ZTogMS4xNWVtO1xcbiAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICBtYXJnaW4tdG9wOiAwLjgzZW07XFxuICAgIG1hcmdpbi1ib3R0b206IDAuODNlbTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNoaWRkZW4ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jc2hvd0Jsb2NrIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qIEhlYWRlciBzdHlsaW5nICovXFxuXFxuLmxvZ28ge1xcbiAgICBtYXgtaGVpZ2h0OiA5MCU7XFxuICAgIG1hcmdpbi1yaWdodDogOHB4O1xcbiAgICAvKiB3aGl0ZXNtb2tlIGNvbG9yICovXFxuICAgIGZpbHRlcjogaW52ZXJ0KDEwMCUpIHNlcGlhKDAlKSBzYXR1cmF0ZSg3NDgwJSkgaHVlLXJvdGF0ZSgyMDFkZWcpXFxuICAgICAgICBicmlnaHRuZXNzKDEwNyUpIGNvbnRyYXN0KDkyJSk7XFxufVxcblxcbmhlYWRlciB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZS1pc2gpO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4vKiBNZW51IHN0eWxpbmcgKi9cXG5cXG4ubWVudSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBhbmVsKTtcXG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG59XFxuXFxuLm1lbnUgPiB1bC53YXRjaGxpc3Qge1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG4uaWNvbiB7XFxuICAgIGhlaWdodDogMS4ycmVtO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuLndhdGNobGlzdCA+IGxpIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA4cHg7XFxufVxcblxcbi53YXRjaGxpc3RIZWFkZXIge1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICBmb250LXNpemU6IDEuM3JlbTtcXG59XFxuXFxuLndhdGNobGlzdCBsaSxcXG4ud2F0Y2hsaXN0SGVhZGVyLFxcbi5hZGRMb2NhdGlvbkJ0bixcXG4uYWRkTG9jYXRpb25Gb3JtIHtcXG4gICAgbWFyZ2luOiAxMHB4IDFyZW07XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbn1cXG5cXG4jd2F0Y2hsaXN0IHtcXG4gICAgbWF4LWhlaWdodDogODAlO1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLndhdGNobGlzdCBsaTpob3ZlcixcXG4uYWRkTG9jYXRpb25CdG46aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAyNDUsIDI0NSwgMC4zKTtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuMik7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLndhdGNobGlzdCBsaTphY3RpdmUsXFxuLmFkZExvY2F0aW9uQnRuOmFjdGl2ZSB7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG5saS5zZWxlY3RlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDI0NSwgMjQ1LCAwLjMpO1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG59XFxuXFxuLmRlbGV0ZUl0ZW0ge1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG59XFxuXFxuLmRlbGV0ZUl0ZW06aG92ZXIge1xcbiAgICBmaWx0ZXI6IGludmVydCg3JSkgc2VwaWEoNTElKSBzYXR1cmF0ZSg1OTUxJSkgaHVlLXJvdGF0ZSgzNTBkZWcpXFxuICAgICAgICBicmlnaHRuZXNzKDE0MCUpIGNvbnRyYXN0KDEzNiUpO1xcbn1cXG5cXG4vKiBGb3JtIHN0eWxpbmcgKi9cXG5cXG4uYWRkTG9jYXRpb25Gb3JtIHtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuLmZvcm1Sb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgZ2FwOiA4cHg7XFxufVxcblxcbiNmb3JtQnV0dG9ucyB7XFxuICAgIG1hcmdpbi10b3A6IDhweDtcXG59XFxuXFxuLm5ld0xvY2F0aW9uSW5wdXQge1xcbiAgICBwYWRkaW5nOiA2cHg7XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi5hZGRCdG4sXFxuLmNhbmNlbEJ0biB7XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICBmb250LXNpemU6IDEuMXJlbTtcXG4gICAgY29sb3I6IHZhcigtLXdoaXRlLWlzaCk7XFxuICAgIGZvbnQtd2VpZ2h0OiA1NTA7XFxufVxcblxcbi5hZGRCdG4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQpO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBoc2woMjI1LCA3MyUsIDMwJSk7XFxufVxcblxcbi5jYW5jZWxCdG4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtZWRpdW12aW9sZXRyZWQ7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGhzbCgzMjIsIDgxJSwgMzAlKTtcXG59XFxuXFxuLmFkZEJ0bjpob3ZlcixcXG4uY2FuY2VsQnRuOmhvdmVyIHtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuMik7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmFkZEJ0bjphY3RpdmUsXFxuLmNhbmNlbEJ0bjphY3RpdmUge1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxuLm5ld1Byb2pFcnJvckNvbnRhaW5lciB7XFxuICAgIGNvbG9yOiB2YXIoLS1lcnJvcik7XFxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDhweDtcXG59XFxuXFxuLyogQ29udGVudCBzdHlsaW5nICovXFxuXFxuLmNvbnRlbnQge1xcbiAgICBtYXJnaW46IDAgMC41cmVtO1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgbWF4LXdpZHRoOiAxMDAwcHg7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4uV2VhdGhlckFQSUNvbnRhaW50ZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDAuNHJlbTtcXG4gICAgbWFyZ2luOiAwcmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wYW5lbCk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLmNvbnRlbnRUaXRsZSB7XFxuICAgIG1hcmdpbi1ib3R0b206IHVuc2V0O1xcbn1cXG5cXG4udGVtcENvbnRhaW5lciB7XFxuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxufVxcblxcbi5mb3JlY2FzdENvbnRhaW5lciB7XFxuICAgIG1heC13aWR0aDogOTUlO1xcbn1cXG5cXG4uZm9yZWNhc3RUYWJsZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5mb3JlY2FzdFJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdhcDogMC41cmVtO1xcbiAgICBvdmVyZmxvdy15OiBoaWRkZW4gIWltcG9ydGFudDtcXG4gICAgbWluLWhlaWdodDogMTcwcHg7XFxuICAgIC8qIGVuYWJsZSBob3Jpem9udGFsIHNjcm9sbCAqL1xcbiAgICBvdmVyZmxvdy14OiBzY3JvbGw7XFxufVxcblxcbi8qIGhpZGUgc2Nyb2xsYmFyLCByZXRhaW4gZnVuY3Rpb24gKi9cXG4vKiAuZm9yZWNhc3RSb3c6Oi13ZWJraXQtc2Nyb2xsYmFyIHsgKi9cXG4vKiBkaXNwbGF5OiBub25lOyAqL1xcbi8qIH0gKi9cXG5cXG4uZm9yZWNhc3RDZWxsIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAwLjI1cmVtO1xcbiAgICBtaW4td2lkdGg6IDE1MHB4O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIC8qIG1pbi13aWR0aDogbWF4LWNvbnRlbnQ7ICovXFxufVxcblxcbi8qIEZvb3RlciBzdHlsaW5nICovXFxuXFxuZm9vdGVyIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7ICovXFxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZS1pc2gpO1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMTBweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuZm9vdGVyID4gYSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5naXRodWIge1xcbiAgICBoZWlnaHQ6IDI0cHg7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4uZ2l0aHViOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZykgc2NhbGUoMS4yKTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxpQkFBaUI7O0FBRWpCO0lBQ0ksa0NBQWtDO0lBQ2xDLG1CQUFtQjtJQUNuQiw0QkFBNEI7SUFD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QTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLFdBQVc7SUFDWCxZQUFZO0lBQ1osOEJBQThCO0lBQzlCLG1CQUFtQjtJQUNuQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsV0FBVztJQUNYLDZCQUE2QjtJQUM3QixpQkFBaUI7SUFDakIsNkJBQTZCO0lBQzdCLGtCQUFrQjtBQUN0Qjs7QUFFQSxvQ0FBb0M7QUFDcEMsc0NBQXNDO0FBQ3RDLG1CQUFtQjtBQUNuQixNQUFNOztBQUVOO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osNEJBQTRCO0FBQ2hDOztBQUVBLG1CQUFtQjs7QUFFbkI7SUFDSSxtQkFBbUI7SUFDbkIsK0NBQStDO0lBQy9DLHVCQUF1QjtJQUN2QixpQkFBaUI7SUFDakIsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsU0FBUztJQUNULHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osc0NBQXNDO0FBQzFDOztBQUVBO0lBQ0kscUNBQXFDO0FBQ3pDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIFBhZ2Ugc3R5bGluZyAqL1xcblxcbjpyb290IHtcXG4gICAgLS1wYW5lbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjY1KTtcXG4gICAgLS1hY2NlbnQ6IHJveWFsYmx1ZTtcXG4gICAgLS1iYWNrZ3JvdW5kOiByZ2IoMCwgMTAsIDM5KTtcXG4gICAgLS13aGl0ZS1pc2g6IHdoaXRlc21va2U7XFxuICAgIC0tZXJyb3I6IGRhcmtyZWQ7XFxufVxcblxcbmJvZHkge1xcbiAgICAvKiBzeXN0ZW0gZm9udCBzdGFjayAqL1xcbiAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sXFxuICAgICAgICBPeHlnZW4tU2FucywgVWJ1bnR1LCBDYW50YXJlbGwsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQpO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDI1MHB4IGNhbGMoMTAwdncgLSAyNTBweCk7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMTEwcHggY2FsYygxMDB2aCAtIDExMHB4IC0gNjJweCkgNjJweDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBtYXgtd2lkdGg6IDEwMHZ3O1xcbiAgICBtYXgtaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLyogU2Nyb2xsYmFyIHN0eWxpbmcgKi9cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXG4gICAgd2lkdGg6IDEycHg7XFxuICAgIGhlaWdodDogMTJweDtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDZweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrOmhvdmVyIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDIwLCAyMCwgMjAsIDAuMik7XFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xcbiAgICAvKiBiYWNrZ3JvdW5kOiB2YXIoLS1tZW51LWNvbG9yKTsgICovXFxuICAgIGJhY2tncm91bmQ6IHJnYigyMCwgMjAsIDIwLCAwLjI1KTtcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC40KTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC42KTtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjphY3RpdmUge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjAsIDIwLCAyMCwgMC4yKTtcXG59XFxuXFxuLyogR2VuZXJhbCBzdHlsaW5nICovXFxuXFxuaDEge1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuaDIge1xcbiAgICBmb250LXNpemU6IDEuMTVlbTtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgbWFyZ2luLXRvcDogMC44M2VtO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwLjgzZW07XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jaGlkZGVuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI3Nob3dCbG9jayB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKiBIZWFkZXIgc3R5bGluZyAqL1xcblxcbi5sb2dvIHtcXG4gICAgbWF4LWhlaWdodDogOTAlO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcXG4gICAgLyogd2hpdGVzbW9rZSBjb2xvciAqL1xcbiAgICBmaWx0ZXI6IGludmVydCgxMDAlKSBzZXBpYSgwJSkgc2F0dXJhdGUoNzQ4MCUpIGh1ZS1yb3RhdGUoMjAxZGVnKVxcbiAgICAgICAgYnJpZ2h0bmVzcygxMDclKSBjb250cmFzdCg5MiUpO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLyogTWVudSBzdHlsaW5nICovXFxuXFxuLm1lbnUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wYW5lbCk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICAgIG1hcmdpbi1sZWZ0OiAwLjVyZW07XFxufVxcblxcbi5tZW51ID4gdWwud2F0Y2hsaXN0IHtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxuLmljb24ge1xcbiAgICBoZWlnaHQ6IDEuMnJlbTtcXG59XFxuXFxuLndhdGNobGlzdCB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbi53YXRjaGxpc3QgPiBsaSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogOHB4O1xcbn1cXG5cXG4ud2F0Y2hsaXN0SGVhZGVyIHtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgZm9udC1zaXplOiAxLjNyZW07XFxufVxcblxcbi53YXRjaGxpc3QgbGksXFxuLndhdGNobGlzdEhlYWRlcixcXG4uYWRkTG9jYXRpb25CdG4sXFxuLmFkZExvY2F0aW9uRm9ybSB7XFxuICAgIG1hcmdpbjogMTBweCAxcmVtO1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG59XFxuXFxuI3dhdGNobGlzdCB7XFxuICAgIG1heC1oZWlnaHQ6IDgwJTtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi53YXRjaGxpc3QgbGk6aG92ZXIsXFxuLmFkZExvY2F0aW9uQnRuOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUsIDAuMyk7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjIpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi53YXRjaGxpc3QgbGk6YWN0aXZlLFxcbi5hZGRMb2NhdGlvbkJ0bjphY3RpdmUge1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxubGkuc2VsZWN0ZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAyNDUsIDI0NSwgMC4zKTtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuMik7XFxufVxcblxcbi5kZWxldGVJdGVtIHtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxufVxcblxcbi5kZWxldGVJdGVtOmhvdmVyIHtcXG4gICAgZmlsdGVyOiBpbnZlcnQoNyUpIHNlcGlhKDUxJSkgc2F0dXJhdGUoNTk1MSUpIGh1ZS1yb3RhdGUoMzUwZGVnKVxcbiAgICAgICAgYnJpZ2h0bmVzcygxNDAlKSBjb250cmFzdCgxMzYlKTtcXG59XFxuXFxuLyogRm9ybSBzdHlsaW5nICovXFxuXFxuLmFkZExvY2F0aW9uRm9ybSB7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbi5mb3JtUm93IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGdhcDogOHB4O1xcbn1cXG5cXG4jZm9ybUJ1dHRvbnMge1xcbiAgICBtYXJnaW4tdG9wOiA4cHg7XFxufVxcblxcbi5uZXdMb2NhdGlvbklucHV0IHtcXG4gICAgcGFkZGluZzogNnB4O1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4uYWRkQnRuLFxcbi5jYW5jZWxCdG4ge1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgZm9udC1zaXplOiAxLjFyZW07XFxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZS1pc2gpO1xcbiAgICBmb250LXdlaWdodDogNTUwO1xcbn1cXG5cXG4uYWRkQnRuIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50KTtcXG4gICAgYm9yZGVyOiAycHggc29saWQgaHNsKDIyNSwgNzMlLCAzMCUpO1xcbn1cXG5cXG4uY2FuY2VsQnRuIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWVkaXVtdmlvbGV0cmVkO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBoc2woMzIyLCA4MSUsIDMwJSk7XFxufVxcblxcbi5hZGRCdG46aG92ZXIsXFxuLmNhbmNlbEJ0bjpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjIpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5hZGRCdG46YWN0aXZlLFxcbi5jYW5jZWxCdG46YWN0aXZlIHtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbi5uZXdQcm9qRXJyb3JDb250YWluZXIge1xcbiAgICBjb2xvcjogdmFyKC0tZXJyb3IpO1xcbiAgICBmb250LXNpemU6IDEuMXJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiA4cHg7XFxufVxcblxcbi8qIENvbnRlbnQgc3R5bGluZyAqL1xcblxcbi5jb250ZW50IHtcXG4gICAgbWFyZ2luOiAwIDAuNXJlbTtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIG1heC13aWR0aDogMTAwMHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLldlYXRoZXJBUElDb250YWludGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAwLjRyZW07XFxuICAgIG1hcmdpbjogMHJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGFuZWwpO1xcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5jb250ZW50VGl0bGUge1xcbiAgICBtYXJnaW4tYm90dG9tOiB1bnNldDtcXG59XFxuXFxuLnRlbXBDb250YWluZXIge1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG5cXG4uZm9yZWNhc3RDb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDk1JTtcXG59XFxuXFxuLmZvcmVjYXN0VGFibGUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZm9yZWNhc3RSb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDAuNXJlbTtcXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuICFpbXBvcnRhbnQ7XFxuICAgIG1pbi1oZWlnaHQ6IDE3MHB4O1xcbiAgICAvKiBlbmFibGUgaG9yaXpvbnRhbCBzY3JvbGwgKi9cXG4gICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xcbn1cXG5cXG4vKiBoaWRlIHNjcm9sbGJhciwgcmV0YWluIGZ1bmN0aW9uICovXFxuLyogLmZvcmVjYXN0Um93Ojotd2Via2l0LXNjcm9sbGJhciB7ICovXFxuLyogZGlzcGxheTogbm9uZTsgKi9cXG4vKiB9ICovXFxuXFxuLmZvcmVjYXN0Q2VsbCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMC4yNXJlbTtcXG4gICAgbWluLXdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAvKiBtaW4td2lkdGg6IG1heC1jb250ZW50OyAqL1xcbn1cXG5cXG4vKiBGb290ZXIgc3R5bGluZyAqL1xcblxcbmZvb3RlciB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpOyAqL1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmZvb3RlciA+IGEge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZ2l0aHViIHtcXG4gICAgaGVpZ2h0OiAyNHB4O1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLmdpdGh1Yjpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpIHNjYWxlKDEuMik7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcmVzZXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yZXNldC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9yZXNldC5jc3MnXG5pbXBvcnQgJy4vc3R5bGUuY3NzJ1xuaW1wb3J0IGluaXRpYWxpemUgZnJvbSAnLi9wYWdlTG9hZGVyJ1xuaW1wb3J0IGluaXRpYXRlU3RvcmFnZSBmcm9tICcuL2xvY2FsU3RvcmFnZSdcbmltcG9ydCB7IHNob3dGb3JtLCBoaWRlRm9ybSB9IGZyb20gJy4vaGVscGVyRnVuY3Rpb25zJ1xuXG5pbml0aWFsaXplKClcbmluaXRpYXRlU3RvcmFnZSgpXG5cbi8vIEdyYWIgRE9NIGVsZW1lbnRzXG5jb25zdCBhZGRMb2NhdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkJ0bicpXG5jb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsQnRuJylcblxuLy8gRXZlbnQgbGlzdGVuZXJzXG5hZGRMb2NhdGlvbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dGb3JtKVxuXG5jYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGhpZGVGb3JtKClcbn0pXG4iXSwibmFtZXMiOlsiYWRkaXRpb25JY29uIiwiZGVsZXRlSWNvbiIsIm1lbnVJY29uIiwiZG9jdW1lbnQiLCJjb29raWUiLCJjcmVhdGVNZW51SWNvbiIsImxpIiwiY2hlY2tsaXN0SWNvbiIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUxpc3RpbmciLCJsb2NhdGlvbk5hbWUiLCJpIiwid2F0Y2hsaXN0IiwicXVlcnlTZWxlY3RvciIsImxvY2F0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIiwic2VsZWN0ZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsImNvbnRhaW5zIiwic2VsZWN0TG9jYXRpb24iLCJsb2NhdGlvblRleHQiLCJ0ZXh0Q29udGVudCIsIm5hbWUiLCJjcmVhdGVEZWxldGVJY29uIiwiZGlzcGxheVdhdGNobGlzdCIsIm9sZExpc3RpbmdDb3VudCIsImNoaWxkRWxlbWVudENvdW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsInN0b3JhZ2VXYXRjaGxpc3QiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZm9yRWFjaCIsIkFQSUNpdHlTZWFyY2giLCJzdWJtaXRMb2NhdGlvbiIsImlucHV0IiwibmV3TG9jYXRpb24iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImRpc3BsYXlXZWF0aGVyIiwibmV3V2VhdGhlckNhcmQiLCJjb250ZW50VGl0bGUiLCJjaXR5IiwiY291bnRyeSIsIkFQSUltYWdlIiwid2VhdGhlckljb24iLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJpbm5lclRleHQiLCJ0ZW1wQ29udGFpbmVyIiwiTWF0aCIsInJvdW5kIiwidGVtcEN1cnJlbnQiLCJsb3dUZW1wQ29udGFpbmVyIiwidGVtcExvdyIsImhpZ2hUZW1wQ29udGFpbmVyIiwidGVtcEhpZ2giLCJ0aW1lQ29udGFpbmVyIiwibG9jYWxEYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwic3VucmlzZUNvbnRhaW5lciIsInN1bnJpc2UiLCJzdW5zZXRDb250YWluZXIiLCJzdW5zZXQiLCJ3aW5kQ29udGFpbmVyIiwid2luZFNwZWVkIiwid2luZERpcmVjdGlvbiIsIndpbmREZWdyZWUiLCJodW1pZGl0eUNvbnRhaW5lciIsImh1bWlkaXR5IiwiZGlzcGxheUZvcmVjYXN0IiwibmV3SG91cmx5Rm9yZWNhc3RBcnJheSIsImZvcmVjYXN0Um93Iiwib2xkRm9yZWNhc3QiLCJsZW5ndGgiLCJmb3JlY2FzdENlbGwiLCJmb3JlY2FzdERhdGUiLCJkYXRlIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZm9yZWNhc3RUaW1lIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwid2VhdGhlckZvcmVjYXN0SWNvbiIsImZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uIiwiZm9yZWNhc3RUZW1wIiwidGVtcGVyYXR1cmUiLCJzZWxlY3RlZExvY2F0aW9uSWQiLCJnZXRBdHRyaWJ1dGUiLCJjcmVhdGVBZGRCdXR0b24iLCJjb250YWluZXIiLCJhZGRCdG4iLCJ2YWxpZGF0ZVNlYXJjaCIsImNyZWF0ZUNhbmNlbEJ1dHRvbiIsImNhbmNlbEJ0biIsImNyZWF0ZUZvcm0iLCJmb3JtIiwiZm9ybVJvdzEiLCJuZXdMb2NhdGlvbklucHV0IiwicGxhY2Vob2xkZXIiLCJmb3JtUm93MiIsImZvcm1Sb3czIiwic2hvd0Zvcm0iLCJhZGRMb2NhdGlvbkJ0biIsImFkZExvY2F0aW9uRm9ybSIsImhpZGVGb3JtIiwiZGVsZXRlV2F0Y2hsaXN0RW50cnkiLCJkb29tZWRJbmRleCIsInNwbGljZSIsIm5ld0RlbGV0ZUljb24iLCJ0cmFzaEljb24iLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlQWRkaXRpb25JY29uIiwibmV3QWRkaXRpb25JY29uIiwidG9EaXJlY3Rpb24iLCJkZWdyZWUiLCJjYWxjQ3VycmVudFRpbWUiLCJ0aW1lem9uZSIsImQiLCJEYXRlIiwibG9jYWxUaW1lIiwiZ2V0VGltZSIsImxvY2FsT2Zmc2V0IiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJ1dGMiLCJuZXdDaXR5IiwiY2FsY1N1blRpbWUiLCJ0aW1lIiwiZmV0Y2hIb3VybHlGb3JlY2FzdCIsImNpdHlRdWVyeSIsIm5ld1Byb2pFcnJvckNvbnRhaW5lciIsImZldGNoIiwibW9kZSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJuZXdIb3VybHlGb3JlY2FzdCIsImxpc3QiLCJkdF90eHQiLCJkYXRlVGV4dCIsIm1haW4iLCJyYWluQ2hhbmNlIiwicG9wIiwidGVtcCIsIndlYXRoZXJDb25kaXRpb24iLCJ3ZWF0aGVyIiwiZGVzY3JpcHRpb24iLCJpY29uIiwid2luZCIsImRlZyIsIndpbmRHdXN0IiwiZ3VzdCIsInNwZWVkIiwiY2F0Y2giLCJlcnIiLCJmZXRjaEN1cnJlbnRXZWF0aGVyIiwic3lzIiwidGVtcF9tYXgiLCJ0ZW1wX21pbiIsInVuZGVmaW5lZCIsImFkZERlZmF1bHRDb250ZW50IiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsImluaXRpYXRlU3RvcmFnZSIsInN0b3JhZ2VXYXRjaGxpc3RBcnJheSIsImdpdGh1Ykljb24iLCJsb2dvSWNvbiIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImxvZ28iLCJ0aXRsZSIsImNyZWF0ZU1lbnUiLCJtZW51Iiwid2F0Y2hsaXN0SGVhZGVyIiwiYWRkTG9jYXRpb25Db250YWluZXIiLCJhZGRMb2NhdGlvbiIsImFkZExvY2F0aW9uVGV4dCIsIm1ldGhvZCIsImNyZWF0ZVdlYXRoZXJDYXJkIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJBUElUaXRsZSIsImRlc2NyaXB0aW9uQ29udGFpbmVyIiwiZm9yZWNhc3RUaXRsZSIsImZvcmVjYXN0Q29udGFpbmVyIiwiZm9yZWNhc3RUYWJsZSIsInNjcm9sbExlZnQiLCJkZWx0YVkiLCJjcmVhdGVDb250ZW50IiwiY29udGVudCIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNvcHlyaWdodCIsImdldEZ1bGxZZWFyIiwiZ2l0aHViTGluayIsImhyZWYiLCJuZXdHaXRodWJJY29uIiwiaW5pdGlhbGl6ZSIsImJvZHkiXSwic291cmNlUm9vdCI6IiJ9