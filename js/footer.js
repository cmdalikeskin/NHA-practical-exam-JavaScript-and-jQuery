const newArticleFooter = $('.footer_newest_articles')
const highlightedArticleFooter = $('.footer_highlighted_articles')

$(document).ready(() => {

    $.ajax({
        url: "/NHAblogcontent.json",
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
            $("#currency_container").html("Something went wrong while loading the content.")
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