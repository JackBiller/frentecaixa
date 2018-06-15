
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class empresaDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraEmpresa(Empresa $entidadeEmpresa, $area){

		// Configuração de notificação
		/* $area = 'empresa'; */
		$usuarioAtuador = $entidadeEmpresa->get('usuario_id'); 
		$descricaoNotificacao = 'Razão Social => '.$entidadeEmpresa->get('razao_social_empresa').'<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeEmpresa->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeEmpresa->get('bool_ativo_empresa') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':razao_social_empresa'=>$entidadeEmpresa->get('razao_social_empresa'), 
				':usuario_id'=>$entidadeEmpresa->get('usuario_id'), 
				':bool_ativo_empresa'=>$entidadeEmpresa->get('bool_ativo_empresa')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO empresa (razao_social_empresa, usuario_id, bool_ativo_empresa) VALUES (:razao_social_empresa, :usuario_id, :bool_ativo_empresa);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Empresa ".$ex->getMessage();
		}
	}


	function atualizaEmpresa(Empresa $entidadeEmpresa, $id, $area){

		// Configuração de notificação
		/* $area = 'empresa'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeEmpresa->get('usuario_id'); 
		$sql = "SELECT * FROM empresa WHERE id_empresa = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['razao_social_empresa'] != $entidadeEmpresa->get('razao_social_empresa')) {
				$descricaoNotificacao .= '<b style="color: red">Razão Social: '.$dados['razao_social_empresa'].' => '.$entidadeEmpresa->get('razao_social_empresa').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Razão Social => '.$entidadeEmpresa->get('razao_social_empresa').'<br>';
			}
			if ($dados['usuario_id'] != $entidadeEmpresa->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeEmpresa->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeEmpresa->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_empresa'] != $entidadeEmpresa->get('bool_ativo_empresa')) {
				$descricaoBool = $entidadeEmpresa->get('bool_ativo_empresa') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_empresa'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeEmpresa->get('bool_ativo_empresa') == 1 ? "Sim" : "Não";
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
				':razao_social_empresa'=>$entidadeEmpresa->get('razao_social_empresa'), 
				':usuario_id'=>$entidadeEmpresa->get('usuario_id'), 
				':bool_ativo_empresa'=>$entidadeEmpresa->get('bool_ativo_empresa')
			);

			$stmt = $this->pdo->prepare("UPDATE empresa SET razao_social_empresa = :razao_social_empresa, usuario_id = :usuario_id, bool_ativo_empresa = :bool_ativo_empresa WHERE id_empresa = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Empresa ".$ex->getMessage();
		}
	}
}
?>