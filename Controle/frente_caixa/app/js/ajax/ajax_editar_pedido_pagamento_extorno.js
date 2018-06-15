
$(document).ready(function(){
	var id_pedido_pagamento_extorno = "";
	var motivo_pedido_pagamento_extorno = "";
	var pedido_pagamento_id = "";
	var data_atualizacao_pedido_pagamento_extorno = "";
	var usuario_id = "";
	var bool_ativo_pedido_pagamento_extorno = "";

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
		url:'app/controllers/funcoes_pedido_pagamento_extornoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_pedido_pagamento_extorno_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_pedido_pagamento_extorno = vetor[0];
		
		motivo_pedido_pagamento_extorno = vetor[1];
		pedido_pagamento_id = vetor[2];
		data_atualizacao_pedido_pagamento_extorno = vetor[3];
		usuario_id = vetor[4];
		bool_ativo_pedido_pagamento_extorno = vetor[5];
		
		$("#motivo_pedido_pagamento_extorno").val(motivo_pedido_pagamento_extorno);
		$("#pedido_pagamento_id").val(pedido_pagamento_id);
		$("#data_atualizacao_pedido_pagamento_extorno").val(data_atualizacao_pedido_pagamento_extorno);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_pedido_pagamento_extorno").val(bool_ativo_pedido_pagamento_extorno);
		
		if(pedido_pagamento_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_pedido_pagamentoController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_pedido_pagamento_id': true,
					'id': pedido_pagamento_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_pedido_pagamento(pedido_pagamento_id, vetor[1]);
				// $("#pedido_pagamento_id-flexdatalist").val(vetor[1]);
				// $("#pedido_pagamento_id").val(parseInt(vetor[0]));
			});
			$("#pedido_pagamento_id").val(pedido_pagamento_id);
		}

		else combo_pedido_pagamento_NV();
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
		 if($("#motivo_pedido_pagamento_extorno").val() == "") campoFocus = "motivo_pedido_pagamento_extorno";
	else if($("#pedido_pagamento_id").val() == "") campoFocus = "pedido_pagamento_id";
	else if($("#data_atualizacao_pedido_pagamento_extorno").val() == "") campoFocus = "data_atualizacao_pedido_pagamento_extorno";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_pedido_pagamento_extorno").val() == "") campoFocus = "bool_ativo_pedido_pagamento_extorno";


	else {
		$.ajax({
			url:'app/controllers/atualiza_pedido_pagamento_extornoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_pedido_pagamento_extorno': $("#editar").val(),
				'motivo_pedido_pagamento_extorno': $("#motivo_pedido_pagamento_extorno").val(),
				'pedido_pagamento_id': $("#pedido_pagamento_id").val(),
				'data_atualizacao_pedido_pagamento_extorno': $("#data_atualizacao_pedido_pagamento_extorno").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_pedido_pagamento_extorno': $("#bool_ativo_pedido_pagamento_extorno").val(),
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