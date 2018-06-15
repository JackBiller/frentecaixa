
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class operacoes_caixaDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraOperacoes_caixa(Operacoes_caixa $entidadeOperacoes_caixa, $area){

		// Configuração de notificação
		/* $area = 'operacoes_caixa'; */
		$usuarioAtuador = $entidadeOperacoes_caixa->get('usuario_id'); 
		$descricaoNotificacao = 'Descrição => '.$entidadeOperacoes_caixa->get('descricao_operacoes_caixa').'<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeOperacoes_caixa->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeOperacoes_caixa->get('bool_ativo_operacoes_caixa') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':descricao_operacoes_caixa'=>$entidadeOperacoes_caixa->get('descricao_operacoes_caixa'), 
				':usuario_id'=>$entidadeOperacoes_caixa->get('usuario_id'), 
				':bool_ativo_operacoes_caixa'=>$entidadeOperacoes_caixa->get('bool_ativo_operacoes_caixa')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO operacoes_caixa (descricao_operacoes_caixa, usuario_id, bool_ativo_operacoes_caixa) VALUES (:descricao_operacoes_caixa, :usuario_id, :bool_ativo_operacoes_caixa);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Operacoes_caixa ".$ex->getMessage();
		}
	}


	function atualizaOperacoes_caixa(Operacoes_caixa $entidadeOperacoes_caixa, $id, $area){

		// Configuração de notificação
		/* $area = 'operacoes_caixa'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeOperacoes_caixa->get('usuario_id'); 
		$sql = "SELECT * FROM operacoes_caixa WHERE id_operacoes_caixa = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['descricao_operacoes_caixa'] != $entidadeOperacoes_caixa->get('descricao_operacoes_caixa')) {
				$descricaoNotificacao .= '<b style="color: red">Descrição: '.$dados['descricao_operacoes_caixa'].' => '.$entidadeOperacoes_caixa->get('descricao_operacoes_caixa').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Descrição => '.$entidadeOperacoes_caixa->get('descricao_operacoes_caixa').'<br>';
			}
			if ($dados['usuario_id'] != $entidadeOperacoes_caixa->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeOperacoes_caixa->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeOperacoes_caixa->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_operacoes_caixa'] != $entidadeOperacoes_caixa->get('bool_ativo_operacoes_caixa')) {
				$descricaoBool = $entidadeOperacoes_caixa->get('bool_ativo_operacoes_caixa') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_operacoes_caixa'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeOperacoes_caixa->get('bool_ativo_operacoes_caixa') == 1 ? "Sim" : "Não";
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
				':descricao_operacoes_caixa'=>$entidadeOperacoes_caixa->get('descricao_operacoes_caixa'), 
				':usuario_id'=>$entidadeOperacoes_caixa->get('usuario_id'), 
				':bool_ativo_operacoes_caixa'=>$entidadeOperacoes_caixa->get('bool_ativo_operacoes_caixa')
			);

			$stmt = $this->pdo->prepare("UPDATE operacoes_caixa SET descricao_operacoes_caixa = :descricao_operacoes_caixa, usuario_id = :usuario_id, bool_ativo_operacoes_caixa = :bool_ativo_operacoes_caixa WHERE id_operacoes_caixa = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Operacoes_caixa ".$ex->getMessage();
		}
	}
}
?>