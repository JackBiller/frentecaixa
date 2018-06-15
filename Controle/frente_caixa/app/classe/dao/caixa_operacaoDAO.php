
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class caixa_operacaoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraCaixa_operacao(Caixa_operacao $entidadeCaixa_operacao, $area){

		// Configuração de notificação
		/* $area = 'caixa_operacao'; */
		$usuarioAtuador = $entidadeCaixa_operacao->get('usuario_id'); 
		$descricaoNotificacao = 'Valor => '.$entidadeCaixa_operacao->get('valor_caixa_operacao').'<br>';
		$descricaoNotificacao .= 'Caixa Movimentacao => /%/SELECT * FROM caixa_movimentacao WHERE id_caixa_movimentacao = '.$entidadeCaixa_operacao->get('caixa_movimentacao_id').'/%/<br>';
		$descricaoNotificacao .= 'Operações Caixa => /%/SELECT * FROM operacoes_caixa WHERE id_operacoes_caixa = '.$entidadeCaixa_operacao->get('operacoes_caixa_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCaixa_operacao->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeCaixa_operacao->get('bool_ativo_caixa_operacao') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':valor_caixa_operacao'=>$entidadeCaixa_operacao->get('valor_caixa_operacao'), 
				':caixa_movimentacao_id'=>$entidadeCaixa_operacao->get('caixa_movimentacao_id'), 
				':operacoes_caixa_id'=>$entidadeCaixa_operacao->get('operacoes_caixa_id'), 
				':usuario_id'=>$entidadeCaixa_operacao->get('usuario_id'), 
				':bool_ativo_caixa_operacao'=>$entidadeCaixa_operacao->get('bool_ativo_caixa_operacao')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO caixa_operacao (valor_caixa_operacao, caixa_movimentacao_id, operacoes_caixa_id, usuario_id, bool_ativo_caixa_operacao) VALUES (:valor_caixa_operacao, :caixa_movimentacao_id, :operacoes_caixa_id, :usuario_id, :bool_ativo_caixa_operacao);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Caixa_operacao ".$ex->getMessage();
		}
	}


	function atualizaCaixa_operacao(Caixa_operacao $entidadeCaixa_operacao, $id, $area){

		// Configuração de notificação
		/* $area = 'caixa_operacao'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeCaixa_operacao->get('usuario_id'); 
		$sql = "SELECT * FROM caixa_operacao WHERE id_caixa_operacao = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['valor_caixa_operacao'] != $entidadeCaixa_operacao->get('valor_caixa_operacao')) {
				$descricaoNotificacao .= '<b style="color: red">Valor: '.$dados['valor_caixa_operacao'].' => '.$entidadeCaixa_operacao->get('valor_caixa_operacao').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Valor => '.$entidadeCaixa_operacao->get('valor_caixa_operacao').'<br>';
			}
			if ($dados['caixa_movimentacao_id'] != $entidadeCaixa_operacao->get('caixa_movimentacao_id')) {
				$descricaoNotificacao .= '<b style="color: red">Caixa Movimentacao: /%/SELECT * FROM caixa_movimentacao WHERE id_caixa_movimentacao = '.$dados['caixa_movimentacao_id'].'/%/ => /%/SELECT * FROM caixa_movimentacao WHERE id_caixa_movimentacao = '.$entidadeCaixa_operacao->get('caixa_movimentacao_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Caixa Movimentacao => /%/SELECT * FROM caixa_movimentacao WHERE id_caixa_movimentacao = '.$entidadeCaixa_operacao->get('caixa_movimentacao_id').'/%/<br>';
			}
			if ($dados['operacoes_caixa_id'] != $entidadeCaixa_operacao->get('operacoes_caixa_id')) {
				$descricaoNotificacao .= '<b style="color: red">Operações Caixa: /%/SELECT * FROM operacoes_caixa WHERE id_operacoes_caixa = '.$dados['operacoes_caixa_id'].'/%/ => /%/SELECT * FROM operacoes_caixa WHERE id_operacoes_caixa = '.$entidadeCaixa_operacao->get('operacoes_caixa_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Operações Caixa => /%/SELECT * FROM operacoes_caixa WHERE id_operacoes_caixa = '.$entidadeCaixa_operacao->get('operacoes_caixa_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadeCaixa_operacao->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCaixa_operacao->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCaixa_operacao->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_caixa_operacao'] != $entidadeCaixa_operacao->get('bool_ativo_caixa_operacao')) {
				$descricaoBool = $entidadeCaixa_operacao->get('bool_ativo_caixa_operacao') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_caixa_operacao'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeCaixa_operacao->get('bool_ativo_caixa_operacao') == 1 ? "Sim" : "Não";
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
				':valor_caixa_operacao'=>$entidadeCaixa_operacao->get('valor_caixa_operacao'), 
				':caixa_movimentacao_id'=>$entidadeCaixa_operacao->get('caixa_movimentacao_id'), 
				':operacoes_caixa_id'=>$entidadeCaixa_operacao->get('operacoes_caixa_id'), 
				':usuario_id'=>$entidadeCaixa_operacao->get('usuario_id'), 
				':bool_ativo_caixa_operacao'=>$entidadeCaixa_operacao->get('bool_ativo_caixa_operacao')
			);

			$stmt = $this->pdo->prepare("UPDATE caixa_operacao SET valor_caixa_operacao = :valor_caixa_operacao, caixa_movimentacao_id = :caixa_movimentacao_id, operacoes_caixa_id = :operacoes_caixa_id, usuario_id = :usuario_id, bool_ativo_caixa_operacao = :bool_ativo_caixa_operacao WHERE id_caixa_operacao = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Caixa_operacao ".$ex->getMessage();
		}
	}
}
?>