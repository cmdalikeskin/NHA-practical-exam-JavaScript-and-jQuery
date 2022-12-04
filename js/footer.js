const newArticleFooter = $('.footer_newest_articles')
const highlightedArticleFooter = $('.footer_highlighted_articles')
const socialsContainers = document.querySelectorAll('.socials')
const footerPText = document.querySelector('.footer_p_text')
const requirementsListGitHub = "https://github.com/cmdalikeskin/NHA-practical-exam-JavaScript-and-jQuery"



footerContentCreate()
function footerContentCreate() {

    //First socials div
    socialsContainers[0].innerHTML =
        `
            <div>
                <a href="mailto:cmdalikeskin@gmail.com"><i class="fa-solid fa-envelope"></i>Mail</a>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/cmd-alikeskin/" target="_blank"><i class="fa-brands fa-linkedin"></i>LinkedIn 
                </a>
            </div>
        `


    //Second socials div
    socialsContainers[1].innerHTML =
        `
            <div>
                <a href="https://www.youtube.com/kepowob" target="_blank"><i class="fa-brands fa-youtube"></i>Kevin Powell
                </a>
            </div>
            <div>
                <a href="https://www.youtube.com/c/TraversyMedia" target="_blank"><i class="fa-brands fa-youtube"></i>Traversy Media 
                </a>
            </div>
            <div>
                <a href="https://www.youtube.com/c/dcode-software" target="_blank"><i class="fa-brands fa-youtube"></i>dcode 
                </a>
            </div>
        `

    //Text for the footer
    footerPText.innerHTML = 
        `
        <p>
            This blog has been a part of the course \"JavaScript & jQuery\" that's been given by NHA(Nationale Handelsacademie) and is part of the practical exam. This course has been successfully completed with a 10 on the 20th of October 2022.<br><br>
            
            The full requirements to pass for this text can be found on my <a href="${requirementsListGitHub}" style="color:var(--primary-color)">GitHub repository<i class="fa-solid fa-arrow-up-right-from-square" style="margin:0 4px 0 8px; font-size:0.8rem"></i></a> page. Click the readme file to check out the list.
        </p>    
        `
}



$(document).ready(() => {

    $.ajax({

                url: "NHAblogcontent.json",
        success: (data) => {

            //Create new article section
            const newArticleObject = data.main_content
            //Create highlighted article section
            const highlightObject = data.highlighted_content

            //Create newest article links in footer
            setNewestArticleFooter(newArticleObject)

            // //Create highlighted article links in footer
            setHighlightedArticleFooter(highlightObject)
        },
        error: () => {
            console.log("Unable to load the file")
            
        }
    })
});


function setNewestArticleFooter(dataNewArticle) {

    const newestArticlesLength = dataNewArticle.length - 5
    let articleCounter = 1;

    for (let i = dataNewArticle.length - 1; i >= newestArticlesLength; i--) {
        const articleTitle = dataNewArticle[i].articletitle
        const articleRedirect = dataNewArticle[i].directTo

        const newDiv = document.createElement('div')
        $(newDiv).addClass('footer-article-link-container')
        const contentLink = `<a href="${articleRedirect}"><p>${[articleCounter]}.  ${articleTitle}</p></a>`

        $(newDiv).append(contentLink)
        $(newArticleFooter).append(newDiv)
        articleCounter++

    }
}



function setHighlightedArticleFooter(datahighlighted) {
    let articleCounter = 1;

    for (let i = 0; i < datahighlighted.length; i++) {
        const articleTitle = datahighlighted[i].articletitle
        const articleRedirect = datahighlighted[i].directTo

        const newDiv = document.createElement('div')
        $(newDiv).addClass('footer-article-link-container')
        const contentLink = `<a href="${articleRedirect}"><p>${[articleCounter]}.  ${articleTitle}</p></a>`

        $(newDiv).append(contentLink)
        $(highlightedArticleFooter).append(newDiv)

        articleCounter++
    }
}
