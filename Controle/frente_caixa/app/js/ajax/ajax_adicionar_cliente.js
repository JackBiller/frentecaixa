
function gravarRegistro(){
	var campoFocus = "";
		 if($("#nome_cliente").val() == "") campoFocus = "nome_cliente";
	else if($("#data_atualizacao_cliente").val() == "") campoFocus = "data_atualizacao_cliente";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_cliente").val() == "") campoFocus = "bool_ativo_cliente";


	else {
		$.ajax({
			url:'app/controllers/cadastro_clienteController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'nome_cliente': $("#nome_cliente").val(),
				'data_atualizacao_cliente': $("#data_atualizacao_cliente").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_cliente': $("#bool_ativo_cliente").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#nome_cliente").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}