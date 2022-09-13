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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQUcsUUFBUSxDQUFDQyxNQUFULEdBQWtCLGNBQWxCOztBQUVBLE1BQU1DLGNBQWMsR0FBSUMsRUFBRCxJQUFRO0VBQzNCLE1BQU1DLGFBQWEsR0FBR0osUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQXRCO0VBQ0FELGFBQWEsQ0FBQ0UsR0FBZCxHQUFvQlAsaURBQXBCO0VBQ0FLLGFBQWEsQ0FBQ0csWUFBZCxDQUEyQixPQUEzQixFQUFvQyxNQUFwQztFQUNBSixFQUFFLENBQUNLLFdBQUgsQ0FBZUosYUFBZjtBQUNILENBTEQsRUFPQTs7O0FBQ0EsTUFBTUssYUFBYSxHQUFHLENBQUNDLFlBQUQsRUFBZUMsQ0FBZixLQUFxQjtFQUN2QyxNQUFNQyxTQUFTLEdBQUdaLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixZQUF2QixDQUFsQjtFQUVBLE1BQU1DLFFBQVEsR0FBR2QsUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQWpCO0VBQ0FTLFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsR0FBbkI7RUFDQUYsUUFBUSxDQUFDUCxZQUFULENBQXNCLElBQXRCLFlBQStCSSxDQUEvQixHQUx1QyxDQU12Qzs7RUFDQSxJQUFJRCxZQUFZLENBQUNPLFFBQWIsS0FBMEIsTUFBOUIsRUFBc0M7SUFDbENILFFBQVEsQ0FBQ0MsU0FBVCxDQUFtQkMsR0FBbkIsQ0FBdUIsVUFBdkIsRUFEa0MsQ0FFbEM7RUFDSCxDQVZzQyxDQVl2Qzs7O0VBQ0FGLFFBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBb0NDLENBQUQsSUFBTztJQUN0QztJQUNBLElBQUlBLENBQUMsQ0FBQ0MsTUFBRixDQUFTTCxTQUFULENBQW1CTSxRQUFuQixDQUE0QixZQUE1QixDQUFKLEVBQStDO01BQzNDO0lBQ0g7O0lBQ0RDLGNBQWMsQ0FBQ1IsUUFBRCxDQUFkO0VBQ0gsQ0FORDtFQVFBWixjQUFjLENBQUNZLFFBQUQsQ0FBZDtFQUNBLE1BQU1TLFlBQVksR0FBR3ZCLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUFyQjtFQUNBa0IsWUFBWSxDQUFDQyxXQUFiLEdBQTJCZCxZQUFZLENBQUNlLElBQXhDO0VBQ0FYLFFBQVEsQ0FBQ04sV0FBVCxDQUFxQmUsWUFBckI7RUFDQUcsZ0JBQWdCLENBQUNaLFFBQUQsRUFBV0gsQ0FBWCxDQUFoQjtFQUNBQyxTQUFTLENBQUNKLFdBQVYsQ0FBc0JNLFFBQXRCO0FBQ0gsQ0EzQkQsRUE2QkE7OztBQUNBLE1BQU1hLGdCQUFnQixHQUFHLE1BQU07RUFDM0I7RUFDQSxNQUFNZixTQUFTLEdBQUdaLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixZQUF2QixDQUFsQixDQUYyQixDQUkzQjs7RUFDQSxNQUFNZSxlQUFlLEdBQUdoQixTQUFTLENBQUNpQixpQkFBbEMsQ0FMMkIsQ0FNM0I7O0VBQ0EsS0FBSyxJQUFJbEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2lCLGVBQXBCLEVBQXFDakIsQ0FBQyxFQUF0QyxFQUEwQztJQUN0Q0MsU0FBUyxDQUFDa0IsVUFBVixDQUFxQkMsTUFBckI7RUFDSCxDQVQwQixDQVczQjs7O0VBQ0EsSUFBSXBCLENBQUMsR0FBRyxDQUFSO0VBQ0EsTUFBTXFCLGdCQUFnQixHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FDckJDLFlBQVksQ0FBQ0MsT0FBYixDQUFxQixrQkFBckIsQ0FEcUIsQ0FBekIsQ0FiMkIsQ0FnQjNCOztFQUNBSixnQkFBZ0IsQ0FBQ0ssT0FBakIsQ0FBMEJ2QixRQUFELElBQWM7SUFDbkNMLGFBQWEsQ0FBQ0ssUUFBRCxFQUFXSCxDQUFYLENBQWIsQ0FEbUMsQ0FFbkM7O0lBQ0FBLENBQUM7RUFDSixDQUpEO0FBS0gsQ0F0QkQ7O0FBd0JBLE1BQU0yQixjQUFjLEdBQUlDLEtBQUQsSUFBVztFQUM5QjtFQUNBLE1BQU1DLFdBQVcsR0FBRztJQUNoQmYsSUFBSSxFQUFFYyxLQURVO0lBRWhCdEIsUUFBUSxFQUFFO0VBRk0sQ0FBcEIsQ0FGOEIsQ0FPOUI7O0VBQ0EsTUFBTWUsZ0JBQWdCLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUNyQkMsWUFBWSxDQUFDQyxPQUFiLENBQXFCLGtCQUFyQixDQURxQixDQUF6QixDQVI4QixDQVk5Qjs7RUFDQUosZ0JBQWdCLENBQUNLLE9BQWpCLENBQTBCdkIsUUFBRCxJQUFjO0lBQ25DLElBQUlBLFFBQVEsQ0FBQ0csUUFBVCxLQUFzQixJQUExQixFQUFnQztNQUM1QkgsUUFBUSxDQUFDRyxRQUFULEdBQW9CLEtBQXBCO0lBQ0g7RUFDSixDQUpELEVBYjhCLENBbUI5Qjs7RUFDQWUsZ0JBQWdCLENBQUNTLElBQWpCLENBQXNCRCxXQUF0QixFQXBCOEIsQ0FxQjlCO0VBRUE7O0VBQ0FMLFlBQVksQ0FBQ08sT0FBYixDQUFxQixrQkFBckIsRUFBeUNULElBQUksQ0FBQ1UsU0FBTCxDQUFlWCxnQkFBZixDQUF6QyxFQXhCOEIsQ0EwQjlCOztFQUNBTCxnQkFBZ0I7QUFDbkIsQ0E1QkQ7O0FBOEJBLE1BQU1pQixjQUFjLEdBQUlDLGNBQUQsSUFBb0I7RUFDdkM7RUFDQSxNQUFNQyxZQUFZLEdBQUc5QyxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBckI7RUFDQWlDLFlBQVksQ0FBQ3RCLFdBQWIsYUFBOEJxQixjQUFjLENBQUNFLElBQTdDLGVBQXNERixjQUFjLENBQUNHLE9BQXJFLEVBSHVDLENBS3ZDOztFQUNBLE1BQU1DLFFBQVEsR0FBR2pELFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixXQUF2QixDQUFqQjtFQUNBb0MsUUFBUSxDQUFDM0MsR0FBVCw4Q0FBbUR1QyxjQUFjLENBQUNLLFdBQWxFLGFBUHVDLENBU3ZDOztFQUNBLE1BQU1DLGtCQUFrQixHQUFHbkQsUUFBUSxDQUFDYSxhQUFULENBQXVCLHFCQUF2QixDQUEzQjtFQUNBc0Msa0JBQWtCLENBQUNDLFNBQW5CLHNCQUEyQ1AsY0FBYyxDQUFDTSxrQkFBMUQsRUFYdUMsQ0FhdkM7O0VBQ0EsTUFBTUUsYUFBYSxHQUFHckQsUUFBUSxDQUFDYSxhQUFULENBQXVCLGdCQUF2QixDQUF0QjtFQUNBd0MsYUFBYSxDQUFDRCxTQUFkLGFBQTZCRSxJQUFJLENBQUNDLEtBQUwsQ0FBV1YsY0FBYyxDQUFDVyxXQUExQixDQUE3QixVQWZ1QyxDQWlCdkM7O0VBQ0EsTUFBTUMsZ0JBQWdCLEdBQUd6RCxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsbUJBQXZCLENBQXpCO0VBQ0E0QyxnQkFBZ0IsQ0FBQ0wsU0FBakIsOEJBQWlERSxJQUFJLENBQUNDLEtBQUwsQ0FDN0NWLGNBQWMsQ0FBQ2EsT0FEOEIsQ0FBakQ7RUFHQSxNQUFNQyxpQkFBaUIsR0FBRzNELFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixvQkFBdkIsQ0FBMUI7RUFDQThDLGlCQUFpQixDQUFDUCxTQUFsQiwrQkFBbURFLElBQUksQ0FBQ0MsS0FBTCxDQUMvQ1YsY0FBYyxDQUFDZSxRQURnQyxDQUFuRCxVQXZCdUMsQ0EyQnZDOztFQUNBLE1BQU1DLGFBQWEsR0FBRzdELFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixnQkFBdkIsQ0FBdEI7RUFDQWdELGFBQWEsQ0FBQ1QsU0FBZCx5QkFBeUNQLGNBQWMsQ0FBQ2lCLFNBQWYsQ0FBeUJDLFFBQXpCLEVBQXpDLGNBQWdGbEIsY0FBYyxDQUFDaUIsU0FBZixDQUF5QkUsVUFBekIsRUFBaEYsRUE3QnVDLENBK0J2Qzs7RUFDQSxNQUFNQyxnQkFBZ0IsR0FBR2pFLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixtQkFBdkIsQ0FBekI7RUFDQW9ELGdCQUFnQixDQUFDYixTQUFqQixzQkFBeUNQLGNBQWMsQ0FBQ3FCLE9BQWYsQ0FBdUJILFFBQXZCLEVBQXpDLGNBQThFbEIsY0FBYyxDQUFDcUIsT0FBZixDQUF1QkYsVUFBdkIsRUFBOUU7RUFDQSxNQUFNRyxlQUFlLEdBQUduRSxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsa0JBQXZCLENBQXhCO0VBQ0FzRCxlQUFlLENBQUNmLFNBQWhCLHFCQUF1Q1AsY0FBYyxDQUFDdUIsTUFBZixDQUFzQkwsUUFBdEIsRUFBdkMsY0FBMkVsQixjQUFjLENBQUN1QixNQUFmLENBQXNCSixVQUF0QixFQUEzRSxFQW5DdUMsQ0FxQ3ZDOztFQUNBLE1BQU1LLGFBQWEsR0FBR3JFLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixnQkFBdkIsQ0FBdEI7RUFDQXdELGFBQWEsQ0FBQ2pCLFNBQWQsbUJBQW1DRSxJQUFJLENBQUNDLEtBQUwsQ0FDL0JWLGNBQWMsQ0FBQ3lCLFNBRGdCLENBQW5DLGtCQUVTekIsY0FBYyxDQUFDMEIsYUFGeEIsZUFFMEMxQixjQUFjLENBQUMyQixVQUZ6RCxXQXZDdUMsQ0EyQ3ZDOztFQUNBLE1BQU1DLGlCQUFpQixHQUFHekUsUUFBUSxDQUFDYSxhQUFULENBQXVCLG9CQUF2QixDQUExQjtFQUNBNEQsaUJBQWlCLENBQUNyQixTQUFsQix1QkFBMkNQLGNBQWMsQ0FBQzZCLFFBQTFEO0FBQ0gsQ0E5Q0Q7O0FBZ0RBLE1BQU1DLGVBQWUsR0FBSUMsc0JBQUQsSUFBNEI7RUFDaEQsTUFBTUMsV0FBVyxHQUFHN0UsUUFBUSxDQUFDYSxhQUFULENBQXVCLGNBQXZCLENBQXBCLENBRGdELENBR2hEOztFQUNBLE1BQU1pRSxXQUFXLEdBQUdELFdBQVcsQ0FBQ2hELGlCQUFoQyxDQUpnRCxDQUtoRDs7RUFDQSxLQUFLLElBQUlsQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHbUUsV0FBcEIsRUFBaUNuRSxDQUFDLEVBQWxDLEVBQXNDO0lBQ2xDa0UsV0FBVyxDQUFDL0MsVUFBWixDQUF1QkMsTUFBdkI7RUFDSCxDQVIrQyxDQVVoRDtFQUNBOzs7RUFDQSxLQUFLLElBQUlwQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHaUUsc0JBQXNCLENBQUNHLE1BQTNDLEVBQW1EcEUsQ0FBQyxFQUFwRCxFQUF3RDtJQUNwRCxNQUFNcUUsWUFBWSxHQUFHaEYsUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQXJCO0lBQ0EyRSxZQUFZLENBQUNqRSxTQUFiLENBQXVCQyxHQUF2QixDQUEyQixjQUEzQixFQUZvRCxDQUlwRDs7SUFDQSxNQUFNaUUsWUFBWSxHQUFHakYsUUFBUSxDQUFDSyxhQUFULENBQXVCLE1BQXZCLENBQXJCO0lBQ0E0RSxZQUFZLENBQUNsRSxTQUFiLENBQXVCQyxHQUF2QixDQUEyQixjQUEzQjtJQUNBaUUsWUFBWSxDQUFDN0IsU0FBYixhQUNJd0Isc0JBQXNCLENBQUNqRSxDQUFELENBQXRCLENBQTBCdUUsSUFBMUIsQ0FBK0JDLFFBQS9CLEtBQTRDLENBRGhELGNBRUlQLHNCQUFzQixDQUFDakUsQ0FBRCxDQUF0QixDQUEwQnVFLElBQTFCLENBQStCRSxPQUEvQixFQUZKO0lBR0FKLFlBQVksQ0FBQ3hFLFdBQWIsQ0FBeUJ5RSxZQUF6QixFQVZvRCxDQVlwRDs7SUFDQSxNQUFNSSxZQUFZLEdBQUdyRixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBckI7SUFDQWdGLFlBQVksQ0FBQ3RFLFNBQWIsQ0FBdUJDLEdBQXZCLENBQTJCLGNBQTNCO0lBQ0FxRSxZQUFZLENBQUNqQyxTQUFiLEdBQ0l3QixzQkFBc0IsQ0FBQ2pFLENBQUQsQ0FBdEIsQ0FBMEJ1RSxJQUExQixDQUErQkksa0JBQS9CLEVBREo7SUFFQU4sWUFBWSxDQUFDeEUsV0FBYixDQUF5QjZFLFlBQXpCLEVBakJvRCxDQW1CcEQ7O0lBQ0EsTUFBTUUsbUJBQW1CLEdBQUd2RixRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBNUI7SUFDQWtGLG1CQUFtQixDQUFDeEUsU0FBcEIsQ0FBOEJDLEdBQTlCLENBQWtDLHFCQUFsQztJQUNBdUUsbUJBQW1CLENBQUNqRixHQUFwQiw4Q0FBOERzRSxzQkFBc0IsQ0FBQ2pFLENBQUQsQ0FBdEIsQ0FBMEJ1QyxXQUF4RjtJQUNBOEIsWUFBWSxDQUFDeEUsV0FBYixDQUF5QitFLG1CQUF6QixFQXZCb0QsQ0F5QnBEOztJQUNBLE1BQU1DLDBCQUEwQixHQUFHeEYsUUFBUSxDQUFDSyxhQUFULENBQXVCLE1BQXZCLENBQW5DO0lBQ0FtRiwwQkFBMEIsQ0FBQ3pFLFNBQTNCLENBQXFDQyxHQUFyQyxDQUF5Qyw0QkFBekM7SUFDQXdFLDBCQUEwQixDQUFDcEMsU0FBM0IsR0FDSXdCLHNCQUFzQixDQUFDakUsQ0FBRCxDQUF0QixDQUEwQndDLGtCQUQ5QjtJQUVBNkIsWUFBWSxDQUFDeEUsV0FBYixDQUF5QmdGLDBCQUF6QixFQTlCb0QsQ0FnQ3BEOztJQUNBLE1BQU1DLFlBQVksR0FBR3pGLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUFyQjtJQUNBb0YsWUFBWSxDQUFDMUUsU0FBYixDQUF1QkMsR0FBdkIsQ0FBMkIsY0FBM0I7SUFDQXlFLFlBQVksQ0FBQ3JDLFNBQWIsYUFBNEJFLElBQUksQ0FBQ0MsS0FBTCxDQUN4QnFCLHNCQUFzQixDQUFDakUsQ0FBRCxDQUF0QixDQUEwQitFLFdBREYsQ0FBNUI7SUFHQVYsWUFBWSxDQUFDeEUsV0FBYixDQUF5QmlGLFlBQXpCO0lBRUFaLFdBQVcsQ0FBQ3JFLFdBQVosQ0FBd0J3RSxZQUF4QjtFQUNIO0FBQ0osQ0F0REQ7O0FBd0RBLE1BQU0xRCxjQUFjLEdBQUluQixFQUFELElBQVE7RUFDM0I7RUFDQXdGLGFBQWEsQ0FBQ3hGLEVBQUUsQ0FBQ2lELFNBQUosQ0FBYixDQUYyQixDQUkzQjs7RUFDQSxNQUFNcEIsZ0JBQWdCLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUNyQkMsWUFBWSxDQUFDQyxPQUFiLENBQXFCLGtCQUFyQixDQURxQixDQUF6QixDQUwyQixDQVMzQjs7RUFDQUosZ0JBQWdCLENBQUNLLE9BQWpCLENBQTBCdkIsUUFBRCxJQUFjO0lBQ25DLElBQUlBLFFBQVEsQ0FBQ0csUUFBVCxLQUFzQixNQUExQixFQUFrQztNQUM5QkgsUUFBUSxDQUFDRyxRQUFULEdBQW9CLE9BQXBCO0lBQ0g7RUFDSixDQUpELEVBVjJCLENBZ0IzQjs7RUFDQSxJQUFJZCxFQUFFLENBQUN5RixZQUFILENBQWdCLE9BQWhCLE1BQTZCLFVBQWpDLEVBQTZDO0lBQ3pDLE1BQU1DLGtCQUFrQixHQUFHMUYsRUFBRSxDQUFDeUYsWUFBSCxDQUFnQixJQUFoQixDQUEzQjtJQUNBNUQsZ0JBQWdCLENBQUM2RCxrQkFBRCxDQUFoQixDQUFxQzVFLFFBQXJDLEdBQWdELE1BQWhEO0VBQ0gsQ0FwQjBCLENBc0IzQjs7O0VBQ0FrQixZQUFZLENBQUNPLE9BQWIsQ0FBcUIsa0JBQXJCLEVBQXlDVCxJQUFJLENBQUNVLFNBQUwsQ0FBZVgsZ0JBQWYsQ0FBekMsRUF2QjJCLENBeUIzQjs7RUFDQUwsZ0JBQWdCO0FBQ25CLENBM0JEOztBQTZCQSxNQUFNbUUsZUFBZSxHQUFJQyxTQUFELElBQWU7RUFDbkMsTUFBTUMsTUFBTSxHQUFHaEcsUUFBUSxDQUFDSyxhQUFULENBQXVCLFFBQXZCLENBQWY7RUFDQTJGLE1BQU0sQ0FBQ2pGLFNBQVAsQ0FBaUJDLEdBQWpCLENBQXFCLFFBQXJCO0VBQ0FnRixNQUFNLENBQUM1QyxTQUFQLEdBQW1CLFFBQW5CO0VBQ0E0QyxNQUFNLENBQUM5RSxnQkFBUCxDQUF3QixPQUF4QixFQUFrQ0MsQ0FBRCxJQUFPOEUsY0FBYyxDQUFDOUUsQ0FBRCxDQUF0RDtFQUNBNEUsU0FBUyxDQUFDdkYsV0FBVixDQUFzQndGLE1BQXRCO0FBQ0gsQ0FORDs7QUFRQSxNQUFNRSxrQkFBa0IsR0FBRyxDQUFDSCxTQUFELEVBQVlwRixDQUFaLEtBQWtCO0VBQ3pDLE1BQU13RixTQUFTLEdBQUduRyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBbEI7RUFDQThGLFNBQVMsQ0FBQ3BGLFNBQVYsQ0FBb0JDLEdBQXBCLENBQXdCLFdBQXhCO0VBQ0FtRixTQUFTLENBQUM1RixZQUFWLENBQXVCLElBQXZCLFlBQWdDSSxDQUFoQztFQUNBd0YsU0FBUyxDQUFDL0MsU0FBVixHQUFzQixRQUF0QjtFQUNBMkMsU0FBUyxDQUFDdkYsV0FBVixDQUFzQjJGLFNBQXRCO0FBQ0gsQ0FORCxFQVFBOzs7QUFDQSxNQUFNQyxVQUFVLEdBQUlDLElBQUQsSUFBVTtFQUN6QjtFQUNBLE1BQU1DLFFBQVEsR0FBR3RHLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFqQjtFQUNBaUcsUUFBUSxDQUFDL0YsWUFBVCxDQUFzQixPQUF0QixFQUErQixTQUEvQjtFQUNBLE1BQU1nRyxnQkFBZ0IsR0FBR3ZHLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixPQUF2QixDQUF6QjtFQUNBa0csZ0JBQWdCLENBQUN4RixTQUFqQixDQUEyQkMsR0FBM0IsQ0FBK0Isa0JBQS9CO0VBQ0F1RixnQkFBZ0IsQ0FBQ0MsV0FBakIsR0FBK0IsVUFBL0I7RUFDQUQsZ0JBQWdCLENBQUM5RSxJQUFqQixHQUF3QixrQkFBeEI7RUFDQTZFLFFBQVEsQ0FBQzlGLFdBQVQsQ0FBcUIrRixnQkFBckIsRUFSeUIsQ0FVekI7O0VBQ0EsTUFBTUUsUUFBUSxHQUFHekcsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0VBQ0FvRyxRQUFRLENBQUNsRyxZQUFULENBQXNCLE9BQXRCLEVBQStCLFNBQS9CO0VBQ0FrRyxRQUFRLENBQUNsRyxZQUFULENBQXNCLElBQXRCLEVBQTRCLGFBQTVCO0VBQ0F1RixlQUFlLENBQUNXLFFBQUQsRUFBV0osSUFBWCxDQUFmO0VBQ0FILGtCQUFrQixDQUFDTyxRQUFELEVBQVdKLElBQVgsQ0FBbEIsQ0FmeUIsQ0FpQnpCOztFQUNBLE1BQU1LLFFBQVEsR0FBRzFHLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUFqQixDQWxCeUIsQ0FtQnpCOztFQUNBcUcsUUFBUSxDQUFDbkcsWUFBVCxDQUFzQixPQUF0QixFQUErQix1QkFBL0IsRUFwQnlCLENBcUJ6Qjs7RUFFQThGLElBQUksQ0FBQzdGLFdBQUwsQ0FBaUI4RixRQUFqQjtFQUNBRCxJQUFJLENBQUM3RixXQUFMLENBQWlCaUcsUUFBakI7RUFDQUosSUFBSSxDQUFDN0YsV0FBTCxDQUFpQmtHLFFBQWpCO0FBQ0gsQ0ExQkQ7O0FBNEJBLE1BQU1DLFFBQVEsR0FBRyxNQUFNO0VBQ25CLE1BQU1DLGNBQWMsR0FBRzVHLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixpQkFBdkIsQ0FBdkI7RUFDQSxNQUFNZ0csZUFBZSxHQUFHN0csUUFBUSxDQUFDYSxhQUFULENBQXVCLGtCQUF2QixDQUF4QjtFQUVBK0YsY0FBYyxDQUFDckcsWUFBZixDQUE0QixJQUE1QixFQUFrQyxRQUFsQztFQUNBc0csZUFBZSxDQUFDdEcsWUFBaEIsQ0FBNkIsSUFBN0IsRUFBbUMsV0FBbkM7QUFDSCxDQU5EOztBQVFBLE1BQU11RyxRQUFRLEdBQUcsTUFBTTtFQUNuQixNQUFNRixjQUFjLEdBQUc1RyxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsaUJBQXZCLENBQXZCO0VBQ0EsTUFBTWdHLGVBQWUsR0FBRzdHLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixrQkFBdkIsQ0FBeEI7RUFFQStGLGNBQWMsQ0FBQ3JHLFlBQWYsQ0FBNEIsSUFBNUIsRUFBa0MsV0FBbEM7RUFDQXNHLGVBQWUsQ0FBQ3RHLFlBQWhCLENBQTZCLElBQTdCLEVBQW1DLFFBQW5DO0FBQ0gsQ0FORCxFQVFBOzs7QUFDQSxNQUFNd0csb0JBQW9CLEdBQUk1RixDQUFELElBQU87RUFDaEM7RUFDQSxNQUFNYSxnQkFBZ0IsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQ3JCQyxZQUFZLENBQUNDLE9BQWIsQ0FBcUIsa0JBQXJCLENBRHFCLENBQXpCLENBRmdDLENBTWhDOztFQUNBLE1BQU00RSxXQUFXLEdBQUc3RixDQUFDLENBQUNDLE1BQUYsQ0FBU3dFLFlBQVQsQ0FBc0IsSUFBdEIsQ0FBcEIsQ0FQZ0MsQ0FRaEM7RUFFQTs7RUFDQTVELGdCQUFnQixDQUFDaUYsTUFBakIsQ0FBd0JELFdBQXhCLEVBQXFDLENBQXJDLEVBWGdDLENBYWhDOztFQUNBN0UsWUFBWSxDQUFDTyxPQUFiLENBQXFCLGtCQUFyQixFQUF5Q1QsSUFBSSxDQUFDVSxTQUFMLENBQWVYLGdCQUFmLENBQXpDLEVBZGdDLENBZ0JoQztFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUVBOztFQUNBTCxnQkFBZ0I7QUFDbkIsQ0ExQkQ7O0FBNEJBLE1BQU1ELGdCQUFnQixHQUFHLENBQUNxRSxTQUFELEVBQVlwRixDQUFaLEtBQWtCO0VBQ3ZDO0VBQ0EsTUFBTXVHLGFBQWEsR0FBR2xILFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUF0QjtFQUNBNkcsYUFBYSxDQUFDNUcsR0FBZCxHQUFvQlIsK0NBQXBCO0VBQ0FvSCxhQUFhLENBQUMzRyxZQUFkLENBQTJCLE9BQTNCLEVBQW9DLGlCQUFwQztFQUNBMkcsYUFBYSxDQUFDM0csWUFBZCxDQUEyQixJQUEzQixZQUFvQ0ksQ0FBcEMsR0FMdUMsQ0FPdkM7O0VBQ0EsSUFDSW9GLFNBQVMsQ0FBQ0gsWUFBVixDQUF1QixPQUF2QixNQUFvQyxVQUFwQyxJQUNBRyxTQUFTLENBQUNoRixTQUFWLENBQW9CTSxRQUFwQixDQUE2QixVQUE3QixDQUZKLEVBR0U7SUFDRTtJQUNBNkYsYUFBYSxDQUFDbkcsU0FBZCxDQUF3QkMsR0FBeEIsdURBRTJCTCxDQUYzQjtJQUtBdUcsYUFBYSxDQUFDaEcsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBeUNDLENBQUQsSUFDcEM0RixvQkFBb0IsQ0FBQzVGLENBQUQsRUFBSVIsQ0FBSixDQUR4QixFQVBGLENBVUU7O0lBQ0FvRixTQUFTLENBQUM3RSxnQkFBVixDQUEyQixZQUEzQixFQUF5QyxNQUFNO01BQzNDLE1BQU1pRyxTQUFTLEdBQUduSCxRQUFRLENBQUNhLGFBQVQsZ0NBQ1VGLENBRFYsRUFBbEI7TUFHQXdHLFNBQVMsQ0FBQ3BHLFNBQVYsQ0FBb0JnQixNQUFwQixDQUEyQixRQUEzQjtJQUNILENBTEQsRUFYRixDQWlCRTs7SUFDQWdFLFNBQVMsQ0FBQzdFLGdCQUFWLENBQTJCLFlBQTNCLEVBQXlDLE1BQU07TUFDM0MsTUFBTWlHLFNBQVMsR0FBR25ILFFBQVEsQ0FBQ2EsYUFBVCxnQ0FDVUYsQ0FEVixFQUFsQjtNQUdBd0csU0FBUyxDQUFDcEcsU0FBVixDQUFvQkMsR0FBcEIsQ0FBd0IsUUFBeEI7SUFDSCxDQUxEO0VBTUgsQ0EzQkQsTUEyQk87SUFDSG9HLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaO0VBQ0gsQ0FyQ3NDLENBc0N2Qzs7O0VBQ0F0QixTQUFTLENBQUN2RixXQUFWLENBQXNCMEcsYUFBdEI7QUFDSCxDQXhDRDs7QUEwQ0EsTUFBTUksa0JBQWtCLEdBQUluSCxFQUFELElBQVE7RUFDL0IsTUFBTW9ILGVBQWUsR0FBR3ZILFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixLQUF2QixDQUF4QjtFQUNBa0gsZUFBZSxDQUFDakgsR0FBaEIsR0FBc0JULDZDQUF0QjtFQUNBMEgsZUFBZSxDQUFDaEgsWUFBaEIsQ0FBNkIsT0FBN0IsRUFBc0MsTUFBdEM7RUFDQUosRUFBRSxDQUFDSyxXQUFILENBQWUrRyxlQUFmO0FBQ0gsQ0FMRCxFQU9BO0FBQ0E7QUFDQTs7O0FBRUEsU0FBU0MsV0FBVCxDQUFxQkMsTUFBckIsRUFBNkI7RUFDekIsSUFBSUEsTUFBTSxHQUFHLEtBQWIsRUFBb0IsT0FBTyxPQUFQO0VBQ3BCLElBQUlBLE1BQU0sR0FBRyxLQUFiLEVBQW9CLE9BQU8sWUFBUDtFQUNwQixJQUFJQSxNQUFNLEdBQUcsS0FBYixFQUFvQixPQUFPLE1BQVA7RUFDcEIsSUFBSUEsTUFBTSxHQUFHLEtBQWIsRUFBb0IsT0FBTyxZQUFQO0VBQ3BCLElBQUlBLE1BQU0sR0FBRyxLQUFiLEVBQW9CLE9BQU8sT0FBUDtFQUNwQixJQUFJQSxNQUFNLEdBQUcsS0FBYixFQUFvQixPQUFPLFlBQVA7RUFDcEIsSUFBSUEsTUFBTSxHQUFHLElBQWIsRUFBbUIsT0FBTyxNQUFQO0VBQ25CLElBQUlBLE1BQU0sR0FBRyxJQUFiLEVBQW1CLE9BQU8sWUFBUDtFQUNuQixPQUFPLE9BQVA7QUFDSCxFQUVEOzs7QUFDQSxNQUFNQyxlQUFlLEdBQUlDLFFBQUQsSUFBYztFQUNsQyxNQUFNQyxDQUFDLEdBQUcsSUFBSUMsSUFBSixFQUFWO0VBQ0EsTUFBTUMsU0FBUyxHQUFHRixDQUFDLENBQUNHLE9BQUYsRUFBbEI7RUFDQSxNQUFNQyxXQUFXLEdBQUdKLENBQUMsQ0FBQ0ssaUJBQUYsS0FBd0IsS0FBNUM7RUFDQSxNQUFNQyxHQUFHLEdBQUdKLFNBQVMsR0FBR0UsV0FBeEI7RUFDQSxNQUFNRyxPQUFPLEdBQUdELEdBQUcsR0FBRyxPQUFPUCxRQUE3QjtFQUNBLE9BQU8sSUFBSUUsSUFBSixDQUFTTSxPQUFULENBQVA7QUFDSCxDQVBEOztBQVNBLE1BQU1DLFdBQVcsR0FBRyxDQUFDQyxJQUFELEVBQU9WLFFBQVAsS0FBb0I7RUFDcEMsTUFBTUMsQ0FBQyxHQUFHLElBQUlDLElBQUosRUFBVjtFQUNBLE1BQU1HLFdBQVcsR0FBR0osQ0FBQyxDQUFDSyxpQkFBRixLQUF3QixLQUE1QztFQUNBLE1BQU1DLEdBQUcsR0FBR0csSUFBSSxHQUFHTCxXQUFuQjtFQUNBLE1BQU1HLE9BQU8sR0FBR0QsR0FBRyxHQUFHLE9BQU9QLFFBQTdCO0VBQ0EsT0FBTyxJQUFJRSxJQUFKLENBQVNNLE9BQVQsQ0FBUDtBQUNILENBTkQsRUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLE1BQU1HLG1CQUFtQixHQUFJQyxTQUFELElBQWU7RUFDdkMsTUFBTUMscUJBQXFCLEdBQUd4SSxRQUFRLENBQUNhLGFBQVQsQ0FDMUIsd0JBRDBCLENBQTlCLENBRHVDLENBSXZDOztFQUNBNEgsS0FBSyw4REFDcURGLFNBRHJELDZEQUVEO0lBQUVHLElBQUksRUFBRTtFQUFSLENBRkMsQ0FBTCxDQUlLQyxJQUpMLENBSVdDLFFBQUQsSUFBY0EsUUFBUSxDQUFDQyxJQUFULEVBSnhCLEVBS0tGLElBTEwsQ0FLV0MsUUFBRCxJQUFjO0lBQ2hCeEIsT0FBTyxDQUFDQyxHQUFSLENBQVl1QixRQUFaO0lBQ0EsTUFBTWhFLHNCQUFzQixHQUFHLEVBQS9CLENBRmdCLENBR2hCOztJQUNBLEtBQUssSUFBSWpFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsRUFBcEIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7TUFDekIsTUFBTW1JLGlCQUFpQixHQUFHO1FBQ3RCNUQsSUFBSSxFQUFFLElBQUkyQyxJQUFKLENBQVNlLFFBQVEsQ0FBQ0csSUFBVCxDQUFjcEksQ0FBZCxFQUFpQnFJLE1BQTFCLENBRGdCO1FBRXRCQyxRQUFRLEVBQUVMLFFBQVEsQ0FBQ0csSUFBVCxDQUFjcEksQ0FBZCxFQUFpQnFJLE1BRkw7UUFHdEJ0RSxRQUFRLEVBQUVrRSxRQUFRLENBQUNHLElBQVQsQ0FBY3BJLENBQWQsRUFBaUJ1SSxJQUFqQixDQUFzQnhFLFFBSFY7UUFJdEJ5RSxVQUFVLEVBQUVQLFFBQVEsQ0FBQ0csSUFBVCxDQUFjcEksQ0FBZCxFQUFpQnlJLEdBQWpCLEdBQXVCLEdBSmI7UUFLdEIxRCxXQUFXLEVBQUVrRCxRQUFRLENBQUNHLElBQVQsQ0FBY3BJLENBQWQsRUFBaUJ1SSxJQUFqQixDQUFzQkcsSUFMYjtRQU10QkMsZ0JBQWdCLEVBQUVWLFFBQVEsQ0FBQ0csSUFBVCxDQUFjcEksQ0FBZCxFQUFpQjRJLE9BQWpCLENBQXlCLENBQXpCLEVBQTRCTCxJQU54QjtRQU90Qi9GLGtCQUFrQixFQUFFeUYsUUFBUSxDQUFDRyxJQUFULENBQWNwSSxDQUFkLEVBQWlCNEksT0FBakIsQ0FBeUIsQ0FBekIsRUFBNEJDLFdBUDFCO1FBUXRCdEcsV0FBVyxFQUFFMEYsUUFBUSxDQUFDRyxJQUFULENBQWNwSSxDQUFkLEVBQWlCNEksT0FBakIsQ0FBeUIsQ0FBekIsRUFBNEJFLElBUm5CO1FBU3RCakYsVUFBVSxFQUFFb0UsUUFBUSxDQUFDRyxJQUFULENBQWNwSSxDQUFkLEVBQWlCK0ksSUFBakIsQ0FBc0JDLEdBVFo7UUFVdEJwRixhQUFhLEVBQUVpRCxXQUFXLENBQUNvQixRQUFRLENBQUNHLElBQVQsQ0FBY3BJLENBQWQsRUFBaUIrSSxJQUFqQixDQUFzQkMsR0FBdkIsQ0FWSjtRQVd0QkMsUUFBUSxFQUFFaEIsUUFBUSxDQUFDRyxJQUFULENBQWNwSSxDQUFkLEVBQWlCK0ksSUFBakIsQ0FBc0JHLElBWFY7UUFZdEJ2RixTQUFTLEVBQUVzRSxRQUFRLENBQUNHLElBQVQsQ0FBY3BJLENBQWQsRUFBaUIrSSxJQUFqQixDQUFzQkk7TUFaWCxDQUExQjtNQWNBbEYsc0JBQXNCLENBQUNuQyxJQUF2QixDQUE0QnFHLGlCQUE1QjtJQUNIOztJQUNEMUIsT0FBTyxDQUFDQyxHQUFSLENBQVl6QyxzQkFBWjtJQUNBRCxlQUFlLENBQUNDLHNCQUFELENBQWY7SUFDQSxPQUFPQSxzQkFBUDtFQUNILENBN0JMLEVBOEJLbUYsS0E5QkwsQ0E4QllDLEdBQUQsSUFBUztJQUNaNUMsT0FBTyxDQUFDQyxHQUFSLENBQVkyQyxHQUFaO0lBQ0F4QixxQkFBcUIsQ0FBQ3BGLFNBQXRCLEdBQWtDLGdCQUFsQztFQUNILENBakNMO0FBa0NILENBdkNEOztBQXlDQSxNQUFNNkcsbUJBQW1CLEdBQUkxQixTQUFELElBQWU7RUFDdkM7RUFDQSxNQUFNQyxxQkFBcUIsR0FBR3hJLFFBQVEsQ0FBQ2EsYUFBVCxDQUMxQix3QkFEMEIsQ0FBOUI7RUFJQTRILEtBQUssNkRBQ29ERixTQURwRCw2REFFRDtJQUFFRyxJQUFJLEVBQUU7RUFBUixDQUZDLENBQUwsQ0FJS0MsSUFKTCxDQUlXQyxRQUFELElBQWNBLFFBQVEsQ0FBQ0MsSUFBVCxFQUp4QixFQUtLRixJQUxMLENBS1dDLFFBQUQsSUFBYztJQUNoQnhCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZdUIsUUFBWixFQURnQixDQUVoQjtJQUNBO0lBQ0E7O0lBQ0EsTUFBTS9GLGNBQWMsR0FBRztNQUNuQkUsSUFBSSxFQUFFNkYsUUFBUSxDQUFDbkgsSUFESTtNQUVuQnVCLE9BQU8sRUFBRTRGLFFBQVEsQ0FBQ3NCLEdBQVQsQ0FBYWxILE9BRkg7TUFHbkIwQixRQUFRLEVBQUVrRSxRQUFRLENBQUNNLElBQVQsQ0FBY3hFLFFBSEw7TUFJbkJaLFNBQVMsRUFBRTRELGVBQWUsQ0FBQ2tCLFFBQVEsQ0FBQ2pCLFFBQVYsQ0FKUDtNQUtuQnpELE9BQU8sRUFBRWtFLFdBQVcsQ0FDaEJRLFFBQVEsQ0FBQ3NCLEdBQVQsQ0FBYWhHLE9BQWIsR0FBdUIsSUFEUCxFQUVoQjBFLFFBQVEsQ0FBQ2pCLFFBRk8sQ0FMRDtNQVNuQnZELE1BQU0sRUFBRWdFLFdBQVcsQ0FDZlEsUUFBUSxDQUFDc0IsR0FBVCxDQUFhOUYsTUFBYixHQUFzQixJQURQLEVBRWZ3RSxRQUFRLENBQUNqQixRQUZNLENBVEE7TUFhbkJuRSxXQUFXLEVBQUVvRixRQUFRLENBQUNNLElBQVQsQ0FBY0csSUFiUjtNQWNuQnpGLFFBQVEsRUFBRWdGLFFBQVEsQ0FBQ00sSUFBVCxDQUFjaUIsUUFkTDtNQWVuQnpHLE9BQU8sRUFBRWtGLFFBQVEsQ0FBQ00sSUFBVCxDQUFja0IsUUFmSjtNQWdCbkJkLGdCQUFnQixFQUFFVixRQUFRLENBQUNXLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0JMLElBaEJuQjtNQWlCbkIvRixrQkFBa0IsRUFBRXlGLFFBQVEsQ0FBQ1csT0FBVCxDQUFpQixDQUFqQixFQUFvQkMsV0FqQnJCO01Ba0JuQnRHLFdBQVcsRUFBRTBGLFFBQVEsQ0FBQ1csT0FBVCxDQUFpQixDQUFqQixFQUFvQkUsSUFsQmQ7TUFtQm5CakYsVUFBVSxFQUFFb0UsUUFBUSxDQUFDYyxJQUFULENBQWNDLEdBbkJQO01Bb0JuQnBGLGFBQWEsRUFBRWlELFdBQVcsQ0FBQ29CLFFBQVEsQ0FBQ2MsSUFBVCxDQUFjQyxHQUFmLENBcEJQO01BcUJuQnJGLFNBQVMsRUFBRXNFLFFBQVEsQ0FBQ2MsSUFBVCxDQUFjSSxLQXJCTjtNQXNCbkJGLFFBQVEsRUFBRWhCLFFBQVEsQ0FBQ2MsSUFBVCxDQUFjRztJQXRCTCxDQUF2QixDQUxnQixDQTZCaEI7O0lBQ0F6QyxPQUFPLENBQUNDLEdBQVIsQ0FBWXhFLGNBQVo7SUFDQVAsY0FBYyxXQUFJTyxjQUFjLENBQUNFLElBQW5CLGVBQTRCRixjQUFjLENBQUNHLE9BQTNDLEVBQWQ7SUFDQUosY0FBYyxDQUFDQyxjQUFELENBQWQ7SUFDQSxPQUFPQSxjQUFQO0VBQ0gsQ0F2Q0wsRUF3Q0trSCxLQXhDTCxDQXdDWUMsR0FBRCxJQUFTO0lBQ1o1QyxPQUFPLENBQUNDLEdBQVIsQ0FBWTJDLEdBQVo7SUFDQXhCLHFCQUFxQixDQUFDcEYsU0FBdEIsR0FBa0MsZ0JBQWxDO0VBQ0gsQ0EzQ0w7QUE0Q0gsQ0FsREQ7O0FBb0RBLE1BQU11QyxhQUFhLEdBQUlwRCxLQUFELElBQVc7RUFDN0IwSCxtQkFBbUIsQ0FBQzFILEtBQUQsQ0FBbkI7RUFDQStGLG1CQUFtQixDQUFDL0YsS0FBRCxDQUFuQjtBQUNILENBSEQ7O0FBS0EsTUFBTTBELGNBQWMsR0FBSTlFLENBQUQsSUFBTztFQUMxQkEsQ0FBQyxDQUFDa0osY0FBRixHQUQwQixDQUUxQjs7RUFDQSxNQUFNOUQsZ0JBQWdCLEdBQUd2RyxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsbUJBQXZCLENBQXpCO0VBQ0EsTUFBTTJILHFCQUFxQixHQUFHeEksUUFBUSxDQUFDYSxhQUFULENBQzFCLHdCQUQwQixDQUE5QixDQUowQixDQU8xQjs7RUFDQTJILHFCQUFxQixDQUFDcEYsU0FBdEIsR0FBa0MsRUFBbEMsQ0FSMEIsQ0FTMUI7O0VBQ0EsSUFBSW1ELGdCQUFnQixDQUFDK0QsS0FBakIsS0FBMkIsRUFBL0IsRUFBbUM7SUFDL0I5QixxQkFBcUIsQ0FBQ3BGLFNBQXRCLEdBQWtDLGFBQWxDO0VBQ0gsQ0FGRCxNQUVPO0lBQ0h1QyxhQUFhLENBQUNZLGdCQUFnQixDQUFDK0QsS0FBbEIsQ0FBYjtJQUNBeEQsUUFBUTtJQUNSUCxnQkFBZ0IsQ0FBQytELEtBQWpCLEdBQXlCLEVBQXpCO0VBQ0g7QUFDSixDQWpCRDs7Ozs7Ozs7Ozs7Ozs7OztBQ3RnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQSxNQUFNQyxlQUFlLEdBQUcsTUFBTTtFQUMxQixNQUFNQyxxQkFBcUIsR0FBRyxFQUE5Qjs7RUFFQSxJQUFJckksWUFBWSxDQUFDNEMsTUFBYixLQUF3QixDQUE1QixFQUErQjtJQUMzQjVDLFlBQVksQ0FBQ08sT0FBYixDQUNJLGtCQURKLEVBRUlULElBQUksQ0FBQ1UsU0FBTCxDQUFlNkgscUJBQWYsQ0FGSjtFQUlIO0FBQ0osQ0FURCxFQVdBOzs7QUFFQSxpRUFBZUQsZUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFLQTtBQUNBOztBQUVBLE1BQU1JLFlBQVksR0FBRyxNQUFNO0VBQ3ZCLE1BQU1DLE1BQU0sR0FBRzVLLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixRQUF2QixDQUFmLENBRHVCLENBR3ZCOztFQUNBLE1BQU13SyxJQUFJLEdBQUc3SyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtFQUNBd0ssSUFBSSxDQUFDdkssR0FBTCxHQUFXb0ssaURBQVg7RUFDQUcsSUFBSSxDQUFDekosTUFBTCxHQUFjLFFBQWQ7RUFDQXlKLElBQUksQ0FBQ3RLLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkIsTUFBM0I7RUFDQXFLLE1BQU0sQ0FBQ3BLLFdBQVAsQ0FBbUJxSyxJQUFuQixFQVJ1QixDQVV2Qjs7RUFDQSxNQUFNQyxLQUFLLEdBQUc5SyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBZDtFQUNBeUssS0FBSyxDQUFDdEosV0FBTixHQUFvQixjQUFwQjtFQUNBb0osTUFBTSxDQUFDcEssV0FBUCxDQUFtQnNLLEtBQW5CO0VBRUEsT0FBT0YsTUFBUDtBQUNILENBaEJEOztBQWtCQSxNQUFNRyxVQUFVLEdBQUcsTUFBTTtFQUNyQixNQUFNQyxJQUFJLEdBQUdoTCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtFQUNBMkssSUFBSSxDQUFDekssWUFBTCxDQUFrQixPQUFsQixFQUEyQixNQUEzQixFQUZxQixDQUlyQjs7RUFDQSxNQUFNMEssZUFBZSxHQUFHakwsUUFBUSxDQUFDSyxhQUFULENBQXVCLEdBQXZCLENBQXhCO0VBQ0E0SyxlQUFlLENBQUMxSyxZQUFoQixDQUE2QixPQUE3QixFQUFzQyxpQkFBdEM7RUFDQTBLLGVBQWUsQ0FBQ3pKLFdBQWhCLEdBQThCLFdBQTlCLENBUHFCLENBU3JCOztFQUNBLE1BQU1aLFNBQVMsR0FBR1osUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQWxCO0VBQ0FPLFNBQVMsQ0FBQ0wsWUFBVixDQUF1QixPQUF2QixFQUFnQyxXQUFoQztFQUNBSyxTQUFTLENBQUNMLFlBQVYsQ0FBdUIsSUFBdkIsRUFBNkIsV0FBN0IsRUFacUIsQ0FjckI7RUFFQTs7RUFDQSxNQUFNMkssb0JBQW9CLEdBQUdsTCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBN0I7RUFDQTZLLG9CQUFvQixDQUFDM0ssWUFBckIsQ0FBa0MsT0FBbEMsRUFBMkMsV0FBM0MsRUFsQnFCLENBb0JyQjs7RUFDQSxNQUFNNEssV0FBVyxHQUFHbkwsUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQXBCO0VBQ0E4SyxXQUFXLENBQUM1SyxZQUFaLENBQXlCLE9BQXpCLEVBQWtDLGdCQUFsQztFQUNBK0csb0VBQWtCLENBQUM2RCxXQUFELENBQWxCO0VBQ0EsTUFBTUMsZUFBZSxHQUFHcEwsUUFBUSxDQUFDSyxhQUFULENBQXVCLE1BQXZCLENBQXhCO0VBQ0ErSyxlQUFlLENBQUNoSSxTQUFoQixHQUE0QixjQUE1QjtFQUNBK0gsV0FBVyxDQUFDM0ssV0FBWixDQUF3QjRLLGVBQXhCO0VBQ0FGLG9CQUFvQixDQUFDMUssV0FBckIsQ0FBaUMySyxXQUFqQyxFQTNCcUIsQ0E2QnJCOztFQUNBLE1BQU10RSxlQUFlLEdBQUc3RyxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBeEI7RUFDQXdHLGVBQWUsQ0FBQ3RHLFlBQWhCLENBQTZCLE9BQTdCLEVBQXNDLGlCQUF0QztFQUNBc0csZUFBZSxDQUFDdEcsWUFBaEIsQ0FBNkIsSUFBN0IsRUFBbUMsUUFBbkM7RUFDQXNHLGVBQWUsQ0FBQ3dFLE1BQWhCLEdBQXlCLEtBQXpCO0VBQ0FqRiw0REFBVSxDQUFDUyxlQUFELENBQVY7RUFDQXFFLG9CQUFvQixDQUFDMUssV0FBckIsQ0FBaUNxRyxlQUFqQztFQUVBbUUsSUFBSSxDQUFDeEssV0FBTCxDQUFpQnlLLGVBQWpCO0VBQ0FELElBQUksQ0FBQ3hLLFdBQUwsQ0FBaUJJLFNBQWpCO0VBQ0FvSyxJQUFJLENBQUN4SyxXQUFMLENBQWlCMEssb0JBQWpCO0VBRUEsT0FBT0YsSUFBUDtBQUNILENBMUNEOztBQTRDQSxNQUFNTSxpQkFBaUIsR0FBRyxNQUFNO0VBQzVCO0VBQ0EsTUFBTUMsb0JBQW9CLEdBQUd2TCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBN0I7RUFDQWtMLG9CQUFvQixDQUFDeEssU0FBckIsQ0FBK0JDLEdBQS9CLENBQW1DLHNCQUFuQyxFQUEyRCxTQUEzRCxFQUg0QixDQUs1Qjs7RUFDQSxNQUFNd0ssUUFBUSxHQUFHeEwsUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQWpCO0VBQ0FtTCxRQUFRLENBQUN6SyxTQUFULENBQW1CQyxHQUFuQixDQUF1QixjQUF2QixFQVA0QixDQVM1Qjs7RUFDQSxNQUFNcUMsYUFBYSxHQUFHckQsUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQXRCO0VBQ0FnRCxhQUFhLENBQUN0QyxTQUFkLENBQXdCQyxHQUF4QixDQUE0QixlQUE1QixFQVg0QixDQWE1Qjs7RUFDQSxNQUFNaUMsUUFBUSxHQUFHakQsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0VBQ0E0QyxRQUFRLENBQUNsQyxTQUFULENBQW1CQyxHQUFuQixDQUF1QixVQUF2QixFQWY0QixDQWlCNUI7O0VBQ0EsTUFBTXlLLG9CQUFvQixHQUFHekwsUUFBUSxDQUFDSyxhQUFULENBQXVCLE1BQXZCLENBQTdCO0VBQ0FvTCxvQkFBb0IsQ0FBQzFLLFNBQXJCLENBQStCQyxHQUEvQixDQUFtQyxvQkFBbkMsRUFuQjRCLENBcUI1Qjs7RUFDQSxNQUFNeUMsZ0JBQWdCLEdBQUd6RCxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBekI7RUFDQW9ELGdCQUFnQixDQUFDMUMsU0FBakIsQ0FBMkJDLEdBQTNCLENBQStCLGtCQUEvQixFQXZCNEIsQ0F5QjVCOztFQUNBLE1BQU0yQyxpQkFBaUIsR0FBRzNELFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUExQjtFQUNBc0QsaUJBQWlCLENBQUM1QyxTQUFsQixDQUE0QkMsR0FBNUIsQ0FBZ0MsbUJBQWhDLEVBM0I0QixDQTZCNUI7O0VBQ0EsTUFBTTZDLGFBQWEsR0FBRzdELFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUF0QjtFQUNBd0QsYUFBYSxDQUFDOUMsU0FBZCxDQUF3QkMsR0FBeEIsQ0FBNEIsZUFBNUIsRUEvQjRCLENBaUM1Qjs7RUFDQSxNQUFNaUQsZ0JBQWdCLEdBQUdqRSxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBekI7RUFDQTRELGdCQUFnQixDQUFDbEQsU0FBakIsQ0FBMkJDLEdBQTNCLENBQStCLGtCQUEvQixFQW5DNEIsQ0FxQzVCOztFQUNBLE1BQU1tRCxlQUFlLEdBQUduRSxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBeEI7RUFDQThELGVBQWUsQ0FBQ3BELFNBQWhCLENBQTBCQyxHQUExQixDQUE4QixpQkFBOUIsRUF2QzRCLENBeUM1Qjs7RUFDQSxNQUFNcUQsYUFBYSxHQUFHckUsUUFBUSxDQUFDSyxhQUFULENBQXVCLE1BQXZCLENBQXRCO0VBQ0FnRSxhQUFhLENBQUN0RCxTQUFkLENBQXdCQyxHQUF4QixDQUE0QixlQUE1QixFQTNDNEIsQ0E2QzVCOztFQUNBLE1BQU15RCxpQkFBaUIsR0FBR3pFLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixNQUF2QixDQUExQjtFQUNBb0UsaUJBQWlCLENBQUMxRCxTQUFsQixDQUE0QkMsR0FBNUIsQ0FBZ0MsbUJBQWhDLEVBL0M0QixDQWlENUI7O0VBQ0EsTUFBTTBLLGlCQUFpQixHQUFHMUwsUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQTFCO0VBQ0FxTCxpQkFBaUIsQ0FBQzNLLFNBQWxCLENBQTRCQyxHQUE1QixDQUFnQyxtQkFBaEM7RUFFQSxNQUFNMkssYUFBYSxHQUFHM0wsUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQXRCO0VBQ0FzTCxhQUFhLENBQUM1SyxTQUFkLENBQXdCQyxHQUF4QixDQUE0QixlQUE1QjtFQUNBMkssYUFBYSxDQUFDdkksU0FBZCxHQUEwQixnQ0FBMUI7RUFFQSxNQUFNd0ksYUFBYSxHQUFHNUwsUUFBUSxDQUFDSyxhQUFULENBQXVCLE9BQXZCLENBQXRCO0VBQ0F1TCxhQUFhLENBQUM3SyxTQUFkLENBQXdCQyxHQUF4QixDQUE0QixlQUE1QjtFQUNBMEssaUJBQWlCLENBQUNsTCxXQUFsQixDQUE4Qm9MLGFBQTlCO0VBRUEsTUFBTS9HLFdBQVcsR0FBRzdFLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixJQUF2QixDQUFwQjtFQUNBd0UsV0FBVyxDQUFDOUQsU0FBWixDQUFzQkMsR0FBdEIsQ0FBMEIsYUFBMUI7RUFDQTRLLGFBQWEsQ0FBQ3BMLFdBQWQsQ0FBMEJxRSxXQUExQixFQS9ENEIsQ0FpRTVCOztFQUNBQSxXQUFXLENBQUMzRCxnQkFBWixDQUE2QixPQUE3QixFQUF1Q0MsQ0FBRCxJQUFPO0lBQ3pDQSxDQUFDLENBQUNrSixjQUFGO0lBQ0F4RixXQUFXLENBQUNnSCxVQUFaLElBQTBCMUssQ0FBQyxDQUFDMkssTUFBNUI7RUFDSCxDQUhELEVBbEU0QixDQXVFNUI7O0VBQ0FQLG9CQUFvQixDQUFDL0ssV0FBckIsQ0FBaUNnTCxRQUFqQztFQUNBRCxvQkFBb0IsQ0FBQy9LLFdBQXJCLENBQWlDeUMsUUFBakM7RUFDQXNJLG9CQUFvQixDQUFDL0ssV0FBckIsQ0FBaUM2QyxhQUFqQztFQUNBa0ksb0JBQW9CLENBQUMvSyxXQUFyQixDQUFpQ1IsUUFBUSxDQUFDSyxhQUFULENBQXVCLElBQXZCLENBQWpDO0VBQ0FrTCxvQkFBb0IsQ0FBQy9LLFdBQXJCLENBQWlDaUwsb0JBQWpDO0VBQ0FGLG9CQUFvQixDQUFDL0ssV0FBckIsQ0FBaUNpRCxnQkFBakM7RUFDQThILG9CQUFvQixDQUFDL0ssV0FBckIsQ0FBaUNtRCxpQkFBakM7RUFDQTRILG9CQUFvQixDQUFDL0ssV0FBckIsQ0FBaUNSLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixJQUF2QixDQUFqQztFQUNBa0wsb0JBQW9CLENBQUMvSyxXQUFyQixDQUFpQ3FELGFBQWpDO0VBQ0EwSCxvQkFBb0IsQ0FBQy9LLFdBQXJCLENBQWlDeUQsZ0JBQWpDO0VBQ0FzSCxvQkFBb0IsQ0FBQy9LLFdBQXJCLENBQWlDMkQsZUFBakM7RUFDQW9ILG9CQUFvQixDQUFDL0ssV0FBckIsQ0FBaUNSLFFBQVEsQ0FBQ0ssYUFBVCxDQUF1QixJQUF2QixDQUFqQztFQUNBa0wsb0JBQW9CLENBQUMvSyxXQUFyQixDQUFpQzZELGFBQWpDO0VBQ0FrSCxvQkFBb0IsQ0FBQy9LLFdBQXJCLENBQWlDaUUsaUJBQWpDO0VBQ0E4RyxvQkFBb0IsQ0FBQy9LLFdBQXJCLENBQWlDbUwsYUFBakM7RUFDQUosb0JBQW9CLENBQUMvSyxXQUFyQixDQUFpQ2tMLGlCQUFqQztFQUVBLE9BQU9ILG9CQUFQO0FBQ0gsQ0ExRkQ7O0FBNEZBLE1BQU1RLGFBQWEsR0FBRyxNQUFNO0VBQ3hCO0VBQ0EsTUFBTUMsT0FBTyxHQUFHaE0sUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0VBQ0EyTCxPQUFPLENBQUNqTCxTQUFSLENBQWtCQyxHQUFsQixDQUFzQixTQUF0QixFQUh3QixDQUt4Qjs7RUFDQWdMLE9BQU8sQ0FBQ3hMLFdBQVIsQ0FBb0I4SyxpQkFBaUIsRUFBckM7RUFFQSxPQUFPVSxPQUFQO0FBQ0gsQ0FURDs7QUFXQSxNQUFNQyxZQUFZLEdBQUcsTUFBTTtFQUN2QixNQUFNQyxNQUFNLEdBQUdsTSxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtFQUVBLE1BQU04TCxTQUFTLEdBQUduTSxRQUFRLENBQUNLLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBbEI7RUFDQThMLFNBQVMsQ0FBQzNLLFdBQVYsNEJBQXVDLElBQUlxRyxJQUFKLEdBQVd1RSxXQUFYLEVBQXZDO0VBRUEsTUFBTUMsVUFBVSxHQUFHck0sUUFBUSxDQUFDSyxhQUFULENBQXVCLEdBQXZCLENBQW5CO0VBQ0FnTSxVQUFVLENBQUNDLElBQVgsR0FBa0IsZ0NBQWxCO0VBQ0FELFVBQVUsQ0FBQ2pMLE1BQVgsR0FBb0IsUUFBcEI7RUFFQSxNQUFNbUwsYUFBYSxHQUFHdk0sUUFBUSxDQUFDSyxhQUFULENBQXVCLEtBQXZCLENBQXRCO0VBQ0FrTSxhQUFhLENBQUNqTSxHQUFkLEdBQW9CbUssMERBQXBCO0VBQ0E4QixhQUFhLENBQUNoTSxZQUFkLENBQTJCLE9BQTNCLEVBQW9DLFFBQXBDO0VBRUE4TCxVQUFVLENBQUM3TCxXQUFYLENBQXVCK0wsYUFBdkI7RUFDQUwsTUFBTSxDQUFDMUwsV0FBUCxDQUFtQjJMLFNBQW5CO0VBQ0FELE1BQU0sQ0FBQzFMLFdBQVAsQ0FBbUI2TCxVQUFuQjtFQUVBLE9BQU9ILE1BQVA7QUFDSCxDQW5CRDs7QUFxQmUsU0FBU00sVUFBVCxHQUFzQjtFQUNqQ3hNLFFBQVEsQ0FBQ3lNLElBQVQsQ0FBY2pNLFdBQWQsQ0FBMEJtSyxZQUFZLEVBQXRDO0VBQ0EzSyxRQUFRLENBQUN5TSxJQUFULENBQWNqTSxXQUFkLENBQTBCdUssVUFBVSxFQUFwQztFQUNBL0ssUUFBUSxDQUFDeU0sSUFBVCxDQUFjak0sV0FBZCxDQUEwQnVMLGFBQWEsRUFBdkM7RUFDQS9MLFFBQVEsQ0FBQ3lNLElBQVQsQ0FBY2pNLFdBQWQsQ0FBMEJ5TCxZQUFZLEVBQXRDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZNRDtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0EsK29CQUErb0IsY0FBYyxlQUFlLGNBQWMsb0JBQW9CLGtCQUFrQiw2QkFBNkIsR0FBRyxnSkFBZ0osbUJBQW1CLEdBQUcsUUFBUSxtQkFBbUIsR0FBRyxVQUFVLHFCQUFxQixHQUFHLGlCQUFpQixpQkFBaUIsR0FBRywyREFBMkQsZ0JBQWdCLGtCQUFrQixHQUFHLFNBQVMsOEJBQThCLHNCQUFzQixHQUFHLE9BQU8sa0ZBQWtGLE1BQU0saUJBQWlCLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLE1BQU0sWUFBWSxPQUFPLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsS0FBSyxNQUFNLFVBQVUsVUFBVSxLQUFLLEtBQUssWUFBWSxhQUFhLCtuQkFBK25CLGNBQWMsZUFBZSxjQUFjLG9CQUFvQixrQkFBa0IsNkJBQTZCLEdBQUcsZ0pBQWdKLG1CQUFtQixHQUFHLFFBQVEsbUJBQW1CLEdBQUcsVUFBVSxxQkFBcUIsR0FBRyxpQkFBaUIsaUJBQWlCLEdBQUcsMkRBQTJELGdCQUFnQixrQkFBa0IsR0FBRyxTQUFTLDhCQUE4QixzQkFBc0IsR0FBRyxtQkFBbUI7QUFDM3FGO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQdkM7QUFDMEc7QUFDakI7QUFDekYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBLHVFQUF1RSx5Q0FBeUMsMEJBQTBCLG1DQUFtQyw4QkFBOEIsdUJBQXVCLEdBQUcsVUFBVSw2S0FBNkssMENBQTBDLG9CQUFvQix1REFBdUQsZ0VBQWdFLGdCQUFnQiw2QkFBNkIsdUJBQXVCLHdCQUF3QixHQUFHLG9EQUFvRCxrQkFBa0IsbUJBQW1CLEdBQUcsK0JBQStCLDJEQUEyRCxtREFBbUQsaUNBQWlDLHlCQUF5QixHQUFHLHFDQUFxQyw2Q0FBNkMsR0FBRywrQkFBK0IseUNBQXlDLDBDQUEwQyxpQ0FBaUMseUJBQXlCLDJEQUEyRCxtREFBbUQsR0FBRyxxQ0FBcUMsMkRBQTJELG1EQUFtRCxHQUFHLHNDQUFzQyw2Q0FBNkMsR0FBRyxpQ0FBaUMscUJBQXFCLDBCQUEwQixHQUFHLFFBQVEsd0JBQXdCLHVCQUF1Qix5QkFBeUIsNEJBQTRCLEdBQUcsYUFBYSxvQkFBb0IsR0FBRyxhQUFhLG9CQUFvQixHQUFHLGdCQUFnQixxQkFBcUIsR0FBRyxtQ0FBbUMsc0JBQXNCLHdCQUF3Qiw0SUFBNEksR0FBRyxZQUFZLDBCQUEwQiw4QkFBOEIsb0JBQW9CLG9CQUFvQiwwQkFBMEIsNkJBQTZCLEdBQUcsaUNBQWlDLHFDQUFxQywwQkFBMEIsMEJBQTBCLEdBQUcsMEJBQTBCLHVCQUF1QixHQUFHLFdBQVcscUJBQXFCLEdBQUcsZ0JBQWdCLHVCQUF1QixpQkFBaUIsR0FBRyxxQkFBcUIsb0JBQW9CLDBCQUEwQixlQUFlLEdBQUcsc0JBQXNCLHVCQUF1Qix3QkFBd0IsR0FBRywyRUFBMkUsd0JBQXdCLG1CQUFtQix5QkFBeUIsR0FBRyxnQkFBZ0Isc0JBQXNCLHFCQUFxQixHQUFHLGlEQUFpRCxnREFBZ0QsZ0RBQWdELHNCQUFzQixHQUFHLG1EQUFtRCxnREFBZ0QsR0FBRyxpQkFBaUIsZ0RBQWdELGdEQUFnRCxHQUFHLGlCQUFpQix3QkFBd0IsR0FBRyx1QkFBdUIsZ0hBQWdILEdBQUcsNENBQTRDLGlCQUFpQixHQUFHLGNBQWMsb0JBQW9CLG9DQUFvQyxlQUFlLEdBQUcsa0JBQWtCLHNCQUFzQixHQUFHLHVCQUF1QixtQkFBbUIsd0JBQXdCLGtCQUFrQixtQkFBbUIseUJBQXlCLDZCQUE2QixHQUFHLDBCQUEwQixtQkFBbUIsaUJBQWlCLHlCQUF5Qix3QkFBd0IsOEJBQThCLHVCQUF1QixHQUFHLGFBQWEsc0NBQXNDLDJDQUEyQyxHQUFHLGdCQUFnQix3Q0FBd0MsMkNBQTJDLEdBQUcsc0NBQXNDLGdEQUFnRCxzQkFBc0IsR0FBRyx3Q0FBd0MsZ0RBQWdELEdBQUcsNEJBQTRCLDBCQUEwQix3QkFBd0IseUJBQXlCLG1CQUFtQixHQUFHLHVDQUF1Qyx1QkFBdUIsd0JBQXdCLHdCQUF3Qiw2QkFBNkIscUJBQXFCLEdBQUcsMkJBQTJCLG9CQUFvQiw2QkFBNkIsMEJBQTBCLGtCQUFrQixtQkFBbUIscUNBQXFDLDBCQUEwQixtQkFBbUIsR0FBRyx3QkFBd0IscUJBQXFCLEdBQUcsb0JBQW9CLG9CQUFvQixHQUFHLGtCQUFrQixvQkFBb0Isa0JBQWtCLDZCQUE2QiwwQkFBMEIsNkRBQTZELEdBQUcsZ0ZBQWdGLHNCQUFzQixTQUFTLHFCQUFxQixvQkFBb0IsNkJBQTZCLDBCQUEwQixtQkFBbUIsdUJBQXVCLG1CQUFtQixpQ0FBaUMsS0FBSyxvQ0FBb0MsMEJBQTBCLG9EQUFvRCxnQ0FBZ0Msd0JBQXdCLG9CQUFvQiwwQkFBMEIsOEJBQThCLGdCQUFnQiw2QkFBNkIsR0FBRyxnQkFBZ0Isb0JBQW9CLEdBQUcsYUFBYSxtQkFBbUIsNkNBQTZDLEdBQUcsbUJBQW1CLDRDQUE0QyxHQUFHLFNBQVMsd0ZBQXdGLE1BQU0sWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE1BQU0sT0FBTyxhQUFhLFdBQVcsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxhQUFhLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sYUFBYSxNQUFNLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLGFBQWEsTUFBTSxVQUFVLFlBQVksYUFBYSxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sYUFBYSxNQUFNLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxRQUFRLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNLFlBQVksYUFBYSxXQUFXLE9BQU8sTUFBTSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLEtBQUssT0FBTyxPQUFPLGFBQWEsTUFBTSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLE1BQU0sWUFBWSxXQUFXLE9BQU8sTUFBTSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sYUFBYSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLFlBQVksYUFBYSxhQUFhLFlBQVksS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLE9BQU8sYUFBYSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksdURBQXVELHlDQUF5QywwQkFBMEIsbUNBQW1DLDhCQUE4Qix1QkFBdUIsR0FBRyxVQUFVLDZLQUE2SywwQ0FBMEMsb0JBQW9CLHVEQUF1RCxnRUFBZ0UsZ0JBQWdCLDZCQUE2Qix1QkFBdUIsd0JBQXdCLEdBQUcsb0RBQW9ELGtCQUFrQixtQkFBbUIsR0FBRywrQkFBK0IsMkRBQTJELG1EQUFtRCxpQ0FBaUMseUJBQXlCLEdBQUcscUNBQXFDLDZDQUE2QyxHQUFHLCtCQUErQix5Q0FBeUMsMENBQTBDLGlDQUFpQyx5QkFBeUIsMkRBQTJELG1EQUFtRCxHQUFHLHFDQUFxQywyREFBMkQsbURBQW1ELEdBQUcsc0NBQXNDLDZDQUE2QyxHQUFHLGlDQUFpQyxxQkFBcUIsMEJBQTBCLEdBQUcsUUFBUSx3QkFBd0IsdUJBQXVCLHlCQUF5Qiw0QkFBNEIsR0FBRyxhQUFhLG9CQUFvQixHQUFHLGFBQWEsb0JBQW9CLEdBQUcsZ0JBQWdCLHFCQUFxQixHQUFHLG1DQUFtQyxzQkFBc0Isd0JBQXdCLDRJQUE0SSxHQUFHLFlBQVksMEJBQTBCLDhCQUE4QixvQkFBb0Isb0JBQW9CLDBCQUEwQiw2QkFBNkIsR0FBRyxpQ0FBaUMscUNBQXFDLDBCQUEwQiwwQkFBMEIsR0FBRywwQkFBMEIsdUJBQXVCLEdBQUcsV0FBVyxxQkFBcUIsR0FBRyxnQkFBZ0IsdUJBQXVCLGlCQUFpQixHQUFHLHFCQUFxQixvQkFBb0IsMEJBQTBCLGVBQWUsR0FBRyxzQkFBc0IsdUJBQXVCLHdCQUF3QixHQUFHLDJFQUEyRSx3QkFBd0IsbUJBQW1CLHlCQUF5QixHQUFHLGdCQUFnQixzQkFBc0IscUJBQXFCLEdBQUcsaURBQWlELGdEQUFnRCxnREFBZ0Qsc0JBQXNCLEdBQUcsbURBQW1ELGdEQUFnRCxHQUFHLGlCQUFpQixnREFBZ0QsZ0RBQWdELEdBQUcsaUJBQWlCLHdCQUF3QixHQUFHLHVCQUF1QixnSEFBZ0gsR0FBRyw0Q0FBNEMsaUJBQWlCLEdBQUcsY0FBYyxvQkFBb0Isb0NBQW9DLGVBQWUsR0FBRyxrQkFBa0Isc0JBQXNCLEdBQUcsdUJBQXVCLG1CQUFtQix3QkFBd0Isa0JBQWtCLG1CQUFtQix5QkFBeUIsNkJBQTZCLEdBQUcsMEJBQTBCLG1CQUFtQixpQkFBaUIseUJBQXlCLHdCQUF3Qiw4QkFBOEIsdUJBQXVCLEdBQUcsYUFBYSxzQ0FBc0MsMkNBQTJDLEdBQUcsZ0JBQWdCLHdDQUF3QywyQ0FBMkMsR0FBRyxzQ0FBc0MsZ0RBQWdELHNCQUFzQixHQUFHLHdDQUF3QyxnREFBZ0QsR0FBRyw0QkFBNEIsMEJBQTBCLHdCQUF3Qix5QkFBeUIsbUJBQW1CLEdBQUcsdUNBQXVDLHVCQUF1Qix3QkFBd0Isd0JBQXdCLDZCQUE2QixxQkFBcUIsR0FBRywyQkFBMkIsb0JBQW9CLDZCQUE2QiwwQkFBMEIsa0JBQWtCLG1CQUFtQixxQ0FBcUMsMEJBQTBCLG1CQUFtQixHQUFHLHdCQUF3QixxQkFBcUIsR0FBRyxvQkFBb0Isb0JBQW9CLEdBQUcsa0JBQWtCLG9CQUFvQixrQkFBa0IsNkJBQTZCLDBCQUEwQiw2REFBNkQsR0FBRyxnRkFBZ0Ysc0JBQXNCLFNBQVMscUJBQXFCLG9CQUFvQiw2QkFBNkIsMEJBQTBCLG1CQUFtQix1QkFBdUIsbUJBQW1CLGlDQUFpQyxLQUFLLG9DQUFvQywwQkFBMEIsb0RBQW9ELGdDQUFnQyx3QkFBd0Isb0JBQW9CLDBCQUEwQiw4QkFBOEIsZ0JBQWdCLDZCQUE2QixHQUFHLGdCQUFnQixvQkFBb0IsR0FBRyxhQUFhLG1CQUFtQiw2Q0FBNkMsR0FBRyxtQkFBbUIsNENBQTRDLEdBQUcscUJBQXFCO0FBQ2pwYztBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1AxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRDtBQUNyRDs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDs7QUFFQTtBQUNBLHFGQUFxRjtBQUNyRjs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLEtBQUs7QUFDTCxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIscUJBQXFCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3JHYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQW1HO0FBQ25HO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsc0ZBQU87Ozs7QUFJNkM7QUFDckUsT0FBTyxpRUFBZSxzRkFBTyxJQUFJLDZGQUFjLEdBQUcsNkZBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCN0UsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksNkZBQWMsR0FBRyw2RkFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFPLHVEQUFVO0FBQ1ZqQyx5REFBZSxJQUVmOztBQUNBLE1BQU0zRCxjQUFjLEdBQUc1RyxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsaUJBQXZCLENBQXZCO0FBQ0EsTUFBTXNGLFNBQVMsR0FBR25HLFFBQVEsQ0FBQ2EsYUFBVCxDQUF1QixZQUF2QixDQUFsQixFQUVBOztBQUNBK0YsY0FBYyxDQUFDMUYsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUN5RixzREFBekM7QUFFQVIsU0FBUyxDQUFDakYsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBcUNDLENBQUQsSUFBTztFQUN2Q0EsQ0FBQyxDQUFDa0osY0FBRjtFQUNBdkQsMERBQVE7QUFDWCxDQUhELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3BhZ2VMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcmVzZXQuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9yZXNldC5jc3M/ZWRlMCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZGl0aW9uSWNvbiBmcm9tICcuL2Fzc2V0cy9wbHVzLnN2ZydcbmltcG9ydCBkZWxldGVJY29uIGZyb20gJy4vYXNzZXRzL2RlbGV0ZS5zdmcnXG5pbXBvcnQgbWVudUljb24gZnJvbSAnLi9hc3NldHMvbWVudUljb24uc3ZnJ1xuXG5kb2N1bWVudC5jb29raWUgPSAnU2FtZVNpdGU9TGF4J1xuXG5jb25zdCBjcmVhdGVNZW51SWNvbiA9IChsaSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrbGlzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGNoZWNrbGlzdEljb24uc3JjID0gbWVudUljb25cbiAgICBjaGVja2xpc3RJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaWNvbicpXG4gICAgbGkuYXBwZW5kQ2hpbGQoY2hlY2tsaXN0SWNvbilcbn1cblxuLy8gQWRkIHNpbmdsZSBsb2NhdGlvbiB0byB3YXRjaGxpc3QgKGNhbGxlZCBiZWxvdylcbmNvbnN0IGNyZWF0ZUxpc3RpbmcgPSAobG9jYXRpb25OYW1lLCBpKSA9PiB7XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKGBsb2NhdGlvbmApXG4gICAgbG9jYXRpb24uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICAvLyBhc3NpZ24gY2xhc3MgdG8gc2VsZWN0ZWQgbG9jYXRpb24gbGlzdGluZ1xuICAgIGlmIChsb2NhdGlvbk5hbWUuc2VsZWN0ZWQgPT09ICd0cnVlJykge1xuICAgICAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgICAgIC8vIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKVxuICAgIH1cblxuICAgIC8vIGV2ZW50IGxpc3RlbmVyIHRvIGRpc3BsYXkgc2VsZWN0ZWQgbG9jYXRpb24ncyB3ZWF0aGVyXG4gICAgbG9jYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBpZiBkZWxldGluZyBsaXN0aW5nLCBkbyBub3QgZGlzcGxheSB3ZWF0aGVyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZUl0ZW0nKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0TG9jYXRpb24obG9jYXRpb24pXG4gICAgfSlcblxuICAgIGNyZWF0ZU1lbnVJY29uKGxvY2F0aW9uKVxuICAgIGNvbnN0IGxvY2F0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGxvY2F0aW9uVGV4dC50ZXh0Q29udGVudCA9IGxvY2F0aW9uTmFtZS5uYW1lXG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQobG9jYXRpb25UZXh0KVxuICAgIGNyZWF0ZURlbGV0ZUljb24obG9jYXRpb24sIGkpXG4gICAgd2F0Y2hsaXN0LmFwcGVuZENoaWxkKGxvY2F0aW9uKVxufVxuXG4vLyBEaXNwbGF5IGVudGlyZSBhcnJheSBvZiBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG5jb25zdCBkaXNwbGF5V2F0Y2hsaXN0ID0gKCkgPT4ge1xuICAgIC8vIEdyYWIgd2F0Y2hsaXN0XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhdGNobGlzdCcpXG5cbiAgICAvLyBDbGVhciBsb2NhdGlvbiBsaXN0aW5nc1xuICAgIGNvbnN0IG9sZExpc3RpbmdDb3VudCA9IHdhdGNobGlzdC5jaGlsZEVsZW1lbnRDb3VudFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkTGlzdGluZ0NvdW50OyBpKyspIHtcbiAgICAgICAgd2F0Y2hsaXN0LmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgYWxsIGxvY2F0aW9ucyB0byB3YXRjaGxpc3RcbiAgICBsZXQgaSA9IDBcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcbiAgICAvLyBjb25zb2xlLmxvZyhzdG9yYWdlV2F0Y2hsaXN0KVxuICAgIHN0b3JhZ2VXYXRjaGxpc3QuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgY3JlYXRlTGlzdGluZyhsb2NhdGlvbiwgaSlcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBsdXNwbHVzXG4gICAgICAgIGkrK1xuICAgIH0pXG59XG5cbmNvbnN0IHN1Ym1pdExvY2F0aW9uID0gKGlucHV0KSA9PiB7XG4gICAgLy8gY3JlYXRlIGxvY2F0aW9uIG9iamVjdFxuICAgIGNvbnN0IG5ld0xvY2F0aW9uID0ge1xuICAgICAgICBuYW1lOiBpbnB1dCxcbiAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgfVxuXG4gICAgLy8gZ3JhYiBhcnJheSBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIGRlc2VsZWN0IHByZXZpb3VzbHkgc2VsZWN0ZWQgbG9jYXRpb25cbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vIHB1c2ggbG9jYXRpb24gdG8gYXJyYXlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnB1c2gobmV3TG9jYXRpb24pXG4gICAgLy8gY29uc29sZS5sb2coc3RvcmFnZVdhdGNobGlzdClcblxuICAgIC8vIHNldCBhcnJheSBiYWNrIGludG8gc3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyByZWZyZXNoIHdhdGNobGlzdFxuICAgIGRpc3BsYXlXYXRjaGxpc3QoKVxufVxuXG5jb25zdCBkaXNwbGF5V2VhdGhlciA9IChuZXdXZWF0aGVyQ2FyZCkgPT4ge1xuICAgIC8vIGRpc3BsYXkgY29udGVudCB0aXRsZVxuICAgIGNvbnN0IGNvbnRlbnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50VGl0bGUnKVxuICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9IGAke25ld1dlYXRoZXJDYXJkLmNpdHl9LCAke25ld1dlYXRoZXJDYXJkLmNvdW50cnl9YFxuXG4gICAgLy8gZGlzcGxheSB3ZWF0aGVyIGljb25cbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5BUElJbWFnZScpXG4gICAgQVBJSW1hZ2Uuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7bmV3V2VhdGhlckNhcmQud2VhdGhlckljb259QDJ4LnBuZ2BcblxuICAgIC8vIGRpc3BsYXkgZGVzY3JpcHRpb25cbiAgICBjb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlckRlc2NyaXB0aW9uJylcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gYFdlYXRoZXI6ICR7bmV3V2VhdGhlckNhcmQud2VhdGhlckRlc2NyaXB0aW9ufWBcblxuICAgIC8vIGRpc3BsYXkgY3VycmVudCB0ZW1wZXJhdHVyZVxuICAgIGNvbnN0IHRlbXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcENvbnRhaW5lcicpXG4gICAgdGVtcENvbnRhaW5lci5pbm5lclRleHQgPSBgJHtNYXRoLnJvdW5kKG5ld1dlYXRoZXJDYXJkLnRlbXBDdXJyZW50KX1cXHUwMEIwYFxuXG4gICAgLy8gZGlzcGxheSBoaWdoL2xvdyB0ZW1wZXJhdHVyZXNcbiAgICBjb25zdCBsb3dUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvd1RlbXBDb250YWluZXInKVxuICAgIGxvd1RlbXBDb250YWluZXIuaW5uZXJUZXh0ID0gYExvdyB0ZW1wZXJhdHVyZTogJHtNYXRoLnJvdW5kKFxuICAgICAgICBuZXdXZWF0aGVyQ2FyZC50ZW1wTG93XG4gICAgKX1cXHUwMEIwYFxuICAgIGNvbnN0IGhpZ2hUZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZ2hUZW1wQ29udGFpbmVyJylcbiAgICBoaWdoVGVtcENvbnRhaW5lci5pbm5lclRleHQgPSBgSGlnaCB0ZW1wZXJhdHVyZTogJHtNYXRoLnJvdW5kKFxuICAgICAgICBuZXdXZWF0aGVyQ2FyZC50ZW1wSGlnaFxuICAgICl9XFx1MDBCMGBcblxuICAgIC8vIGRpcGxheSBjdXJyZW50IHRpbWVcbiAgICBjb25zdCB0aW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVDb250YWluZXInKVxuICAgIHRpbWVDb250YWluZXIuaW5uZXJUZXh0ID0gYExvY2FsIHRpbWU6ICR7bmV3V2VhdGhlckNhcmQubG9jYWxEYXRlLmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQubG9jYWxEYXRlLmdldE1pbnV0ZXMoKX1gXG5cbiAgICAvLyBkaXNwbGF5IHN1bnJpc2Uvc3Vuc2V0IHRpbWVzXG4gICAgY29uc3Qgc3VucmlzZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdW5yaXNlQ29udGFpbmVyJylcbiAgICBzdW5yaXNlQ29udGFpbmVyLmlubmVyVGV4dCA9IGBTdW5yaXNlOiAke25ld1dlYXRoZXJDYXJkLnN1bnJpc2UuZ2V0SG91cnMoKX06JHtuZXdXZWF0aGVyQ2FyZC5zdW5yaXNlLmdldE1pbnV0ZXMoKX1gXG4gICAgY29uc3Qgc3Vuc2V0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1bnNldENvbnRhaW5lcicpXG4gICAgc3Vuc2V0Q29udGFpbmVyLmlubmVyVGV4dCA9IGBTdW5zZXQ6ICR7bmV3V2VhdGhlckNhcmQuc3Vuc2V0LmdldEhvdXJzKCl9OiR7bmV3V2VhdGhlckNhcmQuc3Vuc2V0LmdldE1pbnV0ZXMoKX1gXG5cbiAgICAvLyBkaXNwbGF5IHdpbmRcbiAgICBjb25zdCB3aW5kQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmRDb250YWluZXInKVxuICAgIHdpbmRDb250YWluZXIuaW5uZXJUZXh0ID0gYFdpbmQ6ICR7TWF0aC5yb3VuZChcbiAgICAgICAgbmV3V2VhdGhlckNhcmQud2luZFNwZWVkXG4gICAgKX1tcGgsICR7bmV3V2VhdGhlckNhcmQud2luZERpcmVjdGlvbn0gKCR7bmV3V2VhdGhlckNhcmQud2luZERlZ3JlZX1cXHUwMEIwKWBcblxuICAgIC8vIGRpc3BsYXkgaHVtaWRpdHlcbiAgICBjb25zdCBodW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eUNvbnRhaW5lcicpXG4gICAgaHVtaWRpdHlDb250YWluZXIuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAke25ld1dlYXRoZXJDYXJkLmh1bWlkaXR5fSVgXG59XG5cbmNvbnN0IGRpc3BsYXlGb3JlY2FzdCA9IChuZXdIb3VybHlGb3JlY2FzdEFycmF5KSA9PiB7XG4gICAgY29uc3QgZm9yZWNhc3RSb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9yZWNhc3RSb3cnKVxuXG4gICAgLy8gcmVtb3ZlIGFueSBmb3JlY2FzdCBjZWxsc1xuICAgIGNvbnN0IG9sZEZvcmVjYXN0ID0gZm9yZWNhc3RSb3cuY2hpbGRFbGVtZW50Q291bnRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZEZvcmVjYXN0OyBpKyspIHtcbiAgICAgICAgZm9yZWNhc3RSb3cuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgIH1cblxuICAgIC8vIEFkZCBuZXcgZm9yZWNhc3QgY2VsbHNcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0hvdXJseUZvcmVjYXN0QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgICAgICBmb3JlY2FzdENlbGwuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RDZWxsJylcblxuICAgICAgICAvLyBkaXNwbGF5IGRhdGVcbiAgICAgICAgY29uc3QgZm9yZWNhc3REYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0RGF0ZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdERhdGUnKVxuICAgICAgICBmb3JlY2FzdERhdGUuaW5uZXJUZXh0ID0gYCR7XG4gICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLmRhdGUuZ2V0TW9udGgoKSArIDFcbiAgICAgICAgfS8ke25ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0uZGF0ZS5nZXREYXRlKCl9YFxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3REYXRlKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgdGltZVxuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgZm9yZWNhc3RUaW1lLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0VGltZScpXG4gICAgICAgIGZvcmVjYXN0VGltZS5pbm5lclRleHQgPVxuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS5kYXRlLnRvTG9jYWxlVGltZVN0cmluZygpXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbWUpXG5cbiAgICAgICAgLy8gZGlzcGxheSB3ZWF0aGVyIGljb25cbiAgICAgICAgY29uc3Qgd2VhdGhlckZvcmVjYXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgIHdlYXRoZXJGb3JlY2FzdEljb24uY2xhc3NMaXN0LmFkZCgnd2VhdGhlckZvcmVjYXN0SWNvbicpXG4gICAgICAgIHdlYXRoZXJGb3JlY2FzdEljb24uc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7bmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS53ZWF0aGVySWNvbn0ucG5nYFxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQod2VhdGhlckZvcmVjYXN0SWNvbilcblxuICAgICAgICAvLyBkaXNwbGF5IHdlYXRoZXIgZGVzY3JpcHRpb25cbiAgICAgICAgY29uc3QgZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24nKVxuICAgICAgICBmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbi5pbm5lclRleHQgPVxuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS53ZWF0aGVyRGVzY3JpcHRpb25cbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgZm9yZWNhc3QgdGVtcGVyYXR1cmVcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRlbXAnKVxuICAgICAgICBmb3JlY2FzdFRlbXAuaW5uZXJUZXh0ID0gYCR7TWF0aC5yb3VuZChcbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0udGVtcGVyYXR1cmVcbiAgICAgICAgKX1cXHUwMEIwYFxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZW1wKVxuXG4gICAgICAgIGZvcmVjYXN0Um93LmFwcGVuZENoaWxkKGZvcmVjYXN0Q2VsbClcbiAgICB9XG59XG5cbmNvbnN0IHNlbGVjdExvY2F0aW9uID0gKGxpKSA9PiB7XG4gICAgLy8gRmV0Y2ggY3VycmVudCB3ZWF0aGVyXG4gICAgQVBJQ2l0eVNlYXJjaChsaS5pbm5lclRleHQpXG5cbiAgICAvLyBncmFiIGxvY2F0aW9ucyBhcnJheSBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIGRlc2VsZWN0IGFsbCBsb2NhdGlvbnNcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9ICdmYWxzZSdcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBTZWxlY3QgbG9jYXRpb24gaWYgb25lIGlzIGNob3NlbiAobWFpbiBtZW51IHNlbGVjdGlvbiBpcyBoYW5kbGVkIGluIGV2ZW50IGxpc3RlbmVyKVxuICAgIGlmIChsaS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdsb2NhdGlvbicpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMb2NhdGlvbklkID0gbGkuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgICAgIHN0b3JhZ2VXYXRjaGxpc3Rbc2VsZWN0ZWRMb2NhdGlvbklkXS5zZWxlY3RlZCA9ICd0cnVlJ1xuICAgIH1cblxuICAgIC8vIHNldCBsb2NhdGlvbnMgYXJyYXkgYmFjayBpbnRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyByZWZyZXNoXG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IGNyZWF0ZUFkZEJ1dHRvbiA9IChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdhZGRCdG4nKVxuICAgIGFkZEJ0bi5pbm5lclRleHQgPSAnc2VhcmNoJ1xuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB2YWxpZGF0ZVNlYXJjaChlKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkQnRuKVxufVxuXG5jb25zdCBjcmVhdGVDYW5jZWxCdXR0b24gPSAoY29udGFpbmVyLCBpKSA9PiB7XG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZCgnY2FuY2VsQnRuJylcbiAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICBjYW5jZWxCdG4uaW5uZXJUZXh0ID0gJ2NhbmNlbCdcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKVxufVxuXG4vLyBjcmVhdGVGb3JtXG5jb25zdCBjcmVhdGVGb3JtID0gKGZvcm0pID0+IHtcbiAgICAvLyByb3cgb25lOiBhc3NpZ24gaW5wdXRcbiAgICBjb25zdCBmb3JtUm93MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9ybVJvdzEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmb3JtUm93JylcbiAgICBjb25zdCBuZXdMb2NhdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIG5ld0xvY2F0aW9uSW5wdXQuY2xhc3NMaXN0LmFkZCgnbmV3TG9jYXRpb25JbnB1dCcpXG4gICAgbmV3TG9jYXRpb25JbnB1dC5wbGFjZWhvbGRlciA9ICdGbG9yZW5jZSdcbiAgICBuZXdMb2NhdGlvbklucHV0Lm5hbWUgPSAnbmV3TG9jYXRpb25JbnB1dCdcbiAgICBmb3JtUm93MS5hcHBlbmRDaGlsZChuZXdMb2NhdGlvbklucHV0KVxuXG4gICAgLy8gcm93IHR3bzogc3VibWl0IGFuZCBjYW5jZWwgYnV0dG9uc1xuICAgIGNvbnN0IGZvcm1Sb3cyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93Mi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZm9ybUJ1dHRvbnMnKVxuICAgIGNyZWF0ZUFkZEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcbiAgICBjcmVhdGVDYW5jZWxCdXR0b24oZm9ybVJvdzIsIGZvcm0pXG5cbiAgICAvLyByb3cgdGhyZWU6IGFzc2lnbiBlcnJvciBjbGFzcyBhbmQgdGV4dFxuICAgIGNvbnN0IGZvcm1Sb3czID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAvLyBmb3JtUm93My5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgZm9ybVJvdzMuc2V0QXR0cmlidXRlKCdjbGFzcycsICduZXdQcm9qRXJyb3JDb250YWluZXInKVxuICAgIC8vIGZvcm1Sb3czLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzEpXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MilcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3czKVxufVxuXG5jb25zdCBzaG93Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRMb2NhdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkJ0bicpXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uRm9ybScpXG5cbiAgICBhZGRMb2NhdGlvbkJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2hvd0Jsb2NrJylcbn1cblxuY29uc3QgaGlkZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkTG9jYXRpb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25CdG4nKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkZvcm0nKVxuXG4gICAgYWRkTG9jYXRpb25CdG4uc2V0QXR0cmlidXRlKCdpZCcsICdzaG93QmxvY2snKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG59XG5cbi8vIERlbGV0ZSB3YXRjaGxpc3QgZW50cnlcbmNvbnN0IGRlbGV0ZVdhdGNobGlzdEVudHJ5ID0gKGUpID0+IHtcbiAgICAvLyBncmFiIGFycmF5cyBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIElkZW50aWZ5IGVudHJ5IHRvIGRlbGV0ZVxuICAgIGNvbnN0IGRvb21lZEluZGV4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgLy8gY29uc3QgZG9vbWVkTmFtZSA9IHN0b3JhZ2VXYXRjaGxpc3RbZG9vbWVkSW5kZXhdLm5hbWU7XG5cbiAgICAvLyBkZWxldGUgZW50cnlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnNwbGljZShkb29tZWRJbmRleCwgMSlcblxuICAgIC8vIHNldCBjaGFuZ2VzIHRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyBJZiBkb29tZWQgZW50cnkgd2FzIHNlbGVjdGVkLCBjbGVhciBjb250ZW50IGRpc3BsYXlcbiAgICAvLyBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJyk7XG4gICAgLy8gY29uc3QgYWxsVGFza3NDbGFzc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsVGFza3MnKS5jbGFzc0xpc3RcbiAgICAvLyBpZiAoY29udGVudFRpdGxlLnRleHRDb250ZW50ID09PSBkb29tZWROYW1lKSB7XG4gICAgLy8gICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9ICdBbGwgdGFza3MnXG4gICAgLy8gICAgIGFsbFRhc2tzQ2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIC8vIH1cblxuICAgIC8vIHJlZnJlc2ggd2F0Y2hpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlRGVsZXRlSWNvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICAvLyBjcmVhdGUgaW1hZ2UgYW5kIGFzc2lnbiBhdHRyaWJ1dGVzXG4gICAgY29uc3QgbmV3RGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3RGVsZXRlSWNvbi5zcmMgPSBkZWxldGVJY29uXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24gZGVsZXRlSXRlbScpXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuXG4gICAgLy8gQUREIEVWRU5UIExJU1RFTkVSXG4gICAgaWYgKFxuICAgICAgICBjb250YWluZXIuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAnbG9jYXRpb24nIHx8XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2xvY2F0aW9uJylcbiAgICApIHtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXIgdG8gZGVsZXRlIGxvY2F0aW9uXG4gICAgICAgIG5ld0RlbGV0ZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeWAsXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YCxcbiAgICAgICAgICAgIGBoaWRkZW5gXG4gICAgICAgIClcbiAgICAgICAgbmV3RGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PlxuICAgICAgICAgICAgZGVsZXRlV2F0Y2hsaXN0RW50cnkoZSwgaSlcbiAgICAgICAgKVxuICAgICAgICAvLyBkaXNwbGF5IHRyYXNoIGljb24gb24gaG92ZXJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGhpZGUgdHJhc2ggaWNvblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBzdHJhbmdlJylcbiAgICB9XG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdEZWxldGVJY29uKVxufVxuXG5jb25zdCBjcmVhdGVBZGRpdGlvbkljb24gPSAobGkpID0+IHtcbiAgICBjb25zdCBuZXdBZGRpdGlvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0FkZGl0aW9uSWNvbi5zcmMgPSBhZGRpdGlvbkljb25cbiAgICBuZXdBZGRpdGlvbkljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChuZXdBZGRpdGlvbkljb24pXG59XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vIE9wZW53ZWF0aGVyIEFQSSBGdW5jdGlvbnNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZnVuY3Rpb24gdG9EaXJlY3Rpb24oZGVncmVlKSB7XG4gICAgaWYgKGRlZ3JlZSA+IDMzNy41KSByZXR1cm4gJ05vcnRoJ1xuICAgIGlmIChkZWdyZWUgPiAyOTIuNSkgcmV0dXJuICdOb3J0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyNDcuNSkgcmV0dXJuICdXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMDIuNSkgcmV0dXJuICdTb3V0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAxNTcuNSkgcmV0dXJuICdTb3V0aCdcbiAgICBpZiAoZGVncmVlID4gMTIyLjUpIHJldHVybiAnU291dGggRWFzdCdcbiAgICBpZiAoZGVncmVlID4gNjcuNSkgcmV0dXJuICdFYXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMi41KSByZXR1cm4gJ05vcnRoIEVhc3QnXG4gICAgcmV0dXJuICdOb3J0aCdcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjIzNzYxMTUvaG93LXRvLW9idGFpbi1vcGVuLXdlYXRoZXItYXBpLWRhdGUtdGltZS1mcm9tLWNpdHktYmVpbmctZmV0Y2hlZFxuY29uc3QgY2FsY0N1cnJlbnRUaW1lID0gKHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbFRpbWUgPSBkLmdldFRpbWUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSBsb2NhbFRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuY29uc3QgY2FsY1N1blRpbWUgPSAodGltZSwgdGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSB0aW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbi8vIGNvbnN0IGZldGNoRGFpbHlGb3JlY2FzdCA9IChsYXQsIGxvbikgPT4ge1xuLy8gICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3UHJvakVycm9yQ29udGFpbmVyJyk7XG4vLyAgIGNvbnNvbGUubG9nKGxhdCk7XG4vLyAgIGNvbnNvbGUubG9nKGxvbik7XG4vLyAgIC8vIGZldGNoIHNldmVuIGRheSBmb3JlY2FzdFxuLy8gICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PSR7bGF0fSZsb249JHtsb259JmV4Y2x1ZGU9bWludXRlbHksaG91cmx5LGFsZXJ0cyZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsIHsgbW9kZTogJ2NvcnMnIH0pXG4vLyAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4vLyAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4vLyAgICAgfSlcbi8vICAgICAuY2F0Y2goKGVycikgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coZXJyKTtcbi8vICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuY29uc3QgZmV0Y2hIb3VybHlGb3JlY2FzdCA9IChjaXR5UXVlcnkpID0+IHtcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG4gICAgLy8gZmV0Y2ggZml2ZSBkYXkvdGhyZWUgaG91ciBmb3JlY2FzdFxuICAgIGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCxcbiAgICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdEFycmF5ID0gW11cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0KSxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRleHQ6IHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0LFxuICAgICAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubGlzdFtpXS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgICAgICByYWluQ2hhbmNlOiByZXNwb25zZS5saXN0W2ldLnBvcCAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJJY29uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uaWNvbixcbiAgICAgICAgICAgICAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS5saXN0W2ldLndpbmQuZ3VzdCxcbiAgICAgICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS5saXN0W2ldLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXkucHVzaChuZXdIb3VybHlGb3JlY2FzdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0hvdXJseUZvcmVjYXN0QXJyYXkpXG4gICAgICAgICAgICBkaXNwbGF5Rm9yZWNhc3QobmV3SG91cmx5Rm9yZWNhc3RBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBuZXdIb3VybHlGb3JlY2FzdEFycmF5XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJ1xuICAgICAgICB9KVxufVxuXG5jb25zdCBmZXRjaEN1cnJlbnRXZWF0aGVyID0gKGNpdHlRdWVyeSkgPT4ge1xuICAgIC8vIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUltYWdlJylcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG5cbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCxcbiAgICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAvLyBjb25zdCB7bGF0fSA9IHJlc3BvbnNlLmNvb3JkO1xuICAgICAgICAgICAgLy8gY29uc3Qge2xvbn0gPSByZXNwb25zZS5jb29yZDtcbiAgICAgICAgICAgIC8vIGZldGNoRGFpbHlGb3JlY2FzdChsYXQsIGxvbik7XG4gICAgICAgICAgICBjb25zdCBuZXdXZWF0aGVyQ2FyZCA9IHtcbiAgICAgICAgICAgICAgICBjaXR5OiByZXNwb25zZS5uYW1lLFxuICAgICAgICAgICAgICAgIGNvdW50cnk6IHJlc3BvbnNlLnN5cy5jb3VudHJ5LFxuICAgICAgICAgICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgIGxvY2FsRGF0ZTogY2FsY0N1cnJlbnRUaW1lKHJlc3BvbnNlLnRpbWV6b25lKSxcbiAgICAgICAgICAgICAgICBzdW5yaXNlOiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnJpc2UgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgc3Vuc2V0OiBjYWxjU3VuVGltZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3lzLnN1bnNldCAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnRpbWV6b25lXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0ZW1wQ3VycmVudDogcmVzcG9uc2UubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgIHRlbXBIaWdoOiByZXNwb25zZS5tYWluLnRlbXBfbWF4LFxuICAgICAgICAgICAgICAgIHRlbXBMb3c6IHJlc3BvbnNlLm1haW4udGVtcF9taW4sXG4gICAgICAgICAgICAgICAgd2VhdGhlckNvbmRpdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbjogcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVySWNvbjogcmVzcG9uc2Uud2VhdGhlclswXS5pY29uLFxuICAgICAgICAgICAgICAgIHdpbmREZWdyZWU6IHJlc3BvbnNlLndpbmQuZGVnLFxuICAgICAgICAgICAgICAgIHdpbmREaXJlY3Rpb246IHRvRGlyZWN0aW9uKHJlc3BvbnNlLndpbmQuZGVnKSxcbiAgICAgICAgICAgICAgICB3aW5kU3BlZWQ6IHJlc3BvbnNlLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgd2luZEd1c3Q6IHJlc3BvbnNlLndpbmQuZ3VzdCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3Jlc3BvbnNlLndlYXRoZXJbMF0uaWNvbn1AMngucG5nYFxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3V2VhdGhlckNhcmQpXG4gICAgICAgICAgICBzdWJtaXRMb2NhdGlvbihgJHtuZXdXZWF0aGVyQ2FyZC5jaXR5fSwgJHtuZXdXZWF0aGVyQ2FyZC5jb3VudHJ5fWApXG4gICAgICAgICAgICBkaXNwbGF5V2VhdGhlcihuZXdXZWF0aGVyQ2FyZClcbiAgICAgICAgICAgIHJldHVybiBuZXdXZWF0aGVyQ2FyZFxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdDaXR5IG5vdCBmb3VuZCdcbiAgICAgICAgfSlcbn1cblxuY29uc3QgQVBJQ2l0eVNlYXJjaCA9IChpbnB1dCkgPT4ge1xuICAgIGZldGNoQ3VycmVudFdlYXRoZXIoaW5wdXQpXG4gICAgZmV0Y2hIb3VybHlGb3JlY2FzdChpbnB1dClcbn1cblxuY29uc3QgdmFsaWRhdGVTZWFyY2ggPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vIGdyYWIgZG9tIGVsZW1lbnRzXG4gICAgY29uc3QgbmV3TG9jYXRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdMb2NhdGlvbklucHV0JylcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG4gICAgLy8gcmVzZXQgZXJyb3JcbiAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJydcbiAgICAvLyBjaGVjayBmb3Igc2VhcmNoIHRlcm1cbiAgICBpZiAobmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcbiAgICB9IGVsc2Uge1xuICAgICAgICBBUElDaXR5U2VhcmNoKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUpXG4gICAgICAgIGhpZGVGb3JtKClcbiAgICAgICAgbmV3TG9jYXRpb25JbnB1dC52YWx1ZSA9ICcnXG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVEZWxldGVJY29uLFxuICAgIGNyZWF0ZUZvcm0sXG4gICAgY3JlYXRlTWVudUljb24sXG4gICAgZGlzcGxheVdhdGNobGlzdCxcbiAgICBoaWRlRm9ybSxcbiAgICBzaG93Rm9ybSxcbiAgICBzdWJtaXRMb2NhdGlvbixcbiAgICB2YWxpZGF0ZVNlYXJjaCxcbn1cbiIsIi8vIGNsYXNzIGxvY2F0aW9ucyB7XG4vLyAgICAgY29uc3RydWN0b3IobG9jYXRpb25OYW1lKSB7XG4vLyAgICAgICAgIHRoaXMubmFtZSA9IGxvY2F0aW9uTmFtZVxuLy8gICAgICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWRcbi8vICAgICB9XG4vLyB9XG5cbi8vIEluaXRpYXRlIHN0b3JhZ2UgYXJyYXlzIGlmIGxvY2FsU3RvcmFnZSBpcyBlbXB0eVxuY29uc3QgaW5pdGlhdGVTdG9yYWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0b3JhZ2VXYXRjaGxpc3RBcnJheSA9IFtdXG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgICdzdG9yYWdlV2F0Y2hsaXN0JyxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3RBcnJheSlcbiAgICAgICAgKVxuICAgIH1cbn1cblxuLy8gaW5zZXJ0IGNvbnRlbnQgZnJvbSBsb2NhbCBzdG9yYWdlIGlmIHRoZXJlIGlzIGFueVxuXG5leHBvcnQgZGVmYXVsdCBpbml0aWF0ZVN0b3JhZ2VcbiIsImltcG9ydCB7XG4gICAgY3JlYXRlQWRkaXRpb25JY29uLFxuICAgIGNyZWF0ZUZvcm0sXG4gICAgLy8gZGlzcGxheVdhdGNobGlzdCxcbn0gZnJvbSAnLi9oZWxwZXJGdW5jdGlvbnMnXG5pbXBvcnQgZ2l0aHViSWNvbiBmcm9tICcuL2Fzc2V0cy9HaXRIdWItbGlnaHQtMzJweC5wbmcnXG5pbXBvcnQgbG9nb0ljb24gZnJvbSAnLi9hc3NldHMvbG9nb0ljb24uc3ZnJ1xuXG5jb25zdCBjcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJylcblxuICAgIC8vIGRpc3BsYXkgbG9nb1xuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGxvZ28uc3JjID0gbG9nb0ljb25cbiAgICBsb2dvLnRhcmdldCA9ICdfYmxhbmsnXG4gICAgbG9nby5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xvZ28nKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChsb2dvKVxuXG4gICAgLy8gZGlzcGxheSB0aXRsZVxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKVxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1dlYXRoZXJzZXJ2ZSdcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpXG5cbiAgICByZXR1cm4gaGVhZGVyXG59XG5cbmNvbnN0IGNyZWF0ZU1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbWVudS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21lbnUnKVxuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBoZWFkZXJcbiAgICBjb25zdCB3YXRjaGxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICB3YXRjaGxpc3RIZWFkZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3RIZWFkZXInKVxuICAgIHdhdGNobGlzdEhlYWRlci50ZXh0Q29udGVudCA9ICdXYXRjaGxpc3QnXG5cbiAgICAvLyBjcmVhdGUgd2F0Y2hsaXN0IG1lbnVcbiAgICBjb25zdCB3YXRjaGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcbiAgICB3YXRjaGxpc3Quc2V0QXR0cmlidXRlKCdpZCcsICd3YXRjaGxpc3QnKVxuXG4gICAgLy8gZGlzcGxheVdhdGNobGlzdCgpXG5cbiAgICAvLyBHZW5lcmF0ZSBhZGQgbG9jYXRpb24gY29udGFpbmVyXG4gICAgY29uc3QgYWRkTG9jYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd3YXRjaGxpc3QnKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGJ1dHRvblxuICAgIGNvbnN0IGFkZExvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGFkZExvY2F0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYWRkTG9jYXRpb25CdG4nKVxuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbihhZGRMb2NhdGlvbilcbiAgICBjb25zdCBhZGRMb2NhdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBhZGRMb2NhdGlvblRleHQuaW5uZXJUZXh0ID0gJ0FkZCBMb2NhdGlvbidcbiAgICBhZGRMb2NhdGlvbi5hcHBlbmRDaGlsZChhZGRMb2NhdGlvblRleHQpXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb24pXG5cbiAgICAvLyBHZW5lcmF0ZSBhbmQgaGlkZSBuZXcgbG9jYXRpb24gZm9ybVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uRm9ybScpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnaGlkZGVuJylcbiAgICBhZGRMb2NhdGlvbkZvcm0ubWV0aG9kID0gJ2dldCdcbiAgICBjcmVhdGVGb3JtKGFkZExvY2F0aW9uRm9ybSlcbiAgICBhZGRMb2NhdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkZvcm0pXG5cbiAgICBtZW51LmFwcGVuZENoaWxkKHdhdGNobGlzdEhlYWRlcilcbiAgICBtZW51LmFwcGVuZENoaWxkKHdhdGNobGlzdClcbiAgICBtZW51LmFwcGVuZENoaWxkKGFkZExvY2F0aW9uQ29udGFpbmVyKVxuXG4gICAgcmV0dXJuIG1lbnVcbn1cblxuY29uc3QgY3JlYXRlV2VhdGhlckNhcmQgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIFdlYXRoZXIgQVBJIGNvbnRhaW5lclxuICAgIGNvbnN0IFdlYXRoZXJBUElDb250YWludGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5jbGFzc0xpc3QuYWRkKCdXZWF0aGVyQVBJQ29udGFpbnRlcicsICdjb250ZW50JylcblxuICAgIC8vIGNyZWF0ZSBBUEkgdGl0bGVcbiAgICBjb25zdCBBUElUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcbiAgICBBUElUaXRsZS5jbGFzc0xpc3QuYWRkKCdjb250ZW50VGl0bGUnKVxuXG4gICAgLy8gY3JlYXRlIGN1cnJlbnQgdGVtcCBjb250YWluZXJcbiAgICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKVxuICAgIHRlbXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGVtcENvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgQVBJIGltZ1xuICAgIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBBUElJbWFnZS5jbGFzc0xpc3QuYWRkKCdBUElJbWFnZScpXG5cbiAgICAvLyBjcmVhdGUgZGVzY3JpcHRpb24gY29udGFpbmVyXG4gICAgY29uc3QgZGVzY3JpcHRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBkZXNjcmlwdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd3ZWF0aGVyRGVzY3JpcHRpb24nKVxuXG4gICAgLy8gY3JlYXRlIGxvdyB0ZW1wIGNvbnRhaW5lclxuICAgIGNvbnN0IGxvd1RlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBsb3dUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2xvd1RlbXBDb250YWluZXInKVxuXG4gICAgLy8gY3JlYXRlIGhpZ2ggdGVtcCBjb250YWluZXJcbiAgICBjb25zdCBoaWdoVGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGhpZ2hUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZ2hUZW1wQ29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IHRpbWUgY29udGFpbmVyXG4gICAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHRpbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGltZUNvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgc3VucmlzZSBjb250YWluZXJcbiAgICBjb25zdCBzdW5yaXNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgc3VucmlzZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdW5yaXNlQ29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBzdW5zZXQgY29udGFpbmVyXG4gICAgY29uc3Qgc3Vuc2V0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgc3Vuc2V0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1bnNldENvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgd2luZCBjb250YWluZXJcbiAgICBjb25zdCB3aW5kQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgd2luZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd3aW5kQ29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBodW1pZGl0eSBjb250YWluZXJcbiAgICBjb25zdCBodW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGh1bWlkaXR5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2h1bWlkaXR5Q29udGFpbmVyJylcblxuICAgIC8vIGNyZWF0ZSBmb3JlY2FzdCBjb250YWluZXJcbiAgICBjb25zdCBmb3JlY2FzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9yZWNhc3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RDb250YWluZXInKVxuXG4gICAgY29uc3QgZm9yZWNhc3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcbiAgICBmb3JlY2FzdFRpdGxlLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0VGl0bGUnKVxuICAgIGZvcmVjYXN0VGl0bGUuaW5uZXJUZXh0ID0gJ0ZpdmUgZGF5LCB0aHJlZSBob3VyIGZvcmVjYXN0OidcblxuICAgIGNvbnN0IGZvcmVjYXN0VGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXG4gICAgZm9yZWNhc3RUYWJsZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRhYmxlJylcbiAgICBmb3JlY2FzdENvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JlY2FzdFRhYmxlKVxuXG4gICAgY29uc3QgZm9yZWNhc3RSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG4gICAgZm9yZWNhc3RSb3cuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RSb3cnKVxuICAgIGZvcmVjYXN0VGFibGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3RSb3cpXG5cbiAgICAvLyBtYWtlIHNjcm9sbHdoZWVsIGZ1bmN0aW9uYWwgd2l0aCBob3Jpem9udGFsIHNjcm9sbGluZ1xuICAgIGZvcmVjYXN0Um93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGZvcmVjYXN0Um93LnNjcm9sbExlZnQgKz0gZS5kZWx0YVlcbiAgICB9KVxuXG4gICAgLy8gQXBwZW5kXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJVGl0bGUpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQodGVtcENvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGxvd1RlbXBDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoaGlnaFRlbXBDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZCh0aW1lQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHN1bnJpc2VDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoc3Vuc2V0Q29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQod2luZENvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChodW1pZGl0eUNvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChmb3JlY2FzdFRpdGxlKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGZvcmVjYXN0Q29udGFpbmVyKVxuXG4gICAgcmV0dXJuIFdlYXRoZXJBUElDb250YWludGVyXG59XG5cbmNvbnN0IGNyZWF0ZUNvbnRlbnQgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIGNvbnRlbnQgY29udGFpbmVyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250ZW50JylcblxuICAgIC8vIGRpc3BsYXkgd2VhdGhlciBjYXJkXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjcmVhdGVXZWF0aGVyQ2FyZCgpKVxuXG4gICAgcmV0dXJuIGNvbnRlbnRcbn1cblxuY29uc3QgY3JlYXRlRm9vdGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpXG5cbiAgICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBjb3B5cmlnaHQudGV4dENvbnRlbnQgPSBgQ29weXJpZ2h0IMKpICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBqY2FtcGJlbGw1N2BcblxuICAgIGNvbnN0IGdpdGh1YkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBnaXRodWJMaW5rLmhyZWYgPSAnaHR0cHM6Ly9naXRodWIuY29tL2pjYW1wYmVsbDU3J1xuICAgIGdpdGh1YkxpbmsudGFyZ2V0ID0gJ19ibGFuaydcblxuICAgIGNvbnN0IG5ld0dpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0dpdGh1Ykljb24uc3JjID0gZ2l0aHViSWNvblxuICAgIG5ld0dpdGh1Ykljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdnaXRodWInKVxuXG4gICAgZ2l0aHViTGluay5hcHBlbmRDaGlsZChuZXdHaXRodWJJY29uKVxuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChjb3B5cmlnaHQpXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGdpdGh1YkxpbmspXG5cbiAgICByZXR1cm4gZm9vdGVyXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZU1lbnUoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUNvbnRlbnQoKSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUZvb3RlcigpKVxufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9yZXNldC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUdDOztBQUVEOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDtBQUNBO0NBQ0MseUJBQXlCO0NBQ3pCLGlCQUFpQjtBQUNsQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIFBhZ2Ugc3R5bGluZyAqL1xcblxcbjpyb290IHtcXG4gICAgLS1wYW5lbDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjY1KTtcXG4gICAgLS1hY2NlbnQ6IHJveWFsYmx1ZTtcXG4gICAgLS1iYWNrZ3JvdW5kOiByZ2IoMCwgMTAsIDM5KTtcXG4gICAgLS13aGl0ZS1pc2g6IHdoaXRlc21va2U7XFxuICAgIC0tZXJyb3I6IGRhcmtyZWQ7XFxufVxcblxcbmJvZHkge1xcbiAgICAvKiBzeXN0ZW0gZm9udCBzdGFjayAqL1xcbiAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sXFxuICAgICAgICBPeHlnZW4tU2FucywgVWJ1bnR1LCBDYW50YXJlbGwsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQpO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDI1MHB4IGNhbGMoMTAwdncgLSAyNTBweCk7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMTEwcHggY2FsYygxMDB2aCAtIDExMHB4IC0gNjJweCkgNjJweDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBtYXgtd2lkdGg6IDEwMHZ3O1xcbiAgICBtYXgtaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLyogU2Nyb2xsYmFyIHN0eWxpbmcgKi9cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXG4gICAgd2lkdGg6IDEycHg7XFxuICAgIGhlaWdodDogMTJweDtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDZweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrOmhvdmVyIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDIwLCAyMCwgMjAsIDAuMik7XFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xcbiAgICAvKiBiYWNrZ3JvdW5kOiB2YXIoLS1tZW51LWNvbG9yKTsgICovXFxuICAgIGJhY2tncm91bmQ6IHJnYigyMCwgMjAsIDIwLCAwLjI1KTtcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC40KTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjYpO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC42KTtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjphY3RpdmUge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjAsIDIwLCAyMCwgMC4yKTtcXG59XFxuXFxuLyogR2VuZXJhbCBzdHlsaW5nICovXFxuXFxuaDEge1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuaDIge1xcbiAgICBmb250LXNpemU6IDEuMTVlbTtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgbWFyZ2luLXRvcDogMC44M2VtO1xcbiAgICBtYXJnaW4tYm90dG9tOiAwLjgzZW07XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jaGlkZGVuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI3Nob3dCbG9jayB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKiBIZWFkZXIgc3R5bGluZyAqL1xcblxcbi5sb2dvIHtcXG4gICAgbWF4LWhlaWdodDogOTAlO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcXG4gICAgLyogd2hpdGVzbW9rZSBjb2xvciAqL1xcbiAgICBmaWx0ZXI6IGludmVydCgxMDAlKSBzZXBpYSgwJSkgc2F0dXJhdGUoNzQ4MCUpIGh1ZS1yb3RhdGUoMjAxZGVnKVxcbiAgICAgICAgYnJpZ2h0bmVzcygxMDclKSBjb250cmFzdCg5MiUpO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLyogTWVudSBzdHlsaW5nICovXFxuXFxuLm1lbnUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wYW5lbCk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICAgIG1hcmdpbi1sZWZ0OiAwLjVyZW07XFxufVxcblxcbi5tZW51ID4gdWwud2F0Y2hsaXN0IHtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxuLmljb24ge1xcbiAgICBoZWlnaHQ6IDEuMnJlbTtcXG59XFxuXFxuLndhdGNobGlzdCB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbi53YXRjaGxpc3QgPiBsaSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogOHB4O1xcbn1cXG5cXG4ud2F0Y2hsaXN0SGVhZGVyIHtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgZm9udC1zaXplOiAxLjNyZW07XFxufVxcblxcbi53YXRjaGxpc3QgbGksXFxuLndhdGNobGlzdEhlYWRlcixcXG4uYWRkTG9jYXRpb25CdG4sXFxuLmFkZExvY2F0aW9uRm9ybSB7XFxuICAgIG1hcmdpbjogMTBweCAxcmVtO1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG59XFxuXFxuI3dhdGNobGlzdCB7XFxuICAgIG1heC1oZWlnaHQ6IDgwJTtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi53YXRjaGxpc3QgbGk6aG92ZXIsXFxuLmFkZExvY2F0aW9uQnRuOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUsIDAuMyk7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjIpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi53YXRjaGxpc3QgbGk6YWN0aXZlLFxcbi5hZGRMb2NhdGlvbkJ0bjphY3RpdmUge1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxubGkuc2VsZWN0ZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAyNDUsIDI0NSwgMC4zKTtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuMik7XFxufVxcblxcbi5kZWxldGVJdGVtIHtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxufVxcblxcbi5kZWxldGVJdGVtOmhvdmVyIHtcXG4gICAgZmlsdGVyOiBpbnZlcnQoNyUpIHNlcGlhKDUxJSkgc2F0dXJhdGUoNTk1MSUpIGh1ZS1yb3RhdGUoMzUwZGVnKVxcbiAgICAgICAgYnJpZ2h0bmVzcygxNDAlKSBjb250cmFzdCgxMzYlKTtcXG59XFxuXFxuLyogRm9ybSBzdHlsaW5nICovXFxuXFxuLmFkZExvY2F0aW9uRm9ybSB7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbi5mb3JtUm93IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGdhcDogOHB4O1xcbn1cXG5cXG4jZm9ybUJ1dHRvbnMge1xcbiAgICBtYXJnaW4tdG9wOiA4cHg7XFxufVxcblxcbi5uZXdMb2NhdGlvbklucHV0IHtcXG4gICAgcGFkZGluZzogNnB4O1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4uYWRkQnRuLFxcbi5jYW5jZWxCdG4ge1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgZm9udC1zaXplOiAxLjFyZW07XFxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZS1pc2gpO1xcbiAgICBmb250LXdlaWdodDogNTUwO1xcbn1cXG5cXG4uYWRkQnRuIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50KTtcXG4gICAgYm9yZGVyOiAycHggc29saWQgaHNsKDIyNSwgNzMlLCAzMCUpO1xcbn1cXG5cXG4uY2FuY2VsQnRuIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWVkaXVtdmlvbGV0cmVkO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBoc2woMzIyLCA4MSUsIDMwJSk7XFxufVxcblxcbi5hZGRCdG46aG92ZXIsXFxuLmNhbmNlbEJ0bjpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjIpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5hZGRCdG46YWN0aXZlLFxcbi5jYW5jZWxCdG46YWN0aXZlIHtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbi5uZXdQcm9qRXJyb3JDb250YWluZXIge1xcbiAgICBjb2xvcjogdmFyKC0tZXJyb3IpO1xcbiAgICBmb250LXNpemU6IDEuMXJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiA4cHg7XFxufVxcblxcbi8qIENvbnRlbnQgc3R5bGluZyAqL1xcblxcbi5jb250ZW50IHtcXG4gICAgbWFyZ2luOiAwIDAuNXJlbTtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIG1heC13aWR0aDogMTAwMHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLldlYXRoZXJBUElDb250YWludGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAwLjVyZW07XFxuICAgIG1hcmdpbjogMHJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGFuZWwpO1xcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5mb3JlY2FzdENvbnRhaW5lciB7XFxuICAgIG1heC13aWR0aDogOTUlO1xcbn1cXG5cXG4uZm9yZWNhc3RUYWJsZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5mb3JlY2FzdFJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdhcDogMC41cmVtO1xcbiAgICAvKiBvdmVyZmxvdy15OiBoaWRkZW47ICovXFxuICAgIG1pbi1oZWlnaHQ6IDE3MHB4O1xcbiAgICAvKiBlbmFibGUgaG9yaXpvbnRhbCBzY3JvbGwgKi9cXG4gICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xcbn1cXG5cXG4vKiBoaWRlIHNjcm9sbGJhciwgcmV0YWluIGZ1bmN0aW9uICovXFxuLyogLmZvcmVjYXN0Um93Ojotd2Via2l0LXNjcm9sbGJhciB7ICovXFxuLyogZGlzcGxheTogbm9uZTsgKi9cXG4vKiB9ICovXFxuXFxuLmZvcmVjYXN0Q2VsbCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMC4yNXJlbTtcXG4gICAgbWluLXdpZHRoOiAxNTBweDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAvKiBtaW4td2lkdGg6IG1heC1jb250ZW50OyAqL1xcbn1cXG5cXG4vKiBGb290ZXIgc3R5bGluZyAqL1xcblxcbmZvb3RlciB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpOyAqL1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmZvb3RlciA+IGEge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZ2l0aHViIHtcXG4gICAgaGVpZ2h0OiAyNHB4O1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLmdpdGh1Yjpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpIHNjYWxlKDEuMik7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsaUJBQWlCOztBQUVqQjtJQUNJLGtDQUFrQztJQUNsQyxtQkFBbUI7SUFDbkIsNEJBQTRCO0lBQzVCLHVCQUF1QjtJQUN2QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEI7b0VBQ2dFO0lBQ2hFLG1DQUFtQztJQUNuQyxhQUFhO0lBQ2IsZ0RBQWdEO0lBQ2hELHlEQUF5RDtJQUN6RCxTQUFTO0lBQ1Qsc0JBQXNCO0lBQ3RCLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7O0FBRUEsc0JBQXNCOztBQUV0QjtJQUNJLFdBQVc7SUFDWCxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksb0RBQW9EO0lBQ3BELDRDQUE0QztJQUM1QywwQkFBMEI7SUFDMUIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksc0NBQXNDO0FBQzFDOztBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLGlDQUFpQztJQUNqQywwQkFBMEI7SUFDMUIsa0JBQWtCO0lBQ2xCLG9EQUFvRDtJQUNwRCw0Q0FBNEM7QUFDaEQ7O0FBRUE7SUFDSSxvREFBb0Q7SUFDcEQsNENBQTRDO0FBQ2hEOztBQUVBO0lBQ0ksc0NBQXNDO0FBQzFDOztBQUVBLG9C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YixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLFNBQVM7SUFDVCxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLHNDQUFzQztBQUMxQzs7QUFFQTtJQUNJLHFDQUFxQztBQUN6Q1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBQYWdlIHN0eWxpbmcgKi9cXG5cXG46cm9vdCB7XFxuICAgIC0tcGFuZWw6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42NSk7XFxuICAgIC0tYWNjZW50OiByb3lhbGJsdWU7XFxuICAgIC0tYmFja2dyb3VuZDogcmdiKDAsIDEwLCAzOSk7XFxuICAgIC0td2hpdGUtaXNoOiB3aGl0ZXNtb2tlO1xcbiAgICAtLWVycm9yOiBkYXJrcmVkO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgLyogc3lzdGVtIGZvbnQgc3RhY2sgKi9cXG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLFxcbiAgICAgICAgT3h5Z2VuLVNhbnMsIFVidW50dSwgQ2FudGFyZWxsLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kKTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAyNTBweCBjYWxjKDEwMHZ3IC0gMjUwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDExMHB4IGNhbGMoMTAwdmggLSAxMTBweCAtIDYycHgpIDYycHg7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgbWF4LXdpZHRoOiAxMDB2dztcXG4gICAgbWF4LWhlaWdodDogMTAwdmg7XFxufVxcblxcbi8qIFNjcm9sbGJhciBzdHlsaW5nICovXFxuXFxuOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICAgIHdpZHRoOiAxMnB4O1xcbiAgICBoZWlnaHQ6IDEycHg7XFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCA2cHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjazpob3ZlciB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyMCwgMjAsIDIwLCAwLjIpO1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXG4gICAgLyogYmFja2dyb3VuZDogdmFyKC0tbWVudS1jb2xvcik7ICAqL1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjAsIDIwLCAyMCwgMC4yNSk7XFxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNCk7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAzcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuNik7XFxufVxcblxcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6YWN0aXZlIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDIwLCAyMCwgMjAsIDAuMik7XFxufVxcblxcbi8qIEdlbmVyYWwgc3R5bGluZyAqL1xcblxcbmgxIHtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbmgyIHtcXG4gICAgZm9udC1zaXplOiAxLjE1ZW07XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgIG1hcmdpbi10b3A6IDAuODNlbTtcXG4gICAgbWFyZ2luLWJvdHRvbTogMC44M2VtO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI2hpZGRlbiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNzaG93QmxvY2sge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyogSGVhZGVyIHN0eWxpbmcgKi9cXG5cXG4ubG9nbyB7XFxuICAgIG1heC1oZWlnaHQ6IDkwJTtcXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XFxuICAgIC8qIHdoaXRlc21va2UgY29sb3IgKi9cXG4gICAgZmlsdGVyOiBpbnZlcnQoMTAwJSkgc2VwaWEoMCUpIHNhdHVyYXRlKDc0ODAlKSBodWUtcm90YXRlKDIwMWRlZylcXG4gICAgICAgIGJyaWdodG5lc3MoMTA3JSkgY29udHJhc3QoOTIlKTtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgY29sb3I6IHZhcigtLXdoaXRlLWlzaCk7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi8qIE1lbnUgc3R5bGluZyAqL1xcblxcbi5tZW51IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGFuZWwpO1xcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbn1cXG5cXG4ubWVudSA+IHVsLndhdGNobGlzdCB7XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbi5pY29uIHtcXG4gICAgaGVpZ2h0OiAxLjJyZW07XFxufVxcblxcbi53YXRjaGxpc3Qge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4ud2F0Y2hsaXN0ID4gbGkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDhweDtcXG59XFxuXFxuLndhdGNobGlzdEhlYWRlciB7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIGZvbnQtc2l6ZTogMS4zcmVtO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpLFxcbi53YXRjaGxpc3RIZWFkZXIsXFxuLmFkZExvY2F0aW9uQnRuLFxcbi5hZGRMb2NhdGlvbkZvcm0ge1xcbiAgICBtYXJnaW46IDEwcHggMXJlbTtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbiN3YXRjaGxpc3Qge1xcbiAgICBtYXgtaGVpZ2h0OiA4MCU7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpOmhvdmVyLFxcbi5hZGRMb2NhdGlvbkJ0bjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDI0NSwgMjQ1LCAwLjMpO1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpOmFjdGl2ZSxcXG4uYWRkTG9jYXRpb25CdG46YWN0aXZlIHtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbmxpLnNlbGVjdGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUsIDAuMyk7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjIpO1xcbn1cXG5cXG4uZGVsZXRlSXRlbSB7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cXG5cXG4uZGVsZXRlSXRlbTpob3ZlciB7XFxuICAgIGZpbHRlcjogaW52ZXJ0KDclKSBzZXBpYSg1MSUpIHNhdHVyYXRlKDU5NTElKSBodWUtcm90YXRlKDM1MGRlZylcXG4gICAgICAgIGJyaWdodG5lc3MoMTQwJSkgY29udHJhc3QoMTM2JSk7XFxufVxcblxcbi8qIEZvcm0gc3R5bGluZyAqL1xcblxcbi5hZGRMb2NhdGlvbkZvcm0ge1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4uZm9ybVJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBnYXA6IDhweDtcXG59XFxuXFxuI2Zvcm1CdXR0b25zIHtcXG4gICAgbWFyZ2luLXRvcDogOHB4O1xcbn1cXG5cXG4ubmV3TG9jYXRpb25JbnB1dCB7XFxuICAgIHBhZGRpbmc6IDZweDtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLmFkZEJ0bixcXG4uY2FuY2VsQnRuIHtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgZm9udC13ZWlnaHQ6IDU1MDtcXG59XFxuXFxuLmFkZEJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudCk7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGhzbCgyMjUsIDczJSwgMzAlKTtcXG59XFxuXFxuLmNhbmNlbEJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IG1lZGl1bXZpb2xldHJlZDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgaHNsKDMyMiwgODElLCAzMCUpO1xcbn1cXG5cXG4uYWRkQnRuOmhvdmVyLFxcbi5jYW5jZWxCdG46aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYWRkQnRuOmFjdGl2ZSxcXG4uY2FuY2VsQnRuOmFjdGl2ZSB7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4ubmV3UHJvakVycm9yQ29udGFpbmVyIHtcXG4gICAgY29sb3I6IHZhcigtLWVycm9yKTtcXG4gICAgZm9udC1zaXplOiAxLjFyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogOHB4O1xcbn1cXG5cXG4vKiBDb250ZW50IHN0eWxpbmcgKi9cXG5cXG4uY29udGVudCB7XFxuICAgIG1hcmdpbjogMCAwLjVyZW07XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICBtYXgtd2lkdGg6IDEwMDBweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi5XZWF0aGVyQVBJQ29udGFpbnRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMC41cmVtO1xcbiAgICBtYXJnaW46IDByZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBhbmVsKTtcXG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uZm9yZWNhc3RDb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDk1JTtcXG59XFxuXFxuLmZvcmVjYXN0VGFibGUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZm9yZWNhc3RSb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDAuNXJlbTtcXG4gICAgLyogb3ZlcmZsb3cteTogaGlkZGVuOyAqL1xcbiAgICBtaW4taGVpZ2h0OiAxNzBweDtcXG4gICAgLyogZW5hYmxlIGhvcml6b250YWwgc2Nyb2xsICovXFxuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcXG59XFxuXFxuLyogaGlkZSBzY3JvbGxiYXIsIHJldGFpbiBmdW5jdGlvbiAqL1xcbi8qIC5mb3JlY2FzdFJvdzo6LXdlYmtpdC1zY3JvbGxiYXIgeyAqL1xcbi8qIGRpc3BsYXk6IG5vbmU7ICovXFxuLyogfSAqL1xcblxcbi5mb3JlY2FzdENlbGwge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDAuMjVyZW07XFxuICAgIG1pbi13aWR0aDogMTUwcHg7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgLyogbWluLXdpZHRoOiBtYXgtY29udGVudDsgKi9cXG59XFxuXFxuLyogRm9vdGVyIHN0eWxpbmcgKi9cXG5cXG5mb290ZXIge1xcbiAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTsgKi9cXG4gICAgY29sb3I6IHZhcigtLXdoaXRlLWlzaCk7XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5mb290ZXIgPiBhIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmdpdGh1YiB7XFxuICAgIGhlaWdodDogMjRweDtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5naXRodWI6aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKSBzY2FsZSgxLjIpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Jlc2V0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcmVzZXQuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vcmVzZXQuY3NzJ1xuaW1wb3J0ICcuL3N0eWxlLmNzcydcbmltcG9ydCBpbml0aWFsaXplIGZyb20gJy4vcGFnZUxvYWRlcidcbmltcG9ydCBpbml0aWF0ZVN0b3JhZ2UgZnJvbSAnLi9sb2NhbFN0b3JhZ2UnXG5pbXBvcnQgeyBzaG93Rm9ybSwgaGlkZUZvcm0gfSBmcm9tICcuL2hlbHBlckZ1bmN0aW9ucydcblxuaW5pdGlhbGl6ZSgpXG5pbml0aWF0ZVN0b3JhZ2UoKVxuXG4vLyBHcmFiIERPTSBlbGVtZW50c1xuY29uc3QgYWRkTG9jYXRpb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25CdG4nKVxuY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbmNlbEJ0bicpXG5cbi8vIEV2ZW50IGxpc3RlbmVyc1xuYWRkTG9jYXRpb25CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93Rm9ybSlcblxuY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBoaWRlRm9ybSgpXG59KVxuIl0sIm5hbWVzIjpbImFkZGl0aW9uSWNvbiIsImRlbGV0ZUljb24iLCJtZW51SWNvbiIsImRvY3VtZW50IiwiY29va2llIiwiY3JlYXRlTWVudUljb24iLCJsaSIsImNoZWNrbGlzdEljb24iLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVMaXN0aW5nIiwibG9jYXRpb25OYW1lIiwiaSIsIndhdGNobGlzdCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2NhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsInNlbGVjdGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsInNlbGVjdExvY2F0aW9uIiwibG9jYXRpb25UZXh0IiwidGV4dENvbnRlbnQiLCJuYW1lIiwiY3JlYXRlRGVsZXRlSWNvbiIsImRpc3BsYXlXYXRjaGxpc3QiLCJvbGRMaXN0aW5nQ291bnQiLCJjaGlsZEVsZW1lbnRDb3VudCIsImZpcnN0Q2hpbGQiLCJyZW1vdmUiLCJzdG9yYWdlV2F0Y2hsaXN0IiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImZvckVhY2giLCJzdWJtaXRMb2NhdGlvbiIsImlucHV0IiwibmV3TG9jYXRpb24iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImRpc3BsYXlXZWF0aGVyIiwibmV3V2VhdGhlckNhcmQiLCJjb250ZW50VGl0bGUiLCJjaXR5IiwiY291bnRyeSIsIkFQSUltYWdlIiwid2VhdGhlckljb24iLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJpbm5lclRleHQiLCJ0ZW1wQ29udGFpbmVyIiwiTWF0aCIsInJvdW5kIiwidGVtcEN1cnJlbnQiLCJsb3dUZW1wQ29udGFpbmVyIiwidGVtcExvdyIsImhpZ2hUZW1wQ29udGFpbmVyIiwidGVtcEhpZ2giLCJ0aW1lQ29udGFpbmVyIiwibG9jYWxEYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwic3VucmlzZUNvbnRhaW5lciIsInN1bnJpc2UiLCJzdW5zZXRDb250YWluZXIiLCJzdW5zZXQiLCJ3aW5kQ29udGFpbmVyIiwid2luZFNwZWVkIiwid2luZERpcmVjdGlvbiIsIndpbmREZWdyZWUiLCJodW1pZGl0eUNvbnRhaW5lciIsImh1bWlkaXR5IiwiZGlzcGxheUZvcmVjYXN0IiwibmV3SG91cmx5Rm9yZWNhc3RBcnJheSIsImZvcmVjYXN0Um93Iiwib2xkRm9yZWNhc3QiLCJsZW5ndGgiLCJmb3JlY2FzdENlbGwiLCJmb3JlY2FzdERhdGUiLCJkYXRlIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZm9yZWNhc3RUaW1lIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwid2VhdGhlckZvcmVjYXN0SWNvbiIsImZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uIiwiZm9yZWNhc3RUZW1wIiwidGVtcGVyYXR1cmUiLCJBUElDaXR5U2VhcmNoIiwiZ2V0QXR0cmlidXRlIiwic2VsZWN0ZWRMb2NhdGlvbklkIiwiY3JlYXRlQWRkQnV0dG9uIiwiY29udGFpbmVyIiwiYWRkQnRuIiwidmFsaWRhdGVTZWFyY2giLCJjcmVhdGVDYW5jZWxCdXR0b24iLCJjYW5jZWxCdG4iLCJjcmVhdGVGb3JtIiwiZm9ybSIsImZvcm1Sb3cxIiwibmV3TG9jYXRpb25JbnB1dCIsInBsYWNlaG9sZGVyIiwiZm9ybVJvdzIiLCJmb3JtUm93MyIsInNob3dGb3JtIiwiYWRkTG9jYXRpb25CdG4iLCJhZGRMb2NhdGlvbkZvcm0iLCJoaWRlRm9ybSIsImRlbGV0ZVdhdGNobGlzdEVudHJ5IiwiZG9vbWVkSW5kZXgiLCJzcGxpY2UiLCJuZXdEZWxldGVJY29uIiwidHJhc2hJY29uIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZUFkZGl0aW9uSWNvbiIsIm5ld0FkZGl0aW9uSWNvbiIsInRvRGlyZWN0aW9uIiwiZGVncmVlIiwiY2FsY0N1cnJlbnRUaW1lIiwidGltZXpvbmUiLCJkIiwiRGF0ZSIsImxvY2FsVGltZSIsImdldFRpbWUiLCJsb2NhbE9mZnNldCIsImdldFRpbWV6b25lT2Zmc2V0IiwidXRjIiwibmV3Q2l0eSIsImNhbGNTdW5UaW1lIiwidGltZSIsImZldGNoSG91cmx5Rm9yZWNhc3QiLCJjaXR5UXVlcnkiLCJuZXdQcm9qRXJyb3JDb250YWluZXIiLCJmZXRjaCIsIm1vZGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwibmV3SG91cmx5Rm9yZWNhc3QiLCJsaXN0IiwiZHRfdHh0IiwiZGF0ZVRleHQiLCJtYWluIiwicmFpbkNoYW5jZSIsInBvcCIsInRlbXAiLCJ3ZWF0aGVyQ29uZGl0aW9uIiwid2VhdGhlciIsImRlc2NyaXB0aW9uIiwiaWNvbiIsIndpbmQiLCJkZWciLCJ3aW5kR3VzdCIsImd1c3QiLCJzcGVlZCIsImNhdGNoIiwiZXJyIiwiZmV0Y2hDdXJyZW50V2VhdGhlciIsInN5cyIsInRlbXBfbWF4IiwidGVtcF9taW4iLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwiaW5pdGlhdGVTdG9yYWdlIiwic3RvcmFnZVdhdGNobGlzdEFycmF5IiwiZ2l0aHViSWNvbiIsImxvZ29JY29uIiwiY3JlYXRlSGVhZGVyIiwiaGVhZGVyIiwibG9nbyIsInRpdGxlIiwiY3JlYXRlTWVudSIsIm1lbnUiLCJ3YXRjaGxpc3RIZWFkZXIiLCJhZGRMb2NhdGlvbkNvbnRhaW5lciIsImFkZExvY2F0aW9uIiwiYWRkTG9jYXRpb25UZXh0IiwibWV0aG9kIiwiY3JlYXRlV2VhdGhlckNhcmQiLCJXZWF0aGVyQVBJQ29udGFpbnRlciIsIkFQSVRpdGxlIiwiZGVzY3JpcHRpb25Db250YWluZXIiLCJmb3JlY2FzdENvbnRhaW5lciIsImZvcmVjYXN0VGl0bGUiLCJmb3JlY2FzdFRhYmxlIiwic2Nyb2xsTGVmdCIsImRlbHRhWSIsImNyZWF0ZUNvbnRlbnQiLCJjb250ZW50IiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiY29weXJpZ2h0IiwiZ2V0RnVsbFllYXIiLCJnaXRodWJMaW5rIiwiaHJlZiIsIm5ld0dpdGh1Ykljb24iLCJpbml0aWFsaXplIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=