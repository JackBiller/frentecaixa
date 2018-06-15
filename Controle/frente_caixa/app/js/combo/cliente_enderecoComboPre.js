
function combo_cliente_endereco(id, value){
	jk_comboVlrPreDataList(
		"Cliente_endereco", "funcoes_cliente_enderecoController", 
		{
			'pequisa_cliente_endereco': true
		}, "cliente_endereco_id", 
		[ "1","2","3","4","5","6","7","8","9","10","11" ], 
		0, [1], "", "cliente_enderecoDiv", "", 10, id, value
	);
}

function combo_cliente_endereco_NV(){
	jk_comboDataList(
		"Cliente_endereco", "funcoes_cliente_enderecoController", 
		{
			'pequisa_cliente_endereco': true
		}, "cliente_endereco_id", 
		[ "1","2","3","4","5","6","7","8","9","10","11" ], 
		0, [1], "", "cliente_enderecoDiv", "", 10
	);
}