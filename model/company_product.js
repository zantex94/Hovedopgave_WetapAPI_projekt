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
  
   // Get a company product. 
   async GetACompanyProduct(req, res) {
    try {
        // using prepared statement to avoid sql injection
    let { cvr } = req.params;
    let sql = `SELECT * FROM firmaprodukt where cvr = ?`;
    let find = [cvr];
      let getCompanyProduct = await pool.query(sql, find);
      return getCompanyProduct;
    } catch (e) {
      console.error(e.message);
    }
  },
   // Get all company products. 
   async GetAllCompanyProducts(req, res) {
    try {
    // using prepared statement to avoid sql injection
        let { cvr } = req.params;
        let sql = `SELECT firmaprodukt.produktnummer, DATE_FORMAT(firmaprodukt.service_tjek,'%d-%m-%y') as 'service_tjek', DATE_FORMAT(firmaprodukt.oprettet,'%d-%m-%y') AS 'oprettet', firmaprodukt.billedet, firmaprodukt.contenttype, firmaprodukt.cvr, firmaprodukt.title, p.title, p.beskrivelse, p.billedet as 'produktbilledet', p.contenttype as 'produktcontenttype',  p.vægt, p.kategori  FROM firmaprodukt
        LEFT JOIN produkt p ON p.title = firmaprodukt.title where firmaprodukt.cvr = ?`;
      let find = [cvr];
      let allCompanyProducts = await pool.query(sql, find);
      return allCompanyProducts;
    } catch (e) {
      console.error(e.message);
    }
  },
  // Get company title 
  async GetCompanyTitle(req, res) {
    try {
    // using prepared statement to avoid sql injection
        let { cvr } = req.params;
        let sql = `SELECT firma.title AS 'firma' FROM firma where firma.cvr = ?`;
      let find = [cvr];
      let firmaTitle = await pool.query(sql, find);
      return firmaTitle;
    } catch (e) {
      console.error(e.message);
    }
  },
    // Get all company products. 
    async CountCompanyProducts(req, res) {
        try {
        // using prepared statement to avoid sql injection
            let { cvr } = req.params;
            let sql = `SELECT COUNT(firmaprodukt.produktnummer) AS 'antal_produkter'  FROM firmaprodukt
        LEFT JOIN produkt p ON p.title = firmaprodukt.title where firmaprodukt.cvr = ?`;
          let find = [cvr];
          let countCompanyProducts = await pool.query(sql, find);
          return countCompanyProducts;
        } catch (e) {
          console.error(e.message);
        }
      },
   // Update product picture from Wetap. 
   async UpdateCompanyProductPicture(req, res) {
    try {
        // using prepared statement to avoid sql injection.
        let {
          Old_produktnummer,
          Contenttype,
          } = req.body;
          let picture = req.file.buffer;
    const sql = 
    `UPDATE firmaprodukt SET contenttype = ?, billedet = ? WHERE firmaprodukt.produktnummer = ?;` 
      let values = [Contenttype, picture, Old_produktnummer];
      let insertPicture = await pool.query(sql, values);
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
        Old_produktnummer,
    } = req.body;  
    let sql = `UPDATE firmaprodukt SET produktnummer ? , service_tjek = ?, oprettet = ?, title = ? WHERE produktnummer = ?`;
      let insert = [Product_number, Service_check, Product_created, Company_product, Old_produktnummer];
      await pool.query(sql, insert);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
  
}