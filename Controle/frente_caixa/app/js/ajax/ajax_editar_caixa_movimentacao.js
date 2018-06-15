
$(document).ready(function(){
	var id_caixa_movimentacao = "";
	var valor_abertura_caixa_movimentacao = "";
	var valor_fechamento_caixa_movimentacao = "";
	var data_abertura_caixa_movimentacao = "";
	var data_fechamento_caixa_movimentacao = "";
	var caixa_id = "";
	var data_atualizacao_caixa_movimentacao = "";
	var usuario_id = "";
	var bool_ativo_caixa_movimentacao = "";

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
		url:'app/controllers/funcoes_caixa_movimentacaoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_caixa_movimentacao_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_caixa_movimentacao = vetor[0];
		
		valor_abertura_caixa_movimentacao = vetor[1];
		valor_fechamento_caixa_movimentacao = vetor[2];
		data_abertura_caixa_movimentacao = vetor[3];
		data_fechamento_caixa_movimentacao = vetor[4];
		caixa_id = vetor[5];
		data_atualizacao_caixa_movimentacao = vetor[6];
		usuario_id = vetor[7];
		bool_ativo_caixa_movimentacao = vetor[8];
		
		$("#valor_abertura_caixa_movimentacao").val(valor_abertura_caixa_movimentacao);
		$("#valor_fechamento_caixa_movimentacao").val(valor_fechamento_caixa_movimentacao);
		$("#data_abertura_caixa_movimentacao").val(data_abertura_caixa_movimentacao);
		$("#data_fechamento_caixa_movimentacao").val(data_fechamento_caixa_movimentacao);
		$("#caixa_id").val(caixa_id);
		$("#data_atualizacao_caixa_movimentacao").val(data_atualizacao_caixa_movimentacao);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_caixa_movimentacao").val(bool_ativo_caixa_movimentacao);
		
		if(caixa_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_caixaController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_caixa_id': true,
					'id': caixa_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_caixa(caixa_id, vetor[1]);
				// $("#caixa_id-flexdatalist").val(vetor[1]);
				// $("#caixa_id").val(parseInt(vetor[0]));
			});
			$("#caixa_id").val(caixa_id);
		}

		else combo_caixa_NV();
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
		 if($("#data_abertura_caixa_movimentacao").val() == "") campoFocus = "data_abertura_caixa_movimentacao";
	else if($("#caixa_id").val() == "") campoFocus = "caixa_id";
	else if($("#data_atualizacao_caixa_movimentacao").val() == "") campoFocus = "data_atualizacao_caixa_movimentacao";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_caixa_movimentacao").val() == "") campoFocus = "bool_ativo_caixa_movimentacao";


	else {
		$.ajax({
			url:'app/controllers/atualiza_caixa_movimentacaoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_caixa_movimentacao': $("#editar").val(),
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
			else 								toast.success("Atualizado com sucesso!");
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}