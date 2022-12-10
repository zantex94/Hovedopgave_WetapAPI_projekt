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
// delete a user on user_panel
function deleteCustomer(id) {
  if (confirm("Sikker på at fjerne profilen permanent?")) {
      location.href = '/user_panel_customer/deleteCustomer/' + id;
  }
}
// delete a product on product_panel
function deleteProduct(id) {
  if (confirm("Sikker på at fjerne produktet permanent? Dette kan medføre alvorlige konsekvenser for kunder der gør brug af dette!")) {
      location.href = '/product_panel/deleteProduct/' + id;
  }
}
// delete a user from Wetap
function deleteUserProfile(id) {
  if (confirm("Sikker på at fjerne profilen permanent profilen?")) {
      location.href = '/profile/deleteuserProfile/' + id;
  }
}
// delete a customer
function deleteUserProfileCustomer(id) {
  if (confirm("Sikker på at fjerne kunde profilen permanent?")) {
      location.href = '/user_panel_customer/deleteCustomer/' + id;
  }
}
// delete a company from wetap
function deleteCompany(cvr) {
  if (confirm("Sikker på at fjerne firmaet permanent fra Wetap?")) {
      location.href = '/dashboard_company/delete/' + cvr;
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
  //Selects all .closeData elements
var parents = document.querySelectorAll('.boxDiv_company');

//For each .closeData, find the first div and stops the propagation
for(var i = 0; i < parents.length; i++) {
    var child = parents[i].querySelector('div');
    child.addEventListener('click', function(pEvent) {
        pEvent.stopPropagation();
    })
}
};
window.addEventListener("load", init);
