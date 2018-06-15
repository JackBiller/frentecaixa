
$(document).ready(function(){
	buscar_item();
});

/*function setarValorEstrangeiroLista(id, tabelaEstrangeira){
	id = parseInt(id);
	tabelaEstrangeira = tabelaEstrangeira.split("+");
	var idTabelaEstrangeira = tabelaEstrangeira[0];
	tabelaEstrangeira = tabelaEstrangeira[1];
	var colunaParam = "pequisa_"+tabelaEstrangeira+"_id";

	var param = JSON.parse('{ "'+colunaParam+'":true, "id":'+idTabelaEstrangeira+' }');

	$.ajax({
		url:'app/controllers/funcoes_'+tabelaEstrangeira+'Controller.php',
		type: 'POST',
		dataType: 'text',
		data: param
	}).done( function(data){
		vetor = data.split("{,}");
		document.getElementById(tabelaEstrangeira+'_'+id).innerHTML = vetor[1];
	});
}*/



function buscar_item(){
	
	var id_item = "";
	var descricao_item = "";
	var grupo_id = "";
	var data_atualizacao_item = "";
	var usuario_id = "";
	var bool_ativo_item = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroItem = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	var grades = document.getElementsByName("grade");
	var id_tabela_primaria = 0;
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == "grupo" && $(grades[i]).data("g") == "item") {
			id_tabela_primaria = $(grades[i]).val();
			if (id_tabela_primaria == 0)
				window.location.assign("principal.php#!grupo");
			else {
				$.ajax({
					url:'app/controllers/funcoes_grupoController.php',
					type: 'POST',
					dataType: 'text',
					data: {
						'pequisa_grupo_id': true,
						'id': id_tabela_primaria
					}
				}).done( function(data){
					// console.log("funcoes_grupoController: "+data);
					vetor = data.split("{,}");
					document.getElementById('nomeGrupo').innerHTML = vetor[1];
				});
			}
		}
	}


	$.ajax({
		url:'app/controllers/funcoes_itemController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_item_grade': true,
			'filtro': $("#pesquisa_item").val(),
			'tabela': "grupo",
			'id': id_tabela_primaria
		}
	}).done( function(data){
		// _filtro_grade
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroItem += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroItem += "<br>";

			telaCadastroItem += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_item = subvetor[0];
				descricao_item = subvetor[1];
				grupo_id = subvetor[2];
				data_atualizacao_item = subvetor[3];
				usuario_id = subvetor[4];
				bool_ativo_item = subvetor[5];
				
				acumularFunctionId.push(id_item);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_item == 1) { 
					desabilitar = "";
					icone_ativo = "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>";
					cor_ativo = "#0f0;";
					valorAtivo = 0;
				} else {
					desabilitar = "disabled";
					cor_ativo = "#f00;";
					icone_ativo = "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
					valorAtivo = 1;
				}

				tabelaViewBody += 		"<tr>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				"<a href='principal.php#!editar_grade_item-grupo' style='color: #f0ad4e;' data-id='"+id_item+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_item+"'>";
				tabelaViewBody += 				"<a href='#!grade_item-grupo' style='color: "+cor_ativo+"' data-id='"+id_item+"' onclick=\"excluir(this , 'item', "+bool_ativo_item+", 'grade_item-grupo')\" title='Excluir'>";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+descricao_item+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_item)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_item)+"'></div></td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_item_unidade_medida-item' style='color: green' data-id='"+id_item+"' onclick=\"grade(this , 'item', 'item_unidade_medida')\" title='Item Unidade Medida'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroItem += 	"<table class='table'>";
			telaCadastroItem += 		"<tr bgcolor='white'>";
			telaCadastroItem += 			"<td><b>Editar</b></td>";
			telaCadastroItem += 			"<td><b>Ativo</b></td>";
			telaCadastroItem += 			"<td><b>N°</b></td>";
			telaCadastroItem += 			"<td><b>Descrição</b></td>";
			telaCadastroItem += 			"<td><b>Data Atualização</b></td>";
			telaCadastroItem += 			"<td><b>Usuário</b></td>";
			telaCadastroItem += 			"<td><b>Item Unidade Medida</b></td>";
			telaCadastroItem += 		"</tr>";
			telaCadastroItem +=		tabelaViewBody;
			telaCadastroItem += 	"</table>";
		}
		telaCadastroItem += "</div>";
		$("#conteudoItem").html(telaCadastroItem);
		for (var i = acumularFunctionId.length - 1; i >= 0; i--) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
		var botaoBoltarGrade = verificaGrade('grupo', 'item', 'Grupo');
		$("#botaoVoltarGrade").html(botaoBoltarGrade);
	});
}