<?php echo form_open("colonias/insertar", "id=\"forma-colonias\" class=\"form-horizontal\""); ?>
<input id="idHiddenCiudad" type="hidden" name="idCiudad" value="" />
<div id="my-modal-colonias" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-coloniasLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="my-modal-coloniasLabel"><?php echo lang("empresas_modal_titulo_colonia");  ?></h3>
    </div>
    
    <div class="modal-body">
        <div class="row-fluid" >
            <div class="span12">
               
                <div class="control-group">
                    <label class="control-label" for="cNombreColonia"><span class="requerido">*</span> <?php echo lang("colonias_nombre"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("cNombre", "", "id=\"cNombreColonia\"class=\"input-xlarge\" maxlength=\"45\" "); ?> 
                        <span class="help-block"><?php echo lang("colonias_nombre_help"); ?></span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="cDescripcionColonia"> <?php echo lang("colonias_descripcion"); ?> :</label>
                    <div class="controls">
                        <?php echo form_textarea("cDescripcion", "", "id=\"cDescripcionColonia\"class=\"input-xlarge\" maxlength=\"255\"  rows=5"); ?> 
                        <span class="help-block"><?php echo lang("colonias_descripcion_help"); ?></span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="idButtonCatalogoCancel"><?php echo lang("general_accion_cancelar");  ?></button>
        <button type="button" class="btn btn-primary" id="idButtonCatalogoAceptar"><?php echo lang("general_accion_aceptar");  ?></button>
    </div>
    
</div>
<?php echo form_close(); ?>