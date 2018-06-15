
$(document).ready(function(){
	var id_filial = "";
	var razao_social_filial = "";
	var cnpj_filial = "";
	var empresa_id = "";
	var data_atualizacao_filial = "";
	var usuario_id = "";
	var bool_ativo_filial = "";

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
		url:'app/controllers/funcoes_filialController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_filial_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_filial = vetor[0];
		
		razao_social_filial = vetor[1];
		cnpj_filial = vetor[2];
		empresa_id = vetor[3];
		data_atualizacao_filial = vetor[4];
		usuario_id = vetor[5];
		bool_ativo_filial = vetor[6];
		
		$("#razao_social_filial").val(razao_social_filial);
		$("#cnpj_filial").val(cnpj_filial);
		$("#empresa_id").val(empresa_id);
		$("#data_atualizacao_filial").val(data_atualizacao_filial);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_filial").val(bool_ativo_filial);
		
		if(empresa_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_empresaController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_empresa_id': true,
					'id': empresa_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_empresa(empresa_id, vetor[1]);
				// $("#empresa_id-flexdatalist").val(vetor[1]);
				// $("#empresa_id").val(parseInt(vetor[0]));
			});
			$("#empresa_id").val(empresa_id);
		}

		else combo_empresa_NV();
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
		 if($("#razao_social_filial").val() == "") campoFocus = "razao_social_filial";
	else if($("#cnpj_filial").val() == "") campoFocus = "cnpj_filial";
	else if($("#data_atualizacao_filial").val() == "") campoFocus = "data_atualizacao_filial";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_filial").val() == "") campoFocus = "bool_ativo_filial";


	else {
		$.ajax({
			url:'app/controllers/atualiza_filialController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_filial': $("#editar").val(),
				'razao_social_filial': $("#razao_social_filial").val(),
				'cnpj_filial': $("#cnpj_filial").val(),
				'empresa_id': $("#empresa_id").val(),
				'data_atualizacao_filial': $("#data_atualizacao_filial").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_filial': $("#bool_ativo_filial").val(),
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