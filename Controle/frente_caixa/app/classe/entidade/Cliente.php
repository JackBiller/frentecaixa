<?php

class Cliente{

	private $id_cliente;
	private $nome_cliente;
	private $data_atualizacao_cliente;
	private $usuario_id;
	private $bool_ativo_cliente;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>