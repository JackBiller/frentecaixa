
function gravarRegistro(){
	var campoFocus = "";
		 if($("#data_abertura_caixa_movimentacao").val() == "") campoFocus = "data_abertura_caixa_movimentacao";
	else if($("#caixa_id").val() == "") campoFocus = "caixa_id";
	else if($("#data_atualizacao_caixa_movimentacao").val() == "") campoFocus = "data_atualizacao_caixa_movimentacao";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_caixa_movimentacao").val() == "") campoFocus = "bool_ativo_caixa_movimentacao";


	else {
		$.ajax({
			url:'app/controllers/cadastro_caixa_movimentacaoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'valor_abertura_caixa_movimentacao': $("#valor_abertura_caixa_movimentacao").val(),
				'valor_fechamento_caixa_movimentacao': $("#valor_fechamento_caixa_movimentacao").val(),
				'data_abertura_caixa_movimentacao': $("#data_abertura_caixa_movimentacao").val(),
				'data_fechamento_caixa_movimentacao': $("#data_fechamento_caixa_movimentacao").val(),
				'caixa_id': $("#caixa_id").val(),
				'data_atualizacao_caixa_movimentacao': $("#data_atualizacao_caixa_movimentacao").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_caixa_movimentacao': $("#bool_ativo_caixa_movimentacao").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#valor_abertura_caixa_movimentacao").val("");
				$("#valor_fechamento_caixa_movimentacao").val("");
				$("#data_fechamento_caixa_movimentacao").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}