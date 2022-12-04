
const classListChecker = document.querySelector('.nav-parent')
const navHome = document.getElementById('home_redirect')
const navBlog = document.getElementById('blogs_redirect')
const navForm = document.getElementById('form_redirect')
const navLi = document.querySelectorAll(".main-nav-ul li")
const hamburgerBtn = document.querySelector(".hamburger-icon-holder")
const navMenuItems = document.querySelector(".main-nav-ul")
const bodyEl = document.querySelector("body")

document.addEventListener("visibilitychange", () => {

    if (document.visibilityState == "visible") {
        document.title = "Welcome to Ali's Blog";
    } else {
        document.title = "Blog demo by Ali";
    }
})




if (classListChecker.classList.contains("homepage_active")) {
    $(navHome).addClass("active")
} else if (classListChecker.classList.contains("blogs_active")) {
    $(navBlog).addClass("active")
} else if (classListChecker.classList.contains("admin_active")) {
    $(navForm).addClass("active")
}

//Functions to open the pages belwo



hamburgerBtn.addEventListener("click", () =>{
    navMenuItems.classList.toggle('active')
    hamburgerBtn.classList.toggle('active')
    bodyEl.classList.toggle('active')
})