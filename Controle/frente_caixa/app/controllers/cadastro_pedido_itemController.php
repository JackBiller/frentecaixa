<?php 
	require_once "../classe/entidade/Pedido_item.php";
	require_once "../classe/dao/pedido_itemDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadePedido_item = new Pedido_item();
		$pedido_itemDAO = new pedido_itemDAO();
		

		$quantidade_pedido_item = $_POST['quantidade_pedido_item'] == '' ? 0 : $_POST['quantidade_pedido_item'];
		$entidadePedido_item->set($quantidade_pedido_item, 'quantidade_pedido_item');


		$valor_unitario_pedido_item = $_POST['valor_unitario_pedido_item'] == '' ? 0 : $_POST['valor_unitario_pedido_item'];
		$entidadePedido_item->set($valor_unitario_pedido_item, 'valor_unitario_pedido_item');


		$valor_total_pedido_item = $_POST['valor_total_pedido_item'] == '' ? 0 : $_POST['valor_total_pedido_item'];
		$entidadePedido_item->set($valor_total_pedido_item, 'valor_total_pedido_item');


		$item_id = $_POST['item_id'] == '' ? 0 : $_POST['item_id'];
		$entidadePedido_item->set($item_id, 'item_id');


		$item_unidade_medida_id = $_POST['item_unidade_medida_id'] == '' ? 0 : $_POST['item_unidade_medida_id'];
		$entidadePedido_item->set($item_unidade_medida_id, 'item_unidade_medida_id');


		$pedido_id = $_POST['pedido_id'] == '' ? 0 : $_POST['pedido_id'];
		$entidadePedido_item->set($pedido_id, 'pedido_id');

		$entidadePedido_item->set($_POST['data_atualizacao_pedido_item'], 'data_atualizacao_pedido_item');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadePedido_item->set($usuario_id, 'usuario_id');


		$bool_ativo_pedido_item = $_POST['bool_ativo_pedido_item'] == '' ? 0 : $_POST['bool_ativo_pedido_item'];
		$entidadePedido_item->set($bool_ativo_pedido_item, 'bool_ativo_pedido_item');


		$retorno = $pedido_itemDAO->cadastraPedido_item($entidadePedido_item, $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>