
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_item_unidade_medida'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT item_unidade_medida.* 
				FROM item_unidade_medida item_unidade_medida 
				INNER JOIN item item ON item_unidade_medida.item_id = item.id_item
				INNER JOIN unidade_medida unidade_medida ON item_unidade_medida.unidade_medida_id = unidade_medida.id_unidade_medida
				INNER JOIN usuario usuario ON item_unidade_medida.usuario_id = usuario.id_usuario 
				WHERE item_unidade_medida.quantidade_item_unidade_medida LIKE '%$filtro%'
				   OR item.descricao_item LIKE '%$filtro%'
				   OR unidade_medida.descricao_unidade_medida LIKE '%$filtro%'
				   OR item_unidade_medida.data_atualizacao_item_unidade_medida LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_item_unidade_medida"]."{,}".
					$dados["quantidade_item_unidade_medida"]."{,}".
					$dados["item_id"]."{,}".
					$dados["unidade_medida_id"]."{,}".
					$dados["data_atualizacao_item_unidade_medida"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_item_unidade_medida"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_item_unidade_medida_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT item_unidade_medida.* 
				FROM item_unidade_medida
				WHERE id_item_unidade_medida = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_item_unidade_medida"]."{,}".
					$dados["quantidade_item_unidade_medida"]."{,}".
					$dados["item_id"]."{,}".
					$dados["unidade_medida_id"]."{,}".
					$dados["data_atualizacao_item_unidade_medida"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_item_unidade_medida"];
	}
}




if (!empty($_POST['pequisa_item_unidade_medida_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT item_unidade_medida.* 
				FROM item_unidade_medida item_unidade_medida 
				INNER JOIN item item ON item_unidade_medida.item_id = item.id_item
				INNER JOIN unidade_medida unidade_medida ON item_unidade_medida.unidade_medida_id = unidade_medida.id_unidade_medida
				INNER JOIN usuario usuario ON item_unidade_medida.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   item_unidade_medida.quantidade_item_unidade_medida LIKE '%$filtro%'
					OR item.descricao_item LIKE '%$filtro%'
					OR unidade_medida.descricao_unidade_medida LIKE '%$filtro%'
					OR item_unidade_medida.data_atualizacao_item_unidade_medida LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_item_unidade_medida"]."{,}".
					$dados["quantidade_item_unidade_medida"]."{,}".
					$dados["item_id"]."{,}".
					$dados["unidade_medida_id"]."{,}".
					$dados["data_atualizacao_item_unidade_medida"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_item_unidade_medida"];
		$cont++;
	}
}
?>