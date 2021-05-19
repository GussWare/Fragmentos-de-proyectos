var ClassCoreUI = (function() {

    var _CoreUI = this;

    var _EXITO_MENSAJE = 'exito_mensaje';
    var _ERROR_MENSAJE = 'error_mensaje';
    var _ALERTA_MENSAJE = 'alerta_mensaje';

    var _TIPO_MENSAJE_MSBOX = 'msgbox';
    var _TIPO_MENSAJE_GROWL = 'growl';
    
    this.TIPO_MENSAJE_ERROR = 'error';
    this.TIPO_MENSAJE_INFO = 'info';
    this.TIPO_MENSAJE_ALERT = 'alert';
    
    
    this.selectMenu = function selectMenu(cNombre){
        
        if(typeof cNombre == "undefined" || cNombre == null || cNombre == ""){
            return;
        }
        
        cNombre = cNombre.toLowerCase();
        
        var oMainNav = $("#main-nav");
        var oItemsPadre = oMainNav.find("li[data-menu-padre]");
        var oItemsMenu = oMainNav.find("ul").find("li[data-nombre-item]");
        
        oItemsPadre.removeClass("active");
        if(cNombre == "dashboard"){
            var oDashboard = oMainNav.find(".dashboard");
            oDashboard.addClass("active");
            return;
        }
        
        var oItem = null;
        var cNombreModulo = "";
        var oItemPadre = null;
        $.each(oItemsMenu, function(iKey, item){
            oItem = $(item);
            cNombreModulo = oItem.attr("data-nombre-item");
            cNombreModulo = cNombreModulo.toLowerCase();
            if(cNombreModulo == cNombre){
                oItemPadre = _CoreUI.retornaPadreMenu(oItem);
                oItemPadre.addClass("active");
            }
        });
    };
    
    this.retornaPadreMenu = function retornaPadreMenu(oItem){
        var oPadreMenu = oItem.parent("li[data-menu-padre]");
        if(typeof oPadreMenu == "undefined" || oPadreMenu.length == 0){
           var oPadre = oItem.parent();
           oPadreMenu = _CoreUI.retornaPadreMenu(oPadre);
        }
        return oPadreMenu;
    };
    
    
    this.Menu = function Menu(cRuta) {
            window.location.href = cRuta;
    };

    /**
     * Funcion encargada de solucionar bug de posicion de mensajes de error validation engine
     *  
     * @acces public
     * @returns void
     * 
     * @actualizado 14-01-2015 Se modifico esta fucion debido a que el plugin validate en su metodo updatePromptsPosition
     * causa conflicto con el css de boostrap, estaba anterior mente de esta manera pq en la base pasada se usaba jQuery UI para los tabs
     */
//    this.updatePromptsPositionTabs = function updatePromptsPositionTabs() {
//        $('.ui-tabs-anchor').click(function(e) {
//            var href = $(this).attr('href');
//            $(href).find('.formError').hide();
//            $(href).find('.formError').validationEngine('updatePromptsPosition');
//            $(href).find('.formError').show('fade');
//        });
//    }

    this.updatePromptsPositionTabs = function updatePromptsPositionTabs() {
            $('.nav-tabs').find("li").find("a").click(function(e) {
                cId = $(this).attr("href");
                oTab = $(".tab-content").find("" + cId)

                oTab.find('.formError').hide();
               // oTab.find('.formError').validationEngine('updatePromptsPosition'); 
                oTab.find('.formError').show('fade');
            });
        }

    this.addMessageJson = function addMessageJson(oJson) {
        var cMensaje = "";
        var cTipo = "";
        for (var iIndex in oJson.lTipos) {
            switch (oJson.lTipos[iIndex]) {
                case _EXITO_MENSAJE:
                    var aMensajes = oJson.lMensajes[iIndex];
                    if (aMensajes.length > 0) {
                        for (var iIndex in aMensajes) {
                            cMensaje = aMensajes[iIndex] + "\n";
                            this.mensajeGrowl(cMensaje, "success", Generic.TEXT_TITULO_EXITO);
                        }
                    }
                    break;
                case _ALERTA_MENSAJE:
                    cMensaje = this.convertArrayToHtml(oJson.lMensajes[iIndex]);
                    this.mensajeMsgBox(cMensaje, "alert");
                    break;
                case _ERROR_MENSAJE:
                    cMensaje = this.convertArrayToHtml(oJson.lMensajes[iIndex]);
                    this.mensajeMsgBox(cMensaje, "error");
                    break;
            }
        }
    };

    this.mensajeMsgBox = function mensajeMsgBox(cMensaje, cTipo) {
        $.msgbox(cMensaje, {
            type: cTipo,
            buttons: [{
                    type: "cancel",
                    value: Generic.TEXT_ACCION_ACEPTAR
                }]
        });
    };

    this.mensajeMsgBoxConfirm = function mensajeMsgBoxConfirm(cMensaje, fnAceptar) {
        $.msgbox(cMensaje, {
            type: "confirm",
            buttons: [{
                    type: "submit",
                    value: Generic.TEXT_ACCION_ACEPTAR
                }, {
                    type: "cancel",
                    value: Generic.TEXT_ACCION_CANCELAR
                }]
        }, function(result) {
            if (result) {
                if (typeof fnAceptar == "function") {
                    fnAceptar();
                }
            }
        });
    };

    this.mensajeGrowl = function mensajeGrowl(cMensaje, cTipo, cTitulo) {
        $.msgGrowl({
            type: cTipo,
            title: cTitulo,
            text: cMensaje,
            position: 'top-right'
        });
    };

    this.convertArrayToString = function convertArrayToString(aMensajes) {
        var cMensajes = "";
        if (aMensajes.length > 0) {
            for (var iIndex in aMensajes) {
                cMensajes = cMensajes + aMensajes[iIndex] + "\n";
            }
        }
        return cMensajes;
    };

    this.convertArrayToHtml = function convertArrayToHtml(aMensajes) {
        var cMensajes = "";
        if (aMensajes.length > 0) {
            for (var iIndex in aMensajes) {
                cMensajes = "<div>" + cMensajes + aMensajes[iIndex] + "</div>";
            }
        }
        return cMensajes;
    };

    this.mostrarLoadingAJAX = function mostrarLoadingAJAX() {
        $(document).ajaxStart(function() {
            $("#overley-loading").show();
            $("#content-img-loading").show();
        });

        $(document).ajaxStop(function() {
            $("#overley-loading").hide();
            $("#content-img-loading").hide();
        });
    };

    this.mostrarMessageFlash = function mostrarMessageFlash(oMessage) {
        if ((typeof oMessage != "undefined") && (typeof oMessage != "null") && (oMessage != "null")) {
            this.addMessageJson(oMessage);
        }
    };
});

