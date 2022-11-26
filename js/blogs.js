const blogContainer = $('.blogs_overview')
const btnScrollTop = document.querySelector('#btn-go-top')

//jQuery plugin
//Blogs button onderaan, gebruikte plugin ( https://plugins.compzets.com/animatescroll/ ) 
btnScrollTop.addEventListener('click', () => {
    $(".filler").animatescroll({ scrollSpeed: 2000, easing: 'easeInOutQuart' });
})

$(document).ready(() => {

    $.ajax({
        url: "NHAblogcontent.json",
        success: (data) => {

            //Create new blog section
            const newArticleObject = data.main_content
            setNewBlogOverview(newArticleObject)


        },
        error: () => {
            $("#currency_container").html("Something went wrong while loading the content.")
        }
    })
});


function setNewBlogOverview(data) {

    data.forEach(item => {
        const authorFName = item.firstname
        const authorLName = item.lastname
        const articleTitle = item.articletitle
        const articleBannerURL = item.bannerurl
        const articleSummary = item.articlesummary
        const directToHref = item.directTo
        const creationDate = item.creationDate

        const slicedCont = articleSummary.slice(0, 250)


        let newDiv = document.createElement('div')

        let newItem = `
        <a href="${directToHref}" class="blogs_item_container">
            <div class="blog_img_container">
                <img src="${articleBannerURL}" alt="">
            </div>
            <div class="blog_content_container">
                <h2>${articleTitle}</h2>
                <p class="blog_content_paragraph">${slicedCont}</p>
                <p class="blog_content_info">
                    Geschreven door
                    <span class="blog_content_author_name">${authorFName} ${authorLName}</span>
                    op
                    <span class="blog_content_date">${creationDate}</span>
            </p>
            </div>
        </a>`


        $(newDiv).append(newItem)

        $(blogContainer).prepend(newDiv)
    })
    animationBlogs()
}

/* ////////////////////////////////////////////////////////////////////////


CHANGE OPACITY OF ELEMENTS WITH THE ANIMATE PROPERTY OF JQUERY


////////////////////////////////////////////////////////////////////////*/

function animationBlogs() {
    let blogOverview = $(".blogs_item_container")


    $(blogOverview).mouseenter(function () {
        $(blogOverview).animate({
            opacity: 0.7
        }, 100, "linear")

        $(this).animate({
            opacity: 1
        }, 100, "linear")

    })

    $(blogOverview).mouseleave(function () {
        $(blogOverview).animate({
            opacity: 1
        }, 100, "linear")

    })

}