<?php echo form_open("ciudades/insertar", "id=\"forma-ciudades\" class=\"form-horizontal\""); ?>
<input id="idHiddenEstado" type="hidden" name="idEstado" value="" />
<div id="my-modal-ciudades" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-ciudadesLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="my-modal-ciudadesLabel"><?php echo lang("empresas_modal_titulo_ciudad");  ?></h3>
    </div>
    
    <div class="modal-body">
        <div class="row-fluid" >
            <div class="span12">
               
                <div class="control-group">
                    <label class="control-label" for="cNombreCiudad"><span class="requerido">*</span> <?php echo lang("ciudades_nombre"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("cNombre", "", "id=\"cNombreColonia\"class=\"input-xlarge\" maxlength=\"45\" "); ?> 
                        <span class="help-block"><?php echo lang("ciudades_nombre_help"); ?></span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="cAbreviacionCiudad"> <?php echo lang("ciudades_abreviacion"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("cAbreviacion", "", "id=\"cAbreviacionCiudad\"class=\"input-xlarge\" maxlength=\"45\""); ?> 
                        <span class="help-block"><?php echo lang("ciudades_abreviacion_help"); ?></span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="idButtonCatalogoCiudadCancel"><?php echo lang("general_accion_cancelar");  ?></button>
        <button type="button" class="btn btn-primary" id="idButtonCatalogoCiudadAceptar"><?php echo lang("general_accion_aceptar");  ?></button>
    </div>
    
</div>
<?php echo form_close(); ?>