const express = require("express");
const { engine } = require("express-handlebars");
const oracledb = require("oracledb");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configurar la conexión a Oracle Database
const dbConfig = {
  user: "OPS$COLOCA",
  password: "COLFINA19C",
  connectString:
    "rds-oracle-db-siglease-dev.c1lwzofwengl.us-east-1.rds.amazonaws.com:1548/fina",
};

// Establecer el endpoint para obtener todos los registros
app.get("/api/data", async (req, res) => {
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
    await console.log(result);
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
    await res.render("pdfs/reporte", { Q_1: dataForTemplate, Q_2: [] }); // En este caso, Q_2 está vacío porque no hay información para esta parte en la consulta actual
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
});

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Importa el enrutador
const routes = require("./routes");

// Aplica el enrutador a la ruta raíz "/"
app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
