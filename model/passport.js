// Load passport strategy - https://www.passportjs.org/packages/passport-local/
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { pool } = require("./db");
const { body, validationResult } = require('express-validator');


// Exporting this function to be used in app.js
module.exports = function (passport) {
  /* PASSPORT SESSION SETUP */
  // Serialize the user for the session
  //create cookie
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  // Deserialize
  // find cookie.
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  /* LOCAL STRATEGY SIGNUP FOR WETAP */
  passport.use(
    "local-register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        console.log(email);
        pool.query(
          "SELECT * FROM brugere WHERE email = ?",
          [email],
          function (err, rows) {
            if (err) return done(err);
            if (rows.length) {
              return done(
                null,
                false,
                req.flash("signupMessage", "Denne email er allerede i brug")
              );
            } else {              
                let newUserMysql = {
                  navn: req.body.name,
                  telefonnummer: req.body.phonenumber,
                  email: email,
                  adresse: req.body.address,
                  postnummer: req.body.zip_code,
                  _by: req.body.city,
                  password: bcrypt.hashSync(password.toString(), 10),
                  rolle: 'medarbejder',
                  status_bruger: 'deaktiveret',
                };

                console.log(newUserMysql);
                const insertQuery =
                "INSERT INTO brugere ( email, navn, adresse, postnummer, _by, telefonnummer, status_bruger, password, rolle) values (?,?,?,?,?,?,?,?,?)";
              
                  pool.query(
                  insertQuery,
                  [
                    newUserMysql.email,
                    newUserMysql.navn,
                    newUserMysql.adresse,
                    newUserMysql.postnummer,
                    newUserMysql._by,
                    newUserMysql.telefonnummer,
                    newUserMysql.status_bruger,
                    newUserMysql.password,
                    newUserMysql.rolle,
                  ],
                  function (err, rows) {
                    if(err){
                      console.log(err);
                    }
                    console.log(rows);
                    return done(null, rows);
                  }
                );
            }
          }
        );
      }
    )
  );

  /* LOCAL STRATEGY LOGIN FOR WETAP*/
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        pool.query(
          "SELECT * FROM brugere WHERE email = ?",
          [email],
          function (err, rows) {
            if (err) return done(err);
            if (!rows.length) {
              return done(
                null,
                false,
                req.flash("loginMessage", "Denne bruger eksisterer ikke")
              );
            }
                // password must be at least 5 chars long
                body('password').escape(),
                // valid email.
                body('email').isEmail().normalizeEmail(),
                (req, res) => {
                  // Finds the validation errors in this request and wraps them in an object with handy functions
                  const errors = validationResult(req);
                  if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                  }
                };
                // customers do not have permission.
                if(rows[0].rolle == "kunde" || rows[0].rolle == "kundeadmin")
                return done(
                  null,
                  false,
                  req.flash("loginMessage", "Kunder ingen tilladelse")
                );
                //If the user is not active.
                if(rows[0].status_bruger == "deaktiveret")
                return done(
                  null,
                  false,
                  req.flash("loginMessage", "Bruger ikke aktiv")
                );
            // If the user is found but the password is wrong
            if (!bcrypt.compareSync(password, rows[0].password))
              return done(
                null,
                false,
                req.flash("loginMessage", "Forkert kodeord")
              );
            // Return successful user
            return done(null, rows[0]);
          }
        );
      }
    )
  );
  /* LOCAL STRATEGY SIGNUP FOR FAARUP */
  passport.use(
    "local-register-customer",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        console.log(email);
        pool.query(
          "SELECT * FROM brugere WHERE email = ?",
          [email],
          function (err, rows) {
            if (err) return done(err);
            if (rows.length) {
              return done(
                null,
                false,
                req.flash("signupMessage", "Denne email er allerede i brug")
              );
            } else {              
                let newUserMysql = {
                  navn: req.body.name,
                  telefonnummer: req.body.phonenumber,
                  email: email,
                  adresse: req.body.address,
                  postnummer: req.body.zip_code,
                  _by: req.body.city,
                  password: bcrypt.hashSync(password.toString(), 10),
                  rolle: 'kunde',
                  status_bruger: 'deaktiveret',
                  cvr : req.body.cvr,
                };

                console.log(newUserMysql);
                const insertQuery =
                `start TRANSACTION;
                INSERT INTO brugere ( email, navn, adresse, postnummer, _by, telefonnummer, status_bruger, password, rolle) values (?,?,?,?,?,?,?,?,?);
                INSERT INTO brugere_erhverv (cvr, email) VALUES (?,?);
                commit;`;
              
                  pool.query(
                  insertQuery,
                  [
                    newUserMysql.email,
                    newUserMysql.navn,
                    newUserMysql.adresse,
                    newUserMysql.postnummer,
                    newUserMysql._by,
                    newUserMysql.telefonnummer,
                    newUserMysql.status_bruger,
                    newUserMysql.password,
                    newUserMysql.rolle,
                    newUserMysql.cvr,
                    newUserMysql.email,
                  ],
                  function (err, rows) {
                    if(err){
                      console.log(err);
                    }
                    console.log(rows);
                    return done(null, rows);
                  }
                );
            }
          }
        );
      }
    )
  );
  /* LOCAL STRATEGY LOGIN FOR CUSTOMER FAARUP*/
  passport.use(
    "local-login-customer",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        pool.query(
          `SELECT brugere.id, brugere.email, brugere.navn, brugere.adresse,
           brugere.postnummer, brugere._by, brugere.telefonnummer,
           brugere.status_bruger, brugere.password, brugere.rolle, brugere_erhverv.cvr from brugere
           LEFT JOIN brugere_erhverv on brugere_erhverv.email = brugere.email where brugere.email = ?`,
          [email],
          function (err, rows) {
            if (err) return done(err);
            if (!rows.length) {
              return done(
                null,
                false,
                req.flash("loginMessage", "Denne bruger eksisterer ikke")
              );
            }
                // password must be at least 5 chars long
                body('password').escape(),
                // valid email.
                body('email').isEmail().normalizeEmail(),
                (req, res) => {
                  // Finds the validation errors in this request and wraps them in an object with handy functions
                  const errors = validationResult(req);
                  if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                  }
                };
                 // Wetap owners do not have permission.
                 if(rows[0].rolle == "medarbejder" || rows[0].rolle == "admin")
                 return done(
                   null,
                   false,
                   req.flash("loginMessage", "Kun adgang for Faarup")
                 );
                //If the user is not active.
                if(rows[0].status_bruger == "deaktiveret")
                return done(
                  null,
                  false,
                  req.flash("loginMessage", "Bruger ikke aktiv")
                );
                //If the user is not from FAARUP don´t allow access.
                if(rows[0].cvr != 37984515)
                return done(
                  null,
                  false,
                  req.flash("loginMessage", "Ikke bruger hos Faarup")
                );
            // If the user is found but the password is wrong
            if (!bcrypt.compareSync(password, rows[0].password))
              return done(
                null,
                false,
                req.flash("loginMessage", "Forkert kodeord")
              );
            // Return successful user
            return done(null, rows[0]);
          }
        );
      }
    )
  );
};


