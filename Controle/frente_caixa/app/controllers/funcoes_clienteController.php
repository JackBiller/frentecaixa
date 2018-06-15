
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_cliente'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT cliente.* 
				FROM cliente cliente 
				INNER JOIN usuario usuario ON cliente.usuario_id = usuario.id_usuario 
				WHERE cliente.nome_cliente LIKE '%$filtro%'
				   OR cliente.data_atualizacao_cliente LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_cliente"]."{,}".
					$dados["nome_cliente"]."{,}".
					$dados["data_atualizacao_cliente"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_cliente"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_cliente_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT cliente.* 
				FROM cliente
				WHERE id_cliente = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_cliente"]."{,}".
					$dados["nome_cliente"]."{,}".
					$dados["data_atualizacao_cliente"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_cliente"];
	}
}




if (!empty($_POST['pequisa_cliente_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT cliente.* 
				FROM cliente cliente 
				INNER JOIN usuario usuario ON cliente.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   cliente.nome_cliente LIKE '%$filtro%'
					OR cliente.data_atualizacao_cliente LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_cliente"]."{,}".
					$dados["nome_cliente"]."{,}".
					$dados["data_atualizacao_cliente"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_cliente"];
		$cont++;
	}
}
?>