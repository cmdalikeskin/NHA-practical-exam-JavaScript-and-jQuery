const highlightContentCon = $('.highlighted-articles-section .articles-container')
const newArticleContentCon = document.querySelector('.newest-articles-section .articles-container')
const highArticleContentCon = document.querySelector('.highlighted-articles-section .articles-container')


$(document).ready(() => {

    $.ajax({
        url: "/NHAblogcontent.json",
        success: (data) => {

            //Create new article section
            const newArticleObject = data.main_content
            setNewArticleContent(newArticleObject)

            //Create highlighted article section
            const highlightObject = data.highlighted_content
            setHighlightedContent(highlightObject)

        },
        error: () => {
            $("#currency_container").html("Something went wrong while loading the content.")
        }
    })
});


/* ////////////////////////////////////////////////////////////////////////


SETTING THE CONTENT FOR INDEX.HTML


 ////////////////////////////////////////////////////////////////////////*/

function setNewArticleContent(dataNewArticle) {

    const newestArticlesLength = dataNewArticle.length - 3

    for (let i = dataNewArticle.length - 1; i >= newestArticlesLength; i--) {

        const authorFName = dataNewArticle[i].firstname
        const authorLName = dataNewArticle[i].lastname
        const articleTitle = dataNewArticle[i].articletitle
        const articleBannerURL = dataNewArticle[i].bannerurl
        const articleSummary = dataNewArticle[i].articlesummary
        const directToHref = dataNewArticle[i].directTo
        const creationDate = dataNewArticle[i].creationDate
        const maxSummaryLength = articleSummary.slice(0, 95)

        //Index class counter
        let indexNumber = ""
        if (i == dataNewArticle.length - 1) {
            indexNumber = "one"
        } else if (i == dataNewArticle.length - 2) {
            indexNumber = "two"
        } else if (i == dataNewArticle.length - 3) {
            indexNumber = "three"
        }

        //Creation of new highlighted articles div and setting content happens below
        const newDiv = document.createElement('div')
        $(newDiv).addClass('new_div')

        const contentEntirely = `   
            <a class="article-link-con new-article transform_class ${indexNumber}" href="${directToHref}">
                <img class="article_img_con highlighted-article-img" src="${articleBannerURL}">
                <p class="article-title-con article-title-con new-article-title">
                    ${articleTitle}
                </p>
                <p class="article-sum-con new-article-description">
                    ${maxSummaryLength}...
                </p>
                <p class="article-info-con new-article-info">
                    Geschreven door
                    <span class="author-name-con new-article-author">${authorFName} ${authorLName}</span>
                    op
                    <span class="author-date-con new-article-date">${creationDate}</span>
                </p>
            </a>
            `

        $(newDiv).append(contentEntirely)

        $(newArticleContentCon).append(newDiv)


    }

}

function setHighlightedContent(dataHighlighted) {

    for (let i = 0; i < dataHighlighted.length; i++) {
        const authorFName = dataHighlighted[i].firstname
        const authorLName = dataHighlighted[i].lastname
        const articleTitle = dataHighlighted[i].articletitle
        const articleBannerURL = dataHighlighted[i].bannerurl
        const articleSummary = dataHighlighted[i].articlesummary
        const directToHref = dataHighlighted[i].directTo
        const creationDate = dataHighlighted[i].creationDate

        //Maximum amount of characters in the summary of the containers on the homepage
        const maxSummaryLength = articleSummary.slice(0, 95)

        //Index class counter
        let indexNumber = ""
        if (i == 0) {
            indexNumber = "one"
        } else if (i == 1) {
            indexNumber = "two"
        } else if (i == 2) {
            indexNumber = "three"
        }

        //Creation of new highlighted articles div and setting content happens below
        const newDiv = document.createElement('div')
        $(newDiv).addClass('new_div')

        const contentEntirely = `
        <a class="article-link-con highlighted-article transform_class ${indexNumber}" href="${directToHref}">
            <img class="article_img_con highlighted-article-img" src="${articleBannerURL}">

            <p class="article-title-con highlighted-article-title">
                ${articleTitle}
            </p>
            <p class="article-sum-con highlighted-article-description">
                ${maxSummaryLength}...
            </p>
            <p class="article-info-con highlighted-article-info">
                Geschreven door
                <span class="author-name-con highlighted-article-author">${authorFName} ${authorLName}</span>
                op
                <span class="author-date-con highlighted-article-date">${creationDate}</span>
            </p>
        </a>
        `
        $(newDiv).append(contentEntirely)
        $(highlightContentCon).append(newDiv)
    }
    animationIndex()
}

/* ////////////////////////////////////////////////////////////////////////


CHANGE OPACITY OF ELEMENTS WITH THE ANIMATE PROPERTY OF JQUERY


////////////////////////////////////////////////////////////////////////*/

