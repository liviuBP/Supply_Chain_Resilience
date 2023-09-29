
"use strict";
const cds = require("@sap/cds");
const logger = cds.log('logger');

// Next step!
// delete all data, then upload from csv, call function from job (check jobHandler.js for example)
function insertData(aData, realm) {

    // //srv commands are commented for the testing purpose of excel processing
    // const XLSX = require('xlsx');
    // // // Load the Excel file
    // const workbook = XLSX.readFile('CountryRiskScores.csv');
    // // // Select the first sheet
    // const sheetName = workbook.SheetNames[0];
    // const worksheet = workbook.Sheets[sheetName];
    // // // Convert the sheet data to an array of objects
    // const aExcelData = XLSX.utils.sheet_to_json(worksheet);
    
    return new Promise(async function (resolve, reject) {
        logger.info(aData);
        const srv = cds.transaction(aData);

        if (!aData || aData.length === 0) {
            resolve(0);
            return;
        }

        try {

            srv.run(DELETE.from('sap.ariba.CountryRiskScores'))
            // // Now, excelData contains the data from the Excel file

            for (var index in aData) {
                aData[index].Realm = realm;
                logger.info(aData[index])
                await srv.run(INSERT.into("sap.ariba.CountryRiskScores").entries(aData[index]));
                logger.info("Insert executed for line  " + aData[index].Realm + " country id " + aData[index].CountryId);
            }

            let res = await srv.run(SELECT.from("sap.ariba.CountryRiskScores").where(
                {
                    Realm: aExcelData[1].Realm,
                    CountryId: aExcelData[1].CountryId
                })
            );

            logger.info("Record found: " + res);

            //return 'Finished all';

        }
        catch (e) {
            logger.info(e);
            logger.error('Error while procesing');
            await srv.rollback();

            //abort full file
            reject(e);
        }

        await srv.commit();
        resolve(aData.length);
    })
}
//insertData([], "Test")

module.exports = {
    insertData
}