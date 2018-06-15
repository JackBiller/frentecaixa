
$(document).ready(function(){
	var id_pedido_item = "";
	var quantidade_pedido_item = "";
	var valor_unitario_pedido_item = "";
	var valor_total_pedido_item = "";
	var item_id = "";
	var item_unidade_medida_id = "";
	var pedido_id = "";
	var data_atualizacao_pedido_item = "";
	var usuario_id = "";
	var bool_ativo_pedido_item = "";

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
		url:'app/controllers/funcoes_pedido_itemController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_pedido_item_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_pedido_item = vetor[0];
		
		quantidade_pedido_item = vetor[1];
		valor_unitario_pedido_item = vetor[2];
		valor_total_pedido_item = vetor[3];
		item_id = vetor[4];
		item_unidade_medida_id = vetor[5];
		pedido_id = vetor[6];
		data_atualizacao_pedido_item = vetor[7];
		usuario_id = vetor[8];
		bool_ativo_pedido_item = vetor[9];
		
		$("#quantidade_pedido_item").val(quantidade_pedido_item);
		$("#valor_unitario_pedido_item").val(valor_unitario_pedido_item);
		$("#valor_total_pedido_item").val(valor_total_pedido_item);
		$("#item_id").val(item_id);
		$("#item_unidade_medida_id").val(item_unidade_medida_id);
		$("#pedido_id").val(pedido_id);
		$("#data_atualizacao_pedido_item").val(data_atualizacao_pedido_item);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_pedido_item").val(bool_ativo_pedido_item);
		
		if(item_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_itemController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_item_id': true,
					'id': item_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_item(item_id, vetor[1]);
				// $("#item_id-flexdatalist").val(vetor[1]);
				// $("#item_id").val(parseInt(vetor[0]));
			});
			$("#item_id").val(item_id);
		}

		else combo_item_NV();
		if(item_unidade_medida_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_item_unidade_medidaController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_item_unidade_medida_id': true,
					'id': item_unidade_medida_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_item_unidade_medida(item_unidade_medida_id, vetor[1]);
				// $("#item_unidade_medida_id-flexdatalist").val(vetor[1]);
				// $("#item_unidade_medida_id").val(parseInt(vetor[0]));
			});
			$("#item_unidade_medida_id").val(item_unidade_medida_id);
		}

		else combo_item_unidade_medida_NV();
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
		 if($("#quantidade_pedido_item").val() == "") campoFocus = "quantidade_pedido_item";
	else if($("#valor_unitario_pedido_item").val() == "") campoFocus = "valor_unitario_pedido_item";
	else if($("#valor_total_pedido_item").val() == "") campoFocus = "valor_total_pedido_item";
	else if($("#data_atualizacao_pedido_item").val() == "") campoFocus = "data_atualizacao_pedido_item";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_pedido_item").val() == "") campoFocus = "bool_ativo_pedido_item";


	else {
		$.ajax({
			url:'app/controllers/atualiza_pedido_itemController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_pedido_item': $("#editar").val(),
				'quantidade_pedido_item': $("#quantidade_pedido_item").val(),
				'valor_unitario_pedido_item': $("#valor_unitario_pedido_item").val(),
				'valor_total_pedido_item': $("#valor_total_pedido_item").val(),
				'item_id': $("#item_id").val(),
				'item_unidade_medida_id': $("#item_unidade_medida_id").val(),
				'pedido_id': $("#pedido_id").val(),
				'data_atualizacao_pedido_item': $("#data_atualizacao_pedido_item").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_pedido_item': $("#bool_ativo_pedido_item").val(),
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