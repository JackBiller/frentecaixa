
function jk_caixa_operacaoDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Caixa_operacao", "funcoes_caixa_operacaoController", 
			{
				'pequisa_caixa_operacao_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "caixa_operacao_id", 
			[ "1","2","3","4","5","6","7","8" ], 
			0, [1], "", "caixa_operacaoDiv", "", 7
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='caixa_operacao_id' disabled>";
		$("#caixa_operacaoDiv").html(campo);
	}
}

function jk_caixa_operacaoDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Caixa_operacao", "funcoes_caixa_operacaoController", 
			{
				'pequisa_caixa_operacao_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "caixa_operacao_id", 
			[ "1","2","3","4","5","6","7","8" ], 
			0, [1], "", "caixa_operacaoDiv", "", 7, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='caixa_operacao_id' disabled>";
		$("#caixa_operacaoDiv").html(campo);
	}
}