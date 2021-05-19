<?php
/**
 * Empresa_ViewModdel
 * 
 * Clase que interactua como una capa intermedia entre el modelo y la vista,
 * donde se encarga de pasar un objeto con los datos o información requerida entre estas dos capas, este objeto contiene
 * todos los atributos necesarios ya sea para mostrar información en una forma (Vista) o para agregar o actualizar información
 * en una tabla de la base de datos (Modelo), de esta manera se asegura que siempre cada proceso contara con lo necesario
 * para realizar su función 
 * 
 * @package ViewModels
 * @created 11-03-2015
 * @author Gustavo Avila Medina <gussjq@codingtek.com.mx> cel <8187789518>
 */
require_once('Reportes_ViewModel.php');
class Empresa_ViewModel extends Reportes_ViewModel {

    /** @var int Identificador unico de la empresa a nivel base de datos (llave primaria), campo requerido para agregar o actualizar */
    public $idEmpresa;
    
    /** @var string Codigo asiganado a la empresa para ser identificado por el usuario debe ser unico, campo requerido para agregar o actualizar */
    public $cCodigo;
    
    /** @var string Nombre de la empresa debe ser unico, tamaño de 255 caracteres, campo requerido para agregar o actualizar  */
    public $cNombre;
    
    /** @var string Razon social es la denominación por la cual se conoce colectivamente a una empresa, debe de ser unico, campo requerido para agregar o actualizar, campo con 255 caracteres de largo   */
    public $cRazonSocial;
    
    /** @var string Giro o actividad a la que se dedica la empresa, campo de 45 caracteres de largo */
    public $cGiro;
    
    /** @var string Registro Federal de Contribuyentes (RFC) es una clave que requiere toda persona física o moral en México para realizar cualquier actividad económica lícita por la que esté obligada a pagar impuestos, Campo requerido 45 caracteres.  */
    public $cRFC;
    
    /** @var string La Clave Única de Registro de Población (CURP) es un código alfanumérico único de identidad de 18 caracteres utilizado para identificar oficialmente tanto a residentes como a ciudadanos mexicanos de todo el país, campo con 45 caracteres de largo  */
    public $cCurp;
    
    /** @var string Infonavit campo con 45 caracteres de largo */
    public $cInfonavit;
    
    /** @var string Persona que actua en nombre de la empresa y es reconosido asi ante la ley, 255 caracteres de largo el campo es requerido para el timbrado  */
    public $cRepresentanteLegal;
    
    /** @var string Numero de la empresa ante la Secretaria del trabajo y prevencion social, campo con 45 caracteres de largo  */
    public $cSTPS;
    
    /** @var string Representante de la empresa ante la secretaria del trabajo y prevensión social, campo con 255 caracteres de largo  */
    public $cRepresentanteSTPS;
    
    /** @var string Nombre del representante de los empleados ante la secretaria del trabajo y prevensión social, campo con 255 caracteres de largo  */
    public $cRepresentanteEmpleadosSTPS;
    
    /** @var string Calle en donde se encuentra ubucada la emrpesa, campo con 255 caracteres de largo  */
    public $cCalle;
    
    /** @var string , campo de 45 caracteres de largo  */
    public $cNumeroInterior;
    
    /** @var string Numero exterior del terrono o calle en donde se Numero interior dentro del terreno o edificio en donde se ubica la empresaubica la empresa, campo 45 caracteres de largo  */
    public $cNumeroExterior;
    
    /** @var int Identificador del pais en la cual se encuentra ubicada la empresa  */
    public $idPais;
    
    /** @var int Identificador del estado  en la cual se encuentra ubicada la empresa  */
    public $idEstado;
    
    /** @var int Identificador de la ciudad en la cual se encuentra ubicada la empresa  */
    public $idCiudad;
    
    /** @var int Identificador de la colonia en donde se encuentra ubicada la empresa  */
    public $idColonia;
    
    /** @var string Codigo postal de la empresa, campo con 45 caracteres de largo  */
    public $cCodigoPostal;
    
    /** @var string Telefono de la empresa, campo con 45 caracteres de largo  */
    public $cTelefono;
    
    /** @var string Fax de la empresa, campo con 45 caracteres de largo  */
    public $cFax;
    
    /** @var string Comentarios adicionales, campo con 255 caracteres de largo  */
    public $cNotas;
    
    /** @var boolean Identifica si la empresa esta habilitada en el sistema, campo int(1)  */
    public $bHabilitado;
    
    /** @var boolean Identifica si la empresa a sido borrada (Borrado logico), campo int(1)  */
    public $bBorradoLogico;
    

}
