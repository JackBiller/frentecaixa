
function combo_caixa(id, value){
	jk_comboVlrPreDataList(
		"Caixa", "funcoes_caixaController", 
		{
			'pequisa_caixa': true
		}, "caixa_id", 
		[ "1","2","3","4","5","6" ], 
		0, [1], "", "caixaDiv", "", 5, id, value
	);
}

function combo_caixa_NV(){
	jk_comboDataList(
		"Caixa", "funcoes_caixaController", 
		{
			'pequisa_caixa': true
		}, "caixa_id", 
		[ "1","2","3","4","5","6" ], 
		0, [1], "", "caixaDiv", "", 5
	);
}