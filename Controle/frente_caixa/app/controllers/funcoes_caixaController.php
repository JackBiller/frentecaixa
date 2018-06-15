
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_caixa'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT caixa.* 
				FROM caixa caixa 
				INNER JOIN filial filial ON caixa.filial_id = filial.id_filial
				INNER JOIN usuario usuario ON caixa.usuario_id = usuario.id_usuario 
				WHERE caixa.descricao_caixa LIKE '%$filtro%'
				   OR filial.razao_social_filial LIKE '%$filtro%'
				   OR caixa.data_atualizacao_caixa LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_caixa"]."{,}".
					$dados["descricao_caixa"]."{,}".
					$dados["filial_id"]."{,}".
					$dados["data_atualizacao_caixa"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_caixa"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_caixa_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT caixa.* 
				FROM caixa
				WHERE id_caixa = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_caixa"]."{,}".
					$dados["descricao_caixa"]."{,}".
					$dados["filial_id"]."{,}".
					$dados["data_atualizacao_caixa"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_caixa"];
	}
}




if (!empty($_POST['pequisa_caixa_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT caixa.* 
				FROM caixa caixa 
				INNER JOIN filial filial ON caixa.filial_id = filial.id_filial
				INNER JOIN usuario usuario ON caixa.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   caixa.descricao_caixa LIKE '%$filtro%'
					OR filial.razao_social_filial LIKE '%$filtro%'
					OR caixa.data_atualizacao_caixa LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_caixa"]."{,}".
					$dados["descricao_caixa"]."{,}".
					$dados["filial_id"]."{,}".
					$dados["data_atualizacao_caixa"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_caixa"];
		$cont++;
	}
}
?>