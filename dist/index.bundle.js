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
___CSS_LOADER_EXPORT___.push([module.id, "/* Page styling */\n\n:root {\n    --panel: rgba(255, 255, 255, 0.65);\n    --accent: royalblue;\n    --background: rgb(0, 10, 39);\n    --white-ish: whitesmoke;\n    --error: darkred;\n}\n\nbody {\n    /* system font stack */\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;\n    background-color: var(--background);\n    display: grid;\n    grid-template-columns: 250px calc(100vw - 250px);\n    grid-template-rows: 110px calc(100vh - 110px - 62px) 62px;\n    margin: 0;\n    box-sizing: border-box;\n    max-width: 100vw;\n    max-height: 100vh;\n}\n\n/* General styling */\n\nh1 {\n    font-size: 2em;\n    font-weight: bolder;\n}\n\n.hidden {\n    display: none;\n}\n\n#hidden {\n    display: none;\n}\n\n#showBlock {\n    display: block;\n}\n\n/* Header styling */\n\n.logo {\n    max-height: 90%;\n    margin-right: 8px;\n    /* whitesmoke color */\n    filter: invert(100%) sepia(0%) saturate(7480%) hue-rotate(201deg)\n        brightness(107%) contrast(92%);\n}\n\nheader {\n    grid-column: 1 / -1;\n    color: var(--white-ish);\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    box-sizing: border-box;\n}\n\n/* Menu styling */\n\n.menu {\n    background-color: var(--panel);\n    border-radius: 1rem;\n    margin-left: 0.5rem;\n}\n\n.menu > ul.watchlist {\n    margin-top: 20px;\n}\n\n.icon {\n    height: 1.2rem;\n}\n\n.watchlist {\n    list-style: none;\n    padding: 0;\n}\n\n.watchlist > li {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.watchlistHeader {\n    font-weight: 700;\n    font-size: 1.3rem;\n}\n\n.watchlist li,\n.watchlistHeader,\n.addLocationBtn,\n.addLocationForm {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n#watchlist {\n    max-height: 80%;\n    overflow: auto;\n}\n\n.watchlist li:hover,\n.addLocationBtn:hover {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.watchlist li:active,\n.addLocationBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\nli.selected {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n}\n\n.deleteItem {\n    margin-left: auto;\n}\n\n.deleteItem:hover {\n    filter: invert(7%) sepia(51%) saturate(5951%) hue-rotate(350deg)\n        brightness(140%) contrast(136%);\n}\n\n/* Form styling */\n\n.addLocationForm {\n    padding: 0;\n}\n\n.formRow {\n    display: flex;\n    justify-content: space-around;\n    gap: 8px;\n}\n\n#formButtons {\n    margin-top: 8px;\n}\n\n.newLocationInput {\n    padding: 6px;\n    font-size: 1.2rem;\n    width: 100%;\n    border: none;\n    border-radius: 8px;\n    box-sizing: border-box;\n}\n\n.addBtn,\n.cancelBtn {\n    padding: 8px;\n    width: 50%;\n    border-radius: 8px;\n    font-size: 1.1rem;\n    color: var(--white-ish);\n    font-weight: 550;\n}\n\n.addBtn {\n    background-color: var(--accent);\n    border: 2px solid hsl(225, 73%, 30%);\n}\n\n.cancelBtn {\n    background-color: mediumvioletred;\n    border: 2px solid hsl(322, 81%, 30%);\n}\n\n.addBtn:hover,\n.cancelBtn:hover {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.addBtn:active,\n.cancelBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\n.newProjErrorContainer {\n    color: var(--error);\n    font-size: 1.1rem;\n    text-align: center;\n    padding: 8px;\n}\n\n/* Content styling */\n\n.content {\n    margin: 0 0.5rem;\n    font-size: 1.2rem;\n    max-width: 1000px;\n    box-sizing: border-box;\n    overflow: auto;\n}\n\n.WeatherAPIContainter {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0rem;\n    background-color: var(--panel);\n    border-radius: 1rem;\n    height: 100%;\n}\n\n.contentTitle {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n.forecastContainer {\n    max-width: 95%;\n}\n\n.forecastTable {\n    display: flex;\n}\n\n.forecastRow {\n    display: flex;\n    gap: 0.5rem;\n    /* enable horizontal scroll */\n    overflow-x: scroll;\n}\n\n/* hide scrollbar, retain function */\n.forecastRow::-webkit-scrollbar {\n    display: none;\n}\n\n.forecastCell {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.25rem;\n    min-width: max-content;\n}\n\n/* Footer styling */\n\nfooter {\n    grid-column: 1 / -1;\n    /* background-color: var(--background-color); */\n    color: var(--white-ish);\n    font-size: 1.2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    box-sizing: border-box;\n}\n\nfooter > a {\n    display: flex;\n}\n\n.github {\n    height: 24px;\n    transition: transform 0.3s ease-in-out;\n}\n\n.github:hover {\n    transform: rotate(-360deg) scale(1.2);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["/* Page styling */\n\n:root {\n    --panel: rgba(255, 255, 255, 0.65);\n    --accent: royalblue;\n    --background: rgb(0, 10, 39);\n    --white-ish: whitesmoke;\n    --error: darkred;\n}\n\nbody {\n    /* system font stack */\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;\n    background-color: var(--background);\n    display: grid;\n    grid-template-columns: 250px calc(100vw - 250px);\n    grid-template-rows: 110px calc(100vh - 110px - 62px) 62px;\n    margin: 0;\n    box-sizing: border-box;\n    max-width: 100vw;\n    max-height: 100vh;\n}\n\n/* General styling */\n\nh1 {\n    font-size: 2em;\n    font-weight: bolder;\n}\n\n.hidden {\n    display: none;\n}\n\n#hidden {\n    display: none;\n}\n\n#showBlock {\n    display: block;\n}\n\n/* Header styling */\n\n.logo {\n    max-height: 90%;\n    margin-right: 8px;\n    /* whitesmoke color */\n    filter: invert(100%) sepia(0%) saturate(7480%) hue-rotate(201deg)\n        brightness(107%) contrast(92%);\n}\n\nheader {\n    grid-column: 1 / -1;\n    color: var(--white-ish);\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    box-sizing: border-box;\n}\n\n/* Menu styling */\n\n.menu {\n    background-color: var(--panel);\n    border-radius: 1rem;\n    margin-left: 0.5rem;\n}\n\n.menu > ul.watchlist {\n    margin-top: 20px;\n}\n\n.icon {\n    height: 1.2rem;\n}\n\n.watchlist {\n    list-style: none;\n    padding: 0;\n}\n\n.watchlist > li {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n\n.watchlistHeader {\n    font-weight: 700;\n    font-size: 1.3rem;\n}\n\n.watchlist li,\n.watchlistHeader,\n.addLocationBtn,\n.addLocationForm {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n#watchlist {\n    max-height: 80%;\n    overflow: auto;\n}\n\n.watchlist li:hover,\n.addLocationBtn:hover {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.watchlist li:active,\n.addLocationBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\nli.selected {\n    background-color: rgb(245, 245, 245, 0.3);\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n}\n\n.deleteItem {\n    margin-left: auto;\n}\n\n.deleteItem:hover {\n    filter: invert(7%) sepia(51%) saturate(5951%) hue-rotate(350deg)\n        brightness(140%) contrast(136%);\n}\n\n/* Form styling */\n\n.addLocationForm {\n    padding: 0;\n}\n\n.formRow {\n    display: flex;\n    justify-content: space-around;\n    gap: 8px;\n}\n\n#formButtons {\n    margin-top: 8px;\n}\n\n.newLocationInput {\n    padding: 6px;\n    font-size: 1.2rem;\n    width: 100%;\n    border: none;\n    border-radius: 8px;\n    box-sizing: border-box;\n}\n\n.addBtn,\n.cancelBtn {\n    padding: 8px;\n    width: 50%;\n    border-radius: 8px;\n    font-size: 1.1rem;\n    color: var(--white-ish);\n    font-weight: 550;\n}\n\n.addBtn {\n    background-color: var(--accent);\n    border: 2px solid hsl(225, 73%, 30%);\n}\n\n.cancelBtn {\n    background-color: mediumvioletred;\n    border: 2px solid hsl(322, 81%, 30%);\n}\n\n.addBtn:hover,\n.cancelBtn:hover {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.2);\n    cursor: pointer;\n}\n\n.addBtn:active,\n.cancelBtn:active {\n    box-shadow: 2px 2px 6px rgb(0, 0, 0, 0.4);\n}\n\n.newProjErrorContainer {\n    color: var(--error);\n    font-size: 1.1rem;\n    text-align: center;\n    padding: 8px;\n}\n\n/* Content styling */\n\n.content {\n    margin: 0 0.5rem;\n    font-size: 1.2rem;\n    max-width: 1000px;\n    box-sizing: border-box;\n    overflow: auto;\n}\n\n.WeatherAPIContainter {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0rem;\n    background-color: var(--panel);\n    border-radius: 1rem;\n    height: 100%;\n}\n\n.contentTitle {\n    margin: 10px 1rem;\n    padding: 8px;\n    border-radius: 8px;\n}\n\n.forecastContainer {\n    max-width: 95%;\n}\n\n.forecastTable {\n    display: flex;\n}\n\n.forecastRow {\n    display: flex;\n    gap: 0.5rem;\n    /* enable horizontal scroll */\n    overflow-x: scroll;\n}\n\n/* hide scrollbar, retain function */\n.forecastRow::-webkit-scrollbar {\n    display: none;\n}\n\n.forecastCell {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.25rem;\n    min-width: max-content;\n}\n\n/* Footer styling */\n\nfooter {\n    grid-column: 1 / -1;\n    /* background-color: var(--background-color); */\n    color: var(--white-ish);\n    font-size: 1.2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    box-sizing: border-box;\n}\n\nfooter > a {\n    display: flex;\n}\n\n.github {\n    height: 24px;\n    transition: transform 0.3s ease-in-out;\n}\n\n.github:hover {\n    transform: rotate(-360deg) scale(1.2);\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBTyx1REFBVTtBQUNWbkMseURBQWUsSUFFZjs7QUFDQSxNQUFNM0QsY0FBYyxHQUFHNUcsUUFBUSxDQUFDYSxhQUFULENBQXVCLGlCQUF2QixDQUF2QjtBQUNBLE1BQU1zRixTQUFTLEdBQUduRyxRQUFRLENBQUNhLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBbEIsRUFFQTs7QUFDQStGLGNBQWMsQ0FBQzFGLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDeUYsc0RBQXpDO0FBRUFSLFNBQVMsQ0FBQ2pGLGdCQUFWLENBQTJCLE9BQTNCLEVBQXFDQyxDQUFELElBQU87RUFDdkNBLENBQUMsQ0FBQ2tKLGNBQUY7RUFDQXZELDBEQUFRO0FBQ1gsQ0FIRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaGVscGVyRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9wYWdlTG9hZGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3Jlc2V0LmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvcmVzZXQuY3NzP2VkZTAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhZGRpdGlvbkljb24gZnJvbSAnLi9hc3NldHMvcGx1cy5zdmcnXG5pbXBvcnQgZGVsZXRlSWNvbiBmcm9tICcuL2Fzc2V0cy9kZWxldGUuc3ZnJ1xuaW1wb3J0IG1lbnVJY29uIGZyb20gJy4vYXNzZXRzL21lbnVJY29uLnN2ZydcblxuZG9jdW1lbnQuY29va2llID0gJ1NhbWVTaXRlPUxheCdcblxuY29uc3QgY3JlYXRlTWVudUljb24gPSAobGkpID0+IHtcbiAgICBjb25zdCBjaGVja2xpc3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBjaGVja2xpc3RJY29uLnNyYyA9IG1lbnVJY29uXG4gICAgY2hlY2tsaXN0SWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24nKVxuICAgIGxpLmFwcGVuZENoaWxkKGNoZWNrbGlzdEljb24pXG59XG5cbi8vIEFkZCBzaW5nbGUgbG9jYXRpb24gdG8gd2F0Y2hsaXN0IChjYWxsZWQgYmVsb3cpXG5jb25zdCBjcmVhdGVMaXN0aW5nID0gKGxvY2F0aW9uTmFtZSwgaSkgPT4ge1xuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3YXRjaGxpc3QnKVxuXG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZChgbG9jYXRpb25gKVxuICAgIGxvY2F0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpfWApXG4gICAgLy8gYXNzaWduIGNsYXNzIHRvIHNlbGVjdGVkIGxvY2F0aW9uIGxpc3RpbmdcbiAgICBpZiAobG9jYXRpb25OYW1lLnNlbGVjdGVkID09PSAndHJ1ZScpIHtcbiAgICAgICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICAvLyBzZWxlY3RMb2NhdGlvbihsb2NhdGlvbilcbiAgICB9XG5cbiAgICAvLyBldmVudCBsaXN0ZW5lciB0byBkaXNwbGF5IHNlbGVjdGVkIGxvY2F0aW9uJ3Mgd2VhdGhlclxuICAgIGxvY2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgLy8gaWYgZGVsZXRpbmcgbGlzdGluZywgZG8gbm90IGRpc3BsYXkgd2VhdGhlclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGVJdGVtJykpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHNlbGVjdExvY2F0aW9uKGxvY2F0aW9uKVxuICAgIH0pXG5cbiAgICBjcmVhdGVNZW51SWNvbihsb2NhdGlvbilcbiAgICBjb25zdCBsb2NhdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBsb2NhdGlvblRleHQudGV4dENvbnRlbnQgPSBsb2NhdGlvbk5hbWUubmFtZVxuICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKGxvY2F0aW9uVGV4dClcbiAgICBjcmVhdGVEZWxldGVJY29uKGxvY2F0aW9uLCBpKVxuICAgIHdhdGNobGlzdC5hcHBlbmRDaGlsZChsb2NhdGlvbilcbn1cblxuLy8gRGlzcGxheSBlbnRpcmUgYXJyYXkgb2YgbG9jYXRpb25zIHRvIHdhdGNobGlzdFxuY29uc3QgZGlzcGxheVdhdGNobGlzdCA9ICgpID0+IHtcbiAgICAvLyBHcmFiIHdhdGNobGlzdFxuICAgIGNvbnN0IHdhdGNobGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3YXRjaGxpc3QnKVxuXG4gICAgLy8gQ2xlYXIgbG9jYXRpb24gbGlzdGluZ3NcbiAgICBjb25zdCBvbGRMaXN0aW5nQ291bnQgPSB3YXRjaGxpc3QuY2hpbGRFbGVtZW50Q291bnRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZExpc3RpbmdDb3VudDsgaSsrKSB7XG4gICAgICAgIHdhdGNobGlzdC5maXJzdENoaWxkLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgLy8gQXBwZW5kIGFsbCBsb2NhdGlvbnMgdG8gd2F0Y2hsaXN0XG4gICAgbGV0IGkgPSAwXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG4gICAgLy8gY29uc29sZS5sb2coc3RvcmFnZVdhdGNobGlzdClcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGNyZWF0ZUxpc3RpbmcobG9jYXRpb24sIGkpXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgICBpKytcbiAgICB9KVxufVxuXG5jb25zdCBzdWJtaXRMb2NhdGlvbiA9IChpbnB1dCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBsb2NhdGlvbiBvYmplY3RcbiAgICBjb25zdCBuZXdMb2NhdGlvbiA9IHtcbiAgICAgICAgbmFtZTogaW5wdXQsXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgIH1cblxuICAgIC8vIGdyYWIgYXJyYXkgZnJvbSBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmFnZVdhdGNobGlzdCA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JylcbiAgICApXG5cbiAgICAvLyBkZXNlbGVjdCBwcmV2aW91c2x5IHNlbGVjdGVkIGxvY2F0aW9uXG4gICAgc3RvcmFnZVdhdGNobGlzdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICBpZiAobG9jYXRpb24uc2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBwdXNoIGxvY2F0aW9uIHRvIGFycmF5XG4gICAgc3RvcmFnZVdhdGNobGlzdC5wdXNoKG5ld0xvY2F0aW9uKVxuICAgIC8vIGNvbnNvbGUubG9nKHN0b3JhZ2VXYXRjaGxpc3QpXG5cbiAgICAvLyBzZXQgYXJyYXkgYmFjayBpbnRvIHN0b3JhZ2VcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZVdhdGNobGlzdCcsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VXYXRjaGxpc3QpKVxuXG4gICAgLy8gcmVmcmVzaCB3YXRjaGxpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgZGlzcGxheVdlYXRoZXIgPSAobmV3V2VhdGhlckNhcmQpID0+IHtcbiAgICAvLyBkaXNwbGF5IGNvbnRlbnQgdGl0bGVcbiAgICBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJylcbiAgICBjb250ZW50VGl0bGUudGV4dENvbnRlbnQgPSBgJHtuZXdXZWF0aGVyQ2FyZC5jaXR5fSwgJHtuZXdXZWF0aGVyQ2FyZC5jb3VudHJ5fWBcblxuICAgIC8vIGRpc3BsYXkgd2VhdGhlciBpY29uXG4gICAgY29uc3QgQVBJSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuQVBJSW1hZ2UnKVxuICAgIEFQSUltYWdlLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25ld1dlYXRoZXJDYXJkLndlYXRoZXJJY29ufUAyeC5wbmdgXG5cbiAgICAvLyBkaXNwbGF5IGRlc2NyaXB0aW9uXG4gICAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXJEZXNjcmlwdGlvbicpXG4gICAgd2VhdGhlckRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IG5ld1dlYXRoZXJDYXJkLndlYXRoZXJEZXNjcmlwdGlvblxuXG4gICAgLy8gZGlzcGxheSBjdXJyZW50IHRlbXBlcmF0dXJlXG4gICAgY29uc3QgdGVtcENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wQ29udGFpbmVyJylcbiAgICB0ZW1wQ29udGFpbmVyLmlubmVyVGV4dCA9IGAke01hdGgucm91bmQobmV3V2VhdGhlckNhcmQudGVtcEN1cnJlbnQpfVxcdTAwQjBgXG5cbiAgICAvLyBkaXNwbGF5IGhpZ2gvbG93IHRlbXBlcmF0dXJlc1xuICAgIGNvbnN0IGxvd1RlbXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG93VGVtcENvbnRhaW5lcicpXG4gICAgbG93VGVtcENvbnRhaW5lci5pbm5lclRleHQgPSBgTG93OiAke01hdGgucm91bmQoXG4gICAgICAgIG5ld1dlYXRoZXJDYXJkLnRlbXBMb3dcbiAgICApfVxcdTAwQjBgXG4gICAgY29uc3QgaGlnaFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlnaFRlbXBDb250YWluZXInKVxuICAgIGhpZ2hUZW1wQ29udGFpbmVyLmlubmVyVGV4dCA9IGBIaWdoOiAke01hdGgucm91bmQoXG4gICAgICAgIG5ld1dlYXRoZXJDYXJkLnRlbXBIaWdoXG4gICAgKX1cXHUwMEIwYFxuXG4gICAgLy8gZGlwbGF5IGN1cnJlbnQgdGltZVxuICAgIGNvbnN0IHRpbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZUNvbnRhaW5lcicpXG4gICAgdGltZUNvbnRhaW5lci5pbm5lclRleHQgPSBgTG9jYWwgdGltZTogJHtuZXdXZWF0aGVyQ2FyZC5sb2NhbERhdGUuZ2V0SG91cnMoKX06JHtuZXdXZWF0aGVyQ2FyZC5sb2NhbERhdGUuZ2V0TWludXRlcygpfWBcblxuICAgIC8vIGRpc3BsYXkgc3VucmlzZS9zdW5zZXQgdGltZXNcbiAgICBjb25zdCBzdW5yaXNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1bnJpc2VDb250YWluZXInKVxuICAgIHN1bnJpc2VDb250YWluZXIuaW5uZXJUZXh0ID0gYFN1bnJpc2U6ICR7bmV3V2VhdGhlckNhcmQuc3VucmlzZS5nZXRIb3VycygpfToke25ld1dlYXRoZXJDYXJkLnN1bnJpc2UuZ2V0TWludXRlcygpfWBcbiAgICBjb25zdCBzdW5zZXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3Vuc2V0Q29udGFpbmVyJylcbiAgICBzdW5zZXRDb250YWluZXIuaW5uZXJUZXh0ID0gYFN1bnNldDogJHtuZXdXZWF0aGVyQ2FyZC5zdW5zZXQuZ2V0SG91cnMoKX06JHtuZXdXZWF0aGVyQ2FyZC5zdW5zZXQuZ2V0TWludXRlcygpfWBcblxuICAgIC8vIGRpc3BsYXkgd2luZFxuICAgIGNvbnN0IHdpbmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2luZENvbnRhaW5lcicpXG4gICAgd2luZENvbnRhaW5lci5pbm5lclRleHQgPSBgV2luZDogJHtNYXRoLnJvdW5kKFxuICAgICAgICBuZXdXZWF0aGVyQ2FyZC53aW5kU3BlZWRcbiAgICApfW1waCwgJHtuZXdXZWF0aGVyQ2FyZC53aW5kRGlyZWN0aW9ufSAoJHtuZXdXZWF0aGVyQ2FyZC53aW5kRGVncmVlfVxcdTAwQjApYFxuXG4gICAgLy8gZGlzcGxheSBodW1pZGl0eVxuICAgIGNvbnN0IGh1bWlkaXR5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWlkaXR5Q29udGFpbmVyJylcbiAgICBodW1pZGl0eUNvbnRhaW5lci5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICR7bmV3V2VhdGhlckNhcmQuaHVtaWRpdHl9JWBcbn1cblxuY29uc3QgZGlzcGxheUZvcmVjYXN0ID0gKG5ld0hvdXJseUZvcmVjYXN0QXJyYXkpID0+IHtcbiAgICBjb25zdCBmb3JlY2FzdFJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JlY2FzdFJvdycpXG5cbiAgICAvLyByZW1vdmUgYW55IGZvcmVjYXN0IGNlbGxzXG4gICAgY29uc3Qgb2xkRm9yZWNhc3QgPSBmb3JlY2FzdFJvdy5jaGlsZEVsZW1lbnRDb3VudFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkRm9yZWNhc3Q7IGkrKykge1xuICAgICAgICBmb3JlY2FzdFJvdy5maXJzdENoaWxkLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgLy8gQWRkIG5ldyBmb3JlY2FzdCBjZWxsc1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3SG91cmx5Rm9yZWNhc3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBmb3JlY2FzdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdENlbGwnKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgZGF0ZVxuICAgICAgICBjb25zdCBmb3JlY2FzdERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgZm9yZWNhc3REYXRlLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0RGF0ZScpXG4gICAgICAgIGZvcmVjYXN0RGF0ZS5pbm5lclRleHQgPSBgJHtcbiAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXlbaV0uZGF0ZS5nZXRNb250aCgpICsgMVxuICAgICAgICB9LyR7bmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS5kYXRlLmdldERhdGUoKX1gXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5hcHBlbmRDaGlsZChmb3JlY2FzdERhdGUpXG5cbiAgICAgICAgLy8gZGlzcGxheSB0aW1lXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdFRpbWUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RUaW1lJylcbiAgICAgICAgZm9yZWNhc3RUaW1lLmlubmVyVGV4dCA9XG4gICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLmRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKClcbiAgICAgICAgZm9yZWNhc3RDZWxsLmFwcGVuZENoaWxkKGZvcmVjYXN0VGltZSlcblxuICAgICAgICAvLyBkaXNwbGF5IHdlYXRoZXIgaWNvblxuICAgICAgICBjb25zdCB3ZWF0aGVyRm9yZWNhc3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICAgICAgd2VhdGhlckZvcmVjYXN0SWNvbi5jbGFzc0xpc3QuYWRkKCd3ZWF0aGVyRm9yZWNhc3RJY29uJylcbiAgICAgICAgd2VhdGhlckZvcmVjYXN0SWNvbi5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLndlYXRoZXJJY29ufS5wbmdgXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5hcHBlbmRDaGlsZCh3ZWF0aGVyRm9yZWNhc3RJY29uKVxuXG4gICAgICAgIC8vIGRpc3BsYXkgd2VhdGhlciBkZXNjcmlwdGlvblxuICAgICAgICBjb25zdCBmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbicpXG4gICAgICAgIGZvcmVjYXN0V2VhdGhlckRlc2NyaXB0aW9uLmlubmVyVGV4dCA9XG4gICAgICAgICAgICBuZXdIb3VybHlGb3JlY2FzdEFycmF5W2ldLndlYXRoZXJEZXNjcmlwdGlvblxuICAgICAgICBmb3JlY2FzdENlbGwuYXBwZW5kQ2hpbGQoZm9yZWNhc3RXZWF0aGVyRGVzY3JpcHRpb24pXG5cbiAgICAgICAgLy8gZGlzcGxheSBmb3JlY2FzdCB0ZW1wZXJhdHVyZVxuICAgICAgICBjb25zdCBmb3JlY2FzdFRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgZm9yZWNhc3RUZW1wLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0VGVtcCcpXG4gICAgICAgIGZvcmVjYXN0VGVtcC5pbm5lclRleHQgPSBgJHtNYXRoLnJvdW5kKFxuICAgICAgICAgICAgbmV3SG91cmx5Rm9yZWNhc3RBcnJheVtpXS50ZW1wZXJhdHVyZVxuICAgICAgICApfVxcdTAwQjBgXG4gICAgICAgIGZvcmVjYXN0Q2VsbC5hcHBlbmRDaGlsZChmb3JlY2FzdFRlbXApXG5cbiAgICAgICAgZm9yZWNhc3RSb3cuYXBwZW5kQ2hpbGQoZm9yZWNhc3RDZWxsKVxuICAgIH1cbn1cblxuY29uc3Qgc2VsZWN0TG9jYXRpb24gPSAobGkpID0+IHtcbiAgICAvLyBzZXQgY29udGVudCB0aXRsZVxuICAgIC8vIGNvbnN0IGNvbnRlbnRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50VGl0bGUnKVxuICAgIC8vIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9IGxpLmlubmVyVGV4dFxuXG4gICAgLy8gRmV0Y2ggY3VycmVudCB3ZWF0aGVyXG4gICAgQVBJQ2l0eVNlYXJjaChsaS5pbm5lclRleHQpXG5cbiAgICAvLyBncmFiIGxvY2F0aW9ucyBhcnJheSBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIGRlc2VsZWN0IGFsbCBsb2NhdGlvbnNcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5zZWxlY3RlZCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWxlY3RlZCA9ICdmYWxzZSdcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBTZWxlY3QgbG9jYXRpb24gaWYgb25lIGlzIGNob3NlbiAobWFpbiBtZW51IHNlbGVjdGlvbiBpcyBoYW5kbGVkIGluIGV2ZW50IGxpc3RlbmVyKVxuICAgIGlmIChsaS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdsb2NhdGlvbicpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMb2NhdGlvbklkID0gbGkuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgICAgIHN0b3JhZ2VXYXRjaGxpc3Rbc2VsZWN0ZWRMb2NhdGlvbklkXS5zZWxlY3RlZCA9ICd0cnVlJ1xuICAgIH1cblxuICAgIC8vIHNldCBsb2NhdGlvbnMgYXJyYXkgYmFjayBpbnRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyByZWZyZXNoXG4gICAgZGlzcGxheVdhdGNobGlzdCgpXG59XG5cbmNvbnN0IGNyZWF0ZUFkZEJ1dHRvbiA9IChjb250YWluZXIpID0+IHtcbiAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdhZGRCdG4nKVxuICAgIGFkZEJ0bi5pbm5lclRleHQgPSAnc2VhcmNoJ1xuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB2YWxpZGF0ZVNlYXJjaChlKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkQnRuKVxufVxuXG5jb25zdCBjcmVhdGVDYW5jZWxCdXR0b24gPSAoY29udGFpbmVyLCBpKSA9PiB7XG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZCgnY2FuY2VsQnRuJylcbiAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l9YClcbiAgICBjYW5jZWxCdG4uaW5uZXJUZXh0ID0gJ2NhbmNlbCdcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKVxufVxuXG4vLyBjcmVhdGVGb3JtXG5jb25zdCBjcmVhdGVGb3JtID0gKGZvcm0pID0+IHtcbiAgICAvLyByb3cgb25lOiBhc3NpZ24gaW5wdXRcbiAgICBjb25zdCBmb3JtUm93MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZm9ybVJvdzEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmb3JtUm93JylcbiAgICBjb25zdCBuZXdMb2NhdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIG5ld0xvY2F0aW9uSW5wdXQuY2xhc3NMaXN0LmFkZCgnbmV3TG9jYXRpb25JbnB1dCcpXG4gICAgbmV3TG9jYXRpb25JbnB1dC5wbGFjZWhvbGRlciA9ICdGbG9yZW5jZSdcbiAgICBuZXdMb2NhdGlvbklucHV0Lm5hbWUgPSAnbmV3TG9jYXRpb25JbnB1dCdcbiAgICBmb3JtUm93MS5hcHBlbmRDaGlsZChuZXdMb2NhdGlvbklucHV0KVxuXG4gICAgLy8gcm93IHR3bzogc3VibWl0IGFuZCBjYW5jZWwgYnV0dG9uc1xuICAgIGNvbnN0IGZvcm1Sb3cyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmb3JtUm93Mi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm1Sb3cnKVxuICAgIGZvcm1Sb3cyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZm9ybUJ1dHRvbnMnKVxuICAgIGNyZWF0ZUFkZEJ1dHRvbihmb3JtUm93MiwgZm9ybSlcbiAgICBjcmVhdGVDYW5jZWxCdXR0b24oZm9ybVJvdzIsIGZvcm0pXG5cbiAgICAvLyByb3cgdGhyZWU6IGFzc2lnbiBlcnJvciBjbGFzcyBhbmQgdGV4dFxuICAgIGNvbnN0IGZvcm1Sb3czID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAvLyBmb3JtUm93My5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgZm9ybVJvdzMuc2V0QXR0cmlidXRlKCdjbGFzcycsICduZXdQcm9qRXJyb3JDb250YWluZXInKVxuICAgIC8vIGZvcm1Sb3czLmlubmVyVGV4dCA9ICdXaGljaCBjaXR5PydcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzEpXG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MilcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3czKVxufVxuXG5jb25zdCBzaG93Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRMb2NhdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkJ0bicpXG4gICAgY29uc3QgYWRkTG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uRm9ybScpXG5cbiAgICBhZGRMb2NhdGlvbkJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCAnc2hvd0Jsb2NrJylcbn1cblxuY29uc3QgaGlkZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkTG9jYXRpb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkTG9jYXRpb25CdG4nKVxuICAgIGNvbnN0IGFkZExvY2F0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRMb2NhdGlvbkZvcm0nKVxuXG4gICAgYWRkTG9jYXRpb25CdG4uc2V0QXR0cmlidXRlKCdpZCcsICdzaG93QmxvY2snKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG59XG5cbi8vIERlbGV0ZSB3YXRjaGxpc3QgZW50cnlcbmNvbnN0IGRlbGV0ZVdhdGNobGlzdEVudHJ5ID0gKGUpID0+IHtcbiAgICAvLyBncmFiIGFycmF5cyBmcm9tIHN0b3JhZ2VcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2VXYXRjaGxpc3QnKVxuICAgIClcblxuICAgIC8vIElkZW50aWZ5IGVudHJ5IHRvIGRlbGV0ZVxuICAgIGNvbnN0IGRvb21lZEluZGV4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgLy8gY29uc3QgZG9vbWVkTmFtZSA9IHN0b3JhZ2VXYXRjaGxpc3RbZG9vbWVkSW5kZXhdLm5hbWU7XG5cbiAgICAvLyBkZWxldGUgZW50cnlcbiAgICBzdG9yYWdlV2F0Y2hsaXN0LnNwbGljZShkb29tZWRJbmRleCwgMSlcblxuICAgIC8vIHNldCBjaGFuZ2VzIHRvIGxvY2FsU3RvcmFnZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlV2F0Y2hsaXN0JywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVdhdGNobGlzdCkpXG5cbiAgICAvLyBJZiBkb29tZWQgZW50cnkgd2FzIHNlbGVjdGVkLCBjbGVhciBjb250ZW50IGRpc3BsYXlcbiAgICAvLyBjb25zdCBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudFRpdGxlJyk7XG4gICAgLy8gY29uc3QgYWxsVGFza3NDbGFzc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsVGFza3MnKS5jbGFzc0xpc3RcbiAgICAvLyBpZiAoY29udGVudFRpdGxlLnRleHRDb250ZW50ID09PSBkb29tZWROYW1lKSB7XG4gICAgLy8gICAgIGNvbnRlbnRUaXRsZS50ZXh0Q29udGVudCA9ICdBbGwgdGFza3MnXG4gICAgLy8gICAgIGFsbFRhc2tzQ2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIC8vIH1cblxuICAgIC8vIHJlZnJlc2ggd2F0Y2hpc3RcbiAgICBkaXNwbGF5V2F0Y2hsaXN0KClcbn1cblxuY29uc3QgY3JlYXRlRGVsZXRlSWNvbiA9IChjb250YWluZXIsIGkpID0+IHtcbiAgICAvLyBjcmVhdGUgaW1hZ2UgYW5kIGFzc2lnbiBhdHRyaWJ1dGVzXG4gICAgY29uc3QgbmV3RGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3RGVsZXRlSWNvbi5zcmMgPSBkZWxldGVJY29uXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ljb24gZGVsZXRlSXRlbScpXG4gICAgbmV3RGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aX1gKVxuXG4gICAgLy8gQUREIEVWRU5UIExJU1RFTkVSXG4gICAgaWYgKFxuICAgICAgICBjb250YWluZXIuZ2V0QXR0cmlidXRlKCdjbGFzcycpID09PSAnbG9jYXRpb24nIHx8XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2xvY2F0aW9uJylcbiAgICApIHtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXIgdG8gZGVsZXRlIGxvY2F0aW9uXG4gICAgICAgIG5ld0RlbGV0ZUljb24uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgIGBkZWxldGVXYXRjaGxpc3RFbnRyeWAsXG4gICAgICAgICAgICBgZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YCxcbiAgICAgICAgICAgIGBoaWRkZW5gXG4gICAgICAgIClcbiAgICAgICAgbmV3RGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PlxuICAgICAgICAgICAgZGVsZXRlV2F0Y2hsaXN0RW50cnkoZSwgaSlcbiAgICAgICAgKVxuICAgICAgICAvLyBkaXNwbGF5IHRyYXNoIGljb24gb24gaG92ZXJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIGAuZGVsZXRlV2F0Y2hsaXN0RW50cnkke2l9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdHJhc2hJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGhpZGUgdHJhc2ggaWNvblxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgYC5kZWxldGVXYXRjaGxpc3RFbnRyeSR7aX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBzdHJhbmdlJylcbiAgICB9XG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdEZWxldGVJY29uKVxufVxuXG5jb25zdCBjcmVhdGVBZGRpdGlvbkljb24gPSAobGkpID0+IHtcbiAgICBjb25zdCBuZXdBZGRpdGlvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIG5ld0FkZGl0aW9uSWNvbi5zcmMgPSBhZGRpdGlvbkljb25cbiAgICBuZXdBZGRpdGlvbkljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJylcbiAgICBsaS5hcHBlbmRDaGlsZChuZXdBZGRpdGlvbkljb24pXG59XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vIE9wZW53ZWF0aGVyIEFQSSBGdW5jdGlvbnNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZnVuY3Rpb24gdG9EaXJlY3Rpb24oZGVncmVlKSB7XG4gICAgaWYgKGRlZ3JlZSA+IDMzNy41KSByZXR1cm4gJ05vcnRoJ1xuICAgIGlmIChkZWdyZWUgPiAyOTIuNSkgcmV0dXJuICdOb3J0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyNDcuNSkgcmV0dXJuICdXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMDIuNSkgcmV0dXJuICdTb3V0aCBXZXN0J1xuICAgIGlmIChkZWdyZWUgPiAxNTcuNSkgcmV0dXJuICdTb3V0aCdcbiAgICBpZiAoZGVncmVlID4gMTIyLjUpIHJldHVybiAnU291dGggRWFzdCdcbiAgICBpZiAoZGVncmVlID4gNjcuNSkgcmV0dXJuICdFYXN0J1xuICAgIGlmIChkZWdyZWUgPiAyMi41KSByZXR1cm4gJ05vcnRoIEVhc3QnXG4gICAgcmV0dXJuICdOb3J0aCdcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjIzNzYxMTUvaG93LXRvLW9idGFpbi1vcGVuLXdlYXRoZXItYXBpLWRhdGUtdGltZS1mcm9tLWNpdHktYmVpbmctZmV0Y2hlZFxuY29uc3QgY2FsY0N1cnJlbnRUaW1lID0gKHRpbWV6b25lKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKClcbiAgICBjb25zdCBsb2NhbFRpbWUgPSBkLmdldFRpbWUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSBsb2NhbFRpbWUgKyBsb2NhbE9mZnNldFxuICAgIGNvbnN0IG5ld0NpdHkgPSB1dGMgKyAxMDAwICogdGltZXpvbmVcbiAgICByZXR1cm4gbmV3IERhdGUobmV3Q2l0eSlcbn1cblxuY29uc3QgY2FsY1N1blRpbWUgPSAodGltZSwgdGltZXpvbmUpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKVxuICAgIGNvbnN0IGxvY2FsT2Zmc2V0ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDBcbiAgICBjb25zdCB1dGMgPSB0aW1lICsgbG9jYWxPZmZzZXRcbiAgICBjb25zdCBuZXdDaXR5ID0gdXRjICsgMTAwMCAqIHRpbWV6b25lXG4gICAgcmV0dXJuIG5ldyBEYXRlKG5ld0NpdHkpXG59XG5cbi8vIGNvbnN0IGZldGNoRGFpbHlGb3JlY2FzdCA9IChsYXQsIGxvbikgPT4ge1xuLy8gICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3UHJvakVycm9yQ29udGFpbmVyJyk7XG4vLyAgIGNvbnNvbGUubG9nKGxhdCk7XG4vLyAgIGNvbnNvbGUubG9nKGxvbik7XG4vLyAgIC8vIGZldGNoIHNldmVuIGRheSBmb3JlY2FzdFxuLy8gICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PSR7bGF0fSZsb249JHtsb259JmV4Y2x1ZGU9bWludXRlbHksaG91cmx5LGFsZXJ0cyZ1bml0cz1pbXBlcmlhbCZBUFBJRD0wYTlmZGJkZmNkMGY2MmU5YmQ3YTIwMDc5N2IxMGQ0ZWAsIHsgbW9kZTogJ2NvcnMnIH0pXG4vLyAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4vLyAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4vLyAgICAgfSlcbi8vICAgICAuY2F0Y2goKGVycikgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coZXJyKTtcbi8vICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuY29uc3QgZmV0Y2hIb3VybHlGb3JlY2FzdCA9IChjaXR5UXVlcnkpID0+IHtcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG4gICAgLy8gZmV0Y2ggZml2ZSBkYXkvdGhyZWUgaG91ciBmb3JlY2FzdFxuICAgIGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCxcbiAgICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICBjb25zdCBuZXdIb3VybHlGb3JlY2FzdEFycmF5ID0gW11cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SG91cmx5Rm9yZWNhc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0KSxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRleHQ6IHJlc3BvbnNlLmxpc3RbaV0uZHRfdHh0LFxuICAgICAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubGlzdFtpXS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgICAgICAgICAgICByYWluQ2hhbmNlOiByZXNwb25zZS5saXN0W2ldLnBvcCAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IHJlc3BvbnNlLmxpc3RbaV0ubWFpbi50ZW1wLFxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyQ29uZGl0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdlYXRoZXJJY29uOiByZXNwb25zZS5saXN0W2ldLndlYXRoZXJbMF0uaWNvbixcbiAgICAgICAgICAgICAgICAgICAgd2luZERlZ3JlZTogcmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICAgICAgd2luZERpcmVjdGlvbjogdG9EaXJlY3Rpb24ocmVzcG9uc2UubGlzdFtpXS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS5saXN0W2ldLndpbmQuZ3VzdCxcbiAgICAgICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS5saXN0W2ldLndpbmQuc3BlZWQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld0hvdXJseUZvcmVjYXN0QXJyYXkucHVzaChuZXdIb3VybHlGb3JlY2FzdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0hvdXJseUZvcmVjYXN0QXJyYXkpXG4gICAgICAgICAgICBkaXNwbGF5Rm9yZWNhc3QobmV3SG91cmx5Rm9yZWNhc3RBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBuZXdIb3VybHlGb3JlY2FzdEFycmF5XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXdQcm9qRXJyb3JDb250YWluZXIuaW5uZXJUZXh0ID0gJ0NpdHkgbm90IGZvdW5kJ1xuICAgICAgICB9KVxufVxuXG5jb25zdCBmZXRjaEN1cnJlbnRXZWF0aGVyID0gKGNpdHlRdWVyeSkgPT4ge1xuICAgIC8vIGNvbnN0IEFQSUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkFQSUltYWdlJylcbiAgICBjb25zdCBuZXdQcm9qRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLm5ld1Byb2pFcnJvckNvbnRhaW5lcidcbiAgICApXG5cbiAgICBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5UXVlcnl9JnVuaXRzPWltcGVyaWFsJkFQUElEPTBhOWZkYmRmY2QwZjYyZTliZDdhMjAwNzk3YjEwZDRlYCxcbiAgICAgICAgeyBtb2RlOiAnY29ycycgfVxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAvLyBjb25zdCB7bGF0fSA9IHJlc3BvbnNlLmNvb3JkO1xuICAgICAgICAgICAgLy8gY29uc3Qge2xvbn0gPSByZXNwb25zZS5jb29yZDtcbiAgICAgICAgICAgIC8vIGZldGNoRGFpbHlGb3JlY2FzdChsYXQsIGxvbik7XG4gICAgICAgICAgICBzdWJtaXRMb2NhdGlvbihyZXNwb25zZS5uYW1lKVxuICAgICAgICAgICAgY29uc3QgbmV3V2VhdGhlckNhcmQgPSB7XG4gICAgICAgICAgICAgICAgY2l0eTogcmVzcG9uc2UubmFtZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiByZXNwb25zZS5zeXMuY291bnRyeSxcbiAgICAgICAgICAgICAgICBodW1pZGl0eTogcmVzcG9uc2UubWFpbi5odW1pZGl0eSxcbiAgICAgICAgICAgICAgICBsb2NhbERhdGU6IGNhbGNDdXJyZW50VGltZShyZXNwb25zZS50aW1lem9uZSksXG4gICAgICAgICAgICAgICAgc3VucmlzZTogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5yaXNlICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudGltZXpvbmVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHN1bnNldDogY2FsY1N1blRpbWUoXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnN5cy5zdW5zZXQgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50aW1lem9uZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGVtcEN1cnJlbnQ6IHJlc3BvbnNlLm1haW4udGVtcCxcbiAgICAgICAgICAgICAgICB0ZW1wSGlnaDogcmVzcG9uc2UubWFpbi50ZW1wX21heCxcbiAgICAgICAgICAgICAgICB0ZW1wTG93OiByZXNwb25zZS5tYWluLnRlbXBfbWluLFxuICAgICAgICAgICAgICAgIHdlYXRoZXJDb25kaXRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgICAgICAgICB3ZWF0aGVyRGVzY3JpcHRpb246IHJlc3BvbnNlLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgd2VhdGhlckljb246IHJlc3BvbnNlLndlYXRoZXJbMF0uaWNvbixcbiAgICAgICAgICAgICAgICB3aW5kRGVncmVlOiByZXNwb25zZS53aW5kLmRlZyxcbiAgICAgICAgICAgICAgICB3aW5kRGlyZWN0aW9uOiB0b0RpcmVjdGlvbihyZXNwb25zZS53aW5kLmRlZyksXG4gICAgICAgICAgICAgICAgd2luZFNwZWVkOiByZXNwb25zZS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgICAgIHdpbmRHdXN0OiByZXNwb25zZS53aW5kLmd1c3QsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBUElJbWFnZS5zcmMgPSBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS53ZWF0aGVyWzBdLmljb259QDJ4LnBuZ2BcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1dlYXRoZXJDYXJkKVxuICAgICAgICAgICAgZGlzcGxheVdlYXRoZXIobmV3V2VhdGhlckNhcmQpXG4gICAgICAgICAgICByZXR1cm4gbmV3V2VhdGhlckNhcmRcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnQ2l0eSBub3QgZm91bmQnXG4gICAgICAgIH0pXG59XG5cbmNvbnN0IEFQSUNpdHlTZWFyY2ggPSAoaW5wdXQpID0+IHtcbiAgICBmZXRjaEN1cnJlbnRXZWF0aGVyKGlucHV0KVxuICAgIGZldGNoSG91cmx5Rm9yZWNhc3QoaW5wdXQpXG59XG5cbmNvbnN0IHZhbGlkYXRlU2VhcmNoID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAvLyBncmFiIGRvbSBlbGVtZW50c1xuICAgIGNvbnN0IG5ld0xvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3TG9jYXRpb25JbnB1dCcpXG4gICAgY29uc3QgbmV3UHJvakVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5uZXdQcm9qRXJyb3JDb250YWluZXInXG4gICAgKVxuICAgIC8vIHJlc2V0IGVycm9yXG4gICAgbmV3UHJvakVycm9yQ29udGFpbmVyLmlubmVyVGV4dCA9ICcnXG4gICAgLy8gY2hlY2sgZm9yIHNlYXJjaCB0ZXJtXG4gICAgaWYgKG5ld0xvY2F0aW9uSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIG5ld1Byb2pFcnJvckNvbnRhaW5lci5pbm5lclRleHQgPSAnV2hpY2ggY2l0eT8nXG4gICAgfSBlbHNlIHtcbiAgICAgICAgQVBJQ2l0eVNlYXJjaChuZXdMb2NhdGlvbklucHV0LnZhbHVlKVxuICAgICAgICBoaWRlRm9ybSgpXG4gICAgICAgIG5ld0xvY2F0aW9uSW5wdXQudmFsdWUgPSAnJ1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBjcmVhdGVBZGRpdGlvbkljb24sXG4gICAgY3JlYXRlRGVsZXRlSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIGNyZWF0ZU1lbnVJY29uLFxuICAgIGRpc3BsYXlXYXRjaGxpc3QsXG4gICAgaGlkZUZvcm0sXG4gICAgc2hvd0Zvcm0sXG4gICAgc3VibWl0TG9jYXRpb24sXG4gICAgdmFsaWRhdGVTZWFyY2gsXG59XG4iLCIvLyBjbGFzcyBsb2NhdGlvbnMge1xuLy8gICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uTmFtZSkge1xuLy8gICAgICAgICB0aGlzLm5hbWUgPSBsb2NhdGlvbk5hbWVcbi8vICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkXG4vLyAgICAgfVxuLy8gfVxuXG4vLyBJbml0aWF0ZSBzdG9yYWdlIGFycmF5cyBpZiBsb2NhbFN0b3JhZ2UgaXMgZW1wdHlcbmNvbnN0IGluaXRpYXRlU3RvcmFnZSA9ICgpID0+IHtcbiAgICBjb25zdCBzdG9yYWdlV2F0Y2hsaXN0QXJyYXkgPSBbXVxuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAnc3RvcmFnZVdhdGNobGlzdCcsXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShzdG9yYWdlV2F0Y2hsaXN0QXJyYXkpXG4gICAgICAgIClcbiAgICB9XG59XG5cbi8vIGluc2VydCBjb250ZW50IGZyb20gbG9jYWwgc3RvcmFnZSBpZiB0aGVyZSBpcyBhbnlcblxuZXhwb3J0IGRlZmF1bHQgaW5pdGlhdGVTdG9yYWdlXG4iLCJpbXBvcnQge1xuICAgIGNyZWF0ZUFkZGl0aW9uSWNvbixcbiAgICBjcmVhdGVGb3JtLFxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QsXG59IGZyb20gJy4vaGVscGVyRnVuY3Rpb25zJ1xuaW1wb3J0IGdpdGh1Ykljb24gZnJvbSAnLi9hc3NldHMvR2l0SHViLWxpZ2h0LTMycHgucG5nJ1xuaW1wb3J0IGxvZ29JY29uIGZyb20gJy4vYXNzZXRzL2xvZ29JY29uLnN2ZydcblxuY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpXG5cbiAgICAvLyBkaXNwbGF5IGxvZ29cbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBsb2dvLnNyYyA9IGxvZ29JY29uXG4gICAgbG9nby50YXJnZXQgPSAnX2JsYW5rJ1xuICAgIGxvZ28uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsb2dvJylcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbylcblxuICAgIC8vIGRpc3BsYXkgdGl0bGVcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdXZWF0aGVyc2VydmUnXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKVxuXG4gICAgcmV0dXJuIGhlYWRlclxufVxuXG5jb25zdCBjcmVhdGVNZW51ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIG1lbnUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtZW51JylcblxuICAgIC8vIGNyZWF0ZSB3YXRjaGxpc3QgaGVhZGVyXG4gICAgY29uc3Qgd2F0Y2hsaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgd2F0Y2hsaXN0SGVhZGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0SGVhZGVyJylcbiAgICB3YXRjaGxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSAnV2F0Y2hsaXN0J1xuXG4gICAgLy8gY3JlYXRlIHdhdGNobGlzdCBtZW51XG4gICAgY29uc3Qgd2F0Y2hsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHdhdGNobGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhdGNobGlzdCcpXG4gICAgd2F0Y2hsaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIGRpc3BsYXlXYXRjaGxpc3QoKVxuXG4gICAgLy8gR2VuZXJhdGUgYWRkIGxvY2F0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGFkZExvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2F0Y2hsaXN0JylcblxuICAgIC8vIEdlbmVyYXRlIGFkZCBsb2NhdGlvbiBidXR0b25cbiAgICBjb25zdCBhZGRMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBhZGRMb2NhdGlvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZExvY2F0aW9uQnRuJylcbiAgICBjcmVhdGVBZGRpdGlvbkljb24oYWRkTG9jYXRpb24pXG4gICAgY29uc3QgYWRkTG9jYXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgYWRkTG9jYXRpb25UZXh0LmlubmVyVGV4dCA9ICdBZGQgTG9jYXRpb24nXG4gICAgYWRkTG9jYXRpb24uYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25UZXh0KVxuICAgIGFkZExvY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZExvY2F0aW9uKVxuXG4gICAgLy8gR2VuZXJhdGUgYW5kIGhpZGUgbmV3IGxvY2F0aW9uIGZvcm1cbiAgICBjb25zdCBhZGRMb2NhdGlvbkZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgICBhZGRMb2NhdGlvbkZvcm0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGRMb2NhdGlvbkZvcm0nKVxuICAgIGFkZExvY2F0aW9uRm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hpZGRlbicpXG4gICAgYWRkTG9jYXRpb25Gb3JtLm1ldGhvZCA9ICdnZXQnXG4gICAgY3JlYXRlRm9ybShhZGRMb2NhdGlvbkZvcm0pXG4gICAgYWRkTG9jYXRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkTG9jYXRpb25Gb3JtKVxuXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3RIZWFkZXIpXG4gICAgbWVudS5hcHBlbmRDaGlsZCh3YXRjaGxpc3QpXG4gICAgbWVudS5hcHBlbmRDaGlsZChhZGRMb2NhdGlvbkNvbnRhaW5lcilcblxuICAgIHJldHVybiBtZW51XG59XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJDYXJkID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBXZWF0aGVyIEFQSSBjb250YWluZXJcbiAgICBjb25zdCBXZWF0aGVyQVBJQ29udGFpbnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuY2xhc3NMaXN0LmFkZCgnV2VhdGhlckFQSUNvbnRhaW50ZXInLCAnY29udGVudCcpXG5cbiAgICAvLyBjcmVhdGUgQVBJIHRpdGxlXG4gICAgY29uc3QgQVBJVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXG4gICAgQVBJVGl0bGUuY2xhc3NMaXN0LmFkZCgnY29udGVudFRpdGxlJylcbiAgICBBUElUaXRsZS5pbm5lclRleHQgPSAnV2VhdGhlcnNlcnZlJ1xuXG4gICAgLy8gY3JlYXRlIEFQSSBpbWdcbiAgICBjb25zdCBBUElJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgQVBJSW1hZ2UuY2xhc3NMaXN0LmFkZCgnQVBJSW1hZ2UnKVxuXG4gICAgLy8gY3JlYXRlIGRlc2NyaXB0aW9uIGNvbnRhaW5lclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgZGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnd2VhdGhlckRlc2NyaXB0aW9uJylcblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IHRlbXAgY29udGFpbmVyXG4gICAgY29uc3QgdGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHRlbXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGVtcENvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgaGlnaC9sb3cgdGVtcCBjb250YWluZXJcbiAgICBjb25zdCBoaWdoTG93Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoaWdoTG93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZ2hMb3dDb250YWluZXInKVxuXG4gICAgY29uc3QgbG93VGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGxvd1RlbXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbG93VGVtcENvbnRhaW5lcicpXG4gICAgaGlnaExvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChsb3dUZW1wQ29udGFpbmVyKVxuXG4gICAgY29uc3QgaGlnaFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBoaWdoVGVtcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWdoVGVtcENvbnRhaW5lcicpXG4gICAgaGlnaExvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChoaWdoVGVtcENvbnRhaW5lcilcblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IHRpbWUgY29udGFpbmVyXG4gICAgY29uc3QgdGltZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHRpbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGltZUNvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgc3VucmlzZS9zdW5zZXQgY29udGFpbmVyXG4gICAgY29uc3Qgc3VucmlzZVN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc3VucmlzZVN1bnNldENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdW5yaXNlU3Vuc2V0Q29udGFpbmVyJylcblxuICAgIGNvbnN0IHN1bnJpc2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBzdW5yaXNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1bnJpc2VDb250YWluZXInKVxuICAgIHN1bnJpc2VTdW5zZXRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VucmlzZUNvbnRhaW5lcilcblxuICAgIGNvbnN0IHN1bnNldENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHN1bnNldENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdW5zZXRDb250YWluZXInKVxuICAgIHN1bnJpc2VTdW5zZXRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3Vuc2V0Q29udGFpbmVyKVxuXG4gICAgLy8gY3JlYXRlIHdpbmQgY29udGFpbmVyXG4gICAgY29uc3Qgd2luZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHdpbmRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnd2luZENvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgaHVtaWRpdHkgY29udGFpbmVyXG4gICAgY29uc3QgaHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBodW1pZGl0eUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdodW1pZGl0eUNvbnRhaW5lcicpXG5cbiAgICAvLyBjcmVhdGUgZm9yZWNhc3QgY29udGFpbmVyXG4gICAgY29uc3QgZm9yZWNhc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZvcmVjYXN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Q29udGFpbmVyJylcblxuICAgIGNvbnN0IGZvcmVjYXN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBmb3JlY2FzdFRpdGxlLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0VGl0bGUnKVxuICAgIGZvcmVjYXN0VGl0bGUuaW5uZXJUZXh0ID0gJ0ZpdmUgZGF5LCB0aHJlZSBob3VyIGZvcmVjYXN0OidcblxuICAgIGNvbnN0IGZvcmVjYXN0VGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXG4gICAgZm9yZWNhc3RUYWJsZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdFRhYmxlJylcbiAgICBmb3JlY2FzdENvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JlY2FzdFRhYmxlKVxuXG4gICAgY29uc3QgZm9yZWNhc3RSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG4gICAgZm9yZWNhc3RSb3cuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3RSb3cnKVxuICAgIGZvcmVjYXN0VGFibGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3RSb3cpXG5cbiAgICAvLyBtYWtlIHNjcm9sbHdoZWVsIGZ1bmN0aW9uYWwgd2l0aCBob3Jpem9udGFsIHNjcm9sbGluZ1xuICAgIGZvcmVjYXN0Um93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGZvcmVjYXN0Um93LnNjcm9sbExlZnQgKz0gZS5kZWx0YVlcbiAgICB9KVxuXG4gICAgLy8gQXBwZW5kXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJVGl0bGUpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoQVBJSW1hZ2UpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25Db250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQodGVtcENvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZChoaWdoTG93Q29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKHRpbWVDb250YWluZXIpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoc3VucmlzZVN1bnNldENvbnRhaW5lcilcbiAgICBXZWF0aGVyQVBJQ29udGFpbnRlci5hcHBlbmRDaGlsZCh3aW5kQ29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGh1bWlkaXR5Q29udGFpbmVyKVxuICAgIFdlYXRoZXJBUElDb250YWludGVyLmFwcGVuZENoaWxkKGZvcmVjYXN0VGl0bGUpXG4gICAgV2VhdGhlckFQSUNvbnRhaW50ZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RDb250YWluZXIpXG5cbiAgICByZXR1cm4gV2VhdGhlckFQSUNvbnRhaW50ZXJcbn1cblxuY29uc3QgY3JlYXRlQ29udGVudCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgY29udGVudCBjb250YWluZXJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQnKVxuXG4gICAgLy8gZGlzcGxheSB3ZWF0aGVyIGNhcmRcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNyZWF0ZVdlYXRoZXJDYXJkKCkpXG5cbiAgICByZXR1cm4gY29udGVudFxufVxuXG5jb25zdCBjcmVhdGVGb290ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJylcblxuICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIGNvcHlyaWdodC50ZXh0Q29udGVudCA9IGBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IGpjYW1wYmVsbDU3YFxuXG4gICAgY29uc3QgZ2l0aHViTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGdpdGh1YkxpbmsuaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vamNhbXBiZWxsNTcnXG4gICAgZ2l0aHViTGluay50YXJnZXQgPSAnX2JsYW5rJ1xuXG4gICAgY29uc3QgbmV3R2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbmV3R2l0aHViSWNvbi5zcmMgPSBnaXRodWJJY29uXG4gICAgbmV3R2l0aHViSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2dpdGh1YicpXG5cbiAgICBnaXRodWJMaW5rLmFwcGVuZENoaWxkKG5ld0dpdGh1Ykljb24pXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGNvcHlyaWdodClcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZ2l0aHViTGluaylcblxuICAgIHJldHVybiBmb290ZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUhlYWRlcigpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlTWVudSgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlQ29udGVudCgpKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRm9vdGVyKCkpXG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3Jlc2V0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Q0FhQyxTQUFTO0NBQ1QsVUFBVTtDQUNWLFNBQVM7Q0FDVCxlQUFlO0NBQ2YsYUFBYTtDQUNiLHdCQUF3QjtBQUN6QjtBQUNBLGdEQUFnRDtBQUNoRDs7Q0FFQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsZ0JBQWdCO0FBQ2pCO0FBQ0E7Q0FDQyxZQUFZO0FBQ2I7QUFDQTs7Q0FFQyxXQUFXO0NBQ1gsYUFBYTtBQUNkO0FBQ0E7Q0FDQyx5QkFBeUI7Q0FDekIsaUJBQWlCO0FBQ2xCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogUGFnZSBzdHlsaW5nICovXFxuXFxuOnJvb3Qge1xcbiAgICAtLXBhbmVsOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNjUpO1xcbiAgICAtLWFjY2VudDogcm95YWxibHVlO1xcbiAgICAtLWJhY2tncm91bmQ6IHJnYigwLCAxMCwgMzkpO1xcbiAgICAtLXdoaXRlLWlzaDogd2hpdGVzbW9rZTtcXG4gICAgLS1lcnJvcjogZGFya3JlZDtcXG59XFxuXFxuYm9keSB7XFxuICAgIC8qIHN5c3RlbSBmb250IHN0YWNrICovXFxuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90byxcXG4gICAgICAgIE94eWdlbi1TYW5zLCBVYnVudHUsIENhbnRhcmVsbCwgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZCk7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjUwcHggY2FsYygxMDB2dyAtIDI1MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMTBweCBjYWxjKDEwMHZoIC0gMTEwcHggLSA2MnB4KSA2MnB4O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG1heC13aWR0aDogMTAwdnc7XFxuICAgIG1heC1oZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4vKiBHZW5lcmFsIHN0eWxpbmcgKi9cXG5cXG5oMSB7XFxuICAgIGZvbnQtc2l6ZTogMmVtO1xcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI2hpZGRlbiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNzaG93QmxvY2sge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyogSGVhZGVyIHN0eWxpbmcgKi9cXG5cXG4ubG9nbyB7XFxuICAgIG1heC1oZWlnaHQ6IDkwJTtcXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XFxuICAgIC8qIHdoaXRlc21va2UgY29sb3IgKi9cXG4gICAgZmlsdGVyOiBpbnZlcnQoMTAwJSkgc2VwaWEoMCUpIHNhdHVyYXRlKDc0ODAlKSBodWUtcm90YXRlKDIwMWRlZylcXG4gICAgICAgIGJyaWdodG5lc3MoMTA3JSkgY29udHJhc3QoOTIlKTtcXG59XFxuXFxuaGVhZGVyIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgY29sb3I6IHZhcigtLXdoaXRlLWlzaCk7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi8qIE1lbnUgc3R5bGluZyAqL1xcblxcbi5tZW51IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGFuZWwpO1xcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbn1cXG5cXG4ubWVudSA+IHVsLndhdGNobGlzdCB7XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbi5pY29uIHtcXG4gICAgaGVpZ2h0OiAxLjJyZW07XFxufVxcblxcbi53YXRjaGxpc3Qge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4ud2F0Y2hsaXN0ID4gbGkge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDhweDtcXG59XFxuXFxuLndhdGNobGlzdEhlYWRlciB7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIGZvbnQtc2l6ZTogMS4zcmVtO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpLFxcbi53YXRjaGxpc3RIZWFkZXIsXFxuLmFkZExvY2F0aW9uQnRuLFxcbi5hZGRMb2NhdGlvbkZvcm0ge1xcbiAgICBtYXJnaW46IDEwcHggMXJlbTtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbiN3YXRjaGxpc3Qge1xcbiAgICBtYXgtaGVpZ2h0OiA4MCU7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpOmhvdmVyLFxcbi5hZGRMb2NhdGlvbkJ0bjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDI0NSwgMjQ1LCAwLjMpO1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ud2F0Y2hsaXN0IGxpOmFjdGl2ZSxcXG4uYWRkTG9jYXRpb25CdG46YWN0aXZlIHtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbmxpLnNlbGVjdGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUsIDAuMyk7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjIpO1xcbn1cXG5cXG4uZGVsZXRlSXRlbSB7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cXG5cXG4uZGVsZXRlSXRlbTpob3ZlciB7XFxuICAgIGZpbHRlcjogaW52ZXJ0KDclKSBzZXBpYSg1MSUpIHNhdHVyYXRlKDU5NTElKSBodWUtcm90YXRlKDM1MGRlZylcXG4gICAgICAgIGJyaWdodG5lc3MoMTQwJSkgY29udHJhc3QoMTM2JSk7XFxufVxcblxcbi8qIEZvcm0gc3R5bGluZyAqL1xcblxcbi5hZGRMb2NhdGlvbkZvcm0ge1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4uZm9ybVJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBnYXA6IDhweDtcXG59XFxuXFxuI2Zvcm1CdXR0b25zIHtcXG4gICAgbWFyZ2luLXRvcDogOHB4O1xcbn1cXG5cXG4ubmV3TG9jYXRpb25JbnB1dCB7XFxuICAgIHBhZGRpbmc6IDZweDtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLmFkZEJ0bixcXG4uY2FuY2VsQnRuIHtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgZm9udC13ZWlnaHQ6IDU1MDtcXG59XFxuXFxuLmFkZEJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudCk7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGhzbCgyMjUsIDczJSwgMzAlKTtcXG59XFxuXFxuLmNhbmNlbEJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IG1lZGl1bXZpb2xldHJlZDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgaHNsKDMyMiwgODElLCAzMCUpO1xcbn1cXG5cXG4uYWRkQnRuOmhvdmVyLFxcbi5jYW5jZWxCdG46aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC4yKTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYWRkQnRuOmFjdGl2ZSxcXG4uY2FuY2VsQnRuOmFjdGl2ZSB7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4ubmV3UHJvakVycm9yQ29udGFpbmVyIHtcXG4gICAgY29sb3I6IHZhcigtLWVycm9yKTtcXG4gICAgZm9udC1zaXplOiAxLjFyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZzogOHB4O1xcbn1cXG5cXG4vKiBDb250ZW50IHN0eWxpbmcgKi9cXG5cXG4uY29udGVudCB7XFxuICAgIG1hcmdpbjogMCAwLjVyZW07XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICBtYXgtd2lkdGg6IDEwMDBweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi5XZWF0aGVyQVBJQ29udGFpbnRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMC41cmVtO1xcbiAgICBtYXJnaW46IDByZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBhbmVsKTtcXG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uY29udGVudFRpdGxlIHtcXG4gICAgbWFyZ2luOiAxMHB4IDFyZW07XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbn1cXG5cXG4uZm9yZWNhc3RDb250YWluZXIge1xcbiAgICBtYXgtd2lkdGg6IDk1JTtcXG59XFxuXFxuLmZvcmVjYXN0VGFibGUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZm9yZWNhc3RSb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDAuNXJlbTtcXG4gICAgLyogZW5hYmxlIGhvcml6b250YWwgc2Nyb2xsICovXFxuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcXG59XFxuXFxuLyogaGlkZSBzY3JvbGxiYXIsIHJldGFpbiBmdW5jdGlvbiAqL1xcbi5mb3JlY2FzdFJvdzo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uZm9yZWNhc3RDZWxsIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAwLjI1cmVtO1xcbiAgICBtaW4td2lkdGg6IG1heC1jb250ZW50O1xcbn1cXG5cXG4vKiBGb290ZXIgc3R5bGluZyAqL1xcblxcbmZvb3RlciB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpOyAqL1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmZvb3RlciA+IGEge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZ2l0aHViIHtcXG4gICAgaGVpZ2h0OiAyNHB4O1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLmdpdGh1Yjpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpIHNjYWxlKDEuMik7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsaUJBQWlCOztBQUVqQjtJQUNJLGtDQUFrQztJQUNsQyxtQkFBbUI7SUFDbkIsNEJBQTRCO0lBQzVCLHVCQUF1QjtJQUN2Qixn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bUI7O0FBRW5CO0lBQ0ksbUJBQW1CO0lBQ25CLCtDQUErQztJQUMvQyx1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLFNBQVM7SUFDVCxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLHNDQUFzQztBQUMxQzs7QUFFQTtJQUNJLHFDQUFxQztBQUN6Q1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBQYWdlIHN0eWxpbmcgKi9cXG5cXG46cm9vdCB7XFxuICAgIC0tcGFuZWw6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42NSk7XFxuICAgIC0tYWNjZW50OiByb3lhbGJsdWU7XFxuICAgIC0tYmFja2dyb3VuZDogcmdiKDAsIDEwLCAzOSk7XFxuICAgIC0td2hpdGUtaXNoOiB3aGl0ZXNtb2tlO1xcbiAgICAtLWVycm9yOiBkYXJrcmVkO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgLyogc3lzdGVtIGZvbnQgc3RhY2sgKi9cXG4gICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLFxcbiAgICAgICAgT3h5Z2VuLVNhbnMsIFVidW50dSwgQ2FudGFyZWxsLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kKTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAyNTBweCBjYWxjKDEwMHZ3IC0gMjUwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDExMHB4IGNhbGMoMTAwdmggLSAxMTBweCAtIDYycHgpIDYycHg7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgbWF4LXdpZHRoOiAxMDB2dztcXG4gICAgbWF4LWhlaWdodDogMTAwdmg7XFxufVxcblxcbi8qIEdlbmVyYWwgc3R5bGluZyAqL1xcblxcbmgxIHtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jaGlkZGVuIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI3Nob3dCbG9jayB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKiBIZWFkZXIgc3R5bGluZyAqL1xcblxcbi5sb2dvIHtcXG4gICAgbWF4LWhlaWdodDogOTAlO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcXG4gICAgLyogd2hpdGVzbW9rZSBjb2xvciAqL1xcbiAgICBmaWx0ZXI6IGludmVydCgxMDAlKSBzZXBpYSgwJSkgc2F0dXJhdGUoNzQ4MCUpIGh1ZS1yb3RhdGUoMjAxZGVnKVxcbiAgICAgICAgYnJpZ2h0bmVzcygxMDclKSBjb250cmFzdCg5MiUpO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtaXNoKTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLyogTWVudSBzdHlsaW5nICovXFxuXFxuLm1lbnUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wYW5lbCk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICAgIG1hcmdpbi1sZWZ0OiAwLjVyZW07XFxufVxcblxcbi5tZW51ID4gdWwud2F0Y2hsaXN0IHtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxuLmljb24ge1xcbiAgICBoZWlnaHQ6IDEuMnJlbTtcXG59XFxuXFxuLndhdGNobGlzdCB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbi53YXRjaGxpc3QgPiBsaSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogOHB4O1xcbn1cXG5cXG4ud2F0Y2hsaXN0SGVhZGVyIHtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgZm9udC1zaXplOiAxLjNyZW07XFxufVxcblxcbi53YXRjaGxpc3QgbGksXFxuLndhdGNobGlzdEhlYWRlcixcXG4uYWRkTG9jYXRpb25CdG4sXFxuLmFkZExvY2F0aW9uRm9ybSB7XFxuICAgIG1hcmdpbjogMTBweCAxcmVtO1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG59XFxuXFxuI3dhdGNobGlzdCB7XFxuICAgIG1heC1oZWlnaHQ6IDgwJTtcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi53YXRjaGxpc3QgbGk6aG92ZXIsXFxuLmFkZExvY2F0aW9uQnRuOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQ1LCAyNDUsIDAuMyk7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjIpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi53YXRjaGxpc3QgbGk6YWN0aXZlLFxcbi5hZGRMb2NhdGlvbkJ0bjphY3RpdmUge1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDZweCByZ2IoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxubGkuc2VsZWN0ZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAyNDUsIDI0NSwgMC4zKTtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuMik7XFxufVxcblxcbi5kZWxldGVJdGVtIHtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxufVxcblxcbi5kZWxldGVJdGVtOmhvdmVyIHtcXG4gICAgZmlsdGVyOiBpbnZlcnQoNyUpIHNlcGlhKDUxJSkgc2F0dXJhdGUoNTk1MSUpIGh1ZS1yb3RhdGUoMzUwZGVnKVxcbiAgICAgICAgYnJpZ2h0bmVzcygxNDAlKSBjb250cmFzdCgxMzYlKTtcXG59XFxuXFxuLyogRm9ybSBzdHlsaW5nICovXFxuXFxuLmFkZExvY2F0aW9uRm9ybSB7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbi5mb3JtUm93IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGdhcDogOHB4O1xcbn1cXG5cXG4jZm9ybUJ1dHRvbnMge1xcbiAgICBtYXJnaW4tdG9wOiA4cHg7XFxufVxcblxcbi5uZXdMb2NhdGlvbklucHV0IHtcXG4gICAgcGFkZGluZzogNnB4O1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4uYWRkQnRuLFxcbi5jYW5jZWxCdG4ge1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gICAgZm9udC1zaXplOiAxLjFyZW07XFxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZS1pc2gpO1xcbiAgICBmb250LXdlaWdodDogNTUwO1xcbn1cXG5cXG4uYWRkQnRuIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50KTtcXG4gICAgYm9yZGVyOiAycHggc29saWQgaHNsKDIyNSwgNzMlLCAzMCUpO1xcbn1cXG5cXG4uY2FuY2VsQnRuIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWVkaXVtdmlvbGV0cmVkO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCBoc2woMzIyLCA4MSUsIDMwJSk7XFxufVxcblxcbi5hZGRCdG46aG92ZXIsXFxuLmNhbmNlbEJ0bjpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNnB4IHJnYigwLCAwLCAwLCAwLjIpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5hZGRCdG46YWN0aXZlLFxcbi5jYW5jZWxCdG46YWN0aXZlIHtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA2cHggcmdiKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbi5uZXdQcm9qRXJyb3JDb250YWluZXIge1xcbiAgICBjb2xvcjogdmFyKC0tZXJyb3IpO1xcbiAgICBmb250LXNpemU6IDEuMXJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiA4cHg7XFxufVxcblxcbi8qIENvbnRlbnQgc3R5bGluZyAqL1xcblxcbi5jb250ZW50IHtcXG4gICAgbWFyZ2luOiAwIDAuNXJlbTtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIG1heC13aWR0aDogMTAwMHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLldlYXRoZXJBUElDb250YWludGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAwLjVyZW07XFxuICAgIG1hcmdpbjogMHJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGFuZWwpO1xcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5jb250ZW50VGl0bGUge1xcbiAgICBtYXJnaW46IDEwcHggMXJlbTtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XFxufVxcblxcbi5mb3JlY2FzdENvbnRhaW5lciB7XFxuICAgIG1heC13aWR0aDogOTUlO1xcbn1cXG5cXG4uZm9yZWNhc3RUYWJsZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5mb3JlY2FzdFJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdhcDogMC41cmVtO1xcbiAgICAvKiBlbmFibGUgaG9yaXpvbnRhbCBzY3JvbGwgKi9cXG4gICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xcbn1cXG5cXG4vKiBoaWRlIHNjcm9sbGJhciwgcmV0YWluIGZ1bmN0aW9uICovXFxuLmZvcmVjYXN0Um93Ojotd2Via2l0LXNjcm9sbGJhciB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5mb3JlY2FzdENlbGwge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDAuMjVyZW07XFxuICAgIG1pbi13aWR0aDogbWF4LWNvbnRlbnQ7XFxufVxcblxcbi8qIEZvb3RlciBzdHlsaW5nICovXFxuXFxuZm9vdGVyIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7ICovXFxuICAgIGNvbG9yOiB2YXIoLS13aGl0ZS1pc2gpO1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMTBweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuZm9vdGVyID4gYSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5naXRodWIge1xcbiAgICBoZWlnaHQ6IDI0cHg7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4uZ2l0aHViOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZykgc2NhbGUoMS4yKTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yZXNldC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Jlc2V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3Jlc2V0LmNzcydcbmltcG9ydCAnLi9zdHlsZS5jc3MnXG5pbXBvcnQgaW5pdGlhbGl6ZSBmcm9tICcuL3BhZ2VMb2FkZXInXG5pbXBvcnQgaW5pdGlhdGVTdG9yYWdlIGZyb20gJy4vbG9jYWxTdG9yYWdlJ1xuaW1wb3J0IHsgc2hvd0Zvcm0sIGhpZGVGb3JtIH0gZnJvbSAnLi9oZWxwZXJGdW5jdGlvbnMnXG5cbmluaXRpYWxpemUoKVxuaW5pdGlhdGVTdG9yYWdlKClcblxuLy8gR3JhYiBET00gZWxlbWVudHNcbmNvbnN0IGFkZExvY2F0aW9uQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZExvY2F0aW9uQnRuJylcbmNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWxCdG4nKVxuXG4vLyBFdmVudCBsaXN0ZW5lcnNcbmFkZExvY2F0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0Zvcm0pXG5cbmNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaGlkZUZvcm0oKVxufSlcbiJdLCJuYW1lcyI6WyJhZGRpdGlvbkljb24iLCJkZWxldGVJY29uIiwibWVudUljb24iLCJkb2N1bWVudCIsImNvb2tpZSIsImNyZWF0ZU1lbnVJY29uIiwibGkiLCJjaGVja2xpc3RJY29uIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlTGlzdGluZyIsImxvY2F0aW9uTmFtZSIsImkiLCJ3YXRjaGxpc3QiLCJxdWVyeVNlbGVjdG9yIiwibG9jYXRpb24iLCJjbGFzc0xpc3QiLCJhZGQiLCJzZWxlY3RlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJzZWxlY3RMb2NhdGlvbiIsImxvY2F0aW9uVGV4dCIsInRleHRDb250ZW50IiwibmFtZSIsImNyZWF0ZURlbGV0ZUljb24iLCJkaXNwbGF5V2F0Y2hsaXN0Iiwib2xkTGlzdGluZ0NvdW50IiwiY2hpbGRFbGVtZW50Q291bnQiLCJmaXJzdENoaWxkIiwicmVtb3ZlIiwic3RvcmFnZVdhdGNobGlzdCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJmb3JFYWNoIiwic3VibWl0TG9jYXRpb24iLCJpbnB1dCIsIm5ld0xvY2F0aW9uIiwicHVzaCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJkaXNwbGF5V2VhdGhlciIsIm5ld1dlYXRoZXJDYXJkIiwiY29udGVudFRpdGxlIiwiY2l0eSIsImNvdW50cnkiLCJBUElJbWFnZSIsIndlYXRoZXJJY29uIiwid2VhdGhlckRlc2NyaXB0aW9uIiwiaW5uZXJUZXh0IiwidGVtcENvbnRhaW5lciIsIk1hdGgiLCJyb3VuZCIsInRlbXBDdXJyZW50IiwibG93VGVtcENvbnRhaW5lciIsInRlbXBMb3ciLCJoaWdoVGVtcENvbnRhaW5lciIsInRlbXBIaWdoIiwidGltZUNvbnRhaW5lciIsImxvY2FsRGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsInN1bnJpc2VDb250YWluZXIiLCJzdW5yaXNlIiwic3Vuc2V0Q29udGFpbmVyIiwic3Vuc2V0Iiwid2luZENvbnRhaW5lciIsIndpbmRTcGVlZCIsIndpbmREaXJlY3Rpb24iLCJ3aW5kRGVncmVlIiwiaHVtaWRpdHlDb250YWluZXIiLCJodW1pZGl0eSIsImRpc3BsYXlGb3JlY2FzdCIsIm5ld0hvdXJseUZvcmVjYXN0QXJyYXkiLCJmb3JlY2FzdFJvdyIsIm9sZEZvcmVjYXN0IiwibGVuZ3RoIiwiZm9yZWNhc3RDZWxsIiwiZm9yZWNhc3REYXRlIiwiZGF0ZSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImZvcmVjYXN0VGltZSIsInRvTG9jYWxlVGltZVN0cmluZyIsIndlYXRoZXJGb3JlY2FzdEljb24iLCJmb3JlY2FzdFdlYXRoZXJEZXNjcmlwdGlvbiIsImZvcmVjYXN0VGVtcCIsInRlbXBlcmF0dXJlIiwiQVBJQ2l0eVNlYXJjaCIsImdldEF0dHJpYnV0ZSIsInNlbGVjdGVkTG9jYXRpb25JZCIsImNyZWF0ZUFkZEJ1dHRvbiIsImNvbnRhaW5lciIsImFkZEJ0biIsInZhbGlkYXRlU2VhcmNoIiwiY3JlYXRlQ2FuY2VsQnV0dG9uIiwiY2FuY2VsQnRuIiwiY3JlYXRlRm9ybSIsImZvcm0iLCJmb3JtUm93MSIsIm5ld0xvY2F0aW9uSW5wdXQiLCJwbGFjZWhvbGRlciIsImZvcm1Sb3cyIiwiZm9ybVJvdzMiLCJzaG93Rm9ybSIsImFkZExvY2F0aW9uQnRuIiwiYWRkTG9jYXRpb25Gb3JtIiwiaGlkZUZvcm0iLCJkZWxldGVXYXRjaGxpc3RFbnRyeSIsImRvb21lZEluZGV4Iiwic3BsaWNlIiwibmV3RGVsZXRlSWNvbiIsInRyYXNoSWNvbiIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVBZGRpdGlvbkljb24iLCJuZXdBZGRpdGlvbkljb24iLCJ0b0RpcmVjdGlvbiIsImRlZ3JlZSIsImNhbGNDdXJyZW50VGltZSIsInRpbWV6b25lIiwiZCIsIkRhdGUiLCJsb2NhbFRpbWUiLCJnZXRUaW1lIiwibG9jYWxPZmZzZXQiLCJnZXRUaW1lem9uZU9mZnNldCIsInV0YyIsIm5ld0NpdHkiLCJjYWxjU3VuVGltZSIsInRpbWUiLCJmZXRjaEhvdXJseUZvcmVjYXN0IiwiY2l0eVF1ZXJ5IiwibmV3UHJvakVycm9yQ29udGFpbmVyIiwiZmV0Y2giLCJtb2RlIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm5ld0hvdXJseUZvcmVjYXN0IiwibGlzdCIsImR0X3R4dCIsImRhdGVUZXh0IiwibWFpbiIsInJhaW5DaGFuY2UiLCJwb3AiLCJ0ZW1wIiwid2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXIiLCJkZXNjcmlwdGlvbiIsImljb24iLCJ3aW5kIiwiZGVnIiwid2luZEd1c3QiLCJndXN0Iiwic3BlZWQiLCJjYXRjaCIsImVyciIsImZldGNoQ3VycmVudFdlYXRoZXIiLCJzeXMiLCJ0ZW1wX21heCIsInRlbXBfbWluIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsImluaXRpYXRlU3RvcmFnZSIsInN0b3JhZ2VXYXRjaGxpc3RBcnJheSIsImdpdGh1Ykljb24iLCJsb2dvSWNvbiIsImNyZWF0ZUhlYWRlciIsImhlYWRlciIsImxvZ28iLCJ0aXRsZSIsImNyZWF0ZU1lbnUiLCJtZW51Iiwid2F0Y2hsaXN0SGVhZGVyIiwiYWRkTG9jYXRpb25Db250YWluZXIiLCJhZGRMb2NhdGlvbiIsImFkZExvY2F0aW9uVGV4dCIsIm1ldGhvZCIsImNyZWF0ZVdlYXRoZXJDYXJkIiwiV2VhdGhlckFQSUNvbnRhaW50ZXIiLCJBUElUaXRsZSIsImRlc2NyaXB0aW9uQ29udGFpbmVyIiwiaGlnaExvd0NvbnRhaW5lciIsInN1bnJpc2VTdW5zZXRDb250YWluZXIiLCJmb3JlY2FzdENvbnRhaW5lciIsImZvcmVjYXN0VGl0bGUiLCJmb3JlY2FzdFRhYmxlIiwic2Nyb2xsTGVmdCIsImRlbHRhWSIsImNyZWF0ZUNvbnRlbnQiLCJjb250ZW50IiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiY29weXJpZ2h0IiwiZ2V0RnVsbFllYXIiLCJnaXRodWJMaW5rIiwiaHJlZiIsIm5ld0dpdGh1Ykljb24iLCJpbml0aWFsaXplIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=