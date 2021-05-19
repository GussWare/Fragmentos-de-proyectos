<!-- 

Vista o capa de presentacion de la forma de configuracion del timbrado por empresa, en donde se mostraran  
los campos necesarios para asociar los archivos .CER y .KEY del sello digital y gurdar los datos del contribuyente
los campos obligatorios estan marcados con un (*)

@author Gustavo Avila Medina <gussjq@gmail.com> cel <8187789518>
@created 13-03-2014

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
                            <button onclick="empresas.btnGuardarTimbrado();" class="btn btn-small btn-success">
                                <span class="icon-new icon-white"></span>
                                <?php echo lang('general_accion_guardar'); ?>
                            </button>
                        </div>

                        <div class="btn-wrapper" id="toolbar-cancel">
                            <button onclick="empresas.btnCancelar();" class="btn btn-small">
                                <span class="icon-cancel"></span>
                                <?php echo lang('general_accion_cancelar'); ?>
                            </button>
                        </div>

                        <!-- FIN PARTE IZQUIERDA  -->

                        <!-- INICIA PARTE DERECHA  -->
                        <div class="btn-wrapper" id="toolbar-help">

                        </div>
                        <!-- FIN PARTE DERECHA  -->
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
<!-- FIN BARRA DE ACCIONES  -->


