namespace sap.ariba;
using { managed } from '@sap/cds/common';

using sap.ariba.type as types from '../types';


entity CommodityRiskScores: managed  {
    
    //key ParentCode                      : String(255);
    //    ParentType                      : String(255);
    key CommodityCode                     : String(255);
    key CommodityName                     : String(255);
        AntiBriberyAntiCorruption         : Double;
        SustainablilityScore              : String(255);
        
        
        
}