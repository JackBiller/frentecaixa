
function combo_item(id, value){
	jk_comboVlrPreDataList(
		"Item", "funcoes_itemController", 
		{
			'pequisa_item': true
		}, "item_id", 
		[ "1","2","3","4","5","6" ], 
		0, [1], "", "itemDiv", "", 5, id, value
	);
}

function combo_item_NV(){
	jk_comboDataList(
		"Item", "funcoes_itemController", 
		{
			'pequisa_item': true
		}, "item_id", 
		[ "1","2","3","4","5","6" ], 
		0, [1], "", "itemDiv", "", 5
	);
}