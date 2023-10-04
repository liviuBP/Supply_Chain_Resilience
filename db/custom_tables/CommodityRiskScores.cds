namespace sap.ariba;
using { managed } from '@sap/cds/common';

using sap.ariba.type as types from '../types';


entity CommodityRiskScores: managed  {
    
    
    key ParentCode                        : String(255);
    key Realm                             : String(50);
        ParentType                        : String(255);
    key CommodityCode                     : String(255);
        CommodityName                     : String(255);
        AntiBriberyAntiCorruption         : String(255);
        SustainablilityScore              : String(255);
        
        
        
}