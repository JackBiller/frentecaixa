
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class caixa_movimentacaoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraCaixa_movimentacao(Caixa_movimentacao $entidadeCaixa_movimentacao, $area){

		// Configuração de notificação
		/* $area = 'caixa_movimentacao'; */
		$usuarioAtuador = $entidadeCaixa_movimentacao->get('usuario_id'); 
		$descricaoNotificacao = 'Valor Abertura => '.$entidadeCaixa_movimentacao->get('valor_abertura_caixa_movimentacao').'<br>';
		$descricaoNotificacao .= 'Valor Fechamento => '.$entidadeCaixa_movimentacao->get('valor_fechamento_caixa_movimentacao').'<br>';
		$descricaoNotificacao .= 'Data Fechamento => '.formataData($entidadeCaixa_movimentacao->get('data_fechamento_caixa_movimentacao')).'<br>';
		$descricaoNotificacao .= 'Caixa => /%/SELECT * FROM caixa WHERE id_caixa = '.$entidadeCaixa_movimentacao->get('caixa_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCaixa_movimentacao->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeCaixa_movimentacao->get('bool_ativo_caixa_movimentacao') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':valor_abertura_caixa_movimentacao'=>$entidadeCaixa_movimentacao->get('valor_abertura_caixa_movimentacao'), 
				':valor_fechamento_caixa_movimentacao'=>$entidadeCaixa_movimentacao->get('valor_fechamento_caixa_movimentacao'), 
				':data_fechamento_caixa_movimentacao'=>$entidadeCaixa_movimentacao->get('data_fechamento_caixa_movimentacao'), 
				':caixa_id'=>$entidadeCaixa_movimentacao->get('caixa_id'), 
				':usuario_id'=>$entidadeCaixa_movimentacao->get('usuario_id'), 
				':bool_ativo_caixa_movimentacao'=>$entidadeCaixa_movimentacao->get('bool_ativo_caixa_movimentacao')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO caixa_movimentacao (valor_abertura_caixa_movimentacao, valor_fechamento_caixa_movimentacao, data_fechamento_caixa_movimentacao, caixa_id, usuario_id, bool_ativo_caixa_movimentacao) VALUES (:valor_abertura_caixa_movimentacao, :valor_fechamento_caixa_movimentacao, :data_fechamento_caixa_movimentacao, :caixa_id, :usuario_id, :bool_ativo_caixa_movimentacao);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Caixa_movimentacao ".$ex->getMessage();
		}
	}


	function atualizaCaixa_movimentacao(Caixa_movimentacao $entidadeCaixa_movimentacao, $id, $area){

		// Configuração de notificação
		/* $area = 'caixa_movimentacao'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeCaixa_movimentacao->get('usuario_id'); 
		$sql = "SELECT * FROM caixa_movimentacao WHERE id_caixa_movimentacao = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['valor_abertura_caixa_movimentacao'] != $entidadeCaixa_movimentacao->get('valor_abertura_caixa_movimentacao')) {
				$descricaoNotificacao .= '<b style="color: red">Valor Abertura: '.$dados['valor_abertura_caixa_movimentacao'].' => '.$entidadeCaixa_movimentacao->get('valor_abertura_caixa_movimentacao').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Valor Abertura => '.$entidadeCaixa_movimentacao->get('valor_abertura_caixa_movimentacao').'<br>';
			}
			if ($dados['valor_fechamento_caixa_movimentacao'] != $entidadeCaixa_movimentacao->get('valor_fechamento_caixa_movimentacao')) {
				$descricaoNotificacao .= '<b style="color: red">Valor Fechamento: '.$dados['valor_fechamento_caixa_movimentacao'].' => '.$entidadeCaixa_movimentacao->get('valor_fechamento_caixa_movimentacao').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Valor Fechamento => '.$entidadeCaixa_movimentacao->get('valor_fechamento_caixa_movimentacao').'<br>';
			}
			if ($dados['data_fechamento_caixa_movimentacao'] != $entidadeCaixa_movimentacao->get('data_fechamento_caixa_movimentacao')) {
				$descricaoNotificacao .= '<b style="color: red">Data Fechamento: '.formataData($dados['data_fechamento_caixa_movimentacao']).' => '.formataData($entidadeCaixa_movimentacao->get('data_fechamento_caixa_movimentacao')).'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Data Fechamento => '.$entidadeCaixa_movimentacao->get('data_fechamento_caixa_movimentacao').'<br>';
			}
			if ($dados['caixa_id'] != $entidadeCaixa_movimentacao->get('caixa_id')) {
				$descricaoNotificacao .= '<b style="color: red">Caixa: /%/SELECT * FROM caixa WHERE id_caixa = '.$dados['caixa_id'].'/%/ => /%/SELECT * FROM caixa WHERE id_caixa = '.$entidadeCaixa_movimentacao->get('caixa_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Caixa => /%/SELECT * FROM caixa WHERE id_caixa = '.$entidadeCaixa_movimentacao->get('caixa_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadeCaixa_movimentacao->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCaixa_movimentacao->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCaixa_movimentacao->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_caixa_movimentacao'] != $entidadeCaixa_movimentacao->get('bool_ativo_caixa_movimentacao')) {
				$descricaoBool = $entidadeCaixa_movimentacao->get('bool_ativo_caixa_movimentacao') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_caixa_movimentacao'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeCaixa_movimentacao->get('bool_ativo_caixa_movimentacao') == 1 ? "Sim" : "Não";
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
				':valor_abertura_caixa_movimentacao'=>$entidadeCaixa_movimentacao->get('valor_abertura_caixa_movimentacao'), 
				':valor_fechamento_caixa_movimentacao'=>$entidadeCaixa_movimentacao->get('valor_fechamento_caixa_movimentacao'), 
				':data_fechamento_caixa_movimentacao'=>$entidadeCaixa_movimentacao->get('data_fechamento_caixa_movimentacao'), 
				':caixa_id'=>$entidadeCaixa_movimentacao->get('caixa_id'), 
				':usuario_id'=>$entidadeCaixa_movimentacao->get('usuario_id'), 
				':bool_ativo_caixa_movimentacao'=>$entidadeCaixa_movimentacao->get('bool_ativo_caixa_movimentacao')
			);

			$stmt = $this->pdo->prepare("UPDATE caixa_movimentacao SET valor_abertura_caixa_movimentacao = :valor_abertura_caixa_movimentacao, valor_fechamento_caixa_movimentacao = :valor_fechamento_caixa_movimentacao, data_fechamento_caixa_movimentacao = :data_fechamento_caixa_movimentacao, caixa_id = :caixa_id, usuario_id = :usuario_id, bool_ativo_caixa_movimentacao = :bool_ativo_caixa_movimentacao WHERE id_caixa_movimentacao = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Caixa_movimentacao ".$ex->getMessage();
		}
	}
}
?>