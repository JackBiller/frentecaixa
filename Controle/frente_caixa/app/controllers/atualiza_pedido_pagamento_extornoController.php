<?php 
	require_once "../classe/entidade/Pedido_pagamento_extorno.php";
	require_once "../classe/dao/pedido_pagamento_extornoDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadePedido_pagamento_extorno = new Pedido_pagamento_extorno();
		$pedido_pagamento_extornoDAO = new pedido_pagamento_extornoDAO();
		
		$entidadePedido_pagamento_extorno->set($_POST['motivo_pedido_pagamento_extorno'], 'motivo_pedido_pagamento_extorno');

		$pedido_pagamento_id = $_POST['pedido_pagamento_id'] == '' ? 0 : $_POST['pedido_pagamento_id'];
		$entidadePedido_pagamento_extorno->set($pedido_pagamento_id, 'pedido_pagamento_id');

		$entidadePedido_pagamento_extorno->set($_POST['data_atualizacao_pedido_pagamento_extorno'], 'data_atualizacao_pedido_pagamento_extorno');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadePedido_pagamento_extorno->set($usuario_id, 'usuario_id');


		$bool_ativo_pedido_pagamento_extorno = $_POST['bool_ativo_pedido_pagamento_extorno'] == '' ? 0 : $_POST['bool_ativo_pedido_pagamento_extorno'];
		$entidadePedido_pagamento_extorno->set($bool_ativo_pedido_pagamento_extorno, 'bool_ativo_pedido_pagamento_extorno');


		$retorno = $pedido_pagamento_extornoDAO->atualizaPedido_pagamento_extorno($entidadePedido_pagamento_extorno, $_POST['id_pedido_pagamento_extorno'], $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>