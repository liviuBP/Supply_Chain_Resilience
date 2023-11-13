"use strict";
const cds = require("@sap/cds");
const logger = cds.log('logger');
const readCSVFile = require('../custom_handler/ReadDataFromCSVFile');

function removeDuplicatesFromArray(array) {
    const seen = new Set();
    return array.filter(obj => {
        const stringifiedObj = JSON.stringify(obj);
        if (!seen.has(stringifiedObj)) {
            seen.add(stringifiedObj);
            return true;
        }
        return false;
    });
}

// Next step!
// delete all data, then upload from csv, call function from job (check jobHandler.js for example)
function insertData(realm) {

    var aEntires = [];
    var oSupplierContract;
    var countryResult;
    var addressCountry;
    

    return new Promise(async function (resolve, reject) {


        logger.info("Ajunge aici cu succes! ");
        const srv = cds.transaction(aEntires);

        let aCountry = await srv.run(SELECT.from("sap.ariba.CountryRiskScores"));
        
        let aCommodity = await srv.run(SELECT.from("sap.ariba.CommodityRiskScores"));

        let aContracts = await srv.run(SELECT.from("sap.ariba.ContractWorkspaces"));

        let aSuppliersSLP = await srv.run(SELECT.from("sap.ariba.SLPSuppliers"));
        

        let aContractCommodities = await srv.run(SELECT.from("sap.ariba.ContractWorkspaces_Commodity"));
        
        
        
        
        try {

            srv.run(DELETE.from("sap.ariba.ActivityRisk"))
            await srv.commit();
            

            for (var index in aContracts) {
                

                let oEntriesActivity = { SupplierId: "", CommodityId: "", CountryId: "", AntiBriberyAntiCorruption: 0,
                                         SustainabilityScore:0, NaturalDisasterScore:0 }

                const oCommodityContract = aContractCommodities.filter((oCommo) => { return oCommo.ContractWorkspace_ProjectId == aContracts[index].ProjectId });

                 
                for(var indexSLP in aSuppliersSLP){
                    if(aSuppliersSLP[indexSLP].SupplierId == aContracts[index].Supplier_SupplierId){
                        oSupplierContract = aSuppliersSLP[indexSLP];
                            addressCountry=aSuppliersSLP[indexSLP].AddressCountryCode;
                        
                        
                        break;
                    }
                }
                
               const oCommodityResult = aCommodity.filter((oCommo) => { return oCommo.CommodityCode == oCommodityContract[0].Commodity_CommodityId });
                
               const oCountryResult = aCountry.filter((oCommo) => { return oCommo.CountryId == addressCountry });

                if (oCommodityResult.length > 0 && oCountryResult.length > 0) {

                    oEntriesActivity.SupplierId = aContracts[index].Supplier_SupplierId;
                    oEntriesActivity.CommodityId = oCommodityResult[0].CommodityCode;
                    oEntriesActivity.CountryId = oCountryResult[0].CountryId;
                    const convertedCommodity = parseFloat(oCommodityResult[0].AntiBriberyAntiCorruption);
                    const convertedCountry = parseFloat(oCountryResult[0].AntiBriberyAntiCorruption);
                    oEntriesActivity.AntiBriberyAntiCorruption = (convertedCommodity + convertedCountry) / 2;

                    //sustainability score  
                    const convertedSustainAbilityCountry = parseFloat(oCountryResult[0].SustainabilityScore);
                    const convertedSustainAbilityCommodity = parseFloat(oCountryResult[0].SustainabilityScore);

                    //natural disaster score
                    const convertedDisasterScore = parseFloat(oCountryResult[0].NaturalDisasterScore);

                    oEntriesActivity.NaturalDisasterScore=convertedDisasterScore;
                    oEntriesActivity.SustainabilityScore = (convertedSustainAbilityCountry + convertedSustainAbilityCommodity) / 2;


                    logger.info(oEntriesActivity);
                    aEntires.push(oEntriesActivity);
                    logger.info(aEntires.length);
                }



            }

           
            
            const uniqueArray = removeDuplicatesFromArray(aEntires);
            console.log(uniqueArray);

            await srv.run(INSERT.into("sap.ariba.ActivityRisk", uniqueArray));
            logger.info("Insert with success!")


            await srv.commit();
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