<!-- 

Vista o capa de presentacion de la pantalla del catálogo de empresa en donde se mostraran  las empresa
registradas en el sistema en un formato de listado, en donde  se cuenta con las opciones de exportar a Excel, CSV, Word, PDF, agregar, actualizar,
habilitar, deshabilitar, configurar timbrado, revisaar folios fiscales, alta de folios fiscales, cancelar timbrado y borrar
segun el nivel de acceso que tenga el usuario, ademas contara con un menu de acceso rapido a el proceso de configuracion de empresas

@author Gustavo Avila Medina <gussjq@gmail.com> cel <8187789518>
@created 09-03-2015

-->

<!-- INICIA ICONO TOOLBAR PARA LAS ACCIONES SOLO CUANDO ES RESPONSIVE DEBE DE INCLUIRSE EN TODOS LOS CATALOGOS -->
<a class="btn btn-subhead" data-toggle="collapse" data-target=".subhead-collapse">
    <?php echo lang("general_toolbar"); ?>		
    <i class="icon-wrench"></i>
</a>
<!-- FIN ICONO TOOLBAR PARA LAS ACCIONES SOLO CUANDO ES RESPONSIVE  -->

<!-- INICIA BARRA DE ACCIONES DEBE DE INCLUIRSE EN TODOS LOS CATALGOS -->
<div class="subhead-collapse collapse">
    <div class="subhead">
        <div class="container-fluid">
            <div id="container-collapse" class="container-collapse"></div>
            <div class="row-fluid">
                <div class="span12">
                    <div class="btn-toolbar" id="toolbar">
                        <!-- INICIA PARTE IZQUIERDA  -->
                        <div class="btn-wrapper" id="toolbar-new">
                            <?php if ($this->seguridad->verificarAcceso("empresas", "insertar")): ?>
                                <button onclick="empresas.btnAgregar();" class="btn btn-small btn-success">
                                    <span class="icon-new icon-white"></span>
                                    <?php echo lang('general_accion_agregar'); ?>
                                </button>
                            <?php endif; ?>
                        </div>

                        <div class="btn-wrapper" id="toolbar-edit">
                            <button onclick="empresas.btnBusquedaAvanzada();" class="btn btn-small">
                                <span class="icon-zoom-in"></span>
                                <?php echo lang('general_accion_busqueda_avanzada'); ?>
                            </button>
                        </div>

                        <div class="btn-wrapper" id="toolbar-publish">
                            <button onclick="empresas.btnListado();" class="btn btn-small">
                                <span class="icon-circle"></span>
                                <?php echo lang('general_accion_recargar'); ?>
                            </button>
                        </div>
                        <!-- FIN PARTE IZQUIERDA  -->

                        <!-- INICIA PARTE DERECHA  -->
                        <?php if ($this->seguridad->verificarAcceso("empresas", "exportar")): ?>
                            <div class="btn-wrapper" id="toolbar-help">
                                <a href="<?php echo base_url("empresas/exportar/word"); ?>" rel="help" class="btn btn-small" target="_blank">
                                    <span class="icon-export-word"></span>
                                    <?php echo lang("general_accion_word"); ?>
                                </a>
                            </div>

                            <div class="btn-wrapper" id="toolbar-help">
                                <a href="<?php echo base_url("empresas/exportar/xls"); ?>" rel="help" class="btn btn-small" target="_blank">
                                    <span class="icon-export-excel"></span>
                                    <?php echo lang("general_accion_excel"); ?>
                                </a>
                            </div>

                            <div class="btn-wrapper" id="toolbar-help">
                                <a href="<?php echo base_url("empresas/exportar/csv"); ?>" rel="help" class="btn btn-small" target="_blank">
                                    <span class="icon-export-csv"></span>
                                    <?php echo lang("general_accion_csv"); ?>
                                </a>
                            </div>

                            <div class="btn-wrapper" id="toolbar-help">
                                <a href="<?php echo base_url("empresas/exportar/pdf"); ?>" rel="help" class="btn btn-small" target="_blank">
                                    <span class="icon-export-pdf"></span>
                                    <?php echo lang("general_accion_pdf"); ?>
                                </a>
                            </div>
                        <?php endif; ?>
                        <!-- FIN PARTE DERECHA  -->
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
<!-- FIN BARRA DE ACCIONES  -->

