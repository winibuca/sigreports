const puppeteer = require("puppeteer");

async function crearFactura(url) {
  //Abrir el navegador
  let navegador = await puppeteer.launch();

  //Creamos una nueva pestaña o página
  let pagina = await navegador.newPage();

  //abrir la url dentro de esta página
  await pagina.goto(url);

  //Vamos a crear el pdf
  let pdf = await pagina.pdf();

  //cerrar el anvegador

  navegador.close();

  return pdf;
}

module.exports = {
  factura(req, res) {
    res.render("pdfs/factura", { layouts: "pdf" });
  },

  async descargar(req, res) {
    //Crear la factura
    let pdf = await crearFactura("http://localhost:3000/api/data");

    //devolver el response como pdf

    res.contentType("application/pdf");
    res.send(pdf);
  },
};
