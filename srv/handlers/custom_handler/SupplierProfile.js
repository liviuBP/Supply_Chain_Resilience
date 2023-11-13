"use strict";
const cds = require("@sap/cds");
const logger = cds.log('logger');


// Next step!
// delete all data, then upload from csv, call function from job (check jobHandler.js for example)
function insertData(realm) {

    var aEntires = [];

    return new Promise(async function (resolve, reject) {


        logger.info("Ajunge in SupplierProfile");
        const srv = cds.transaction(aEntires);

        let aCountry = await srv.run(SELECT.from("sap.ariba.CountryRiskScores"));
        
        let aSupplier = await srv.run(SELECT.from("sap.ariba.Suppliers"));

        let aActivityRisk = await srv.run(SELECT.from("sap.ariba.ActivityRisk"));
        
        try {

            srv.run(DELETE.from("sap.ariba.SupplierProfile"))

           
            for (var index in aActivityRisk) {
                 // de adaugat celelalte field-uri aici (din supplier profile)
                let oEntriesSupplier = { SupplierId: "", SupplierName: "", AddressCountry: "", AntiBriberyAntiCorruption: 0,
                                         SustainabilityScore:0, NaturalDisasterScore:0 }
            }

            

           // se iau field-urile din activity risk sei se dau match cu cele din supplierprofile
            

            //await srv.run(INSERT.into("sap.ariba.ActivityRisk", aEntires));
            logger.info("Insert with success!")


            await srv.commit();
            resolve();


        }
        catch (e) {
            logger.info(e);
            logger.error('Error while procesing SupplierProfile');
            await srv.rollback();

            //abort full file
            reject(e);
        }
        resolve(aEntires.length);

    })
}


module.exports = {
    insertData
}