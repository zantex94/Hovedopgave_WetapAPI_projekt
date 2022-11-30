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
    /* GET create company product PAGE */
    exports.create_company_product = (req, res) => {
    res.render("create_company_product", {
      title: "Opret firma produkt",
    });
  };
    /* GET update company product PAGE */
    exports.update_company_product = (req, res) => {
      res.render("update_company_product", {
        title: "Opdatere firma produkt",
      });
    };
    /* GET user panel PAGE */
    exports.user_panel = (req, res) => {
      res.render("user_panel", {
        title: "Brugerpanel",
      });
    };
    /* GET product panel PAGE */
    exports.product_panel = (req, res) => {
      res.render("product_panel", {
        title: "Produkt panel",
      });
    };
    /* GET create bottle product panel PAGE */
    exports.create_product_bottle = (req, res) => {
      res.render("create_product_bottle", {
        title: "Opret flaske",
      });
    };
    /* GET update bottle product panel PAGE */
    exports.update_product_bottle = (req, res) => {
      res.render("update_product_bottle", {
        title: "Opdatere flaske",
      });
    };
    /* GET create product water supply panel PAGE */
    exports.create_product_water_supply = (req, res) => {
      res.render("create_product_water_supply", {
        title: "Opret vandpost",
      });
    };
     /* GET update product water supply panel PAGE */
     exports.update_product_water_supply = (req, res) => {
      res.render("update_product_water_supply", {
        title: "Opdatere vandpost",
      });
    };
     /* GET update product water supply panel PAGE */
     exports.dashboard = (req, res) => {
      res.render("dashboard", {
        title: "Dashboard",
      });
    };
