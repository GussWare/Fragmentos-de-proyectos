<!-- 

Vista o capa de presentacion de la forma de captura del catálogo de empresa en donde se mostraran  
los campos para su captura ya sea para su edición o bien para agregar nuevos registros, los campos obligatorios estan marcados con un (*), 
el usuario podra agregar o editar segun su nivel de acceso en el sistema

@author Gustavo Avila Medina <gussjq@gmail.com> cel <8187789518>
@created 09-03-2014

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
                            <button onclick="empresas.btnGuardar();" class="btn btn-small btn-success">
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
                <?php echo form_open("empresas/insertar", "id=\"forma-empresas\" class=\"form-horizontal\""); ?>
                <input type="hidden" id="id" name="idEmpresa" value="<?php echo $oEmpresa->idEmpresa; ?>" />

                <div class="row-fluid" >
                    <ul class="nav nav-tabs">
                        <li class="active">
                           <a href="#empresa" role="tab" data-toggle="tab"><?php echo lang("empresas_pestana_empresa"); ?></a>
                       </li>
                        
                       <li>
                           <a href="#domicilio" role="tab" data-toggle="tab"><?php echo lang("empresas_pestana_domicilio"); ?></a>
                       </li>
                    </ul>
                    
                    <div class="tab-content">
                        <!-- INICIA PRIMERA PESTAÑA DATOS GENERALES DE LA EMPRESA -->
                        <div class="tab-pane active" id="empresa">
                            <fieldset>
                                <legend><?php echo lang("empresas_legend_empresa"); ?></legend>
                                <div class="row-fluid" >
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="cCodigo"><span class="requerido">*</span> <?php echo lang("empresas_codigo"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cCodigo", $oEmpresa->cCodigo, "id=\"cCodigo\"class=\"input-small convertir-mayusculas \" maxlength=\"45\" "); ?> 
                                                <label id="cCodigo-error" class="error" for="cCodigo" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_codigo_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cNombre"><span class="requerido">*</span> <?php echo lang("empresas_nombre"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cNombre", $oEmpresa->cNombre, "id=\"cNombre\"class=\"input-xlarge\" maxlength=\"255\" "); ?> 
                                                <label id="cNombre-error" class="error" for="cNombre" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_nombre_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cRazonSocial"><span class="requerido">*</span> <?php echo lang("empresas_razon_social"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cRazonSocial", $oEmpresa->cRazonSocial, "id=\"cRazonSocial\"class=\"input-xxlarge convertir-mayusculas\" maxlength=\"255\" "); ?> 
                                                <label id="cRazonSocial-error" class="error" for="cRazonSocial" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_razon_social_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cGiro"> <?php echo lang("empresas_giro"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cGiro", $oEmpresa->cGiro, "id=\"cGiro\"class=\"input-xlarge\" maxlength=\"45\" "); ?> 
                                                <label id="cGiro-error" class="error" for="cGiro" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_giro_help"); ?></span>
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
                                            <label class="control-label" for="cCurp"> <?php echo lang("empresas_curp"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cCurp", $oEmpresa->cCurp, "id=\"cCurp\"class=\"input-xlarge convertir-mayusculas\" maxlength=\"24\" "); ?> 
                                                <label id="cCurp-error" class="error" for="cCurp" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_curp_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cInfonavit"> <?php echo lang("empresas_infonavit"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cInfonavit", $oEmpresa->cInfonavit, "id=\"cInfonavit\"class=\"input-xlarge\" maxlength=\"45\" "); ?> 
                                                <label id="cInfonavit-error" class="error" for="cInfonavit" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_infonavit_help"); ?></span>
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
                        </div>
                        <!-- FIN PRIMERA PESTAÑA DATOS GENERALES DE LA EMPRESA -->
                        
                        <!-- INICIA SEGUNDA PESTAÑA UBICACION DE LA EMPRESA -->
                        <div class="tab-pane" id="domicilio">
                            <fieldset>
                                <legend><?php echo lang("empresas_legend_domicilio"); ?></legend>
                                <div class="row-fluid" >
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="cCalle"><span class="requerido">*</span> <?php echo lang("empresas_calle"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cCalle", $oEmpresa->cCalle, "id=\"cCalle\"class=\"input-xlarge\" maxlength=\"255\" "); ?> 
                                                <label id="cCalle-error" class="error" for="cCalle" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_calle_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cNumeroExterior"><span class="requerido">*</span> <?php echo lang("empresas_numero_exterior"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cNumeroExterior", $oEmpresa->cNumeroExterior, "id=\"cNumeroExterior\"class=\"input-small\" maxlength=\"45\" "); ?> 
                                                <label id="cNumeroExterior-error" class="error" for="cNumeroExterior" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_numero_exterior_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cNumeroInterior"> <?php echo lang("empresas_numero_interior"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cNumeroInterior", $oEmpresa->cNumeroInterior, "id=\"cNumeroInterior\"class=\"input-small\" maxlength=\"45\" "); ?> 
                                                <label id="cNumeroInterior-error" class="error" for="cNumeroInterior" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_calle_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="idPais"><span class="requerido">*</span> <?php echo lang("empresas_pais"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_dropdown("idPais", $aCombosForma["paises"], $oEmpresa->idPais, "id=\"idPais\"class=\"input-xlarge\"  "); ?> 
                                                <button type="button" id="btnAgregarPaises" class="btn btn-primary show-tooltip" title="<?php  echo lang("empresas_ayuda_agregar_pais"); ?>" data-toggle="modal" data-placement="right"><span class="icon-new"></span></button>
                                                <label id="idPais-error" class="error" for="idPais" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_pais_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="idEstado"><span class="requerido">*</span> <?php echo lang("empresas_estado"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_dropdown("idEstado", $aCombosForma["estados"], $oEmpresa->idEstado, "id=\"idEstado\"class=\"input-xlarge\"  "); ?> 
                                                <button type="button" id="btnAgregarEstados" class="btn btn-primary show-tooltip" title="<?php  echo lang("empresas_ayuda_agregar_estado"); ?>" data-toggle="modal" data-placement="right"><span class="icon-new"></span></button>
                                                <label id="idEstado-error" class="error" for="idEstado" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_estado_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="idCiudad"><span class="requerido">*</span> <?php echo lang("empresas_ciudad"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_dropdown("idCiudad", $aCombosForma["ciudades"],$oEmpresa->idCiudad, "id=\"idCiudad\"class=\"input-xlarge\"  "); ?> 
                                                <button type="button" id="btnAgregarCiudades" class="btn btn-primary show-tooltip" title="<?php  echo lang("empresas_ayuda_agregar_ciudad"); ?>" data-toggle="modal" data-placement="right"><span class="icon-new"></span></button>
                                                <label id="idCiudad-error" class="error" for="idCiudad" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_ciudad_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="idColonia"><span class="requerido">*</span> <?php echo lang("empresas_colonia"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_dropdown("idColonia", $aCombosForma["colonias"], $oEmpresa->idColonia, "id=\"idColonia\" class=\"input-xlarge\"  "); ?> 
                                                <button type="button" id="btnAgregarColonias" class="btn btn-primary show-tooltip" title="<?php  echo lang("empresas_ayuda_agregar_colonia"); ?>" data-toggle="modal" data-placement="right"><span class="icon-new"></span></button>
                                                <span class="help-block"><?php echo lang("empresas_colonia_help"); ?></span>
                                                <label id="idColonia-error" class="error" for="idColonia" style="display: none; text-align: left; "></label>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cCodigoPostal"> <?php echo lang("empresas_codigo_postal"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cCodigoPostal", $oEmpresa->cCodigoPostal, "id=\"cCodigoPostal\"class=\"input-xlarge\" maxlength=\"5\" "); ?> 
                                                <label id="cCodigoPostal-error" class="error" for="cCodigoPostal" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_codigo_postal_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cTelefono"> <?php echo lang("empresas_telefono"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cTelefono", $oEmpresa->cTelefono, "id=\"cTelefono\"class=\"input-xlarge\" maxlength=\"45\" "); ?> 
                                                <label id="cTelefono-error" class="error" for="cTelefono" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_telefono_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cFax"> <?php echo lang("empresas_fax"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_input("cFax", $oEmpresa->cFax, "id=\"cFax\"class=\"input-xlarge\" maxlength=\"45\" "); ?> 
                                                <label id="cFax-error" class="error" for="cFax" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_fax_help"); ?></span>
                                            </div>
                                        </div>
                                        
                                        <div class="control-group">
                                            <label class="control-label" for="cNotas"> <?php echo lang("empresas_notas"); ?> :</label>
                                            <div class="controls">
                                                <?php echo form_textarea("cNotas", $oEmpresa->cNotas, "id=\"cNotas\"class=\"input-xlarge\" maxlength=\"255\" cols=8 rows=5"); ?> 
                                                <label id="cNotas-error" class="error" for="cNotas" style="display: none; text-align: left; "></label>
                                                <span class="help-block"><?php echo lang("empresas_calle_help"); ?></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <!-- FIN SEGUNDA PESTAÑA UBICACION DE LA EMPRESA -->
                        
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
<?php script_tag("plugins/ajaxForm/jquery.ajaxForm"); ?>
<?php script_tag("modulos/empresas"); ?>

<script type="text/javascript">
    empresas.TEXT_ERROR_SELECCIONAR_COLONIA = "<?php echo lang("empresas_error_seleccionar_colonia"); ?>";
    empresas.TEXT_ERROR_SELECCIONAR_ESTADO = "<?php echo lang("empresas_error_seleccionar_estado"); ?>";
    empresas.TEXT_ERROR_SELECCIONAR_CIUDAD = "<?php echo lang("empresas_error_seleccionar_ciudad"); ?>";
    
    $(document).ready(function () {
        empresas.initForma({
            'paramsForma': {
                rules: {
                    cCodigo: {
                        required: true,
                        alphanumeric:true,
                        maxlength:10
                    },
                    
                    cNombre: {
                        required: true,
                        maxlength:255
                    },
                    
                    cRazonSocial: {
                        maxlength:255,
                        required: true,
                    },
                    
                    cGiro: {
                        required:false,
                        maxlength:45
                    },
                    
                    cRFC: {
                        maxlength:14,
                        required: true,
                        rfc_moral:true
                    },
                    
                    cCurp: {
                        required:false,
                        maxlength:24,
                        curp:true
                    },
                    
                    cInfonavit: {
                        required:false,
                        maxlength:45
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
                    
                    cTelefono: {
                        required:false,
                        maxlength:15,
                        minlength:5,
                        is_natural_no_zero:true
                    },
                    
                    cFax: {
                        required:false,
                        maxlength:15,
                        minlength:5,
                        is_natural_no_zero:true
                    },
                    
                    cNotas: {
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