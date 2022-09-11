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
    }
}

// insert content from local storage if there is any

export default initiateStorage
