const puppeteer = require("puppeteer");

async function generatePdfFromHtml(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf();
  await browser.close();
  return pdf;
}

module.exports = {
  generatePdfFromHtml,
};
