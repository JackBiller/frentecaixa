<?php

class Item{

	private $id_item;
	private $descricao_item;
	private $grupo_id;
	private $data_atualizacao_item;
	private $usuario_id;
	private $bool_ativo_item;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>