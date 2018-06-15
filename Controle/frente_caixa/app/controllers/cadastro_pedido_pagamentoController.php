<?php 
	require_once "../classe/entidade/Pedido_pagamento.php";
	require_once "../classe/dao/pedido_pagamentoDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadePedido_pagamento = new Pedido_pagamento();
		$pedido_pagamentoDAO = new pedido_pagamentoDAO();
		

		$parcela_atual_pedido_pagamento = $_POST['parcela_atual_pedido_pagamento'] == '' ? 0 : $_POST['parcela_atual_pedido_pagamento'];
		$entidadePedido_pagamento->set($parcela_atual_pedido_pagamento, 'parcela_atual_pedido_pagamento');


		$parcela_total_pedido_pagamento = $_POST['parcela_total_pedido_pagamento'] == '' ? 0 : $_POST['parcela_total_pedido_pagamento'];
		$entidadePedido_pagamento->set($parcela_total_pedido_pagamento, 'parcela_total_pedido_pagamento');


		$valor_pago_pedido_pagamento = $_POST['valor_pago_pedido_pagamento'] == '' ? 0 : $_POST['valor_pago_pedido_pagamento'];
		$entidadePedido_pagamento->set($valor_pago_pedido_pagamento, 'valor_pago_pedido_pagamento');


		$bool_esta_pago_pedido_pagamento = $_POST['bool_esta_pago_pedido_pagamento'] == '' ? 0 : $_POST['bool_esta_pago_pedido_pagamento'];
		$entidadePedido_pagamento->set($bool_esta_pago_pedido_pagamento, 'bool_esta_pago_pedido_pagamento');


		$pedido_id = $_POST['pedido_id'] == '' ? 0 : $_POST['pedido_id'];
		$entidadePedido_pagamento->set($pedido_id, 'pedido_id');


		$condicao_de_pagamento_id = $_POST['condicao_de_pagamento_id'] == '' ? 0 : $_POST['condicao_de_pagamento_id'];
		$entidadePedido_pagamento->set($condicao_de_pagamento_id, 'condicao_de_pagamento_id');

		$entidadePedido_pagamento->set($_POST['data_atualizacao_pedido_pagamento'], 'data_atualizacao_pedido_pagamento');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadePedido_pagamento->set($usuario_id, 'usuario_id');


		$bool_ativo_pedido_pagamento = $_POST['bool_ativo_pedido_pagamento'] == '' ? 0 : $_POST['bool_ativo_pedido_pagamento'];
		$entidadePedido_pagamento->set($bool_ativo_pedido_pagamento, 'bool_ativo_pedido_pagamento');


		$retorno = $pedido_pagamentoDAO->cadastraPedido_pagamento($entidadePedido_pagamento, $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>