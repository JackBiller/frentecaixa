<?php 
	require_once "../classe/entidade/Empresa.php";
	require_once "../classe/dao/empresaDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeEmpresa = new Empresa();
		$empresaDAO = new empresaDAO();
		
		$entidadeEmpresa->set($_POST['razao_social_empresa'], 'razao_social_empresa');
		$entidadeEmpresa->set($_POST['data_atualizacao_empresa'], 'data_atualizacao_empresa');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeEmpresa->set($usuario_id, 'usuario_id');


		$bool_ativo_empresa = $_POST['bool_ativo_empresa'] == '' ? 0 : $_POST['bool_ativo_empresa'];
		$entidadeEmpresa->set($bool_ativo_empresa, 'bool_ativo_empresa');


		$retorno = $empresaDAO->atualizaEmpresa($entidadeEmpresa, $_POST['id_empresa'], $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>