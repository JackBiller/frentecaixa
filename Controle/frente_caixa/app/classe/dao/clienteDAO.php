
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class clienteDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraCliente(Cliente $entidadeCliente, $area){

		// Configuração de notificação
		/* $area = 'cliente'; */
		$usuarioAtuador = $entidadeCliente->get('usuario_id'); 
		$descricaoNotificacao = 'Nome => '.$entidadeCliente->get('nome_cliente').'<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCliente->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeCliente->get('bool_ativo_cliente') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':nome_cliente'=>$entidadeCliente->get('nome_cliente'), 
				':usuario_id'=>$entidadeCliente->get('usuario_id'), 
				':bool_ativo_cliente'=>$entidadeCliente->get('bool_ativo_cliente')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO cliente (nome_cliente, usuario_id, bool_ativo_cliente) VALUES (:nome_cliente, :usuario_id, :bool_ativo_cliente);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Cliente ".$ex->getMessage();
		}
	}


	function atualizaCliente(Cliente $entidadeCliente, $id, $area){

		// Configuração de notificação
		/* $area = 'cliente'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeCliente->get('usuario_id'); 
		$sql = "SELECT * FROM cliente WHERE id_cliente = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['nome_cliente'] != $entidadeCliente->get('nome_cliente')) {
				$descricaoNotificacao .= '<b style="color: red">Nome: '.$dados['nome_cliente'].' => '.$entidadeCliente->get('nome_cliente').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Nome => '.$entidadeCliente->get('nome_cliente').'<br>';
			}
			if ($dados['usuario_id'] != $entidadeCliente->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCliente->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCliente->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_cliente'] != $entidadeCliente->get('bool_ativo_cliente')) {
				$descricaoBool = $entidadeCliente->get('bool_ativo_cliente') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_cliente'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeCliente->get('bool_ativo_cliente') == 1 ? "Sim" : "Não";
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
				':nome_cliente'=>$entidadeCliente->get('nome_cliente'), 
				':usuario_id'=>$entidadeCliente->get('usuario_id'), 
				':bool_ativo_cliente'=>$entidadeCliente->get('bool_ativo_cliente')
			);

			$stmt = $this->pdo->prepare("UPDATE cliente SET nome_cliente = :nome_cliente, usuario_id = :usuario_id, bool_ativo_cliente = :bool_ativo_cliente WHERE id_cliente = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Cliente ".$ex->getMessage();
		}
	}
}
?>