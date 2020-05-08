document.addEventListener('keydown', handleKeyDown);

var contentList = $("div#page-0 [tabindex]");
var optionsList = $("ul.kui-options li");


var i_content = 1;
var i_options = 1;



function handleKeyDown(evt) {
    var inputFocused = ($(inputFields[tab_index]).is(":focus"));
    switch (evt.key) {

        case 'SoftRight':
            i_options = 1;
            break;

        //computer use
        case '-':
            i_options = 1;
            break;

        case "Enter":
            if (!inputFocused) {
                open();
            }
    }
    inputField()
}


function inputField() {
    if ($(contentList[i_content-1]).find('div.kui-input-holder').length !== 0) {
        $(contentList[i_content-1]).find('div.kui-input-holder').find('input').focus();
    }
}

//Opens the podcast view
function open() {
    var focused =  $(":focus");
    var name = $(focused).find(".kui-pri").text();
    var itunesid = $(focused).attr("id");
    var feedUrl = $(focused).attr("href");
    console.log(itunesid);
    console.log(feedUrl);
    window.location.href = "podcast.html?name=" + name + "&rss=" + feedUrl;
}