const cardNumber = document.getElementById("card");
const form = document.getElementById("form");
const button = document.querySelector('button');
const creditCardNumber = document.querySelector('.cardNumber');
const expDate = document.querySelector('.expDate');
const cvvNumber = document.querySelector('.cvvNumber');
const zipCode = document.querySelector('.zipCode');
const input = document.querySelectorAll('input');
const inputField = document.querySelector("input.number");
const dateField = document.querySelector("input.date");
const cvvField = document.querySelector("input.cvv");
const zipField = document.querySelector("input.zip");
const success = document.querySelector('.success');

inputField.oninput = function () {
  let removeChar = this.value.replace(/[^0-9]/g, ""); 
  let formattedNumber = removeChar.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
  this.value = formattedNumber;
};

cvvField.oninput = function () {
  let removeChar = this.value.replace(/[^0-9]/g, "");
  this.value = removeChar;
};

zipField.oninput = function () {
  let removeChar = this.value.replace(/[^0-9]/g, ""); 
  this.value = removeChar;
};

form.addEventListener('submit', function(e) {
  e.preventDefault();
  simulateLoading(button)
});

function simulateLoading(element) {
  element.disabled = true;
  if(element.disabled === true){
    element.innerText = "Checking ..."
  } 

  setTimeout(function() {
    validateInputs(cardNumber, 19, 'Card number must be 16 digits.');
    validateInputs(dateField, 5, 'Date must be 4 digits.');
    validateInputs(cvvField, 3, 'CVV must be 3 digits.');
    validateInputs(zipField, 12, 'Zip code must be 12 digits.');
    element.disabled = false;
    element.innerText = "Confirm Payment"
    isSuccess();
  }, 3000);
}

function validateInputs (element, length, message) {
  if(element.value.length < length){
    setError(element, message)
  }
}

function checkInputs (element){
  removeError(element);
}

function removeError(element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  inputControl.classList.remove('error');
  errorDisplay.innerText = '';
}

cardNumber.addEventListener('keyup', () => checkInputs(cardNumber) );
dateField.addEventListener('keyup', () => checkInputs(dateField) );
cvvField.addEventListener('keyup', () => checkInputs(cvvField) );
zipField.addEventListener('keyup', () => checkInputs(zipField) );

function formatString(event) {
  var code = event.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

  event.target.value = event.target.value.replace(
    /^([1]\/|[2-9])$/g, '0$1/' //  1/ > 01/ or 2,3,4,..,9 > 02/,03/,04/,....
  ).replace(
    /^(0[1-9]|1[0-2])$/g, '$1/' // nếu là 1 trong 2 dạng sẽ tự động thêm /
  ).replace(
    /^([1])([3-9])$/g, '0$1/$2' // 13 > 01/3
  ).replace(
    /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
  ).replace(
    /[^\d\/]|^[\/]*$/g, '' // To remove everything not digits and multiple `/`
  ).replace(
    /\/\//g, '/' // Prevent entering more than 1 `/`
  );

}
function setError (element, message){
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  errorDisplay.innerText = message;
  inputControl.classList.add('error');
}

function hasError(element) {
  return element.classList.contains('error');
}

function isSuccess() {
  if (!hasError(creditCardNumber) && !hasError(expDate) && !hasError(cvvNumber) && !hasError(zipCode)) {
    success.innerText = "Success !"
    input.forEach(input => {
      // input.value = '';
      input.classList.add('success')
  })
  }
}
