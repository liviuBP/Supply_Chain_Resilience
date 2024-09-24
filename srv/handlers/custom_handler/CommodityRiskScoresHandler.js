"use strict";
const cds = require("@sap/cds");
const logger = cds.log('logger');
const readCSVFile = require('../custom_handler/ReadDataFromCSVFile');

// Next step!
// delete all data, then upload from csv, call function from job (check jobHandler.js for example)
function insertData(realm) {
 
    let aData = readCSVFile.getDataFromCSVFile("CommodityRiskScores.xlsx"); 

   
    return new Promise(async function (resolve, reject) {
        //logger.info(aData);
        const srv = cds.transaction(aData);
 
        if (!aData || aData.length === 0) {
            resolve(0);
            return;
        }
 
        try {
 
            srv.run(DELETE.from("sap.ariba.CommodityRiskScores"))
 
            for (var index in aData) {
                
                // logger.info(aData[index])
                if(aData[index].ESG01 === null || aData[index].ESG01 === undefined){

                    aData[index].ESG01 = 0;

                } 
                if(aData[index].ESG02 === null || aData[index].ESG02 === undefined){

                    aData[index].ESG02 = 0;

                }

                if(aData[index].ESG03 === null || aData[index].ESG03 === undefined){

                    aData[index].ESG03 = 0;

                }

                if(aData[index].ESG04 === null || aData[index].ESG04 === undefined){

                    aData[index].ESG04 = 0;

                }
                if(aData[index].ESG05 === null || aData[index].ESG05 === undefined){

                    aData[index].ESG05 = 0;

                }
                if(aData[index].ESG06 === null || aData[index].ESG06 === undefined){

                    aData[index].ESG06 = 0;

                }
                if(aData[index].ESG07 === null || aData[index].ESG07 === undefined){

                    aData[index].ESG07 = 0;

                }
                if(aData[index].ESG08 === null || aData[index].ESG08 === undefined){

                    aData[index].ESG08 = 0;

                }
                if(aData[index].ESG09 === null || aData[index].ESG09 === undefined){

                    aData[index].ESG09 = 0;

                }
                if(aData[index].ESG10 === null || aData[index].ESG10 === undefined){

                    aData[index].ESG10 = 0;

                }

                if(aData[index].ESG11 === null || aData[index].ESG11 === undefined){

                    aData[index].ESG11 = 0;

                }
                //LB
               await srv.run(INSERT.into("sap.ariba.CommodityRiskScores").entries(aData[index]));
                //logger.info("Insert executed for line  " + aData[index].Realm + " country id " + aData[index].CountryId);
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