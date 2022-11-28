// const model = require("../models/products");

/* GET INDEX PAGE */
exports.index = (req, res) => {
    res.render("index", {
      title: "Velkommen til min hovedopgave",
    });
  };

  /* GET Login PAGE */
exports.login = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};
  /* GET register PAGE */
  exports.register = (req, res) => {
    res.render("register", {
      title: "Opret bruger",
    });
  };
  /* GET confrim PAGE */
  exports.confirm = (req, res) => {
    res.render("confirm", {
      title: "Bekræftelse",
    });
  };

    /* GET profile PAGE */
  exports.profile = (req, res) => {
    res.render("profile", {
      title: "Profil",
    });
  };
  /* GET create company PAGE */
  exports.create_company = (req, res) => {
    res.render("create_company", {
      title: "Opret Firma",
    });
  };
  /* GET update company PAGE */
  exports.update_company = (req, res) => {
    res.render("update_company", {
      title: "Opdatere Firma",
    });
  };
    /* GET update company PAGE */
    exports.create_company_product = (req, res) => {
    res.render("create_company_product", {
      title: "Opret firma produkt",
    });
  };