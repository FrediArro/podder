
var list = $("div#page-0 [tabindex]");
console.log(list.length)






$("div#page-0 li:first").focus()
////////////////////////
//NAVIGATION
/////////////////////////
var i = 1;


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
        $("div#page-1").css("display","none")
        $("div#page-0").css("display","block")
        $("div#page-0 li:first").focus()
    }

    if(param == "right")
    {
        $("div#page-0").css("display","none")
        $("div#page-1").css("display","block")
        $("div#page-1 li:first").focus()
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
            clickclick()
            break;


        case 'ArrowDown':
            nav("down")
            break;


        case 'ArrowUp':
            nav("up")
            break;


        case 'ArrowLeft':
            nav("left")
            break;

        case 'ArrowRight':
            nav("right")
            break;




    }

};


function inputField() {
    console.log("here")
    if ($(list[i-1]).find('div.kui-input-holder').length !== 0) {
        var field = $(list[i-1]).find('div.kui-input-holder').find('input').focus();
        console.log(field)
    }
}


document.addEventListener('keydown', handleKeyDown);