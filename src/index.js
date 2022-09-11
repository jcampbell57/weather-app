import './reset.css'
import './style.css'
import initialize from './pageLoader'
import initiateStorage from './localStorage'

initialize()
initiateStorage()

// Grab DOM elements
const addLocationBtn = document.querySelector('.addLocationBtn')
const addLocationForm = document.querySelector('.addLocationForm')
const cancelBtn = document.querySelector('.cancelBtn')

// Event listeners
addLocationBtn.addEventListener('click', () => {
    addLocationBtn.setAttribute('id', 'hidden')
    addLocationForm.setAttribute('id', 'showBlock')
})

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addLocationBtn.setAttribute('id', 'showBlock')
    addLocationForm.setAttribute('id', 'hidden')
})
