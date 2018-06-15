
function jk_cliente_enderecoDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Cliente_endereco", "funcoes_cliente_enderecoController", 
			{
				'pequisa_cliente_endereco_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "cliente_endereco_id", 
			[ "1","2","3","4","5","6","7","8","9","10","11" ], 
			0, [1], "", "cliente_enderecoDiv", "", 10
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='cliente_endereco_id' disabled>";
		$("#cliente_enderecoDiv").html(campo);
	}
}

function jk_cliente_enderecoDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Cliente_endereco", "funcoes_cliente_enderecoController", 
			{
				'pequisa_cliente_endereco_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "cliente_endereco_id", 
			[ "1","2","3","4","5","6","7","8","9","10","11" ], 
			0, [1], "", "cliente_enderecoDiv", "", 10, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='cliente_endereco_id' disabled>";
		$("#cliente_enderecoDiv").html(campo);
	}
}