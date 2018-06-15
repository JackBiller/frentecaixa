<?php
/** Tabela notificações */
if (!empty($_POST['pequisa_notificacoes'])) {
	$filtro = "";
	$arrayPseudoCodigo;
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$cont = 1;
	$sql = "SELECT * FROM notificacoes 
			WHERE (
					descricao_notificacoes 			LIKE '%$filtro%' 
				OR 	usuario_atuador_notificacoes 	LIKE '%$filtro%' 
				OR 	tipo_alteracao_notificacoes 	LIKE '%$filtro%' 
				OR 	data_atualizacao_notificacoes 	LIKE '%$filtro%'
			)
			AND usuaio_requerente_notificacoes = $usuario
			ORDER BY id_notificacoes DESC;";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$arrayPseudoCodigo = explode("/%/", $dados["descricao_notificacoes"]);
		for ($i=1; $i < sizeof($arrayPseudoCodigo); $i++) { 
			if ($i % 2 != 0) {
				$sql = $arrayPseudoCodigo[$i];
				$verifica = $pdo->query($sql);
				foreach ($verifica as $dadosTerceiro) {
					$arrayPseudoCodigo[$i] = $dadosTerceiro[1];
				}
			}
		}

		if ($cont ==  1) {
			echo 	
					$dados["id_notificacoes"]."{,}".
					/* $dados["descricao_notificacoes"]."{,}". */
					implode("", $arrayPseudoCodigo)."{,}".
					$dados["usuario_atuador_notificacoes"]."{,}".
					$dados["usuaio_requerente_notificacoes"]."{,}".
					$dados["tipo_alteracao_notificacoes"]."{,}".
					$dados["notificacoes_config_id"]."{,}".
					$dados["bool_view_notificacoes"]."{,}".
					$dados["data_atualizacao_notificacoes"]."{,}".
					$dados["bool_ativo_notificacoes"];
		} else {
			echo    "[]".
					$dados["id_notificacoes"]."{,}".
					/* $dados["descricao_notificacoes"]."{,}". */
					implode("", $arrayPseudoCodigo)."{,}".
					$dados["usuario_atuador_notificacoes"]."{,}".
					$dados["usuaio_requerente_notificacoes"]."{,}".
					$dados["tipo_alteracao_notificacoes"]."{,}".
					$dados["notificacoes_config_id"]."{,}".
					$dados["bool_view_notificacoes"]."{,}".
					$dados["data_atualizacao_notificacoes"]."{,}".
					$dados["bool_ativo_notificacoes"];
		} $cont++;
	}
}




if (!empty($_POST['pequisa_notificacoes_id'])) {
	$id = $_POST['id'];
	$sql = "SELECT * FROM notificacoes WHERE id_notificacoes = $id";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
			echo 	
					$dados["id_notificacoes"]."{,}".
					$dados["descricao_notificacoes"]."{,}".
					$dados["usuario_atuador_notificacoes"]."{,}".
					$dados["usuaio_requerente_notificacoes"]."{,}".
					$dados["tipo_alteracao_notificacoes"]."{,}".
					$dados["notificacoes_config_id"]."{,}".
					$dados["bool_view_notificacoes"]."{,}".
					$dados["data_atualizacao_notificacoes"]."{,}".
					$dados["bool_ativo_notificacoes"];
	}
}




if (!empty($_POST['pequisa_notificacoes_grade'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT * FROM notificacoes 
				WHERE $coluna = $id 
				AND (
					   descricao_notificacoes LIKE '%$filtro%'
					OR usuario_atuador_notificacoes LIKE '%$filtro%'
					OR usuaio_requerente_notificacoes LIKE '%$filtro%'
					OR tipo_alteracao_notificacoes LIKE '%$filtro%'
					OR data_atualizacao_notificacoes LIKE '%$filtro%'
				)";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont ==  1) {
			echo 	
					$dados["id_notificacoes"]."{,}".
					$dados["descricao_notificacoes"]."{,}".
					$dados["usuario_atuador_notificacoes"]."{,}".
					$dados["usuaio_requerente_notificacoes"]."{,}".
					$dados["tipo_alteracao_notificacoes"]."{,}".
					$dados["notificacoes_config_id"]."{,}".
					$dados["bool_view_notificacoes"]."{,}".
					$dados["data_atualizacao_notificacoes"]."{,}".
					$dados["bool_ativo_notificacoes"];
		} else {
			echo    "[]".
					$dados["id_notificacoes"]."{,}".
					$dados["descricao_notificacoes"]."{,}".
					$dados["usuario_atuador_notificacoes"]."{,}".
					$dados["usuaio_requerente_notificacoes"]."{,}".
					$dados["tipo_alteracao_notificacoes"]."{,}".
					$dados["notificacoes_config_id"]."{,}".
					$dados["bool_view_notificacoes"]."{,}".
					$dados["data_atualizacao_notificacoes"]."{,}".
					$dados["bool_ativo_notificacoes"];
		} $cont++;
	}
}



