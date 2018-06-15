<?php

class Operacoes_caixa{

	private $id_operacoes_caixa;
	private $descricao_operacoes_caixa;
	private $data_atualizacao_operacoes_caixa;
	private $usuario_id;
	private $bool_ativo_operacoes_caixa;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>