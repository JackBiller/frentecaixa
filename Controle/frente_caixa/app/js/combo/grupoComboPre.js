
function combo_grupo(id, value){
	jk_comboVlrPreDataList(
		"Grupo", "funcoes_grupoController", 
		{
			'pequisa_grupo': true
		}, "grupo_id", 
		[ "1","2","3","4","5","6","7" ], 
		0, [1], "", "grupoDiv", "", 6, id, value
	);
}

function combo_grupo_NV(){
	jk_comboDataList(
		"Grupo", "funcoes_grupoController", 
		{
			'pequisa_grupo': true
		}, "grupo_id", 
		[ "1","2","3","4","5","6","7" ], 
		0, [1], "", "grupoDiv", "", 6
	);
}