const pool = require("./db.js");

module.exports = {
   // Insert company product. 
   async InsertCompanyProduct(req, res) {
    try {
        // using prepared statement to avoid sql injection
    let  {
        Product_number,
        Company_product,
        Product_created,
        Service_check,
        Contenttype,
        cvr
    } = req.body;  
    let billedet = req.file.buffer;  
    let sql = `INSERT INTO firmaprodukt (produktnummer, service_tjek, oprettet, billedet, contenttype, cvr, title) VALUES (?,?,?,?,?,?,?)`;
      let insert = [Product_number, Service_check, Product_created, billedet, Contenttype, cvr, Company_product ];
      await pool.query(sql, insert);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
   // Update company product. 
   async UpdateCompanyProduct(req, res) {
    try {
        // using prepared statement to avoid sql injection
    let  {
        Product_number,
        Company_product,
        Product_created,
        Service_check,
        cvr
    } = req.body;  
    let sql = `UPDATE firmaprodukt SET produktnummer ? , service_tjek = ?, oprettet = ?, title = ? WHERE cvr = ?`;
      let insert = [Product_number, Service_check, Product_created, Company_product, cvr];
      await pool.query(sql, insert);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
   // Get a company product. 
   async GetACompanyProduct(req, res) {
    try {
        // using prepared statement to avoid sql injection
    let cvr = 0;
    let sql = `SELECT * FROM firmaprodukt where cvr = ?`;
    let find = [cvr];
      let getCompanyProduct = await pool.query(sql, cvr);
      return getCompanyProduct;
    } catch (e) {
      console.error(e.message);
    }
  },
   // Get all company products. 
   async GetAllCompanyProducts(req, res) {
    try {
        // using prepared statement to avoid sql injection
    let cvr = 0;
    let sql = `UPDATE firmaprodukt SET produktnummer ? , service_tjek = ?, oprettet = ?, title = ? WHERE cvr = ?`;
      let find = [cvr];
      let allCompanyProducts = await pool.query(sql, find);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
   // Update product picture from Wetap. 
   async UpdateCompanyProductPicture(req, res) {
    try {
        // using prepared statement to avoid sql injection.
        let {
            id,
            Contenttype,
          } = req.body;
          let picture = req.file.buffer;
    const sql = 
    `UPDATE produkt SET produkt.contenttype = ?, produkt.billedet = ? WHERE produkt.id = ?;` 
      let values = [Contenttype, picture, id];
      let insertProduct = await pool.query(sql, values);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
}