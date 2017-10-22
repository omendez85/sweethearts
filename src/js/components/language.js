import lang from 'app.lang';

export default (function () {

    let langContainer = document.querySelector('.lang-container');
    let langElements = document.querySelectorAll('[data-lang]');

    function validateDOM () {
        if(langContainer){
            init();
        }
    }

    function init(){
        let langSelector = langContainer.querySelectorAll('a');

        //spread operator to support IE because nodechild doesn't have forEach method
        [...langSelector].forEach( lang => {
            lang.addEventListener( 'click', e => {
                e.preventDefault();
                translatePage( e.currentTarget.getAttribute('href'));
            });
        });

    }

    function translatePage(langSelected) {
        [...langElements].forEach( el => {
            let idEl = el.getAttribute('data-lang');
            el.textContent = lang[idEl][langSelected];
        });
    }

    return {
        initialize: validateDOM
    };

})();
