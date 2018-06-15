
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class pedido_pagamentoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraPedido_pagamento(Pedido_pagamento $entidadePedido_pagamento, $area){

		// Configuração de notificação
		/* $area = 'pedido_pagamento'; */
		$usuarioAtuador = $entidadePedido_pagamento->get('usuario_id'); 
		$descricaoNotificacao = 'Parcela Atual => '.$entidadePedido_pagamento->get('parcela_atual_pedido_pagamento').'<br>';
		$descricaoNotificacao .= 'Parcela Total => '.$entidadePedido_pagamento->get('parcela_total_pedido_pagamento').'<br>';
		$descricaoNotificacao .= 'Valor Pago => '.$entidadePedido_pagamento->get('valor_pago_pedido_pagamento').'<br>';
		$descricaoBool = $entidadePedido_pagamento->get('bool_esta_pago_pedido_pagamento') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Esta Pago => '.$descricaoBool.'<br>';
		$descricaoNotificacao .= 'Pedido => /%/SELECT * FROM pedido WHERE id_pedido = '.$entidadePedido_pagamento->get('pedido_id').'/%/<br>';
		$descricaoNotificacao .= 'Condição De Pagamento => /%/SELECT * FROM condicao_de_pagamento WHERE id_condicao_de_pagamento = '.$entidadePedido_pagamento->get('condicao_de_pagamento_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido_pagamento->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadePedido_pagamento->get('bool_ativo_pedido_pagamento') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':parcela_atual_pedido_pagamento'=>$entidadePedido_pagamento->get('parcela_atual_pedido_pagamento'), 
				':parcela_total_pedido_pagamento'=>$entidadePedido_pagamento->get('parcela_total_pedido_pagamento'), 
				':valor_pago_pedido_pagamento'=>$entidadePedido_pagamento->get('valor_pago_pedido_pagamento'), 
				':bool_esta_pago_pedido_pagamento'=>$entidadePedido_pagamento->get('bool_esta_pago_pedido_pagamento'), 
				':pedido_id'=>$entidadePedido_pagamento->get('pedido_id'), 
				':condicao_de_pagamento_id'=>$entidadePedido_pagamento->get('condicao_de_pagamento_id'), 
				':usuario_id'=>$entidadePedido_pagamento->get('usuario_id'), 
				':bool_ativo_pedido_pagamento'=>$entidadePedido_pagamento->get('bool_ativo_pedido_pagamento')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO pedido_pagamento (parcela_atual_pedido_pagamento, parcela_total_pedido_pagamento, valor_pago_pedido_pagamento, bool_esta_pago_pedido_pagamento, pedido_id, condicao_de_pagamento_id, usuario_id, bool_ativo_pedido_pagamento) VALUES (:parcela_atual_pedido_pagamento, :parcela_total_pedido_pagamento, :valor_pago_pedido_pagamento, :bool_esta_pago_pedido_pagamento, :pedido_id, :condicao_de_pagamento_id, :usuario_id, :bool_ativo_pedido_pagamento);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Pedido_pagamento ".$ex->getMessage();
		}
	}


	function atualizaPedido_pagamento(Pedido_pagamento $entidadePedido_pagamento, $id, $area){

		// Configuração de notificação
		/* $area = 'pedido_pagamento'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadePedido_pagamento->get('usuario_id'); 
		$sql = "SELECT * FROM pedido_pagamento WHERE id_pedido_pagamento = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['parcela_atual_pedido_pagamento'] != $entidadePedido_pagamento->get('parcela_atual_pedido_pagamento')) {
				$descricaoNotificacao .= '<b style="color: red">Parcela Atual: '.$dados['parcela_atual_pedido_pagamento'].' => '.$entidadePedido_pagamento->get('parcela_atual_pedido_pagamento').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Parcela Atual => '.$entidadePedido_pagamento->get('parcela_atual_pedido_pagamento').'<br>';
			}
			if ($dados['parcela_total_pedido_pagamento'] != $entidadePedido_pagamento->get('parcela_total_pedido_pagamento')) {
				$descricaoNotificacao .= '<b style="color: red">Parcela Total: '.$dados['parcela_total_pedido_pagamento'].' => '.$entidadePedido_pagamento->get('parcela_total_pedido_pagamento').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Parcela Total => '.$entidadePedido_pagamento->get('parcela_total_pedido_pagamento').'<br>';
			}
			if ($dados['valor_pago_pedido_pagamento'] != $entidadePedido_pagamento->get('valor_pago_pedido_pagamento')) {
				$descricaoNotificacao .= '<b style="color: red">Valor Pago: '.$dados['valor_pago_pedido_pagamento'].' => '.$entidadePedido_pagamento->get('valor_pago_pedido_pagamento').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Valor Pago => '.$entidadePedido_pagamento->get('valor_pago_pedido_pagamento').'<br>';
			}
			if ($dados['bool_esta_pago_pedido_pagamento'] != $entidadePedido_pagamento->get('bool_esta_pago_pedido_pagamento')) {
				$descricaoBool = $entidadePedido_pagamento->get('bool_esta_pago_pedido_pagamento') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_esta_pago_pedido_pagamento'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Esta Pago: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadePedido_pagamento->get('bool_esta_pago_pedido_pagamento') == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= 'Esta Pago => '.$descricaoBool.'<br>';
			}
			if ($dados['pedido_id'] != $entidadePedido_pagamento->get('pedido_id')) {
				$descricaoNotificacao .= '<b style="color: red">Pedido: /%/SELECT * FROM pedido WHERE id_pedido = '.$dados['pedido_id'].'/%/ => /%/SELECT * FROM pedido WHERE id_pedido = '.$entidadePedido_pagamento->get('pedido_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Pedido => /%/SELECT * FROM pedido WHERE id_pedido = '.$entidadePedido_pagamento->get('pedido_id').'/%/<br>';
			}
			if ($dados['condicao_de_pagamento_id'] != $entidadePedido_pagamento->get('condicao_de_pagamento_id')) {
				$descricaoNotificacao .= '<b style="color: red">Condição De Pagamento: /%/SELECT * FROM condicao_de_pagamento WHERE id_condicao_de_pagamento = '.$dados['condicao_de_pagamento_id'].'/%/ => /%/SELECT * FROM condicao_de_pagamento WHERE id_condicao_de_pagamento = '.$entidadePedido_pagamento->get('condicao_de_pagamento_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Condição De Pagamento => /%/SELECT * FROM condicao_de_pagamento WHERE id_condicao_de_pagamento = '.$entidadePedido_pagamento->get('condicao_de_pagamento_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadePedido_pagamento->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido_pagamento->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido_pagamento->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_pedido_pagamento'] != $entidadePedido_pagamento->get('bool_ativo_pedido_pagamento')) {
				$descricaoBool = $entidadePedido_pagamento->get('bool_ativo_pedido_pagamento') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_pedido_pagamento'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadePedido_pagamento->get('bool_ativo_pedido_pagamento') == 1 ? "Sim" : "Não";
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
				':parcela_atual_pedido_pagamento'=>$entidadePedido_pagamento->get('parcela_atual_pedido_pagamento'), 
				':parcela_total_pedido_pagamento'=>$entidadePedido_pagamento->get('parcela_total_pedido_pagamento'), 
				':valor_pago_pedido_pagamento'=>$entidadePedido_pagamento->get('valor_pago_pedido_pagamento'), 
				':bool_esta_pago_pedido_pagamento'=>$entidadePedido_pagamento->get('bool_esta_pago_pedido_pagamento'), 
				':pedido_id'=>$entidadePedido_pagamento->get('pedido_id'), 
				':condicao_de_pagamento_id'=>$entidadePedido_pagamento->get('condicao_de_pagamento_id'), 
				':usuario_id'=>$entidadePedido_pagamento->get('usuario_id'), 
				':bool_ativo_pedido_pagamento'=>$entidadePedido_pagamento->get('bool_ativo_pedido_pagamento')
			);

			$stmt = $this->pdo->prepare("UPDATE pedido_pagamento SET parcela_atual_pedido_pagamento = :parcela_atual_pedido_pagamento, parcela_total_pedido_pagamento = :parcela_total_pedido_pagamento, valor_pago_pedido_pagamento = :valor_pago_pedido_pagamento, bool_esta_pago_pedido_pagamento = :bool_esta_pago_pedido_pagamento, pedido_id = :pedido_id, condicao_de_pagamento_id = :condicao_de_pagamento_id, usuario_id = :usuario_id, bool_ativo_pedido_pagamento = :bool_ativo_pedido_pagamento WHERE id_pedido_pagamento = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Pedido_pagamento ".$ex->getMessage();
		}
	}
}
?>