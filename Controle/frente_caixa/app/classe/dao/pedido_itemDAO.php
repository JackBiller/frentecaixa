
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class pedido_itemDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraPedido_item(Pedido_item $entidadePedido_item, $area){

		// Configuração de notificação
		/* $area = 'pedido_item'; */
		$usuarioAtuador = $entidadePedido_item->get('usuario_id'); 
		$descricaoNotificacao = 'Quantidade => '.$entidadePedido_item->get('quantidade_pedido_item').'<br>';
		$descricaoNotificacao .= 'Valor Unitário => '.$entidadePedido_item->get('valor_unitario_pedido_item').'<br>';
		$descricaoNotificacao .= 'Valor Total => '.$entidadePedido_item->get('valor_total_pedido_item').'<br>';
		$descricaoNotificacao .= 'Item => /%/SELECT * FROM item WHERE id_item = '.$entidadePedido_item->get('item_id').'/%/<br>';
		$descricaoNotificacao .= 'Item Unidade Medida => /%/SELECT * FROM item_unidade_medida WHERE id_item_unidade_medida = '.$entidadePedido_item->get('item_unidade_medida_id').'/%/<br>';
		$descricaoNotificacao .= 'Pedido => /%/SELECT * FROM pedido WHERE id_pedido = '.$entidadePedido_item->get('pedido_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido_item->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadePedido_item->get('bool_ativo_pedido_item') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':quantidade_pedido_item'=>$entidadePedido_item->get('quantidade_pedido_item'), 
				':valor_unitario_pedido_item'=>$entidadePedido_item->get('valor_unitario_pedido_item'), 
				':valor_total_pedido_item'=>$entidadePedido_item->get('valor_total_pedido_item'), 
				':item_id'=>$entidadePedido_item->get('item_id'), 
				':item_unidade_medida_id'=>$entidadePedido_item->get('item_unidade_medida_id'), 
				':pedido_id'=>$entidadePedido_item->get('pedido_id'), 
				':usuario_id'=>$entidadePedido_item->get('usuario_id'), 
				':bool_ativo_pedido_item'=>$entidadePedido_item->get('bool_ativo_pedido_item')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO pedido_item (quantidade_pedido_item, valor_unitario_pedido_item, valor_total_pedido_item, item_id, item_unidade_medida_id, pedido_id, usuario_id, bool_ativo_pedido_item) VALUES (:quantidade_pedido_item, :valor_unitario_pedido_item, :valor_total_pedido_item, :item_id, :item_unidade_medida_id, :pedido_id, :usuario_id, :bool_ativo_pedido_item);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Pedido_item ".$ex->getMessage();
		}
	}


	function atualizaPedido_item(Pedido_item $entidadePedido_item, $id, $area){

		// Configuração de notificação
		/* $area = 'pedido_item'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadePedido_item->get('usuario_id'); 
		$sql = "SELECT * FROM pedido_item WHERE id_pedido_item = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['quantidade_pedido_item'] != $entidadePedido_item->get('quantidade_pedido_item')) {
				$descricaoNotificacao .= '<b style="color: red">Quantidade: '.$dados['quantidade_pedido_item'].' => '.$entidadePedido_item->get('quantidade_pedido_item').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Quantidade => '.$entidadePedido_item->get('quantidade_pedido_item').'<br>';
			}
			if ($dados['valor_unitario_pedido_item'] != $entidadePedido_item->get('valor_unitario_pedido_item')) {
				$descricaoNotificacao .= '<b style="color: red">Valor Unitário: '.$dados['valor_unitario_pedido_item'].' => '.$entidadePedido_item->get('valor_unitario_pedido_item').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Valor Unitário => '.$entidadePedido_item->get('valor_unitario_pedido_item').'<br>';
			}
			if ($dados['valor_total_pedido_item'] != $entidadePedido_item->get('valor_total_pedido_item')) {
				$descricaoNotificacao .= '<b style="color: red">Valor Total: '.$dados['valor_total_pedido_item'].' => '.$entidadePedido_item->get('valor_total_pedido_item').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Valor Total => '.$entidadePedido_item->get('valor_total_pedido_item').'<br>';
			}
			if ($dados['item_id'] != $entidadePedido_item->get('item_id')) {
				$descricaoNotificacao .= '<b style="color: red">Item: /%/SELECT * FROM item WHERE id_item = '.$dados['item_id'].'/%/ => /%/SELECT * FROM item WHERE id_item = '.$entidadePedido_item->get('item_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Item => /%/SELECT * FROM item WHERE id_item = '.$entidadePedido_item->get('item_id').'/%/<br>';
			}
			if ($dados['item_unidade_medida_id'] != $entidadePedido_item->get('item_unidade_medida_id')) {
				$descricaoNotificacao .= '<b style="color: red">Item Unidade Medida: /%/SELECT * FROM item_unidade_medida WHERE id_item_unidade_medida = '.$dados['item_unidade_medida_id'].'/%/ => /%/SELECT * FROM item_unidade_medida WHERE id_item_unidade_medida = '.$entidadePedido_item->get('item_unidade_medida_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Item Unidade Medida => /%/SELECT * FROM item_unidade_medida WHERE id_item_unidade_medida = '.$entidadePedido_item->get('item_unidade_medida_id').'/%/<br>';
			}
			if ($dados['pedido_id'] != $entidadePedido_item->get('pedido_id')) {
				$descricaoNotificacao .= '<b style="color: red">Pedido: /%/SELECT * FROM pedido WHERE id_pedido = '.$dados['pedido_id'].'/%/ => /%/SELECT * FROM pedido WHERE id_pedido = '.$entidadePedido_item->get('pedido_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Pedido => /%/SELECT * FROM pedido WHERE id_pedido = '.$entidadePedido_item->get('pedido_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadePedido_item->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido_item->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido_item->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_pedido_item'] != $entidadePedido_item->get('bool_ativo_pedido_item')) {
				$descricaoBool = $entidadePedido_item->get('bool_ativo_pedido_item') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_pedido_item'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadePedido_item->get('bool_ativo_pedido_item') == 1 ? "Sim" : "Não";
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
				':quantidade_pedido_item'=>$entidadePedido_item->get('quantidade_pedido_item'), 
				':valor_unitario_pedido_item'=>$entidadePedido_item->get('valor_unitario_pedido_item'), 
				':valor_total_pedido_item'=>$entidadePedido_item->get('valor_total_pedido_item'), 
				':item_id'=>$entidadePedido_item->get('item_id'), 
				':item_unidade_medida_id'=>$entidadePedido_item->get('item_unidade_medida_id'), 
				':pedido_id'=>$entidadePedido_item->get('pedido_id'), 
				':usuario_id'=>$entidadePedido_item->get('usuario_id'), 
				':bool_ativo_pedido_item'=>$entidadePedido_item->get('bool_ativo_pedido_item')
			);

			$stmt = $this->pdo->prepare("UPDATE pedido_item SET quantidade_pedido_item = :quantidade_pedido_item, valor_unitario_pedido_item = :valor_unitario_pedido_item, valor_total_pedido_item = :valor_total_pedido_item, item_id = :item_id, item_unidade_medida_id = :item_unidade_medida_id, pedido_id = :pedido_id, usuario_id = :usuario_id, bool_ativo_pedido_item = :bool_ativo_pedido_item WHERE id_pedido_item = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Pedido_item ".$ex->getMessage();
		}
	}
}
?>