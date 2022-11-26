let changeableContent = $(".paragraphs_holder")
let fontSizeText = $(".font-size-value")
let fontLineheightText = $(".font-lineheight-value")

$(document).ready(() => {
    $("#slider-fontsize").slider({
        min: 5,   //minimale value
        max: 40,   //maximale value
        value: 16,   //begin value
        animate: true,

        slide: (event, ui) => {

            $(changeableContent).css({
                "font-size": ui.value
            })
            $(fontSizeText).text(ui.value)
        }
    })


    $("#slider-lineheight").slider({
        min: 2,   //minimale value
        max: 7,   //maximale value
        value: 2,   //begin value
        animate: true,

        slide: (event, ui) => {

            $(changeableContent).css({
                "line-height": ui.value
            })
            $(fontLineheightText).text(ui.value)
        }
    })
})

$(function () {
    $(document).tooltip();
});

