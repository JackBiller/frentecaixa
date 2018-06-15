<?php 
	require_once "../classe/entidade/Item_unidade_medida.php";
	require_once "../classe/dao/item_unidade_medidaDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeItem_unidade_medida = new Item_unidade_medida();
		$item_unidade_medidaDAO = new item_unidade_medidaDAO();
		

		$quantidade_item_unidade_medida = $_POST['quantidade_item_unidade_medida'] == '' ? 0 : $_POST['quantidade_item_unidade_medida'];
		$entidadeItem_unidade_medida->set($quantidade_item_unidade_medida, 'quantidade_item_unidade_medida');


		$item_id = $_POST['item_id'] == '' ? 0 : $_POST['item_id'];
		$entidadeItem_unidade_medida->set($item_id, 'item_id');


		$unidade_medida_id = $_POST['unidade_medida_id'] == '' ? 0 : $_POST['unidade_medida_id'];
		$entidadeItem_unidade_medida->set($unidade_medida_id, 'unidade_medida_id');

		$entidadeItem_unidade_medida->set($_POST['data_atualizacao_item_unidade_medida'], 'data_atualizacao_item_unidade_medida');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeItem_unidade_medida->set($usuario_id, 'usuario_id');


		$bool_ativo_item_unidade_medida = $_POST['bool_ativo_item_unidade_medida'] == '' ? 0 : $_POST['bool_ativo_item_unidade_medida'];
		$entidadeItem_unidade_medida->set($bool_ativo_item_unidade_medida, 'bool_ativo_item_unidade_medida');


		$retorno = $item_unidade_medidaDAO->cadastraItem_unidade_medida($entidadeItem_unidade_medida, $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>