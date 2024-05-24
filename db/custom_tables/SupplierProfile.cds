namespace sap.ariba;

using {managed} from '@sap/cds/common';
using sap.ariba.type as types from '../types';

entity SupplierProfile : managed {

    key SupplierId                                : String(255);
        SupplierName                              : String(255);
    key AddressCountry                            : String(255);
        AddressCity                               : String(255);
        TaxId                                     : String(255);
        Segmentation                              : String(255);
        PreferredStatus                           : String(255);
        BusinessImpact                            : String(255);
        TotalSpent                                : Double;
        SupplierTier                              : Double;
        OverallRisk                               : Double;
        AntiBriberyAntiCorruption                 : Double;
        SustainabilityScore                       : Double;
        NaturalDisasterScore                      : Double;
        SustainabilityEnvironmental               : Double;
        SustanabilityHumanRights                  : Double;
        E01_ClimateChange                         : Double;
        ESG02_Pollution                           : Double;
        E03_WaterResources                        : Double;
        ESG04_Biodiversity                        : Double;
        ESG05_ResourcesAndCircularEconomy         : Double;
        ESG01_ChildLaborScore                     : Double;
        ESG02_FundamentalLaborRights              : Double;
        ESG03_UnequalTreatmentScore               : Double;
        ESG05_NaturalLivelihoodScore              : Double;
        ESG06_SecurityForceScore                  : Double;
        ESG07_ForceLaborScore                     : Double;
        ESG08_FreedomOfAssociationScore           : Double;
        ESG09_ViolationOfReasonableWagesScore     : Double;
        ESG10_IllegalViolationOfLandScore         : Double;
        PoliticalStabilityScore                   : Double;
        LkSG_Exposure                             : Double;     //LB
        LkSG_Priority                             : Double;     //LB
        Actual_OverallRisk                        : Double;     //LB
        Actual_AntiBriberyAntiCorruption          : Double;     //LB
        Actual_SustainabilityScore                : Double;     //LB
        Actual_NaturalDisasterScore               : Double;     //LB
        Actual_OverallRisk_previous               : Double;     //LB
        Actual_AntiBriberyAntiCorruption_previous : Double;     //LB
        Actual_SustainabilityScore_previous       : Double;     //LB
        Actual_NaturalDisasterScore_previous      : Double;     //LB
        SupplyChainRisk                           : Double;     //LB
        Actual_SupplyChainRisk                    : Double;     //LB
        Relevant_n_tier                           : Double;     //LB
        ValidContract                             : String(3);  //LB
        NoticePeriodRisk                          : Double;     //LB
        SingleSourced                             : String(3);  //LB

}
