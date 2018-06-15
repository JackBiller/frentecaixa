
function jk_pedido_itemDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Pedido_item", "funcoes_pedido_itemController", 
			{
				'pequisa_pedido_item_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "pedido_item_id", 
			[ "1","2","3","4","5","6","7","8","9","10" ], 
			0, [1], "", "pedido_itemDiv", "", 9
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='pedido_item_id' disabled>";
		$("#pedido_itemDiv").html(campo);
	}
}

function jk_pedido_itemDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Pedido_item", "funcoes_pedido_itemController", 
			{
				'pequisa_pedido_item_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "pedido_item_id", 
			[ "1","2","3","4","5","6","7","8","9","10" ], 
			0, [1], "", "pedido_itemDiv", "", 9, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='pedido_item_id' disabled>";
		$("#pedido_itemDiv").html(campo);
	}
}