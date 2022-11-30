let ulWrapper = document.querySelector(".pagination_ul_container")

let currentPage = 10
let totalpages = Math.ceil(13)

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


function wrapperChecker(cPage, tPages) {
    // console.log(currentPage, totalpages)

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

            wrapperChecker(itemValue, maxPages)
        })
    })
}


wrapperChecker(currentPage, totalpages)

