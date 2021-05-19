<?php echo form_open("paises/insertar", "id=\"forma-paises\" class=\"form-horizontal\""); ?>

<div id="my-modal-paises" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="my-modal-paisesLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="my-modal-paisesLabel"><?php echo lang("empresas_modal_titulo_pais");  ?></h3>
    </div>
    
    <div class="modal-body">
        <div class="row-fluid" >
            <div class="span12">
               
                <div class="control-group">
                    <label class="control-label" for="cCodigo"><span class="requerido">*</span> <?php echo lang("paises_codigo"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("cCodigo", "", "id=\"cCodigoPais\"class=\"input-small\" maxlength=\"3\" "); ?> 
                        <span class="help-block"><?php echo lang("paises_codigo_help"); ?></span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="cNombrePais"><span class="requerido">*</span> <?php echo lang("paises_nombre"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("cNombre", "", "id=\"cNombrePais\"class=\"input-large\" maxlength=\"45\" "); ?> 
                        <span class="help-block"><?php echo lang("paises_nombre_help"); ?></span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="iso3"> <?php echo lang("paises_iso3"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("iso3", "", "id=\"iso3Pais\" class=\"input-small convertir-mayusculas\" maxlength=\"3\" "); ?> 
                        <span class="help-block"><?php echo lang("paises_iso3_help"); ?></span>
                    </div>
                </div>
                
                <div class="control-group">
                    <label class="control-label" for="iso2"> <?php echo lang("paises_iso2"); ?> :</label>
                    <div class="controls">
                        <?php echo form_input("iso2", "", "id=\"iso2Pais\"class=\"input-small convertir-mayusculas\" maxlength=\"2\" "); ?> 
                        <span class="help-block"><?php echo lang("paises_iso2_help"); ?></span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="idButtonCatalogoPaisCancel"><?php echo lang("general_accion_cancelar");  ?></button>
        <button type="button" class="btn btn-primary" id="idButtonCatalogoPaisAceptar"><?php echo lang("general_accion_aceptar");  ?></button>
    </div>
    
</div>
<?php echo form_close(); ?>