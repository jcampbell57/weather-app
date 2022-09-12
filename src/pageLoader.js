import {
    createAdditionIcon,
    createForm,
    // displayWatchlist,
} from './helperFunctions'
import githubIcon from './assets/GitHub-light-32px.png'
import logoIcon from './assets/logoIcon.svg'

const createHeader = () => {
    const header = document.createElement('header')

    // display logo
    const logo = document.createElement('img')
    logo.src = logoIcon
    logo.target = '_blank'
    logo.setAttribute('class', 'logo')
    header.appendChild(logo)

    // display title
    const title = document.createElement('h1')
    title.textContent = 'Weatherserve'
    header.appendChild(title)

    return header
}

const createMenu = () => {
    const menu = document.createElement('div')
    menu.setAttribute('class', 'menu')

    // create watchlist header
    const watchlistHeader = document.createElement('p')
    watchlistHeader.setAttribute('class', 'watchlistHeader')
    watchlistHeader.textContent = 'Watchlist'

    // create watchlist menu
    const watchlist = document.createElement('ul')
    watchlist.setAttribute('class', 'watchlist')
    watchlist.setAttribute('id', 'watchlist')

    // displayWatchlist()

    // Generate add location container
    const addLocationContainer = document.createElement('ul')
    addLocationContainer.setAttribute('class', 'watchlist')

    // Generate add location button
    const addLocation = document.createElement('li')
    addLocation.setAttribute('class', 'addLocationBtn')
    createAdditionIcon(addLocation)
    const addLocationText = document.createElement('span')
    addLocationText.innerText = 'Add Location'
    addLocation.appendChild(addLocationText)
    addLocationContainer.appendChild(addLocation)

    // Generate and hide new location form
    const addLocationForm = document.createElement('form')
    addLocationForm.setAttribute('class', 'addLocationForm')
    addLocationForm.setAttribute('id', 'hidden')
    addLocationForm.method = 'get'
    createForm(addLocationForm)
    addLocationContainer.appendChild(addLocationForm)

    menu.appendChild(watchlistHeader)
    menu.appendChild(watchlist)
    menu.appendChild(addLocationContainer)

    return menu
}

const createWeatherCard = () => {
    // create Weather API container
    const WeatherAPIContainter = document.createElement('div')
    WeatherAPIContainter.classList.add('WeatherAPIContainter', 'content')

    // create API title
    const APITitle = document.createElement('h3')
    APITitle.classList.add('contentTitle')
    APITitle.innerText = 'Weatherserve'

    // create API img
    const APIImage = document.createElement('img')
    APIImage.classList.add('APIImage')

    // create description container
    const descriptionContainer = document.createElement('span')
    descriptionContainer.classList.add('weatherDescription')

    // create current temp container
    const tempContainer = document.createElement('span')
    tempContainer.classList.add('tempContainer')

    // create high/low temp container
    const highLowContainer = document.createElement('div')
    highLowContainer.classList.add('highLowContainer')

    const lowTempContainer = document.createElement('span')
    lowTempContainer.classList.add('lowTempContainer')
    highLowContainer.appendChild(lowTempContainer)

    const highTempContainer = document.createElement('span')
    highTempContainer.classList.add('highTempContainer')
    highLowContainer.appendChild(highTempContainer)

    // create current time container
    const timeContainer = document.createElement('span')
    timeContainer.classList.add('timeContainer')

    // create sunrise/sunset container
    const sunriseSunsetContainer = document.createElement('div')
    sunriseSunsetContainer.classList.add('sunriseSunsetContainer')

    const sunriseContainer = document.createElement('span')
    sunriseContainer.classList.add('sunriseContainer')
    sunriseSunsetContainer.appendChild(sunriseContainer)

    const sunsetContainer = document.createElement('span')
    sunsetContainer.classList.add('sunsetContainer')
    sunriseSunsetContainer.appendChild(sunsetContainer)

    // create wind container
    const windContainer = document.createElement('span')
    windContainer.classList.add('windContainer')

    // create humidity container
    const humidityContainer = document.createElement('span')
    humidityContainer.classList.add('humidityContainer')

    // create forecast container
    const forecastContainer = document.createElement('div')
    forecastContainer.classList.add('forecastContainer')

    const forecastTitle = document.createElement('span')
    forecastTitle.classList.add('forecastTitle')
    forecastTitle.innerText = 'Five day, three hour forecast:'
    forecastContainer.appendChild(forecastTitle)

    const forecastTable = document.createElement('table')
    forecastTable.classList.add('forecastTable')
    forecastContainer.appendChild(forecastTable)

    // Append
    WeatherAPIContainter.appendChild(APITitle)
    WeatherAPIContainter.appendChild(APIImage)
    WeatherAPIContainter.appendChild(descriptionContainer)
    WeatherAPIContainter.appendChild(tempContainer)
    WeatherAPIContainter.appendChild(highLowContainer)
    WeatherAPIContainter.appendChild(timeContainer)
    WeatherAPIContainter.appendChild(sunriseSunsetContainer)
    WeatherAPIContainter.appendChild(windContainer)
    WeatherAPIContainter.appendChild(humidityContainer)
    WeatherAPIContainter.appendChild(forecastContainer)

    return WeatherAPIContainter
}

const createContent = () => {
    // create content container
    const content = document.createElement('div')
    content.classList.add('content')

    // display weather card
    content.appendChild(createWeatherCard())

    return content
}

const createFooter = () => {
    const footer = document.createElement('footer')

    const copyright = document.createElement('p')
    copyright.textContent = `Copyright © ${new Date().getFullYear()} jcampbell57`

    const githubLink = document.createElement('a')
    githubLink.href = 'https://github.com/jcampbell57'
    githubLink.target = '_blank'

    const newGithubIcon = document.createElement('img')
    newGithubIcon.src = githubIcon
    newGithubIcon.setAttribute('class', 'github')

    githubLink.appendChild(newGithubIcon)
    footer.appendChild(copyright)
    footer.appendChild(githubLink)

    return footer
}

export default function initialize() {
    document.body.appendChild(createHeader())
    document.body.appendChild(createMenu())
    document.body.appendChild(createContent())
    document.body.appendChild(createFooter())
}
