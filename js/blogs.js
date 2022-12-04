const blogContainer = $('.blogs_overview')
const btnScrollTop = document.querySelector('#btn-go-top')

//jQuery plugin
//Blogs button onderaan, gebruikte plugin ( https://plugins.compzets.com/animatescroll/ ) 
btnScrollTop.addEventListener('click', () => {
    scrollToTop()
})

function scrollToTop() {
    $(".filler").animatescroll({ scrollSpeed: 2000, easing: 'easeInOutQuart' });
}

$(document).ready(() => {

    $.ajax({
        url: "NHAblogcontent.json",
        success: (data) => {



            //Create new blog section
            const newArticleObject = data.main_content
            // setNewBlogOverview(newArticleObject)
            let ulWrapper = document.querySelector(".pagination_ul_container")

            //Amount of items to show on page
            let itemsPerPage = 5

            //Starting values that will be overwritten once the buttons have been pressed
            let currentPage = 1
            let totalpages = Math.ceil(newArticleObject.length / itemsPerPage)


            //--------------------------------------------------------------------------------------------------------------------//
            //Find every filler content that's divisible by 2 (array method) and give it a new bannerurl value (/images/filler-image2.png).
            //This way the filler content won't be filled up with the same image over and over again
            finder(newArticleObject)

            function finder(data) {

                let tester = data.filter(dt => dt.id == "filler")
                let newImage = "images/filler-image2.png"

                tester.forEach((test, idx) => {
                    if (idx % 2) {
                        test.bannerurl = newImage
                    }
                })
            }
            //--------------------------------------------------------------------------------------------------------------------//

            slicerFunction(currentPage)

            ulWrapperChecker(currentPage, totalpages)



            //Function to slice the content shown on page
            function slicerFunction(pageValue) {
                $(blogContainer).html("")

                let sliceEnd = pageValue * itemsPerPage
                let sliceStart = sliceEnd - itemsPerPage;

                //Mak a variale (let) with the JSON data in reverse, without mutating the original var
                let reverseContent = newArticleObject.slice().reverse()

                let slicedContent = reverseContent.slice(sliceStart, sliceEnd)


                slicedContent.forEach(item => {
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

                    $(blogContainer).append(newDiv)
                })
                animationBlogs()
            }


            //Functions to make the pagination option work

            /*
            First state = 
            [][][][][][][]
            
            Second state = 
            [][][][][]....[]
            
            Third state = 
            []...[][][][]....[]
            
            Fourth state = 
            []...[][][][][]
            */


            function ulWrapperChecker(cPage, tPages) {
                if (cPage <= 5 && tPages <= 6) { //result: [][][][][][][]
                    console.log("[][][][][]")


                    firstState(cPage, tPages)
                }
                else if (cPage < 5 && tPages > 6) { //result: [][][][][]....[]
                    console.log("[][][][][]....[]")


                    secondState(cPage, tPages)
                }
                else if (cPage >= 5 && cPage < tPages - 3) { //result: []...[][][][]....[]
                    console.log("[]...[][][][]....[]")


                    thirdState(cPage, tPages)
                }
                else if (cPage >= tPages - 3) { //result: []...[][][][][]
                    console.log("[]...[][][][][]")


                    fourthState(cPage, tPages)
                }

            }


            function firstState(fsCPage, fsTPages) {
                //result: [][][][][][][]

                //Reset wrapper (parent-element)
                ulWrapper.innerHTML = ""

                for (let i = 1; i <= fsTPages; i++) {
                    let newLi = document.createElement('li')
                    newLi.setAttribute("value", i)
                    newLi.classList.add("pagination-list-item")
                    newLi.innerText = [i]

                    if (newLi.value == fsCPage) {
                        newLi.classList.add("active")
                    }

                    ulWrapper.append(newLi)
                }

                let paginationItems = document.querySelectorAll(".pagination-list-item")
                clickable(paginationItems)
            }


            function secondState(ssCPage, ssTPages) {
                //result: [][][][][]....[]

                //Reset wrapper (parent-element)
                ulWrapper.innerHTML = ""

                for (let i = 1; i <= 5; i++) {
                    let newLi = document.createElement('li')
                    newLi.setAttribute("value", [i])
                    newLi.classList.add("pagination-list-item")
                    newLi.innerText = [i]

                    if (newLi.value == ssCPage) {
                        newLi.classList.add("active")
                    }

                    ulWrapper.append(newLi)
                }
                //Add the dot
                let dotLi = document.createElement('li')
                dotLi.classList.add("pagination-filler-text")
                dotLi.innerText = "..."

                ulWrapper.append(dotLi)

                //Add the final item
                let finalLi = document.createElement('li')
                finalLi.setAttribute("value", ssTPages)
                finalLi.classList.add("pagination-list-item")
                finalLi.innerText = totalpages

                ulWrapper.append(finalLi)

                let paginationItems = document.querySelectorAll(".pagination-list-item")
                clickable(paginationItems)

            }


            function thirdState(tsCPage, tsTPages) {
                //result: []...[][][][]....[]

                //Reset wrapper (parent-element)
                ulWrapper.innerHTML = ""

                //Add first li with value/number 1
                let firstLi = document.createElement('li')
                firstLi.setAttribute("value", "1")
                firstLi.classList.add("pagination-list-item")
                firstLi.innerText = "1"

                ulWrapper.append(firstLi)

                //Add first dot list item
                let firstDotLi = document.createElement('li')
                firstDotLi.classList.add("pagination-filler-text")
                firstDotLi.innerText = "..."

                ulWrapper.append(firstDotLi)


                //Add mid-section with numbers
                for (let i = tsCPage - 2; i < tsCPage + 3; i++) {
                    let newLi = document.createElement('li')
                    newLi.setAttribute("value", [i])
                    newLi.classList.add("pagination-list-item")
                    newLi.innerText = [i]

                    if (newLi.value == tsCPage) {
                        newLi.classList.add("active")
                    }

                    ulWrapper.append(newLi)
                }

                //Add first dot list item
                let secondDotLi = document.createElement('li')
                secondDotLi.classList.add("pagination-filler-text")
                secondDotLi.innerText = "..."

                ulWrapper.append(secondDotLi)

                //Add the final item
                let finalLi = document.createElement('li')
                finalLi.setAttribute("value", tsTPages)
                finalLi.classList.add("pagination-list-item")
                finalLi.innerText = totalpages

                ulWrapper.append(finalLi)

                let paginationItems = document.querySelectorAll(".pagination-list-item")
                clickable(paginationItems)

            }

            function fourthState(fsCPage, fsTPages) {
                //result: []...[][][][][]

                //Reset wrapper (parent-element)
                ulWrapper.innerHTML = ""

                //Add first list item with value of 1
                let firstLi = document.createElement('li')
                firstLi.setAttribute("value", "1")
                firstLi.classList.add("pagination-list-item")
                firstLi.innerText = "1"

                ulWrapper.append(firstLi)

                //Add the dot
                let dotLi = document.createElement('li')
                dotLi.classList.add("pagination-filler-text")
                dotLi.innerText = "..."

                ulWrapper.append(dotLi)


                //Add last-section with numbers
                for (let i = fsTPages - 4; i <= fsTPages; i++) {

                    let newLi = document.createElement('li')
                    newLi.setAttribute("value", [i])
                    newLi.classList.add("pagination-list-item")
                    newLi.innerText = [i]

                    if (newLi.value == fsCPage) {
                        newLi.classList.add("active")
                    }

                    ulWrapper.append(newLi)

                    if (i > fsTPages + 5) {
                        break;
                    }
                }

                let paginationItems = document.querySelectorAll(".pagination-list-item")
                clickable(paginationItems)

            }

            function clickable(itemList) {

                itemList.forEach(item => {
                    item.addEventListener("click", () => {
                        let itemValue = item.value
                        let maxPages = totalpages
                        slicerFunction(itemValue)
                        ulWrapperChecker(itemValue, maxPages)
                        scrollToTop()
                    })
                })
            }


        },
        error: () => {
            $("#currency_container").html("Something went wrong while loading the content.")
        }
    })
});




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