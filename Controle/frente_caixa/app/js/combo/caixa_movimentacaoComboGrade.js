
function jk_caixa_movimentacaoDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Caixa_movimentacao", "funcoes_caixa_movimentacaoController", 
			{
				'pequisa_caixa_movimentacao_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "caixa_movimentacao_id", 
			[ "1","2","3","4","5","6","7","8","9" ], 
			0, [1], "", "caixa_movimentacaoDiv", "", 8
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='caixa_movimentacao_id' disabled>";
		$("#caixa_movimentacaoDiv").html(campo);
	}
}

function jk_caixa_movimentacaoDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Caixa_movimentacao", "funcoes_caixa_movimentacaoController", 
			{
				'pequisa_caixa_movimentacao_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "caixa_movimentacao_id", 
			[ "1","2","3","4","5","6","7","8","9" ], 
			0, [1], "", "caixa_movimentacaoDiv", "", 8, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='caixa_movimentacao_id' disabled>";
		$("#caixa_movimentacaoDiv").html(campo);
	}
}