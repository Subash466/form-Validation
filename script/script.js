'use-strict'
//selectors
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const inputArray = [username, email, password, confirmPassword];

//ShowError Function
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

//showSuccess function 
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

//check email function
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, 'Email ID is not valid');
  }
};
//min Max function
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${msg(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${msg(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
};

//Password Match Function
function checkPasswordMatch(input1, input2) {
  if (input1.value !== '' && input2.value !== '')
    if (input1.value !== input2.value) {
      showError(input2, 'Passwords are not matched');
    } else {
      showSuccess(input1);
      showSuccess(input2);
    }
};
//checkRequired Functions
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value === '') {
      showError(input, `${msg(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};
//message function
function  msg(input) {
  var errorMessage = input.id.replace(/-p/, ' P');
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};


//evert Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired(inputArray);
  checkLength(username, 3, 12);
  checkEmail(email);
  checkLength(password, 5, 15);
  checkPasswordMatch(password, confirmPassword);
});
