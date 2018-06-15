
function combo_pedido_item(id, value){
	jk_comboVlrPreDataList(
		"Pedido_item", "funcoes_pedido_itemController", 
		{
			'pequisa_pedido_item': true
		}, "pedido_item_id", 
		[ "1","2","3","4","5","6","7","8","9","10" ], 
		0, [1], "", "pedido_itemDiv", "", 9, id, value
	);
}

function combo_pedido_item_NV(){
	jk_comboDataList(
		"Pedido_item", "funcoes_pedido_itemController", 
		{
			'pequisa_pedido_item': true
		}, "pedido_item_id", 
		[ "1","2","3","4","5","6","7","8","9","10" ], 
		0, [1], "", "pedido_itemDiv", "", 9
	);
}