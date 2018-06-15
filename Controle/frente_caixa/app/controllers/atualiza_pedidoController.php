<?php 
	require_once "../classe/entidade/Pedido.php";
	require_once "../classe/dao/pedidoDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadePedido = new Pedido();
		$pedidoDAO = new pedidoDAO();
		
		$entidadePedido->set($_POST['documento_pedido'], 'documento_pedido');

		$total_pedido = $_POST['total_pedido'] == '' ? 0 : $_POST['total_pedido'];
		$entidadePedido->set($total_pedido, 'total_pedido');

		$entidadePedido->set($_POST['emissao_pedido'], 'emissao_pedido');

		$cliente_id = $_POST['cliente_id'] == '' ? 0 : $_POST['cliente_id'];
		$entidadePedido->set($cliente_id, 'cliente_id');

		$entidadePedido->set($_POST['nome_cliente_pedido'], 'nome_cliente_pedido');

		$bool_finalizado_pedido = $_POST['bool_finalizado_pedido'] == '' ? 0 : $_POST['bool_finalizado_pedido'];
		$entidadePedido->set($bool_finalizado_pedido, 'bool_finalizado_pedido');


		$filial_id = $_POST['filial_id'] == '' ? 0 : $_POST['filial_id'];
		$entidadePedido->set($filial_id, 'filial_id');

		$entidadePedido->set($_POST['data_atualizacao_pedido'], 'data_atualizacao_pedido');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadePedido->set($usuario_id, 'usuario_id');


		$bool_ativo_pedido = $_POST['bool_ativo_pedido'] == '' ? 0 : $_POST['bool_ativo_pedido'];
		$entidadePedido->set($bool_ativo_pedido, 'bool_ativo_pedido');


		$retorno = $pedidoDAO->atualizaPedido($entidadePedido, $_POST['id_pedido'], $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>