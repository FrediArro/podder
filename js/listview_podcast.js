document.addEventListener('keydown', handleKeyDown);

var name = getUrlParameter("name");
var feedUrl = getUrlParameter("rss");
var episodes = [];
var contentList = $("div#page-0 [tabindex]");
var optionsList = $("ul.kui-options li");

$("h1#name").text(name);
// https://www.htmlgoodies.com/beyond/javascript/stips/displaying-feed-content-using-jquery.html
$.ajax({
    url: feedUrl,
    type: "GET",
    success: function(response) {
    var xml = $(response);
    xml.find("item").each( function () {
        var $this = $(this),
            // list = [episode title, audiostream_url, duration, thumbnail_url]
            episode = [$this.find("title").text(),
                $this.find("enclosure").attr("url"),
                $this.find("itunes\\:duration").text(),
                $this.find("itunes\\:image").attr("href") ];
        episodes.push(episode)
    });
    generateList(episodes);
    },
    error: function(data) {
        console.log("ERROR");
        $("div.kui-error-message").css("display", "block");
    }
});


var i_content = 1;
var i_options = 1;


inputField();



function handleKeyDown(evt) {
    var optionsVisible = ($("div.kui-option-menu").css("display") === "block");
    var inputFocused = ($("input").is(":focus"));
    var errorVisible = ($(".kui-error-message").css("display") === "block");
    switch (evt.key) {
        case 'ArrowDown':
            if(optionsVisible) {optionsListDown()}
            else {contentListDown()}
            break;


        case 'ArrowUp':
            if(optionsVisible) {optionsListUp()}
            else {contentListUp()}
            break;

        case 'SoftLeft':
            LSK();
            break;

        //computer use
        case ',':
            LSK();
            break;

        case 'SoftRight':
            if (!inputFocused) {
                i_options = 1;
                RSK();
            }
            break;

        //computer use
        case '-':
            if (!inputFocused) {
                i_options = 1;
                RSK();
            }
            break;

        case "Enter":
            if (!inputFocused && !optionsVisible) {
                play();
            }
            if (optionsVisible) {
                option();
            }
            if (inputFocused) {
                search()
            }
    }
}


function inputField() {
    if ($(contentList[i_content-1]).find('div.kui-input-holder').length !== 0) {
        $(contentList[i_content-1]).find('div.kui-input-holder').find('input').focus();
    }
}

function optionsListDown() {
    if (i_options === optionsList.length) {
        i_options = 1
    }
    else {
        i_options++
    }
    $(optionsList[i_options-1]).focus();
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

function optionsListUp() {
    if (i_options===1) {
        i_options = optionsList.length
    }
    else {
        i_options--;
    }
    $(optionsList[i_options-1]).focus()
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
function generateList(results) {
    var listNumber = 2;
    var resultsList = ($("ul.kui-list")).first();
    for (i=0; i<results.length; i++) {
        var title = results[i][0];
        var audioUrl = results[i][1];
        var time = results[i][2];
        var duration = "";
        if (!time.includes(":")) {
            var hours = Math.floor(time/3600);
            if (hours < 10){
                duration += "0" + hours + ":";
            }
            else {
                duration += hours + ":"
            }
            var minutes = Math.floor((time-hours*3600)/60);
            if (minutes<10) {
                minutes = "0" + minutes
            }
            var seconds = Math.floor((time-(hours*3600)-(minutes*60)));
            if (seconds<10) {
                seconds = "0" + seconds
            }
            duration+= minutes + ":" + seconds;
        }
        else {
            duration = time;
        }
        if (i<50) {
        $(resultsList).append("<li tabindex=\""+listNumber+"\" href=\'" + audioUrl + "\'>" +
            "<div class=\"kui-list-cont\">\n" +
            "<p class=\"kui-pri episode\">"+ title +"</p>\n" +
            "<p class=\"kui-sec timestamp\">"+ duration +"</p>\n" +
            "</div>\n" +
            "</li>");
        listNumber += 1
        }
    }
    contentList = $("div#page-0 [tabindex]");
    contentList[1].focus();
    console.log(contentList.length);
}

//gets with option is highlighted
function option() {
    var focused = $(":focus");
    if (focused.attr("tabindex")==-1){
        addToQueue()
    }
    else {
        revrseOrder()
    }
}

function addToQueue() {
    var episode = episodes[i_content-2];
    var db;
    var request = window.indexedDB.open("podderDatabase", 1);
    request.onerror = function(event) {
        console.log("Why didn't you allow my web app to use IndexedDB?!");
    };
    request.onsuccess = function(event) {
        db = event.target.result;
        let tx = db.transaction(["queue"], "readwrite");
        let store = tx.objectStore("queue");
        store.add({name: episode[0], author: name, feed_url: episode[1], logo_url: episode[2]});
        tx.oncomplete = function () {
            $("div.kui-option-menu").css("display", "none");
            $("div.kui-option-menu-background").css("display", "none");
            contentList[i_content-1].focus();
            console.log("Episode added to queue" + episode[0]);
            var header = $(".kui-header");
            header.css("background-color", "green");
            header.text("Added to Q: " + episode[0]);
            setTimeout(function () {
                header.css("background-color", "#320374");
                header.text("podder");
            }, 4000);
        };
        tx.onerror = function (event) {
            alert('error storing note ' + event.target.errorCode);
        }
    }

}

function LSK() {
    window.location.href = "player.html"
}

function RSK() {
    if ($("div.kui-option-menu").css("display")==="none") {
        $("div.kui-option-menu").css("display", "block");
        $("div.kui-option-menu-background").css("display", "block");
        $("ul.kui-options li:first").focus();

    }
    else {
        $("div.kui-option-menu").css("display", "none");
        $("div.kui-option-menu-background").css("display", "none");
        contentList[i_content-1].focus();
    }
}