<?php 
	require_once "../classe/entidade/Operacoes_caixa.php";
	require_once "../classe/dao/operacoes_caixaDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeOperacoes_caixa = new Operacoes_caixa();
		$operacoes_caixaDAO = new operacoes_caixaDAO();
		
		$entidadeOperacoes_caixa->set($_POST['descricao_operacoes_caixa'], 'descricao_operacoes_caixa');
		$entidadeOperacoes_caixa->set($_POST['data_atualizacao_operacoes_caixa'], 'data_atualizacao_operacoes_caixa');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeOperacoes_caixa->set($usuario_id, 'usuario_id');


		$bool_ativo_operacoes_caixa = $_POST['bool_ativo_operacoes_caixa'] == '' ? 0 : $_POST['bool_ativo_operacoes_caixa'];
		$entidadeOperacoes_caixa->set($bool_ativo_operacoes_caixa, 'bool_ativo_operacoes_caixa');


		$retorno = $operacoes_caixaDAO->cadastraOperacoes_caixa($entidadeOperacoes_caixa, $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>