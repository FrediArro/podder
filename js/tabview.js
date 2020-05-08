document.addEventListener('keydown', handleKeyDown);

const tabs = $("div.kui-tab").find("p.kui-tab-text");
var contentList = getContentList("div#page-0 [tabindex]");
var inputFields = $("div.kui-input-holder input");
var tab_index = 0;
tabNavigation();

function handleKeyDown(evt) {
    var inputFocused = ($(inputFields[tab_index]).is(":focus"));
    var inputValue =  ($(inputFields[tab_index]).val());
    if (!inputFocused || (inputFocused && (inputValue.length===0))) {
        switch (evt.key) {
            case "ArrowLeft":
                if ($("div#page-0").css("display") === "none") {
                    $("div#page-1").css("display", "none");
                    $("div#page-0").css("display", "block");
                    contentList = $("div#page-0 [tabindex]");
                    tab_index -= 1;
                    tabNavigation("left");
                    i_content = 1;
                    $("div#page-0 li:first").focus()
                }
                break;

            case "ArrowRight":
                if ($("div#page-1").css("display") === "none") {
                    $("div#page-0").css("display", "none");
                    $("div#page-1").css("display", "block");
                    contentList = $("div#page-1 [tabindex]");
                    tab_index += 1;
                    i_content = 1;
                    tabNavigation("right");
                    $("div#page-1 li:first").focus()
                }
                break;
        }
    }
    else {
        switch (evt.key) {
            case "Enter":
                search(inputValue)
        }
    }
}

function tabNavigation(direction) {
    if (direction=="right") {
        $(tabs[tab_index-1]).addClass("kui-tab-text").removeClass("kui-tab-text-selected");
    }
    else {
        $(tabs[tab_index+1]).addClass("kui-tab-text").removeClass("kui-tab-text-selected");
    }
    $(tabs[tab_index]).addClass("kui-tab-text-selected").removeClass("kui-tab-text");
}

//https://stackoverflow.com/questions/31227882/how-to-get-specific-value-from-itunes-api-using-javascript
function  search(input) {
    $.ajax({
        dataType: "json",
        url: "https://itunes.apple.com/search?media=podcast&term=" + input + "&limit=10",
        data: 'json',
        success: function ( response ) {
            var results = response.results;
            generateList(results)
        }
    })

}

//generates new to the view
function generateList(results) {
    var listNumber = 2;
    var resultsList = ($("#tab-"+ tab_index));
    $(resultsList).children("li").slice(1).remove();
    for (i=0; i<results.length; i++) {
        var podcastName = results[i].trackName;
        var artistName =results[i].artistName;
        var artworkUrl = results[i].artworkUrl30;
        var feedUrl = results[i].feedUrl;
        var itunesId = results[i].trackId;
        $(resultsList).append("<li tabindex=\""+listNumber+"\" href=\'" + feedUrl + "\' id=\""+ itunesId +"\"'>" +
            "<div class=\"kui-list-img\" style=\'background-image: url(" + artworkUrl+ ") \'></div>\n" +
            "<div class=\"kui-list-cont\">\n" +
            "<p class=\"kui-pri\">"+podcastName+"</p>\n" +
            "<p class=\"kui-sec\" style=\'text-align: left\'>"+artistName+"</p>\n" +
            "</div>\n" +
            "</li>");
        listNumber += 1
    }
    contentList = getContentList("div#page-"+ tab_index +" [tabindex]");
    if (contentList.length > 1){
        contentList[1].focus()
    }
}

//Makes the text length right for the screen width
function  textLength(text, number) {
    text = text.substring(0, number) + "...";
    return text
}

//Update content list
function getContentList(id) {
    return $(id);
}

