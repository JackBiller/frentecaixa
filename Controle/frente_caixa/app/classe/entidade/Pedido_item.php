<?php

class Pedido_item{

	private $id_pedido_item;
	private $quantidade_pedido_item;
	private $valor_unitario_pedido_item;
	private $valor_total_pedido_item;
	private $item_id;
	private $item_unidade_medida_id;
	private $pedido_id;
	private $data_atualizacao_pedido_item;
	private $usuario_id;
	private $bool_ativo_pedido_item;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>