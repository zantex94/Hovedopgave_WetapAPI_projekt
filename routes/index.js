var express = require('express');
var router = express.Router();
const APIcontroller = require("../controller/APIcontroller");
const passport = require("passport");
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});
const customerController = require("../controller/customerController");



// ====================== /* INDEX */ ====================== //
/**Index home screen */
router.route("/").get(APIcontroller.index);

// ============================================ //

// ====================== /* PASSPORT */ ====================== //

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

/* register ROUTES */
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

/**confrim screen for Wetap API */
router.route("/confirm").get(APIcontroller.confirm);

// ============================================ //

  // ====================== /* USER PANEL */ ====================== //

/**user panel screen for Wetap API */
router
.route("/user_panel").get(APIcontroller.isLoggedIn,APIcontroller.user_panel);

router
.route("/user_panel/update/useractive/:id").get(APIcontroller.isLoggedIn,APIcontroller.user_status_active);
router
.route("/user_panel/update/usernotactive/:id").get(APIcontroller.isLoggedIn,APIcontroller.user_status_notactive);
router
.route("/user_panel/deleteuser/:id").get(APIcontroller.isLoggedIn,APIcontroller.deleteuser);

// ============================================ //
// ====================== /* PROFILE */ ====================== //
/**profile screen for Wetap API */
router
.route("/profile")
.get(APIcontroller.profile)
.post(APIcontroller.update_profile);
router
.route("/profile/deleteuserProfile/:id").get(APIcontroller.isLoggedIn,APIcontroller.deleteuserprofile);

// ============================================ //
// ====================== /* DASHBOARD */ ====================== //
/**dashboard screen for Wetap API */
router.route("/dashboard").get(APIcontroller.isLoggedIn,APIcontroller.dashboard);
/**create company screen for Wetap API */
router.route("/create_company")
.get(APIcontroller.isLoggedIn,APIcontroller.create_company)
.post(APIcontroller.isLoggedIn,APIcontroller.insert_company);
/**update company screen for Wetap API */
// router.route("/update_company").get(APIcontroller.update_company);
router
.route("/update_company/:cvr").get(APIcontroller.isLoggedIn,APIcontroller.update_company);
router
.route("/update_company").post(APIcontroller.isLoggedIn,APIcontroller.updating_company);



// ============================================ //
// ====================== /* DASHBOARD company*/ ====================== //
//Get dashboard company by CVR
router
.route("/dashboard_company/:cvr").get(APIcontroller.isLoggedIn,APIcontroller.dashboard_company);
//Get dashboard create company by CVR
router
.route("/create_company_product/:cvr").get(APIcontroller.isLoggedIn,APIcontroller.create_company_product);
// Create company product
router
.route("/create_company_product").post(APIcontroller.isLoggedIn,upload.single('Product_file'),APIcontroller.creating_company_product);
// Create company product
router
.route("/dashboard_company/delete/:cvr").get(APIcontroller.isLoggedIn,APIcontroller.delete_company);
//Get create company product when failed
router.route("/create_company_product_fail/:cvr").get(APIcontroller.isLoggedIn,APIcontroller.get_create_company_product_fail);
//Get create company product when success
router.route("/create_company_product_success/:cvr").get(APIcontroller.isLoggedIn,APIcontroller.get_create_company_product_success);
//Get create company product when success
router.route("/dashboard_company_fail/:cvr").get(APIcontroller.isLoggedIn,APIcontroller.dashboard_company_fail);

//Post update company product
router.route("/update_company_product").post(APIcontroller.isLoggedIn,upload.single('Product_file'),APIcontroller.updating_company_product);
//Get update company product
router.route("/update_company_product/:produktnummer").get(APIcontroller.isLoggedIn,APIcontroller.update_company_product);
//Get update company product when error
router.route("/update_company_product_error/:produktnummer").get(APIcontroller.isLoggedIn,APIcontroller.get_updating_company_product_fail);
//Get update company product when success
router.route("/update_company_product_success/:produktnummer").get(APIcontroller.isLoggedIn,APIcontroller.get_updating_company_product_success);
//Get update company product when updaing picture fails
router.route("/update_company_product_errorPicture/:produktnummer").get(APIcontroller.isLoggedIn,APIcontroller.get_updating_company_product_picture_fail);

// ============================================ //

// ====================== /* PRODUCT  */ ====================== //

/**product panel screen for Wetap API */
router.route("/product_panel").get(APIcontroller.isLoggedIn,APIcontroller.product_panel);
/**create product water supply screen for Wetap API */
router
.route("/create_product_water_supply")
.get(APIcontroller.isLoggedIn,APIcontroller.create_product_water_supply)
.post(APIcontroller.isLoggedIn,upload.single('Product_file'),APIcontroller.insert_product_water_supply);


/**update product water supply screen for Wetap API */
// router.route("/update_product_water_supply").get(APIcontroller.update_product_water_supply);
/**delete product water supply in  Wetap API */
router
.route("/product_panel/deleteProduct/:id").get(APIcontroller.isLoggedIn,APIcontroller.product_delete);
/**update product water supply in  Wetap API */
router
.route("/product_panel/:id").get(APIcontroller.isLoggedIn,APIcontroller.update_product_water_supply);
router
.route("/update_product_water_supply")
.post(APIcontroller.isLoggedIn,upload.single('Product_file'),APIcontroller.updating_product_water_supply);

// ============================================ //



/**create company product screen for Wetap API */
// router.route("/update_company_product").get(APIcontroller.update_company_product);
// /**create product bottle screen for Wetap API */
// router.route("/create_product_bottle").get(APIcontroller.create_product_bottle);
// /**update product bottle screen for Wetap API */
// router.route("/update_product_bottle").get(APIcontroller.update_product_bottle);
/**create product water supply screen for Wetap API */

// router.route("/dashboard_company").get(APIcontroller.dashboard_company);

//Routers with url parameters must be displayed here.
//Customers 
router
.route("/user_panel_customer/update/useractive/:id").get(customerController.user_status_active);
router
.route("/user_panel_customer/update/usernotactive/:id").get(customerController.user_status_notactive);

router
.route("/user_panel_customer/deleteCustomer/:id").get(customerController.deleteuser);

module.exports = router;
