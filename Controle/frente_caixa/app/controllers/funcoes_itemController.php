
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_item'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT item.* 
				FROM item item 
				INNER JOIN grupo grupo ON item.grupo_id = grupo.id_grupo
				INNER JOIN usuario usuario ON item.usuario_id = usuario.id_usuario 
				WHERE item.descricao_item LIKE '%$filtro%'
				   OR grupo.descricao_grupo LIKE '%$filtro%'
				   OR item.data_atualizacao_item LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_item"]."{,}".
					$dados["descricao_item"]."{,}".
					$dados["grupo_id"]."{,}".
					$dados["data_atualizacao_item"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_item"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_item_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT item.* 
				FROM item
				WHERE id_item = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_item"]."{,}".
					$dados["descricao_item"]."{,}".
					$dados["grupo_id"]."{,}".
					$dados["data_atualizacao_item"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_item"];
	}
}




if (!empty($_POST['pequisa_item_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT item.* 
				FROM item item 
				INNER JOIN grupo grupo ON item.grupo_id = grupo.id_grupo
				INNER JOIN usuario usuario ON item.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   item.descricao_item LIKE '%$filtro%'
					OR grupo.descricao_grupo LIKE '%$filtro%'
					OR item.data_atualizacao_item LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_item"]."{,}".
					$dados["descricao_item"]."{,}".
					$dados["grupo_id"]."{,}".
					$dados["data_atualizacao_item"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_item"];
		$cont++;
	}
}
?>