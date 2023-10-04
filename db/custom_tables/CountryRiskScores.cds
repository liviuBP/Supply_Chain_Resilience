namespace sap.ariba;
using { managed } from '@sap/cds/common';

using sap.ariba.type as types from '../types';


entity CountryRiskScores: managed  {
    
    key CountryId                         : String(50);
    key Realm                             : String(50);

        Region                            : String(255);
        Subregion                         : String(255);
        AntiBriberyAntiCorruption         : String(255);
        SustainabilityScore               : String(255);
        PoliticalStabilityScore           : String(255);
        NaturalDisasterScore              : String(255);
        
}