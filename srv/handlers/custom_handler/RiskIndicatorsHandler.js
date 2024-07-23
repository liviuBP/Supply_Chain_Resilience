"use strict";
const cds = require("@sap/cds");
const logger = cds.log('logger');
const readCSVFile = require('../custom_handler/ReadDataFromCSVFile');

// Next step!
// delete all data, then upload from csv, call function from job (check jobHandler.js for example)
function insertData(realm) {
 
    let aData = readCSVFile.getDataFromCSVFile("RiskIndicators.xlsx"); 

   
    return new Promise(async function (resolve, reject) {
        //logger.info(aData);
        const srv = cds.transaction(aData);
 
        if (!aData || aData.length === 0) {
            resolve(0);
            return;
        }
 
        try {
 
            srv.run(DELETE.from("sap.ariba.RiskIndicators"))
 
            for (var index in aData) {
                
                
               await srv.run(INSERT.into("sap.ariba.RiskIndicators").entries(aData[index]));
                
            }
 
            await srv.commit();
            resolve(aData.length); 
        }
        catch (e) {
            logger.info(e);
            logger.error('Error while procesing');
            await srv.rollback();
 
            //abort full file
            reject(e);
        }

    })
}


module.exports = {
    insertData
}