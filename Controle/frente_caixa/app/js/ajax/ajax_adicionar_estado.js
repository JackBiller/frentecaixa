
function gravarRegistro(){
	var campoFocus = "";
		 if($("#descricao_estado").val() == "") campoFocus = "descricao_estado";
	else if($("#sigla_estado").val() == "") campoFocus = "sigla_estado";
	else if($("#data_atualizacao_estado").val() == "") campoFocus = "data_atualizacao_estado";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_estado").val() == "") campoFocus = "bool_ativo_estado";


	else {
		$.ajax({
			url:'app/controllers/cadastro_estadoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
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
			else {
				toast.success("Cadastrado com sucesso!");
				$("#descricao_estado").val("");
				$("#sigla_estado").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}