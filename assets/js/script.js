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
  let criteriaSelected = []; // A list of which criteria is selected

  // Add selected criteria to the list
  if(checkboxLowercase.checked)
    criteriaSelected.push("lowercase");

  if(checkboxUppercase.checked)
    criteriaSelected.push("uppercase");

  if(checkboxNumeric.checked)
    criteriaSelected.push("numeric");

  if(checkboxSpecial.checked)
    criteriaSelected.push("special");

  // Generate as many characters as the user requests (default 8)
  for(let i = 0; i < passwordLength; i++) {
    // Randomly selects which character type to generate for current character
    switch(criteriaSelected[Math.floor(Math.random() * criteriaSelected.length)]) {
      case "lowercase":
        password = password.concat(lowercaseLetters[Math.floor(Math.random() * 26)]);
        break;
      case "uppercase":
        password = password.concat(uppercaseLetters[Math.floor(Math.random() * 26)]);
        break;
      case "numeric":
        password = password.concat(Math.floor(Math.random() * 10));
        break;
      case "special":
        password = password.concat(specialCharacters[Math.floor(Math.random() * specialCharacters.length)]);
        break;
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
