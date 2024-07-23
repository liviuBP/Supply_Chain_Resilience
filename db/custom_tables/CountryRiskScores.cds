namespace sap.ariba;
using { managed } from '@sap/cds/common';

using sap.ariba.type as types from '../types';


entity CountryRiskScores: managed  {

    key CountryName                           : String(255);
    key CountryId                             : String(50);

        Region                                : String(255);
        SubRegion                             : String(255);
        NaturalDisasterScore                  : String(255);
        AntiBriberyAntiCorruption             : String(255);
        SustainabilityScore                   : String(255);
        /* SustainabilityEnvironmental           : String(255);
        SustanabilityHumanRights              : String(255);
        E01_ClimateChange                     : String(255);
        ESG02_Pollution                       : String(255);
        E03_WaterResources                    : String(255);
        ESG04_Biodiversity                    : String(255);
        ESG05_ResourcesAndCircularEconomy     : String(255);
        ESG01_ChildLaborScore                 : String(255);
        ESG02_FundamentalLaborRights          : String(255);
        ESG03_UnequalTreatmentScore           : String(255);
        ESG05_NaturalLivelihoodScore          : String(255);
        ESG06_SecurityForceScore              : String(255);
        ESG07_ForceLaborScore                 : String(255);
        ESG08_FreedomOfAssociationScore       : String(255);
        ESG09_ViolationOfReasonableWagesScore : String(255);
        ESG10_IllegalViolationOfLandScore     : String(255);
        PoliticalStabilityScore               : String(255);*/ 
        ESG01                                     : Double; //LB
        ESG02                                     : Double; //LB
        ESG03                                     : Double; //LB
        ESG04                                     : Double; //LB
        ESG05                                     : Double; //LB
        ESG06                                     : Double; //LB
        ESG07                                     : Double; //LB
        ESG08                                     : Double; //LB
        ESG09                                     : Double; //LB
        ESG10                                     : Double; //LB
        LkSG_Activated: String(255);
        
        
}