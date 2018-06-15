
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class filialDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraFilial(Filial $entidadeFilial, $area){

		// Configuração de notificação
		/* $area = 'filial'; */
		$usuarioAtuador = $entidadeFilial->get('usuario_id'); 
		$descricaoNotificacao = 'Razão Social => '.$entidadeFilial->get('razao_social_filial').'<br>';
		$descricaoNotificacao .= 'Cnpj => '.$entidadeFilial->get('cnpj_filial').'<br>';
		$descricaoNotificacao .= 'Empresa => /%/SELECT * FROM empresa WHERE id_empresa = '.$entidadeFilial->get('empresa_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeFilial->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeFilial->get('bool_ativo_filial') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':razao_social_filial'=>$entidadeFilial->get('razao_social_filial'), 
				':cnpj_filial'=>$entidadeFilial->get('cnpj_filial'), 
				':empresa_id'=>$entidadeFilial->get('empresa_id'), 
				':usuario_id'=>$entidadeFilial->get('usuario_id'), 
				':bool_ativo_filial'=>$entidadeFilial->get('bool_ativo_filial')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO filial (razao_social_filial, cnpj_filial, empresa_id, usuario_id, bool_ativo_filial) VALUES (:razao_social_filial, :cnpj_filial, :empresa_id, :usuario_id, :bool_ativo_filial);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Filial ".$ex->getMessage();
		}
	}


	function atualizaFilial(Filial $entidadeFilial, $id, $area){

		// Configuração de notificação
		/* $area = 'filial'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeFilial->get('usuario_id'); 
		$sql = "SELECT * FROM filial WHERE id_filial = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['razao_social_filial'] != $entidadeFilial->get('razao_social_filial')) {
				$descricaoNotificacao .= '<b style="color: red">Razão Social: '.$dados['razao_social_filial'].' => '.$entidadeFilial->get('razao_social_filial').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Razão Social => '.$entidadeFilial->get('razao_social_filial').'<br>';
			}
			if ($dados['cnpj_filial'] != $entidadeFilial->get('cnpj_filial')) {
				$descricaoNotificacao .= '<b style="color: red">Cnpj: '.$dados['cnpj_filial'].' => '.$entidadeFilial->get('cnpj_filial').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Cnpj => '.$entidadeFilial->get('cnpj_filial').'<br>';
			}
			if ($dados['empresa_id'] != $entidadeFilial->get('empresa_id')) {
				$descricaoNotificacao .= '<b style="color: red">Empresa: /%/SELECT * FROM empresa WHERE id_empresa = '.$dados['empresa_id'].'/%/ => /%/SELECT * FROM empresa WHERE id_empresa = '.$entidadeFilial->get('empresa_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Empresa => /%/SELECT * FROM empresa WHERE id_empresa = '.$entidadeFilial->get('empresa_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadeFilial->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeFilial->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeFilial->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_filial'] != $entidadeFilial->get('bool_ativo_filial')) {
				$descricaoBool = $entidadeFilial->get('bool_ativo_filial') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_filial'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeFilial->get('bool_ativo_filial') == 1 ? "Sim" : "Não";
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
				':razao_social_filial'=>$entidadeFilial->get('razao_social_filial'), 
				':cnpj_filial'=>$entidadeFilial->get('cnpj_filial'), 
				':empresa_id'=>$entidadeFilial->get('empresa_id'), 
				':usuario_id'=>$entidadeFilial->get('usuario_id'), 
				':bool_ativo_filial'=>$entidadeFilial->get('bool_ativo_filial')
			);

			$stmt = $this->pdo->prepare("UPDATE filial SET razao_social_filial = :razao_social_filial, cnpj_filial = :cnpj_filial, empresa_id = :empresa_id, usuario_id = :usuario_id, bool_ativo_filial = :bool_ativo_filial WHERE id_filial = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Filial ".$ex->getMessage();
		}
	}
}
?>