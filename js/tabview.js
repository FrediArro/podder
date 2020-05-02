document.addEventListener('keydown', handleKeyDown);

const tabs = $("div.kui-tab").find("p.kui-tab-text");
var contentList = $("div#page-0 [tabindex]");
var inputFields = $("div.kui-input-holder input");
var tab_index = 0;
tabNavigation();

function handleKeyDown(evt) {
    var inputFocused = ($(inputFields[tab_index]).is(":focus"));
    var inputValue =  ($(inputFields[tab_index]).val());
    if (!inputFocused || (inputFocused && (inputValue.length===0))) {
        switch (evt.key) {
            case "ArrowLeft":
                console.log("here");
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

