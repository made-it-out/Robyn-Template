// Text fields used in contact form

document.addEventListener('DOMContentLoaded', init)

function init() {
    const textFields = Array.from(document.querySelectorAll('.text-field'));

    textFields.forEach(field => {
        const input = field.querySelector('.text-field__input');
        const label = field.querySelector('.text-field__label');

        // move label up on input focus
        input.addEventListener('focus', () => {
            label.classList.add('text-field__label--up')
        })
        // move label down on blur, unless input has length
        input.addEventListener('blur', () => {
            input.value.length > 0 ? label.classList.add('text-field__label--up') : label.classList.remove('text-field__label--up')
        })
        
        label.addEventListener('click', () => {
            input.focus();
        })

        // If input already has a value
        if(input.value.length > 0){
            label.classList.add('text-field__label--up')
        }
    })
}