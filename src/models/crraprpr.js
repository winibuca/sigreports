const oracledb = require("oracledb");
const dbConfig = require("../../config/DatabaseConfig");

module.exports = {
  async getResumenTabla3(context) {
    const { p_codvor, p_ofcsol, p_codsol } = context;

    oracledb.fetchAsString = [oracledb.CLOB];
    await oracledb.createPool(dbConfig);

    const connection = await oracledb.getConnection();

    let query = `
      BEGIN
        :resumenTabla3 := OPS$COLOCA.pqbd_apex_crraprpr.fbd_col_resumen_tabla3(:p_codvor,:p_ofcsol,:p_codsol);
      END;
    `;

    const bindVars = {
      p_codvor,
      p_ofcsol,
      p_codsol,
      resumenTabla3: { dir: oracledb.BIND_OUT, type: oracledb.CLOB },
    };

    const result = await connection.execute(query, bindVars);

    let clobData = "";
    return new Promise((resolve, reject) => {
      if (result.outBinds.resumenTabla3) {
        const clob = result.outBinds.resumenTabla3;

        clob.setEncoding("utf8");

        clob.on("data", (chunk) => {
          clobData += chunk;
        });

        clob.on("end", () => {
          resolve(clobData); // Resuelve la promesa con los datos leídos
          connection.close();
        });

        clob.on("error", (err) => {
          console.error("Error reading CLOB:", err);
          reject(err); // Rechaza la promesa si hay un error
          connection.close();
        });
      } else {
        console.log("No CLOB data found.");
        resolve(""); // Resuelve la promesa con los datos leídos
        connection.close();
      }
    });
  },
  async getResumenTabla4(context) {
    const { p_codvor, p_ofcsol, p_codsol } = context;

    oracledb.fetchAsString = [oracledb.CLOB];
    await oracledb.createPool(dbConfig);

    const connection = await oracledb.getConnection();

    let query = `
      BEGIN
        :resumenTabla4 := OPS$COLOCA.pqbd_apex_crraprpr.fbd_col_resumen_tabla4(:p_codvor,:p_ofcsol,:p_codsol);
      END;
    `;

    const bindVars = {
      p_codvor,
      p_ofcsol,
      p_codsol,
      resumenTabla4: { dir: oracledb.BIND_OUT, type: oracledb.CLOB },
    };

    const result = await connection.execute(query, bindVars);

    let clobData = "";
    return new Promise((resolve, reject) => {
      if (result.outBinds.resumenTabla4) {
        const clob = result.outBinds.resumenTabla4;

        clob.setEncoding("utf8");

        clob.on("data", (chunk) => {
          clobData += chunk;
        });

        clob.on("end", () => {
          resolve(clobData); // Resuelve la promesa con los datos leídos
          connection.close();
        });

        clob.on("error", (err) => {
          console.error("Error reading CLOB:", err);
          reject(err); // Rechaza la promesa si hay un error
          connection.close();
        });
      } else {
        console.log("No CLOB data found.");
        resolve(""); // Resuelve la promesa con los datos leídos
        connection.close();
      }
    });
  },
};
