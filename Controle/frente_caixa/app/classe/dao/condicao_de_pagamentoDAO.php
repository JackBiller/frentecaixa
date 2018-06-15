
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class condicao_de_pagamentoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraCondicao_de_pagamento(Condicao_de_pagamento $entidadeCondicao_de_pagamento, $area){

		// Configuração de notificação
		/* $area = 'condicao_de_pagamento'; */
		$usuarioAtuador = $entidadeCondicao_de_pagamento->get('usuario_id'); 
		$descricaoNotificacao = 'Descrição => '.$entidadeCondicao_de_pagamento->get('descricao_condicao_de_pagamento').'<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCondicao_de_pagamento->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeCondicao_de_pagamento->get('bool_ativo_condicao_de_pagamento') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':descricao_condicao_de_pagamento'=>$entidadeCondicao_de_pagamento->get('descricao_condicao_de_pagamento'), 
				':usuario_id'=>$entidadeCondicao_de_pagamento->get('usuario_id'), 
				':bool_ativo_condicao_de_pagamento'=>$entidadeCondicao_de_pagamento->get('bool_ativo_condicao_de_pagamento')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO condicao_de_pagamento (descricao_condicao_de_pagamento, usuario_id, bool_ativo_condicao_de_pagamento) VALUES (:descricao_condicao_de_pagamento, :usuario_id, :bool_ativo_condicao_de_pagamento);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Condicao_de_pagamento ".$ex->getMessage();
		}
	}


	function atualizaCondicao_de_pagamento(Condicao_de_pagamento $entidadeCondicao_de_pagamento, $id, $area){

		// Configuração de notificação
		/* $area = 'condicao_de_pagamento'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeCondicao_de_pagamento->get('usuario_id'); 
		$sql = "SELECT * FROM condicao_de_pagamento WHERE id_condicao_de_pagamento = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['descricao_condicao_de_pagamento'] != $entidadeCondicao_de_pagamento->get('descricao_condicao_de_pagamento')) {
				$descricaoNotificacao .= '<b style="color: red">Descrição: '.$dados['descricao_condicao_de_pagamento'].' => '.$entidadeCondicao_de_pagamento->get('descricao_condicao_de_pagamento').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Descrição => '.$entidadeCondicao_de_pagamento->get('descricao_condicao_de_pagamento').'<br>';
			}
			if ($dados['usuario_id'] != $entidadeCondicao_de_pagamento->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCondicao_de_pagamento->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCondicao_de_pagamento->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_condicao_de_pagamento'] != $entidadeCondicao_de_pagamento->get('bool_ativo_condicao_de_pagamento')) {
				$descricaoBool = $entidadeCondicao_de_pagamento->get('bool_ativo_condicao_de_pagamento') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_condicao_de_pagamento'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeCondicao_de_pagamento->get('bool_ativo_condicao_de_pagamento') == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
			}
		}
		$tipo_alteracao_notificacoes = 'u';
		if($descricaoNotificacao != "" && $controleAteracao != 0){
			registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);
		}

		// Tenta atualizar um registro exitente
		try{
			$param = array(
				':descricao_condicao_de_pagamento'=>$entidadeCondicao_de_pagamento->get('descricao_condicao_de_pagamento'), 
				':usuario_id'=>$entidadeCondicao_de_pagamento->get('usuario_id'), 
				':bool_ativo_condicao_de_pagamento'=>$entidadeCondicao_de_pagamento->get('bool_ativo_condicao_de_pagamento')
			);

			$stmt = $this->pdo->prepare("UPDATE condicao_de_pagamento SET descricao_condicao_de_pagamento = :descricao_condicao_de_pagamento, usuario_id = :usuario_id, bool_ativo_condicao_de_pagamento = :bool_ativo_condicao_de_pagamento WHERE id_condicao_de_pagamento = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Condicao_de_pagamento ".$ex->getMessage();
		}
	}
}
?>