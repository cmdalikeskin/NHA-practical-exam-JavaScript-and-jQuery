const wrapper = document.querySelector(".pagination_ul_container")

let totalItems = 12
let currentpage = 1
let itemPerPage = 5

let pages = Math.ceil(totalItems / itemPerPage)



createBtns()

function createBtns() {


    if (pages <= 5) {
        for (let i = 1; i < pages; i++) {
            if (i == 1) {
                wrapper.innerHTML += `<li value="${i}" class="pageBtn active">${i}</li>`
            }
            wrapper.innerHTML += `<li value="${i + 1}" class="pageBtn">${i + 1}</li>`
        }
    }

    if (pages > 5) {


        for (let i = 1; i < 5; i++) {
            if (i == 1) {
                wrapper.innerHTML += `<li value="${i}" class="pageBtn active">${i}</li>`
            }
            wrapper.innerHTML += `<li value="${i + 1}" class="pageBtn">${i + 1}</li>`
        }

        let dotsLi = document.createElement('li')
        dotsLi.innerText = "..."
        dotsLi.style.border = "none"
        wrapper.append(dotsLi)

        let lastItem = document.createElement('li')
        lastItem.classList.add('pageBtn')
        lastItem.setAttribute("value", pages)
        lastItem.innerHTML = pages
        wrapper.append(lastItem)

    }

    btnClicker()
}


function btnClicker() {
    let btnEl = document.querySelectorAll('.pageBtn')

    btnEl.forEach(btn => {
        btn.addEventListener("click", () => {
            btnEl.forEach(btn => btn.classList.remove('active'))

            btn.classList.add('active')
            currentpage = btn.getAttribute("value")
            // console.log(currentpage)
            dynamicPagination(currentpage)
        })
    })
}