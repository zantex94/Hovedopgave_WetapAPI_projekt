var express = require('express');
var router = express.Router();
const APIcontroller = require("../controller/APIcontroller");
const passport = require("passport");
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});

/* CHECK IF LOGGED IN - Use APIcontroller.isLoggedIn FIRST, on relevant routes, to force login */
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next(); // If user is authenticated in the session, carry on
    res.redirect("/login"); // if false, redirect to login
  };

  /* LOGIN ROUTES */
router
.route("/login")
.get(APIcontroller.login)
.post(
  // Passport settings
  passport.authenticate("local-login", {
    successRedirect: "/dashboard", // Redirect on success
    failureRedirect: "/login", // Redirect back to login if error
    failureFlash: true, // Allow flash messages
  }),
  APIcontroller.loginSuccess
);

/* SIGNUP ROUTES */
router
.route("/register")
.get(APIcontroller.register)
.post(
  // Passport settings
  passport.authenticate("local-register", {
    successRedirect: "/confirm", // Redirect on success
    failureRedirect: "/register", // Redirect back to signup if error
    failureFlash: true, // Allow flash messages
  })
);

/* LOGOUT ROUTES */
router
.route("/logout")
.get(APIcontroller.logout);



/**Index home screen */
router.route("/").get(APIcontroller.index);

// /**login screen for Wetap API */
// router.route("/login").get(APIcontroller.login);
// /**register screen for Wetap API */
// router.route("/register").get(APIcontroller.register);



/**confrim screen for Wetap API */
router.route("/confirm").get(APIcontroller.confirm);
/**profile screen for Wetap API */
router.route("/profile").get(APIcontroller.profile);
/**create company screen for Wetap API */
router.route("/create_company").get(APIcontroller.create_company);
/**create company screen for Wetap API */
router.route("/update_company").get(APIcontroller.update_company);
/**create company product screen for Wetap API */
router.route("/create_company_product").get(APIcontroller.create_company_product);
/**create company product screen for Wetap API */
router.route("/update_company_product").get(APIcontroller.update_company_product);
/**user panel screen for Wetap API */
router.route("/user_panel").get(APIcontroller.user_panel);
/**product panel screen for Wetap API */
router.route("/product_panel").get(APIcontroller.product_panel);
/**create product bottle screen for Wetap API */
router.route("/create_product_bottle").get(APIcontroller.create_product_bottle);
/**update product bottle screen for Wetap API */
router.route("/update_product_bottle").get(APIcontroller.update_product_bottle);
/**create product water supply screen for Wetap API */
router.route("/create_product_water_supply").get(APIcontroller.create_product_water_supply);
/**update product water supply screen for Wetap API */
router.route("/update_product_water_supply").get(APIcontroller.update_product_water_supply);
/**dashboard screen for Wetap API */
router.route("/dashboard").get(APIcontroller.dashboard);
/**dashboard company screen for Wetap API */
router.route("/dashboard_company").get(APIcontroller.dashboard_company);


module.exports = router;
