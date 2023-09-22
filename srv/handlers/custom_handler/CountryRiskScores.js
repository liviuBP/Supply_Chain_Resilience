
"use strict";
const cds = require("@sap/cds");
const logger = cds.log('logger');

    // Next step!
    // delete all data, then upload from csv, call function from job (check jobHandler.js for example)
async function insertData(aData, realm)  {
    
        try{

            //srv commands are commented for the testing purpose of excel processing
            const XLSX = require('xlsx');
            // // Load the Excel file
            const workbook = XLSX.readFile('CountryRiskScores.csv');
            // // Select the first sheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            // // Convert the sheet data to an array of objects
            const aExcelData = XLSX.utils.sheet_to_json(worksheet);
            
            srv = cds.transaction(aExcelData);
            srv.run(DELETE.from('sap.ariba.CountryRiskScores'))
             // // Now, excelData contains the data from the Excel file
            for(var index in aExcelData){
            aExcelData[index].Realm = realm;
            console.log(aExcelData[index])
            await srv.run( INSERT .into ("sap.ariba.CountryRiskScores") .entries (aExcelData[index]) );
            }
            logger.info(`A AJUNS PANA AICI`);
            let res =  await srv.run ( SELECT.from ("sap.ariba.CountryRiskScores").where(
                {
                    Realm : aExcelData[1].Realm ,
                    CountryId: aExcelData[1].CountryId }  )
             );
             logger.info(res);

            return 'Finished all';
            
        }
        catch(e){
            logger.error('Error while procesing');
            await srv.rollback();
            
        }

   await srv.commit();
    
}
insertData([],"Test")

module.exports = {
    insertData
}