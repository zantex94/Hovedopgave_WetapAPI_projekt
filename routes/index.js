var express = require('express');
var router = express.Router();
const APIController = require("../controller/APIcontroller");

/**Index home screen */
router.route("/").get(APIController.index);

/**login screen for Wetap API */
router.route("/login").get(APIController.login);
/**confrim screen for Wetap API */
router.route("/register").get(APIController.register);
/**confrim screen for Wetap API */
router.route("/confirm").get(APIController.confirm);
/**profile screen for Wetap API */
router.route("/profile").get(APIController.profile);
/**create company screen for Wetap API */
router.route("/create_company").get(APIController.create_company);
/**create company screen for Wetap API */
router.route("/update_company").get(APIController.update_company);
/**create company product screen for Wetap API */
router.route("/create_company_product").get(APIController.create_company_product);
/**create company product screen for Wetap API */
router.route("/update_company_product").get(APIController.update_company_product);
/**user panel screen for Wetap API */
router.route("/user_panel").get(APIController.user_panel);
/**product panel screen for Wetap API */
router.route("/product_panel").get(APIController.product_panel);
/**create product bottle screen for Wetap API */
router.route("/create_product_bottle").get(APIController.create_product_bottle);
/**update product bottle screen for Wetap API */
router.route("/update_product_bottle").get(APIController.update_product_bottle);
/**create product water supply screen for Wetap API */
router.route("/create_product_water_supply").get(APIController.create_product_water_supply);
/**update product water supply screen for Wetap API */
router.route("/update_product_water_supply").get(APIController.update_product_water_supply);
/**dashboard screen for Wetap API */
router.route("/dashboard").get(APIController.dashboard);
/**dashboard company screen for Wetap API */
router.route("/dashboard_company").get(APIController.dashboard_company);


module.exports = router;
