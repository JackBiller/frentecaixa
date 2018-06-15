<?php 
	require_once "../classe/entidade/Condicao_de_pagamento.php";
	require_once "../classe/dao/condicao_de_pagamentoDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeCondicao_de_pagamento = new Condicao_de_pagamento();
		$condicao_de_pagamentoDAO = new condicao_de_pagamentoDAO();
		
		$entidadeCondicao_de_pagamento->set($_POST['descricao_condicao_de_pagamento'], 'descricao_condicao_de_pagamento');
		$entidadeCondicao_de_pagamento->set($_POST['data_atualizacao_condicao_de_pagamento'], 'data_atualizacao_condicao_de_pagamento');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeCondicao_de_pagamento->set($usuario_id, 'usuario_id');


		$bool_ativo_condicao_de_pagamento = $_POST['bool_ativo_condicao_de_pagamento'] == '' ? 0 : $_POST['bool_ativo_condicao_de_pagamento'];
		$entidadeCondicao_de_pagamento->set($bool_ativo_condicao_de_pagamento, 'bool_ativo_condicao_de_pagamento');


		$retorno = $condicao_de_pagamentoDAO->cadastraCondicao_de_pagamento($entidadeCondicao_de_pagamento, $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>