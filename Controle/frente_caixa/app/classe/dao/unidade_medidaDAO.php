
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class unidade_medidaDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraUnidade_medida(Unidade_medida $entidadeUnidade_medida, $area){

		// Configuração de notificação
		/* $area = 'unidade_medida'; */
		$usuarioAtuador = $entidadeUnidade_medida->get('usuario_id'); 
		$descricaoNotificacao = 'Descrição => '.$entidadeUnidade_medida->get('descricao_unidade_medida').'<br>';
		$descricaoNotificacao .= 'Sigla => '.$entidadeUnidade_medida->get('sigla_unidade_medida').'<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeUnidade_medida->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeUnidade_medida->get('bool_ativo_unidade_medida') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':descricao_unidade_medida'=>$entidadeUnidade_medida->get('descricao_unidade_medida'), 
				':sigla_unidade_medida'=>$entidadeUnidade_medida->get('sigla_unidade_medida'), 
				':usuario_id'=>$entidadeUnidade_medida->get('usuario_id'), 
				':bool_ativo_unidade_medida'=>$entidadeUnidade_medida->get('bool_ativo_unidade_medida')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO unidade_medida (descricao_unidade_medida, sigla_unidade_medida, usuario_id, bool_ativo_unidade_medida) VALUES (:descricao_unidade_medida, :sigla_unidade_medida, :usuario_id, :bool_ativo_unidade_medida);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Unidade_medida ".$ex->getMessage();
		}
	}


	function atualizaUnidade_medida(Unidade_medida $entidadeUnidade_medida, $id, $area){

		// Configuração de notificação
		/* $area = 'unidade_medida'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeUnidade_medida->get('usuario_id'); 
		$sql = "SELECT * FROM unidade_medida WHERE id_unidade_medida = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['descricao_unidade_medida'] != $entidadeUnidade_medida->get('descricao_unidade_medida')) {
				$descricaoNotificacao .= '<b style="color: red">Descrição: '.$dados['descricao_unidade_medida'].' => '.$entidadeUnidade_medida->get('descricao_unidade_medida').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Descrição => '.$entidadeUnidade_medida->get('descricao_unidade_medida').'<br>';
			}
			if ($dados['sigla_unidade_medida'] != $entidadeUnidade_medida->get('sigla_unidade_medida')) {
				$descricaoNotificacao .= '<b style="color: red">Sigla: '.$dados['sigla_unidade_medida'].' => '.$entidadeUnidade_medida->get('sigla_unidade_medida').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Sigla => '.$entidadeUnidade_medida->get('sigla_unidade_medida').'<br>';
			}
			if ($dados['usuario_id'] != $entidadeUnidade_medida->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeUnidade_medida->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeUnidade_medida->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_unidade_medida'] != $entidadeUnidade_medida->get('bool_ativo_unidade_medida')) {
				$descricaoBool = $entidadeUnidade_medida->get('bool_ativo_unidade_medida') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_unidade_medida'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeUnidade_medida->get('bool_ativo_unidade_medida') == 1 ? "Sim" : "Não";
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
				':descricao_unidade_medida'=>$entidadeUnidade_medida->get('descricao_unidade_medida'), 
				':sigla_unidade_medida'=>$entidadeUnidade_medida->get('sigla_unidade_medida'), 
				':usuario_id'=>$entidadeUnidade_medida->get('usuario_id'), 
				':bool_ativo_unidade_medida'=>$entidadeUnidade_medida->get('bool_ativo_unidade_medida')
			);

			$stmt = $this->pdo->prepare("UPDATE unidade_medida SET descricao_unidade_medida = :descricao_unidade_medida, sigla_unidade_medida = :sigla_unidade_medida, usuario_id = :usuario_id, bool_ativo_unidade_medida = :bool_ativo_unidade_medida WHERE id_unidade_medida = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Unidade_medida ".$ex->getMessage();
		}
	}
}
?>