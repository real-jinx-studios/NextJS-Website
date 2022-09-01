import XlsxPopulate from "xlsx-populate";
import { saveAs } from "file-saver";
export default async function handler(req, ress) {
  const reqData = req.body.data;
  const reqColumns = req.body.columns;

  function getSheetData(data, header) {
    let fields = Object.keys(data[0]);
    let sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }

  async function saveAsExcel(reqData, reqColumns) {
    let data = reqData;
    let header = [];
    reqColumns.forEach((c) => {
      header.push(c.Header);
    });

    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(data, header);
      const totalColumns = sheetData[0].length;

      sheet1.cell("A1").value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style("bold", true);
      sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
      range.style("border", true);
      return await workbook.outputAsync().then((res) => {
        ress.setHeader("content-type", "text/plain");
        ress.send(res);
        console.log(res);
      });
    });
  }

  const result = await saveAsExcel(reqData, reqColumns);
  console.log(result);
}
