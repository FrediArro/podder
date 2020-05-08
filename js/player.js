document.addEventListener('keydown', handleKeyDown);

console.log(document.referrer);

//Getting and updating information about the playing podcast.
var episodeName = getUrlParameter("?episode");
var podcastName = getUrlParameter("artist");
var audioUrl = getUrlParameter("src");
var artworkURL = getUrlParameter("artwork");
var audio = document.getElementById("audio");
var thumbnail = document.getElementById("thumbnail");
var timeline = document.getElementsByClassName("kui-player-timeline-time");
timeline = timeline[0];
audio.setAttribute('src', audioUrl);
if (artworkURL === 'undefined') {
    $(".kui-player-thumbnail").css('background-color', "gray");
}
else {
    thumbnail.setAttribute('src', artworkURL);
}

$("#episode-name").text(episodeName);
$("#podcast-name").text(podcastName);
var playing = false;

//Updating total timestamp
var audioDuration = 0;
var audioDurationFormatted = "";
audio.onloadedmetadata = function() {
    audioDuration = audio.duration;
    audioDurationFormatted = formatTime(audioDuration);
    audioDurationFormatted = audioDurationFormatted.split(":");
    for (i=0; i<audioDurationFormatted.length; i++) {
        if (audioDurationFormatted[i].charAt(0)=="0") {
            audioDurationFormatted[i] = audioDurationFormatted[i].charAt(1);
        };
    }
    if (audioDurationFormatted.length<3){
        audioDurationFormatted.unshift("0");
    }
    document.getElementById("time-total").innerText = formatTime(audioDuration);
};

//Updating timestamp and timeline
//Sourced from https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_av_event_timeupdate
audio.ontimeupdate = function() {updateTime()};

//Options menu variables
var middleRow = $("ul.kui-time-value [tabindex]");
var optionsVisible = false;
var timeSelector = 1;

//Keypress functions
function RIGHT() {
    if (optionsVisible){
        if (timeSelector<2){
            timeSelector += 1;
            middleRow[timeSelector].focus()
        }
    }
    else {
        var db;
        var request = window.indexedDB.open("podderDatabase", 1);
        request.onerror = function (event) {
            console.log("Why didn't you allow my web app to use IndexedDB?!");
        };
        request.onsuccess = function (event) {
            db = event.target.result;
            let tx = db.transaction(["queue"], "readwrite");
            let store = tx.objectStore("queue");
            let all = store.getAll();
            tx.oncomplete = function (event) {
                db = all.result;
                console.log("here");
                var episode = (db[0].name).substring(0,(db[0].name).length-1);
                var author = db[0].author;
                var feed_url = db[0].feed_url;
                var logo_url = db[0].logo_url;
                console.log(episode);
                console.log("player.html?episode=" + episode + "]&src=" + feed_url + "]&artwork=" + logo_url + "]&artist=" + author);
                window.location.href = "player.html?episode=" + episode + "]&src=" + feed_url + "]&artwork=" + logo_url + "]&artist=" + author;
                }
            }
        }
};

function LEFT() {
    if (optionsVisible){
        if (timeSelector>0){
            timeSelector -= 1;
            middleRow[timeSelector].focus()
        }
    }
    else {
        //GO TO PREVIOUS TRACK
    }
}

function DOWN() {
    if (optionsVisible){
        var value = parseInt(($(middleRow[timeSelector]).children("p")).text());
        if (timeSelector>=1) {
            var leftValue = parseInt(($(middleRow[timeSelector-1]).children("p")).text());
        if (value === 0) {
            if (leftValue===parseInt(audioDurationFormatted[timeSelector-1])){
                ($(middleRow[timeSelector]).children("p")).text(audioDurationFormatted[timeSelector]);
            }
            else{
                ($(middleRow[timeSelector]).children("p")).text(59);
            }
        }
        else {
            ($(middleRow[timeSelector]).children("p")).text(value-1);
        }
        }
        else {
            if (value === 0) {
                ($(middleRow[timeSelector]).children("p")).text(audioDurationFormatted[timeSelector]);
            }
            else {
                ($(middleRow[timeSelector]).children("p")).text(value-1);
            }
        }
    }
    else {
        //VOLUME CONTROL
    }
}

