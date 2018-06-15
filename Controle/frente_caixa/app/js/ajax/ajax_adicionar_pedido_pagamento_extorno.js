
function gravarRegistro(){
	var campoFocus = "";
		 if($("#motivo_pedido_pagamento_extorno").val() == "") campoFocus = "motivo_pedido_pagamento_extorno";
	else if($("#pedido_pagamento_id").val() == "") campoFocus = "pedido_pagamento_id";
	else if($("#data_atualizacao_pedido_pagamento_extorno").val() == "") campoFocus = "data_atualizacao_pedido_pagamento_extorno";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_pedido_pagamento_extorno").val() == "") campoFocus = "bool_ativo_pedido_pagamento_extorno";


	else {
		$.ajax({
			url:'app/controllers/cadastro_pedido_pagamento_extornoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'motivo_pedido_pagamento_extorno': $("#motivo_pedido_pagamento_extorno").val(),
				'pedido_pagamento_id': $("#pedido_pagamento_id").val(),
				'data_atualizacao_pedido_pagamento_extorno': $("#data_atualizacao_pedido_pagamento_extorno").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_pedido_pagamento_extorno': $("#bool_ativo_pedido_pagamento_extorno").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#motivo_pedido_pagamento_extorno").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}