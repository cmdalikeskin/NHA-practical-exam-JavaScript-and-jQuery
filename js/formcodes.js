$(document).ready(() => {
    const
        formContainer = document.querySelector('.article_form'),
        fname_input = document.getElementById('author_firstname_input'),
        lname_input = document.getElementById('author_lastname_input'),
        email_input = document.getElementById('article_email_input'),
        repeat_email_input = document.getElementById('article_email_repeat_input'),
        article_title = document.getElementById('article_title_input'),
        article_url = document.getElementById('article_img_url_input'),
        form_summary = document.getElementById('article_summary_textarea'),
        form_content = document.getElementById('article_content_textarea'),
        form_btn = document.getElementById('btn_new_article'),
        testspan = document.getElementById('test'),
        formOverlay = document.getElementById('form_overlay')

    let [fName_bool, lName_bool, email_bool, repeatEmail_bool, art_title_bool, art_url_name_bool, form_summary_bool, form_content_bool] = Array(6).fill(false);

    //Time in milliseconds 1.000 = 1 second
    let newWindowCounter = 20000
    let counterstarter = 20


    $(fname_input).focusout(fnameChecker)
    $(lname_input).focusout(lnameChecker)
    $(email_input).focusout(emailChecker)
    $(repeat_email_input).focusout(repeatEmailChecker)
    $(article_title).focusout(articleTitleChecker)
    $(article_url).focusout(articleUrlChecker)
    $(form_summary).focusout(summaryChecker)
    $(form_content).focusout(contentChecker)

    function createErrorDiv() {
        $(formOverlay).html('')
        let errorDiv = document.createElement('div')
        let errorContent = `                       
                    <h2>End of form demo.</h2>
                    <p>You've succeeded in correctly filling in all the form inputs.<br>
                        This is the end of the form demo. <br>You're going to get directed to the homepage within <span id="form_timer">10</span>
                        seconds.
                        <br><br>
                        Please <a href="/index.html"> click here </a> if you aren't redirected automatically.
                `
        $(errorDiv).append(errorContent)
        $(formOverlay).append(errorDiv)

    }

    function fnameChecker() {
        if (!fname_input.value.trim("") == '') {
            $(fname_input).siblings('p').text('')
            $(fname_input).siblings('p').removeClass('error')
            fName_bool = true
        } else {
            $(fname_input).siblings('p').text(`This input field cannot be empty.`)
            $(fname_input).siblings('p').addClass('error')
            fName_bool = false
        }
    }

    function lnameChecker() {
        //Last name input field
        if (!lname_input.value.trim("") == '') {
            $(lname_input).siblings('p').text('')
            $(lname_input).siblings('p').removeClass('error')
            lName_bool = true
        } else {
            $(lname_input).siblings('p').text(`This input field cannot be empty.`)
            $(lname_input).siblings('p').addClass('error')
            lName_bool = false
        }
    }

    function emailChecker() {
        //Email input field
        let mailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let emailVal = email_input.value

        if (mailregex.test(emailVal)) {
            $(email_input).siblings('p').text('')
            $(email_input).siblings('p').removeClass('error')
            email_bool = true
        } else {
            let emailErrorText = ''
            if (emailVal == '') {
                emailErrorText = `This input field cannot be empty`
            } else {
                emailErrorText = `This is not a valid email`
            }
            $(email_input).siblings('p').text(emailErrorText)
            $(email_input).siblings('p').addClass('error')
            email_bool = false
        }
    }

    function repeatEmailChecker() {
        //Repeat email input field
        if (!repeat_email_input.value == "" && email_input.value == repeat_email_input.value) {
            $(repeat_email_input).siblings('p').text('')
            $(repeat_email_input).siblings('p').removeClass('error')
            repeatEmail_bool = true
        } else {
            $(repeat_email_input).siblings('p').text(`The emails do not match.`)
            $(repeat_email_input).siblings('p').addClass('error')
            repeatEmail_bool = false
        }
    }

    function articleTitleChecker() {
        //Article title input field
        let titleValue = article_title.value
        if (titleValue.trim().length > 10) {
            $(article_title).siblings('p').text('')
            $(article_title).siblings('p').removeClass('error')
            art_title_bool = true
        } else {
            let titleErrorText = ''
            if (titleValue == '') {
                titleErrorText = `This input field cannot be empty`
            } else {
                titleErrorText = 'The title needs to be atleast 10 characters.'
            }
            $(article_title).siblings('p').text(titleErrorText)
            $(article_title).siblings('p').addClass('error')
            art_title_bool = false
        }
    }

    function articleUrlChecker() {
        //Banner url input field
        let articleVal = article_url.value
        if (articleVal.startsWith('http') ||
            articleVal.startsWith('www')) {
            $(article_url).siblings('p').text('')
            $(article_url).siblings('p').removeClass('error')
            art_url_name_bool = true
        } else {
            let urlErrorText = ''
            if (articleVal == '') {
                urlErrorText = `This input field cannot be empty`
            } else {
                urlErrorText = 'This is not an accepted URL. The URL needs to start with http, https or www.'
            }

            $(article_url).siblings('p').text(urlErrorText)
            $(article_url).siblings('p').addClass('error')
            art_url_name_bool = false
        }
    }

    function summaryChecker() {
        //Article summary input field
        let trimLength = form_summary.value.trim('')
        if (trimLength.length > 30) {
            $(form_summary).siblings('p').text('')
            $(form_summary).siblings('p').removeClass('error')
            form_summary_bool = true
        } else {
            let summaryErrorText = ''
            if (trimLength.length == 0) {
                summaryErrorText = `This input field cannot be empty`
            } else {
                summaryErrorText = `The input field needs to contain atleast 30 characters`
            }

            $(form_summary).siblings('p').text(summaryErrorText)
            $(form_summary).siblings('p').addClass('error')
            form_summary_bool = false
        }
    }

    function contentChecker() {
        //Article content input field
        let trimLength = form_content.value.trim('')
        if (trimLength.length > 150) {
            $(form_content).siblings('p').text('')
            $(form_content).siblings('p').removeClass('error')
            form_content_bool = true
        } else {
            let contentErrorText = ''
            if (trimLength.length == 0) {
                contentErrorText = `This input field cannot be empty`
            } else {
                contentErrorText = `The input field needs to contain atleast 150 characters`
            }
            $(form_content).siblings('p').text(contentErrorText)
            $(form_content).siblings('p').addClass('error')
            form_content_bool = false
        }
    }

    form_btn.addEventListener('click', (e) => {
        e.preventDefault()

        fnameChecker()
        lnameChecker()
        emailChecker()
        repeatEmailChecker()
        articleTitleChecker()
        articleUrlChecker()
        summaryChecker()
        contentChecker()

        if (
            fName_bool &&
            lName_bool &&
            email_bool &&
            repeatEmail_bool &&
            art_title_bool &&
            art_url_name_bool &&
            form_summary_bool &&
            form_content_bool
        ) {
            //If every input field is set to TRUE then this code will execute
            let counter = setInterval(formTimer, 1000)
            createErrorDiv()
            $(formContainer).addClass('active')
            formTimer()

            setTimeout(openNewPage, newWindowCounter);

            function formTimer() {
                const formSpan = document.getElementById('form_timer')
                $(formSpan).html(counterstarter)
                if (counterstarter === 0) {
                    clearInterval(counter)
                }
                counterstarter--;
            }

        } else {
            //This code will get executed if there is even a single input field with a FALSE value
            $(formContainer).removeClass('active')
        }

        function openNewPage() {
            window.open('/index.html', 'blank')
        }

        /* FORM SUBMIT TESTER
            let a = 1
            if (a < 1) {
                e.preventDefault()
                console.log('test111111')
            } else {
               formContainer.submit()
            }*/

    })


}); 