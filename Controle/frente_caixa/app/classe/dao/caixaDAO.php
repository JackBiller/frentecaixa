
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class caixaDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraCaixa(Caixa $entidadeCaixa, $area){

		// Configuração de notificação
		/* $area = 'caixa'; */
		$usuarioAtuador = $entidadeCaixa->get('usuario_id'); 
		$descricaoNotificacao = 'Descrição => '.$entidadeCaixa->get('descricao_caixa').'<br>';
		$descricaoNotificacao .= 'Filial => /%/SELECT * FROM filial WHERE id_filial = '.$entidadeCaixa->get('filial_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCaixa->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeCaixa->get('bool_ativo_caixa') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':descricao_caixa'=>$entidadeCaixa->get('descricao_caixa'), 
				':filial_id'=>$entidadeCaixa->get('filial_id'), 
				':usuario_id'=>$entidadeCaixa->get('usuario_id'), 
				':bool_ativo_caixa'=>$entidadeCaixa->get('bool_ativo_caixa')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO caixa (descricao_caixa, filial_id, usuario_id, bool_ativo_caixa) VALUES (:descricao_caixa, :filial_id, :usuario_id, :bool_ativo_caixa);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Caixa ".$ex->getMessage();
		}
	}


	function atualizaCaixa(Caixa $entidadeCaixa, $id, $area){

		// Configuração de notificação
		/* $area = 'caixa'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeCaixa->get('usuario_id'); 
		$sql = "SELECT * FROM caixa WHERE id_caixa = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['descricao_caixa'] != $entidadeCaixa->get('descricao_caixa')) {
				$descricaoNotificacao .= '<b style="color: red">Descrição: '.$dados['descricao_caixa'].' => '.$entidadeCaixa->get('descricao_caixa').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Descrição => '.$entidadeCaixa->get('descricao_caixa').'<br>';
			}
			if ($dados['filial_id'] != $entidadeCaixa->get('filial_id')) {
				$descricaoNotificacao .= '<b style="color: red">Filial: /%/SELECT * FROM filial WHERE id_filial = '.$dados['filial_id'].'/%/ => /%/SELECT * FROM filial WHERE id_filial = '.$entidadeCaixa->get('filial_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Filial => /%/SELECT * FROM filial WHERE id_filial = '.$entidadeCaixa->get('filial_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadeCaixa->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCaixa->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCaixa->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_caixa'] != $entidadeCaixa->get('bool_ativo_caixa')) {
				$descricaoBool = $entidadeCaixa->get('bool_ativo_caixa') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_caixa'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeCaixa->get('bool_ativo_caixa') == 1 ? "Sim" : "Não";
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
				':descricao_caixa'=>$entidadeCaixa->get('descricao_caixa'), 
				':filial_id'=>$entidadeCaixa->get('filial_id'), 
				':usuario_id'=>$entidadeCaixa->get('usuario_id'), 
				':bool_ativo_caixa'=>$entidadeCaixa->get('bool_ativo_caixa')
			);

			$stmt = $this->pdo->prepare("UPDATE caixa SET descricao_caixa = :descricao_caixa, filial_id = :filial_id, usuario_id = :usuario_id, bool_ativo_caixa = :bool_ativo_caixa WHERE id_caixa = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Caixa ".$ex->getMessage();
		}
	}
}
?>