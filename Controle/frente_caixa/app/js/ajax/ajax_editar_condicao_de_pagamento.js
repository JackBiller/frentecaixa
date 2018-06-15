
$(document).ready(function(){
	var id_condicao_de_pagamento = "";
	var descricao_condicao_de_pagamento = "";
	var data_atualizacao_condicao_de_pagamento = "";
	var usuario_id = "";
	var bool_ativo_condicao_de_pagamento = "";

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
		url:'app/controllers/funcoes_condicao_de_pagamentoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_condicao_de_pagamento_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_condicao_de_pagamento = vetor[0];
		
		descricao_condicao_de_pagamento = vetor[1];
		data_atualizacao_condicao_de_pagamento = vetor[2];
		usuario_id = vetor[3];
		bool_ativo_condicao_de_pagamento = vetor[4];
		
		$("#descricao_condicao_de_pagamento").val(descricao_condicao_de_pagamento);
		$("#data_atualizacao_condicao_de_pagamento").val(data_atualizacao_condicao_de_pagamento);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_condicao_de_pagamento").val(bool_ativo_condicao_de_pagamento);
		
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
		 if($("#descricao_condicao_de_pagamento").val() == "") campoFocus = "descricao_condicao_de_pagamento";
	else if($("#data_atualizacao_condicao_de_pagamento").val() == "") campoFocus = "data_atualizacao_condicao_de_pagamento";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_condicao_de_pagamento").val() == "") campoFocus = "bool_ativo_condicao_de_pagamento";


	else {
		$.ajax({
			url:'app/controllers/atualiza_condicao_de_pagamentoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_condicao_de_pagamento': $("#editar").val(),
				'descricao_condicao_de_pagamento': $("#descricao_condicao_de_pagamento").val(),
				'data_atualizacao_condicao_de_pagamento': $("#data_atualizacao_condicao_de_pagamento").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_condicao_de_pagamento': $("#bool_ativo_condicao_de_pagamento").val(),
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