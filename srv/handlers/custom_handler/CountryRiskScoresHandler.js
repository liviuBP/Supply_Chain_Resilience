"use strict";
const cds = require("@sap/cds");
const logger = cds.log('logger');
const readCSVFile = require('../custom_handler/ReadDataFromCSVFile');

// Next step!
// delete all data, then upload from csv, call function from job (check jobHandler.js for example)
function insertData(realm) {
 
    let aData = readCSVFile.getDataFromCSVFile("CountryRiskScores.xlsx"); 


   
    return new Promise(async function (resolve, reject) {
        //logger.info(aData);
        const srv = cds.transaction(aData);
 
        if (!aData || aData.length === 0) {
            resolve(0);
            return;
        }
 
        try {
 
            srv.run(DELETE.from('sap.ariba.CountryRiskScores'))
            // // Now, excelData contains the data from the Excel file
 
            for (var index in aData) {
                //sa se adauge cod pentru mapare intre excel si baza de date in caz ca nu se respecta templateul
                aData[index].Realm = realm;
               // logger.info(aData[index])/
                await srv.run(INSERT.into("sap.ariba.CountryRiskScores").entries(aData[index]));
                //logger.info("Insert executed for line  " + aData[index].Realm + " country id " + aData[index].CountryId);
            }
 
            await srv.commit();
            resolve(aData.length);

            //let res = await srv.run(SELECT.from("sap.ariba.CountryRiskScores").where(
             //   {
             //       Realm: aData[1].Realm,
              //      CountryId: aData[1].CountryId
           //     })
           // );
 
            //logger.info("Record found: " + res);
 
            //return 'Finished all';
 
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