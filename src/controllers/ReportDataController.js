const { renderHandlebarsTemplate } = require("../utils/handlebarUtils");
const { generatePdfFromHtml } = require("../utils/puppeteerUtils");
const { getCrrsopcrData } = require("../models/crrsopcrReport");
const oracledb = require("oracledb");
const dbConfig = require("../../config/DatabaseConfig");

module.exports = {
  async crrsopcrReport(req, res) {
    try {
      const context = req.body;
      const result = await getCrrsopcrData(context);
      res
        .status(200)
        .json({ message: "Procedimiento ejecutado exitosamente", result });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  async getPrueba2(req, res) {
    try {
      const data = {
        title: "Ejemplo de Plantilla Handlebars",
        items: [
          { name: "Item 1", price: 10 },
          { name: "Item 2", price: 20 },
          { name: "Item 3", price: 30 },
        ],
        total: 60,
      };

      // Renderiza la plantilla Handlebars en HTML
      const renderedHtml = await renderHandlebarsTemplate("pdfs/factura", data);

      // Genera el PDF desde el HTML renderizado
      const pdf = await generatePdfFromHtml(renderedHtml);

      // Envía el PDF como respuesta
      res.contentType("application/pdf");
      res.send(pdf);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  async getDataPrueba(req, res) {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      let consulta = `SELECT INC.INCCOD, INC.INCDES, INC.INCCOL, INC.INCPOL, COL.COLBEN, COL.COLFAPE, COL.COLFVEN, COL.COLMON,
      DECODE(TER.TERPER, 'N', TER.TERAPE || ' ' || TER.TERNOM, TER.TERAPE) AS NOMBRE
      FROM INC
      LEFT JOIN OPS$COLOCA.COL ON COL.COLCOD = INC.INCCOL AND COL.COLTDOC = '03' AND COL.COLOFI = INC.INCOFC AND COL.COLESTC = 'VI'
      JOIN OPS$SEGUI.TER ON TER.TERCOD = COL.COLBEN
      WHERE INC.INCCOD NOT IN (
      SELECT DISTINCT SEGCOD
      FROM OPS$ACTIVOS.SEG
      WHERE (SEGTER IS NOT NULL OR NVL(SEGVAL, 0) > 0) AND SEGCOD = INC.INCCOD
      )
      ORDER BY INC.INCCOL, INC.INCCOD
      `;

      const result = await connection.execute(consulta);
      await connection.close();

      // Transformar el resultado en un formato adecuado para la plantilla Handlebars
      const dataForTemplate = result.rows.map((row) => {
        return {
          F_INCCOL: row[0],
          F_COLBEN: row[1],
          F_NOMBRE: row[2],
          F_COLFAPE: row[3],
          F_COLFVEN: row[4],
          F_COLMON: row[5],
          F_INCCOD: row[6],
          F_INCDES: row[7],
          LOGO: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fminciencias.gov.co%2Ffiles%2Fdaviviendajpg&psig=AOvVaw2AN8b66Hzz34k4Xd-8oBLS&ust=1690835826981000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKjmv7ykt4ADFQAAAAAdAAAAABAD", // La propiedad LOGO debe ser reemplazada con la URL o el contenido de la imagen que corresponde a cada fila
        };
      });

      // Renderizar la plantilla Handlebars con los datos adecuados
      // await res.render("pdfs/reporte", { Q_1: dataForTemplate, Q_2: [] }); // En este caso, Q_2 está vacío porque no hay información para esta parte en la consulta actual
      res.status(200).json(dataForTemplate);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener los datos" });
    }
  },

  async getParticipantForRole(req, res) {
    try {
      await oracledb.createPool(dbConfig);
      const connection = await oracledb.getConnection();

      // Ejecuta el procedimiento almacenado
      const result = await connection.execute(
        `BEGIN
        APEX_OWNER."EBA_DEMO_APPR".get_participant_for_role(:p_task_def_static_id,:p_job,:p_proposed_sal,:p_role);
             END;`,
        {
          p_task_def_static_id: "SALARY_CHANGE",
          p_job: null,
          p_proposed_sal: 4000,
          p_role: "APPROVER",
        }
      );

      await connection.close();

      res
        .status(200)
        .json({ message: "Procedimiento ejecutado exitosamente", result });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  async pruebaApi(req, res) {
    try {
      /**
       * Asumiendo que esta es la data que viene de la base de datos ejecutando los procedimientos almacenados
       */
      let result = {
        nombre: "Nicolas",
        apellido: "Buitrago Camacho",
        edad: "24",
      };
      res
        .status(200)
        .json({ message: "Procedimiento ejecutado exitosamente", result });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
