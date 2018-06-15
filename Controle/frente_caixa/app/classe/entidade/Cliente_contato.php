<?php

class Cliente_contato{

	private $id_cliente_contato;
	private $telefone_cliente_contato;
	private $celular_cliente_contato;
	private $email_cliente_contato;
	private $cliente_id;
	private $data_atualizacao_cliente_contato;
	private $usuario_id;
	private $bool_ativo_cliente_contato;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>