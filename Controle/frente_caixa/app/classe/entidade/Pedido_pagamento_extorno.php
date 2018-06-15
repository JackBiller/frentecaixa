<?php

class Pedido_pagamento_extorno{

	private $id_pedido_pagamento_extorno;
	private $motivo_pedido_pagamento_extorno;
	private $pedido_pagamento_id;
	private $data_atualizacao_pedido_pagamento_extorno;
	private $usuario_id;
	private $bool_ativo_pedido_pagamento_extorno;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>