const pool = require("./db.js");

module.exports = {
   // Get all brugere from Wetap. 
   async GetWetapBrugere(req, res) {
    try {
        // using prepared statement to avoid sql injection
    //   const brugere = 'medarbejder';
      let sql = `select * from brugere`;
    //   let bool = [brugere];
      let Allbrugere = await pool.query(sql);
      return Allbrugere;
    } catch (e) {
      console.error(e.message);
    }
  },
   // update brugere from Wetap. 
   async UpdateWetapBrugereStatusDeaktiveret(req, res) {
    try {
        // using prepared statement to avoid sql injection
      const { id } = req.params;      
      console.log(req.params);
      let sql = `update brugere set status_bruger = "deaktiveret" where id = ?`;
      let udatebrugere = [id];
      await pool.query(sql, udatebrugere);
      return true;
    } catch (e) {
      console.error(e.message);
    }
  },
   // update brugere from Wetap. 
   async UpdateWetapBrugereStatusAktiv(req, res) {
    try {
        // using prepared statement to avoid sql injection
      const { id } = req.params;      
      console.log(req.params);
      let sql = `update brugere set status_bruger = "aktiv" where id = ?`;
      let udatebrugere = [id];
      await pool.query(sql, udatebrugere);
      return true;
    } catch (e) {
      console.error(e.message);
    }
  },
}
