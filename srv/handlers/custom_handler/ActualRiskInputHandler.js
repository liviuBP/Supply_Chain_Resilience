"use strict";
const cds = require("@sap/cds");
const logger = cds.log('logger');
const readCSVFile = require('../custom_handler/ReadDataFromCSVFile');

// Next step!
// delete all data, then upload from csv, call function from job (check jobHandler.js for example)
function insertData(realm) {
 
    let aData = readCSVFile.getDataFromCSVFile("ActualRiskInput.xlsx"); 

   
    return new Promise(async function (resolve, reject) {
        //logger.info(aData);
        const srv = cds.transaction(aData);
 
        if (!aData || aData.length === 0) {
            resolve(0);
            return;
        }
 
        try {
 
            srv.run(DELETE.from("sap.ariba.ActualRiskInput"))
 
            for (var index in aData) {
                
                // *** convert dates from serial numbers to date format
                if(aData[index].AssessmentDate !== undefined && aData[index].AssessmentDate !== null && aData[index].AssessmentDate !== ""){

                    var sSerialNumberDate = aData[index].AssessmentDate;
                    var sFormatedDate = new Date(Math.round((sSerialNumberDate - 25569)*86400*1000)).toLocaleDateString().split("/");
                    var sDay = sFormatedDate[1];
                    var sMonth = sFormatedDate[0];
                    var sYear = sFormatedDate[2];
                    var sFinalDate = sDay + '.' + sMonth + '.' + sYear;
                    aData[index].AssessmentDate = sFinalDate;
    
                } // ***
            await srv.run(INSERT.into("sap.ariba.ActualRiskInput").entries(aData[index]));
                
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