<?php

class Unidade_medida{

	private $id_unidade_medida;
	private $descricao_unidade_medida;
	private $sigla_unidade_medida;
	private $data_atualizacao_unidade_medida;
	private $usuario_id;
	private $bool_ativo_unidade_medida;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>