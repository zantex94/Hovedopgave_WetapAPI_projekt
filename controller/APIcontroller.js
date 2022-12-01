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
      dashboard: "active",
    });
  };
  /* GET update company PAGE */
  exports.update_company = (req, res) => {
    res.render("update_company", {
      title: "Opdatere Firma",
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
    /* GET user panel PAGE */
    exports.user_panel = (req, res) => {
      res.render("user_panel", {
        title: "Brugerpanel",
        brugere: "active",
      });
    };
    /* GET product panel PAGE */
    exports.product_panel = (req, res) => {
      res.render("product_panel", {
        title: "Produkt panel",
        produkt: "active",
      });
    };
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
    /* GET create product water supply panel PAGE */
    exports.create_product_water_supply = (req, res) => {
      res.render("create_product_water_supply", {
        title: "Opret vandpost",
        produkt: "active",
      });
    };
     /* GET update product water supply panel PAGE */
     exports.update_product_water_supply = (req, res) => {
      res.render("update_product_water_supply", {
        title: "Opdatere vandpost",
        produkt: "active",
      });
    };
     /* GET dashboard PAGE */
     exports.dashboard = (req, res) => {
      res.render("dashboard", {
        title: "Dashboard",
        dashboard: "active",
      });
    };
      /* GET update product water supply panel PAGE */
      exports.dashboard_company = (req, res) => {
      res.render("dashboard_company", {
        title: "Faarup",
        dashboard: "active",
      });
    };
