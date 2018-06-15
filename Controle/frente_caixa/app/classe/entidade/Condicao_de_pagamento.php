<?php

class Condicao_de_pagamento{

	private $id_condicao_de_pagamento;
	private $descricao_condicao_de_pagamento;
	private $data_atualizacao_condicao_de_pagamento;
	private $usuario_id;
	private $bool_ativo_condicao_de_pagamento;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>