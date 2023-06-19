// We have already granbbed the DOM elements you need.
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#password-confirm');
const formStatus = document.querySelector('#form-status');
const submitFormButton = document.querySelector('#submit-form');

// Definitely look at the example for this one, it's simpler to understand than
// the instructions suggest.
/*
@todo FORM VALIDATION!
  The event listener below fires when the submit button is clicked.
  We need to validate what is submitted.
  @tip a thing you cqn GoogleBing is --> `js form validation`
  -  IF FIELDS FAIL VALIDATION Add the `border-danger` class to formStatus
  - There are multiple validation checks. They are listed in order
    of importance. If you catch something listed higher, update formStatus
    with the error message and stop checking for errors.
    (1) if() any fields are empty, formStatus should show the error message
       "All form fields are required"
    (2) Or else if() password and passwordConfirm do not have the same value formStatus
        should show the error message 'Password and password confirm do not match'
    (3) Or else if() Tte password does not have at least:
        > 1 lowercase letter
        > 1 uppercase letter
        > 1 number
        If these requirements aren't met, formStatus should show the error message
        'Password must contain uppercase, lowercase and numbers'
        @tip: things you can GoogleBing:
            --> `js see if string has captial letters`
            --> `js see if string has numbers`
            --> `js see if string has lowercase`
  -  OR ELSE IF() FIELDS PASS VALIDATION
     > Add the `border-success` class to formStatus
     > Make sure formStatus does not have a leftover `border-danger` class
       from a prior submission that didn't pass.
     > formStatus should have the text 'Your form submission is complete'
     > All form fields, including the submit button, should be disabled.
 */
submitFormButton.addEventListener('click', (e) => {
  // We preventDefault() so the page does not refresh when the
  // submit button is pressed.
  e.preventDefault();
  if (!email.value || !password.value || !passwordConfirm.value) {
    formStatus.classList.add('border-danger');
    formStatus.textContent = 'All form fields are required';
  } else if (password.value !== passwordConfirm.value) {
    formStatus.classList.add('border-danger');
    formStatus.textContent = 'Password and password confirm do not match';
  } else if (!(/[A-Z]/.test(password.value) && /[a-z]/.test(password.value) && /[0-9]/.test(password.value))) {
    formStatus.classList.add('border-danger');
    formStatus.textContent = 'Password must contain uppercase, lowercase and numbers';
  } else {
    formStatus.classList.remove('border-danger');
    formStatus.classList.add('border-success');
    formStatus.textContent = 'Your form submission is complete';
    [email, password, passwordConfirm, submitFormButton].forEach((e) => { e.disabled = true })
  }
})

