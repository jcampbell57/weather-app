import { createAdditionIcon, createForm } from './helperFunctions'
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
    const APITitle = document.createElement('h2')
    APITitle.classList.add('contentTitle')
    WeatherAPIContainter.appendChild(APITitle)

    // create API img
    const APIImage = document.createElement('img')
    APIImage.classList.add('APIImage')
    WeatherAPIContainter.appendChild(APIImage)

    // create current temp container
    const tempContainer = document.createElement('h1')
    tempContainer.classList.add('tempContainer')
    WeatherAPIContainter.appendChild(tempContainer)

    // WeatherAPIContainter.appendChild(document.createElement('br'))

    // create description container
    const descriptionContainer = document.createElement('span')
    descriptionContainer.classList.add('weatherDescription')
    WeatherAPIContainter.appendChild(descriptionContainer)

    // create low temp container
    const lowTempContainer = document.createElement('span')
    lowTempContainer.classList.add('lowTempContainer')
    WeatherAPIContainter.appendChild(lowTempContainer)

    // create high temp container
    const highTempContainer = document.createElement('span')
    highTempContainer.classList.add('highTempContainer')
    WeatherAPIContainter.appendChild(highTempContainer)

    WeatherAPIContainter.appendChild(document.createElement('br'))

    // create current time container
    const timeContainer = document.createElement('span')
    timeContainer.classList.add('timeContainer')
    WeatherAPIContainter.appendChild(timeContainer)

    // create sunrise container
    const sunriseContainer = document.createElement('span')
    sunriseContainer.classList.add('sunriseContainer')
    WeatherAPIContainter.appendChild(sunriseContainer)

    // create sunset container
    const sunsetContainer = document.createElement('span')
    sunsetContainer.classList.add('sunsetContainer')
    WeatherAPIContainter.appendChild(sunsetContainer)

    WeatherAPIContainter.appendChild(document.createElement('br'))

    // create wind container
    const windContainer = document.createElement('span')
    windContainer.classList.add('windContainer')
    WeatherAPIContainter.appendChild(windContainer)

    // create humidity container
    const humidityContainer = document.createElement('span')
    humidityContainer.classList.add('humidityContainer')
    WeatherAPIContainter.appendChild(humidityContainer)

    // create forecast container
    const forecastTitle = document.createElement('h2')
    forecastTitle.classList.add('forecastTitle')
    forecastTitle.innerText = 'Five day, three hour forecast:'
    WeatherAPIContainter.appendChild(forecastTitle)

    const forecastContainer = document.createElement('div')
    forecastContainer.classList.add('forecastContainer')
    WeatherAPIContainter.appendChild(forecastContainer)

    const forecastTable = document.createElement('table')
    forecastTable.classList.add('forecastTable')
    forecastContainer.appendChild(forecastTable)

    const forecastRow = document.createElement('tr')
    forecastRow.classList.add('forecastRow')
    forecastTable.appendChild(forecastRow)

    // make scrollwheel functional with horizontal scrolling
    forecastRow.addEventListener('wheel', (e) => {
        e.preventDefault()
        forecastRow.scrollLeft += e.deltaY
    })

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
