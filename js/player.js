document.addEventListener('keydown', handleKeyDown);

//Getting and updating the audio
var audio = document.getElementById("audio");
var timeline = document.getElementsByClassName("kui-player-timeline-time");
timeline = timeline[0];
audio.setAttribute('src', "https://traffic.omny.fm/d/clips/ad35d8cb-2dfe-45c8-a4f9-a68700d12423/f4d84dd7-5be7-41e6-9cd2-a68700d1647e/909f730d-8f7a-4727-935f-abb200038c22/audio.mp3?utm_source=Podcast&amp;in_playlist=eaa057d0-6a85-4191-b142-a81000e4e109&amp;t=1588637996");
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
        }
        console.log(audioDurationFormatted);
    }
    if (audioDurationFormatted.length<3){
        audioDurationFormatted.unshift("0");
    }
    console.log(audioDurationFormatted);
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
        //SKIP TO NEXT TRACK
    }
}

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
            console.log(parseInt(audioDurationFormatted[timeSelector-1]));
            if (leftValue===parseInt(audioDurationFormatted[timeSelector-1])) {
                if (value===parseInt(audioDurationFormatted[timeSelector])){
                    console.log("here");
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
            console.log("here");
            console.log(timeSelector);
            console.log(value);
            console.log(parseInt((audioDurationFormatted[timeSelector])));
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