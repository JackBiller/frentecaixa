
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_grupo'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT grupo.* 
				FROM grupo grupo 
				INNER JOIN filial filial ON grupo.filial_id = filial.id_filial
				INNER JOIN usuario usuario ON grupo.usuario_id = usuario.id_usuario 
				WHERE grupo.descricao_grupo LIKE '%$filtro%'
				   OR grupo.imagem_grupo LIKE '%$filtro%'
				   OR filial.razao_social_filial LIKE '%$filtro%'
				   OR grupo.data_atualizacao_grupo LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_grupo"]."{,}".
					$dados["descricao_grupo"]."{,}".
					$dados["imagem_grupo"]."{,}".
					$dados["filial_id"]."{,}".
					$dados["data_atualizacao_grupo"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_grupo"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_grupo_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT grupo.* 
				FROM grupo
				WHERE id_grupo = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_grupo"]."{,}".
					$dados["descricao_grupo"]."{,}".
					$dados["imagem_grupo"]."{,}".
					$dados["filial_id"]."{,}".
					$dados["data_atualizacao_grupo"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_grupo"];
	}
}




if (!empty($_POST['pequisa_grupo_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT grupo.* 
				FROM grupo grupo 
				INNER JOIN filial filial ON grupo.filial_id = filial.id_filial
				INNER JOIN usuario usuario ON grupo.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   grupo.descricao_grupo LIKE '%$filtro%'
					OR grupo.imagem_grupo LIKE '%$filtro%'
					OR filial.razao_social_filial LIKE '%$filtro%'
					OR grupo.data_atualizacao_grupo LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_grupo"]."{,}".
					$dados["descricao_grupo"]."{,}".
					$dados["imagem_grupo"]."{,}".
					$dados["filial_id"]."{,}".
					$dados["data_atualizacao_grupo"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_grupo"];
		$cont++;
	}
}
?>