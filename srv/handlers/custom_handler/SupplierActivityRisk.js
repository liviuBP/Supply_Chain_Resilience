"use strict";
const cds = require("@sap/cds");
const logger = cds.log('logger');


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


function insertData(realm) {

    var aEntires = [];
    var oSupplierContract;
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
            
            logger.info("Aici te uiti dupa contracte")
            logger.info(aContracts.length)

            for (var index in aContracts) {
                

                /* var oEntriesActivity = { SupplierId: "", CommodityId: "", CountryId: "", AntiBriberyAntiCorruption: 0,
                                         SustainabilityScore:0, NaturalDisasterScore:0, SustainabilityEnvironmental:0,
                                         SustanabilityHumanRights:0, E01_ClimateChange:0, ESG02_Pollution:0, E03_WaterResources:0,
                                         ESG04_Biodiversity:0, ESG05_ResourcesAndCircularEconomy:0, ESG01_ChildLaborScore:0,
                                         ESG02_FundamentalLaborRights:0, ESG03_UnequalTreatmentScore:0, ESG05_NaturalLivelihoodScore:0,
                                         ESG06_SecurityForceScore:0, ESG07_ForceLaborScore:0, ESG08_FreedomOfAssociationScore:0,
                                         ESG09_ViolationOfReasonableWagesScore:0, ESG10_IllegalViolationOfLandScore:0,
                                         PoliticalStabilityScore:0} */
                
                var oEntriesActivity = { SupplierId: "", CommodityId: "", CountryId: "", AntiBriberyAntiCorruption: 0,
                                         SustainabilityScore:0, NaturalDisasterScore:0, ESG01:0, ESG02:0, ESG03:0, ESG04:0, ESG05:0, 
                                         ESG06:0, ESG07:0, ESG08:0, ESG09:0, ESG10:0, ESG11:0}
                                         

                const oCommodityContract = aContractCommodities.filter((oCommo) => { return oCommo.ContractWorkspace_ProjectId == aContracts[index].ProjectId });

                 
                for(var indexSLP in aSuppliersSLP){
                    if(aSuppliersSLP[indexSLP].SupplierId == aContracts[index].Supplier_SupplierId){
                        oSupplierContract = aSuppliersSLP[indexSLP];
                        addressCountry=aSuppliersSLP[indexSLP].AddressCountryCode;
                        
                        break;
                    }
                }
                
               const oCommodityResult = aCommodity.filter((oCommo) => { return oCommo.CommodityCode.valueOf() === oCommodityContract[0].Commodity_CommodityId.valueOf() });
                
               const oCountryResult = aCountry.filter((oCommo) => { return oCommo.CountryId.valueOf() === addressCountry.valueOf() });

               if(aContracts[index].ProjectId === "CW32452"){
               logger.info(aContracts[index].ProjectId);
               logger.info(aContracts[index].Supplier_SupplierId);
               logger.info(oCommodityContract[0].Commodity_CommodityId);
               logger.info(addressCountry);
               logger.info(oCommodityResult[0].CommodityCode);
               logger.info(oCountryResult[0].CountryId);
               }

               
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
                    //oEntriesActivity.SustainabilityScore = (convertedSustainAbilityCountry + convertedSustainAbilityCommodity) / 2;

                    // new ESG01 - updated LB
                    const convertedLabourRightsCountry = parseFloat(oCountryResult[0].ESG01);
                    const convertedLabourRightsCommodity = parseFloat(oCommodityResult[0].ESG01);
                    oEntriesActivity.ESG01 = (convertedLabourRightsCountry + convertedLabourRightsCommodity) / 2;
                  

                    // new ESG02 - updated LB
                    const convertedPolutionCountry = parseFloat(oCountryResult[0].ESG02);
                    const convertedPolutionCommodity = parseFloat(oCommodityResult[0].ESG02);
                    oEntriesActivity.ESG02 = (convertedPolutionCountry + convertedPolutionCommodity) / 2;

                    
                    // new ESG03 - updated LB
                    const convertedUnequalTreatmentCountry = parseFloat(oCountryResult[0].ESG03);
                    const convertedUnequalTreatmentCommodity = parseFloat(oCommodityResult[0].ESG03);
                    oEntriesActivity.ESG03 = (convertedUnequalTreatmentCountry + convertedUnequalTreatmentCommodity) / 2;

                    
                    // new ESG04 - updated LB
                    const convertedBiodiversityCountry = parseFloat(oCountryResult[0].ESG04);
                    const convertedBiodiversityCommodity = parseFloat(oCommodityResult[0].ESG04);
                    oEntriesActivity.ESG04 = (convertedBiodiversityCountry + convertedBiodiversityCommodity) / 2;


                    // new ESG05 - updated LB
                    const convertedNaturalLivelihoodCountry = parseFloat(oCountryResult[0].ESG05);
                    const convertedNaturalLivelihoodCommodity = parseFloat(oCommodityResult[0].ESG05);
                    oEntriesActivity.ESG05 = (convertedNaturalLivelihoodCountry + convertedNaturalLivelihoodCommodity) / 2;


                    // new ESG06 - updated LB
                    const convertedSecurityCountry = parseFloat(oCountryResult[0].ESG06);
                    const convertedSecurityCommodity = parseFloat(oCommodityResult[0].ESG06);
                    oEntriesActivity.ESG06 = (convertedSecurityCountry + convertedSecurityCommodity) / 2;

                    
                    // new ESG07 - updated LB
                    const convertedForceLaborCountry = parseFloat(oCountryResult[0].ESG07);
                    const convertedForceLaborCommodity = parseFloat(oCommodityResult[0].ESG07);
                    oEntriesActivity.ESG07 = (convertedForceLaborCountry + convertedForceLaborCommodity) / 2;

                    
                    // new ESG08 - updated LB
                    const convertedFreedomAssociationCountry = parseFloat(oCountryResult[0].ESG08);
                    const convertedFreedomAssociationCommodity = parseFloat(oCommodityResult[0].ESG08);
                    oEntriesActivity.ESG08 = (convertedFreedomAssociationCountry + convertedFreedomAssociationCommodity) / 2;


                    // new ESG09 - updated LB
                    const convertedViolationWagesCountry = parseFloat(oCountryResult[0].ESG09);
                    const convertedViolationWagesCommodity = parseFloat(oCommodityResult[0].ESG09);
                    oEntriesActivity.ESG09 = (convertedViolationWagesCountry + convertedViolationWagesCommodity) / 2;


                    // new ESG10 - updated LB
                     const convertedIllegalLandscapeCountry = parseFloat(oCountryResult[0].ESG10);
                     const convertedIllegalLandscapeCommodity = parseFloat(oCommodityResult[0].ESG10);
                     oEntriesActivity.ESG10 = (convertedIllegalLandscapeCountry + convertedIllegalLandscapeCommodity) / 2;

                     // new ESG11 - updated LB
                     const convertedEUDRCountry = parseFloat(oCountryResult[0].ESG11);
                     const convertedEUDRCommodity = parseFloat(oCommodityResult[0].ESG11);
                     oEntriesActivity.ESG11 = (convertedEUDRCountry + convertedEUDRCommodity) / 2;

                    // new SustainabilityScore - updated LB
                     oEntriesActivity.SustainabilityScore = (oEntriesActivity.ESG01 + oEntriesActivity.ESG02 + oEntriesActivity.ESG03 + oEntriesActivity.ESG04
                                                                + oEntriesActivity.ESG05 + oEntriesActivity.ESG06 + oEntriesActivity.ESG07 + oEntriesActivity.ESG08 
                                                                + oEntriesActivity.ESG09 + oEntriesActivity.ESG10) / 10;

                    /*

                    //SustainabilityEnvironmental
                    const convertedEnvironmental = parseFloat(oCountryResult[0].SustainabilityEnvironmental);

                    oEntriesActivity.SustainabilityEnvironmental = (convertedEnvironmental + convertedSustainAbilityCommodity) / 2;

                    //SustainabilityHumanRights
                    const convertedHumanRights = parseFloat(oCountryResult[0].SustanabilityHumanRights);
                    oEntriesActivity.SustanabilityHumanRights = (convertedHumanRights + convertedSustainAbilityCommodity) / 2;

                    //E01Climate
                    const convertedClimate = parseFloat(oCountryResult[0].E01_ClimateChange);
                    oEntriesActivity.E01_ClimateChange = (convertedClimate + convertedSustainAbilityCommodity) / 2;

                    //ESG02
                    const convertedPolution = parseFloat(oCountryResult[0].ESG02_Pollution);
                    oEntriesActivity.ESG02_Pollution = (convertedPolution + convertedSustainAbilityCommodity) / 2;

                    //E03
                    const convertedWater = parseFloat(oCountryResult[0].E03_WaterResources);
                    oEntriesActivity.E03_WaterResources = (convertedWater + convertedSustainAbilityCommodity) / 2;

                    //ESG04
                    const convertedBiodiversity = parseFloat(oCountryResult[0].ESG04_Biodiversity);
                    oEntriesActivity.ESG04_Biodiversity = (convertedBiodiversity + convertedSustainAbilityCommodity) / 2;

                    //ESG05
                    const convertedResources = parseFloat(oCountryResult[0].ESG05_ResourcesAndCircularEconomy);
                    oEntriesActivity.ESG05_ResourcesAndCircularEconomy = (convertedResources + convertedSustainAbilityCommodity) / 2;

                    //ESG01
                    const convertedChildLabor = parseFloat(oCountryResult[0].ESG01_ChildLaborScore);
                    oEntriesActivity.ESG01_ChildLaborScore = (convertedChildLabor + convertedSustainAbilityCommodity) / 2;

                    //ESG02
                    const convertedFundamentalLabor = parseFloat(oCountryResult[0].ESG02_FundamentalLaborRights);
                    oEntriesActivity.ESG02_FundamentalLaborRights = (convertedFundamentalLabor + convertedSustainAbilityCommodity) / 2;

                    //ESG03
                    const convertedUnequalTreatment = parseFloat(oCountryResult[0].ESG03_UnequalTreatmentScore);
                    oEntriesActivity.ESG03_UnequalTreatmentScore = (convertedUnequalTreatment + convertedSustainAbilityCommodity) / 2;

                    //ESG05
                    const convertedNaturalLivelihood = parseFloat(oCountryResult[0].ESG05_NaturalLivelihoodScore);
                    oEntriesActivity.ESG05_NaturalLivelihoodScore = (convertedNaturalLivelihood + convertedSustainAbilityCommodity) / 2;

                    //ESG06
                    const convertedSecurity = parseFloat(oCountryResult[0].ESG06_SecurityForceScore);
                    oEntriesActivity.ESG06_SecurityForceScore = (convertedSecurity + convertedSustainAbilityCommodity) / 2;

                    //ESG07
                    const convertedForceLabor = parseFloat(oCountryResult[0].ESG07_ForceLaborScore);
                    oEntriesActivity.ESG07_ForceLaborScore = (convertedForceLabor + convertedSustainAbilityCommodity) / 2;

                    //ESG08
                    const convertedFreedomAssociation = parseFloat(oCountryResult[0].ESG08_FreedomOfAssociationScore);
                    oEntriesActivity.ESG08_FreedomOfAssociationScore = (convertedFreedomAssociation + convertedSustainAbilityCommodity) / 2;


                    //ESG09
                    const convertedViolationWages = parseFloat(oCountryResult[0].ESG09_ViolationOfReasonableWagesScore);
                    oEntriesActivity.ESG09_ViolationOfReasonableWagesScore = (convertedViolationWages + convertedSustainAbilityCommodity) / 2;

                    //ESG10
                    const convertedIllegalLandscape = parseFloat(oCountryResult[0].ESG10_IllegalViolationOfLandScore);
                    oEntriesActivity.ESG10_IllegalViolationOfLandScore = (convertedIllegalLandscape + convertedSustainAbilityCommodity) / 2; */

                    //PoliticalScore
                    //const convertedPolitical = parseFloat(oCountryResult[0].PoliticalStabilityScore);
                    //oEntriesActivity.PoliticalStabilityScore = convertedPolitical;

                    
                    aEntires.push(oEntriesActivity);
                    //logger.info("Aici avem entries activity!")
                    //logger.info(oEntriesActivity)
                    //logger.info(aEntires.length);
               }



            }

           
            logger.info(aEntires.length)
            const uniqueArray = removeDuplicatesFromArray(aEntires);
            logger.info(uniqueArray.length);

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