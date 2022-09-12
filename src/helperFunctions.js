import additionIcon from './assets/plus.svg'
import deleteIcon from './assets/delete.svg'
import menuIcon from './assets/menuIcon.svg'

document.cookie = 'SameSite=Lax'

const createMenuIcon = (li) => {
    const checklistIcon = document.createElement('img')
    checklistIcon.src = menuIcon
    checklistIcon.setAttribute('class', 'icon')
    li.appendChild(checklistIcon)
}

// Add single location to watchlist (called below)
const createListing = (locationName, i) => {
    const watchlist = document.querySelector('#watchlist')

    const location = document.createElement('li')
    location.classList.add(`location`)
    location.setAttribute('id', `${i}`)
    // assign class to selected location listing
    if (locationName.selected === 'true') {
        location.classList.add('selected')
        // selectLocation(location)
    }

    // event listener to display selected location's weather
    location.addEventListener('click', (e) => {
        // if deleting listing, do not display weather
        if (e.target.classList.contains('deleteItem')) {
            return
        }
        selectLocation(location)
    })

    createMenuIcon(location)
    const locationText = document.createElement('span')
    locationText.textContent = locationName.name
    location.appendChild(locationText)
    createDeleteIcon(location, i)
    watchlist.appendChild(location)
}

// Display entire array of locations to watchlist
const displayWatchlist = () => {
    // Grab watchlist
    const watchlist = document.querySelector('#watchlist')

    // Clear location listings
    const oldListingCount = watchlist.childElementCount
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < oldListingCount; i++) {
        watchlist.firstChild.remove()
    }

    // Append all locations to watchlist
    let i = 0
    const storageWatchlist = JSON.parse(
        localStorage.getItem('storageWatchlist')
    )
    // console.log(storageWatchlist)
    storageWatchlist.forEach((location) => {
        createListing(location, i)
        // eslint-disable-next-line no-plusplus
        i++
    })
}

const submitLocation = (input) => {
    // create location object
    const newLocation = {
        name: input,
        selected: true,
    }

    // grab array from storage
    const storageWatchlist = JSON.parse(
        localStorage.getItem('storageWatchlist')
    )

    // deselect previously selected location
    storageWatchlist.forEach((location) => {
        if (location.selected === true) {
            location.selected = false
        }
    })

    // push location to array
    storageWatchlist.push(newLocation)
    // console.log(storageWatchlist)

    // set array back into storage
    localStorage.setItem('storageWatchlist', JSON.stringify(storageWatchlist))

    // refresh watchlist
    displayWatchlist()
}

const displayWeather = (newWeatherCard) => {
    // display content title
    const contentTitle = document.querySelector('.contentTitle')
    contentTitle.textContent = `${newWeatherCard.city}, ${newWeatherCard.country}`

    // display weather icon
    const APIImage = document.querySelector('.APIImage')
    APIImage.src = `http://openweathermap.org/img/wn/${newWeatherCard.weatherIcon}@2x.png`

    // display description
    const weatherDescription = document.querySelector('.weatherDescription')
    weatherDescription.innerText = newWeatherCard.weatherDescription

    // display current temperature
    const tempContainer = document.querySelector('.tempContainer')
    tempContainer.innerText = `${Math.round(newWeatherCard.tempCurrent)}\u00B0`

    // display high/low temperatures
    const lowTempContainer = document.querySelector('.lowTempContainer')
    lowTempContainer.innerText = `Low: ${Math.round(
        newWeatherCard.tempLow
    )}\u00B0`
    const highTempContainer = document.querySelector('.highTempContainer')
    highTempContainer.innerText = `High: ${Math.round(
        newWeatherCard.tempHigh
    )}\u00B0`

    // diplay current time
    const timeContainer = document.querySelector('.timeContainer')
    timeContainer.innerText = `Local time: ${newWeatherCard.localDate.getHours()}:${newWeatherCard.localDate.getMinutes()}`

    // display sunrise/sunset times
    const sunriseContainer = document.querySelector('.sunriseContainer')
    sunriseContainer.innerText = `Sunrise: ${newWeatherCard.sunrise.getHours()}:${newWeatherCard.sunrise.getMinutes()}`
    const sunsetContainer = document.querySelector('.sunsetContainer')
    sunsetContainer.innerText = `Sunset: ${newWeatherCard.sunset.getHours()}:${newWeatherCard.sunset.getMinutes()}`

    // display wind
    const windContainer = document.querySelector('.windContainer')
    windContainer.innerText = `Wind: ${Math.round(
        newWeatherCard.windSpeed
    )}mph, ${newWeatherCard.windDirection} (${newWeatherCard.windDegree}\u00B0)`

    // display humidity
    const humidityContainer = document.querySelector('.humidityContainer')
    humidityContainer.innerText = `Humidity: ${newWeatherCard.humidity}%`
}

