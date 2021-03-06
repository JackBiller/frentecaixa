
function jk_grupoDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Grupo", "funcoes_grupoController", 
			{
				'pequisa_grupo_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "grupo_id", 
			[ "1","2","3","4","5","6","7" ], 
			0, [1], "", "grupoDiv", "", 6
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='grupo_id' disabled>";
		$("#grupoDiv").html(campo);
	}
}

function jk_grupoDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Grupo", "funcoes_grupoController", 
			{
				'pequisa_grupo_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "grupo_id", 
			[ "1","2","3","4","5","6","7" ], 
			0, [1], "", "grupoDiv", "", 6, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='grupo_id' disabled>";
		$("#grupoDiv").html(campo);
	}
}