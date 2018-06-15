<?php

class Empresa{

	private $id_empresa;
	private $razao_social_empresa;
	private $data_atualizacao_empresa;
	private $usuario_id;
	private $bool_ativo_empresa;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>