
$(document).ready(function(){
	var id_grupo = "";
	var descricao_grupo = "";
	var imagem_grupo = "";
	var filial_id = "";
	var data_atualizacao_grupo = "";
	var usuario_id = "";
	var bool_ativo_grupo = "";

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
		url:'app/controllers/funcoes_grupoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_grupo_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_grupo = vetor[0];
		
		descricao_grupo = vetor[1];
		imagem_grupo = vetor[2];
		filial_id = vetor[3];
		data_atualizacao_grupo = vetor[4];
		usuario_id = vetor[5];
		bool_ativo_grupo = vetor[6];
		
		$("#descricao_grupo").val(descricao_grupo);
		$("#imagem_grupo").val(imagem_grupo);
		$("#filial_id").val(filial_id);
		$("#data_atualizacao_grupo").val(data_atualizacao_grupo);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_grupo").val(bool_ativo_grupo);
		
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
		 if($("#descricao_grupo").val() == "") campoFocus = "descricao_grupo";
	else if($("#imagem_grupo").val() == "") campoFocus = "imagem_grupo";
	else if($("#filial_id").val() == "") campoFocus = "filial_id";
	else if($("#data_atualizacao_grupo").val() == "") campoFocus = "data_atualizacao_grupo";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_grupo").val() == "") campoFocus = "bool_ativo_grupo";


	else {
		$.ajax({
			url:'app/controllers/atualiza_grupoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_grupo': $("#editar").val(),
				'descricao_grupo': $("#descricao_grupo").val(),
				'imagem_grupo': $("#imagem_grupo").val(),
				'filial_id': $("#filial_id").val(),
				'data_atualizacao_grupo': $("#data_atualizacao_grupo").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_grupo': $("#bool_ativo_grupo").val(),
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