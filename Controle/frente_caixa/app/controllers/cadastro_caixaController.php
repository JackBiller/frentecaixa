<?php 
	require_once "../classe/entidade/Caixa.php";
	require_once "../classe/dao/caixaDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeCaixa = new Caixa();
		$caixaDAO = new caixaDAO();
		
		$entidadeCaixa->set($_POST['descricao_caixa'], 'descricao_caixa');

		$filial_id = $_POST['filial_id'] == '' ? 0 : $_POST['filial_id'];
		$entidadeCaixa->set($filial_id, 'filial_id');

		$entidadeCaixa->set($_POST['data_atualizacao_caixa'], 'data_atualizacao_caixa');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeCaixa->set($usuario_id, 'usuario_id');


		$bool_ativo_caixa = $_POST['bool_ativo_caixa'] == '' ? 0 : $_POST['bool_ativo_caixa'];
		$entidadeCaixa->set($bool_ativo_caixa, 'bool_ativo_caixa');


		$retorno = $caixaDAO->cadastraCaixa($entidadeCaixa, $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>