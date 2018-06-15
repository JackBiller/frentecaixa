<?php 
	require_once "../classe/entidade/Item.php";
	require_once "../classe/dao/itemDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeItem = new Item();
		$itemDAO = new itemDAO();
		
		$entidadeItem->set($_POST['descricao_item'], 'descricao_item');

		$grupo_id = $_POST['grupo_id'] == '' ? 0 : $_POST['grupo_id'];
		$entidadeItem->set($grupo_id, 'grupo_id');

		$entidadeItem->set($_POST['data_atualizacao_item'], 'data_atualizacao_item');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeItem->set($usuario_id, 'usuario_id');


		$bool_ativo_item = $_POST['bool_ativo_item'] == '' ? 0 : $_POST['bool_ativo_item'];
		$entidadeItem->set($bool_ativo_item, 'bool_ativo_item');


		$retorno = $itemDAO->atualizaItem($entidadeItem, $_POST['id_item'], $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>