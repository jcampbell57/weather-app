import { addDefaultContent, displayWatchlist } from './helperFunctions'

// class locations {
//     constructor(locationName) {
//         this.name = locationName
//         this.selected = selected
//     }
// }

// Initiate storage arrays if localStorage is empty
const initiateStorage = () => {
    const storageWatchlistArray = []

    if (localStorage.length === 0) {
        localStorage.setItem(
            'storageWatchlist',
            JSON.stringify(storageWatchlistArray)
        )
        addDefaultContent()
    } else {
        // insert content from local storage if there is any
        displayWatchlist()
    }
}

export default initiateStorage
