const ulContainer = document.querySelector('.pagination_ul_container')


let totalItemLength = 14;
let itemsPerPage = 5
let currentPage = 1

let listItemBtns = Math.ceil(totalItemLength / itemsPerPage)



createPaginationBtns()

function createPaginationBtns() {
    ulContainer.innerHTML = ""
    for (let i = 1; i < listItemBtns + 1; i++) {
        if (listItemBtns < 5) {
            let newLI = document.createElement('li')
            newLI.setAttribute("value", [i])
            newLI.innerText = [i]
            ulContainer.append(newLI)
        }






    }



}











clickableButtons()
function clickableButtons() {
    let test = document.querySelectorAll('.pagination_ul_container li')


    test.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log(btn)
        })
    })

}

