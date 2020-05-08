document.addEventListener('keydown', handleKeyDown);



var name = getUrlParameter("name");
var feedUrl = getUrlParameter("rss");
var episodes = [];
var contentList = $("div#page-0 [tabindex]");
var i_content = 1;
generateList();



function handleKeyDown(evt) {
    var optionsVisible = ($("div.kui-option-menu").css("display") === "block");
    var inputFocused = ($("input").is(":focus"));
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
            RSK();
            break;

        //computer use
        case '-':
            RSK();
            break;

        case "Enter":
                play();

        case 'Backspace':
            if (!inputFocused && !optionsVisible) {
                evt.preventDefault();
                window.history.back();
                break;
            }
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

//Opens the podcast view
function play() {
    var focused =  $(":focus");
    var place = $(focused).attr("tabindex");
    var episode = episodes[place-1];
    var episodeName = episode[0];
    var audioUrl = episode[1];
    var artworkUrl = episode[3];
    window.location.href = "player.html?episode=" + episodeName + "]&src=" + audioUrl + "]&artwork=" + artworkUrl + "]&artist=" + name;
}

//Function for getting parameters from URL
//Author: Virenda
// Source: http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

//generates new to the view
function generateList() {
    var resultsList = $(".kui-list");
    var listNumber = 0;
    var db;
    var resultsList = $(".kui-list");
    var request = window.indexedDB.open("podderDatabase", 1);
    request.onerror = function(event) {
        console.log("Why didn't you allow my web app to use IndexedDB?!");
    };
    request.onsuccess = function(event) {
        db = event.target.result;
        let tx = db.transaction(["queue"], "readwrite");
        let store = tx.objectStore("queue");
        let all = store.getAll();
        tx.oncomplete = function(event) {
            db = all.result;
            console.log("here");
            for (i=0; i<db.length; i++) {
                console.log(db);
                var episode = db[i].name;
                var author = db[i].author;
                var feed_url = db[i].feed_url;
                var logo_url = db[i].logo_url;
                console.log("here");
                resultsList.append("<li tabindex=\""+listNumber+"\" href=\'" + feed_url + "\'>" +
                    "<div class=\"kui-list-cont\">\n" +
                    "<p class=\"kui-pri episode\">"+ episode +"</p>\n" +
                    "<p class=\"kui-sec timestamp\">"+ author +"</p>\n" +
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

function removeFromQueue(id) {
    var db;
    var request = window.indexedDB.open("podderDatabase", 1);
    request.onerror = function(event) {
        console.log("Why didn't you allow my web app to use IndexedDB?!");
    };
    request.onsuccess = function(event) {
        db = event.target.result;
        let tx = db.transaction(["queue"], "readwrite");
        let store = tx.objectStore("queue");
        store.store.delete(id);
        tx.oncomplete = function() {
            console.log("Removed from queue");
            //generate new list view
            var header = $(".kui-header");
            header.css("background-color", "#d47400");
            header.text("Removed from queue");
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

function LSK() {
    window.location.href = "player.html"
}

function RSK() {
    removeFromQueue(id);
}