const cardNumber = document.getElementById("card");
const form = document.getElementById("form");
const button = document.querySelector('button');

const field_3 = document.querySelector('.f-3')
const form_1 = document.querySelector('.form-1');
const form_2 = document.querySelector('.form-2');
const field_5 = document.querySelector('.f-5');

const input = document.querySelectorAll('input');

const inputField = document.querySelector("input.number"); // Assuming you have only one input with class "number"
const dateField = document.querySelector("input.date");
const cvvField = document.querySelector("input.cvv");
const zipField = document.querySelector("input.zip");

const success = document.querySelector('.success')

inputField.oninput = function () {
  let removeChar = this.value.replace(/[^0-9]/g, ""); 
  // var removeDot = removeChar.replace(/\./g, ''); // This is to remove "DOT"
  let formattedNumber = removeChar.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
  //   formattedNumber = formattedNumber.replace(/,/g, " "); // Replace commas with space

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




// oninput -- This function will be called every time the value of the input field changes, typically when the user types into the input field or when its value is changed programmatically.





form.addEventListener('submit', function(e) {
  e.preventDefault();

  simulateLoading(button)



})

function simulateLoading(element) {
  // Disable the button
  element.disabled = true;
  if(element.disabled === true){
    element.innerText = "Checking ..."
  } 

  // Simulate loading for 3 seconds
  setTimeout(function() {
    validateInputs(cardNumber, 19, 'Card number must be 16 digits.');
    validateInputs(dateField, 5, 'Date must be 4 digits.');
    validateInputs(cvvField, 3, 'CVV must be 3 digits.');
    validateInputs(zipField, 12, 'Zip code must be 12 digits.');
    // Enable the button after 3 seconds
    element.disabled = false;
    element.innerText = "Confirm Payment"
    isSuccess();
  }, 3000);
}


function validateInputs (element, length, message) {
  if(element.value.length < length){
    console.log(element.parentElement)
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
    /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
  ).replace(
    /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
  ).replace(
    /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
  ).replace(
    /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
  ).replace(
    /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
  ).replace(
    /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
  ).replace(
    /\/\//g, '/' // Prevent entering more than 1 `/`
  );

}

function setError (element, message){
  console.log('eddede');
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  console.log(inputControl);

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
}

function hasError(element) {
  return element.classList.contains('error');
}

// Check if none of the elements contain the 'error' class


function isSuccess() {
  if (!hasError(field_3) && !hasError(form_1) && !hasError(form_2) && !hasError(field_5)) {
    // None of the elements contain the 'error' class
    console.log("None of the elements contain the 'error' class.");
    success.innerText = "Success !"
    input.forEach(input => {
      // input.value = '';
      input.classList.add('success');
  });
  }

}

//So, validateInputs will be called right after simulateLoading, regardless of whether the loading simulation is still running or has already completed.