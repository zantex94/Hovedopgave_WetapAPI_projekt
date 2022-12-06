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
}