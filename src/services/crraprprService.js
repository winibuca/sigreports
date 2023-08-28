const crraprprModel = require("../models/crraprpr");
const path = require('path'); // Importa el módulo path


module.exports = {
  async getCrraprprData(context) {
    let colResumenTabla3 = await crraprprModel.getResumenTabla3(context);
    let colResumenTabla4 = await crraprprModel.getResumenTabla4(context);
    let resumenCliente = await crraprprModel.getResumenCliente(context);
    colResumenTabla3 = JSON.parse(colResumenTabla3);
    colResumenTabla4 = JSON.parse(colResumenTabla4);
    resumenCliente = JSON.parse(resumenCliente);

    response = {
      context,
      colResumenTabla3,
      colResumenTabla4,
      resumenCliente,
      logo: path.join(__dirname, '../views/assets/Logo.png'),
    };
    return response;
  },
};
