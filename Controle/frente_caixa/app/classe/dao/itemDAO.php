
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class itemDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraItem(Item $entidadeItem, $area){

		// Configuração de notificação
		/* $area = 'item'; */
		$usuarioAtuador = $entidadeItem->get('usuario_id'); 
		$descricaoNotificacao = 'Descrição => '.$entidadeItem->get('descricao_item').'<br>';
		$descricaoNotificacao .= 'Grupo => /%/SELECT * FROM grupo WHERE id_grupo = '.$entidadeItem->get('grupo_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeItem->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeItem->get('bool_ativo_item') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':descricao_item'=>$entidadeItem->get('descricao_item'), 
				':grupo_id'=>$entidadeItem->get('grupo_id'), 
				':usuario_id'=>$entidadeItem->get('usuario_id'), 
				':bool_ativo_item'=>$entidadeItem->get('bool_ativo_item')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO item (descricao_item, grupo_id, usuario_id, bool_ativo_item) VALUES (:descricao_item, :grupo_id, :usuario_id, :bool_ativo_item);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Item ".$ex->getMessage();
		}
	}


	function atualizaItem(Item $entidadeItem, $id, $area){

		// Configuração de notificação
		/* $area = 'item'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeItem->get('usuario_id'); 
		$sql = "SELECT * FROM item WHERE id_item = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['descricao_item'] != $entidadeItem->get('descricao_item')) {
				$descricaoNotificacao .= '<b style="color: red">Descrição: '.$dados['descricao_item'].' => '.$entidadeItem->get('descricao_item').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Descrição => '.$entidadeItem->get('descricao_item').'<br>';
			}
			if ($dados['grupo_id'] != $entidadeItem->get('grupo_id')) {
				$descricaoNotificacao .= '<b style="color: red">Grupo: /%/SELECT * FROM grupo WHERE id_grupo = '.$dados['grupo_id'].'/%/ => /%/SELECT * FROM grupo WHERE id_grupo = '.$entidadeItem->get('grupo_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Grupo => /%/SELECT * FROM grupo WHERE id_grupo = '.$entidadeItem->get('grupo_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadeItem->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeItem->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeItem->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_item'] != $entidadeItem->get('bool_ativo_item')) {
				$descricaoBool = $entidadeItem->get('bool_ativo_item') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_item'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeItem->get('bool_ativo_item') == 1 ? "Sim" : "Não";
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
				':descricao_item'=>$entidadeItem->get('descricao_item'), 
				':grupo_id'=>$entidadeItem->get('grupo_id'), 
				':usuario_id'=>$entidadeItem->get('usuario_id'), 
				':bool_ativo_item'=>$entidadeItem->get('bool_ativo_item')
			);

			$stmt = $this->pdo->prepare("UPDATE item SET descricao_item = :descricao_item, grupo_id = :grupo_id, usuario_id = :usuario_id, bool_ativo_item = :bool_ativo_item WHERE id_item = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Item ".$ex->getMessage();
		}
	}
}
?>