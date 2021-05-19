<?php

/**
 * getDocumentRoot
 * 
 * Funcion que se encarga de recuperar la carpeta del proyecto
 */
if (!function_exists("getDocumentRoot"))
{

    function getDocumentRoot()
    {
        return str_replace("\\", "/", getcwd() . "/");
    }

}

if (!function_exists("getRutaImagen"))
{

    function getRutaImagen($cRuta)
    {
        $cPathImagen = "";
        $cPath = getDocumentRoot() . $cRuta;
        if (@file_exists($cPath))
        {
            $cPathImagen = base_url() . $cRuta;
        }
        else
        {
            $cPathImagen = getRutaImagenDefault();
        }
        return $cPathImagen;
    }

}

if (!function_exists("getRutaImagenDefault"))
{

    function getRutaImagenDefault()
    {

        return base_url() . DIRECTORIO_IMAGENES_ICON . ICON_IMAGEN_NO_ENCONTRADA;
    }

}

if (!function_exists("showMessages"))
{

    function showMessages()
    {
        $CI = &get_instance();
        if ($CI->session->flashdata('_MESSAGES'))
        {
            echo $CI->session->flashdata('_MESSAGES');
        }
        else
        {
            echo "\"null\"";
        }
    }

}

if (!function_exists("getController"))
{

    function getController()
    {
        $CI = &get_instance();
        return $CI->uri->segment(1);
    }

}

if (!function_exists("getAccion"))
{

    function getAccion()
    {
        $CI = &get_instance();
        return $CI->uri->segment(2);
    }

}

if (!function_exists("getModulo"))
{

    function getModulo($cItem = "")
    {
        $cValor = "";
        $CI = &get_instance();
        $oModulo = ($CI->session->userdata("_MODULO")) ? $CI->session->userdata("_MODULO") : NULL;
        if (!empty($cItem))
        {
            if (isset($oModulo->$cItem))
            {
                $cValor = $oModulo->$cItem;
            }
            return $cValor;
        }
        return $oModulo;
    }

}


if (!function_exists("getComboForma"))
{

    function getComboForma($key, $valor, $aCombo, $bArray = FALSE, $bAgregarDefault = TRUE)
    {
        $aReturn = array();
        foreach ($aCombo as $value)
        {
            if ($bArray)
            {
                if(is_array($valor))
                {
                    $cMostrar = "";
                    $iConta = count($valor);
                    for ($i = 0; $i < $iConta; $i++)
                    {
                        if (isset($value[$key]) && isset($value[$valor[$i]]))
                        {
                            $cMostrar .= $value[$valor[$i]];
                            
                            if($i < $iConta - 1)
                            {
                                $cMostrar .= " - ";
                            }
                        }
                    }
                    
                    $aReturn[$value[$key]] = $cMostrar;
                }
                else
                {
                    if (isset($value[$key]) && isset($value[$valor]))
                    {
                        $aReturn[$value[$key]] = $value[$valor];
                    }
                }
            }
            else
            {
                if(is_array($valor))
                {
                    $cMostrar = "";
                    $iConta = count($valor);
                    for ($i = 0; $i < $iConta; $i++)
                    {
                        if (isset($value->$key) && isset($value->$valor[$i]))
                        {
                            $cMostrar .= $value->$valor[$i];
                            
                            if($i < $iConta -1)
                            {
                                $cMostrar .= " - ";
                            }
                        }
                    }
                    
                    $aReturn[$value->$key] = $cMostrar;
                }
                else
                {
                    if (isset($value->$key) && isset($value->$valor))
                    {
                        $aReturn[$value->$key] = $value->$valor;
                    }
                }
            }
        }
        
        if($bAgregarDefault)
        {
            $aReturn = array("" => lang("general_seleccionar")) + $aReturn;
        }
        
        return $aReturn;
    }

}

if (!function_exists("getComboMultiSelect"))
{

    function getComboMultiSelect($key, $valor, $aCombo, $bArray = FALSE)
    {
        $aOptions = array();
        foreach ($aCombo as $value)
        {
            if ($bArray)
            {
                if (isset($value[$key]) && isset($value[$valor]))
                {
                    $aOptions[] = array("ID" => $value[$key], "Text" => $value[$valor]);
                }
            }
            else
            {
                if (isset($value->$key) && isset($value->$valor))
                {
                    $aOptions[] = array("ID" => $value->$key, "Text" => $value->$valor);
                }
            }
        }

        return $aOptions;
    }

}

if (!function_exists("getArrayCombo"))
{

    function getComboArray($aCombo)
    {
        $aReturn = array();
        $aReturn = array("" => lang("general_seleccionar")) + $aCombo;
        return $aReturn;
    }

}

if (!function_exists('stringRemplace'))
{

    function stringRemplace($cString = "", $aParametros = array())
    {
        $l = count($aParametros);
        $replaceText = array();
        for ($i = 0; $i < $l; $i++)
        {
            $replaceText[] = '{' . $i . '}';
        }
        $cString = str_replace($replaceText, $aParametros, $cString);

        $cString = vsprintf($cString, $aParametros);
        return $cString;
    }

}


if (!function_exists("hexToDecColor"))
{

    function hexToDecColor($color)
    {
        $result = str_split($color, 2);
        foreach ($result as $key => $col)
        {
            $result[$key] = hexdec($col);
        }
        return $result;
    }

}

if (!function_exists("isEnviromentDevelopment"))
{

    function isEnviromentDevelopment()
    {
        return ((ENVIRONMENT === "development") || (ENVIRONMENT === "testing"));
    }

}

if (!function_exists("getHorasDiferencia"))
{

    function getHorasDiferencia($inicio, $fin)
    {
        return date("H:i:s", (strtotime("00:00:00") + strtotime($fin) - strtotime($inicio)));
    }
    
}
