<?php 
	require_once "../classe/entidade/Filial.php";
	require_once "../classe/dao/filialDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeFilial = new Filial();
		$filialDAO = new filialDAO();
		
		$entidadeFilial->set($_POST['razao_social_filial'], 'razao_social_filial');
		$entidadeFilial->set($_POST['cnpj_filial'], 'cnpj_filial');

		$empresa_id = $_POST['empresa_id'] == '' ? 0 : $_POST['empresa_id'];
		$entidadeFilial->set($empresa_id, 'empresa_id');

		$entidadeFilial->set($_POST['data_atualizacao_filial'], 'data_atualizacao_filial');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeFilial->set($usuario_id, 'usuario_id');


		$bool_ativo_filial = $_POST['bool_ativo_filial'] == '' ? 0 : $_POST['bool_ativo_filial'];
		$entidadeFilial->set($bool_ativo_filial, 'bool_ativo_filial');


		$retorno = $filialDAO->cadastraFilial($entidadeFilial, $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>