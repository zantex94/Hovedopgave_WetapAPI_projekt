var express = require('express');
var router = express.Router();
const customerController = require("../controller/customerController");
const passport = require("passport");

/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.render("./Wetap customers/test", {
      title: "Bekræftelse",
    });

});

//Get dashboard company by CVR
// router
// .route("/customer/Wetap customers/test/:id").get(customerController.test);

// ====================== /* DASHBOARD company*/ ====================== //

//Get dashboard company by CVR
router
.route("/dashboard_customer").get(customerController.dashboard_company);
// ============================================ //
// ====================== /* User_panel company*/ ====================== //

//Get User panel
router
.route("/user_panel_customer").get(customerController.user_panel);
router
.route("/user_panel_customer/update/useractive/:id").get(customerController.user_status_active);
router
.route("/user_panel_customer/update/usernotactive/:id").get(customerController.user_status_notactive);
router
.route("/user_panel_customer/deleteuser/:id").get(customerController.deleteuser);
// ============================================ //

 /* LOGIN ROUTES */
 router
 .route("/login_customer")
 .get(customerController.login)
 .post(
   // Passport settings
   passport.authenticate("local-login-customer", {
     successRedirect: "/customer/dashboard_customer", // Redirect on success
     failureRedirect: "/customer/login_customer", // Redirect back to login if error
     failureFlash: true, // Allow flash messages
   }),
   customerController.loginSuccess
 );
 
 /* register ROUTES */
 router
 .route("/register_customer")
 .get(customerController.register)
 .post(
   // Passport settings
   passport.authenticate("local-register-customer", {
     successRedirect: "/customer/confirm", // Redirect on success
     failureRedirect: "/customer/register_customer", // Redirect back to signup if error
     failureFlash: true, // Allow flash messages
   })
 );
 
 /* LOGOUT ROUTES */
 router
 .route("/logout")
 .get(customerController.logout);
 
 /**confrim screen for Wetap API */
 router.route("/confirm").get(customerController.confirm);

  /* Profile ROUTES */
  router
  .route("/profile_customer")
  .get(customerController.profile)
  .post(customerController.update_profile);

  router
.route("/customer/deleteuserProfile/:id").get(customerController.deletecustomerprofile);



module.exports = router;
