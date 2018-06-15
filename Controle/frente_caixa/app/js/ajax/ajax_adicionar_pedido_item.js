
function gravarRegistro(){
	var campoFocus = "";
		 if($("#quantidade_pedido_item").val() == "") campoFocus = "quantidade_pedido_item";
	else if($("#valor_unitario_pedido_item").val() == "") campoFocus = "valor_unitario_pedido_item";
	else if($("#valor_total_pedido_item").val() == "") campoFocus = "valor_total_pedido_item";
	else if($("#data_atualizacao_pedido_item").val() == "") campoFocus = "data_atualizacao_pedido_item";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_pedido_item").val() == "") campoFocus = "bool_ativo_pedido_item";


	else {
		$.ajax({
			url:'app/controllers/cadastro_pedido_itemController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'quantidade_pedido_item': $("#quantidade_pedido_item").val(),
				'valor_unitario_pedido_item': $("#valor_unitario_pedido_item").val(),
				'valor_total_pedido_item': $("#valor_total_pedido_item").val(),
				'item_id': $("#item_id").val(),
				'item_unidade_medida_id': $("#item_unidade_medida_id").val(),
				'pedido_id': $("#pedido_id").val(),
				'data_atualizacao_pedido_item': $("#data_atualizacao_pedido_item").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_pedido_item': $("#bool_ativo_pedido_item").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#quantidade_pedido_item").val("");
				$("#valor_unitario_pedido_item").val("");
				$("#valor_total_pedido_item").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}