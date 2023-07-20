var excel = require("excel4node");
function printReport(pages, baseURL) {
  console.log("-------------");
  console.log("BEGIN REPORT");
  console.log("-------------");

  const urlObj = new URL(baseURL);
  // Create a new instance of a Workbook class
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var worksheet = workbook.addWorksheet("Sheet 1");

  // Create a reusable style
  var style = workbook.createStyle({
    font: {
      color: "#000000",
      size: 12,
      bold: true,
      vertAlign: "center",
    },
  });

  const sortedPages = sortPages(pages);
  console.log(`Creating Excel Report`);
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];

    worksheet.cell(1, 1).string("Pages").style(style);
    worksheet.cell(1, 2).string("Number of Links").style(style);

    worksheet.cell(sortedPage + 2, 1).string(url);

    worksheet.cell(sortedPage + 2, 2).number(hits);
  }
  try {
    workbook.write(`Crawl Report ${urlObj.hostname}.xlsx`);
    console.log("Excel Report Created");
  } catch (error) {
    console.log(`Something went wrong ${error.message}`);
  }
  console.log("-------------");
  console.log("END REPORT");
  console.log("-------------");
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];
    return b[1] - a[1];
  });
  return pagesArr;
}

module.exports = {
  sortPages,
  printReport,
};
