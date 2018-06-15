<?php

class Grupo{

	private $id_grupo;
	private $descricao_grupo;
	private $imagem_grupo;
	private $filial_id;
	private $data_atualizacao_grupo;
	private $usuario_id;
	private $bool_ativo_grupo;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>