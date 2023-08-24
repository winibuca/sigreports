const crraprprModel = require("../models/crraprpr");

module.exports = {
  async getCrraprprData(context) {
    let colResumenTabla3 = await crraprprModel.getResumenTabla3(context);
    let colResumenTabla4 = await crraprprModel.getResumenTabla4(context);
    colResumenTabla3 = JSON.parse(colResumenTabla3);
    colResumenTabla4 = JSON.parse(colResumenTabla4);

    response = { colResumenTabla3, colResumenTabla4 };
    return response;
  },
};
