namespace sap.ariba;
using { managed } from '@sap/cds/common';

using sap.ariba.type as types from '../types';


entity CommodityRiskScores: managed  {
    
   
    key CommodityCode                     : String(255);
    key CommodityName                     : String(255);
        AntiBriberyAntiCorruption         : String(255);
        SustainabilityScore               : String(255);
        CommodityType                     : String(255);
        ParentCode                        : String(255);
        
        
        
}