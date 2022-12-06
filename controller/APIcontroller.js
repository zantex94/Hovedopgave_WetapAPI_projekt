const model = require("../model/brugere");
const model_company_dashboard = require("../model/company_dashboard");
const model_product = require("../model/product");

const bcrypt = require("bcrypt");
// var logout = require('express-passport-logout');
// ====================== /* INDEX */ ====================== //
/* GET INDEX PAGE */
exports.index = (req, res) => {
  res.render("index", {
    title: "Velkommen til min hovedopgave",
  });
};
// ====================== /* PASSPORT */ ====================== //

/* LOGIN */
exports.login = (req, res) => {
  console.log(req.user);
  res.render("login", { 
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
  res.redirect("/login");
};

/* REGISTER */
exports.register = (req, res) => {
  res.render("register", {
    message: req.flash("signupMessage"),
    title: "Opret bruger",
  });
};
/* LOGOUT */
exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
};
  /* GET confrim PAGE */
  exports.confirm = (req, res) => {
    res.render("confirm", {
      title: "Bekræftelse",
    });
  };

// ============================================ //
// ====================== /* PROFILE */ ====================== //
    /* GET profile PAGE */
  exports.profile = (req, res) => {
    // console.log(req.user);
    res.render("profile", {
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
  exports.deleteuserprofile = async(req, res) => {
    let deleteUser = await model.deleteWetapProfile(req, res);
    if(deleteUser){
      res.redirect("/login");
    }
  };

  // ============================================ //
  // ====================== /* USER PANEL */ ====================== //
    /* GET user panel PAGE */
    exports.user_panel = async(req, res) => {
      let brugere = await model.GetWetapBrugere(req, res);
      // console.log(brugere[0])
      res.render("user_panel", {
        title: "Brugerpanel",
        brugere: brugere[0],
        user: req.user,
      });
    };
    /* Update user status PAGE */
    exports.user_status_active = async(req, res) => {
      let updatebool = await model.UpdateWetapBrugereStatusAktiv(req, res);
      if(updatebool){
        res.redirect('/user_panel');
      }
    };
     /* Update user status PAGE */
     exports.user_status_notactive = async(req, res) => {
      let updatebool = await model.UpdateWetapBrugereStatusDeaktiveret(req, res);
      if(updatebool){
        res.redirect('/user_panel');
      }
    };
    /* delete bruger PAGE */
    exports.deleteuser = async(req, res) => {
      let deleteuser = await model.deleteWetapBruger(req, res);
      if(deleteuser){
        res.redirect('/user_panel');
      }
    };

// ============================================ //

// ====================== /* DASHBOARD PANEL */ ====================== //
    /* GET dashboard PAGE */
    exports.dashboard = async(req, res) => {
      let allCompanies = await model_company_dashboard.GetAllCompanies(req, res);
    // console.log(req.user);
    res.render("dashboard", {
      title: "Dashboard",
      dashboard: "active",
      user: req.user,
      allCompanies: allCompanies[0]
    });
  };
  /* GET create company PAGE */
  exports.create_company = async(req, res) => {
    // call all bruger erhverv customers to be selected.
    let brugereErhverv = await model_company_dashboard.GetBrugereErhverv(req, res);
    res.render("create_company", {
      title: "Opret Firma",
      dashboard: "active",
      brugereErhverv: brugereErhverv[0],
    });
  };
  /* INSERT company PAGE */
  exports.insert_company = async(req, res) => {
    let brugereErhverv = await model_company_dashboard.GetBrugereErhverv(req, res);
    console.log(req.body);
    if(req.body.responsible_person == 'Vælg'){
    res.render("create_company", {
      title: "Opret Firma",
      dashboard: "active",
      brugereErhverv: brugereErhverv[0],
      error: "Der skal vælges en ansvarlig!"
    });
    }else{
      let newCompany = await model_company_dashboard.InsertNewCompany(req, res);
      if(newCompany){
        //updating user so that it can act as a admin.
        let newAdmin = await model_company_dashboard.UpdateUserAdminCompany(req, res);
        let allCompanies = await model_company_dashboard.GetAllCompanies(req, res);
        if(newAdmin){
          res.render("dashboard", {
            title: "Dashboard",
            dashboard: "active",
            success: "Firma oprettet!",
            allCompanies: allCompanies[0]
          });
        }
      }else{
        res.render("create_company", {
          title: "Opret Firma",
          dashboard: "active",
          error: "Firma eksistere allerede!",
          brugereErhverv: brugereErhverv[0],
        });
      }

    }
  };
  /* GET update company PAGE */
  exports.update_company = async(req, res) => {
    let getCompany = await model_company_dashboard.GetCvrCompany(req, res);
    let brugereErhverv = await model_company_dashboard.GetBrugereErhverv(req, res);
    console.log(getCompany[0]);
    res.render("update_company", {
      title: "Opdatere Firma",
      dashboard: "active",
      getCompany: getCompany[0],
      brugereErhverv: brugereErhverv[0],
    });
  };
   /* Update company PAGE */
   exports.updating_company = async(req, res) => {
    let updateCompany = await model_company_dashboard.UpdateCompany(req, res);
    if(updateCompany){
      // update all erhverv on cvr to be kunde.
      let updateCvrAdmin = await model_company_dashboard.UpdateCompanyAdmin(req, res);
      if(updateCvrAdmin){
      // setup new admin for cvr company
      let newAdmin = await model_company_dashboard.UpdateUserAdminCompany(req, res);
        if(newAdmin){
          let allCompanies = await model_company_dashboard.GetAllCompanies(req, res);
            res.render("dashboard", {
              title: "Dashboard",
              dashboard: "active",
              success: "Firma opdateret!",
              allCompanies: allCompanies[0]
            });
      }
    }
      
    }else{
      let getCompany = await model_company_dashboard.GetCvrCompany(req, res);
      let brugereErhverv = await model_company_dashboard.GetBrugereErhverv(req, res);
      res.render("update_company", {
        title: "Opdatere Firma",
        dashboard: "active",
        getCompany: getCompany[0],
        brugereErhverv: brugereErhverv[0],
        error: "Kunne ikke opdatere. Tjek venligst felterne!"
      });
    }
  
  };
  // ============================================ //

  // ====================== /* PRODUCT PANEL */ ====================== //

    /* GET product panel PAGE */
    exports.product_panel = async(req, res) => {
      let getAllProducts = await model_product.GetWetapProducts(req, res);
      res.render("product_panel", {
        title: "Produkt panel",
        produkt: "active",
        getAllProducts: getAllProducts[0],
      });
    };

      /* GET create product water supply panel PAGE */
      exports.create_product_water_supply = (req, res) => {
      res.render("create_product_water_supply", {
        title: "Opret vandpost",
        produkt: "active",
      });
    };

      /* insert create product water supply panel PAGE */
      exports.insert_product_water_supply = async(req, res) => {
        let insertProduct = await model_product.InsertWetapProduct(req, res);

        // console.log(req.body);
        // console.log(req.file.buffer);
        if(insertProduct){
          let getAllProducts = await model_product.GetWetapProducts(req, res);
          res.render("product_panel", {
            title: "Produkt panel",
            produkt: "active",
            success: "Produkt oprettet!",
            getAllProducts: getAllProducts[0],
          });
        }else{
          res.render("create_product_water_supply", {
            title: "Opret vandpost",
            produkt: "active",
            error: 'Kunne ikke oprette produkt',
          });
        }
        };
      /* Delete a product PAGE */
      exports.product_delete = async(req, res) => {
        let deleteProduct = await model_product.deleteWetapProduct(req, res);
        let getAllProducts = await model_product.GetWetapProducts(req, res);
        if(deleteProduct){
          res.redirect('/product_panel');
        }else{
          res.render("product_panel", {
            title: "Produkt panel",
            produkt: "active",
            error: "Produkt kunne ikke fjernes!",
            getAllProducts: getAllProducts[0],
          });
        }
       
      };
  
      /* GET update product water supply panel PAGE */
      exports.update_product_water_supply = async(req, res) => {
        let getAProduct = await model_product.GetAWetapProduct(req, res);
        // console.log(getAProduct[0]);
      res.render("update_product_water_supply", {
        title: "Opdatere vandpost",
        produkt: "active",
        getAProduct: getAProduct[0],
      });
    };

    // ============================================ //

    
    /* GET create bottle product panel PAGE */
    exports.create_product_bottle = (req, res) => {
      res.render("create_product_bottle", {
        title: "Opret flaske",
        produkt: "active",
      });
    };
    /* GET update bottle product panel PAGE */
    exports.update_product_bottle = (req, res) => {
      res.render("update_product_bottle", {
        title: "Opdatere flaske",
        produkt: "active",
      });
    };
      /* GET update product water supply panel PAGE */
    exports.dashboard_company = (req, res) => {
      res.render("dashboard_company", {
        title: "Faarup",
        dashboard: "active",
      });
    };

    /* GET create company product PAGE */
    exports.create_company_product = (req, res) => {
      res.render("create_company_product", {
        title: "Opret firma produkt",
        dashboard: "active",
      });
    };
      /* GET update company product PAGE */
      exports.update_company_product = (req, res) => {
        res.render("update_company_product", {
          title: "Opdatere firma produkt",
          dashboard: "active",
        });
      };
