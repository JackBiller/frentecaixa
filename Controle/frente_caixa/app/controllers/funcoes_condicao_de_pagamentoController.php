
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_condicao_de_pagamento'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT condicao_de_pagamento.* 
				FROM condicao_de_pagamento condicao_de_pagamento 
				INNER JOIN usuario usuario ON condicao_de_pagamento.usuario_id = usuario.id_usuario 
				WHERE condicao_de_pagamento.descricao_condicao_de_pagamento LIKE '%$filtro%'
				   OR condicao_de_pagamento.data_atualizacao_condicao_de_pagamento LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_condicao_de_pagamento"]."{,}".
					$dados["descricao_condicao_de_pagamento"]."{,}".
					$dados["data_atualizacao_condicao_de_pagamento"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_condicao_de_pagamento"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_condicao_de_pagamento_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT condicao_de_pagamento.* 
				FROM condicao_de_pagamento
				WHERE id_condicao_de_pagamento = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_condicao_de_pagamento"]."{,}".
					$dados["descricao_condicao_de_pagamento"]."{,}".
					$dados["data_atualizacao_condicao_de_pagamento"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_condicao_de_pagamento"];
	}
}




if (!empty($_POST['pequisa_condicao_de_pagamento_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT condicao_de_pagamento.* 
				FROM condicao_de_pagamento condicao_de_pagamento 
				INNER JOIN usuario usuario ON condicao_de_pagamento.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   condicao_de_pagamento.descricao_condicao_de_pagamento LIKE '%$filtro%'
					OR condicao_de_pagamento.data_atualizacao_condicao_de_pagamento LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_condicao_de_pagamento"]."{,}".
					$dados["descricao_condicao_de_pagamento"]."{,}".
					$dados["data_atualizacao_condicao_de_pagamento"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_condicao_de_pagamento"];
		$cont++;
	}
}
?>