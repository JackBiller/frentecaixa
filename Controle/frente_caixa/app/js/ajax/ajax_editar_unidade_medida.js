
$(document).ready(function(){
	var id_unidade_medida = "";
	var descricao_unidade_medida = "";
	var sigla_unidade_medida = "";
	var data_atualizacao_unidade_medida = "";
	var usuario_id = "";
	var bool_ativo_unidade_medida = "";

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
		url:'app/controllers/funcoes_unidade_medidaController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_unidade_medida_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_unidade_medida = vetor[0];
		
		descricao_unidade_medida = vetor[1];
		sigla_unidade_medida = vetor[2];
		data_atualizacao_unidade_medida = vetor[3];
		usuario_id = vetor[4];
		bool_ativo_unidade_medida = vetor[5];
		
		$("#descricao_unidade_medida").val(descricao_unidade_medida);
		$("#sigla_unidade_medida").val(sigla_unidade_medida);
		$("#data_atualizacao_unidade_medida").val(data_atualizacao_unidade_medida);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_unidade_medida").val(bool_ativo_unidade_medida);
		
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
		 if($("#sigla_unidade_medida").val() == "") campoFocus = "sigla_unidade_medida";
	else if($("#data_atualizacao_unidade_medida").val() == "") campoFocus = "data_atualizacao_unidade_medida";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_unidade_medida").val() == "") campoFocus = "bool_ativo_unidade_medida";


	else {
		$.ajax({
			url:'app/controllers/atualiza_unidade_medidaController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_unidade_medida': $("#editar").val(),
				'descricao_unidade_medida': $("#descricao_unidade_medida").val(),
				'sigla_unidade_medida': $("#sigla_unidade_medida").val(),
				'data_atualizacao_unidade_medida': $("#data_atualizacao_unidade_medida").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_unidade_medida': $("#bool_ativo_unidade_medida").val(),
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