
<?php

session_start();

require_once "../classe/conexao.php";

$conn = new Conexao();
$pdo = $conn->Connect(); 


if (!empty($_REQUEST['pequisa_nivel_acesso'])) {
	$minha_area_nivel_acesso = "";
	$prefixo = "";
	$matrizReal = "";
	
	$oldCondigo = 0; $newCodigo = 0;
	$oldDesc = ""; $newDesc = "";
	$oldData = ""; $newData = "";
	$oldBool = ""; $newBool = "";

	$objetoAreaNivelAcesso = "";
	$area_nivel_acesso = ""; $area_bool_list = ""; $area_bool_insert = ""; $area_bool_update = ""; 
	$cont = 0; $contTotal = 0;
	/*$usuario = $_POST['usuario'];*/

	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}


	$sql = "SELECT COUNT(*)
			FROM area_nivel_acesso area_nivel_acesso
			INNER JOIN nivel_acesso nivel_acesso 
				ON area_nivel_acesso.nivel_acesso_id = nivel_acesso.id_nivel_acesso
			WHERE nivel_acesso.id_nivel_acesso != 1
			AND (nivel_acesso.descricao_nivel_acesso LIKE '%$filtro%'
				OR nivel_acesso.data_atualizacao_nivel_acesso LIKE '%$filtro%'
				OR nivel_acesso.bool_ativo_nivel_acesso LIKE '%$filtro%' 
				OR area_nivel_acesso.area_area_nivel_acesso LIKE '%$filtro%' 
			)";
	$verifica = $pdo->query($sql);
	$numTotalRegistro = 0;
	foreach ($verifica as $dados) {
		$numTotalRegistro = $dados[0];
	}

	$sql = "SELECT
				area_nivel_acesso.area_area_nivel_acesso,
				area_nivel_acesso.demostrativo_area_nivel_acesso,
				area_nivel_acesso.bool_list_area_nivel_acesso,
				area_nivel_acesso.bool_insert_area_nivel_acesso,
				area_nivel_acesso.bool_update_area_nivel_acesso,
				nivel_acesso.id_nivel_acesso,
				nivel_acesso.descricao_nivel_acesso,
				-- nivel_acesso.usuario_id,
				nivel_acesso.data_atualizacao_nivel_acesso,
				nivel_acesso.bool_ativo_nivel_acesso,
				usuario.nome_usuario
			FROM area_nivel_acesso area_nivel_acesso
			INNER JOIN nivel_acesso nivel_acesso 
				ON area_nivel_acesso.nivel_acesso_id = nivel_acesso.id_nivel_acesso
			INNER JOIN usuario usuario
				ON nivel_acesso.usuario_id = usuario.id_usuario
			WHERE nivel_acesso.id_nivel_acesso != 1
			AND (nivel_acesso.descricao_nivel_acesso LIKE '%$filtro%'
				OR nivel_acesso.data_atualizacao_nivel_acesso LIKE '%$filtro%'
				OR nivel_acesso.bool_ativo_nivel_acesso LIKE '%$filtro%' 
				OR area_nivel_acesso.area_area_nivel_acesso LIKE '%$filtro%' 
			)
			ORDER BY nivel_acesso.id_nivel_acesso, area_nivel_acesso.area_area_nivel_acesso";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		$contTotal++;
		
		$oldCondigo = $newCodigo	; 	$newCodigo 	= $dados['id_nivel_acesso']					;
		$oldDesc 	= $newDesc		; 	$newDesc 	= $dados['descricao_nivel_acesso']			;
		$oldData 	= $newData		; 	$newData 	= $dados['data_atualizacao_nivel_acesso']	;
		$oldBool 	= $newBool		; 	$newBool 	= $dados['bool_ativo_nivel_acesso']			;


		// verificação para montagem do retorno
		if ( $oldCondigo != $newCodigo && $oldCondigo != 0 ) {
			if ($cont != 0) 
				echo    "[]";
				echo
						$oldCondigo."{,}".
						$oldDesc."{,}".
						$objetoAreaNivelAcesso."]{,}".
						$oldData."{,}".
						$dados["nome_usuario"]."{,}".
						$oldBool;
			$objetoAreaNivelAcesso = "";
			$cont++;
		}


		// configurações do objeto a ser setado junto com o registro principal
		$area_nivel_acesso = $dados['area_area_nivel_acesso'];
		$area_bool_list = $dados['bool_list_area_nivel_acesso'];
		$area_bool_insert = $dados['bool_insert_area_nivel_acesso'];
		$area_bool_update = $dados['bool_update_area_nivel_acesso'];
		$demostrativo_nivel_acesso = $dados['demostrativo_area_nivel_acesso'];

		/* Guardar as ares de exibição */
		$prefixo = $objetoAreaNivelAcesso == "" ? "[" : ",";
		$objetoAreaNivelAcesso .= $prefixo.'{
			"area_nivel_acesso"			: "' . $area_nivel_acesso			. '",
			"demostrativo_nivel_acesso"	: "' . $demostrativo_nivel_acesso	. '",
			"bool_list"					:  ' . $area_bool_list				. ' ,
			"bool_insert"				:  ' . $area_bool_insert			. ' ,
			"bool_update"				:  ' . $area_bool_update			. '
		}';


		if ($numTotalRegistro  == $contTotal) {
			if ($cont != 0) 
				echo 	"[]";
				echo    
						$newCodigo."{,}".
						$newDesc."{,}".
						$objetoAreaNivelAcesso."]{,}".
						$newData."{,}".
						$dados["nome_usuario"]."{,}".
						$newBool;
			$objetoAreaNivelAcesso = "";
			$cont++;
		}
	}
}





