
function gravarRegistro(){
	var campoFocus = "";
		 if($("#telefone_cliente_contato").val() == "") campoFocus = "telefone_cliente_contato";
	else if($("#data_atualizacao_cliente_contato").val() == "") campoFocus = "data_atualizacao_cliente_contato";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_cliente_contato").val() == "") campoFocus = "bool_ativo_cliente_contato";


	else {
		$.ajax({
			url:'app/controllers/cadastro_cliente_contatoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'telefone_cliente_contato': $("#telefone_cliente_contato").val(),
				'celular_cliente_contato': $("#celular_cliente_contato").val(),
				'email_cliente_contato': $("#email_cliente_contato").val(),
				'cliente_id': $("#cliente_id").val(),
				'data_atualizacao_cliente_contato': $("#data_atualizacao_cliente_contato").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_cliente_contato': $("#bool_ativo_cliente_contato").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#telefone_cliente_contato").val("");
				$("#celular_cliente_contato").val("");
				$("#email_cliente_contato").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}