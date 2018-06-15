
$(document).ready(function(){
	var id_pedido = "";
	var documento_pedido = "";
	var total_pedido = "";
	var emissao_pedido = "";
	var cliente_id = "";
	var nome_cliente_pedido = "";
	var bool_finalizado_pedido = "";
	var filial_id = "";
	var data_atualizacao_pedido = "";
	var usuario_id = "";
	var bool_ativo_pedido = "";

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
		url:'app/controllers/funcoes_pedidoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_pedido_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_pedido = vetor[0];
		
		documento_pedido = vetor[1];
		total_pedido = vetor[2];
		emissao_pedido = vetor[3];
		cliente_id = vetor[4];
		nome_cliente_pedido = vetor[5];
		bool_finalizado_pedido = vetor[6];
		filial_id = vetor[7];
		data_atualizacao_pedido = vetor[8];
		usuario_id = vetor[9];
		bool_ativo_pedido = vetor[10];
		
		$("#documento_pedido").val(documento_pedido);
		$("#total_pedido").val(total_pedido);
		$("#emissao_pedido").val(emissao_pedido);
		$("#cliente_id").val(cliente_id);
		$("#nome_cliente_pedido").val(nome_cliente_pedido);
		$("#bool_finalizado_pedido").val(bool_finalizado_pedido);
		$("#filial_id").val(filial_id);
		$("#data_atualizacao_pedido").val(data_atualizacao_pedido);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_pedido").val(bool_ativo_pedido);
		
		if(cliente_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_clienteController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_cliente_id': true,
					'id': cliente_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_cliente(cliente_id, vetor[1]);
				// $("#cliente_id-flexdatalist").val(vetor[1]);
				// $("#cliente_id").val(parseInt(vetor[0]));
			});
			$("#cliente_id").val(cliente_id);
		}

		else combo_cliente_NV();
		if(filial_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_filialController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_filial_id': true,
					'id': filial_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_filial(filial_id, vetor[1]);
				// $("#filial_id-flexdatalist").val(vetor[1]);
				// $("#filial_id").val(parseInt(vetor[0]));
			});
			$("#filial_id").val(filial_id);
		}

		else combo_filial_NV();
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
		 if($("#documento_pedido").val() == "") campoFocus = "documento_pedido";
	else if($("#total_pedido").val() == "") campoFocus = "total_pedido";
	else if($("#emissao_pedido").val() == "") campoFocus = "emissao_pedido";
	else if($("#bool_finalizado_pedido").val() == "") campoFocus = "bool_finalizado_pedido";
	else if($("#filial_id").val() == "") campoFocus = "filial_id";
	else if($("#data_atualizacao_pedido").val() == "") campoFocus = "data_atualizacao_pedido";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_pedido").val() == "") campoFocus = "bool_ativo_pedido";


	else {
		$.ajax({
			url:'app/controllers/atualiza_pedidoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_pedido': $("#editar").val(),
				'documento_pedido': $("#documento_pedido").val(),
				'total_pedido': $("#total_pedido").val(),
				'emissao_pedido': $("#emissao_pedido").val(),
				'cliente_id': $("#cliente_id").val(),
				'nome_cliente_pedido': $("#nome_cliente_pedido").val(),
				'bool_finalizado_pedido': $("#bool_finalizado_pedido").val(),
				'filial_id': $("#filial_id").val(),
				'data_atualizacao_pedido': $("#data_atualizacao_pedido").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_pedido': $("#bool_ativo_pedido").val(),
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