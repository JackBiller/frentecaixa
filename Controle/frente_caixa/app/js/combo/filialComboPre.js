
function combo_filial(id, value){
	jk_comboVlrPreDataList(
		"Filial", "funcoes_filialController", 
		{
			'pequisa_filial': true
		}, "filial_id", 
		[ "1","2","3","4","5","6","7" ], 
		0, [1], "", "filialDiv", "", 6, id, value
	);
}

function combo_filial_NV(){
	jk_comboDataList(
		"Filial", "funcoes_filialController", 
		{
			'pequisa_filial': true
		}, "filial_id", 
		[ "1","2","3","4","5","6","7" ], 
		0, [1], "", "filialDiv", "", 6
	);
}