const displayForecast = (newHourlyForecastArray) => {
    const forecastRow = document.querySelector('.forecastRow')

    // remove any forecast cells
    const oldForecast = forecastRow.childElementCount
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < oldForecast; i++) {
        forecastRow.firstChild.remove()
    }

    // Add new forecast cells
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < newHourlyForecastArray.length; i++) {
        const forecastCell = document.createElement('td')
        forecastCell.classList.add('forecastCell')

        // display date
        const forecastDate = document.createElement('span')
        forecastDate.classList.add('forecastDate')
        forecastDate.innerText = `${
            newHourlyForecastArray[i].date.getMonth() + 1
        }/${newHourlyForecastArray[i].date.getDate()}`
        forecastCell.appendChild(forecastDate)

        // display time
        const forecastTime = document.createElement('span')
        forecastTime.classList.add('forecastTime')
        forecastTime.innerText =
            newHourlyForecastArray[i].date.toLocaleTimeString()
        forecastCell.appendChild(forecastTime)

        // display weather icon
        const weatherForecastIcon = document.createElement('img')
        weatherForecastIcon.classList.add('weatherForecastIcon')
        weatherForecastIcon.src = `http://openweathermap.org/img/wn/${newHourlyForecastArray[i].weatherIcon}.png`
        forecastCell.appendChild(weatherForecastIcon)

        // display weather description
        const forecastWeatherDescription = document.createElement('span')
        forecastWeatherDescription.classList.add('forecastWeatherDescription')
        forecastWeatherDescription.innerText =
            newHourlyForecastArray[i].weatherDescription
        forecastCell.appendChild(forecastWeatherDescription)

        // display forecast temperature
        const forecastTemp = document.createElement('span')
        forecastTemp.classList.add('forecastTemp')
        forecastTemp.innerText = `${Math.round(
            newHourlyForecastArray[i].temperature
        )}\u00B0`
        forecastCell.appendChild(forecastTemp)

        forecastRow.appendChild(forecastCell)
    }
}

const selectLocation = (li) => {
    // set content title
    // const contentTitle = document.querySelector('.contentTitle')
    // contentTitle.textContent = li.innerText

    // Fetch current weather
    APICitySearch(li.innerText)

    // grab locations array from storage
    const storageWatchlist = JSON.parse(
        localStorage.getItem('storageWatchlist')
    )

    // deselect all locations
    storageWatchlist.forEach((location) => {
        if (location.selected === 'true') {
            location.selected = 'false'
        }
    })

    // Select location if one is chosen (main menu selection is handled in event listener)
    if (li.getAttribute('class') === 'location') {
        const selectedLocationId = li.getAttribute('id')
        storageWatchlist[selectedLocationId].selected = 'true'
    }

    // set locations array back into localStorage
    localStorage.setItem('storageWatchlist', JSON.stringify(storageWatchlist))

    // refresh
    displayWatchlist()
}

const createAddButton = (container) => {
    const addBtn = document.createElement('button')
    addBtn.classList.add('addBtn')
    addBtn.innerText = 'search'
    addBtn.addEventListener('click', (e) => validateSearch(e))
    container.appendChild(addBtn)
}

const createCancelButton = (container, i) => {
    const cancelBtn = document.createElement('button')
    cancelBtn.classList.add('cancelBtn')
    cancelBtn.setAttribute('id', `${i}`)
    cancelBtn.innerText = 'cancel'
    container.appendChild(cancelBtn)
}

