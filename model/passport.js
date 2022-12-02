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

  /* LOCAL STRATEGY SIGNUP */
  passport.use(
    "local-register",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, res, username, password, done) {
        // pool.query(
        //   "SELECT * FROM brugere WHERE email = ?",
        //   [username],
        //   function (err, rows) {
        //     if (err) return done(err);
        //     if (rows.length) {
        //       return done(
        //         null,
        //         false,
        //         req.flash("signupMessage", "Denne bruger er allerede taget")
        //       );
        //     } else {              
        //         let newUserMysql = {
        //           username: username,
        //           password: bcrypt.hashSync(password, 10),
        //           email: req.body.email,
        //           telefon: req.body.telefon,
        //           adresse: req.body.adresse,
        //           _by: req.body._by,
        //           postnummer: req.body.postnummer,
        //           rolle: 'privat',
        //           cvr: req.body.cvr,
        //           hjaelp: true,
        //         };

        //         //See if there is something in CVR and it is 8 numbers long
        //         if(newUserMysql.cvr.length == 8) {
        //           console.log(`CVR = ${newUserMysql.cvr}`);
        //           newUserMysql.rolle = 'erhverv';
                                    
        //           const insertQuery = 
        //           `start TRANSACTION;

        //           INSERT INTO brugere ( navn, password, email, telefonnummer, adresse, _by, postnummer, rolle, hjaelp ) VALUES
        //           (?,?,?,?,?,?,?,?,?);
                  
        //           INSERT INTO brugere_erhverv (kundenummer, kontonummer, cvr) 
        //           VALUES ((SELECT kundenummer FROM brugere WHERE email = ?), '123456789', ?);
                  
        //           commit;`

        //           pool.query(
        //             insertQuery,
        //             [
        //               newUserMysql.username,
        //               newUserMysql.password,
        //               newUserMysql.email,
        //               newUserMysql.telefon,
        //               newUserMysql.adresse,
        //               newUserMysql._by,
        //               newUserMysql.postnummer,
        //               newUserMysql.rolle,
        //               newUserMysql.hjaelp,
        //               newUserMysql.email,
        //               newUserMysql.cvr,
        //             ],
        //             function (err, rows) {
        //               // newUserMysql.id = rows.insertId;
        //               console.log("NEWUSERMYSQL: " + newUserMysql);
        //               return done(null, newUserMysql);
        //             }
        //           );

        //         }
        //         else {
        //           newUserMysql.hjaelp = false;
        //           const insertQuery =
        //         "INSERT INTO brugere ( navn, password, email, telefonnummer, adresse, _by, postnummer, rolle, hjaelp ) values (?,?,?,?,?,?,?,?,?)";
              
        //           pool.query(
        //           insertQuery,
        //           [
        //             newUserMysql.username,
        //             newUserMysql.password,
        //             newUserMysql.email,
        //             newUserMysql.telefon,
        //             newUserMysql.adresse,
        //             newUserMysql._by,
        //             newUserMysql.postnummer,
        //             newUserMysql.rolle,
        //             newUserMysql.hjaelp,
        //           ],
        //           function (err, rows) {
        //             // newUserMysql.id = rows.insertId;
        //             return done(null, newUserMysql);
        //           }
        //         );
        //       }
        //     }
        //   }
        // );
      }
    )
  );

  /* LOCAL STRATEGY LOGIN */
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


