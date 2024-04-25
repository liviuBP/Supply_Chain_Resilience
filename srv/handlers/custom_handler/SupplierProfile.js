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


function updateScores(target, source) {
    for (let property in source) {
        if (source.hasOwnProperty(property) && typeof source[property] === 'number') {
            target[property] = Math.max(target[property] || 0, source[property] || 0);
            source[property] = Math.max(target[property] || 0, source[property] || 0);
        }
    }
}

function insertData(realm) {

    var aEntires = [];
    var aNewEntries = []; 

    var aData = readCSVFile.getDataFromCSVFile("SuppliersTax.xlsx");

    return new Promise(async function (resolve, reject) {

        
        logger.info("Ajunge in SupplierProfile");

        if (!aData || aData.length === 0) {
            resolve(0);
            return;
        }
        
        const srv = cds.transaction();

        //logger.info("BEFORE_CRS_READ");//LB

        let aCountry = await srv.run(SELECT.from("sap.ariba.CountryRiskScores"));
        //logger.info("AFTER_CRS_READ");//LB

        

        let aActivityRisk = await srv.run(SELECT.from("sap.ariba.ActivityRisk"));

        let aSuppliersSLP = await srv.run(SELECT.from("sap.ariba.SLPSuppliers"));

        let aSuppliersStatus = await srv.run(SELECT.from("sap.ariba.SLPSuppliers_Qualifications"));

        
        
        try {

            srv.run(DELETE.from("sap.ariba.SupplierProfile"))

           
            for (var index in aActivityRisk) {


                let sumRisk =0;
                let countRisk =0;

                 let oEntriesSupplier = { SupplierId: "", SupplierName: "", AddressCountry: "", AddressCity: "", TaxId: "",
                 Segmentation: "", PreferredStatus: "", BusinessImpact: "", TotalSpent: 0 , SupplierTier: 0 ,OverallRisk: 0 , AntiBriberyAntiCorruption: 0,
                 SustainabilityScore:0, NaturalDisasterScore:0, SustainabilityEnvironmental:0,
                 SustanabilityHumanRights:0, E01_ClimateChange:0, ESG02_Pollution:0, E03_WaterResources:0,
                 ESG04_Biodiversity:0, ESG05_ResourcesAndCircularEconomy:0, ESG01_ChildLaborScore:0,
                 ESG02_FundamentalLaborRights:0, ESG03_UnequalTreatmentScore:0, ESG05_NaturalLivelihoodScore:0,
                 ESG06_SecurityForceScore:0, ESG07_ForceLaborScore:0, ESG08_FreedomOfAssociationScore:0,
                 ESG09_ViolationOfReasonableWagesScore:0, ESG10_IllegalViolationOfLandScore:0,
                 PoliticalStabilityScore:0, LkSG_Exposure:0, LkSG_Priority:0, Actual_OverallRisk:0, 
                 Actual_AntiBriberyAntiCorruption:0, Actual_SustainabilityScore:0, Actual_NaturalDisasterScore:0, 
                 Actual_OverallRisk_previous:0, Actual_AntiBriberyAntiCorruption_previous:0, Actual_SustainabilityScore_previous:0,
                 Actual_NaturalDisasterScore_previous:0 }

                for(var indexSLP in aSuppliersSLP){
                    if(aSuppliersSLP[indexSLP].SupplierId == aActivityRisk[index].SupplierId){
                        oEntriesSupplier.AddressCity = aSuppliersSLP[indexSLP].AddressCity;
                        oEntriesSupplier.SupplierName = aSuppliersSLP[indexSLP].SupplierName;
                        
                        break;
                    }}

                    for (let indexData in aData) {
                        if(aData[indexData].SupplierId == aActivityRisk[index].SupplierId){
                            oEntriesSupplier.TaxId = aData[indexData].partyTaxID;
                            break;
                        }
                       
                     }

                     for (let indexPreferred in aSuppliersStatus) {
                        if(aSuppliersStatus[indexPreferred].SupplierId == aActivityRisk[index].SupplierId){
                            oEntriesSupplier.PreferredStatus = aSuppliersStatus[indexPreferred].PreferredStatus;
                            break;
                        }
                       
                     }

                     

                    oEntriesSupplier.SupplierId = aActivityRisk[index].SupplierId;

                    const oCountryResult = aCountry.filter((oCommo) => { return oCommo.CountryId == aActivityRisk[index].CountryId });


                    oEntriesSupplier.AddressCountry = oCountryResult[0].CountryId;

                    oEntriesSupplier.SupplierTier = 1;
                    oEntriesSupplier.TotalSpent = Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;

                    oEntriesSupplier.BusinessImpact = Math.floor(Math.random() * 101);
                    


                    oEntriesSupplier.AntiBriberyAntiCorruption = aActivityRisk[index].AntiBriberyAntiCorruption;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.SustainabilityScore = aActivityRisk[index].SustainabilityScore;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.NaturalDisasterScore = aActivityRisk[index].NaturalDisasterScore;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.SustainabilityEnvironmental = aActivityRisk[index].SustainabilityEnvironmental;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.SustanabilityHumanRights = aActivityRisk[index].SustanabilityHumanRights;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.E01_ClimateChange = aActivityRisk[index].E01_ClimateChange;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG02_Pollution = aActivityRisk[index].ESG02_Pollution;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.E03_WaterResources = aActivityRisk[index].E03_WaterResources;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG04_Biodiversity = aActivityRisk[index].ESG04_Biodiversity;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG05_ResourcesAndCircularEconomy = aActivityRisk[index].ESG05_ResourcesAndCircularEconomy;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG01_ChildLaborScore = aActivityRisk[index].ESG01_ChildLaborScore;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG02_FundamentalLaborRights = aActivityRisk[index].ESG02_FundamentalLaborRights;

                   
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG03_UnequalTreatmentScore = aActivityRisk[index].ESG03_UnequalTreatmentScore;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG05_NaturalLivelihoodScore = aActivityRisk[index].ESG05_NaturalLivelihoodScore;

                   
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG06_SecurityForceScore = aActivityRisk[index].ESG06_SecurityForceScore;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG07_ForceLaborScore = aActivityRisk[index].ESG07_ForceLaborScore;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG08_FreedomOfAssociationScore = aActivityRisk[index].ESG08_FreedomOfAssociationScore;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG09_ViolationOfReasonableWagesScore = aActivityRisk[index].ESG09_ViolationOfReasonableWagesScore;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.ESG10_IllegalViolationOfLandScore = aActivityRisk[index].ESG10_IllegalViolationOfLandScore;

                    
                    countRisk = countRisk + 1;

                    oEntriesSupplier.PoliticalStabilityScore = aActivityRisk[index].PoliticalStabilityScore;

                    oEntriesSupplier.LkSG_Exposure = 0;

                    
                    countRisk = countRisk + 1;

                    /* LkSG_Exposure = 0; //LB

                    if(LkSG_Exposure >= 60 && BusinessImpact >= 60){ //LB

                        LkSG_Priority = 1

                    } else if(LkSG_Exposure >= 60 || BusinessImpact >= 60){

                        LkSG_Priority = 2

                    } else if(LkSG_Exposure < 60 && BusinessImpact < 60){

                        LkSG_Priority = 3

                    } */


                    /* oEntriesSupplier.LkSG_Exposure = 0;
                    if(oEntriesSupplier.LkSG_Exposure >= 60 && oEntriesSupplier.BusinessImpact >= 60){ //LB

                        oEntriesSupplier.LkSG_Priority = 1

                    } else if(oEntriesSupplier.LkSG_Exposure >= 60 || oEntriesSupplier.BusinessImpact >= 60){

                        oEntriesSupplier.LkSG_Priority = 2

                    } else if(oEntriesSupplier.LkSG_Exposure < 60 && oEntriesSupplier.BusinessImpact < 60){

                        oEntriesSupplier.LkSG_Priority = 3

                    }  */


                    
                    //logger.info(oEntriesSupplier);
                    aEntires.push(oEntriesSupplier);
                    //logger.info(aEntires.length);

                

            }
                /* aNewEntries = aEntires;
                logger.info('LEOTEST');
                for(let newEntry of aNewEntries){ //LB

                    newEntry.LkSG_Exposure = (newEntry.ESG02_Pollution + newEntry.ESG04_Biodiversity + newEntry.ESG05_ResourcesAndCircularEconomy+
                                                newEntry.ESG01_ChildLaborScore + newEntry.ESG02_FundamentalLaborRights + newEntry.ESG03_UnequalTreatmentScore+
                                                newEntry.ESG05_NaturalLivelihoodScore + newEntry.ESG06_SecurityForceScore + newEntry.ESG07_ForceLaborScore+
                                                newEntry.ESG08_FreedomOfAssociationScore + newEntry.ESG09_ViolationOfReasonableWagesScore + newEntry.ESG10_IllegalViolationOfLandScore)/12;

                } */
            

            

                for (let entry of aEntires) {
                    

                    for (let otherEntry of aEntires) {
                        if (entry.SupplierId === otherEntry.SupplierId) {
                            // Update scores using Math.max for all properties
                            updateScores(entry, otherEntry);
                            
                        }
                    }
                }


            
            const uniqueArray = removeDuplicatesFromArray(aEntires);

            var aEntiresMAX = aEntires.filter((entry, index, self) => index === self.findIndex((e) => e.SupplierId === entry.SupplierId));

            for(let entryMax of aEntiresMAX){
                entryMax.OverallRisk = (entryMax.AntiBriberyAntiCorruption + entryMax.SustainabilityScore+
                    entryMax.NaturalDisasterScore+ entryMax.SustainabilityEnvironmental+entryMax.SustanabilityHumanRights+
                    entryMax.E01_ClimateChange+entryMax.ESG02_Pollution + entryMax.E03_WaterResources+entryMax.ESG04_Biodiversity+
                    entryMax.ESG05_ResourcesAndCircularEconomy + entryMax.ESG01_ChildLaborScore + entryMax.ESG02_FundamentalLaborRights+
                    entryMax.ESG03_UnequalTreatmentScore + entryMax.ESG05_NaturalLivelihoodScore + entryMax.ESG06_SecurityForceScore +
                    entryMax.ESG07_ForceLaborScore + entryMax.ESG08_FreedomOfAssociationScore + entryMax.ESG09_ViolationOfReasonableWagesScore +
                    entryMax.ESG10_IllegalViolationOfLandScore + entryMax.PoliticalStabilityScore)/20;
            }
                
             logger.info(uniqueArray.length);
             logger.info(uniqueArray);
             await srv.run(INSERT.into("sap.ariba.SupplierProfile", aEntiresMAX));
            //  logger.info("Insert with success!")

             //await srv.run(INSERT.into("sap.ariba.SupplierProfile", aNewEntries)); //LB

             await srv.commit();

        }
        catch (e) {
            logger.info(e);
            await srv.rollback();

            //abort full file
            reject(e);
        }

        resolve();

    })
}


module.exports = {
    insertData
}