function UP() {
    if (optionsVisible){
        var value = parseInt(($(middleRow[timeSelector]).children("p")).text());
        if (timeSelector>=1) {
            var leftValue = parseInt(($(middleRow[timeSelector-1]).children("p")).text());
            if (leftValue===parseInt(audioDurationFormatted[timeSelector-1])) {
                if (value===parseInt(audioDurationFormatted[timeSelector])){
                    ($(middleRow[timeSelector]).children("p")).text(0);
                }
                else{
                    if (value === 59) {
                        ($(middleRow[timeSelector]).children("p")).text(0);
                    }
                    else {
                        ($(middleRow[timeSelector]).children("p")).text(value+1);
                    }

                }
            }
            else {
                if (value === 59) {
                    ($(middleRow[timeSelector]).children("p")).text(0);
                }
                else {
                    ($(middleRow[timeSelector]).children("p")).text(value+1);
                }
            }
        }
        else {
            if (value === parseInt((audioDurationFormatted[timeSelector]))) {
                ($(middleRow[timeSelector]).children("p")).text(0);
            }
            else {
                ($(middleRow[timeSelector]).children("p")).text(value + 1);
            }
        }
    }
    else {
        //VOLUME CONTROL
    }
}

function LSK() {
    window.location.href = "queue.html"
}

function RSK() {
    if ($("div.kui-option-menu").css("display")==="none") {
        $("div.kui-option-menu").css("display", "block");
        $("div.kui-option-menu-background").css("display", "block");
        optionsVisible = true;
        $( ".kui-text-center" ).text("SELECT");
        $( ".kui-text-right" ).text("");
        middleRow[1].focus();

    }
    else {
        hideOptions();
    }
}

function CSK() {
    if (optionsVisible) {
        var hours = parseInt(($(middleRow[0]).children("p")).text());
        var minutes = parseInt(($(middleRow[1]).children("p")).text());
        var seconds = parseInt(($(middleRow[2]).children("p")).text());
        var timestamp = hours * 3600 + minutes * 60 + seconds;
        audio.currentTime = timestamp;
        hideOptions()
    }
    else {
        if (!playing) {
            audio.play();
            playing = true;
            $( ".kui-text-center" ).text("PAUSE");
        }
        else {
            audio.pause();
            playing = false;
            $( ".kui-text-center" ).text("PLAY");
        }
    }
}

//button press handler
function handleKeyDown(evt) {
    switch (evt.key) {
        case "ArrowRight":
            RIGHT();
            break;

        case "ArrowLeft":
            LEFT();
            break;

        case "ArrowUp":
            UP();
            break;

        case "ArrowDown":
            DOWN();
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
        case "-":
            RSK();
            break;

        case 'Enter':
            CSK();
            break;

        case 'Backspace':
            if (optionsVisible) {
                hideOptions()
            }
            else {
            evt.preventDefault();
            window.history.back();
            }
            break;
    }
}


function updateTime() {
    var time = audio.currentTime;
    width = (time / audioDuration)*100;
    document.getElementById("current-time").innerText = formatTime(audio.currentTime);
    timeline.setAttribute("style", "width:" + width + "%")
}

// seconds converter
// Author: standup75
// Source: https://stackoverflow.com/questions/4605342/how-to-format-html5-audios-currenttime-property-with-javascript
function formatTime(seconds) {
    if (audioDuration > 3600) {
        hours = Math.floor(seconds / 3600);
        hours = (hours >= 10) ? hours : "0" + hours;
    }
    else {
        hours = 0;
    }
    minutes = Math.floor((seconds-hours*3600) / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours === 0){
        return minutes + ":" + seconds;
    }
    else {
        return hours + ":" + minutes + ":" + seconds;
    }
}

//Update skip to values
function updateSkipTo(formatted) {
    formatted.reverse();
    for (i=0; i<formatted.length; i++){
        ($(middleRow[2-i]).children("p")).text(formatted[i])
    }
}

function hideOptions() {
    $("div.kui-option-menu").css("display", "none");
    $("div.kui-option-menu-background").css("display", "none");
    optionsVisible = false;
    timeSelector = 1;
    $( ".kui-text-right" ).text("Skip to");
    if (playing) {
        $( ".kui-text-center" ).text("PAUSE");
    }
    else {
        $( ".kui-text-center" ).text("PLAY");
    }
}

//Function for getting parameters from URL
//Author: Virenda
// Source: http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function getUrlParameter(sParam) {
    var sPageURL = window.location.href;
    sPageURL = sPageURL.substring(sPageURL.indexOf("?"), sPageURL.length);
    var sURLVariables = sPageURL.split("]&");

    for (i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}