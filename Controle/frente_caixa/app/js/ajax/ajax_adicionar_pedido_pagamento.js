
function gravarRegistro(){
	var campoFocus = "";
		 if($("#parcela_atual_pedido_pagamento").val() == "") campoFocus = "parcela_atual_pedido_pagamento";
	else if($("#parcela_total_pedido_pagamento").val() == "") campoFocus = "parcela_total_pedido_pagamento";
	else if($("#valor_pago_pedido_pagamento").val() == "") campoFocus = "valor_pago_pedido_pagamento";
	else if($("#bool_esta_pago_pedido_pagamento").val() == "") campoFocus = "bool_esta_pago_pedido_pagamento";
	else if($("#pedido_id").val() == "") campoFocus = "pedido_id";
	else if($("#condicao_de_pagamento_id").val() == "") campoFocus = "condicao_de_pagamento_id";
	else if($("#data_atualizacao_pedido_pagamento").val() == "") campoFocus = "data_atualizacao_pedido_pagamento";
	else if($("#usuario_id").val() == "") campoFocus = "usuario_id";
	else if($("#bool_ativo_pedido_pagamento").val() == "") campoFocus = "bool_ativo_pedido_pagamento";


	else {
		$.ajax({
			url:'app/controllers/cadastro_pedido_pagamentoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'parcela_atual_pedido_pagamento': $("#parcela_atual_pedido_pagamento").val(),
				'parcela_total_pedido_pagamento': $("#parcela_total_pedido_pagamento").val(),
				'valor_pago_pedido_pagamento': $("#valor_pago_pedido_pagamento").val(),
				'bool_esta_pago_pedido_pagamento': $("#bool_esta_pago_pedido_pagamento").val(),
				'pedido_id': $("#pedido_id").val(),
				'condicao_de_pagamento_id': $("#condicao_de_pagamento_id").val(),
				'data_atualizacao_pedido_pagamento': $("#data_atualizacao_pedido_pagamento").val(),
				'usuario_id': $("#usuario_id").val(),
				'bool_ativo_pedido_pagamento': $("#bool_ativo_pedido_pagamento").val(),
				'areaDeAtuacao': $("#areaDeAtuacao").val()
			}
		}).done( function(data){
			console.log(data);
			if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
			else {
				toast.success("Cadastrado com sucesso!");
				$("#parcela_atual_pedido_pagamento").val("");
				$("#parcela_total_pedido_pagamento").val("");
				$("#valor_pago_pedido_pagamento").val("");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}