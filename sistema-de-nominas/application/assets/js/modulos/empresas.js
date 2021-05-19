/**
 * ClassEmpresas
 * 
 * Clase javascript encargada de la logica de la programación del lado del cliente,
 * contiene los eventos y las peticiones ajax para realizar los procesos del catálogo de empresa
 * 
 * @author Gustavo Avila Medina: <gussjq@gmail.com> cel: <8187789518>
 * @created: 12-03-2015
 */
var ClassEmpresas = (function () {
    
    this.idEmpresa = 0;
    this.cCodigo = "";
    this.cNombre = "";
    this.cRazonSocial = "";
    this.cRFC = "";
    this.cCurp = "";
    this.cRepresentanteLegal = "";
    this.cInfonavit = "";
    this.cGiro = "";
    
    this.TEXT_MENSAJE_ELIMINAR_TIMBRADO = "";
    this.TEXT_ERROR_SELECCIONAR_COLONIA = "";
    
    this.TEXT_ERROR_SELECCIONAR_PAIS = "";
    this.TEXT_ERROR_SELECCIONAR_ESTADO = "";
    this.TEXT_ERROR_SELECCIONAR_CIUDAD = "";
    
    var _self = this;
    
    // <editor-fold defaultstate="collapsed" desc="Metodos Publicos Catalogo Empresas">
    
    /**
     * Metodo que se encarga de inicializar los parametros de la forma
     * 
     * @access public
     * @param objeto json Parametros necesarios para inicializar la forma
     *        -paramsForma parametros de configuracion del plugin validationEngine para la forma de empresa
     * @returns void no torna datos
     */
    this.initForma = function initForma(oParams) {
        
        $("#forma-empresas").validate(oParams.paramsForma);
        $("#forma-paises").validate(oParams.paramsFormaPais);
        $("#forma-estados").validate(oParams.paramsFormaEstado);
        $("#forma-ciudades").validate(oParams.paramsFormaCiudad);
        $("#forma-colonias").validate(oParams.paramsFormaColonia);
        
        CoreUI.MultiSelectAjax({
            url: Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getEstados",
            idElementoBase: "#idPais",
            idElementoActualizar: "#idEstado",
            valorDefault: "",
            agregarDefault: true,
        });
        
        CoreUI.MultiSelectAjax({
            url: Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getCiudades",
            idElementoBase: "#idEstado",
            idElementoActualizar: "#idCiudad",
            valorDefault: "",
            agregarDefault: true,
        });
        
        CoreUI.MultiSelectAjax({
            url: Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getColonias",
            idElementoBase: "#idCiudad",
            idElementoActualizar: "#idColonia",
            valorDefault: "",
            agregarDefault: true,
        });
        
        CoreUI.CatalogoSelectAjax({
            idSelectCatalogo: "idPais",
            idModal: "my-modal-paises",
            bPadre: false,
            idButtonMostrar: "btnAgregarPaises",
            idFormaCatalogo:"forma-paises",
            idButtonCatalogoCancel:"idButtonCatalogoPaisCancel",
            idButtonCatalogoAceptar:"idButtonCatalogoPaisAceptar",
            cController: "paises",
            mensajeErrorSeleccionarPadre: _self.TEXT_ERROR_SELECCIONAR_PAIS,
            urlGet:Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getPaises",
            urlInsert:Generic.BASE_URL + "paises/insertar",
            agregarDefault: true,
            valorDefault: "",
        });
        
        CoreUI.CatalogoSelectAjax({
            idSelectPadre: "idPais",
            idSelectCatalogo: "idEstado",
            idModal: "my-modal-estados",
            idHiddenSelectPadre: "idHiddenPais",
            idButtonMostrar: "btnAgregarEstados",
            idFormaCatalogo:"forma-estados",
            idButtonCatalogoCancel:"idButtonCatalogoEstadoCancel",
            idButtonCatalogoAceptar:"idButtonCatalogoEstadoAceptar",
            cController: "estados",
            mensajeErrorSeleccionarPadre: _self.TEXT_ERROR_SELECCIONAR_ESTADO,
            urlGet:Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getEstados",
            urlInsert:Generic.BASE_URL + "estados/insertar",
            agregarDefault: true,
            valorDefault: "",
        });
        
        CoreUI.CatalogoSelectAjax({
            idSelectPadre: "idEstado",
            idSelectCatalogo: "idCiudad",
            idModal: "my-modal-ciudades",
            idHiddenSelectPadre: "idHiddenEstado",
            idButtonMostrar: "btnAgregarCiudades",
            idFormaCatalogo:"forma-ciudades",
            idButtonCatalogoCancel:"idButtonCatalogoCiudadCancel",
            idButtonCatalogoAceptar:"idButtonCatalogoCiudadAceptar",
            cController: "estados",
            mensajeErrorSeleccionarPadre: _self.TEXT_ERROR_SELECCIONAR_CIUDAD,
            urlGet:Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getCiudades",
            urlInsert:Generic.BASE_URL + "ciudades/insertar",
            agregarDefault: true,
            valorDefault: "",
        });
        
        CoreUI.CatalogoSelectAjax({
            idSelectPadre: "idCiudad",
            idSelectCatalogo: "idColonia",
            idModal: "my-modal-colonias",
            idHiddenSelectPadre: "idHiddenCiudad",
            idButtonMostrar: "btnAgregarColonias",
            idFormaCatalogo:"forma-colonias",
            idButtonCatalogoCancel:"idButtonCatalogoCancel",
            idButtonCatalogoAceptar:"idButtonCatalogoAceptar",
            cController: "colonias",
            mensajeErrorSeleccionarPadre: _self.TEXT_ERROR_SELECCIONAR_COLONIA,
            urlGet:Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getColonias",
            urlInsert:Generic.BASE_URL + "colonias/insertar",
            agregarDefault: true,
            valorDefault: "",
        });
        
        _eventChangePais();
        _eventChangeEstado();
        _eventChangeCiudad();
    };
    
    /**
     * Metodo que se encarga de setear los criterios de la busqueda avanzazda para realizar el filtrado
     * en el listado
     * 
     * @param {boolean} bNoEnviar
     * @returns {bollean} 
     */
    this.btnBuscar = function btnBuscar(bNoEnviar) {
        
        this.cCodigo = $("#cCodigo").val();
        this.cNombre = $("#cNombre").val();
        this.cRazonSocial = $("#cRazonSocial").val();
        this.cRFC = $("#cRFC").val();
        this.cCurp = $("#cCurp").val();
        this.cRepresentanteLegal = $("#cRepresentanteLegal").val();
        this.cInfonavit = $("#cInfonavit").val();
        this.cGiro = $("#cGiro").val();
        
        if ((typeof bNoEnviar == "undefined") || (bNoEnviar === false)) {
            oTable.fnDraw(false);
        }
        
        return false;
    };
    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Metodos Publicos Configuracion Timbrado">
    
    /**
     * Metodo que se encarga de inializar la configuracion de la forma de captura del timbrado,
     * inicializa los plugins de uploadify para subir los archivos .CER y .KEY del certificado y sello digital (CSD) y
     * configura los combos multiples de paises, estados, ciudades y colonias
     * 
     * @returns void No retorna valor
     */
    this.initFormaTimbrado = function initFormaTimbrado(oParams){
        
        $("#forma-configuracion-timbrado").validate(oParams.paramsForma);
        $("#forma-paises").validate(oParams.paramsFormaPais);
        $("#forma-estados").validate(oParams.paramsFormaEstado);
        $("#forma-ciudades").validate(oParams.paramsFormaCiudad);
        $("#forma-colonias").validate(oParams.paramsFormaColonia);
        
        // configuracion de plugin uploadify para subir los archivos .cer y .key
        $("#cArchivoCerUpload").uploadify({
            'uploader': Generic.BASE_URL + Generic.DIRECTORIO_JAVASCRIPT + 'plugins/uploadify/uploadify.swf',
            'script': Generic.BASE_URL +  Generic.CONTROLLER + "/cargarArchivo",
            'cancelImg': Generic.BASE_URL + Generic.DIRECTORIO_JAVASCRIPT + 'plugins/uploadify/cancel.png',
            'folder': Generic.BASE_URL,
            'buttonText': Generic.TEXT_SELECCIONAR,
            'auto': true,
            'multi': false,
            'fileDataName': 'cArchivoCerUpload',
            'scriptData':{"cExtension":'cer', "cInput":'cArchivoCerUpload'},
            'fileTypeExts' : '*.cer',
            'onError': function(event, queueID, fileObj, errorObj) {
                $("#contenedor-archivo-cer").hide();
                $("#cArchivoCer").val("");
                CoreUI.mensajeMsgBox(Generic.TXT_ERROR_SUBIR_ARCHIVO, _self.TIPO_MENSAJE_ERROR);
            },
            'onComplete': function(event, queueID, fileObj, response, data) {
                var oResponse = $.parseJSON(response);
                if (oResponse.success == true) {
                    var oFileData = oResponse.data.aFileData;
                    $("#contenedor-archivo-cer").text(oFileData.file_name).show();
                    $("#cArchivoCer").val(oFileData.file_name);
                } else {
                    $("#contenedor-archivo-cer").hide();
                    $("#cArchivoCer").val("");
                    _self.mostrarMensajesJSON(oResponse.data.messages);
                }
            }
        });
        
        $("#cArchivoKeyUpload").uploadify({
            'uploader': Generic.BASE_URL + Generic.DIRECTORIO_JAVASCRIPT + 'plugins/uploadify/uploadify.swf',
            'script': Generic.BASE_URL +  Generic.CONTROLLER + "/cargarArchivo",
            'cancelImg': Generic.BASE_URL + Generic.DIRECTORIO_JAVASCRIPT + 'plugins/uploadify/cancel.png',
            'folder': Generic.BASE_URL,
            'buttonText': Generic.TEXT_SELECCIONAR,
            'auto': true,
            'multi': false,
            'fileDataName': 'cArchivoKeyUpload',
            'scriptData':{"cExtension":'key', "cInput":'cArchivoKeyUpload'},
            'fileTypeExts': '*.key',
            'onError': function(event, queueID, fileObj, errorObj) {
                $("#contenedor-archivo-key").hide();
                $("#cArchivoKey").val("");
                CoreUI.mensajeMsgBox(Generic.TXT_ERROR_SUBIR_ARCHIVO, _self.TIPO_MENSAJE_ERROR);
            },
            'onComplete': function(event, queueID, fileObj, response, data) {
                var oResponse = $.parseJSON(response);
                if (oResponse.success == true) {
                   var oFileData = oResponse.data.aFileData;
                    $("#contenedor-archivo-key").text(oFileData.file_name).show();
                    $("#cArchivoKey").val(oFileData.file_name);
                } else {
                    $("#contenedor-archivo-key").hide();
                    $("#cArchivoKey").val("");
                   _self.mostrarMensajesJSON(oResponse.data.messages);
                }
            }
        });
        
        // configuracion de combos multi select
        CoreUI.MultiSelectAjax({
            url: Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getEstados",
            idElementoBase: "#idPais",
            idElementoActualizar: "#idEstado",
            valorDefault: "",
            agregarDefault: true,
        });
        
        CoreUI.MultiSelectAjax({
            url: Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getCiudades",
            idElementoBase: "#idEstado",
            idElementoActualizar: "#idCiudad",
            valorDefault: "",
            agregarDefault: true,
        });
        
        CoreUI.MultiSelectAjax({
            url: Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getColonias",
            idElementoBase: "#idCiudad",
            idElementoActualizar: "#idColonia",
            valorDefault: "",
            agregarDefault: true,
        });
        
        CoreUI.CatalogoSelectAjax({
            idSelectCatalogo: "idPais",
            idModal: "my-modal-paises",
            bPadre: false,
            idButtonMostrar: "btnAgregarPaises",
            idFormaCatalogo:"forma-paises",
            idButtonCatalogoCancel:"idButtonCatalogoPaisCancel",
            idButtonCatalogoAceptar:"idButtonCatalogoPaisAceptar",
            cController: "paises",
            mensajeErrorSeleccionarPadre: _self.TEXT_ERROR_SELECCIONAR_PAIS,
            urlGet:Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getPaises",
            urlInsert:Generic.BASE_URL + "paises/insertar",
            agregarDefault: true,
            valorDefault: "",
        });
        
        CoreUI.CatalogoSelectAjax({
            idSelectPadre: "idPais",
            idSelectCatalogo: "idEstado",
            idModal: "my-modal-estados",
            idHiddenSelectPadre: "idHiddenPais",
            idButtonMostrar: "btnAgregarEstados",
            idFormaCatalogo:"forma-estados",
            idButtonCatalogoCancel:"idButtonCatalogoEstadoCancel",
            idButtonCatalogoAceptar:"idButtonCatalogoEstadoAceptar",
            cController: "estados",
            mensajeErrorSeleccionarPadre: _self.TEXT_ERROR_SELECCIONAR_ESTADO,
            urlGet:Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getEstados",
            urlInsert:Generic.BASE_URL + "estados/insertar",
            agregarDefault: true,
            valorDefault: "",
        });
        
        CoreUI.CatalogoSelectAjax({
            idSelectPadre: "idEstado",
            idSelectCatalogo: "idCiudad",
            idModal: "my-modal-ciudades",
            idHiddenSelectPadre: "idHiddenEstado",
            idButtonMostrar: "btnAgregarCiudades",
            idFormaCatalogo:"forma-ciudades",
            idButtonCatalogoCancel:"idButtonCatalogoCiudadCancel",
            idButtonCatalogoAceptar:"idButtonCatalogoCiudadAceptar",
            cController: "estados",
            mensajeErrorSeleccionarPadre: _self.TEXT_ERROR_SELECCIONAR_CIUDAD,
            urlGet:Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getCiudades",
            urlInsert:Generic.BASE_URL + "ciudades/insertar",
            agregarDefault: true,
            valorDefault: "",
        });
        
        CoreUI.CatalogoSelectAjax({
            idSelectPadre: "idCiudad",
            idSelectCatalogo: "idColonia",
            idModal: "my-modal-colonias",
            idHiddenSelectPadre: "idHiddenCiudad",
            idButtonMostrar: "btnAgregarColonias",
            idFormaCatalogo:"forma-colonias",
            idButtonCatalogoCancel:"idButtonCatalogoCancel",
            idButtonCatalogoAceptar:"idButtonCatalogoAceptar",
            cController: "colonias",
            mensajeErrorSeleccionarPadre: _self.TEXT_ERROR_SELECCIONAR_COLONIA,
            urlGet:Generic.BASE_URL + Generic.AJAX_CONTROLLER + "/getColonias",
            urlInsert:Generic.BASE_URL + "colonias/insertar",
            agregarDefault: true,
            valorDefault: "",
        });
        
        _eventChangePais();
        _eventChangeEstado();
        _eventChangeCiudad();
    };
    
    /**
     * Metodo que se encarga de realiar la peticion ajax al servidor para guardar la configuracion
     * del timbrado de la empresa seleccionada
     * 
     * @access public
     * @param {int} idEmpresaa Identificador de la empresa a la cual se configurara su timbrado
     * @param {int} idConfiguracionTimbrado Identificador de la configuración del timbrado en caso de haber una configuración previa
     * @returns void No retorna ningun valor
     */
    this.btnGuardarTimbrado = function btnGuardarTimbrado() {
        var bValidation = $("#forma-configuracion-timbrado").valid();
        if (bValidation) {
            var oParams = {
                dataType: "json",
                resetForm: false,
                url: Generic.BASE_URL + Generic.CONTROLLER + "/configurarTimbrado",
                success: _btnGuardarTimbradoSuccess
            };
            $("#forma-configuracion-timbrado").ajaxForm(oParams);
            $("#forma-configuracion-timbrado").submit();
        } else {
            this.mostrarMenajeErrorFormulario();
        }
    };
    
    
    /**
     * metodo que se encarga de mostrar un mensaje de confirmación al usuario en donde tendra que confirmar la cancelacion
     * del timbrado
     * 
     * @returns {undefined}
     */
    this.btnCancelarTimbrado = function btnCancelarTimbrado(cRFC, cRazonSocial, iNumeroTimbrado, idEmpresa){
        $("#mesnaje-cancelar-timbrado #replace-rfc").text(cRFC);
        $("#mesnaje-cancelar-timbrado #replace-razon-social").text(cRazonSocial);
        $("#mesnaje-cancelar-timbrado #replace-numero-tiimbrado").text(iNumeroTimbrado);
        
        var cMensaje = $("#mesnaje-cancelar-timbrado").html();
        
        CoreUI.mensajeMsgBoxConfirm(cMensaje, function() {
            $.ajax({
                data: {idEmpresa: idEmpresa,idConfiguracionTimbrado:iNumeroTimbrado},
                url:  Generic.BASE_URL + Generic.CONTROLLER + "/cancelarTimbrado",
                type: "POST",
                async: false,
                dataType: 'json',
                success: function(oResponse) {
                    if (oResponse.success) {
                        oTable.fnDraw();
                        _self.mostrarMensajesJSON(oResponse.data.messages);
                    }

                    if (oResponse.failure) {
                        _self.mostrarMensajesJSON(oResponse.data.messages);
                    }

                    if (oResponse.noLogin) {
                        window.location.href = Generic.BASE_URL + 'dashboard/index';
                    }
                },
                error: function() {
                    _self.mostrarErrorConexionServidor();
                }
            });
        });
    };
    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Metodos Privados">
    
    /**
     * Metodo que se encarga de procesar la respuesta del servidor al momento de guardar los datos de configuracion del timbrado
     * 
     * 
     * @param {type} oResponse
     * @param {type} sStatus
     * @param {type} oXhr
     * @param {type} oForm
     * @returns {undefined}
     */
    function _btnGuardarTimbradoSuccess(oResponse, sStatus, oXhr, oForm){
        if (oResponse.success) {
            _self.btnListado();
        }

        if (oResponse.failure) {
            _self.mostrarMensajesJSON(oResponse.data.messages);
        }

        if (oResponse.noLogin) {
            window.location.href = Generic.BASE_URL + 'dashboard/index';
        }
    }
    
    
    function _eventChangePais() {
        $("#idPais").change(function () {
            $("#idEstado").val("").change();
            $("#idCiudad").val("").change();
            $("#idColonia").val("").change();
        });
    }
    
    function _eventChangeEstado() {
        $("#idEstado").change(function () {
            $("#idCiudad").val("").change();
            $("#idColonia").val("").change();
        });
    }
    
    function _eventChangeCiudad() {
        $("#idCiudad").change(function () {
            $("#idColonia").val("").change();
        });
    }
    
    // </editor-fold>
});

ClassEmpresas.prototype = base;
var empresas = new ClassEmpresas();