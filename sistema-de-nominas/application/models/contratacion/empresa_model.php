<?php

/*
 * Empresa
 * 
 * Clase que se encarga de abstraer la informacion de la tabla de empresas
 * 
 * @package models
 * @author Gustavo Avila Medina <gussjq@gmail.com> cel : <8187789518>
 * @creado 11-02-2015
 */

class Empresa_model extends MY_Model {

    public function __construct()
    {
        parent::__construct();
        $this->loadTable("tcempresas");
    }

    /**
     * Metodo que se encarga de retornar un array de datos de Empresa, de acuerdo al criterio de filtrado
     * puede retornar un array de objectos o un array de arrays 
     * 
     * @access public
     * @param object viewmodel $oEmpresa
     * @param booelan $bArray para especificar el tipo de retorno true array false object
     * @return array $aResult informacion de la tabla
     */
    public function getAll($oEmpresa, $bArray = false)
    {
        $this->db->select("e.*", FALSE);
        $this->db->select("ct.idConfiguracionTimbrado", FALSE);
        $this->db->from("tcempresas AS e");
        $this->db->join("tcconfiguraciontimbrado AS ct", "e.idEmpresa = ct.idEmpresa", "left");
        $this->db->where("e.bBorradoLogico", NO);

        // filtros por Email
        if ($oEmpresa->idEmpresa)
        {
            $this->db->where("e.idEmpresa", $oEmpresa->idEmpresa);
        }
        
        if ($oEmpresa->cCodigo)
        {
            $this->db->like("e.cCodigo", $oEmpresa->cCodigo);
        }
        
        if ($oEmpresa->cNombre)
        {
            $this->db->like("e.cNombre", $oEmpresa->cNombre);
        }
        
        if ($oEmpresa->cRazonSocial)
        {
            $this->db->like("e.cRazonSocial", $oEmpresa->cRazonSocial);
        }
        
        if ($oEmpresa->cGiro)
        {
            $this->db->like("e.cGiro", $oEmpresa->cGiro);
        }
        
        if ($oEmpresa->cRFC)
        {
            $this->db->like("e.cRFC", $oEmpresa->cRFC);
        }
        
        if ($oEmpresa->cCurp)
        {
            $this->db->like("e.cCurp", $oEmpresa->cCurp);
        }
        
        if ($oEmpresa->cRepresentanteLegal)
        {
            $this->db->where("e.cRepresentanteLegal", $oEmpresa->cRepresentanteLegal);
        }
        
        if ($oEmpresa->cInfonavit)
        {
            $this->db->like("e.cInfonavit", $oEmpresa->cInfonavit);
        }
        
        if ($oEmpresa->cSTPS)
        {
            $this->db->like("e.cSTPS", $oEmpresa->cSTPS);
        }
        
        if ($oEmpresa->cRepresentanteSTPS)
        {
            $this->db->like("e.cRepresentanteSTPS", $oEmpresa->cRepresentanteSTPS);
        }
        
        if ($oEmpresa->cRepresentanteEmpleadosSTPS)
        {
            $this->db->like("e.cRepresentanteEmpleadosSTPS", $oEmpresa->cRepresentanteEmpleadosSTPS);
        }
        
        if ($oEmpresa->cCalle)
        {
            $this->db->like("e.cCalle", $oEmpresa->cCalle);
        }
        
        if ($oEmpresa->cNumeroInterior)
        {
            $this->db->like("e.cNumeroInterior", $oEmpresa->cNumeroInterior);
        }
        
        if ($oEmpresa->cNumeroExterior)
        {
            $this->db->like("e.cNumeroExterior", $oEmpresa->cNumeroExterior);
        }
        
        
        if ($oEmpresa->idPais)
        {
            $this->db->where("e.idPais", $oEmpresa->idPais);
        }
        
        if ($oEmpresa->idEstado)
        {
            $this->db->where("e.idEstado", $oEmpresa->idEstado);
        }
        
        if ($oEmpresa->idCiudad)
        {
            $this->db->where("e.idCiudad", $oEmpresa->idCiudad);
        }
        
        if ($oEmpresa->idColonia)
        {
            $this->db->where("e.idColonia", $oEmpresa->idColonia);
        }
        
        if ($oEmpresa->cCodigoPostal)
        {
            $this->db->like("e.cCodigoPostal", $oEmpresa->cCodigoPostal);
        }
        
        if ($oEmpresa->cTelefono)
        {
            $this->db->like("e.cTelefono", $oEmpresa->cTelefono);
        }
        
        if ($oEmpresa->cFax)
        {
            $this->db->like("e.cFax", $oEmpresa->cFax);
        }
        
        if ($oEmpresa->cNotas)
        {
            $this->db->like("e.cNotas", $oEmpresa->cNotas);
        }
        
        if ($oEmpresa->bHabilitado)
        {
            $this->db->where("e.bHabilitado", $oEmpresa->bHabilitado);
        }


        //filtros generales
        if ($oEmpresa->limit && $oEmpresa->offset)
        {
            $this->db->limit($oEmpresa->limit, $oEmpresa->offset);
        }
        else
        {
            if ($oEmpresa->limit)
            {
                $this->db->limit($oEmpresa->limit);
            }
        }

        if ($oEmpresa->sortBy && $oEmpresa->order)
        {
            $this->db->order_by($oEmpresa->order . ' ' . $oEmpresa->sortBy);
        }

        if (is_array($oEmpresa->not) && count($oEmpresa->not) > 0)
        {
            foreach ($oEmpresa->not as $key => $value)
            {
                $this->db->where_not_in($key, $value);
            }
        }

        if ($oEmpresa->count)
        {
            return $this->db->count_all_results();
        }

        $query = $this->db->get();
        debug($oEmpresa);
        $aResult = array();
        if (!$this->db->_error_message())
        {
            if ($query->num_rows() > 0)
            {
                $aResult = ($bArray) ? $query->result_array() : $query->result();
            }
        }
        return $aResult;
    }

    /**
     * Metodo que se encarga de retornar un unico registro, de acuerdo al criterio de filtrado,
     * puede retornar un objeto o un array de datos
     * 
     * @access public
     * @param object viewmodel $oEmpresa
     * @param booelan $bArray para especificar el tipo de retorno true array false object
     * @return array $aResult informacion de la tabla
     */
    public function get($oEmpresa, $bArray = FALSE)
    {
        $aData = $this->getAll($oEmpresa, $bArray);
        if (is_numeric($aData))
        {
            return $aData;
        }
        return (count($aData) > 0) ? $aData[0] : array();
    }
}
