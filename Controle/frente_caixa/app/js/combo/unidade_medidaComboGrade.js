
function jk_unidade_medidaDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Unidade_medida", "funcoes_unidade_medidaController", 
			{
				'pequisa_unidade_medida_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "unidade_medida_id", 
			[ "1","2","3","4","5","6" ], 
			0, [1], "", "unidade_medidaDiv", "", 5
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='unidade_medida_id' disabled>";
		$("#unidade_medidaDiv").html(campo);
	}
}

function jk_unidade_medidaDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Unidade_medida", "funcoes_unidade_medidaController", 
			{
				'pequisa_unidade_medida_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "unidade_medida_id", 
			[ "1","2","3","4","5","6" ], 
			0, [1], "", "unidade_medidaDiv", "", 5, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='unidade_medida_id' disabled>";
		$("#unidade_medidaDiv").html(campo);
	}
}