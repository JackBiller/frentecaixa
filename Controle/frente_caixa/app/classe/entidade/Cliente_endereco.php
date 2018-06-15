<?php

class Cliente_endereco{

	private $id_cliente_endereco;
	private $endereco_cliente_endereco;
	private $numero_cliente_endereco;
	private $complemento_cliente_endereco;
	private $bairro_cliente_endereco;
	private $cidade_cliente_endereco;
	private $estado_id;
	private $cliente_id;
	private $data_atualizacao_cliente_endereco;
	private $usuario_id;
	private $bool_ativo_cliente_endereco;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>