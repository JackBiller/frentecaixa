
$(document).ready(function(){
	var id_estado = "";
	var descricao_estado = "";
	var sigla_estado = "";
	var data_atualizacao_estado = "";
	var usuario_id = "";
	var bool_ativo_estado = "";

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
		url:'app/controllers/funcoes_estadoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_estado_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_estado = vetor[0];
		
		descricao_estado = vetor[1];
		sigla_estado = vetor[2];
		data_atualizacao_estado = vetor[3];
		usuario_id = vetor[4];
		bool_ativo_estado = vetor[5];
		
		$("#descricao_estado").val(descricao_estado);
		$("#sigla_estado").val(sigla_estado);
		$("#data_atualizacao_estado").val(data_atualizacao_estado);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_estado").val(bool_ativo_estado);
		
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
		 if($("#descricao_estado").val() == "") campoFocus = "descricao_estado";
	else if($("#sigla_estado").val() == "") campoFocus = "sigla_estado";
	else if($("#data_atualizacao_estado").val() == "") campoFocus = "data_atualizacao_estado";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_estado").val() == "") campoFocus = "bool_ativo_estado";


	else {
		$.ajax({
			url:'app/controllers/atualiza_estadoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_estado': $("#editar").val(),
				'descricao_estado': $("#descricao_estado").val(),
				'sigla_estado': $("#sigla_estado").val(),
				'data_atualizacao_estado': $("#data_atualizacao_estado").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_estado': $("#bool_ativo_estado").val(),
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