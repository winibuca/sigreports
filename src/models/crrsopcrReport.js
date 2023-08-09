const oracledb = require("oracledb");
const dbConfig = require("../../config/DatabaseConfig");

module.exports = {
  async getCrrsopcrData(context) {
    const { sol_unidad, sol_oficina, sol_solicitud } = context;
    console.log(sol_unidad, sol_oficina, sol_solicitud);
    // Crea la conexión a la base de datos
    await oracledb.createPool(dbConfig);

    const connection = await oracledb.getConnection();

    let query = `BEGIN
    :output :=OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_nomoficina(:sol_oficina, :sol_solicitud ,:sol_unidad );
    END;`;

    // Ejecuta el procedimiento almacenado
    const result = await connection.execute(query, {
      sol_unidad,
      sol_oficina,
      sol_solicitud,
      output: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    });

    await connection.close();

    console.log(sol_unidad, sol_oficina, sol_solicitud);
    return result.outBinds.output;
  },
};