ClassCoreUI.prototype.CacheDataTable = function(options) {
    options = $.extend({}, this.defaults, options);
    this.timeout = null;
    this.delay = options.delay;
    this.async = options.async;
    this.oCache = {
        newRequest: null,
        fnCallback: null,
        sSource: null,
        bNewRequest: null,
        bServerBusy: false
    };

    this.arraySetKey = function arraySetKey(aoData, sKey, mValue) {
        for (var i = 0, iLen = aoData.length; i < iLen; i++) {
            if (aoData[i].name == sKey) {
                aoData[i].value = mValue;
            }
        }
    };

    this.arrayGetKey = function arrayGetKey(aoData, sKey) {
        for (var i = 0, iLen = aoData.length; i < iLen; i++) {
            if (aoData[i].name == sKey) {
                return aoData[i].value;
            }
        }
        return null;
    };

    var objCache = this;
    this.requestPipeLine = function requestPipeLine() {
        clearTimeout(this.timeout);
        if (!objCache.oCache.bServerBusy) {
            objCache.oCache.bNewRequest = false;
        }

        var aoData = objCache.oCache.newRequest;
        var sEcho = objCache.arrayGetKey(aoData, "sEcho");
        var iRequestStart = objCache.arrayGetKey(aoData, "iDisplayStart");
        var iRequestLength = objCache.arrayGetKey(aoData, "iDisplayLength");
        var sSearch = objCache.arrayGetKey(aoData, "sSearch");
        var iRequestEnd = iRequestStart + iRequestLength;

        if (!objCache.oCache.bServerBusy) {
            objCache.oCache.bServerBusy = true;
            $.ajax({
                "mode": "abort",
                "dataType": "json",
                "type": "POST",
                "url": objCache.oCache.sSource,
                "data": aoData,
                "async": objCache.async,
                "success": function(json) {

                    objCache.oCache.bServerBusy = false;
                    if (objCache.oCache.bNewRequest) {
                        objCache.requestPipeLine();
                    } else {
                        if (options.complete !== undefined && typeof (options.complete) == "function") {
                            options.complete(json);
                        }
                        objCache.oCache.fnCallback(json);
                        if (json.sMessage) {
                            alert(json.sMessage);
                        }
                    }
                },
                error: function(request, status, error) {
                    if (options.onerror !== undefined && typeof (options.onerror) == "function") {
                        options.onerror(request, status, error);
                    } else {
                        alert(request.responseText);
                    }
                }
            });
        }
    };

    this.tablePipeLine = function tablePipeLine(sSource, aoData, fnCallback) {
        this.oCache.newRequest = aoData;
        this.oCache.fnCallback = fnCallback;
        this.oCache.sSource = sSource;
        this.oCache.bNewRequest = true;

        if (this.timeout != null) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(this.requestPipeLine, this.delay);
    };
};

