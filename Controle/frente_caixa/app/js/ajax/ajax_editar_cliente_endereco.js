
$(document).ready(function(){
	var id_cliente_endereco = "";
	var endereco_cliente_endereco = "";
	var numero_cliente_endereco = "";
	var complemento_cliente_endereco = "";
	var bairro_cliente_endereco = "";
	var cidade_cliente_endereco = "";
	var estado_id = "";
	var cliente_id = "";
	var data_atualizacao_cliente_endereco = "";
	var usuario_id = "";
	var bool_ativo_cliente_endereco = "";

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
		url:'app/controllers/funcoes_cliente_enderecoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_cliente_endereco_id': true,
			'id': $("#editar").val()
		}
	}).done( function(data){
		vetor = data.split("{,}");

		id_cliente_endereco = vetor[0];
		
		endereco_cliente_endereco = vetor[1];
		numero_cliente_endereco = vetor[2];
		complemento_cliente_endereco = vetor[3];
		bairro_cliente_endereco = vetor[4];
		cidade_cliente_endereco = vetor[5];
		estado_id = vetor[6];
		cliente_id = vetor[7];
		data_atualizacao_cliente_endereco = vetor[8];
		usuario_id = vetor[9];
		bool_ativo_cliente_endereco = vetor[10];
		
		$("#endereco_cliente_endereco").val(endereco_cliente_endereco);
		$("#numero_cliente_endereco").val(numero_cliente_endereco);
		$("#complemento_cliente_endereco").val(complemento_cliente_endereco);
		$("#bairro_cliente_endereco").val(bairro_cliente_endereco);
		$("#cidade_cliente_endereco").val(cidade_cliente_endereco);
		$("#estado_id").val(estado_id);
		$("#cliente_id").val(cliente_id);
		$("#data_atualizacao_cliente_endereco").val(data_atualizacao_cliente_endereco);
		$("#usuario_id").val(usuario_id);
		$("#bool_ativo_cliente_endereco").val(bool_ativo_cliente_endereco);
		
		if(estado_id != 0){
			$.ajax({
				url:'app/controllers/funcoes_estadoController.php',
				type: 'POST',
				dataType: 'text',
				data: { 
					'pequisa_estado_id': true,
					'id': estado_id
				}
			}).done( function(data){
				vetor = data.split("{,}");
				combo_estado(estado_id, vetor[1]);
				// $("#estado_id-flexdatalist").val(vetor[1]);
				// $("#estado_id").val(parseInt(vetor[0]));
			});
			$("#estado_id").val(estado_id);
		}

		else combo_estado_NV();
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
		 if($("#endereco_cliente_endereco").val() == "") campoFocus = "endereco_cliente_endereco";
	else if($("#numero_cliente_endereco").val() == "") campoFocus = "numero_cliente_endereco";
	else if($("#bairro_cliente_endereco").val() == "") campoFocus = "bairro_cliente_endereco";
	else if($("#cidade_cliente_endereco").val() == "") campoFocus = "cidade_cliente_endereco";
	else if($("#estado_id").val() == "") campoFocus = "estado_id";
	else if($("#data_atualizacao_cliente_endereco").val() == "") campoFocus = "data_atualizacao_cliente_endereco";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_cliente_endereco").val() == "") campoFocus = "bool_ativo_cliente_endereco";


	else {
		$.ajax({
			url:'app/controllers/atualiza_cliente_enderecoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'id_cliente_endereco': $("#editar").val(),
				'endereco_cliente_endereco': $("#endereco_cliente_endereco").val(),
				'numero_cliente_endereco': $("#numero_cliente_endereco").val(),
				'complemento_cliente_endereco': $("#complemento_cliente_endereco").val(),
				'bairro_cliente_endereco': $("#bairro_cliente_endereco").val(),
				'cidade_cliente_endereco': $("#cidade_cliente_endereco").val(),
				'estado_id': $("#estado_id").val(),
				'cliente_id': $("#cliente_id").val(),
				'data_atualizacao_cliente_endereco': $("#data_atualizacao_cliente_endereco").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_cliente_endereco': $("#bool_ativo_cliente_endereco").val(),
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