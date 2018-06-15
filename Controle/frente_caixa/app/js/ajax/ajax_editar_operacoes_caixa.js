
$(document).ready(function(){
	var id_operacoes_caixa = "";
	var descricao_operacoes_caixa = "";
	var data_atualizacao_operacoes_caixa = "";
	var usuario_id = "";
	var bool_ativo_operacoes_caixa = "";

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
		url:'app/controllers/funcoes_operacoes_caixaController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_operacoes_caixa_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_operacoes_caixa = vetor[0];
		
		descricao_operacoes_caixa = vetor[1];
		data_atualizacao_operacoes_caixa = vetor[2];
		usuario_id = vetor[3];
		bool_ativo_operacoes_caixa = vetor[4];
		
		$("#descricao_operacoes_caixa").val(descricao_operacoes_caixa);
		$("#data_atualizacao_operacoes_caixa").val(data_atualizacao_operacoes_caixa);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_operacoes_caixa").val(bool_ativo_operacoes_caixa);
		
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
		 if($("#descricao_operacoes_caixa").val() == "") campoFocus = "descricao_operacoes_caixa";
	else if($("#data_atualizacao_operacoes_caixa").val() == "") campoFocus = "data_atualizacao_operacoes_caixa";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_operacoes_caixa").val() == "") campoFocus = "bool_ativo_operacoes_caixa";


	else {
		$.ajax({
			url:'app/controllers/atualiza_operacoes_caixaController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_operacoes_caixa': $("#editar").val(),
				'descricao_operacoes_caixa': $("#descricao_operacoes_caixa").val(),
				'data_atualizacao_operacoes_caixa': $("#data_atualizacao_operacoes_caixa").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_operacoes_caixa': $("#bool_ativo_operacoes_caixa").val(),
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