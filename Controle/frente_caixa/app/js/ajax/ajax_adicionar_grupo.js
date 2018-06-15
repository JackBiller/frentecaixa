
function gravarRegistro(){
	var campoFocus = "";
		 if($("#descricao_grupo").val() == "") campoFocus = "descricao_grupo";
	else if($("#imagem_grupo").val() == "") campoFocus = "imagem_grupo";
	else if($("#filial_id").val() == "") campoFocus = "filial_id";
	else if($("#data_atualizacao_grupo").val() == "") campoFocus = "data_atualizacao_grupo";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_grupo").val() == "") campoFocus = "bool_ativo_grupo";


	else {
		$.ajax({
			url:'app/controllers/cadastro_grupoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'descricao_grupo': $("#descricao_grupo").val(),
				'imagem_grupo': $("#imagem_grupo").val(),
				'filial_id': $("#filial_id").val(),
				'data_atualizacao_grupo': $("#data_atualizacao_grupo").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_grupo': $("#bool_ativo_grupo").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#descricao_grupo").val("");
				$("#imagem_grupo").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}