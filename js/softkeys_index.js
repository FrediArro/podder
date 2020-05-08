document.addEventListener('keydown', handleKeyDown);

//Opening a database
//Source: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

function getDatabase() {

}

var contentList = $("div#page-0 .kui-list");


var i_content = 1;



function handleKeyDown(evt) {
    var inputFocused = ($(inputFields[tab_index]).is(":focus"));
    switch (evt.key) {

        case 'ArrowDown':
            contentListDown();
            break;


        case 'ArrowUp':
            contentListUp();
            break;

        case 'SoftLeft':
            LSK();
            break;

        //computer use
        case ',':
            LSK();
            break;


        case 'SoftRight':
            if (!inputFocused){
                RSK();
            }
            break;

        //computer use
        case "-":
            if (!inputFocused){
                RSK();
            }
            break;
    }
}

function contentListDown() {
    if (i_content === contentList.length) {
        i_content = 1
    }
    else {
        i_content++
    }
    $(contentList[i_content-1]).focus();
}

function contentListUp() {
    if (i_content===1) {
        i_content = contentList.length
    }
    else {
        i_content--;
    }
    $(contentList[i_content-1]).focus()
}

function LSK() {
    window.location.href = "player.html"
}

function RSK() {
    var focused =  $(":focus");
    var itunesId =  focused.attr("id");
    console.log(itunesId);
    var db;
    var request = window.indexedDB.open("podderDatabase", 1);
    request.onerror = function(event) {
        console.log("Why didn't you allow my web app to use IndexedDB?!");
    };
    request.onsuccess = function(event) {
        // Do something with request.result!
        db = event.target.result;
        console.log("Success");
        console.log(db);
        let tx = db.transaction(["subscribed"], "readwrite");
        let store = tx.objectStore("subscribed");
        let request = store.get(itunesId);
        request.onsuccess = function (event) {
            db = event.target.result;
            if (typeof db === 'undefined') {
                var name = $(focused).find(".kui-pri").text();
                var author = $(focused).find(".kui-sec").text();
                var feedUrl = $(focused).attr("href");
                var logoUrl = $(focused).find(".kui-list-img").css("background-image");
                var podcast = {itunesID: itunesId, name: name, author: author, feed_url: feedUrl, logo_url: logoUrl, descending: "yes"};
                console.log(podcast);
                subscribe(podcast)
            }
            else{
                unsubscribe(itunesId);
            }
        };
        request.onerror =function (event) {
            console.log("Error");
        };
        }
}

// Adding a podcast to subscribed table
//Source: https://medium.com/@AndyHaskell2013/build-a-basic-web-app-with-indexeddb-8ab4f83f8bda
function subscribe(podcast) {
    var db;
    var request = window.indexedDB.open("podderDatabase", 1);
    request.onerror = function(event) {
        console.log("Why didn't you allow my web app to use IndexedDB?!");
    };
    request.onsuccess = function(event) {
        db = event.target.result;
        let tx = db.transaction(["subscribed"], "readwrite");
        let store = tx.objectStore("subscribed");
        store.add(podcast);
        tx.oncomplete = function() {
            console.log("subscribed to " + podcast.name);
            var header = $(".kui-header");
            header.css("background-color", "green");
            header.text("Sucessfully subscribed!");
            setTimeout(function () {
                header.css("background-color", "#320374");
                header.text("podder");
            }, 4000);
        };
        tx.onerror = function(event) {
            alert('error storing note ' + event.target.errorCode);
        }
    }

}

// Removing a podcast from subscribed table
//Source: https://medium.com/@AndyHaskell2013/build-a-basic-web-app-with-indexeddb-8ab4f83f8bda
function unsubscribe(id) {
    var db;
    var request = window.indexedDB.open("podderDatabase", 1);
    request.onerror = function(event) {
        console.log("Why didn't you allow my web app to use IndexedDB?!");
    };
    request.onsuccess = function(event) {
        db = event.target.result;
        let tx = db.transaction(["subscribed"], "readwrite");
        let store = tx.objectStore("subscribed");
        store.delete(id);
        tx.oncomplete = function() {
            console.log("Subscription cancelled");
            var header = $(".kui-header");
            header.css("background-color", "#d47400");
            header.text("Subscription cancelled!");
            setTimeout(function () {
                header.css("background-color", "#320374");
                header.text("podder");
            }, 4000);
        };
        tx.onerror = function(event) {
            alert('error storing note ' + event.target.errorCode);
        }
    }
};


function generateList() {
    var listNumber = 0;
    var db;
    var request = window.indexedDB.open("podderDatabase", 1);
    request.onerror = function(event) {
        console.log("Why didn't you allow my web app to use IndexedDB?!");
    };
    request.onsuccess = function(event) {
        db = event.target.result;
        let tx = db.transaction(["subscribed"], "readwrite");
        let store = tx.objectStore("subscribed");
        let all = store.getAll();
        tx.oncomplete = function(event) {
            db = all.result;
            for (i=0; i<db.length; i++) {
                console.log(db);
                var name = db[i].name;
                var author = db[i].author;
                var feed_url = db[i].feed_url;
                var logo_url = db[i].logo_url;
                console.log("here");
                $(resultsList).append("<li tabindex=\""+listNumber+"\" href=\'" + feedUrl + "\' id=\""+ itunesId +"\"'>" +
                    "<div class=\"kui-list-img\" style=\'background-image: url(" + artworkUrl+ ") \'></div>\n" +
                    "<div class=\"kui-list-cont\">\n" +
                    "<p class=\"kui-pri\">"+podcastName+"</p>\n" +
                    "<p class=\"kui-sec\" style=\'text-align: left\'>"+artistName+"</p>\n" +
                    "</div>\n" +
                    "</li>");
                listNumber += 1
            }
            contentList = $("div#page-0 [tabindex]");
            contentList[0].focus()
        };
        tx.onerror = function(event) {
            alert('error storing note ' + event.target.errorCode);
        }
    };
}


