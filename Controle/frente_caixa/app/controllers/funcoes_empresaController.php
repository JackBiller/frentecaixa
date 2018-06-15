
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_empresa'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT empresa.* 
				FROM empresa empresa 
				INNER JOIN usuario usuario ON empresa.usuario_id = usuario.id_usuario 
				WHERE empresa.razao_social_empresa LIKE '%$filtro%'
				   OR empresa.data_atualizacao_empresa LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_empresa"]."{,}".
					$dados["razao_social_empresa"]."{,}".
					$dados["data_atualizacao_empresa"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_empresa"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_empresa_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT empresa.* 
				FROM empresa
				WHERE id_empresa = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_empresa"]."{,}".
					$dados["razao_social_empresa"]."{,}".
					$dados["data_atualizacao_empresa"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_empresa"];
	}
}




if (!empty($_POST['pequisa_empresa_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT empresa.* 
				FROM empresa empresa 
				INNER JOIN usuario usuario ON empresa.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   empresa.razao_social_empresa LIKE '%$filtro%'
					OR empresa.data_atualizacao_empresa LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_empresa"]."{,}".
					$dados["razao_social_empresa"]."{,}".
					$dados["data_atualizacao_empresa"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_empresa"];
		$cont++;
	}
}
?>