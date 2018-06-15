
function combo_caixa_operacao(id, value){
	jk_comboVlrPreDataList(
		"Caixa_operacao", "funcoes_caixa_operacaoController", 
		{
			'pequisa_caixa_operacao': true
		}, "caixa_operacao_id", 
		[ "1","2","3","4","5","6","7","8" ], 
		0, [1], "", "caixa_operacaoDiv", "", 7, id, value
	);
}

function combo_caixa_operacao_NV(){
	jk_comboDataList(
		"Caixa_operacao", "funcoes_caixa_operacaoController", 
		{
			'pequisa_caixa_operacao': true
		}, "caixa_operacao_id", 
		[ "1","2","3","4","5","6","7","8" ], 
		0, [1], "", "caixa_operacaoDiv", "", 7
	);
}