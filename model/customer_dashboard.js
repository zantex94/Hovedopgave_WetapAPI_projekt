const pool = require("./db.js");

module.exports = {
   // Get all company products for customers. 
   async GetAllCompanyProducts(req, res) {
    try {
    // using prepared statement to avoid sql injection
    let cvr = req.user.cvr;
    let sql = `SELECT firmaprodukt.produktnummer, DATE_FORMAT(firmaprodukt.service_tjek,'%d-%m-%y') as 'service_tjek', DATE_FORMAT(firmaprodukt.oprettet,'%d-%m-%y') AS 'oprettet', firmaprodukt.billedet, firmaprodukt.contenttype, firmaprodukt.cvr, firmaprodukt.title, p.title, p.beskrivelse, p.billedet as 'produktbilledet', p.contenttype as 'produktcontenttype',  p.vægt, p.kategori  FROM firmaprodukt
        LEFT JOIN produkt p ON p.title = firmaprodukt.title where firmaprodukt.cvr = ?`;
      let find = [cvr];
      let allCompanyProducts = await pool.query(sql, find);
      return allCompanyProducts;
    } catch (e) {
      console.error(e.message);
    }
  },
  // Get company title  for customers
  async GetCompanyTitle(req, res) {
    try {
    // using prepared statement to avoid sql injection
    let cvr = req.user.cvr;
    let sql = `SELECT firma.title AS 'firma' FROM firma where firma.cvr = ?`;
      let find = [cvr];
      let firmaTitle = await pool.query(sql, find);
      return firmaTitle;
    } catch (e) {
      console.error(e.message);
    }
  },
   // Get all company products for customer. 
   async CountCompanyProducts(req, res) {
    try {
    // using prepared statement to avoid sql injection
        let cvr = req.user.cvr;
        let sql = `SELECT COUNT(firmaprodukt.produktnummer) AS 'antal_produkter'  FROM firmaprodukt
    LEFT JOIN produkt p ON p.title = firmaprodukt.title where firmaprodukt.cvr = ?`;
      let find = [cvr];
      let countCompanyProducts = await pool.query(sql, find);
      return countCompanyProducts;
    } catch (e) {
      console.error(e.message);
    }
  },
      // Get all brugere from company. 
   async GetCustomerBrugere(req, res) {
    try {
        let cvr = req.user.cvr;
        // using prepared statement to avoid sql injection
    //   const brugere = 'medarbejder';
      let sql = `select brugere.id, brugere.navn, brugere.email, brugere.adresse, brugere.postnummer, brugere.telefonnummer, brugere.status_bruger, brugere.password, brugere.rolle, brugere_erhverv.cvr from brugere 
      LEFT JOIN brugere_erhverv ON brugere_erhverv.email = brugere.email where brugere_erhverv.cvr = '?' 
`;
      let companyCvr = [cvr];
      let Allbrugere = await pool.query(sql, companyCvr);
      return Allbrugere;
    } catch (e) {
      console.error(e.message);
    }
  },
   // update Customer to be deactivated. 
   async UpdateCustomerStatusDeaktiveret(req, res) {
    try {
        // using prepared statement to avoid sql injection
      const { id } = req.params;      
      console.log(req.params);
      let sql = `update brugere set brugere.status_bruger = "deaktiveret" where brugere.id = ?`;
      let udatebrugere = [id];
      await pool.query(sql, udatebrugere);
      return true;
    } catch (e) {
      console.error(e.message);
    }
  },
   // update Customer to be activated. 
   async UpdateCustomerStatusAktiv(req, res) {
    try {
        // using prepared statement to avoid sql injection
      const { id } = req.params;      
      console.log(req.params);
      let sql = `update brugere set brugere.status_bruger = "aktiv" where brugere.id = ?`;
      let updatebrugere = [id];
      await pool.query(sql, updatebrugere);
      return true;
    } catch (e) {
      console.error(e.message);
    }
  },
     // Delete bruger from Wetap. 
     async deleteCustomerBruger(req, res) {
      try {
          // using prepared statement to avoid sql injection
        const { id } = req.params;      
        console.log(req.params);
        let sql = `delete from brugere where id = ?`;
        let udatebrugere = [id];
        await pool.query(sql, udatebrugere);
        return true;
      } catch (e) {
        console.error(e.message);
      }
    },
}