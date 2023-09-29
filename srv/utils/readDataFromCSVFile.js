function getDataFromCSVFile() {
    //srv commands are commented for the testing purpose of excel processing
    const XLSX = require('xlsx');
    // // Load the Excel file
    const workbook = XLSX.readFile('CountryRiskScores.csv');
    // // Select the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    // // Convert the sheet data to an array of objects
    const aExcelData = XLSX.utils.sheet_to_json(worksheet);
    return aExcelData;
}

module.exports = {
    getDataFromCSVFile
}