
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_unidade_medida'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT unidade_medida.* 
				FROM unidade_medida unidade_medida 
				INNER JOIN usuario usuario ON unidade_medida.usuario_id = usuario.id_usuario 
				WHERE unidade_medida.descricao_unidade_medida LIKE '%$filtro%'
				   OR unidade_medida.sigla_unidade_medida LIKE '%$filtro%'
				   OR unidade_medida.data_atualizacao_unidade_medida LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_unidade_medida"]."{,}".
					$dados["descricao_unidade_medida"]."{,}".
					$dados["sigla_unidade_medida"]."{,}".
					$dados["data_atualizacao_unidade_medida"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_unidade_medida"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_unidade_medida_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT unidade_medida.* 
				FROM unidade_medida
				WHERE id_unidade_medida = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_unidade_medida"]."{,}".
					$dados["descricao_unidade_medida"]."{,}".
					$dados["sigla_unidade_medida"]."{,}".
					$dados["data_atualizacao_unidade_medida"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_unidade_medida"];
	}
}




if (!empty($_POST['pequisa_unidade_medida_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT unidade_medida.* 
				FROM unidade_medida unidade_medida 
				INNER JOIN usuario usuario ON unidade_medida.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   unidade_medida.descricao_unidade_medida LIKE '%$filtro%'
					OR unidade_medida.sigla_unidade_medida LIKE '%$filtro%'
					OR unidade_medida.data_atualizacao_unidade_medida LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_unidade_medida"]."{,}".
					$dados["descricao_unidade_medida"]."{,}".
					$dados["sigla_unidade_medida"]."{,}".
					$dados["data_atualizacao_unidade_medida"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_unidade_medida"];
		$cont++;
	}
}
?>