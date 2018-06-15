
$(document).ready(function(){
	var id_caixa_operacao = "";
	var valor_caixa_operacao = "";
	var caixa_movimentacao_id = "";
	var operacoes_caixa_id = "";
	var data_emissao_caixa_operacao = "";
	var data_atualizacao_caixa_operacao = "";
	var usuario_id = "";
	var bool_ativo_caixa_operacao = "";

	var vetor = [];
	$.ajax({
		url:'app/controllers/funcoesController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'editar': true,
			'id': $("#editar").val()
		}
	}).done( function(data){});

	$.ajax({
		url:'app/controllers/funcoes_caixa_operacaoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_caixa_operacao_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_caixa_operacao = vetor[0];
		
		valor_caixa_operacao = vetor[1];
		caixa_movimentacao_id = vetor[2];
		operacoes_caixa_id = vetor[3];
		data_emissao_caixa_operacao = vetor[4];
		data_atualizacao_caixa_operacao = vetor[5];
		usuario_id = vetor[6];
		bool_ativo_caixa_operacao = vetor[7];
		
		$("#valor_caixa_operacao").val(valor_caixa_operacao);
		$("#caixa_movimentacao_id").val(caixa_movimentacao_id);
		$("#operacoes_caixa_id").val(operacoes_caixa_id);
		$("#data_emissao_caixa_operacao").val(data_emissao_caixa_operacao);
		$("#data_atualizacao_caixa_operacao").val(data_atualizacao_caixa_operacao);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_caixa_operacao").val(bool_ativo_caixa_operacao);
		
		if(caixa_movimentacao_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_caixa_movimentacaoController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_caixa_movimentacao_id': true,
					'id': caixa_movimentacao_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_caixa_movimentacao(caixa_movimentacao_id, vetor[1]);
				// $("#caixa_movimentacao_id-flexdatalist").val(vetor[1]);
				// $("#caixa_movimentacao_id").val(parseInt(vetor[0]));
			});
			$("#caixa_movimentacao_id").val(caixa_movimentacao_id);
		}

		else combo_caixa_movimentacao_NV();
		if(operacoes_caixa_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_operacoes_caixaController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_operacoes_caixa_id': true,
					'id': operacoes_caixa_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_operacoes_caixa(operacoes_caixa_id, vetor[1]);
				// $("#operacoes_caixa_id-flexdatalist").val(vetor[1]);
				// $("#operacoes_caixa_id").val(parseInt(vetor[0]));
			});
			$("#operacoes_caixa_id").val(operacoes_caixa_id);
		}

		else combo_operacoes_caixa_NV();
		if(usuario_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_usuarioController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_usuario_id': true,
					'id': usuario_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_usuario(usuario_id, vetor[1]);
				// $("#usuario_id-flexdatalist").val(vetor[1]);
				// $("#usuario_id").val(parseInt(vetor[0]));
			});
			$("#usuario_id").val(usuario_id);
		}

		else combo_usuario_NV();
	});
});


function atualizarrRegistro(){
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
			url:'app/controllers/atualiza_caixa_operacaoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_caixa_operacao': $("#editar").val(),
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
			else 								toast.success("Atualizado com sucesso!");
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}