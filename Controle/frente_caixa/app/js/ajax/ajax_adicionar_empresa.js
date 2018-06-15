
function gravarRegistro(){
	var campoFocus = "";
		 if($("#razao_social_empresa").val() == "") campoFocus = "razao_social_empresa";
	else if($("#data_atualizacao_empresa").val() == "") campoFocus = "data_atualizacao_empresa";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_empresa").val() == "") campoFocus = "bool_ativo_empresa";


	else {
		$.ajax({
			url:'app/controllers/cadastro_empresaController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'razao_social_empresa': $("#razao_social_empresa").val(),
				'data_atualizacao_empresa': $("#data_atualizacao_empresa").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_empresa': $("#bool_ativo_empresa").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#razao_social_empresa").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}