
function gravarRegistro(){
	var campoFocus = "";
		 if($("#descricao_caixa").val() == "") campoFocus = "descricao_caixa";
	else if($("#filial_id").val() == "") campoFocus = "filial_id";
	else if($("#data_atualizacao_caixa").val() == "") campoFocus = "data_atualizacao_caixa";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_caixa").val() == "") campoFocus = "bool_ativo_caixa";


	else {
		$.ajax({
			url:'app/controllers/cadastro_caixaController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'descricao_caixa': $("#descricao_caixa").val(),
				'filial_id': $("#filial_id").val(),
				'data_atualizacao_caixa': $("#data_atualizacao_caixa").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_caixa': $("#bool_ativo_caixa").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#descricao_caixa").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}