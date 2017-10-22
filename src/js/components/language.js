import lang from 'app.lang';

const Language = function() {

    const langContainer = document.querySelectorAll('.lang-container');

    function validateDOM () {
        if( langContainer.length > 0 ){
            console.log(123)
        }
    }

    return {
        initialize: validateDOM
    };

};

export default Language;
