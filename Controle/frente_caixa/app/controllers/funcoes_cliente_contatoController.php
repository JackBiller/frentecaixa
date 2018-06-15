
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_cliente_contato'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT cliente_contato.* 
				FROM cliente_contato cliente_contato 
				INNER JOIN cliente cliente ON cliente_contato.cliente_id = cliente.id_cliente
				INNER JOIN usuario usuario ON cliente_contato.usuario_id = usuario.id_usuario 
				WHERE cliente_contato.telefone_cliente_contato LIKE '%$filtro%'
				   OR cliente_contato.celular_cliente_contato LIKE '%$filtro%'
				   OR cliente_contato.email_cliente_contato LIKE '%$filtro%'
				   OR cliente.nome_cliente LIKE '%$filtro%'
				   OR cliente_contato.data_atualizacao_cliente_contato LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_cliente_contato"]."{,}".
					$dados["telefone_cliente_contato"]."{,}".
					$dados["celular_cliente_contato"]."{,}".
					$dados["email_cliente_contato"]."{,}".
					$dados["cliente_id"]."{,}".
					$dados["data_atualizacao_cliente_contato"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_cliente_contato"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_cliente_contato_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT cliente_contato.* 
				FROM cliente_contato
				WHERE id_cliente_contato = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_cliente_contato"]."{,}".
					$dados["telefone_cliente_contato"]."{,}".
					$dados["celular_cliente_contato"]."{,}".
					$dados["email_cliente_contato"]."{,}".
					$dados["cliente_id"]."{,}".
					$dados["data_atualizacao_cliente_contato"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_cliente_contato"];
	}
}




if (!empty($_POST['pequisa_cliente_contato_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT cliente_contato.* 
				FROM cliente_contato cliente_contato 
				INNER JOIN cliente cliente ON cliente_contato.cliente_id = cliente.id_cliente
				INNER JOIN usuario usuario ON cliente_contato.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   cliente_contato.telefone_cliente_contato LIKE '%$filtro%'
					OR cliente_contato.celular_cliente_contato LIKE '%$filtro%'
					OR cliente_contato.email_cliente_contato LIKE '%$filtro%'
					OR cliente.nome_cliente LIKE '%$filtro%'
					OR cliente_contato.data_atualizacao_cliente_contato LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_cliente_contato"]."{,}".
					$dados["telefone_cliente_contato"]."{,}".
					$dados["celular_cliente_contato"]."{,}".
					$dados["email_cliente_contato"]."{,}".
					$dados["cliente_id"]."{,}".
					$dados["data_atualizacao_cliente_contato"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_cliente_contato"];
		$cont++;
	}
}
?>