
$(document).ready(function(){
	var id_cliente = "";
	var nome_cliente = "";
	var data_atualizacao_cliente = "";
	var usuario_id = "";
	var bool_ativo_cliente = "";

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
		url:'app/controllers/funcoes_clienteController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_cliente_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_cliente = vetor[0];
		
		nome_cliente = vetor[1];
		data_atualizacao_cliente = vetor[2];
		usuario_id = vetor[3];
		bool_ativo_cliente = vetor[4];
		
		$("#nome_cliente").val(nome_cliente);
		$("#data_atualizacao_cliente").val(data_atualizacao_cliente);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_cliente").val(bool_ativo_cliente);
		
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
		 if($("#nome_cliente").val() == "") campoFocus = "nome_cliente";
	else if($("#data_atualizacao_cliente").val() == "") campoFocus = "data_atualizacao_cliente";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_cliente").val() == "") campoFocus = "bool_ativo_cliente";


	else {
		$.ajax({
			url:'app/controllers/atualiza_clienteController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_cliente': $("#editar").val(),
				'nome_cliente': $("#nome_cliente").val(),
				'data_atualizacao_cliente': $("#data_atualizacao_cliente").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_cliente': $("#bool_ativo_cliente").val(),
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