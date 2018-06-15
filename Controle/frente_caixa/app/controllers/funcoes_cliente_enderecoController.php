
<?php
require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_POST['pequisa_cliente_endereco'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$cont = 1;
	$sql = "	SELECT cliente_endereco.* 
				FROM cliente_endereco cliente_endereco 
				INNER JOIN estado estado ON cliente_endereco.estado_id = estado.id_estado
				INNER JOIN cliente cliente ON cliente_endereco.cliente_id = cliente.id_cliente
				INNER JOIN usuario usuario ON cliente_endereco.usuario_id = usuario.id_usuario 
				WHERE cliente_endereco.endereco_cliente_endereco LIKE '%$filtro%'
				   OR cliente_endereco.numero_cliente_endereco LIKE '%$filtro%'
				   OR cliente_endereco.complemento_cliente_endereco LIKE '%$filtro%'
				   OR cliente_endereco.bairro_cliente_endereco LIKE '%$filtro%'
				   OR cliente_endereco.cidade_cliente_endereco LIKE '%$filtro%'
				   OR estado.descricao_estado LIKE '%$filtro%'
				   OR cliente.nome_cliente LIKE '%$filtro%'
				   OR cliente_endereco.data_atualizacao_cliente_endereco LIKE '%$filtro%'
				   OR usuario.nome_usuario LIKE '%$filtro%'
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_cliente_endereco"]."{,}".
					$dados["endereco_cliente_endereco"]."{,}".
					$dados["numero_cliente_endereco"]."{,}".
					$dados["complemento_cliente_endereco"]."{,}".
					$dados["bairro_cliente_endereco"]."{,}".
					$dados["cidade_cliente_endereco"]."{,}".
					$dados["estado_id"]."{,}".
					$dados["cliente_id"]."{,}".
					$dados["data_atualizacao_cliente_endereco"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_cliente_endereco"];
		$cont++;
	}
}




if (!empty($_POST['pequisa_cliente_endereco_id'])) {
	$id = $_POST['id'];
	$sql = "	SELECT cliente_endereco.* 
				FROM cliente_endereco
				WHERE id_cliente_endereco = $id
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_cliente_endereco"]."{,}".
					$dados["endereco_cliente_endereco"]."{,}".
					$dados["numero_cliente_endereco"]."{,}".
					$dados["complemento_cliente_endereco"]."{,}".
					$dados["bairro_cliente_endereco"]."{,}".
					$dados["cidade_cliente_endereco"]."{,}".
					$dados["estado_id"]."{,}".
					$dados["cliente_id"]."{,}".
					$dados["data_atualizacao_cliente_endereco"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_cliente_endereco"];
	}
}




if (!empty($_POST['pequisa_cliente_endereco_grade'])) {
	$filtro = !empty($_POST['filtro']) ? $_POST['filtro'] : "";
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT cliente_endereco.* 
				FROM cliente_endereco cliente_endereco 
				INNER JOIN estado estado ON cliente_endereco.estado_id = estado.id_estado
				INNER JOIN cliente cliente ON cliente_endereco.cliente_id = cliente.id_cliente
				INNER JOIN usuario usuario ON cliente_endereco.usuario_id = usuario.id_usuario
				WHERE $coluna = $id 
				AND (
					   cliente_endereco.endereco_cliente_endereco LIKE '%$filtro%'
					OR cliente_endereco.numero_cliente_endereco LIKE '%$filtro%'
					OR cliente_endereco.complemento_cliente_endereco LIKE '%$filtro%'
					OR cliente_endereco.bairro_cliente_endereco LIKE '%$filtro%'
					OR cliente_endereco.cidade_cliente_endereco LIKE '%$filtro%'
					OR estado.descricao_estado LIKE '%$filtro%'
					OR cliente.nome_cliente LIKE '%$filtro%'
					OR cliente_endereco.data_atualizacao_cliente_endereco LIKE '%$filtro%'
					OR usuario.nome_usuario LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo 	
					$dados["id_cliente_endereco"]."{,}".
					$dados["endereco_cliente_endereco"]."{,}".
					$dados["numero_cliente_endereco"]."{,}".
					$dados["complemento_cliente_endereco"]."{,}".
					$dados["bairro_cliente_endereco"]."{,}".
					$dados["cidade_cliente_endereco"]."{,}".
					$dados["estado_id"]."{,}".
					$dados["cliente_id"]."{,}".
					$dados["data_atualizacao_cliente_endereco"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_cliente_endereco"];
		$cont++;
	}
}
?>