ClassCoreUI.prototype.CacheDataTable.defaults = {
    delay: 1000,
    async: true
};


ClassCoreUI.prototype.MultiSelectAjax = function(options) {
    this.defaults = {
        agregarDefault: false,
        EtiquetaSeleccione: Generic.TEXT_SELECCIONAR,
        EtiquetaCargando: Generic.TEXT_CARGANDO,
        async: true,
        sendEmptyValues: false,
        valorDefault: 0
    };
    var objMgr = this;
    options = $.extend({}, objMgr.defaults, options);

    function beforeSend(options) {
        $(options.idElementoActualizar).attr('disabled', true).find('option').remove();
        $(options.idElementoActualizar).append('<option value="">' + options.EtiquetaCargando + '</option>');
        if (options.beforeSend != undefined) {
            options.beforeSend(options);
        }
    }

    function complete(options, json) {
        $(options.idElementoActualizar).find('option').remove();
        if (options.agregarDefault) {
            var newOption = '<option value="' + options.valorDefault + '">' + options.EtiquetaSeleccione + '</option>';
            $(options.idElementoActualizar).append(newOption);
        }
        if (typeof json.data != "undefined") {
            for (i = 0; i < json.data.options.length; i++) {
                json.data.options[i].Text = CoreUtil.html.html_entity_decode(json.data.options[i].Text);
                var newOption = '<option value="' + json.data.options[i].ID + '">' + json.data.options[i].Text + '</option>';
                $(options.idElementoActualizar).append(newOption);
            }
        }
        $(options.idElementoActualizar).removeAttr("disabled");
        if (options.complete) {
            options.complete(options, json);
        }
    }

    function getSelectedIndexes(options) {
        var selItems = $(options.idElementoBase).find("option:selected");
        var sendIndex = null;
        if (selItems.length > 1) {
            sendIndex = new Array();
            for (i = 0; i < selItems.length; i++) {
                sendIndex[i] = $(selItems[i]).attr("value");
            }
        } else if (selItems.length == 1) {
            sendIndex = $(selItems[0]).attr("value");
        }

        return sendIndex;
    }

    this.beforeSend = beforeSend;
    this.complete = complete;
    this.getSelectedIndexes = getSelectedIndexes;

    $(options.idElementoBase).change(function() {
        if (!options.sendEmptyValues) {
            if ($(options.idElementoBase).find("option:selected").length == 1 && $(options.idElementoBase).val() == options.valorDefault) {
                objMgr.complete(options, {options: []});
                return;
            }
        }
        objMgr.beforeSend(options);

        var defParamasAjax = {
            dataType: 'json',
            type: "POST",
            url: options.url,
            async: options.async,
            success: function(json) {
                if (options.formatData !== undefined && typeof (options.formatData) == "function") {
                    json = options.formatData(options, json);
                }
                objMgr.complete(options, json);
            },
            error: function(request, status, error) {
                alert(status);
            }
        };
        var paramsAjax = {};
        if (options.configureAjax) {
            paramsAjax = options.configureAjax(options);
        }
        var finalParams = $.extend(defParamasAjax, paramsAjax);
        if (finalParams.data == undefined) {
            var idCtrl = (options.nombreEnviarBase == undefined) ? $(options.idElementoBase).attr("id") : options.nombreEnviarBase;
            finalParams.data = {};
            finalParams.data[idCtrl] = objMgr.getSelectedIndexes(options);
        }
        $.ajax(finalParams);
    });
    
};


