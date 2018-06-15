
function combo_empresa(id, value){
	jk_comboVlrPreDataList(
		"Empresa", "funcoes_empresaController", 
		{
			'pequisa_empresa': true
		}, "empresa_id", 
		[ "1","2","3","4","5" ], 
		0, [1], "", "empresaDiv", "", 4, id, value
	);
}

function combo_empresa_NV(){
	jk_comboDataList(
		"Empresa", "funcoes_empresaController", 
		{
			'pequisa_empresa': true
		}, "empresa_id", 
		[ "1","2","3","4","5" ], 
		0, [1], "", "empresaDiv", "", 4
	);
}