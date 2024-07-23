namespace sap.ariba;

using {managed} from '@sap/cds/common';
using sap.ariba.type as types from '../types';

entity ActualRiskInput : managed {

    key SupplierId           : String(255);
        AssessmentDate       : String(255);
        AssessmentType       : String(255);
        AssessmentRiskDomain : String(255);
        AssessmentRating     : String(255);

}
