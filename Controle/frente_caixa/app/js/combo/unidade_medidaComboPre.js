
function combo_unidade_medida(id, value){
	jk_comboVlrPreDataList(
		"Unidade_medida", "funcoes_unidade_medidaController", 
		{
			'pequisa_unidade_medida': true
		}, "unidade_medida_id", 
		[ "1","2","3","4","5","6" ], 
		0, [1], "", "unidade_medidaDiv", "", 5, id, value
	);
}

function combo_unidade_medida_NV(){
	jk_comboDataList(
		"Unidade_medida", "funcoes_unidade_medidaController", 
		{
			'pequisa_unidade_medida': true
		}, "unidade_medida_id", 
		[ "1","2","3","4","5","6" ], 
		0, [1], "", "unidade_medidaDiv", "", 5
	);
}