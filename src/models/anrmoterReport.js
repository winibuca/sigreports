const oracledb = require("oracledb");
const dbConfig = require("../../config/DatabaseConfig");

module.exports = {
  async getTotalesTabla(context) {
    const { p_ter1, p_impvi, p_impca } = context;
    console.log(p_ter1, p_impvi, p_impca);
    // Crea la conexión a la base de datos
    await oracledb.createPool(dbConfig);

    const connection = await oracledb.getConnection();

    let query = 
    `
    BEGIN
    OPS$COLOCA.pqbd_apex_anrmoter.pbd_apex_totales_tabla(:p_ter1, :p_impvi, :p_impca, :p_total_mo, :p_total_mop);
    END;
    `
    ;

    const bindVars = {
      p_ter1: p_ter1,
      p_impvi: p_impvi,
      p_impca: p_impca,
      p_total_mo: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
      p_total_mop: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
    };

    // Ejecuta el procedimiento almacenado
    const result = await connection.execute(query, bindVars);
    await connection.close();

    return result.outBinds;
  },

  async getResumenTabla(context) {
    const { p_ter1, p_impvi, p_impca } = context;
    console.log(p_ter1, p_impvi, p_impca);
    // Crea la conexión a la base de datos
    await oracledb.createPool(dbConfig);

    const connection = await oracledb.getConnection();

    let query = 
    `BEGIN
      :return := OPS$COLOCA.pqbd_apex_anrmoter.fbd_apex_resumen_tabla(:p_ter1, :p_impvi, :p_impca);
    END;`
    ;

    const bindVars = {
      p_ter1: p_ter1,
      p_impvi: p_impvi,
      p_impca: p_impca,
      return: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
    };

    // Ejecuta el procedimiento almacenado
    const result = await connection.execute(query, bindVars);
    await connection.close();

    return result.outBinds;
  },
};
