namespace sap.ariba;
using { managed } from '@sap/cds/common';

using sap.ariba.type as types from '../types';


entity CountryRiskScores: managed  {

    CountryName                           : String(255);
    key CountryId                         : String(50);

        Region                            : String(255);
        SubRegion                         : String(255);
        AntiBriberyAntiCorruption         : Double;
        SustainabilityScore               : String(255);
        PoliticalStabilityScore           : String(255);
        NaturalDisasterScore              : String(255);
        
}