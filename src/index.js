import './reset.css'
import './style.css'
import initialize from './pageLoader'
import initiateStorage from './localStorage'
import { showForm, hideForm } from './helperFunctions'

initialize()
initiateStorage()

// Grab DOM elements
const addLocationBtn = document.querySelector('.addLocationBtn')
const cancelBtn = document.querySelector('.cancelBtn')

// Event listeners
addLocationBtn.addEventListener('click', showForm)

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault()
    hideForm()
})
