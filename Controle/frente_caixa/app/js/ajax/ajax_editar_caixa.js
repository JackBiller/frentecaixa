
$(document).ready(function(){
	var id_caixa = "";
	var descricao_caixa = "";
	var filial_id = "";
	var data_atualizacao_caixa = "";
	var usuario_id = "";
	var bool_ativo_caixa = "";

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
		url:'app/controllers/funcoes_caixaController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_caixa_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_caixa = vetor[0];
		
		descricao_caixa = vetor[1];
		filial_id = vetor[2];
		data_atualizacao_caixa = vetor[3];
		usuario_id = vetor[4];
		bool_ativo_caixa = vetor[5];
		
		$("#descricao_caixa").val(descricao_caixa);
		$("#filial_id").val(filial_id);
		$("#data_atualizacao_caixa").val(data_atualizacao_caixa);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_caixa").val(bool_ativo_caixa);
		
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
		 if($("#descricao_caixa").val() == "") campoFocus = "descricao_caixa";
	else if($("#filial_id").val() == "") campoFocus = "filial_id";
	else if($("#data_atualizacao_caixa").val() == "") campoFocus = "data_atualizacao_caixa";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_caixa").val() == "") campoFocus = "bool_ativo_caixa";


	else {
		$.ajax({
			url:'app/controllers/atualiza_caixaController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_caixa': $("#editar").val(),
				'descricao_caixa': $("#descricao_caixa").val(),
				'filial_id': $("#filial_id").val(),
				'data_atualizacao_caixa': $("#data_atualizacao_caixa").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_caixa': $("#bool_ativo_caixa").val(),
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