var contentList = $("div#page-0 [tabindex]");
var optionsList = $("ul.kui-options li");
const tabs = $("div.kui-tab").find("p.kui-tab-text");



////////////////////////
//NAVIGATION
/////////////////////////
var i_content = 1;
var i_options = 1;
var tab_index = 0;

tabNavigation();
inputField();


function nav (param) {
    var optionsVisible = ($("div.kui-option-menu").css("display") === "block");
    console.log(optionsVisible);
    if(param == "down") {
        if(optionsVisible) {optionsListDown()}
        else {contentListDown()}
        console.log(i_content)
    }

    if(param == "up") {
        if(optionsVisible) {optionsListUp()}
        else {contentListUp()}
    }
    if(param == "left")
    {
        if ($("div#page-0").css("display")=="none"){
            $("div#page-1").css("display","none");
            $("div#page-0").css("display","block");
            contentList = $("div#page-0 [tabindex]");
            tab_index -= 1;
            tabNavigation("left");
            i_content = 1;
            $("div#page-0 li:first").focus()
        }
    }

    if(param == "right")
    {
        if ($("div#page-1").css("display")=="none") {
            $("div#page-0").css("display","none");
            $("div#page-1").css("display","block");
            contentList = $("div#page-1 [tabindex]");
            tab_index += 1;
            i_content = 1;
            tabNavigation("right");
            $("div#page-1 li:first").focus()
        }
    }
    inputField()
}


//////////////////////////
////KEYPAD TRIGGER////////////
/////////////////////////



function handleKeyDown(evt) {


    switch (evt.key) {



        case 'ArrowDown':
            nav("down");
            break;


        case 'ArrowUp':
            nav("up");
            break;


        case 'ArrowLeft':
            nav("left");
            break;

        case 'ArrowRight':
            nav("right");
            break;

        case 'SoftRight':
            i_options = 1;
            break;

        //computer use
        case 'd':
            i_options = 1;
            break;

    }

}


function inputField() {
    if ($(contentList[i_content-1]).find('div.kui-input-holder').length !== 0) {
        $(contentList[i_content-1]).find('div.kui-input-holder').find('input').focus();
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



document.addEventListener('keydown', handleKeyDown);