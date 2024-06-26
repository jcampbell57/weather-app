import { addDefaultContent, displayWatchlist } from './helperFunctions'

// Initiate storage arrays if localStorage is empty
const initiateStorage = () => {
    const storageWatchlistArray = []

    if (localStorage.storageWatchlist === undefined) {
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
