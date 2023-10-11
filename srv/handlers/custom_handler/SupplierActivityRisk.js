"use strict";
const cds = require("@sap/cds");
const logger = cds.log('logger');
const readCSVFile = require('../custom_handler/ReadDataFromCSVFile');

// Next step!
// delete all data, then upload from csv, call function from job (check jobHandler.js for example)
function insertData(realm) {

    var aEntires = [];

    return new Promise(async function (resolve, reject) {


        logger.info("Ajunge aici cu succes! ");
        const srv = cds.transaction(aEntires);


        let aQualifications = await srv.run(SELECT.from("sap.ariba.SLPSuppliers_Qualifications").where({
            SLPSupplier_Realm: realm,
            //Category: { "!=": null },
            //Region: { "!=": null }

        }));
        logger.info(aQualifications);

        let aCountry = await srv.run(SELECT.from("sap.ariba.CountryRiskScores"));
        logger.info(aCountry);
        let aCommodity = await srv.run(SELECT.from("sap.ariba.CommodityRiskScores"));
        logger.info(aCommodity);

        // var aQualifications = [{ SupplierId: "201", Category: '123', Region: "ro" },
        // { SupplierId: "212", Category: '127', Region: "bg" },
        // { SupplierId: "125", Category: '125', Region: "tu" },
        // { SupplierId: "456", Category: '342', Region: "ar" }];



        // var aCountry = [{ CountryId: "ro", AntiBriberyAntiCorruption: 20.0},
        //                 { CountryId: "bg", AntiBriberyAntiCorruption: 20.0},
        //                 { CountryId: "tu", AntiBriberyAntiCorruption: 20.0}]


        // var aCommodity = [{ CommodityCode: "123", AntiBriberyAntiCorruption: 20.0},
        //                 { CommodityCode: "124", AntiBriberyAntiCorruption: 20.0},
        //                 { CommodityCode: "125", AntiBriberyAntiCorruption: 20.0}]


        try {

            //srv.run(DELETE.from('sap.ariba.ActivityRisk'))

            // for (var index in aQualifications) {
                

            //     let oEntriesActivity = { SupplierId: "", CommodityId: "", CountryId: "", AntiBriberyAntiCorruption: 0 }
            //     // for(var indexCommodity in aCommodity){
            //     //     if(aQualifications[index].Category == aCommodity[indexCommodity].CommodityCode){
            //     //         var oCommodityResult = aCommodity[indexCommodity];
            //     //     }
            //     // }
            //     // for(var indexCountry in aCountry){
            //     //     if(aQualifications[index].Region == aCountry[indexCountry].CountryId){
            //     //         var oCountryResult = aCountry[indexCountry];
            //     //     }
            //     // }
            //     const oCommodityResult = aCommodity.filter((oCommo) => { return oCommo.CommodityCode == aQualifications[index].Category });

            //     const oCountryResult = aCountry.filter((oCountry) => { return oCountry.CountryId == aQualifications[index].Region });
            //     logger.info(oCountryResult);
            //     if (oCommodityResult.length > 0 && oCountryResult.length > 0) {

            //         oEntriesActivity.SupplierId = aQualifications[index].SupplierId;
            //         oEntriesActivity.CommodityId = oCommodityResult[0].CommodityCode;
            //         oEntriesActivity.CountryId = oCountryResult[0].CountryId;
            //         oEntriesActivity.AntiBriberyAntiCorruption = (oCommodityResult[0].AntiBriberyAntiCorruption + oCountryResult[0].AntiBriberyAntiCorruption) / 2;
            //         logger.info(oEntriesActivity);
            //         aEntires.push(oEntriesActivity);
            //         logger.info(aEntires.length);
            //     }



            // }

            //let a = [{ SupplierId: "201", CommodityId: '123', CountryId: "ro", AntiBriberyAntiCorruption: 12.0 }];

            //await srv.run(INSERT.into("sap.ariba.ActivityRisk").entries({ SupplierId: "212", CommodityId: '127', CountryId: "bg", AntiBriberyAntiCorruption: 12.0 }));

            // await srv.run(INSERT.into("sap.ariba.ActivityRisk", aEntires));
            logger.info("Insert with success!")


            // await srv.commit();
            resolve();


        }
        catch (e) {
            logger.info(e);
            logger.error('Error while procesing SupplierActivityRisk');
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