
function jk_pedidoDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Pedido", "funcoes_pedidoController", 
			{
				'pequisa_pedido_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "pedido_id", 
			[ "1","2","3","4","5","6","7","8","9","10","11" ], 
			0, [1], "", "pedidoDiv", "", 10
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='pedido_id' disabled>";
		$("#pedidoDiv").html(campo);
	}
}

function jk_pedidoDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Pedido", "funcoes_pedidoController", 
			{
				'pequisa_pedido_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "pedido_id", 
			[ "1","2","3","4","5","6","7","8","9","10","11" ], 
			0, [1], "", "pedidoDiv", "", 10, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='pedido_id' disabled>";
		$("#pedidoDiv").html(campo);
	}
}