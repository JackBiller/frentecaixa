
$(document).ready(function(){
	var id_empresa = "";
	var razao_social_empresa = "";
	var data_atualizacao_empresa = "";
	var usuario_id = "";
	var bool_ativo_empresa = "";

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
		url:'app/controllers/funcoes_empresaController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_empresa_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_empresa = vetor[0];
		
		razao_social_empresa = vetor[1];
		data_atualizacao_empresa = vetor[2];
		usuario_id = vetor[3];
		bool_ativo_empresa = vetor[4];
		
		$("#razao_social_empresa").val(razao_social_empresa);
		$("#data_atualizacao_empresa").val(data_atualizacao_empresa);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_empresa").val(bool_ativo_empresa);
		
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
		 if($("#razao_social_empresa").val() == "") campoFocus = "razao_social_empresa";
	else if($("#data_atualizacao_empresa").val() == "") campoFocus = "data_atualizacao_empresa";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_empresa").val() == "") campoFocus = "bool_ativo_empresa";


	else {
		$.ajax({
			url:'app/controllers/atualiza_empresaController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_empresa': $("#editar").val(),
				'razao_social_empresa': $("#razao_social_empresa").val(),
				'data_atualizacao_empresa': $("#data_atualizacao_empresa").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_empresa': $("#bool_ativo_empresa").val(),
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