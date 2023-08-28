const puppeteer = require("puppeteer");

async function generatePdfFromHtml(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  // Configurar tamaño de hoja como "carta" y márgenes
  await page.pdf({
    format: "letter",
  });
  const pdf = await page.pdf();
  await browser.close();
  return pdf;
}

module.exports = {
  generatePdfFromHtml,
};
