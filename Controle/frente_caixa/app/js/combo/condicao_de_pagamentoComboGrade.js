
function jk_condicao_de_pagamentoDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Condicao_de_pagamento", "funcoes_condicao_de_pagamentoController", 
			{
				'pequisa_condicao_de_pagamento_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "condicao_de_pagamento_id", 
			[ "1","2","3","4","5" ], 
			0, [1], "", "condicao_de_pagamentoDiv", "", 4
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='condicao_de_pagamento_id' disabled>";
		$("#condicao_de_pagamentoDiv").html(campo);
	}
}

function jk_condicao_de_pagamentoDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Condicao_de_pagamento", "funcoes_condicao_de_pagamentoController", 
			{
				'pequisa_condicao_de_pagamento_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "condicao_de_pagamento_id", 
			[ "1","2","3","4","5" ], 
			0, [1], "", "condicao_de_pagamentoDiv", "", 4, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='condicao_de_pagamento_id' disabled>";
		$("#condicao_de_pagamentoDiv").html(campo);
	}
}