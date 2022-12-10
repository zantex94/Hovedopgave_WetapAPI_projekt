var express = require('express');
var router = express.Router();
const customerController = require("../controller/customerController");
const passport = require("passport");

// ====================== /* DASHBOARD company*/ ====================== //

//Get dashboard company by CVR
router
.route("/dashboard_customer").get(customerController.isLoggedIn,customerController.dashboard_company);
// ============================================ //
// ====================== /* User_panel company*/ ====================== //

//Get User panel
router
.route("/user_panel_customer").get(customerController.isLoggedIn,customerController.user_panel);

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

// ====================== /* DASHBOARD company*/ ====================== //
router
  .route("/profile_customer")
  .get(customerController.isLoggedIn,customerController.profile)
  .post(customerController.isLoggedIn,customerController.update_profile);
// ============================================ //



module.exports = router;
