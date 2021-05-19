<?php
/*
 * Empresas
 * 
 * Este catálogo tiene como finalidad de administrar las empresa  con las que cuenta el sistema como por ejemplo KLC,ASIE etc. 
 * Las acciones que se podrán realizar son: agregar, actualizar, borrar, habilitar, deshabilitar, configuración del timbrado,
 * revisión de folios fiscales, alta de folios fiscales y cancelación del timbrado, cabe mencionar que solo el usuario administrador 
 * y súper usuario tendrán acceso a realizar estas operaciones.
 * 
 * @package controller
 * @author Gustavo Avila Medina <gussjq@gmail.com> cel : <8187789518>
 * @created 14-01-2015
 */
class Empresas extends MY_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->load->model("contratacion/empresa_model", "Empresa_model");
        $this->load->library("ViewModels/Empresa_ViewModel");
        
        $this->load->model("contratacion/configuraciontimbrado_model", "ConfiguracionTimbrado_model");
        $this->load->library("ViewModels/ConfiguracionTimbrado_ViewModel");
        
        $this->load->model("personales/Pais_model");
        $this->load->library("ViewModels/Pais_ViewModel");
        
        $this->load->model("personales/Estado_model");
        $this->load->library("ViewModels/Estado_ViewModel");
        
        $this->load->model("personales/Ciudad_model");
        $this->load->library("ViewModels/Ciudad_ViewModel");
        
        $this->load->model("personales/Colonia_model");
        $this->load->library("ViewModels/Colonia_ViewModel");
    }

    // <editor-fold defaultstate="collapsed" desc="Metodos Catalogo">

    /**
     * Pantalla principal del catalogo de empresas, en donde se mostrara las empresa registradas en el sistema,
     * las acciones que se podran realizar son:  agregar, actualizar, habilitar, deshabilitar y borrar ,  
     * cabe mencionar que solo el usuario administrador y súper usuario tendrán acceso a realizar estas operaciones
     * 
     * se pasa a la vista un array de parametros para visualizar la siguiente informacion:
     * 
     *      [oEmpresa] => Objeto ViewModel de empresa
     *      [cTitulo] => Titulo a mostrar en la etiqueta title del head
     *      [aMigajaPan] => Descripción de la pantalla actual
     *      [aMenuCatalogo] =>  array que contiene la estructura del proceso de configuracion del submenu de acceso rapido
     * 
     * @access public
     * @return void no retorna ningun valor
     */
    public function listado()
    {
        try {
            $oEmpresa = new Empresa_ViewModel();
            $oEmpresa = $this->seguridad->getPost($oEmpresa);
            
            FindSessionHelper::add("FindEmpresas", $oEmpresa, $this->aAmbito);

            $aParams = array();
            $aParams["oEmpresa"] = $oEmpresa;
            $aParams["cTitulo"] = lang("empresas_titulo");
            $aParams['aMigajaPan'] = array(lang("general_accion_listado"));
            $aParams['aMenuCatalogo'] = $this->seguridad->getMenu(MENU_CONFIGURACION_EMPRESA);

            $this->layout->view($this->cModulo . '/listado_view', $aParams);
        } catch (Exception $exc) {
            $this->message->clearMessages();
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $exc);
        }
    }

    /**
     * Metodo de tipo publico que se encarga de llenar los registros en el listado de empresa,
     * de igualmanera se encarga de realizar la busqueda avanzada y rapida de acuerdo a los criterios de busqueda proporcionados por el usuario,
     * la manera como se accede es mediante una peticion ajax y devuelve un array de objetos en formato json con los registros encontrados en la busqueda
     * 
     * @access public
     * @param int $idEmpresa Para realizar busqeudas atravez del identificador de la empresa
     * @param string cBuscar Description del criterio de busqueda 
     * @param int iOrdenarPor Columna por la cual se ordenaran los registros
     * @param int iOdirecciion Manera como se visualizaran los registros ASC o DESC
     * @return json array Devuelve los datos del listado en formato json
     *      [iTotalRecords] => total de registros encontrados
     *      [iTotalDisplayRecords] => total de registros a mostrar
     *      [aaData] => array de objetos json con los registros encontrados en la busqueda
     */
    public function listadoAjax()
    {
        try {
            $oEmpresa = FindSessionHelper::get("FindEmpresas");
            if (!$oEmpresa)
            {
                $oEmpresa = new Empresa_ViewModel();
            }
            
            $oEmpresa = $this->seguridad->getPost($oEmpresa);
            $oEmpresa = $this->_prepararMayusculas($oEmpresa);
            $oEmpresa->cBuscar = $this->input->post('sSearch');
            $oEmpresa->iOrdenadoPor = $this->input->post('iSortCol_0');
            $oEmpresa->iODireccion = strtoupper($this->input->post('sSortDir_0'));
            
            FindSessionHelper::add("FindEmpresas", $oEmpresa, $this->aAmbito);
            
            $aData = $this->Empresa_model->getAll($oEmpresa, true);
            $aResponse = parent::paginacion($aData);
            echo json_encode($aResponse);
        } catch (Exception $exc) {
            $this->message->clearMessages();
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $exc, FALSE);
        }
    }
    
    /**
     * Metodo que recupera los parametros del filtrado para la exportación del listado en
     * los formatos de word, excel, pdf y csv
     * @return array
     */
    public function getParams()
    {
        $oEmpresa= FindSessionHelper::get("FindEmpresas");
        if ($oEmpresa == NULL)
        {
            $oEmpresa = new Empresa_ViewModel();
        }
        if (!$oEmpresa->iODireccion)
        {
            $oEmpresa->iODireccion = 'ASC';
        }

        $result = parent::getParams();
        $result['filters'] = $oEmpresa;

        if ($oEmpresa->iOrdenadoPor !== false)
        {
            $result['sort'] = $oEmpresa->iOrdenadoPor;
        }
        else
        {
            $result['sort'] = '';
        }
        $result['sortAlign'] = $oEmpresa->iODireccion;
        $result['find'] = $oEmpresa->cBuscar;
        
        $result['tituloReporte'] = lang("empresas_titulo");
        
        return $result;
    }

    /**
     * Metodo que visualiza la forma de captura del catálogo de empresa, listos para su edición o bien para
     * ingresar nuevos registros de acuerdo al nivel de acceso que tenga el usuario firmado,
     * si el campo idempresa es nulo se trata de agregar un nuevo registro, si el campo idempresa es diferente de nulo
     * se trata de una edición.
     * 
     * Se pasan los siguientes parametros a la vista : 
     * 
     *      [oEmpresa] => Objeto ViewModel de empresa en caso de ser una edicion el objeto cuenta con los datos del registro a editar de lo contrario se el objeto se encuentra con los datos vacios
     *      [cTitulo] => Titulo a mostrar en la etiqueta title del head
     *      [aMigajaPan] => Descripción de la pantalla actual
     *      [aMenuCatalogo] =>  array que contiene la estructura del proceso de configuracion del submenu de acceso rapido
     * 
     * @access public
     * @param numeric $idEmpresa Identificador del Empresa a editar
     * @return void No retorna ningun valor
     */
    public function forma()
    {
        try {
            $oEmpresa = new Empresa_ViewModel();
            if ($this->uri->segment(3))
            {
                $dbEmpresa = $this->Empresa_model->find(array(
                    "idEmpresa" => $this->uri->segment(3), "bBorradoLogico" => NO
                ));

                if (!is_object($dbEmpresa))
                {
                    $this->message->addError(lang("general_error_registro_no_encontrado"));
                    $this->session->set_flashdata('_MESSAGES', json_encode($this->message->toJsonObject()));
                    redirect($this->cModulo . "/listado");
                }

                $oEmpresa = $this->seguridad->dbToView($oEmpresa, $dbEmpresa);
            }

            $aParams['oEmpresa'] = $oEmpresa;
            $aParams["cTitulo"] = lang("empresas_titulo");
            $aParams['aMigajaPan'] = array(lang("general_accion_forma"));
            $aParams['aMenuCatalogo'] = $this->seguridad->getMenu(MENU_CONFIGURACION_EMPRESA);
            $aParams['aCombosForma'] = $this->_getCombosForma($oEmpresa);

            $this->layout->view($this->cModulo . '/forma_view', $aParams);
        } catch (Exception $exc) {
            $this->message->clearMessages();
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $exc);
        }
    }

    /**
     * Metodo encargado de insertar un nuevo registro en la base de datos,
     * la petición es realizada mediante ajax.
     * 
     * @access public
     * @return json objeto json 
     *      [success] booelan true|false retorna verdadero si el proceso se realizo con exito 
     *      [failuare] boolean true|false retorna true si existio un error durante el proceso
     *      [noLogin] boolean true|false retorna verdadero si el usuario no se encuentra firmado o si el tiempo de la sesión a expirado
     *      [data] array datos a devolver a la vista para continuar con el proceso
     *          [messages] array Mensajes de succes o error a devolver al usuario con el resultado de la operación
     */
    public function insertar()
    {
        $aResponse = array("success" => false, "failure" => true, "nologin" => false, "data" => array());
        try {
            $oEmpresa = new Empresa_ViewModel();
            $oEmpresa = $this->seguridad->getPost($oEmpresa);

            if ($this->_validarForma())
            {
                $this->seguridad->startTransaction();
                $oEmpresa = $this->_prepararMayusculas($oEmpresa);
                $oEmpresa->bBorradoLogico = NO;
                $oEmpresa->bHabilitado = SI;
                
                $this->Empresa_model->create();
                $this->Empresa_model->save($oEmpresa);

                $this->message->addExito(lang("general_evento_insertar"));
                $this->session->set_flashdata('_MESSAGES', json_encode($this->message->toJsonObject()));
                $this->seguridad->setBitacora($this->cModulo, $this->cAccion, lang("bitacora_evento_insertar"), array(UsuarioHelper::get('cNombreCompleto'), $this->cModulo, $oEmpresa->cNombre));

                $aResponse["success"] = true;
                $aResponse["failure"] = false;
                $this->seguridad->commitTransaction();
            }
        } catch (Exception $exc) {
            $this->message->clearMessages();
            $this->message->addError(lang("general_error"));
            $this->seguridad->rollbackTransaction();
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $exc, FALSE);
        }

        $aResponse["data"]["messages"] = $this->message->toJsonObject();
        echo json_encode($aResponse);
    }

    /**
     * Metodo encargado de editar un registro en la base de datos, la petición es realizada mediante ajax.
     * 
     * @access public
     * @param int $idEmpresa Identificador unico de la empresa a nivel base de datos (llave primaria)
     * @return json objeto json 
     *      [success] booelan true si la el proceso se realizo con exito false si no 
     *      [failuare] boolean true si hubo un fallo al momento de realizar el proceso
     *      [noLogin] boolean true si la sesion del usuario se ha terminado
     *      [data] array datos a devolver a la vista para continuar con el proceso
     *      [messages] array Mensajes de succes o error a devolver al usuario con el resultado de la operación
     */
    public function actualizar()
    {
        $aResponse = array("success" => false, "failure" => true, "noLogin" => false, "data" => array());
        
        try {
            $oEmpresa = new Empresa_ViewModel();
            $oEmpresa = $this->seguridad->getPost($oEmpresa);

            if ($this->_validarForma())
            {
                $this->seguridad->startTransaction();
                $dbEmpresa = $this->Empresa_model->find(array("idEmpresa" => $oEmpresa->idEmpresa));
                if (is_object($dbEmpresa))
                {
                    $oEmpresa = $this->_prepararMayusculas($oEmpresa);
                    $oEmpresa->bHabilitado = $dbEmpresa->bHabilitado;
                    $oEmpresa->bBorradoLogico = $dbEmpresa->bBorradoLogico;
                    $this->Empresa_model->save($oEmpresa, $oEmpresa->idEmpresa);

                    $this->message->addExito(lang("general_evento_actualizar"));
                    $this->session->set_flashdata('_MESSAGES', json_encode($this->message->toJsonObject()));
                    $this->seguridad->setBitacora($this->cModulo, $this->cAccion, lang("bitacora_evento_actualizar"), array(UsuarioHelper::get('cNombreCompleto'), $this->cModulo, $oEmpresa->cNombre));

                    $aResponse["success"] = true;
                    $aResponse["failure"] = false;
                }
                else
                {
                    $this->message->addError(lang("general_error_registro_no_encontrado"));
                }

                $this->seguridad->commitTransaction();
            }
        } catch (Exception $exc) {
            $this->message->clearMessages();
            $this->message->addError(lang("general_error"));
            $this->seguridad->rollbackTransaction();
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $exc, FALSE);
        }

        $aResponse["data"]["messages"] = $this->message->toJsonObject();
        echo json_encode($aResponse);
    }

    /**
     * Metodo encargado de habilitar Empresa en la base de datos
     * 
     * @access public
     * @param int $id Identigicador de la empresa ha habilitar
     * @return json objeto json 
     *      [success] booelan true si la el proceso se realizo con exito false si no 
     *      [failuare] boolean true si hubo un fallo al momento de realizar el proceso
     *      [noLogin] boolean true si la sesion del usuario se ha terminado
     *      [data] array datos a devolver a la vista para continuar con el proceso
     */
    public function habilitar()
    {
        $aResponse = array("success" => false, "failure" => true, "nologin" => false, "data" => array());
        try {
            $this->seguridad->startTransaction();
            $idEmpresa = $this->input->post("id", true);

            $dbEmpresa = $this->Empresa_model->find(array("idEmpresa" => $idEmpresa));
            if (is_object($dbEmpresa))
            {
                $dbEmpresa->bHabilitado = SI;
                $this->Empresa_model->save($dbEmpresa, $dbEmpresa->idEmpresa);
                
                $this->message->addExito(lang("general_evento_habilitar"));
                $this->seguridad->setBitacora($this->cModulo, $this->cAccion, lang("bitacora_evento_habilitar"), array(UsuarioHelper::get('cNombreCompleto'), $this->cModulo, $dbEmpresa->cNombre));

                $aResponse["success"] = true;
                $aResponse["failure"] = false;
            }
            else
            {
                $this->message->addError(lang("general_error_registro_no_encontrado"));
            }
            $this->seguridad->commitTransaction();
        } catch (Exception $ex) {
            $this->message->clearMessages();
            $this->message->addError(lang("general_error"));
            $this->seguridad->rollbackTransaction();
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $ex, FALSE);
        }

        $aResponse["data"]['messages'] = $this->message->toJsonObject();
        echo json_encode($aResponse);
    }

    /**
     * Metodo encargado de deshabilitar Empresa en la base de datos
     * 
     * @access public
     * @param int $id Identigicador de la empresa ha deshabilitar
     * @return json objeto json 
     *      [success] booelan true si la el proceso se realizo con exito false si no 
     *      [failuare] boolean true si hubo un fallo al momento de realizar el proceso
     *      [noLogin] boolean true si la sesion del usuario se ha terminado
     *      [data] array datos a devolver a la vista para continuar con el proceso
     */
    public function deshabilitar()
    {
        $aResponse = array("success" => false, "failure" => true, "noLogin" => false, "data" => array());

        try {
            $this->seguridad->startTransaction();
            $idEmpresa = $this->input->post("id", true);

            $dbEmpresa = $this->Empresa_model->find(array("idEmpresa" => $idEmpresa));
            if (is_object($dbEmpresa))
            {
                $dbEmpresa->bHabilitado = NO;
                $this->Empresa_model->save($dbEmpresa, $dbEmpresa->idEmpresa);
                
                $this->message->addExito(lang("general_evento_habilitar"));
                $this->seguridad->setBitacora($this->cModulo, $this->cAccion, lang("bitacora_evento_deshabilitar"), array(UsuarioHelper::get('cNombreCompleto'), $this->cModulo, $dbEmpresa->cNombre));

                $aResponse["success"] = true;
                $aResponse["failure"] = false;
            }
            else
            {
                $this->message->addError(lang("general_error_registro_no_encontrado"));
            }
            $this->seguridad->commitTransaction();
        } catch (Exception $ex) {
            $this->message->clearMessages();
            $this->message->addError(lang("general_error"));
            $this->seguridad->rollbackTransaction();
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $ex, FALSE);
        }

        $aResponse["data"]['messages'] = $this->message->toJsonObject();
        echo json_encode($aResponse);
    }
    
    public function eliminar()
    {
        $aResponse = array("success" => false, "failure" => true, "noLogin" => false, "data" => array());
        try {
            $this->seguridad->startTransaction();
            $idEmpresa = $this->input->post("id", true);

            $dbEmpresa = $this->Empresa_model->find(array("idEmpresa" => $idEmpresa));
            if (is_object($dbEmpresa))
            {
                $dbEmpresa->bBorradoLogico = SI;
                $this->Empresa_model->save($dbEmpresa, $dbEmpresa->idEmpresa);
                
                $this->message->addExito(lang("general_evento_eliminar"));
                $this->seguridad->setBitacora($this->cModulo, $this->cAccion, lang("bitacora_evento_eliminar"), array(UsuarioHelper::get('cNombreCompleto'), $this->cModulo, $dbEmpresa->cNombre));

                $aResponse["success"] = true;
                $aResponse["failure"] = false;
            }
            else
            {
                $this->message->addError(lang("general_error_registro_no_encontrado"));
            }
            $this->seguridad->commitTransaction();
        } catch (Exception $ex) {
            $this->message->clearMessages();
            $this->message->addError(lang("general_error"));
            $this->seguridad->rollbackTransaction();
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $ex, FALSE);
        }

        $aResponse["data"]['messages'] = $this->message->toJsonObject();
        echo json_encode($aResponse);
    }
    

    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Metodos Configuracion Timbrado">
    
    /** Metodo que visualiza la forma de configuracion del timbrado por empresa, recibe como parametro el 
     * identificador de la emrpesa a la cual se configurara los datos de timbrado
     * 
     * @access public
     * @param int|null $idEmpresa Identificador de la empresa a la cual se configurara el timbrado
     * @return void No retorna ningun valor
     */    
    public function formaTimbrado($idEmpresa = NULL)
    {
        try {
            // si no se pasa el identificador de la empresa a configurar el timbrado se redirecciona al usuario al 
            // listado de empresas y se le muestra un mensaje de error
            if (!$idEmpresa)
            {
                $this->message->addError(lang("error_empresa_no_encontrada"));
                $this->session->set_flashdata('_MESSAGES', json_encode($this->message->toJsonObject()));
                redirect($this->cModulo . "/listado");
            }
            
            // se busca la empresa a configurar el timbrado
            $dbEmpresa = $this->Empresa_model->find(array(
                "idEmpresa" => $idEmpresa, "bBorradoLogico" => NO
            ));
            
            // si al empresa no es encontrada se redirecciona al usuario al listado y se muestra un mensaje de error
            if (!is_object($dbEmpresa)) 
            {
                $this->message->addError(lang("error_empresa_no_encontrada"));
                $this->session->set_flashdata('_MESSAGES', json_encode($this->message->toJsonObject()));
                redirect($this->cModulo . "/listado");
            }
            
            $oEmpresa = new Empresa_ViewModel();
            $oEmpresa = $this->seguridad->dbToView($oEmpresa, $dbEmpresa);
            
            $dbConfTimbrado = $this->ConfiguracionTimbrado_model->find(array(
                "idEmpresa" => $oEmpresa->idEmpresa
            ));
            
            $oConfTimbrado = new ConfiguracionTimbrado_ViewModel();
            $oConfTimbrado = $this->seguridad->dbToView($oConfTimbrado, $dbConfTimbrado);

            $aParams['oEmpresa'] = $oEmpresa;
            $aParams['oConfTimbrado'] = $oConfTimbrado;
            $aParams["cTitulo"] = lang("empresas_titulo");
            $aParams['aMigajaPan'] = array(lang("empresas_forma_timbrado"), $oEmpresa->cCodigo);
            $aParams['aMenuCatalogo'] = $this->seguridad->getMenu(MENU_CONFIGURACION_EMPRESA);
            
            if ($oConfTimbrado->idConfiguracionTimbrado)
            {
                $aParams['aCombosForma'] = $this->_getCombosFormaTimbrado($oConfTimbrado);
            }
            else
            {
                $aParams['aCombosForma'] = $this->_getCombosForma($oEmpresa);
            }

            $this->layout->view($this->cModulo . '/forma_timbrado_view', $aParams);
        } catch (Exception $exc) {
            $this->message->clearMessages();
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $exc);
        }
    }
    
    /**
     * Metodo que se encarga de configurar el timbrado, guarda los datos del controbuyente y guarda los archivos de los archivos .CER y KEY
     * y los asocia ala empresa
     * 
     * @access public
     */
    public function configurarTimbrado()
    {
        $aResponse = array("success" => false, "failure" => true, "noLogin" => false, "data" => array());
        try {
            $oConfTimbrado= new ConfiguracionTimbrado_ViewModel();
            $oConfTimbrado = $this->seguridad->getPost($oConfTimbrado);

            if ($this->_validarFormaTimbrado())
            {
                $this->seguridad->startTransaction();
                $dbEmpresa = $this->Empresa_model->find(array(
                    "idEmpresa" => $oConfTimbrado->idEmpresa, "bBorradoLogico" => NO
                ));
                
                if (is_object($dbEmpresa))
                {
                    $dbEmpresa->cRazonSocial = mb_strtoupper($this->input->post('cRazonSocial', true), 'UTF-8');
                    $dbEmpresa->cRFC = mb_strtoupper($this->input->post('cRFC', true), 'UTF-8');
                    $dbEmpresa->cRepresentanteLegal = $this->input->post('cRepresentanteLegal', true);
                    
                    $this->Empresa_model->save($dbEmpresa, $dbEmpresa->idEmpresa);

                    $dbConfTimbrado = $this->ConfiguracionTimbrado_model->find(array("idEmpresa" => $oConfTimbrado->idEmpresa));
                    if (is_object($dbConfTimbrado))
                    {
                        $idConfiguracion = (int) $this->ConfiguracionTimbrado_model->save($oConfTimbrado, $dbConfTimbrado->idEmpresa);
                    }
                    else
                    {
                        $idConfiguracion = (int) $this->ConfiguracionTimbrado_model->save($oConfTimbrado);
                    }
                    
                    // si se realizo con exito el guardado de la configuracion movemos los archovs del sello digital
                    if($idConfiguracion  > 0)
                    {
                        $this->_moverArchivo($dbEmpresa, $dbConfTimbrado, $oConfTimbrado);
                    }

                    $this->message->addExito(lang("empresas_evento_actualizar_timbrado"));
                    $this->session->set_flashdata('_MESSAGES', json_encode($this->message->toJsonObject()));
                    $this->seguridad->setBitacora($this->cModulo, $this->cAccion, lang("empresas_bitacora_evento_actualizar_timbrado"), array(UsuarioHelper::get('cNombreCompleto'), $dbEmpresa->cNombre));

                    $aResponse["success"] = true;
                    $aResponse["failure"] = false;
                }
                else
                {
                    $this->message->addError(lang("error_empresa_no_encontrada"));
                }
                
                $this->seguridad->commitTransaction();
            }
            
        } catch (Exception $exc) {
            $this->message->clearMessages();
            $this->message->addError(lang("general_error"));
            $this->seguridad->rollbackTransaction();
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $exc, FALSE);
        }

        $aResponse["data"]["messages"] = $this->message->toJsonObject();
        echo json_encode($aResponse);
    }

    /**
     * Metodo que se encarga de cargar los archivos .CER y .KEY del certificado y sello digital (CSD), 
     * se encarga de validar que el archivo a subir contenga la extensión .CER o .KEY de acuerdo al campo de la forma,
     * ninguna otra extension podra subir al servidor
     * 
     * @access public
     * @return objet json Retorna un objeto en formato json con con la 
     */
    public function cargarArchivo()
    {
        $aResponse = array("success" => false, "failure" => true, "noLogin" => false, "data" => array());
        try {
            $cExtension = $this->input->post("cExtension");
            $cInput = $this->input->post("cInput");
  
            if (!$cExtension)
            {
                $this->message->addError(lang("empresas_timbrado_error_extension"));
            }
            else
            {
                $cDirTemporal = getDocumentRoot() . DIRECTORIO_TEMPORAL;
                $aConfig['upload_path'] = DIRECTORIO_TEMPORAL;
                $aConfig['allowed_types'] = $cExtension;
                $aConfig['overwrite'] = true;

                $this->load->library('upload', $aConfig);
                if ($this->upload->do_upload($cInput))
                {
                    $aResponse["success"] = true;
                    $aResponse["failure"] = false;
                    $aResponse["data"]["aFileData"] = $this->upload->data();
                }
                else
                {
                    $this->message->addError($this->upload->display_errors());
                }
            }
        } catch (Exception $exc) {
            //guardar en bitacora error 
            $this->message->addError(lang("general_error_subir_archivo"));
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $exc, false);
        }

        $aResponse["data"]["messages"] = $this->message->toJsonObject();
        echo json_encode($aResponse);
    }

    /**
     * Metodo que se encarga de mover los archivos .Cer y .Key del directorio temporal al directorio permanente del catalogo de empresas
     * @param object model $oEmpresa 
     * @param object $dbConfTimbrado
     * @param object $oConfTimbrado
     * 
     * @return void No retorna ningun valor
     */
    private function _moverArchivo($oEmpresa, $dbConfTimbrado, $oConfTimbrado)
    {
        if (!empty($oConfTimbrado->cArchivoCer) && !empty($oConfTimbrado->cArchivoKey))
        {
            // validamos si existe el archivo en temporal
            $cArchivoCerTemporal = getDocumentRoot() . DIRECTORIO_TEMPORAL . $oConfTimbrado->cArchivoCer;
            $cArchivoKeyTemporal = getDocumentRoot() . DIRECTORIO_TEMPORAL . $oConfTimbrado->cArchivoKey;

            if (@file_exists($cArchivoCerTemporal) && @file_exists($cArchivoKeyTemporal))
            {
                // validamos que exista la carpeta de la empresa a guardar los archivos .cer y .key
                // en base al codigo de la empresa
                $cDirectorioEmpresas = getDocumentRoot() . DIRECTORIO_ARCHIVOS . DIRECTORIO_EMPRESAS . $oEmpresa->idEmpresa;
                if (!@file_exists($cDirectorioEmpresas))
                {
                    @mkdir($cDirectorioEmpresas, 0777);
                }

                //si no existe el directorio de configuracion del timbrado de la empresa seleccionada se crea
                $cDirectorioConfiguracionTimbrado = getDocumentRoot() . DIRECTORIO_ARCHIVOS . DIRECTORIO_EMPRESAS . $oEmpresa->idEmpresa . DIRECTORIO_SEPARADOR . DIRECTORIO_CONFIGURACION_TIMBRADO;
                if (!@file_exists($cDirectorioConfiguracionTimbrado))
                {
                    @mkdir($cDirectorioConfiguracionTimbrado, 0777);
                }

                // copiamos el archivo temporal a la ruta permanente
                if (copy($cArchivoCerTemporal, $cDirectorioConfiguracionTimbrado . $oConfTimbrado->cArchivoCer))
                {
                    // si existe un archivo subido anteriormente se elimina, de tal manera que siempre exitira solo una configuracion para cada emrpesa
                    if (is_object($dbConfTimbrado))
                    {
                        $cArchivoCerAnterior = $cDirectorioConfiguracionTimbrado . $dbConfTimbrado->cArchivoCer;
                        if (!empty($dbConfTimbrado->cArchivoCer) && @file_exists($cArchivoCerAnterior))
                        {
                            unlink($cArchivoCerAnterior);
                        }
                    }

                    if (@file_exists($cArchivoCerTemporal))
                    {
                        unlink($cArchivoCerTemporal);
                    }
                }

                // copiamos el archivo temporal a la ruta permanente
                if (copy($cArchivoKeyTemporal, $cDirectorioConfiguracionTimbrado . $oConfTimbrado->cArchivoKey))
                {
                    // si existe un archivo subido anteriormente se elimina, de tal manera que siempre exitira solo una configuracion para cada emrpesa
                    if (is_object($dbConfTimbrado))
                    {
                        $cArchivoKeyAnterior = $cDirectorioConfiguracionTimbrado . $dbConfTimbrado->cArchivoKey;
                        if (!empty($dbConfTimbrado->cArchivoKey) && @file_exists($cArchivoKeyAnterior))
                        {
                            unlink($cArchivoKeyAnterior);
                        }
                    }

                    if (@file_exists($cArchivoKeyTemporal))
                    {
                        unlink($cArchivoKeyTemporal);
                    }
                }
            }
        }
    }
    
    /**
     * Metodo de cancelación del timbrado
     */
    public function cancelarTimbrado()
    {
        $aResponse = array("success" => false, "failure" => true, "noLogin" => false, "data" => array());
        try {
            
            $oConfTimbrado = new ConfiguracionTimbrado_ViewModel();
            $oConfTimbrado->idConfiguracionTimbrado = $this->input->post('idConfiguracionTimbrado', true);
            $oConfTimbrado->idEmpresa = $this->input->post('idEmpresa', true);

            $dbEmpresa = $this->Empresa_model->find(array(
                "idEmpresa" => $oConfTimbrado->idEmpresa, "bBorradoLogico" => NO
            ));

            if (is_object($dbEmpresa)) 
            {
                $dbConfTimbrado = $this->ConfiguracionTimbrado_model->find(array(
                    "idConfiguracionTimbrado" => $oConfTimbrado->idConfiguracionTimbrado
                ));

                if (is_object($dbConfTimbrado)) 
                {
                    $bBorrado = $this->ConfiguracionTimbrado_model->remove($dbConfTimbrado->idConfiguracionTimbrado);
                    
                    if($bBorrado)
                    {
                        $this->_borrarArchivosCancelacionTimbrado($dbConfTimbrado);
                    }

                    $this->message->addExito(lang("empresas_evento_cancelar_timbrado"));
                    $this->session->set_flashdata('_MESSAGES', json_encode($this->message->toJsonObject()));
                    $this->seguridad->setBitacora($this->cModulo, $this->cAccion, lang("empresas_bitacora_evento_cancelar_timbrado"), array(UsuarioHelper::get('cNombreCompleto'), $dbEmpresa->cNombre));

                    $aResponse["success"] = true;
                    $aResponse["failure"] = false;
                } else 
                {
                    $this->message->addError(lang("empresas_timbrado_no_encontrado"));
                }
            } 
            else 
            {
                $this->message->addError(lang("error_empresa_no_encontrada"));
            }
        } catch (Exception $exc) {
            //guardar en bitacora error 
            $this->message->clearMessages();
            $this->message->addError(lang("general_error"));
            $this->seguridad->rollbackTransaction();
            $this->seguridad->setExeption($this->cModulo, $this->cAccion, $exc, FALSE);
        }

        $aResponse["data"]["messages"] = $this->message->toJsonObject();
        echo json_encode($aResponse);
    }
    
    /**
     * Metodo privado que se encarga de borrar los archivos .cer y .key al momento de cancelar el timbrado
     * @access private
     * @param object $oConfTimbrado Objecto con los datos del timbrado
     *      [cArchivoCer] => Archivo .cer a eliminar
     *      [cArchivoKey] => Archivo .Key a eliminar
     * @return void No retorna valor
     */
    private function _borrarArchivosCancelacionTimbrado($oConfTimbrado)
    {
        if (!empty($oConfTimbrado->cArchivoCer) && !empty($oConfTimbrado->cArchivoKey))
        {
            // validamos si existe el archivo en la carpeta del timbrado de la emrpesa
            $cArchivoCer = getDocumentRoot() . DIRECTORIO_ARCHIVOS . DIRECTORIO_EMPRESAS . $oConfTimbrado->idEmpresa . DIRECTORIO_SEPARADOR . DIRECTORIO_CONFIGURACION_TIMBRADO . $oConfTimbrado->cArchivoCer;
            $cArchivoKey = getDocumentRoot() . DIRECTORIO_ARCHIVOS . DIRECTORIO_EMPRESAS . $oConfTimbrado->idEmpresa . DIRECTORIO_SEPARADOR . DIRECTORIO_CONFIGURACION_TIMBRADO . $oConfTimbrado->cArchivoKey;

            if (@file_exists($cArchivoCer) && @file_exists($cArchivoKey))
            {
                unlink($cArchivoCer);
                unlink($cArchivoKey);
            }
        }
    }

    // </editor-fold>
        
    // <editor-fold defaultstate="collapsed" desc="Metodos Privados">

    /**
     * Metodo que se encarga de validar la forma de captura cuendo se agrega o edita un registro, es mandado llamar desde las funciones
     * de agregar o actualizar retorna un valor boolean si el usuario ingresa todos los campos requeridos o false si hay un error
     * 
     * @access private
     * @link http://giro.com.mx/?page_id=72 Ejemplos de curp validas para la validación
     * @return boolean $bValidation retorna true si pasa las reglas de validacion
     */
    private function _validarForma()
    {
        $this->load->library("form_validation");
        $this->form_validation->set_rules("cCodigo", lang("empresas_codigo"), "trim|required|alpha_numeric_underscore|max_length[10]|is_unique_no_delete[tcempresas.cCodigo.idEmpresa.uppercase]|mb_strtoupper");
        $this->form_validation->set_rules("cNombre", lang("empresas_nombre"), "trim|required|max_length[255]|is_unique_no_delete[tcempresas.cNombre.idEmpresa]");
        $this->form_validation->set_rules("cRazonSocial", lang("empresas_razon_social"), "trim|required|max_length[255]|is_unique_no_delete[tcempresas.cRazonSocial.idEmpresa.uppercase]|mb_strtoupper");
        $this->form_validation->set_rules("cGiro", lang("empresas_giro"), "trim|max_length[45]");
        $this->form_validation->set_rules("cRFC", lang("empresas_rfc"), "trim|required|validate_format_rfc_moral|max_length[14]|is_unique_no_delete[tcempresas.cRFC.idEmpresa.uppercase]|mb_strtoupper");
        $this->form_validation->set_rules("cCurp", lang("empresas_curp"), "trim|max_length[24]|validate_curp|is_unique_no_delete[tcempresas.cCurp.idEmpresa.uppercase]|mb_strtoupper");
        $this->form_validation->set_rules("cInfonavit", lang("empresas_infonavit"), "trim|max_length[45]|is_unique_no_delete[tcempresas.cInfonavit.idEmpresa]");
        $this->form_validation->set_rules("cRepresentanteLegal", lang("empresas_representante_legal"), "trim|max_length[255]");
        
        $this->form_validation->set_rules("cCalle", lang("empresas_calle"), "trim|required|max_length[255]");
        $this->form_validation->set_rules("cNumeroInterior", lang("empresas_numero_interior"), "trim|max_length[45]");
        $this->form_validation->set_rules("cNumeroExterior", lang("empresas_numero_exterior"), "trim|required|max_length[15]");
        $this->form_validation->set_rules("idPais", lang("empresas_pais"), "trim|required|max_length[255]");
        $this->form_validation->set_rules("idEstado", lang("empresas_estado"), "trim|required|is_natural_no_zero");
        $this->form_validation->set_rules("idCiudad", lang("empresas_ciudad"), "trim|required|is_natural_no_zero");
        $this->form_validation->set_rules("idColonia", lang("empresas_colonia"), "trim|required|is_natural_no_zero");
        $this->form_validation->set_rules("cCodigoPostal", lang("empresas_codigo_postal"), "trim|min_length[5]|max_length[5]|is_natural_no_zero");
        $this->form_validation->set_rules("cTelefono", lang("empresas_telefono"), "trim|is_natural_no_zero|max_length[15]");
        $this->form_validation->set_rules("cFax", lang("empresas_fax"), "trim|is_natural_no_zero|max_length[15]");
        $this->form_validation->set_rules("cNotas", lang("empresas_notas"), "trim|max_length[255]");

        $bValidacion = $this->form_validation->run();
        if (!$bValidacion)
        {
            $aErrores = $this->form_validation->getErrores();
            $this->message->addErrors($aErrores);
        }
        return $bValidacion;
    }
    
    
    private function _validarFormaTimbrado()
    {
        $this->load->library("form_validation");
        $this->form_validation->set_rules("idEmpresa", lang("empresas_id"), "trim|required|is_natural_no_zero");
        $this->form_validation->set_rules("cRazonSocial", lang("empresas_razon_social"), "trim|required|max_length[255]|is_unique_no_delete[tcempresas.cRazonSocial.idEmpresa.uppercase]|mb_strtoupper");
        $this->form_validation->set_rules("cRFC", lang("empresas_rfc"), "trim|required|validate_format_rfc_moral|max_length[14]|is_unique_no_delete[tcempresas.cRFC.idEmpresa.uppercase]|mb_strtoupper");
        $this->form_validation->set_rules("cRepresentanteLegal", lang("empresas_representante_legal"), "trim|max_length[255]");
        
        $this->form_validation->set_rules("cCalle", lang("empresas_calle"), "trim|required|max_length[255]");
        $this->form_validation->set_rules("cNumeroInterior", lang("empresas_numero_interior"), "trim|max_length[45]");
        $this->form_validation->set_rules("cNumeroExterior", lang("empresas_numero_exterior"), "trim|required|max_length[15]");
        $this->form_validation->set_rules("idPais", lang("empresas_pais"), "trim|required|max_length[255]");
        $this->form_validation->set_rules("idEstado", lang("empresas_estado"), "trim|required|is_natural_no_zero");
        $this->form_validation->set_rules("idCiudad", lang("empresas_ciudad"), "trim|required|is_natural_no_zero");
        $this->form_validation->set_rules("idColonia", lang("empresas_colonia"), "trim|required|is_natural_no_zero");
        
        $this->form_validation->set_rules("cArchivoCer", lang("empresas_archivo_cer"), "trim|callback_validate_is_required_cer|callback_validate_cer_key_match|max_length[255]");
        $this->form_validation->set_rules("cArchivoKey", lang("empresas_archivo_key"), "trim|max_length[45]|callback_validate_is_required_key");
        $this->form_validation->set_rules("cContrasena", lang("empresas_timbrado_contrasena"), "trim|max_length[45]|callback_validate_is_required_contrasena");
        $this->form_validation->set_rules("cNombreFirmante", lang("empresas_timbrado_firmante"), "trim|max_length[255]");
        
        $this->form_validation->set_message('validate_cer_key_match', lang('validate_cer_key_match'));
        $this->form_validation->set_message('validate_is_required_cer', lang('validate_is_required_cer'));
        $this->form_validation->set_message('validate_is_required_key', lang('validate_is_required_key'));
        $this->form_validation->set_message('validate_is_required_contrasena', lang('validate_is_required_contrasena'));
        
        $bValidacion = $this->form_validation->run();
        if (!$bValidacion)
        {
            $aErrores = $this->form_validation->getErrores();
            $this->message->addErrors($aErrores);
        }
        return $bValidacion;
    }
    
    /**
     * Metodo que se encarga de validar si un archivo .CER y .KEY sean pareja.
     * 
     * @param string $cArchivoCer valor del campo del formulario
     * @param string $cArchivoKey valor del campo del formulario
     * @param string $cContrasena valor del campo del formulario
     * @return boolean
     */
    public function validate_cer_key_match($str)
    {
        // Nueva configuración 
        if (($this->input->post('idConfiguracionTimbrado') == FALSE) 
                && (!$this->input->post('cArchivoCer') 
                || !$this->input->post('cArchivoKey')))
        {
            return FALSE;
        }
        
        if (($this->input->post('idConfiguracionTimbrado')) 
                && ($this->input->post('cArchivoCer') 
                && !$this->input->post('cArchivoKey')))
        {
            return FALSE;
        }
        
        if (($this->input->post('idConfiguracionTimbrado')) 
                && ($this->input->post('cArchivoKey') 
                        && !$this->input->post('cArchivoCer')))
        {
            return FALSE;
        }
        
        //Se valida que los dos campos vengan para realizar la validacion en nuevo y editar
        if ($this->input->post('cArchivoCer') && $this->input->post('cArchivoKey'))
        {
            $cArchivoCer = getDocumentRoot() . DIRECTORIO_TEMPORAL . $this->input->post('cArchivoCer');

            // se valida que exista el directorio en temporal
            if (!@file_exists($cArchivoCer))
            {
                return FALSE;
            }

            // se valida que el archivo key este en temporal listo para ser usado
            $cArchivoKey = getDocumentRoot() . DIRECTORIO_TEMPORAL . $this->input->post('cArchivoKey');
            if (!@file_exists($cArchivoKey))
            {
                return FALSE;
            }

            // se ejecutan los comandos de openssl para recuperar el modulus del archivo .cer
            $cCmdCer = "openssl x509 -inform DER -in {$cArchivoCer} -noout -modulus";
            $rCmdCer = exec($cCmdCer);
            if ($rCmdCer == null)
            {
                return FALSE;
            }

            // se recupera el modulos del archivo .cer
            $cModulusCer = end(explode("=", $rCmdCer));

            // validamos que venga la contraseña del archivo .key
            $cContrasena = $this->input->post('cContrasena');
            if (!$cContrasena)
            {
                return FALSE;
            }

            // generamos un archivo temporal para recuperar el modulus del archivo . key
            $cLlavePrivada = getDocumentRoot() . DIRECTORIO_TEMPORAL . "llaveprivada-" . time() . ".key";
            $cCmdKey = "openssl pkcs8 -inform DER -in {$cArchivoKey} -passin pass:{$cContrasena} -out {$cLlavePrivada}";
            exec($cCmdKey);

            // recuperamos el modulus del archivo .key
            $cCmdKey = "openssl rsa -in {$cLlavePrivada} -noout -modulus";
            $rCmdKey = exec($cCmdKey);
            if ($rCmdKey == null)
            {
                return FALSE;
            }

            $cModulusKey = end(explode("=", $rCmdKey));
            unlink($cLlavePrivada);

            // devolvemos la validacion
            return ($cModulusCer == $cModulusKey);
        }
        
        return TRUE;
    }
    
    /**
     * Metodo que valida si el campo archivo cer sera requerido
     * @return type
     */
    public function validate_is_required_cer()
    {
        return (!$this->input->post("idConfiguracionTimbrado") && !$this->input->post("cArchivoCer")) ? false : true;
    }
    
    /**
     * Metodo que valida si el campo archivo cer sera requerido
     * @return type
     */
    public function validate_is_required_key()
    {
        return (!$this->input->post("idConfiguracionTimbrado") && !$this->input->post("cArchivoKey")) ? false : true;
    }
    
    /**
     * Metodo que valida si el campo archivo cer sera requerido
     * @return type
     */
    public function validate_is_required_contrasena()
    {
        return (!$this->input->post("idConfiguracionTimbrado") && !$this->input->post("cContrasena")) ? false : true;
    }
    
    /**
     * Metodo que se encarga de devolver un array de datos necesarios para cargar la información en la forma de captura de empresas,
     * recibe como parametro el objeto viewmodel de empresas encaso de ser una edición para cargar la información relacionada a dicho registro
     * 
     * @access private
     * @param object $oEmpresa Objeto ViewModel en caso de ser una edición este objeto contiene los datos de la empresa seleccionada de lo contrario 
     *        contendra el objeto vacio
     * @return array Retorna un array con la información necesaria en la forma de captura
     */
    private function _getCombosForma($oEmpresa)
    {
        $aCombosForma = array(
            "paises" => array()
            , "estados" => array("" => lang("general_seleccionar"))
            , "ciudades" => array("" => lang("general_seleccionar"))
            , "colonias" => array("" => lang("general_seleccionar"))
        );
       
        $aCombosForma["paises"] = getComboForma("idPais", "cNombre", $this->Pais_model->findAll(array(
                    "bHabilitado" => SI
        )));
        
        if($oEmpresa->idEmpresa && $oEmpresa->idPais)
        {
            $aCombosForma["estados"] = getComboForma("idEstado", "cNombre",  $this->Estado_model->findAll(array(
                "bHabilitado" => SI
                , "idPais" => $oEmpresa->idPais
            )));
        }
        
        if($oEmpresa->idEmpresa && $oEmpresa->idEstado)
        {
            $aCombosForma["ciudades"] = getComboForma("idCiudad", "cNombre", $this->Ciudad_model->findAll(array(
                "bHabilitado" => SI
                , "idEstado" => $oEmpresa->idEstado
            )));
        }
        
        if($oEmpresa->idEmpresa && $oEmpresa->idCiudad)
        {
            $aCombosForma["colonias"] = getComboForma("idColonia", "cNombre", $this->Colonia_model->findAll(array(
                "bHabilitado" => SI
                , "idCiudad" => $oEmpresa->idCiudad
            )));
        }
        
        return $aCombosForma;
    }
    
    /**
     * Metodo que se encarga de devolver un array de datos necesarios para cargar la información en la forma de captura de empresas,
     * recibe como parametro el objeto viewmodel de empresas encaso de ser una edición para cargar la información relacionada a dicho registro
     * 
     * @access private
     * @param object $oEmpresa Objeto ViewModel en caso de ser una edición este objeto contiene los datos de la empresa seleccionada de lo contrario 
     *        contendra el objeto vacio
     * @return array Retorna un array con la información necesaria en la forma de captura
     */
    private function _getCombosFormaTimbrado($oConfTimbrado)
    {
        $aCombosForma = array(
            "paises" => array()
            , "estados" => array("" => lang("general_seleccionar"))
            , "ciudades" => array("" => lang("general_seleccionar"))
            , "colonias" => array("" => lang("general_seleccionar"))
        );
       
        $aCombosForma["paises"] = getComboForma("idPais", "cNombre", $this->Pais_model->findAll(array(
                    "bHabilitado" => SI
        )));
        
        if($oConfTimbrado->idEmpresa && $oConfTimbrado->idPais)
        {
            $aCombosForma["estados"] = getComboForma("idEstado", "cNombre",  $this->Estado_model->findAll(array(
                "bHabilitado" => SI
                , "idPais" => $oConfTimbrado->idPais
            )));
        }
        
        if($oConfTimbrado->idEmpresa && $oConfTimbrado->idEstado)
        {
            $aCombosForma["ciudades"] = getComboForma("idCiudad", "cNombre", $this->Ciudad_model->findAll(array(
                "bHabilitado" => SI
                , "idEstado" => $oConfTimbrado->idEstado
            )));
        }
        
        if($oConfTimbrado->idEmpresa && $oConfTimbrado->idCiudad)
        {
            $aCombosForma["colonias"] = getComboForma("idColonia", "cNombre", $this->Colonia_model->findAll(array(
                "bHabilitado" => SI
                , "idCiudad" => $oConfTimbrado->idCiudad
            )));
        }
        
        return $aCombosForma;
    }
    
    /**
     * Metodo que se encarga de preparar los datos de la empresa para ser guardados en la base de datos,
     * combierte el codigo, rfc y curp en mayusculas
     * 
     * @access private
     * @param object view model $oEmpresa
     * @return object view model
     */
    private function _prepararMayusculas($oEmpresa)
    {
        $oEmpresa->cCodigo = mb_strtoupper(trim($oEmpresa->cCodigo), 'UTF-8');
        $oEmpresa->cRFC = mb_strtoupper(trim($oEmpresa->cRFC), 'UTF-8');
        $oEmpresa->cCurp = mb_strtoupper(trim($oEmpresa->cCurp), 'UTF-8');
        $oEmpresa->cRazonSocial = mb_strtoupper(trim($oEmpresa->cRazonSocial), 'UTF-8');
        
        return $oEmpresa;
    }

    // </editor-fold>
}