// createForm
const createForm = (form) => {
    // row one: assign input
    const formRow1 = document.createElement('div')
    formRow1.setAttribute('class', 'formRow')
    const newLocationInput = document.createElement('input')
    newLocationInput.classList.add('newLocationInput')
    newLocationInput.placeholder = 'Florence'
    newLocationInput.name = 'newLocationInput'
    formRow1.appendChild(newLocationInput)

    // row two: submit and cancel buttons
    const formRow2 = document.createElement('div')
    formRow2.setAttribute('class', 'formRow')
    formRow2.setAttribute('id', 'formButtons')
    createAddButton(formRow2, form)
    createCancelButton(formRow2, form)

    // row three: assign error class and text
    const formRow3 = document.createElement('div')
    // formRow3.setAttribute('id', 'hidden')
    formRow3.setAttribute('class', 'newProjErrorContainer')
    // formRow3.innerText = 'Which city?'

    form.appendChild(formRow1)
    form.appendChild(formRow2)
    form.appendChild(formRow3)
}

const showForm = () => {
    const addLocationBtn = document.querySelector('.addLocationBtn')
    const addLocationForm = document.querySelector('.addLocationForm')

    addLocationBtn.setAttribute('id', 'hidden')
    addLocationForm.setAttribute('id', 'showBlock')
}

const hideForm = () => {
    const addLocationBtn = document.querySelector('.addLocationBtn')
    const addLocationForm = document.querySelector('.addLocationForm')

    addLocationBtn.setAttribute('id', 'showBlock')
    addLocationForm.setAttribute('id', 'hidden')
}

// Delete watchlist entry
const deleteWatchlistEntry = (e) => {
    // grab arrays from storage
    const storageWatchlist = JSON.parse(
        localStorage.getItem('storageWatchlist')
    )

    // Identify entry to delete
    const doomedIndex = e.target.getAttribute('id')
    // const doomedName = storageWatchlist[doomedIndex].name;

    // delete entry
    storageWatchlist.splice(doomedIndex, 1)

    // set changes to localStorage
    localStorage.setItem('storageWatchlist', JSON.stringify(storageWatchlist))

    // If doomed entry was selected, clear content display
    // const contentTitle = document.querySelector('.contentTitle');
    // const allTasksClassList = document.querySelector('.allTasks').classList
    // if (contentTitle.textContent === doomedName) {
    //     contentTitle.textContent = 'All tasks'
    //     allTasksClassList.add('selected')
    // }

    // refresh watchist
    displayWatchlist()
}

const createDeleteIcon = (container, i) => {
    // create image and assign attributes
    const newDeleteIcon = document.createElement('img')
    newDeleteIcon.src = deleteIcon
    newDeleteIcon.setAttribute('class', 'icon deleteItem')
    newDeleteIcon.setAttribute('id', `${i}`)

    // ADD EVENT LISTENER
    if (
        container.getAttribute('class') === 'location' ||
        container.classList.contains('location')
    ) {
        // Event listener to delete location
        newDeleteIcon.classList.add(
            `deleteWatchlistEntry`,
            `deleteWatchlistEntry${i}`,
            `hidden`
        )
        newDeleteIcon.addEventListener('click', (e) =>
            deleteWatchlistEntry(e, i)
        )
        // display trash icon on hover
        container.addEventListener('mouseenter', () => {
            const trashIcon = document.querySelector(
                `.deleteWatchlistEntry${i}`
            )
            trashIcon.classList.remove('hidden')
        })
        // hide trash icon
        container.addEventListener('mouseleave', () => {
            const trashIcon = document.querySelector(
                `.deleteWatchlistEntry${i}`
            )
            trashIcon.classList.add('hidden')
        })
    } else {
        console.log('this is strange')
    }
    // append to container
    container.appendChild(newDeleteIcon)
}

const createAdditionIcon = (li) => {
    const newAdditionIcon = document.createElement('img')
    newAdditionIcon.src = additionIcon
    newAdditionIcon.setAttribute('class', 'icon')
    li.appendChild(newAdditionIcon)
}

// #########################
// Openweather API Functions
// #########################

