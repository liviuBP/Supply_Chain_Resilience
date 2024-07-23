namespace sap.ariba;

using {managed} from '@sap/cds/common';
using sap.ariba.type as types from '../types';


entity CommodityRiskScores : managed {


    key CommodityCode             : String(255);
    key CommodityName             : String(255);
        AntiBriberyAntiCorruption : String(255);
        SustainabilityScore       : String(255);
        CommodityType             : String(255);
        ParentCode                : String(255);
        SupplierPool              : Double;
        AverageSwitchTime         : Double;
        ESG01                     : Double; //LB
        ESG02                     : Double; //LB
        ESG03                     : Double; //LB
        ESG04                     : Double; //LB
        ESG05                     : Double; //LB
        ESG06                     : Double; //LB
        ESG07                     : Double; //LB
        ESG08                     : Double; //LB
        ESG09                     : Double; //LB
        ESG10                     : Double; //LB

}
