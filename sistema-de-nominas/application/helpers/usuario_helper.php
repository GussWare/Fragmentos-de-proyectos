<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

abstract class UsuarioHelper {
    
    public static function get($cItem = "")
    {
        $CI = &get_instance();
        $oUsuario = (isset($_SESSION["_USUARIO"])) ? $_SESSION["_USUARIO"] : NULL;
        $cValor = null;
        if (!empty($cItem))
        {
            if (isset($oUsuario->$cItem))
            {
                $cValor = $oUsuario->$cItem;
            }
            return $cValor;
        }
        return $oUsuario;
    }
    
    public static function set($usuario)
    {
        if(is_object($usuario))
        {
            self::remove();
            $_SESSION["_USUARIO"] = $usuario;
        }
        
        if(is_numeric($usuario))
        {
            $CI = &get_instance();
            $CI->load->model("Sistema/Usuario_model");
            $CI->load->library("ViewModels/Usuario_ViewModel");
            
            $oUsuario = new Usuario_ViewModel();
            $oUsuario->idUsuario = $usuario;
            $dbUsuario = $CI->Usuario_model->get($oUsuario);
            
            self::remove();
            
            $_SESSION["_USUARIO"] = $dbUsuario;
        }
    }
    
    public static function remove()
    {
        if(isset($_SESSION["_USUARIO"])){
            unset($_SESSION["_USUARIO"]);
        }
    }
    
    
}