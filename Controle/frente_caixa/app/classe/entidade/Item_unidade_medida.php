<?php

class Item_unidade_medida{

	private $id_item_unidade_medida;
	private $quantidade_item_unidade_medida;
	private $item_id;
	private $unidade_medida_id;
	private $data_atualizacao_item_unidade_medida;
	private $usuario_id;
	private $bool_ativo_item_unidade_medida;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>