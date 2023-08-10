var generateBtn = document.querySelector("#generate");

// Length related input
var buttonLengthSet = document.querySelector("#button-length-set");
let inputLength = document.querySelector("#input-length");

// All checkboxes
let checkboxLength = document.querySelector("#checkbox-length");
let checkboxLowercase = document.querySelector("#checkbox-lowercase");
let checkboxUppercase = document.querySelector("#checkbox-uppercase");
let checkboxNumeric = document.querySelector("#checkbox-numeric");
let checkboxSpecial = document.querySelector("#checkbox-special");

// Reset button
let buttonReset = document.querySelector("#button-reset");

// Character sets for ease of randomizing
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialCharacters = "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/";

var passwordLength = 8;

function generatePassword() {
  let password = ""; // Holds the generated password
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

// Displays the length input depending on whether the checkbox is selected or not
function criteriaLength() {
  let lengthInputDiv = document.querySelector("#length-input-div");
  if(checkboxLength.checked) {
    lengthInputDiv.style.display = "block";
    if(!checkboxUppercase.checked)
    checkboxLowercase.checked = true;
}
else {
    lengthInputDiv.style.display = "none";
    passwordLength = 8; // Defaults to length of 8 when length is unselected
  }
}

// Makes sure that the password length is between 8 and 128 characters
function validateLength() {
  if(inputLength.value < 8) {
    inputLength.value = 8;
  }
  else if(inputLength.value > 128) {
    inputLength.value = 128;
  }
  
  passwordLength = Number(inputLength.value);
}

// Function to check if character boxes are selected
// Returns true if at least one is selected, returns false if none are selected
function isBoxSelected() {
  return checkboxLowercase.checked || checkboxUppercase.checked || checkboxNumeric.checked || checkboxSpecial.checked;
}

// If none of the character boxes are checked, then select the lowercase checkbox
function checkboxListenerFunction() {
  if(!isBoxSelected()) {
    checkboxLowercase.checked = true;
  }
}

// Add event listeners
generateBtn.addEventListener("click", writePassword);
buttonLengthSet.addEventListener("click", validateLength);

// Add event listeners to checkboxes
checkboxLength.addEventListener("click", criteriaLength);
checkboxLowercase.addEventListener("click", checkboxListenerFunction);
checkboxUppercase.addEventListener("click", checkboxListenerFunction);
checkboxNumeric.addEventListener("click", checkboxListenerFunction);
checkboxSpecial.addEventListener("click", checkboxListenerFunction);

// Add event listener to the reset button
buttonReset.addEventListener("click", function() {
  checkboxLength.checked = false;
  checkboxLowercase.checked = true;
  checkboxUppercase.checked = false;
  checkboxNumeric.checked = false;
  checkboxSpecial.checked = false;
  criteriaLength(); // Call function to hide length input
});
