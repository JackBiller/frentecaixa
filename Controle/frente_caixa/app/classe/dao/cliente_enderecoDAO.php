
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class cliente_enderecoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraCliente_endereco(Cliente_endereco $entidadeCliente_endereco, $area){

		// Configuração de notificação
		/* $area = 'cliente_endereco'; */
		$usuarioAtuador = $entidadeCliente_endereco->get('usuario_id'); 
		$descricaoNotificacao = 'Endereço => '.$entidadeCliente_endereco->get('endereco_cliente_endereco').'<br>';
		$descricaoNotificacao .= 'Número => '.$entidadeCliente_endereco->get('numero_cliente_endereco').'<br>';
		$descricaoNotificacao .= 'Complemento => '.$entidadeCliente_endereco->get('complemento_cliente_endereco').'<br>';
		$descricaoNotificacao .= 'Bairro => '.$entidadeCliente_endereco->get('bairro_cliente_endereco').'<br>';
		$descricaoNotificacao .= 'Cidade => '.$entidadeCliente_endereco->get('cidade_cliente_endereco').'<br>';
		$descricaoNotificacao .= 'Estado => /%/SELECT * FROM estado WHERE id_estado = '.$entidadeCliente_endereco->get('estado_id').'/%/<br>';
		$descricaoNotificacao .= 'Cliente => /%/SELECT * FROM cliente WHERE id_cliente = '.$entidadeCliente_endereco->get('cliente_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCliente_endereco->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeCliente_endereco->get('bool_ativo_cliente_endereco') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':endereco_cliente_endereco'=>$entidadeCliente_endereco->get('endereco_cliente_endereco'), 
				':numero_cliente_endereco'=>$entidadeCliente_endereco->get('numero_cliente_endereco'), 
				':complemento_cliente_endereco'=>$entidadeCliente_endereco->get('complemento_cliente_endereco'), 
				':bairro_cliente_endereco'=>$entidadeCliente_endereco->get('bairro_cliente_endereco'), 
				':cidade_cliente_endereco'=>$entidadeCliente_endereco->get('cidade_cliente_endereco'), 
				':estado_id'=>$entidadeCliente_endereco->get('estado_id'), 
				':cliente_id'=>$entidadeCliente_endereco->get('cliente_id'), 
				':usuario_id'=>$entidadeCliente_endereco->get('usuario_id'), 
				':bool_ativo_cliente_endereco'=>$entidadeCliente_endereco->get('bool_ativo_cliente_endereco')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO cliente_endereco (endereco_cliente_endereco, numero_cliente_endereco, complemento_cliente_endereco, bairro_cliente_endereco, cidade_cliente_endereco, estado_id, cliente_id, usuario_id, bool_ativo_cliente_endereco) VALUES (:endereco_cliente_endereco, :numero_cliente_endereco, :complemento_cliente_endereco, :bairro_cliente_endereco, :cidade_cliente_endereco, :estado_id, :cliente_id, :usuario_id, :bool_ativo_cliente_endereco);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Cliente_endereco ".$ex->getMessage();
		}
	}


	function atualizaCliente_endereco(Cliente_endereco $entidadeCliente_endereco, $id, $area){

		// Configuração de notificação
		/* $area = 'cliente_endereco'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeCliente_endereco->get('usuario_id'); 
		$sql = "SELECT * FROM cliente_endereco WHERE id_cliente_endereco = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['endereco_cliente_endereco'] != $entidadeCliente_endereco->get('endereco_cliente_endereco')) {
				$descricaoNotificacao .= '<b style="color: red">Endereço: '.$dados['endereco_cliente_endereco'].' => '.$entidadeCliente_endereco->get('endereco_cliente_endereco').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Endereço => '.$entidadeCliente_endereco->get('endereco_cliente_endereco').'<br>';
			}
			if ($dados['numero_cliente_endereco'] != $entidadeCliente_endereco->get('numero_cliente_endereco')) {
				$descricaoNotificacao .= '<b style="color: red">Número: '.$dados['numero_cliente_endereco'].' => '.$entidadeCliente_endereco->get('numero_cliente_endereco').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Número => '.$entidadeCliente_endereco->get('numero_cliente_endereco').'<br>';
			}
			if ($dados['complemento_cliente_endereco'] != $entidadeCliente_endereco->get('complemento_cliente_endereco')) {
				$descricaoNotificacao .= '<b style="color: red">Complemento: '.$dados['complemento_cliente_endereco'].' => '.$entidadeCliente_endereco->get('complemento_cliente_endereco').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Complemento => '.$entidadeCliente_endereco->get('complemento_cliente_endereco').'<br>';
			}
			if ($dados['bairro_cliente_endereco'] != $entidadeCliente_endereco->get('bairro_cliente_endereco')) {
				$descricaoNotificacao .= '<b style="color: red">Bairro: '.$dados['bairro_cliente_endereco'].' => '.$entidadeCliente_endereco->get('bairro_cliente_endereco').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Bairro => '.$entidadeCliente_endereco->get('bairro_cliente_endereco').'<br>';
			}
			if ($dados['cidade_cliente_endereco'] != $entidadeCliente_endereco->get('cidade_cliente_endereco')) {
				$descricaoNotificacao .= '<b style="color: red">Cidade: '.$dados['cidade_cliente_endereco'].' => '.$entidadeCliente_endereco->get('cidade_cliente_endereco').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Cidade => '.$entidadeCliente_endereco->get('cidade_cliente_endereco').'<br>';
			}
			if ($dados['estado_id'] != $entidadeCliente_endereco->get('estado_id')) {
				$descricaoNotificacao .= '<b style="color: red">Estado: /%/SELECT * FROM estado WHERE id_estado = '.$dados['estado_id'].'/%/ => /%/SELECT * FROM estado WHERE id_estado = '.$entidadeCliente_endereco->get('estado_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Estado => /%/SELECT * FROM estado WHERE id_estado = '.$entidadeCliente_endereco->get('estado_id').'/%/<br>';
			}
			if ($dados['cliente_id'] != $entidadeCliente_endereco->get('cliente_id')) {
				$descricaoNotificacao .= '<b style="color: red">Cliente: /%/SELECT * FROM cliente WHERE id_cliente = '.$dados['cliente_id'].'/%/ => /%/SELECT * FROM cliente WHERE id_cliente = '.$entidadeCliente_endereco->get('cliente_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Cliente => /%/SELECT * FROM cliente WHERE id_cliente = '.$entidadeCliente_endereco->get('cliente_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadeCliente_endereco->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCliente_endereco->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeCliente_endereco->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_cliente_endereco'] != $entidadeCliente_endereco->get('bool_ativo_cliente_endereco')) {
				$descricaoBool = $entidadeCliente_endereco->get('bool_ativo_cliente_endereco') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_cliente_endereco'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeCliente_endereco->get('bool_ativo_cliente_endereco') == 1 ? "Sim" : "Não";
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
				':endereco_cliente_endereco'=>$entidadeCliente_endereco->get('endereco_cliente_endereco'), 
				':numero_cliente_endereco'=>$entidadeCliente_endereco->get('numero_cliente_endereco'), 
				':complemento_cliente_endereco'=>$entidadeCliente_endereco->get('complemento_cliente_endereco'), 
				':bairro_cliente_endereco'=>$entidadeCliente_endereco->get('bairro_cliente_endereco'), 
				':cidade_cliente_endereco'=>$entidadeCliente_endereco->get('cidade_cliente_endereco'), 
				':estado_id'=>$entidadeCliente_endereco->get('estado_id'), 
				':cliente_id'=>$entidadeCliente_endereco->get('cliente_id'), 
				':usuario_id'=>$entidadeCliente_endereco->get('usuario_id'), 
				':bool_ativo_cliente_endereco'=>$entidadeCliente_endereco->get('bool_ativo_cliente_endereco')
			);

			$stmt = $this->pdo->prepare("UPDATE cliente_endereco SET endereco_cliente_endereco = :endereco_cliente_endereco, numero_cliente_endereco = :numero_cliente_endereco, complemento_cliente_endereco = :complemento_cliente_endereco, bairro_cliente_endereco = :bairro_cliente_endereco, cidade_cliente_endereco = :cidade_cliente_endereco, estado_id = :estado_id, cliente_id = :cliente_id, usuario_id = :usuario_id, bool_ativo_cliente_endereco = :bool_ativo_cliente_endereco WHERE id_cliente_endereco = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Cliente_endereco ".$ex->getMessage();
		}
	}
}
?>