
function jk_caixaDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Caixa", "funcoes_caixaController", 
			{
				'pequisa_caixa_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "caixa_id", 
			[ "1","2","3","4","5","6" ], 
			0, [1], "", "caixaDiv", "", 5
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='caixa_id' disabled>";
		$("#caixaDiv").html(campo);
	}
}

function jk_caixaDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Caixa", "funcoes_caixaController", 
			{
				'pequisa_caixa_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "caixa_id", 
			[ "1","2","3","4","5","6" ], 
			0, [1], "", "caixaDiv", "", 5, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='caixa_id' disabled>";
		$("#caixaDiv").html(campo);
	}
}