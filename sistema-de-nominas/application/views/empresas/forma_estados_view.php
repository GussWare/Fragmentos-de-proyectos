<?php echo form_open("estados/insertar", "id=\"forma-estados\" class=\"form-horizontal\""); ?>
<input id="idHiddenPais" type="hidden" name="idPais" value="" />
<div id="my-modal-estados" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-estadosLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="my-modal-estadosLabel"><?php echo lang("empresas_modal_titulo_estado");  ?></h3>
    </div>
    
    <div class="modal-body">
        <div class="row-fluid" >
            <div class="span12">
                <div class="control-group">
                    <label class="control-label" for="cCodigo"><span class="requerido">*</span> <?php echo lang("estados_codigo"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("cCodigo", "", "id=\"cCodigoEstado\"class=\"input-small\" maxlength=\"3\" "); ?> 
                        <span class="help-block"><?php echo lang("estados_codigo_help"); ?></span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="cNombreEstado"><span class="requerido">*</span> <?php echo lang("estados_nombre"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("cNombre", "", "id=\"cNombreEstado\"class=\"input-large\" maxlength=\"45\" "); ?> 
                        <span class="help-block"><?php echo lang("estados_nombre_help"); ?></span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="iso3"> <?php echo lang("estados_iso3"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("iso3", "", "id=\"iso3Estado\"class=\"input-small convertir-mayusculas\" maxlength=\"3\" "); ?> 
                        <span class="help-block"><?php echo lang("estados_iso3_help"); ?></span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="iso2"> <?php echo lang("estados_iso2"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("iso2", "", "id=\"iso2Estado\"class=\"input-small convertir-mayusculas\" maxlength=\"2\" "); ?> 
                        <span class="help-block"><?php echo lang("estados_iso2_help"); ?></span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="cRenapoEstado"> <?php echo lang("estados_renapo"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("cRenapo", "", "id=\"cRenapoEstado\"class=\"input-small convertir-mayusculas\" maxlength=\"2\" "); ?> 
                        <span class="help-block"><?php echo lang("estados_renapo_help"); ?></span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="cAbrebiacionEstado"> <?php echo lang("estados_abreviacion"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("cAbreviacion", "", "id=\"cAbreviacionEstado\"class=\"input-small\" maxlength=\"15\""); ?> 
                        <span class="help-block"><?php echo lang("estados_abreviacion_help"); ?></span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="idButtonCatalogoEstadoCancel"><?php echo lang("general_accion_cancelar");  ?></button>
        <button type="button" class="btn btn-primary" id="idButtonCatalogoEstadoAceptar"><?php echo lang("general_accion_aceptar");  ?></button>
    </div>
    
</div>
<?php echo form_close(); ?>