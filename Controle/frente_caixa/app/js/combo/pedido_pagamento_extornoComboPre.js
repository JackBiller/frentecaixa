
function combo_pedido_pagamento_extorno(id, value){
	jk_comboVlrPreDataList(
		"Pedido_pagamento_extorno", "funcoes_pedido_pagamento_extornoController", 
		{
			'pequisa_pedido_pagamento_extorno': true
		}, "pedido_pagamento_extorno_id", 
		[ "1","2","3","4","5","6" ], 
		0, [1], "", "pedido_pagamento_extornoDiv", "", 5, id, value
	);
}

function combo_pedido_pagamento_extorno_NV(){
	jk_comboDataList(
		"Pedido_pagamento_extorno", "funcoes_pedido_pagamento_extornoController", 
		{
			'pequisa_pedido_pagamento_extorno': true
		}, "pedido_pagamento_extorno_id", 
		[ "1","2","3","4","5","6" ], 
		0, [1], "", "pedido_pagamento_extornoDiv", "", 5
	);
}