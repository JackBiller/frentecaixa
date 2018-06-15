
$(document).ready(function(){
	var id_pedido_pagamento = "";
	var parcela_atual_pedido_pagamento = "";
	var parcela_total_pedido_pagamento = "";
	var valor_pago_pedido_pagamento = "";
	var bool_esta_pago_pedido_pagamento = "";
	var pedido_id = "";
	var condicao_de_pagamento_id = "";
	var data_atualizacao_pedido_pagamento = "";
	var usuario_id = "";
	var bool_ativo_pedido_pagamento = "";

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
		url:'app/controllers/funcoes_pedido_pagamentoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_pedido_pagamento_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_pedido_pagamento = vetor[0];
		
		parcela_atual_pedido_pagamento = vetor[1];
		parcela_total_pedido_pagamento = vetor[2];
		valor_pago_pedido_pagamento = vetor[3];
		bool_esta_pago_pedido_pagamento = vetor[4];
		pedido_id = vetor[5];
		condicao_de_pagamento_id = vetor[6];
		data_atualizacao_pedido_pagamento = vetor[7];
		usuario_id = vetor[8];
		bool_ativo_pedido_pagamento = vetor[9];
		
		$("#parcela_atual_pedido_pagamento").val(parcela_atual_pedido_pagamento);
		$("#parcela_total_pedido_pagamento").val(parcela_total_pedido_pagamento);
		$("#valor_pago_pedido_pagamento").val(valor_pago_pedido_pagamento);
		$("#bool_esta_pago_pedido_pagamento").val(bool_esta_pago_pedido_pagamento);
		$("#pedido_id").val(pedido_id);
		$("#condicao_de_pagamento_id").val(condicao_de_pagamento_id);
		$("#data_atualizacao_pedido_pagamento").val(data_atualizacao_pedido_pagamento);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_pedido_pagamento").val(bool_ativo_pedido_pagamento);
		
		if(pedido_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_pedidoController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_pedido_id': true,
					'id': pedido_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_pedido(pedido_id, vetor[1]);
				// $("#pedido_id-flexdatalist").val(vetor[1]);
				// $("#pedido_id").val(parseInt(vetor[0]));
			});
			$("#pedido_id").val(pedido_id);
		}

		else combo_pedido_NV();
		if(condicao_de_pagamento_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_condicao_de_pagamentoController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_condicao_de_pagamento_id': true,
					'id': condicao_de_pagamento_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_condicao_de_pagamento(condicao_de_pagamento_id, vetor[1]);
				// $("#condicao_de_pagamento_id-flexdatalist").val(vetor[1]);
				// $("#condicao_de_pagamento_id").val(parseInt(vetor[0]));
			});
			$("#condicao_de_pagamento_id").val(condicao_de_pagamento_id);
		}

		else combo_condicao_de_pagamento_NV();
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
		 if($("#parcela_atual_pedido_pagamento").val() == "") campoFocus = "parcela_atual_pedido_pagamento";
	else if($("#parcela_total_pedido_pagamento").val() == "") campoFocus = "parcela_total_pedido_pagamento";
	else if($("#valor_pago_pedido_pagamento").val() == "") campoFocus = "valor_pago_pedido_pagamento";
	else if($("#bool_esta_pago_pedido_pagamento").val() == "") campoFocus = "bool_esta_pago_pedido_pagamento";
	else if($("#pedido_id").val() == "") campoFocus = "pedido_id";
	else if($("#condicao_de_pagamento_id").val() == "") campoFocus = "condicao_de_pagamento_id";
	else if($("#data_atualizacao_pedido_pagamento").val() == "") campoFocus = "data_atualizacao_pedido_pagamento";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_pedido_pagamento").val() == "") campoFocus = "bool_ativo_pedido_pagamento";


	else {
		$.ajax({
			url:'app/controllers/atualiza_pedido_pagamentoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_pedido_pagamento': $("#editar").val(),
				'parcela_atual_pedido_pagamento': $("#parcela_atual_pedido_pagamento").val(),
				'parcela_total_pedido_pagamento': $("#parcela_total_pedido_pagamento").val(),
				'valor_pago_pedido_pagamento': $("#valor_pago_pedido_pagamento").val(),
				'bool_esta_pago_pedido_pagamento': $("#bool_esta_pago_pedido_pagamento").val(),
				'pedido_id': $("#pedido_id").val(),
				'condicao_de_pagamento_id': $("#condicao_de_pagamento_id").val(),
				'data_atualizacao_pedido_pagamento': $("#data_atualizacao_pedido_pagamento").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_pedido_pagamento': $("#bool_ativo_pedido_pagamento").val(),
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