
$(document).ready(function(){
	buscar_item_unidade_medida();
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



function buscar_item_unidade_medida(){
	
	var id_item_unidade_medida = "";
	var quantidade_item_unidade_medida = "";
	var item_id = "";
	var unidade_medida_id = "";
	var data_atualizacao_item_unidade_medida = "";
	var usuario_id = "";
	var bool_ativo_item_unidade_medida = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroItem_unidade_medida = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	var grades = document.getElementsByName("grade");
	var id_tabela_primaria = 0;
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == "item" && $(grades[i]).data("g") == "item_unidade_medida") {
			id_tabela_primaria = $(grades[i]).val();
			if (id_tabela_primaria == 0)
				window.location.assign("principal.php#!item");
			else {
				$.ajax({
					url:'app/controllers/funcoes_itemController.php',
					type: 'POST',
					dataType: 'text',
					data: {
						'pequisa_item_id': true,
						'id': id_tabela_primaria
					}
				}).done( function(data){
					// console.log("funcoes_itemController: "+data);
					vetor = data.split("{,}");
					document.getElementById('nomeItem').innerHTML = vetor[1];
				});
			}
		}
	}


	$.ajax({
		url:'app/controllers/funcoes_item_unidade_medidaController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_item_unidade_medida_grade': true,
			'filtro': $("#pesquisa_item_unidade_medida").val(),
			'tabela': "item",
			'id': id_tabela_primaria
		}
	}).done( function(data){
		// _filtro_grade
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroItem_unidade_medida += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroItem_unidade_medida += "<br>";

			telaCadastroItem_unidade_medida += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_item_unidade_medida = subvetor[0];
				quantidade_item_unidade_medida = subvetor[1];
				item_id = subvetor[2];
				unidade_medida_id = subvetor[3];
				data_atualizacao_item_unidade_medida = subvetor[4];
				usuario_id = subvetor[5];
				bool_ativo_item_unidade_medida = subvetor[6];
				
				acumularFunctionId.push(id_item_unidade_medida);
				acumularFunctionCampo.push(unidade_medida_id+"+unidade_medida");
				acumularFunctionId.push(id_item_unidade_medida);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_item_unidade_medida == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_grade_item_unidade_medida-item' style='color: #f0ad4e;' data-id='"+id_item_unidade_medida+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_item_unidade_medida+"'>";
				tabelaViewBody += 				"<a href='#!grade_item_unidade_medida-item' style='color: "+cor_ativo+"' data-id='"+id_item_unidade_medida+"' onclick=\"excluir(this , 'item_unidade_medida', "+bool_ativo_item_unidade_medida+", 'grade_item_unidade_medida-item')\" title='Excluir'>";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+quantidade_item_unidade_medida+"</td>";
				tabelaViewBody += 			"<td><div id='unidade_medida_"+parseInt(id_item_unidade_medida)+"'></div></td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_item_unidade_medida)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_item_unidade_medida)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroItem_unidade_medida += 	"<table class='table'>";
			telaCadastroItem_unidade_medida += 		"<tr bgcolor='white'>";
			telaCadastroItem_unidade_medida += 			"<td><b>Editar</b></td>";
			telaCadastroItem_unidade_medida += 			"<td><b>Ativo</b></td>";
			telaCadastroItem_unidade_medida += 			"<td><b>N°</b></td>";
			telaCadastroItem_unidade_medida += 			"<td><b>Quantidade</b></td>";
			telaCadastroItem_unidade_medida += 			"<td><b>Unidade Medida</b></td>";
			telaCadastroItem_unidade_medida += 			"<td><b>Data Atualização</b></td>";
			telaCadastroItem_unidade_medida += 			"<td><b>Usuário</b></td>";
			telaCadastroItem_unidade_medida += 		"</tr>";
			telaCadastroItem_unidade_medida +=		tabelaViewBody;
			telaCadastroItem_unidade_medida += 	"</table>";
		}
		telaCadastroItem_unidade_medida += "</div>";
		$("#conteudoItem_unidade_medida").html(telaCadastroItem_unidade_medida);
		for (var i = acumularFunctionId.length - 1; i >= 0; i--) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
		var botaoBoltarGrade = verificaGrade('item', 'item_unidade_medida', 'Item');
		$("#botaoVoltarGrade").html(botaoBoltarGrade);
	});
}