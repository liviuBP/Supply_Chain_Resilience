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
        TotalSpent                        : Double;
        SupplierTier                      : Double;
        OverallRisk                       : Double;
        AntiBriberyAntiCorruption         : Double;
        SustainabilityScore               : Double;
        NaturalDisasterScore              : Double;
        
}