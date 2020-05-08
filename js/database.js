var db;
var request = window.indexedDB.open("podderDatabase", 1);
request.onerror = function(event) {
    console.log("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
    // Do something with request.result!
    db = event.target.result;
    console.log("Success");

};

// This event is only implemented in recent browsers
request.onupgradeneeded = function(event) {
    // Save the IDBDatabase interface
    db = event.target.result;
    var subscribedTable = db.createObjectStore("subscribed", { keyPath: "itunesID" });
    subscribedTable.createIndex("name", "name", { unique: false });
    subscribedTable.createIndex("author", "author", { unique: false });
    subscribedTable.createIndex("feed_url", "feed_url", { unique: true });
    subscribedTable.createIndex("logo_url", "logo_url", { unique: true });
    subscribedTable.createIndex("descending", "descending");

    var queueTable = db.createObjectStore("queue", { autoIncrement: true });
    queueTable.createIndex("name", "name", { unique: false });
    queueTable.createIndex("author", "author", { unique: false });
    queueTable.createIndex("feed_url", "feed_url", { unique: false });
    queueTable.createIndex("logo_url", "logo_url", { unique: false });
};