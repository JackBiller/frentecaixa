
function gravarRegistro(){
	var campoFocus = "";
		 if($("#valor_caixa_operacao").val() == "") campoFocus = "valor_caixa_operacao";
	else if($("#caixa_movimentacao_id").val() == "") campoFocus = "caixa_movimentacao_id";
	else if($("#operacoes_caixa_id").val() == "") campoFocus = "operacoes_caixa_id";
	else if($("#data_emissao_caixa_operacao").val() == "") campoFocus = "data_emissao_caixa_operacao";
	else if($("#data_atualizacao_caixa_operacao").val() == "") campoFocus = "data_atualizacao_caixa_operacao";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_caixa_operacao").val() == "") campoFocus = "bool_ativo_caixa_operacao";


	else {
		$.ajax({
			url:'app/controllers/cadastro_caixa_operacaoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'valor_caixa_operacao': $("#valor_caixa_operacao").val(),
				'caixa_movimentacao_id': $("#caixa_movimentacao_id").val(),
				'operacoes_caixa_id': $("#operacoes_caixa_id").val(),
				'data_emissao_caixa_operacao': $("#data_emissao_caixa_operacao").val(),
				'data_atualizacao_caixa_operacao': $("#data_atualizacao_caixa_operacao").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_caixa_operacao': $("#bool_ativo_caixa_operacao").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#valor_caixa_operacao").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}