namespace sap.ariba;
using { managed } from '@sap/cds/common';

using sap.ariba.type as types from '../types';


entity SupplierActivityRisk: managed  {
    
    key SupplierId                        : String(255);
    key Realm                             : String(255);
    key CommodityId                       : String(255);
    key CountryId                         : String(255);
        AntiBriberyAntiCorruption         : Double;
       
        
}