
<?php 
require_once "../classe/conexao.php";
require_once "../controllers/funcoes_notificacoesControllerAcao.php";

class grupoDAO{
	function __construct(){
		$this->conn = new Conexao();
		$this->pdo = $this->conn->Connect();
	}


	function cadastraGrupo(Grupo $entidadeGrupo, $area){

		// Configuração de notificação
		/* $area = 'grupo'; */
		$usuarioAtuador = $entidadeGrupo->get('usuario_id'); 
		$descricaoNotificacao = 'Descrição => '.$entidadeGrupo->get('descricao_grupo').'<br>';
		$descricaoNotificacao .= 'Imagem => '.$entidadeGrupo->get('imagem_grupo').'<br>';
		$descricaoNotificacao .= 'Filial => /%/SELECT * FROM filial WHERE id_filial = '.$entidadeGrupo->get('filial_id').'/%/<br>';
		$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeGrupo->get('usuario_id').'/%/<br>';
		$descricaoBool = $entidadeGrupo->get('bool_ativo_grupo') == 1 ? "Sim" : "Não";
		$descricaoNotificacao .= 'Ativo => '.$descricaoBool.'<br>';
		$tipo_alteracao_notificacoes = 'i';
		registrarNotificacao($area, $descricaoNotificacao, $usuarioAtuador, $tipo_alteracao_notificacoes, $this->pdo);

		// Tentar gravar um novo registro
		try{
			$param = array(
				':descricao_grupo'=>$entidadeGrupo->get('descricao_grupo'), 
				':imagem_grupo'=>$entidadeGrupo->get('imagem_grupo'), 
				':filial_id'=>$entidadeGrupo->get('filial_id'), 
				':usuario_id'=>$entidadeGrupo->get('usuario_id'), 
				':bool_ativo_grupo'=>$entidadeGrupo->get('bool_ativo_grupo')
			);
			
			$stmt = $this->pdo->prepare("INSERT INTO grupo (descricao_grupo, imagem_grupo, filial_id, usuario_id, bool_ativo_grupo) VALUES (:descricao_grupo, :imagem_grupo, :filial_id, :usuario_id, :bool_ativo_grupo);"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao cadastrar Grupo ".$ex->getMessage();
		}
	}


	function atualizaGrupo(Grupo $entidadeGrupo, $id, $area){

		// Configuração de notificação
		/* $area = 'grupo'; */
		$descricaoNotificacao = "";
		$controleAteracao = 0;
		$usuarioAtuador = $entidadeGrupo->get('usuario_id'); 
		$sql = "SELECT * FROM grupo WHERE id_grupo = ".$id;
		$verifica = $this->pdo->query($sql);
		foreach ($verifica as $dados){ 
			if ($dados['descricao_grupo'] != $entidadeGrupo->get('descricao_grupo')) {
				$descricaoNotificacao .= '<b style="color: red">Descrição: '.$dados['descricao_grupo'].' => '.$entidadeGrupo->get('descricao_grupo').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Descrição => '.$entidadeGrupo->get('descricao_grupo').'<br>';
			}
			if ($dados['imagem_grupo'] != $entidadeGrupo->get('imagem_grupo')) {
				$descricaoNotificacao .= '<b style="color: red">Imagem: '.$dados['imagem_grupo'].' => '.$entidadeGrupo->get('imagem_grupo').'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Imagem => '.$entidadeGrupo->get('imagem_grupo').'<br>';
			}
			if ($dados['filial_id'] != $entidadeGrupo->get('filial_id')) {
				$descricaoNotificacao .= '<b style="color: red">Filial: /%/SELECT * FROM filial WHERE id_filial = '.$dados['filial_id'].'/%/ => /%/SELECT * FROM filial WHERE id_filial = '.$entidadeGrupo->get('filial_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Filial => /%/SELECT * FROM filial WHERE id_filial = '.$entidadeGrupo->get('filial_id').'/%/<br>';
			}
			if ($dados['usuario_id'] != $entidadeGrupo->get('usuario_id')) {
				$descricaoNotificacao .= '<b style="color: red">Usuário: /%/SELECT * FROM usuario WHERE id_usuario = '.$dados['usuario_id'].'/%/ => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeGrupo->get('usuario_id').'/%/</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoNotificacao .= 'Usuário => /%/SELECT * FROM usuario WHERE id_usuario = '.$entidadeGrupo->get('usuario_id').'/%/<br>';
			}
			if ($dados['bool_ativo_grupo'] != $entidadeGrupo->get('bool_ativo_grupo')) {
				$descricaoBool = $entidadeGrupo->get('bool_ativo_grupo') == 1 ? "Sim" : "Não";
				$descricaoBool2 = $dados['bool_ativo_grupo'] == 1 ? "Sim" : "Não";
				$descricaoNotificacao .= '<b style="color: red">Ativo: '.$descricaoBool2.' => '.$descricaoBool.'</b><br>';
				$controleAteracao++;
			}
			else {
				$descricaoBool = $entidadeGrupo->get('bool_ativo_grupo') == 1 ? "Sim" : "Não";
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
				':descricao_grupo'=>$entidadeGrupo->get('descricao_grupo'), 
				':imagem_grupo'=>$entidadeGrupo->get('imagem_grupo'), 
				':filial_id'=>$entidadeGrupo->get('filial_id'), 
				':usuario_id'=>$entidadeGrupo->get('usuario_id'), 
				':bool_ativo_grupo'=>$entidadeGrupo->get('bool_ativo_grupo')
			);

			$stmt = $this->pdo->prepare("UPDATE grupo SET descricao_grupo = :descricao_grupo, imagem_grupo = :imagem_grupo, filial_id = :filial_id, usuario_id = :usuario_id, bool_ativo_grupo = :bool_ativo_grupo WHERE id_grupo = ".$id.";"
			);
			return $stmt->execute($param);
		}catch(PDOException $ex){
			return "Erro ao atualizar Grupo ".$ex->getMessage();
		}
	}
}
?>