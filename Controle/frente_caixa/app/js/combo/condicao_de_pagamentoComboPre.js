
function combo_condicao_de_pagamento(id, value){
	jk_comboVlrPreDataList(
		"Condicao_de_pagamento", "funcoes_condicao_de_pagamentoController", 
		{
			'pequisa_condicao_de_pagamento': true
		}, "condicao_de_pagamento_id", 
		[ "1","2","3","4","5" ], 
		0, [1], "", "condicao_de_pagamentoDiv", "", 4, id, value
	);
}

function combo_condicao_de_pagamento_NV(){
	jk_comboDataList(
		"Condicao_de_pagamento", "funcoes_condicao_de_pagamentoController", 
		{
			'pequisa_condicao_de_pagamento': true
		}, "condicao_de_pagamento_id", 
		[ "1","2","3","4","5" ], 
		0, [1], "", "condicao_de_pagamentoDiv", "", 4
	);
}