<br />


<!-- INICIA CONTENIDO DEL CATALOGO DEBE INCLUIRSE EN TODOS LOS CATALOGOS -->
<div class="container-fluid container-main">
    <section id="content">
        <!-- Begin Content -->
        <div class="row-fluid">
            <div id="j-sidebar-container" class="span2">
                <div id="sidebar">
                    <div class="sidebar-nav">
                        <ul id="submenu" class="nav nav-list">
                            <?php echo pintarMenuCatalogo($aMenuCatalogo); ?>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="span10">
                <!-- INICIA AREA BUSQUEDA AVANZADA -->
                <div class="row-fluid">
                    <div id="busqueda-avanzada" style="display: none;" >
                        <div class="contenedor_gris">
                            <?php echo form_open("empresas/busqueda-avanzada", "id=\"forma-empresas-busqueda-avanzada\" "); ?>
                            <table class="tbl-busqueda-avanzada">
                                <tbody>
                                    <tr>
                                        <td><label class="control-label" for="cCodigo"><?php echo lang("empresas_codigo"); ?> :</label></td>
                                        <td colspan="3"><?php echo form_input("cCodigo", "", "id=\"cCodigo\"class=\"input-small convertir-mayusculas\" "); ?></td>
                                    </tr>
                                    
                                    <tr>
                                        <td><label class="control-label" for="cNombre"><?php echo lang("empresas_nombre"); ?> :</label></td>
                                        <td colspan="3"><?php echo form_input("cNombre", "", "id=\"cNombre\"class=\"input-large\" "); ?></td>
                                    </tr>
                                    
                                    <tr>
                                        <td><label class="control-label" for="cRazonSocial"><?php echo lang("empresas_razon_social"); ?> :</label></td>
                                        <td colspan="3"><?php echo form_input("cRazonSocial", "", "id=\"cRazonSocial\"class=\"input-xxlarge\" "); ?></td>
                                    </tr>
                                    
                                    <tr>
                                        <td><label class="control-label" for="cCurp"><?php echo lang("empresas_curp"); ?> :</label></td>
                                        <td><?php echo form_input("cCurp", "", "id=\"cCurp\"class=\"input-large convertir-mayusculas show-tooltip\" title=\"" . lang("empresas_curp_format_help") . "\""); ?></td>
                                        <td>
                                                <label class="control-label" for="cRFC">
                                                    <?php echo lang("empresas_rfc"); ?> :
                                                </label>
                                        </td>
                                        <td><?php echo form_input("cRFC", "", "id=\"cRFC\"class=\"input-large convertir-mayusculas show-tooltip\" title=\"" . lang("empresas_rfc_format_help") . "\""); ?></td>
                                    </tr>
                                    
                                    <tr>
                                        <td><label class="control-label" for="cInfonavit"><?php echo lang("empresas_infonavit"); ?> :</label></td>
                                        <td><?php echo form_input("cInfonavit", "", "id=\"cInfonavit\"class=\"input-large\" "); ?></td>
                                        <td><label class="control-label" for="cGiro"><?php echo lang("empresas_giro"); ?> :</label></td>
                                        <td><?php echo form_input("cGiro", "", "id=\"cGiro\"class=\"input-large\" "); ?></td>
                                    </tr>
                                    
                                    <tr>
                                        <td><label class="control-label" for="cRepresentanteLegal"><?php echo lang("empresas_representante_legal"); ?> :</label></td>
                                        <td colspan="3"><?php echo form_input("cRepresentanteLegal", "", "id=\"cRepresentanteLegal\"class=\"input-xxlarge\""); ?></td>
                                        
                                    </tr>

                                    <tr>
                                        <td>&nbsp;</td>
                                        <td >
                                            <?php echo form_button('cCancelar', lang("general_accion_cancelar"), 'id="cCancelar" class="btn btn-secundary " onclick="empresas.btnCancelarBusqueda();"'); ?>
                                            &nbsp;
                                            <?php echo form_button('cBuscar', lang("general_accion_buscar"), 'id="cGuardar" class="btn btn-primary " onclick="empresas.btnBuscar();"'); ?>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <?php echo form_close(); ?>
                        </div>
                    </div>
                </div>
                <!-- FIN AREA BUSQUEDA AVANZADA -->

                <!-- INICIA AREA LISTADO DE REGISTROS -->
                <div class="row-fluid" >
                    <table width="100%" cellpadding="2" cellspacing="1" class="data-grid">
                        <tr>
                            <td>
                                <div class="ui-corner-all envoltura-tabla">
                                    <table cellpadding="0" cellspacing="0" border="0" class="display" id="listado">
                                        <thead>
                                            <tr>
                                                <th><?php echo lang('empresas_codigo'); ?></th>
                                                <th><?php echo lang('empresas_nombre'); ?></th>
                                                <th><?php echo lang('empresas_razon_social'); ?></th>
                                                <th><?php echo lang('empresas_rfc'); ?></th>
                                                <th><?php echo lang('empresas_numero_timbrado_listado'); ?></th>
                                                <th><?php echo lang('general_acciones'); ?></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>																	
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- INICIA AREA LISTADO DE REGISTROS -->
            </div>
        </div>
        <!-- End Content -->
    </section>