if (!empty($_POST['pequisa_nivel_acesso_id'])) {
	if (!empty($_POST['id'])) 	$id = $_POST['id'];
	else 						$id = "(SELECT nivel_acesso_id FROM usuario WHERE id_usuario = ".$_SESSION['login'].")";

	$resultado = "[";
	$ctrlVirgula = "";
	$sql = "	SELECT area_nivel_acesso.*
				FROM area_nivel_acesso area_nivel_acesso
				INNER JOIN nivel_acesso nivel_acesso ON area_nivel_acesso.nivel_acesso_id = nivel_acesso.id_nivel_acesso
				WHERE nivel_acesso.id_nivel_acesso = $id
				ORDER BY area_area_nivel_acesso ASC";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {

			$resultado .= $ctrlVirgula.'{
	"descritivo": "'.$dados['demostrativo_area_nivel_acesso'].'",
	"area": "'.$dados['area_area_nivel_acesso'].'",
	"list": '.$dados['bool_list_area_nivel_acesso'].',
	"insert": '.$dados['bool_insert_area_nivel_acesso'].',
	"update": '.$dados['bool_update_area_nivel_acesso'].'
}';

			$ctrlVirgula = ",";
	}
	$resultado .= "]";
	echo $resultado;
}




if (!empty($_POST['pequisa_nivel_acesso_grade'])) {
	$filtro = "";
	if (!empty($_POST['filtro'])) {
		$filtro = $_POST['filtro'];
	}
	$coluna = $_POST['tabela']."_id";
	$id = $_POST['id'];
	$cont = 1;
	$sql = "	SELECT nivel_acesso.* 
				FROM nivel_acesso nivel_acesso 
				WHERE $coluna = $id 
				AND (
					   descricao_nivel_acesso LIKE '%$filtro%'
					OR area_nivel_acesso LIKE '%$filtro%'
					OR data_atualizacao_nivel_acesso LIKE '%$filtro%'
					OR bool_ativo_nivel_acesso LIKE '%$filtro%'
				)
			";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($cont !=  1) 
			echo    "[]";
			echo
					$dados["id_nivel_acesso"]."{,}".
					$dados["descricao_nivel_acesso"]."{,}".
					$dados["area_nivel_acesso"]."{,}".
					$dados["data_atualizacao_nivel_acesso"]."{,}".
					$dados["usuario_id"]."{,}".
					$dados["bool_ativo_nivel_acesso"];
		
		$cont++;
	}
}




