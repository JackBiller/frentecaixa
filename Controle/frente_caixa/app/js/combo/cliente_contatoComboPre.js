
function combo_cliente_contato(id, value){
	jk_comboVlrPreDataList(
		"Cliente_contato", "funcoes_cliente_contatoController", 
		{
			'pequisa_cliente_contato': true
		}, "cliente_contato_id", 
		[ "1","2","3","4","5","6","7","8" ], 
		0, [1], "", "cliente_contatoDiv", "", 7, id, value
	);
}

function combo_cliente_contato_NV(){
	jk_comboDataList(
		"Cliente_contato", "funcoes_cliente_contatoController", 
		{
			'pequisa_cliente_contato': true
		}, "cliente_contato_id", 
		[ "1","2","3","4","5","6","7","8" ], 
		0, [1], "", "cliente_contatoDiv", "", 7
	);
}