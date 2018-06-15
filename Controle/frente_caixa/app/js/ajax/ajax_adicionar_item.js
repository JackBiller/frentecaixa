
function gravarRegistro(){
	var campoFocus = "";
		 if($("#descricao_item").val() == "") campoFocus = "descricao_item";
	else if($("#grupo_id").val() == "") campoFocus = "grupo_id";
	else if($("#data_atualizacao_item").val() == "") campoFocus = "data_atualizacao_item";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_item").val() == "") campoFocus = "bool_ativo_item";


	else {
		$.ajax({
			url:'app/controllers/cadastro_itemController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'descricao_item': $("#descricao_item").val(),
				'grupo_id': $("#grupo_id").val(),
				'data_atualizacao_item': $("#data_atualizacao_item").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_item': $("#bool_ativo_item").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#descricao_item").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}