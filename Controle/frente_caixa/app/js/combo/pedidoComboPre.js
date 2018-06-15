
function combo_pedido(id, value){
	jk_comboVlrPreDataList(
		"Pedido", "funcoes_pedidoController", 
		{
			'pequisa_pedido': true
		}, "pedido_id", 
		[ "1","2","3","4","5","6","7","8","9","10","11" ], 
		0, [1], "", "pedidoDiv", "", 10, id, value
	);
}

function combo_pedido_NV(){
	jk_comboDataList(
		"Pedido", "funcoes_pedidoController", 
		{
			'pequisa_pedido': true
		}, "pedido_id", 
		[ "1","2","3","4","5","6","7","8","9","10","11" ], 
		0, [1], "", "pedidoDiv", "", 10
	);
}