</div>
<!-- FIN CONTENIDO DEL CATALOGO  -->

<!-- INICIA MENSAJE DE CONFIRMACION DE CANCELAR TIMBRADO  -->
<div id="mesnaje-cancelar-timbrado" style="display: none;">
    <p><?php echo lang("empresas_mensaje_cancelar_pregunta"); ?></p>
    <br />
    <table>
        <tbody>
            <tr>
                <td style="font-weight: bold;width: 100px;"><?php echo lang("empresas_rfc") ?> :</td>
                <td><span id="replace-rfc" ></span></td>
            </tr>
            
            <tr>
                <td style="font-weight: bold;"><?php echo lang("empresas_razon_social") ?> :</td>
                <td><span id="replace-razon-social"></span></td>
            </tr>
            
            <tr>
                <td style="font-weight: bold;"><?php echo lang("empresas_numero_timbrado_listado") ?> :</td>
                <td><span id="replace-numero-tiimbrado"></span></td>
            </tr>
        </tbody>
    </table>
</div>
<!-- FIN MENSAJE DE CONFIRMACION DE CANCELAR TIMBRADO  -->


<!-- INICIA AREA JAVASCRIPT -->
<?php $this->load->view(LAYOUT_DEFAULT . "javascript_base_view"); ?>
<?php incluye_componente_datatables(); ?>
<?php incluye_componente_tabletools(); ?>
<?php script_tag("plugins/ajaxForm/jquery.ajaxForm"); ?>
<?php script_tag("modulos/empresas"); ?>

