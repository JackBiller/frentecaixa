<?php

class Pedido{

	private $id_pedido;
	private $documento_pedido;
	private $total_pedido;
	private $emissao_pedido;
	private $cliente_id;
	private $nome_cliente_pedido;
	private $bool_finalizado_pedido;
	private $filial_id;
	private $data_atualizacao_pedido;
	private $usuario_id;
	private $bool_ativo_pedido;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>