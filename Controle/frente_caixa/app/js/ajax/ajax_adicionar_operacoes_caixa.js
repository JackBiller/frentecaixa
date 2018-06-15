
function gravarRegistro(){
	var campoFocus = "";
		 if($("#descricao_operacoes_caixa").val() == "") campoFocus = "descricao_operacoes_caixa";
	else if($("#data_atualizacao_operacoes_caixa").val() == "") campoFocus = "data_atualizacao_operacoes_caixa";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_operacoes_caixa").val() == "") campoFocus = "bool_ativo_operacoes_caixa";


	else {
		$.ajax({
			url:'app/controllers/cadastro_operacoes_caixaController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'descricao_operacoes_caixa': $("#descricao_operacoes_caixa").val(),
				'data_atualizacao_operacoes_caixa': $("#data_atualizacao_operacoes_caixa").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_operacoes_caixa': $("#bool_ativo_operacoes_caixa").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#descricao_operacoes_caixa").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}