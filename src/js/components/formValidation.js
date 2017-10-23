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

                if ( this.form.querySelectorAll('.has-error').length > 0) {
                    this.errorFormMessage.classList.add('active');
                    return;
                }

                this.sending = true;
                this.disabledSubmitBtn();

                //this.form.submit();

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
    }

    return {
        initialize: validateDOM
    };
})();