<script type="text/javascript" >
    var acciones = {
        "editar": "<?php echo incluye_icono("editar", lang("general_accion_editar"), "float:left;", base_url() . "empresas/forma/@@@@", "", true, "actualizar") ?>",
        "eliminar": "<?php echo incluye_icono("eliminar", lang("general_accion_eliminar"), "float:left;", "#", "onclick=\'empresas.btnEliminar(@@@@,????)\'", true, "eliminar"); ?>",
        "habilitar": "<?php echo incluye_icono("habilitar", lang("general_accion_habilitar"), "float:left;", "#", "onclick=\'empresas.btnCmd(@@@@, @@@@@)\'", true, "habilitar"); ?>",
        "deshabilitar": "<?php echo incluye_icono("deshabilitar", lang("general_accion_deshabilitar"), "float:left;", "#", "onclick=\'empresas.btnCmd(@@@@, @@@@@)\'", true, "deshabilitar"); ?>",
        "configuracionTimbrado": "<?php echo incluye_icono("configurar", lang("empresas_accion_configuracion_timbrado"), "float:left;", base_url() . "empresas/formaTimbrado/@@@@", "", true, "formaTimbrado"); ?>",
        "cancelarTimbrado": "<?php echo incluye_icono("alert", lang("empresas_accion_cancelar_timbrado"), "float:left;", "#", "onclick=\'empresas.btnCancelarTimbrado(@@@@, $$$$, &&&&, ####)\'", true, "cancelarTimbrado"); ?>",
        "foliosFiscales": "<?php echo incluye_icono("tag", lang("empresas_accion_folios_fiscales"), "float:left;", base_url() . "seriesfiscales/listado/@@@@", "", true, "revisarFoliosFiscales"); ?>",
    };
    
    var dataTableUI = new CoreUI.CacheDataTable({
        delay: 500,
        complete: function (json) {
            if (json.noLogin) {
                empresas.irIniciarSesion();
            }
        }
    });
    
    empresas.TEXT_MENSAJE_ELIMINAR_TIMBRADO = "<?php echo lang("empresas_mensaje_cancelar_timbrado"); ?>";
    
    var oTable;
    $(document).ready(function () {
        oTable = $('#listado').dataTable({
            "sDom": '<"top"lf<"clear">>rt<"bottom"ip<"clear">',
            "bSort": true,
            "bPaginate": true,
            "bJQueryUI": true,
            "sPaginationType": "full_numbers",
            "iDisplayLength": 10,
            "bServerSide": true,
            "bProcessing": true,
            "aoColumns": [
                {"sName": "cCodigo", "sWidth": "6%"},
                {"sName": "cNombre", "sWidth": "22%"},
                {"sName": "cRazonSocial", "sWidth": "32%"},
                {"sName": "cRFC","sWidth": "12%"},
                {"sName": "idConfiguracionTimbrado", "sWidth": "8%"},
                {"sName": "idEmpresa", "sWidth": "13%"},
                {"sName": "bHabilitado", "bSortable": false, "bSearchable": false, "bVisible": false},
                {"sName": "cCurp", "bSortable": false, "bSearchable": true, "bVisible": false},
                {"sName": "cRepresentanteLegal", "bSortable": false, "bSearchable": true, "bVisible": false},
            ],
            "sAjaxSource": Generic.BASE_URL + Generic.CONTROLLER + "/listadoAjax",
            "fnServerData": function (sSource, aoData, fnCallback) {
                aoData[aoData.length] = {name: "cCodigo", value: empresas.cCodigo};
                aoData[aoData.length] = {name: "cNombre", value: empresas.cNombre};
                aoData[aoData.length] = {name: "cRazonSocial", value: empresas.cRazonSocial};
                aoData[aoData.length] = {name: "cRFC", value: empresas.cRFC};
                aoData[aoData.length] = {name: "cCurp", value: empresas.cCurp};
                aoData[aoData.length] = {name: "cRepresentanteLegal", value: empresas.cRepresentanteLegal};
                aoData[aoData.length] = {name: "cInfonavit", value: empresas.cInfonavit};
                aoData[aoData.length] = {name: "cGiro", value: empresas.cGiro};
                dataTableUI.tablePipeLine(sSource, aoData, fnCallback);
            },
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                var cActions = '<div class="fg-buttonset">';
                
                cActions += acciones["editar"].replace("@@@@", aData[5]) + "\n";
                
                if (aData[6] == 1) {
                    cActions += acciones["deshabilitar"]
                            .replace("@@@@", aData[5])
                            .replace("@@@@@",   "\"" + Generic.BASE_URL + Generic.CONTROLLER + "/deshabilitar/\"" );
                } else {
                    cActions += acciones["habilitar"]
                            .replace("@@@@", aData[5])
                            .replace("@@@@@",  "\"" + Generic.BASE_URL + Generic.CONTROLLER + "/habilitar/\"");
                }
                
                cActions += acciones["configuracionTimbrado"].replace("@@@@", aData[5]) + "\n";
                if(aData[4] > 0)
                {
                    cActions += acciones["cancelarTimbrado"].replace("@@@@", "\"" + aData[3] + "\"")
                                                        .replace("$$$$", "\"" + aData[2] + "\"")
                                                        .replace("&&&&", aData[4])
                                                        .replace("####", aData[5]);
                }
                
                cActions += acciones["foliosFiscales"].replace("@@@@", aData[5]) + "\n";
                
                cActions += acciones["eliminar"]
                        .replace("@@@@", aData[5]) 
                        .replace("????", "\"" + aData[0] + "\"");
                
                cActions += '</div>';
                $('td:eq(5)', nRow).html(cActions);
                return nRow;
            }
        });
    });
    
</script>
<!-- FIN AREA JAVASCRIPT -->

