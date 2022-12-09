const model = require("../model/brugere");
const model_company_dashboard = require("../model/company_dashboard");
const model_product = require("../model/product");
const model_company_product = require("../model/company_product");
const model_customer_company_product = require("../model/customer_dashboard");


const bcrypt = require("bcrypt");

// ====================== /* PASSPORT */ ====================== //

/* CHECK IF LOGGED IN - Use APIcontroller.isLoggedIn FIRST, on relevant routes, to force login */
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next(); // If user is authenticated in the session, carry on
  res.redirect("/login"); // if false, redirect to login
};
/* LOGIN */
exports.test = (req, res) => {
  console.log('worked');
  res.redirect('/customer/user_panel_customer');
};

/* LOGIN */
exports.login = (req, res) => {
  // console.log(req.user);
  res.render("./Wetap customers/login_customer", { 
  message: req.flash("loginMessage"),
   title: "Login" 
  });
};

exports.loginSuccess = (req, res) => {
  if (req.body.remember) {
    req.session.cookie.maxAge = 60 * 60 * 24; // 86400 seconds = 1 day
  } else {
    req.session.cookie.expires = false;
  }
  res.redirect("/customer/login_customer");
};

/* REGISTER */
exports.register = (req, res) => {
  res.render("./Wetap customers/register_customer", {
    message: req.flash("signupMessage"),
    title: "Opret bruger",
  });
};
/* LOGOUT */
exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect("/customer/login_customer");
  });
};
  /* GET confrim PAGE */
  exports.confirm = (req, res) => {
    res.render("./Wetap customers/confirm", {
      title: "Bekræftelse",
    });
  };
 

// ============================================ //
// ====================== /* PROFILE */ ====================== //
 /* GET profile PAGE */
 exports.profile = (req, res) => {
  // console.log(req.user);
  res.render("./Wetap customers/profile_customer", {
    title: "Profil",
    user: req.user,
  });
};
  /* Update profile PAGE */
  exports.update_profile = async(req, res) => {
    //checking if the user puts ind old and new password in field
    if(req.body.Old_password > 0 && req.body.New_password > 0){
      //compare old one with exsisting one (password)
      if (bcrypt.compareSync(req.body.Old_password, req.user.password)){
        let newPasword = bcrypt.hashSync(req.body.New_password.toString(), 10)
      //updating user in database.
      let updateBruger = await model.updateWetapBruger(req, res, newPasword);
      //get updated user from database.
      let updatedBruger = await model.GetUpdatedWetapBruger(req, res);
        //updating user session.
      console.log(updatedBruger[0][0]);
      req.user.navn = updatedBruger[0][0].navn;
      req.user.email = updatedBruger[0][0].email;
      req.user.adresse = updatedBruger[0][0].adresse;
      req.user.postnummer = updatedBruger[0][0].postnummer;
      req.user._by = updatedBruger[0][0]._by;
      req.user.telefonnummer = updatedBruger[0][0].telefonnummer;
      req.user.status_bruger = updatedBruger[0][0].status_bruger;
      req.user.password = updatedBruger[0][0].password;
      req.user.rolle = updatedBruger[0][0].rolle;
      //successfull.
      res.render("profile", {
        title: "Profil",
        user: req.user,
        success: 'Bruger opdateret'
      });
      }else{
        //not successful. password dosen´t match.
        res.render("profile", {
          title: "Profil",
          user: req.user,
          error: 'Password matcher ikke. Kunne ikke opdatere'
        });
      }
    }else{
      let updateBruger = await model.updateWetapBruger(req, res);
      let updatedBruger = await model.GetUpdatedWetapBruger(req, res);
        //updating user session.
      req.user.navn = updatedBruger[0][0].navn;
      req.user.email = updatedBruger[0][0].email;
      req.user.adresse = updatedBruger[0][0].adresse;
      req.user.postnummer = updatedBruger[0][0].postnummer;
      req.user._by = updatedBruger[0][0]._by;
      req.user.telefonnummer = updatedBruger[0][0].telefonnummer;
      req.user.status_bruger = updatedBruger[0][0].status_bruger;
      req.user.password = updatedBruger[0][0].password;
      req.user.rolle = updatedBruger[0][0].rolle;
        res.render("profile", {
          title: "Profil",
          user: req.user,
          success: 'Bruger opdateret'
        });
      
    }
  };
  /* delete profile PAGE */
  exports.deletecustomerprofile = async(req, res) => {
    console.log('in scope');
    let deleteUser = await model.deleteWetapProfile(req, res);
    if(deleteUser){
      res.redirect("/customer/login_customer");
    }
  };
// ============================================ //
// ====================== /* DASHBOARD */ ====================== //

  /* GET product panel PAGE */
  exports.dashboard_company = async(req, res) => {
    let getAllProducts = await model_customer_company_product.GetAllCompanyProducts(req, res);
    let countAllProducts = await model_customer_company_product.CountCompanyProducts(req, res);
    let getFirmaTitle = await model_customer_company_product.GetCompanyTitle(req, res);
    res.render("./Wetap customers/dashboard_customer", {
      dashboard: "active",
      getAllProducts: getAllProducts[0],
      countAllProducts: countAllProducts[0],
      getFirmaTitle: getFirmaTitle[0],
      user: req.user,
    });
  };
// ============================================ //
// ====================== /* DASHBOARD */ ====================== //

    /* GET user panel PAGE */
    exports.user_panel = async(req, res) => {
      let brugere = await model_customer_company_product.GetCustomerBrugere(req, res);
      console.log(brugere[0]);
      res.render("./Wetap customers/user_panel_customer", {
        title: "Brugerpanel",
        brugere: brugere[0],
        user: req.user,
      });
    };

      /* Update user status active PAGE */
      exports.user_status_active = async(req, res) => {
        console.log('working');
        let updatebool = await model_customer_company_product.UpdateCustomerStatusAktiv(req, res);
        if(updatebool){
          res.redirect('/customer/user_panel_customer');
        }
    };
        /* Update user status to deaktivate PAGE */
        exports.user_status_notactive = async(req, res) => {
        let updatebool = await model_customer_company_product.UpdateCustomerStatusDeaktiveret(req, res);
        if(updatebool){
          res.redirect('/customer/user_panel_customer');
        }
    };
      /* delete bruger PAGE */
      exports.deleteuser = async(req, res) => {
        let deleteuser = await model_customer_company_product.deleteCustomerBruger(req, res);
        if(deleteuser){
          res.redirect('/customer/user_panel_customer');
        }
    };
// ============================================ //


