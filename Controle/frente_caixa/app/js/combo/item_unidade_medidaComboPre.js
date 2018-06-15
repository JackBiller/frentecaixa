
function combo_item_unidade_medida(id, value){
	jk_comboVlrPreDataList(
		"Item_unidade_medida", "funcoes_item_unidade_medidaController", 
		{
			'pequisa_item_unidade_medida': true
		}, "item_unidade_medida_id", 
		[ "1","2","3","4","5","6","7" ], 
		0, [1], "", "item_unidade_medidaDiv", "", 6, id, value
	);
}

function combo_item_unidade_medida_NV(){
	jk_comboDataList(
		"Item_unidade_medida", "funcoes_item_unidade_medidaController", 
		{
			'pequisa_item_unidade_medida': true
		}, "item_unidade_medida_id", 
		[ "1","2","3","4","5","6","7" ], 
		0, [1], "", "item_unidade_medidaDiv", "", 6
	);
}