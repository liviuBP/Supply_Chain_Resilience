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

    var aSPData = readCSVFile.getDataFromCSVFile("SupplierProfile.xlsx"); //LB
    

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

        let aContractWorkspaces = await srv.run(SELECT.from("sap.ariba.ContractWorkspaces")); //LB
        let aSourcingProjects = await srv.run(SELECT.from("sap.ariba.SourcingProjects")); //LB

        
        
        try {

            srv.run(DELETE.from("sap.ariba.SupplierProfile"))

           
            for (var index in aActivityRisk) {


                let sumRisk =0;
                let countRisk =0;

                /*  let oEntriesSupplier = { SupplierId: "", SupplierName: "", AddressCountry: "", AddressCity: "", TaxId: "",
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
                 Actual_NaturalDisasterScore_previous:0, SupplyChainRisk:0, Actual_SupplyChainRisk:0, Relevant_n_tier:0, ValidContract: "No", 
                 NoticePeriodRisk:0, SingleSourced: "No", LkSG_Status: "1-Not started", LkSG_Actual_Exposure: "", LkSG_Letter_Sent: "", LkSG_Letter_Sent_date: "" } */

                 let oEntriesSupplier = { SupplierId: "", SupplierName: "", AddressCountry: "", AddressCity: "", TaxId: "",
                 Segmentation: "", PreferredStatus: "", BusinessImpact: "", TotalSpent: 0 , SupplierTier: 0 ,OverallRisk: 0 , AntiBriberyAntiCorruption: 0,
                 SustainabilityScore:0, NaturalDisasterScore:0, ESG01:0, ESG02:0, ESG03:0, ESG04:0, ESG05:0, ESG06:0, ESG07:0, ESG08:0, ESG09:0, ESG10:0,
                 LkSG_Exposure:0, LkSG_Priority:0, Actual_OverallRisk:0, 
                 Actual_AntiBriberyAntiCorruption:0, Actual_SustainabilityScore:0, Actual_NaturalDisasterScore:0, 
                 Actual_OverallRisk_previous:0, Actual_AntiBriberyAntiCorruption_previous:0, Actual_SustainabilityScore_previous:0,
                 Actual_NaturalDisasterScore_previous:0, SupplyChainRisk:0, Actual_SupplyChainRisk:0, Relevant_n_tier:0, ValidContract: "No", 
                 NoticePeriodRisk:0, SingleSourced: "No", LkSG_Status: "1-Not started", LkSG_Actual_Exposure: "", LkSG_Letter_Sent: "", LkSG_Letter_Sent_date: "" }

                    for(var indexSLP in aSuppliersSLP){
                        if(aSuppliersSLP[indexSLP].SupplierId == aActivityRisk[index].SupplierId){
                            oEntriesSupplier.AddressCity = aSuppliersSLP[indexSLP].AddressCity;
                            oEntriesSupplier.SupplierName = aSuppliersSLP[indexSLP].SupplierName;
                            oEntriesSupplier.ESG01 = aActivityRisk[index].ESG01;
                            oEntriesSupplier.ESG02 = aActivityRisk[index].ESG02;
                            oEntriesSupplier.ESG03 = aActivityRisk[index].ESG03;
                            oEntriesSupplier.ESG04 = aActivityRisk[index].ESG04;
                            oEntriesSupplier.ESG05 = aActivityRisk[index].ESG05;
                            oEntriesSupplier.ESG06 = aActivityRisk[index].ESG06;
                            oEntriesSupplier.ESG07 = aActivityRisk[index].ESG07;
                            oEntriesSupplier.ESG08 = aActivityRisk[index].ESG08;
                            oEntriesSupplier.ESG09 = aActivityRisk[index].ESG09;
                            oEntriesSupplier.ESG10 = aActivityRisk[index].ESG10;

                            break;
                        }
                    }
                    /* var aAllSuppESG = [];
                    for(var indexSLP in aSuppliersSLP){
                        if(aSuppliersSLP[indexSLP].SupplierId == aActivityRisk[index].SupplierId){
    
                            var obj = {SupplierId: aSuppliersSLP[indexSLP].SupplierId, ESG01: aActivityRisk[index].ESG01};
                            aAllSuppESG.push(obj);
                            
                            break;
                        }
                    } */////////////

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

                    for (let indexSP in aSPData) { //LB
                        if(aSPData[indexSP].SupplierId == aActivityRisk[index].SupplierId){ 
                            oEntriesSupplier.Actual_AntiBriberyAntiCorruption = aSPData[indexSP].Actual_AntiBriberyAntiCorruption;
                            oEntriesSupplier.Actual_SustainabilityScore = aSPData[indexSP].Actual_SustainabilityScore;
                            oEntriesSupplier.Actual_NaturalDisasterScore = aSPData[indexSP].Actual_NaturalDisasterScore;
                            break;
                        }
                       
                    }
                    var aAllNoticePeriodsPerSupplier = [];
                    var aAllExpirationDates = [];
                    var aFinalValuesPerSupplier = [];
                    for (let indexSupplier in aSuppliersSLP) { //LB
                            var checkSupplierIdValue = aSuppliersSLP[indexSupplier].SupplierId;
                            for (let indexSPCW in aContractWorkspaces){
                                var checkSupplierIDCW = aContractWorkspaces[indexSPCW].Supplier_SupplierId;
                                
                                if (checkSupplierIDCW === checkSupplierIdValue){
                                    var checkNoticeValue = aContractWorkspaces[indexSPCW].NoticePeriod;
                                    var checkContractEndDate = aContractWorkspaces[indexSPCW].ExpirationDate_day.split("T")[0];
                                    var checkContractId = aContractWorkspaces[indexSPCW].ContractId;
                                    var objExpDates = {SupplierId: checkSupplierIdValue, ExpirationDate: checkContractEndDate, ContractId: checkContractId};
                                    aAllExpirationDates.push(objExpDates);
                                    objExpDates = {};
                                    aAllNoticePeriodsPerSupplier.push(checkNoticeValue);
                                    

                                }
                                
                            }

                            if(aAllNoticePeriodsPerSupplier.length>0){
                            
                                var numberOfContractsPerSupplier = aAllNoticePeriodsPerSupplier.length;
                                var summOfNoticePeriods = aAllNoticePeriodsPerSupplier.reduce((partialSum, a) => partialSum + a, 0);
                                aAllNoticePeriodsPerSupplier = [];
                                var averageNoticeValuePerSupplier = summOfNoticePeriods/numberOfContractsPerSupplier;
                                var objValues = {SupplierId: checkSupplierIdValue, NoticePeriodAverage: averageNoticeValuePerSupplier };
                                aFinalValuesPerSupplier.push(objValues);
                                objValues = {};
                            
                            }

                            //oEntriesSupplier.NoticePeriodRisk = averageNoticeValuePerSupplier;

                    }

                    

                    oEntriesSupplier.SupplierId = aActivityRisk[index].SupplierId;

                    const oCountryResult = aCountry.filter((oCommo) => { return oCommo.CountryId == aActivityRisk[index].CountryId });


                    oEntriesSupplier.AddressCountry = oCountryResult[0].CountryId;

                    oEntriesSupplier.SupplierTier = 1;
                    oEntriesSupplier.TotalSpent = Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;

                    oEntriesSupplier.BusinessImpact = Math.floor(Math.random() * 101);

                    //oEntriesSupplier.Actual_AntiBriberyAntiCorruption = Math.floor(Math.random() * 101); //LB
                    //oEntriesSupplier.Actual_SustainabilityScore = Math.floor(Math.random() * 101); //LB
                    //oEntriesSupplier.Actual_NaturalDisasterScore = Math.floor(Math.random() * 101); //LB
                    oEntriesSupplier.Actual_OverallRisk_previous = Math.floor(Math.random() * 101); //LB
                    oEntriesSupplier.Actual_AntiBriberyAntiCorruption_previous = Math.floor(Math.random() * 101); //LB
                    oEntriesSupplier.Actual_SustainabilityScore_previous = Math.floor(Math.random() * 101); //LB
                    oEntriesSupplier.Actual_NaturalDisasterScore_previous = Math.floor(Math.random() * 101); //LB
                    oEntriesSupplier.Actual_SupplyChainRisk = Math.floor(Math.random() * 101); //LB
                    oEntriesSupplier.SupplyChainRisk = Math.floor(Math.random() * 101); //LB


                    


                    oEntriesSupplier.AntiBriberyAntiCorruption = aActivityRisk[index].AntiBriberyAntiCorruption;
                    countRisk = countRisk + 1;

                    oEntriesSupplier.SustainabilityScore = aActivityRisk[index].SustainabilityScore;
                    countRisk = countRisk + 1;

                    oEntriesSupplier.NaturalDisasterScore = aActivityRisk[index].NaturalDisasterScore;
                    countRisk = countRisk + 1;


                    ///


                    ///

                    //oEntriesSupplier.SustainabilityEnvironmental = aActivityRisk[index].SustainabilityEnvironmental;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.SustanabilityHumanRights = aActivityRisk[index].SustanabilityHumanRights;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.E01_ClimateChange = aActivityRisk[index].E01_ClimateChange;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.ESG02_Pollution = aActivityRisk[index].ESG02_Pollution;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.E03_WaterResources = aActivityRisk[index].E03_WaterResources;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.ESG04_Biodiversity = aActivityRisk[index].ESG04_Biodiversity;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.ESG05_ResourcesAndCircularEconomy = aActivityRisk[index].ESG05_ResourcesAndCircularEconomy;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.ESG01_ChildLaborScore = aActivityRisk[index].ESG01_ChildLaborScore;
                    //oEntriesSupplier.ESG01 = aActivityRisk[index].ESG01;
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.ESG02_FundamentalLaborRights = aActivityRisk[index].ESG02_FundamentalLaborRights;
                    //oEntriesSupplier.ESG02= aActivityRisk[index].ESG02;
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.ESG03_UnequalTreatmentScore = aActivityRisk[index].ESG03_UnequalTreatmentScore;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.ESG05_NaturalLivelihoodScore = aActivityRisk[index].ESG05_NaturalLivelihoodScore;

                   
                    //countRisk = countRisk + 1;

                   // oEntriesSupplier.ESG06_SecurityForceScore = aActivityRisk[index].ESG06_SecurityForceScore;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.ESG07_ForceLaborScore = aActivityRisk[index].ESG07_ForceLaborScore;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.ESG08_FreedomOfAssociationScore = aActivityRisk[index].ESG08_FreedomOfAssociationScore;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.ESG09_ViolationOfReasonableWagesScore = aActivityRisk[index].ESG09_ViolationOfReasonableWagesScore;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.ESG10_IllegalViolationOfLandScore = aActivityRisk[index].ESG10_IllegalViolationOfLandScore;

                    
                    //countRisk = countRisk + 1;

                    //oEntriesSupplier.PoliticalStabilityScore = aActivityRisk[index].PoliticalStabilityScore;

                    //oEntriesSupplier.LkSG_Exposure = 0;

                    
                    //countRisk = countRisk + 1;

                    /* LkSG_Exposure = 0; //LB

                    if(LkSG_Exposure >= 60 && BusinessImpact >= 60){ //LB

                        LkSG_Priority = 1

                    } else if(LkSG_Exposure >= 60 || BusinessImpact >= 60){

                        LkSG_Priority = 2

                    } else if(LkSG_Exposure < 60 && BusinessImpact < 60){

                        LkSG_Priority = 3

                    } */


                    oEntriesSupplier.LkSG_Exposure = 0;
                    if(oEntriesSupplier.LkSG_Exposure >= 60 && oEntriesSupplier.BusinessImpact >= 60){ //LB

                        oEntriesSupplier.LkSG_Priority = 1

                    } else if(oEntriesSupplier.LkSG_Exposure >= 60 || oEntriesSupplier.BusinessImpact >= 60){

                        oEntriesSupplier.LkSG_Priority = 2

                    } else if(oEntriesSupplier.LkSG_Exposure < 60 && oEntriesSupplier.BusinessImpact < 60){

                        oEntriesSupplier.LkSG_Priority = 3

                    } 

                    if(oEntriesSupplier.ValidContract !== "Yes" || oEntriesSupplier.ValidContract !== "No"){ //LB

                        oEntriesSupplier.ValidContract = "No"

                    }

                    if(oEntriesSupplier.SingleSourced !== "Yes" && oEntriesSupplier.SingleSourced !== "No"){ //LB
 
                        oEntriesSupplier.ValidContract = "No"

                    }

                    if(oEntriesSupplier.SupplierId === "ACM_26977200" || oEntriesSupplier.SupplierId === "ACM_28172094"){ //LB

                        oEntriesSupplier.Relevant_n_tier = 1;

                    }


                    
                    //logger.info(oEntriesSupplier);
                    aEntires.push(oEntriesSupplier);
                    //logger.info(aEntires.length);

                

            }
                aNewEntries = aEntires;
                logger.info('LEOTEST');
                /* for(let newEntry of aNewEntries){ //LB

                    newEntry.LkSG_Exposure = (newEntry.ESG02_Pollution + newEntry.ESG04_Biodiversity + newEntry.ESG05_ResourcesAndCircularEconomy+
                                                newEntry.ESG01_ChildLaborScore + newEntry.ESG02_FundamentalLaborRights + newEntry.ESG03_UnequalTreatmentScore+
                                                newEntry.ESG05_NaturalLivelihoodScore + newEntry.ESG06_SecurityForceScore + newEntry.ESG07_ForceLaborScore+
                                                newEntry.ESG08_FreedomOfAssociationScore + newEntry.ESG09_ViolationOfReasonableWagesScore + newEntry.ESG10_IllegalViolationOfLandScore)/12;

                } */

                for(let anotherNewEntry of aNewEntries){ //LB

                    anotherNewEntry.Actual_OverallRisk = (anotherNewEntry.Actual_AntiBriberyAntiCorruption + anotherNewEntry.Actual_SustainabilityScore + anotherNewEntry.Actual_NaturalDisasterScore+
                                                            anotherNewEntry.Actual_OverallRisk_previous + anotherNewEntry.Actual_AntiBriberyAntiCorruption_previous + 
                                                            anotherNewEntry.Actual_SustainabilityScore_previous + anotherNewEntry.Actual_NaturalDisasterScore_previous)/7

                }
            

            

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

            /* for(let entryMax of aEntiresMAX){
                entryMax.OverallRisk = (entryMax.AntiBriberyAntiCorruption + entryMax.SustainabilityScore+
                    entryMax.NaturalDisasterScore+ entryMax.SustainabilityEnvironmental+entryMax.SustanabilityHumanRights+
                    entryMax.E01_ClimateChange+entryMax.ESG02_Pollution + entryMax.E03_WaterResources+entryMax.ESG04_Biodiversity+
                    entryMax.ESG05_ResourcesAndCircularEconomy + entryMax.ESG01_ChildLaborScore + entryMax.ESG02_FundamentalLaborRights+
                    entryMax.ESG03_UnequalTreatmentScore + entryMax.ESG05_NaturalLivelihoodScore + entryMax.ESG06_SecurityForceScore +
                    entryMax.ESG07_ForceLaborScore + entryMax.ESG08_FreedomOfAssociationScore + entryMax.ESG09_ViolationOfReasonableWagesScore +
                    entryMax.ESG10_IllegalViolationOfLandScore + entryMax.PoliticalStabilityScore)/20;
            } */

            ///
            //aFinalValuesPerSupplier
            for(let entryNotice of aEntiresMAX){ //LB
                var checkValueSid = entryNotice.SupplierId;
                for(let iSPCW in aFinalValuesPerSupplier){
                    var checkValueSidFinal = aFinalValuesPerSupplier[iSPCW].SupplierId;
                    if (checkValueSid === checkValueSidFinal){

                        var getNoticeValue = aFinalValuesPerSupplier[iSPCW].NoticePeriodAverage
                        entryNotice.NoticePeriodRisk = getNoticeValue;

                    }


                }


            }


            //aAllExpirationDates
            // *** get the expiration dates and compare them with the current date ***
            var aAllExpirationDatesGreater = [];
            var date = new Date();
            var sCurrentDate = date.toISOString().split("T")[0],
                sCurrentDateYear = sCurrentDate.split("-")[0],
                sCurrentDateMonth = sCurrentDate.split("-")[1],
                sCurrentDateDay = sCurrentDate.split("-")[2];

            for (var x=0; x<aAllExpirationDates.length; x++){
                
                //var checkSupplierOfDate = aAllExpirationDates[x].SupplierId;
                var sExpirationDate = aAllExpirationDates[x].ExpirationDate,
                    sExpirationDateYear = sExpirationDate.split("-")[0],
                    sExpirationDateMonth = sExpirationDate.split("-")[1],
                    sExpirationDateDay = sExpirationDate.split("-")[2];

                if (sExpirationDateYear > sCurrentDateYear){

                    var objWithDatesY = {SupplierId: aAllExpirationDates[x].SupplierId , ExpirationDate: sExpirationDate};
                    aAllExpirationDatesGreater.push(objWithDatesY);

                }

                if (sExpirationDateYear == sCurrentDateYear){
                    if(sExpirationDateMonth > sCurrentDateMonth){

                        var objWithDatesM = {SupplierId: aAllExpirationDates[x].SupplierId , ExpirationDate: sExpirationDate};
                        aAllExpirationDatesGreater.push(objWithDatesM);

                    } else 
                    if (sExpirationDateMonth == sCurrentDateMonth){

                        if(sExpirationDateDay > sCurrentDateDay){

                            var objWithDatesD = {SupplierId: aAllExpirationDates[x].SupplierId , ExpirationDate: sExpirationDate};
                            aAllExpirationDatesGreater.push(objWithDatesD);

                        }
                    }
                    
                }

            }

            // *** write values for the ValidContract fields in SP ***
            for(let entryValidContract of aEntiresMAX){ //LB
                var checkValueSid = entryValidContract.SupplierId;
                for(let iEDCW in aAllExpirationDatesGreater){
                    var checkValueSidFinal = aAllExpirationDatesGreater[iEDCW].SupplierId;
                    if (checkValueSid === checkValueSidFinal){

                        var sValidContract = "Yes";
                        entryValidContract.ValidContract = sValidContract;

                    }


                }


            }

            // *** 
            var aAllSuppliersWithExecStrategy = [];
            for (var y=0; y<aAllExpirationDates.length; y++){
                var checkContractId = aAllExpirationDates[y].ContractId;
                var checksSpId = aAllExpirationDates[y].SupplierId;

                for (let iSrsProj in aSourcingProjects){
                    var checkSrsPrjCtrId = aSourcingProjects[iSrsProj].ProjectId;

                    if(checkSrsPrjCtrId === checkContractId){
                        var checkValueOfES = aSourcingProjects[iSrsProj].ExecutionStrategy;
                        /* if (checkValueOfES === "SingleSource"){

                        } */
                        var objToPush = {SupplierId: checksSpId, ContractId: checkSrsPrjCtrId, ExecutionStrategy: checkValueOfES};
                        aAllSuppliersWithExecStrategy.push(objToPush);


                    }


                }

            }

            if(aAllSuppliersWithExecStrategy.length > 0 ){

                for(let entryExecStrategy of aEntiresMAX){
                    var checkValueSupplierId = entryExecStrategy.SupplierId;
                    for (let iExStr in aAllSuppliersWithExecStrategy){
                        var checkValueSIdEs = aAllSuppliersWithExecStrategy[iExStr].SupplierId;
                        if(checkValueSIdEs === checkValueSupplierId){
                            var checkValueExecStrategy = aAllSuppliersWithExecStrategy[iExStr].ExecutionStrategy;
                            if (checkValueExecStrategy === "" && checkValueExecStrategy === null && checkValueExecStrategy === undefined){

                                if (checkValueExecStrategy !== "Single Source" ){
                                    checkValueExecStrategy = "No";
                                } else if (checkValueExecStrategy === "Single Source"){
                                    checkValueExecStrategy = "Yes";
                                }

                            }


                        }
                        entryExecStrategy.SingleSourced = checkValueExecStrategy;

                    }



                }

            }

            // *** SustainabilityScore NEW - average of ESG 1-10
            // *** LkSG_Exposure NEW - average of ESG 1-2-4-7-8-9-10
            for(var SCIndex=0; SCIndex<aEntiresMAX.length; SCIndex++){

                aEntiresMAX[SCIndex].SustainabilityScore = (aEntiresMAX[SCIndex].ESG01 + aEntiresMAX[SCIndex].ESG02 + aEntiresMAX[SCIndex].ESG03 + aEntiresMAX[SCIndex].ESG04  +      
                                                                aEntiresMAX[SCIndex].ESG05 + aEntiresMAX[SCIndex].ESG06 + aEntiresMAX[SCIndex].ESG07 + aEntiresMAX[SCIndex].ESG08 +
                                                                    aEntiresMAX[SCIndex].ESG09 + aEntiresMAX[SCIndex].ESG10) / 10;

                aEntiresMAX[SCIndex].LkSG_Exposure = (aEntiresMAX[SCIndex].ESG01 + aEntiresMAX[SCIndex].ESG02 + aEntiresMAX[SCIndex].ESG04  +      
                                                                aEntiresMAX[SCIndex].ESG07 + aEntiresMAX[SCIndex].ESG08 +
                                                                    aEntiresMAX[SCIndex].ESG09 + aEntiresMAX[SCIndex].ESG10) / 7;

                
                if(aEntiresMAX[SCIndex].LkSG_Exposure >= 60 && aEntiresMAX[SCIndex].BusinessImpact >= 60){ //LB

                    aEntiresMAX[SCIndex].LkSG_Priority = 1
                                                
                } else if(aEntiresMAX[SCIndex].LkSG_Exposure >= 60 || aEntiresMAX[SCIndex].BusinessImpact >= 60){
                                                
                    aEntiresMAX[SCIndex].LkSG_Priority = 2
                                                
                } else if(aEntiresMAX[SCIndex].LkSG_Exposure < 60 && aEntiresMAX[SCIndex].BusinessImpact < 60){
                                                
                    aEntiresMAX[SCIndex].LkSG_Priority = 3
                                                
                } 

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