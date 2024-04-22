namespace sap.ariba;
using { managed } from '@sap/cds/common';

using sap.ariba.type as types from '../types';

entity SupplierProfile: managed  {

    key SupplierId                        : String(255);
        SupplierName                      : String(255);
    key AddressCountry                    : String(255);
        AddressCity                       : String(255);
        TaxId                             : String(255);
        Segmentation                      : String(255);
        PreferredStatus                   : String(255);
        BusinessImpact                    : String(255);
        TotalSpent                        : Double;
        SupplierTier                      : Double;
        OverallRisk                       : Double;
        AntiBriberyAntiCorruption         : Double;
        SustainabilityScore               : Double;
        NaturalDisasterScore              : Double;

        SustainabilityEnvironmental           : Double;
        SustanabilityHumanRights              : Double;
        E01_ClimateChange                     : Double;
        ESG02_Pollution                       : Double;
        E03_WaterResources                    : Double;
        ESG04_Biodiversity                    : Double;
        ESG05_ResourcesAndCircularEconomy     : Double;
        ESG01_ChildLaborScore                 : Double;
        ESG02_FundamentalLaborRights          : Double;
        ESG03_UnequalTreatmentScore           : Double;
        ESG05_NaturalLivelihoodScore          : Double;
        ESG06_SecurityForceScore              : Double;
        ESG07_ForceLaborScore                 : Double;
        ESG08_FreedomOfAssociationScore       : Double;
        ESG09_ViolationOfReasonableWagesScore : Double;
        ESG10_IllegalViolationOfLandScore     : Double;
        PoliticalStabilityScore               : Double;
        LkSG_Exposure: Double;
        LkSG_Priority: Double;
        
}