
$(document).ready(function(){
	var id_cliente_contato = "";
	var telefone_cliente_contato = "";
	var celular_cliente_contato = "";
	var email_cliente_contato = "";
	var cliente_id = "";
	var data_atualizacao_cliente_contato = "";
	var usuario_id = "";
	var bool_ativo_cliente_contato = "";

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
		url:'app/controllers/funcoes_cliente_contatoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_cliente_contato_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_cliente_contato = vetor[0];
		
		telefone_cliente_contato = vetor[1];
		celular_cliente_contato = vetor[2];
		email_cliente_contato = vetor[3];
		cliente_id = vetor[4];
		data_atualizacao_cliente_contato = vetor[5];
		usuario_id = vetor[6];
		bool_ativo_cliente_contato = vetor[7];
		
		$("#telefone_cliente_contato").val(telefone_cliente_contato);
		$("#celular_cliente_contato").val(celular_cliente_contato);
		$("#email_cliente_contato").val(email_cliente_contato);
		$("#cliente_id").val(cliente_id);
		$("#data_atualizacao_cliente_contato").val(data_atualizacao_cliente_contato);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_cliente_contato").val(bool_ativo_cliente_contato);
		
		if(cliente_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_clienteController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_cliente_id': true,
					'id': cliente_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_cliente(cliente_id, vetor[1]);
				// $("#cliente_id-flexdatalist").val(vetor[1]);
				// $("#cliente_id").val(parseInt(vetor[0]));
			});
			$("#cliente_id").val(cliente_id);
		}

		else combo_cliente_NV();
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
		 if($("#telefone_cliente_contato").val() == "") campoFocus = "telefone_cliente_contato";
	else if($("#data_atualizacao_cliente_contato").val() == "") campoFocus = "data_atualizacao_cliente_contato";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_cliente_contato").val() == "") campoFocus = "bool_ativo_cliente_contato";


	else {
		$.ajax({
			url:'app/controllers/atualiza_cliente_contatoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_cliente_contato': $("#editar").val(),
				'telefone_cliente_contato': $("#telefone_cliente_contato").val(),
				'celular_cliente_contato': $("#celular_cliente_contato").val(),
				'email_cliente_contato': $("#email_cliente_contato").val(),
				'cliente_id': $("#cliente_id").val(),
				'data_atualizacao_cliente_contato': $("#data_atualizacao_cliente_contato").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_cliente_contato': $("#bool_ativo_cliente_contato").val(),
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