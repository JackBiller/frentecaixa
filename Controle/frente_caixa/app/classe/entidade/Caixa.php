<?php

class Caixa{

	private $id_caixa;
	private $descricao_caixa;
	private $filial_id;
	private $data_atualizacao_caixa;
	private $usuario_id;
	private $bool_ativo_caixa;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>