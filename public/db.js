const indexdb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
let db
const request = indexdb.open("budget", 1)
request.onupgradeneeded = ({ target }) => {let db = target.result
db.createObjectStore("pending", {autoIncrement: true})}
// request on success
// request on error
// function to save records
// function to check database
    // are we connected to database
        // if so, save to database
// eventlistener to call check database