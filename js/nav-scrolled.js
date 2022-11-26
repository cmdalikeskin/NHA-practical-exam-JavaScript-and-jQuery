const navScrolled = document.querySelector('.main-nav')

document.addEventListener('scroll', () => {
    navFunc()
})

function navFunc() {
    //Selecting first section
    const rect = document.getElementsByTagName('section')[0].getBoundingClientRect();

    //Height of your window
    const innerheight = window.innerHeight;

    if (rect.top < innerheight - (innerheight / 100 * 90)) {
        $(navScrolled).addClass('scrolled')
    } else {
        $(navScrolled).removeClass('scrolled')
    }
}