var list = $("div#page-0 [tabindex]");
const tabs = $("div.kui-tab").find("p.kui-tab-text");
const options = $("ul.kui-options li");




////////////////////////
//NAVIGATION
/////////////////////////
var i = 1;
var tab_index = 0;

tabNavigation();
inputField();


function nav (param) {
    if(param == "down" && i <= list.length)
    {
        if (i == list.length)
        {
            i = 1
        }
        else {
            i++
        }
        $(list[i-1]).focus();

    }

    if(param == "up" && i > 0)
    {
        if (i == 1){
            i = list.length
        }
        else {
            i--
        }
        $(list[i-1]).focus();
    }
    if(param == "left")
    {
        if ($("div#page-0").css("display")=="none"){
            $("div#page-1").css("display","none");
            $("div#page-0").css("display","block");
            list = $("div#page-0 [tabindex]");
            tab_index -= 1;
            tabNavigation("left");
            i = 1;
            $("div#page-0 li:first").focus()
        }
    }

    if(param == "right")
    {
        if ($("div#page-1").css("display")=="none") {
            $("div#page-0").css("display","none");
            $("div#page-1").css("display","block");
            list = $("div#page-1 [tabindex]");
            tab_index += 1;
            i = 1;
            tabNavigation("right");
            $("div#page-1 li:first").focus()
        }
    }
    inputField()
}


function CSK() {
    window.history.back();
}

function LSK() {
    window.location.href = "player.html"
}

function RSK() {
    if ($("div.kui-option-menu").css("display")==="none") {
        $("div.kui-option-menu").css("display", "block");
        $("div.kui-option-menu-background").css("display", "block");
        console.log(options.length);
        console.log(options[0]);
        $(options[0]).focus();

    }
    else {
        $("div.kui-option-menu").css("display", "none");
        $("div.kui-option-menu-background").css("display", "none");
    }
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

        case 'Enter':
            CSK();
            break;

        case 'SoftLeft':
            LSK();
            break;

        //computer use
        case 'a':
            LSK();
            break;


        case 'SoftRight':
            RSK();
            break;

        //computer use
        case 'd':
            RSK();
            break;
    }

}


function inputField() {
    if ($(list[i-1]).find('div.kui-input-holder').length !== 0) {
        $(list[i-1]).find('div.kui-input-holder').find('input').focus();
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


document.addEventListener('keydown', handleKeyDown);