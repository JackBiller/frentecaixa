<?php 
	require_once "../classe/entidade/Caixa_movimentacao.php";
	require_once "../classe/dao/caixa_movimentacaoDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeCaixa_movimentacao = new Caixa_movimentacao();
		$caixa_movimentacaoDAO = new caixa_movimentacaoDAO();
		

		$valor_abertura_caixa_movimentacao = $_POST['valor_abertura_caixa_movimentacao'] == '' ? 0 : $_POST['valor_abertura_caixa_movimentacao'];
		$entidadeCaixa_movimentacao->set($valor_abertura_caixa_movimentacao, 'valor_abertura_caixa_movimentacao');


		$valor_fechamento_caixa_movimentacao = $_POST['valor_fechamento_caixa_movimentacao'] == '' ? 0 : $_POST['valor_fechamento_caixa_movimentacao'];
		$entidadeCaixa_movimentacao->set($valor_fechamento_caixa_movimentacao, 'valor_fechamento_caixa_movimentacao');

		$entidadeCaixa_movimentacao->set($_POST['data_abertura_caixa_movimentacao'], 'data_abertura_caixa_movimentacao');
		$entidadeCaixa_movimentacao->set($_POST['data_fechamento_caixa_movimentacao'], 'data_fechamento_caixa_movimentacao');

		$caixa_id = $_POST['caixa_id'] == '' ? 0 : $_POST['caixa_id'];
		$entidadeCaixa_movimentacao->set($caixa_id, 'caixa_id');

		$entidadeCaixa_movimentacao->set($_POST['data_atualizacao_caixa_movimentacao'], 'data_atualizacao_caixa_movimentacao');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeCaixa_movimentacao->set($usuario_id, 'usuario_id');


		$bool_ativo_caixa_movimentacao = $_POST['bool_ativo_caixa_movimentacao'] == '' ? 0 : $_POST['bool_ativo_caixa_movimentacao'];
		$entidadeCaixa_movimentacao->set($bool_ativo_caixa_movimentacao, 'bool_ativo_caixa_movimentacao');


		$retorno = $caixa_movimentacaoDAO->atualizaCaixa_movimentacao($entidadeCaixa_movimentacao, $_POST['id_caixa_movimentacao'], $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>