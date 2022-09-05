import additionIcon from './assets/plus.svg'
import APICitySearch from './weatherAPI'
import deleteIcon from './assets/delete.svg'
import menuIcon from './assets/menuIcon.svg'

const setTaskFilter = (li) => {
    // set content title (filter)
    const contentTitle = document.querySelector('.contentTitle')
    contentTitle.textContent = li.innerText

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

// Display entire array of locations to watchlist
const displayWatchlist = () => {
    // Grab projects menu
    const watchlist = document.querySelector('#watchlist')

    // Clear location listings
    const oldListingCount = watchlist.childElementCount
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < oldListingCount; i++) {
        watchlist.firstChild.remove()
    }

    // Add single location to watchlist (called below)
    const createListing = (Proj, i) => {
        const location = document.createElement('li')
        location.classList.add(`location`)
        location.setAttribute('id', `${i}`)
        // assign class to selected location listing
        if (Proj.selected === 'true') {
            location.classList.add('selected')
        }

        // event listener to display selected location's weather
        location.addEventListener('click', (e) => {
            // if deleting listing, do not display weather
            if (e.target.classList.contains('deleteItem')) {
                return
            }
            setTaskFilter(location)
        })

        createMenuIcon(location)
        const locationText = document.createElement('span')
        locationText.textContent = Proj.name
        location.appendChild(locationText)
        createDeleteIcon(location, i)
        watchlist.appendChild(location)
    }

    // Append all locations to watchlist
    let i = 0
    const storageWatchlist = JSON.parse(
        localStorage.getItem('storageWatchlist')
    )
    storageWatchlist.forEach((project) => {
        createListing(project, i)
        // eslint-disable-next-line no-plusplus
        i++
    })
}

const createAddButton = (container) => {
    const addBtn = document.createElement('button')
    addBtn.setAttribute('class', 'addBtn')
    addBtn.innerText = 'submit'
    addBtn.classList.add('locationAddBtn')
    addBtn.addEventListener('click', (e) => APICitySearch(e))
    container.appendChild(addBtn)
}

const createCancelButton = (container, i) => {
    const cancelBtn = document.createElement('button')
    cancelBtn.setAttribute('class', 'cancelBtn')
    cancelBtn.setAttribute('id', `${i}`)
    cancelBtn.innerText = 'cancel'
    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault()
        displayWatchlist()
    })
    container.appendChild(cancelBtn)
}

// createForm
const createForm = (form) => {
    const formRow1 = document.createElement('div')
    formRow1.setAttribute('class', 'formRow')

    const formRow2 = document.createElement('div')
    formRow2.setAttribute('class', 'formRow')
    formRow2.setAttribute('id', 'formButtons')

    const formRow3 = document.createElement('div')
    formRow3.setAttribute('id', 'hidden')

    // row one: assign input according to class of form
    // row three: assign error class and text according to class of form
    formRow1.innerHTML =
        "<input type='text' id='newProjectInput' name='newProjectInput'></input>"
    formRow3.setAttribute('class', 'newProjErrorContainer')
    formRow3.innerText = 'Which city?'

    // row two: submit and cancel buttons
    createAddButton(formRow2, form)
    createCancelButton(formRow2, form)

    form.appendChild(formRow1)
    form.appendChild(formRow2)
    form.appendChild(formRow3)
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

const createMenuIcon = (li) => {
    const checklistIcon = document.createElement('img')
    checklistIcon.src = menuIcon
    checklistIcon.setAttribute('class', 'icon')
    li.appendChild(checklistIcon)
}

const createDeleteIcon = (container, i) => {
    // create image and assign attributes
    const newDeleteIcon = document.createElement('img')
    newDeleteIcon.src = deleteIcon
    newDeleteIcon.setAttribute('class', 'icon deleteItem')
    newDeleteIcon.setAttribute('id', `${i}`)

    // ADD EVENT LISTENER
    if (
        container.getAttribute('class') === 'project' ||
        container.classList.contains('project')
    ) {
        // Event listener to delete project
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

export {
    createAdditionIcon,
    createDeleteIcon,
    createForm,
    createMenuIcon,
    displayWatchlist,
}
