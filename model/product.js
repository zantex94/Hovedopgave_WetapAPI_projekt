const pool = require("./db.js");

module.exports = {
   // Insert product from Wetap. 
   async InsertWetapProduct(req, res) {
    try {
        // using prepared statement to avoid sql injection.
        let {
            Title,
            Product_operation,
            Product_water_type,
            Product_description,
            Product_auto_clean,
            Product_payment,
            Product_filter,
            Product_quality,
            Product_weight,
            Product_savety,
            Product_plc,
            Product_material,
            Product_cold_temperature,
            Product_water_requirement,
            Product_power,
            Product_dimension,
            Product_capacity,
            Product_light,
            Contenttype
          } = req.body;
          let picture = req.file.buffer;
    const insertQuery = 
    `start TRANSACTION;

    INSERT INTO produkt (title, beskrivelse, billedet, contenttype, vægt, kategori) VALUES
    (?,?,?,?,?,'Udendørs vandpost');
    
    INSERT INTO berøringsfri_betjening(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO automatisk_rens(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO produkt_filter(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO frostsikker(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO lækagesystem(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO plc_styring(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO kabinetmateriale(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO køletemperatur(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO vandtrykskrav(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO strømforsyning(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO dimensioner(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO lys(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO kølekapacitet(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO vandtype(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);

    INSERT INTO betalingsløsning(id, beskrivelse) 
    VALUES ((SELECT id FROM produkt WHERE title = ?), ?);
    
    commit;` 
      let values = [Title,Product_description,picture,Contenttype,Product_weight,Title,Product_operation,
      Title,Product_auto_clean, Title, Product_filter, Title,Product_quality, Title,Product_savety, Title,
      Product_plc, Title, Product_material, Title, Product_cold_temperature, Title, Product_water_requirement,
    Title, Product_power, Title, Product_dimension, Title, Product_light, Title, Product_capacity,
  Title, Product_water_type, Title, Product_payment] ;
      let insertProduct = await pool.query(insertQuery, values);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
  // Get all products from Wetap. 
  async GetWetapProducts(req, res) {
    try {
        // using prepared statement to avoid sql injection
      let sql = `SELECT p.id, p.title, p.beskrivelse, p.billedet, p.contenttype, p.vægt, p.kategori, 
      be.beskrivelse as 'berøringsfri_betjening', au.beskrivelse as 'automatisk_rens',  bl.beskrivelse as 'betalingsløsning',
      pf.beskrivelse as 'filter',  fs.beskrivelse as 'frostsikker',  ls.beskrivelse as 'lægkagesystem',  plc.beskrivelse as 'plc_system',
      km.beskrivelse as 'kabinetmateriale',  vk.beskrivelse as 'vandtrykskrav', sf.beskrivelse as 'strømforsyning',
      dm.beskrivelse as 'dimensioner',  lys.beskrivelse as 'lys', kk.beskrivelse as 'kølekapacitet', vt.beskrivelse as 'vandtype',
      kt.beskrivelse as 'køletemperatur' FROM produkt as p
      LEFT JOIN berøringsfri_betjening as be ON be.id = p.id
      LEFT JOIN automatisk_rens au ON au.id = p.id
      LEFT JOIN betalingsløsning bl ON bl.id = p.id
      LEFT JOIN produkt_filter as pf ON pf.id = p.id
      LEFT JOIN frostsikker as fs ON fs.id = p.id
      LEFT JOIN lækagesystem as ls ON ls.id = p.id
      LEFT JOIN plc_styring plc ON plc.id = p.id
      LEFT JOIN kabinetmateriale as km ON km.id = p.id
      LEFT JOIN vandtrykskrav as vk ON vk.id = p.id
      LEFT JOIN strømforsyning as sf ON sf.id = p.id
      LEFT JOIN dimensioner as dm ON dm.id = p.id
      LEFT JOIN lys as lys ON lys.id = p.id
      LEFT JOIN kølekapacitet as kk ON kk.id = p.id
      LEFT JOIN vandtype as vt ON vt.id = p.id
      LEFT JOIN køletemperatur as kt ON kt.id = p.id;
      `;
      let allProducts = await pool.query(sql);
      return allProducts;
    } catch (e) {
      console.error(e.message);
    }
  },
   // Delete product from Wetap. 
   async deleteWetapProduct(req, res) {
    try {
        // using prepared statement to avoid sql injection
      const { id } = req.params;      
      let sql = `delete from produkt where id = ?`;
      let udatebrugere = [id];
      await pool.query(sql, udatebrugere);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;

    }
  },
  // Get all products from Wetap. 
  async GetAWetapProduct(req, res) {
    try {
      const { id } = req.params;      

        // using prepared statement to avoid sql injection
      let sql = `SELECT p.id, p.title, p.beskrivelse, p.billedet, p.contenttype, p.vægt, p.kategori, 
      be.beskrivelse as 'berøringsfri_betjening', au.beskrivelse as 'automatisk_rens',  bl.beskrivelse as 'betalingsløsning',
      pf.beskrivelse as 'filter',  fs.beskrivelse as 'frostsikker',  ls.beskrivelse as 'lægkagesystem',  plc.beskrivelse as 'plc_system',
      km.beskrivelse as 'kabinetmateriale',  vk.beskrivelse as 'vandtrykskrav', sf.beskrivelse as 'strømforsyning',
      dm.beskrivelse as 'dimensioner',  lys.beskrivelse as 'lys', kk.beskrivelse as 'kølekapacitet', vt.beskrivelse as 'vandtype', kt.beskrivelse as 'køletemperatur' FROM produkt as p
      LEFT JOIN berøringsfri_betjening as be ON be.id = p.id
      LEFT JOIN automatisk_rens au ON au.id = p.id
      LEFT JOIN betalingsløsning bl ON bl.id = p.id
      LEFT JOIN produkt_filter as pf ON pf.id = p.id
      LEFT JOIN frostsikker as fs ON fs.id = p.id
      LEFT JOIN lækagesystem as ls ON ls.id = p.id
      LEFT JOIN plc_styring plc ON plc.id = p.id
      LEFT JOIN kabinetmateriale as km ON km.id = p.id
      LEFT JOIN vandtrykskrav as vk ON vk.id = p.id
      LEFT JOIN strømforsyning as sf ON sf.id = p.id
      LEFT JOIN dimensioner as dm ON dm.id = p.id
      LEFT JOIN lys as lys ON lys.id = p.id
      LEFT JOIN kølekapacitet as kk ON kk.id = p.id
      LEFT JOIN vandtype as vt ON vt.id = p.id
      LEFT JOIN køletemperatur as kt ON kt.id = p.id where p.id = ?;
      `;
      let getAProduct = [id];
      let product = await pool.query(sql, getAProduct);
      return product;
    } catch (e) {
      console.error(e.message);
    }
  },
   // If updating product fails get product by name.
   async GetAWetapProductWhenFail(req, res) {
    try {
      const id = req.body.id;      

        // using prepared statement to avoid sql injection
    //   const brugere = 'medarbejder';
      let sql = `SELECT p.id, p.title, p.beskrivelse, p.billedet, p.contenttype, p.vægt, p.kategori, 
      be.beskrivelse as 'berøringsfri_betjening', au.beskrivelse as 'automatisk_rens',  bl.beskrivelse as 'betalingsløsning',
      pf.beskrivelse as 'filter',  fs.beskrivelse as 'frostsikker',  ls.beskrivelse as 'lægkagesystem',  plc.beskrivelse as 'plc_system',
      km.beskrivelse as 'kabinetmateriale',  vk.beskrivelse as 'vandtrykskrav', sf.beskrivelse as 'strømforsyning',
      dm.beskrivelse as 'dimensioner',  lys.beskrivelse as 'lys', kk.beskrivelse as 'kølekapacitet', vt.beskrivelse as 'vandtype', kt.beskrivelse as 'køletemperatur' FROM produkt as p
      LEFT JOIN berøringsfri_betjening as be ON be.id = p.id
      LEFT JOIN automatisk_rens au ON au.id = p.id
      LEFT JOIN betalingsløsning bl ON bl.id = p.id
      LEFT JOIN produkt_filter as pf ON pf.id = p.id
      LEFT JOIN frostsikker as fs ON fs.id = p.id
      LEFT JOIN lækagesystem as ls ON ls.id = p.id
      LEFT JOIN plc_styring plc ON plc.id = p.id
      LEFT JOIN kabinetmateriale as km ON km.id = p.id
      LEFT JOIN vandtrykskrav as vk ON vk.id = p.id
      LEFT JOIN strømforsyning as sf ON sf.id = p.id
      LEFT JOIN dimensioner as dm ON dm.id = p.id
      LEFT JOIN lys as lys ON lys.id = p.id
      LEFT JOIN kølekapacitet as kk ON kk.id = p.id
      LEFT JOIN vandtype as vt ON vt.id = p.id
      LEFT JOIN køletemperatur as kt ON kt.id = p.id where p.id = ?;
      `;
      let getAProduct = [id];
      let product = await pool.query(sql, getAProduct);
      return product;
    } catch (e) {
      console.error(e.message);
    }
  },
   // Update product from Wetap. 
   async UpdateWetapProduct(req, res) {
    try {
        // using prepared statement to avoid sql injection.
        let {
            id,
            Title,
            Product_operation,
            Product_water_type,
            Product_description,
            Product_auto_clean,
            Product_payment,
            Product_filter,
            Product_quality,
            Product_weight,
            Product_savety,
            Product_plc,
            Product_material,
            Product_cold_temperature,
            Product_water_requirement,
            Product_power,
            Product_dimension,
            Product_capacity,
            Product_light,
          } = req.body;
    const insertQuery = 
    `start TRANSACTION;

    UPDATE produkt SET produkt.title = ?, produkt.beskrivelse = ?, produkt.vægt = ?, produkt.kategori = ?
    WHERE produkt.id = ?;

    UPDATE berøringsfri_betjening
    LEFT JOIN produkt ON produkt.id = berøringsfri_betjening.id
    SET berøringsfri_betjening.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE automatisk_rens
    LEFT JOIN produkt ON produkt.id = automatisk_rens.id
    SET automatisk_rens.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE produkt_filter
    LEFT JOIN produkt ON produkt.id = produkt_filter.id
    SET produkt_filter.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE frostsikker
    LEFT JOIN produkt ON produkt.id = frostsikker.id
    SET frostsikker.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE lækagesystem
    LEFT JOIN produkt ON produkt.id = lækagesystem.id
    SET lækagesystem.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE plc_styring
    LEFT JOIN produkt ON produkt.id = plc_styring.id
    SET plc_styring.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE kabinetmateriale
    LEFT JOIN produkt ON produkt.id = kabinetmateriale.id
    SET kabinetmateriale.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE køletemperatur
    LEFT JOIN produkt ON produkt.id = køletemperatur.id
    SET køletemperatur.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE vandtrykskrav
    LEFT JOIN produkt ON produkt.id = vandtrykskrav.id
    SET vandtrykskrav.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE strømforsyning
    LEFT JOIN produkt ON produkt.id = strømforsyning.id
    SET strømforsyning.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE dimensioner
    LEFT JOIN produkt ON produkt.id = dimensioner.id
    SET dimensioner.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE lys
    LEFT JOIN produkt ON produkt.id = lys.id
    SET lys.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE kølekapacitet
    LEFT JOIN produkt ON produkt.id = kølekapacitet.id
    SET kølekapacitet.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE vandtype
    LEFT JOIN produkt ON produkt.id = vandtype.id
    SET vandtype.beskrivelse = ?
    WHERE produkt.id = ?;

    UPDATE betalingsløsning
    LEFT JOIN produkt ON produkt.id = betalingsløsning.id
    SET betalingsløsning.beskrivelse = ?
    WHERE produkt.id = ?;

    
    commit;` 
      let values = [Title,Product_description, Product_weight,'Udendørs vandpost',id,
    Product_operation, id, Product_auto_clean, id, Product_filter, id,
    Product_quality, id, Product_savety, id, Product_plc, id,
    Product_material, id, Product_cold_temperature, id, Product_water_requirement, id,
    Product_power, id, Product_dimension, id, Product_light, id, Product_capacity, id,
    Product_water_type, id, Product_payment, id ];
      let updateProduct = await pool.query(insertQuery, values);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  },
   // Update product picture from Wetap. 
   async UpdateWetapProductPicture(req, res) {
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
   // Get product title from Wetap. 
   async GetWetapProductTitle(req, res) {
    try {
    const sql = 
    `SELECT title from produkt;` 
      let alleProduktTitler = await pool.query(sql);
      return alleProduktTitler;
    } catch (e) {
      console.error(e.message);
    }
  },
}