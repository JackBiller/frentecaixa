
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class item_unidade_medidaDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraItem_unidade_medida(Item_unidade_medida $entidadeItem_unidade_medida, $area){

		// Configuração de notificação
		/* $area = 'item_unidade_medida'; */
		$usuarioAtuador = $entidadeItem_unidade_medida->get('usuario_id'); 
		$descricaoNotificacao = 'Quantidade => '.$entidadeItem_unidade_medida->get('quantidade_item_unidade_medida').'<br>';
		$descricaoNotificacao .= 'Item => /%/SELECT * FROM item WHERE id_item = '.$entidadeItem_unidade_medida->get('item_id').'/%/<br>';
		$descricaoNotificacao .= 'Unidade Medida => /%/SELECT * FROM unidade_medida WHERE id_unidade_medida = '.$entidadeItem_unidade_medida->get('unidade_medida_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeItem_unidade_medida->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeItem_unidade_medida->get('bool_ativo_item_unidade_medida') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':quantidade_item_unidade_medida'=>$entidadeItem_unidade_medida->get('quantidade_item_unidade_medida'), 
				':item_id'=>$entidadeItem_unidade_medida->get('item_id'), 
				':unidade_medida_id'=>$entidadeItem_unidade_medida->get('unidade_medida_id'), 
				':usuario_id'=>$entidadeItem_unidade_medida->get('usuario_id'), 
				':bool_ativo_item_unidade_medida'=>$entidadeItem_unidade_medida->get('bool_ativo_item_unidade_medida')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO item_unidade_medida (quantidade_item_unidade_medida, item_id, unidade_medida_id, usuario_id, bool_ativo_item_unidade_medida) VALUES (:quantidade_item_unidade_medida, :item_id, :unidade_medida_id, :usuario_id, :bool_ativo_item_unidade_medida);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Item_unidade_medida ".$ex->getMessage();
		}
	}


	function atualizaItem_unidade_medida(Item_unidade_medida $entidadeItem_unidade_medida, $id, $area){

		// Configuração de notificação
		/* $area = 'item_unidade_medida'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeItem_unidade_medida->get('usuario_id'); 
		$sql = "SELECT * FROM item_unidade_medida WHERE id_item_unidade_medida = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['quantidade_item_unidade_medida'] != $entidadeItem_unidade_medida->get('quantidade_item_unidade_medida')) {
				$descricaoNotificacao .= '<b style="color: red">Quantidade: '.$dados['quantidade_item_unidade_medida'].' => '.$entidadeItem_unidade_medida->get('quantidade_item_unidade_medida').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Quantidade => '.$entidadeItem_unidade_medida->get('quantidade_item_unidade_medida').'<br>';
			}
			if ($dados['item_id'] != $entidadeItem_unidade_medida->get('item_id')) {
				$descricaoNotificacao .= '<b style="color: red">Item: /%/SELECT * FROM item WHERE id_item = '.$dados['item_id'].'/%/ => /%/SELECT * FROM item WHERE id_item = '.$entidadeItem_unidade_medida->get('item_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Item => /%/SELECT * FROM item WHERE id_item = '.$entidadeItem_unidade_medida->get('item_id').'/%/<br>';
			}
			if ($dados['unidade_medida_id'] != $entidadeItem_unidade_medida->get('unidade_medida_id')) {
				$descricaoNotificacao .= '<b style="color: red">Unidade Medida: /%/SELECT * FROM unidade_medida WHERE id_unidade_medida = '.$dados['unidade_medida_id'].'/%/ => /%/SELECT * FROM unidade_medida WHERE id_unidade_medida = '.$entidadeItem_unidade_medida->get('unidade_medida_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Unidade Medida => /%/SELECT * FROM unidade_medida WHERE id_unidade_medida = '.$entidadeItem_unidade_medida->get('unidade_medida_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadeItem_unidade_medida->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeItem_unidade_medida->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeItem_unidade_medida->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_item_unidade_medida'] != $entidadeItem_unidade_medida->get('bool_ativo_item_unidade_medida')) {
				$descricaoBool = $entidadeItem_unidade_medida->get('bool_ativo_item_unidade_medida') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_item_unidade_medida'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeItem_unidade_medida->get('bool_ativo_item_unidade_medida') == 1 ? "Sim" : "Não";
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
				':quantidade_item_unidade_medida'=>$entidadeItem_unidade_medida->get('quantidade_item_unidade_medida'), 
				':item_id'=>$entidadeItem_unidade_medida->get('item_id'), 
				':unidade_medida_id'=>$entidadeItem_unidade_medida->get('unidade_medida_id'), 
				':usuario_id'=>$entidadeItem_unidade_medida->get('usuario_id'), 
				':bool_ativo_item_unidade_medida'=>$entidadeItem_unidade_medida->get('bool_ativo_item_unidade_medida')
			);

			$stmt = $this->pdo->prepare("UPDATE item_unidade_medida SET quantidade_item_unidade_medida = :quantidade_item_unidade_medida, item_id = :item_id, unidade_medida_id = :unidade_medida_id, usuario_id = :usuario_id, bool_ativo_item_unidade_medida = :bool_ativo_item_unidade_medida WHERE id_item_unidade_medida = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Item_unidade_medida ".$ex->getMessage();
		}
	}
}
?>