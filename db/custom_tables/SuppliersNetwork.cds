namespace sap.ariba;

using {managed} from '@sap/cds/common';
using sap.ariba.type as types from '../types';

entity SuppliersNetwork : managed {

    key SupplierIDParent : String(255);
    key SupplierIDChild  : String(255);


}
