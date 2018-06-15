
function jk_clienteDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Cliente", "funcoes_clienteController", 
			{
				'pequisa_cliente_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "cliente_id", 
			[ "1","2","3","4","5" ], 
			0, [1], "", "clienteDiv", "", 4
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='cliente_id' disabled>";
		$("#clienteDiv").html(campo);
	}
}

function jk_clienteDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Cliente", "funcoes_clienteController", 
			{
				'pequisa_cliente_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "cliente_id", 
			[ "1","2","3","4","5" ], 
			0, [1], "", "clienteDiv", "", 4, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='cliente_id' disabled>";
		$("#clienteDiv").html(campo);
	}
}