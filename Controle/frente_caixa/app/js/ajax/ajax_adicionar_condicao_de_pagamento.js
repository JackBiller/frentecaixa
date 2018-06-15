
function gravarRegistro(){
	var campoFocus = "";
		 if($("#descricao_condicao_de_pagamento").val() == "") campoFocus = "descricao_condicao_de_pagamento";
	else if($("#data_atualizacao_condicao_de_pagamento").val() == "") campoFocus = "data_atualizacao_condicao_de_pagamento";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_condicao_de_pagamento").val() == "") campoFocus = "bool_ativo_condicao_de_pagamento";


	else {
		$.ajax({
			url:'app/controllers/cadastro_condicao_de_pagamentoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'descricao_condicao_de_pagamento': $("#descricao_condicao_de_pagamento").val(),
				'data_atualizacao_condicao_de_pagamento': $("#data_atualizacao_condicao_de_pagamento").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_condicao_de_pagamento': $("#bool_ativo_condicao_de_pagamento").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#descricao_condicao_de_pagamento").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}