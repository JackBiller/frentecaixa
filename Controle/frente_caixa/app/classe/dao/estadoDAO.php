
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class estadoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraEstado(Estado $entidadeEstado, $area){

		// Configuração de notificação
		/* $area = 'estado'; */
		$usuarioAtuador = $entidadeEstado->get('usuario_id'); 
		$descricaoNotificacao = 'Descrição => '.$entidadeEstado->get('descricao_estado').'<br>';
		$descricaoNotificacao .= 'Sigla => '.$entidadeEstado->get('sigla_estado').'<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeEstado->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeEstado->get('bool_ativo_estado') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':descricao_estado'=>$entidadeEstado->get('descricao_estado'), 
				':sigla_estado'=>$entidadeEstado->get('sigla_estado'), 
				':usuario_id'=>$entidadeEstado->get('usuario_id'), 
				':bool_ativo_estado'=>$entidadeEstado->get('bool_ativo_estado')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO estado (descricao_estado, sigla_estado, usuario_id, bool_ativo_estado) VALUES (:descricao_estado, :sigla_estado, :usuario_id, :bool_ativo_estado);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Estado ".$ex->getMessage();
		}
	}


	function atualizaEstado(Estado $entidadeEstado, $id, $area){

		// Configuração de notificação
		/* $area = 'estado'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeEstado->get('usuario_id'); 
		$sql = "SELECT * FROM estado WHERE id_estado = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['descricao_estado'] != $entidadeEstado->get('descricao_estado')) {
				$descricaoNotificacao .= '<b style="color: red">Descrição: '.$dados['descricao_estado'].' => '.$entidadeEstado->get('descricao_estado').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Descrição => '.$entidadeEstado->get('descricao_estado').'<br>';
			}
			if ($dados['sigla_estado'] != $entidadeEstado->get('sigla_estado')) {
				$descricaoNotificacao .= '<b style="color: red">Sigla: '.$dados['sigla_estado'].' => '.$entidadeEstado->get('sigla_estado').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Sigla => '.$entidadeEstado->get('sigla_estado').'<br>';
			}
			if ($dados['usuario_id'] != $entidadeEstado->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeEstado->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeEstado->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_estado'] != $entidadeEstado->get('bool_ativo_estado')) {
				$descricaoBool = $entidadeEstado->get('bool_ativo_estado') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_estado'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeEstado->get('bool_ativo_estado') == 1 ? "Sim" : "Não";
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
				':descricao_estado'=>$entidadeEstado->get('descricao_estado'), 
				':sigla_estado'=>$entidadeEstado->get('sigla_estado'), 
				':usuario_id'=>$entidadeEstado->get('usuario_id'), 
				':bool_ativo_estado'=>$entidadeEstado->get('bool_ativo_estado')
			);

			$stmt = $this->pdo->prepare("UPDATE estado SET descricao_estado = :descricao_estado, sigla_estado = :sigla_estado, usuario_id = :usuario_id, bool_ativo_estado = :bool_ativo_estado WHERE id_estado = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Estado ".$ex->getMessage();
		}
	}
}
?>