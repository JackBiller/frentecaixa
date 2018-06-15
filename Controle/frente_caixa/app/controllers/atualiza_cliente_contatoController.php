<?php 
	require_once "../classe/entidade/Cliente_contato.php";
	require_once "../classe/dao/cliente_contatoDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeCliente_contato = new Cliente_contato();
		$cliente_contatoDAO = new cliente_contatoDAO();
		
		$entidadeCliente_contato->set($_POST['telefone_cliente_contato'], 'telefone_cliente_contato');
		$entidadeCliente_contato->set($_POST['celular_cliente_contato'], 'celular_cliente_contato');
		$entidadeCliente_contato->set($_POST['email_cliente_contato'], 'email_cliente_contato');

		$cliente_id = $_POST['cliente_id'] == '' ? 0 : $_POST['cliente_id'];
		$entidadeCliente_contato->set($cliente_id, 'cliente_id');

		$entidadeCliente_contato->set($_POST['data_atualizacao_cliente_contato'], 'data_atualizacao_cliente_contato');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeCliente_contato->set($usuario_id, 'usuario_id');


		$bool_ativo_cliente_contato = $_POST['bool_ativo_cliente_contato'] == '' ? 0 : $_POST['bool_ativo_cliente_contato'];
		$entidadeCliente_contato->set($bool_ativo_cliente_contato, 'bool_ativo_cliente_contato');


		$retorno = $cliente_contatoDAO->atualizaCliente_contato($entidadeCliente_contato, $_POST['id_cliente_contato'], $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>