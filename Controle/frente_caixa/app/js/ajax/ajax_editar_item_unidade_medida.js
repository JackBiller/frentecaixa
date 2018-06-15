
$(document).ready(function(){
	var id_item_unidade_medida = "";
	var quantidade_item_unidade_medida = "";
	var item_id = "";
	var unidade_medida_id = "";
	var data_atualizacao_item_unidade_medida = "";
	var usuario_id = "";
	var bool_ativo_item_unidade_medida = "";

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
		url:'app/controllers/funcoes_item_unidade_medidaController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_item_unidade_medida_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_item_unidade_medida = vetor[0];
		
		quantidade_item_unidade_medida = vetor[1];
		item_id = vetor[2];
		unidade_medida_id = vetor[3];
		data_atualizacao_item_unidade_medida = vetor[4];
		usuario_id = vetor[5];
		bool_ativo_item_unidade_medida = vetor[6];
		
		$("#quantidade_item_unidade_medida").val(quantidade_item_unidade_medida);
		$("#item_id").val(item_id);
		$("#unidade_medida_id").val(unidade_medida_id);
		$("#data_atualizacao_item_unidade_medida").val(data_atualizacao_item_unidade_medida);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_item_unidade_medida").val(bool_ativo_item_unidade_medida);
		
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
		if(unidade_medida_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_unidade_medidaController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_unidade_medida_id': true,
					'id': unidade_medida_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_unidade_medida(unidade_medida_id, vetor[1]);
				// $("#unidade_medida_id-flexdatalist").val(vetor[1]);
				// $("#unidade_medida_id").val(parseInt(vetor[0]));
			});
			$("#unidade_medida_id").val(unidade_medida_id);
		}

		else combo_unidade_medida_NV();
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
		 if($("#quantidade_item_unidade_medida").val() == "") campoFocus = "quantidade_item_unidade_medida";
	else if($("#item_id").val() == "") campoFocus = "item_id";
	else if($("#unidade_medida_id").val() == "") campoFocus = "unidade_medida_id";
	else if($("#data_atualizacao_item_unidade_medida").val() == "") campoFocus = "data_atualizacao_item_unidade_medida";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_item_unidade_medida").val() == "") campoFocus = "bool_ativo_item_unidade_medida";


	else {
		$.ajax({
			url:'app/controllers/atualiza_item_unidade_medidaController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_item_unidade_medida': $("#editar").val(),
				'quantidade_item_unidade_medida': $("#quantidade_item_unidade_medida").val(),
				'item_id': $("#item_id").val(),
				'unidade_medida_id': $("#unidade_medida_id").val(),
				'data_atualizacao_item_unidade_medida': $("#data_atualizacao_item_unidade_medida").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_item_unidade_medida': $("#bool_ativo_item_unidade_medida").val(),
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