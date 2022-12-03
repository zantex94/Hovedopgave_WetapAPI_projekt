"use strict";
const $ = function (rs) {
  return document.getElementById(rs);
};

const validate = function (e) {
  // validation example, if not alike, prevent submission
  if ($("register-form").password.value !== $("register-form").password2.value) {
    e.preventDefault();
    window.alert("Adgangskoder giver ingen match");
    console.log($("register-form").password + ":" + $("register-form").password2);
    $("password").select();
    return false;
  }
};

const init = function () {
  if ($("register-form")) {
    // looking for particular form, if found setup validation
    $("register-form").addEventListener("submit", validate);
  }
};
window.addEventListener("load", init);

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function myFunction() {
  var myDIV = document.getElementById("myDIV");
  var moveto = document.getElementById("moveto");
  moveto.append(myDIV);
}
