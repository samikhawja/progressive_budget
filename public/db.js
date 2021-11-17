const indexdb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
let db;
const request = indexdb.open("budget", 1);
request.onupgradeneeded = ({ target }) => {
    let db = target.result
db.createObjectStore("pending", {autoIncrement: true})
};

request.onerror = function(e) {
    console.log("There was an error");
};

request.onsuccess = ({ target }) => {
    db = target.result;
    if(navigator.onLine) {
        checkDb();
    }
}

const saveTransaction = () => {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    store.add()
}
