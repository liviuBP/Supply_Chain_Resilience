function getDataFromCSVFile(CSVfile) {


    const XLSX = require('xlsx');
    const path = require('path');
    const file = path.resolve(__dirname,"CSV",CSVfile);

    // // Load the Excel file

    const workbook = XLSX.readFile(file);

    // // Select the first sheet

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    // // Convert the sheet data to an array of objects

    const aExcelData = XLSX.utils.sheet_to_json(worksheet);

    const logger = cds.log('logger');
    for (var index in aExcelData) {      
        //logger.info(aExcelData[index].CountryId,aExcelData[index].Region,aExcelData[index].Subregion);
        //logger.info(aExcelData[index].CommodityName);
    }
 
    return aExcelData;
              
}



module.exports = {

    getDataFromCSVFile

}