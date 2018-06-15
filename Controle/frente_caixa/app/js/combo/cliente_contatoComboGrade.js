
function jk_cliente_contatoDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Cliente_contato", "funcoes_cliente_contatoController", 
			{
				'pequisa_cliente_contato_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "cliente_contato_id", 
			[ "1","2","3","4","5","6","7","8" ], 
			0, [1], "", "cliente_contatoDiv", "", 7
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='cliente_contato_id' disabled>";
		$("#cliente_contatoDiv").html(campo);
	}
}

function jk_cliente_contatoDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Cliente_contato", "funcoes_cliente_contatoController", 
			{
				'pequisa_cliente_contato_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "cliente_contato_id", 
			[ "1","2","3","4","5","6","7","8" ], 
			0, [1], "", "cliente_contatoDiv", "", 7, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='cliente_contato_id' disabled>";
		$("#cliente_contatoDiv").html(campo);
	}
}