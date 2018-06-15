
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class pedido_pagamento_extornoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraPedido_pagamento_extorno(Pedido_pagamento_extorno $entidadePedido_pagamento_extorno, $area){

		// Configuração de notificação
		/* $area = 'pedido_pagamento_extorno'; */
		$usuarioAtuador = $entidadePedido_pagamento_extorno->get('usuario_id'); 
		$descricaoNotificacao = 'Motivo => '.$entidadePedido_pagamento_extorno->get('motivo_pedido_pagamento_extorno').'<br>';
		$descricaoNotificacao .= 'Pedido Pagamento => /%/SELECT * FROM pedido_pagamento WHERE id_pedido_pagamento = '.$entidadePedido_pagamento_extorno->get('pedido_pagamento_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido_pagamento_extorno->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadePedido_pagamento_extorno->get('bool_ativo_pedido_pagamento_extorno') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':motivo_pedido_pagamento_extorno'=>$entidadePedido_pagamento_extorno->get('motivo_pedido_pagamento_extorno'), 
				':pedido_pagamento_id'=>$entidadePedido_pagamento_extorno->get('pedido_pagamento_id'), 
				':usuario_id'=>$entidadePedido_pagamento_extorno->get('usuario_id'), 
				':bool_ativo_pedido_pagamento_extorno'=>$entidadePedido_pagamento_extorno->get('bool_ativo_pedido_pagamento_extorno')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO pedido_pagamento_extorno (motivo_pedido_pagamento_extorno, pedido_pagamento_id, usuario_id, bool_ativo_pedido_pagamento_extorno) VALUES (:motivo_pedido_pagamento_extorno, :pedido_pagamento_id, :usuario_id, :bool_ativo_pedido_pagamento_extorno);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Pedido_pagamento_extorno ".$ex->getMessage();
		}
	}


	function atualizaPedido_pagamento_extorno(Pedido_pagamento_extorno $entidadePedido_pagamento_extorno, $id, $area){

		// Configuração de notificação
		/* $area = 'pedido_pagamento_extorno'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadePedido_pagamento_extorno->get('usuario_id'); 
		$sql = "SELECT * FROM pedido_pagamento_extorno WHERE id_pedido_pagamento_extorno = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['motivo_pedido_pagamento_extorno'] != $entidadePedido_pagamento_extorno->get('motivo_pedido_pagamento_extorno')) {
				$descricaoNotificacao .= '<b style="color: red">Motivo: '.$dados['motivo_pedido_pagamento_extorno'].' => '.$entidadePedido_pagamento_extorno->get('motivo_pedido_pagamento_extorno').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Motivo => '.$entidadePedido_pagamento_extorno->get('motivo_pedido_pagamento_extorno').'<br>';
			}
			if ($dados['pedido_pagamento_id'] != $entidadePedido_pagamento_extorno->get('pedido_pagamento_id')) {
				$descricaoNotificacao .= '<b style="color: red">Pedido Pagamento: /%/SELECT * FROM pedido_pagamento WHERE id_pedido_pagamento = '.$dados['pedido_pagamento_id'].'/%/ => /%/SELECT * FROM pedido_pagamento WHERE id_pedido_pagamento = '.$entidadePedido_pagamento_extorno->get('pedido_pagamento_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Pedido Pagamento => /%/SELECT * FROM pedido_pagamento WHERE id_pedido_pagamento = '.$entidadePedido_pagamento_extorno->get('pedido_pagamento_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadePedido_pagamento_extorno->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido_pagamento_extorno->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido_pagamento_extorno->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_pedido_pagamento_extorno'] != $entidadePedido_pagamento_extorno->get('bool_ativo_pedido_pagamento_extorno')) {
				$descricaoBool = $entidadePedido_pagamento_extorno->get('bool_ativo_pedido_pagamento_extorno') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_pedido_pagamento_extorno'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadePedido_pagamento_extorno->get('bool_ativo_pedido_pagamento_extorno') == 1 ? "Sim" : "Não";
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
				':motivo_pedido_pagamento_extorno'=>$entidadePedido_pagamento_extorno->get('motivo_pedido_pagamento_extorno'), 
				':pedido_pagamento_id'=>$entidadePedido_pagamento_extorno->get('pedido_pagamento_id'), 
				':usuario_id'=>$entidadePedido_pagamento_extorno->get('usuario_id'), 
				':bool_ativo_pedido_pagamento_extorno'=>$entidadePedido_pagamento_extorno->get('bool_ativo_pedido_pagamento_extorno')
			);

			$stmt = $this->pdo->prepare("UPDATE pedido_pagamento_extorno SET motivo_pedido_pagamento_extorno = :motivo_pedido_pagamento_extorno, pedido_pagamento_id = :pedido_pagamento_id, usuario_id = :usuario_id, bool_ativo_pedido_pagamento_extorno = :bool_ativo_pedido_pagamento_extorno WHERE id_pedido_pagamento_extorno = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Pedido_pagamento_extorno ".$ex->getMessage();
		}
	}
}
?>