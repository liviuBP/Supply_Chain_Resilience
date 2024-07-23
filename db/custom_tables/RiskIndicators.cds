namespace sap.ariba;

using {managed} from '@sap/cds/common';
using sap.ariba.type as types from '../types';

entity RiskIndicators : managed {

    key IndicatorID    : String(255);
        IndicatorName  : String(255);
        LkSG_relevant  : String(255);
        CSDDD_relevant : String(255);


}
