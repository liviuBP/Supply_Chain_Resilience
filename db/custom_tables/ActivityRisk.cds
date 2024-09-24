namespace sap.ariba;

using {managed} from '@sap/cds/common';
using sap.ariba.type as types from '../types';

entity ActivityRisk : managed {

    key SupplierId                : String(255);
    key CommodityId               : String(255);
    key CountryId                 : String(255);
        AntiBriberyAntiCorruption : Double;
        SustainabilityScore       : Double;
        NaturalDisasterScore      : Double;
        //SustainabilityEnvironmental           : Double;
        //SustanabilityHumanRights              : Double;
        //E01_ClimateChange                     : Double;
        //ESG02_Pollution                       : Double;
        //E03_WaterResources                    : Double;
        //ESG04_Biodiversity                    : Double;
        //ESG05_ResourcesAndCircularEconomy     : Double;
        //ESG01_ChildLaborScore                 : Double;
        //ESG02_FundamentalLaborRights          : Double;
        //ESG03_UnequalTreatmentScore           : Double;
        //ESG05_NaturalLivelihoodScore          : Double;
        //ESG06_SecurityForceScore              : Double;
        //ESG07_ForceLaborScore                 : Double;
        //ESG08_FreedomOfAssociationScore       : Double;
        //ESG09_ViolationOfReasonableWagesScore : Double;
        //ESG10_IllegalViolationOfLandScore     : Double;
        //PoliticalStabilityScore               : Double;
        ESG01                     : Double; //LB
        ESG02                     : Double; //LB
        ESG03                     : Double; //LB
        ESG04                     : Double; //LB
        ESG05                     : Double; //LB
        ESG06                     : Double; //LB
        ESG07                     : Double; //LB
        ESG08                     : Double; //LB
        ESG09                     : Double; //LB
        ESG10                     : Double; //LB
        ESG11                     : Double; //LB
}
