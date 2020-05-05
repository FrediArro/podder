document.addEventListener('keydown', handleKeyDown);

var contentList = $("div#page-0 [tabindex]");
var optionsList = $("ul.kui-options li");


var i_content = 1;
var i_options = 1;


inputField();



function handleKeyDown(evt) {
    var optionsVisible = ($("div.kui-option-menu").css("display") === "block");
    switch (evt.key) {
        case 'ArrowDown':
            if(optionsVisible) {optionsListDown()}
            else {contentListDown()}
            break;


        case 'ArrowUp':
            if(optionsVisible) {optionsListUp()}
            else {contentListUp()}
            break;


        case 'SoftRight':
            i_options = 1;
            break;

        //computer use
        case '-':
            i_options = 1;
            break;
    }
    inputField()
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