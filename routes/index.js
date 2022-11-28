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

module.exports = router;
