
function combo_operacoes_caixa(id, value){
	jk_comboVlrPreDataList(
		"Operacoes_caixa", "funcoes_operacoes_caixaController", 
		{
			'pequisa_operacoes_caixa': true
		}, "operacoes_caixa_id", 
		[ "1","2","3","4","5" ], 
		0, [1], "", "operacoes_caixaDiv", "", 4, id, value
	);
}

function combo_operacoes_caixa_NV(){
	jk_comboDataList(
		"Operacoes_caixa", "funcoes_operacoes_caixaController", 
		{
			'pequisa_operacoes_caixa': true
		}, "operacoes_caixa_id", 
		[ "1","2","3","4","5" ], 
		0, [1], "", "operacoes_caixaDiv", "", 4
	);
}