<?php 
	require_once "../classe/entidade/Cliente_endereco.php";
	require_once "../classe/dao/cliente_enderecoDAO.php";

	$conn = new Conexao();
	$pdoVerifica = $conn->Connect();

	$gravar = true;
	$saida = "";
	

	if ($gravar) {
		$entidadeCliente_endereco = new Cliente_endereco();
		$cliente_enderecoDAO = new cliente_enderecoDAO();
		
		$entidadeCliente_endereco->set($_POST['endereco_cliente_endereco'], 'endereco_cliente_endereco');

		$numero_cliente_endereco = $_POST['numero_cliente_endereco'] == '' ? 0 : $_POST['numero_cliente_endereco'];
		$entidadeCliente_endereco->set($numero_cliente_endereco, 'numero_cliente_endereco');

		$entidadeCliente_endereco->set($_POST['complemento_cliente_endereco'], 'complemento_cliente_endereco');
		$entidadeCliente_endereco->set($_POST['bairro_cliente_endereco'], 'bairro_cliente_endereco');
		$entidadeCliente_endereco->set($_POST['cidade_cliente_endereco'], 'cidade_cliente_endereco');

		$estado_id = $_POST['estado_id'] == '' ? 0 : $_POST['estado_id'];
		$entidadeCliente_endereco->set($estado_id, 'estado_id');


		$cliente_id = $_POST['cliente_id'] == '' ? 0 : $_POST['cliente_id'];
		$entidadeCliente_endereco->set($cliente_id, 'cliente_id');

		$entidadeCliente_endereco->set($_POST['data_atualizacao_cliente_endereco'], 'data_atualizacao_cliente_endereco');

		$usuario_id = $_POST['usuario_id'] == '' ? 0 : $_POST['usuario_id'];
		$entidadeCliente_endereco->set($usuario_id, 'usuario_id');


		$bool_ativo_cliente_endereco = $_POST['bool_ativo_cliente_endereco'] == '' ? 0 : $_POST['bool_ativo_cliente_endereco'];
		$entidadeCliente_endereco->set($bool_ativo_cliente_endereco, 'bool_ativo_cliente_endereco');


		$retorno = $cliente_enderecoDAO->atualizaCliente_endereco($entidadeCliente_endereco, $_POST['id_cliente_endereco'], $_POST['areaDeAtuacao']);
		echo $retorno;
	}
	else echo $saida;
?>