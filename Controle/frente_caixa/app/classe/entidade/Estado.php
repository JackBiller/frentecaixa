<?php

class Estado{

	private $id_estado;
	private $descricao_estado;
	private $sigla_estado;
	private $data_atualizacao_estado;
	private $usuario_id;
	private $bool_ativo_estado;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>