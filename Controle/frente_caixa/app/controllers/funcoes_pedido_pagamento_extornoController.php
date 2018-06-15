
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_pedido_pagamento_extorno'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT pedido_pagamento_extorno.* 
				FROM pedido_pagamento_extorno pedido_pagamento_extorno 
				INNER JOIN pedido_pagamento pedido_pagamento ON pedido_pagamento_extorno.pedido_pagamento_id = pedido_pagamento.id_pedido_pagamento
				INNER JOIN usuario usuario ON pedido_pagamento_extorno.usuario_id = usuario.id_usuario 
				WHERE pedido_pagamento_extorno.motivo_pedido_pagamento_extorno LIKE '%$filtro%'
				   OR pedido_pagamento.parcela_atual_pedido_pagamento LIKE '%$filtro%'
				   OR pedido_pagamento_extorno.data_atualizacao_pedido_pagamento_extorno LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_pedido_pagamento_extorno"]."{,}".
					$dados["motivo_pedido_pagamento_extorno"]."{,}".
					$dados["pedido_pagamento_id"]."{,}".
					$dados["data_atualizacao_pedido_pagamento_extorno"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido_pagamento_extorno"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_pedido_pagamento_extorno_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT pedido_pagamento_extorno.* 
				FROM pedido_pagamento_extorno
				WHERE id_pedido_pagamento_extorno = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_pedido_pagamento_extorno"]."{,}".
					$dados["motivo_pedido_pagamento_extorno"]."{,}".
					$dados["pedido_pagamento_id"]."{,}".
					$dados["data_atualizacao_pedido_pagamento_extorno"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido_pagamento_extorno"];
	}
}




if (!empty($_POST['pequisa_pedido_pagamento_extorno_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT pedido_pagamento_extorno.* 
				FROM pedido_pagamento_extorno pedido_pagamento_extorno 
				INNER JOIN pedido_pagamento pedido_pagamento ON pedido_pagamento_extorno.pedido_pagamento_id = pedido_pagamento.id_pedido_pagamento
				INNER JOIN usuario usuario ON pedido_pagamento_extorno.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   pedido_pagamento_extorno.motivo_pedido_pagamento_extorno LIKE '%$filtro%'
					OR pedido_pagamento.parcela_atual_pedido_pagamento LIKE '%$filtro%'
					OR pedido_pagamento_extorno.data_atualizacao_pedido_pagamento_extorno LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_pedido_pagamento_extorno"]."{,}".
					$dados["motivo_pedido_pagamento_extorno"]."{,}".
					$dados["pedido_pagamento_id"]."{,}".
					$dados["data_atualizacao_pedido_pagamento_extorno"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido_pagamento_extorno"];
		$cont++;
	}
}
?>