// Assignment Code
var generateBtn = document.querySelector("#generate");
var checkboxLength = document.querySelector("#checkbox-length");
var inputLengthSet = document.querySelector("#length-set");

var passwordLength = 8;

function criteriaLength() {
  let lengthInputDiv = document.querySelector("#length-input-div");
  if(checkboxLength.checked) {
    lengthInputDiv.style.display = "block";
  }
  else {
    lengthInputDiv.style.display = "none";
    passwordLength = 8;
  }
}

function validateLength() {
  let inputLength = document.querySelector("#input-length");
  if(inputLength.value < 8) {
    inputLength.value = 8;
  }
  else if(inputLength.value > 128) {
    inputLength.value = 128
  }

  passwordLength = Number(inputLength.value);
}

function generatePassword() {

}

// Write password to the #password input
function writePassword() {
  document.querySelector("#password").value = generatePassword();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
inputLengthSet.addEventListener("click", validateLength)
checkboxLength.addEventListener("click", criteriaLength)
