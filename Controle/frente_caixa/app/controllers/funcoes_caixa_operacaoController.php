
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_caixa_operacao'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT caixa_operacao.* 
				FROM caixa_operacao caixa_operacao 
				INNER JOIN caixa_movimentacao caixa_movimentacao ON caixa_operacao.caixa_movimentacao_id = caixa_movimentacao.id_caixa_movimentacao
				INNER JOIN operacoes_caixa operacoes_caixa ON caixa_operacao.operacoes_caixa_id = operacoes_caixa.id_operacoes_caixa
				INNER JOIN usuario usuario ON caixa_operacao.usuario_id = usuario.id_usuario 
				WHERE caixa_operacao.valor_caixa_operacao LIKE '%$filtro%'
				   OR caixa_movimentacao.valor_abertura_caixa_movimentacao LIKE '%$filtro%'
				   OR operacoes_caixa.descricao_operacoes_caixa LIKE '%$filtro%'
				   OR caixa_operacao.data_emissao_caixa_operacao LIKE '%$filtro%'
				   OR caixa_operacao.data_atualizacao_caixa_operacao LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_caixa_operacao"]."{,}".
					$dados["valor_caixa_operacao"]."{,}".
					$dados["caixa_movimentacao_id"]."{,}".
					$dados["operacoes_caixa_id"]."{,}".
					$dados["data_emissao_caixa_operacao"]."{,}".
					$dados["data_atualizacao_caixa_operacao"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_caixa_operacao"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_caixa_operacao_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT caixa_operacao.* 
				FROM caixa_operacao
				WHERE id_caixa_operacao = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_caixa_operacao"]."{,}".
					$dados["valor_caixa_operacao"]."{,}".
					$dados["caixa_movimentacao_id"]."{,}".
					$dados["operacoes_caixa_id"]."{,}".
					$dados["data_emissao_caixa_operacao"]."{,}".
					$dados["data_atualizacao_caixa_operacao"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_caixa_operacao"];
	}
}




if (!empty($_POST['pequisa_caixa_operacao_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT caixa_operacao.* 
				FROM caixa_operacao caixa_operacao 
				INNER JOIN caixa_movimentacao caixa_movimentacao ON caixa_operacao.caixa_movimentacao_id = caixa_movimentacao.id_caixa_movimentacao
				INNER JOIN operacoes_caixa operacoes_caixa ON caixa_operacao.operacoes_caixa_id = operacoes_caixa.id_operacoes_caixa
				INNER JOIN usuario usuario ON caixa_operacao.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   caixa_operacao.valor_caixa_operacao LIKE '%$filtro%'
					OR caixa_movimentacao.valor_abertura_caixa_movimentacao LIKE '%$filtro%'
					OR operacoes_caixa.descricao_operacoes_caixa LIKE '%$filtro%'
					OR caixa_operacao.data_emissao_caixa_operacao LIKE '%$filtro%'
					OR caixa_operacao.data_atualizacao_caixa_operacao LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_caixa_operacao"]."{,}".
					$dados["valor_caixa_operacao"]."{,}".
					$dados["caixa_movimentacao_id"]."{,}".
					$dados["operacoes_caixa_id"]."{,}".
					$dados["data_emissao_caixa_operacao"]."{,}".
					$dados["data_atualizacao_caixa_operacao"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_caixa_operacao"];
		$cont++;
	}
}
?>