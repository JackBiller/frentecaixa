
function gravarRegistro(){
	var campoFocus = "";
		 if($("#quantidade_item_unidade_medida").val() == "") campoFocus = "quantidade_item_unidade_medida";
	else if($("#item_id").val() == "") campoFocus = "item_id";
	else if($("#unidade_medida_id").val() == "") campoFocus = "unidade_medida_id";
	else if($("#data_atualizacao_item_unidade_medida").val() == "") campoFocus = "data_atualizacao_item_unidade_medida";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_item_unidade_medida").val() == "") campoFocus = "bool_ativo_item_unidade_medida";


	else {
		$.ajax({
			url:'app/controllers/cadastro_item_unidade_medidaController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'quantidade_item_unidade_medida': $("#quantidade_item_unidade_medida").val(),
				'item_id': $("#item_id").val(),
				'unidade_medida_id': $("#unidade_medida_id").val(),
				'data_atualizacao_item_unidade_medida': $("#data_atualizacao_item_unidade_medida").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_item_unidade_medida': $("#bool_ativo_item_unidade_medida").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#quantidade_item_unidade_medida").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}