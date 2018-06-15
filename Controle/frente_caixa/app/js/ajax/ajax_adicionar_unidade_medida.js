
function gravarRegistro(){
	var campoFocus = "";
		 if($("#sigla_unidade_medida").val() == "") campoFocus = "sigla_unidade_medida";
	else if($("#data_atualizacao_unidade_medida").val() == "") campoFocus = "data_atualizacao_unidade_medida";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_unidade_medida").val() == "") campoFocus = "bool_ativo_unidade_medida";


	else {
		$.ajax({
			url:'app/controllers/cadastro_unidade_medidaController.php',
			type: 'POST',
			dataType: 'text',
			data: {
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
			else {
				toast.success("Cadastrado com sucesso!");
				$("#descricao_unidade_medida").val("");
				$("#sigla_unidade_medida").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}