<?php

class Caixa_operacao{

	private $id_caixa_operacao;
	private $valor_caixa_operacao;
	private $caixa_movimentacao_id;
	private $operacoes_caixa_id;
	private $data_emissao_caixa_operacao;
	private $data_atualizacao_caixa_operacao;
	private $usuario_id;
	private $bool_ativo_caixa_operacao;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>