const pool = require("./db.js");

module.exports = {
   // Get all brugere from Wetap. 
   async GetWetapBrugere(req, res) {
    try {
        // using prepared statement to avoid sql injection
    //   const brugere = 'medarbejder';
      let sql = `select * from brugere where brugere.rolle = "admin" or brugere.rolle = "medarbejder"`;
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
      let updatebrugere = [id];
      await pool.query(sql, updatebrugere);
      return true;
    } catch (e) {
      console.error(e.message);
    }
  },
     // Delete bruger from Wetap. 
     async deleteWetapBruger(req, res) {
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
      // update brugere from Wetap. 
      async updateWetapBruger(req, res, newPasword) {
        console.log(req.user.id);
        //check if password needs updating.
        if(newPasword !== undefined){
          console.log('new password' + newPasword);
          try {
            // using prepared statement to avoid sql injection
          let {
            Name,
            Phonenumber,
            Email,
            Address,
            Zip_code,
            City,
            changePassword = newPasword,
            id = req.user.id
          } = req.body;
          let sql = `update brugere set navn = ?, telefonnummer = ?, email = ?, adresse = ?, postnummer = ?, _by = ?, password = ?  where id = ?`;
          let udatebrugere = [Name, Phonenumber, Email, Address, Zip_code, City, changePassword, id];
          await pool.query(sql, udatebrugere);
          //selecting data.
          return true;
        } catch (e) {
          console.error(e.message);
        }

        }else{
          //Password don´t need update so without updating it.
      try {
          // using prepared statement to avoid sql injection
        let {
          Name,
          Phonenumber,
          Email,
          Address,
          Zip_code,
          City,
          id = req.user.id
        } = req.body;
        let sql = `update brugere set navn = ?, telefonnummer = ?, email = ?, adresse = ?, postnummer = ?, _by = ?  where id = ?`;
        let udatebrugere = [Name, Phonenumber, Email, Address, Zip_code, City, id];
        let updateduser = await pool.query(sql, udatebrugere);
        return updateduser;
      } catch (e) {
        console.error(e.message);
      }
    }
    },
     // Get updated bruger from Wetap. 
   async GetUpdatedWetapBruger(req, res) {
    try {
        // using prepared statement to avoid sql injection
    //   const brugere = 'medarbejder';
      let id = req.user.id;
      let sql = `select * from brugere where id = ?`;
      let bool = [id];
      let updatedBruger = await pool.query(sql, bool);
      return updatedBruger;
    } catch (e) {
      console.error(e.message);
    }
  },
    // Delete bruger profile from Wetap. 
    async deleteWetapProfile(req, res) {
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
