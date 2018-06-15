
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class cliente_contatoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraCliente_contato(Cliente_contato $entidadeCliente_contato, $area){

		// Configuração de notificação
		/* $area = 'cliente_contato'; */
		$usuarioAtuador = $entidadeCliente_contato->get('usuario_id'); 
		$descricaoNotificacao = 'Telefone => '.$entidadeCliente_contato->get('telefone_cliente_contato').'<br>';
		$descricaoNotificacao .= 'Celular => '.$entidadeCliente_contato->get('celular_cliente_contato').'<br>';
		$descricaoNotificacao .= 'Email => '.$entidadeCliente_contato->get('email_cliente_contato').'<br>';
		$descricaoNotificacao .= 'Cliente => /%/SELECT * FROM cliente WHERE id_cliente = '.$entidadeCliente_contato->get('cliente_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCliente_contato->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeCliente_contato->get('bool_ativo_cliente_contato') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':telefone_cliente_contato'=>$entidadeCliente_contato->get('telefone_cliente_contato'), 
				':celular_cliente_contato'=>$entidadeCliente_contato->get('celular_cliente_contato'), 
				':email_cliente_contato'=>$entidadeCliente_contato->get('email_cliente_contato'), 
				':cliente_id'=>$entidadeCliente_contato->get('cliente_id'), 
				':usuario_id'=>$entidadeCliente_contato->get('usuario_id'), 
				':bool_ativo_cliente_contato'=>$entidadeCliente_contato->get('bool_ativo_cliente_contato')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO cliente_contato (telefone_cliente_contato, celular_cliente_contato, email_cliente_contato, cliente_id, usuario_id, bool_ativo_cliente_contato) VALUES (:telefone_cliente_contato, :celular_cliente_contato, :email_cliente_contato, :cliente_id, :usuario_id, :bool_ativo_cliente_contato);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Cliente_contato ".$ex->getMessage();
		}
	}


	function atualizaCliente_contato(Cliente_contato $entidadeCliente_contato, $id, $area){

		// Configuração de notificação
		/* $area = 'cliente_contato'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeCliente_contato->get('usuario_id'); 
		$sql = "SELECT * FROM cliente_contato WHERE id_cliente_contato = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['telefone_cliente_contato'] != $entidadeCliente_contato->get('telefone_cliente_contato')) {
				$descricaoNotificacao .= '<b style="color: red">Telefone: '.$dados['telefone_cliente_contato'].' => '.$entidadeCliente_contato->get('telefone_cliente_contato').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Telefone => '.$entidadeCliente_contato->get('telefone_cliente_contato').'<br>';
			}
			if ($dados['celular_cliente_contato'] != $entidadeCliente_contato->get('celular_cliente_contato')) {
				$descricaoNotificacao .= '<b style="color: red">Celular: '.$dados['celular_cliente_contato'].' => '.$entidadeCliente_contato->get('celular_cliente_contato').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Celular => '.$entidadeCliente_contato->get('celular_cliente_contato').'<br>';
			}
			if ($dados['email_cliente_contato'] != $entidadeCliente_contato->get('email_cliente_contato')) {
				$descricaoNotificacao .= '<b style="color: red">Email: '.$dados['email_cliente_contato'].' => '.$entidadeCliente_contato->get('email_cliente_contato').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Email => '.$entidadeCliente_contato->get('email_cliente_contato').'<br>';
			}
			if ($dados['cliente_id'] != $entidadeCliente_contato->get('cliente_id')) {
				$descricaoNotificacao .= '<b style="color: red">Cliente: /%/SELECT * FROM cliente WHERE id_cliente = '.$dados['cliente_id'].'/%/ => /%/SELECT * FROM cliente WHERE id_cliente = '.$entidadeCliente_contato->get('cliente_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Cliente => /%/SELECT * FROM cliente WHERE id_cliente = '.$entidadeCliente_contato->get('cliente_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadeCliente_contato->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCliente_contato->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCliente_contato->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_cliente_contato'] != $entidadeCliente_contato->get('bool_ativo_cliente_contato')) {
				$descricaoBool = $entidadeCliente_contato->get('bool_ativo_cliente_contato') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_cliente_contato'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeCliente_contato->get('bool_ativo_cliente_contato') == 1 ? "Sim" : "Não";
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
				':telefone_cliente_contato'=>$entidadeCliente_contato->get('telefone_cliente_contato'), 
				':celular_cliente_contato'=>$entidadeCliente_contato->get('celular_cliente_contato'), 
				':email_cliente_contato'=>$entidadeCliente_contato->get('email_cliente_contato'), 
				':cliente_id'=>$entidadeCliente_contato->get('cliente_id'), 
				':usuario_id'=>$entidadeCliente_contato->get('usuario_id'), 
				':bool_ativo_cliente_contato'=>$entidadeCliente_contato->get('bool_ativo_cliente_contato')
			);

			$stmt = $this->pdo->prepare("UPDATE cliente_contato SET telefone_cliente_contato = :telefone_cliente_contato, celular_cliente_contato = :celular_cliente_contato, email_cliente_contato = :email_cliente_contato, cliente_id = :cliente_id, usuario_id = :usuario_id, bool_ativo_cliente_contato = :bool_ativo_cliente_contato WHERE id_cliente_contato = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Cliente_contato ".$ex->getMessage();
		}
	}
}
?>