if (!empty($_POST['setar_visualizacao_notificacoes'])) {
	$sql  = "UPDATE notificacoes SET bool_view_notificacoes = 1 WHERE usuaio_requerente_notificacoes = $usuario";
	$verifica = $pdo->prepare($sql);
	$resultadoOperacao = $verifica->execute();
	echo $resultadoOperacao;
}

if (!empty($_POST['retornaStatusNotificacao'])) {
	$sql = "SELECT COUNT(bool_view_notificacoes) AS numTotal 
			FROM notificacoes 
			WHERE usuaio_requerente_notificacoes = $usuario
			AND bool_view_notificacoes = 0;";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) { echo $dados['numTotal']; }
	// echo $sql;
}



if (!empty($_POST['apagarNotificacao'])) {
	$id = $_POST['id'];
	$sql = "DELETE FROM notificacoes WHERE id_notificacoes = ".$id;
	$verifica = $pdo->prepare($sql);
	$resultadoOperacao = $verifica->execute();
	echo $resultadoOperacao;
}



if (!empty($_POST['salvarNotificacao'])) {
	$id = $_POST['id'];
	/*$sql = "SELECT * FROM notificacoes WHERE id_notificacoes = $id ORDER BY id_notificacoes DESC LIMIT 1;";
	$sql_secundaria = "(descricao_notificacoes_salvas, usuario_atuador_notificacoes_salvas, usuaio_requerente_notificacoes_salvas, tipo_alteracao_notificacoes_salvas, notificacoes_config_id) VALUES (";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$sql_secundaria .= "  '".$dados['descricao_notificacoes']."'";
		$sql_secundaria .= ", '".$dados['usuario_atuador_notificacoes']."'";
		$sql_secundaria .= ", '".$dados['usuaio_requerente_notificacoes']."'";
		$sql_secundaria .= ", '".$dados['tipo_alteracao_notificacoes']."'";
		$sql_secundaria .= ", '".$dados['notificacoes_config_id']."'";
	}
	$sql_secundaria .= ");";*/

	$sql = "INSERT INTO notificacoes_salvas 
	(
		descricao_notificacoes_salvas, 
		usuario_atuador_notificacoes_salvas, 
		usuaio_requerente_notificacoes_salvas, 
		tipo_alteracao_notificacoes_salvas, 
		notificacoes_config_id
	) VALUES (
		(SELECT descricao_notificacoes 			FROM notificacoes WHERE id_notificacoes = $id LIMIT 1),
		(SELECT usuario_atuador_notificacoes 	FROM notificacoes WHERE id_notificacoes = $id LIMIT 1),
		(SELECT usuaio_requerente_notificacoes 	FROM notificacoes WHERE id_notificacoes = $id LIMIT 1),
		(SELECT tipo_alteracao_notificacoes 	FROM notificacoes WHERE id_notificacoes = $id LIMIT 1),
		(SELECT notificacoes_config_id 			FROM notificacoes WHERE id_notificacoes = $id LIMIT 1)
	);";
	echo $sql;
	$verifica = $pdo->prepare($sql);
	$resultadoOperacao = $verifica->execute();

	echo "        ".$resultadoOperacao;

	if ($resultadoOperacao == "1" || $resultadoOperacao == 1) {
		/*$sql = "DELETE FROM notificacoes WHERE id_notificacoes = ".$id;
		$verifica = $pdo->prepare($sql);
		$resultadoOperacao = $verifica->execute();
		echo $resultadoOperacao;*/
	}
}
?>