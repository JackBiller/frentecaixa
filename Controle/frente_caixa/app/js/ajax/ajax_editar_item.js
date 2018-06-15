
$(document).ready(function(){
	var id_item = "";
	var descricao_item = "";
	var grupo_id = "";
	var data_atualizacao_item = "";
	var usuario_id = "";
	var bool_ativo_item = "";

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
		url:'app/controllers/funcoes_itemController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_item_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_item = vetor[0];
		
		descricao_item = vetor[1];
		grupo_id = vetor[2];
		data_atualizacao_item = vetor[3];
		usuario_id = vetor[4];
		bool_ativo_item = vetor[5];
		
		$("#descricao_item").val(descricao_item);
		$("#grupo_id").val(grupo_id);
		$("#data_atualizacao_item").val(data_atualizacao_item);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_item").val(bool_ativo_item);
		
		if(grupo_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_grupoController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_grupo_id': true,
					'id': grupo_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_grupo(grupo_id, vetor[1]);
				// $("#grupo_id-flexdatalist").val(vetor[1]);
				// $("#grupo_id").val(parseInt(vetor[0]));
			});
			$("#grupo_id").val(grupo_id);
		}

		else combo_grupo_NV();
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
		 if($("#descricao_item").val() == "") campoFocus = "descricao_item";
	else if($("#grupo_id").val() == "") campoFocus = "grupo_id";
	else if($("#data_atualizacao_item").val() == "") campoFocus = "data_atualizacao_item";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_item").val() == "") campoFocus = "bool_ativo_item";


	else {
		$.ajax({
			url:'app/controllers/atualiza_itemController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_item': $("#editar").val(),
				'descricao_item': $("#descricao_item").val(),
				'grupo_id': $("#grupo_id").val(),
				'data_atualizacao_item': $("#data_atualizacao_item").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_item': $("#bool_ativo_item").val(),
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