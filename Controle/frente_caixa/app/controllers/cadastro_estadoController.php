<?php 
	require_once "../classe/entidade/Estado.php";
	require_once "../classe/dao/estadoDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeEstado = new Estado();
		$estadoDAO = new estadoDAO();
		
		$entidadeEstado->set($_POST['descricao_estado'], 'descricao_estado');
		$entidadeEstado->set($_POST['sigla_estado'], 'sigla_estado');
		$entidadeEstado->set($_POST['data_atualizacao_estado'], 'data_atualizacao_estado');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeEstado->set($usuario_id, 'usuario_id');


		$bool_ativo_estado = $_POST['bool_ativo_estado'] == '' ? 0 : $_POST['bool_ativo_estado'];
		$entidadeEstado->set($bool_ativo_estado, 'bool_ativo_estado');


		$retorno = $estadoDAO->cadastraEstado($entidadeEstado, $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>