
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_caixa_movimentacao'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT caixa_movimentacao.* 
				FROM caixa_movimentacao caixa_movimentacao 
				INNER JOIN caixa caixa ON caixa_movimentacao.caixa_id = caixa.id_caixa
				INNER JOIN usuario usuario ON caixa_movimentacao.usuario_id = usuario.id_usuario 
				WHERE caixa_movimentacao.valor_abertura_caixa_movimentacao LIKE '%$filtro%'
				   OR caixa_movimentacao.valor_fechamento_caixa_movimentacao LIKE '%$filtro%'
				   OR caixa_movimentacao.data_abertura_caixa_movimentacao LIKE '%$filtro%'
				   OR caixa_movimentacao.data_fechamento_caixa_movimentacao LIKE '%$filtro%'
				   OR caixa.descricao_caixa LIKE '%$filtro%'
				   OR caixa_movimentacao.data_atualizacao_caixa_movimentacao LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_caixa_movimentacao"]."{,}".
					$dados["valor_abertura_caixa_movimentacao"]."{,}".
					$dados["valor_fechamento_caixa_movimentacao"]."{,}".
					$dados["data_abertura_caixa_movimentacao"]."{,}".
					$dados["data_fechamento_caixa_movimentacao"]."{,}".
					$dados["caixa_id"]."{,}".
					$dados["data_atualizacao_caixa_movimentacao"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_caixa_movimentacao"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_caixa_movimentacao_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT caixa_movimentacao.* 
				FROM caixa_movimentacao
				WHERE id_caixa_movimentacao = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_caixa_movimentacao"]."{,}".
					$dados["valor_abertura_caixa_movimentacao"]."{,}".
					$dados["valor_fechamento_caixa_movimentacao"]."{,}".
					$dados["data_abertura_caixa_movimentacao"]."{,}".
					$dados["data_fechamento_caixa_movimentacao"]."{,}".
					$dados["caixa_id"]."{,}".
					$dados["data_atualizacao_caixa_movimentacao"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_caixa_movimentacao"];
	}
}




if (!empty($_POST['pequisa_caixa_movimentacao_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT caixa_movimentacao.* 
				FROM caixa_movimentacao caixa_movimentacao 
				INNER JOIN caixa caixa ON caixa_movimentacao.caixa_id = caixa.id_caixa
				INNER JOIN usuario usuario ON caixa_movimentacao.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   caixa_movimentacao.valor_abertura_caixa_movimentacao LIKE '%$filtro%'
					OR caixa_movimentacao.valor_fechamento_caixa_movimentacao LIKE '%$filtro%'
					OR caixa_movimentacao.data_abertura_caixa_movimentacao LIKE '%$filtro%'
					OR caixa_movimentacao.data_fechamento_caixa_movimentacao LIKE '%$filtro%'
					OR caixa.descricao_caixa LIKE '%$filtro%'
					OR caixa_movimentacao.data_atualizacao_caixa_movimentacao LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_caixa_movimentacao"]."{,}".
					$dados["valor_abertura_caixa_movimentacao"]."{,}".
					$dados["valor_fechamento_caixa_movimentacao"]."{,}".
					$dados["data_abertura_caixa_movimentacao"]."{,}".
					$dados["data_fechamento_caixa_movimentacao"]."{,}".
					$dados["caixa_id"]."{,}".
					$dados["data_atualizacao_caixa_movimentacao"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_caixa_movimentacao"];
		$cont++;
	}
}
?>