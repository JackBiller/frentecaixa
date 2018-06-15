
function jk_filialDataListGrade(tabela, id_grade) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboDataList(
			"Filial", "funcoes_filialController", 
			{
				'pequisa_filial_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "filial_id", 
			[ "1","2","3","4","5","6","7" ], 
			0, [1], "", "filialDiv", "", 6
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='filial_id' disabled>";
		$("#filialDiv").html(campo);
	}
}

function jk_filialDataListGradePre(tabela, id_grade, id, valor) {
	if (id_grade != "" && id_grade != 0) {
		jk_comboVlrPreDataList(
			"Filial", "funcoes_filialController", 
			{
				'pequisa_filial_grade': true,
				'tabela': tabela,
				'id': id_grade
			}, "filial_id", 
			[ "1","2","3","4","5","6","7" ], 
			0, [1], "", "filialDiv", "", 6, id, valor
		);
	}
	else {
		var campo = "<input type='text' value='Aguardando seleção...' class='form-control' id='filial_id' disabled>";
		$("#filialDiv").html(campo);
	}
}