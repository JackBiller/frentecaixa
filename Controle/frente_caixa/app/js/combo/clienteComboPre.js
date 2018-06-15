
function combo_cliente(id, value){
	jk_comboVlrPreDataList(
		"Cliente", "funcoes_clienteController", 
		{
			'pequisa_cliente': true
		}, "cliente_id", 
		[ "1","2","3","4","5" ], 
		0, [1], "", "clienteDiv", "", 4, id, value
	);
}

function combo_cliente_NV(){
	jk_comboDataList(
		"Cliente", "funcoes_clienteController", 
		{
			'pequisa_cliente': true
		}, "cliente_id", 
		[ "1","2","3","4","5" ], 
		0, [1], "", "clienteDiv", "", 4
	);
}