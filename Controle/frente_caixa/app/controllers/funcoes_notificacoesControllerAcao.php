<?php 	

function registrarNotificacao($area, $descricao_notificacoes, $usuario_atuador_notificacoes, $tipo_alteracao_notificacoes, $pdo){

	$resultadoOperacao = "1";
	$tipo_alteracao_notificacoesBusca = "";
	$descricaoAuxiliar = "";
	
	switch($tipo_alteracao_notificacoes) {
		case "i" : 
			$tipo_alteracao_notificacoesBusca = "I";
			$descricaoAuxiliar = "<b>Registro inserido:</b><br>";
			break;
		case "u" : 
			$tipo_alteracao_notificacoesBusca = "U";
			$descricaoAuxiliar = "<b>Registro alterado:</b><br>";
			break;
		case "d" : 
			$tipo_alteracao_notificacoesBusca = "D";
			$descricaoAuxiliar = "<b>Registro apagado:</b><br>";
			break;
	}

	$sql = "SELECT id_notificacoes_config , usuario_id
			FROM notificacoes_config 
			WHERE area_notificacoes_config = '$area' 
			AND bool_ativo_notificacoes_config = 1 
			AND tipo_alteracao_notificacoes_config LIKE '%".$tipo_alteracao_notificacoesBusca."%';";
	// AND usuario_id <> $usuario_atuador_notificacoes


	$descricao_notificacoes = "<b>Aréa de Atuação: </b>".$area."<br>".$descricaoAuxiliar.$descricao_notificacoes;

	$verifica = $pdo->query($sql);
	foreach ($verifica as $dados){
		if ($resultadoOperacao == "1") {
			$sql = "INSERT INTO notificacoes 
					(
						descricao_notificacoes, 
						usuario_atuador_notificacoes, 
						usuaio_requerente_notificacoes, 
						tipo_alteracao_notificacoes, 
						notificacoes_config_id, 
						bool_view_notificacoes
					)
					 VALUES 
					(
						'$descricao_notificacoes', 
						'$usuario_atuador_notificacoes', 
						'".$dados['usuario_id']."', 
						'$tipo_alteracao_notificacoes', 
						'".$dados['id_notificacoes_config']."', 
						0
					)";
			$verifica = $pdo->prepare($sql);
			$resultadoOperacao = $verifica->execute();
		}
	}
}


function formataData($dataEn){
	$dataBr = substr($dataEn, 0, 10);
	$dataBr = explode("-", $dataBr);
	$dataBr = array_reverse($dataBr);
	$dataBr = implode("/", $dataBr);
	$dataBr = $dataBr . substr($dataEn, 10, strlen($dataEn));

	return $dataBr;
}


if (!empty($_POST['setarNotificacaoView'])) {
	$usuario = $_POST['usuario_id'];
	$sql = "UPDATE notificacoes SET bool_view_notificacoes = 1 WHERE usuaio_requerente_notificacoes = $usuario;";
	$verifica = $pdo->prepare($sql);
	echo $verifica->execute();
}

/*
	descricao_notificacoes
	usuario_atuador_notificacoes
	usuaio_requerente_notificacoes
	tipo_alteracao_notificacoes // i , u , d 
	notificacoes_config_id
	bool_view_notificacoes // padrão -> 0 
	data_atualizacao_notificacoes // Não mandar 
	bool_ativo_notificacoes // Não Mandar 
*/

?>