
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_estado'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT estado.* 
				FROM estado estado 
				INNER JOIN usuario usuario ON estado.usuario_id = usuario.id_usuario 
				WHERE estado.descricao_estado LIKE '%$filtro%'
				   OR estado.sigla_estado LIKE '%$filtro%'
				   OR estado.data_atualizacao_estado LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_estado"]."{,}".
					$dados["descricao_estado"]."{,}".
					$dados["sigla_estado"]."{,}".
					$dados["data_atualizacao_estado"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_estado"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_estado_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT estado.* 
				FROM estado
				WHERE id_estado = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_estado"]."{,}".
					$dados["descricao_estado"]."{,}".
					$dados["sigla_estado"]."{,}".
					$dados["data_atualizacao_estado"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_estado"];
	}
}




if (!empty($_POST['pequisa_estado_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT estado.* 
				FROM estado estado 
				INNER JOIN usuario usuario ON estado.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   estado.descricao_estado LIKE '%$filtro%'
					OR estado.sigla_estado LIKE '%$filtro%'
					OR estado.data_atualizacao_estado LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_estado"]."{,}".
					$dados["descricao_estado"]."{,}".
					$dados["sigla_estado"]."{,}".
					$dados["data_atualizacao_estado"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_estado"];
		$cont++;
	}
}
?>