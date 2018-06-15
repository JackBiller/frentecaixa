
function jk_pedido_pagamento_extornoDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Pedido_pagamento_extorno", "funcoes_pedido_pagamento_extornoController", 
			{
				'pequisa_pedido_pagamento_extorno_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "pedido_pagamento_extorno_id", 
			[ "1","2","3","4","5","6" ], 
			0, [1], "", "pedido_pagamento_extornoDiv", "", 5
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='pedido_pagamento_extorno_id' disabled>";
		$("#pedido_pagamento_extornoDiv").html(campo);
	}
}

function jk_pedido_pagamento_extornoDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Pedido_pagamento_extorno", "funcoes_pedido_pagamento_extornoController", 
			{
				'pequisa_pedido_pagamento_extorno_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "pedido_pagamento_extorno_id", 
			[ "1","2","3","4","5","6" ], 
			0, [1], "", "pedido_pagamento_extornoDiv", "", 5, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='pedido_pagamento_extorno_id' disabled>";
		$("#pedido_pagamento_extornoDiv").html(campo);
	}
}