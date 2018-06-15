
function jk_empresaDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Empresa", "funcoes_empresaController", 
			{
				'pequisa_empresa_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "empresa_id", 
			[ "1","2","3","4","5" ], 
			0, [1], "", "empresaDiv", "", 4
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='empresa_id' disabled>";
		$("#empresaDiv").html(campo);
	}
}

function jk_empresaDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Empresa", "funcoes_empresaController", 
			{
				'pequisa_empresa_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "empresa_id", 
			[ "1","2","3","4","5" ], 
			0, [1], "", "empresaDiv", "", 4, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='empresa_id' disabled>";
		$("#empresaDiv").html(campo);
	}
}