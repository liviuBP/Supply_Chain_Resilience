namespace sap.ariba;

using {managed} from '@sap/cds/common';
using sap.ariba.type as types from '../types';

entity SupplierNetwork : managed {

    key SupplierIDParent : String(255);
    key SuppleirIDChild  : String(255);


}
