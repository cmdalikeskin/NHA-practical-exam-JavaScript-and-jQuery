
const classListChecker = document.querySelector('.nav-parent')
const navHome = document.getElementById('home_redirect')
const navBlog = document.getElementById('blogs_redirect')
const navForm = document.getElementById('form_redirect')
const navLi = document.querySelectorAll(".main-nav-ul li")

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


navLi.forEach(li => {
    li.addEventListener("click", () => {
        console.log(li)
        if (li.classList.contains("home_redirect")) {
            window.open("/index.html", "_self")
        }
        else if (li.classList.contains("blogs_redirect")) {
            window.open("/blogs.html", "_self")
        }
        else if (li.classList.contains("form_redirect")) {
            window.open("/form.html", "_self")
        }
    })
})

