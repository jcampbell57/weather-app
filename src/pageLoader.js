import logoIcon from './assets/logoIcon.svg'
import APICitySearch from './weatherAPI'

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

const createMenu = () => {}

const createWeatherAPI = () => {
    // create Weather API container
    const WeatherAPIContainter = document.createElement('div')
    WeatherAPIContainter.classList.add('WeatherAPIContainter', 'content')
    // WeatherAPIContainter.id = '';

    // create API image container
    // const APIImageContainer = document.createElement('div');
    // APIImageContainer.classList.add('APIImageContainer');

    // create API img
    const APIImage = document.createElement('img')
    APIImage.classList.add('APIImage')

    // search input
    const APISearchInput = document.createElement('input')
    APISearchInput.classList.add('APISearchInput')
    APISearchInput.placeholder = 'Seattle'

    // search button
    const APISearchBtn = document.createElement('div')
    APISearchBtn.classList.add('APISearchBtn')
    APISearchBtn.innerText = 'Search'
    APISearchBtn.addEventListener('click', APICitySearch)

    // error container
    const APIErrorContainer = document.createElement('div')
    APIErrorContainer.classList.add('APIErrorContainer')

    // Append
    // APIImageContainer.appendChild(APIImage);
    WeatherAPIContainter.appendChild(APISearchInput)
    WeatherAPIContainter.appendChild(APISearchBtn)
    WeatherAPIContainter.appendChild(APIErrorContainer)
    WeatherAPIContainter.appendChild(APIImage)
    // WeatherAPIContainter.appendChild(APIImageContainer);
    // container.appendChild(WeatherAPIContainter);

    return WeatherAPIContainter
}

const createContent = () => {
    // create content container
    const contentContainter = document.createElement('div')
    contentContainter.classList.add('contentContainer')

    // create weather app
    contentContainter.appendChild(createWeatherAPI())

    return contentContainter
}

const createFooter = () => {}

export default function initialize() {
    document.body.appendChild(createHeader())
    document.body.appendChild(createContent())
}
