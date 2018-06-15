
function combo_pedido_pagamento(id, value){
	jk_comboVlrPreDataList(
		"Pedido_pagamento", "funcoes_pedido_pagamentoController", 
		{
			'pequisa_pedido_pagamento': true
		}, "pedido_pagamento_id", 
		[ "1","2","3","4","5","6","7","8","9","10" ], 
		0, [1], "", "pedido_pagamentoDiv", "", 9, id, value
	);
}

function combo_pedido_pagamento_NV(){
	jk_comboDataList(
		"Pedido_pagamento", "funcoes_pedido_pagamentoController", 
		{
			'pequisa_pedido_pagamento': true
		}, "pedido_pagamento_id", 
		[ "1","2","3","4","5","6","7","8","9","10" ], 
		0, [1], "", "pedido_pagamentoDiv", "", 9
	);
}