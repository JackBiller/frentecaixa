
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class pedidoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraPedido(Pedido $entidadePedido, $area){

		// Configuração de notificação
		/* $area = 'pedido'; */
		$usuarioAtuador = $entidadePedido->get('usuario_id'); 
		$descricaoNotificacao = 'Documento => '.$entidadePedido->get('documento_pedido').'<br>';
		$descricaoNotificacao .= 'Total => '.$entidadePedido->get('total_pedido').'<br>';
		$descricaoNotificacao .= 'Cliente => /%/SELECT * FROM cliente WHERE id_cliente = '.$entidadePedido->get('cliente_id').'/%/<br>';
		$descricaoNotificacao .= 'Nome Cliente => '.$entidadePedido->get('nome_cliente_pedido').'<br>';
		$descricaoBool = $entidadePedido->get('bool_finalizado_pedido') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Finalizado => '.$descricaoBool.'<br>';
		$descricaoNotificacao .= 'Filial => /%/SELECT * FROM filial WHERE id_filial = '.$entidadePedido->get('filial_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadePedido->get('bool_ativo_pedido') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':documento_pedido'=>$entidadePedido->get('documento_pedido'), 
				':total_pedido'=>$entidadePedido->get('total_pedido'), 
				':cliente_id'=>$entidadePedido->get('cliente_id'), 
				':nome_cliente_pedido'=>$entidadePedido->get('nome_cliente_pedido'), 
				':bool_finalizado_pedido'=>$entidadePedido->get('bool_finalizado_pedido'), 
				':filial_id'=>$entidadePedido->get('filial_id'), 
				':usuario_id'=>$entidadePedido->get('usuario_id'), 
				':bool_ativo_pedido'=>$entidadePedido->get('bool_ativo_pedido')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO pedido (documento_pedido, total_pedido, cliente_id, nome_cliente_pedido, bool_finalizado_pedido, filial_id, usuario_id, bool_ativo_pedido) VALUES (:documento_pedido, :total_pedido, :cliente_id, :nome_cliente_pedido, :bool_finalizado_pedido, :filial_id, :usuario_id, :bool_ativo_pedido);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Pedido ".$ex->getMessage();
		}
	}


	function atualizaPedido(Pedido $entidadePedido, $id, $area){

		// Configuração de notificação
		/* $area = 'pedido'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadePedido->get('usuario_id'); 
		$sql = "SELECT * FROM pedido WHERE id_pedido = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['documento_pedido'] != $entidadePedido->get('documento_pedido')) {
				$descricaoNotificacao .= '<b style="color: red">Documento: '.$dados['documento_pedido'].' => '.$entidadePedido->get('documento_pedido').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Documento => '.$entidadePedido->get('documento_pedido').'<br>';
			}
			if ($dados['total_pedido'] != $entidadePedido->get('total_pedido')) {
				$descricaoNotificacao .= '<b style="color: red">Total: '.$dados['total_pedido'].' => '.$entidadePedido->get('total_pedido').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Total => '.$entidadePedido->get('total_pedido').'<br>';
			}
			if ($dados['cliente_id'] != $entidadePedido->get('cliente_id')) {
				$descricaoNotificacao .= '<b style="color: red">Cliente: /%/SELECT * FROM cliente WHERE id_cliente = '.$dados['cliente_id'].'/%/ => /%/SELECT * FROM cliente WHERE id_cliente = '.$entidadePedido->get('cliente_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Cliente => /%/SELECT * FROM cliente WHERE id_cliente = '.$entidadePedido->get('cliente_id').'/%/<br>';
			}
			if ($dados['nome_cliente_pedido'] != $entidadePedido->get('nome_cliente_pedido')) {
				$descricaoNotificacao .= '<b style="color: red">Nome Cliente: '.$dados['nome_cliente_pedido'].' => '.$entidadePedido->get('nome_cliente_pedido').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Nome Cliente => '.$entidadePedido->get('nome_cliente_pedido').'<br>';
			}
			if ($dados['bool_finalizado_pedido'] != $entidadePedido->get('bool_finalizado_pedido')) {
				$descricaoBool = $entidadePedido->get('bool_finalizado_pedido') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_finalizado_pedido'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Finalizado: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadePedido->get('bool_finalizado_pedido') == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= 'Finalizado => '.$descricaoBool.'<br>';
			}
			if ($dados['filial_id'] != $entidadePedido->get('filial_id')) {
				$descricaoNotificacao .= '<b style="color: red">Filial: /%/SELECT * FROM filial WHERE id_filial = '.$dados['filial_id'].'/%/ => /%/SELECT * FROM filial WHERE id_filial = '.$entidadePedido->get('filial_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Filial => /%/SELECT * FROM filial WHERE id_filial = '.$entidadePedido->get('filial_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadePedido->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadePedido->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_pedido'] != $entidadePedido->get('bool_ativo_pedido')) {
				$descricaoBool = $entidadePedido->get('bool_ativo_pedido') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_pedido'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadePedido->get('bool_ativo_pedido') == 1 ? "Sim" : "Não";
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
				':documento_pedido'=>$entidadePedido->get('documento_pedido'), 
				':total_pedido'=>$entidadePedido->get('total_pedido'), 
				':cliente_id'=>$entidadePedido->get('cliente_id'), 
				':nome_cliente_pedido'=>$entidadePedido->get('nome_cliente_pedido'), 
				':bool_finalizado_pedido'=>$entidadePedido->get('bool_finalizado_pedido'), 
				':filial_id'=>$entidadePedido->get('filial_id'), 
				':usuario_id'=>$entidadePedido->get('usuario_id'), 
				':bool_ativo_pedido'=>$entidadePedido->get('bool_ativo_pedido')
			);

			$stmt = $this->pdo->prepare("UPDATE pedido SET documento_pedido = :documento_pedido, total_pedido = :total_pedido, cliente_id = :cliente_id, nome_cliente_pedido = :nome_cliente_pedido, bool_finalizado_pedido = :bool_finalizado_pedido, filial_id = :filial_id, usuario_id = :usuario_id, bool_ativo_pedido = :bool_ativo_pedido WHERE id_pedido = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Pedido ".$ex->getMessage();
		}
	}
}
?>