function animationIndex() {
    let newArticleItems = $(".article-link-con.new-article")
    let highArticleItems = $(".article-link-con.highlighted-article")


    $(newArticleItems).mouseenter(function () {
        $(newArticleItems).animate({
            opacity: 0.6
        }, 100, "linear")

        $(this).animate({
            opacity: 1
        }, 100, "linear")

    })

    $(newArticleItems).mouseleave(function () {
        $(newArticleItems).animate({
            opacity: 1
        }, 100, "linear")

    })


    $(highArticleItems).mouseenter(function () {
        $(highArticleItems).animate({
            opacity: 0.6
        }, 100, "linear")

        $(this).animate({
            opacity: 1
        }, 100, "linear")

    })

    $(highArticleItems).mouseleave(function () {
        $(highArticleItems).animate({
            opacity: 1
        }, 100, "linear")

    })

}


/* ////////////////////////////////////////////////////////////////////////


CONTENT SHOW AND HIDE ON SCROLLUP AND SCROLLDOWN


////////////////////////////////////////////////////////////////////////*/

setTimeout(() => {
    scrolled()
}, 100);

function scrolled() {
    $(document).scroll(() => {
        windowEventCaller()

    })
}



function windowEventCaller() {

    const rect = newArticleContentCon.getBoundingClientRect();
    const hrect = highArticleContentCon.getBoundingClientRect();
    const innerheight = window.innerHeight;
    const articlesA = document.querySelectorAll('.newest-articles-section .articles-container a')

    let newArtOne = document.querySelectorAll(".newest-articles-section .one")
    let newArtTwo = document.querySelectorAll(".newest-articles-section .two")
    let newArtThree = document.querySelectorAll(".newest-articles-section .three")




    let highArtOne = document.querySelectorAll(".highlighted-articles-section .one")
    let highArtTwo = document.querySelectorAll(".highlighted-articles-section .two")
    let highArtThree = document.querySelectorAll(".highlighted-articles-section .three")


    //newest articles scrolled
    if (rect.top < innerheight - 250) {
        $(newArtOne).css({
            "transition-delay": "0ms",
            "transition-duration": "850ms",
            "transform": "translateY(0px)",
            "opacity": "1"
        })
        $(newArtTwo).css({
            "transition-delay": "150ms",
            "transition-duration": "850ms",
            "transform": "translateY(0px)",
            "opacity": "1"
        })
        $(newArtThree).css({
            "transition-delay": "300ms",
            "transition-duration": "850ms",
            "transform": "translateY(0px)",
            "opacity": "1"
        })

    }

    if (rect.top > innerheight - 250) {
        $(newArtOne).css({
            "transition-delay": "300ms",
            "transition-duration": "850ms",
            "transform": "translateY(100px)",
            "opacity": "0"
        })
        $(newArtTwo).css({
            "transition-delay": "150ms",
            "transition-duration": "850ms",
            "transform": "translateY(100px)",
            "opacity": "0"
        })
        $(newArtThree).css({
            "transition-delay": "0ms",
            "transition-duration": "850ms",
            "transform": "translateY(100px)",
            "opacity": "0"
        })

    }


    //highlighted content scrolled
    if (hrect.top < innerheight - 250) {
        $(highArtOne).css({
            "transition-delay": "0ms",
            "transition-duration": "850ms",
            "transform": "translateY(0px)",
            "opacity": "1"
        })
        $(highArtTwo).css({
            "transition-delay": "150ms",
            "transition-duration": "850ms",
            "transform": "translateY(0px)",
            "opacity": "1"
        })
        $(highArtThree).css({
            "transition-delay": "300ms",
            "transition-duration": "850ms",
            "transform": "translateY(0px)",
            "opacity": "1"
        })

    }

    if (hrect.top > innerheight - 250) {
        $(highArtOne).css({
            "transition-delay": "300ms",
            "transition-duration": "850ms",
            "transform": "translateY(100px)",
            "opacity": "0"
        })
        $(highArtTwo).css({
            "transition-delay": "150ms",
            "transition-duration": "850ms",
            "transform": "translateY(100px)",
            "opacity": "0"
        })
        $(highArtThree).css({
            "transition-delay": "0ms",
            "transition-duration": "850ms",
            "transform": "translateY(100px)",
            "opacity": "0"
        })

    }



    let transformItems = document.querySelectorAll('.transform_class')

    transformItems.forEach((item) => {
        item.addEventListener("mouseover", () => {
            item.style.transitionDelay = "0ms"
            item.style.transform = "translateY(-10px)"
        })
        item.addEventListener("mouseout", () => {
            item.style.transitionDelay = "0ms"
            item.style.transform = "translateY(0px)"
        })
    })


}






/*
    WERKENDE CODE MET EEN FOREACH LOOP

    // dataHighlighted.forEach(obj => {
    //     //Lezen van de object-elementen
    //     const name = obj.name
    //     const text = obj.content
    //     const imgSrc = obj.img

    //     //Aanmaken van nieuwe div
    //     const newDiv = document.createElement('div')
    //     $(newDiv).addClass('new_div')

    //     const contentEntirely = `
    //         <p>Name: ${name}</p>
    //         <p>${text}</p>
    //         <img src="${imgSrc}">`

    //     $(newDiv).append(contentEntirely)
    //     $(highlightContentCon).append(newDiv)
    // })
*/