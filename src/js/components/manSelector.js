export default (function () {

    let manSelector = document.querySelector('.man-selector');

    function validateDOM () {

        if( manSelector){
            init();
        }
    }

    function init () {
        let seletField = manSelector.querySelector('select');
        let manType = manSelector.querySelectorAll('.man-img');
        seletField.addEventListener('change', (e) => {
            [...manType].forEach( man => {
                if (man.classList.contains('man' + e.target.value) ) {
                    man.style.display = 'block';
                    return;
                }
                man.style.display = 'none';
             });
        });
    }

    return {
        initialize: validateDOM
    };
    
})();
