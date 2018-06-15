
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_pedido_pagamento'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT pedido_pagamento.* 
				FROM pedido_pagamento pedido_pagamento 
				INNER JOIN pedido pedido ON pedido_pagamento.pedido_id = pedido.id_pedido
				INNER JOIN condicao_de_pagamento condicao_de_pagamento ON pedido_pagamento.condicao_de_pagamento_id = condicao_de_pagamento.id_condicao_de_pagamento
				INNER JOIN usuario usuario ON pedido_pagamento.usuario_id = usuario.id_usuario 
				WHERE pedido_pagamento.parcela_atual_pedido_pagamento LIKE '%$filtro%'
				   OR pedido_pagamento.parcela_total_pedido_pagamento LIKE '%$filtro%'
				   OR pedido_pagamento.valor_pago_pedido_pagamento LIKE '%$filtro%'
				   OR pedido.documento_pedido LIKE '%$filtro%'
				   OR condicao_de_pagamento.descricao_condicao_de_pagamento LIKE '%$filtro%'
				   OR pedido_pagamento.data_atualizacao_pedido_pagamento LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_pedido_pagamento"]."{,}".
					$dados["parcela_atual_pedido_pagamento"]."{,}".
					$dados["parcela_total_pedido_pagamento"]."{,}".
					$dados["valor_pago_pedido_pagamento"]."{,}".
					$dados["bool_esta_pago_pedido_pagamento"]."{,}".
					$dados["pedido_id"]."{,}".
					$dados["condicao_de_pagamento_id"]."{,}".
					$dados["data_atualizacao_pedido_pagamento"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido_pagamento"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_pedido_pagamento_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT pedido_pagamento.* 
				FROM pedido_pagamento
				WHERE id_pedido_pagamento = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_pedido_pagamento"]."{,}".
					$dados["parcela_atual_pedido_pagamento"]."{,}".
					$dados["parcela_total_pedido_pagamento"]."{,}".
					$dados["valor_pago_pedido_pagamento"]."{,}".
					$dados["bool_esta_pago_pedido_pagamento"]."{,}".
					$dados["pedido_id"]."{,}".
					$dados["condicao_de_pagamento_id"]."{,}".
					$dados["data_atualizacao_pedido_pagamento"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido_pagamento"];
	}
}




if (!empty($_POST['pequisa_pedido_pagamento_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT pedido_pagamento.* 
				FROM pedido_pagamento pedido_pagamento 
				INNER JOIN pedido pedido ON pedido_pagamento.pedido_id = pedido.id_pedido
				INNER JOIN condicao_de_pagamento condicao_de_pagamento ON pedido_pagamento.condicao_de_pagamento_id = condicao_de_pagamento.id_condicao_de_pagamento
				INNER JOIN usuario usuario ON pedido_pagamento.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   pedido_pagamento.parcela_atual_pedido_pagamento LIKE '%$filtro%'
					OR pedido_pagamento.parcela_total_pedido_pagamento LIKE '%$filtro%'
					OR pedido_pagamento.valor_pago_pedido_pagamento LIKE '%$filtro%'
					OR pedido.documento_pedido LIKE '%$filtro%'
					OR condicao_de_pagamento.descricao_condicao_de_pagamento LIKE '%$filtro%'
					OR pedido_pagamento.data_atualizacao_pedido_pagamento LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_pedido_pagamento"]."{,}".
					$dados["parcela_atual_pedido_pagamento"]."{,}".
					$dados["parcela_total_pedido_pagamento"]."{,}".
					$dados["valor_pago_pedido_pagamento"]."{,}".
					$dados["bool_esta_pago_pedido_pagamento"]."{,}".
					$dados["pedido_id"]."{,}".
					$dados["condicao_de_pagamento_id"]."{,}".
					$dados["data_atualizacao_pedido_pagamento"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido_pagamento"];
		$cont++;
	}
}
?>