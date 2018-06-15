
function gravarRegistro(){
	var campoFocus = "";
		 if($("#endereco_cliente_endereco").val() == "") campoFocus = "endereco_cliente_endereco";
	else if($("#numero_cliente_endereco").val() == "") campoFocus = "numero_cliente_endereco";
	else if($("#bairro_cliente_endereco").val() == "") campoFocus = "bairro_cliente_endereco";
	else if($("#cidade_cliente_endereco").val() == "") campoFocus = "cidade_cliente_endereco";
	else if($("#estado_id").val() == "") campoFocus = "estado_id";
	else if($("#data_atualizacao_cliente_endereco").val() == "") campoFocus = "data_atualizacao_cliente_endereco";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_cliente_endereco").val() == "") campoFocus = "bool_ativo_cliente_endereco";


	else {
		$.ajax({
			url:'app/controllers/cadastro_cliente_enderecoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'endereco_cliente_endereco': $("#endereco_cliente_endereco").val(),
				'numero_cliente_endereco': $("#numero_cliente_endereco").val(),
				'complemento_cliente_endereco': $("#complemento_cliente_endereco").val(),
				'bairro_cliente_endereco': $("#bairro_cliente_endereco").val(),
				'cidade_cliente_endereco': $("#cidade_cliente_endereco").val(),
				'estado_id': $("#estado_id").val(),
				'cliente_id': $("#cliente_id").val(),
				'data_atualizacao_cliente_endereco': $("#data_atualizacao_cliente_endereco").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_cliente_endereco': $("#bool_ativo_cliente_endereco").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#endereco_cliente_endereco").val("");
				$("#numero_cliente_endereco").val("");
				$("#complemento_cliente_endereco").val("");
				$("#bairro_cliente_endereco").val("");
				$("#cidade_cliente_endereco").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}