ClassCoreUI.prototype.CatalogoSelectAjax = function(options) {
    
    this.defaults = {
        bPadre: true,
        idSelectPadre: "",
        idSelectCatalogo: "",
        idModal:"",
        idHiddenSelectPadre:"",
        idFormaCatalogo:"",
        idButtonMostrar:"",
        idButtonCatalogoCancel:"idButtonCatalogoCancel",
        idButtonCatalogoAceptar:"idButtonCatalogoAceptar",
        mensajeErrorSeleccionarPadre:"",
        fnMostrarCatalogo:false,
        fnBtnGuardarModalCatalogo:false,
        fnbtnCerrarModalCatalogo:false,
        fnComplete:false,
        cController:"",
        urlGet:"",
        urlInsert:"",
        agregarDefault: false,
        EtiquetaSeleccione: Generic.TEXT_SELECCIONAR,
        EtiquetaCargando: Generic.TEXT_CARGANDO,
        async: true,
        sendEmptyValues: false,
        valorDefault: 0,
        configureAjax:false
    };
    
    var objMgr = this;
    options = $.extend({}, objMgr.defaults, options);
    
    function _fnMostrarCatalogo(options){
        if(options.bPadre){
            var identificador = $("#" +  options.idSelectPadre).val();
            $("#" + options.idHiddenSelectPadre).val(identificador);
            
            if (identificador > 0) {
                $('#' + options.idModal).modal('show');
            } else {
                CoreUI.mensajeMsgBox(options.mensajeErrorSeleccionarPadre, CoreUI.TIPO_MENSAJE_ERROR);
            }
        } else{
            $('#' + options.idModal).modal('show');
        }        
    };
    
    // metodos privados del plugin
    
    function _fnBtnGuardarModalCatalogo(options) {
        var bValidation = $("#"+options.idFormaCatalogo).valid();
        if (bValidation) {
            var oParams = {
                dataType: "json",
                resetForm: false,
                url: options.urlInsert,
                success: function(oResponse, sStatus, oXhr, oForm){
                    if (oResponse.success) {
                        _fnbtnCerrarModalCatalogo(options);
                        _fnCargarSelectCatalogo(oResponse.data, options);
                    }

                    if (oResponse.failure) {
                        base.mostrarMensajesJSON(oResponse.data.messages);
                    }

                    if (oResponse.noLogin) {
                        window.location.href = Generic.BASE_URL + 'dashboard/index';
                    }
                }
            };
            $("#"+options.idFormaCatalogo).ajaxForm(oParams);
            $("#"+options.idFormaCatalogo).submit();
        } else {
            base.mostrarMenajeErrorFormulario();
        }
    };
    
    function _fnbtnCerrarModalCatalogo(options){
        var oForma = $("#"+options.idFormaCatalogo);
        oForma.find(":input").val("");
        $('#' + options.idModal).modal('hide');
    };
    
    
    function _fnCargarSelectCatalogo(data, options){
        $("#" + options.idSelectCatalogo).attr('disabled', true).find('option').remove();
        $("#" + options.idSelectCatalogo).append('<option value="">' + Generic.TEXT_SELECCIONAR + '</option>');
        
        var defParamasAjax = {
            dataType: 'json',
            type: "POST",
            url: options.urlGet,
            async: true,
            success: function (json) {
                _complete(data, options, json);
            },
            error: function (request, status, error) {
                base.mostrarMenajeErrorFormulario();
            }
        };
        
        var paramsAjax = {};
        if (options.configureAjax) {
            paramsAjax = options.configureAjax;
        }
        
        var finalParams = $.extend(defParamasAjax, paramsAjax);
        if (typeof finalParams.data === "undefined") {
            if(options.bPadre){
                finalParams.data = {};
                finalParams.data[options.idSelectPadre] = $("#" + options.idSelectPadre).val();
            }
        }
        
        $.ajax(finalParams);
        
    };
    
    function _complete(data, options, json) {
        $("#" +options.idSelectCatalogo).find('option').remove();
        if (options.agregarDefault) {
            var newOption = '<option value="' + options.valorDefault + '">' + options.EtiquetaSeleccione + '</option>';
            $("#" +options.idSelectCatalogo).append(newOption);
        }
        if (typeof json.data != "undefined") {
            for (i = 0; i < json.data.options.length; i++) {
                json.data.options[i].Text = CoreUtil.html.html_entity_decode(json.data.options[i].Text);
                var newOption = '<option value="' + json.data.options[i].ID + '"   >' + json.data.options[i].Text + '</option>';
                //var newOption = '<option value="' + json.data.options[i].ID + '"  ' + ((json.data.options[i].ID == data[options.idSelectCatalogo]) ? "selected=\"selected\"" : ""  ) + '  >' + json.data.options[i].Text + '</option>';
                $("#" +options.idSelectCatalogo).append(newOption);
            }
            $("#" +options.idSelectCatalogo).val(data[options.idSelectCatalogo]).change();
        }
        $("#" +options.idSelectCatalogo).removeAttr("disabled");
        if (options.fnComplete) {
            options.fnComplete(options, json);
        }
    }
    
    // disparar eventos
    
    $("#" + options.idButtonMostrar).click(function(e){
        e.preventDefault();
        e.stopPropagation();
        
        if(typeof options.fnMostrarCatalogo == "function"){
            options.fnMostrarCatalogo(options);
        } else {
            _fnMostrarCatalogo(options);
        }
    });
    
    
    $("#" + options.idButtonCatalogoCancel).click(function(e){
        e.preventDefault();
        
        if(typeof options.fnbtnCerrarModalCatalogo == "function"){
            options.fnbtnCerrarModalCatalogo(options);
        } else {
            _fnbtnCerrarModalCatalogo(options);
        }
    });
    
    $("#" + options.idButtonCatalogoAceptar).click(function(e){
        e.preventDefault();
        
        if(typeof options.fnbtnCerrarModalCatalogo == "function"){
            options.fnBtnGuardarModalCatalogo(options);
        } else {
            _fnBtnGuardarModalCatalogo(options);
        }
    });
    
};

var CoreUI = new ClassCoreUI();