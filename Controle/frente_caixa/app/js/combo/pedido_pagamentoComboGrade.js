
function jk_pedido_pagamentoDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Pedido_pagamento", "funcoes_pedido_pagamentoController", 
			{
				'pequisa_pedido_pagamento_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "pedido_pagamento_id", 
			[ "1","2","3","4","5","6","7","8","9","10" ], 
			0, [1], "", "pedido_pagamentoDiv", "", 9
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='pedido_pagamento_id' disabled>";
		$("#pedido_pagamentoDiv").html(campo);
	}
}

function jk_pedido_pagamentoDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Pedido_pagamento", "funcoes_pedido_pagamentoController", 
			{
				'pequisa_pedido_pagamento_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "pedido_pagamento_id", 
			[ "1","2","3","4","5","6","7","8","9","10" ], 
			0, [1], "", "pedido_pagamentoDiv", "", 9, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='pedido_pagamento_id' disabled>";
		$("#pedido_pagamentoDiv").html(campo);
	}
}