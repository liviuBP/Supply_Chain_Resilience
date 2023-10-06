"use strict";
const cds = require("@sap/cds");
const logger = cds.log('logger');
const readCSVFile = require('../custom_handler/ReadDataFromCSVFile');

// Next step!
// delete all data, then upload from csv, call function from job (check jobHandler.js for example)
function insertData(realm) {
 
    let aData = readCSVFile.getDataFromCSVFile("CountryRiskScores.xlsx"); 

   

   
    return new Promise(async function (resolve, reject) {

        //SupplierRegistrationProjects (nu are date pe care sa le putem folosi)
        
        const querySelect = SELECT.from(Suppliers)
        .columns(['SupplierId','Country '])
        .join(CountryRiskScores).on(`${Supplier.Country} = ${CountryRiskScores.CountryId }`)


        let res = await srv.run(querySelect)
        logger.info(res);
        
        const srv = cds.transaction(aData);
 
        if (!aData || aData.length === 0) {
            resolve(0);
            return;
        }
 
        try {
 
            srv.run(DELETE.from('sap.ariba.SupplierActivityRisk'))
            
 
            for (var index in res) {
                
                
               
                await srv.run(INSERT.into("sap.ariba.SupplierActivityRisk").entries(res[index]));
                
            }
 
            await srv.commit();
            resolve(aData.length);

            
 
        }
        catch (e) {
            logger.info(e);
            logger.error('Error while procesing SupplierActivityRisk');
            await srv.rollback();
 
            //abort full file
            reject(e);
        }

    })
}

 
module.exports = {
    insertData
}