<?php

class Filial{

	private $id_filial;
	private $razao_social_filial;
	private $cnpj_filial;
	private $empresa_id;
	private $data_atualizacao_filial;
	private $usuario_id;
	private $bool_ativo_filial;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>