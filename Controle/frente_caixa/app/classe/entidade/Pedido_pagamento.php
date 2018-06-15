<?php

class Pedido_pagamento{

	private $id_pedido_pagamento;
	private $parcela_atual_pedido_pagamento;
	private $parcela_total_pedido_pagamento;
	private $valor_pago_pedido_pagamento;
	private $bool_esta_pago_pedido_pagamento;
	private $pedido_id;
	private $condicao_de_pagamento_id;
	private $data_atualizacao_pedido_pagamento;
	private $usuario_id;
	private $bool_ativo_pedido_pagamento;

	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}
}

?>