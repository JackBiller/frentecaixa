
function jk_item_unidade_medidaDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Item_unidade_medida", "funcoes_item_unidade_medidaController", 
			{
				'pequisa_item_unidade_medida_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "item_unidade_medida_id", 
			[ "1","2","3","4","5","6","7" ], 
			0, [1], "", "item_unidade_medidaDiv", "", 6
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='item_unidade_medida_id' disabled>";
		$("#item_unidade_medidaDiv").html(campo);
	}
}

function jk_item_unidade_medidaDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Item_unidade_medida", "funcoes_item_unidade_medidaController", 
			{
				'pequisa_item_unidade_medida_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "item_unidade_medida_id", 
			[ "1","2","3","4","5","6","7" ], 
			0, [1], "", "item_unidade_medidaDiv", "", 6, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='item_unidade_medida_id' disabled>";
		$("#item_unidade_medidaDiv").html(campo);
	}
}