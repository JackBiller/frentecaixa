<?php 
	require_once "../classe/entidade/Cliente.php";
	require_once "../classe/dao/clienteDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeCliente = new Cliente();
		$clienteDAO = new clienteDAO();
		
		$entidadeCliente->set($_POST['nome_cliente'], 'nome_cliente');
		$entidadeCliente->set($_POST['data_atualizacao_cliente'], 'data_atualizacao_cliente');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeCliente->set($usuario_id, 'usuario_id');


		$bool_ativo_cliente = $_POST['bool_ativo_cliente'] == '' ? 0 : $_POST['bool_ativo_cliente'];
		$entidadeCliente->set($bool_ativo_cliente, 'bool_ativo_cliente');


		$retorno = $clienteDAO->atualizaCliente($entidadeCliente, $_POST['id_cliente'], $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>