function toDirection(degree) {
    if (degree > 337.5) return 'North'
    if (degree > 292.5) return 'North West'
    if (degree > 247.5) return 'West'
    if (degree > 202.5) return 'South West'
    if (degree > 157.5) return 'South'
    if (degree > 122.5) return 'South East'
    if (degree > 67.5) return 'East'
    if (degree > 22.5) return 'North East'
    return 'North'
}

// https://stackoverflow.com/questions/62376115/how-to-obtain-open-weather-api-date-time-from-city-being-fetched
const calcCurrentTime = (timezone) => {
    const d = new Date()
    const localTime = d.getTime()
    const localOffset = d.getTimezoneOffset() * 60000
    const utc = localTime + localOffset
    const newCity = utc + 1000 * timezone
    return new Date(newCity)
}

const calcSunTime = (time, timezone) => {
    const d = new Date()
    const localOffset = d.getTimezoneOffset() * 60000
    const utc = time + localOffset
    const newCity = utc + 1000 * timezone
    return new Date(newCity)
}

// const fetchDailyForecast = (lat, lon) => {
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

const fetchHourlyForecast = (cityQuery) => {
    const newProjErrorContainer = document.querySelector(
        '.newProjErrorContainer'
    )
    // fetch five day/three hour forecast
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e`,
        { mode: 'cors' }
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            const newHourlyForecastArray = []
            // eslint-disable-next-line no-plusplus
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
                    windSpeed: response.list[i].wind.speed,
                }
                newHourlyForecastArray.push(newHourlyForecast)
            }
            console.log(newHourlyForecastArray)
            displayForecast(newHourlyForecastArray)
            return newHourlyForecastArray
        })
        .catch((err) => {
            console.log(err)
            newProjErrorContainer.innerText = 'City not found'
        })
}

const fetchCurrentWeather = (cityQuery) => {
    // const APIImage = document.querySelector('.APIImage')
    const newProjErrorContainer = document.querySelector(
        '.newProjErrorContainer'
    )

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&units=imperial&APPID=0a9fdbdfcd0f62e9bd7a200797b10d4e`,
        { mode: 'cors' }
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            // const {lat} = response.coord;
            // const {lon} = response.coord;
            // fetchDailyForecast(lat, lon);
            submitLocation(response.name)
            const newWeatherCard = {
                city: response.name,
                country: response.sys.country,
                humidity: response.main.humidity,
                localDate: calcCurrentTime(response.timezone),
                sunrise: calcSunTime(
                    response.sys.sunrise * 1000,
                    response.timezone
                ),
                sunset: calcSunTime(
                    response.sys.sunset * 1000,
                    response.timezone
                ),
                tempCurrent: response.main.temp,
                tempHigh: response.main.temp_max,
                tempLow: response.main.temp_min,
                weatherCondition: response.weather[0].main,
                weatherDescription: response.weather[0].description,
                weatherIcon: response.weather[0].icon,
                windDegree: response.wind.deg,
                windDirection: toDirection(response.wind.deg),
                windSpeed: response.wind.speed,
                windGust: response.wind.gust,
            }
            // APIImage.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
            console.log(newWeatherCard)
            displayWeather(newWeatherCard)
            return newWeatherCard
        })
        .catch((err) => {
            console.log(err)
            newProjErrorContainer.innerText = 'City not found'
        })
}

const APICitySearch = (input) => {
    fetchCurrentWeather(input)
    fetchHourlyForecast(input)
}

const validateSearch = (e) => {
    e.preventDefault()
    // grab dom elements
    const newLocationInput = document.querySelector('.newLocationInput')
    const newProjErrorContainer = document.querySelector(
        '.newProjErrorContainer'
    )
    // reset error
    newProjErrorContainer.innerText = ''
    // check for search term
    if (newLocationInput.value === '') {
        newProjErrorContainer.innerText = 'Which city?'
    } else {
        APICitySearch(newLocationInput.value)
        hideForm()
        newLocationInput.value = ''
    }
}

export {
    createAdditionIcon,
    createDeleteIcon,
    createForm,
    createMenuIcon,
    displayWatchlist,
    hideForm,
    showForm,
    submitLocation,
    validateSearch,
}