<!-- INICIA CONTENIDO DEL CATALOGO DEBE INCLUIRSE EN TODOS LOS CATALOGOS -->
<div class="container-fluid container-main">
    <section id="content">
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
                <!-- INICIO AREA DEL FORMULARIO  -->
                <?php echo form_open("empresas/actualizarTimbrado", "id=\"forma-configuracion-timbrado\" class=\"form-horizontal\""); ?>
                <input type="hidden" id="idConfiguracionTimbrado" name="idConfiguracionTimbrado" value="<?php echo $oConfTimbrado->idConfiguracionTimbrado; ?>" />
                <input type="hidden" id="idEmpresa" name="idEmpresa" value="<?php echo $oEmpresa->idEmpresa; ?>" />

                <div class="row-fluid" >
                    <ul class="nav nav-tabs">
                        <li class="active">
                           <a href="#empresa" role="tab" data-toggle="tab"><?php echo lang("empresas_pestana_contribuyente"); ?></a>
                       </li>
                        
                       <li>
                           <a href="#timbrado" role="tab" data-toggle="tab"><?php echo lang("empresas_pestana_sello_digital"); ?></a>
                       </li>
                    </ul>
                    
                    <div class="tab-content">
                        <!-- INICIA PRIMERA PESTAÑA DATOS GENERALES DE LA EMPRESADEL CONTRIBUYENTE -->
                        <div class="tab-pane active" id="empresa">
                            <fieldset>
                                <legend><?php echo lang("empresas_legend_contribuyente"); ?></legend>
                                <div class="row-fluid" >
                                    <div class="span12">
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cRazonSocial"><span class="requerido">*</span> <?php echo lang("empresas_razon_social"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cRazonSocial", $oEmpresa->cRazonSocial, "id=\"cRazonSocial\"class=\"input-xxlarge convertir-mayusculas\" maxlength=\"255\" "); ?> 
                                                <label id="cRazonSocial-error" class="error" for="cRazonSocial" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_razon_social_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cRFC"><span class="requerido">*</span> <?php echo lang("empresas_rfc"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cRFC", $oEmpresa->cRFC, "id=\"cRFC\"class=\"input-xlarge convertir-mayusculas \" maxlength=\"14\" "); ?> 
                                                <label id="cRFC-error" class="error" for="cRFC" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_rfc_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cRepresentanteLegal"> <?php echo lang("empresas_representante_legal"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cRepresentanteLegal", $oEmpresa->cRepresentanteLegal, "id=\"cRepresentanteLegal\" class=\"input-xxlarge\" maxlength=\"255\" "); ?> 
                                                <label id="cRepresentanteLegal-error" class="error" for="cRepresentanteLegal" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_representante_legal_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset>
                                <legend><?php echo lang("empresas_legend_domicilio_fiscal"); ?></legend>
                                <div class="row-fluid" >
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="cCalle"><span class="requerido">*</span> <?php echo lang("empresas_calle"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cCalle", ($oConfTimbrado->cCalle) ? $oConfTimbrado->cCalle : $oEmpresa->cCalle, "id=\"cCalle\"class=\"input-xlarge\" maxlength=\"255\" "); ?> 
                                                <label id="cCalle-error" class="error" for="cCalle" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_calle_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cNumeroExterior"><span class="requerido">*</span> <?php echo lang("empresas_numero_exterior"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cNumeroExterior", ($oConfTimbrado->cNumeroExterior) ? $oConfTimbrado->cNumeroExterior : $oEmpresa->cNumeroExterior, "id=\"cNumeroExterior\"class=\"input-small\" maxlength=\"45\" "); ?> 
                                                <label id="cNumeroExterior-error" class="error" for="cNumeroExterior" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_numero_exterior_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cNumeroInterior"> <?php echo lang("empresas_numero_interior"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cNumeroInterior", ($oConfTimbrado->cNumeroInterior) ? $oConfTimbrado->cNumeroInterior : $oEmpresa->cNumeroInterior, "id=\"cNumeroInterior\"class=\"input-small\" maxlength=\"45\" "); ?> 
                                                <label id="cNumeroInterior-error" class="error" for="cNumeroInterior" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_calle_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="idPais"><span class="requerido">*</span> <?php echo lang("empresas_pais"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_dropdown("idPais", $aCombosForma["paises"], ($oConfTimbrado->idPais) ? $oConfTimbrado->idPais : $oEmpresa->idPais, "id=\"idPais\"class=\"input-xlarge\"  "); ?> 
                                                <button type="button" id="btnAgregarPaises" class="btn btn-primary show-tooltip" title="<?php  echo lang("empresas_ayuda_agregar_pais"); ?>" data-toggle="modal" data-placement="right"><span class="icon-new"></span></button>
                                                <label id="idPais-error" class="error" for="idPais" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_pais_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="idEstado"><span class="requerido">*</span> <?php echo lang("empresas_estado"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_dropdown("idEstado", $aCombosForma["estados"], ($oConfTimbrado->idEstado) ? $oConfTimbrado->idEstado : $oEmpresa->idEstado, "id=\"idEstado\"class=\"input-xlarge\"  "); ?> 
                                                <button type="button" id="btnAgregarEstados" class="btn btn-primary show-tooltip" title="<?php  echo lang("empresas_ayuda_agregar_estado"); ?>" data-toggle="modal" data-placement="right"><span class="icon-new"></span></button>
                                                <label id="idEstado-error" class="error" for="idEstado" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_estado_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="idCiudad"><span class="requerido">*</span> <?php echo lang("empresas_ciudad"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_dropdown("idCiudad", $aCombosForma["ciudades"],($oConfTimbrado->idCiudad) ? $oConfTimbrado->idCiudad : $oEmpresa->idCiudad, "id=\"idCiudad\"class=\"input-xlarge\"  "); ?> 
                                                <button type="button" id="btnAgregarCiudades" class="btn btn-primary show-tooltip" title="<?php  echo lang("empresas_ayuda_agregar_ciudad"); ?>" data-toggle="modal" data-placement="right"><span class="icon-new"></span></button>
                                                <label id="idCiudad-error" class="error" for="idCiudad" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_ciudad_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="idColonia"><span class="requerido">*</span> <?php echo lang("empresas_colonia"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_dropdown("idColonia", $aCombosForma["colonias"], ($oConfTimbrado->idColonia) ? $oConfTimbrado->idColonia : $oEmpresa->idColonia, "id=\"idColonia\" class=\"input-xlarge\"  "); ?> 
                                                <button type="button" id="btnAgregarColonias" class="btn btn-primary show-tooltip" title="<?php  echo lang("empresas_ayuda_agregar_colonia"); ?>" data-toggle="modal" data-placement="right"><span class="icon-new"></span></button>
                                                <span class="help-block"><?php echo lang("empresas_colonia_help"); ?></span>
                                                <label id="idColonia-error" class="error" for="idColonia" style="display: none; text-align: left; "></label>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cCodigoPostal"> <?php echo lang("empresas_codigo_postal"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cCodigoPostal", ($oConfTimbrado->cCodigoPostal) ? $oConfTimbrado->cCodigoPostal : $oEmpresa->cCodigoPostal, "id=\"empresas_codigo_postal\"class=\"input-xlarge\" maxlength=\"5\" "); ?> 
                                                <label id="cCodigoPostal-error" class="error" for="cCodigoPostal" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_codigo_postal_help"); ?></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <!-- FIN PRIMERA PESTAÑA DATOS GENERALES DE LA EMPRESA -->
                        
                        <!-- INICIA SEGUNDA PESTAÑA TIMBRADO-->
                        <div class="tab-pane" id="timbrado">
                            <fieldset>
                                <legend><?php echo lang("empresas_legend_cellod_digital"); ?></legend>
                                <div class="row-fluid" >
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="cArchivoCer" style="width: 150px;"> <?php echo lang("empresas_timbrado_archivo_cer"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_upload("cArchivoCerUpload", "", "id=\"cArchivoCerUpload\" class=\"input-large\" maxlength=\"45\""); ?>
                                                <input type="hidden" id="cArchivoCer" name="cArchivoCer" value="" />
                                                <span id="contenedor-archivo-cer" class="label label-success"></span>
                                                <label id="cArchivoCer-error" class="error" for="cArchivoCer" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_timbrado_archivo_cer_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cArchivoKey" style="width: 150px;"> <?php echo lang("empresas_timbrado_archivo_key"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_upload("cArchivoKeyUpload", "", "id=\"cArchivoKeyUpload\" class=\"input-large\" maxlength=\"45\""); ?>
                                                <input type="hidden" id="cArchivoKey" name="cArchivoKey" value="" />
                                                <span id="contenedor-archivo-key" class="label label-success"></span>
                                                <label id="cArchivoKey-error" class="error" for="cArchivoKey" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_timbrado_archivo_key_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cContrasena" style="width: 150px;"> <?php echo lang("empresas_timbrado_contrasena"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_password("cContrasena", "", "id=\"cContrasena\" class=\"input-large\" maxlength=\"45\""); ?>
                                                <label id="cContrasena-error" class="error" for="cContrasena" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_timbrado_contrasena_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cNombreFirmante" style="width: 150px;"><?php echo lang("empresas_timbrado_nombre_firmante"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cNombreFirmante", "", "id=\"cNombreFirmante\" class=\"input-xxlarge\" maxlength=\"255\""); ?>
                                                <label id="cNombreFirmante-error" class="error" for="cNombreFirmante" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_timbrado_nombre_firmante_help"); ?></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <!-- FIN SEGUNDA PESTAÑA TIMBRADO -->
                        
                    </div>
                </div>
                <?php echo form_close(); ?>
                <!-- FIN AREA DEL FORMULARIO  -->
            </div>
        </div>  
    </section>
</div>
<!-- FIN CONTENIDO DEL CATALOGO  -->

<!-- Modales -->
<?php $this->load->view("empresas/forma_paises_view");  ?>
<?php $this->load->view("empresas/forma_estados_view");  ?>
<?php $this->load->view("empresas/forma_ciudades_view");  ?>
<?php $this->load->view("empresas/forma_colonias_view");  ?>


<!-- INICIO AREA JAVASCRIPT  -->
<?php $this->load->view(LAYOUT_DEFAULT . "javascript_base_view"); ?>

<?php incluye_componente_validate(); ?>
<?php incluye_componente_uploadify(); ?>
<?php script_tag("plugins/ajaxForm/jquery.ajaxForm"); ?>
<?php script_tag("modulos/empresas"); ?>

<script type="text/javascript">
    
    empresas.TEXT_ERROR_SELECCIONAR_COLONIA = "<?php echo lang("empresas_error_seleccionar_colonia"); ?>";
    empresas.TEXT_ERROR_SELECCIONAR_ESTADO = "<?php echo lang("empresas_error_seleccionar_estado"); ?>";
    empresas.TEXT_ERROR_SELECCIONAR_CIUDAD = "<?php echo lang("empresas_error_seleccionar_ciudad"); ?>";
    
    $(document).ready(function () {
        
        var bRequeridoNuevo = ($("#idConfiguracionTimbrado").val() === "");
        empresas.initFormaTimbrado({
            'paramsForma': {
                rules: {
                     cRazonSocial: {
                        maxlength:255,
                        required: true,
                    },
                    
                    cRFC: {
                        maxlength:14,
                        required: true,
                        rfc_moral:true
                    },
                    
                    cRepresentanteLegal: {
                        required:false,
                        maxlength:255
                    },
                    
                    cCalle: {
                        required:true,
                        maxlength:255
                    },
                    
                    cNumeroInterior: {
                        required:false,
                        maxlength:15
                    },
                    
                    cNumeroExterior: {
                        required: true,
                        maxlength:15
                    },
                    
                    idPais:{
                        required:true
                    },
                    
                    idEstado:{
                        required:true
                    },
                    
                    idCiudad:{
                        required:true
                    },
                    
                    idColonia:{
                        required:true
                    },
                    
                    cCodigoPostal: {
                        required:false,
                        maxlength:5,
                        minlength:5,
                        is_natural_no_zero:true
                    },
                    
                    cArchivoCer: {
                        required:bRequeridoNuevo,
                        maxlength:45
                    },
                    
                    cArchivoKey: {
                        required:bRequeridoNuevo,
                        maxlength:45
                    },
                    
                    cContrasena: {
                        required:bRequeridoNuevo,
                        maxlength:45
                    },
                    
                     cNombreFirmante: {
                        required:false,
                        maxlength:255
                    }
                },
                errorPlacement: function (error, element) {
                    var name = $(element).attr("name");
                    error.appendTo($("#" + name + "_validate"));
               },
                
            },
            'paramsFormaPais':{
                rules: {
                    'cNombre':{
                        required: true,
                        maxlength:45
                    },
                    'cCodigo':{
                        is_natural_no_zero:true,
                        required:true,
                        maxlength:3,
                        minlength:3,
                    },
                    'iso3':{
                        maxlength:3,
                        minlength:3,
                        lettersonly:true
                    },
                    'iso2':{
                        maxlength:2,
                        minlength:2,
                        lettersonly:true,
                    }
                }
            },
            'paramsFormaEstado':{
                rules: {
                    'cNombre':{
                        required: true,
                        maxlength:45
                    },
                    'cCodigo':{
                        required:true,
                        maxlength:2,
                        is_natural_no_zero:true,
                    },
                    'iso3':{
                        maxlength:3,
                        minlength:3,
                        lettersonly:true
                    },
                    'iso2':{
                       maxlength:2,
                       minlength:2,
                       lettersonly:true,
                    },
                    'cAbreviacion':{
                       maxlength:45,
                    },
                    'cRenapo':{
                       maxlength:2,
                       minlength:2,
                       lettersonly:true,
                    }
                }
            },
            'paramsFormaCiudad':{
                rules: {
                    'cNombre':{
                        required: true,
                        maxlength:45
                    },
                    'cAbreviacion':{
                        maxlength:45
                    }
                }
            },
            'paramsFormaColonia':{
                rules: {
                    'cNombre':{
                        required: true,
                        maxlength:45
                    },
                    'cDescripcion':{
                        maxlength:255
                    }
                }
            }
        });
    });
</script>
<!-- FIN AREA JAVASCRIPT  -->