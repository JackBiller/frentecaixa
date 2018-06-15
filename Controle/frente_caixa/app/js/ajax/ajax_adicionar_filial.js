
function gravarRegistro(){
	var campoFocus = "";
		 if($("#razao_social_filial").val() == "") campoFocus = "razao_social_filial";
	else if($("#cnpj_filial").val() == "") campoFocus = "cnpj_filial";
	else if($("#data_atualizacao_filial").val() == "") campoFocus = "data_atualizacao_filial";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_filial").val() == "") campoFocus = "bool_ativo_filial";


	else {
		$.ajax({
			url:'app/controllers/cadastro_filialController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'razao_social_filial': $("#razao_social_filial").val(),
				'cnpj_filial': $("#cnpj_filial").val(),
				'empresa_id': $("#empresa_id").val(),
				'data_atualizacao_filial': $("#data_atualizacao_filial").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_filial': $("#bool_ativo_filial").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#razao_social_filial").val("");
				$("#cnpj_filial").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}