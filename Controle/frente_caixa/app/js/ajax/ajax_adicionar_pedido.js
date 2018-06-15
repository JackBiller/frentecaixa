
function gravarRegistro(){
	var campoFocus = "";
		 if($("#documento_pedido").val() == "") campoFocus = "documento_pedido";
	else if($("#total_pedido").val() == "") campoFocus = "total_pedido";
	else if($("#emissao_pedido").val() == "") campoFocus = "emissao_pedido";
	else if($("#bool_finalizado_pedido").val() == "") campoFocus = "bool_finalizado_pedido";
	else if($("#filial_id").val() == "") campoFocus = "filial_id";
	else if($("#data_atualizacao_pedido").val() == "") campoFocus = "data_atualizacao_pedido";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_pedido").val() == "") campoFocus = "bool_ativo_pedido";


	else {
		$.ajax({
			url:'app/controllers/cadastro_pedidoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'documento_pedido': $("#documento_pedido").val(),
				'total_pedido': $("#total_pedido").val(),
				'emissao_pedido': $("#emissao_pedido").val(),
				'cliente_id': $("#cliente_id").val(),
				'nome_cliente_pedido': $("#nome_cliente_pedido").val(),
				'bool_finalizado_pedido': $("#bool_finalizado_pedido").val(),
				'filial_id': $("#filial_id").val(),
				'data_atualizacao_pedido': $("#data_atualizacao_pedido").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_pedido': $("#bool_ativo_pedido").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#documento_pedido").val("");
				$("#total_pedido").val("");
				$("#nome_cliente_pedido").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}