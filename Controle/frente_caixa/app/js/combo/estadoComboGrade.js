
function jk_estadoDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Estado", "funcoes_estadoController", 
			{
				'pequisa_estado_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "estado_id", 
			[ "1","2","3","4","5","6" ], 
			0, [1], "", "estadoDiv", "", 5
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='estado_id' disabled>";
		$("#estadoDiv").html(campo);
	}
}

function jk_estadoDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Estado", "funcoes_estadoController", 
			{
				'pequisa_estado_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "estado_id", 
			[ "1","2","3","4","5","6" ], 
			0, [1], "", "estadoDiv", "", 5, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='estado_id' disabled>";
		$("#estadoDiv").html(campo);
	}
}