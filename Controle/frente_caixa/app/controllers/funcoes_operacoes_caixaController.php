
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_operacoes_caixa'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT operacoes_caixa.* 
				FROM operacoes_caixa operacoes_caixa 
				INNER JOIN usuario usuario ON operacoes_caixa.usuario_id = usuario.id_usuario 
				WHERE operacoes_caixa.descricao_operacoes_caixa LIKE '%$filtro%'
				   OR operacoes_caixa.data_atualizacao_operacoes_caixa LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_operacoes_caixa"]."{,}".
					$dados["descricao_operacoes_caixa"]."{,}".
					$dados["data_atualizacao_operacoes_caixa"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_operacoes_caixa"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_operacoes_caixa_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT operacoes_caixa.* 
				FROM operacoes_caixa
				WHERE id_operacoes_caixa = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_operacoes_caixa"]."{,}".
					$dados["descricao_operacoes_caixa"]."{,}".
					$dados["data_atualizacao_operacoes_caixa"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_operacoes_caixa"];
	}
}




if (!empty($_POST['pequisa_operacoes_caixa_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT operacoes_caixa.* 
				FROM operacoes_caixa operacoes_caixa 
				INNER JOIN usuario usuario ON operacoes_caixa.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   operacoes_caixa.descricao_operacoes_caixa LIKE '%$filtro%'
					OR operacoes_caixa.data_atualizacao_operacoes_caixa LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_operacoes_caixa"]."{,}".
					$dados["descricao_operacoes_caixa"]."{,}".
					$dados["data_atualizacao_operacoes_caixa"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_operacoes_caixa"];
		$cont++;
	}
}
?>