export default (function () {

    let inputRangeElements = document.querySelectorAll('input[type="range"]');

    function validateDOM () {

        if( inputRangeElements){
            [...inputRangeElements].forEach( (input)=>{
                let inputRangeField = new InputRangeFiles(input);
            });
        }
    }

    class InputRangeFiles {

        constructor(filed) {
            this.inputField = filed;
            this.parentField = this.inputField.parentNode,
            this.createValueContainer();
            this.valueChange();
            this.valueSliderContainer;
        }

        createValueContainer () {
            let valueSliderContainer = document.createElement('span');
            valueSliderContainer.classList.add('label-value');
            valueSliderContainer.innerText = this.inputField.getAttribute('value');
            this.parentField.appendChild(valueSliderContainer);
            this.valueSliderContainer = this.parentField.querySelector('.label-value');
        }

        valueChange () {
            this.inputField.addEventListener('change', ()=> {
                this.valueSliderContainer.innerText = this.inputField.value;
            });
        }
    }

    return {
        initialize: validateDOM
    };
})();
