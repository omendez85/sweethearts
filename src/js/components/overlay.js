export default (function () {

    let overlay = document.querySelector('.overlay');

    function openOverlay () {
        if( overlay){
            overlay.classList.add('active');
        }

    }

    function closeOverlay () {
        if( overlay){
            overlay.classList.remove('active');
        }
    }

    return {
        openOverlay: openOverlay,
        closeOverlay: closeOverlay
    };

})();
