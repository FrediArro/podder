var list = $("div#page-0 [tabindex]");
const tabs = $("div.kui-tab").find("p.kui-tab-text");




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
        $('li[tabindex='+i+']').focus()

    }

    if(param == "up" && i > 0)
    {
        if (i == 1){
            i = list.length
        }
        else {
            i--
        }
        $('li[tabindex='+i+']').focus()
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


function clickclick()
{
    var $focused = $(':focus');
    $("div#output").text("you clicked on: "+$focused.text())
}




//////////////////////////
////KEYPAD TRIGGER////////////
/////////////////////////



function handleKeyDown(evt) {


    switch (evt.key) {


        case 'Enter':
            clickclick();
            break;


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




    }

}


function inputField() {
    if ($(list[i-1]).find('div.kui-input-holder').length !== 0) {
        var field = $(list[i-1]).find('div.kui-input-holder').find('input').focus();
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