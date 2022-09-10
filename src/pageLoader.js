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

const createWeatherAPI = () => {
    // create Weather API container
    const WeatherAPIContainter = document.createElement('div')
    WeatherAPIContainter.classList.add('WeatherAPIContainter', 'content')
    // WeatherAPIContainter.id = '';

    // create API title
    const APITitle = document.createElement('h3')
    APITitle.classList.add('contentTitle')
    APITitle.innerText = 'Weatherserve'

    // create API image container
    // const APIImageContainer = document.createElement('div');
    // APIImageContainer.classList.add('APIImageContainer');

    // create API img
    const APIImage = document.createElement('img')
    APIImage.classList.add('APIImage')

    // Append
    WeatherAPIContainter.appendChild(APITitle)
    // APIImageContainer.appendChild(APIImage);

    WeatherAPIContainter.appendChild(APIImage)
    // WeatherAPIContainter.appendChild(APIImageContainer);
    // container.appendChild(WeatherAPIContainter);

    return WeatherAPIContainter
}

const createContent = () => {
    // create content container
    const content = document.createElement('div')
    content.classList.add('content')

    // create weather app
    content.appendChild(createWeatherAPI())

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
