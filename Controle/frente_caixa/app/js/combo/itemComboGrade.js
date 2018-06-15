
function jk_itemDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Item", "funcoes_itemController", 
			{
				'pequisa_item_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "item_id", 
			[ "1","2","3","4","5","6" ], 
			0, [1], "", "itemDiv", "", 5
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='item_id' disabled>";
		$("#itemDiv").html(campo);
	}
}

function jk_itemDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Item", "funcoes_itemController", 
			{
				'pequisa_item_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "item_id", 
			[ "1","2","3","4","5","6" ], 
			0, [1], "", "itemDiv", "", 5, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='item_id' disabled>";
		$("#itemDiv").html(campo);
	}
}