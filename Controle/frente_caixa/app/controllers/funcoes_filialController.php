
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_filial'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT filial.* 
				FROM filial filial 
				INNER JOIN empresa empresa ON filial.empresa_id = empresa.id_empresa
				INNER JOIN usuario usuario ON filial.usuario_id = usuario.id_usuario 
				WHERE filial.razao_social_filial LIKE '%$filtro%'
				   OR filial.cnpj_filial LIKE '%$filtro%'
				   OR empresa.razao_social_empresa LIKE '%$filtro%'
				   OR filial.data_atualizacao_filial LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_filial"]."{,}".
					$dados["razao_social_filial"]."{,}".
					$dados["cnpj_filial"]."{,}".
					$dados["empresa_id"]."{,}".
					$dados["data_atualizacao_filial"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_filial"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_filial_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT filial.* 
				FROM filial
				WHERE id_filial = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_filial"]."{,}".
					$dados["razao_social_filial"]."{,}".
					$dados["cnpj_filial"]."{,}".
					$dados["empresa_id"]."{,}".
					$dados["data_atualizacao_filial"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_filial"];
	}
}




if (!empty($_POST['pequisa_filial_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT filial.* 
				FROM filial filial 
				INNER JOIN empresa empresa ON filial.empresa_id = empresa.id_empresa
				INNER JOIN usuario usuario ON filial.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   filial.razao_social_filial LIKE '%$filtro%'
					OR filial.cnpj_filial LIKE '%$filtro%'
					OR empresa.razao_social_empresa LIKE '%$filtro%'
					OR filial.data_atualizacao_filial LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_filial"]."{,}".
					$dados["razao_social_filial"]."{,}".
					$dados["cnpj_filial"]."{,}".
					$dados["empresa_id"]."{,}".
					$dados["data_atualizacao_filial"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_filial"];
		$cont++;
	}
}
?>