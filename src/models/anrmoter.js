const oracledb = require("oracledb");
const dbConfig = require("../../config/DatabaseConfig");

module.exports = {
  async getSelectClasico(context) {
    const { p_ter1, p_impvi, p_impca } = context;
    console.log(p_ter1, p_impvi, p_impca);
    let response;
    try {
      // Crea la conexión a la base de datos
      oracledb.fetchAsString = [oracledb.CLOB];
      await oracledb.createPool(dbConfig);

      const connection = await oracledb.getConnection();

      const query = `
    SELECT * FROM ops$coloca.crtsolicr WHERE solicr_estsol='NG' AND solicr_ofcsol='001' AND SOLICR_TIPCRE='04'AND SOLICR_CODSOL=000000192
    `;

      response = await connection.execute(query, [], {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });
    } catch {
      (err) => console.log("Ocurrió un error", err);
    } finally {
      () => {
        console.log("Finalizó la consulta");
        connection.close();
      };
    }

    return response;
  },

  async getTotalesTabla(context) {
    const { p_ter1, p_impvi, p_impca } = context;
    console.log(p_ter1, p_impvi, p_impca);
    // Crea la conexión a la base de datos
    oracledb.fetchAsString = [oracledb.CLOB];
    await oracledb.createPool(dbConfig);

    const connection = await oracledb.getConnection();

    const query = `
      BEGIN
        :result := OPS$COLOCA.pqbd_apex_crrsopcr.SelectFunc();
      END;
    `;

    const bindVars = {
      result: { dir: oracledb.BIND_OUT, type: oracledb.CLOB },
    };

    connection
      .execute(query, bindVars)
      .then((res) => {
        console.log("Este es el resultado", res);

        if (res.outBinds.result) {
          const clob = res.outBinds.result;

          let clobData = "";
          clob.setEncoding("utf8");

          clob.on("data", (chunk) => {
            clobData += chunk;
          });

          clob.on("end", () => {
            console.log("CLOB data:", clobData);
            connection.close();
          });

          clob.on("error", (err) => {
            console.error("Error reading CLOB:", err);
            connection.close();
          });
        } else {
          console.log("No CLOB data found.");
          connection.close();
        }
      })
      .catch((err) => console.log("HUbo un error:", err));

    // await connection.close();
  },

  async getResumenTabla(context) {
    const { p_ter1, p_impvi, p_impca } = context;
    console.log(p_ter1, p_impvi, p_impca);
    // Crea la conexión a la base de datos
    await oracledb.createPool(dbConfig);

    const connection = await oracledb.getConnection();

    let query = `BEGIN
      :return := OPS$COLOCA.pqbd_apex_anrmoter.fbd_apex_resumen_tabla(:p_ter1, :p_impvi, :p_impca);
    END;`;
    const bindVars = {
      p_ter1: p_ter1,
      p_impvi: p_impvi,
      p_impca: p_impca,
      return: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    };

    // Ejecuta el procedimiento almacenado
    const result = await connection.execute(query, bindVars);
    await connection.close();

    return result.outBinds;
  },
};
