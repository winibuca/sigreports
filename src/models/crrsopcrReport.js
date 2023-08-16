const oracledb = require("oracledb");
const dbConfig = require("../../config/DatabaseConfig");

module.exports = {
  async getCrrsopcrData(context) {
    const { sol_unidad, sol_oficina, sol_solicitud } = context;
    console.log(sol_unidad, sol_oficina, sol_solicitud);
    // Crea la conexión a la base de datos
    await oracledb.createPool(dbConfig);

    const connection = await oracledb.getConnection();

    let query = `
    BEGIN
      :i := OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_g_sol_unidad(:sol_oficina, :sol_solicitud ,:sol_unidad );
      --:v_logo:=OPS$COLOCA.pqbd_apex_utility.fbd_apex_img_logo;
      --:v_contra_estruc:= OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_crtrestr(:sol_unidad,:sol_solicitud ,:sol_oficina);
      --:v_vorno :=OPS$COLOCA.pqbd_apex_crrsopcr.f_SolicitudVorNoFormula (:sol_oficina, :sol_solicitud ,:sol_unidad );
      --:v_usucial:=OPS$COLOCA.pqbd_apex_crrsopcr.F_rep$desc_usuario(pqbd_apex_crrsopcr.f_usuario_solicitud (:sol_oficina, :sol_solicitud ,:sol_unidad ));
      --:v_fecha_recibo_credito:=OPS$COLOCA.pqbd_apex_crrsopcr.f_recibidocredito(:sol_oficina, :sol_solicitud ,:sol_unidad );
      --:v_nombre_oficina:=OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_nomoficina( :sol_oficina, :sol_solicitud ,:sol_unidad);
      --:v_tipo_referido:= OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_tiporeferido (:sol_oficina, :sol_solicitud ,:sol_unidad);
      --:v_linea_estrategia:= OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_lineaestrategica (:sol_oficina, :sol_solicitud ,:sol_unidad);
      --:v_codigo_proveedor := OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_codigorefproveedor ( :sol_oficina, :sol_solicitud ,:sol_unidad);
      --:v_nomproveedor     := OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_nombrerefprovee(:sol_oficina, :sol_solicitud ,:sol_unidad);
      --:v_codigo_asesor:= OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_codigorefasesor (:sol_oficina, :sol_solicitud ,:sol_unidad);
      --:v_nombreasesor:= OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_nombrerefasesor (:sol_oficina, :sol_solicitud ,:sol_unidad);
      ----:v_tabla_prenda:= OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_masprendas  (:sol_oficina, :sol_solicitud ,:sol_unidad);
      ----:v_tabla_nit_ter:= OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_ter_nit(:sol_oficina, :sol_solicitud ,:sol_unidad);
      ----:v_proveedor_ext:= OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_proveedore_ext(:sol_oficina, :sol_solicitud ,:sol_unidad);
      --:v_cod_referido:=OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_codigoReferido(:sol_oficina, :sol_solicitud ,:sol_unidad);
      --:v_nom_referido:=OPS$COLOCA.pqbd_apex_crrsopcr.fbd_apex_NombreReferido (:sol_oficina, :sol_solicitud ,:sol_unidad);
    END;
    `;

    // Ejecuta el procedimiento almacenado
    const result = await connection.execute(query, {
      sol_unidad,
      sol_oficina,
      sol_solicitud,
      i: {
        dir: oracledb.BIND_OUT,
        type: oracledb.DB_TYPE_OBJECT,
      },
      // v_logo: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_contra_estruc: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_vorno: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_usucial: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_fecha_recibo_credito: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_nombre_oficina: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_tipo_referido: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_linea_estrategia: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_codigo_proveedor: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_nomproveedor: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_codigo_asesor: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_nombreasesor: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //// v_tabla_prenda: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //// v_tabla_nit_ter: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //// v_proveedor_ext: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_cod_referido: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      //v_nom_referido: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    });

    await connection.close();

    return result;
  },

};
