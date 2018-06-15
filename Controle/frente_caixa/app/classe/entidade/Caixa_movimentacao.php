<?php

class Caixa_movimentacao{

	private $id_caixa_movimentacao;
	private $valor_abertura_caixa_movimentacao;
	private $valor_fechamento_caixa_movimentacao;
	private $data_abertura_caixa_movimentacao;
	private $data_fechamento_caixa_movimentacao;
	private $caixa_id;
	private $data_atualizacao_caixa_movimentacao;
	private $usuario_id;
	private $bool_ativo_caixa_movimentacao;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>