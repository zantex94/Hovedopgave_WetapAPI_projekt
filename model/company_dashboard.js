const pool = require("./db.js");

module.exports = {
   // Get all brugere from Wetap. 
   async GetBrugereErhverv(req, res) {
    try {
        // using prepared statement to avoid sql injection
        // only getting people that not have admin on a company
      let sql = `SELECT * FROM brugere_erhverv
      LEFT JOIN brugere ON brugere.email = brugere_erhverv.email WHERE NOT brugere.rolle = 'kundeadmin';`;
      let Allbrugere = await pool.query(sql);
      return Allbrugere;
    } catch (e) {
      console.error(e.message);
    }
  },
   // Get all brugere from Wetap. 
   async InsertNewCompany(req, res) {
    try {
      let {
        company_name,
        cvr,
        responsible_person,
        techniques
      } = req.body;
        // using prepared statement to avoid sql injection
      let sql = `insert into firma (cvr, title, email, teknikker) values(?,?,?,?)`;
      let insertRow = [cvr, company_name, responsible_person, techniques];
      await pool.query(sql, insertRow);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
   // Update brugere so that they act on the company as admin. 
   async UpdateUserAdminCompany(req, res) {
    try {
       let email = req.body.responsible_person;
        // using prepared statement to avoid sql injection
      let sql = `update brugere set brugere.rolle = 'kundeadmin', brugere.status_bruger = 'aktiv' where brugere.email = ?`;
      let insertRow = [email];
      await pool.query(sql, insertRow);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
   // Get all brugere from Wetap. 
   async GetAllCompanies(req, res) {
    try {
        // using prepared statement to avoid sql injection
        // only getting people that not have admin on a company
      let sql = `SELECT * FROM firma`;
      let AllCompanies = await pool.query(sql);
      return AllCompanies;
    } catch (e) {
      console.error(e.message);
    }
  },
   // Get company by cvr from Wetap. 
   async GetCvrCompany(req, res) {
    try {
      const { cvr } = req.params;      
      // using prepared statement to avoid sql injection
        // only getting people that not have admin on a company
      let sql = `SELECT * FROM firma where cvr = ?`;
      let company = await pool.query(sql, cvr);
      return company;
    } catch (e) {
      console.error(e.message);
    }
  },
   // Update company 
   async UpdateCompany(req, res) {
    try {
       let {
        company_name,
        cvr,
        Old_cvr,
        responsible_person,
        techniques
       } = req.body;
        // using prepared statement to avoid sql injection
      let sql = `update firma set firma.cvr = ?, firma.title = ?, firma.email = ?, firma.teknikker = ? where firma.cvr = ?`;
      let updateRow = [cvr,company_name,responsible_person,techniques,Old_cvr];
      await pool.query(sql, updateRow);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
   // Update all brugere on a company to be "kunde" 
   async UpdateCompanyAdmin(req, res) {
    try {
       let {
        cvr,
       } = req.body;
        // using prepared statement to avoid sql injection
      let sql = `UPDATE brugere
      LEFT JOIN brugere_erhverv ON brugere_erhverv.email = brugere.email
      SET brugere.rolle = "kunde"
      WHERE brugere_erhverv.cvr = ?;`;
      let updateRow = [cvr];
      await pool.query(sql, updateRow);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
}
