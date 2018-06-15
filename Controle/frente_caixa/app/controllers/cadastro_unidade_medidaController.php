<?php 
	require_once "../classe/entidade/Unidade_medida.php";
	require_once "../classe/dao/unidade_medidaDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeUnidade_medida = new Unidade_medida();
		$unidade_medidaDAO = new unidade_medidaDAO();
		
		$entidadeUnidade_medida->set($_POST['descricao_unidade_medida'], 'descricao_unidade_medida');
		$entidadeUnidade_medida->set($_POST['sigla_unidade_medida'], 'sigla_unidade_medida');
		$entidadeUnidade_medida->set($_POST['data_atualizacao_unidade_medida'], 'data_atualizacao_unidade_medida');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeUnidade_medida->set($usuario_id, 'usuario_id');


		$bool_ativo_unidade_medida = $_POST['bool_ativo_unidade_medida'] == '' ? 0 : $_POST['bool_ativo_unidade_medida'];
		$entidadeUnidade_medida->set($bool_ativo_unidade_medida, 'bool_ativo_unidade_medida');


		$retorno = $unidade_medidaDAO->cadastraUnidade_medida($entidadeUnidade_medida, $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>