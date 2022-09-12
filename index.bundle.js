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

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// class locations {
//     constructor(locationName) {
//         this.name = locationName
//         this.selected = selected
//     }
// }
// Initiate storage arrays if localStorage is empty
const initiateStorage = () => {
  const storageWatchlistArray = [];

  if (localStorage.length === 0) {
    localStorage.setItem('storageWatchlist', JSON.stringify(storageWatchlistArray));
  }
}; // insert content from local storage if there is any


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
___CSS_LOADER_EXPORT___.push([module.id, "/* Page styling */\n\n:root {\n    --panel: rgba(255, 255, 255, 0.65);\n    --accent: royalblue;\n    --background: rgb(0, 10, 39);\n    --white-ish: whitesmoke;\n    --error: darkred;\n}\n\nbody {\n    /* system font stack */\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;\n    background-color: var(--background);\n    display: grid;\n    grid-template-columns: 250px calc(100vw - 250px);\n    grid-template-rows: 110px calc(100vh - 110px - 62px) 62px;\n    margin: 0;\n    box-sizing: border-box;\n    max-width: 100vw;\n    max-height: 100vh;\n}\n\n/* General styling */\n\nh1 {\n    font-size: 2em;\n    font-weight: bolder;\n}\n\n.hidden {\n    display: none;\n}\n\n#hidden {\n    display: none;\n}\n\n#showBlock {\n    display: block;\n}\n\n/* Header styling */\n\n.logo {\n    max-height: 90%;\n    margin-right: 8px;\n    /* whitesmoke color */\n    filter: invert(100%) sepia(0%) saturate(7480%) hue-rotate(201deg)\n        brightness(107%) contrast(92%);\n}\n\nheader {\n    grid-column: 1 / -1;\n    color: var(--white-ish);\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    box-sizing: border-box;\n}\n\n/* Menu styling */\n\n.menu {\n    background-color: var(--panel);\n    border-radius: 1rem;\n    margin-left: 0.5rem;\n}\n\n.menu > ul.watchlist {\n    margin-top: 20px;\n}\n\n.icon {\n    height: 1.2rem;\n}\n\n.watchlist {\n    list-style: none;\n    padding: 0;\n}\n\n.watchlist > li {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.watchlistHeader {\n    font-weight: 700;\n    font-size: 1.3rem;\n}\n\n.watchlist li,\n.watchlistHeader,\n.addLocationBtn,\n.addLocationForm {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n#watchlist {\n    max-height: 80%;\n    overflow: auto;\n}\n\n.watchlist li:hover,\n.addLocationBtn:hover {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.watchlist li:active,\n.addLocationBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\nli.selected {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n}\n\n.deleteItem {\n    margin-left: auto;\n}\n\n.deleteItem:hover {\n    filter: invert(7%) sepia(51%) saturate(5951%) hue-rotate(350deg)\n        brightness(140%) contrast(136%);\n}\n\n/* Form styling */\n\n.addLocationForm {\n    padding: 0;\n}\n\n.formRow {\n    display: flex;\n    justify-content: space-around;\n    gap: 8px;\n}\n\n#formButtons {\n    margin-top: 8px;\n}\n\n.newLocationInput {\n    padding: 6px;\n    font-size: 1.2rem;\n    width: 100%;\n    border: none;\n    border-radius: 8px;\n    box-sizing: border-box;\n}\n\n.addBtn,\n.cancelBtn {\n    padding: 8px;\n    width: 50%;\n    border-radius: 8px;\n    font-size: 1.1rem;\n    color: var(--white-ish);\n    font-weight: 550;\n}\n\n.addBtn {\n    background-color: var(--accent);\n    border: 2px solid hsl(225, 73%, 30%);\n}\n\n.cancelBtn {\n    background-color: mediumvioletred;\n    border: 2px solid hsl(322, 81%, 30%);\n}\n\n.addBtn:hover,\n.cancelBtn:hover {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.addBtn:active,\n.cancelBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\n.newProjErrorContainer {\n    color: var(--error);\n    font-size: 1.1rem;\n    text-align: center;\n    padding: 8px;\n}\n\n/* Content styling */\n\n.content {\n    margin: 0 0.5rem;\n    font-size: 1.2rem;\n    max-width: 1000px;\n    box-sizing: border-box;\n    overflow: auto;\n}\n\n.WeatherAPIContainter {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0rem;\n    background-color: var(--panel);\n    border-radius: 1rem;\n}\n\n.contentTitle {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n.APISearchBtn {\n    background-color: var(--accent);\n    color: var(--white-ish);\n    padding: 0.5rem 1.5rem;\n    border-radius: 0.5rem;\n}\n\n.APISearchBtn:hover {\n    cursor: pointer;\n    box-shadow: 1px 1px 1px rgb(0, 0, 0, 0.2);\n}\n\n.APISearchBtn:active {\n    box-shadow: 1px 1px 1px rgb(0, 0, 0, 0.4);\n}\n\n.APIErrorContainer {\n    color: var(--error);\n}\n\n/* Footer styling */\n\nfooter {\n    grid-column: 1 / -1;\n    /* background-color: var(--background-color); */\n    color: var(--white-ish);\n    font-size: 1.2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    box-sizing: border-box;\n}\n\nfooter > a {\n    display: flex;\n}\n\n.github {\n    height: 24px;\n    transition: transform 0.3s ease-in-out;\n}\n\n.github:hover {\n    transform: rotate(-360deg) scale(1.2);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["/* Page styling */\n\n:root {\n    --panel: rgba(255, 255, 255, 0.65);\n    --accent: royalblue;\n    --background: rgb(0, 10, 39);\n    --white-ish: whitesmoke;\n    --error: darkred;\n}\n\nbody {\n    /* system font stack */\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;\n    background-color: var(--background);\n    display: grid;\n    grid-template-columns: 250px calc(100vw - 250px);\n    grid-template-rows: 110px calc(100vh - 110px - 62px) 62px;\n    margin: 0;\n    box-sizing: border-box;\n    max-width: 100vw;\n    max-height: 100vh;\n}\n\n/* General styling */\n\nh1 {\n    font-size: 2em;\n    font-weight: bolder;\n}\n\n.hidden {\n    display: none;\n}\n\n#hidden {\n    display: none;\n}\n\n#showBlock {\n    display: block;\n}\n\n/* Header styling */\n\n.logo {\n    max-height: 90%;\n    margin-right: 8px;\n    /* whitesmoke color */\n    filter: invert(100%) sepia(0%) saturate(7480%) hue-rotate(201deg)\n        brightness(107%) contrast(92%);\n}\n\nheader {\n    grid-column: 1 / -1;\n    color: var(--white-ish);\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    box-sizing: border-box;\n}\n\n/* Menu styling */\n\n.menu {\n    background-color: var(--panel);\n    border-radius: 1rem;\n    margin-left: 0.5rem;\n}\n\n.menu > ul.watchlist {\n    margin-top: 20px;\n}\n\n.icon {\n    height: 1.2rem;\n}\n\n.watchlist {\n    list-style: none;\n    padding: 0;\n}\n\n.watchlist > li {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.watchlistHeader {\n    font-weight: 700;\n    font-size: 1.3rem;\n}\n\n.watchlist li,\n.watchlistHeader,\n.addLocationBtn,\n.addLocationForm {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n#watchlist {\n    max-height: 80%;\n    overflow: auto;\n}\n\n.watchlist li:hover,\n.addLocationBtn:hover {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.watchlist li:active,\n.addLocationBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\nli.selected {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n}\n\n.deleteItem {\n    margin-left: auto;\n}\n\n.deleteItem:hover {\n    filter: invert(7%) sepia(51%) saturate(5951%) hue-rotate(350deg)\n        brightness(140%) contrast(136%);\n}\n\n/* Form styling */\n\n.addLocationForm {\n    padding: 0;\n}\n\n.formRow {\n    display: flex;\n    justify-content: space-around;\n    gap: 8px;\n}\n\n#formButtons {\n    margin-top: 8px;\n}\n\n.newLocationInput {\n    padding: 6px;\n    font-size: 1.2rem;\n    width: 100%;\n    border: none;\n    border-radius: 8px;\n    box-sizing: border-box;\n}\n\n.addBtn,\n.cancelBtn {\n    padding: 8px;\n    width: 50%;\n    border-radius: 8px;\n    font-size: 1.1rem;\n    color: var(--white-ish);\n    font-weight: 550;\n}\n\n.addBtn {\n    background-color: var(--accent);\n    border: 2px solid hsl(225, 73%, 30%);\n}\n\n.cancelBtn {\n    background-color: mediumvioletred;\n    border: 2px solid hsl(322, 81%, 30%);\n}\n\n.addBtn:hover,\n.cancelBtn:hover {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.addBtn:active,\n.cancelBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\n.newProjErrorContainer {\n    color: var(--error);\n    font-size: 1.1rem;\n    text-align: center;\n    padding: 8px;\n}\n\n/* Content styling */\n\n.content {\n    margin: 0 0.5rem;\n    font-size: 1.2rem;\n    max-width: 1000px;\n    box-sizing: border-box;\n    overflow: auto;\n}\n\n.WeatherAPIContainter {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0rem;\n    background-color: var(--panel);\n    border-radius: 1rem;\n}\n\n.contentTitle {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n.APISearchBtn {\n    background-color: var(--accent);\n    color: var(--white-ish);\n    padding: 0.5rem 1.5rem;\n    border-radius: 0.5rem;\n}\n\n.APISearchBtn:hover {\n    cursor: pointer;\n    box-shadow: 1px 1px 1px rgb(0, 0, 0, 0.2);\n}\n\n.APISearchBtn:active {\n    box-shadow: 1px 1px 1px rgb(0, 0, 0, 0.4);\n}\n\n.APIErrorContainer {\n    color: var(--error);\n}\n\n/* Footer styling */\n\nfooter {\n    grid-column: 1 / -1;\n    /* background-color: var(--background-color); */\n    color: var(--white-ish);\n    font-size: 1.2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    box-sizing: border-box;\n}\n\nfooter > a {\n    display: flex;\n}\n\n.github {\n    height: 24px;\n    transition: transform 0.3s ease-in-out;\n}\n\n.github:hover {\n    transform: rotate(-360deg) scale(1.2);\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLE9BQU8sYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sYUFBYSxNQUFNLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLGFBQWEsTUFBTSxVQUFVLFlBQVksYUFBYSxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sYUFBYSxNQUFNLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxRQUFRLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNLFlBQVksYUFBYSxXQUFXLE9BQU8sTUFBTSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLEtBQUssT0FBTyxPQUFPLGFBQWEsTUFBTSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLE1BQU0sWUFBWSxXQUFXLE9BQU8sTUFBTSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sYUFBYSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxP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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQU8sdURBQVU7QUFDVi9CLHlEQUFlLElBRWY7O0FBQ0EsTUFBTTlELGNBQWMsR0FBRzVGLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixpQkFBdkIsQ0FBdkI7QUFDQSxNQUFNc0UsU0FBUyxHQUFHbkYsUUFBUSxDQUFDYSxhQUFULENBQXVCLFlBQXZCLENBQWxCLEVBRUE7O0FBQ0ErRSxjQUFjLENBQUMxRSxnQkFBZixDQUFnQyxPQUFoQyxFQUF5Q3lFLHNEQUF6QztBQUVBUixTQUFTLENBQUNqRSxnQkFBVixDQUEyQixPQUEzQixFQUFxQ0MsQ0FBRCxJQUFPO0VBQ3ZDQSxDQUFDLENBQUNxSSxjQUFGO0VBQ0ExRCwwREFBUTtBQUNYLENBSEQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2hlbHBlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9sb2NhbFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9yZXNldC5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3Jlc2V0LmNzcz9lZGUwIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWRkaXRpb25JY29uIGZyb20gJy4vYXNzZXRzL3BsdXMuc3ZnJ1xuaW1wb3J0IGRlbGV0ZUljb24gZnJvbSAnLi9hc3NldHMvZGVsZXRlLnN2ZydcbmltcG9ydCBtZW51SWNvbiBmcm9tICcuL2Fzc2V0cy9tZW51SWNvbi5zdmcnXG5cbmRvY3VtZW50LmNvb2tpZSA9ICdTYW1lU2l0ZT1MYXgnXG5cbmNvbnN0IGNyZWF0ZU1lbnVJY29uID0gKGxpKSA9PiB7XG4gICAgY29uc3QgY2hlY2tsaXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgY2hlY2tsaXN0SWNvbi5zcmMgPSBtZW51SWNvblxuICAgIGNoZWNrbGlzdEljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChjaGVja2xpc3RJY29uKVxufVxuXG4vLyBBZGQgc2luZ2xlIGxvY2F0aW9uIHRvIHdhdGNobGlzdCAoY2FsbGVkIGJlbG93KVxuY29uc3QgY3JlYXRlTGlzdGluZyA9IChsb2NhdGlvbk5hbWUsIGkpID0+IHtcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2F0Y2hsaXN0JylcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGxvY2F0aW9uLmNsYXNzTGlzdC5hZGQoYGxvY2F0aW9uYClcbiAgICBsb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuICAgIC8vIGFzc2lnbiBjbGFzcyB0byBzZWxlY3RlZCBsb2NhdGlvbiBsaXN0aW5nXG4gICAgaWYgKGxvY2F0aW9uTmFtZS5zZWxlY3RlZCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIGxvY2F0aW9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAgICAgLy8gc2VsZWN0TG9jYXRpb24obG9jYXRpb24pXG4gICAgfVxuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXIgdG8gZGlzcGxheSBzZWxlY3RlZCBsb2NhdGlvbidzIHdlYXRoZXJcbiAgICBsb2NhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIGlmIGRlbGV0aW5nIGxpc3RpbmcsIGRvIG5vdCBkaXNwbGF5IHdlYXRoZXJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlSXRlbScpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RMb2NhdGlvbihsb2NhdGlvbilcbiAgICB9KVxuXG4gICAgY3JlYXRlTWVudUljb24obG9jYXRpb24pXG4gICAgY29uc3QgbG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgbG9jYXRpb25UZXh0LnRleHRDb250ZW50ID0gbG9jYXRpb25OYW1lLm5hbWVcbiAgICBsb2NhdGlvbi5hcHBlbmRDaGlsZChsb2NhdGlvblRleHQpXG4gICAgY3JlYXRlRGVsZXRlSWNvbihsb2NhdGlvbiwgaSlcbiAgICB3YXRjaGxpc3QuYXBwZW5kQ2hpbGQobG9jYXRpb24pXG59XG5cbi8vIERpc3BsYXkgZW50aXJlIGFycmF5IG9mIGxvY2F0aW9ucyB0byB3YXRjaGxpc3RcbmNvbnN0IGRpc3BsYXlXYXRjaGxpc3QgPSAoKSA9PiB7XG4gICAgLy8gR3JhYiB3YXRjaGxpc3RcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2F0Y2hsaXN0JylcblxuICAgIC8vIENsZWFyIGxvY2F0aW9uIGxpc3RpbmdzXG4gICAgY29uc3Qgb2xkTGlzdGluZ0NvdW50ID0gd2F0Y2hsaXN0LmNoaWxkRWxlbWVudENvdW50XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRMaXN0aW5nQ291bnQ7IGkrKykge1xuICAgICAgICB3YXRjaGxpc3QuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgIH1cblxuICAgIC8vIEFwcGVuZCBhbGwgbG9jYXRpb25zIHRvIHdhdGNobGlzdFxuICAgIGxldCBpID0gMFxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2VXYXRjaGxpc3QpXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBjcmVhdGVMaXN0aW5nKGxvY2F0aW9uLCBpKVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgaSsrXG4gICAgfSlcbn1cblxuY29uc3Qgc3VibWl0TG9jYXRpb24gPSAoaW5wdXQpID0+IHtcbiAgICAvLyBjcmVhdGUgbG9jYXRpb24gb2JqZWN0XG4gICAgY29uc3QgbmV3TG9jYXRpb24gPSB7XG4gICAgICAgIG5hbWU6IGlucHV0LFxuICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICB9XG5cbiAgICAvLyBncmFiIGFycmF5IGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3QgPSBKU09OLnBhcnNlKFxuICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcpXG4gICAgKVxuXG4gICAgLy8gZGVzZWxlY3QgcHJldmlvdXNseSBzZWxlY3RlZCBsb2NhdGlvblxuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnNlbGVjdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gcHVzaCBsb2NhdGlvbiB0byBhcnJheVxuICAgIHN0b3JhZ2VXYXRjaGxpc3QucHVzaChuZXdMb2NhdGlvbilcbiAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlV2F0Y2hsaXN0KVxuXG4gICAgLy8gc2V0IGFycmF5IGJhY2sgaW50byBzdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0KSlcblxuICAgIC8vIHJlZnJlc2ggd2F0Y2hsaXN0XG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IGRpc3BsYXlXZWF0aGVyID0gKG5ld1dlYXRoZXJDYXJkKSA9PiB7XG4gICAgLy8gZGlzcGxheSBjb250ZW50IHRpdGxlXG4gICAgY29uc3QgY29udGVudFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRUaXRsZScpXG4gICAgY29udGVudFRpdGxlLnRleHRDb250ZW50ID0gYCR7bmV3V2VhdGhlckNhcmQuY2l0eX0sICR7bmV3V2VhdGhlckNhcmQuY291bnRyeX1gXG5cbiAgICAvLyBkaXNwbGF5IHdlYXRoZXIgaWNvblxuICAgIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUltYWdlJylcbiAgICBBUElJbWFnZS5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtuZXdXZWF0aGVyQ2FyZC53ZWF0aGVySWNvbn1AMngucG5nYFxuXG4gICAgLy8gZGlzcGxheSBkZXNjcmlwdGlvblxuICAgIGNvbnN0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyRGVzY3JpcHRpb24nKVxuICAgIHdlYXRoZXJEZXNjcmlwdGlvbi5pbm5lclRleHQgPSBuZXdXZWF0aGVyQ2FyZC53ZWF0aGVyRGVzY3JpcHRpb25cblxuICAgIC8vIGRpc3BsYXkgY3VycmVudCB0ZW1wZXJhdHVyZVxuICAgIGNvbnN0IHRlbXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcENvbnRhaW5lcicpXG4gICAgdGVtcENvbnRhaW5lci5pbm5lclRleHQgPSBgJHtNYXRoLnJvdW5kKG5ld1dlYXRoZXJDYXJkLnRlbXBDdXJyZW50KX1cXHUwMEIwYFxuXG4gICAgLy8gZGlzcGxheSBoaWdoL2xvdyB0ZW1wZXJhdHVyZXNcbiAgICBjb25zdCBsb3dUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvd1RlbXBDb250YWluZXInKVxuICAgIGxvd1RlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYExvdzogJHtNYXRoLnJvdW5kKFxuICAgICAgICBuZXdXZWF0aGVyQ2FyZC50ZW1wTG93XG4gICAgKX1cXHUwMEIwYFxuICAgIGNvbnN0IGhpZ2hUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZ2hUZW1wQ29udGFpbmVyJylcbiAgICBoaWdoVGVtcENvbnRhaW5lci5pbm5lclRleHQgPSBgSGlnaDogJHtNYXRoLnJvdW5kKFxuICAgICAgICBuZXdXZWF0aGVyQ2FyZC50ZW1wSGlnaFxuICAgICl9XFx1MDBCMGBcblxuICAgIC8vIGRpcGxheSBjdXJyZW50IHRpbWVcbiAgICBjb25zdCB0aW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVDb250YWluZXInKVxuICAgIHRpbWVDb250YWluZXIuaW5uZXJUZXh0ID0gYExvY2FsIHRpbWU6ICR7bmV3V2VhdGhlckNhcmQubG9jYWxEYXRlLmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQubG9jYWxEYXRlLmdldE1pbnV0ZXMoKX1gXG5cbiAgICAvLyBkaXNwbGF5IHN1bnJpc2Uvc3Vuc2V0IHRpbWVzXG4gICAgY29uc3Qgc3VucmlzZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdW5yaXNlQ29udGFpbmVyJylcbiAgICBzdW5yaXNlQ29udGFpbmVyLmlubmVyVGV4dCA9IGBTdW5yaXNlOiAke25ld1dlYXRoZXJDYXJkLnN1bnJpc2UuZ2V0SG91cnMoKX06JHtuZXdXZWF0aGVyQ2FyZC5zdW5yaXNlLmdldE1pbnV0ZXMoKX1gXG4gICAgY29uc3Qgc3Vuc2V0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1bnNldENvbnRhaW5lcicpXG4gICAgc3Vuc2V0Q29udGFpbmVyLmlubmVyVGV4dCA9IGBTdW5zZXQ6ICR7bmV3V2VhdGhlckNhcmQuc3Vuc2V0LmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQuc3Vuc2V0LmdldE1pbnV0ZXMoKX1gXG5cbiAgICAvLyBkaXNwbGF5IHdpbmRcbiAgICBjb25zdCB3aW5kQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmRDb250YWluZXInKVxuICAgIHdpbmRDb250YWluZXIuaW5uZXJUZXh0ID0gYFdpbmQ6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQud2luZFNwZWVkXG4gICAgKX1tcGgsICR7bmV3V2VhdGhlckNhcmQud2luZERpcmVjdGlvbn0gKCR7bmV3V2VhdGhlckNhcmQud2luZERlZ3JlZX1cXHUwMEIwKWBcblxuICAgIC8vIGRpc3BsYXkgaHVtaWRpdHlcbiAgICBjb25zdCBodW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eUNvbnRhaW5lcicpXG4gICAgaHVtaWRpdHlDb250YWluZXIuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAke25ld1dlYXRoZXJDYXJkLmh1bWlkaXR5fSVgXG59XG5cbmNvbnN0IHNlbGVjdExvY2F0aW9uID0gKGxpKSA9PiB7XG4gICAgLy8gc2V0IGNvbnRlbnQgdGl0bGVcbiAgICAvLyBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJylcbiAgICAvLyBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSBsaS5pbm5lclRleHRcblxuICAgIC8vIEZldGNoIGN1cnJlbnQgd2VhdGhlclxuICAgIEFQSUNpdHlTZWFyY2gobGkuaW5uZXJUZXh0KVxuXG4gICAgLy8gZ3JhYiBsb2NhdGlvbnMgYXJyYXkgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBkZXNlbGVjdCBhbGwgbG9jYXRpb25zXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc2VsZWN0ZWQgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VsZWN0ZWQgPSAnZmFsc2UnXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gU2VsZWN0IGxvY2F0aW9uIGlmIG9uZSBpcyBjaG9zZW4gKG1haW4gbWVudSBzZWxlY3Rpb24gaXMgaGFuZGxlZCBpbiBldmVudCBsaXN0ZW5lcilcbiAgICBpZiAobGkuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAnbG9jYXRpb24nKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTG9jYXRpb25JZCA9IGxpLmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgICBzdG9yYWdlV2F0Y2hsaXN0W3NlbGVjdGVkTG9jYXRpb25JZF0uc2VsZWN0ZWQgPSAndHJ1ZSdcbiAgICB9XG5cbiAgICAvLyBzZXQgbG9jYXRpb25zIGFycmF5IGJhY2sgaW50byBsb2NhbFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gcmVmcmVzaFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBjcmVhdGVBZGRCdXR0b24gPSAoY29udGFpbmVyKSA9PiB7XG4gICAgY29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnYWRkQnRuJylcbiAgICBhZGRCdG4uaW5uZXJUZXh0ID0gJ3NlYXJjaCdcbiAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdmFsaWRhdGVTZWFyY2goZSkpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZEJ0bilcbn1cblxuY29uc3QgY3JlYXRlQ2FuY2VsQnV0dG9uID0gKGNvbnRhaW5lciwgaSkgPT4ge1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ2NhbmNlbEJ0bicpXG4gICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG4gICAgY2FuY2VsQnRuLmlubmVyVGV4dCA9ICdjYW5jZWwnXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmNlbEJ0bilcbn1cblxuLy8gY3JlYXRlRm9ybVxuY29uc3QgY3JlYXRlRm9ybSA9IChmb3JtKSA9PiB7XG4gICAgLy8gcm93IG9uZTogYXNzaWduIGlucHV0XG4gICAgY29uc3QgZm9ybVJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcm1Sb3cxLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybVJvdycpXG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBuZXdMb2NhdGlvbklucHV0LmNsYXNzTGlzdC5hZGQoJ25ld0xvY2F0aW9uSW5wdXQnKVxuICAgIG5ld0xvY2F0aW9uSW5wdXQucGxhY2Vob2xkZXIgPSAnRmxvcmVuY2UnXG4gICAgbmV3TG9jYXRpb25JbnB1dC5uYW1lID0gJ25ld0xvY2F0aW9uSW5wdXQnXG4gICAgZm9ybVJvdzEuYXBwZW5kQ2hpbGQobmV3TG9jYXRpb25JbnB1dClcblxuICAgIC8vIHJvdyB0d286IHN1Ym1pdCBhbmQgY2FuY2VsIGJ1dHRvbnNcbiAgICBjb25zdCBmb3JtUm93MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9ybVJvdzIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmb3JtUm93JylcbiAgICBmb3JtUm93Mi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Zvcm1CdXR0b25zJylcbiAgICBjcmVhdGVBZGRCdXR0b24oZm9ybVJvdzIsIGZvcm0pXG4gICAgY3JlYXRlQ2FuY2VsQnV0dG9uKGZvcm1Sb3cyLCBmb3JtKVxuXG4gICAgLy8gcm93IHRocmVlOiBhc3NpZ24gZXJyb3IgY2xhc3MgYW5kIHRleHRcbiAgICBjb25zdCBmb3JtUm93MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgLy8gZm9ybVJvdzMuc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxuICAgIGZvcm1Sb3czLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbmV3UHJvakVycm9yQ29udGFpbmVyJylcbiAgICAvLyBmb3JtUm93My5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nXG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cxKVxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzIpXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93Mylcbn1cblxuY29uc3Qgc2hvd0Zvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkTG9jYXRpb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25CdG4nKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkZvcm0nKVxuXG4gICAgYWRkTG9jYXRpb25CdG4uc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Nob3dCbG9jaycpXG59XG5cbmNvbnN0IGhpZGVGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZExvY2F0aW9uQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uQnRuJylcbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25Gb3JtJylcblxuICAgIGFkZExvY2F0aW9uQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2hvd0Jsb2NrJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdoaWRkZW4nKVxufVxuXG4vLyBEZWxldGUgd2F0Y2hsaXN0IGVudHJ5XG5jb25zdCBkZWxldGVXYXRjaGxpc3RFbnRyeSA9IChlKSA9PiB7XG4gICAgLy8gZ3JhYiBhcnJheXMgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBJZGVudGlmeSBlbnRyeSB0byBkZWxldGVcbiAgICBjb25zdCBkb29tZWRJbmRleCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgIC8vIGNvbnN0IGRvb21lZE5hbWUgPSBzdG9yYWdlV2F0Y2hsaXN0W2Rvb21lZEluZGV4XS5uYW1lO1xuXG4gICAgLy8gZGVsZXRlIGVudHJ5XG4gICAgc3RvcmFnZVdhdGNobGlzdC5zcGxpY2UoZG9vbWVkSW5kZXgsIDEpXG5cbiAgICAvLyBzZXQgY2hhbmdlcyB0byBsb2NhbFN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gSWYgZG9vbWVkIGVudHJ5IHdhcyBzZWxlY3RlZCwgY2xlYXIgY29udGVudCBkaXNwbGF5XG4gICAgLy8gY29uc3QgY29udGVudFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnRUaXRsZScpO1xuICAgIC8vIGNvbnN0IGFsbFRhc2tzQ2xhc3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbFRhc2tzJykuY2xhc3NMaXN0XG4gICAgLy8gaWYgKGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9PT0gZG9vbWVkTmFtZSkge1xuICAgIC8vICAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSAnQWxsIHRhc2tzJ1xuICAgIC8vICAgICBhbGxUYXNrc0NsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAvLyB9XG5cbiAgICAvLyByZWZyZXNoIHdhdGNoaXN0XG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IGNyZWF0ZURlbGV0ZUljb24gPSAoY29udGFpbmVyLCBpKSA9PiB7XG4gICAgLy8gY3JlYXRlIGltYWdlIGFuZCBhc3NpZ24gYXR0cmlidXRlc1xuICAgIGNvbnN0IG5ld0RlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0RlbGV0ZUljb24uc3JjID0gZGVsZXRlSWNvblxuICAgIG5ld0RlbGV0ZUljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uIGRlbGV0ZUl0ZW0nKVxuICAgIG5ld0RlbGV0ZUljb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcblxuICAgIC8vIEFERCBFVkVOVCBMSVNURU5FUlxuICAgIGlmIChcbiAgICAgICAgY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSA9PT0gJ2xvY2F0aW9uJyB8fFxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NhdGlvbicpXG4gICAgKSB7XG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyIHRvIGRlbGV0ZSBsb2NhdGlvblxuICAgICAgICBuZXdEZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnlgLFxuICAgICAgICAgICAgYGRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWAsXG4gICAgICAgICAgICBgaGlkZGVuYFxuICAgICAgICApXG4gICAgICAgIG5ld0RlbGV0ZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT5cbiAgICAgICAgICAgIGRlbGV0ZVdhdGNobGlzdEVudHJ5KGUsIGkpXG4gICAgICAgIClcbiAgICAgICAgLy8gZGlzcGxheSB0cmFzaCBpY29uIG9uIGhvdmVyXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICBgLmRlbGV0ZVdhdGNobGlzdEVudHJ5JHtpfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB9KVxuICAgICAgICAvLyBoaWRlIHRyYXNoIGljb25cbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgc3RyYW5nZScpXG4gICAgfVxuICAgIC8vIGFwcGVuZCB0byBjb250YWluZXJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmV3RGVsZXRlSWNvbilcbn1cblxuY29uc3QgY3JlYXRlQWRkaXRpb25JY29uID0gKGxpKSA9PiB7XG4gICAgY29uc3QgbmV3QWRkaXRpb25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBuZXdBZGRpdGlvbkljb24uc3JjID0gYWRkaXRpb25JY29uXG4gICAgbmV3QWRkaXRpb25JY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQobmV3QWRkaXRpb25JY29uKVxufVxuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyBPcGVud2VhdGhlciBBUEkgRnVuY3Rpb25zXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmZ1bmN0aW9uIHRvRGlyZWN0aW9uKGRlZ3JlZSkge1xuICAgIGlmIChkZWdyZWUgPiAzMzcuNSkgcmV0dXJuICdOb3J0aCdcbiAgICBpZiAoZGVncmVlID4gMjkyLjUpIHJldHVybiAnTm9ydGggV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMjQ3LjUpIHJldHVybiAnV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMjAyLjUpIHJldHVybiAnU291dGggV2VzdCdcbiAgICBpZiAoZGVncmVlID4gMTU3LjUpIHJldHVybiAnU291dGgnXG4gICAgaWYgKGRlZ3JlZSA+IDEyMi41KSByZXR1cm4gJ1NvdXRoIEVhc3QnXG4gICAgaWYgKGRlZ3JlZSA+IDY3LjUpIHJldHVybiAnRWFzdCdcbiAgICBpZiAoZGVncmVlID4gMjIuNSkgcmV0dXJuICdOb3J0aCBFYXN0J1xuICAgIHJldHVybiAnTm9ydGgnXG59XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYyMzc2MTE1L2hvdy10by1vYnRhaW4tb3Blbi13ZWF0aGVyLWFwaS1kYXRlLXRpbWUtZnJvbS1jaXR5LWJlaW5nLWZldGNoZWRcbmNvbnN0IGNhbGNDdXJyZW50VGltZSA9ICh0aW1lem9uZSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpXG4gICAgY29uc3QgbG9jYWxUaW1lID0gZC5nZXRUaW1lKClcbiAgICBjb25zdCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwXG4gICAgY29uc3QgdXRjID0gbG9jYWxUaW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbmNvbnN0IGNhbGNTdW5UaW1lID0gKHRpbWUsIHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbE9mZnNldCA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwXG4gICAgY29uc3QgdXRjID0gdGltZSArIGxvY2FsT2Zmc2V0XG4gICAgY29uc3QgbmV3Q2l0eSA9IHV0YyArIDEwMDAgKiB0aW1lem9uZVxuICAgIHJldHVybiBuZXcgRGF0ZShuZXdDaXR5KVxufVxuXG4vLyBjb25zdCBmZXRjaERhaWx5Rm9yZWNhc3QgPSAobGF0LCBsb24pID0+IHtcbi8vICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld1Byb2pFcnJvckNvbnRhaW5lcicpO1xuLy8gICBjb25zb2xlLmxvZyhsYXQpO1xuLy8gICBjb25zb2xlLmxvZyhsb24pO1xuLy8gICAvLyBmZXRjaCBzZXZlbiBkYXkgZm9yZWNhc3Rcbi8vICAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZleGNsdWRlPW1pbnV0ZWx5LGhvdXJseSxhbGVydHMmdW5pdHM9aW1wZXJpYWwmQVBQSUQ9MGE5ZmRiZGZjZDBmNjJlOWJkN2EyMDA3OTdiMTBkNGVgLCB7IG1vZGU6ICdjb3JzJyB9KVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuLy8gICAgIH0pXG4vLyAgICAgLmNhdGNoKChlcnIpID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4vLyAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJztcbi8vICAgICB9KTtcbi8vIH07XG5cbmNvbnN0IGZldGNoSG91cmx5Rm9yZWNhc3QgPSAoY2l0eVF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuICAgIC8vIGZldGNoIGZpdmUgZGF5L3RocmVlIGhvdXIgZm9yZWNhc3RcbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eVF1ZXJ5fSZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsXG4gICAgICAgIHsgbW9kZTogJ2NvcnMnIH1cbiAgICApXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3RBcnJheSA9IFtdXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIC5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uaWNvbn0ucG5nYFxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0hvdXJseUZvcmVjYXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShyZXNwb25zZS5saXN0W2ldLmR0X3R4dCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUZXh0OiByZXNwb25zZS5saXN0W2ldLmR0X3R4dCxcbiAgICAgICAgICAgICAgICAgICAgaHVtaWRpdHk6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICAgICAgcmFpbkNoYW5jZTogcmVzcG9uc2UubGlzdFtpXS5wb3AgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiByZXNwb25zZS5saXN0W2ldLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2UubGlzdFtpXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS5saXN0W2ldLndpbmQuZGVnLFxuICAgICAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS5saXN0W2ldLndpbmQuZGVnKSxcbiAgICAgICAgICAgICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5ndXN0LFxuICAgICAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLmxpc3RbaV0ud2luZC5zcGVlZCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheS5wdXNoKG5ld0hvdXJseUZvcmVjYXN0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3SG91cmx5Rm9yZWNhc3RBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBuZXdIb3VybHlGb3JlY2FzdEFycmF5XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJ1xuICAgICAgICB9KVxufVxuXG5jb25zdCBmZXRjaEN1cnJlbnRXZWF0aGVyID0gKGNpdHlRdWVyeSkgPT4ge1xuICAgIC8vIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUltYWdlJylcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG5cbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCxcbiAgICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAvLyBjb25zdCB7bGF0fSA9IHJlc3BvbnNlLmNvb3JkO1xuICAgICAgICAgICAgLy8gY29uc3Qge2xvbn0gPSByZXNwb25zZS5jb29yZDtcbiAgICAgICAgICAgIC8vIGZldGNoRGFpbHlGb3JlY2FzdChsYXQsIGxvbik7XG4gICAgICAgICAgICBzdWJtaXRMb2NhdGlvbihyZXNwb25zZS5uYW1lKVxuICAgICAgICAgICAgY29uc3QgbmV3V2VhdGhlckNhcmQgPSB7XG4gICAgICAgICAgICAgICAgY2l0eTogcmVzcG9uc2UubmFtZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXNwb25zZS5zeXMuY291bnRyeSxcbiAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICBsb2NhbERhdGU6IGNhbGNDdXJyZW50VGltZShyZXNwb25zZS50aW1lem9uZSksXG4gICAgICAgICAgICAgICAgc3VucmlzZTogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5yaXNlICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHN1bnNldDogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5zZXQgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGVtcEN1cnJlbnQ6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICB0ZW1wSGlnaDogcmVzcG9uc2UubWFpbi50ZW1wX21heCxcbiAgICAgICAgICAgICAgICB0ZW1wTG93OiByZXNwb25zZS5tYWluLnRlbXBfbWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgd2VhdGhlckljb246IHJlc3BvbnNlLndlYXRoZXJbMF0uaWNvbixcbiAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS53aW5kLmd1c3QsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBUElJbWFnZS5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2BcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgICAgICAgZGlzcGxheVdlYXRoZXIobmV3V2VhdGhlckNhcmQpXG4gICAgICAgICAgICByZXR1cm4gbmV3V2VhdGhlckNhcmRcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IEFQSUNpdHlTZWFyY2ggPSAoaW5wdXQpID0+IHtcbiAgICBmZXRjaEN1cnJlbnRXZWF0aGVyKGlucHV0KVxuICAgIGZldGNoSG91cmx5Rm9yZWNhc3QoaW5wdXQpXG59XG5cbmNvbnN0IHZhbGlkYXRlU2VhcmNoID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAvLyBncmFiIGRvbSBlbGVtZW50c1xuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3TG9jYXRpb25JbnB1dCcpXG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuICAgIC8vIHJlc2V0IGVycm9yXG4gICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICcnXG4gICAgLy8gY2hlY2sgZm9yIHNlYXJjaCB0ZXJtXG4gICAgaWYgKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nXG4gICAgfSBlbHNlIHtcbiAgICAgICAgQVBJQ2l0eVNlYXJjaChuZXdMb2NhdGlvbklucHV0LnZhbHVlKVxuICAgICAgICBoaWRlRm9ybSgpXG4gICAgICAgIG5ld0xvY2F0aW9uSW5wdXQudmFsdWUgPSAnJ1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVBZGRpdGlvbkljb24sXG4gICAgY3JlYXRlRGVsZXRlSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIGNyZWF0ZU1lbnVJY29uLFxuICAgIGRpc3BsYXlXYXRjaGxpc3QsXG4gICAgaGlkZUZvcm0sXG4gICAgc2hvd0Zvcm0sXG4gICAgc3VibWl0TG9jYXRpb24sXG4gICAgdmFsaWRhdGVTZWFyY2gsXG59XG4iLCIvLyBjbGFzcyBsb2NhdGlvbnMge1xuLy8gICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uTmFtZSkge1xuLy8gICAgICAgICB0aGlzLm5hbWUgPSBsb2NhdGlvbk5hbWVcbi8vICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkXG4vLyAgICAgfVxuLy8gfVxuXG4vLyBJbml0aWF0ZSBzdG9yYWdlIGFycmF5cyBpZiBsb2NhbFN0b3JhZ2UgaXMgZW1wdHlcbmNvbnN0IGluaXRpYXRlU3RvcmFnZSA9ICgpID0+IHtcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0QXJyYXkgPSBbXVxuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAnc3RvcmFnZVdhdGNobGlzdCcsXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0QXJyYXkpXG4gICAgICAgIClcbiAgICB9XG59XG5cbi8vIGluc2VydCBjb250ZW50IGZyb20gbG9jYWwgc3RvcmFnZSBpZiB0aGVyZSBpcyBhbnlcblxuZXhwb3J0IGRlZmF1bHQgaW5pdGlhdGVTdG9yYWdlXG4iLCJpbXBvcnQge1xuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QsXG59IGZyb20gJy4vaGVscGVyRnVuY3Rpb25zJ1xuaW1wb3J0IGdpdGh1Ykljb24gZnJvbSAnLi9hc3NldHMvR2l0SHViLWxpZ2h0LTMycHgucG5nJ1xuaW1wb3J0IGxvZ29JY29uIGZyb20gJy4vYXNzZXRzL2xvZ29JY29uLnN2ZydcblxuY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpXG5cbiAgICAvLyBkaXNwbGF5IGxvZ29cbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBsb2dvLnNyYyA9IGxvZ29JY29uXG4gICAgbG9nby50YXJnZXQgPSAnX2JsYW5rJ1xuICAgIGxvZ28uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsb2dvJylcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbylcblxuICAgIC8vIGRpc3BsYXkgdGl0bGVcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdXZWF0aGVyc2VydmUnXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKVxuXG4gICAgcmV0dXJuIGhlYWRlclxufVxuXG5jb25zdCBjcmVhdGVNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1lbnUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtZW51JylcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgaGVhZGVyXG4gICAgY29uc3Qgd2F0Y2hsaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0SGVhZGVyJylcbiAgICB3YXRjaGxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSAnV2F0Y2hsaXN0J1xuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBtZW51XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QoKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGFkZExvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBidXR0b25cbiAgICBjb25zdCBhZGRMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBhZGRMb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uQnRuJylcbiAgICBjcmVhdGVBZGRpdGlvbkljb24oYWRkTG9jYXRpb24pXG4gICAgY29uc3QgYWRkTG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgYWRkTG9jYXRpb25UZXh0LmlubmVyVGV4dCA9ICdBZGQgTG9jYXRpb24nXG4gICAgYWRkTG9jYXRpb24uYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25UZXh0KVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uKVxuXG4gICAgLy8gR2VuZXJhdGUgYW5kIGhpZGUgbmV3IGxvY2F0aW9uIGZvcm1cbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkZvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLm1ldGhvZCA9ICdnZXQnXG4gICAgY3JlYXRlRm9ybShhZGRMb2NhdGlvbkZvcm0pXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Gb3JtKVxuXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3RIZWFkZXIpXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3QpXG4gICAgbWVudS5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkNvbnRhaW5lcilcblxuICAgIHJldHVybiBtZW51XG59XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJDYXJkID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBXZWF0aGVyIEFQSSBjb250YWluZXJcbiAgICBjb25zdCBXZWF0aGVyQVBJQ29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnV2VhdGhlckFQSUNvbnRhaW50ZXInLCAnY29udGVudCcpXG5cbiAgICAvLyBjcmVhdGUgQVBJIHRpdGxlXG4gICAgY29uc3QgQVBJVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXG4gICAgQVBJVGl0bGUuY2xhc3NMaXN0LmFkZCgnY29udGVudFRpdGxlJylcbiAgICBBUElUaXRsZS5pbm5lclRleHQgPSAnV2VhdGhlcnNlcnZlJ1xuXG4gICAgLy8gY3JlYXRlIEFQSSBpbWdcbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgQVBJSW1hZ2UuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2UnKVxuXG4gICAgLy8gY3JlYXRlIGRlc2NyaXB0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgZGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnd2VhdGhlckRlc2NyaXB0aW9uJylcblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IHRlbXAgY29udGFpbmVyXG4gICAgY29uc3QgdGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHRlbXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGVtcENvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgaGlnaC9sb3cgdGVtcCBjb250YWluZXJcbiAgICBjb25zdCBoaWdoTG93Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoaWdoTG93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZ2hMb3dDb250YWluZXInKVxuXG4gICAgY29uc3QgbG93VGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGxvd1RlbXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbG93VGVtcENvbnRhaW5lcicpXG4gICAgaGlnaExvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChsb3dUZW1wQ29udGFpbmVyKVxuXG4gICAgY29uc3QgaGlnaFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBoaWdoVGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWdoVGVtcENvbnRhaW5lcicpXG4gICAgaGlnaExvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChoaWdoVGVtcENvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IHRpbWUgY29udGFpbmVyXG4gICAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHRpbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGltZUNvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgc3VucmlzZS9zdW5zZXQgY29udGFpbmVyXG4gICAgY29uc3Qgc3VucmlzZVN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc3VucmlzZVN1bnNldENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdW5yaXNlU3Vuc2V0Q29udGFpbmVyJylcblxuICAgIGNvbnN0IHN1bnJpc2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBzdW5yaXNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1bnJpc2VDb250YWluZXInKVxuICAgIHN1bnJpc2VTdW5zZXRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VucmlzZUNvbnRhaW5lcilcblxuICAgIGNvbnN0IHN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHN1bnNldENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdW5zZXRDb250YWluZXInKVxuICAgIHN1bnJpc2VTdW5zZXRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3Vuc2V0Q29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIHdpbmQgY29udGFpbmVyXG4gICAgY29uc3Qgd2luZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHdpbmRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnd2luZENvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgaHVtaWRpdHkgY29udGFpbmVyXG4gICAgY29uc3QgaHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBodW1pZGl0eUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdodW1pZGl0eUNvbnRhaW5lcicpXG5cbiAgICAvLyBBcHBlbmRcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElUaXRsZSlcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChBUElJbWFnZSlcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkNvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZCh0ZW1wQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGhpZ2hMb3dDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQodGltZUNvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChzdW5yaXNlU3Vuc2V0Q29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHdpbmRDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoaHVtaWRpdHlDb250YWluZXIpXG5cbiAgICByZXR1cm4gV2VhdGhlckFQSUNvbnRhaW50ZXJcbn1cblxuY29uc3QgY3JlYXRlQ29udGVudCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgY29udGVudCBjb250YWluZXJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQnKVxuXG4gICAgLy8gY3JlYXRlIHdlYXRoZXIgYXBwXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQ2FyZCgpKVxuXG4gICAgcmV0dXJuIGNvbnRlbnRcbn1cblxuY29uc3QgY3JlYXRlRm9vdGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpXG5cbiAgICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBjb3B5cmlnaHQudGV4dENvbnRlbnQgPSBgQ29weXJpZ2h0IMKpICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBqY2FtcGJlbGw1N2BcblxuICAgIGNvbnN0IGdpdGh1YkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBnaXRodWJMaW5rLmhyZWYgPSAnaHR0cHM6Ly9naXRodWIuY29tL2pjYW1wYmVsbDU3J1xuICAgIGdpdGh1YkxpbmsudGFyZ2V0ID0gJ19ibGFuaydcblxuICAgIGNvbnN0IG5ld0dpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0dpdGh1Ykljb24uc3JjID0gZ2l0aHViSWNvblxuICAgIG5ld0dpdGh1Ykljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdnaXRodWInKVxuXG4gICAgZ2l0aHViTGluay5hcHBlbmRDaGlsZChuZXdHaXRodWJJY29uKVxuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChjb3B5cmlnaHQpXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGdpdGh1YkxpbmspXG5cbiAgICByZXR1cm4gZm9vdGVyXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZU1lbnUoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUNvbnRlbnQoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUZvb3RlcigpKVxufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9yZXNldC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUdDOztBQUVEOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDtBQUNBO0NBQ0MseUJBQXlCO0NBQ3pCLGlCQUFpQjtBQUNsQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIFBhZ2Ugc3R5bGluZyAqL1xcblxcbjpyb290IHtcXG4gICAgLS1wYW5lbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjY1KTtcXG4gICAgLS1hY2NlbnQ6IHJveWFsYmx1ZTtcXG4gICAgLS1iYWNrZ3JvdW5kOiByZ2IoMCwgMTAsIDM5KTtcXG4gICAgLS13aGl0ZS1pc2g6IHdoaXRlc21va2U7XFxuICAgIC0tZXJyb3I6IGRhcmtyZWQ7XFxufVxcblxcbmJvZHkge1xcbiAgICAvKiBzeXN0ZW0gZm9udCBzdGFjayAqL1xcbiAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sXFxuICAgICAgICBPeHlnZW4tU2FucywgVWJ1bnR1LCBDYW50YXJlbGwsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQpO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDI1MHB4IGNhbGMoMTAwdncgLSAyNTBweCk7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMTEwcHggY2FsYygxMDB2aCAtIDExMHB4IC0gNjJweCkgNjJweDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBtYXgtd2lkdGg6IDEwMHZ3O1xcbiAgICBtYXgtaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLyogR2VuZXJhbCBzdHlsaW5nICovXFxuXFxuaDEge1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNoaWRkZW4ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jc2hvd0Jsb2NrIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qIEhlYWRlciBzdHlsaW5nICovXFxuXFxuLmxvZ28ge1xcbiAgICBtYXgtaGVpZ2h0OiA5MCU7XFxuICAgIG1hcmdpbi1yaWdodDogOHB4O1xcbiAgICAvKiB3aGl0ZXNtb2tlIGNvbG9yICovXFxuICAgIGZpbHRlcjogaW52ZXJ0KDEwMCUpIHNlcGlhKDAlKSBzYXR1cmF0ZSg3NDgwJSkgaHVlLXJvdGF0ZSgyMDFkZWcpXFxuICAgICAgICBicmlnaHRuZXNzKDEwNyUpIGNvbnRyYXN0KDkyJSk7XFxufVxcblxcbmhlYWRlciB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZS1pc2gpO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4vKiBNZW51IHN0eWxpbmcgKi9cXG5cXG4ubWVudSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBhbmVsKTtcXG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG59XFxuXFxuLm1lbnUgPiB1bC53YXRjaGxpc3Qge1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG4uaWNvbiB7XFxuICAgIGhlaWdodDogMS4ycmVtO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuLndhdGNobGlzdCA+IGxpIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA4cHg7XFxufVxcblxcbi53YXRjaGxpc3RIZWFkZXIge1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICBmb250LXNpemU6IDEuM3JlbTtcXG59XFxuXFxuLndhdGNobGlzdCBsaSxcXG4ud2F0Y2hsaXN0SGVhZGVyLFxcbi5hZGRMb2NhdGlvbkJ0bixcXG4uYWRkTG9jYXRpb25Gb3JtIHtcXG4gICAgbWFyZ2luOiAxMHB4IDFyZW07XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbn1cXG5cXG4jd2F0Y2hsaXN0IHtcXG4gICAgbWF4LWhlaWdodDogODAlO1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLndhdGNobGlzdCBsaTpob3ZlcixcXG4uYWRkTG9jYXRpb25CdG46aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAyNDUsIDI0NSwgMC4zKTtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuMik7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLndhdGNobGlzdCBsaTphY3RpdmUsXFxuLmFkZExvY2F0aW9uQnRuOmFjdGl2ZSB7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG5saS5zZWxlY3RlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDI0NSwgMjQ1LCAwLjMpO1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG59XFxuXFxuLmRlbGV0ZUl0ZW0ge1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG59XFxuXFxuLmRlbGV0ZUl0ZW06aG92ZXIge1xcbiAgICBmaWx0ZXI6IGludmVydCg3JSkgc2VwaWEoNTElKSBzYXR1cmF0ZSg1OTUxJSkgaHVlLXJvdGF0ZSgzNTBkZWcpXFxuICAgICAgICBicmlnaHRuZXNzKDE0MCUpIGNvbnRyYXN0KDEzNiUpO1xcbn1cXG5cXG4vKiBGb3JtIHN0eWxpbmcgKi9cXG5cXG4uYWRkTG9jYXRpb25Gb3JtIHtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuLmZvcm1Sb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgZ2FwOiA4cHg7XFxufVxcblxcbiNmb3JtQnV0dG9ucyB7XFxuICAgIG1hcmdpbi10b3A6IDhweDtcXG59XFxuXFxuLm5ld0xvY2F0aW9uSW5wdXQge1xcbiAgICBwYWRkaW5nOiA2cHg7XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi5hZGRCdG4sXFxuLmNhbmNlbEJ0biB7XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICBmb250LXNpemU6IDEuMXJlbTtcXG4gICAgY29sb3I6IHZhcigtLXdoaXRlLWlzaCk7XFxuICAgIGZvbnQtd2VpZ2h0OiA1NTA7XFxufVxcblxcbi5hZGRCdG4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQpO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBoc2woMjI1LCA3MyUsIDMwJSk7XFxufVxcblxcbi5jYW5jZWxCdG4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtZWRpdW12aW9sZXRyZWQ7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGhzbCgzMjIsIDgxJSwgMzAlKTtcXG59XFxuXFxuLmFkZEJ0bjpob3ZlcixcXG4uY2FuY2VsQnRuOmhvdmVyIHtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuMik7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmFkZEJ0bjphY3RpdmUsXFxuLmNhbmNlbEJ0bjphY3RpdmUge1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxuLm5ld1Byb2pFcnJvckNvbnRhaW5lciB7XFxuICAgIGNvbG9yOiB2YXIoLS1lcnJvcik7XFxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDhweDtcXG59XFxuXFxuLyogQ29udGVudCBzdHlsaW5nICovXFxuXFxuLmNvbnRlbnQge1xcbiAgICBtYXJnaW46IDAgMC41cmVtO1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgbWF4LXdpZHRoOiAxMDAwcHg7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4uV2VhdGhlckFQSUNvbnRhaW50ZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDAuNXJlbTtcXG4gICAgbWFyZ2luOiAwcmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wYW5lbCk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxufVxcblxcbi5jb250ZW50VGl0bGUge1xcbiAgICBtYXJnaW46IDEwcHggMXJlbTtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbi5BUElTZWFyY2hCdG4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQpO1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgcGFkZGluZzogMC41cmVtIDEuNXJlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbn1cXG5cXG4uQVBJU2VhcmNoQnRuOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3gtc2hhZG93OiAxcHggMXB4IDFweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG59XFxuXFxuLkFQSVNlYXJjaEJ0bjphY3RpdmUge1xcbiAgICBib3gtc2hhZG93OiAxcHggMXB4IDFweCByZ2IoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxuLkFQSUVycm9yQ29udGFpbmVyIHtcXG4gICAgY29sb3I6IHZhcigtLWVycm9yKTtcXG59XFxuXFxuLyogRm9vdGVyIHN0eWxpbmcgKi9cXG5cXG5mb290ZXIge1xcbiAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTsgKi9cXG4gICAgY29sb3I6IHZhcigtLXdoaXRlLWlzaCk7XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5mb290ZXIgPiBhIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmdpdGh1YiB7XFxuICAgIGhlaWdodDogMjRweDtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5naXRodWI6aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKSBzY2FsZSgxLjIpO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGlCQUFpQjs7QUFFakI7SUFDSSxrQ0FBa0M7SUFDbEMsbUJBQW1CO0lBQ25CLDRC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O0lBQ3ZCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixTQUFTO0lBQ1Qsc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixzQ0FBc0M7QUFDMUM7O0FBRUE7SUFDSSxxQ0FBcUM7QUFDekNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogUGFnZSBzdHlsaW5nICovXFxuXFxuOnJvb3Qge1xcbiAgICAtLXBhbmVsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNjUpO1xcbiAgICAtLWFjY2VudDogcm95YWxibHVlO1xcbiAgICAtLWJhY2tncm91bmQ6IHJnYigwLCAxMCwgMzkpO1xcbiAgICAtLXdoaXRlLWlzaDogd2hpdGVzbW9rZTtcXG4gICAgLS1lcnJvcjogZGFya3JlZDtcXG59XFxuXFxuYm9keSB7XFxuICAgIC8qIHN5c3RlbSBmb250IHN0YWNrICovXFxuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90byxcXG4gICAgICAgIE94eWdlbi1TYW5zLCBVYnVudHUsIENhbnRhcmVsbCwgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZCk7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjUwcHggY2FsYygxMDB2dyAtIDI1MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMTBweCBjYWxjKDEwMHZoIC0gMTEwcHggLSA2MnB4KSA2MnB4O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG1heC13aWR0aDogMTAwdnc7XFxuICAgIG1heC1oZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4vKiBHZW5lcmFsIHN0eWxpbmcgKi9cXG5cXG5oMSB7XFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI2hpZGRlbiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNzaG93QmxvY2sge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyogSGVhZGVyIHN0eWxpbmcgKi9cXG5cXG4ubG9nbyB7XFxuICAgIG1heC1oZWlnaHQ6IDkwJTtcXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XFxuICAgIC8qIHdoaXRlc21va2UgY29sb3IgKi9cXG4gICAgZmlsdGVyOiBpbnZlcnQoMTAwJSkgc2VwaWEoMCUpIHNhdHVyYXRlKDc0ODAlKSBodWUtcm90YXRlKDIwMWRlZylcXG4gICAgICAgIGJyaWdodG5lc3MoMTA3JSkgY29udHJhc3QoOTIlKTtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgY29sb3I6IHZhcigtLXdoaXRlLWlzaCk7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi8qIE1lbnUgc3R5bGluZyAqL1xcblxcbi5tZW51IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGFuZWwpO1xcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbn1cXG5cXG4ubWVudSA+IHVsLndhdGNobGlzdCB7XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbi5pY29uIHtcXG4gICAgaGVpZ2h0OiAxLjJyZW07XFxufVxcblxcbi53YXRjaGxpc3Qge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4ud2F0Y2hsaXN0ID4gbGkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDhweDtcXG59XFxuXFxuLndhdGNobGlzdEhlYWRlciB7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIGZvbnQtc2l6ZTogMS4zcmVtO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpLFxcbi53YXRjaGxpc3RIZWFkZXIsXFxuLmFkZExvY2F0aW9uQnRuLFxcbi5hZGRMb2NhdGlvbkZvcm0ge1xcbiAgICBtYXJnaW46IDEwcHggMXJlbTtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbiN3YXRjaGxpc3Qge1xcbiAgICBtYXgtaGVpZ2h0OiA4MCU7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpOmhvdmVyLFxcbi5hZGRMb2NhdGlvbkJ0bjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDI0NSwgMjQ1LCAwLjMpO1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpOmFjdGl2ZSxcXG4uYWRkTG9jYXRpb25CdG46YWN0aXZlIHtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbmxpLnNlbGVjdGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUsIDAuMyk7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjIpO1xcbn1cXG5cXG4uZGVsZXRlSXRlbSB7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cXG5cXG4uZGVsZXRlSXRlbTpob3ZlciB7XFxuICAgIGZpbHRlcjogaW52ZXJ0KDclKSBzZXBpYSg1MSUpIHNhdHVyYXRlKDU5NTElKSBodWUtcm90YXRlKDM1MGRlZylcXG4gICAgICAgIGJyaWdodG5lc3MoMTQwJSkgY29udHJhc3QoMTM2JSk7XFxufVxcblxcbi8qIEZvcm0gc3R5bGluZyAqL1xcblxcbi5hZGRMb2NhdGlvbkZvcm0ge1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4uZm9ybVJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBnYXA6IDhweDtcXG59XFxuXFxuI2Zvcm1CdXR0b25zIHtcXG4gICAgbWFyZ2luLXRvcDogOHB4O1xcbn1cXG5cXG4ubmV3TG9jYXRpb25JbnB1dCB7XFxuICAgIHBhZGRpbmc6IDZweDtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLmFkZEJ0bixcXG4uY2FuY2VsQnRuIHtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgZm9udC13ZWlnaHQ6IDU1MDtcXG59XFxuXFxuLmFkZEJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudCk7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGhzbCgyMjUsIDczJSwgMzAlKTtcXG59XFxuXFxuLmNhbmNlbEJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IG1lZGl1bXZpb2xldHJlZDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgaHNsKDMyMiwgODElLCAzMCUpO1xcbn1cXG5cXG4uYWRkQnRuOmhvdmVyLFxcbi5jYW5jZWxCdG46aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYWRkQnRuOmFjdGl2ZSxcXG4uY2FuY2VsQnRuOmFjdGl2ZSB7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4ubmV3UHJvakVycm9yQ29udGFpbmVyIHtcXG4gICAgY29sb3I6IHZhcigtLWVycm9yKTtcXG4gICAgZm9udC1zaXplOiAxLjFyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogOHB4O1xcbn1cXG5cXG4vKiBDb250ZW50IHN0eWxpbmcgKi9cXG5cXG4uY29udGVudCB7XFxuICAgIG1hcmdpbjogMCAwLjVyZW07XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICBtYXgtd2lkdGg6IDEwMDBweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi5XZWF0aGVyQVBJQ29udGFpbnRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMC41cmVtO1xcbiAgICBtYXJnaW46IDByZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBhbmVsKTtcXG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG59XFxuXFxuLmNvbnRlbnRUaXRsZSB7XFxuICAgIG1hcmdpbjogMTBweCAxcmVtO1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG59XFxuXFxuLkFQSVNlYXJjaEJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudCk7XFxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZS1pc2gpO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMS41cmVtO1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW07XFxufVxcblxcbi5BUElTZWFyY2hCdG46aG92ZXIge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJveC1zaGFkb3c6IDFweCAxcHggMXB4IHJnYigwLCAwLCAwLCAwLjIpO1xcbn1cXG5cXG4uQVBJU2VhcmNoQnRuOmFjdGl2ZSB7XFxuICAgIGJveC1zaGFkb3c6IDFweCAxcHggMXB4IHJnYigwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4uQVBJRXJyb3JDb250YWluZXIge1xcbiAgICBjb2xvcjogdmFyKC0tZXJyb3IpO1xcbn1cXG5cXG4vKiBGb290ZXIgc3R5bGluZyAqL1xcblxcbmZvb3RlciB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpOyAqL1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmZvb3RlciA+IGEge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZ2l0aHViIHtcXG4gICAgaGVpZ2h0OiAyNHB4O1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLmdpdGh1Yjpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpIHNjYWxlKDEuMik7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcmVzZXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yZXNldC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9yZXNldC5jc3MnXG5pbXBvcnQgJy4vc3R5bGUuY3NzJ1xuaW1wb3J0IGluaXRpYWxpemUgZnJvbSAnLi9wYWdlTG9hZGVyJ1xuaW1wb3J0IGluaXRpYXRlU3RvcmFnZSBmcm9tICcuL2xvY2FsU3RvcmFnZSdcbmltcG9ydCB7IHNob3dGb3JtLCBoaWRlRm9ybSB9IGZyb20gJy4vaGVscGVyRnVuY3Rpb25zJ1xuXG5pbml0aWFsaXplKClcbmluaXRpYXRlU3RvcmFnZSgpXG5cbi8vIEdyYWIgRE9NIGVsZW1lbnRzXG5jb25zdCBhZGRMb2NhdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkJ0bicpXG5jb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsQnRuJylcblxuLy8gRXZlbnQgbGlzdGVuZXJzXG5hZGRMb2NhdGlvbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dGb3JtKVxuXG5jYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGhpZGVGb3JtKClcbn0pXG4iXSwibmFtZXMiOlsiYWRkaXRpb25JY29uIiwiZGVsZXRlSWNvbiIsIm1lbnVJY29uIiwiZG9jdW1lbnQiLCJjb29raWUiLCJjcmVhdGVNZW51SWNvbiIsImxpIiwiY2hlY2tsaXN0SWNvbiIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUxpc3RpbmciLCJsb2NhdGlvbk5hbWUiLCJpIiwid2F0Y2hsaXN0IiwicXVlcnlTZWxlY3RvciIsImxvY2F0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIiwic2VsZWN0ZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsImNvbnRhaW5zIiwic2VsZWN0TG9jYXRpb24iLCJsb2NhdGlvblRleHQiLCJ0ZXh0Q29udGVudCIsIm5hbWUiLCJjcmVhdGVEZWxldGVJY29uIiwiZGlzcGxheVdhdGNobGlzdCIsIm9sZExpc3RpbmdDb3VudCIsImNoaWxkRWxlbWVudENvdW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsInN0b3JhZ2VXYXRjaGxpc3QiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZm9yRWFjaCIsInN1Ym1pdExvY2F0aW9uIiwiaW5wdXQiLCJuZXdMb2NhdGlvbiIsInB1c2giLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGlzcGxheVdlYXRoZXIiLCJuZXdXZWF0aGVyQ2FyZCIsImNvbnRlbnRUaXRsZSIsImNpdHkiLCJjb3VudHJ5IiwiQVBJSW1hZ2UiLCJ3ZWF0aGVySWNvbiIsIndlYXRoZXJEZXNjcmlwdGlvbiIsImlubmVyVGV4dCIsInRlbXBDb250YWluZXIiLCJNYXRoIiwicm91bmQiLCJ0ZW1wQ3VycmVudCIsImxvd1RlbXBDb250YWluZXIiLCJ0ZW1wTG93IiwiaGlnaFRlbXBDb250YWluZXIiLCJ0ZW1wSGlnaCIsInRpbWVDb250YWluZXIiLCJsb2NhbERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJzdW5yaXNlQ29udGFpbmVyIiwic3VucmlzZSIsInN1bnNldENvbnRhaW5lciIsInN1bnNldCIsIndpbmRDb250YWluZXIiLCJ3aW5kU3BlZWQiLCJ3aW5kRGlyZWN0aW9uIiwid2luZERlZ3JlZSIsImh1bWlkaXR5Q29udGFpbmVyIiwiaHVtaWRpdHkiLCJBUElDaXR5U2VhcmNoIiwiZ2V0QXR0cmlidXRlIiwic2VsZWN0ZWRMb2NhdGlvbklkIiwiY3JlYXRlQWRkQnV0dG9uIiwiY29udGFpbmVyIiwiYWRkQnRuIiwidmFsaWRhdGVTZWFyY2giLCJjcmVhdGVDYW5jZWxCdXR0b24iLCJjYW5jZWxCdG4iLCJjcmVhdGVGb3JtIiwiZm9ybSIsImZvcm1Sb3cxIiwibmV3TG9jYXRpb25JbnB1dCIsInBsYWNlaG9sZGVyIiwiZm9ybVJvdzIiLCJmb3JtUm93MyIsInNob3dGb3JtIiwiYWRkTG9jYXRpb25CdG4iLCJhZGRMb2NhdGlvbkZvcm0iLCJoaWRlRm9ybSIsImRlbGV0ZVdhdGNobGlzdEVudHJ5IiwiZG9vbWVkSW5kZXgiLCJzcGxpY2UiLCJuZXdEZWxldGVJY29uIiwidHJhc2hJY29uIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZUFkZGl0aW9uSWNvbiIsIm5ld0FkZGl0aW9uSWNvbiIsInRvRGlyZWN0aW9uIiwiZGVncmVlIiwiY2FsY0N1cnJlbnRUaW1lIiwidGltZXpvbmUiLCJkIiwiRGF0ZSIsImxvY2FsVGltZSIsImdldFRpbWUiLCJsb2NhbE9mZnNldCIsImdldFRpbWV6b25lT2Zmc2V0IiwidXRjIiwibmV3Q2l0eSIsImNhbGNTdW5UaW1lIiwidGltZSIsImZldGNoSG91cmx5Rm9yZWNhc3QiLCJjaXR5UXVlcnkiLCJuZXdQcm9qRXJyb3JDb250YWluZXIiLCJmZXRjaCIsIm1vZGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwibmV3SG91cmx5Rm9yZWNhc3RBcnJheSIsIm5ld0hvdXJseUZvcmVjYXN0IiwiZGF0ZSIsImxpc3QiLCJkdF90eHQiLCJkYXRlVGV4dCIsIm1haW4iLCJyYWluQ2hhbmNlIiwicG9wIiwidGVtcGVyYXR1cmUiLCJ0ZW1wIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXIiLCJkZXNjcmlwdGlvbiIsIndpbmQiLCJkZWciLCJ3aW5kR3VzdCIsImd1c3QiLCJzcGVlZCIsImNhdGNoIiwiZXJyIiwiZmV0Y2hDdXJyZW50V2VhdGhlciIsInN5cyIsInRlbXBfbWF4IiwidGVtcF9taW4iLCJpY29uIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsImluaXRpYXRlU3RvcmFnZSIsInN0b3JhZ2VXYXRjaGxpc3RBcnJheSIsImxlbmd0aCIsImdpdGh1Ykljb24iLCJsb2dvSWNvbiIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImxvZ28iLCJ0aXRsZSIsImNyZWF0ZU1lbnUiLCJtZW51Iiwid2F0Y2hsaXN0SGVhZGVyIiwiYWRkTG9jYXRpb25Db250YWluZXIiLCJhZGRMb2NhdGlvbiIsImFkZExvY2F0aW9uVGV4dCIsIm1ldGhvZCIsImNyZWF0ZVdlYXRoZXJDYXJkIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJBUElUaXRsZSIsImRlc2NyaXB0aW9uQ29udGFpbmVyIiwiaGlnaExvd0NvbnRhaW5lciIsInN1bnJpc2VTdW5zZXRDb250YWluZXIiLCJjcmVhdGVDb250ZW50IiwiY29udGVudCIsImNyZWF0ZUZvb3RlciIsImZvb3RlciIsImNvcHlyaWdodCIsImdldEZ1bGxZZWFyIiwiZ2l0aHViTGluayIsImhyZWYiLCJuZXdHaXRodWJJY29uIiwiaW5pdGlhbGl6ZSIsImJvZHkiXSwic291cmNlUm9vdCI6IiJ9