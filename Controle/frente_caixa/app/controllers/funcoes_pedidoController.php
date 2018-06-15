
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_pedido'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT pedido.* 
				FROM pedido pedido 
				INNER JOIN cliente cliente ON pedido.cliente_id = cliente.id_cliente
				INNER JOIN filial filial ON pedido.filial_id = filial.id_filial
				INNER JOIN usuario usuario ON pedido.usuario_id = usuario.id_usuario 
				WHERE pedido.documento_pedido LIKE '%$filtro%'
				   OR pedido.total_pedido LIKE '%$filtro%'
				   OR pedido.emissao_pedido LIKE '%$filtro%'
				   OR cliente.nome_cliente LIKE '%$filtro%'
				   OR pedido.nome_cliente_pedido LIKE '%$filtro%'
				   OR filial.razao_social_filial LIKE '%$filtro%'
				   OR pedido.data_atualizacao_pedido LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_pedido"]."{,}".
					$dados["documento_pedido"]."{,}".
					$dados["total_pedido"]."{,}".
					$dados["emissao_pedido"]."{,}".
					$dados["cliente_id"]."{,}".
					$dados["nome_cliente_pedido"]."{,}".
					$dados["bool_finalizado_pedido"]."{,}".
					$dados["filial_id"]."{,}".
					$dados["data_atualizacao_pedido"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_pedido_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT pedido.* 
				FROM pedido
				WHERE id_pedido = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_pedido"]."{,}".
					$dados["documento_pedido"]."{,}".
					$dados["total_pedido"]."{,}".
					$dados["emissao_pedido"]."{,}".
					$dados["cliente_id"]."{,}".
					$dados["nome_cliente_pedido"]."{,}".
					$dados["bool_finalizado_pedido"]."{,}".
					$dados["filial_id"]."{,}".
					$dados["data_atualizacao_pedido"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido"];
	}
}




if (!empty($_POST['pequisa_pedido_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT pedido.* 
				FROM pedido pedido 
				INNER JOIN cliente cliente ON pedido.cliente_id = cliente.id_cliente
				INNER JOIN filial filial ON pedido.filial_id = filial.id_filial
				INNER JOIN usuario usuario ON pedido.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   pedido.documento_pedido LIKE '%$filtro%'
					OR pedido.total_pedido LIKE '%$filtro%'
					OR pedido.emissao_pedido LIKE '%$filtro%'
					OR cliente.nome_cliente LIKE '%$filtro%'
					OR pedido.nome_cliente_pedido LIKE '%$filtro%'
					OR filial.razao_social_filial LIKE '%$filtro%'
					OR pedido.data_atualizacao_pedido LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_pedido"]."{,}".
					$dados["documento_pedido"]."{,}".
					$dados["total_pedido"]."{,}".
					$dados["emissao_pedido"]."{,}".
					$dados["cliente_id"]."{,}".
					$dados["nome_cliente_pedido"]."{,}".
					$dados["bool_finalizado_pedido"]."{,}".
					$dados["filial_id"]."{,}".
					$dados["data_atualizacao_pedido"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_pedido"];
		$cont++;
	}
}
?>