if (!empty($_POST['adicionar_nivel_acesso'])) {
	$descricao_nivel_acesso = $_POST['descricao_nivel_acesso'];
	$area_nivel_acesso = $_POST['area_nivel_acesso'];
	$area_nivel_acesso = explode("+", $area_nivel_acesso);

	$listSelecionadas = $_POST['listSelecionadas'];
	$listSelecionadas = explode("+", $listSelecionadas);
	$insertSelecionadas = $_POST['insertSelecionadas'];
	$insertSelecionadas = explode("+", $insertSelecionadas);
	$updateSelecionadas = $_POST['updateSelecionadas'];
	$updateSelecionadas = explode("+", $updateSelecionadas);

	$usuario_id = $_POST['usuario_id'];

	/*
		* Esta query funciona do seguinte modo:
			o nivel_acesso_id no valor 1 tem todos os valores porque é o nivel adiministrativo opr tanto não conta e tem que ser excluido da consulta
			a descrição query lista todas as areas de acesso para que a consulta lista todas as areas que 
	*/
	$sql = "SELECT 
				nivel_acesso_id, 
				area_area_nivel_acesso, 
				bool_list_area_nivel_acesso, 
				bool_insert_area_nivel_acesso, 
				bool_update_area_nivel_acesso
			FROM area_nivel_acesso 
			WHERE nivel_acesso_id != 1
			ORDER BY nivel_acesso_id, area_area_nivel_acesso ASC";

	$verifica = $pdo->query($sql);

	$oldCondigo = 0; $newCodigo = 0; $cont = 0; $stringComparativo = ""; $gravar = true;

	foreach ($verifica as $dados) {
		if ($cont == 0) $oldCondigo = $dados['nivel_acesso_id'];
		$newCodigo = $dados['nivel_acesso_id'];

		if ($oldCondigo != $newCodigo && $cont != 0) {
			if ($stringComparativo == implode("+", $area_nivel_acesso)) {
				$gravar = false;
			}
			$stringComparativo = "";
			$cont = 0;
			$oldCondigo = $dados['nivel_acesso_id'];
		}
		
		if ($cont < sizeof($area_nivel_acesso)) {
			if (
				$dados['bool_list_area_nivel_acesso']   == $listSelecionadas[$cont]		&&
				$dados['bool_insert_area_nivel_acesso'] == $insertSelecionadas[$cont] 	&&
				$dados['bool_update_area_nivel_acesso'] == $updateSelecionadas[$cont]
			) {
				$stringComparativo .= $stringComparativo == "" ? $dados['area_area_nivel_acesso'] : "+".$dados['area_area_nivel_acesso'];
			}
		}

		$cont++;
	}
	if ($cont != 0) {
		if ($stringComparativo == implode("+", $area_nivel_acesso)) {
			$gravar = false;
		}
	}

	if ($gravar) {
		$sql = "INSERT INTO nivel_acesso (descricao_nivel_acesso, area_nivel_acesso, usuario_id)
				VALUES ('$descricao_nivel_acesso', '', $usuario_id);";

		$stmt = $pdo->prepare($sql);
		$stmt->execute();

		$sql = "SELECT id_nivel_acesso FROM nivel_acesso ORDER BY id_nivel_acesso DESC LIMIT 1";
		$verifica = $pdo->query($sql);
		foreach ($verifica as $dados) {
			echo $dados[0];
		}
	}
	else echo 0;
}



if (!empty($_POST['adicionar_area_nivel_acesso'])) {
	$usuario_id = $_POST['usuario_id'];
	$area_area_nivel_acesso = $_POST['area_area_nivel_acesso'];
	$demostrativo_area_nivel_acesso = $_POST['demostrativo_area_nivel_acesso'];
	$bool_list_area_nivel_acesso = $_POST['bool_list_area_nivel_acesso'];
	$bool_insert_area_nivel_acesso = $_POST['bool_insert_area_nivel_acesso'];
	$bool_update_area_nivel_acesso = $_POST['bool_update_area_nivel_acesso'];
	$nivel_acesso_id = $_POST['nivel_acesso_id'];

	$sql = "INSERT INTO area_nivel_acesso (
				usuario_id,
				area_area_nivel_acesso,
				demostrativo_area_nivel_acesso,
				bool_list_area_nivel_acesso,
				bool_insert_area_nivel_acesso,
				bool_update_area_nivel_acesso,
				nivel_acesso_id
			) VALUES (
				$usuario_id,
			   '$area_area_nivel_acesso',
			   '$demostrativo_area_nivel_acesso',
				$bool_list_area_nivel_acesso,
				$bool_insert_area_nivel_acesso,
				$bool_update_area_nivel_acesso,
				$nivel_acesso_id
			);";
	$stmt = $pdo->prepare($sql);
	echo $stmt->execute();
}



if (!empty($_POST['editar_nivel_acesso'])) {
	$gravar = true;
	$saida = "";

	$sql = "SELECT COUNT(*) FROM nivel_acesso 
			WHERE area_nivel_acesso = '".$_POST['area_nivel_acesso']."'
			OR id_nivel_acesso = ".$_POST['id_nivel_acesso'].";";
	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados) {
		if ($dados[0] > 1): $gravar = false; $saida = "Já foi cadastrado um outro Nível de Acesso com essa configuração!"; endif;
	}

	if ($gravar) {
		$id = $_POST['id_nivel_acesso'];
		$descricao_nivel_acesso = $_POST['descricao_nivel_acesso'];
		$area_nivel_acesso = $_POST['area_nivel_acesso'];
		$usuario_id = $_POST['usuario_id'];


		$sql = "UPDATE nivel_acesso SET descricao_nivel_acesso = '$descricao_nivel_acesso', area_nivel_acesso = '$area_nivel_acesso', usuario_id = $usuario_id WHERE id_nivel_acesso = ".$id.";";

		$stmt = $pdo->prepare($sql);
		echo $stmt->execute();
	}
	else echo $saida;
}
?>