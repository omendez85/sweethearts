import results from 'app.responses';
import overlay from 'app.overlay';

export default (function () {

    let forms = document.querySelectorAll('form');

    function validateDOM () {

        if( forms){
            [...forms].forEach( (form)=>{
                let formValidator = new FormValidation(form);
            });
        }
    }

    class FormValidation {

        constructor(form) {
            this.form = form;
            this.submitBtn = form.querySelector('[type="submit"]');
            this.formContainer = this.getParentField(this.form, 'form-container');
            this.inputFields = [...form.querySelectorAll('[data-required]')];
            this.errorFormMessage = form.querySelector('.error-form-msg');

            this.fieldSelected();
            this.initSubmitForm();
        }

        fieldSelected() {
            this.inputFields.forEach( field => {
                let getParentField = this.getParentField( field, 'field-container');
                field.addEventListener('change', () => {
                    getParentField.classList.remove('has-error');
                });
            });

        }
        formValid() {

            this.inputFields.forEach( field => {
                let fieldsetContainer = this.getParentField( field, 'field-container');
                let typeField = field.getAttribute('type');
                let fieldValue = field.value;
                let testField = false;
                switch (typeField) {
                    case 'radio':
                            let nameField = field.getAttribute('name');
                            testField = [...this.form.querySelectorAll('[name="' + nameField + '"]')].filter( field => field.checked === true );
                        break;
                    default:
                        testField = (fieldValue !== '');
                }

                if ( testField.length > 0) {
                    fieldsetContainer.classList.remove('has-error');
                } else {
                    fieldsetContainer.classList.add('has-error');
                }
            });
        }

        initSubmitForm() {

            this.form.addEventListener('submit', (ev) => {
                ev.preventDefault();
                this.formValid();
                let responseContainer = document.querySelector('.result-test');

                if ( this.form.querySelectorAll('.has-error').length > 0) {
                    this.errorFormMessage.classList.add('active');
                    return;
                }

                this.errorFormMessage.classList.remove('active');

                this.disabledSubmitBtn();
                overlay.openOverlay();
                setTimeout( () => {
                    let princessResult = this.calculatePrincess();
                    this.formContainer.classList.remove('active');
                    responseContainer.classList.add('active');
                    responseContainer.querySelector('.name-princess').textContent = princessResult.princessName;
                    responseContainer.querySelector('.imgPrincess').setAttribute('src', princessResult.urlImg ) ;
                    overlay.closeOverlay();
                }, 1000);
                this.enableSubmitBtn()

            });
        }

        disabledSubmitBtn() {
            this.submitBtn.setAttribute('disabled', 'disabled');
            this.submitBtn.classList.add('btn-disabled');
        }

        enableSubmitBtn() {
            this.submitBtn.removeAttribute('disabled');
            this.submitBtn.classList.remove('btn-disabled');
        }

        getParentField(el, parent) {
            let className = parent.toLowerCase();
            while ( el && el.parentNode ) {
                el = el.parentNode;
                if (el.classList.contains(className)) {
                    return el;
                }
            }
            return null;
        }

        calculatePrincess(){

            let fieldsForm = [...this.form.querySelectorAll('input[type="radio"]:checked, select, input[type="checkbox"], input[type="range"]')];

            let valuesUser = fieldsForm.map( field => {
                let fieldType = field.getAttribute('type');
                let value = parseInt(field.value);
                if ( fieldType === 'range') {
                    let ranges = JSON.parse('[' + field.getAttribute('data-ranges') + ']');
                    let totalRanges = ranges.length;
                    let minRange = parseInt(field.getAttribute('min'));
                    let valueRange;
                    ranges.reduce(function(valorAnterior, valorActual, index){
                        if ( valorAnterior < value && value <= valorActual) {
                            valueRange = index+1;
                        } else if (value > valorActual) {
                            valueRange = index+2;
                        }
                        return valorActual;
                    }, minRange);
                    value = valueRange;
                }
                return value;
            });

            return this.getPrincess( valuesUser, [...results] );
        }

        getPrincess( userResponse, responsesTest ) {

            let valuesUser = userResponse.toString();

            let princessMatch = {
                princessName: '',
                urlImg: ''
            };

            responsesTest.forEach( princess => {

                if(princessMatch.princessName !== '') return;

                princess.responses.forEach( listResponses => {

                    if(princessMatch.princessName !== '') return;

                    let responseString = listResponses.toString();

                    if (valuesUser === responseString) {
                        princessMatch.princessName = princess.princessName;
                        princessMatch.urlImg = princess.urlImg;
                    } else {
                        listResponses.splice(-1,1);
                    }

                });
            });

            if (princessMatch.princessName !== '') {
                return princessMatch;
            } else {
                let newResults = userResponse.splice(-1,1);
                return this.getPrincess( userResponse, responsesTest );
            }
        }

    }


    return {
        initialize: validateDOM
    };
})();
