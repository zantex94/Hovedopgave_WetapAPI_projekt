"use strict";
const $ = function (rs) {
  return document.getElementById(rs);
};
// delete a user on user_panel
  function deleteUser(id) {
    if (confirm("Sikker på at fjerne profilen permanent?")) {
        location.href = '/user_panel/deleteuser/' + id;
    }
}
// delete a user from profile
function deleteUserProfile(id) {
  if (confirm("Sikker på at fjerne profilen permanent profilen?")) {
      location.href = '/profile/deleteuserProfile/' + id;
  }
}

const init = function () {
  if ($("profile_form")) {
    console.log("in scope event form");
    // looking for particular form, if found setup validation
    $("profile_form").addEventListener("submit", function(event){
      console.log("in scope event");
      if(event.submitter.matches('#removeProfile')){
        event.preventDefault();
      }
    });
  }
};
window.addEventListener("load", init);
