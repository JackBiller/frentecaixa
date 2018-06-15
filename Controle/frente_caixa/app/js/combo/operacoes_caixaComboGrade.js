
function jk_operacoes_caixaDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Operacoes_caixa", "funcoes_operacoes_caixaController", 
			{
				'pequisa_operacoes_caixa_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "operacoes_caixa_id", 
			[ "1","2","3","4","5" ], 
			0, [1], "", "operacoes_caixaDiv", "", 4
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='operacoes_caixa_id' disabled>";
		$("#operacoes_caixaDiv").html(campo);
	}
}

function jk_operacoes_caixaDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Operacoes_caixa", "funcoes_operacoes_caixaController", 
			{
				'pequisa_operacoes_caixa_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "operacoes_caixa_id", 
			[ "1","2","3","4","5" ], 
			0, [1], "", "operacoes_caixaDiv", "", 4, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='operacoes_caixa_id' disabled>";
		$("#operacoes_caixaDiv").html(campo);
	}
}