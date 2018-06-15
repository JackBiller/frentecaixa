<?php 
	require_once "../classe/entidade/Caixa_operacao.php";
	require_once "../classe/dao/caixa_operacaoDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeCaixa_operacao = new Caixa_operacao();
		$caixa_operacaoDAO = new caixa_operacaoDAO();
		

		$valor_caixa_operacao = $_POST['valor_caixa_operacao'] == '' ? 0 : $_POST['valor_caixa_operacao'];
		$entidadeCaixa_operacao->set($valor_caixa_operacao, 'valor_caixa_operacao');


		$caixa_movimentacao_id = $_POST['caixa_movimentacao_id'] == '' ? 0 : $_POST['caixa_movimentacao_id'];
		$entidadeCaixa_operacao->set($caixa_movimentacao_id, 'caixa_movimentacao_id');


		$operacoes_caixa_id = $_POST['operacoes_caixa_id'] == '' ? 0 : $_POST['operacoes_caixa_id'];
		$entidadeCaixa_operacao->set($operacoes_caixa_id, 'operacoes_caixa_id');

		$entidadeCaixa_operacao->set($_POST['data_emissao_caixa_operacao'], 'data_emissao_caixa_operacao');
		$entidadeCaixa_operacao->set($_POST['data_atualizacao_caixa_operacao'], 'data_atualizacao_caixa_operacao');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeCaixa_operacao->set($usuario_id, 'usuario_id');


		$bool_ativo_caixa_operacao = $_POST['bool_ativo_caixa_operacao'] == '' ? 0 : $_POST['bool_ativo_caixa_operacao'];
		$entidadeCaixa_operacao->set($bool_ativo_caixa_operacao, 'bool_ativo_caixa_operacao');


		$retorno = $caixa_operacaoDAO->atualizaCaixa_operacao($entidadeCaixa_operacao, $_POST['id_caixa_operacao'], $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>