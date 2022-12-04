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
