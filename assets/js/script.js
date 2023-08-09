var generateBtn = document.querySelector("#generate");
var inputLengthSet = document.querySelector("#length-set");
let inputLength = document.querySelector("#input-length");

// All checkboxes
let checkboxLength = document.querySelector("#checkbox-length");
let checkboxLowercase = document.querySelector("#checkbox-lowercase");
let checkboxUppercase = document.querySelector("#checkbox-uppercase");
let checkboxNumeric = document.querySelector("#checkbox-numeric");
let checkboxSpecial = document.querySelector("#checkbox-special");

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialCharacters = "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/";

var passwordLength = 8;

function criteriaLength() {
  let lengthInputDiv = document.querySelector("#length-input-div");
  if(checkboxLength.checked) {
    lengthInputDiv.style.display = "block";
    if(!checkboxUppercase.checked)
      checkboxLowercase.checked = true;
  }
  else {
    lengthInputDiv.style.display = "none";
    passwordLength = 8;
  }
}

function validateLength() {
  if(inputLength.value < 8) {
    inputLength.value = 8;
  }
  else if(inputLength.value > 128) {
    inputLength.value = 128
  }

  passwordLength = Number(inputLength.value);
}

function noBoxesChecked() {
  return (
    !checkboxLength.checked &&
    !checkboxLowercase.checked &&
    !checkboxUppercase.checked &&
    !checkboxNumeric.checked &&
    !checkboxSpecial.checked
  );
}

function generatePassword() {
  // If none of the boxes are checked, simply return "password"
  if(noBoxesChecked()) {
    return "password";
  }
  
  let password = "";
  let numberOfCriteria = [];

  if(checkboxLowercase.checked)
    numberOfCriteria++;

  if(checkboxUppercase.checked)
    numberOfCriteria++;

  if(checkboxNumeric.checked)
    numberOfCriteria++;

  if(checkboxSpecial.checked)
    numberOfCriteria++;

  for(let i = 0; i < passwordLength; i++) {
    // Generate random number to randomly choose criteria
    let randomCriteria = Math.floor(Math.random() * numberOfCriteria);

    console.log(randomCriteria);

    if(randomCriteria === 0 && checkboxLowercase.checked) {
      password = password.concat(lowercaseLetters[Math.floor(Math.random() * 26)]);
    }
    else if(randomCriteria === 1 && checkboxUppercase.checked) {
      password = password.concat(uppercaseLetters[Math.floor(Math.random() * 26)]);
    }
    else if(randomCriteria === 2 && checkboxNumeric.checked) {
      password = password.concat(Math.floor(Math.random() * 10));
    }
    else if(randomCriteria === 3 && checkboxSpecial.checked) {
      password = password.concat(specialCharacters[Math.floor(Math.random() * specialCharacters.length)]);
    }
  }

  return password;
}

// Write password to the #password input
function writePassword() {
  inputLength.value = passwordLength;
  document.querySelector("#password").value = generatePassword();
}

// Add event listeners
generateBtn.addEventListener("click", writePassword);
inputLengthSet.addEventListener("click", validateLength);

checkboxLength.addEventListener("click", criteriaLength);
checkboxLowercase.addEventListener("click", () => {
  if(checkboxLength.checked && !checkboxLowercase.checked) {
    checkboxUppercase.checked = true;
  }
});
checkboxUppercase.addEventListener("click", () => {
  if(checkboxLength.checked && !checkboxUppercase.checked) {
    checkboxLowercase.checked = true;
  }
});
