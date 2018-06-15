
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_pedido_item'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT pedido_item.* 
				FROM pedido_item pedido_item 
				INNER JOIN item item ON pedido_item.item_id = item.id_item
				INNER JOIN item_unidade_medida item_unidade_medida ON pedido_item.item_unidade_medida_id = item_unidade_medida.id_item_unidade_medida
				INNER JOIN pedido pedido ON pedido_item.pedido_id = pedido.id_pedido
				INNER JOIN usuario usuario ON pedido_item.usuario_id = usuario.id_usuario 
				WHERE pedido_item.quantidade_pedido_item LIKE '%$filtro%'
				   OR pedido_item.valor_unitario_pedido_item LIKE '%$filtro%'
				   OR pedido_item.valor_total_pedido_item LIKE '%$filtro%'
				   OR item.descricao_item LIKE '%$filtro%'
				   OR item_unidade_medida.quantidade_item_unidade_medida LIKE '%$filtro%'
				   OR pedido.documento_pedido LIKE '%$filtro%'
				   OR pedido_item.data_atualizacao_pedido_item LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_pedido_item"]."{,}".
					$dados["quantidade_pedido_item"]."{,}".
					$dados["valor_unitario_pedido_item"]."{,}".
					$dados["valor_total_pedido_item"]."{,}".
					$dados["item_id"]."{,}".
					$dados["item_unidade_medida_id"]."{,}".
					$dados["pedido_id"]."{,}".
					$dados["data_atualizacao_pedido_item"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido_item"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_pedido_item_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT pedido_item.* 
				FROM pedido_item
				WHERE id_pedido_item = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_pedido_item"]."{,}".
					$dados["quantidade_pedido_item"]."{,}".
					$dados["valor_unitario_pedido_item"]."{,}".
					$dados["valor_total_pedido_item"]."{,}".
					$dados["item_id"]."{,}".
					$dados["item_unidade_medida_id"]."{,}".
					$dados["pedido_id"]."{,}".
					$dados["data_atualizacao_pedido_item"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido_item"];
	}
}




if (!empty($_POST['pequisa_pedido_item_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT pedido_item.* 
				FROM pedido_item pedido_item 
				INNER JOIN item item ON pedido_item.item_id = item.id_item
				INNER JOIN item_unidade_medida item_unidade_medida ON pedido_item.item_unidade_medida_id = item_unidade_medida.id_item_unidade_medida
				INNER JOIN pedido pedido ON pedido_item.pedido_id = pedido.id_pedido
				INNER JOIN usuario usuario ON pedido_item.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   pedido_item.quantidade_pedido_item LIKE '%$filtro%'
					OR pedido_item.valor_unitario_pedido_item LIKE '%$filtro%'
					OR pedido_item.valor_total_pedido_item LIKE '%$filtro%'
					OR item.descricao_item LIKE '%$filtro%'
					OR item_unidade_medida.quantidade_item_unidade_medida LIKE '%$filtro%'
					OR pedido.documento_pedido LIKE '%$filtro%'
					OR pedido_item.data_atualizacao_pedido_item LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_pedido_item"]."{,}".
					$dados["quantidade_pedido_item"]."{,}".
					$dados["valor_unitario_pedido_item"]."{,}".
					$dados["valor_total_pedido_item"]."{,}".
					$dados["item_id"]."{,}".
					$dados["item_unidade_medida_id"]."{,}".
					$dados["pedido_id"]."{,}".
					$dados["data_atualizacao_pedido_item"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido_item"];
		$cont++;
	}
}
?>